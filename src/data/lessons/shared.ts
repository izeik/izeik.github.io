import type { Expression } from "../expressions";
import type { ReadingArticle } from "../articles";

export interface GrammarFocus {
  id: number;
  title: string;
  explanation: string;
  example: string;
  wrong: string;
  correct: string;
  note: string;
  scenario: string;
  task: string;
  model: string;
  followUp: string;
  followUpModel: string;
  vocabularyExpression?: string;
}

export interface DailyLesson {
  grammarBlank: string;
  day: number;
  theme: string;
  vocabularyIds: number[];
  articleVocabularyIds: number[];
  vocabulary: Expression[];
  article: ReadingArticle;
  grammar: GrammarFocus;
  review: boolean;
}

type LessonDefinition = Omit<DailyLesson, "review" | "grammar"> & {
  grammar: Pick<
    GrammarFocus,
    "id" | "title" | "explanation" | "example" | "wrong" | "correct" | "note"
  >;
};

export function defineLesson(definition: LessonDefinition): DailyLesson {
  const vocabularyIds = new Set(definition.vocabularyIds);
  if (definition.vocabulary.length !== definition.vocabularyIds.length) {
    throw new Error(`Lesson ${definition.day} vocabulary and ID lists do not match.`);
  }
  if (definition.vocabulary.some((item) => !vocabularyIds.has(item.id))) {
    throw new Error(
      `Lesson ${definition.day} vocabulary IDs do not match its word cards.`,
    );
  }
  const vocabulary = definition.vocabulary;
  const grammar: GrammarFocus = {
    ...definition.grammar,
    scenario: `结合《${definition.article.title}》中的句型，练习“${definition.theme}”相关表达。`,
    task: `参考文章里的例句：“${definition.grammar.example}” ，用同一语法说一件自己的事。`,
    model: definition.grammar.correct,
    followUp: "换一个主语、时间或工作情境，再用一次今天的句型。",
    followUpModel: definition.grammar.example,
    vocabularyExpression: vocabulary[0]?.text,
  };
  return {
    ...definition,
    vocabulary,
    grammar,
    review: false,
  };
}
