<script setup lang="ts">
import { computed, inject } from "vue";
import type { TrainerContext } from "../../composables/useTrainer";
import { useReinforcementStore } from "../../stores/reinforcement";
const { store, page } = inject<TrainerContext>("trainer")!;
const reinforcement = useReinforcementStore();
const pending = computed(() => store.errors.filter((e) => !e.resolved).length);
</script>
<template>
  <section>
    <div class="page-title">知道下一次该练什么</div>
    <p class="muted mt-2 mb-5">
      只看薄弱项与复习表现，不统计学习分钟。这里只保存分类累计，不保存逐次回答流水。
    </p>
    <v-alert v-if="reinforcement.warning" type="warning" class="mb-4">{{
      reinforcement.warning
    }}</v-alert>
    <v-row
      ><v-col
        v-for="tile in [
          { label: '待复习题目', value: pending },
          { label: '重做与参考一致', value: reinforcement.review.correct },
          { label: '已完成迁移任务', value: reinforcement.completedTransfers.length },
          { label: '自评已掌握表达', value: store.mastered.length },
        ]"
        :key="tile.label"
        cols="6"
        md="3"
        ><v-card class="pa-5 h-100"
          ><div class="eyebrow">{{ tile.label }}</div>
          <div class="metric-value mt-2">{{ tile.value }}</div></v-card
        ></v-col
      ></v-row
    >
    <v-row class="mt-2"
      ><v-col cols="12" md="7"
        ><v-card class="pa-5"
          ><h2 class="text-h6">值得再练的题型</h2>
          <p class="text-caption muted mt-2">
            按累计“与参考不同”的次数排序；包括订正，不代表能力评分，合理替代表达也可能与参考不同。
          </p>
          <div v-if="reinforcement.weakAreas.length" class="mt-4">
            <div
              v-for="area in reinforcement.weakAreas"
              :key="area.label"
              class="weak-area"
            >
              <div class="d-flex justify-space-between ga-3">
                <b>{{ area.label }}</b
                ><span>{{ area.misses }} 次与参考不同</span>
              </div>
              <v-progress-linear
                :model-value="(area.misses / area.attempts) * 100"
                color="secondary"
                rounded
                class="my-2"
                height="6"
              /><small class="muted"
                >累计核对 {{ area.attempts }} 次，与参考一致 {{ area.correct }} 次</small
              >
            </div>
          </div>
          <p v-else class="muted mt-4">
            目前还没有可提示的薄弱项。做几道题后，这里会显示分类摘要。
          </p>
          <div v-if="pending" class="mt-5">
            <h3 class="text-subtitle-2">待巩固内容</h3>
            <p
              v-for="entry in store.errors.filter((e) => !e.resolved).slice(0, 5)"
              :key="entry.id"
              class="text-body-2 mt-2"
              style="overflow-wrap: anywhere"
            >
              <b>{{ entry.corrected }}</b
              ><span class="muted"> · {{ entry.type }}</span>
            </p>
          </div>
          <v-btn class="mt-4" variant="tonal" color="primary" @click="page = 'errors'"
            >去重做待复习题</v-btn
          ></v-card
        ></v-col
      >
      <v-col cols="12" md="5"
        ><v-card class="pa-5"
          ><h2 class="text-h6">重做表现</h2>
          <div v-if="reinforcement.review.attempts" class="mt-4">
            <div class="metric-value">
              {{ reinforcement.review.correct }} / {{ reinforcement.review.attempts }}
            </div>
            <p class="text-body-2 muted mt-2">
              重做核对中与参考一致的次数。重复练习也会累计，不能解读为独立题目的掌握率。
            </p>
          </div>
          <p v-else class="muted mt-4">
            尚无重做结果。这里不会用旧学习分钟推算复习表现。
          </p>
          <v-divider class="my-4" />
          <p class="text-body-2 muted">
            已完成阅读 {{ store.articleCompletions.length }} 篇 · 收藏
            {{ store.favorites.length }} 个表达。手动掌握是你的自评，不是自动测试结论。
          </p></v-card
        ></v-col
      ></v-row
    >
  </section>
</template>
<style scoped>
.weak-area {
  padding: 15px 0;
}
.weak-area + .weak-area {
  border-top: 1px solid #e2e6dc;
}
.weak-area span {
  font-size: 12px;
}
.weak-area b {
  font-size: 14px;
}
</style>
