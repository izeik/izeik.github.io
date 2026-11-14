import type { GrammarFocus } from "./lessons/shared";

export interface GrammarHint {
  label: string;
  structure: string;
  note: string;
  tenseIds: string[];
}
const hint = (
  label: string,
  structure: string,
  note: string,
  ...tenseIds: string[]
): GrammarHint => ({ label, structure, note, tenseIds });
const present = "present-simple",
  continuous = "present-continuous",
  past = "past-simple",
  perfect = "present-perfect",
  future = "future-simple";
const modal = (structure: string, note: string) =>
  hint("情态表达 · 本身不固定表示过去", structure, note);

const foundationHints: GrammarHint[] = [
  hint(
    "一般现在时 · 习惯与固定安排",
    "主语 + 动词原形；he / she / it + 动词-s",
    "本题和迁移题都是重复发生的习惯，不是此刻正在做的事。",
    present,
  ),
  hint(
    "现在进行时 · 当前动作",
    "主语 + am / is / are + 动词-ing",
    "本题 We’re looking into 和迁移题 is checking 都表示此刻正在处理。",
    continuous,
  ),
  hint(
    "一般过去时 · 已结束的过去动作",
    "主语 + 动词过去式",
    "本题 yesterday 和迁移题 last week 都把动作放在已结束的过去。",
    past,
  ),
  hint(
    "本题：现在完成时；迁移题：现在进行时",
    "have / has + 过去分词；am / is / are + 动词-ing",
    "We’ve fixed 强调现在已修好的结果；We’re still checking 强调仍在进行的过程。for 不决定时态，必须看时间关系。",
    perfect,
    continuous,
  ),
  hint(
    "将来表达 · 承诺与计划",
    "will + 原形；am / is / are going to + 原形",
    "本题 I’ll send 是承诺；迁移题 We’re going to release 说明已有计划。",
    future,
  ),
  modal(
    "Could + 主语 + 动词原形？",
    "本题与迁移题都是现在的礼貌请求；could 在这里不是过去时标志。",
  ),
  hint(
    "祈使句 · 建议安排",
    "Let’s + 动词原形；on + 日期，at + 具体时刻",
    "Let’s talk / meet 是建议，不是一般现在时陈述句；时间由 on Friday 等短语交代。",
  ),
  hint(
    "本题：一般现在时；迁移题：一般将来时",
    "We need + 名词 + to do；I will + 原形",
    "need 表示当前需要；I’ll explain 表示之后要采取的行动。不定式 to test 自身不标时态。",
    present,
    future,
  ),
  hint(
    "一般现在时 · 当前拥有",
    "I / we have + 名词",
    "have a question / suggestion 是“有”，不是现在完成时；完成时需要 have + 过去分词。",
    present,
  ),
  hint(
    "本题：can 疑问句；迁移题：一般过去时",
    "Can you + 原形？；Did you + 原形？",
    "Can you sign in 询问当前是否能登录；Did you receive 询问过去是否收到。can 不配 do，did 后用原形。",
    past,
  ),
  hint(
    "一般现在时 · 存在句",
    "There is + 单数；There are + 复数",
    "本题与迁移题都说明当前有多少会议室；过去存在可改为 there was / were。",
    present,
  ),
  hint(
    "一般现在时 · 比较当前特征",
    "主语 + is / are + 比较级 + than…",
    "比较级本身不标时态；本组用 is 描述当前方案的特征。",
    present,
  ),
  hint(
    "一般现在时 · 询问当前是否有",
    "Do / Does + 主语 + have any + 名词？",
    "some / any 不是时态；本题和迁移题用 Do you have 询问当前问题或反馈。",
    present,
  ),
  hint(
    "一般现在时 · 询问数量",
    "How much / many + 名词 + 一般疑问句？",
    "How much time do we have 用 do；How many tasks are left 用 are。先看谓语，再选疑问形式。",
    present,
  ),
  hint(
    "一般现在时主句 + 不定式",
    "主语 + plan / plans + to + 动词原形",
    "plan 表示当前计划；后面的 to contact / schedule 是非谓语形式，不能单独当作将来时。",
    present,
  ),
  hint(
    "感谢句型 · 动名词不表示进行时",
    "Thanks for + 动词-ing",
    "helping / checking 是介词 for 后的动名词；没有 am / is / are，不是现在进行时。",
  ),
  hint(
    "一般过去时 · 过去原因与结果",
    "过去状态 / 动作 + so / because + 过去状态 / 动作",
    "wasn’t finished 是一般过去时的被动结构；delayed 是过去式。不要把 wasn’t finished 当过去完成时。",
    past,
  ),
  hint(
    "一般现在时 · 频率习惯",
    "主语 + usually / rarely + 动词",
    "频率副词放在实义动词前；本题和迁移题都描述习惯。",
    present,
  ),
  hint(
    "祈使句 · 操作指引",
    "动词原形开头；否定用 Don’t + 原形",
    "Click / Restart 用于指令，没有显式主语；不按普通陈述句去加第三人称 -s。",
  ),
  hint(
    "过去叙事与当前用途",
    "过去动作：过去式；当前状态：am / is / are",
    "本题 saw / affected 是过去动作；迁移题 created 是过去式，is for testing 说明当前用途。冠词 a / the 本身没有时态。",
    past,
    present,
  ),
];

const dailyHints: GrammarHint[] = [
  hint(
    "一般现在时 · 身份或状态",
    "I am；he / she / it is；you / we / they are",
    "本课 Mia is new 描述当前状态；writes 也是一般现在时的第三人称单数。",
    present,
  ),
  modal(
    "Could you + 动词原形？",
    "Could you help 是礼貌请求；could 不表示这次求助发生在过去。",
  ),
  modal(
    "would like + 名词 / to + 动词原形",
    "would like 表示礼貌的当前需求；这里不是过去将来时。",
  ),
  modal("should + 动词原形", "should focus 表示建议或应做的事，不能在 focus 后加 -s。"),
  hint(
    "祈使句 · 指路",
    "动词原形开头：Turn left",
    "Turn 是指令；例句后半句 the stop is… 才是描述位置的一般现在时。",
    present,
  ),
  hint(
    "现在完成时 + 现在进行时",
    "have / has + 过去分词；am / is / are + 动词-ing",
    "I have finished 强调已完成的结果；I am working on 说明仍在做的部分。",
    perfect,
    continuous,
  ),
  hint(
    "条件从句用一般现在时",
    "if + 主语 + 一般现在时；主句可用 can / will + 原形",
    "if your plan changes 表示将来可能出现的条件；单数 plan 后用 changes，不机械地加 will。",
    present,
    future,
  ),
  hint(
    "一般过去时 · 否定",
    "主语 + did not + 动词原形",
    "I did not catch 说明刚才没听清；did 承担过去变化，catch 不变成 caught。",
    past,
  ),
  hint(
    "一般现在时 · 疑问句",
    "Do you have + 名词？",
    "have 在这里表示“有”，不是完成时助动词；Do 后用 have 原形。",
    present,
  ),
  modal("Could I + 动词原形？", "Could I add 表示礼貌请求发言；不是在问过去能否发言。"),
  modal(
    "Would it be possible to + 动词原形？",
    "would 让当前请求更委婉；to move 是不定式，不是过去时。",
  ),
  hint(
    "现在进行时 · 当前困难",
    "主语 + am / is / are having trouble with…",
    "am having 表示目前遇到的困难；此处 have 表示经历而不是静态拥有。",
    continuous,
  ),
  hint(
    "一般过去时 · be 动词疑问句",
    "How was + 单数名词？；Was it + 形容词？",
    "询问已经过去的周末，用 was；be 动词疑问句不再加 did。",
    past,
  ),
  hint(
    "一般将来时 · 承诺行动",
    "主语 + will + 动词原形",
    "I will check 承诺下一步；will 后的 check 不加 -s。",
    future,
  ),
  modal(
    "would love to + 动词原形",
    "I would love to 热情接受当前邀请；若动作已知可省略 to 后的动作，不是过去将来时。",
  ),
  modal(
    "might + 动词原形",
    "It might help 表示可能有帮助的建议；不是在陈述过去发生的帮助。",
  ),
  hint(
    "一般现在时 · 当前持有",
    "主语 + have / has + 名词",
    "I have a booking 表示已有预订；a booking 是名词，不是过去分词，不能把它当现在完成时。",
    present,
  ),
  hint(
    "一般现在时 · 复述当前需求",
    "you want + 名词；am I right？",
    "want 说明当前需求；you 后用 want，不加 -s。",
    present,
  ),
  hint(
    "现在进行时 · 当前感受",
    "主语 + am / is / are (not) feeling + 形容词",
    "am not feeling well 描述这会儿身体不适；feel 在谈暂时感受时可以用进行时。",
    continuous,
  ),
  hint(
    "一般现在时主句 + 不定式",
    "An option is to + 动词原形",
    "is 说明当前方案；to deliver 是不定式，本身不标时态，by Friday 也不会让 is 自动变成 will。",
    present,
  ),
  hint(
    "现在进行时 · 提问",
    "How + am / is / are + 主语 + feeling？",
    "How are you feeling 问当前感受；同句 what happened 是另一个一般过去时问题。",
    continuous,
    past,
  ),
  hint(
    "主句将来时 + 时间从句一般现在时",
    "will + 原形 + as soon as + 主语 + 一般现在时",
    "I will keep you posted 是承诺；as soon as I have details 表示将来条件下的时间关系，通常不用 will have。",
    future,
    present,
  ),
  hint(
    "现在完成时 · 否定",
    "主语 + have / has not + 过去分词",
    "it has not arrived 强调到现在还没到；arrive 要变为 arrived。",
    perfect,
  ),
  hint(
    "一般现在时 · 第三人称疑问句",
    "Does + 主语 + 动词原形？",
    "Does that make sense 中 does 已体现第三人称变化，make 不能再加 -s。",
    present,
  ),
  modal(
    "would rather + 动词原形",
    "would rather choose 表示当前偏好，不能加 to；would 在这里不标过去。",
  ),
  hint(
    "一般将来时 · 承诺后续行动",
    "主语 + will + 动词原形",
    "will look into / get back 表示承诺，两个并列动作都用原形。",
    future,
  ),
  hint(
    "what if + 一般现在时 · 现实可能",
    "What if + 主语 + 动词原形 / 第三人称单数？",
    "What if I miss the train 问可能发生的情况；本课用一般现在时。遥远假设也可用过去形式，但意思会改变。",
    present,
  ),
  hint(
    "现在完成时 · 交接结果",
    "主语 + have / has + 过去分词",
    "I have finished 强调交接时已经完成的部分；finished 是过去分词，不是 finishing。",
    perfect,
  ),
  hint(
    "现在完成时 · 经历提问",
    "Have / Has + 主语 + ever + 过去分词？",
    "Have you ever tried 问截至现在的经历；后面 what was it like 另用过去时追问那次经历。",
    perfect,
    past,
  ),
  hint(
    "一般将来时 · 落实下一步",
    "主语 + will + 动词原形",
    "I will prepare 说明之后的行动；make sure 后的 gets 描述要确保的结果。",
    future,
  ),
];

/** Explicit teaching notes; never infer that a polite could/would is past tense. */
export function grammarHint(focus: Pick<GrammarFocus, "id" | "title">): GrammarHint {
  if (focus.id >= 1001 && focus.id <= 1030) return dailyHints[focus.id - 1001]!;
  if (focus.id >= 1 && focus.id <= 20) return foundationHints[focus.id - 1]!;
  if (["work as expected", "not work as expected"].includes(focus.title))
    return hint(
      "现在进行时 · 当前运行状况",
      "主语 + is / are (not) working as expected",
      "本题和迁移题都描述当前运行情况；不要漏掉 be。",
      continuous,
    );
  if (["keep you posted", "get back to you"].includes(focus.title))
    return hint(
      "一般将来时 · 承诺回复",
      "主语 + will + 动词原形",
      "I’ll / We’ll 是 I will / We will；as / after 从句里的现在形式由其时间关系决定。",
      future,
    );
  if (focus.title === "be available for a call")
    return hint(
      "本题：can；迁移题：一般现在时",
      "can be available；主语 + is / are available",
      "can 后用 be 原形；迁移题 our support team is available 描述安排。",
      present,
    );
  if (focus.title === "meet the acceptance criteria")
    return hint(
      "本题：一般现在时；迁移题含将来表达",
      "needs to + 原形；will check whether + 主语 + 动词-s",
      "needs 是当前需要；will check 是之后检查；whether 从句 meets 描述是否达标。",
      present,
      future,
    );
  return hint(
    "本题：一般现在时；迁移题：祈使建议",
    "We need to + 动词原形；Let’s + 动词原形",
    "need 表示当前需要；to 后是非谓语原形。Let’s 提出建议，不是普通陈述句；换时间时需调整完整谓语。",
    present,
  );
}
