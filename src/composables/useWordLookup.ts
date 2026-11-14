import type { Expression } from "../data/expressions";

export interface WordLookupResult {
  word: string;
  meaning: string;
  partOfSpeech: string;
  englishDefinition?: string;
  source: "api" | "local" | "unavailable";
  updatedAt: number;
}

type DictionaryMeaning = {
  partOfSpeech?: string;
  definitions?: { definition?: string }[];
};
type DictionaryEntry = { meanings?: DictionaryMeaning[] };
type StoredWordLookup = Record<string, WordLookupResult>;

const CACHE_KEY = "eet-word-lookup-cache";
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000;
const cache = new Map<string, WordLookupResult>();
const pending = new Map<string, Promise<WordLookupResult>>();

function normalizeWord(word: string) {
  return word
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z'\s-]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/'s$/, "");
}

function readStoredCache(): StoredWordLookup {
  try {
    const stored = JSON.parse(
      localStorage.getItem(CACHE_KEY) ?? "{}",
    ) as StoredWordLookup;
    const now = Date.now();
    return Object.fromEntries(
      Object.entries(stored).filter(([, value]) => now - value.updatedAt < CACHE_TTL),
    );
  } catch {
    return {};
  }
}

function writeCache(word: string, result: WordLookupResult) {
  cache.set(word, result);
  try {
    const stored = readStoredCache();
    stored[word] = result;
    const recent = Object.entries(stored)
      .sort(([, a], [, b]) => b.updatedAt - a.updatedAt)
      .slice(0, 700);
    localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(recent)));
  } catch {
    // Keep the in-memory cache when browser storage is unavailable.
  }
}

function localEntry(word: string, expressions: Expression[]) {
  return expressions.find((entry) => normalizeWord(entry.text) === word);
}

function mapPartOfSpeech(value: string) {
  const labels: Record<string, string> = {
    noun: "名词",
    verb: "动词",
    adjective: "形容词",
    adj: "形容词",
    phrase: "短语",
    adverb: "副词",
    preposition: "介词",
    pronoun: "代词",
    conjunction: "连词",
    interjection: "感叹词",
    exclamation: "感叹词",
    determiner: "限定词",
    article: "冠词",
    auxiliary: "助动词",
    numeral: "数词",
    particle: "小品词",
    "phrasal verb": "短语动词",
  };
  return labels[value.toLowerCase()] ?? value;
}

function localFallback(word: string, expressions: Expression[]): WordLookupResult {
  const entry = localEntry(word, expressions);
  return {
    word,
    meaning: entry?.meaning ?? "暂时无法获取这个词的中文释义。",
    partOfSpeech: entry?.partOfSpeech
      ? mapPartOfSpeech(entry.partOfSpeech)
      : word.includes(" ")
        ? "短语"
        : "词性暂不可用",
    source: entry ? "local" : "unavailable",
    updatedAt: Date.now(),
  };
}

async function fetchWordLookup(
  word: string,
  expressions: Expression[],
): Promise<WordLookupResult> {
  const fallback = localFallback(word, expressions);
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
      { signal: AbortSignal.timeout(9000) },
    );
    if (!response.ok) return fallback;

    const entries = (await response.json()) as DictionaryEntry[];
    const senses = (entries ?? []).flatMap((entry) => entry.meanings ?? []);
    const posLabels = [
      ...new Set(senses.map((sense) => sense.partOfSpeech).filter(Boolean)),
    ];
    const definition = senses
      .flatMap((sense) => sense.definitions ?? [])
      .map((item) => item.definition?.trim())
      .find(Boolean);

    if (!definition) return fallback;

    let translatedMeaning = "";
    try {
      const query = new URLSearchParams({ q: word, langpair: "en|zh-CN" });
      const translationResponse = await fetch(
        `https://api.mymemory.translated.net/get?${query.toString()}`,
        { signal: AbortSignal.timeout(9000) },
      );
      if (translationResponse.ok) {
        const payload = (await translationResponse.json()) as {
          responseData?: { translatedText?: string };
        };
        translatedMeaning = payload.responseData?.translatedText?.trim() ?? "";
      }
    } catch {
      // Use a matching local gloss, or show the dictionary definition in English.
    }

    return {
      word,
      meaning:
        translatedMeaning && translatedMeaning.toLowerCase() !== word.toLowerCase()
          ? translatedMeaning
          : fallback.source === "local"
            ? fallback.meaning
            : definition,
      partOfSpeech:
        posLabels.map((pos) => mapPartOfSpeech(pos!)).join(" / ") ||
        fallback.partOfSpeech,
      englishDefinition: definition,
      source: "api",
      updatedAt: Date.now(),
    };
  } catch {
    return fallback;
  }
}

export function useWordLookup() {
  async function lookupWord(rawWord: string, expressions: Expression[]) {
    const word = normalizeWord(rawWord);
    if (!word) return localFallback(rawWord, expressions);

    const local = localFallback(word, expressions);
    if (local.source === "local" || word.includes(" ")) return local;

    const memory = cache.get(word);
    if (memory) return memory;
    const storedEntries = readStoredCache();
    if (Object.hasOwn(storedEntries, word)) {
      const stored = storedEntries[word];
      cache.set(word, stored);
      return stored;
    }
    const inFlight = pending.get(word);
    if (inFlight) return inFlight;

    const request = fetchWordLookup(word, expressions).then((result) => {
      if (result.source !== "unavailable") writeCache(word, result);
      pending.delete(word);
      return result;
    });
    pending.set(word, request);
    return request;
  }

  return { lookupWord };
}
