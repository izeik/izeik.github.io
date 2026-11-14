<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { useTrainer } from "./composables/useTrainer";
import DashboardView from "./components/views/DashboardView.vue";
import VocabularyView from "./components/views/VocabularyView.vue";
import SpeakingView from "./components/views/SpeakingView.vue";
import PronunciationView from "./components/views/PronunciationView.vue";
import GrammarView from "./components/views/GrammarView.vue";
import ErrorsView from "./components/views/ErrorsView.vue";
import StatisticsView from "./components/views/StatisticsView.vue";
import ReadingView from "./components/views/ReadingView.vue";

const trainer = useTrainer();
provide("trainer", trainer);
const { store, nav, page, notice } = trainer;
const views = {
  dashboard: DashboardView,
  vocabulary: VocabularyView,
  reading: ReadingView,
  speaking: SpeakingView,
  pronunciation: PronunciationView,
  grammar: GrammarView,
  errors: ErrorsView,
  statistics: StatisticsView,
};
const activeView = computed(() => views[page.value as keyof typeof views]);
const moreOpen = ref(false);
const primaryNav = computed(() => nav.slice(0, 6));
const secondaryNav = computed(() => nav.slice(6));
const mobileNav = computed(() =>
  nav.filter((item) =>
    ["dashboard", "vocabulary", "reading", "speaking"].includes(item.id),
  ),
);
const currentLabel = computed(() => nav.find((item) => item.id === page.value)?.label);
function navigate(id: string) {
  page.value = id;
  moreOpen.value = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}
</script>

<template>
  <v-app>
    <a class="skip-link" href="#main-content">跳到学习内容</a>
    <aside class="app-sidebar" aria-label="主导航">
      <button
        class="brand"
        aria-label="Everyday English 学习首页"
        @click="navigate('dashboard')"
      >
        <span class="brand-symbol"><v-icon>mdi-leaf</v-icon></span>
        <span>everyday<span class="brand-subtitle">ENGLISH STUDIO</span></span>
      </button>
      <div class="sidebar-label">你的学习空间</div>
      <nav class="sidebar-links">
        <button
          v-for="item in primaryNav"
          :key="item.id"
          :class="['sidebar-link', { active: page === item.id }]"
          :aria-current="page === item.id ? 'page' : undefined"
          @click="navigate(item.id)"
        >
          <v-icon size="21">{{ item.icon }}</v-icon
          ><span>{{ item.label }}</span
          ><v-icon v-if="page === item.id" class="nav-arrow" size="16"
            >mdi-arrow-top-right</v-icon
          >
        </button>
      </nav>
      <div class="sidebar-label mt-7">回顾与成长</div>
      <nav class="sidebar-links">
        <button
          v-for="item in secondaryNav"
          :key="item.id"
          :class="['sidebar-link', { active: page === item.id }]"
          :aria-current="page === item.id ? 'page' : undefined"
          @click="navigate(item.id)"
        >
          <v-icon size="21">{{ item.icon }}</v-icon
          ><span>{{ item.label }}</span>
        </button>
      </nav>
      <div class="sidebar-bottom">
        <div class="sidebar-note">
          <span class="note-star">✳</span>
          <p>一点练习，<br />多一点自信。</p>
          <span>Small steps. Real progress.</span
          ><button @click="navigate('speaking')">
            开口练一句 <v-icon size="16">mdi-arrow-right</v-icon>
          </button>
        </div>
        <div class="sidebar-footer">
          <span class="online-dot"></span>学习记录保存在此设备
        </div>
      </div>
    </aside>
    <main id="main-content" class="app-main" tabindex="-1">
      <div class="main-shell" :class="`page-${page}`">
        <header class="workspace-header">
          <div class="breadcrumb">
            <span class="desktop-crumb"
              >我的学习空间 <span class="crumb-divider">/</span></span
            ><span>{{ currentLabel }}</span>
          </div>
          <div class="header-actions">
            <span class="date-label">{{
              new Date().toLocaleDateString("zh-CN", {
                month: "long",
                day: "numeric",
                weekday: "short",
              })
            }}</span
            ><button
              class="streak-pill"
              aria-label="查看连续学习统计"
              @click="navigate('statistics')"
            >
              <v-icon size="18">mdi-fire</v-icon>{{ store.streak }} 天
            </button>
            <div class="learner-avatar" aria-label="学习者">E<span></span></div>
          </div>
        </header>
        <v-alert v-if="store.storageWarning" type="warning" class="mb-4">{{
          store.storageWarning
        }}</v-alert>
        <component :is="activeView" />
        <footer class="workspace-footer">
          <span>everyday / 每天，离自然表达更近一点。</span><span>为自己而学。</span>
        </footer>
      </div>
    </main>
    <nav class="bottom-nav" aria-label="手机主导航">
      <button
        v-for="item in mobileNav"
        :key="item.id"
        :class="{ active: page === item.id }"
        :aria-current="page === item.id ? 'page' : undefined"
        @click="navigate(item.id)"
      >
        <v-icon size="22">{{ item.icon }}</v-icon
        ><span>{{
          item.id === "dashboard"
            ? "首页"
            : item.id === "speaking"
              ? "口语"
              : item.id === "reading"
                ? "阅读"
                : "词汇"
        }}</span>
      </button>
      <button
        :class="{ active: !mobileNav.some((item) => item.id === page) }"
        aria-label="更多学习模块"
        :aria-expanded="moreOpen"
        @click="moreOpen = true"
      >
        <v-icon size="22">mdi-dots-horizontal</v-icon><span>更多</span>
      </button>
    </nav>
    <v-bottom-sheet v-model="moreOpen" max-width="560">
      <v-card class="mobile-module-menu pa-5" aria-labelledby="module-menu-title"
        ><div class="d-flex align-center justify-space-between mb-4">
          <h2 id="module-menu-title" class="text-h6">探索学习空间</h2>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            aria-label="关闭模块菜单"
            @click="moreOpen = false"
          />
        </div>
        <div class="mobile-module-grid">
          <button
            v-for="item in nav"
            :key="item.id"
            :class="{ active: page === item.id }"
            @click="navigate(item.id)"
          >
            <v-icon>{{ item.icon }}</v-icon
            >{{ item.label }}
          </button>
        </div></v-card
      >
    </v-bottom-sheet>
    <div v-if="notice" class="notice" role="status">{{ notice }}</div>
  </v-app>
</template>
