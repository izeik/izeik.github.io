import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import {
  pictureWords,
  pictureWordById,
  pictureWordParts,
  type PictureScope,
} from "../data/pictureVocabulary";
import {
  createPictureRound,
  restorePictureRound,
  shuffle,
  spellingMatches,
  type PictureRound,
} from "../data/pictureDrill";
import { useLearningStore } from "./learning";
import { useReinforcementStore } from "./reinforcement";
const KEY = "eet-picture-drill-v1";
export const usePictureDrillStore = defineStore("picture-drill", () => {
  const learning = useLearningStore(),
    reinforcement = useReinforcementStore();
  let saved: Record<string, unknown> = {};
  const warning = ref("");
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    if (value && typeof value === "object" && !Array.isArray(value)) saved = value;
  } catch {
    warning.value = "暂时无法读取刷词进度，本次仍可练习。";
  }
  const size = ref(
    typeof saved.size === "number" &&
      Number.isInteger(saved.size) &&
      saved.size >= 5 &&
      saved.size <= 100
      ? saved.size
      : 20,
  );
  const scope = ref<PictureScope>(
    saved.scope === "daily" || saved.scope === "work" ? saved.scope : "all",
  );
  const seen = ref<string[]>(
    Array.isArray(saved.seen)
      ? [
          ...new Set(
            saved.seen.filter(
              (id): id is string => typeof id === "string" && pictureWordById.has(id),
            ),
          ),
        ]
      : [],
  );
  const round = ref<PictureRound | null>(
    restorePictureRound(saved.round, pictureWordById),
  );
  if (saved.round && !round.value)
    warning.value = "上轮进度不完整，请重新开始一轮；已有词汇进度仍保留。";
  const draft = ref(
    typeof saved.draft === "string" && saved.draft.length <= 120 ? saved.draft : "",
  );
  const phase = computed(() => round.value?.phase ?? "setup");
  const current = computed(() => {
    const r = round.value;
    if (!r) return undefined;
    const id = (r.phase === "spelling" ? r.spellingOrder : r.ids)[r.index];
    return id ? pictureWordById.get(id) : undefined;
  });
  const answered = computed(() => {
    const r = round.value,
      word = current.value;
    if (!r || !word) return false;
    // Reading the keyed value keeps this computed reactive when a new answer is added.
    return r.phase === "spelling"
      ? typeof r.spellings[word.id] === "boolean"
      : typeof r.choices[word.id] === "string";
  });
  const options = computed(() =>
    current.value && round.value
      ? round.value.options[current.value.id]!.map((id) => pictureWordById.get(id)!)
      : [],
  );
  const recognitionScore = computed(() =>
    round.value
      ? round.value.ids.filter((id) => round.value!.choices[id] === id).length
      : 0,
  );
  const spellingScore = computed(() =>
    round.value ? Object.values(round.value.spellings).filter(Boolean).length : 0,
  );
  const roundWords = computed(
    () => round.value?.ids.map((id) => pictureWordById.get(id)!) ?? [],
  );
  watch(
    () => ({
      version: 1,
      size: size.value,
      scope: scope.value,
      seen: seen.value,
      round: round.value,
      draft: draft.value,
    }),
    (value) => {
      try {
        localStorage.setItem(KEY, JSON.stringify(value));
        warning.value = "";
      } catch {
        warning.value = "当前浏览器无法保存刷词进度，本轮仍可完成。";
      }
    },
    { deep: true },
  );
  function start(count: number, category: PictureScope) {
    round.value = createPictureRound(pictureWords, category, count, seen.value);
    size.value = count;
    scope.value = category;
    draft.value = "";
  }
  function choose(id: string) {
    const r = round.value,
      word = current.value;
    if (
      !r ||
      r.phase !== "recognition" ||
      !word ||
      answered.value ||
      !r.options[word.id]!.includes(id)
    )
      return;
    r.choices[word.id] = id;
    if (!seen.value.includes(word.id)) seen.value.push(word.id);
    const correct = id === word.id;
    reinforcement.record("看图刷词 · 词义", correct);
    learning.logSession(1, 0, Number(!correct));
    const exercise = {
      sentence: `${word.sentence}\n句中 ${word.word} 的含义是？`,
      answer: word.meaning,
      hint: `${word.word} · ${word.partOfSpeech} · ${word.meaning}`,
      options: options.value.map((w) => w.meaning),
      context: word.sentence,
    };
    if (correct) learning.resolveExerciseErrors("看图刷词 · 词义待复习", exercise);
    else
      learning.addError(
        pictureWordById.get(id)!.meaning,
        word.meaning,
        "看图刷词 · 词义待复习",
        word.contrast,
        exercise,
      );
  }
  function spell() {
    const r = round.value,
      word = current.value;
    if (!r || r.phase !== "spelling" || !word || answered.value || !draft.value.trim())
      return;
    const correct = spellingMatches(word, draft.value);
    r.spellings[word.id] = correct;
    reinforcement.record("看图刷词 · 拼写", correct);
    learning.logSession(1, 0, Number(!correct));
    const parts = pictureWordParts(word);
    const exercise = {
      sentence: `${parts.before}______${parts.after}`,
      answer: word.word,
      hint: `${word.meaning} · ${word.sentence}`,
      alternatives: [...word.variants],
      acceptNatural: false,
    };
    if (correct) learning.resolveExerciseErrors("看图刷词 · 拼写待复习", exercise);
    else
      learning.addError(
        draft.value.trim(),
        word.word,
        "看图刷词 · 拼写待复习",
        word.meaning,
        exercise,
      );
  }
  function next() {
    const r = round.value;
    if (!r || !answered.value || !["recognition", "spelling"].includes(r.phase)) return;
    if (r.index < r.ids.length - 1) r.index++;
    else r.phase = r.phase === "recognition" ? "offer" : "summary";
    draft.value = "";
  }
  function beginSpelling() {
    const r = round.value;
    if (!r || r.phase !== "offer") return;
    r.spellingOrder = shuffle(r.ids);
    r.index = 0;
    r.phase = "spelling";
    draft.value = "";
  }
  function skipSpelling() {
    if (round.value?.phase === "offer") round.value.phase = "summary";
  }
  function reset() {
    round.value = null;
    draft.value = "";
  }
  return {
    size,
    scope,
    seen,
    round,
    draft,
    phase,
    current,
    options,
    answered,
    recognitionScore,
    spellingScore,
    roundWords,
    warning,
    start,
    choose,
    spell,
    next,
    beginSpelling,
    skipSpelling,
    reset,
  };
});
