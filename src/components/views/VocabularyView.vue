<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import { useReinforcementStore } from "../../stores/reinforcement";
import GapFeedback from "../GapFeedback.vue";
import type { TrainerContext } from "../../composables/useTrainer";
const {
  store,
  filter,
  search,
  currentExpression,
  isLastPlanExpression,
  categoryLabel,
  filteredExpressions,
  speak,
  nextExpression,
  canAdvanceExpression,
} = inject<TrainerContext>("trainer")!;
const reinforcement = useReinforcementStore();
const recall = ref(false);
const answer = ref("");
const result = ref<"correct" | "incorrect" | null>(null);
const normalize = (text: string) =>
  text.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
const prompt = computed(() => {
  const { example, text } = currentExpression.value;
  const pos = example.toLowerCase().indexOf(text.toLowerCase());
  const isLetter = (ch: string) => /[a-z]/i.test(ch);
  if (
    pos < 0 ||
    isLetter(example.charAt(pos - 1)) ||
    isLetter(example.charAt(pos + text.length))
  )
    return null;
  return example.slice(0, pos) + "________" + example.slice(pos + text.length);
});
watch(currentExpression, () => {
  recall.value = false;
  answer.value = "";
  result.value = null;
});
function randomWord() {
  const choices = filteredExpressions.value.filter(
    (word) => word.id !== currentExpression.value.id,
  );
  const word = choices[Math.floor(Math.random() * choices.length)];
  if (word) store.expressionIndex = word.id - 1;
}
function checkAnswer() {
  if (!answer.value.trim() || result.value) return;
  const word = currentExpression.value;
  const correct = normalize(answer.value) === normalize(word.text);
  result.value = correct ? "correct" : "incorrect";
  reinforcement.record("词汇回忆", correct);
  if (!correct)
    store.addError(answer.value.trim(), word.text, "词汇回忆 · 待复习", word.meaning, {
      sentence: prompt.value ?? "请根据中文回忆：" + word.meaning,
      answer: word.text,
      hint: word.translation,
    });
  else
    store.resolveExerciseErrors("词汇回忆 · 待复习", {
      sentence: prompt.value ?? "请根据中文回忆：" + word.meaning,
      answer: word.text,
    });
  store.logSession(1);
}
</script>
<template>
  <section>
    <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-4">
      <div>
        <div class="page-title">用搭配学会自然表达</div>
        <div class="muted mt-1">从真实交流中积累词组，而不是孤立背单词。</div>
      </div>
      <v-btn
        color="primary"
        prepend-icon="mdi-refresh"
        :disabled="!canAdvanceExpression"
        @click="store.planVocabularyIds.length ? nextExpression() : randomWord()"
        >{{
          store.planVocabularyIds.length
            ? isLastPlanExpression
              ? "已到本课最后一词"
              : "继续学下一个"
            : "随机练习"
        }}</v-btn
      >
    </div>
    <v-alert
      v-if="store.planVocabularyIds.length"
      type="info"
      variant="tonal"
      density="compact"
      class="mb-4"
    >
      正在学习本课的 {{ store.planVocabularyIds.length }} 个核心词条。
      <v-btn size="small" variant="text" @click="store.planVocabularyIds = []"
        >返回完整词库</v-btn
      >
    </v-alert>
    <v-row
      ><v-col cols="12" md="7"
        ><v-card class="pa-5"
          ><div class="d-flex justify-space-between align-center">
            <v-chip size="small" color="deep-purple-lighten-5" class="text-primary"
              >今日表达 · {{ categoryLabel(currentExpression.category) }}</v-chip
            >
            <div class="d-flex ga-1">
              <v-btn
                icon
                variant="text"
                aria-label="朗读当前表达"
                @click="speak(currentExpression.text)"
                ><v-icon>mdi-volume-high</v-icon></v-btn
              ><v-btn
                icon
                variant="text"
                :aria-label="
                  store.favorites.includes(currentExpression.id) ? '取消收藏' : '收藏表达'
                "
                :color="store.favorites.includes(currentExpression.id) ? 'pink' : 'grey'"
                @click="store.toggleFavorite(currentExpression.id)"
                ><v-icon>{{
                  store.favorites.includes(currentExpression.id)
                    ? "mdi-heart"
                    : "mdi-heart-outline"
                }}</v-icon></v-btn
              >
            </div>
          </div>
          <div class="expression-text mt-5">
            {{ recall ? "请说出英文表达" : currentExpression.text }}
          </div>
          <div class="text-body-1 mt-2">{{ currentExpression.meaning }}</div>
          <v-alert
            v-if="currentExpression.usagePattern"
            class="mt-4"
            variant="tonal"
            color="primary"
            density="compact"
            ><b>换成自己的内容</b>
            <p class="mt-1" lang="en">{{ currentExpression.usagePattern }}</p>
            <small>方括号是可替换位置，不是要逐字说出的内容。</small></v-alert
          >
          <v-divider class="my-5" />
          <div class="eyebrow">EXAMPLE</div>
          <div class="text-body-1 font-weight-medium mt-2">
            {{
              recall ? "试着用这个表达造句，再显示英文核对。" : currentExpression.example
            }}
          </div>
          <div class="muted mt-1">{{ currentExpression.translation }}</div>
          <div class="d-flex flex-wrap ga-2 mt-4">
            <v-btn variant="tonal" color="primary" @click="recall = !recall">{{
              recall ? "显示英文" : "看中文说英文"
            }}</v-btn
            ><v-btn
              variant="outlined"
              :color="
                store.mastered.includes(currentExpression.id) ? 'success' : undefined
              "
              @click="store.markMastered(currentExpression.id)"
              ><v-icon start>{{
                store.mastered.includes(currentExpression.id)
                  ? "mdi-check-circle"
                  : "mdi-check-circle-outline"
              }}</v-icon
              >{{
                store.mastered.includes(currentExpression.id)
                  ? "取消已掌握"
                  : "标记为掌握"
              }}</v-btn
            ><v-btn
              variant="text"
              :disabled="!canAdvanceExpression"
              @click="nextExpression"
              >{{ isLastPlanExpression ? "已到本课最后一词" : "下一个" }}
              <v-icon end>mdi-arrow-right</v-icon></v-btn
            >
          </div>
          <v-alert
            v-if="store.planVocabularyIds.length && isLastPlanExpression"
            type="success"
            variant="tonal"
            density="compact"
            class="mt-4"
          >
            已到今日计划的最后一个表达。你可以从右侧清单回看复习，继续学习不会跳到其他词汇。
          </v-alert> </v-card
        ><v-card class="pa-5 mt-4"
          ><div class="font-weight-bold">
            {{ prompt ? "快速练习 · 补全句子" : "快速练习 · 写出词条原形" }}
          </div>
          <p class="text-body-2 my-3">{{ prompt ?? currentExpression.meaning }}</p>
          <v-form @submit.prevent="checkAnswer">
            <v-text-field
              v-model="answer"
              maxlength="180"
              label="输入本课英文表达"
              :hint="currentExpression.meaning"
              persistent-hint
              @update:model-value="result = null"
            />
            <v-btn
              type="submit"
              size="small"
              class="mt-2"
              color="primary"
              :disabled="!answer.trim() || !!result"
              >核对答案</v-btn
            >
          </v-form>
          <v-alert
            v-if="result"
            class="mt-3"
            :type="result === 'correct' ? 'success' : 'info'"
            variant="tonal"
            density="compact"
            role="status"
            >{{
              result === "correct"
                ? "答对了！"
                : "与词条不同。参考表达：" + currentExpression.text
            }}</v-alert
          >
          <GapFeedback
            v-if="result"
            :sentence="prompt ?? '对应中文含义的英文词条：______'"
            :focus="currentExpression.meaning + '。原文：' + currentExpression.example"
            :answer="answer"
            :reference="currentExpression.text"
          /> </v-card></v-col
      ><v-col cols="12" md="5"
        ><v-card class="pa-4"
          ><v-text-field
            v-model="search"
            label="搜索表达或中文含义"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
          />
          <div class="d-flex flex-wrap ga-1 my-3">
            <v-chip
              v-for="f in [
                '全部',
                '日常',
                '职场沟通',
                '软件开发',
                '产品与项目',
                '客户沟通',
                '收藏',
                '已掌握',
              ]"
              :key="f"
              size="small"
              :color="filter === f ? 'primary' : undefined"
              :variant="filter === f ? 'flat' : 'outlined'"
              @click="filter = f"
              >{{ f }}</v-chip
            >
          </div>
          <v-list class="expression-list overflow-y-auto" lines="two"
            ><v-list-item
              v-for="e in filteredExpressions"
              :key="e.id"
              :active="e.id === currentExpression.id"
              :title="e.text"
              :subtitle="e.meaning"
              @click="
                store.expressionIndex = e.id - 1;
                recall = false;
              "
              ><template #append
                ><v-icon v-if="store.mastered.includes(e.id)" color="success" size="small"
                  >mdi-check-circle</v-icon
                ><v-icon
                  v-else-if="store.favorites.includes(e.id)"
                  color="pink"
                  size="small"
                  >mdi-heart</v-icon
                ></template
              ></v-list-item
            ></v-list
          >
          <div class="text-caption muted px-4 pt-2">
            {{ filteredExpressions.length }} 个表达 · 可滚动浏览完整词库
          </div></v-card
        ></v-col
      ></v-row
    >
  </section>
</template>

<style scoped>
.expression-list {
  max-height: min(62vh, 680px);
  overscroll-behavior: contain;
}

@media (max-width: 599px) {
  .expression-list {
    max-height: min(55vh, 480px);
  }
}
</style>
