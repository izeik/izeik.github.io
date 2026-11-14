<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import type { TrainerContext } from "../composables/useTrainer";
import { dailyLessons } from "../data/lessons";
import { transferTasks } from "../data/transferTasks";
import { COURSE_REVISION } from "../data/courseRevision";
const { store, speak } = inject<TrainerContext>("trainer")!;
const emit = defineEmits<{
  openModule: [page: "vocabulary" | "reading" | "speaking" | "grammar"];
}>();
const panels = ref<string[]>([]);
const date = computed(() => store.currentDate);
type Entry = { done: number[]; notes: string };
const records = ref<Record<string, Entry>>({});
const saveError = ref(false);
try {
  const saved = JSON.parse(localStorage.getItem("eet-study-sessions-v1") || "{}");
  for (const [key, value] of Object.entries(saved || {})) {
    const item = value as Entry;
    if (item && Array.isArray(item.done) && typeof item.notes === "string")
      records.value[key] = {
        done: [
          ...new Set(item.done.filter((n) => Number.isInteger(n) && n >= 0 && n < 6)),
        ],
        notes: item.notes,
      };
  }
} catch {
  saveError.value = true;
}
watch(
  records,
  (value) => {
    try {
      localStorage.setItem("eet-study-sessions-v1", JSON.stringify(value));
      saveError.value = false;
    } catch {
      saveError.value = true;
    }
  },
  { deep: true },
);
const key = computed(() => `${COURSE_REVISION}:${date.value}:${store.selectedPlanDay}`);
const entry = computed(() => records.value[key.value] ?? { done: [], notes: "" });
function toggle(index: number) {
  const old = entry.value;
  records.value[key.value] = {
    ...old,
    done: old.done.includes(index)
      ? old.done.filter((n) => n !== index)
      : [...old.done, index],
  };
}
function saveNotes(value: string) {
  records.value[key.value] = { ...entry.value, notes: value };
}
const blocks = [
  {
    title: "主动回忆",
    page: "vocabulary",
    task: "遮住英文，看中文回忆复习词；每个词说一句自己的话。首日用这段时间检查已会的表达。",
  },
  {
    title: "核心表达",
    page: "vocabulary",
    task: "优先练下面的核心词与补充表达。每项造一个与自己有关的句子；其余专业词先做到能理解。",
  },
  {
    title: "听读理解",
    page: "reading",
    task: "先听文章抓主旨，再读原文核对；完成理解题，最后不看原文口头复述。",
  },
  {
    title: "逐句跟读",
    page: "reading",
    task: "在当天文章中选 5 句，点击句子听读，逐句模仿，再连起来复述；重点练停顿与重音。",
  },
  {
    title: "情景输出",
    page: "speaking",
    task: "先完成下面的双角色任务，再进入情景口语。两种角色轮流说，第二遍尽量不看提示。",
  },
  {
    title: "语法与复盘",
    page: "grammar",
    task: "用当天语法改写 3 句话；记录今天说不出的表达，并写出明天要再次尝试的句子。",
  },
] as const;
const planned = blocks.length;
function startBlock(index: number) {
  if (index === 0) {
    const panel = store.selectedPlanDay === 1 ? "core" : "review";
    reveal.value = false;
    panels.value = [panel];
    document.getElementById(`study-${panel}`)?.scrollIntoView({ block: "start" });
    return;
  }
  emit("openModule", blocks[index]!.page);
}
const confirmed = computed(() => entry.value.done.length);
const lesson = computed(() => dailyLessons[store.selectedPlanDay - 1]!);
const core = computed(() => [
  ...lesson.value.vocabulary.filter((word) => !word.text.includes(" ")).slice(0, 4),
  ...lesson.value.vocabulary.filter((word) => word.text.includes(" ")).slice(0, 4),
]);
const reviewDays = computed(() =>
  [1, 3, 7].map((offset) => store.selectedPlanDay - offset).filter((day) => day > 0),
);
const reviewWords = computed(() => [
  ...new Map(
    reviewDays.value
      .flatMap((day) => [
        ...dailyLessons[day - 1]!.vocabulary.filter((w) => !w.text.includes(" ")).slice(
          0,
          2,
        ),
        ...dailyLessons[day - 1]!.vocabulary.filter((w) => w.text.includes(" ")).slice(
          0,
          2,
        ),
      ])
      .map((w) => [w.text, w]),
  ).values(),
]);
const reveal = ref(false);
watch(
  () => store.selectedPlanDay,
  () => {
    reveal.value = false;
  },
);
const prompts = computed(() =>
  lesson.value.dialogue
    .slice(0, 2)
    .map((turn, index) => [
      `角色 ${turn.speaker}`,
      turn.text,
      turn.translation,
      index === 0
        ? transferTasks[store.selectedPlanDay - 1]!
        : "先回应对方的问题，再补一个相关追问；可换成自己的情况。",
    ]),
);
</script>

<template>
  <v-card class="pa-4 my-4 study-session">
    <div class="d-flex flex-wrap align-center justify-space-between ga-2">
      <div>
        <h2 class="text-h6 font-weight-bold">学习步骤 · 从理解到开口</h2>
        <div class="text-caption muted">
          {{ date }} · 第 {{ store.selectedPlanDay }} 天 · 完成后自主勾选，可取消
        </div>
      </div>
      <v-chip color="primary">{{ confirmed }} / {{ planned }} 项已完成</v-chip>
    </div>
    <v-progress-linear
      :model-value="(confirmed / planned) * 100"
      color="primary"
      rounded
      height="6"
      class="my-3"
      aria-label="学习步骤完成比例"
    />
    <div class="text-caption muted mb-3">
      按自己的节奏完成这些步骤，可分多次进行。勾选只表示你完成了练习，不代表自动评估掌握程度。
    </div>
    <div class="study-blocks">
      <div v-for="(block, index) in blocks" :key="block.title" class="study-block">
        <div class="d-flex align-center ga-2">
          <v-checkbox-btn
            :model-value="entry.done.includes(index)"
            :aria-label="`确认完成${block.title}`"
            color="primary"
            @update:model-value="toggle(index)"
          /><b>{{ index + 1 }}. {{ block.title }}</b>
        </div>
        <p class="text-body-2 muted my-2">{{ block.task }}</p>
        <v-btn size="small" variant="tonal" color="primary" @click="startBlock(index)">{{
          index === 0 ? "开始回忆" : "进入练习"
        }}</v-btn>
      </div>
    </div>
    <v-expansion-panels v-model="panels" class="mt-3" variant="accordion" multiple>
      <v-expansion-panel
        value="core"
        id="study-core"
        title="今日核心表达 · 优先会用，再换成自己的情境"
      >
        <v-expansion-panel-text
          ><div class="d-flex flex-wrap ga-2">
            <v-chip v-for="word in core" :key="word.id" @click="speak(word.example)"
              >{{ word.text }} · {{ word.meaning }}</v-chip
            >
          </div>
          <p class="text-caption muted mt-2">
            点击听文章例句；今天先重点练这
            {{ core.length }}
            项，其余词仍保留在原课程中。重复遇见的词可作为复习，不要求每天背 20 个新词。
          </p></v-expansion-panel-text
        >
      </v-expansion-panel>
      <v-expansion-panel
        value="review"
        id="study-review"
        title="间隔复习 · 看中文回忆英文"
      >
        <v-expansion-panel-text
          ><p v-if="!reviewDays.length">
            这是第 1 天：先检查核心表达，把不会说的记在复盘里。
          </p>
          <template v-else
            ><p class="text-caption muted">
              复习第 {{ reviewDays.join("、") }} 天：按课程顺序回看前 1、3、7
              课，并非按实际学习日期到期。
            </p>
            <v-btn size="small" variant="text" @click="reveal = !reveal">{{
              reveal ? "遮住英文" : "核对英文"
            }}</v-btn>
            <div class="d-flex flex-wrap ga-2">
              <v-chip v-for="word in reviewWords" :key="word.text"
                >{{ word.meaning }}<span v-if="reveal"> · {{ word.text }}</span></v-chip
              >
            </div></template
          ></v-expansion-panel-text
        >
      </v-expansion-panel>
      <v-expansion-panel value="conversation" title="本课主题 · 双角色口头输出">
        <v-expansion-panel-text
          ><div class="study-blocks">
            <div v-for="(prompt, index) in prompts" :key="prompt[0]" class="study-block">
              <v-chip size="small" color="secondary"
                >{{ index ? "角色 B" : "角色 A" }} · {{ prompt[0] }}</v-chip
              >
              <p class="my-2 font-weight-medium">{{ prompt[1] }}</p>
              <p class="text-body-2 muted">{{ prompt[2] }}</p>
              <v-btn size="small" variant="text" @click="speak(prompt[1])">听示范</v-btn>
              <p class="text-body-2">{{ prompt[3] }}</p>
              <p class="text-caption muted mt-2">
                先借助示范完成问答，再换成自己的情境，不看英文重新表达，并加入追问和原因。
              </p>
            </div>
          </div>
          <p class="text-caption mt-3">
            再用当天文章中的 2 个表达和 1 个语法点，总结“{{
              lesson.theme
            }}”。不合场景的技术词不必硬塞进日常对话。
          </p></v-expansion-panel-text
        >
      </v-expansion-panel>
      <v-expansion-panel value="notes" title="学习复盘 · 保存自己的表达">
        <v-expansion-panel-text
          ><v-textarea
            :model-value="entry.notes"
            label="今天说不出的表达 / 改写后的句子 / 明天再练什么"
            rows="4"
            auto-grow
            @update:model-value="saveNotes"
          />
          <div class="text-caption muted">
            按日期和课程分别保存在本浏览器。此处不提供自动纠错。
          </div></v-expansion-panel-text
        >
      </v-expansion-panel>
    </v-expansion-panels>
    <v-alert v-if="saveError" type="warning" class="mt-3"
      >本地记录读取或保存失败，请先复制复盘内容以免丢失。</v-alert
    >
  </v-card>
</template>

<style scoped>
.study-blocks {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.study-block {
  border: 1px solid #e4e3ef;
  border-radius: 10px;
  padding: 12px;
  background: #faf9ff;
}
.study-block p {
  line-height: 1.65;
}
@media (max-width: 1100px) {
  .study-blocks {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 599px) {
  .study-blocks {
    grid-template-columns: 1fr;
  }
}
</style>
