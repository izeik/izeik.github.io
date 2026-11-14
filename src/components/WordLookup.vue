<script setup lang="ts">
import { ref, watch } from "vue";
import type { Expression } from "../data/expressions";
import { useWordLookup } from "../composables/useWordLookup";

const props = defineProps<{
  word: string;
  lookup?: string;
  phrase?: boolean;
  expressions: Expression[];
}>();
const { lookupWord } = useWordLookup();
const result = ref<Awaited<ReturnType<typeof lookupWord>> | null>(null);
const loading = ref(false);
let version = 0;
watch(
  () => [props.word, props.lookup, props.expressions],
  () => {
    version++;
    result.value = null;
    loading.value = false;
  },
);
async function loadMeaning() {
  if (loading.value || (result.value && result.value.source !== "unavailable")) return;
  loading.value = true;
  const active = ++version;
  const value = await lookupWord(props.lookup ?? props.word, props.expressions);
  if (active === version) {
    result.value = value;
    loading.value = false;
  }
}
</script>

<template>
  <v-menu
    location="top"
    :open-on-hover="true"
    :open-on-focus="true"
    :open-on-click="true"
    :open-delay="150"
    :close-delay="180"
    :close-on-content-click="false"
    :max-width="280"
  >
    <template #activator="{ props: activatorProps }">
      <button
        v-bind="activatorProps"
        type="button"
        class="word-lookup"
        :class="{ 'phrase-lookup': phrase }"
        :aria-label="`查看 ${word} 的释义和词性`"
        @mouseenter="loadMeaning"
        @focus="loadMeaning"
        @click.stop="loadMeaning"
      >
        {{ word }}
      </button>
    </template>
    <div class="word-bubble" role="note">
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
  </v-menu>
</template>

<style scoped>
.word-lookup {
  color: inherit;
  cursor: help;
  border-bottom: 1px dotted #9aab8a;
  font: inherit;
  line-height: inherit;
  padding: 0 1px;
}
.word-lookup:hover,
.word-lookup:focus-visible {
  background: #eaf0df;
  border-radius: 3px;
  outline: none;
}
.phrase-lookup {
  border-bottom-style: solid;
  border-bottom-width: 2px;
}
.word-bubble {
  background: #fffef8;
  color: #284f43;
  border: 1px solid #dce5d2;
  border-radius: 12px;
  box-shadow: 0 8px 28px #203e3420;
  padding: 14px 16px;
  font-size: 0.875rem;
  line-height: 1.45;
}
.word-pos {
  color: #617354;
  font-size: 0.75rem;
}
.word-definition {
  color: #647060;
  font-size: 0.75rem;
}
</style>
