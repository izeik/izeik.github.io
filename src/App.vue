<script setup lang="ts">
import { computed, provide } from "vue";
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
</script>

<template>
  <v-app
    ><v-navigation-drawer permanent width="216" class="desktop-nav" color="white"
      ><div class="pa-5 d-flex align-center ga-3">
        <div class="brand-icon">
          <v-icon color="white">mdi-message-text</v-icon>
        </div>
        <div>
          <div class="font-weight-bold">Everyday English</div>
          <div class="text-caption muted">日常英语训练</div>
        </div>
      </div>
      <div class="px-3 pt-2">
        <div class="eyebrow px-3 pb-2">学习空间</div>
        <v-btn
          v-for="n in nav"
          :key="n.id"
          block
          variant="text"
          class="nav-item justify-start"
          :class="{ 'text-primary nav-active': page === n.id }"
          @click="page = n.id"
          ><template #prepend
            ><v-icon>{{ n.icon }}</v-icon></template
          >{{ n.label }}</v-btn
        >
      </div>
      <template #append
        ><v-card flat color="deep-purple-lighten-5" class="ma-4 pa-4"
          ><div class="d-flex ga-2 align-center">
            <v-icon color="primary">mdi-lightbulb-on-outline</v-icon
            ><b class="text-body-2">每日一点进步</b>
          </div>
          <div class="text-caption muted mt-2">
            短时间、常练习，让英语自然融入生活。
          </div></v-card
        ></template
      ></v-navigation-drawer
    >
    <v-main
      ><div class="main-shell mobile-content" :class="`page-${page}`">
        <div class="workspace-header d-flex justify-space-between align-center">
          <div>
            <div class="eyebrow">
              {{
                new Date().toLocaleDateString("zh-CN", {
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })
              }}
            </div>
            <div class="page-title">
              {{ nav.find((n) => n.id === page)?.label }}
              <span v-if="page === 'dashboard'">，继续保持 🌱</span>
            </div>
          </div>
          <div class="d-flex align-center ga-2">
            <v-avatar color="deep-purple-lighten-5" size="42"
              ><v-icon color="primary">mdi-account-outline</v-icon></v-avatar
            >
            <div class="d-none d-sm-block">
              <div class="text-body-2 font-weight-bold">学习者</div>
              <div class="text-caption muted">日常练习中</div>
            </div>
          </div>
        </div>
        <v-alert v-if="store.storageWarning" type="warning" class="mb-3">{{
          store.storageWarning
        }}</v-alert>
        <component :is="activeView" />
      </div>
      <nav class="bottom-nav">
        <button
          v-for="n of nav"
          :key="n.id"
          :class="{ active: page === n.id }"
          :aria-current="page === n.id ? 'page' : undefined"
          @click="page = n.id"
        >
          <v-icon size="21">{{ n.icon }}</v-icon
          >{{ n.label }}
        </button>
      </nav>
      <div v-if="notice" class="notice" role="status">{{ notice }}</div></v-main
    ></v-app
  >
</template>
<style scoped>
.brand-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: #6757d9;
  display: grid;
  place-items: center;
}
.expression-list {
  max-height: 480px;
  overflow: auto;
}
</style>
