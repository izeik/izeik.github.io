import type { Expression } from "./expressions";
import { expressions as everydayExpressions } from "./expressions";
import { professionalVocabulary } from "./professionalVocabulary";

/** Additional curated IT and client-facing vocabulary to support the 30-day plan. */
const rows: [string, string, string, "noun" | "verb" | "adj" | "phrase"][] = [
  ["acceptance test", "验收测试", "软件开发", "noun"],
  ["access policy", "访问策略", "软件开发", "noun"],
  ["account owner", "账户负责人", "客户沟通", "noun"],
  ["audit trail", "审计跟踪记录", "软件开发", "noun"],
  ["authentication flow", "身份验证流程", "软件开发", "noun"],
  ["authorization rule", "授权规则", "软件开发", "noun"],
  ["availability target", "可用性目标", "软件开发", "noun"],
  ["backup copy", "备份副本", "软件开发", "noun"],
  ["billing cycle", "账单周期", "客户沟通", "noun"],
  ["cache key", "缓存键", "软件开发", "noun"],
  ["capacity plan", "容量规划", "软件开发", "noun"],
  ["client configuration", "客户配置", "客户沟通", "noun"],
  ["compliance requirement", "合规要求", "客户沟通", "noun"],
  ["connection pool", "连接池", "软件开发", "noun"],
  ["data breach", "数据泄露事件", "软件开发", "noun"],
  ["data retention", "数据保留期限", "客户沟通", "noun"],
  ["database constraint", "数据库约束", "软件开发", "noun"],
  ["database lock", "数据库锁", "软件开发", "noun"],
  ["deployment window", "部署时间窗口", "产品与项目", "noun"],
  ["feature request", "功能请求", "客户沟通", "noun"],
  ["incident response", "事故响应", "软件开发", "noun"],
  ["latency target", "延迟目标", "软件开发", "noun"],
  ["maintenance window", "维护窗口", "客户沟通", "noun"],
  ["monitoring alert", "监控告警", "软件开发", "noun"],
  ["network policy", "网络策略", "软件开发", "noun"],
  ["onboarding process", "入职或接入流程", "客户沟通", "noun"],
  ["payment method", "付款方式", "客户沟通", "noun"],
  ["permission level", "权限级别", "软件开发", "noun"],
  ["product roadmap", "产品路线图", "产品与项目", "noun"],
  ["recovery plan", "恢复计划", "软件开发", "noun"],
  ["retention policy", "数据保留策略", "客户沟通", "noun"],
  ["rollout plan", "逐步发布计划", "产品与项目", "noun"],
  ["service owner", "服务负责人", "软件开发", "noun"],
  ["system requirement", "系统要求", "软件开发", "noun"],
  ["test environment", "测试环境", "软件开发", "noun"],
  ["usage report", "使用情况报告", "客户沟通", "noun"],
  ["user journey", "用户旅程", "产品与项目", "noun"],
  ["version history", "版本历史记录", "软件开发", "noun"],
  ["request identifier", "请求标识符", "软件开发", "noun"],
  ["uptime target", "正常运行时间目标", "软件开发", "noun"],
  ["analyze the logs", "分析日志", "软件开发", "verb"],
  ["archive old records", "归档旧记录", "软件开发", "verb"],
  ["assign an owner", "指定负责人", "产品与项目", "verb"],
  ["audit user access", "审查用户访问权限", "软件开发", "verb"],
  ["back up the database", "备份数据库", "软件开发", "verb"],
  ["block the release", "暂缓发布", "产品与项目", "verb"],
  ["configure the alerts", "配置告警", "软件开发", "verb"],
  ["confirm receipt", "确认收到", "客户沟通", "verb"],
  ["contain the incident", "控制事故影响", "软件开发", "verb"],
  ["coordinate the rollout", "协调逐步发布", "产品与项目", "verb"],
  ["estimate the effort", "估算工作量", "产品与项目", "verb"],
  ["grant permission", "授予权限", "客户沟通", "verb"],
  ["handle an escalation", "处理升级事项", "客户沟通", "verb"],
  ["identify a dependency", "识别依赖项", "软件开发", "verb"],
  ["improve test coverage", "提高测试覆盖率", "软件开发", "verb"],
  ["investigate the behavior", "调查该行为", "软件开发", "verb"],
  ["maintain compatibility", "保持兼容性", "软件开发", "verb"],
  ["monitor the traffic", "监控流量", "软件开发", "verb"],
  ["notify the stakeholders", "通知相关方", "职场沟通", "verb"],
  ["prioritize the tasks", "确定任务优先级", "产品与项目", "verb"],
  ["protect the credentials", "保护凭据", "软件开发", "verb"],
  ["publish the changelog", "发布变更日志", "软件开发", "verb"],
  ["reduce the latency", "降低延迟", "软件开发", "verb"],
  ["remove the duplicate", "移除重复项", "软件开发", "verb"],
  ["resolve the conflict", "解决冲突", "软件开发", "verb"],
  ["restore the service", "恢复服务", "软件开发", "verb"],
  ["review the changes", "审查改动", "软件开发", "verb"],
  ["rotate the secrets", "轮换密钥", "软件开发", "verb"],
  ["run the migration", "运行迁移", "软件开发", "verb"],
  ["validate the input", "验证输入", "软件开发", "verb"],
  ["verify the identity", "核验身份", "客户沟通", "verb"],
  ["document the decision", "记录决定", "职场沟通", "verb"],
  ["reproduce the failure", "复现故障", "软件开发", "verb"],
  ["narrow the scope", "缩小范围", "产品与项目", "verb"],
  ["schedule the rollout", "安排发布", "产品与项目", "verb"],
  ["sync the branch", "同步分支", "软件开发", "verb"],
  ["track adoption", "跟踪采用情况", "产品与项目", "verb"],
  ["update the dependency", "更新依赖项", "软件开发", "verb"],
  ["actionable", "可采取行动的", "产品与项目", "adj"],
  ["customer-ready", "可交付客户使用的", "客户沟通", "adj"],
  ["data-driven", "数据驱动的", "产品与项目", "adj"],
  ["feature-complete", "功能完整的", "软件开发", "adj"],
  ["low-risk", "低风险的", "产品与项目", "adj"],
  ["high-impact", "影响大的", "产品与项目", "adj"],
  ["high-priority", "高优先级的", "产品与项目", "adj"],
  ["user-facing", "面向用户的", "软件开发", "adj"],
  ["privacy-sensitive", "涉及隐私的", "客户沟通", "adj"],
  ["resource-intensive", "资源消耗大的", "软件开发", "adj"],
  ["time-sensitive", "时间紧迫的", "职场沟通", "adj"],
  ["well-documented", "文档完善的", "软件开发", "adj"],
  ["easy to reproduce", "容易复现的", "软件开发", "adj"],
  ["permission-based", "基于权限的", "软件开发", "adj"],
  ["version-specific", "特定版本适用的", "软件开发", "adj"],
  ["resilient", "有韧性的；能从故障中恢复的", "软件开发", "adj"],
  ["traceable", "可追踪的", "软件开发", "adj"],
  ["reproducible", "可复现的", "软件开发", "adj"],
  ["configurable", "可配置的", "软件开发", "adj"],
  ["observable", "可观测的", "软件开发", "adj"],
  ["lightweight", "轻量的", "软件开发", "adj"],
  ["predictable", "可预测的", "产品与项目", "adj"],
  ["align on the timeline", "就时间安排达成一致", "职场沟通", "phrase"],
  ["address the feedback", "处理反馈意见", "产品与项目", "phrase"],
  ["close the ticket", "关闭工单", "客户沟通", "phrase"],
  ["communicate a delay", "告知延期", "客户沟通", "phrase"],
  ["get approval from the client", "获得客户批准", "客户沟通", "phrase"],
  ["hand the task over", "移交任务", "职场沟通", "phrase"],
  ["identify the owner", "确认负责人", "产品与项目", "phrase"],
  ["keep the customer informed", "持续告知客户进展", "客户沟通", "phrase"],
  ["make the change safely", "安全地实施变更", "软件开发", "phrase"],
  ["provide a status update", "提供状态更新", "客户沟通", "phrase"],
  ["reduce the risk", "降低风险", "产品与项目", "phrase"],
  ["share the test results", "分享测试结果", "软件开发", "phrase"],
  ["set a clear deadline", "设定明确的截止日期", "产品与项目", "phrase"],
  ["test the change in staging", "在预发布环境测试变更", "软件开发", "phrase"],
  ["track the support request", "跟踪支持请求", "客户沟通", "phrase"],
  ["update the release notes", "更新版本说明", "软件开发", "phrase"],
  ["verify the fix", "验证修复结果", "软件开发", "phrase"],
  ["work through the checklist", "逐项完成检查清单", "软件开发", "phrase"],
  ["ask for clarification", "请求澄清", "客户沟通", "phrase"],
  ["document the workaround", "记录临时解决办法", "软件开发", "phrase"],
  ["prepare a rollback plan", "准备回滚计划", "软件开发", "phrase"],
  ["set up monitoring", "设置监控", "软件开发", "phrase"],
  ["respond to an incident", "响应故障事件", "软件开发", "phrase"],
  ["preserve the audit trail", "保留审计记录", "软件开发", "phrase"],
  ["meet the service target", "达到服务目标", "客户沟通", "phrase"],
  ["protect customer data", "保护客户数据", "客户沟通", "phrase"],
];

const existingTerms = new Set(
  [...everydayExpressions, ...professionalVocabulary].map((entry) =>
    entry.text.toLowerCase(),
  ),
);

function exampleFor(text: string, meaning: string, kind: string, category: string) {
  if (kind === "noun") {
    return [
      `We reviewed the ${text} before the client meeting.`,
      `客户会议前，我们检查了${meaning}。`,
    ];
  }
  if (kind === "verb") {
    return [
      `We need to ${text} before the next release.`,
      `我们需要在下次发布前${meaning}。`,
    ];
  }
  if (kind === "adj") {
    return [`The new workflow is ${text}.`, `新的工作流程${meaning}。`];
  }
  const subject = category === "客户沟通" ? "We should" : "Let’s";
  return [`${subject} ${text} before the next release.`, `我们在下次发布前${meaning}。`];
}

export const additionalVocabulary: Expression[] = rows
  .filter(([text]) => !existingTerms.has(text.toLowerCase()))
  .map(([text, meaning, category, kind], index) => {
    const [example, translation] = exampleFor(text, meaning, kind, category);
    return {
      id: 500 + index + 1,
      text,
      meaning,
      category,
      partOfSpeech: kind,
      example,
      translation,
    };
  });
