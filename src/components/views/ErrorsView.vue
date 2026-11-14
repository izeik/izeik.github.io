<script setup lang="ts">
import { computed, inject, ref } from "vue";
import type { TrainerContext } from "../../composables/useTrainer";
import { useReinforcementStore } from "../../stores/reinforcement";
import { normalizeGapAnswer } from "../../data/lessonGaps";
import GapFeedback from "../GapFeedback.vue";
const { store, page } = inject<TrainerContext>("trainer")!;
const reinforcement = useReinforcementStore();
const activeId = ref<number | null>(null),
  answer = ref(""),
  checked = ref(false);
const active = computed(() => store.errors.find((e) => e.id === activeId.value));
const exercise = computed(
  () =>
    active.value?.exercise ?? {
      sentence: "旧记录未保存原题，请回忆这条记录的推荐表达。",
      answer: active.value?.corrected ?? "",
      hint: active.value?.note ?? "",
    },
);
const correct = computed(
  () => normalizeGapAnswer(answer.value) === normalizeGapAnswer(exercise.value.answer),
);
function start(id: number) {
  activeId.value = id;
  answer.value = "";
  checked.value = false;
}
function check() {
  if (checked.value || !answer.value.trim() || !active.value) return;
  checked.value = true;
  store.resolveError(active.value.id, correct.value);
  reinforcement.recordReview(correct.value);
}
const pending = computed(() => store.errors.filter((e) => !e.resolved).length);
</script>
<template>
  <section>
    <div class="page-title">把薄弱表达，再练一次</div>
    <p class="muted mt-2 mb-4">
      {{ pending }} 条待复习 ·
      {{ store.errors.length - pending }}
      条已处理。与参考不同的填空先收为待复习，不直接判为语法错误。
    </p>
    <v-card v-if="store.errors.length" class="pa-4"
      ><div v-for="e in store.errors" :key="e.id" class="review-item py-4">
        <div class="d-flex justify-space-between align-center ga-2">
          <v-chip size="small" :color="e.resolved ? 'success' : 'warning'"
            >{{ e.type }} · {{ e.resolved ? "已重做通过" : "待复习" }}</v-chip
          >
          <div>
            <v-btn size="small" variant="text" @click="start(e.id)">重做本题</v-btn
            ><v-btn
              size="small"
              variant="text"
              icon="mdi-delete-outline"
              aria-label="删除错误记录"
              @click="store.removeError(e.id)"
            />
          </div>
        </div>
        <template v-if="activeId !== e.id"
          ><p class="mt-3">
            {{ e.wrong }} <span class="muted">→</span> {{ e.corrected }}
          </p>
          <p class="muted text-body-2 mt-2">{{ e.note }}</p></template
        >
        <div v-else class="mt-4">
          <p v-if="!e.exercise" class="text-caption muted mb-2">
            旧记录仅支持回忆推荐表达；新收录题目可直接重做原题。
          </p>
          <p class="text-body-1">{{ exercise.sentence }}</p>
          <details v-if="exercise.context" class="mt-3">
            <summary>查看原文</summary>
            <p class="text-body-2 mt-2">{{ exercise.context }}</p>
          </details>
          <v-radio-group
            v-if="exercise.options"
            v-model="answer"
            :disabled="checked"
            class="mt-3"
            hide-details
            ><v-radio
              v-for="option in exercise.options"
              :key="option"
              :value="option"
              :label="option"
          /></v-radio-group>
          <v-text-field
            v-else
            v-model="answer"
            label="重做答案"
            class="mt-3"
            :disabled="checked"
            @keyup.enter="check"
          />
          <v-btn
            class="mt-3"
            color="primary"
            :disabled="checked || !answer.trim()"
            @click="check"
            >核对重做</v-btn
          ><v-btn v-if="checked" class="mt-3 ml-2" variant="text" @click="start(e.id)"
            >再练一次</v-btn
          >
          <v-alert
            v-if="checked"
            class="mt-3"
            :type="correct ? 'success' : 'info'"
            variant="tonal"
            >{{
              correct
                ? "与参考一致，已标记为重做通过。"
                : "与参考不同，仍保留在待复习中。"
            }}参考：{{ exercise.answer }}。{{ exercise.hint }}</v-alert
          >
          <GapFeedback
            v-if="checked && (exercise.options || exercise.sentence.includes('______'))"
            :kind="exercise.options ? 'choice' : 'gap'"
            :sentence="
              exercise.sentence +
              (exercise.options ? '\n' + exercise.options.join('\n') : '')
            "
            :reference="exercise.answer"
            :answer="answer"
            :focus="exercise.context || exercise.hint || '回忆当天表达'"
          />
        </div></div
    ></v-card>
    <v-card v-else class="pa-6 text-center"
      ><v-icon size="48" color="primary">mdi-notebook-check-outline</v-icon>
      <h2 class="text-h6 mt-3">暂时没有待复习的表达</h2>
      <p class="muted mt-2">完成阅读、词汇或每日填空后，可在这里重做需要巩固的题目。</p>
      <v-btn class="mt-4" color="primary" @click="page = 'dashboard'"
        >回到学习首页</v-btn
      ></v-card
    >
  </section>
</template>
<style scoped>
.review-item + .review-item {
  border-top: 1px solid #e2e6dc;
}
.review-item p {
  overflow-wrap: anywhere;
  line-height: 1.8;
}
summary {
  cursor: pointer;
  color: #284f43;
}
</style>
