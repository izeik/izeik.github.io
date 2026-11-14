<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { DailyLesson } from "../data/lessons";
import { transferTasks } from "../data/transferTasks";
import { useReinforcementStore } from "../stores/reinforcement";
const props = defineProps<{ lesson: DailyLesson }>();
const reinforcement = useReinforcementStore();
const answer = ref(""),
  inspected = ref(false);
const targets = computed(() =>
  props.lesson.vocabulary.filter((w) => w.text.includes(" ")).slice(0, 3),
);
watch(
  () => props.lesson.day,
  () => {
    answer.value = "";
    inspected.value = false;
  },
);
</script>
<template>
  <v-card class="pa-5 mt-5 transfer-task"
    ><div class="eyebrow">MAKE IT YOUR OWN</div>
    <h2 class="text-h6 mt-2">换个场景，说自己的话</h2>
    <v-chip
      v-if="reinforcement.completedTransfers.includes(lesson.day)"
      color="success"
      size="small"
      class="mt-2"
      >本课已自查完成</v-chip
    >
    <p class="mt-3">{{ transferTasks[lesson.day - 1] }}</p>
    <div class="d-flex flex-wrap ga-2 mt-3">
      <v-chip v-for="word in targets" :key="word.id" size="small"
        >{{ word.text }} · {{ word.meaning }}</v-chip
      >
    </div>
    <p class="text-body-2 muted mt-3">
      尝试自然使用其中两个表达，以及“{{
        lesson.grammar.title
      }}”。词形可按语境变化，不必照抄课文。
    </p>
    <v-textarea
      v-model="answer"
      label="写出你的表达（也可以先口头练习，再写要点）"
      rows="3"
      auto-grow
      class="mt-4"
      maxlength="3000"
      @update:model-value="inspected = false"
    /><v-btn color="primary" :disabled="!answer.trim()" @click="inspected = true"
      >展开自查提示</v-btn
    >
    <div v-if="inspected" class="mt-4">
      <ul class="pl-5">
        <li>是否清楚回应了新场景中的问题？</li>
        <li>选用的两个表达是否搭配自然，词形是否符合句子？</li>
        <li>是否用到了当天语法，并检查了主语和时态？</li>
      </ul>
      <p class="text-body-2 muted mt-3">语法参考：{{ lesson.grammar.example }}</p>
      <v-btn
        class="mt-4"
        variant="tonal"
        color="primary"
        :disabled="reinforcement.completedTransfers.includes(lesson.day)"
        @click="reinforcement.completeTransfer(lesson.day)"
        >{{
          reinforcement.completedTransfers.includes(lesson.day)
            ? "本课已自查完成"
            : "我已自查，标记完成"
        }}</v-btn
      >
      <p class="text-caption muted mt-3">
        这是自主表达任务，不自动评判语法。仅保存本课完成标记，不保存逐次回答；离开页面前请自行保留想留下的句子。
      </p>
    </div></v-card
  >
</template>
<style scoped>
p,
li {
  line-height: 1.85;
}
.transfer-task .v-chip {
  height: auto;
  min-height: 28px;
  max-width: 100%;
  padding-block: 5px;
}
.transfer-task :deep(.v-chip__content) {
  white-space: normal;
  overflow-wrap: anywhere;
}
</style>
