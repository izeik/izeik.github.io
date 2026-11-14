import type { Expression } from "./expressions";
export interface ReadingToken {
  text: string;
  lookup?: string;
  phrase?: boolean;
}
const irregular: Record<string, string[]> = {
  be: ["is", "are", "was", "were", "been", "being"],
  do: ["does", "did", "done", "doing"],
  have: ["has", "had", "having"],
  make: ["makes", "made", "making"],
  take: ["takes", "took", "taken", "taking"],
  get: ["gets", "got", "gotten", "getting"],
  run: ["runs", "ran", "running"],
  keep: ["keeps", "kept", "keeping"],
  give: ["gives", "gave", "given", "giving"],
  find: ["finds", "found", "finding"],
  go: ["goes", "went", "gone", "going"],
  hang: ["hangs", "hung", "hanging"],
  put: ["puts", "putting"],
  set: ["sets", "setting"],
  come: ["comes", "came", "coming"],
};
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Longest known phrase wins; supplied lesson entries precede the general library. */
export function readingTokens(sentence: string, entries: Expression[]): ReadingToken[] {
  const seen = new Set<string>();
  const phrases = entries.filter(
    (entry) =>
      entry.text.includes(" ") &&
      !seen.has(entry.text.toLowerCase()) &&
      !!seen.add(entry.text.toLowerCase()),
  );
  const spans: { start: number; end: number; lookup: string }[] = [];
  for (const entry of phrases) {
    const [verb, ...rest] = entry.text.split(" ");
    const forms = [
      verb!,
      ...(irregular[verb!.toLowerCase()] ?? [
        verb + "s",
        verb + "ed",
        verb + "ing",
        ...(verb!.endsWith("e") ? [verb!.slice(0, -1) + "ing", verb + "d"] : []),
      ]),
    ];
    const pattern =
      "(?<![a-z])(?:" +
      forms.map(escape).join("|") +
      ")\\s+" +
      (rest.length === 1 &&
      ["pick up", "turn down", "put off", "sort out"].includes(entry.text.toLowerCase())
        ? "(?:(?:me|you|him|her|it|us|them)\\s+)?"
        : "") +
      rest.map(escape).join("\\s+") +
      "(?![a-z])";
    for (const match of sentence.matchAll(new RegExp(pattern, "gi")))
      spans.push({
        start: match.index!,
        end: match.index! + match[0].length,
        lookup: entry.text,
      });
  }
  spans.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));
  const output: ReadingToken[] = [];
  const plain = (text: string) => {
    for (const part of text.match(/[A-Za-z]+(?:['’][A-Za-z]+)*|[^A-Za-z]+/g) ?? [])
      output.push({ text: part, ...(/^[A-Za-z]/.test(part) ? { lookup: part } : {}) });
  };
  let end = 0;
  for (const span of spans) {
    if (span.start < end) continue;
    plain(sentence.slice(end, span.start));
    output.push({
      text: sentence.slice(span.start, span.end),
      lookup: span.lookup,
      phrase: true,
    });
    end = span.end;
  }
  plain(sentence.slice(end));
  return output;
}
