/** Everyday questions plus workplace and software-development phrase packs. */
export const questions = [
  [
    "What do you usually do on weekends?",
    "你周末通常做什么？",
    "I usually relax at home or meet a friend.",
  ],
  ["How was your day?", "你今天过得怎么样？", "It was busy, but pretty good."],
  [
    "What kind of music do you like?",
    "你喜欢什么类型的音乐？",
    "I’m really into indie pop.",
  ],
  [
    "Do you have any plans for tonight?",
    "你今晚有什么安排吗？",
    "I’m meeting a friend for dinner.",
  ],
  [
    "Where did you grow up?",
    "你在哪里长大的？",
    "I grew up in a small city near the coast.",
  ],
  ["What do you do for work?", "你做什么工作？", "I work as a software developer."],
  ["How do you usually get to work?", "你通常怎么上班？", "I usually take the train."],
  ["What have you been up to lately?", "你最近在忙什么？", "I’ve been learning to cook."],
  [
    "Have you tried this place before?",
    "你以前来过这家店吗？",
    "No, this is my first time here.",
  ],
  [
    "Would you like to grab coffee sometime?",
    "你想找时间一起喝咖啡吗？",
    "Sure, that sounds nice.",
  ],
  ["What do you recommend?", "你推荐什么？", "The grilled chicken is really good."],
  ["Could I get this to go?", "这个可以打包吗？", "Of course. Would you like a bag?"],
  ["Could we get the bill, please?", "麻烦结账好吗？", "Sure, I’ll bring it right over."],
  ["Is this seat taken?", "这个座位有人吗？", "No, go ahead."],
  [
    "Could you help me find this?",
    "你能帮我找一下这个吗？",
    "Sure, what size are you looking for?",
  ],
  ["How much does this cost?", "这个多少钱？", "It’s twenty-five dollars."],
  ["Can I try this on?", "我可以试穿吗？", "The fitting rooms are over there."],
  ["What time does the store close?", "商店几点关门？", "It closes at nine tonight."],
  [
    "How do I get to the station?",
    "去车站怎么走？",
    "Go straight and turn left at the light.",
  ],
  ["Is there a restroom nearby?", "附近有洗手间吗？", "There’s one next to the café."],
  ["Could you take a photo for us?", "能帮我们拍张照吗？", "Sure. Stand close together."],
  [
    "Where can I buy a train ticket?",
    "我在哪里可以买火车票？",
    "You can get one at the ticket machine.",
  ],
  [
    "Is the flight on time?",
    "航班准点吗？",
    "It looks like it’s delayed by twenty minutes.",
  ],
  [
    "Could I have a window seat?",
    "我可以要靠窗的座位吗？",
    "I’ll check what’s available.",
  ],
  ["What brings you here?", "是什么风把你吹来的？", "I’m here for a conference."],
  ["Have you been here long?", "你来这里很久了吗？", "Just a couple of days."],
  [
    "What do you like to do for fun?",
    "你平时喜欢做什么消遣？",
    "I like hiking and checking out cafés.",
  ],
  ["Do you want to join us?", "你想加入我们吗？", "Thanks, I’d love to."],
  ["How do you know each other?", "你们是怎么认识的？", "We used to work together."],
  [
    "What are you watching these days?",
    "你最近在看什么？",
    "I’m watching a comedy series.",
  ],
  [
    "Did you do anything fun yesterday?",
    "你昨天做什么有趣的事了吗？",
    "I went to a farmers’ market.",
  ],
  [
    "What’s your neighborhood like?",
    "你住的社区怎么样？",
    "It’s quiet and close to a park.",
  ],
  [
    "Could you say that again?",
    "你能再说一遍吗？",
    "Sure, I said the meeting starts at ten.",
  ],
  [
    "What do you mean by that?",
    "你那是什么意思？",
    "I mean we can try a simpler approach.",
  ],
  ["Would you mind opening the window?", "你介意开一下窗吗？", "Not at all."],
  [
    "How long have you lived here?",
    "你在这里住多久了？",
    "I’ve lived here for about three years.",
  ],
  [
    "What’s the best way to get around?",
    "出行最方便的方式是什么？",
    "The subway is usually fastest.",
  ],
  ["Are you free this weekend?", "你这周末有空吗？", "I’m free on Saturday afternoon."],
  ["What should we bring?", "我们应该带什么？", "Just bring a light jacket."],
  ["Do you have any food allergies?", "你有食物过敏吗？", "I’m allergic to peanuts."],
  ["Could I get a glass of water?", "可以给我一杯水吗？", "Absolutely."],
  ["Is service included?", "服务费包含在内吗？", "Yes, it’s included."],
  ["Can I pay by card?", "可以刷卡吗？", "Yes, we accept most cards."],
  ["How was your trip?", "你的旅行怎么样？", "It was great, though the flight was long."],
  ["What time should we meet?", "我们几点见？", "How about around six?"],
  ["Do you mind if I sit here?", "你介意我坐这里吗？", "Not at all. Go ahead."],
  [
    "What are you working on right now?",
    "你现在在做什么项目？",
    "I’m building a dashboard for our clients.",
  ],
  ["How did the interview go?", "面试怎么样？", "It went well. The team was friendly."],
  [
    "What’s one thing you’re looking forward to?",
    "你最期待的一件事是什么？",
    "I’m looking forward to my vacation.",
  ],
  [
    "Anything else I can help you with?",
    "还有什么我能帮你的吗？",
    "That’s everything, thanks.",
  ],
].map((q, i) => ({ id: i + 1, question: q[0], meaning: q[1], answer: q[2] }));
const workplacePrompts = [
  {
    question: "I am new to this routine. What would you like me to explain?",
    meaning: "我第一次带你走这个流程，你想让我说明哪一部分？",
    answer: "Could you walk me through the process?",
  },
  {
    question:
      "We have another meeting in five minutes. When can we finish this discussion?",
    meaning: "五分钟后还有个会，我们什么时候继续讨论？",
    answer: "Let’s circle back to this after lunch.",
  },
  {
    question: "When can the team expect a progress report?",
    meaning: "团队什么时候能收到进度汇报？",
    answer: "I’ll share an update by the end of the day.",
  },
  {
    question: "Are we still on schedule?",
    meaning: "我们还按进度推进吗？",
    answer: "We’re running a little behind schedule.",
  },
  {
    question: "The customer says the invoice is urgent. What would you ask?",
    meaning: "客户说发票很急，你会追问什么？",
    answer: "Could you clarify what you mean by “urgent”?",
  },
  {
    question: "Who can take responsibility for this task?",
    meaning: "谁可以负责这项任务？",
    answer: "I’ll take ownership of this task.",
  },
  {
    question: "We cannot finish every request today. What should we do?",
    meaning: "今天来不及处理所有请求，该怎么安排？",
    answer: "Let’s prioritize the most important items.",
  },
  {
    question: "You have a first draft. What do you need from me?",
    meaning: "你有初稿了，需要我做什么？",
    answer: "I’d like to get your feedback on this draft.",
  },
  {
    question: "What do we need to agree on before the meeting ends?",
    meaning: "会议结束前还需要对什么达成一致？",
    answer: "We need to align on the next steps.",
  },
  {
    question: "How will I know how the work is going?",
    meaning: "我怎样才能了解工作进展？",
    answer: "I’ll keep you posted on our progress.",
  },
  {
    question: "Is the current meeting time convenient?",
    meaning: "现在的会议时间方便吗？",
    answer: "Could we move the meeting to Thursday?",
  },
  {
    question: "An extra pair of hands would be helpful. Are you available?",
    meaning: "我们可能需要人帮忙，你有空吗？",
    answer: "I’m available to help if needed.",
  },
  {
    question: "This task feels too big. How would you approach it?",
    meaning: "这项任务太大了，你会怎么着手？",
    answer: "Let’s break this down into smaller tasks.",
  },
  {
    question: "What is the biggest obstacle right now?",
    meaning: "目前最大的困难是什么？",
    answer: "The main challenge is the limited timeline.",
  },
  {
    question: "Who will contact the client, and when?",
    meaning: "谁会联系客户？什么时候联系？",
    answer: "I’ll follow up with the client this afternoon.",
  },
  {
    question: "Why can’t we proceed with the contract yet?",
    meaning: "为什么合同还不能继续推进？",
    answer: "We’re waiting on approval from the legal team.",
  },
  {
    question: "Where can I find the version that needs reviewing?",
    meaning: "在哪里可以找到要审阅的版本？",
    answer: "I’ve attached the latest version for review.",
  },
  {
    question: "How can I show you what is happening on my computer?",
    meaning: "怎么让你看到我电脑上的情况？",
    answer: "Could you share your screen for a moment?",
  },
  {
    question: "How should we end the presentation?",
    meaning: "演示结束前应该做什么？",
    answer: "Let’s leave a few minutes for questions.",
  },
  {
    question: "How will we share the decisions with people who missed the meeting?",
    meaning: "没来参会的人将怎样获悉会议决定？",
    answer: "I’ll summarize the key points in an email.",
  },
  {
    question: "The supplier might miss the delivery date. How should we handle that?",
    meaning: "供应商可能无法按时交付，我们应该怎么办？",
    answer: "We should flag this as a potential risk.",
  },
  {
    question: "How do the actual figures compare with our estimate?",
    meaning: "实际数字与估算相比如何？",
    answer: "The numbers are slightly different from our estimate.",
  },
  {
    question: "What would you ask a colleague before updating the schedule?",
    meaning: "更新日程前你会向同事询问什么？",
    answer: "Could you give me a quick status update?",
  },
  {
    question: "Could someone start writing the proposal?",
    meaning: "谁能起草这份提案？",
    answer: "I’m happy to take the first draft.",
  },
  {
    question: "What should we do before deciding on an approach?",
    meaning: "决定方案前，应该先做什么？",
    answer: "Let’s make sure everyone has the same context.",
  },
  {
    question: "There isn’t enough evidence to choose yet. What do you suggest?",
    meaning: "目前依据还不够，你有什么建议？",
    answer: "We can revisit this once we have more data.",
  },
  {
    question: "Do you know whether the team can deliver on Friday?",
    meaning: "你知道团队能不能在周五交付吗？",
    answer: "I’ll check with the team and get back to you.",
  },
  {
    question: "I noticed a mistake in the report and wanted to let you know.",
    meaning: "我发现报告有一处错误，想告诉你。",
    answer: "Thanks for bringing this to my attention.",
  },
  {
    question: "How is the launch preparation going?",
    meaning: "上线准备得怎么样了？",
    answer: "We’re making steady progress on the launch.",
  },
  {
    question: "I took notes during the meeting. Do you need anything from me?",
    meaning: "会上我做了笔记，你需要我发什么吗？",
    answer: "Could you send over the meeting notes?",
  },
];
const developmentPrompts = [
  {
    question: "Has anyone started investigating the bug?",
    meaning: "有人开始调查这个缺陷了吗？",
    answer: "I’m looking into the bug now.",
  },
  {
    question: "It works on my machine. What would help us narrow down the problem?",
    meaning: "我的机器运行正常。怎样能缩小问题范围？",
    answer: "Could you reproduce the issue on your machine?",
  },
  {
    question: "Is the fix ready for someone else to check?",
    meaning: "修复内容可以交给其他人审查了吗？",
    answer: "The fix is ready for code review.",
  },
  {
    question: "What risk do you see in changing this response format?",
    meaning: "你觉得修改这个响应格式有什么风险？",
    answer: "This change might break the existing API.",
  },
  {
    question: "The new code fails for an empty list. What should we add?",
    meaning: "新代码处理空列表失败了，我们应补什么？",
    answer: "Let’s add a test for this edge case.",
  },
  {
    question: "Why can’t we merge the new changes yet?",
    meaning: "为什么还不能合并新变更？",
    answer: "The build is failing on the main branch.",
  },
  {
    question: "When will the fix be available for testing?",
    meaning: "修复什么时候可以测试？",
    answer: "I’ll push a small patch shortly.",
  },
  {
    question:
      "The latest release has stopped customers from signing in. What do you suggest?",
    meaning: "新版导致客户无法登录，你建议怎么做？",
    answer: "We should roll back the last deployment.",
  },
  {
    question: "What error do you see when you open the dashboard?",
    meaning: "打开仪表盘时你看到什么错误？",
    answer: "The server is returning a 500 error.",
  },
  {
    question: "Why is the object different after this function runs?",
    meaning: "函数运行后，为什么对象变了？",
    answer: "This function has a side effect.",
  },
  {
    question: "How would you ask a teammate to submit a change for review?",
    meaning: "你会怎样请同事提交变更以供审查？",
    answer: "Can you open a pull request for this?",
  },
  {
    question: "Where did you put your feedback on the code change?",
    meaning: "你把对这次代码变更的意见留在哪里了？",
    answer: "I left a few comments on the diff.",
  },
  {
    question: "How did the database update go?",
    meaning: "数据库更新得怎么样了？",
    answer: "The database migration ran successfully.",
  },
  {
    question: "What should we optimize on the dashboard?",
    meaning: "仪表盘的什么地方需要优化？",
    answer: "We need to improve the page load time.",
  },
  {
    question: "Why can we see the feature in staging but not in production?",
    meaning: "为什么测试环境看得到这个功能，生产环境却看不到？",
    answer: "The feature flag is turned off in production.",
  },
  {
    question: "How will you investigate this unexpected error?",
    meaning: "你打算怎样调查这个意外错误？",
    answer: "I’ll check the logs to find the root cause.",
  },
  {
    question: "What would make this component easier to understand?",
    meaning: "怎样才能让这个组件更容易理解？",
    answer: "This component could use a clearer name.",
  },
  {
    question:
      "The report is requested repeatedly and rarely changes. How could we speed it up?",
    meaning: "这份报告被反复读取，很少变化。如何加快访问？",
    answer: "We should cache this response.",
  },
  {
    question: "Can anyone call this endpoint without signing in?",
    meaning: "不用登录也能调用这个接口吗？",
    answer: "The endpoint requires authentication.",
  },
  {
    question: "Users still see the old instructions. What will you change?",
    meaning: "用户看到的还是旧说明，你会改什么？",
    answer: "I’ll update the documentation with the new behavior.",
  },
];
// Keep the original phrase lists available to the shared content catalogue.
export const workplace = workplacePrompts.map((item) => item.answer);
export const devExpressions = developmentPrompts.map((item) => item.answer);

function dailyQuestions(ids: number[]) {
  return questions.filter((item) => ids.includes(item.id));
}

export const speakingScenarios = [
  { label: "日常交流", items: questions },
  { label: "购物", items: dailyQuestions([15, 16, 17, 18, 43]) },
  { label: "餐厅", items: dailyQuestions([9, 11, 12, 13, 40, 41, 42]) },
  { label: "旅行", items: dailyQuestions([19, 20, 21, 22, 23, 24, 37, 44]) },
  { label: "交友", items: dailyQuestions([10, 25, 26, 27, 28, 29, 30, 38]) },
  { label: "职场英语", items: workplacePrompts },
  {
    label: "技术面试",
    items: [
      {
        question: "What was your role in your last project?",
        meaning: "你在上一个项目中负责什么？",
        answer: "I designed the order API and wrote integration tests for it.",
      },
      {
        question: "How did you investigate a slow database query?",
        meaning: "你怎样排查过一条很慢的数据库查询？",
        answer:
          "I checked the execution plan and compared timings before and after adding an index.",
      },
      {
        question: "Tell me about a bug you fixed. How did you verify the fix?",
        meaning: "请介绍一个你修复过的问题。你怎样验证修复结果？",
        answer:
          "I reproduced a duplicate order, fixed the retry logic, and added a regression test.",
      },
    ],
  },
  { label: "软件开发", items: developmentPrompts },
];
