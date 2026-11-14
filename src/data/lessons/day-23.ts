import { defineLesson } from "./shared";

export default defineLesson({
  day: 23,
  theme: "处理生活小问题",
  conversationGoal: "Explain a delivery problem and request a practical solution.",
  context: "daily",
  vocabularyIds: [
    1123, 687, 1152, 1075, 142, 1311, 811, 1312, 1057, 1271, 1313, 1314, 1176, 1315, 1161,
    6, 1316, 459, 1073, 1185,
  ],
  vocabulary: [
    {
      id: 1123,
      text: "problem",
      meaning: "问题",
      example:
        "He gives the order number so the assistant can check the problem and suggest a solution.",
      translation: "他提供订单号，方便客服核查问题并给出解决办法。",
      category: "Daily",
    },
    {
      id: 687,
      text: "delivery",
      meaning: "配送",
      example: "Sam reports a missing package after a delivery to the wrong address.",
      translation: "一次配送送错地址后，萨姆报告包裹没有收到。",
      category: "Daily",
    },
    {
      id: 1152,
      text: "address",
      meaning: "地址",
      example: "Sam reports a missing package after a delivery to the wrong address.",
      translation: "一次配送送错地址后，萨姆报告包裹没有收到。",
      category: "Daily",
    },
    {
      id: 1075,
      text: "order",
      meaning: "订单",
      example:
        "He gives the order number so the assistant can check the problem and suggest a solution.",
      translation: "他提供订单号，方便客服核查问题并给出解决办法。",
      category: "Daily",
    },
    {
      id: 142,
      text: "package",
      meaning: "包裹",
      example: "Sam reports a missing package after a delivery to the wrong address.",
      translation: "一次配送送错地址后，萨姆报告包裹没有收到。",
      category: "Daily",
    },
    {
      id: 1311,
      text: "wrong",
      meaning: "错误的",
      example: "Sam reports a missing package after a delivery to the wrong address.",
      translation: "一次配送送错地址后，萨姆报告包裹没有收到。",
      category: "Daily",
    },
    {
      id: 811,
      text: "missing",
      meaning: "未收到的",
      example: "Sam reports a missing package after a delivery to the wrong address.",
      translation: "一次配送送错地址后，萨姆报告包裹没有收到。",
      category: "Daily",
    },
    {
      id: 1312,
      text: "check",
      meaning: "核查",
      example:
        "He gives the order number so the assistant can check the problem and suggest a solution.",
      translation: "他提供订单号，方便客服核查问题并给出解决办法。",
      category: "Daily",
    },
    {
      id: 1057,
      text: "help",
      meaning: "帮助",
      example:
        "The assistant replies, “No problem, let me check, and I can help you find the package.”",
      translation: "客服回答：“没问题，让我查一下，我可以帮你找包裹。”",
      category: "Daily",
    },
    {
      id: 1271,
      text: "solution",
      meaning: "解决办法",
      example:
        "He gives the order number so the assistant can check the problem and suggest a solution.",
      translation: "他提供订单号，方便客服核查问题并给出解决办法。",
      category: "Daily",
    },
    {
      id: 1313,
      text: "there is a problem",
      meaning: "有一个问题",
      example:
        "Sam asks, “There is a problem with my order, could you check the delivery address?”",
      translation: "萨姆问：“我的订单有个问题，你能核查配送地址吗？”",
      category: "Daily",
    },
    {
      id: 1314,
      text: "could you check",
      meaning: "你能查一下吗",
      example:
        "Sam asks, “There is a problem with my order, could you check the delivery address?”",
      translation: "萨姆问：“我的订单有个问题，你能核查配送地址吗？”",
      category: "Daily",
    },
    {
      id: 1176,
      text: "I am looking for",
      meaning: "我在找",
      example:
        "Sam says, “I am looking for the package because it has not arrived, and could you send it again if it is lost?”",
      translation: "萨姆说：“包裹还没到，我在找它；如果丢了，可以再寄一次吗？”",
      category: "Daily",
      usagePattern: "I am looking for [item / place].",
    },
    {
      id: 1315,
      text: "has not arrived",
      meaning: "还没到",
      example:
        "Sam says, “I am looking for the package because it has not arrived, and could you send it again if it is lost?”",
      translation: "萨姆说：“包裹还没到，我在找它；如果丢了，可以再寄一次吗？”",
      category: "Daily",
    },
    {
      id: 1161,
      text: "let me check",
      meaning: "让我查一下",
      example:
        "The assistant replies, “No problem, let me check, and I can help you find the package.”",
      translation: "客服回答：“没问题，让我查一下，我可以帮你找包裹。”",
      category: "Daily",
    },
    {
      id: 6,
      text: "make sure",
      meaning: "确保",
      example:
        "The assistant answers, “I will make sure the address is correct and get back to you with an update.”",
      translation: "客服回答：“我会确保地址正确，再把进展回复给你。”",
      category: "Daily",
    },
    {
      id: 1316,
      text: "send it again",
      meaning: "再发一次",
      example:
        "Sam says, “I am looking for the package because it has not arrived, and could you send it again if it is lost?”",
      translation: "萨姆说：“包裹还没到，我在找它；如果丢了，可以再寄一次吗？”",
      category: "Daily",
    },
    {
      id: 459,
      text: "get back to you",
      meaning: "之后回复你",
      example:
        "The assistant answers, “I will make sure the address is correct and get back to you with an update.”",
      translation: "客服回答：“我会确保地址正确，再把进展回复给你。”",
      category: "Daily",
      usagePattern: "I will get back to you by [time].",
    },
    {
      id: 1073,
      text: "thanks for your help",
      meaning: "谢谢你的帮助",
      example: "Sam says thanks for your help and keeps the order number for reference.",
      translation: "萨姆道谢，并保留订单号以便查询。",
      category: "Daily",
    },
    {
      id: 1185,
      text: "no problem",
      meaning: "没问题",
      example:
        "The assistant replies, “No problem, let me check, and I can help you find the package.”",
      translation: "客服回答：“没问题，让我查一下，我可以帮你找包裹。”",
      category: "Daily",
    },
  ],
  articleVocabularyIds: [
    1123, 687, 1152, 1075, 142, 1311, 811, 1312, 1057, 1271, 1313, 1314, 1176, 1315, 1161,
    6, 1316, 459, 1073, 1185,
  ],
  article: {
    id: 23,
    title: "A Delivery That Has Not Arrived",
    topic: "日常交流",
    level: "实用英语 · 对话与阅读",
    summary: "围绕“处理生活小问题”练习提问、回应及确认下一步。",
    paragraphs: [
      {
        text: "Sam reports a missing package after a delivery to the wrong address. He gives the order number so the assistant can check the problem and suggest a solution.",
        translation:
          "一次配送送错地址后，萨姆报告包裹没有收到。他提供订单号，方便客服核查问题并给出解决办法。",
        sentenceTranslations: [
          "一次配送送错地址后，萨姆报告包裹没有收到。",
          "他提供订单号，方便客服核查问题并给出解决办法。",
        ],
      },
      {
        text: "Sam asks, “There is a problem with my order, could you check the delivery address?” The assistant replies, “No problem, let me check, and I can help you find the package.” Sam says, “I am looking for the package because it has not arrived, and could you send it again if it is lost?” The assistant answers, “I will make sure the address is correct and get back to you with an update.”",
        translation:
          "萨姆问：“我的订单有个问题，你能核查配送地址吗？”客服回答：“没问题，让我查一下，我可以帮你找包裹。”萨姆说：“包裹还没到，我在找它；如果丢了，可以再寄一次吗？”客服回答：“我会确保地址正确，再把进展回复给你。”",
        sentenceTranslations: [
          "萨姆问：“我的订单有个问题，你能核查配送地址吗？”",
          "客服回答：“没问题，让我查一下，我可以帮你找包裹。”",
          "萨姆说：“包裹还没到，我在找它；如果丢了，可以再寄一次吗？”",
          "客服回答：“我会确保地址正确，再把进展回复给你。”",
        ],
      },
      {
        text: "Sam says thanks for your help and keeps the order number for reference. The assistant will check the address before arranging another delivery.",
        translation: "萨姆道谢，并保留订单号以便查询。客服会先核查地址，再安排重新配送。",
        sentenceTranslations: [
          "萨姆道谢，并保留订单号以便查询。",
          "客服会先核查地址，再安排重新配送。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What are the speakers mainly trying to do?",
        options: [
          "Compare options and explain personal preferences.",
          "Explain a delivery problem and request a practical solution.",
          "Explain a simple process and check understanding.",
        ],
        answer: 1,
        explanation: "双方围绕“处理生活小问题”交流，并确认具体安排。",
      },
      {
        prompt: "Which statement matches the agreed next step or result?",
        options: [
          "The assistant will check the address before arranging another delivery.",
          "Nina will check the list before preparing the summary.",
          "They choose the small quiet place.",
        ],
        answer: 0,
        explanation: "客服会先核查地址，再安排重新配送。",
      },
      {
        prompt:
          "Which line is useful when you want to request a check of a delivery problem?",
        options: [
          "Any questions before I walk you through the plan?",
          "What do you recommend for lunch?",
          "There is a problem with my order, could you check the delivery address?",
        ],
        answer: 2,
        explanation: "萨姆问：“我的订单有个问题，你能核查配送地址吗？”",
      },
    ],
    gap: {
      sentence: "Sam asks, “______ with my order, could you check the delivery address?”",
      answer: "There is a problem",
      hint: "有一个问题",
    },
  },
  grammarBlank: "has not arrived",
  grammar: {
    id: 1023,
    title: "现在完成时否定：说明尚未收到",
    explanation: "has not + 过去分词说明某件事到现在还没有发生。",
    example:
      "Sam says, “I am looking for the package because it has not arrived, and could you send it again if it is lost?”",
    wrong: "The package has not arrive.",
    correct: "The package has not arrived.",
    note: "has not + 过去分词说明某件事到现在还没有发生。",
  },
  vocabularyGroups: [
    {
      title: "场景与需求",
      vocabularyIds: [1123, 687, 1152, 1075, 142, 1313, 1314, 1176, 1315, 1161],
    },
    {
      title: "回应与下一步",
      vocabularyIds: [1311, 811, 1312, 1057, 1271, 6, 1316, 459, 1073, 1185],
    },
  ],
  dialogue: [
    {
      speaker: "A",
      text: "There is a problem with my order, could you check the delivery address?",
      translation: "我的订单有个问题，你能核查配送地址吗？",
    },
    {
      speaker: "B",
      text: "No problem, let me check, and I can help you find the package.",
      translation: "没问题，让我查一下，我可以帮你找包裹。",
    },
    {
      speaker: "A",
      text: "I am looking for the package because it has not arrived, and could you send it again if it is lost?",
      translation: "包裹还没到，我在找它；如果丢了，可以再寄一次吗？",
    },
    {
      speaker: "B",
      text: "I will make sure the address is correct and get back to you with an update.",
      translation: "我会确保地址正确，再把进展回复给你。",
    },
  ],
  extensionVocabulary: [],
});
