import assert from "node:assert/strict";
import ts from "typescript";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createServer } from "node:http";
const temp = await mkdtemp(path.join(tmpdir(), "reinforcement-"));
async function load(relative, name) {
  const input = await readFile(new URL("../" + relative, import.meta.url), "utf8");
  const output = ts.transpileModule(input, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const file = path.join(temp, name + ".mjs");
  await writeFile(file, output);
  return import(pathToFileURL(file));
}
const servers = [];
try {
  const { readingTokens } = await load("src/data/readingTokens.ts", "tokens");
  const entries = [
    "make a decision",
    "run out of",
    "pick up",
    "work as expected",
    "not work as expected",
    "depend on",
  ].map((text, id) => ({
    id,
    text,
    meaning: "测试释义",
    example: "",
    translation: "",
    category: "Daily",
  }));
  for (const [sentence, display, lookup] of [
    ["She made a decision today.", "made a decision", "make a decision"],
    ["We ran out of coffee.", "ran out of", "run out of"],
    ["Mia picks him up at the station.", "picks him up", "pick up"],
    ["It did not work as expected.", "not work as expected", "not work as expected"],
  ]) {
    const tokens = readingTokens(sentence, entries);
    assert.equal(tokens.map((t) => t.text).join(""), sentence);
    assert(tokens.some((t) => t.text === display && t.lookup === lookup && t.phrase));
  }
  assert(!readingTokens("Independent on paper.", entries).some((t) => t.phrase));
  const { transferTasks } = await load("src/data/transferTasks.ts", "transfers");
  assert.equal(transferTasks.length, 30);
  assert.equal(new Set(transferTasks).size, 30);
  const { aiTutor } = await load("server/aiTutor.ts", "ai");
  const { validReviewExercise } = await load("src/data/reviewExercise.ts", "review");
  assert(!validReviewExercise({ sentence: "x", answer: "ok", hint: "", options: 42 }));
  assert(
    validReviewExercise({ sentence: "x", answer: "ok", hint: "", options: ["ok", "no"] }),
  );
  let mode = "ok";
  let system = "";
  const upstream = createServer(async (req, res) => {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    system = JSON.parse(raw).messages[0].content;
    res.setHeader("Content-Type", "application/json");
    if (mode === "rate") {
      res.statusCode = 429;
      res.end("{}");
      return;
    }
    if (mode === "invalid") {
      res.end(JSON.stringify({ choices: [{ message: { content: "not JSON" } }] }));
      return;
    }
    res.end(
      JSON.stringify({
        choices: [
          {
            message: {
              content: JSON.stringify({
                verdict: "natural",
                reason: "基于原文的测试解析",
                suggestion: "reference",
                completed: "supporting evidence",
              }),
            },
          },
        ],
      }),
    );
  });
  await new Promise((r) => upstream.listen(0, "127.0.0.1", r));
  servers.push(upstream);
  const port = upstream.address().port;
  const app = createServer();
  let middleware;
  aiTutor({
    AI_BASE_URL: `http://127.0.0.1:${port}`,
    AI_MODEL: "mock",
    AI_API_KEY: "test-only",
  }).configureServer({
    middlewares: {
      use(fn) {
        middleware = fn;
      },
    },
  });
  app.on("request", (req, res) =>
    middleware(req, res, () => {
      res.statusCode = 404;
      res.end();
    }),
  );
  await new Promise((r) => app.listen(0, "127.0.0.1", r));
  servers.push(app);
  const url = `http://127.0.0.1:${app.address().port}/api/gap-feedback`;
  const post = (body) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  const base = {
    sentence: "Why?\nA. one\nB. two",
    reference: "one",
    answer: "two",
    focus: "An article with context.",
  };
  let response = await post({ ...base, kind: "choice" });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).reason, "基于原文的测试解析");
  assert(system.includes("选择题"));
  response = await post({ ...base, sentence: "We keep in ______.", answer: "touch" });
  assert.equal(response.status, 200);
  assert(system.includes("空位"));
  assert.equal((await post({ ...base, kind: "gap" })).status, 400);
  assert.equal((await post({ ...base, kind: "unsupported" })).status, 400);
  assert.equal((await post({ ...base, kind: "choice", answer: "" })).status, 400);
  assert.equal((await fetch(url)).status, 405);
  mode = "rate";
  assert.equal((await post({ ...base, kind: "choice" })).status, 502);
  mode = "invalid";
  assert.equal((await post({ ...base, kind: "choice" })).status, 502);
  console.log(
    "PASS phrase boundaries, longest matching, inflections, separated pronouns, 30 transfer tasks; choice/gap AI contracts with a local mock (no paid API).",
  );
} finally {
  await Promise.all(servers.map((s) => new Promise((r) => s.close(r))));
  await rm(temp, { recursive: true, force: true });
}
