<script setup lang="ts">
import { inject } from "vue";

import type { TrainerContext } from "../../composables/useTrainer";
const { store } = inject<TrainerContext>("trainer")!;
const weekLabels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
</script>
<template>
  <section>
    <div class="page-title">看见自己的练习轨迹</div>
    <div class="muted mt-1 mb-4">统计来自你在应用中的练习记录，保存在本地设备。</div>
    <v-row
      ><v-col cols="12" sm="6" md="3"
        ><v-card class="pa-5"
          ><div class="eyebrow">累计练习估算</div>
          <div class="metric-value mt-2">
            {{ store.minutes }}<small class="text-body-2 ml-1">分钟</small>
          </div></v-card
        ></v-col
      ><v-col cols="12" sm="6" md="3"
        ><v-card class="pa-5"
          ><div class="eyebrow">已掌握表达</div>
          <div class="metric-value mt-2">
            {{ store.mastered.length }}
          </div></v-card
        ></v-col
      ><v-col cols="12" sm="6" md="3"
        ><v-card class="pa-5"
          ><div class="eyebrow">错误记录</div>
          <div class="metric-value mt-2">{{ store.errors.length }}</div></v-card
        ></v-col
      ><v-col cols="12" sm="6" md="3"
        ><v-card class="pa-5"
          ><div class="eyebrow">已完成阅读</div>
          <div class="metric-value mt-2">
            {{ store.articleCompletions.length
            }}<small class="text-body-2 ml-1">篇</small>
          </div></v-card
        ></v-col
      ></v-row
    ><v-row class="mt-1"
      ><v-col cols="12" md="7"
        ><v-card class="pa-5"
          ><div class="font-weight-bold">每周学习时间</div>
          <div class="text-caption muted">按练习操作估算的分钟数</div>
          <div class="progress-bars mt-4">
            <span
              v-for="(v, i) in store.weekly"
              :key="i"
              :class="{ active: i === store.weekdayIndex }"
              :style="{ height: `${(v / Math.max(1, ...store.weekly)) * 100}px` }"
              ><small>{{ weekLabels[i] }} · {{ v }}分</small></span
            >
          </div></v-card
        ></v-col
      ><v-col cols="12" md="5"
        ><v-card class="pa-5"
          ><div class="font-weight-bold">学习概览</div>
          <div class="d-flex justify-space-between mt-5">
            <span class="muted">今日练习</span><b>{{ store.todayMinutes }} 分钟</b>
          </div>
          <v-divider class="my-3" />
          <div class="d-flex justify-space-between">
            <span class="muted">连续学习</span><b>{{ store.streak }} 天</b>
          </div>
          <v-divider class="my-3" />
          <div class="d-flex justify-space-between">
            <span class="muted">收藏表达</span><b>{{ store.favorites.length }} 个</b>
          </div>
          <v-divider class="my-3" />
          <div class="d-flex justify-space-between">
            <span class="muted">错误本</span><b>{{ store.errors.length }} 条</b>
          </div></v-card
        ></v-col
      ></v-row
    >
  </section>
</template>
