# Everyday English Trainer

面向中文母语者的日常与职场英语口语训练 MVP。使用 Vue 3、TypeScript、Vite、Vuetify 和 Pinia；学习进度使用浏览器 LocalStorage 保存，无需付费 API 或账号。

## 启动

需要 Node.js 20 或更新版本。

```bash
npm install
npm run dev
```

浏览器打开 Vite 输出的本地地址。生产构建：

```bash
npm run build
npm run preview
```

## 功能

- 学习首页：今日目标、学习时长、掌握数量、连续学习和本周趋势。
- 词语搭配：内置 918 条常用表达与 IT 职场词汇，支持搜索、收藏、掌握标记、朗读和练习。
- 情景口语：日常问题以及职场、开发交流表达；可文字回答并查看示例。
- 语音训练：浏览器 SpeechRecognition（如支持）与 SpeechSynthesis；没有识别能力时保留文字输入，不提供虚构的发音评分。
- 语法：20 个基础知识点、常见错误和造句练习。
- 30 天学习路径：每天 20 个主题单词与搭配、一篇阅读和一项直接取材于文章句子的语法练习。
- 错误记录、学习统计：本地记录并可重新查看。

## 数据与限制

语音识别由浏览器实现，设备和浏览器支持不同；麦克风通常要求 localhost 或 HTTPS。所有练习数据只保存在当前浏览器的 LocalStorage 中，清理浏览器数据会一并清除学习记录。内容为初始学习材料，可继续扩充和校订。

## 项目结构

```text
src/
├── App.vue                    # 应用外壳、导航与活动页面切换
├── main.ts                    # Vue、Pinia、Vuetify 初始化
├── style.css                  # 全局基础样式与响应式规则
├── components/views/          # 各学习页面的独立视图组件
├── composables/useTrainer.ts  # 页面共享的练习状态与交互逻辑
├── data/
│   ├── expressions.ts         # 日常搭配学习卡片
│   ├── professionalVocabulary.ts # IT 与职场首批 386 条词汇
│   ├── conversation.ts        # 日常问题、职场与开发表达
│   ├── grammar.ts             # 语法知识点与练习
│   ├── lessons/               # 30 天逐日课程；每个 day-XX.ts 包含当日词汇、文章与语法
│   │   ├── shared.ts          # 日课类型、结构校验与练习字段补全
│   │   └── index.ts           # 汇总 30 个日课文件
│   ├── learningPlan.ts        # 汇总可自由选择的 30 天日课
│   └── content.ts             # 内容模块统一导出入口
└── stores/learning.ts         # Pinia 学习状态与 LocalStorage 持久化
```

## 格式与注释约定

- 使用 Prettier 统一 Vue、TypeScript、CSS、JSON 和 Markdown 格式。运行 `npm run format` 格式化，运行 `npm run format:check` 检查格式。
- 页面模板放在 `components/views/`，跨页面共享的状态和动作放在 composable，持久化规则放在 store，学习材料放在 `data/`。
- 注释解释模块职责、数据来源或不明显的业务原因；避免重复描述变量名或模板本身已经表达的内容。
- 日课内容写入 `data/lessons/day-XX.ts`；每课固定保存 20 个词条、文章、文章直连词组 ID 与语法重点，调整日课时只需编辑对应日期文件。
- 通用词库、文章库和语法库仍作为独立素材库维护；日课内嵌其选定词组和文章副本，便于逐日修订而不影响其他页面。

## 每日巩固和 AI 用词解析

在首页选择学习日，展开“巩固填空”。核对参考答案后，点击“AI 解析我的用词”可判断替代答案是否自然，并查看理由、建议词和完整例句。词汇卡及阅读填空也有此入口。阅读填空接受教材答案，也接受 AI 判断在本句自然的替代表达。AI 建议调整的阅读填词会连同建议和理由记入错误本。

复制 `.env.example` 为项目根目录的 `.env.local`，填写兼容 Chat Completions 的配置：

- `AI_BASE_URL`：服务的 API 根地址，按服务商说明包含版本前缀，例如 `https://服务域名/v1`。程序会追加 `/chat/completions`。
- `AI_MODEL`：账号可用的模型 ID。
- `AI_API_KEY`：服务端密钥，请在本机设置。

修改后重新启动 `npm run dev` 或 `npm run preview`。两个本地服务均提供同源接口。仅发布 dist 时还需部署相应的服务端接口。AI 请求按服务商规则计费。未配置或请求失败时仍可使用课程参考解析。
