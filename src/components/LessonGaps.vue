<script setup lang="ts">
import { computed, ref } from "vue";
import type { DailyLesson } from "../data/lessons";
import { lessonGaps } from "../data/lessonGaps";
import GapFeedback from "./GapFeedback.vue";
const props = defineProps<{ lesson: DailyLesson }>();
const gaps = computed(() => lessonGaps(props.lesson));
const answers = ref<Record<number, string>>({}),
  checked = ref<Record<number, boolean>>({});
const index = ref(0);
const q = computed(() => gaps.value[index.value]!);
const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
function submit() {
  if (answers.value[index.value]?.trim()) checked.value[index.value] = true;
}
</script>
<template>
  <v-expansion-panels class="my-3"
    ><v-expansion-panel :title="`第 ${lesson.day} 天 · 巩固填空（${gaps.length} 题）`"
      ><v-expansion-panel-text>
        <div class="d-flex flex-wrap ga-2 mb-3">
          <v-btn
            v-for="(item, i) in gaps"
            :key="i"
            size="small"
            :variant="index === i ? 'flat' : 'tonal'"
            color="primary"
            @click="index = i"
            >{{ i + 1 }} · {{ item.type }}{{ checked[i] ? " ✓" : "" }}</v-btn
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
            >{{
              normalize(answers[index]!) === normalize(q.answer)
                ? "与参考答案一致"
                : "与参考答案不同"
            }}
            · {{ q.answer }}</b
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
