import { defineLesson } from "./shared";

export default defineLesson({
  day: 2,
  theme: "请求帮助与确认步骤",
  conversationGoal: "Ask for help and confirm how to complete a task.",
  context: "work",
  vocabularyIds: [
    1057, 1058, 1059, 1060, 1061, 854, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069,
    668, 1070, 1071, 1072, 1073, 100,
  ],
  vocabulary: [
    {
      id: 1057,
      text: "help",
      meaning: "帮助",
      example: "Leo asks, “Could you help me and give me a hand with this task?”",
      translation: "利奥问：“你能帮我处理一下这项任务吗？”",
      category: "Work",
    },
    {
      id: 1058,
      text: "task",
      meaning: "任务",
      example: "Leo has a task to save a file in a shared folder.",
      translation: "利奥有一项任务，要把文件保存在共享文件夹里。",
      category: "Work",
    },
    {
      id: 1059,
      text: "file",
      meaning: "文件",
      example: "Leo has a task to save a file in a shared folder.",
      translation: "利奥有一项任务，要把文件保存在共享文件夹里。",
      category: "Work",
    },
    {
      id: 1060,
      text: "folder",
      meaning: "文件夹",
      example: "Leo has a task to save a file in a shared folder.",
      translation: "利奥有一项任务，要把文件保存在共享文件夹里。",
      category: "Work",
    },
    {
      id: 1061,
      text: "step",
      meaning: "步骤",
      example: "He has one question about the next step and wants a clear example.",
      translation: "他对下一步有一个问题，想看一个清楚的示例。",
      category: "Work",
    },
    {
      id: 854,
      text: "example",
      meaning: "示例",
      example: "He has one question about the next step and wants a clear example.",
      translation: "他对下一步有一个问题，想看一个清楚的示例。",
      category: "Work",
    },
    {
      id: 1062,
      text: "clear",
      meaning: "清楚的",
      example: "He has one question about the next step and wants a clear example.",
      translation: "他对下一步有一个问题，想看一个清楚的示例。",
      category: "Work",
    },
    {
      id: 1063,
      text: "question",
      meaning: "问题",
      example: "He has one question about the next step and wants a clear example.",
      translation: "他对下一步有一个问题，想看一个清楚的示例。",
      category: "Work",
    },
    {
      id: 1064,
      text: "ready",
      meaning: "准备好的",
      example:
        "Nina answers, “Let me try it first, then let me know when you are ready.”",
      translation: "妮娜回答：“让我先试一下，然后你准备好后告诉我。”",
      category: "Work",
    },
    {
      id: 1065,
      text: "thanks",
      meaning: "感谢",
      example:
        "Leo says, “That makes sense, and thanks for your help,” before trying the task himself.",
      translation: "利奥说：“这样就明白了，谢谢你的帮助。”随后自己尝试这项任务。",
      category: "Work",
    },
    {
      id: 1066,
      text: "could you help me",
      meaning: "你能帮我吗",
      example: "Leo asks, “Could you help me and give me a hand with this task?”",
      translation: "利奥问：“你能帮我处理一下这项任务吗？”",
      category: "Work",
      usagePattern: "Could you help me with [task]?",
    },
    {
      id: 1067,
      text: "give me a hand",
      meaning: "帮我一下",
      example: "Leo asks, “Could you help me and give me a hand with this task?”",
      translation: "利奥问：“你能帮我处理一下这项任务吗？”",
      category: "Work",
      usagePattern: "Could you give me a hand with [task]?",
    },
    {
      id: 1068,
      text: "how do I",
      meaning: "我怎样……",
      example: "Leo asks, “How do I save it, and could you check this example with me?”",
      translation: "利奥问：“我要怎样保存，你能和我一起核对这个示例吗？”",
      category: "Work",
      usagePattern: "How do I [action]?",
    },
    {
      id: 1069,
      text: "show me",
      meaning: "给我演示",
      example:
        "Nina replies, “Yes, I can explain it step by step, then you can show me your file.”",
      translation: "妮娜回答：“可以，我能一步一步解释，之后你可以把文件给我看。”",
      category: "Work",
    },
    {
      id: 668,
      text: "step by step",
      meaning: "一步一步地",
      example:
        "Nina replies, “Yes, I can explain it step by step, then you can show me your file.”",
      translation: "妮娜回答：“可以，我能一步一步解释，之后你可以把文件给我看。”",
      category: "Work",
    },
    {
      id: 1070,
      text: "let me try",
      meaning: "让我试试",
      example:
        "Nina answers, “Let me try it first, then let me know when you are ready.”",
      translation: "妮娜回答：“让我先试一下，然后你准备好后告诉我。”",
      category: "Work",
    },
    {
      id: 1071,
      text: "check this",
      meaning: "检查这个",
      example: "Leo asks, “How do I save it, and could you check this example with me?”",
      translation: "利奥问：“我要怎样保存，你能和我一起核对这个示例吗？”",
      category: "Work",
    },
    {
      id: 1072,
      text: "that makes sense",
      meaning: "这样就明白了",
      example:
        "Leo says, “That makes sense, and thanks for your help,” before trying the task himself.",
      translation: "利奥说：“这样就明白了，谢谢你的帮助。”随后自己尝试这项任务。",
      category: "Work",
    },
    {
      id: 1073,
      text: "thanks for your help",
      meaning: "谢谢你的帮助",
      example:
        "Leo says, “That makes sense, and thanks for your help,” before trying the task himself.",
      translation: "利奥说：“这样就明白了，谢谢你的帮助。”随后自己尝试这项任务。",
      category: "Work",
    },
    {
      id: 100,
      text: "let me know",
      meaning: "告诉我",
      example:
        "Nina answers, “Let me try it first, then let me know when you are ready.”",
      translation: "妮娜回答：“让我先试一下，然后你准备好后告诉我。”",
      category: "Work",
    },
  ],
  articleVocabularyIds: [
    1057, 1058, 1059, 1060, 1061, 854, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069,
    668, 1070, 1071, 1072, 1073, 100,
  ],
  article: {
    id: 2,
    title: "Could You Give Me a Hand?",
    topic: "通用职场",
    level: "实用英语 · 对话与阅读",
    summary: "围绕“请求帮助与确认步骤”练习提问、回应及确认下一步。",
    paragraphs: [
      {
        text: "Leo has a task to save a file in a shared folder. He has one question about the next step and wants a clear example.",
        translation:
          "利奥有一项任务，要把文件保存在共享文件夹里。他对下一步有一个问题，想看一个清楚的示例。",
        sentenceTranslations: [
          "利奥有一项任务，要把文件保存在共享文件夹里。",
          "他对下一步有一个问题，想看一个清楚的示例。",
        ],
      },
      {
        text: "Leo asks, “Could you help me and give me a hand with this task?” Nina replies, “Yes, I can explain it step by step, then you can show me your file.” Leo asks, “How do I save it, and could you check this example with me?” Nina answers, “Let me try it first, then let me know when you are ready.”",
        translation:
          "利奥问：“你能帮我处理一下这项任务吗？”妮娜回答：“可以，我能一步一步解释，之后你可以把文件给我看。”利奥问：“我要怎样保存，你能和我一起核对这个示例吗？”妮娜回答：“让我先试一下，然后你准备好后告诉我。”",
        sentenceTranslations: [
          "利奥问：“你能帮我处理一下这项任务吗？”",
          "妮娜回答：“可以，我能一步一步解释，之后你可以把文件给我看。”",
          "利奥问：“我要怎样保存，你能和我一起核对这个示例吗？”",
          "妮娜回答：“让我先试一下，然后你准备好后告诉我。”",
        ],
      },
      {
        text: "Leo says, “That makes sense, and thanks for your help,” before trying the task himself. He saves the file in the shared folder and asks Nina to check the result.",
        translation:
          "利奥说：“这样就明白了，谢谢你的帮助。”随后自己尝试这项任务。他把文件保存在共享文件夹里，请妮娜检查结果。",
        sentenceTranslations: [
          "利奥说：“这样就明白了，谢谢你的帮助。”随后自己尝试这项任务。",
          "他把文件保存在共享文件夹里，请妮娜检查结果。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What are the speakers mainly trying to do?",
        options: [
          "Confirm a task’s priority and expected result.",
          "Ask for help and confirm how to complete a task.",
          "Order a meal and explain food preferences.",
        ],
        answer: 1,
        explanation: "双方围绕“请求帮助与确认步骤”交流，并确认具体安排。",
      },
      {
        prompt: "Which statement matches the agreed next step or result?",
        options: [
          "He saves the file in the shared folder and asks Nina to check the result.",
          "The server confirms that the meal will have no onions.",
          "They agree that the summary comes before the charts.",
        ],
        answer: 0,
        explanation: "他把文件保存在共享文件夹里，请妮娜检查结果。",
      },
      {
        prompt: "Which line is useful when you want to ask for help?",
        options: [
          "What do you recommend if I want chicken without onions?",
          "Just to confirm, what comes first as the priority?",
          "Could you help me and give me a hand with this task?",
        ],
        answer: 2,
        explanation: "利奥问：“你能帮我处理一下这项任务吗？”",
      },
    ],
    gap: {
      sentence: "Leo asks, “______ and give me a hand with this task?”",
      answer: "Could you help me",
      hint: "你能帮我吗",
    },
  },
  grammarBlank: "Could",
  grammar: {
    id: 1002,
    title: "Could you：礼貌求助",
    explanation: "Could you 后接动词原形，用于礼貌请求帮助。",
    example: "Leo asks, “Could you help me and give me a hand with this task?”",
    wrong: "Could you helps me?",
    correct: "Could you help me?",
    note: "Could you 后接动词原形，用于礼貌请求帮助。",
  },
  vocabularyGroups: [
    {
      title: "场景与需求",
      vocabularyIds: [1057, 1058, 1059, 1060, 1061, 1066, 1067, 1068, 1069, 668],
    },
    {
      title: "回应与下一步",
      vocabularyIds: [854, 1062, 1063, 1064, 1065, 1070, 1071, 1072, 1073, 100],
    },
  ],
  dialogue: [
    {
      speaker: "A",
      text: "Could you help me and give me a hand with this task?",
      translation: "你能帮我处理一下这项任务吗？",
    },
    {
      speaker: "B",
      text: "Yes, I can explain it step by step, then you can show me your file.",
      translation: "可以，我能一步一步解释，之后你可以把文件给我看。",
    },
    {
      speaker: "A",
      text: "How do I save it, and could you check this example with me?",
      translation: "我要怎样保存，你能和我一起核对这个示例吗？",
    },
    {
      speaker: "B",
      text: "Let me try it first, then let me know when you are ready.",
      translation: "让我先试一下，然后你准备好后告诉我。",
    },
  ],
  extensionVocabulary: [
    {
      id: 214,
      text: "configuration",
      meaning: "配置",
      example:
        "When she finally spoke to a teammate, they found that one configuration value was missing.",
      translation: "她终于和队友沟通后，他们发现少了一个配置值。",
      category: "Work",
    },
    {
      id: 815,
      text: "setup problem",
      meaning: "设置问题",
      example:
        "On her first project, Sofia spent two days trying to solve a setup problem by herself.",
      translation: "在第一个项目中，索菲娅花了两天时间独自尝试解决环境配置问题。",
      category: "Work",
    },
  ],
});
