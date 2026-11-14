<script setup lang="ts">
import { computed, inject, ref } from "vue";
import type { TrainerContext } from "../../composables/useTrainer";
import { usePictureDrillStore } from "../../stores/pictureDrill";
import {
  pictureWords,
  pictureScenes,
  pictureWordParts,
  type PictureScope,
} from "../../data/pictureVocabulary";
const { speak, page } = inject<TrainerContext>("trainer")!;
const drill = usePictureDrillStore();
const quantity = ref<number | string>(drill.size),
  category = ref<PictureScope>(drill.scope);
const error = ref(""),
  leaveOpen = ref(false);
const count = computed(
  () =>
    pictureWords.filter((w) => category.value === "all" || w.category === category.value)
      .length,
);
const word = computed(() => drill.current);
const parts = computed(() => (word.value ? pictureWordParts(word.value) : undefined));
const sceneStyle = computed(() => {
  const scene = word.value?.scene ?? 0,
    tile = scene % 12;
  return {
    backgroundImage: `url(${import.meta.env.BASE_URL}images/vocabulary-${scene < 12 ? "daily" : "work"}.webp)`,
    backgroundPosition: `${((tile % 4) / 3) * 100}% ${(Math.floor(tile / 4) / 2) * 100}%`,
  };
});
const correct = computed(() => {
  if (!word.value || !drill.round || !drill.answered) return false;
  return drill.phase === "spelling"
    ? drill.round.spellings[word.value.id] === true
    : drill.round.choices[word.value.id] === word.value.id;
});
function start() {
  try {
    drill.start(Number(quantity.value), category.value);
    error.value = "";
  } catch (e) {
    error.value = e instanceof Error ? e.message : "请选择合适的每轮词数。";
  }
}
function restart() {
  drill.reset();
  leaveOpen.value = false;
  error.value = "";
}
function next() {
  drill.next();
  window.scrollTo({ top: 0, behavior: "instant" });
}
</script>
<template>
  <section
    class="picture-drill"
    :class="{
      'is-question': drill.phase === 'recognition' || drill.phase === 'spelling',
    }"
    aria-labelledby="picture-title"
  >
    <div class="drill-heading">
      <div>
        <span class="eyebrow">WORDS IN CONTEXT</span>
        <h1 id="picture-title" class="page-title mt-2">进阶看图刷词</h1>
        <p class="muted mt-2">用场景认义，再用拼写巩固。</p>
      </div>
      <v-chip color="primary" variant="tonal"
        >{{ pictureWords.length }} 个独立词条</v-chip
      >
    </div>
    <v-alert v-if="drill.warning" type="warning" variant="tonal" class="mt-4">{{
      drill.warning
    }}</v-alert>
    <v-card v-if="drill.phase === 'setup'" class="drill-setup pa-5 pa-md-7 mt-5">
      <div class="eyebrow">YOUR NEXT ROUND</div>
      <h2 class="text-h5 mt-2">这一轮，想练多少词？</h2>
      <p class="muted mt-3">
        日常社交、生活事务与通用职场进阶词汇。每题一句情境例句、一张场景图，四个同场景易混释义。
      </p>
      <h3 class="text-subtitle-1 mt-6 mb-3">每轮词数</h3>
      <div class="d-flex flex-wrap ga-2">
        <v-btn
          v-for="n in [10, 20, 30, 50, 100]"
          :key="n"
          :variant="Number(quantity) === n ? 'flat' : 'tonal'"
          color="primary"
          :aria-pressed="Number(quantity) === n"
          @click="quantity = n"
          >{{ n }} 词</v-btn
        >
      </div>
      <v-text-field
        v-model="quantity"
        type="number"
        min="5"
        max="100"
        step="1"
        label="自定义每轮词数（5–100）"
        variant="outlined"
        class="mt-5 quantity-input"
        hide-details
      />
      <v-select
        v-model="category"
        :items="[
          { title: '全部场景', value: 'all' },
          { title: '日常社交与生活', value: 'daily' },
          { title: '通用职场', value: 'work' },
        ]"
        label="选择词库范围"
        variant="outlined"
        class="mt-5"
        hide-details
      />
      <p class="text-caption muted mt-3">
        当前范围 {{ count }} 词 · 已遇见 {{ drill.seen.length }} /
        {{ pictureWords.length }} 词。优先安排未遇见的词，本轮不重复。
      </p>
      <v-alert v-if="error" type="info" variant="tonal" class="mt-4">{{ error }}</v-alert>
      <v-btn
        size="large"
        color="primary"
        append-icon="mdi-arrow-right"
        class="mt-6"
        @click="start"
        >开始这一轮</v-btn
      >
      <div class="round-explanation mt-6">
        <p><b>01</b> 看例句与场景，辨别词义。</p>
        <p><b>02</b> 每题核对后再继续，错词进入复习本。</p>
        <p><b>03</b> 刷完可选：把本轮全部词再拼写一遍。</p>
      </div>
    </v-card>
    <template
      v-else-if="
        (drill.phase === 'recognition' || drill.phase === 'spelling') &&
        word &&
        drill.round &&
        parts
      "
    >
      <div class="drill-progress mt-5">
        <span>{{ drill.phase === "spelling" ? "本轮词汇 · 拼写重刷" : "看图认义" }}</span
        ><b>{{ drill.round.index + 1 }} / {{ drill.round.ids.length }}</b
        ><v-btn size="small" variant="text" @click="leaveOpen = true">结束本轮</v-btn>
      </div>
      <v-progress-linear
        :model-value="
          ((drill.round.index + Number(drill.answered)) / drill.round.ids.length) * 100
        "
        color="primary"
        height="5"
        rounded
        class="mb-4"
        aria-label="本轮答题进度"
      />
      <v-card class="question-card pa-4 pa-md-6">
        <div class="question-context">
          <figure class="picture-figure">
            <div
              class="scene-illustration"
              role="img"
              :aria-label="pictureScenes[word.scene] + '场景插画'"
              :style="sceneStyle"
            ></div>
            <figcaption>{{ pictureScenes[word.scene] }}</figcaption>
          </figure>
          <div class="sentence-area">
            <v-chip size="small" variant="tonal" color="primary">{{
              word.category === "daily" ? "日常社交与生活" : "通用职场"
            }}</v-chip>
            <h2 class="text-subtitle-1 mt-5">
              {{
                drill.phase === "spelling"
                  ? "根据中文和语境，自己拼出来"
                  : "句中标出的词，最接近哪个意思？"
              }}
            </h2>
            <p class="context-sentence mt-4" lang="en">
              {{ parts.before
              }}<strong v-if="drill.phase === 'recognition' || drill.answered">{{
                parts.target
              }}</strong
              ><span v-else class="spelling-blank" aria-label="待拼写的词">________</span
              >{{ parts.after }}
            </p>
            <p v-if="drill.phase === 'spelling'" class="spelling-meaning mt-4">
              {{ word.meaning }} <small class="muted">{{ word.partOfSpeech }}</small>
            </p>
            <v-btn
              variant="text"
              size="small"
              prepend-icon="mdi-volume-high"
              class="mt-4"
              @click="speak(word.sentence)"
              >听例句</v-btn
            >
          </div>
        </div>
        <div
          v-if="drill.phase === 'recognition'"
          class="meaning-options mt-6"
          aria-label="四个词义选项"
        >
          <button
            v-for="(option, i) in drill.options"
            :key="option.id"
            class="meaning-option"
            :class="{
              chosen: drill.round.choices[word.id] === option.id,
              right: drill.answered && option.id === word.id,
              wrong:
                drill.answered &&
                drill.round.choices[word.id] === option.id &&
                option.id !== word.id,
            }"
            :disabled="drill.answered"
            :aria-pressed="drill.round.choices[word.id] === option.id"
            @click="drill.choose(option.id)"
          >
            <span class="option-letter">{{ "ABCD"[i] }}</span
            ><span class="option-copy"
              ><span>{{ option.meaning }}</span
              ><small v-if="drill.answered" lang="en">{{ option.word }}</small></span
            ><v-icon v-if="drill.answered && option.id === word.id" size="20"
              >mdi-check-circle</v-icon
            >
          </button>
        </div>
        <v-form v-else class="mt-6" @submit.prevent="drill.spell"
          ><v-text-field
            v-model="drill.draft"
            label="拼写本题单词"
            maxlength="120"
            autocomplete="off"
            autocorrect="off"
            :spellcheck="false"
            autocapitalize="none"
            variant="outlined"
            :disabled="drill.answered"
            hide-details
          /><v-btn
            class="mt-3"
            color="primary"
            type="submit"
            :disabled="!drill.draft.trim() || drill.answered"
            >核对拼写</v-btn
          ></v-form
        >
        <v-alert
          v-if="drill.answered"
          :type="correct ? 'success' : 'info'"
          variant="tonal"
          class="mt-5"
          role="status"
          ><strong>{{ correct ? "答对了" : "记住这个区别，再继续" }}</strong>
          <p class="mt-1">
            <b lang="en">{{ word.word }}</b> · {{ word.partOfSpeech }} ·
            {{ word.meaning }}
          </p>
          <p v-if="!correct" class="text-body-2 mt-2">
            已收进错题本，之后可以重做巩固。
          </p></v-alert
        >
        <div class="question-next mt-5">
          <span class="text-caption muted"
            >{{
              drill.phase === "spelling"
                ? "拼写正确 " + drill.spellingScore
                : "词义正确 " + drill.recognitionScore
            }}
            / {{ drill.round.ids.length }}</span
          ><v-btn
            color="primary"
            :disabled="!drill.answered"
            append-icon="mdi-arrow-right"
            @click="next"
            >{{
              drill.round.index === drill.round.ids.length - 1 ? "完成本轮" : "下一个词"
            }}</v-btn
          >
        </div>
      </v-card>
    </template>
    <v-card
      v-else-if="drill.phase === 'offer' && drill.round"
      class="round-result pa-5 pa-md-8 mt-5"
      aria-labelledby="spelling-offer"
    >
      <v-icon size="48" color="primary">mdi-check-decagram-outline</v-icon>
      <p class="eyebrow mt-4">ROUND COMPLETE</p>
      <h2 class="text-h5 mt-2">认义轮已完成</h2>
      <p class="result-score mt-4">
        {{ drill.recognitionScore }}
        <small>/ {{ drill.round.ids.length }} 词义正确</small>
      </p>
      <h3 id="spelling-offer" class="text-h6 mt-6">
        要把刚才的 {{ drill.round.ids.length }} 个词，再用拼写方式刷一轮吗？
      </h3>
      <p class="muted mt-3">
        仍是同一批词，顺序会打乱。例句里的目标词会隐藏，看中文提示自己拼写。
      </p>
      <div class="d-flex flex-wrap ga-3 mt-6">
        <v-btn color="primary" size="large" @click="drill.beginSpelling"
          >开始拼写本轮词</v-btn
        ><v-btn variant="outlined" size="large" @click="drill.skipSpelling"
          >这次先结束</v-btn
        >
      </div>
    </v-card>
    <v-card
      v-else-if="drill.phase === 'summary' && drill.round"
      class="round-result pa-5 pa-md-8 mt-5"
    >
      <v-icon size="44" color="primary">mdi-flag-checkered</v-icon>
      <h2 class="text-h5 mt-4">这一轮，完成了</h2>
      <p class="mt-4">
        词义正确 <b>{{ drill.recognitionScore }} / {{ drill.round.ids.length }}</b>
      </p>
      <p v-if="drill.round.spellingOrder.length" class="mt-2">
        拼写正确 <b>{{ drill.spellingScore }} / {{ drill.round.ids.length }}</b>
      </p>
      <p v-else class="muted mt-2">本轮暂未进行拼写重刷。</p>
      <div class="d-flex flex-wrap ga-3 mt-6">
        <v-btn color="primary" @click="restart">设置新一轮</v-btn
        ><v-btn variant="tonal" @click="page = 'errors'">去复习错词</v-btn>
      </div>
      <v-expansion-panels class="mt-6"
        ><v-expansion-panel title="回看本轮全部词汇"
          ><v-expansion-panel-text
            ><div v-for="item in drill.roundWords" :key="item.id" class="round-word">
              <b lang="en">{{ item.word }}</b
              ><span>{{ item.meaning }}</span>
            </div></v-expansion-panel-text
          ></v-expansion-panel
        ></v-expansion-panels
      >
    </v-card>
    <v-dialog v-model="leaveOpen" max-width="440"
      ><v-card class="pa-5"
        ><h2 class="text-h6">结束当前这一轮？</h2>
        <p class="muted mt-3">
          已答过的词汇进度和错题会保留。重新设置后，当前轮次将结束。
        </p>
        <v-card-actions class="flex-wrap mt-4"
          ><v-btn variant="text" @click="leaveOpen = false">返回本轮</v-btn
          ><v-btn color="primary" @click="restart">结束并重新设置</v-btn></v-card-actions
        ></v-card
      ></v-dialog
    >
  </section>
</template>
<style scoped>
.drill-heading,
.drill-progress,
.question-next {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.drill-setup,
.round-result {
  max-width: 820px;
  margin-inline: auto;
}
.quantity-input {
  max-width: 340px;
}
.round-explanation {
  display: grid;
  gap: 12px;
  border-top: 1px solid #e0e5d8;
  padding-top: 20px;
  font-size: 14px;
}
.round-explanation b {
  color: #59734f;
  margin-right: 12px;
}
.drill-progress {
  font-size: 14px;
  margin-bottom: 8px;
}
.drill-progress b {
  margin-left: auto;
}
.question-context {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 30px;
  align-items: center;
}
.picture-figure {
  margin: 0;
  background: #ede4cf;
  border-radius: 18px;
  overflow: hidden;
  width: 100%;
  max-width: 360px;
  justify-self: center;
}
.option-copy {
  display: grid;
  gap: 3px;
}
.option-copy small {
  color: #66755f;
  font-size: 12px;
}
.scene-illustration {
  width: 100%;
  aspect-ratio: 9/8;
  background-size: 400% 300%;
  background-repeat: no-repeat;
}
.picture-figure figcaption {
  text-align: center;
  padding: 8px 12px;
  font-size: 12px;
  color: #576747;
  background: #f5efe2;
}
.context-sentence {
  font-size: 24px;
  line-height: 1.65;
  font-weight: 500;
  overflow-wrap: anywhere;
}
.context-sentence strong {
  color: #2b6046;
  background: #e8efd5;
  padding: 0 4px;
  border-radius: 4px;
}
.spelling-meaning {
  font-size: 20px;
  font-weight: 600;
}
.spelling-meaning small {
  font-size: 13px;
  font-weight: 400;
}
.meaning-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.meaning-option {
  display: flex;
  align-items: center;
  gap: 13px;
  border: 1px solid #d8dfd1;
  border-radius: 13px;
  padding: 16px;
  text-align: left;
  font-size: 16px;
  min-height: 70px;
  background: #fff;
  color: #304b3e;
}
.meaning-option:not(:disabled):hover {
  background: #f0f5e8;
  border-color: #698552;
}
.meaning-option:focus-visible {
  outline: 3px solid #c0ce9e;
  outline-offset: 3px;
}
.meaning-option:disabled {
  cursor: default;
}
.meaning-option.right {
  border-color: #4c7851;
  background: #edf5e7;
}
.meaning-option.wrong {
  border-color: #ba9d76;
  background: #f7eee1;
}
.meaning-option .v-icon {
  margin-left: auto;
  flex-shrink: 0;
}
.option-letter {
  width: 29px;
  height: 29px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f0f2e8;
  color: #657750;
  font-weight: 700;
}
.result-score {
  font-size: 40px;
  font-weight: 700;
  color: #2c513c;
}
.result-score small {
  font-size: 16px;
  font-weight: 400;
}
.round-word {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e9df;
  overflow-wrap: anywhere;
}
@media (max-width: 700px) {
  .is-question .drill-heading .eyebrow,
  .is-question .drill-heading p,
  .sentence-area > .v-chip {
    display: none;
  }
  .is-question .drill-heading .page-title {
    margin-top: 0 !important;
    font-size: 20px;
  }
  .is-question .drill-heading .v-chip {
    font-size: 11px;
    height: 24px;
  }
  .is-question .drill-progress {
    margin-top: 14px !important;
  }
  .question-context {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .picture-figure {
    width: 100%;
    max-width: 180px;
    margin: auto;
  }
  .context-sentence {
    font-size: 20px;
    line-height: 1.45;
    margin-top: 10px !important;
  }
  .sentence-area h2 {
    margin-top: 0 !important;
    font-size: 14px !important;
  }
  .meaning-options {
    grid-template-columns: 1fr;
    margin-top: 16px !important;
    gap: 8px;
  }
  .meaning-option {
    padding: 10px;
    min-height: 52px;
    font-size: 15px;
  }
  .sentence-area .v-btn {
    margin-top: 8px !important;
  }
  .question-next {
    margin-top: 14px !important;
  }
  .round-word {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
