import type { PictureWord, PictureScope } from "./pictureVocabulary";
import { normalizeExerciseAnswer } from "./reviewExercise";
export type DrillPhase = "recognition" | "offer" | "spelling" | "summary";
export interface PictureRound {
  ids: string[];
  options: Record<string, string[]>;
  choices: Record<string, string>;
  spellings: Record<string, boolean>;
  spellingOrder: string[];
  index: number;
  phase: DrillPhase;
}
export function shuffle<T>(values: readonly T[], random = Math.random): T[] {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}
export function createPictureRound(
  words: PictureWord[],
  scope: PictureScope,
  count: number,
  seen: readonly string[] = [],
  random = Math.random,
): PictureRound {
  const pool = words.filter((w) => scope === "all" || w.category === scope);
  if (!Number.isInteger(count) || count < 5 || count > 100 || count > pool.length)
    throw Error("每轮请选择5至100词。");
  const visited = new Set(seen);
  const chosen = [
    ...shuffle(
      pool.filter((w) => !visited.has(w.id)),
      random,
    ),
    ...shuffle(
      pool.filter((w) => visited.has(w.id)),
      random,
    ),
  ].slice(0, count);
  return {
    ids: chosen.map((w) => w.id),
    options: Object.fromEntries(
      chosen.map((w) => [w.id, shuffle([w.id, ...w.peers], random)]),
    ),
    choices: {},
    spellings: {},
    spellingOrder: [],
    index: 0,
    phase: "recognition",
  };
}
export function spellingMatches(word: PictureWord, answer: string) {
  const actual = normalizeExerciseAnswer(answer);
  return (
    !!actual &&
    [word.word, ...word.variants].some(
      (value) => normalizeExerciseAnswer(value) === actual,
    )
  );
}
/** Restore only a consistent current round. History consists of totals, not answer timelines. */
export function restorePictureRound(
  value: unknown,
  words: ReadonlyMap<string, PictureWord>,
): PictureRound | null {
  if (!value || typeof value !== "object") return null;
  const r = value as PictureRound;
  if (
    !Array.isArray(r.ids) ||
    r.ids.length < 5 ||
    r.ids.length > 100 ||
    new Set(r.ids).size !== r.ids.length ||
    !r.ids.every((id) => typeof id === "string" && words.has(id))
  )
    return null;
  if (
    !Number.isInteger(r.index) ||
    r.index < 0 ||
    r.index >= r.ids.length ||
    !["recognition", "offer", "spelling", "summary"].includes(r.phase)
  )
    return null;
  const record = (v: unknown): v is Record<string, unknown> =>
    !!v && typeof v === "object" && !Array.isArray(v);
  if (!record(r.options) || !record(r.choices) || !record(r.spellings)) return null;
  for (const id of r.ids) {
    const opts = r.options[id],
      expected = new Set([id, ...words.get(id)!.peers]);
    if (
      !Array.isArray(opts) ||
      opts.length !== 4 ||
      new Set(opts).size !== 4 ||
      !opts.every((opt) => expected.has(opt))
    )
      return null;
  }
  if (
    Object.entries(r.choices).some(
      ([id, choice]) => !r.ids.includes(id) || !r.options[id]!.includes(choice),
    )
  )
    return null;
  if (
    Object.entries(r.spellings).some(
      ([id, result]) => !r.ids.includes(id) || typeof result !== "boolean",
    )
  )
    return null;
  const completed = r.ids.every((id) => Object.hasOwn(r.choices, id));
  if (r.phase !== "recognition" && !completed) return null;
  if (
    r.phase === "recognition" &&
    !r.ids.slice(0, r.index).every((id) => Object.hasOwn(r.choices, id))
  )
    return null;
  if (!Array.isArray(r.spellingOrder)) return null;
  if (r.phase === "spelling" || r.spellingOrder.length) {
    if (
      r.spellingOrder.length !== r.ids.length ||
      new Set(r.spellingOrder).size !== r.ids.length ||
      !r.spellingOrder.every((id) => r.ids.includes(id))
    )
      return null;
    if (
      r.phase === "spelling" &&
      !r.spellingOrder.slice(0, r.index).every((id) => Object.hasOwn(r.spellings, id))
    )
      return null;
    if (
      r.phase === "summary" &&
      !r.spellingOrder.every((id) => Object.hasOwn(r.spellings, id))
    )
      return null;
  }
  return {
    ids: [...r.ids],
    options: Object.fromEntries(r.ids.map((id) => [id, [...r.options[id]!]])),
    choices: { ...r.choices },
    spellings: { ...r.spellings },
    spellingOrder: [...r.spellingOrder],
    phase: r.phase,
    index: r.index,
  };
}
