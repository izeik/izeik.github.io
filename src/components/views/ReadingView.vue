<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from "vue";
import type { TrainerContext } from "../../composables/useTrainer";
import { splitEnglishSentences, type ReadingArticle } from "../../data/articles";
import GapFeedback from "../GapFeedback.vue";
import WordLookup from "../WordLookup.vue";

const context = inject<TrainerContext>("trainer")!;
const { store, articles, speak, expressions } = context;
const selectedId = ref(store.selectedArticleId || articles[0].id);
const article = computed(
  () => articles.find((item) => item.id === selectedId.value) ?? articles[0],
);
const selectedAnswers = ref<number[]>([]);
const gapAnswer = ref("");
const checkedReading = ref(false);
const checkedGap = ref(false);
const lastAnswers = ref<number[]>([]);
const lastGap = ref("");
const acceptedAlternative = ref(false);
const shadowing = ref(false);
const showTranslations = ref(false);
const completed = computed(() => store.articleCompletions.includes(article.value.id));
const readingScore = computed(
  () =>
    article.value.questions.filter(
      (question, index) => selectedAnswers.value[index] === question.answer,
    ).length,
);
const allAnswered = computed(() =>
  article.value.questions.every(
    (q, i) => q.options[selectedAnswers.value[i]] !== undefined,
  ),
);
function normalizeAnswer(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, " ").replace(/’/g, "'");
}
const hasNewAnswers = computed(
  () =>
    allAnswered.value &&
    selectedAnswers.value.some((answer, i) => answer !== lastAnswers.value[i]),
);
const hasNewGap = computed(
  () => !!gapAnswer.value.trim() && normalizeAnswer(gapAnswer.value) !== lastGap.value,
);
const gapCorrect = computed(
  () => normalizeAnswer(gapAnswer.value) === normalizeAnswer(article.value.gap.answer),
);
const canFinish = computed(
  () =>
    !completed.value &&
    checkedReading.value &&
    checkedGap.value &&
    readingScore.value === article.value.questions.length &&
    (gapCorrect.value || acceptedAlternative.value),
);
let playback = 0;
function stopPlayback() {
  playback++;
  shadowing.value = false;
  window.speechSynthesis?.cancel();
}

watch(selectedId, () => resetPractice());
onBeforeUnmount(stopPlayback);

function resetPractice() {
  selectedAnswers.value = [];
  gapAnswer.value = "";
  checkedReading.value = false;
  checkedGap.value = false;
  lastAnswers.value = [];
  lastGap.value = "";
  acceptedAlternative.value = false;
  stopPlayback();
}

function checkReading() {
  if (checkedReading.value || !hasNewAnswers.value) return;
  checkedReading.value = true;
  const questions = article.value.questions;
  let mistakes = 0;
  questions.forEach((q, i) => {
    if (
      selectedAnswers.value[i] !== q.answer &&
      selectedAnswers.value[i] !== lastAnswers.value[i]
    ) {
      mistakes++;
      store.addError(
        q.options[selectedAnswers.value[i]],
        q.options[q.answer],
        "文章阅读理解",
        `《${article.value.title}》 ${q.prompt} ${q.explanation}`,
      );
    }
  });
  store.logSession(2, 0, mistakes);
  lastAnswers.value = [...selectedAnswers.value];
}

function checkGap() {
  if (checkedGap.value || !hasNewGap.value) return;
  checkedGap.value = true;
  lastGap.value = normalizeAnswer(gapAnswer.value);
  acceptedAlternative.value = false;
  store.logSession(1);
}

function onGapReviewed(result: { verdict: string; suggestion: string; reason: string }) {
  if (!checkedGap.value || gapCorrect.value) return;
  acceptedAlternative.value = result.verdict === "natural";
  if (result.verdict === "unsuitable") {
    store.addError(
      gapAnswer.value.trim(),
      result.suggestion,
      "文章句子补全",
      `《${article.value.title}》 · AI 解析：${result.reason}`,
    );
  }
}

function finishArticle() {
  if (canFinish.value) store.completeArticle(article.value.id);
}

function readParagraphs() {
  if (shadowing.value) {
    stopPlayback();
    return;
  }
  const currentPlayback = ++playback;
  const sentences = article.value.paragraphs.flatMap((p) =>
    splitEnglishSentences(p.text),
  );
  shadowing.value = true;
  let index = 0;
  const playNextSentence = () => {
    if (currentPlayback !== playback) return;
    const sentence = sentences[index++];
    if (!sentence) {
      shadowing.value = false;
      return;
    }
    speak(sentence, playNextSentence, () => {
      if (currentPlayback === playback) shadowing.value = false;
    });
  };
  playNextSentence();
}

function playSentence(sentence: string) {
  stopPlayback();
  speak(sentence);
}

function sentenceTokens(sentence: string) {
  return (
    sentence.match(/[A-Za-z]+(?:['’][A-Za-z]+)*|\d+(?:\.\d+)?|[^A-Za-z0-9]+/g) ?? [
      sentence,
    ]
  );
}

function isWordToken(token: string) {
  return /^[A-Za-z]/.test(token);
}

function chooseArticle(item: ReadingArticle) {
  selectedId.value = item.id;
  store.selectedArticleId = item.id;
}
</script>

<template>
  <section>
    <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-4">
      <div>
        <div class="page-title">读一篇，听一句，再自己说</div>
        <div class="muted mt-1">
          {{ articles.length }} 篇中级短文，结合影子跟读、阅读理解和句子补全。
        </div>
      </div>
      <v-chip color="primary" variant="tonal"
        >已完成 {{ store.articleCompletions.length }} / {{ articles.length }} 篇</v-chip
      >
    </div>
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <v-card class="pa-3 article-picker">
          <div class="font-weight-bold px-3 py-2">选择文章</div>
          <v-list class="article-list" density="comfortable">
            <v-list-item
              v-for="item in articles"
              :key="item.id"
              :active="item.id === selectedId"
              color="primary"
              rounded="lg"
              @click="chooseArticle(item)"
            >
              <template #title>{{ item.id }}. {{ item.title }}</template>
              <template #subtitle>{{ item.topic }} · {{ item.level }}</template>
              <template #append>
                <v-icon
                  v-if="store.articleCompletions.includes(item.id)"
                  color="success"
                  size="small"
                  >mdi-check-circle</v-icon
                >
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="9">
        <v-card class="pa-4 pa-md-5 mb-4">
          <div class="d-flex flex-wrap justify-space-between align-center ga-3">
            <div>
              <v-chip size="small" color="primary" variant="tonal"
                >{{ article.topic }} · {{ article.level }}</v-chip
              >
              <h2 class="text-h5 font-weight-bold mt-3">{{ article.title }}</h2>
            </div>
            <v-btn prepend-icon="mdi-volume-high" variant="tonal" @click="readParagraphs">
              {{ shadowing ? "停止朗读" : "播放并影子跟读" }}
            </v-btn>
            <v-btn
              :prepend-icon="showTranslations ? 'mdi-translate-off' : 'mdi-translate'"
              :variant="showTranslations ? 'tonal' : 'outlined'"
              @click="showTranslations = !showTranslations"
            >
              {{ showTranslations ? "隐藏翻译" : "显示翻译" }}
            </v-btn>
          </div>
          <v-alert class="mt-4" variant="tonal" color="info" icon="mdi-headphones"
            >点击英文句子可单独播放。显示翻译后，悬停或触碰单词可查看词义和词性。</v-alert
          >
          <div
            v-for="(paragraph, index) in article.paragraphs"
            :key="index"
            class="reading-paragraph mt-5"
          >
            <div>
              <p class="text-body-1 reading-text">
                <template
                  v-for="(sentence, sentenceIndex) in splitEnglishSentences(
                    paragraph.text,
                  )"
                  :key="sentenceIndex"
                  ><span
                    class="sentence-unit"
                    :class="{ 'show-translation': showTranslations }"
                    ><span
                      class="sentence-text"
                      role="button"
                      tabindex="0"
                      @click="playSentence(sentence)"
                      @keydown.enter.self.prevent="playSentence(sentence)"
                      @keydown.space.self.prevent="playSentence(sentence)"
                      ><template v-if="showTranslations"
                        ><template
                          v-for="(token, tokenIndex) in sentenceTokens(sentence)"
                          :key="tokenIndex"
                          ><WordLookup
                            v-if="isWordToken(token)"
                            :key="token"
                            :word="token"
                            :expressions="expressions"
                          /><span v-else>{{ token }}</span></template
                        ></template
                      ><template v-else>{{ sentence }}</template></span
                    ><span v-if="showTranslations" class="sentence-translation">{{
                      paragraph.sentenceTranslations[sentenceIndex]
                    }}</span></span
                  >{{ " " }}</template
                >
              </p>
            </div>
          </div>
          <v-divider class="my-4" />
          <div class="d-flex align-center ga-2 mb-3">
            <v-icon color="primary">mdi-book-question-outline</v-icon>
            <h3 class="text-h6">阅读理解</h3>
          </div>
          <div v-for="(question, index) in article.questions" :key="index" class="mb-4">
            <div class="font-weight-medium mb-2">
              {{ index + 1 }}. {{ question.prompt }}
            </div>
            <v-radio-group
              v-model="selectedAnswers[index]"
              hide-details
              :disabled="checkedReading"
            >
              <v-radio
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                :label="option"
                :value="optionIndex"
                color="primary"
              />
            </v-radio-group>
            <v-alert
              v-if="checkedReading"
              class="mt-2"
              density="compact"
              :type="selectedAnswers[index] === question.answer ? 'success' : 'warning'"
              variant="tonal"
            >
              {{
                selectedAnswers[index] === question.answer
                  ? "回答正确。"
                  : `参考答案：${question.options[question.answer]}。`
              }}{{ question.explanation }}
            </v-alert>
          </div>
          <div class="d-flex flex-wrap align-center ga-3">
            <v-btn
              color="primary"
              :disabled="checkedReading || !hasNewAnswers"
              @click="checkReading"
              >检查理解</v-btn
            >
            <span v-if="checkedReading" class="text-body-2"
              >本篇得分：{{ readingScore }} / {{ article.questions.length }}</span
            >
            <v-btn
              v-if="checkedReading && readingScore < article.questions.length"
              variant="text"
              @click="checkedReading = false"
              >修改选择</v-btn
            >
          </div>
          <v-divider class="my-4" />
          <div class="d-flex align-center ga-2 mb-3">
            <v-icon color="primary">mdi-form-textbox</v-icon>
            <h3 class="text-h6">句子补全</h3>
          </div>
          <p class="text-body-1 mb-3">{{ article.gap.sentence }}</p>
          <div class="d-flex flex-wrap align-center ga-3">
            <v-text-field
              v-model="gapAnswer"
              maxlength="180"
              label="填入缺少的单词或词组"
              variant="outlined"
              density="compact"
              hide-details
              class="gap-input"
              :disabled="checkedGap"
              @keyup.enter="checkGap"
            />
            <v-btn
              variant="outlined"
              :disabled="checkedGap || !hasNewGap"
              @click="checkGap"
              >检查答案</v-btn
            >
            <v-btn
              v-if="checkedGap && !gapCorrect"
              variant="text"
              @click="checkedGap = false"
              >修改填空</v-btn
            >
          </div>
          <div v-if="!checkedGap" class="text-caption muted mt-2">
            {{ article.gap.hint }}
          </div>
          <v-alert
            v-else
            class="mt-3"
            density="compact"
            :type="gapCorrect || acceptedAlternative ? 'success' : 'info'"
            variant="tonal"
          >
            {{
              gapCorrect
                ? "答对了！"
                : acceptedAlternative
                  ? "这个表达在句中也自然，可以完成本篇。"
                  : `原文用词：${article.gap.answer}。可查看 AI 解析，判断你的表达是否也适合。`
            }}
          </v-alert>
          <GapFeedback
            v-if="checkedGap"
            :sentence="article.gap.sentence"
            :reference="article.gap.answer"
            :answer="gapAnswer"
            :focus="article.title + ' · ' + article.gap.hint"
            @reviewed="onGapReviewed"
          />
          <div class="d-flex flex-wrap align-center ga-3 mt-5">
            <v-btn
              color="success"
              prepend-icon="mdi-check"
              :disabled="!canFinish"
              @click="finishArticle"
              >{{ completed ? "已完成本篇" : "完成本篇学习" }}</v-btn
            >
            <v-btn variant="text" @click="resetPractice">重新练习</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<style scoped>
.article-picker {
  position: sticky;
  top: 16px;
}
.article-list {
  max-height: min(70vh, 680px);
  overflow-y: auto;
  overscroll-behavior: contain;
}
.reading-paragraph {
  padding: 4px 0;
}
.reading-text {
  font-size: 1.05rem;
  line-height: 1.85;
  text-align: left;
}
.sentence-text {
  color: inherit;
  display: inline;
  text-align: left;
  vertical-align: baseline;
  font: inherit;
  cursor: pointer;
  border-radius: 4px;
}
.sentence-unit.show-translation {
  display: block;
  margin-bottom: 10px;
}
.sentence-translation {
  display: block;
  color: #737887;
  font-size: 0.94rem;
  line-height: 1.65;
  margin-top: 2px;
}
.sentence-text:hover,
.sentence-text:focus-visible {
  background: #f1efff;
  outline: none;
}
.gap-input {
  max-width: 320px;
}
@media (max-width: 959px) {
  .article-picker {
    position: static;
  }
  .article-list {
    max-height: 280px;
  }
}
</style>
