<script setup lang="ts">
import { inject, onBeforeUnmount, ref, watch } from "vue";
import type { DailyLesson } from "../data/lessons";
import type { TrainerContext } from "../composables/useTrainer";
const props = defineProps<{ lesson: DailyLesson }>();
const { speak } = inject<TrainerContext>("trainer")!;
const mode = ref("all"),
  revealed = ref<number[]>([]);
const playing = ref<number | null>(null);
let request = 0;
function stop() {
  request++;
  if (playing.value !== null) window.speechSynthesis?.cancel();
  playing.value = null;
}
function play(index: number) {
  const same = playing.value === index;
  stop();
  if (same) return;
  const current = request;
  playing.value = index;
  const finish = () => {
    if (current === request) playing.value = null;
  };
  speak(props.lesson.dialogue[index]!.text, finish, finish);
}
onBeforeUnmount(stop);
watch(
  () => props.lesson.day,
  () => {
    stop();
    mode.value = "all";
    revealed.value = [];
  },
);
watch(mode, () => {
  stop();
  revealed.value = [];
});
function hidden(speaker: string, index: number) {
  return mode.value === speaker && !revealed.value.includes(index);
}
</script>
<template>
  <v-card class="content-card mt-5 lesson-dialogue">
    <div class="d-flex flex-wrap justify-space-between align-center ga-3">
      <div>
        <div class="eyebrow">WORDS INTO CONVERSATION</div>
        <h2 class="text-h6 mt-2">今天先学会这段对话</h2>
      </div>
      <v-chip size="small" color="primary" variant="tonal">{{
        lesson.context === "daily" ? "日常交流" : "通用职场"
      }}</v-chip>
    </div>
    <p class="text-body-2 muted mt-2">{{ lesson.conversationGoal }}</p>
    <div class="d-flex flex-wrap ga-2 my-4">
      <v-btn
        v-for="option in [
          { value: 'all', label: '查看完整对话' },
          { value: 'A', label: '我来回答 A' },
          { value: 'B', label: '我来回答 B' },
        ]"
        :key="option.value"
        size="small"
        :variant="mode === option.value ? 'flat' : 'tonal'"
        color="primary"
        @click="mode = option.value"
        >{{ option.label }}</v-btn
      >
    </div>
    <p v-if="mode !== 'all'" class="text-caption muted mb-3">
      先根据中文提示自己说，再核对参考。你的回答可以不同，只要符合场景。
    </p>
    <div
      v-for="(turn, index) in lesson.dialogue"
      :key="index"
      class="dialogue-turn"
      :class="{ 'turn-b': turn.speaker === 'B' }"
    >
      <span class="speaker-mark">{{ turn.speaker }}</span>
      <div class="turn-content">
        <p v-if="!hidden(turn.speaker, index)" lang="en">{{ turn.text }}</p>
        <p v-else class="muted">请先用自己的话回应……</p>
        <p class="text-body-2 muted mt-2">{{ turn.translation }}</p>
        <v-btn
          v-if="hidden(turn.speaker, index)"
          variant="text"
          size="small"
          class="mt-2"
          @click="revealed.push(index)"
          >显示本句参考</v-btn
        >
      </div>
      <v-btn
        v-if="!hidden(turn.speaker, index)"
        size="small"
        variant="text"
        :icon="playing === index ? 'mdi-stop' : 'mdi-volume-medium'"
        :aria-label="`${playing === index ? '停止' : '朗读'}对话第 ${index + 1} 句`"
        :aria-pressed="playing === index"
        @click="play(index)"
      />
    </div>
    <p class="text-caption muted mt-4">
      再换掉人名、物品或安排，把同一组表达用于你自己的生活和工作。
    </p>
  </v-card>
</template>
<style scoped>
.dialogue-turn {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px 0;
}
.dialogue-turn + .dialogue-turn {
  border-top: 1px dashed #dce4d4;
}
.speaker-mark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: #e6edd9;
  color: #284f43;
  font-weight: 700;
}
.turn-b .speaker-mark {
  background: #f5e7d4;
  color: #99603d;
}
.turn-content {
  flex: 1;
  min-width: 0;
}
.turn-content p {
  line-height: 1.8;
  overflow-wrap: anywhere;
}
.turn-content [lang="en"] {
  font-size: 16px;
}
@media (max-width: 390px) {
  .dialogue-turn {
    gap: 8px;
  }
  .turn-content [lang="en"] {
    font-size: 15px;
  }
}
</style>
