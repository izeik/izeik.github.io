import { COURSE_REVISION } from "../data/courseRevision";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
export interface PracticeSummary {
  attempts: number;
  correct: number;
}
/** Only totals are stored, never a timeline of individual answers. */
export const useReinforcementStore = defineStore("reinforcement", () => {
  let initial: Record<string, unknown> = {};
  const warning = ref("");
  try {
    const value = JSON.parse(localStorage.getItem("eet-reinforcement-v1") ?? "{}");
    if (value && typeof value === "object") initial = value;
  } catch {
    warning.value = "巩固摘要读取失败，本次仍可练习。";
  }
  const validCount = (v: unknown): v is number =>
    typeof v === "number" && Number.isSafeInteger(v) && v >= 0;
  const summaries = ref<Record<string, PracticeSummary>>({});
  if (initial.summaries && typeof initial.summaries === "object")
    for (const [key, value] of Object.entries(initial.summaries)) {
      const item = value as PracticeSummary;
      if (
        item &&
        validCount(item.attempts) &&
        validCount(item.correct) &&
        item.correct <= item.attempts
      )
        summaries.value[key] = { attempts: item.attempts, correct: item.correct };
    }
  const review = ref<PracticeSummary>({ attempts: 0, correct: 0 });
  const old = initial.review as PracticeSummary;
  if (
    old &&
    validCount(old.attempts) &&
    validCount(old.correct) &&
    old.correct <= old.attempts
  )
    review.value = { attempts: old.attempts, correct: old.correct };
  const completedTransfers = ref<number[]>(
    initial.courseRevision === COURSE_REVISION &&
      Array.isArray(initial.completedTransfers)
      ? [
          ...new Set(
            initial.completedTransfers.filter(
              (d): d is number => Number.isInteger(d) && d >= 1 && d <= 30,
            ),
          ),
        ]
      : [],
  );
  const legacyTransferCompletions =
    initial.legacyTransferCompletions ??
    (initial.courseRevision !== COURSE_REVISION
      ? (initial.completedTransfers ?? [])
      : []);
  watch(
    () => ({
      courseRevision: COURSE_REVISION,
      legacyTransferCompletions,
      summaries: summaries.value,
      review: review.value,
      completedTransfers: completedTransfers.value,
    }),
    (value) => {
      try {
        localStorage.setItem("eet-reinforcement-v1", JSON.stringify(value));
        warning.value = "";
      } catch {
        warning.value = "当前浏览器无法保存巩固摘要。";
      }
    },
    { deep: true },
  );
  function record(label: string, correct: boolean) {
    const item = summaries.value[label] ?? { attempts: 0, correct: 0 };
    summaries.value[label] = {
      attempts: item.attempts + 1,
      correct: item.correct + Number(correct),
    };
  }
  function recordReview(correct: boolean) {
    review.value = {
      attempts: review.value.attempts + 1,
      correct: review.value.correct + Number(correct),
    };
  }
  const weakAreas = computed(() =>
    Object.entries(summaries.value)
      .map(([label, s]) => ({ label, ...s, misses: s.attempts - s.correct }))
      .filter((s) => s.misses > 0)
      .sort((a, b) => b.misses - a.misses)
      .slice(0, 8),
  );
  function completeTransfer(day: number) {
    if (!completedTransfers.value.includes(day)) completedTransfers.value.push(day);
  }
  return {
    warning,
    summaries,
    review,
    completedTransfers,
    record,
    recordReview,
    weakAreas,
    completeTransfer,
  };
});
