import { computed, onBeforeUnmount, ref, watch } from "vue";
import { expressions, questions } from "../data/content";
import { speakingScenarios } from "../data/conversation";
import { useLearningStore } from "../stores/learning";
import { articles as baseArticles } from "../data/articles";
import { grammar as baseGrammar } from "../data/grammar";
import { dailyLessons } from "../data/lessons";

/** Central state and actions shared by the learning views. */
export function useTrainer() {
  const store = useLearningStore();
  const dailyArticleById = new Map(
    dailyLessons.map((lesson) => [lesson.article.id, lesson.article]),
  );
  const articles = baseArticles.map(
    (article) => dailyArticleById.get(article.id) ?? article,
  );
  const grammar = [...baseGrammar, ...dailyLessons.map((lesson) => lesson.grammar)];
  const nav = [
    { id: "dashboard", label: "学习首页", icon: "mdi-view-dashboard-outline" },
    { id: "vocabulary", label: "词语搭配", icon: "mdi-book-open-variant" },
    { id: "pictureDrill", label: "看图刷词", icon: "mdi-image-text" },
    { id: "reading", label: "文章阅读", icon: "mdi-book-open-page-variant-outline" },
    { id: "speaking", label: "情景口语", icon: "mdi-forum-outline" },
    { id: "pronunciation", label: "语音训练", icon: "mdi-microphone-outline" },
    { id: "grammar", label: "语法练习", icon: "mdi-text-box-check-outline" },
    { id: "tenses", label: "英语时态", icon: "mdi-clock-outline" },
    { id: "errors", label: "错误记录", icon: "mdi-notebook-edit-outline" },
    { id: "statistics", label: "学习统计", icon: "mdi-chart-box-outline" },
  ];
  type SpeechAltResult = { transcript: string };
  type SpeechAltEvent = { results: ArrayLike<ArrayLike<SpeechAltResult>> };
  type SpeechAlt = {
    lang: string;
    interimResults: boolean;
    onresult: ((e: SpeechAltEvent) => void) | null;
    onerror: (() => void) | null;
    onend: (() => void) | null;
    start: () => void;
    abort: () => void;
  };
  const page = ref("dashboard"),
    filter = ref("全部"),
    search = ref(""),
    dialogue = ref(""),
    userLine = ref(""),
    recognitionText = ref(""),
    listening = ref(false),
    recError = ref(""),
    submittedSpeech = ref(""),
    notice = ref("");
  // Browser speech is free, but quality and installed voices vary by device.
  function readSetting(key: string, fallback: string) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  }
  const speechLocale = ref(
    readSetting("eet-speech-locale", "en-US") === "en-GB" ? "en-GB" : "en-US",
  );
  const storedRate = Number(readSetting("eet-speech-rate", "0.95"));
  const speechRate = ref(storedRate >= 0.8 && storedRate <= 1.1 ? storedRate : 0.95);
  const selectedVoiceURI = ref(readSetting("eet-speech-voice", "auto"));
  const availableVoices = ref<SpeechSynthesisVoice[]>([]);
  const speechVoiceOptions = computed(() =>
    availableVoices.value
      .filter((voice) =>
        voice.lang.toLowerCase().startsWith(speechLocale.value.toLowerCase()),
      )
      .map((voice) => ({
        title: `${voice.name} (${voice.lang})`,
        value: voice.voiceURI,
      })),
  );
  const preferredSpeechVoice = computed(() => {
    const voices = availableVoices.value.filter((voice) =>
      voice.lang.toLowerCase().startsWith(speechLocale.value.toLowerCase()),
    );
    if (selectedVoiceURI.value !== "auto") {
      const selected = voices.find((voice) => voice.voiceURI === selectedVoiceURI.value);
      if (selected) return selected;
    }
    const naturalVoice = voices.find((voice) =>
      /natural|premium|neural/i.test(voice.name),
    );
    return (
      naturalVoice ??
      voices.find(
        (voice) => voice.lang.toLowerCase() === speechLocale.value.toLowerCase(),
      ) ??
      voices[0] ??
      null
    );
  });
  const speechVoiceDescription = computed(() =>
    preferredSpeechVoice.value
      ? `当前声音：${preferredSpeechVoice.value.name} · ${preferredSpeechVoice.value.lang}`
      : "当前设备暂未提供所选口音的语音，将尝试使用浏览器默认英语声音。",
  );
  const refreshSpeechVoices = () => {
    availableVoices.value = window.speechSynthesis?.getVoices() ?? [];
  };
  refreshSpeechVoices();
  window.speechSynthesis?.addEventListener("voiceschanged", refreshSpeechVoices);
  watch([speechLocale, speechRate, selectedVoiceURI], ([locale, rate, voice]) => {
    try {
      localStorage.setItem("eet-speech-locale", locale);
      localStorage.setItem("eet-speech-rate", String(rate));
      localStorage.setItem("eet-speech-voice", voice);
    } catch {
      notice.value = "声音设置仅在本次打开期间有效。";
    }
  });
  const categoryLabels: Record<string, string> = {
    Daily: "日常",
    Work: "职场沟通",
    软件开发: "软件开发",
    产品与项目: "产品与项目",
    客户沟通: "客户沟通",
  };
  const categoryLabel = (category: string) => categoryLabels[category] ?? category;
  const activeDailyLesson = computed(() =>
    dailyLessons.find(
      (lesson) =>
        lesson.vocabularyIds.length === store.planVocabularyIds.length &&
        lesson.vocabularyIds.every((id, index) => id === store.planVocabularyIds[index]),
    ),
  );
  const currentExpression = computed(() => {
    if (store.planVocabularyIds.length) {
      const activeId = store.planVocabularyIds.includes(store.expressionIndex + 1)
        ? store.expressionIndex + 1
        : store.planVocabularyIds[0]!;
      return (
        activeDailyLesson.value?.vocabulary.find((item) => item.id === activeId) ??
        expressions[activeId - 1]!
      );
    }
    return expressions[store.expressionIndex]!;
  });
  const planExpressionPosition = computed(() =>
    store.planVocabularyIds.length
      ? store.planVocabularyIds.indexOf(currentExpression.value.id)
      : -1,
  );
  const isLastPlanExpression = computed(
    () =>
      store.planVocabularyIds.length > 0 &&
      planExpressionPosition.value === store.planVocabularyIds.length - 1,
  );
  function nextExpression() {
    if (!store.planVocabularyIds.length) {
      const choices = filteredExpressions.value;
      if (!choices.length) return;
      const position = choices.findIndex(
        (word) => word.id === currentExpression.value.id,
      );
      store.expressionIndex = choices[(position + 1) % choices.length]!.id - 1;
      return;
    }
    const nextId = store.planVocabularyIds[planExpressionPosition.value + 1];
    if (nextId !== undefined) store.expressionIndex = nextId - 1;
  }
  const filteredExpressions = computed(() =>
    (activeDailyLesson.value?.vocabulary ?? expressions).filter(
      (e) =>
        (!store.planVocabularyIds.length || store.planVocabularyIds.includes(e.id)) &&
        (filter.value === "全部" ||
          e.category === filter.value ||
          categoryLabel(e.category) === filter.value ||
          (filter.value === "收藏" && store.favorites.includes(e.id)) ||
          (filter.value === "已掌握" && store.mastered.includes(e.id))) &&
        (!search.value ||
          `${e.text} ${e.meaning} ${e.example}`
            .toLowerCase()
            .includes(search.value.toLowerCase())),
    ),
  );
  const pronunciationIndex = ref(0);
  const canAdvanceExpression = computed(() =>
    store.planVocabularyIds.length
      ? !isLastPlanExpression.value
      : filteredExpressions.value.some((word) => word.id !== currentExpression.value.id),
  );
  const currentQuestion = computed(() => questions[pronunciationIndex.value]!);
  const allDialogues = speakingScenarios;
  const scenario = ref(allDialogues[0]!.label);
  const scenarioItems = computed(
    () => allDialogues.find((group) => group.label === scenario.value)!.items,
  );
  const scenarioIndex = ref(store.speakingIndex % questions.length);
  const selectedPrompt = computed(() => scenarioItems.value[scenarioIndex.value]!);
  function clearDialogue() {
    dialogue.value = "";
    userLine.value = "";
  }
  function selectScenario(label: string) {
    if (label === scenario.value) return;
    clearDialogue();
    scenario.value = label;
    scenarioIndex.value =
      label === allDialogues[0]!.label ? store.speakingIndex % questions.length : 0;
  }
  const grammarIndex = ref(0);
  const tenseId = ref("present-simple");
  const currentGrammar = computed(() => grammar[grammarIndex.value]!);
  const speak = (text: string, onEnd?: () => void, onError?: () => void) => {
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") {
      notice.value = "当前浏览器未提供语音朗读。";
      onError?.();
      return false;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => onEnd?.();
      utterance.onerror = (event) => {
        if (event.error !== "canceled" && event.error !== "interrupted") {
          notice.value = "朗读失败，请检查设备声音或稍后重试。";
        }
        onError?.();
      };
      utterance.lang = preferredSpeechVoice.value?.lang ?? speechLocale.value;
      utterance.rate = speechRate.value;
      if (preferredSpeechVoice.value) utterance.voice = preferredSpeechVoice.value;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch {
      notice.value = "朗读失败，请检查设备声音或稍后重试。";
      onError?.();
      return false;
    }
  };
  function nextQuestion() {
    clearDialogue();
    scenarioIndex.value = (scenarioIndex.value + 1) % scenarioItems.value.length;
    if (scenario.value === allDialogues[0]!.label)
      store.speakingIndex = scenarioIndex.value;
  }
  function submitLine() {
    const answer = userLine.value.trim();
    if (!answer || dialogue.value) return;
    dialogue.value = answer;
    store.logSession(2);
  }
  function submitSpeech() {
    const text = recognitionText.value.trim();
    if (!text || submittedSpeech.value) return;
    stopListening();
    submittedSpeech.value = text;
    store.logSession(2);
  }
  function nextPronunciation() {
    stopListening();
    pronunciationIndex.value = (pronunciationIndex.value + 1) % questions.length;
    recognitionText.value = "";
    submittedSpeech.value = "";
    recError.value = "";
    window.speechSynthesis?.cancel();
  }

  let activeRecognition: SpeechAlt | null = null;
  function stopListening() {
    const rec = activeRecognition;
    activeRecognition = null;
    listening.value = false;
    if (!rec) return;
    rec.onresult = null;
    rec.onerror = null;
    rec.onend = null;
    rec.abort();
  }
  function startListening() {
    if (listening.value || submittedSpeech.value) return;
    recError.value = "";
    const w = window as typeof window & {
      webkitSpeechRecognition?: new () => SpeechAlt;
      SpeechRecognition?: new () => SpeechAlt;
    };
    const C = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!C) {
      recError.value = "此浏览器暂不支持语音识别。你仍可在下方输入英文文本。";
      return;
    }
    try {
      const rec = new C();
      rec.lang = speechLocale.value;
      rec.interimResults = false;
      rec.onresult = (e) => {
        if (activeRecognition !== rec) return;
        const transcript = e.results[0]?.[0]?.transcript;
        if (transcript) recognitionText.value = transcript;
      };
      rec.onerror = () => {
        if (activeRecognition !== rec) return;
        recError.value = "未能识别语音，请重试或改用文字输入。";
        listening.value = false;
        activeRecognition = null;
      };
      rec.onend = () => {
        if (activeRecognition !== rec) return;
        listening.value = false;
        activeRecognition = null;
      };
      activeRecognition = rec;
      listening.value = true;
      rec.start();
    } catch {
      activeRecognition = null;
      listening.value = false;
      recError.value = "无法启动语音识别，请检查麦克风权限或输入英文文本。";
    }
  }
  function nextGrammar() {
    grammarIndex.value = (grammarIndex.value + 1) % grammar.length;
  }
  watch(notice, (message, _, onCleanup) => {
    if (!message) return;
    const timeout = setTimeout(() => {
      notice.value = "";
    }, 4000);
    onCleanup(() => clearTimeout(timeout));
  });
  watch(page, () => {
    stopListening();
    window.speechSynthesis?.cancel();
    notice.value = "";
  });
  onBeforeUnmount(() => {
    stopListening();
    window.speechSynthesis?.cancel();
    window.speechSynthesis?.removeEventListener("voiceschanged", refreshSpeechVoices);
  });

  return {
    store,
    nav,
    page,
    filter,
    search,
    dialogue,
    userLine,
    recognitionText,
    listening,
    recError,
    notice,
    speechLocale,
    speechRate,
    selectedVoiceURI,
    speechVoiceOptions,
    speechVoiceDescription,
    currentExpression,
    isLastPlanExpression,
    canAdvanceExpression,
    categoryLabel,
    filteredExpressions,
    currentQuestion,
    allDialogues,
    scenario,
    scenarioItems,
    scenarioIndex,
    selectedPrompt,
    grammarIndex,
    tenseId,
    currentGrammar,
    speak,
    nextExpression,
    nextQuestion,
    submitLine,
    submitSpeech,
    submittedSpeech,
    nextPronunciation,
    selectScenario,
    startListening,
    nextGrammar,
    expressions,
    articles,
    questions,
    grammar,
  };
}

export type TrainerContext = ReturnType<typeof useTrainer>;
