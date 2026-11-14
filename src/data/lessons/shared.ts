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
  context: "daily" | "work";
  conversationGoal: string;
  dialogue: { speaker: string; text: string; translation: string }[];
  extensionVocabulary: Expression[];
  theme: string;
  vocabularyIds: number[];
  articleVocabularyIds: number[];
  vocabulary: Expression[];
  vocabularyGroups: { title: string; vocabularyIds: number[] }[];
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
  if (definition.vocabulary.length !== 20 || vocabularyIds.size !== 20) {
    throw new Error(`Lesson ${definition.day} must contain exactly 20 unique words.`);
  }
  if (definition.vocabulary.length !== definition.vocabularyIds.length) {
    throw new Error(`Lesson ${definition.day} vocabulary and ID lists do not match.`);
  }
  if (definition.vocabulary.some((item) => !vocabularyIds.has(item.id))) {
    throw new Error(
      `Lesson ${definition.day} vocabulary IDs do not match its word cards.`,
    );
  }
  const vocabulary = definition.vocabulary;
  if (
    definition.dialogue.length < 4 ||
    definition.dialogue.some((turn) => !turn.text || !turn.translation)
  ) {
    throw new Error(`Lesson ${definition.day} needs a complete translated dialogue.`);
  }
  const singleCount = vocabulary.filter((word) => !word.text.includes(" ")).length;
  if (singleCount === 0 || singleCount === vocabulary.length) {
    throw new Error(`Lesson ${definition.day} must mix words and phrases.`);
  }
  const groupedIds = definition.vocabularyGroups.flatMap((group) => group.vocabularyIds);
  if (
    groupedIds.length !== 20 ||
    new Set(groupedIds).size !== 20 ||
    groupedIds.some((id) => !vocabularyIds.has(id))
  ) {
    throw new Error(`Lesson ${definition.day} word groups must cover its 20 words once.`);
  }
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
