<script setup lang="ts">
import { inject } from "vue";

import type { TrainerContext } from "../../composables/useTrainer";
const context = inject<TrainerContext>("trainer")!;
const {
  recognitionText,
  submittedSpeech,
  currentQuestion,
  listening,
  recError,
  startListening,
  submitSpeech,
  nextPronunciation,
  speak,
  speechLocale,
  speechRate,
  selectedVoiceURI,
  speechVoiceOptions,
  speechVoiceDescription,
} = context;
</script>
<template>
  <section>
    <div class="page-title">听一句，再大声跟读</div>
    <div class="muted mt-1 mb-4">语音识别只会显示识别文本，不会给出发音准确率评分。</div>
    <v-card class="pa-4 mb-4">
      <div class="font-weight-bold">朗读声音设置</div>
      <div class="text-body-2 muted mt-1">
        优先使用设备提供的英语语音；不同设备的声音自然度会有差异。
      </div>
      <v-row class="mt-2" align="center">
        <v-col cols="12" sm="4">
          <v-select
            v-model="speechLocale"
            :items="[
              { title: '美式英语', value: 'en-US' },
              { title: '英式英语', value: 'en-GB' },
            ]"
            label="口音"
            variant="outlined"
            density="comfortable"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="5">
          <v-select
            v-model="selectedVoiceURI"
            :items="[{ title: '自动选择（推荐）', value: 'auto' }, ...speechVoiceOptions]"
            label="设备英语声音"
            variant="outlined"
            density="comfortable"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="3">
          <div class="d-flex justify-space-between text-caption mb-1">
            <span>语速</span><span>{{ speechRate.toFixed(2) }}×</span>
          </div>
          <v-slider
            v-model="speechRate"
            min="0.8"
            max="1.1"
            step="0.05"
            hide-details
            color="primary"
          />
        </v-col>
      </v-row>
      <div class="text-caption muted mt-1">{{ speechVoiceDescription }}</div>
      <div class="text-caption muted">
        这是浏览器/系统语音，不是真人录音；设置会保存在当前浏览器。
      </div>
      <v-alert
        v-if="speechVoiceOptions.length === 0"
        class="mt-3"
        type="info"
        variant="tonal"
        density="compact"
      >
        当前浏览器没有提供可选英语声音。若朗读仍偏机械，可在系统语音设置中安装英语语音包，或用桌面
        Microsoft Edge 打开本应用。
      </v-alert>
    </v-card>
    <v-row
      ><v-col cols="12" md="7"
        ><v-card class="pa-5"
          ><div class="eyebrow">LISTEN & REPEAT</div>
          <div class="text-h5 font-weight-bold mt-3">
            {{ currentQuestion.question }}
          </div>
          <div class="muted mt-2">{{ currentQuestion.meaning }}</div>
          <div class="d-flex ga-2 mt-5">
            <v-btn
              color="primary"
              prepend-icon="mdi-volume-high"
              @click="speak(currentQuestion.question)"
              >播放句子</v-btn
            ><v-btn
              variant="outlined"
              prepend-icon="mdi-skip-next"
              @click="nextPronunciation"
              >下一句</v-btn
            >
          </div>
          <v-divider class="my-5" /><v-btn
            color="secondary"
            :loading="listening"
            :disabled="listening || !!submittedSpeech"
            :prepend-icon="listening ? 'mdi-waveform' : 'mdi-microphone'"
            @click="startListening"
            >{{ listening ? "正在聆听…" : "开始语音输入" }}</v-btn
          ><v-alert v-if="recError" type="warning" variant="tonal" class="mt-4">{{
            recError
          }}</v-alert
          ><v-textarea
            v-model="recognitionText"
            :disabled="!!submittedSpeech"
            label="识别出的英文（可修改）"
            placeholder="识别结果或自行输入英文…"
            variant="outlined"
            rows="3"
            class="mt-4"
          /><v-btn
            color="primary"
            :disabled="!recognitionText.trim() || !!submittedSpeech"
            @click="submitSpeech"
            >提交跟读</v-btn
          ><v-alert v-if="submittedSpeech" type="success" variant="tonal" class="mt-4"
            >已记录本次练习。跟读原句：{{ currentQuestion.question }}</v-alert
          ></v-card
        ></v-col
      ><v-col cols="12" md="5"
        ><v-card class="pa-5"
          ><div class="font-weight-bold">关于语音识别</div>
          <p class="text-body-2 muted mt-3">
            识别能力由浏览器提供，兼容情况因浏览器和设备而异。识别文本可编辑，也可以直接使用文字输入。
          </p>
          <v-chip color="success" variant="tonal" prepend-icon="mdi-check"
            >保留文字练习</v-chip
          >
          <div class="text-caption muted mt-4">
            提示：部分浏览器需要 HTTPS 或 localhost 才能访问麦克风。
          </div></v-card
        ></v-col
      ></v-row
    >
  </section>
</template>
