import { defineStore } from "pinia";
import { computed, onScopeDispose, ref, watch } from "vue";
import { expressions, questions } from "../data/content";
import { articles } from "../data/articles";
import { dailyLessons } from "../data/lessons";

interface ErrorItem {
  id: number;
  wrong: string;
  corrected: string;
  type: string;
  note: string;
  date: string;
}
interface Session {
  date: string;
  minutes: number;
  expressions: number;
  mistakes: number;
}
const STORAGE_KEY = "eet-state";

function localDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function isLocalDateKey(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    localDateKey(new Date(`${value}T12:00:00`)) === value
  );
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function numberInRange(
  value: unknown,
  minimum: number,
  maximum: number,
): value is number {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= minimum &&
    value <= maximum
  );
}
function count(value: unknown) {
  return numberInRange(value, 0, Number.MAX_SAFE_INTEGER) ? value : 0;
}
function ids(value: unknown, max: number): number[] {
  return Array.isArray(value)
    ? [...new Set(value.filter((id): id is number => numberInRange(id, 1, max)))]
    : [];
}
function restoreSessions(value: unknown): Session[] {
  if (!Array.isArray(value)) return [];
  const byDate = new Map<string, Session>();
  for (const item of value) {
    if (!isRecord(item) || !isLocalDateKey(item.date)) continue;
    const record = byDate.get(item.date) ?? {
      date: item.date,
      minutes: 0,
      expressions: 0,
      mistakes: 0,
    };
    record.minutes += count(item.minutes);
    record.expressions += count(item.expressions);
    record.mistakes += count(item.mistakes);
    byDate.set(record.date, record);
  }
  return [...byDate.values()];
}
function isErrorItem(value: unknown): value is ErrorItem {
  return (
    isRecord(value) &&
    numberInRange(value.id, 1, Number.MAX_SAFE_INTEGER) &&
    [value.wrong, value.corrected, value.type, value.note, value.date].every(
      (field) => typeof field === "string",
    )
  );
}
function restoreTasks(value: unknown): Record<string, string[]> {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string[]] =>
        /^(?:[1-9]|[12]\d|30)$/.test(entry[0]) &&
        Array.isArray(entry[1]) &&
        entry[1].every((task) => typeof task === "string"),
    ),
  );
}

export const useLearningStore = defineStore("learning", () => {
  const storageWarning = ref("");
  let saved: Record<string, unknown> = {};
  try {
    const snapshot: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (isRecord(snapshot)) saved = snapshot;
    else storageWarning.value = "原学习记录格式异常，已载入可用的初始状态。";
  } catch {
    storageWarning.value = "无法读取本地学习记录，你可以继续本次练习。";
  }
  const favorites = ref(ids(saved.favorites, expressions.length));
  const mastered = ref(ids(saved.mastered, expressions.length));
  const sessions = ref(restoreSessions(saved.sessions));
  const recordedMinutes = sessions.value.reduce(
    (total, session) => total + session.minutes,
    0,
  );
  const minutes = ref(Math.max(count(saved.minutes), recordedMinutes));
  const errors = ref<ErrorItem[]>(
    Array.isArray(saved.errors) ? saved.errors.filter(isErrorItem) : [],
  );
  // Older snapshots used Date.now() as the only ID, including for errors saved in the same millisecond.
  const usedErrorIds = new Set<number>();
  let nextErrorId = errors.value.reduce(
    (latest, item) => Math.max(latest, item.id),
    Date.now(),
  );
  for (const item of errors.value) {
    if (usedErrorIds.has(item.id)) item.id = ++nextErrorId;
    usedErrorIds.add(item.id);
  }
  const expressionIndex = ref(
    numberInRange(saved.expressionIndex, 0, expressions.length - 1)
      ? saved.expressionIndex
      : 0,
  );
  const speakingIndex = ref(
    numberInRange(saved.speakingIndex, 0, questions.length - 1) ? saved.speakingIndex : 0,
  );
  const articleCompletions = ref(ids(saved.articleCompletions, articles.length));
  const planStartDate = ref<string | null>(
    isLocalDateKey(saved.planStartDate) ? saved.planStartDate : null,
  );
  const selectedPlanDay = ref(
    numberInRange(saved.selectedPlanDay, 1, 30) ? saved.selectedPlanDay : 1,
  );
  const planCompletions = ref(restoreTasks(saved.planCompletions));
  const selectedArticleId = ref(
    numberInRange(saved.selectedArticleId, 1, articles.length)
      ? saved.selectedArticleId
      : 1,
  );
  const hasLesson =
    Array.isArray(saved.planVocabularyIds) && saved.planVocabularyIds.length > 0;
  const planVocabularyIds = ref<number[]>(
    hasLesson ? [...dailyLessons[selectedPlanDay.value - 1]!.vocabularyIds] : [],
  );
  if (hasLesson && !planVocabularyIds.value.includes(expressionIndex.value + 1)) {
    expressionIndex.value = planVocabularyIds.value[0]! - 1;
  }
  watch(
    () => ({
      favorites: favorites.value,
      mastered: mastered.value,
      minutes: minutes.value,
      sessions: sessions.value,
      errors: errors.value,
      expressionIndex: expressionIndex.value,
      speakingIndex: speakingIndex.value,
      articleCompletions: articleCompletions.value,
      planStartDate: planStartDate.value,
      selectedPlanDay: selectedPlanDay.value,
      planCompletions: planCompletions.value,
      selectedArticleId: selectedArticleId.value,
      planVocabularyIds: planVocabularyIds.value,
    }),
    (snapshot) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        storageWarning.value = "";
      } catch {
        storageWarning.value = "当前浏览器无法保存学习进度，本次练习仍可继续。";
      }
    },
    { deep: true },
  );

  const currentDate = ref(localDateKey(new Date()));
  if (typeof window !== "undefined") {
    let timer: number;
    function scheduleMidnight() {
      window.clearTimeout(timer);
      const now = new Date();
      currentDate.value = localDateKey(now);
      const nextDay = new Date(now);
      nextDay.setHours(24, 0, 0, 0);
      timer = window.setTimeout(scheduleMidnight, nextDay.getTime() - now.getTime());
    }
    scheduleMidnight();
    window.addEventListener("focus", scheduleMidnight);
    onScopeDispose(() => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", scheduleMidnight);
    });
  }
  const minutesByDay = computed(
    () => new Map(sessions.value.map((s) => [s.date, s.minutes])),
  );
  const todayMinutes = computed(() => minutesByDay.value.get(currentDate.value) ?? 0);
  const weekdayIndex = computed(
    () => (new Date(`${currentDate.value}T12:00:00`).getDay() + 6) % 7,
  );
  const weekly = computed(() => {
    const date = new Date(`${currentDate.value}T12:00:00`);
    date.setDate(date.getDate() - weekdayIndex.value);
    return Array.from({ length: 7 }, () => {
      const total = minutesByDay.value.get(localDateKey(date)) ?? 0;
      date.setDate(date.getDate() + 1);
      return total;
    });
  });
  const streak = computed(() => {
    const date = new Date(`${currentDate.value}T12:00:00`);
    if (todayMinutes.value === 0) date.setDate(date.getDate() - 1);
    let days = 0;
    while ((minutesByDay.value.get(localDateKey(date)) ?? 0) > 0) {
      days++;
      date.setDate(date.getDate() - 1);
    }
    return days;
  });
  function toggleFavorite(id: number) {
    favorites.value = favorites.value.includes(id)
      ? favorites.value.filter((x) => x !== id)
      : [...favorites.value, id];
  }
  function cycleExpression() {
    expressionIndex.value = (expressionIndex.value + 1) % expressions.length;
  }
  function markMastered(id: number) {
    const index = mastered.value.indexOf(id);
    if (index !== -1) {
      mastered.value.splice(index, 1);
      return;
    }
    mastered.value.push(id);
    logSession(2, 1, 0);
  }
  function logSession(duration = 1, learned = 0, mistakes = 0) {
    const day = localDateKey(new Date());
    currentDate.value = day;
    minutes.value += duration;
    const session = sessions.value.find((item) => item.date === day);
    if (session) {
      session.minutes += duration;
      session.expressions += learned;
      session.mistakes += mistakes;
    } else {
      sessions.value.push({
        date: day,
        minutes: duration,
        expressions: learned,
        mistakes,
      });
    }
  }
  function addError(wrong: string, corrected: string, type: string, note: string) {
    nextErrorId = Math.max(nextErrorId + 1, Date.now());
    errors.value.unshift({
      id: nextErrorId,
      wrong,
      corrected,
      type,
      note,
      date: new Date().toLocaleString("zh-CN"),
    });
  }
  function removeError(id: number) {
    errors.value = errors.value.filter((item) => item.id !== id);
  }
  function cycleSpeaking() {
    speakingIndex.value = (speakingIndex.value + 1) % questions.length;
  }
  function completeArticle(id: number) {
    if (!articleCompletions.value.includes(id)) {
      articleCompletions.value.push(id);
      logSession(5, 1, 0);
    }
  }
  function startMonthlyPlan() {
    if (!planStartDate.value) planStartDate.value = localDateKey(new Date());
  }
  function completePlanTask(day: number, taskIndex: number, duration: number) {
    startMonthlyPlan();
    const key = String(day);
    const completed = planCompletions.value[key] ?? [];
    const task = String(taskIndex);
    if (completed.includes(task)) return;
    planCompletions.value[key] = [...completed, task];
    logSession(duration, taskIndex === 0 ? 8 : taskIndex === 1 ? 1 : 0, 0);
  }
  return {
    storageWarning,
    favorites,
    mastered,
    minutes,
    sessions,
    errors,
    expressionIndex,
    speakingIndex,
    weekly,
    weekdayIndex,
    articleCompletions,
    planStartDate,
    selectedPlanDay,
    planCompletions,
    selectedArticleId,
    planVocabularyIds,
    currentDate,
    todayMinutes,
    streak,
    toggleFavorite,
    cycleExpression,
    markMastered,
    logSession,
    addError,
    removeError,
    cycleSpeaking,
    completeArticle,
    startMonthlyPlan,
    completePlanTask,
  };
});
