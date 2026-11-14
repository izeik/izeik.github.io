import { splitEnglishSentences, type ReadingArticle, type ReadingGap } from "./articles";
import type { Expression } from "./expressions";

const normalize = (text: string) =>
  text.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
const pattern = (text: string) =>
  new RegExp(
    "(?<![a-z])" + text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![a-z])",
    "gi",
  );

/** Keep the curated seed and add a word and a phrase from this reading's own context. */
export function readingGaps(
  article: ReadingArticle,
  vocabulary: Expression[],
): ReadingGap[] {
  const sentences = article.paragraphs.flatMap((paragraph) =>
    splitEnglishSentences(paragraph.text),
  );
  let seed = { ...article.gap };
  // Some older seeds accidentally repeat the answer outside the blank.
  if (seed.sentence.match(pattern(seed.answer))) {
    const original = sentences.find(
      (sentence) => [...sentence.matchAll(pattern(seed.answer))].length === 1,
    );
    if (!original)
      throw new Error(`Reading ${article.id} needs an unambiguous seed gap.`);
    const match = [...original.matchAll(pattern(seed.answer))][0]!;
    seed = {
      ...seed,
      sentence:
        original.slice(0, match.index) +
        "______" +
        original.slice(match.index + match[0].length),
      answer: match[0],
    };
  }
  const gaps: ReadingGap[] = [seed];
  const usedAnswers = new Set([normalize(seed.answer)]);
  const usedSentences = new Set([seed.sentence.replace("______", seed.answer)]);
  const seen = new Set<string>();
  const candidates = vocabulary.filter((word) => {
    const key = normalize(word.text);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  for (const phrase of [false, true]) {
    let selected = false;
    for (const freshOnly of [true, false]) {
      for (const word of candidates) {
        if (word.text.includes(" ") !== phrase || usedAnswers.has(normalize(word.text)))
          continue;
        const original = sentences.find(
          (sentence) =>
            (!freshOnly || !usedSentences.has(sentence)) &&
            [...sentence.matchAll(pattern(word.text))].length === 1,
        );
        if (!original) continue;
        const match = [...original.matchAll(pattern(word.text))][0]!;
        const sentence =
          original.slice(0, match.index) +
          "______" +
          original.slice(match.index + match[0].length);
        if (gaps.some((gap) => gap.sentence === sentence)) continue;
        gaps.push({ sentence, answer: match[0], hint: word.meaning });
        usedAnswers.add(normalize(match[0]));
        usedSentences.add(original);
        selected = true;
        break;
      }
      if (selected) break;
    }
    if (!selected)
      throw new Error(
        `Reading ${article.id} needs a ${phrase ? "phrase" : "word"} gap from its own text.`,
      );
  }
  return gaps;
}
