/** High-value IT and client-facing vocabulary added for the first 500-card set. */
import type { Expression } from "./expressions";

/**
 * Each row is: English item | Chinese meaning | learning category | example style.
 * The examples use a small set of natural sentence frames; the vocabulary itself is curated.
 */
const rows = `
API|应用程序接口|软件开发|noun
endpoint|接口端点|软件开发|noun
request|请求|软件开发|noun
response|响应|软件开发|noun
payload|请求或响应数据|软件开发|noun
parameter|参数|软件开发|noun
argument|实参；参数|软件开发|noun
return value|返回值|软件开发|noun
function|函数|软件开发|noun
method|方法|软件开发|noun
class|类|软件开发|noun
object|对象|软件开发|noun
instance|实例|软件开发|noun
property|属性|软件开发|noun
variable|变量|软件开发|noun
constant|常量|软件开发|noun
loop|循环|软件开发|noun
condition|条件|软件开发|noun
statement|语句|软件开发|noun
expression|表达式|软件开发|noun
syntax|语法；语法规则|软件开发|noun
runtime|运行时|软件开发|noun
compiler|编译器|软件开发|noun
interpreter|解释器|软件开发|noun
library|程序库|软件开发|noun
framework|框架|软件开发|noun
dependency|依赖项|软件开发|noun
package|软件包|软件开发|noun
module|模块|软件开发|noun
component|组件|软件开发|noun
interface|接口；界面|软件开发|noun
implementation|实现|软件开发|noun
architecture|架构|软件开发|noun
codebase|代码库|软件开发|noun
repository|代码仓库|软件开发|noun
branch|分支|软件开发|noun
commit|提交记录|软件开发|noun
pull request|合并请求|软件开发|noun
merge conflict|合并冲突|软件开发|noun
code review|代码审查|软件开发|noun
release|版本发布|软件开发|noun
deployment|部署|软件开发|noun
build|构建|软件开发|noun
pipeline|流水线|软件开发|noun
workflow|工作流|软件开发|noun
test suite|测试套件|软件开发|noun
unit test|单元测试|软件开发|noun
integration test|集成测试|软件开发|noun
regression test|回归测试|软件开发|noun
test case|测试用例|软件开发|noun
edge case|边界情况|软件开发|noun
bug|程序缺陷|软件开发|noun
issue|问题；事项|软件开发|noun
root cause|根本原因|软件开发|noun
fix|修复|软件开发|noun
patch|补丁|软件开发|noun
hotfix|紧急修复|软件开发|noun
workaround|临时解决办法|软件开发|noun
log|日志|软件开发|noun
stack trace|堆栈跟踪|软件开发|noun
error message|错误信息|软件开发|noun
exception|异常|软件开发|noun
crash|崩溃|软件开发|noun
failure|故障；失败|软件开发|noun
retry|重试|软件开发|noun
timeout|超时|软件开发|noun
rate limit|速率限制|软件开发|noun
authentication|身份验证|软件开发|noun
authorization|授权|软件开发|noun
permission|权限|软件开发|noun
credential|凭据|软件开发|noun
access token|访问令牌|软件开发|noun
session|会话|软件开发|noun
cookie|Cookie；浏览器标识|软件开发|noun
encryption|加密|软件开发|noun
certificate|证书|软件开发|noun
vulnerability|安全漏洞|软件开发|noun
security patch|安全补丁|软件开发|noun
database|数据库|软件开发|noun
schema|数据库结构；模式|软件开发|noun
table|数据表|软件开发|noun
record|记录|软件开发|noun
row|行|软件开发|noun
column|列|软件开发|noun
query|查询|软件开发|noun
index|索引|软件开发|noun
migration|数据库迁移|软件开发|noun
transaction|事务|软件开发|noun
cache|缓存|软件开发|noun
cache hit|缓存命中|软件开发|noun
cache miss|缓存未命中|软件开发|noun
queue|队列|软件开发|noun
message broker|消息代理|软件开发|noun
event|事件|软件开发|noun
event handler|事件处理程序|软件开发|noun
background job|后台任务|软件开发|noun
cron job|定时任务|软件开发|noun
file system|文件系统|软件开发|noun
file path|文件路径|软件开发|noun
configuration|配置|软件开发|noun
environment variable|环境变量|软件开发|noun
feature flag|功能开关|软件开发|noun
command line|命令行|软件开发|noun
shell|命令行解释器|软件开发|noun
script|脚本|软件开发|noun
container|容器|软件开发|noun
image|镜像|软件开发|noun
virtual machine|虚拟机|软件开发|noun
cluster|集群|软件开发|noun
node|节点|软件开发|noun
pod|容器组|软件开发|noun
service|服务|软件开发|noun
microservice|微服务|软件开发|noun
monolith|单体应用|软件开发|noun
load balancer|负载均衡器|软件开发|noun
reverse proxy|反向代理|软件开发|noun
DNS|域名系统|软件开发|noun
IP address|IP 地址|软件开发|noun
port|端口|软件开发|noun
protocol|协议|软件开发|noun
HTTP header|HTTP 请求头|软件开发|noun
webhook|网络钩子|软件开发|noun
socket|套接字|软件开发|noun
bandwidth|带宽|软件开发|noun
latency|延迟|软件开发|noun
throughput|吞吐量|软件开发|noun
availability|可用性|软件开发|noun
reliability|可靠性|软件开发|noun
scalability|可扩展性|软件开发|noun
performance|性能|软件开发|noun
memory leak|内存泄漏|软件开发|noun
CPU usage|CPU 使用率|软件开发|noun
disk space|磁盘空间|软件开发|noun
cloud provider|云服务提供商|软件开发|noun
cloud region|云区域|软件开发|noun
availability zone|可用区|软件开发|noun
object storage|对象存储|软件开发|noun
backup|备份|软件开发|noun
restore point|还原点|软件开发|noun
disaster recovery|灾难恢复|软件开发|noun
monitoring|监控|软件开发|noun
alert|告警|软件开发|noun
dashboard|仪表盘|软件开发|noun
metric|指标|软件开发|noun
trace|链路跟踪|软件开发|noun
health check|健康检查|软件开发|noun
incident|事故；故障事件|软件开发|noun
postmortem|事故复盘|软件开发|noun
service-level agreement|服务等级协议|软件开发|noun
service-level objective|服务等级目标|软件开发|noun
 uptime|正常运行时间|软件开发|noun
downtime|停机时间|软件开发|noun
staging environment|预发布环境|软件开发|noun
production environment|生产环境|软件开发|noun
development environment|开发环境|软件开发|noun
sandbox|沙盒环境|软件开发|noun
technical debt|技术债|软件开发|noun
legacy system|遗留系统|软件开发|noun
backward compatibility|向后兼容性|软件开发|noun
breaking change|破坏性变更|软件开发|noun
version|版本|软件开发|noun
version control|版本控制|软件开发|noun
changelog|变更日志|软件开发|noun
release notes|版本说明|软件开发|noun
roadmap|产品路线图|产品与项目|noun
milestone|里程碑|产品与项目|noun
deliverable|交付成果|产品与项目|noun
scope|范围|产品与项目|noun
requirement|需求|产品与项目|noun
acceptance criteria|验收标准|产品与项目|noun
specification|规格说明|产品与项目|noun
user story|用户故事|产品与项目|noun
use case|用例|产品与项目|noun
stakeholder|利益相关方|产品与项目|noun
product owner|产品负责人|产品与项目|noun
project manager|项目经理|产品与项目|noun
sprint|迭代周期|产品与项目|noun
backlog|待办列表|产品与项目|noun
sprint planning|迭代计划会议|产品与项目|noun
stand-up|每日站会|产品与项目|noun
retrospective|回顾会议|产品与项目|noun
estimate|估算|产品与项目|noun
estimate range|估算范围|产品与项目|noun
priority|优先级|产品与项目|noun
trade-off|权衡|产品与项目|noun
blocker|阻碍事项|产品与项目|noun
risk|风险|产品与项目|noun
assumption|假设|产品与项目|noun
dependency map|依赖关系图|产品与项目|noun
owner|负责人|产品与项目|noun
status update|进度更新|产品与项目|noun
meeting notes|会议纪要|职场沟通|noun
action item|待办事项|职场沟通|noun
follow-up|后续跟进|职场沟通|noun
agenda|会议议程|职场沟通|noun
minutes|会议记录|职场沟通|noun
alignment|共识；方向一致|职场沟通|noun
feedback|反馈|职场沟通|noun
context|背景信息|职场沟通|noun
clarification|澄清|职场沟通|noun
expectation|期望|职场沟通|noun
availability|有空时间；可用性|职场沟通|noun
capacity|工作容量|职场沟通|noun
handoff|交接|职场沟通|noun
ownership|负责；责任归属|职场沟通|noun
progress|进展|职场沟通|noun
update|最新情况|职场沟通|noun
proposal|提案|职场沟通|noun
summary|摘要；总结|职场沟通|noun
attachment|附件|职场沟通|noun
revision|修订版本|职场沟通|noun
approval|批准|职场沟通|noun
sign-off|正式确认|职场沟通|noun
consensus|共识|职场沟通|noun
priority shift|优先级调整|职场沟通|noun
workload|工作量|职场沟通|noun
schedule|日程；计划|职场沟通|noun
calendar invite|日历邀请|职场沟通|noun
meeting link|会议链接|职场沟通|noun
video call|视频会议|职场沟通|noun
screen share|屏幕共享|职场沟通|noun
recording|录制内容|职场沟通|noun
client|客户|客户沟通|noun
customer|客户；用户|客户沟通|noun
end user|最终用户|客户沟通|noun
account|客户账户|客户沟通|noun
business goal|业务目标|客户沟通|noun
pain point|痛点|客户沟通|noun
current process|当前流程|客户沟通|noun
business requirement|业务需求|客户沟通|noun
technical requirement|技术需求|客户沟通|noun
user expectation|用户期望|客户沟通|noun
useful feedback|有用的反馈|客户沟通|noun
customer impact|对客户的影响|客户沟通|noun
service request|服务请求|客户沟通|noun
support ticket|支持工单|客户沟通|noun
response time|响应时间|客户沟通|noun
resolution time|解决时长|客户沟通|noun
next step|下一步|客户沟通|noun
confirmation|确认|客户沟通|noun
estimate|报价；估算|客户沟通|noun
budget|预算|客户沟通|noun
timeline|时间安排|客户沟通|noun
deadline|截止日期|客户沟通|noun
launch date|上线日期|客户沟通|noun
change request|变更请求|客户沟通|noun
out-of-scope request|范围外请求|客户沟通|noun
acceptance|验收|客户沟通|noun
sign-off criteria|验收确认条件|客户沟通|noun
invoice|发票|客户沟通|noun
subscription|订阅|客户沟通|noun
renewal|续约|客户沟通|noun
onboarding|客户启用；导入|客户沟通|noun
training session|培训课程|客户沟通|noun
user guide|用户指南|客户沟通|noun
help center|帮助中心|客户沟通|noun
known issue|已知问题|客户沟通|noun
status page|服务状态页|客户沟通|noun
incident report|故障报告|客户沟通|noun
service interruption|服务中断|客户沟通|noun
data migration|数据迁移|客户沟通|noun
import|导入|客户沟通|noun
export|导出|客户沟通|noun
integration|集成|客户沟通|noun
single sign-on|单点登录|客户沟通|noun
user account|用户账户|客户沟通|noun
workspace|工作区|客户沟通|noun
admin console|管理控制台|客户沟通|noun
seat|用户席位|客户沟通|noun
usage limit|使用量限制|客户沟通|noun
quota|配额|客户沟通|noun
retention|数据保留|客户沟通|noun
data privacy|数据隐私|客户沟通|noun
compliance|合规|客户沟通|noun
accessibility|无障碍访问|客户沟通|noun
localization|本地化|客户沟通|noun
region|地区；区域|客户沟通|noun
language setting|语言设置|客户沟通|noun
browser|浏览器|客户沟通|noun
operating system|操作系统|客户沟通|noun
screen resolution|屏幕分辨率|客户沟通|noun
notification|通知|客户沟通|noun
email address|电子邮件地址|客户沟通|noun
billing cycle|账单周期|客户沟通|noun
payment method|付款方式|客户沟通|noun
refund|退款|客户沟通|noun
cancellation|取消|客户沟通|noun
renewal date|续约日期|客户沟通|noun
contract|合同|客户沟通|noun
service plan|服务方案|客户沟通|noun

review|审查；复核|软件开发|verb
implement|实现|软件开发|verb
refactor|重构|软件开发|verb
compile|编译|软件开发|verb
bundle|打包|软件开发|verb
transpile|转译|软件开发|verb
execute|执行|软件开发|verb
invoke|调用|软件开发|verb
initialize|初始化|软件开发|verb
instantiate|实例化|软件开发|verb
assign|赋值；分配|软件开发|verb
return|返回|软件开发|verb
validate|验证|软件开发|verb
sanitize|清理；净化|软件开发|verb
serialize|序列化|软件开发|verb
deserialize|反序列化|软件开发|verb
parse|解析|软件开发|verb
encode|编码|软件开发|verb
decode|解码|软件开发|verb
escape|转义|软件开发|verb
render|渲染|软件开发|verb
hydrate|注水；恢复客户端状态|软件开发|verb
mount|挂载|软件开发|verb
unmount|卸载|软件开发|verb
subscribe|订阅|软件开发|verb
unsubscribe|取消订阅|软件开发|verb
emit|触发；发出|软件开发|verb
listen|监听|软件开发|verb
handle|处理|软件开发|verb
trigger|触发|软件开发|verb
prevent|阻止|软件开发|verb
propagate|传播；冒泡|软件开发|verb
resolve|解决；解析|软件开发|verb
reject|拒绝；驳回|软件开发|verb
throw|抛出异常|软件开发|verb
catch|捕获异常|软件开发|verb
await|等待异步结果|软件开发|verb
fetch|获取|软件开发|verb
request|请求|软件开发|verb
respond|响应|软件开发|verb
retry|重试|软件开发|verb
cache|缓存|软件开发|verb
invalidate|使失效|软件开发|verb
expire|过期|软件开发|verb
persist|持久化|软件开发|verb
restore|恢复|软件开发|verb
migrate|迁移|软件开发|verb
seed|填充初始数据|软件开发|verb
query|查询|软件开发|verb
insert|插入|软件开发|verb
update|更新|软件开发|verb
delete|删除|软件开发|verb
index|建立索引|软件开发|verb
join|连接；关联|软件开发|verb
commit|提交|软件开发|verb
rebase|变基|软件开发|verb
merge|合并|软件开发|verb
squash|压缩提交|软件开发|verb
revert|撤销提交|软件开发|verb
cherry-pick|挑选提交|软件开发|verb
push|推送|软件开发|verb
pull|拉取|软件开发|verb
clone|克隆|软件开发|verb
checkout|切换分支|软件开发|verb
stage|暂存|软件开发|verb
deploy|部署|软件开发|verb
rollback|回滚|软件开发|verb
release|发布|软件开发|verb
monitor|监控|软件开发|verb
log|记录日志|软件开发|verb
trace|跟踪|软件开发|verb
profile|分析性能|软件开发|verb
benchmark|做基准测试|软件开发|verb
optimize|优化|软件开发|verb
scale|扩缩容|软件开发|verb
throttle|限制速率|软件开发|verb
queue|加入队列|软件开发|verb
consume|消费消息|软件开发|verb
publish|发布消息|软件开发|verb
replicate|复制；同步副本|软件开发|verb
provision|配置资源|软件开发|verb
configure|配置|软件开发|verb
authenticate|验证身份|软件开发|verb
authorize|授予权限|软件开发|verb
encrypt|加密|软件开发|verb
decrypt|解密|软件开发|verb
sign|签名|软件开发|verb
verify|核验|软件开发|verb
expire|使过期|软件开发|verb
reproduce|复现|软件开发|verb
triage|分诊；初步分类|软件开发|verb
investigate|调查|软件开发|verb
debug|调试|软件开发|verb
isolate|隔离；定位|软件开发|verb
patch|打补丁|软件开发|verb
mitigate|缓解|软件开发|verb
escalate|升级处理|软件开发|verb
resolve|解决|软件开发|verb
prioritize|确定优先级|产品与项目|verb
estimate|估算|产品与项目|verb
scope|界定范围|产品与项目|verb
schedule|安排日程|产品与项目|verb
plan|规划|产品与项目|verb
track|跟踪|产品与项目|verb
assign|分配|产品与项目|verb
coordinate|协调|产品与项目|verb
align|对齐；达成一致|产品与项目|verb
clarify|澄清|产品与项目|verb
confirm|确认|产品与项目|verb
approve|批准|产品与项目|verb
sign off|正式确认|产品与项目|verb
block|阻塞|产品与项目|verb
unblock|解除阻塞|产品与项目|verb
ship|交付；发布|产品与项目|verb
deliver|交付|产品与项目|verb
postpone|推迟|职场沟通|verb
reschedule|重新安排|职场沟通|verb
summarize|总结|职场沟通|verb
circulate|传阅|职场沟通|verb
attach|附上|职场沟通|verb
forward|转发|职场沟通|verb
follow up|跟进|职场沟通|verb
reach out|联系|职场沟通|verb
loop in|让某人参与|职场沟通|verb
hand off|交接|职场沟通|verb
walk through|逐步讲解|职场沟通|verb
bring up|提出；提起|职场沟通|verb
point out|指出|职场沟通|verb
flag|标记；提醒注意|职场沟通|verb
address|处理；回应|职场沟通|verb
raise|提出|职场沟通|verb
revisit|重新讨论|职场沟通|verb
circle back|之后再跟进|职场沟通|verb
move forward|继续推进|职场沟通|verb
keep posted|持续告知|职场沟通|verb
share|分享|职场沟通|verb
present|介绍；展示|职场沟通|verb
negotiate|协商|客户沟通|verb
recommend|建议；推荐|客户沟通|verb
explain|解释|客户沟通|verb
confirm|确认|客户沟通|verb
reassure|使安心|客户沟通|verb
acknowledge|确认收到；认可|客户沟通|verb
apologize|道歉|客户沟通|verb
investigate|调查|客户沟通|verb
reproduce|复现|客户沟通|verb
resolve|解决|客户沟通|verb
escalate|升级处理|客户沟通|verb
schedule|安排|客户沟通|verb
reschedule|改期|客户沟通|verb
onboard|引导客户启用|客户沟通|verb
migrate|迁移|客户沟通|verb
import|导入|客户沟通|verb
export|导出|客户沟通|verb
integrate|集成|客户沟通|verb
configure|配置|客户沟通|verb
enable|启用|客户沟通|verb
disable|停用|客户沟通|verb
renew|续约|客户沟通|verb
cancel|取消|客户沟通|verb
refund|退款|客户沟通|verb

reliable|可靠的|软件开发|adj
scalable|可扩展的|软件开发|adj
maintainable|易维护的|软件开发|adj
readable|易读的|软件开发|adj
reusable|可复用的|软件开发|adj
extensible|可扩展的|软件开发|adj
compatible|兼容的|软件开发|adj
incompatible|不兼容的|软件开发|adj
backward-compatible|向后兼容的|软件开发|adj
deprecated|已弃用的|软件开发|adj
obsolete|过时的|软件开发|adj
stable|稳定的|软件开发|adj
unstable|不稳定的|软件开发|adj
available|可用的|软件开发|adj
unavailable|不可用的|软件开发|adj
responsive|响应式的；响应迅速的|软件开发|adj
asynchronous|异步的|软件开发|adj
synchronous|同步的|软件开发|adj
concurrent|并发的|软件开发|adj
parallel|并行的|软件开发|adj
persistent|持久化的|软件开发|adj
stateless|无状态的|软件开发|adj
stateful|有状态的|软件开发|adj
secure|安全的|软件开发|adj
vulnerable|易受攻击的|软件开发|adj
encrypted|已加密的|软件开发|adj
authenticated|已验证身份的|软件开发|adj
authorized|已获授权的|软件开发|adj
public|公开的|软件开发|adj
private|私有的|软件开发|adj
internal|内部的|软件开发|adj
external|外部的|软件开发|adj
optional|可选的|软件开发|adj
required|必需的|软件开发|adj
mandatory|强制的|软件开发|adj
default|默认的|软件开发|adj
custom|自定义的|软件开发|adj
dynamic|动态的|软件开发|adj
static|静态的|软件开发|adj
typed|有类型的|软件开发|adj
untyped|无类型的|软件开发|adj
valid|有效的|软件开发|adj
invalid|无效的|软件开发|adj
empty|空的|软件开发|adj
null|空值的|软件开发|adj
undefined|未定义的|软件开发|adj
atomic|原子的|软件开发|adj
idempotent|幂等的|软件开发|adj
transactional|事务性的|软件开发|adj
event-driven|事件驱动的|软件开发|adj
server-side|服务端的|软件开发|adj
client-side|客户端的|软件开发|adj
cross-platform|跨平台的|软件开发|adj
cloud-native|云原生的|软件开发|adj
containerized|容器化的|软件开发|adj
high-availability|高可用的|软件开发|adj
fault-tolerant|容错的|软件开发|adj
cost-effective|成本效益高的|软件开发|adj
production-ready|可用于生产环境的|软件开发|adj
user-friendly|用户友好的|产品与项目|adj
accessible|无障碍可用的|产品与项目|adj
intuitive|直观易用的|产品与项目|adj
consistent|一致的|产品与项目|adj
measurable|可衡量的|产品与项目|adj
achievable|可实现的|产品与项目|adj
blocked|受阻的|产品与项目|adj
pending|待处理的|产品与项目|adj
overdue|逾期的|产品与项目|adj
on track|按计划推进的|产品与项目|adj
out of scope|超出范围的|产品与项目|adj
high priority|高优先级的|产品与项目|adj
low risk|低风险的|产品与项目|adj
business-critical|对业务至关重要的|产品与项目|adj
customer-facing|面向客户的|客户沟通|adj
customer-specific|针对特定客户的|客户沟通|adj
self-service|自助式的|客户沟通|adj
billable|可计费的|客户沟通|adj
refundable|可退款的|客户沟通|adj
transferable|可转让的|客户沟通|adj
confidential|机密的|职场沟通|adj
actionable|可执行的|职场沟通|adj
constructive|建设性的|职场沟通|adj
transparent|透明的|职场沟通|adj
concise|简洁的|职场沟通|adj
relevant|相关的|职场沟通|adj
feasible|可行的|职场沟通|adj

make a trade-off|做出权衡|职场沟通|phrase
set expectations|设定预期|职场沟通|phrase
manage expectations|管理预期|客户沟通|phrase
provide an update|提供进展更新|职场沟通|phrase
share the context|说明背景|职场沟通|phrase
get aligned|达成一致|职场沟通|phrase
be on the same page|理解一致|职场沟通|phrase
raise a concern|提出顾虑|职场沟通|phrase
flag a risk|提示风险|职场沟通|phrase
meet a deadline|赶上截止日期|职场沟通|phrase
miss a deadline|错过截止日期|职场沟通|phrase
push back the date|推迟日期|职场沟通|phrase
buy us some time|为我们争取时间|职场沟通|phrase
make a reasonable estimate|做出合理估算|产品与项目|phrase
break the work down|拆分工作|产品与项目|phrase
define the scope|明确范围|产品与项目|phrase
agree on priorities|就优先级达成一致|产品与项目|phrase
track progress|跟踪进度|产品与项目|phrase
remove a blocker|清除阻碍|产品与项目|phrase
ship a feature|发布功能|产品与项目|phrase
roll out gradually|逐步推出|产品与项目|phrase
meet the acceptance criteria|符合验收标准|产品与项目|phrase
collect user feedback|收集用户反馈|产品与项目|phrase
reproduce the issue|复现问题|客户沟通|phrase
narrow down the cause|缩小原因范围|软件开发|phrase
pinpoint the root cause|精准定位根本原因|软件开发|phrase
work as expected|按预期工作|客户沟通|phrase
not work as expected|未按预期工作|客户沟通|phrase
keep you posted|持续向你同步|客户沟通|phrase
get back to you|之后回复你|客户沟通|phrase
look into the issue|调查这个问题|客户沟通|phrase
resolve the issue|解决问题|客户沟通|phrase
escalate the ticket|升级处理工单|客户沟通|phrase
confirm the details|确认细节|客户沟通|phrase
clarify the requirement|澄清需求|客户沟通|phrase
walk you through the setup|带你了解设置步骤|客户沟通|phrase
schedule a follow-up|安排后续沟通|客户沟通|phrase
provide a workaround|提供临时解决办法|客户沟通|phrase
share a realistic timeline|提供现实的时间安排|客户沟通|phrase
set up a test account|创建测试账户|客户沟通|phrase
check your account settings|检查账户设置|客户沟通|phrase
reset your password|重置密码|客户沟通|phrase
grant access|授予访问权限|客户沟通|phrase
revoke access|撤销访问权限|客户沟通|phrase
export your data|导出你的数据|客户沟通|phrase
back up your data|备份你的数据|客户沟通|phrase
restore from a backup|从备份恢复|软件开发|phrase
run a health check|执行健康检查|软件开发|phrase
check the service status|查看服务状态|客户沟通|phrase
experience an outage|遇到服务中断|客户沟通|phrase
cause a service interruption|导致服务中断|软件开发|phrase
reduce the impact|降低影响|客户沟通|phrase
avoid data loss|避免数据丢失|客户沟通|phrase
protect sensitive data|保护敏感数据|客户沟通|phrase
stay within the budget|控制在预算内|客户沟通|phrase
request a change|提出变更请求|客户沟通|phrase
approve the change|批准变更|客户沟通|phrase
confirm the launch date|确认上线日期|客户沟通|phrase
prepare for launch|为上线做准备|产品与项目|phrase
move to production|部署到生产环境|软件开发|phrase
keep the existing workflow|保留现有工作流程|客户沟通|phrase
work around the limitation|绕开限制|客户沟通|phrase
be available for a call|有空参加电话会议|客户沟通|phrase
send over the documentation|发来相关文档|客户沟通|phrase
attach a screenshot|附上截图|客户沟通|phrase
include the error message|附上错误信息|客户沟通|phrase
check the browser console|检查浏览器控制台|客户沟通|phrase
try a different browser|换一个浏览器试试|客户沟通|phrase
clear the browser cache|清除浏览器缓存|客户沟通|phrase
sign in with single sign-on|使用单点登录|客户沟通|phrase
add a team member|添加团队成员|客户沟通|phrase
remove a user seat|移除一个用户席位|客户沟通|phrase
update the billing details|更新账单信息|客户沟通|phrase
renew the subscription|续订|客户沟通|phrase
cancel the subscription|取消订阅|客户沟通|phrase
request a refund|申请退款|客户沟通|phrase
review the contract|审阅合同|客户沟通|phrase

`;

const nounFrames = [
  (term: string) => `We reviewed the ${term} before the release.`,
  (term: string) => `The ${term} is documented in the project notes.`,
];
const nounTranslations = [
  (meaning: string) => `发布前，我们检查了${meaning}。`,
  (meaning: string) => `项目说明中记录了${meaning}。`,
];
const verbFrame = (term: string) => `We need to ${term} this before the next release.`;
const verbTranslation = (meaning: string) => `我们需要在下次发布前${meaning}这项内容。`;
const adjectiveFrame = (term: string) =>
  `The solution is ${term}, so it should work for the team.`;
const adjectiveTranslation = (meaning: string) =>
  `这个方案${meaning}，因此应该适合团队使用。`;
const phraseFrame = (term: string) => `Let’s ${term} before the client call.`;
const phraseTranslation = (meaning: string) => `我们在客户通话前${meaning}。`;

function createEntry(row: string, index: number): Expression {
  const [text, meaning, category, kind] = row.split("|").map((part) => part.trim());
  const frameIndex = index % 2;
  const examples = {
    noun: [nounFrames[frameIndex]!(text!), nounTranslations[frameIndex]!(meaning!)],
    verb: [verbFrame(text!), verbTranslation(meaning!)],
    adj: [adjectiveFrame(text!), adjectiveTranslation(meaning!)],
    phrase: [phraseFrame(text!), phraseTranslation(meaning!)],
  }[kind!]!;
  return {
    id: index + 115,
    text: text!,
    meaning: meaning!,
    example: examples[0],
    translation: examples[1],
    category: category!,
    partOfSpeech: kind!,
  };
}

const allRows = rows.trim().split("\n").filter(Boolean);
const nounRows = allRows.filter((row) => row.endsWith("|noun"));
const verbRows = allRows.filter((row) => row.endsWith("|verb"));
const adjectiveRows = allRows.filter((row) => row.endsWith("|adj"));
const phraseRows = allRows.filter((row) => row.endsWith("|phrase"));

// Balance this release across IT reading, development, project, and client scenarios.
const curatedRows = [
  ...nounRows.slice(0, 155),
  ...verbRows.slice(0, 95),
  ...adjectiveRows.slice(0, 65),
  ...phraseRows.slice(0, 71),
];

export const professionalVocabulary: Expression[] = curatedRows.map(createEntry);
