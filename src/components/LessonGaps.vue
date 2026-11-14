<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import type { DailyLesson } from "../data/lessons";
import { lessonGaps, normalizeGapAnswer } from "../data/lessonGaps";
import type { TrainerContext } from "../composables/useTrainer";
import { useReinforcementStore } from "../stores/reinforcement";
import GapFeedback from "./GapFeedback.vue";
const { store } = inject<TrainerContext>("trainer")!;
const reinforcement = useReinforcementStore();
const props = defineProps<{ lesson: DailyLesson }>();
const gaps = computed(() => lessonGaps(props.lesson));
const answers = ref<Record<number, string>>({}),
  checked = ref<Record<number, boolean>>({});
const index = ref(0);
const q = computed(() => gaps.value[index.value]!);
const isCorrect = (i: number) =>
  checked.value[i] &&
  normalizeGapAnswer(answers.value[i] ?? "") ===
    normalizeGapAnswer(gaps.value[i]!.answer);
const correctCount = computed(() => gaps.value.filter((_, i) => isCorrect(i)).length);
watch(
  () => props.lesson.day,
  () => {
    answers.value = {};
    checked.value = {};
    index.value = 0;
  },
);
function submit() {
  if (!answers.value[index.value]?.trim() || checked.value[index.value]) return;
  checked.value[index.value] = true;
  const question = q.value;
  const correct = !!isCorrect(index.value);
  reinforcement.record(`每日填空 · ${question.type}`, correct);
  if (!correct)
    store.addError(
      answers.value[index.value]!.trim(),
      question.answer,
      `每日${question.type} · 待复习`,
      `第 ${props.lesson.day} 天 · ${props.lesson.theme}`,
      {
        sentence: question.sentence,
        answer: question.answer,
        hint: question.explanation,
      },
    );
}
</script>
<template>
  <v-expansion-panels class="my-3"
    ><v-expansion-panel :title="`第 ${lesson.day} 天 · 巩固填空（${gaps.length} 题）`"
      ><v-expansion-panel-text>
        <p class="text-caption muted mb-3">
          3 道词汇 + 2 道搭配 + 1 道语法 · 已答对 {{ correctCount }} /
          {{ gaps.length }} 题。可切换题目，修改答案后再次核对。
        </p>
        <div class="d-flex flex-wrap ga-2 mb-3">
          <v-btn
            v-for="(item, i) in gaps"
            :key="i"
            size="small"
            :variant="index === i ? 'flat' : 'tonal'"
            color="primary"
            @click="index = i"
            :aria-label="`第 ${i + 1} 题 · ${item.type}${checked[i] ? (isCorrect(i) ? ' · 已答对' : ' · 待订正') : ''}`"
            >{{ i + 1 }} · {{ item.type
            }}{{ checked[i] ? (isCorrect(i) ? " ✓" : " · 待订正") : "" }}</v-btn
          >
        </div>
        <p lang="en" class="text-body-1">{{ q.sentence }}</p>
        <p class="text-caption muted mb-2">{{ q.hint }}</p>
        <v-form @submit.prevent="submit"
          ><v-text-field
            v-model="answers[index]"
            label="填写一个单词或搭配"
            maxlength="180"
            hide-details
            @update:model-value="checked[index] = false"
          /><v-btn
            class="mt-2"
            type="submit"
            :disabled="!answers[index]?.trim() || checked[index]"
            size="small"
            color="primary"
            >核对本题</v-btn
          ></v-form
        >
        <div v-if="checked[index]" class="mt-3" role="status">
          <b
            >{{ isCorrect(index) ? "与参考答案一致" : "与参考答案不同" }} ·
            {{ q.answer }}</b
          >
          <p>{{ q.explanation }}</p>
          <GapFeedback
            :key="index"
            :sentence="q.sentence"
            :focus="lesson.theme + ' · ' + q.hint"
            :reference="q.answer"
            :answer="answers[index]!"
          />
        </div> </v-expansion-panel-text></v-expansion-panel
  ></v-expansion-panels>
</template>
