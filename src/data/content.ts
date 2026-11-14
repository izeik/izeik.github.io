/** Stable public entry point for all learning materials. */
import { expressions as everydayExpressions } from "./expressions";
import { professionalVocabulary } from "./professionalVocabulary";
import { additionalVocabulary } from "./additionalVocabulary";
import { dailyLessons } from "./lessons";
import { retiredLessonVocabulary } from "./retiredLessonVocabulary";

export type { Expression } from "./expressions";
const originalExpressions = [
  ...everydayExpressions,
  ...professionalVocabulary,
  ...additionalVocabulary,
];
// Saved bookmarks and progress use the original numeric IDs.
const added = new Map(
  [...retiredLessonVocabulary, ...dailyLessons.flatMap((lesson) => lesson.vocabulary)]
    .filter((word) => word.id > originalExpressions.length)
    .map((word) => [word.id, word]),
);
export const expressions = [
  ...originalExpressions,
  ...Array.from(added.values()).sort((a, b) => a.id - b.id),
];
export { questions, workplace, devExpressions } from "./conversation";
export { grammar } from "./grammar";
