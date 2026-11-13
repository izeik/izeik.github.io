import { defineLesson } from "./shared";

export default defineLesson({
  day: 27,
  theme: "响应线上服务故障",
  vocabularyIds: [
    226, 886, 261, 887, 255, 888, 214, 889, 890, 891, 892, 893, 894, 895, 260, 477, 230,
    231, 232, 233,
  ],
  vocabulary: [
    {
      id: 226,
      text: "service",
      meaning: "服务",
      example: "Several customers could not reach a service one morning.",
      translation: "一天早上，几位客户无法访问某项服务。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 886,
      text: "outage",
      meaning: "中断",
      example:
        "The on-call engineer confirmed the outage and started an incident channel.",
      translation: "值班工程师确认发生了服务中断，并建立了事故沟通频道。",
      category: "职场沟通",
    },
    {
      id: 261,
      text: "incident",
      meaning: "事件",
      example:
        "The on-call engineer confirmed the outage and started an incident channel.",
      translation: "值班工程师确认发生了服务中断，并建立了事故沟通频道。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 887,
      text: "channel",
      meaning: "频道",
      example:
        "The on-call engineer confirmed the outage and started an incident channel.",
      translation: "值班工程师确认发生了服务中断，并建立了事故沟通频道。",
      category: "职场沟通",
    },
    {
      id: 255,
      text: "monitoring",
      meaning: "监控",
      example:
        "The team checked monitoring alerts and shared short updates so people knew who was investigating each part.",
      translation: "团队检查监控告警并分享简短进度，让大家知道谁在调查各个部分。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 888,
      text: "alerts",
      meaning: "警报",
      example:
        "The team checked monitoring alerts and shared short updates so people knew who was investigating each part.",
      translation: "团队检查监控告警并分享简短进度，让大家知道谁在调查各个部分。",
      category: "职场沟通",
    },
    {
      id: 214,
      text: "configuration",
      meaning: "配置",
      example:
        "They discovered that a recent configuration change had affected the service.",
      translation: "他们发现最近的一次配置变更影响了服务。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 889,
      text: "access",
      meaning: "访问",
      example: "Access returned gradually, and the support team notified customers.",
      translation: "服务访问逐渐恢复，支持团队也通知了客户。",
      category: "职场沟通",
    },
    {
      id: 890,
      text: "gradually",
      meaning: "逐步地",
      example: "Access returned gradually, and the support team notified customers.",
      translation: "服务访问逐渐恢复，支持团队也通知了客户。",
      category: "职场沟通",
    },
    {
      id: 891,
      text: "customers",
      meaning: "客户",
      example: "Several customers could not reach a service one morning.",
      translation: "一天早上，几位客户无法访问某项服务。",
      category: "职场沟通",
    },
    {
      id: 892,
      text: "incident channel",
      meaning: "事件沟通频道",
      example:
        "The on-call engineer confirmed the outage and started an incident channel.",
      translation: "值班工程师确认发生了服务中断，并建立了事故沟通频道。",
      category: "职场沟通",
    },
    {
      id: 893,
      text: "monitoring alerts",
      meaning: "监控警报",
      example:
        "The team checked monitoring alerts and shared short updates so people knew who was investigating each part.",
      translation: "团队检查监控告警并分享简短进度，让大家知道谁在调查各个部分。",
      category: "职场沟通",
    },
    {
      id: 894,
      text: "configuration change",
      meaning: "配置变更",
      example:
        "They discovered that a recent configuration change had affected the service.",
      translation: "他们发现最近的一次配置变更影响了服务。",
      category: "职场沟通",
    },
    {
      id: 895,
      text: "rolled back",
      meaning: "回滚了",
      example: "The team rolled back the change and ran a health check.",
      translation: "团队回滚了变更并进行了健康检查。",
      category: "职场沟通",
    },
    {
      id: 260,
      text: "health check",
      meaning: "健康检查",
      example: "The team rolled back the change and ran a health check.",
      translation: "团队回滚了变更并进行了健康检查。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 477,
      text: "run a health check",
      meaning: "执行健康检查",
      example:
        "The team restored the setting and decided to run a health check before testing bandwidth under load.",
      translation: "团队恢复了设置，并决定先运行健康检查，再测试负载下的带宽。",
      category: "软件开发",
      partOfSpeech: "phrase",
    },
    {
      id: 230,
      text: "reverse proxy",
      meaning: "反向代理",
      example:
        "A reverse proxy was dropping an HTTP header after the configuration change, so a webhook delivery failed.",
      translation:
        "配置变更后，反向代理丢弃了一个 HTTP 请求头，导致一次 Webhook 投递失败。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 231,
      text: "DNS",
      meaning: "域名系统",
      example:
        "The engineer checked DNS, the IP address, the port, and the protocol before opening a socket to the service.",
      translation: "工程师先检查了 DNS、IP 地址、端口和协议，然后通过套接字连接服务。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 232,
      text: "IP address",
      meaning: "IP 地址",
      example:
        "The engineer checked DNS, the IP address, the port, and the protocol before opening a socket to the service.",
      translation: "工程师先检查了 DNS、IP 地址、端口和协议，然后通过套接字连接服务。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
    {
      id: 233,
      text: "port",
      meaning: "端口",
      example:
        "The engineer checked DNS, the IP address, the port, and the protocol before opening a socket to the service.",
      translation: "工程师先检查了 DNS、IP 地址、端口和协议，然后通过套接字连接服务。",
      category: "软件开发",
      partOfSpeech: "noun",
    },
  ],
  articleVocabularyIds: [
    226, 886, 261, 887, 255, 888, 214, 889, 890, 891, 892, 893, 894, 895, 260, 477, 230,
    231, 232, 233,
  ],
  article: {
    id: 27,
    title: "Responding to a Service Outage",
    topic: "软件开发",
    level: "中级 · 约 2 分钟",
    summary:
      "围绕“响应线上服务故障”阅读完整情境，在文章中复习当天全部词汇，并练习一般过去时：描述故障处理步骤。",
    paragraphs: [
      {
        text: "Several customers could not reach a service one morning. The on-call engineer confirmed the outage and started an incident channel. The team checked monitoring alerts and shared short updates so people knew who was investigating each part.",
        translation:
          "一天早上，几位客户无法访问某项服务。值班工程师确认发生了服务中断，并建立了事故沟通频道。团队检查监控告警并分享简短进度，让大家知道谁在调查各个部分。",
        sentenceTranslations: [
          "一天早上，几位客户无法访问某项服务。",
          "值班工程师确认发生了服务中断，并建立了事故沟通频道。",
          "团队检查监控告警并分享简短进度，让大家知道谁在调查各个部分。",
        ],
      },
      {
        text: "They discovered that a recent configuration change had affected the service. The team rolled back the change and ran a health check. Access returned gradually, and the support team notified customers. Later, the engineers reviewed the incident and added a check to reduce the chance of a repeat.",
        translation:
          "他们发现最近的一次配置变更影响了服务。团队回滚了变更并进行了健康检查。服务访问逐渐恢复，支持团队也通知了客户。之后，工程师复盘了事故，并增加一项检查来降低问题重演的可能性。",
        sentenceTranslations: [
          "他们发现最近的一次配置变更影响了服务。",
          "团队回滚了变更并进行了健康检查。",
          "服务访问逐渐恢复，支持团队也通知了客户。",
          "之后，工程师复盘了事故，并增加一项检查来降低问题重演的可能性。",
        ],
      },
      {
        text: "The monitoring dashboard showed high latency, low throughput, and reduced availability during the incident. The engineer checked DNS, the IP address, the port, and the protocol before opening a socket to the service. A reverse proxy was dropping an HTTP header after the configuration change, so a webhook delivery failed. The team restored the setting and decided to run a health check before testing bandwidth under load. The health check passed, and the later review separated reliability improvements from longer-term scalability work.",
        translation:
          "事故期间，监控仪表盘显示延迟升高、吞吐量下降和可用性降低。工程师先检查了 DNS、IP 地址、端口和协议，然后通过套接字连接服务。配置变更后，反向代理丢弃了一个 HTTP 请求头，导致一次 Webhook 投递失败。团队恢复了设置，并决定先运行健康检查，再测试负载下的带宽。健康检查通过了，后续复盘将可靠性改进与更长期的可扩展性工作区分开来。",
        sentenceTranslations: [
          "事故期间，监控仪表盘显示延迟升高、吞吐量下降和可用性降低。",
          "工程师先检查了 DNS、IP 地址、端口和协议，然后通过套接字连接服务。",
          "配置变更后，反向代理丢弃了一个 HTTP 请求头，导致一次 Webhook 投递失败。",
          "团队恢复了设置，并决定先运行健康检查，再测试负载下的带宽。",
          "健康检查通过了，后续复盘将可靠性改进与更长期的可扩展性工作区分开来。",
        ],
      },
    ],
    questions: [
      {
        prompt: "What restored access to the service?",
        options: [
          "Rolling back the recent configuration change.",
          "Restarting every customer's computer.",
          "Removing the monitoring alerts.",
        ],
        answer: 0,
        explanation: "The team rolled back the change and checked the service health.",
      },
      {
        prompt: "Which sentence matches the reading and today's language focus?",
        options: [
          "The team rollback the change and run a health check.",
          "The team rolled back the change and ran a health check.",
        ],
        answer: 1,
        explanation:
          "讲已完成的处理过程时，用过去式按时间顺序描述动作。 roll back 和 run 的过去式分别是 rolled back、ran。 回到文章找出这个句型，再用当天的两个词汇描述“响应线上服务故障”的情境。",
      },
      {
        prompt: "In this reading, what does “health check” mean?",
        options: ["健康检查", "可靠性", "可扩展性"],
        answer: 0,
        explanation:
          "结合原句理解：The team restored the setting and decided to run a health check before testing bandwidth under load.（团队恢复了设置，并决定先运行健康检查，再测试负载下的带宽。）",
      },
    ],
    gap: {
      sentence:
        "The team restored the setting and decided to run a ______ before testing bandwidth under load.",
      answer: "health check",
      hint: "提示：健康检查",
    },
  },
  grammarBlank: "ran",
  grammar: {
    id: 1027,
    title: "一般过去时：描述故障处理步骤",
    explanation: "讲已完成的处理过程时，用过去式按时间顺序描述动作。",
    example: "The team rolled back the change and ran a health check.",
    wrong: "The team rollback the change and run a health check.",
    correct: "The team rolled back the change and ran a health check.",
    note: "roll back 和 run 的过去式分别是 rolled back、ran。 回到文章找出这个句型，再用当天的两个词汇描述“响应线上服务故障”的情境。",
  },
});
