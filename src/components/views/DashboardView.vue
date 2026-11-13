<script setup lang="ts">
import { computed, inject, watch } from "vue";
import LessonGaps from "../LessonGaps.vue";
import StudySession from "../StudySession.vue";
import type { TrainerContext } from "../../composables/useTrainer";
import { monthlyLearningPlan } from "../../data/learningPlan";

const context = inject<TrainerContext>("trainer")!;
const { store, page, grammarIndex, expressions, grammar, filter, search } = context;

const lessonDayOptions = monthlyLearningPlan.map((lesson) => ({
  title: `第 ${lesson.day} 天 · ${lesson.theme}`,
  value: lesson.day,
}));
const lesson = computed(
  () => monthlyLearningPlan[store.selectedPlanDay - 1] ?? monthlyLearningPlan[0]!,
);
const directMatchCount = computed(() => lesson.value.articleVocabularyIds.length);

function selectVocabulary() {
  const selected = lesson.value;
  const sameLesson =
    store.planVocabularyIds.length === selected.vocabularyIds.length &&
    selected.vocabularyIds.every((id, i) => store.planVocabularyIds[i] === id);
  if (!sameLesson || !selected.vocabularyIds.includes(store.expressionIndex + 1)) {
    store.expressionIndex = selected.vocabularyIds[0]! - 1;
  }
  store.planVocabularyIds = selected.vocabularyIds;
  filter.value = "全部";
  search.value = "";
}

function selectGrammar() {
  grammarIndex.value = grammar.findIndex((item) => item.id === lesson.value.grammar.id);
}

watch(
  () => store.selectedPlanDay,
  () => {
    selectVocabulary();
    store.selectedArticleId = lesson.value.article.id;
    selectGrammar();
  },
);

function openModule(module: "vocabulary" | "reading" | "grammar" | "speaking") {
  if (module === "vocabulary") selectVocabulary();
  if (module === "reading") store.selectedArticleId = lesson.value.article.id;
  if (module === "grammar") selectGrammar();
  page.value = module;
}
</script>

<template>
  <section>
    <v-card class="gradient-card pa-4 pa-md-5 mb-4">
      <div class="d-flex flex-wrap justify-space-between align-center ga-5">
        <div>
          <div class="text-overline">30-DAY TOPIC LIBRARY</div>
          <div class="text-h4 font-weight-bold mt-1">自由选择今天想学的内容</div>
          <div class="mt-2 text-white" style="opacity: 0.88">
            不用按顺序完成。每一天都包含词汇、文章和语法，你可以从任意一天、任意模块开始。
          </div>
        </div>
        <v-select
          v-model="store.selectedPlanDay"
          :items="lessonDayOptions"
          label="选择学习日"
          variant="solo"
          density="comfortable"
          hide-details
          class="lesson-day-select"
          aria-label="选择学习日"
        />
      </div>
    </v-card>

    <LessonGaps :key="lesson.day" :lesson="lesson" />
    <StudySession @open-module="openModule" />
    <v-row class="lesson-metrics mb-1">
      <v-col cols="12" sm="4">
        <v-card class="pa-4 h-100">
          <div class="eyebrow">今日练习估算</div>
          <div class="metric-value mt-2">
            {{ store.todayMinutes }}<small class="text-body-2 ml-1">分钟</small>
          </div>
          <div class="text-caption muted mt-1">按练习操作估算，非实际计时</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-4 h-100">
          <div class="eyebrow">当前选择</div>
          <div class="metric-value mt-2">
            {{ lesson.day }}<small class="text-body-2 ml-1">/ 30 天</small>
          </div>
          <div class="text-caption muted mt-1">{{ lesson.theme }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-4 h-100">
          <div class="eyebrow">词库积累</div>
          <div class="metric-value mt-2">
            {{ store.mastered.length }}<small class="text-body-2 ml-1">已掌握</small>
          </div>
          <div class="text-caption muted mt-1">
            从 {{ expressions.length }} 个表达中复习
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="d-flex flex-wrap justify-space-between align-end ga-2 mt-4 mb-3">
      <div>
        <div class="text-h6 font-weight-bold">
          第 {{ lesson.day }} 天 · {{ lesson.theme }}
        </div>
        <div class="text-caption muted mt-1">
          词汇、文章和语法按主题关联。选择任意一项开始。
        </div>
      </div>
    </div>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-4 pa-md-5 h-100" variant="outlined">
          <div class="d-flex flex-wrap justify-space-between align-start ga-3">
            <div>
              <v-chip size="small" color="primary" variant="tonal">20 个今日表达</v-chip>
              <div class="text-body-2 mt-3">
                词组会在所选日课中固定保存；可单独学习或回看。
              </div>
            </div>
            <v-btn
              color="primary"
              prepend-icon="mdi-book-open-variant"
              @click="openModule('vocabulary')"
            >
              学习词汇
            </v-btn>
          </div>
          <div class="d-flex flex-wrap ga-1 mt-4">
            <v-chip
              v-for="item in lesson.vocabulary"
              :key="item.id"
              size="small"
              variant="tonal"
              >{{ item.text }}</v-chip
            >
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4 pa-md-5 h-100" variant="outlined">
          <v-chip size="small" color="info" variant="tonal">关联阅读</v-chip>
          <div class="text-h6 font-weight-bold mt-3">{{ lesson.article.title }}</div>
          <div class="text-body-2 mt-1">
            {{ lesson.article.topic }} · {{ lesson.article.level }}
          </div>
          <div class="text-caption muted mt-3">{{ lesson.article.summary }}</div>
          <div class="text-caption muted mt-2">
            <template v-if="directMatchCount">
              {{ directMatchCount }} 个今日词组直接出现在文章中
            </template>
            <template v-else>围绕当日主题的阅读文章</template>
          </div>
          <v-btn
            class="mt-4"
            color="primary"
            variant="tonal"
            prepend-icon="mdi-book-open-page-variant"
            @click="openModule('reading')"
          >
            阅读文章
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4 pa-md-5 h-100" variant="outlined">
          <v-chip size="small" color="deep-purple" variant="tonal">文章语法</v-chip>
          <div class="text-h6 font-weight-bold mt-3">{{ lesson.grammar.title }}</div>
          <div class="text-body-2 mt-2">{{ lesson.grammar.explanation }}</div>
          <div class="text-caption mt-3">
            <span class="muted">文章例句：</span>
            <span class="font-italic">{{ lesson.grammar.example }}</span>
          </div>
          <v-btn
            class="mt-4"
            color="primary"
            variant="tonal"
            prepend-icon="mdi-text-box-check-outline"
            @click="openModule('grammar')"
          >
            练习语法
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-caption muted mt-4">
      你的学习日选择会自动保存，下次打开可以继续学习。
    </div>
  </section>
</template>

<style scoped>
.lesson-day-select {
  flex: 1 1 320px;
  max-width: 420px;
}
</style>
