<script setup lang="ts">
import { ref } from "vue";
import type { Expression } from "../data/expressions";
import { useWordLookup } from "../composables/useWordLookup";

const props = defineProps<{ word: string; expressions: Expression[] }>();
const { lookupWord } = useWordLookup();
const result = ref<Awaited<ReturnType<typeof lookupWord>> | null>(null);
const loading = ref(false);
async function loadMeaning() {
  if (loading.value || (result.value && result.value.source !== "unavailable")) return;
  loading.value = true;
  result.value = await lookupWord(props.word, props.expressions);
  loading.value = false;
}
</script>

<template>
  <v-tooltip
    location="top"
    :open-on-hover="true"
    :open-on-focus="true"
    :open-on-click="true"
    :interactive="true"
    :max-width="280"
  >
    <template #activator="{ props: activatorProps }">
      <button
        v-bind="activatorProps"
        type="button"
        class="word-lookup"
        :aria-label="`查看 ${word} 的释义和词性`"
        @mouseenter="loadMeaning"
        @focus="loadMeaning"
        @click.stop="loadMeaning"
      >
        {{ word }}
      </button>
    </template>
    <div class="word-bubble">
      <div class="d-flex align-center ga-2">
        <strong>{{ word }}</strong>
        <span v-if="result?.partOfSpeech" class="word-pos">{{
          result.partOfSpeech
        }}</span>
      </div>
      <div v-if="loading" class="mt-1">正在查词…</div>
      <div v-else-if="result" class="mt-1">{{ result.meaning }}</div>
      <div
        v-if="result?.englishDefinition && result.meaning !== result.englishDefinition"
        class="word-definition mt-1"
      >
        {{ result.englishDefinition }}
      </div>
      <div v-if="result?.source === 'unavailable'" class="word-definition mt-1">
        外部词典暂不可用，请稍后再试。
      </div>
    </div>
  </v-tooltip>
</template>

<style scoped>
.word-lookup {
  color: inherit;
  cursor: help;
  border-bottom: 1px dotted #7869dc;
  font: inherit;
  line-height: inherit;
  padding: 0 1px;
}
.word-lookup:hover,
.word-lookup:focus-visible {
  background: #eeeaff;
  border-radius: 3px;
  outline: none;
}
.word-bubble {
  padding: 8px 10px;
  font-size: 0.875rem;
  line-height: 1.45;
}
.word-pos {
  color: #d7d3ff;
  font-size: 0.75rem;
}
.word-definition {
  color: #d9d7e4;
  font-size: 0.75rem;
}
</style>
