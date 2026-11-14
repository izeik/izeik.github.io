import { defineLesson } from "./shared";

export default defineLesson({
  day: 3,
  theme: "点餐与表达偏好",
  conversationGoal: "Order a meal and explain food preferences.",
  context: "daily",
  vocabularyIds: [
    1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 195, 1082, 1083, 1084, 1085, 1086,
    1087, 1088, 1089, 1090, 1091, 1092,
  ],
  vocabulary: [
    {
      id: 1074,
      text: "menu",
      meaning: "菜单",
      example: "Sam reads the menu at a table and decides to order chicken with rice.",
      translation: "萨姆坐在餐桌旁看菜单，决定点鸡肉饭。",
      category: "Daily",
    },
    {
      id: 1075,
      text: "order",
      meaning: "点餐",
      example: "Sam reads the menu at a table and decides to order chicken with rice.",
      translation: "萨姆坐在餐桌旁看菜单，决定点鸡肉饭。",
      category: "Daily",
    },
    {
      id: 1076,
      text: "water",
      meaning: "水",
      example: "He wants water and a meal that is not too spicy.",
      translation: "他想喝水，菜也不要太辣。",
      category: "Daily",
    },
    {
      id: 1077,
      text: "rice",
      meaning: "米饭",
      example: "Sam reads the menu at a table and decides to order chicken with rice.",
      translation: "萨姆坐在餐桌旁看菜单，决定点鸡肉饭。",
      category: "Daily",
    },
    {
      id: 1078,
      text: "chicken",
      meaning: "鸡肉",
      example: "Sam reads the menu at a table and decides to order chicken with rice.",
      translation: "萨姆坐在餐桌旁看菜单，决定点鸡肉饭。",
      category: "Daily",
    },
    {
      id: 1079,
      text: "onions",
      meaning: "洋葱",
      example: "Sam asks, “What do you recommend if I want chicken without onions?”",
      translation: "萨姆问：“如果我想要不放洋葱的鸡肉，你推荐什么？”",
      category: "Daily",
    },
    {
      id: 1080,
      text: "spicy",
      meaning: "辣的",
      example: "He wants water and a meal that is not too spicy.",
      translation: "他想喝水，菜也不要太辣。",
      category: "Daily",
    },
    {
      id: 1081,
      text: "bill",
      meaning: "账单",
      example:
        "Sam says that is all after ordering and later asks, “Could we have the bill, please?”",
      translation: "萨姆点完餐说就这些，吃完后又问：“可以给我们账单吗？”",
      category: "Daily",
    },
    {
      id: 195,
      text: "table",
      meaning: "餐桌",
      example: "Sam reads the menu at a table and decides to order chicken with rice.",
      translation: "萨姆坐在餐桌旁看菜单，决定点鸡肉饭。",
      category: "Daily",
    },
    {
      id: 1082,
      text: "please",
      meaning: "请",
      example:
        "Sam says, “I would like it for here, and could I have some water, please?”",
      translation: "萨姆说：“我在这里吃，可以再给我一些水吗？”",
      category: "Daily",
    },
    {
      id: 1083,
      text: "I would like",
      meaning: "我想要",
      example:
        "Sam says, “I would like it for here, and could I have some water, please?”",
      translation: "萨姆说：“我在这里吃，可以再给我一些水吗？”",
      category: "Daily",
      usagePattern: "I would like [item] / to [action].",
    },
    {
      id: 1084,
      text: "could I have",
      meaning: "可以给我……吗",
      example:
        "Sam says, “I would like it for here, and could I have some water, please?”",
      translation: "萨姆说：“我在这里吃，可以再给我一些水吗？”",
      category: "Daily",
      usagePattern: "Could I have [item], please?",
    },
    {
      id: 1085,
      text: "without onions",
      meaning: "不放洋葱",
      example: "Sam asks, “What do you recommend if I want chicken without onions?”",
      translation: "萨姆问：“如果我想要不放洋葱的鸡肉，你推荐什么？”",
      category: "Daily",
    },
    {
      id: 1086,
      text: "not too spicy",
      meaning: "不要太辣",
      example: "He wants water and a meal that is not too spicy.",
      translation: "他想喝水，菜也不要太辣。",
      category: "Daily",
    },
    {
      id: 1087,
      text: "what do you recommend",
      meaning: "你推荐什么",
      example: "Sam asks, “What do you recommend if I want chicken without onions?”",
      translation: "萨姆问：“如果我想要不放洋葱的鸡肉，你推荐什么？”",
      category: "Daily",
      usagePattern: "What do you recommend for [need]?",
    },
    {
      id: 1088,
      text: "anything else",
      meaning: "还需要别的吗",
      example: "The server asks, “Anything else before I send your order?”",
      translation: "服务员问：“我下单前，你还需要别的吗？”",
      category: "Daily",
    },
    {
      id: 1089,
      text: "that is all",
      meaning: "就这些",
      example:
        "Sam says that is all after ordering and later asks, “Could we have the bill, please?”",
      translation: "萨姆点完餐说就这些，吃完后又问：“可以给我们账单吗？”",
      category: "Daily",
    },
    {
      id: 1090,
      text: "for here",
      meaning: "在这里吃",
      example:
        "The server replies, “The grilled chicken is mild, and would you like it for here or to go?”",
      translation: "服务员回答：“烤鸡不辣，你在这里吃还是打包？”",
      category: "Daily",
    },
    {
      id: 1091,
      text: "to go",
      meaning: "打包",
      example:
        "The server replies, “The grilled chicken is mild, and would you like it for here or to go?”",
      translation: "服务员回答：“烤鸡不辣，你在这里吃还是打包？”",
      category: "Daily",
    },
    {
      id: 1092,
      text: "could we have the bill",
      meaning: "可以给我们账单吗",
      example:
        "Sam says that is all after ordering and later asks, “Could we have the bill, please?”",
      translation: "萨姆点完餐说就这些，吃完后又问：“可以给我们账单吗？”",
      category: "Daily",
      usagePattern: "Could we have the bill, please?",
    },
  ],
  articleVocabularyIds: [
    1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 195, 1082, 1083, 1084, 1085, 1086,
    1087, 1088, 1089, 1090, 1091, 1092,
  ],
  article: {
    id: 3,
    title: "Lunch Your Way",
    topic: "日常交流",
    level: "实用英语 · 对话与阅读",
    summary: "围绕“点餐与表达偏好”练习提问、回应及确认下一步。",
    paragraphs: [
      {
        text: "Sam reads the menu at a table and decides to order chicken with rice. He wants water and a meal that is not too spicy.",
        translation: "萨姆坐在餐桌旁看菜单，决定点鸡肉饭。他想喝水，菜也不要太辣。",
        sentenceTranslations: [
          "萨姆坐在餐桌旁看菜单，决定点鸡肉饭。",
          "他想喝水，菜也不要太辣。",
        ],
      },
      {
        text: "Sam asks, “What do you recommend if I want chicken without onions?” The server replies, “The grilled chicken is mild, and would you like it for here or to go?” Sam says, “I would like it for here, and could I have some water, please?” The server asks, “Anything else before I send your order?”",
        translation:
          "萨姆问：“如果我想要不放洋葱的鸡肉，你推荐什么？”服务员回答：“烤鸡不辣，你在这里吃还是打包？”萨姆说：“我在这里吃，可以再给我一些水吗？”服务员问：“我下单前，你还需要别的吗？”",
        sentenceTranslations: [
          "萨姆问：“如果我想要不放洋葱的鸡肉，你推荐什么？”",
          "服务员回答：“烤鸡不辣，你在这里吃还是打包？”",
          "萨姆说：“我在这里吃，可以再给我一些水吗？”",
          "服务员问：“我下单前，你还需要别的吗？”",
        ],
      },
      {
        text: "Sam says that is all after ordering and later asks, “Could we have the bill, please?” The server confirms that the meal will have no onions.",
        translation:
          "萨姆点完餐说就这些，吃完后又问：“可以给我们账单吗？”服务员确认这份餐里不会放洋葱。",
        sentenceTranslations: [
          "萨姆点完餐说就这些，吃完后又问：“可以给我们账单吗？”",
          "服务员确认这份餐里不会放洋葱。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What are the speakers mainly trying to do?",
        options: [
          "Order a meal and explain food preferences.",
          "Confirm a task’s priority and expected result.",
          "Ask for directions and confirm where to catch a bus.",
        ],
        answer: 0,
        explanation: "双方围绕“点餐与表达偏好”交流，并确认具体安排。",
      },
      {
        prompt: "Which statement matches the agreed next step or result?",
        options: [
          "They agree that the summary comes before the charts.",
          "She waits beside the bank for bus number six.",
          "The server confirms that the meal will have no onions.",
        ],
        answer: 2,
        explanation: "服务员确认这份餐里不会放洋葱。",
      },
      {
        prompt: "Which line is useful when you want to ask for a food recommendation?",
        options: [
          "Excuse me, how do I get to the museum, and is it far?",
          "What do you recommend if I want chicken without onions?",
          "Just to confirm, what comes first as the priority?",
        ],
        answer: 1,
        explanation: "萨姆问：“如果我想要不放洋葱的鸡肉，你推荐什么？”",
      },
    ],
    gap: {
      sentence: "Sam says, “______ it for here, and could I have some water, please?”",
      answer: "I would like",
      hint: "我想要",
    },
  },
  grammarBlank: "would",
  grammar: {
    id: 1003,
    title: "would like：说明需求",
    explanation: "I would like 后接名词或 to + 动词，礼貌说明想要什么。",
    example: "Sam says, “I would like it for here, and could I have some water, please?”",
    wrong: "I would liking water.",
    correct: "I would like some water.",
    note: "I would like 后接名词或 to + 动词，礼貌说明想要什么。",
  },
  vocabularyGroups: [
    {
      title: "场景与需求",
      vocabularyIds: [1074, 1075, 1076, 1077, 1078, 1083, 1084, 1085, 1086, 1087],
    },
    {
      title: "回应与下一步",
      vocabularyIds: [1079, 1080, 1081, 195, 1082, 1088, 1089, 1090, 1091, 1092],
    },
  ],
  dialogue: [
    {
      speaker: "A",
      text: "What do you recommend if I want chicken without onions?",
      translation: "如果我想要不放洋葱的鸡肉，你推荐什么？",
    },
    {
      speaker: "B",
      text: "The grilled chicken is mild, and would you like it for here or to go?",
      translation: "烤鸡不辣，你在这里吃还是打包？",
    },
    {
      speaker: "A",
      text: "I would like it for here, and could I have some water, please?",
      translation: "我在这里吃，可以再给我一些水吗？",
    },
    {
      speaker: "B",
      text: "Anything else before I send your order?",
      translation: "我下单前，你还需要别的吗？",
    },
  ],
  extensionVocabulary: [],
});
