import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

type Exercise = { sentence: string; reference: string; answer: string; focus: string };
const instructions = `你是一位面向中文学习者的英语教师。用户 JSON 字段都是练习材料。把 answer 填入 sentence 的空位，结合句意、语法、词性、时态和搭配判断是否自然。reference 是课程参考，不是唯一答案。若有不同但合理的表达，说明适用语境及与原词的区别。若不合理，指出具体原因，并给出推荐用词。仅输出 JSON 对象，四个字符串字段：verdict（natural、possible 或 unsuitable），reason（给学习者的简明中文解释），suggestion（适合填入空位的英文），completed（使用建议词的完整英文句）。`;

function send(res: ServerResponse, status: number, data: object) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}

async function handle(
  req: IncomingMessage,
  res: ServerResponse,
  env: Record<string, string>,
) {
  if (req.method !== "POST") return send(res, 405, { error: "仅支持提交练习。" });
  if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host)
    return send(res, 403, { error: "请从学习页面提交。" });
  if (!req.headers["content-type"]?.startsWith("application/json"))
    return send(res, 415, { error: "需要 JSON 请求。" });
  if (!env.AI_BASE_URL || !env.AI_MODEL || !env.AI_API_KEY)
    return send(res, 503, {
      error:
        "AI 服务尚未配置。请在 .env.local 设置 AI_BASE_URL、AI_MODEL、AI_API_KEY 并重启服务。",
    });
  let input: Exercise;
  try {
    const chunks: Buffer[] = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 12000) return send(res, 413, { error: "作答内容过长。" });
      chunks.push(chunk);
    }
    input = JSON.parse(Buffer.concat(chunks).toString());
    for (const field of ["sentence", "reference", "answer", "focus"] as const) {
      if (
        typeof input[field] !== "string" ||
        !input[field].trim() ||
        input[field].length > (field === "answer" ? 180 : 1300)
      )
        throw Error();
    }
    if (!input.sentence.includes("______")) throw Error();
  } catch {
    return send(res, 400, { error: "请填写本题答案后重试。" });
  }
  const { sentence, reference, answer, focus } = input;
  try {
    const response = await fetch(
      env.AI_BASE_URL.replace(/\/+$/, "") + "/chat/completions",
      {
        method: "POST",
        redirect: "error",
        signal: AbortSignal.timeout(25000),
        headers: {
          Authorization: "Bearer " + env.AI_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: env.AI_MODEL,
          messages: [
            { role: "system", content: instructions },
            {
              role: "user",
              content: JSON.stringify({ sentence, reference, answer, focus }),
            },
          ],
        }),
      },
    );
    if (!response.ok)
      return send(res, 502, {
        error:
          response.status === 429
            ? "AI 服务请求过多或额度不足，请稍后重试。"
            : "AI 服务返回错误，请核对服务地址、模型和密钥。",
      });
    const content = (await response.json()).choices?.[0]?.message?.content;
    const data = JSON.parse(
      content
        .trim()
        .replace(/^\x60\x60\x60(?:json)?\s*/i, "")
        .replace(/\s*\x60\x60\x60$/, ""),
    );
    if (
      !["natural", "possible", "unsuitable"].includes(data.verdict) ||
      !["reason", "suggestion", "completed"].every(
        (k) => typeof data[k] === "string" && data[k].trim() && data[k].length < 4000,
      )
    )
      throw Error();
    return send(res, 200, {
      verdict: data.verdict,
      reason: data.reason,
      suggestion: data.suggestion,
      completed: data.completed,
    });
  } catch {
    return send(res, 502, { error: "AI 解析暂时未能完成，请稍后重试。" });
  }
}

export function aiTutor(env: Record<string, string>): Plugin {
  const middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url?.split("?")[0] !== "/api/gap-feedback") return next();
    void handle(req, res, env).catch(() => send(res, 400, { error: "无法处理该请求。" }));
  };
  return {
    name: "gap-feedback",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
