import { defineLesson } from "./shared";

export default defineLesson({
  day: 11,
  theme: "预约服务与调整时间",
  conversationGoal: "Book a service and change the appointment time.",
  context: "daily",
  vocabularyIds: [
    1201, 1202, 878, 1143, 378, 1203, 1204, 627, 1141, 877, 1205, 1206, 1207, 1208, 94,
    1161, 1099, 1209, 1150, 459,
  ],
  vocabulary: [
    {
      id: 1201,
      text: "appointment",
      meaning: "预约",
      example: "Mia has an appointment on Tuesday morning but needs a change.",
      translation: "米娅周二上午有个预约，但需要更改。",
      category: "Daily",
    },
    {
      id: 1202,
      text: "booking",
      meaning: "预订",
      example:
        "She wants a Friday afternoon booking and checks the date and time before calling.",
      translation: "她想预订周五下午，打电话前先确认日期和时间。",
      category: "Daily",
    },
    {
      id: 878,
      text: "date",
      meaning: "日期",
      example:
        "She wants a Friday afternoon booking and checks the date and time before calling.",
      translation: "她想预订周五下午，打电话前先确认日期和时间。",
      category: "Daily",
    },
    {
      id: 1143,
      text: "time",
      meaning: "时间",
      example:
        "She wants a Friday afternoon booking and checks the date and time before calling.",
      translation: "她想预订周五下午，打电话前先确认日期和时间。",
      category: "Daily",
    },
    {
      id: 378,
      text: "available",
      meaning: "有空的",
      example:
        "Mia asks, “I would like to book an appointment, is there anything available on Friday?”",
      translation: "米娅问：“我想预约，周五还有可预约的时间吗？”",
      category: "Daily",
    },
    {
      id: 1203,
      text: "Friday",
      meaning: "星期五",
      example:
        "She wants a Friday afternoon booking and checks the date and time before calling.",
      translation: "她想预订周五下午，打电话前先确认日期和时间。",
      category: "Daily",
    },
    {
      id: 1204,
      text: "Tuesday",
      meaning: "星期二",
      example: "Mia has an appointment on Tuesday morning but needs a change.",
      translation: "米娅周二上午有个预约，但需要更改。",
      category: "Daily",
    },
    {
      id: 627,
      text: "morning",
      meaning: "上午",
      example: "Mia has an appointment on Tuesday morning but needs a change.",
      translation: "米娅周二上午有个预约，但需要更改。",
      category: "Daily",
    },
    {
      id: 1141,
      text: "afternoon",
      meaning: "下午",
      example:
        "She wants a Friday afternoon booking and checks the date and time before calling.",
      translation: "她想预订周五下午，打电话前先确认日期和时间。",
      category: "Daily",
    },
    {
      id: 877,
      text: "change",
      meaning: "更改",
      example: "Mia has an appointment on Tuesday morning but needs a change.",
      translation: "米娅周二上午有个预约，但需要更改。",
      category: "Daily",
    },
    {
      id: 1205,
      text: "I would like to book",
      meaning: "我想预约",
      example:
        "Mia asks, “I would like to book an appointment, is there anything available on Friday?”",
      translation: "米娅问：“我想预约，周五还有可预约的时间吗？”",
      category: "Daily",
    },
    {
      id: 1206,
      text: "is there anything available",
      meaning: "还有可预约的吗",
      example:
        "Mia asks, “I would like to book an appointment, is there anything available on Friday?”",
      translation: "米娅问：“我想预约，周五还有可预约的时间吗？”",
      category: "Daily",
    },
    {
      id: 1207,
      text: "would it be possible",
      meaning: "可以……吗",
      example: "Mia asks, “Would it be possible to move it to Friday afternoon?”",
      translation: "米娅问：“可以把它改到周五下午吗？”",
      category: "Daily",
      usagePattern: "Would it be possible to [change]?",
    },
    {
      id: 1208,
      text: "move it to",
      meaning: "把它改到",
      example: "Mia asks, “Would it be possible to move it to Friday afternoon?”",
      translation: "米娅问：“可以把它改到周五下午吗？”",
      category: "Daily",
    },
    {
      id: 94,
      text: "that works for me",
      meaning: "这个时间我可以",
      example: "Mia says, “That works for me, thank you for checking, and see you then.”",
      translation: "米娅说：“这个时间我可以，谢谢你查询，到时见。”",
      category: "Daily",
    },
    {
      id: 1161,
      text: "let me check",
      meaning: "让我查一下",
      example:
        "The receptionist replies, “Let me check, and I can get back to you if we have a cancellation.”",
      translation: "前台回答：“让我查一下，如果有人取消，我可以再回复你。”",
      category: "Daily",
    },
    {
      id: 1099,
      text: "just to confirm",
      meaning: "确认一下",
      example:
        "The receptionist answers, “Yes, just to confirm, does three in the afternoon suit you?”",
      translation: "前台回答：“可以，确认一下，下午三点适合你吗？”",
      category: "Daily",
    },
    {
      id: 1209,
      text: "thank you for checking",
      meaning: "谢谢你查询",
      example: "Mia says, “That works for me, thank you for checking, and see you then.”",
      translation: "米娅说：“这个时间我可以，谢谢你查询，到时见。”",
      category: "Daily",
    },
    {
      id: 1150,
      text: "see you then",
      meaning: "到时见",
      example: "Mia says, “That works for me, thank you for checking, and see you then.”",
      translation: "米娅说：“这个时间我可以，谢谢你查询，到时见。”",
      category: "Daily",
    },
    {
      id: 459,
      text: "get back to you",
      meaning: "之后回复你",
      example:
        "The receptionist replies, “Let me check, and I can get back to you if we have a cancellation.”",
      translation: "前台回答：“让我查一下，如果有人取消，我可以再回复你。”",
      category: "Daily",
      usagePattern: "I will get back to you by [time].",
    },
  ],
  articleVocabularyIds: [
    1201, 1202, 878, 1143, 378, 1203, 1204, 627, 1141, 877, 1205, 1206, 1207, 1208, 94,
    1161, 1099, 1209, 1150, 459,
  ],
  article: {
    id: 11,
    title: "Changing an Appointment",
    topic: "日常交流",
    level: "实用英语 · 对话与阅读",
    summary: "围绕“预约服务与调整时间”练习提问、回应及确认下一步。",
    paragraphs: [
      {
        text: "Mia has an appointment on Tuesday morning but needs a change. She wants a Friday afternoon booking and checks the date and time before calling.",
        translation:
          "米娅周二上午有个预约，但需要更改。她想预订周五下午，打电话前先确认日期和时间。",
        sentenceTranslations: [
          "米娅周二上午有个预约，但需要更改。",
          "她想预订周五下午，打电话前先确认日期和时间。",
        ],
      },
      {
        text: "Mia asks, “I would like to book an appointment, is there anything available on Friday?” The receptionist replies, “Let me check, and I can get back to you if we have a cancellation.” Mia asks, “Would it be possible to move it to Friday afternoon?” The receptionist answers, “Yes, just to confirm, does three in the afternoon suit you?”",
        translation:
          "米娅问：“我想预约，周五还有可预约的时间吗？”前台回答：“让我查一下，如果有人取消，我可以再回复你。”米娅问：“可以把它改到周五下午吗？”前台回答：“可以，确认一下，下午三点适合你吗？”",
        sentenceTranslations: [
          "米娅问：“我想预约，周五还有可预约的时间吗？”",
          "前台回答：“让我查一下，如果有人取消，我可以再回复你。”",
          "米娅问：“可以把它改到周五下午吗？”",
          "前台回答：“可以，确认一下，下午三点适合你吗？”",
        ],
      },
      {
        text: "Mia says, “That works for me, thank you for checking, and see you then.” The new appointment is on Friday at three.",
        translation: "米娅说：“这个时间我可以，谢谢你查询，到时见。”新的预约在周五三点。",
        sentenceTranslations: [
          "米娅说：“这个时间我可以，谢谢你查询，到时见。”",
          "新的预约在周五三点。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What are the speakers mainly trying to do?",
        options: [
          "Talk about recent experiences and ask follow-up questions.",
          "Book a service and change the appointment time.",
          "Explain a difficulty and request specific help.",
        ],
        answer: 1,
        explanation: "双方围绕“预约服务与调整时间”交流，并确认具体安排。",
      },
      {
        prompt: "Which statement matches the agreed next step or result?",
        options: [
          "The new appointment is on Friday at three.",
          "The next step is to ask the owner for the missing information.",
          "They agree to share photos from the lake later.",
        ],
        answer: 0,
        explanation: "新的预约在周五三点。",
      },
      {
        prompt:
          "Which line is useful when you want to ask about an available appointment?",
        options: [
          "I am having trouble with the task, could you take a look?",
          "How was your weekend, and was it relaxing?",
          "I would like to book an appointment, is there anything available on Friday?",
        ],
        answer: 2,
        explanation: "米娅问：“我想预约，周五还有可预约的时间吗？”",
      },
    ],
    gap: {
      sentence:
        "Mia asks, “______ an appointment, is there anything available on Friday?”",
      answer: "I would like to book",
      hint: "我想预约",
    },
  },
  grammarBlank: "Would",
  grammar: {
    id: 1011,
    title: "would it be possible to：提出调整",
    explanation: "Would it be possible to 后接动词原形，礼貌询问某个调整是否可行。",
    example: "Mia asks, “Would it be possible to move it to Friday afternoon?”",
    wrong: "Would it be possible moving it?",
    correct: "Would it be possible to move it?",
    note: "Would it be possible to 后接动词原形，礼貌询问某个调整是否可行。",
  },
  vocabularyGroups: [
    {
      title: "场景与需求",
      vocabularyIds: [1201, 1202, 878, 1143, 378, 1205, 1206, 1207, 1208, 94],
    },
    {
      title: "回应与下一步",
      vocabularyIds: [1203, 1204, 627, 1141, 877, 1161, 1099, 1209, 1150, 459],
    },
  ],
  dialogue: [
    {
      speaker: "A",
      text: "I would like to book an appointment, is there anything available on Friday?",
      translation: "我想预约，周五还有可预约的时间吗？",
    },
    {
      speaker: "B",
      text: "Let me check, and I can get back to you if we have a cancellation.",
      translation: "让我查一下，如果有人取消，我可以再回复你。",
    },
    {
      speaker: "A",
      text: "Would it be possible to move it to Friday afternoon?",
      translation: "可以把它改到周五下午吗？",
    },
    {
      speaker: "B",
      text: "Yes, just to confirm, does three in the afternoon suit you?",
      translation: "可以，确认一下，下午三点适合你吗？",
    },
  ],
  extensionVocabulary: [],
});
