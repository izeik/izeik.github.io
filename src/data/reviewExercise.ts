export interface ReviewExercise {
  sentence: string;
  answer: string;
  hint: string;
  options?: string[];
  context?: string;
  alternatives?: string[];
  /** Only open reading completions may pass on a natural alternative. */
  acceptNatural?: boolean;
}

export function normalizeExerciseAnswer(answer: string) {
  return answer.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
}

export function exerciseAnswerMatches(
  exercise: Pick<ReviewExercise, "answer" | "alternatives" | "options">,
  answer: string,
) {
  const expected = exercise.options
    ? [exercise.answer]
    : [exercise.answer, ...(exercise.alternatives ?? [])];
  const actual = normalizeExerciseAnswer(answer);
  return !!actual && expected.some((value) => normalizeExerciseAnswer(value) === actual);
}

export function acceptsNaturalReview(exercise: ReviewExercise) {
  return (
    exercise.acceptNatural === true &&
    !exercise.options &&
    exercise.sentence.includes("______")
  );
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
    (e.context === undefined || typeof e.context === "string") &&
    (e.alternatives === undefined ||
      (Array.isArray(e.alternatives) &&
        e.alternatives.every((a) => typeof a === "string" && !!a.trim()))) &&
    (e.acceptNatural === undefined || typeof e.acceptNatural === "boolean")
  );
}
