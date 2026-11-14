<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import type { TrainerContext } from "../../composables/useTrainer";
import {
  tenses,
  tenseById,
  tenseAnswerMatches,
  mixedTenseExercises,
} from "../../data/tenses";
import { useReinforcementStore } from "../../stores/reinforcement";
const { store, page, tenseId, speak } = inject<TrainerContext>("trainer")!;
const reinforcement = useReinforcementStore();
const groups = ["现在", "过去", "将来", "过去将来"] as const;
const mode = ref<"learn" | "mixed">("learn");
const lesson = computed(() => tenseById(tenseId.value));
const questions = computed(() =>
  mode.value === "mixed"
    ? mixedTenseExercises
    : lesson.value.exercises.map((q) => ({ ...q, tenseId: lesson.value.id })),
);
const answers = ref<string[]>([]);
const checked = ref<boolean[]>([]);
const showHints = ref(true);
const correct = (i: number) =>
  !!checked.value[i] && tenseAnswerMatches(questions.value[i]!, answers.value[i] ?? "");
const passed = computed(() => questions.value.filter((_, i) => correct(i)).length);
function reset() {
  answers.value = [];
  checked.value = [];
}
watch([tenseId, mode], reset);
function choose(id: string) {
  tenseId.value = id;
  mode.value = "learn";
  showHints.value = true;
}
function switchMode(value: "learn" | "mixed") {
  mode.value = value;
  showHints.value = value === "learn";
}
function check(index: number) {
  if (checked.value[index] || !answers.value[index]?.trim()) return;
  checked.value[index] = true;
  const q = questions.value[index]!;
  const tense = tenseById(q.tenseId);
  const ok = correct(index);
  reinforcement.record(`时态 · ${tense.name}`, ok);
  store.logSession(1, 0, Number(!ok));
  if (!ok)
    store.addError(
      answers.value[index]!.trim(),
      q.answer,
      "时态练习 · 待复习",
      `${tense.name} · ${q.reason}`,
      {
        sentence: q.sentence,
        answer: q.answer,
        hint: `${tense.name}：${tense.structure}。${q.reason}`,
      },
    );
  else {
    const entry = store.errors.find(
      (e) =>
        e.type === "时态练习 · 待复习" &&
        e.exercise?.sentence === q.sentence &&
        e.corrected === q.answer,
    );
    if (entry) store.resolveError(entry.id, true);
  }
}
</script>

<template>
  <section aria-labelledby="tenses-title">
    <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-2">
      <h1 id="tenses-title" class="page-title">英语时态练习</h1>
      <v-btn variant="text" prepend-icon="mdi-arrow-left" @click="page = 'grammar'"
        >回到语法练习</v-btn
      >
    </div>
    <p class="muted mb-4">
      先找时间参照点，再看动作是习惯、正在进行、已经完成，还是持续了一段时间。12
      种主要时态 + 4 种过去将来扩展。
    </p>
    <div class="d-flex flex-wrap ga-2 mb-4" aria-label="时态练习模式">
      <v-btn
        :variant="mode === 'learn' ? 'flat' : 'tonal'"
        color="primary"
        :aria-pressed="mode === 'learn'"
        @click="switchMode('learn')"
        >分时态学习</v-btn
      >
      <v-btn
        :variant="mode === 'mixed' ? 'flat' : 'tonal'"
        color="primary"
        :aria-pressed="mode === 'mixed'"
        @click="switchMode('mixed')"
        >易混时态对比练习</v-btn
      >
    </div>
    <v-row>
      <v-col v-if="mode === 'learn'" cols="12" md="3">
        <v-card class="pa-3 tense-picker" aria-label="时态目录">
          <div v-for="group in groups" :key="group" class="mb-3">
            <h2 class="text-subtitle-2 px-3 py-2">
              {{ group
              }}<span v-if="group === '过去将来'" class="text-caption muted">
                · 进阶扩展</span
              >
            </h2>
            <v-list density="compact">
              <v-list-item
                v-for="item in tenses.filter((t) => t.group === group)"
                :key="item.id"
                :title="item.name"
                :subtitle="item.english"
                :active="tenseId === item.id"
                :aria-current="tenseId === item.id ? 'true' : undefined"
                rounded="lg"
                @click="choose(item.id)"
              />
            </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" :md="mode === 'learn' ? 9 : 12">
        <v-card v-if="mode === 'learn'" class="pa-4 pa-md-5 mb-4" aria-label="时态讲解">
          <v-chip
            v-if="lesson.group === '过去将来'"
            size="small"
            variant="tonal"
            class="mb-3"
            >进阶 · 可在基础时态熟练后练习</v-chip
          >
          <h2 class="text-h5">{{ lesson.name }}</h2>
          <p class="text-caption muted mt-1">{{ lesson.english }}</p>
          <p class="mt-4">{{ lesson.usage }}</p>
          <dl class="tense-forms mt-4">
            <div>
              <dt>肯定结构</dt>
              <dd>{{ lesson.structure }}</dd>
            </div>
            <div>
              <dt>否定结构</dt>
              <dd>{{ lesson.negative }}</dd>
            </div>
            <div>
              <dt>疑问结构</dt>
              <dd>{{ lesson.question }}</dd>
            </div>
          </dl>
          <div class="tense-example mt-4">
            <p lang="en" class="font-weight-medium">{{ lesson.example }}</p>
            <p class="text-body-2 muted mt-1">{{ lesson.translation }}</p>
            <v-btn
              variant="text"
              size="small"
              prepend-icon="mdi-volume-high"
              class="mt-2"
              @click="speak(lesson.example)"
              >朗读例句</v-btn
            >
          </div>
          <p class="text-body-2 mt-4"><strong>时间线索：</strong>{{ lesson.clues }}</p>
          <p class="text-body-2 mt-2"><strong>易错点：</strong>{{ lesson.pitfall }}</p>
          <v-divider class="my-4" />
          <p class="text-body-2"><strong>对比理解：</strong>{{ lesson.contrast.note }}</p>
          <v-btn
            variant="tonal"
            size="small"
            color="primary"
            class="mt-3"
            @click="choose(lesson.contrast.id)"
            >对比{{ tenseById(lesson.contrast.id).name }}</v-btn
          >
        </v-card>
        <v-card class="pa-4 pa-md-5" aria-label="时态填空练习">
          <div class="d-flex flex-wrap justify-space-between align-center ga-2">
            <h2 class="text-h6">
              {{
                mode === "learn" ? lesson.name + " · 句子填空" : "易混时态 · 结合语境填空"
              }}
            </h2>
            <span role="status" class="text-caption muted"
              >已答对 {{ passed }} / {{ questions.length }} 题</span
            >
          </div>
          <p class="text-body-2 muted mt-2">
            {{
              mode === "learn"
                ? "按本组时态和括号内的动词完成句子，留意空位外已有的助动词。"
                : "先读完整语境再选形式；可以打开提示，比较习惯与当前动作、过去事件与现在结果。"
            }}
          </p>
          <v-switch
            v-model="showHints"
            label="显示每题时态与结构提示"
            color="primary"
            density="compact"
            hide-details
            class="my-2"
          />
          <section
            v-for="(q, index) in questions"
            :key="`${mode}-${tenseId}-${index}`"
            class="tense-question"
            :aria-label="`时态填空第 ${index + 1} 题`"
          >
            <h3 class="text-subtitle-2">第 {{ index + 1 }} 题</h3>
            <p lang="en" class="text-body-1 mt-2">
              {{ q.sentence }} <span class="muted">({{ q.verb }})</span>
            </p>
            <p class="text-body-2 muted mt-1">{{ q.translation }}</p>
            <aside v-if="showHints" class="tense-question-hint text-body-2 mt-3">
              <strong>时态提示：{{ tenseById(q.tenseId).name }}</strong>
              <p>{{ tenseById(q.tenseId).structure }}</p>
            </aside>
            <v-form class="mt-3" @submit.prevent="check(index)">
              <div class="tense-answer-row">
                <v-text-field
                  v-model="answers[index]"
                  :label="`第 ${index + 1} 题：填入动词形式`"
                  maxlength="180"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :disabled="checked[index]"
                /><v-btn
                  type="submit"
                  color="primary"
                  variant="tonal"
                  :disabled="checked[index] || !answers[index]?.trim()"
                  >核对第 {{ index + 1 }} 题</v-btn
                >
              </div>
            </v-form>
            <v-alert
              v-if="checked[index]"
              :type="correct(index) ? 'success' : 'info'"
              variant="tonal"
              density="compact"
              class="mt-3"
              role="status"
            >
              <strong
                >{{ correct(index) ? "答对了" : "再看一下动词形式" }} ·
                {{ tenseById(q.tenseId).name }}</strong
              >
              <p class="mt-1">
                参考填入：<b lang="en">{{ q.answer }}</b>
              </p>
              <p class="mt-1">{{ q.reason }}</p>
            </v-alert>
            <v-btn
              v-if="checked[index]"
              variant="text"
              size="small"
              class="mt-2"
              :aria-label="`修改第 ${index + 1} 题`"
              @click="checked[index] = false"
              >修改本题</v-btn
            >
          </section>
          <v-alert
            v-if="passed === questions.length"
            type="success"
            variant="tonal"
            class="my-3"
            role="status"
            >本组已全部答对。试着换一个主语或时间，用同样的时间关系自己说一句。</v-alert
          >
          <v-btn variant="outlined" prepend-icon="mdi-refresh" @click="reset"
            >重新练习本组</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
<style scoped>
.tense-picker {
  max-height: min(78vh, 1000px);
  overflow-y: auto;
  position: sticky;
  top: 16px;
}
.tense-forms {
  display: grid;
  gap: 12px;
}
.tense-forms > div {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 12px;
  font-size: 14px;
}
.tense-forms dt {
  font-weight: 700;
  color: #45644b;
}
.tense-forms dd {
  margin: 0;
}
.tense-example,
.tense-question-hint {
  padding: 14px;
  border-radius: 12px;
  background: #f3f6ee;
}
.tense-question {
  padding: 22px 0;
  border-top: 1px solid #e2e6dc;
}
.tense-answer-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.tense-answer-row :deep(.v-input) {
  min-width: 120px;
}
@media (max-width: 959px) {
  .tense-picker {
    max-height: 240px;
    position: static;
  }
}
@media (max-width: 480px) {
  .tense-answer-row {
    align-items: stretch;
    flex-direction: column;
  }
  .tense-forms > div {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
