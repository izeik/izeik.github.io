import { defineLesson } from "./shared";

export default defineLesson({
  day: 23,
  theme: "阅读 API 文档",
  vocabularyIds: [
    853, 116, 398, 397, 120, 118, 308, 226, 854, 855, 856, 857, 858, 859, 175, 115, 204,
    205, 346, 207,
  ],
  vocabulary: [
    {
      id: 853,
      text: "documentation",
      meaning: "文档",
      example:
        "Before connecting a service to a new API, Ravi read the documentation for the endpoint.",
      translation: "在把某项服务接入新 API 前，拉维阅读了该接口的文档。",
      category: "职场沟通",
    },
    {
      id: 116,
      text: "endpoint",
      meaning: "端点",
      example:
        "Before connecting a service to a new API, Ravi read the documentation for the endpoint.",
      translation: "在把某项服务接入新 API 前，拉维阅读了该接口的文档。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 398,
      text: "required",
      meaning: "必填的",
      example:
        "It listed the required parameters, the expected response, and an example request.",
      translation: "文档列出了必需参数、预期响应和请求示例。",
      category: "软件开发",
      partOfSpeech: "adj",
    },
    {
      id: 397,
      text: "optional",
      meaning: "可选的",
      example: "One parameter was optional, but the customer ID was required.",
      translation: "一个参数是可选的，但客户 ID 是必需的。",
      category: "软件开发",
      partOfSpeech: "adj",
    },
    {
      id: 120,
      text: "parameter",
      meaning: "参数",
      example: "One parameter was optional, but the customer ID was required.",
      translation: "一个参数是可选的，但客户 ID 是必需的。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 118,
      text: "response",
      meaning: "响应",
      example:
        "It listed the required parameters, the expected response, and an example request.",
      translation: "文档列出了必需参数、预期响应和请求示例。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 308,
      text: "request",
      meaning: "请求",
      example:
        "It listed the required parameters, the expected response, and an example request.",
      translation: "文档列出了必需参数、预期响应和请求示例。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 226,
      text: "service",
      meaning: "服务",
      example:
        "Before connecting a service to a new API, Ravi read the documentation for the endpoint.",
      translation: "在把某项服务接入新 API 前，拉维阅读了该接口的文档。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 854,
      text: "example",
      meaning: "示例",
      example:
        "It listed the required parameters, the expected response, and an example request.",
      translation: "文档列出了必需参数、预期响应和请求示例。",
      category: "职场沟通",
    },
    {
      id: 855,
      text: "limits",
      meaning: "限制",
      example:
        "Reading the details first helped him avoid several unnecessary requests and understand the API's limits.",
      translation:
        "先读清文档细节，帮助他避免了几次不必要的请求，也让他了解 API 的限制。",
      category: "职场沟通",
    },
    {
      id: 856,
      text: "sample account",
      meaning: "示例账户",
      example: "Ravi tested the request with a sample account before using real data.",
      translation: "拉维先用测试账户验证请求，再使用真实数据。",
      category: "职场沟通",
    },
    {
      id: 857,
      text: "real data",
      meaning: "真实数据",
      example: "Ravi tested the request with a sample account before using real data.",
      translation: "拉维先用测试账户验证请求，再使用真实数据。",
      category: "职场沟通",
    },
    {
      id: 858,
      text: "parameter name",
      meaning: "参数名",
      example:
        "When the response did not match the example, he checked the error message and corrected the parameter name.",
      translation: "当响应与示例不一致时，他检查错误信息并修正了参数名称。",
      category: "职场沟通",
    },
    {
      id: 859,
      text: "expected response",
      meaning: "预期响应",
      example:
        "It listed the required parameters, the expected response, and an example request.",
      translation: "文档列出了必需参数、预期响应和请求示例。",
      category: "职场沟通",
    },
    {
      id: 175,
      text: "error message",
      meaning: "错误信息",
      example:
        "When the response did not match the example, he checked the error message and corrected the parameter name.",
      translation: "当响应与示例不一致时，他检查错误信息并修正了参数名称。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 115,
      text: "API",
      meaning: "应用程序接口",
      example:
        "Before connecting a service to a new API, Ravi read the documentation for the endpoint.",
      translation: "在把某项服务接入新 API 前，拉维阅读了该接口的文档。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 204,
      text: "cache hit",
      meaning: "缓存命中",
      example:
        "A cache hit let the service answer immediately, while a cache miss sent the request to a queue through a message broker.",
      translation: "缓存命中使服务能立即响应，而缓存未命中则让请求经消息代理进入队列。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 205,
      text: "cache miss",
      meaning: "缓存未命中",
      example:
        "A cache hit let the service answer immediately, while a cache miss sent the request to a queue through a message broker.",
      translation: "缓存命中使服务能立即响应，而缓存未命中则让请求经消息代理进入队列。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 346,
      text: "queue",
      meaning: "队列",
      example:
        "A cache hit let the service answer immediately, while a cache miss sent the request to a queue through a message broker.",
      translation: "缓存命中使服务能立即响应，而缓存未命中则让请求经消息代理进入队列。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 207,
      text: "message broker",
      meaning: "消息代理",
      example:
        "A cache hit let the service answer immediately, while a cache miss sent the request to a queue through a message broker.",
      translation: "缓存命中使服务能立即响应，而缓存未命中则让请求经消息代理进入队列。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
  ],
  articleVocabularyIds: [
    853, 116, 398, 397, 120, 118, 308, 226, 854, 855, 856, 857, 858, 859, 175, 115, 204,
    205, 346, 207,
  ],
  article: {
    id: 23,
    title: "Reading API Documentation",
    topic: "软件开发",
    level: "中级 · 约 2 分钟",
    summary:
      "围绕“阅读 API 文档”阅读完整情境，在文章中复习当天全部词汇，并练习required 与 optional：说明是否必须。",
    paragraphs: [
      {
        text: "Before connecting a service to a new API, Ravi read the documentation for the endpoint. It listed the required parameters, the expected response, and an example request. One parameter was optional, but the customer ID was required.",
        translation:
          "在把某项服务接入新 API 前，拉维阅读了该接口的文档。文档列出了必需参数、预期响应和请求示例。一个参数是可选的，但客户 ID 是必需的。",
        sentenceTranslations: [
          "在把某项服务接入新 API 前，拉维阅读了该接口的文档。",
          "文档列出了必需参数、预期响应和请求示例。",
          "一个参数是可选的，但客户 ID 是必需的。",
        ],
      },
      {
        text: "Ravi tested the request with a sample account before using real data. When the response did not match the example, he checked the error message and corrected the parameter name. Reading the details first helped him avoid several unnecessary requests and understand the API's limits.",
        translation:
          "拉维先用测试账户验证请求，再使用真实数据。当响应与示例不一致时，他检查错误信息并修正了参数名称。先读清文档细节，帮助他避免了几次不必要的请求，也让他了解 API 的限制。",
        sentenceTranslations: [
          "拉维先用测试账户验证请求，再使用真实数据。",
          "当响应与示例不一致时，他检查错误信息并修正了参数名称。",
          "先读清文档细节，帮助他避免了几次不必要的请求，也让他了解 API 的限制。",
        ],
      },
      {
        text: "Ravi could request a response from the API endpoint using a required customer ID and an optional parameter. A cache hit let the service answer immediately, while a cache miss sent the request to a queue through a message broker. An event handler processed the event and started a background job to write the result to the file system. A cron job later removed temporary files, so Ravi checked the file path in each error message.",
        translation:
          "拉维可以使用必填客户 ID 和可选参数，向 API 端点请求响应。缓存命中使服务能立即响应，而缓存未命中则让请求经消息代理进入队列。事件处理器处理事件，并启动后台任务，将结果写入文件系统。定时任务随后会移除临时文件，所以拉维检查了每条错误信息中的文件路径。",
        sentenceTranslations: [
          "拉维可以使用必填客户 ID 和可选参数，向 API 端点请求响应。",
          "缓存命中使服务能立即响应，而缓存未命中则让请求经消息代理进入队列。",
          "事件处理器处理事件，并启动后台任务，将结果写入文件系统。",
          "定时任务随后会移除临时文件，所以拉维检查了每条错误信息中的文件路径。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What did Ravi do before using real data?",
        options: [
          "He tested the request with a sample account.",
          "He removed the required customer ID.",
          "He ignored the response example.",
        ],
        answer: 0,
        explanation: "He used a sample account to test the request safely.",
      },
      {
        prompt: "Which sentence matches the reading and today's language focus?",
        options: [
          "The customer ID was optional, but the parameter was required.",
          "The customer ID was required, but the parameter was optional.",
        ],
        answer: 1,
        explanation:
          "required 表示必需；optional 表示可选。 用 required 和 optional 区分必填与选填。 回到文章找出这个句型，再用当天的两个词汇描述“阅读 API 文档”的情境。",
      },
      {
        prompt: "In this reading, what does “error message” mean?",
        options: ["错误信息", "文件系统", "文件路径"],
        answer: 0,
        explanation:
          "结合原句理解：A cron job later removed temporary files, so Ravi checked the file path in each error message.（定时任务随后会移除临时文件，所以拉维检查了每条错误信息中的文件路径。）",
      },
    ],
    gap: {
      sentence:
        "A cron job later removed temporary files, so Ravi checked the file path in each ______.",
      answer: "error message",
      hint: "提示：错误信息",
    },
  },
  grammarBlank: "required",
  grammar: {
    id: 1023,
    title: "required 与 optional：说明是否必须",
    explanation: "required 表示必需；optional 表示可选。",
    example: "One parameter was optional, but the customer ID was required.",
    wrong: "The customer ID was optional, but the parameter was required.",
    correct: "The customer ID was required, but the parameter was optional.",
    note: "用 required 和 optional 区分必填与选填。 回到文章找出这个句型，再用当天的两个词汇描述“阅读 API 文档”的情境。",
  },
});
