import { defineLesson } from "./shared";

export default defineLesson({
  day: 17,
  theme: "定位根本原因",
  vocabularyIds: [
    256, 226, 178, 800, 193, 801, 802, 803, 804, 167, 805, 806, 807, 808, 514, 168, 455,
    480, 172, 339,
  ],
  vocabulary: [
    {
      id: 256,
      text: "alert",
      meaning: "警报",
      example:
        "An alert reported that a service was failing, but restarting it only fixed the problem for a few minutes.",
      translation: "一条告警报告说某项服务发生故障，但重启只能让问题消失几分钟。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 226,
      text: "service",
      meaning: "服务",
      example:
        "An alert reported that a service was failing, but restarting it only fixed the problem for a few minutes.",
      translation: "一条告警报告说某项服务发生故障，但重启只能让问题消失几分钟。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 178,
      text: "failure",
      meaning: "故障",
      example:
        "The on-call engineer checked logs from the time of each failure and compared them with traffic levels.",
      translation: "值班工程师查看了每次故障发生时的日志，并将它们与流量水平进行比较。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 800,
      text: "traffic",
      meaning: "流量",
      example:
        "The on-call engineer checked logs from the time of each failure and compared them with traffic levels.",
      translation: "值班工程师查看了每次故障发生时的日志，并将它们与流量水平进行比较。",
      category: "职场沟通",
    },
    {
      id: 193,
      text: "database",
      meaning: "数据库",
      example: "The service was running out of database connections during busy periods.",
      translation: "繁忙时段服务的数据库连接会耗尽。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 801,
      text: "connections",
      meaning: "连接",
      example: "The service was running out of database connections during busy periods.",
      translation: "繁忙时段服务的数据库连接会耗尽。",
      category: "职场沟通",
    },
    {
      id: 802,
      text: "simultaneous",
      meaning: "同时的",
      example:
        "The engineer limited the number of simultaneous requests and added an alert for connection usage.",
      translation: "工程师限制了同时发出的请求数量，并添加了连接用量告警。",
      category: "职场沟通",
    },
    {
      id: 803,
      text: "requests",
      meaning: "请求",
      example:
        "The engineer limited the number of simultaneous requests and added an alert for connection usage.",
      translation: "工程师限制了同时发出的请求数量，并添加了连接用量告警。",
      category: "职场沟通",
    },
    {
      id: 804,
      text: "usage",
      meaning: "用量",
      example:
        "The engineer limited the number of simultaneous requests and added an alert for connection usage.",
      translation: "工程师限制了同时发出的请求数量，并添加了连接用量告警。",
      category: "职场沟通",
    },
    {
      id: 167,
      text: "issue",
      meaning: "问题",
      example:
        "Looking for the root cause prevented the same issue from returning every hour.",
      translation: "查找根本原因，避免了同一问题每小时反复出现。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 805,
      text: "traffic levels",
      meaning: "流量水平",
      example:
        "The on-call engineer checked logs from the time of each failure and compared them with traffic levels.",
      translation: "值班工程师查看了每次故障发生时的日志，并将它们与流量水平进行比较。",
      category: "职场沟通",
    },
    {
      id: 806,
      text: "busy periods",
      meaning: "繁忙时段",
      example: "The service was running out of database connections during busy periods.",
      translation: "繁忙时段服务的数据库连接会耗尽。",
      category: "职场沟通",
    },
    {
      id: 807,
      text: "connection usage",
      meaning: "连接使用量",
      example:
        "The engineer limited the number of simultaneous requests and added an alert for connection usage.",
      translation: "工程师限制了同时发出的请求数量，并添加了连接用量告警。",
      category: "职场沟通",
    },
    {
      id: 808,
      text: "database connections",
      meaning: "数据库连接",
      example: "The service was running out of database connections during busy periods.",
      translation: "繁忙时段服务的数据库连接会耗尽。",
      category: "职场沟通",
    },
    {
      id: 514,
      text: "connection pool",
      meaning: "连接池",
      example: "The team later improved the connection pool.",
      translation: "之后，团队改进了连接池。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 168,
      text: "root cause",
      meaning: "根本原因",
      example:
        "Looking for the root cause prevented the same issue from returning every hour.",
      translation: "查找根本原因，避免了同一问题每小时反复出现。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 455,
      text: "pinpoint the root cause",
      meaning: "精准定位根本原因",
      example:
        "Comparing each log and stack trace helped the engineer pinpoint the root cause of the failure.",
      translation: "比较每条日志和堆栈跟踪帮助工程师查明了故障的根本原因。",
      category: "软件开发",
      partOfSpeech: "phrase",
    },
    {
      id: 480,
      text: "cause a service interruption",
      meaning: "导致服务中断",
      example:
        "The workaround was to apply a rate limit so heavy traffic would not cause a service interruption.",
      translation: "临时解决方案是实施速率限制，防止高流量造成服务中断。",
      category: "软件开发",
      partOfSpeech: "phrase",
    },
    {
      id: 172,
      text: "workaround",
      meaning: "临时解决办法",
      example:
        "The workaround was to apply a rate limit so heavy traffic would not cause a service interruption.",
      translation: "临时解决方案是实施速率限制，防止高流量造成服务中断。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 339,
      text: "log",
      meaning: "日志",
      example:
        "Comparing each log and stack trace helped the engineer pinpoint the root cause of the failure.",
      translation: "比较每条日志和堆栈跟踪帮助工程师查明了故障的根本原因。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
  ],
  articleVocabularyIds: [
    256, 226, 178, 800, 193, 801, 802, 803, 804, 167, 805, 806, 807, 808, 514, 168, 455,
    480, 172, 339,
  ],
  article: {
    id: 17,
    title: "Finding the Root Cause",
    topic: "软件开发",
    level: "中级 · 约 2 分钟",
    summary:
      "围绕“定位根本原因”阅读完整情境，在文章中复习当天全部词汇，并练习动名词作主语：说明行动的作用。",
    paragraphs: [
      {
        text: "An alert reported that a service was failing, but restarting it only fixed the problem for a few minutes. The on-call engineer checked logs from the time of each failure and compared them with traffic levels.",
        translation:
          "一条告警报告说某项服务发生故障，但重启只能让问题消失几分钟。值班工程师查看了每次故障发生时的日志，并将它们与流量水平进行比较。",
        sentenceTranslations: [
          "一条告警报告说某项服务发生故障，但重启只能让问题消失几分钟。",
          "值班工程师查看了每次故障发生时的日志，并将它们与流量水平进行比较。",
        ],
      },
      {
        text: "The service was running out of database connections during busy periods. The engineer limited the number of simultaneous requests and added an alert for connection usage. The team later improved the connection pool. Looking for the root cause prevented the same issue from returning every hour.",
        translation:
          "繁忙时段服务的数据库连接会耗尽。工程师限制了同时发出的请求数量，并添加了连接用量告警。之后，团队改进了连接池。查找根本原因，避免了同一问题每小时反复出现。",
        sentenceTranslations: [
          "繁忙时段服务的数据库连接会耗尽。",
          "工程师限制了同时发出的请求数量，并添加了连接用量告警。",
          "之后，团队改进了连接池。",
          "查找根本原因，避免了同一问题每小时反复出现。",
        ],
      },
      {
        text: "Comparing each log and stack trace helped the engineer pinpoint the root cause of the failure. An exception appeared before each crash because the database connection pool was full, making each retry end in a timeout. The workaround was to apply a rate limit so heavy traffic would not cause a service interruption. The engineer checked authentication, authorization, and permission settings to rule out an access issue. Monitoring the service with a new alert helped the team confirm that the connection pool change worked.",
        translation:
          "比较每条日志和堆栈跟踪帮助工程师查明了故障的根本原因。由于数据库连接池已满，每次崩溃前都会出现异常，导致每次重试都以超时结束。临时解决方案是实施速率限制，防止高流量造成服务中断。工程师检查了身份验证、授权和权限设置，以排除访问问题。通过新警报监控服务，帮助团队确认连接池变更有效。",
        sentenceTranslations: [
          "比较每条日志和堆栈跟踪帮助工程师查明了故障的根本原因。",
          "由于数据库连接池已满，每次崩溃前都会出现异常，导致每次重试都以超时结束。",
          "临时解决方案是实施速率限制，防止高流量造成服务中断。",
          "工程师检查了身份验证、授权和权限设置，以排除访问问题。",
          "通过新警报监控服务，帮助团队确认连接池变更有效。",
        ],
      },
    ],
    questions: [
      {
        prompt: "Why was restarting the service not enough?",
        options: [
          "It only hid the problem briefly.",
          "The database had been removed.",
          "The alert was sent to the wrong team.",
        ],
        answer: 0,
        explanation:
          "The underlying shortage of connections remained, so the issue returned.",
      },
      {
        prompt: "Which sentence matches the reading and today's language focus?",
        options: [
          "Look for the root cause prevented the issue.",
          "Looking for the root cause prevented the issue.",
        ],
        answer: 1,
        explanation:
          "动词 -ing 可以放在句首表示一件事，后面说明它带来的结果。 句首的 Looking for 表示“寻找这个动作”。 回到文章找出这个句型，再用当天的两个词汇描述“定位根本原因”的情境。",
      },
      {
        prompt: "In this reading, what does “connection pool” mean?",
        options: ["连接池", "授权", "权限"],
        answer: 0,
        explanation:
          "结合原句理解：An exception appeared before each crash because the database connection pool was full, making each retry end in a timeout.（由于数据库连接池已满，每次崩溃前都会出现异常，导致每次重试都以超时结束。）",
      },
    ],
    gap: {
      sentence:
        "An exception appeared before each crash because the database ______ was full, making each retry end in a timeout.",
      answer: "connection pool",
      hint: "提示：连接池",
    },
  },
  grammarBlank: "Looking",
  grammar: {
    id: 1017,
    title: "动名词作主语：说明行动的作用",
    explanation: "动词 -ing 可以放在句首表示一件事，后面说明它带来的结果。",
    example:
      "Looking for the root cause prevented the same issue from returning every hour.",
    wrong: "Look for the root cause prevented the issue.",
    correct: "Looking for the root cause prevented the issue.",
    note: "句首的 Looking for 表示“寻找这个动作”。 回到文章找出这个句型，再用当天的两个词汇描述“定位根本原因”的情境。",
  },
});
