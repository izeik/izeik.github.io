export interface ReviewExercise {
  sentence: string;
  answer: string;
  hint: string;
  options?: string[];
  context?: string;
}
export function validReviewExercise(value: unknown): value is ReviewExercise {
  if (!value || typeof value !== "object") return false;
  const e = value as ReviewExercise;
  return (
    ["sentence", "answer", "hint"].every(
      (k) => typeof e[k as keyof ReviewExercise] === "string",
    ) &&
    !!e.answer.trim() &&
    (e.options === undefined ||
      (Array.isArray(e.options) &&
        e.options.every((o) => typeof o === "string") &&
        e.options.includes(e.answer))) &&
    (e.context === undefined || typeof e.context === "string")
  );
}
