import { professionalVocabulary } from "./professionalVocabulary";

/** Practical grammar notes paired with short workplace and daily speaking tasks. */
const practiceTasks = [
  [
    "告诉同事你的固定工作安排。",
    "我每周三天在家办公。",
    "I work from home three days a week.",
    "改成“我每天早上查看项目进度”。",
    "I check the project status every morning.",
  ],
  [
    "告诉客户你们此刻正在调查登录问题。",
    "我们正在调查登录问题。",
    "We’re looking into the login issue.",
    "改成“工程师正在检查日志”。",
    "The engineer is checking the logs.",
  ],
  [
    "向团队说明昨天完成了什么。",
    "我昨天修复了支付页面的问题。",
    "I fixed the issue on the payment page yesterday.",
    "改成“我们上周发布了更新”。",
    "We released the update last week.",
  ],
  [
    "回复客户，说明问题已经修复。",
    "我们已经修复这个问题。",
    "We’ve fixed the issue.",
    "再补充“我们还在确认原因”。",
    "We’re still checking the cause.",
  ],
  [
    "告诉客户你打算明天发送更新。",
    "我明天会把更新发给你。",
    "I’ll send you an update tomorrow.",
    "改成已有计划的表达：“我们计划下周发布”。",
    "We’re going to release it next week.",
  ],
  [
    "礼貌地请同事确认一个需求。",
    "你能确认一下这个需求吗？",
    "Could you confirm this requirement?",
    "再请对方今天回复。",
    "Could you get back to me today?",
  ],
  [
    "和客户约定周五上午十点通话。",
    "我们周五上午十点通话吧。",
    "Let’s talk on Friday at 10 a.m.",
    "改约周二下午三点。",
    "Let’s meet on Tuesday at 3 p.m.",
  ],
  [
    "在会议中说明你们需要更多测试时间。",
    "我们需要更多时间来测试这个功能。",
    "We need more time to test this feature.",
    "补充“我会今天解释原因”。",
    "I’ll explain the reason today.",
  ],
  [
    "告诉客户你有一个问题。",
    "我有一个关于账单的问题。",
    "I have a question about the bill.",
    "改成“我们还有一个建议”。",
    "We have a suggestion.",
  ],
  [
    "询问客户是否能登录。",
    "你能登录账户吗？",
    "Can you sign in to your account?",
    "询问对方是否收到邮件。",
    "Did you receive the email?",
  ],
  [
    "告知团队办公室附近有两个会议室。",
    "我们办公室附近有两个会议室。",
    "There are two meeting rooms near our office.",
    "改成说明只有一个可用会议室。",
    "There is one meeting room available.",
  ],
  [
    "向同事说明新流程更快。",
    "新流程比旧流程快。",
    "The new process is faster than the old one.",
    "比较两个方案：这个方案更简单。",
    "This option is simpler.",
  ],
  [
    "询问客户有没有其他问题。",
    "你还有其他问题吗？",
    "Do you have any other questions?",
    "礼貌询问是否有反馈。",
    "Do you have any feedback?",
  ],
  [
    "询问项目还剩多少时间。",
    "我们还剩多少时间？",
    "How much time do we have left?",
    "询问还剩多少任务。",
    "How many tasks are left?",
  ],
  [
    "告诉经理你计划联系客户。",
    "我计划今天联系客户。",
    "I plan to contact the customer today.",
    "换成打算安排一次跟进会议。",
    "I plan to schedule a follow-up meeting.",
  ],
  [
    "感谢同事帮你复现问题。",
    "谢谢你帮我复现这个问题。",
    "Thanks for helping me reproduce the issue.",
    "感谢对方检查日志。",
    "Thanks for checking the logs.",
  ],
  [
    "解释你为什么推迟发布。",
    "测试还没完成，所以我们推迟了发布。",
    "Testing wasn’t finished, so we delayed the release.",
    "用 because 说明“我们推迟发布，因为测试还没完成”。",
    "We delayed the release because testing wasn’t finished.",
  ],
  [
    "告诉同事你通常多久查看一次工单。",
    "我通常每天早上查看工单。",
    "I usually check the tickets every morning.",
    "描述“我很少在周末查看邮件”。",
    "I rarely check email on weekends.",
  ],
  [
    "给客户一个清楚的操作指引。",
    "请点击右上角的设置。",
    "Click Settings in the top-right corner.",
    "告诉对方重新启动应用。",
    "Restart the app.",
  ],
  [
    "向客户讲述你昨天看到的一个问题。",
    "我看到了一个错误。这个错误影响了登录。",
    "I saw an error. The error affected sign-in.",
    "再练一次：我创建了一个账户。这个账户用于测试。",
    "I created an account. The account is for testing.",
  ],
];

const grammarFoundations = [
  [
    "Present Simple",
    "描述习惯、事实和固定安排。主语是 he/she/it 时，动词通常加 s。",
    "I work from home twice a week.",
    "She work from home.",
    "She works from home.",
    "注意第三人称单数动词变化。",
  ],
  [
    "Present Continuous",
    "描述正在发生或暂时进行的事情：be + 动词-ing。",
    "I’m learning how to cook.",
    "I learn how to cook right now.",
    "I’m learning how to cook right now.",
    "强调此刻正在做，用进行时。",
  ],
  [
    "Past Simple",
    "描述过去已经结束的事情，常与 yesterday、last week 一起使用。",
    "We met at a café yesterday.",
    "We meet at a café yesterday.",
    "We met at a café yesterday.",
    "过去发生的动作要用过去式。",
  ],
  [
    "Present Perfect",
    "描述过去开始并与现在有关的经历或结果：have/has + 过去分词。",
    "I’ve worked here for two years.",
    "I work here since two years.",
    "I’ve worked here for two years.",
    "for 表示时长；本句强调持续到现在，所以用现在完成时。",
  ],
  [
    "Future",
    "will 常用于临时决定或预测；going to 常用于已有计划。",
    "I’m going to visit my parents this weekend.",
    "I going to visit my parents this weekend.",
    "I’m going to visit my parents this weekend.",
    "going to 前面要有 be 动词。",
  ],
  [
    "Modal Verbs",
    "can、could、should 后面直接接动词原形。",
    "Could you send me the file?",
    "Could you to send me the file?",
    "Could you send me the file?",
    "情态动词后不要加 to。",
  ],
  [
    "Prepositions",
    "常见搭配要一起记：on Monday、at 9、in the morning。",
    "Let’s meet on Friday at 9.",
    "Let’s meet in Friday on 9.",
    "Let’s meet on Friday at 9.",
    "日期用 on，具体时刻用 at。",
  ],
  [
    "Sentence Structure",
    "英语常用“主语 + 动词 + 宾语”顺序。",
    "I really like this neighborhood.",
    "Really like I this neighborhood.",
    "I really like this neighborhood.",
    "陈述句中主语通常放在动词前。",
  ],
  [
    "Countable Nouns",
    "可数名词单数前通常需要 a/an；复数可以用 some。",
    "I have a question.",
    "I have question.",
    "I have a question.",
    "单数可数名词前加冠词。",
  ],
  [
    "Questions",
    "一般疑问句把助动词或 be 动词放在主语前。",
    "Do you work nearby?",
    "You work nearby?",
    "Do you work nearby?",
    "一般现在时提问常用 do/does。",
  ],
  [
    "There is / are",
    "there is 搭配单数，there are 搭配复数。",
    "There are two cafés near my office.",
    "There is two cafés near my office.",
    "There are two cafés near my office.",
    "主谓数量要一致。",
  ],
  [
    "Comparatives",
    "比较两者时常用形容词-er 或 more + 形容词。",
    "This route is faster than the other one.",
    "This route is more fast than the other one.",
    "This route is faster than the other one.",
    "短形容词通常加 -er。",
  ],
  [
    "Some / Any",
    "肯定句中常用 some，否定和一般疑问句中常用 any。",
    "Do you have any recommendations?",
    "Do you have some recommendations?",
    "Do you have any recommendations?",
    "一般疑问句中常用 any。",
  ],
  [
    "Much / Many",
    "many 修饰可数名词，much 修饰不可数名词。",
    "How much time do we have?",
    "How many time do we have?",
    "How much time do we have?",
    "time 表示时间时通常不可数。",
  ],
  [
    "Infinitives",
    "有些动词后接 to + 动词原形，如 want to、plan to。",
    "I plan to call her tonight.",
    "I plan calling her tonight.",
    "I plan to call her tonight.",
    "plan 后常接 to do。",
  ],
  [
    "Gerunds",
    "介词后面的动词通常使用 -ing 形式。",
    "Thanks for helping me.",
    "Thanks for help me.",
    "Thanks for helping me.",
    "介词 for 后接动名词。",
  ],
  [
    "Because / So",
    "because 引导原因，so 引导结果；同一句通常不需要两者都用。",
    "I was tired, so I went home early.",
    "Because I was tired, so I went home.",
    "Because I was tired, I went home.",
    "避免 because 与 so 在同一因果句中重复使用。",
  ],
  [
    "Adverbs",
    "频率副词通常放在实义动词之前、be 动词之后。",
    "I usually take the bus.",
    "I take usually the bus.",
    "I usually take the bus.",
    "usually 放在实义动词前。",
  ],
  [
    "Imperatives",
    "给建议或指令时，常用动词原形开头。",
    "Take the second street on the left.",
    "You take the second street on the left.",
    "Take the second street on the left.",
    "祈使句通常省略 you。",
  ],
  [
    "Articles",
    "第一次提到单数事物常用 a/an，再次提到可用 the。",
    "I saw a dog. The dog was very friendly.",
    "I saw dog. Dog was very friendly.",
    "I saw a dog. The dog was very friendly.",
    "单数可数名词需要冠词。",
  ],
].map((g, i) => ({
  id: i + 1,
  title: g[0],
  explanation: g[1],
  example: g[2],
  wrong: g[3],
  correct: g[4],
  note: g[5],
  scenario: practiceTasks[i]![0],
  task: practiceTasks[i]![1],
  model: practiceTasks[i]![2],
  followUp: practiceTasks[i]![3],
  followUpModel: practiceTasks[i]![4],
  vocabularyExpression: undefined as string | undefined,
}));

const phraseExamples: Record<string, [string, string]> = {
  "work as expected": [
    "The feature is working as expected.",
    "The update is working as expected so far.",
  ],
  "not work as expected": [
    "The feature is not working as expected.",
    "The login flow is not working as expected.",
  ],
  "keep you posted": [
    "I’ll keep you posted as we investigate.",
    "We’ll keep you posted on the release date.",
  ],
  "get back to you": [
    "I’ll get back to you after I check the logs.",
    "We’ll get back to you with an update tomorrow.",
  ],
  "be available for a call": [
    "I can be available for a call tomorrow.",
    "Our support team is available for a call this afternoon.",
  ],
  "meet the acceptance criteria": [
    "The feature needs to meet the acceptance criteria.",
    "We’ll check whether the update meets the acceptance criteria.",
  ],
};

const phrasePractice = professionalVocabulary
  .filter(
    (entry) =>
      entry.partOfSpeech === "phrase" &&
      ["职场沟通", "客户沟通", "产品与项目", "软件开发"].includes(entry.category),
  )
  .map((entry, index) => {
    const [model, followUpModel] = phraseExamples[entry.text] ?? [
      `We need to ${entry.text} before the next release.`,
      `Let’s ${entry.text} before we update the customer.`,
    ];
    const scenario =
      entry.category === "客户沟通"
        ? "客户沟通：说明处理进度、确认需求或安排下一步。"
        : entry.category === "软件开发"
          ? "软件开发：和团队讨论问题、代码或发布安排。"
          : entry.category === "产品与项目"
            ? "项目协作：讨论范围、优先级和交付进度。"
            : "职场沟通：在会议或工作交流中清楚表达。";

    return {
      id: grammarFoundations.length + index + 1,
      title: entry.text,
      explanation: `这个词语搭配表示“${entry.meaning}”。把它作为一个整体放进完整句子里，比逐个翻译单词更自然。`,
      example: model,
      wrong: "逐词翻译中文，容易漏掉搭配中的介词、冠词或语序。",
      correct: model,
      note: `核心表达：${entry.text}。注意按句意调整时态和主语。`,
      scenario,
      task: `请在这个场景中用 “${entry.text}” 组织一句完整英文。可以补充原因、时间或下一步。`,
      model,
      followUp: `换一个相近的工作情境，再用一次 “${entry.text}”。试着改变主语或时间。`,
      followUpModel,
      vocabularyExpression: entry.text,
    };
  });

export const grammar = [...grammarFoundations, ...phrasePractice];
