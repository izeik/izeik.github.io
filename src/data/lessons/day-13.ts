import { defineLesson } from "./shared";

export default defineLesson({
  day: 13,
  theme: "复盘线上问题",
  vocabularyIds: [
    166, 757, 408, 758, 759, 337, 760, 761, 270, 762, 763, 764, 765, 766, 567, 164, 153,
    156, 157, 158,
  ],
  vocabulary: [
    {
      id: 166,
      text: "bug",
      meaning: "缺陷",
      example:
        "A small bug reached production because a date field was empty in an unusual case.",
      translation: "一个小程序错误因为某种少见情况下日期字段为空而进入了生产环境。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 757,
      text: "field",
      meaning: "字段",
      example:
        "A small bug reached production because a date field was empty in an unusual case.",
      translation: "一个小程序错误因为某种少见情况下日期字段为空而进入了生产环境。",
      category: "职场沟通",
    },
    {
      id: 408,
      text: "empty",
      meaning: "空的",
      example:
        "A small bug reached production because a date field was empty in an unusual case.",
      translation: "一个小程序错误因为某种少见情况下日期字段为空而进入了生产环境。",
      category: "软件开发",
      partOfSpeech: "adj",
    },
    {
      id: 758,
      text: "production",
      meaning: "生产环境",
      example:
        "A small bug reached production because a date field was empty in an unusual case.",
      translation: "一个小程序错误因为某种少见情况下日期字段为空而进入了生产环境。",
      category: "职场沟通",
    },
    {
      id: 759,
      text: "checklist",
      meaning: "清单",
      example:
        "They added a test for the empty field and updated their release checklist.",
      translation: "他们为日期为空的情况补充了测试，并更新了发布检查清单。",
      category: "职场沟通",
    },
    {
      id: 337,
      text: "release",
      meaning: "发布",
      example:
        "They added a test for the empty field and updated their release checklist.",
      translation: "他们为日期为空的情况补充了测试，并更新了发布检查清单。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 760,
      text: "mistake",
      meaning: "失误",
      example: "Nobody was blamed for the mistake.",
      translation: "没有人因为这个错误受到指责。",
      category: "职场沟通",
    },
    {
      id: 761,
      text: "process",
      meaning: "流程",
      example:
        "The team focused on improving the process so the same kind of bug would be less likely to happen again.",
      translation: "团队专注于改进流程，降低同类问题再次发生的可能性。",
      category: "职场沟通",
    },
    {
      id: 270,
      text: "review",
      meaning: "复盘",
      example: "The review produced useful changes instead of only a list of faults.",
      translation: "这次复盘带来了有用的改进，而不只是列出过失。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 762,
      text: "tests",
      meaning: "测试",
      example: "Then they discussed how the gap had passed their tests.",
      translation: "之后，他们讨论了这个漏洞为什么没有被测试发现。",
      category: "职场沟通",
    },
    {
      id: 763,
      text: "immediate problem",
      meaning: "眼前的问题",
      example:
        "The team fixed the immediate problem and checked whether any customer data had been affected.",
      translation: "团队先修复了眼前的问题，并检查是否有客户数据受到影响。",
      category: "职场沟通",
    },
    {
      id: 764,
      text: "unusual case",
      meaning: "特殊情形",
      example:
        "A small bug reached production because a date field was empty in an unusual case.",
      translation: "一个小程序错误因为某种少见情况下日期字段为空而进入了生产环境。",
      category: "职场沟通",
    },
    {
      id: 765,
      text: "date field",
      meaning: "日期字段",
      example:
        "A small bug reached production because a date field was empty in an unusual case.",
      translation: "一个小程序错误因为某种少见情况下日期字段为空而进入了生产环境。",
      category: "职场沟通",
    },
    {
      id: 766,
      text: "customer data",
      meaning: "客户数据",
      example:
        "The team fixed the immediate problem and checked whether any customer data had been affected.",
      translation: "团队先修复了眼前的问题，并检查是否有客户数据受到影响。",
      category: "职场沟通",
    },
    {
      id: 567,
      text: "review the changes",
      meaning: "审查改动",
      example:
        "They prepared a patch containing the fix and asked a teammate to review the changes.",
      translation: "他们准备了包含修复内容的补丁，并请一位同事审查变更。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 164,
      text: "test case",
      meaning: "测试用例",
      example:
        "Before the deployment, a merge conflict had removed a test case for an empty date field.",
      translation: "部署前，一次合并冲突移除了针对空日期字段的测试用例。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 153,
      text: "merge conflict",
      meaning: "合并冲突",
      example:
        "Before the deployment, a merge conflict had removed a test case for an empty date field.",
      translation: "部署前，一次合并冲突移除了针对空日期字段的测试用例。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 156,
      text: "deployment",
      meaning: "部署",
      example:
        "Before the deployment, a merge conflict had removed a test case for an empty date field.",
      translation: "部署前，一次合并冲突移除了针对空日期字段的测试用例。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 157,
      text: "build",
      meaning: "构建",
      example:
        "The build had passed because the pipeline ran a unit test and an integration test but no regression test for that edge case.",
      translation:
        "构建当时通过了，因为流水线运行了单元测试和集成测试，却没有针对该边界情况的回归测试。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 158,
      text: "pipeline",
      meaning: "流水线",
      example:
        "The build had passed because the pipeline ran a unit test and an integration test but no regression test for that edge case.",
      translation:
        "构建当时通过了，因为流水线运行了单元测试和集成测试，却没有针对该边界情况的回归测试。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
  ],
  articleVocabularyIds: [
    166, 757, 408, 758, 759, 337, 760, 761, 270, 762, 763, 764, 765, 766, 567, 164, 153,
    156, 157, 158,
  ],
  article: {
    id: 13,
    title: "Learning from a Production Bug",
    topic: "软件开发",
    level: "中级 · 约 2 分钟",
    summary:
      "围绕“复盘线上问题”阅读完整情境，在文章中复习当天全部词汇，并练习过去完成时：说明更早发生的事。",
    paragraphs: [
      {
        text: "A small bug reached production because a date field was empty in an unusual case. The team fixed the immediate problem and checked whether any customer data had been affected. Then they discussed how the gap had passed their tests.",
        translation:
          "一个小程序错误因为某种少见情况下日期字段为空而进入了生产环境。团队先修复了眼前的问题，并检查是否有客户数据受到影响。之后，他们讨论了这个漏洞为什么没有被测试发现。",
        sentenceTranslations: [
          "一个小程序错误因为某种少见情况下日期字段为空而进入了生产环境。",
          "团队先修复了眼前的问题，并检查是否有客户数据受到影响。",
          "之后，他们讨论了这个漏洞为什么没有被测试发现。",
        ],
      },
      {
        text: "They added a test for the empty field and updated their release checklist. Nobody was blamed for the mistake. The team focused on improving the process so the same kind of bug would be less likely to happen again. The review produced useful changes instead of only a list of faults.",
        translation:
          "他们为日期为空的情况补充了测试，并更新了发布检查清单。没有人因为这个错误受到指责。团队专注于改进流程，降低同类问题再次发生的可能性。这次复盘带来了有用的改进，而不只是列出过失。",
        sentenceTranslations: [
          "他们为日期为空的情况补充了测试，并更新了发布检查清单。",
          "没有人因为这个错误受到指责。",
          "团队专注于改进流程，降低同类问题再次发生的可能性。",
          "这次复盘带来了有用的改进，而不只是列出过失。",
        ],
      },
      {
        text: "Before the deployment, a merge conflict had removed a test case for an empty date field. The build had passed because the pipeline ran a unit test and an integration test but no regression test for that edge case. During the review, the team traced the bug to its root cause and added the missing check to the test suite. They prepared a patch containing the fix and asked a teammate to review the changes. They decided to release the hotfix separately and record it in the next release checklist.",
        translation:
          "部署前，一次合并冲突移除了针对空日期字段的测试用例。构建当时通过了，因为流水线运行了单元测试和集成测试，却没有针对该边界情况的回归测试。复盘时，团队追查到缺陷的根本原因，并把缺失的检查加入测试套件。他们准备了包含修复内容的补丁，并请一位同事审查变更。他们决定单独发布紧急修复，并将其记录在下一次版本发布检查清单中。",
        sentenceTranslations: [
          "部署前，一次合并冲突移除了针对空日期字段的测试用例。",
          "构建当时通过了，因为流水线运行了单元测试和集成测试，却没有针对该边界情况的回归测试。",
          "复盘时，团队追查到缺陷的根本原因，并把缺失的检查加入测试套件。",
          "他们准备了包含修复内容的补丁，并请一位同事审查变更。",
          "他们决定单独发布紧急修复，并将其记录在下一次版本发布检查清单中。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What did the team change after the bug?",
        options: [
          "They added a test and updated the checklist.",
          "They removed all date fields.",
          "They stopped reviewing releases.",
        ],
        answer: 0,
        explanation: "They added coverage for the edge case and improved the checklist.",
      },
      {
        prompt: "Which sentence matches the reading and today's language focus?",
        options: [
          "They discussed how the gap pass their tests.",
          "They discussed how the gap had passed their tests.",
        ],
        answer: 1,
        explanation:
          "在另一个过去动作之前已经发生的事，可以用 had + 过去分词。 had passed 表示问题漏过测试发生在讨论之前。 回到文章找出这个句型，再用当天的两个词汇描述“复盘线上问题”的情境。",
      },
      {
        prompt: "In this reading, what does “review the changes” mean?",
        options: ["审查改动", "补丁", "紧急修复"],
        answer: 0,
        explanation:
          "结合原句理解：They prepared a patch containing the fix and asked a teammate to review the changes.（他们准备了包含修复内容的补丁，并请一位同事审查变更。）",
      },
    ],
    gap: {
      sentence:
        "They prepared a patch containing the fix and asked a teammate to ______.",
      answer: "review the changes",
      hint: "提示：审查改动",
    },
  },
  grammarBlank: "had passed",
  grammar: {
    id: 1013,
    title: "过去完成时：说明更早发生的事",
    explanation: "在另一个过去动作之前已经发生的事，可以用 had + 过去分词。",
    example: "Then they discussed how the gap had passed their tests.",
    wrong: "They discussed how the gap pass their tests.",
    correct: "They discussed how the gap had passed their tests.",
    note: "had passed 表示问题漏过测试发生在讨论之前。 回到文章找出这个句型，再用当天的两个词汇描述“复盘线上问题”的情境。",
  },
});
