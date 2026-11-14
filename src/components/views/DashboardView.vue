<script setup lang="ts">
import GrammarTenseHint from "../GrammarTenseHint.vue";
import { computed, inject, watch } from "vue";
import LessonDialogue from "../LessonDialogue.vue";
import LessonGaps from "../LessonGaps.vue";
import TransferTask from "../TransferTask.vue";
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
const singleWordCount = computed(
  () => lesson.value.vocabulary.filter((word) => !word.text.includes(" ")).length,
);
const vocabularyGroups = computed(() =>
  lesson.value.vocabularyGroups.map((group) => ({
    title: group.title,
    words: group.vocabularyIds.map((id) =>
      lesson.value.vocabulary.find((word) => word.id === id)!,
    ),
  })),
);

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
const masteredInLesson = computed(
  () => lesson.value.vocabularyIds.filter((id) => store.mastered.includes(id)).length,
);
const learningRoutes = [
  {
    id: "vocabulary",
    icon: "mdi-cards-outline",
    title: "积累核心表达",
    detail: "20 个单词与搭配",
    color: "sage",
  },
  {
    id: "reading",
    icon: "mdi-book-open-page-variant-outline",
    title: "放进真实语境",
    detail: "一篇主题阅读",
    color: "peach",
  },
  {
    id: "grammar",
    icon: "mdi-puzzle-outline",
    title: "理解句子的逻辑",
    detail: "一个语法重点",
    color: "lavender",
  },
  {
    id: "speaking",
    icon: "mdi-microphone-outline",
    title: "说出自己的故事",
    detail: "把输入变成表达",
    color: "butter",
  },
] as const;
</script>

<template>
  <section class="learning-dashboard">
    <div class="dashboard-heading">
      <div>
        <div class="eyebrow">MAKE ROOM FOR ENGLISH</div>
        <h1>今天，也进步一点。</h1>
        <p>从一个表达开始，把英语慢慢变成自己的语言。</p>
      </div>
      <v-select
        v-model="store.selectedPlanDay"
        :items="lessonDayOptions"
        label="选择学习日"
        variant="outlined"
        density="compact"
        hide-details
        class="lesson-day-select"
        aria-label="选择学习日"
      />
    </div>

    <div class="learning-hero">
      <div class="hero-copy">
        <span class="hero-tag"
          ><span></span>30 天主题学习 · DAY
          {{ String(lesson.day).padStart(2, "0") }}</span
        >
        <h2>{{ lesson.theme }}</h2>
        <p>学会实用的表达，读懂一个故事。<br />今天的每一步，都在为下一次开口做准备。</p>
        <div class="hero-actions">
          <v-btn
            color="secondary"
            size="large"
            append-icon="mdi-arrow-right"
            @click="openModule('vocabulary')"
            >开始今天的学习</v-btn
          ><button class="hero-reading" @click="openModule('reading')">
            <v-icon size="19">mdi-book-open-outline</v-icon>先读一篇文章
          </button>
        </div>
        <div class="hero-meta">
          <span><v-icon size="15">mdi-cards-outline</v-icon>20 个表达</span
          ><span><v-icon size="15">mdi-form-textbox</v-icon>6 道巩固练习</span
          ><span>自由选择 · 按自己的节奏</span>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="art-orbit"></div>
        <span class="art-spark spark-one">✳</span
        ><span class="art-spark spark-two">✦</span>
        <div class="art-card back-card">
          <span>one word at a time.</span>
          <div class="book-lines"></div>
        </div>
        <div class="art-card front-card">
          <span class="art-card-label">A LITTLE EVERY DAY</span>
          <div class="art-letters">Aa<span>↗</span></div>
          <div class="art-card-bottom">
            <span>learn. use. repeat.</span><v-icon size="25">mdi-leaf</v-icon>
          </div>
        </div>
        <div class="art-speech">
          <v-icon size="23">mdi-volume-high</v-icon>
          <div><b>Hello, world.</b><span>让表达，自然发生。</span></div>
        </div>
      </div>
    </div>

    <div class="dashboard-stats">
      <div class="stat-tile">
        <span class="stat-icon sage"><v-icon>mdi-notebook-edit-outline</v-icon></span>
        <div>
          <span class="stat-label">待巩固题目</span>
          <div class="stat-number">
            {{ store.errors.filter((e) => !e.resolved).length }}<small>条待复习</small>
          </div>
          <span class="stat-note">从薄弱处开始复习</span>
        </div>
      </div>
      <div class="stat-tile">
        <span class="stat-icon peach"><v-icon>mdi-sprout-outline</v-icon></span>
        <div>
          <span class="stat-label">本课已掌握</span>
          <div class="stat-number">{{ masteredInLesson }}<small>/ 20 个表达</small></div>
          <span class="stat-note">每一次回忆都算数</span>
        </div>
      </div>
      <button class="stat-tile stat-link" @click="page = 'statistics'">
        <span class="stat-icon lavender"
          ><v-icon>mdi-chart-timeline-variant</v-icon></span
        >
        <div>
          <span class="stat-label">词库积累</span>
          <div class="stat-number">
            {{ store.mastered.length }}<small>个已掌握</small>
          </div>
          <span class="stat-note">探索 {{ expressions.length }} 个实用表达</span>
        </div>
        <v-icon class="stat-arrow" size="18">mdi-arrow-top-right</v-icon>
      </button>
    </div>

    <v-card
      class="pa-5 mt-5 d-flex flex-wrap align-center justify-space-between ga-4"
      variant="tonal"
      color="primary"
      ><div>
        <div class="eyebrow">NEW · WORDS IN CONTEXT</div>
        <h2 class="text-h6 mt-2">进阶看图刷词 · 1024 词</h2>
        <p class="text-body-2 mt-2">
          例句与场景图，四选一辨义；刷完还可把同一批词再拼一轮。
        </p>
      </div>
      <v-btn color="primary" append-icon="mdi-arrow-right" @click="page = 'pictureDrill'"
        >开始看图刷词</v-btn
      ></v-card
    >
    <LessonDialogue :key="`dialogue-${lesson.day}`" :lesson="lesson" />
    <div class="section-heading mt-6">
      <div>
        <div class="eyebrow">YOUR LEARNING PATH</div>
        <h2>本课学习地图</h2>
      </div>
      <span class="section-note">理解 → 巩固 → 开口</span>
    </div>
    <div class="lesson-layout">
      <div class="lesson-content">
        <v-card class="vocabulary-overview content-card">
          <div class="card-heading">
            <span class="section-icon sage"><v-icon>mdi-cards-outline</v-icon></span>
            <div>
              <h3>把词汇串成一个场景</h3>
              <p>
                {{ singleWordCount }} 个单词 · {{ 20 - singleWordCount }} 个短语 ·
                全部关联当日文章
              </p>
            </div>
            <span class="card-index">01</span>
          </div>
          <div
            v-for="(group, index) in vocabularyGroups"
            :key="group.title"
            class="vocabulary-group"
          >
            <div class="group-title">
              <span>0{{ index + 1 }}</span>
              <h4>{{ group.title }}</h4>
            </div>
            <div class="vocabulary-chips">
              <v-chip
                v-for="item in group.words"
                :key="item.id"
                class="lesson-vocabulary-chip"
                size="small"
                variant="tonal"
                >{{ item.text
                }}<span class="chip-meaning">{{ item.meaning }}</span></v-chip
              >
            </div>
          </div>
          <div class="card-footer">
            <span>先联想，再回忆，最后放进句子里。</span
            ><v-btn
              variant="text"
              color="primary"
              append-icon="mdi-arrow-right"
              @click="openModule('vocabulary')"
              >学习词汇</v-btn
            >
          </div>
        </v-card>
        <div class="lesson-pair">
          <v-card class="content-card reading-preview"
            ><span class="mini-label"
              ><v-icon size="17">mdi-book-open-outline</v-icon>READ & DISCOVER</span
            >
            <h3>{{ lesson.article.title }}</h3>
            <p>{{ lesson.article.summary }}</p>
            <div class="preview-bottom">
              <span>{{ directMatchCount }} 个表达融入故事</span
              ><v-btn
                variant="text"
                color="primary"
                icon="mdi-arrow-top-right"
                aria-label="阅读文章"
                @click="openModule('reading')"
              /></div
          ></v-card>
          <v-card class="content-card grammar-preview"
            ><span class="mini-label"
              ><v-icon size="17">mdi-puzzle-outline</v-icon>NOTICE THE PATTERN</span
            >
            <h3>{{ lesson.grammar.title }}</h3>
            <p class="grammar-example">{{ lesson.grammar.example }}</p>
            <GrammarTenseHint :focus="lesson.grammar" class="mt-3" />
            <div class="preview-bottom">
              <span>读懂句子背后的规律</span
              ><v-btn
                variant="text"
                color="primary"
                icon="mdi-arrow-top-right"
                aria-label="练习语法"
                @click="openModule('grammar')"
              /></div
          ></v-card>
        </div>
      </div>
      <aside class="lesson-rail" aria-label="本课学习路线">
        <v-card class="route-card content-card"
          ><div class="eyebrow">ONE STEP AT A TIME</div>
          <h3>跟着路线，轻松开始</h3>
          <div class="route-list">
            <button
              v-for="(route, index) in learningRoutes"
              :key="route.id"
              class="route-step"
              @click="openModule(route.id)"
            >
              <span :class="['route-icon', route.color]"
                ><v-icon size="21">{{ route.icon }}</v-icon></span
              ><span
                ><b>{{ route.title }}</b
                ><small>{{ route.detail }}</small></span
              ><span class="route-number">{{ String(index + 1).padStart(2, "0") }}</span>
            </button>
          </div>
          <div class="lesson-progress">
            <div>
              <span>本课词汇掌握</span><b>{{ masteredInLesson }} / 20</b>
            </div>
            <v-progress-linear
              :model-value="masteredInLesson * 5"
              height="6"
              rounded
              color="primary"
              class="mt-3"
            /></div
        ></v-card>
        <div class="learning-tip">
          <span class="tip-symbol">✳</span>
          <div class="eyebrow">A GENTLE REMINDER</div>
          <h3>不用一次学会所有。</h3>
          <p>今天记住一个词，明天用出一句话。小小的重复，会带来真正的改变。</p>
          <span>Enjoy the process.</span>
        </div>
      </aside>
    </div>

    <v-expansion-panels v-if="lesson.extensionVocabulary.length" class="mt-5"
      ><v-expansion-panel
        title="可选 · 软件开发与技术支持扩展（不计入本课 20 个核心词条）"
        ><v-expansion-panel-text
          ><p class="text-body-2 muted mb-3">
            适用于相关行业；通用对话可先跳过。原专业词库仍可从完整词库查阅。
          </p>
          <div v-for="word in lesson.extensionVocabulary" :key="word.id" class="mb-4">
            <b>{{ word.text }}</b> · {{ word.meaning }}
            <p class="text-body-2 mt-2">{{ word.example }}</p>
          </div></v-expansion-panel-text
        ></v-expansion-panel
      ></v-expansion-panels
    >
    <div class="section-heading practice-heading">
      <div>
        <div class="eyebrow">PUT IT INTO PRACTICE</div>
        <h2>现在，试着回忆一下</h2>
      </div>
      <span class="section-note">不用赶进度，想清楚再回答。</span>
    </div>
    <LessonGaps :key="lesson.day" :lesson="lesson" />
    <TransferTask :key="`transfer-${lesson.day}`" :lesson="lesson" />
    <v-expansion-panels class="session-wrapper mt-5"
      ><v-expansion-panel title="按自己的节奏，展开学习步骤"
        ><v-expansion-panel-text
          ><StudySession
            @open-module="openModule" /></v-expansion-panel-text></v-expansion-panel
    ></v-expansion-panels>
    <div class="save-note">
      <v-icon size="15">mdi-content-save-check-outline</v-icon
      >学习日选择和掌握记录会自动保存在此设备。
    </div>
  </section>
</template>
