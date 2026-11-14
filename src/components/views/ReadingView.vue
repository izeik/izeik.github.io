<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from "vue";
import type { TrainerContext } from "../../composables/useTrainer";
import { splitEnglishSentences, type ReadingArticle } from "../../data/articles";
import { readingGaps } from "../../data/readingGaps";
import GapFeedback from "../GapFeedback.vue";
import { dailyLessons } from "../../data/lessons";
import { readingTokens } from "../../data/readingTokens";
import { normalizeExerciseAnswer as normalizeAnswer } from "../../data/reviewExercise";
import { useReinforcementStore } from "../../stores/reinforcement";
import WordLookup from "../WordLookup.vue";

const context = inject<TrainerContext>("trainer")!;
const { store, articles, speak, expressions } = context;
const selectedId = ref(store.selectedArticleId || articles[0].id);
const article = computed(
  () => articles.find((item) => item.id === selectedId.value) ?? articles[0],
);
const reinforcement = useReinforcementStore();
const lookupEntries = computed(() => [
  ...(dailyLessons.find((l) => l.article.id === article.value.id)?.vocabulary ?? []),
  ...expressions,
]);
const tokenizedSentences = computed(
  () =>
    new Map(
      article.value.paragraphs
        .flatMap((p) => splitEnglishSentences(p.text))
        .map((sentence) => [sentence, readingTokens(sentence, lookupEntries.value)]),
    ),
);
const selectedAnswers = ref<number[]>([]);
const gaps = computed(() => readingGaps(article.value, lookupEntries.value));
type GapState = {
  answer: string;
  checked: boolean;
  lastAnswer: string;
  accepted: boolean;
};
const freshGapStates = () =>
  gaps.value.map((): GapState => ({
    answer: "",
    checked: false,
    lastAnswer: "",
    accepted: false,
  }));
const gapStates = ref<GapState[]>(freshGapStates());
const checkedReading = ref(false);
const lastAnswers = ref<number[]>([]);
const shadowing = ref(false);
const activeSentence = ref("");
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
const hasNewAnswers = computed(
  () =>
    allAnswered.value &&
    selectedAnswers.value.some((answer, i) => answer !== lastAnswers.value[i]),
);
function hasNewGap(index: number) {
  const state = gapStates.value[index]!;
  return !!state.answer.trim() && normalizeAnswer(state.answer) !== state.lastAnswer;
}
function gapCorrect(index: number) {
  return (
    normalizeAnswer(gapStates.value[index]!.answer) ===
    normalizeAnswer(gaps.value[index]!.answer)
  );
}
function gapPassed(index: number) {
  const state = gapStates.value[index]!;
  return state.checked && (gapCorrect(index) || state.accepted);
}
const passedGapCount = computed(
  () => gaps.value.filter((_, index) => gapPassed(index)).length,
);
const canFinish = computed(
  () =>
    !completed.value &&
    checkedReading.value &&
    readingScore.value === article.value.questions.length &&
    gaps.value.every((_, index) => gapPassed(index)),
);
let playback = 0;
function stopPlayback() {
  playback++;
  activeSentence.value = "";
  shadowing.value = false;
  window.speechSynthesis?.cancel();
}

watch(selectedId, () => resetPractice());
onBeforeUnmount(stopPlayback);

function resetPractice() {
  selectedAnswers.value = [];
  gapStates.value = freshGapStates();
  checkedReading.value = false;
  lastAnswers.value = [];
  stopPlayback();
}

function checkReading() {
  if (checkedReading.value || !hasNewAnswers.value) return;
  checkedReading.value = true;
  const questions = article.value.questions;
  let mistakes = 0;
  questions.forEach((q, i) => {
    if (selectedAnswers.value[i] !== lastAnswers.value[i])
      reinforcement.record("阅读理解", selectedAnswers.value[i] === q.answer);
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
        {
          sentence: q.prompt,
          answer: q.options[q.answer]!,
          hint: q.explanation,
          options: q.options,
          context: article.value.paragraphs.map((p) => p.text).join("\n"),
        },
      );
    }
    if (selectedAnswers.value[i] === q.answer)
      store.resolveExerciseErrors("文章阅读理解", {
        sentence: q.prompt,
        answer: q.options[q.answer]!,
      });
  });
  store.logSession(2, 0, mistakes);
  lastAnswers.value = [...selectedAnswers.value];
}

function checkGap(index: number) {
  const state = gapStates.value[index]!,
    question = gaps.value[index]!;
  if (state.checked || !hasNewGap(index)) return;
  state.checked = true;
  state.lastAnswer = normalizeAnswer(state.answer);
  state.accepted = false;
  reinforcement.record("阅读补全", gapCorrect(index));
  if (!gapCorrect(index))
    store.addError(
      state.answer.trim(),
      question.answer,
      "阅读补全 · 待复习",
      `${article.value.title} · 第 ${index + 1} 题`,
      {
        sentence: question.sentence,
        answer: question.answer,
        hint: question.hint,
        acceptNatural: true,
      },
    );
  else store.resolveExerciseErrors("阅读补全 · 待复习", question);
  store.logSession(1);
}
function editGap(index: number) {
  gapStates.value[index]!.checked = false;
  gapStates.value[index]!.accepted = false;
}
function onGapReviewed(
  index: number,
  result: { verdict: string; suggestion: string; reason: string },
) {
  const state = gapStates.value[index]!,
    question = gaps.value[index]!;
  if (!state.checked || gapCorrect(index)) return;
  state.accepted = result.verdict === "natural";
  const entry = store.errors.find(
    (e) =>
      e.type === "阅读补全 · 待复习" &&
      e.exercise?.sentence === question.sentence &&
      e.corrected === question.answer,
  );
  if (result.verdict === "natural")
    store.resolveExerciseErrors("阅读补全 · 待复习", question, "ai");
  if (entry && result.verdict === "unsuitable") {
    entry.note = `《${article.value.title}》 · 第 ${index + 1} 题 · AI 解析：${result.reason}`;
    if (entry.exercise) entry.exercise.hint = result.reason;
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
      activeSentence.value = "";
      return;
    }
    activeSentence.value = sentence;
    speak(sentence, playNextSentence, () => {
      if (currentPlayback === playback) {
        activeSentence.value = "";
        shadowing.value = false;
      }
    });
  };
  playNextSentence();
}

function playSentence(sentence: string) {
  const same = activeSentence.value === sentence;
  stopPlayback();
  if (same) return;
  const request = playback;
  activeSentence.value = sentence;
  const finish = () => {
    if (request === playback) activeSentence.value = "";
  };
  speak(sentence, finish, finish);
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
          30 篇日常与通用职场配套阅读，另有
          {{ articles.length - 30 }} 篇扩展材料；结合跟读、理解与句子补全。
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
              <template #subtitle
                >{{ item.id > 30 ? "扩展阅读 · " : "日课配套 · " }}{{ item.topic }} ·
                {{ item.level }}</template
              >
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
                >{{ article.id > 30 ? "可选扩展 · " : "日课配套 · "
                }}{{ article.topic }} · {{ article.level }}</v-chip
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
            >点击每句前的扬声器朗读，再点可停止。悬停或轻触下划线表达查义；实线优先表示完整短语，查词不会触发整句播放。</v-alert
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
                    :class="{
                      'show-translation': showTranslations,
                      'is-playing': activeSentence === sentence,
                    }"
                  >
                    <button
                      class="sentence-play"
                      type="button"
                      :aria-label="`${activeSentence === sentence ? '停止' : '朗读'}第 ${index + 1} 段第 ${sentenceIndex + 1} 句`"
                      :aria-pressed="activeSentence === sentence"
                      @click="playSentence(sentence)"
                    >
                      <v-icon size="17">{{
                        activeSentence === sentence ? "mdi-stop" : "mdi-volume-medium"
                      }}</v-icon>
                    </button>
                    <span class="sentence-text"
                      ><template
                        v-for="(token, tokenIndex) in tokenizedSentences.get(sentence)!"
                        :key="tokenIndex"
                        ><WordLookup
                          v-if="token.lookup"
                          :word="token.text"
                          :lookup="token.lookup"
                          :phrase="token.phrase"
                          :expressions="lookupEntries"
                        /><span v-else>{{ token.text }}</span></template
                      ></span
                    >
                    <span v-if="showTranslations" class="sentence-translation">{{
                      paragraph.sentenceTranslations[sentenceIndex]
                    }}</span> </span
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
            <GapFeedback
              v-if="checkedReading"
              :key="`${article.id}-${index}`"
              kind="choice"
              :sentence="
                question.prompt +
                '\n' +
                question.options.map((o, i) => `${i + 1}. ${o}`).join('\n')
              "
              :answer="question.options[selectedAnswers[index]!]!"
              :reference="question.options[question.answer]!"
              :focus="article.paragraphs.map((p) => p.text).join('\n')"
            />
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
          <div class="d-flex flex-wrap align-center ga-2 mb-3">
            <v-icon color="primary">mdi-form-textbox</v-icon>
            <h3 class="text-h6">句子补全（{{ gaps.length }} 题）</h3>
            <span class="text-caption muted ml-auto"
              >已通过 {{ passedGapCount }} / {{ gaps.length }} 题</span
            >
          </div>
          <section
            v-for="(question, index) in gaps"
            :key="`${article.id}-${index}`"
            class="reading-gap-question"
            :data-reading-gap="index + 1"
            :aria-label="`句子补全第 ${index + 1} 题`"
          >
            <h4 class="text-subtitle-2 mb-2">第 {{ index + 1 }} 题</h4>
            <p class="text-body-1 mb-3" lang="en">{{ question.sentence }}</p>
            <v-form @submit.prevent="checkGap(index)"
              ><div class="d-flex flex-wrap align-center ga-3">
                <v-text-field
                  v-model="gapStates[index]!.answer"
                  maxlength="180"
                  :label="`第 ${index + 1} 题：填入缺少的单词或词组`"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="gap-input"
                  :disabled="gapStates[index]!.checked"
                /><v-btn
                  variant="outlined"
                  type="submit"
                  :disabled="gapStates[index]!.checked || !hasNewGap(index)"
                  >检查第 {{ index + 1 }} 题</v-btn
                ><v-btn
                  v-if="gapStates[index]!.checked && !gapCorrect(index)"
                  variant="text"
                  :aria-label="`修改第 ${index + 1} 题填空`"
                  @click="editGap(index)"
                  >修改填空</v-btn
                >
              </div></v-form
            >
            <p v-if="!gapStates[index]!.checked" class="text-caption muted mt-2">
              {{ question.hint }}
            </p>
            <v-alert
              v-else
              class="mt-3"
              density="compact"
              :type="gapPassed(index) ? 'success' : 'info'"
              variant="tonal"
              >{{
                gapCorrect(index)
                  ? "答对了！"
                  : gapStates[index]!.accepted
                    ? "这个表达在句中也自然，本题已通过。"
                    : `原文用词：${question.answer}。可查看 AI 解析，判断你的表达是否也适合。`
              }}</v-alert
            >
            <GapFeedback
              v-if="gapStates[index]!.checked"
              :sentence="question.sentence"
              :reference="question.answer"
              :answer="gapStates[index]!.answer"
              :focus="
                article.title +
                ' · ' +
                question.hint +
                '\n' +
                article.paragraphs.map((p) => p.text).join('\n')
              "
              @reviewed="(result) => onGapReviewed(index, result)"
            />
          </section>
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
.reading-gap-question {
  padding: 20px 0;
}
.reading-gap-question + .reading-gap-question {
  border-top: 1px solid #e2e6dc;
}
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
  cursor: text;
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
.sentence-play {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin-right: 6px;
  border: 1px solid #dce4d4;
  border-radius: 50%;
  color: #4c6848;
  background: #f5f8ef;
  vertical-align: middle;
  transition: background 0.15s;
}
.sentence-play:hover,
.sentence-play[aria-pressed="true"] {
  background: #dfeacc;
  color: #284f43;
}
.sentence-unit.is-playing .sentence-text {
  background: #eff4e5;
  border-radius: 4px;
}
.sentence-play:focus-visible {
  outline: 2px solid #284f43;
  outline-offset: 3px;
}
.gap-input {
  max-width: 320px;
}
@media (max-width: 959px) {
  .sentence-play {
    width: 32px;
    height: 32px;
  }
  .article-picker {
    position: static;
  }
  .article-list {
    max-height: 280px;
  }
}
</style>
