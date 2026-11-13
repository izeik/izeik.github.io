<script setup lang="ts">
import { inject } from "vue";

import type { TrainerContext } from "../../composables/useTrainer";
const context = inject<TrainerContext>("trainer")!;
const {
  dialogue,
  userLine,
  allDialogues,
  scenario,
  scenarioIndex,
  selectedPrompt,
  selectScenario,
  speak,
  nextQuestion,
  submitLine,
} = context;
</script>
<template>
  <section>
    <div class="page-title">在真实场景里练习开口</div>
    <div class="muted mt-1 mb-4">先用自己的话回答，再听一个自然表达示例。</div>
    <div class="d-flex flex-wrap ga-2 mb-4">
      <v-chip
        v-for="{ label } in allDialogues"
        :key="label"
        :color="scenario === label ? 'primary' : undefined"
        :variant="scenario === label ? 'flat' : 'outlined'"
        @click="selectScenario(label)"
        >{{ label }}</v-chip
      >
    </div>
    <v-row
      ><v-col cols="12" md="8"
        ><v-card class="pa-5"
          ><div class="d-flex justify-space-between">
            <div>
              <div class="eyebrow">{{ scenario }} · 交流练习</div>
              <div class="text-h6 font-weight-bold mt-2">
                对话练习 {{ scenarioIndex + 1 }}
              </div>
            </div>
            <v-btn icon variant="text" aria-label="下一个问题" @click="nextQuestion"
              ><v-icon>mdi-skip-next</v-icon></v-btn
            >
          </div>
          <div class="mt-5 dialogue-bubble ai">
            <div class="eyebrow mb-1">对方</div>
            {{ selectedPrompt.question
            }}<v-btn
              size="x-small"
              icon
              variant="text"
              class="ml-1"
              @click="speak(selectedPrompt.question)"
              ><v-icon size="small">mdi-volume-high</v-icon></v-btn
            >
          </div>
          <div v-if="dialogue" class="dialogue-bubble user mt-3">
            <div class="eyebrow mb-1">你</div>
            {{ dialogue }}
          </div>
          <v-textarea
            v-model="userLine"
            :disabled="!!dialogue"
            class="mt-4"
            label="用英文回答，不用担心犯错"
            placeholder="Type your answer in English…"
            variant="outlined"
            rows="2"
            hide-details
          />
          <div class="d-flex flex-wrap ga-2 mt-3">
            <v-btn
              color="primary"
              :disabled="!userLine.trim() || !!dialogue"
              @click="submitLine"
              >提交回答</v-btn
            ><v-btn
              variant="outlined"
              prepend-icon="mdi-volume-high"
              @click="speak(selectedPrompt.answer)"
              >听自然表达</v-btn
            ><v-btn variant="text" @click="nextQuestion">下一个问题</v-btn>
          </div>
          <v-alert v-if="dialogue" type="success" variant="tonal" class="mt-4"
            ><div class="font-weight-bold">自然表达示例</div>
            <div class="mt-1">{{ selectedPrompt.answer }}</div>
            <div class="text-body-2 mt-2">
              对方的提问：{{ selectedPrompt.meaning }}
            </div></v-alert
          ></v-card
        ></v-col
      ><v-col cols="12" md="4"
        ><v-card class="pa-5"
          ><v-icon color="primary" size="30">mdi-lightbulb-outline</v-icon>
          <div class="font-weight-bold mt-3">练习小提示</div>
          <div class="text-body-2 muted mt-2">
            用完整短句回答。系统不会自动评判语法；你可以先对照示例，留意自己想表达的意思。
          </div>
          <v-divider class="my-4" />
          <div class="eyebrow">SCENARIO PACKS</div>
          <div class="text-caption muted mt-2">
            50 个日常问题 · 30 个职场表达 · 20 个开发表达
          </div></v-card
        ></v-col
      ></v-row
    >
  </section>
</template>
