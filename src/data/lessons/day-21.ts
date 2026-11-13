import { defineLesson } from "./shared";

export default defineLesson({
  day: 21,
  theme: "客户报障与复现问题",
  vocabularyIds: [
    711, 257, 837, 709, 838, 832, 833, 831, 839, 169, 840, 841, 835, 842, 494, 356, 495,
    497, 499, 608,
  ],
  vocabulary: [
    {
      id: 711,
      text: "ticket",
      meaning: "工单",
      example:
        "A customer opened a support ticket because the dashboard showed an error after sign-in.",
      translation: "一位客户提交了支持工单，因为登录后仪表盘出现错误。",
      category: "职场沟通",
    },
    {
      id: 257,
      text: "dashboard",
      meaning: "仪表盘",
      example:
        "A customer opened a support ticket because the dashboard showed an error after sign-in.",
      translation: "一位客户提交了支持工单，因为登录后仪表盘出现错误。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 837,
      text: "error",
      meaning: "错误",
      example:
        "A customer opened a support ticket because the dashboard showed an error after sign-in.",
      translation: "一位客户提交了支持工单，因为登录后仪表盘出现错误。",
      category: "职场沟通",
    },
    {
      id: 709,
      text: "browser",
      meaning: "浏览器",
      example:
        "The support agent asked which browser they were using and what they had clicked just before the message appeared.",
      translation: "支持专员询问客户使用什么浏览器，以及错误出现前点击了什么。",
      category: "职场沟通",
    },
    {
      id: 838,
      text: "message",
      meaning: "消息",
      example:
        "The support agent asked which browser they were using and what they had clicked just before the message appeared.",
      translation: "支持专员询问客户使用什么浏览器，以及错误出现前点击了什么。",
      category: "职场沟通",
    },
    {
      id: 832,
      text: "screenshot",
      meaning: "截图",
      example: "She also asked them to attach a screenshot.",
      translation: "她还请客户附上截图。",
      category: "职场沟通",
    },
    {
      id: 833,
      text: "engineer",
      meaning: "工程师",
      example: "An engineer reproduced the problem in an older browser version.",
      translation: "工程师在旧版浏览器中复现了问题。",
      category: "职场沟通",
    },
    {
      id: 831,
      text: "version",
      meaning: "版本",
      example: "An engineer reproduced the problem in an older browser version.",
      translation: "工程师在旧版浏览器中复现了问题。",
      category: "职场沟通",
    },
    {
      id: 839,
      text: "outdated",
      meaning: "过时的",
      example: "The team found that one page was using an outdated setting.",
      translation: "团队发现其中一个页面使用了过时的设置。",
      category: "职场沟通",
    },
    {
      id: 169,
      text: "fix",
      meaning: "修复",
      example: "The agent kept the customer informed while the team checked the fix.",
      translation: "团队检查修复效果期间，专员持续向客户同步进度。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 840,
      text: "support ticket",
      meaning: "支持工单",
      example:
        "A customer opened a support ticket because the dashboard showed an error after sign-in.",
      translation: "一位客户提交了支持工单，因为登录后仪表盘出现错误。",
      category: "职场沟通",
    },
    {
      id: 841,
      text: "outdated setting",
      meaning: "过时的设置",
      example: "The team found that one page was using an outdated setting.",
      translation: "团队发现其中一个页面使用了过时的设置。",
      category: "职场沟通",
    },
    {
      id: 835,
      text: "browser version",
      meaning: "浏览器版本",
      example: "An engineer reproduced the problem in an older browser version.",
      translation: "工程师在旧版浏览器中复现了问题。",
      category: "职场沟通",
    },
    {
      id: 842,
      text: "support agent",
      meaning: "客服专员",
      example:
        "The support agent asked which browser they were using and what they had clicked just before the message appeared.",
      translation: "支持专员询问客户使用什么浏览器，以及错误出现前点击了什么。",
      category: "职场沟通",
    },
    {
      id: 494,
      text: "attach a screenshot",
      meaning: "附上截图",
      example: "She also asked them to attach a screenshot.",
      translation: "她还请客户附上截图。",
      category: "客户沟通",
      partOfSpeech: "phrase",
    },
    {
      id: 356,
      text: "sign",
      meaning: "签名",
      example:
        "A customer opened a support ticket because the dashboard showed an error after sign-in.",
      translation: "一位客户提交了支持工单，因为登录后仪表盘出现错误。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 495,
      text: "include the error message",
      meaning: "附上错误信息",
      example:
        "The agent asked the account owner to attach a screenshot, include the error message, and check the browser console.",
      translation: "客服请账户所有者附上截图、提供错误信息并检查浏览器控制台。",
      category: "客户沟通",
      partOfSpeech: "phrase",
    },
    {
      id: 497,
      text: "try a different browser",
      meaning: "换一个浏览器试试",
      example:
        "They could try a different browser or clear the browser cache while the team checked the fix.",
      translation: "在团队检查修复期间，他们可以尝试另一个浏览器或清除浏览器缓存。",
      category: "客户沟通",
      partOfSpeech: "phrase",
    },
    {
      id: 499,
      text: "sign in with single sign-on",
      meaning: "使用单点登录",
      example:
        "While the customer was trying to sign in with single sign-on, the dashboard was reading an outdated client configuration.",
      translation: "当客户正尝试通过单点登录登录时，仪表盘正在读取过时的客户端配置。",
      category: "客户沟通",
      partOfSpeech: "phrase",
    },
    {
      id: 608,
      text: "keep the customer informed",
      meaning: "持续告知客户进展",
      example:
        "The agent promised to keep the customer informed during the maintenance window.",
      translation: "客服承诺在维护窗口期间持续向客户通报情况。",
      category: "客户沟通",
      partOfSpeech: "phrase",
    },
  ],
  articleVocabularyIds: [
    711, 257, 837, 709, 838, 832, 833, 831, 839, 169, 840, 841, 835, 842, 494, 356, 495,
    497, 499, 608,
  ],
  article: {
    id: 21,
    title: "A Customer Reports an Error",
    topic: "客户沟通",
    level: "中级 · 约 2 分钟",
    summary:
      "围绕“客户报障与复现问题”阅读完整情境，在文章中复习当天全部词汇，并练习过去进行时：描述当时的背景动作。",
    paragraphs: [
      {
        text: "A customer opened a support ticket because the dashboard showed an error after sign-in. The support agent asked which browser they were using and what they had clicked just before the message appeared. She also asked them to attach a screenshot.",
        translation:
          "一位客户提交了支持工单，因为登录后仪表盘出现错误。支持专员询问客户使用什么浏览器，以及错误出现前点击了什么。她还请客户附上截图。",
        sentenceTranslations: [
          "一位客户提交了支持工单，因为登录后仪表盘出现错误。",
          "支持专员询问客户使用什么浏览器，以及错误出现前点击了什么。",
          "她还请客户附上截图。",
        ],
      },
      {
        text: "An engineer reproduced the problem in an older browser version. The team found that one page was using an outdated setting. They corrected it and asked the customer to try again. The agent kept the customer informed while the team checked the fix.",
        translation:
          "工程师在旧版浏览器中复现了问题。团队发现其中一个页面使用了过时的设置。他们修正了设置，并请客户再次尝试。团队检查修复效果期间，专员持续向客户同步进度。",
        sentenceTranslations: [
          "工程师在旧版浏览器中复现了问题。",
          "团队发现其中一个页面使用了过时的设置。",
          "他们修正了设置，并请客户再次尝试。",
          "团队检查修复效果期间，专员持续向客户同步进度。",
        ],
      },
      {
        text: "While the customer was trying to sign in with single sign-on, the dashboard was reading an outdated client configuration. The agent asked the account owner to attach a screenshot, include the error message, and check the browser console. They could try a different browser or clear the browser cache while the team checked the fix. The agent promised to keep the customer informed during the maintenance window. She recorded a separate feature request about showing the billing cycle and payment method during the onboarding process. She also linked the retention policy so the customer could check the data retention period against their compliance requirement.",
        translation:
          "当客户正尝试通过单点登录登录时，仪表盘正在读取过时的客户端配置。客服请账户所有者附上截图、提供错误信息并检查浏览器控制台。在团队检查修复期间，他们可以尝试另一个浏览器或清除浏览器缓存。客服承诺在维护窗口期间持续向客户通报情况。她另行记录了一项功能请求：在接入流程中显示账单周期和付款方式。她还提供了保留政策的链接，方便客户对照自己的合规要求检查数据保留期限。",
        sentenceTranslations: [
          "当客户正尝试通过单点登录登录时，仪表盘正在读取过时的客户端配置。",
          "客服请账户所有者附上截图、提供错误信息并检查浏览器控制台。",
          "在团队检查修复期间，他们可以尝试另一个浏览器或清除浏览器缓存。",
          "客服承诺在维护窗口期间持续向客户通报情况。",
          "她另行记录了一项功能请求：在接入流程中显示账单周期和付款方式。",
          "她还提供了保留政策的链接，方便客户对照自己的合规要求检查数据保留期限。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What information did the support agent request?",
        options: [
          "The browser and the steps before the error.",
          "The customer's password.",
          "A list of every page they had visited.",
        ],
        answer: 0,
        explanation:
          "The browser version and the action taken before the error help the team reproduce it.",
      },
      {
        prompt: "Which sentence matches the reading and today's language focus?",
        options: [
          "She asked which browser they use at that time.",
          "She asked which browser they were using.",
        ],
        answer: 1,
        explanation:
          "was/were + -ing 描述过去某个时刻正在进行的动作。 描述当时正在使用的浏览器，用 were using。 回到文章找出这个句型，再用当天的两个词汇描述“客户报障与复现问题”的情境。",
      },
      {
        prompt: "In this reading, what does “attach a screenshot” mean?",
        options: ["附上截图", "付款方式", "数据保留策略"],
        answer: 0,
        explanation:
          "结合原句理解：The agent asked the account owner to attach a screenshot, include the error message, and check the browser console.（客服请账户所有者附上截图、提供错误信息并检查浏览器控制台。）",
      },
    ],
    gap: {
      sentence:
        "The agent asked the account owner to ______, include the error message, and check the browser console.",
      answer: "attach a screenshot",
      hint: "提示：附上截图",
    },
  },
  grammarBlank: "were using",
  grammar: {
    id: 1021,
    title: "过去进行时：描述当时的背景动作",
    explanation: "was/were + -ing 描述过去某个时刻正在进行的动作。",
    example:
      "The support agent asked which browser they were using and what they had clicked just before the message appeared.",
    wrong: "She asked which browser they use at that time.",
    correct: "She asked which browser they were using.",
    note: "描述当时正在使用的浏览器，用 were using。 回到文章找出这个句型，再用当天的两个词汇描述“客户报障与复现问题”的情境。",
  },
});
