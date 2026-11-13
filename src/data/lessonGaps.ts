import type { DailyLesson } from "./lessons";
import { splitEnglishSentences } from "./articles";

export function lessonGaps(lesson: DailyLesson) {
  const singles = lesson.vocabulary.filter((w) => !w.text.includes(" "));
  const phrases = lesson.vocabulary.filter((w) => w.text.includes(" "));
  const used = new Set<string>();
  const wordGaps = [];
  for (const [words, count] of [
    [singles, 3],
    [phrases, 2],
  ] as const) {
    const remaining = [...words];
    for (let selected = 0; selected < count && remaining.length; selected++) {
      const fresh = remaining.findIndex((w) => !used.has(w.example));
      const [w] = remaining.splice(Math.max(fresh, 0), 1);
      const literal = w.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pos = w.example.search(new RegExp("(?<![a-z])" + literal + "(?![a-z])", "i"));
      if (pos < 0) continue;
      const answer = w.example.slice(pos, pos + w.text.length);
      wordGaps.push({
        type: words === singles ? "词汇" : "搭配",
        sentence:
          w.example.slice(0, pos) + "______" + w.example.slice(pos + answer.length),
        answer,
        hint: w.meaning,
        explanation: w.translation,
      });
      used.add(w.example);
    }
  }
  const g = lesson.grammar;
  const p = lesson.article.paragraphs.find((p) => p.text.includes(g.example));
  const translation =
    p?.sentenceTranslations[splitEnglishSentences(p.text).indexOf(g.example)];
  return [
    ...wordGaps,
    {
      type: "语法",
      sentence: g.example.replace(lesson.grammarBlank, "______"),
      answer: lesson.grammarBlank,
      hint: g.title,
      explanation: g.explanation + " " + (translation ?? g.note),
    },
  ];
}
