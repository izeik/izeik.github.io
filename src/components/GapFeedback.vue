<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from "vue";
const props = defineProps<{
  sentence: string;
  reference: string;
  answer: string;
  focus: string;
}>();
type Feedback = {
  verdict: "natural" | "possible" | "unsuitable";
  reason: string;
  suggestion: string;
  completed: string;
};
const emit = defineEmits<{ reviewed: [feedback: Feedback] }>();
const labels = {
  natural: "用词自然",
  possible: "特定语境下可用",
  unsuitable: "建议调整用词",
};
const feedback = ref<Feedback | null>(null),
  error = ref(""),
  pending = ref(false);
let request: AbortController | undefined;
function reset() {
  request?.abort();
  request = undefined;
  feedback.value = null;
  error.value = "";
  pending.value = false;
}
watch(() => [props.sentence, props.reference, props.answer, props.focus], reset, {
  flush: "sync",
});
onBeforeUnmount(reset);
async function explain() {
  if (pending.value || !props.answer.trim()) return;
  reset();
  const controller = new AbortController();
  request = controller;
  pending.value = true;
  try {
    const response = await fetch("/api/gap-feedback", {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...props }),
    });
    const data = await response.json();
    if (!response.ok) throw Error(data.error || "解析失败，请重试。");
    if (request === controller) {
      feedback.value = data;
      emit("reviewed", data);
    }
  } catch (e) {
    if (request === controller)
      error.value =
        e instanceof SyntaxError
          ? "当前预览缺少 AI 服务，请使用项目的 dev 或 preview 服务打开。"
          : e instanceof Error
            ? e.message
            : "无法连接 AI 服务。";
  } finally {
    if (request === controller) pending.value = false;
  }
}
</script>
<template>
  <div class="mt-3">
    <v-btn
      v-if="!feedback"
      size="small"
      variant="tonal"
      color="primary"
      :loading="pending"
      :disabled="!answer.trim() || answer.length > 180"
      @click="explain"
      >{{ error ? "重试 AI 解析" : "AI 解析我的用词" }}</v-btn
    >
    <div v-if="!feedback" class="text-caption muted mt-1">
      点击后将本题、参考答案和你的填词发送至配置的 AI 服务。
    </div>
    <p v-if="error" role="status" class="text-body-2 mt-2">{{ error }}</p>
    <v-alert
      v-if="feedback"
      role="status"
      density="compact"
      variant="tonal"
      :type="feedback.verdict === 'natural' ? 'success' : 'info'"
      ><strong>AI 解析 · {{ labels[feedback.verdict] }}</strong>
      <p>{{ feedback.reason }}</p>
      <p>
        建议填入 <b>{{ feedback.suggestion }}</b>
      </p>
      <p lang="en">{{ feedback.completed }}</p></v-alert
    >
  </div>
</template>
