import { defineLesson } from "./shared";

export default defineLesson({
  day: 9,
  theme: "排查页面性能",
  vocabularyIds: [
    131, 126, 128, 129, 130, 136, 132, 135, 311, 723, 724, 725, 726, 727, 337, 167, 308,
    118, 115, 123,
  ],
  vocabulary: [
    {
      id: 131,
      text: "loop",
      meaning: "循环",
      example: "In the code, a loop created a new object for every item in a list.",
      translation: "在代码中，一个循环为列表里的每个项目都创建了新对象。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 126,
      text: "object",
      meaning: "对象",
      example: "In the code, a loop created a new object for every item in a list.",
      translation: "在代码中，一个循环为列表里的每个项目都创建了新对象。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 128,
      text: "property",
      meaning: "属性",
      example: "Each object had a property that triggered another database request.",
      translation: "每个对象都有一个会触发额外数据库请求的属性。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 129,
      text: "variable",
      meaning: "变量",
      example:
        "A variable stored the same result again and again, while a constant that should have limited the work was never used.",
      translation: "一个变量不断重复保存相同结果，而本应限制处理次数的常量却从未使用。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 130,
      text: "constant",
      meaning: "常量",
      example:
        "A variable stored the same result again and again, while a constant that should have limited the work was never used.",
      translation: "一个变量不断重复保存相同结果，而本应限制处理次数的常量却从未使用。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 136,
      text: "runtime",
      meaning: "运行时",
      example:
        "The team wanted to understand the problem before changing the code, so they reproduced it in the runtime and reviewed the relevant statements and expressions.",
      translation:
        "团队希望先弄清原因再改代码，所以他们在运行时复现问题，并检查相关语句和表达式。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 132,
      text: "condition",
      meaning: "条件",
      example:
        "The developer checked the condition in the loop and found that it was always true, even when the data had not changed.",
      translation: "开发人员检查循环中的条件，发现即使数据没有变化，这个条件也总为真。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 135,
      text: "syntax",
      meaning: "语法",
      example:
        "The developer fixed the syntax and moved the database request outside the loop.",
      translation: "开发人员修正了语法，并把数据库请求移到了循环外。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 311,
      text: "cache",
      meaning: "缓存",
      example:
        "This change reduced repeated requests, but the team also added a cache for data that rarely changed.",
      translation: "这个改动减少了重复请求，但团队还为很少变化的数据添加了缓存。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 723,
      text: "slower",
      meaning: "更慢的",
      example:
        "After Friday’s release, the product page became slower, and the team opened an issue to investigate.",
      translation: "周五发布版本后，产品页面变慢了，团队创建了一个问题单进行调查。",
      category: "职场沟通",
    },
    {
      id: 724,
      text: "database request",
      meaning: "数据库请求",
      example: "Each object had a property that triggered another database request.",
      translation: "每个对象都有一个会触发额外数据库请求的属性。",
      category: "职场沟通",
    },
    {
      id: 725,
      text: "response time",
      meaning: "响应时间",
      example:
        "They released the fix after testing it with a small group and monitored the response time.",
      translation: "他们先让一小部分用户试用修复，再发布并监控响应时间。",
      category: "职场沟通",
    },
    {
      id: 726,
      text: "small group",
      meaning: "小组",
      example:
        "They released the fix after testing it with a small group and monitored the response time.",
      translation: "他们先让一小部分用户试用修复，再发布并监控响应时间。",
      category: "职场沟通",
    },
    {
      id: 727,
      text: "same result",
      meaning: "相同结果",
      example:
        "A variable stored the same result again and again, while a constant that should have limited the work was never used.",
      translation: "一个变量不断重复保存相同结果，而本应限制处理次数的常量却从未使用。",
      category: "职场沟通",
    },
    {
      id: 337,
      text: "release",
      meaning: "版本发布",
      example:
        "After Friday’s release, the product page became slower, and the team opened an issue to investigate.",
      translation: "周五发布版本后，产品页面变慢了，团队创建了一个问题单进行调查。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 167,
      text: "issue",
      meaning: "问题；事项",
      example:
        "After Friday’s release, the product page became slower, and the team opened an issue to investigate.",
      translation: "周五发布版本后，产品页面变慢了，团队创建了一个问题单进行调查。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 308,
      text: "request",
      meaning: "请求",
      example:
        "They compared the time for each request and noticed that one API response was much slower than the others.",
      translation: "他们比较每个请求的耗时，发现一个 API 响应比其他响应慢很多。",
      category: "软件开发",
      partOfSpeech: "verb",
    },
    {
      id: 118,
      text: "response",
      meaning: "响应",
      example:
        "They compared the time for each request and noticed that one API response was much slower than the others.",
      translation: "他们比较每个请求的耗时，发现一个 API 响应比其他响应慢很多。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 115,
      text: "API",
      meaning: "应用程序接口",
      example:
        "They compared the time for each request and noticed that one API response was much slower than the others.",
      translation: "他们比较每个请求的耗时，发现一个 API 响应比其他响应慢很多。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 123,
      text: "function",
      meaning: "函数",
      example:
        "The function now checks the condition once, stores the result in a variable, and reuses it for each object.",
      translation: "现在函数只检查一次条件，把结果存入变量，然后让每个对象重复使用。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
  ],
  articleVocabularyIds: [
    131, 126, 128, 129, 130, 136, 132, 135, 311, 723, 724, 725, 726, 727, 337, 167, 308,
    118, 115, 123,
  ],
  article: {
    id: 9,
    title: "Investigating a Slow Page",
    topic: "软件开发",
    level: "中级 · 约 2 分钟",
    summary:
      "一次版本发布后页面变慢，工程师检查请求、对象属性与循环条件，在运行时确认原因，再通过缓存和监控验证修复。",
    paragraphs: [
      {
        text: "After Friday’s release, the product page became slower, and the team opened an issue to investigate. They compared the time for each request and noticed that one API response was much slower than the others. In the code, a loop created a new object for every item in a list. Each object had a property that triggered another database request. The developer checked the condition in the loop and found that it was always true, even when the data had not changed. A variable stored the same result again and again, while a constant that should have limited the work was never used. The team wanted to understand the problem before changing the code, so they reproduced it in the runtime and reviewed the relevant statements and expressions.",
        translation:
          "周五发布版本后，产品页面变慢了，团队创建了一个问题单进行调查。他们比较每个请求的耗时，发现一个 API 响应比其他响应慢很多。在代码中，一个循环为列表里的每个项目都创建了新对象。每个对象都有一个会触发额外数据库请求的属性。开发人员检查循环中的条件，发现即使数据没有变化，这个条件也总为真。一个变量不断重复保存相同结果，而本应限制处理次数的常量却从未使用。团队希望先弄清原因再改代码，所以他们在运行时复现问题，并检查相关语句和表达式。",
        sentenceTranslations: [
          "周五发布版本后，产品页面变慢了，团队创建了一个问题单进行调查。",
          "他们比较每个请求的耗时，发现一个 API 响应比其他响应慢很多。",
          "在代码中，一个循环为列表里的每个项目都创建了新对象。",
          "每个对象都有一个会触发额外数据库请求的属性。",
          "开发人员检查循环中的条件，发现即使数据没有变化，这个条件也总为真。",
          "一个变量不断重复保存相同结果，而本应限制处理次数的常量却从未使用。",
          "团队希望先弄清原因再改代码，所以他们在运行时复现问题，并检查相关语句和表达式。",
        ],
      },
      {
        text: "The developer fixed the syntax and moved the database request outside the loop. The function now checks the condition once, stores the result in a variable, and reuses it for each object. This change reduced repeated requests, but the team also added a cache for data that rarely changed. They released the fix after testing it with a small group and monitored the response time. The page loaded faster, and the issue did not return. The team documented the cause so they could spot the same pattern during a future code review.",
        translation:
          "开发人员修正了语法，并把数据库请求移到了循环外。现在函数只检查一次条件，把结果存入变量，然后让每个对象重复使用。这个改动减少了重复请求，但团队还为很少变化的数据添加了缓存。他们先让一小部分用户试用修复，再发布并监控响应时间。页面加载更快了，问题也没有再次出现。团队记录了原因，以便以后代码审查时能发现类似模式。",
        sentenceTranslations: [
          "开发人员修正了语法，并把数据库请求移到了循环外。",
          "现在函数只检查一次条件，把结果存入变量，然后让每个对象重复使用。",
          "这个改动减少了重复请求，但团队还为很少变化的数据添加了缓存。",
          "他们先让一小部分用户试用修复，再发布并监控响应时间。",
          "页面加载更快了，问题也没有再次出现。",
          "团队记录了原因，以便以后代码审查时能发现类似模式。",
        ],
      },
    ],
    questions: [
      {
        prompt: "Why did the loop make the page slower?",
        options: [
          "It created objects whose property triggered another database request each time.",
          "It changed the page title on every visit.",
          "It stopped the runtime from loading the release.",
        ],
        answer: 0,
        explanation: "循环每处理一个对象都会触发额外数据库请求，造成重复请求过多。",
      },
      {
        prompt: "Which statement best describes the main idea?",
        options: [
          "Tracing a performance issue to its code pattern helps a team make and verify a focused fix.",
          "The team should rewrite the whole application whenever a page slows down.",
          "Adding a cache is enough; the cause of the issue does not matter.",
        ],
        answer: 0,
        explanation:
          "团队先追踪重复请求的原因，再优化循环、复用结果、加缓存并监控修复效果。",
      },
      {
        prompt: "How did the team check that the fix worked?",
        options: [
          "They tested it with a small group and monitored response time after release.",
          "They removed all monitoring and closed the issue immediately.",
          "They waited for users to report the same issue again.",
        ],
        answer: 0,
        explanation: "文章指出团队先小范围测试，再发布修复并监控响应时间。",
      },
    ],
    gap: {
      sentence: "A loop created a new ______ for every item in the list.",
      answer: "object",
      hint: "面向对象代码中用来表示一项数据的实例。",
    },
  },
  grammarBlank: "faster",
  grammar: {
    id: 1009,
    title: "比较级：描述性能变化",
    explanation:
      "用 slower、faster、more reliable 等比较级描述变化；可用 than 引出比较对象。",
    example: "The page loaded faster, and the issue did not return.",
    wrong: "The page became more slow after the release.",
    correct: "The page loaded faster, and the issue did not return.",
    note: "文章用 faster 比较修复前后的加载速度；fast 在这里是副词，比较级加 -er。",
  },
});
