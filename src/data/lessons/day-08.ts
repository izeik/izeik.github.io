import { defineLesson } from "./shared";

export default defineLesson({
  day: 8,
  theme: "代码审查与反馈",
  vocabularyIds: [
    717, 116, 119, 118, 120, 121, 124, 123, 718, 150, 719, 720, 721, 722, 152, 154, 175,
    331, 308, 270,
  ],
  vocabulary: [
    {
      id: 717,
      text: "reviewer",
      meaning: "审查者",
      example:
        "The reviewer left a comment: “Could you review the function that builds this response?",
      translation: "审查者请她检查生成响应的函数。",
      category: "职场沟通",
    },
    {
      id: 116,
      text: "endpoint",
      meaning: "端点",
      example:
        "Elena opened a pull request for a new API endpoint, and her teammate started the code review.",
      translation: "埃琳娜为一个新的 API 端点提交了合并请求，同事开始进行代码审查。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 119,
      text: "payload",
      meaning: "请求体",
      example:
        "The request included a user ID in the payload, but the response was missing the account status.",
      translation: "请求数据中包含用户 ID，但响应里缺少账户状态。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 118,
      text: "response",
      meaning: "响应",
      example:
        "The request included a user ID in the payload, but the response was missing the account status.",
      translation: "请求数据中包含用户 ID，但响应里缺少账户状态。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 120,
      text: "parameter",
      meaning: "形参",
      example:
        "The parameter is called userId, but the argument passed from the class method is an email address.”",
      translation: "参数名是 userId，但从类方法传进来的实参却是电子邮件地址。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 121,
      text: "argument",
      meaning: "实参",
      example:
        "The parameter is called userId, but the argument passed from the class method is an email address.”",
      translation: "参数名是 userId，但从类方法传进来的实参却是电子邮件地址。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 124,
      text: "method",
      meaning: "方法",
      example:
        "The parameter is called userId, but the argument passed from the class method is an email address.”",
      translation: "参数名是 userId，但从类方法传进来的实参却是电子邮件地址。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 123,
      text: "function",
      meaning: "函数",
      example:
        "The reviewer left a comment: “Could you review the function that builds this response?",
      translation: "审查者请她检查生成响应的函数。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 718,
      text: "comment",
      meaning: "评论",
      example:
        "The reviewer left a comment: “Could you review the function that builds this response?",
      translation: "审查者请她检查生成响应的函数。",
      category: "职场沟通",
    },
    {
      id: 150,
      text: "branch",
      meaning: "分支",
      example: "Elena pulled the latest branch and reproduced the error.",
      translation: "埃琳娜拉取了最新分支并复现了错误。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 719,
      text: "account status",
      meaning: "账户状态",
      example:
        "The request included a user ID in the payload, but the response was missing the account status.",
      translation: "请求数据中包含用户 ID，但响应里缺少账户状态。",
      category: "职场沟通",
    },
    {
      id: 720,
      text: "email address",
      meaning: "电子邮件地址",
      example:
        "The parameter is called userId, but the argument passed from the class method is an email address.”",
      translation: "参数名是 userId，但从类方法传进来的实参却是电子邮件地址。",
      category: "职场沟通",
    },
    {
      id: 721,
      text: "sample payload",
      meaning: "示例载荷",
      example:
        "They sent a sample payload to the endpoint and checked that the response now included the right status.",
      translation: "他们向端点发送示例请求数据，并确认响应现在包含正确的状态。",
      category: "职场沟通",
    },
    {
      id: 722,
      text: "status field",
      meaning: "状态字段",
      example:
        "She checked the method’s return value and found that it stopped before adding the status field.",
      translation: "她检查方法的返回值，发现代码在添加状态字段之前就停止了。",
      category: "职场沟通",
    },
    {
      id: 152,
      text: "pull request",
      meaning: "合并请求",
      example:
        "Elena opened a pull request for a new API endpoint, and her teammate started the code review.",
      translation: "埃琳娜为一个新的 API 端点提交了合并请求，同事开始进行代码审查。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 154,
      text: "code review",
      meaning: "代码审查",
      example:
        "Elena opened a pull request for a new API endpoint, and her teammate started the code review.",
      translation: "埃琳娜为一个新的 API 端点提交了合并请求，同事开始进行代码审查。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 175,
      text: "error message",
      meaning: "错误信息",
      example:
        "The test passed, but it also revealed another error message that was unclear.",
      translation: "测试通过了，但也发现另一条错误信息不够清楚。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 331,
      text: "pull",
      meaning: "拉取",
      example:
        "Elena opened a pull request for a new API endpoint, and her teammate started the code review.",
      translation: "埃琳娜为一个新的 API 端点提交了合并请求，同事开始进行代码审查。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 308,
      text: "request",
      meaning: "请求",
      example:
        "Elena opened a pull request for a new API endpoint, and her teammate started the code review.",
      translation: "埃琳娜为一个新的 API 端点提交了合并请求，同事开始进行代码审查。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 270,
      text: "review",
      meaning: "审查；复核",
      example:
        "Elena opened a pull request for a new API endpoint, and her teammate started the code review.",
      translation: "埃琳娜为一个新的 API 端点提交了合并请求，同事开始进行代码审查。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
  ],
  articleVocabularyIds: [
    717, 116, 119, 118, 120, 121, 124, 123, 718, 150, 719, 720, 721, 722, 152, 154, 175,
    331, 308, 270,
  ],
  article: {
    id: 8,
    title: "A Helpful Code Review",
    topic: "软件开发",
    level: "中级 · 约 2 分钟",
    summary:
      "Elena 在代码审查中追踪一个 API 错误：团队检查请求数据、函数参数和返回值，在预发布环境补测后改进测试覆盖率。",
    paragraphs: [
      {
        text: "Elena opened a pull request for a new API endpoint, and her teammate started the code review. The request included a user ID in the payload, but the response was missing the account status. The reviewer left a comment: “Could you review the function that builds this response? The parameter is called userId, but the argument passed from the class method is an email address.” Elena pulled the latest branch and reproduced the error. She checked the method’s return value and found that it stopped before adding the status field. “That makes sense,” she replied. “I’ll update the function and improve test coverage so we catch this case.”",
        translation:
          "埃琳娜为一个新的 API 端点提交了合并请求，同事开始进行代码审查。请求数据中包含用户 ID，但响应里缺少账户状态。审查者留言：“你能检查一下生成这个响应的函数吗？参数名是 userId，但从类方法传进来的实参却是电子邮件地址。”埃琳娜拉取了最新分支并复现了错误。她检查方法的返回值，发现代码在添加状态字段之前就停止了。“这样就说得通了，”她回复，“我会更新函数并提高测试覆盖率，确保我们能发现这种情况。”",
        sentenceTranslations: [
          "埃琳娜为一个新的 API 端点提交了合并请求，同事开始进行代码审查。",
          "请求数据中包含用户 ID，但响应里缺少账户状态。",
          "审查者请她检查生成响应的函数。",
          "参数名是 userId，但从类方法传进来的实参却是电子邮件地址。",
          "埃琳娜拉取了最新分支并复现了错误。",
          "她检查方法的返回值，发现代码在添加状态字段之前就停止了。",
          "“有道理，”她回答。",
          "“我会更新函数并提高测试覆盖率，以便发现这种情况。”",
        ],
      },
      {
        text: "Elena added a test case for a user whose account status was missing. Before merging the pull request, she asked the reviewer to test the change in staging. They sent a sample payload to the endpoint and checked that the response now included the right status. The test passed, but it also revealed another error message that was unclear. Elena updated it and ran the tests again. The reviewer approved the change after the second run. The code review had helped the team find a real issue, improve the API, and make the product easier to use.",
        translation:
          "埃琳娜为账户状态缺失的用户添加了一个测试用例。合并请求合并前，她请审查者在预发布环境测试这项变更。他们向端点发送示例请求数据，并确认响应现在包含正确的状态。测试通过了，但也发现另一条错误信息不够清楚。埃琳娜修改后再次运行测试。第二轮测试后，审查者批准了改动。这次代码审查帮助团队发现真实问题、改进 API，也让产品更易于使用。",
        sentenceTranslations: [
          "埃琳娜为账户状态缺失的用户添加了一个测试用例。",
          "合并请求合并前，她请审查者在预发布环境测试这项变更。",
          "他们向端点发送示例请求数据，并确认响应现在包含正确的状态。",
          "测试通过了，但也发现另一条错误信息不够清楚。",
          "埃琳娜修改后再次运行测试。",
          "第二轮测试后，审查者批准了改动。",
          "这次代码审查帮助团队发现真实问题、改进 API，也让产品更易于使用。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What mismatch did the reviewer find in the API code?",
        options: [
          "The userId parameter received an email address as its argument.",
          "The endpoint returned a password instead of a user ID.",
          "The class had no methods at all.",
        ],
        answer: 0,
        explanation: "审查者指出参数名是 userId，但传入的实参却是电子邮件地址。",
      },
      {
        prompt: "Which statement best describes the main idea?",
        options: [
          "A careful code review and focused tests can catch API issues before a change is merged.",
          "Code reviews slow teams down without improving the product.",
          "An API response should include every field, even when the data is missing.",
        ],
        answer: 0,
        explanation: "团队通过检查参数、返回值并在预发布环境测试，发现并修复 API 问题。",
      },
      {
        prompt: "What did testing in staging reveal after the first test passed?",
        options: [
          "Another error message was unclear.",
          "The endpoint had been deleted.",
          "The reviewer could not access the repository.",
        ],
        answer: 0,
        explanation: "文章说测试通过后，团队又发现一条错误提示不够清楚。",
      },
    ],
    gap: {
      sentence: "Before merging, Elena asked the reviewer to test the change in ______.",
      answer: "staging",
      hint: "指正式发布前用于验证变更的预发布环境。",
    },
  },
  grammarBlank: "to test",
  grammar: {
    id: 1008,
    title: "ask someone to：提出审查请求",
    explanation: "ask 加对象，再用 to 加动词原形说明请求对方做的事。",
    example:
      "Before merging the pull request, she asked the reviewer to test the change in staging.",
    wrong: "She asked the reviewer test the change.",
    correct: "She asked the reviewer to test the change.",
    note: "reviewer 是被请求的人，to test 表示请求执行的动作。",
  },
});
