<script setup lang="ts">
import { computed, inject } from "vue";
import type { GrammarFocus } from "../data/lessons/shared";
import type { TrainerContext } from "../composables/useTrainer";
import { grammarHint } from "../data/grammarHints";
import { tenseById } from "../data/tenses";
const props = defineProps<{ focus: Pick<GrammarFocus, "id" | "title"> }>();
const trainer = inject<TrainerContext>("trainer")!;
const hint = computed(() => grammarHint(props.focus));
function open(id?: string) {
  if (id) trainer.tenseId.value = id;
  trainer.page.value = "tenses";
  window.scrollTo({ top: 0, behavior: "instant" });
}
</script>
<template>
  <aside class="grammar-tense-hint" aria-label="本题的时态与句型提示">
    <div class="eyebrow"><v-icon size="18">mdi-clock-outline</v-icon> 时态与句型提示</div>
    <p class="font-weight-bold mt-2">{{ hint.label }}</p>
    <p class="text-body-2 mt-2">{{ hint.structure }}</p>
    <p class="text-body-2 muted mt-2">{{ hint.note }}</p>
    <div class="d-flex flex-wrap ga-2 mt-3">
      <v-btn
        v-for="id in hint.tenseIds"
        :key="id"
        size="small"
        variant="tonal"
        color="primary"
        @click="open(id)"
        >练{{ tenseById(id).name }}</v-btn
      >
      <v-btn
        v-if="!hint.tenseIds.length"
        size="small"
        variant="text"
        color="primary"
        @click="open()"
        >打开英语时态练习</v-btn
      >
    </div>
  </aside>
</template>
<style scoped>
.grammar-tense-hint {
  padding: 18px;
  border: 1px solid #d9e3d5;
  border-radius: 16px;
  background: #f4f7ee;
  align-self: start;
  min-width: 0;
}
</style>
