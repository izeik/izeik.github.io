<script setup lang="ts">
import { inject } from "vue";

import type { TrainerContext } from "../../composables/useTrainer";
const context = inject<TrainerContext>("trainer")!;
const { store, page } = context;
</script>
<template>
  <section>
    <div class="page-title">把常犯的错误变成进步线索</div>
    <div class="muted mt-1 mb-4">练习中记录的表达问题都可以在这里重新查看。</div>
    <v-card v-if="store.errors.length" class="pa-2"
      ><v-list
        ><v-list-item v-for="e in store.errors" :key="e.id" class="py-3"
          ><div class="d-flex flex-wrap ga-3 justify-space-between w-100">
            <div>
              <v-chip size="x-small" color="warning" variant="tonal">{{ e.type }}</v-chip>
              <div class="mt-2">
                <span class="text-error">{{ e.wrong }}</span
                ><v-icon size="small" class="mx-2">mdi-arrow-right</v-icon
                ><span class="text-success">{{ e.corrected }}</span>
              </div>
              <div class="text-body-2 muted mt-1">{{ e.note }}</div>
              <div class="text-caption muted mt-1">{{ e.date }}</div>
            </div>
            <v-btn
              icon
              variant="text"
              aria-label="删除错误记录"
              @click="store.removeError(e.id)"
              ><v-icon>mdi-delete-outline</v-icon></v-btn
            >
          </div></v-list-item
        ></v-list
      ></v-card
    ><v-card v-else class="pa-6 text-center"
      ><v-icon size="52" color="success">mdi-notebook-check-outline</v-icon>
      <div class="text-h6 font-weight-bold mt-3">这里暂时很安静</div>
      <div class="muted mt-2">阅读或词汇练习中答错的内容会显示在这里。</div>
      <v-btn color="primary" class="mt-4" @click="page = 'reading'">去练习</v-btn></v-card
    >
  </section>
</template>
