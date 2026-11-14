import type { DailyLesson } from "./lessons";
import { splitEnglishSentences } from "./articles";

export function normalizeGapAnswer(answer: string) {
  return answer.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
}

function literalPattern(text: string) {
  return new RegExp(
    "(?<![a-z])" + text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![a-z])",
    "gi",
  );
}

/** Use actual lesson sentences; retry invalid candidates rather than losing a question. */
export function lessonGaps(lesson: DailyLesson) {
  const used = new Set<string>();
  const usedQuestions = new Set([
    lesson.grammar.example.replace(literalPattern(lesson.grammarBlank), "______"),
  ]);
  const wordGaps = [];
  for (const [phrase, count] of [
    [false, 3],
    [true, 2],
  ] as const) {
    const candidates = lesson.vocabulary.filter(
      (word) => word.text.includes(" ") === phrase,
    );
    let selected = 0;
    while (candidates.length && selected < count) {
      const fresh = candidates.findIndex((word) => !used.has(word.example));
      const word = candidates.splice(Math.max(fresh, 0), 1)[0]!;
      const matches = [...word.example.matchAll(literalPattern(word.text))];
      // A second occurrence would reveal the answer in the question.
      if (matches.length !== 1) continue;
      const match = matches[0]!;
      const sentence =
        word.example.slice(0, match.index) +
        "______" +
        word.example.slice(match.index + match[0].length);
      if (usedQuestions.has(sentence)) continue;
      wordGaps.push({
        type: phrase ? "搭配" : "词汇",
        sentence,
        answer: match[0],
        hint: word.meaning,
        explanation: word.translation,
      });
      used.add(word.example);
      usedQuestions.add(sentence);
      selected++;
    }
  }
  const grammar = lesson.grammar;
  const matches = [...grammar.example.matchAll(literalPattern(lesson.grammarBlank))];
  if (matches.length !== 1) {
    throw new Error(`Lesson ${lesson.day} needs one unambiguous grammar blank.`);
  }
  const match = matches[0]!;
  const paragraph = lesson.article.paragraphs.find((item) =>
    item.text.includes(grammar.example),
  );
  const translation =
    paragraph?.sentenceTranslations[
      splitEnglishSentences(paragraph.text).indexOf(grammar.example)
    ];
  const gaps = [
    ...wordGaps,
    {
      type: "语法",
      sentence:
        grammar.example.slice(0, match.index) +
        "______" +
        grammar.example.slice(match.index + match[0].length),
      answer: match[0],
      hint: grammar.title,
      explanation: grammar.explanation + " " + (translation ?? grammar.note),
    },
  ];
  if (gaps.length < 6) {
    throw new Error(
      `Lesson ${lesson.day} needs 3 word, 2 phrase, and 1 grammar exercises.`,
    );
  }
  return gaps;
}
