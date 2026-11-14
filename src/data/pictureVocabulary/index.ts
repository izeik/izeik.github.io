import daily1 from "./daily-1";
import daily2 from "./daily-2";
import daily3 from "./daily-3";
import daily4 from "./daily-4";
import work1 from "./work-1";
import work2 from "./work-2";
import work3 from "./work-3";
import work4 from "./work-4";

export type PictureScope = "all" | "daily" | "work";
export interface PictureWord {
  id: string;
  word: string;
  meaning: string;
  sentence: string;
  category: "daily" | "work";
  scene: number;
  partOfSpeech: string;
  contrast: string;
  peers: string[];
  variants: string[];
}
export const pictureScenes = [
  "朋友聚餐",
  "咖啡馆交谈",
  "租房与维修",
  "城市通勤",
  "旅行与入住",
  "购物与售后",
  "就诊与健康",
  "运动与恢复",
  "购物与预算",
  "邻里与社区",
  "邀请与安排",
  "情绪与自我调整",
  "会议与表达",
  "协商与协议",
  "项目与协作",
  "报告与分析",
  "招聘与职业",
  "培训与成长",
  "日程与工作安排",
  "分歧与调解",
  "职业社交",
  "远程协作",
  "客户与服务",
  "财务与账单",
];
const alternateSpelling: Record<string, string> = {
  fulfillment: "fulfilment",
  skeptical: "sceptical",
  "burnt-out": "burned-out",
  "well-being": "wellbeing",
  "non-exclusive": "nonexclusive",
  apologize: "apologise",
  recognize: "recognise",
  realize: "realise",
  organize: "organise",
  prioritize: "prioritise",
  authorize: "authorise",
  customize: "customise",
  stabilize: "stabilise",
  mobilize: "mobilise",
  centralize: "centralise",
  synchronize: "synchronise",
  summarize: "summarise",
  synthesize: "synthesise",
  standardize: "standardise",
  optimize: "optimise",
  visualize: "visualise",
  categorize: "categorise",
  subsidize: "subsidise",
  amortize: "amortise",
  capitalize: "capitalise",
  itemize: "itemise",
  emphasize: "emphasise",
  internalize: "internalise",
  utilize: "utilise",
  finalize: "finalise",
  systematize: "systematise",
  judgment: "judgement",
  incentivize: "incentivise",
  decentralization: "decentralisation",
  authorization: "authorisation",
};
function parse(raw: string, category: "daily" | "work", batch: number): PictureWord[] {
  const words: PictureWord[] = [];
  let scene = 0,
    partOfSpeech = "",
    title = "",
    group = -1;
  const groups: PictureWord[][] = [];
  for (const line of raw
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)) {
    if (line.startsWith("@")) {
      const [s, pos, theme] = line.slice(1).split("|");
      scene = Number(s);
      partOfSpeech = pos!;
      title = theme!;
      group++;
      groups.push([]);
    } else {
      const [word, meaning, sentence] = line.split("|");
      if (!word || !meaning || !sentence || group < 0)
        throw Error(`Invalid picture vocabulary row in batch ${batch}`);
      const entry: PictureWord = {
        id: word,
        word,
        meaning,
        sentence,
        category,
        scene,
        partOfSpeech,
        contrast: title,
        peers: [],
        variants: alternateSpelling[word] ? [alternateSpelling[word]!] : [],
      };
      groups[group]!.push(entry);
      words.push(entry);
    }
  }
  for (const entries of groups) {
    if (entries.length !== 4 || new Set(entries.map((w) => w.meaning)).size !== 4)
      throw Error(
        `Picture contrast set must contain four distinct meanings: ${category}/${batch}/${entries[0]?.contrast}`,
      );
    for (const entry of entries)
      entry.peers = entries.filter((other) => other !== entry).map((other) => other.id);
  }
  return words;
}
export const pictureWords = [
  daily1,
  daily2,
  daily3,
  daily4,
  work1,
  work2,
  work3,
  work4,
].flatMap((raw, i) => parse(raw, i < 4 ? "daily" : "work", i));
export const pictureWordById = new Map(pictureWords.map((word) => [word.id, word]));
if (pictureWords.length < 1001 || pictureWordById.size !== pictureWords.length)
  throw Error("Picture vocabulary needs more than 1000 distinct words.");
export function pictureWordParts(word: PictureWord) {
  const escaped = word.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(?<![a-z-])${escaped}(?![a-z-])`, "i");
  const match = pattern.exec(word.sentence);
  if (!match) throw Error(`Missing target word: ${word.id}`);
  return {
    before: word.sentence.slice(0, match.index),
    target: match[0],
    after: word.sentence.slice(match.index + match[0].length),
  };
}
