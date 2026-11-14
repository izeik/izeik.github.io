import assert from "node:assert/strict";
import { mkdtemp, mkdir, readdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(root, "src/data");
const compiled = await mkdtemp(path.join(tmpdir(), "lesson-audit-"));
// Compile the real data modules in isolation; never rewrite app source or require a running server.
async function compile(directory, target) {
  await mkdir(target, { recursive: true });
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const input = path.join(directory, entry.name);
    if (entry.isDirectory()) await compile(input, path.join(target, entry.name));
    else if (entry.name.endsWith(".ts")) {
      const result = ts.transpileModule(await readFile(input, "utf8"), {
        compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
      });
      let code = result.outputText;
      const imports = [...code.matchAll(/(from\s+["'])(\.[^"']+)(["'])/g)];
      for (const [full, before, specifier, after] of imports) {
        let relative = specifier;
        try {
          await readFile(path.resolve(directory, specifier + ".ts"));
          relative += ".js";
        } catch {
          relative += "/index.js";
        }
        code = code.replace(full, before + relative + after);
      }
      await writeFile(path.join(target, entry.name.replace(/\.ts$/, ".js")), code);
    }
  }
}
const literal = (text) =>
  new RegExp(
    "(?<![a-z])" + text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![a-z])",
    "gi",
  );
try {
  await writeFile(path.join(compiled, "package.json"), '{"type":"module"}');
  await compile(source, compiled);
  const { dailyLessons } = await import(
    pathToFileURL(path.join(compiled, "lessons/index.js"))
  );
  const { lessonGaps, normalizeGapAnswer } = await import(
    pathToFileURL(path.join(compiled, "lessonGaps.js"))
  );
  const { splitEnglishSentences, articles: baseArticles } = await import(
    pathToFileURL(path.join(compiled, "articles.js"))
  );
  const { expressions } = await import(pathToFileURL(path.join(compiled, "content.js")));
  assert.equal(dailyLessons.length, 30);
  // App navigation and stored bookmarks assume ID = index + 1.
  expressions.forEach((word, i) => assert.equal(word.id, i + 1, `Library position ${i}`));
  const rows = [];
  const contexts = { daily: 0, work: 0 };
  const technicalCore = new Set([
    "endpoint",
    "payload",
    "parameter",
    "runtime",
    "constant",
    "connection pool",
    "staging environment",
    "database request",
    "pull request",
    "release branch",
  ]);
  for (const [index, lesson] of dailyLessons.entries()) {
    const prefix = `Day ${lesson.day}`;
    assert(["daily", "work"].includes(lesson.context), prefix);
    contexts[lesson.context]++;
    assert.equal(lesson.dialogue.length, 4, `${prefix}: four usable dialogue turns`);
    assert(
      lesson.dialogue.every((t) => t.text.trim() && t.translation.trim()),
      prefix,
    );
    assert.deepEqual(
      lesson.dialogue.map((t) => t.speaker),
      ["A", "B", "A", "B"],
      prefix,
    );
    assert(lesson.conversationGoal.trim(), prefix);
    assert(
      lesson.vocabulary.every((w) => !technicalCore.has(w.text.toLowerCase())),
      `${prefix}: technical material belongs in optional extension`,
    );
    assert.equal(
      lesson.extensionVocabulary.length,
      lesson.context === "work" ? 2 : 0,
      `${prefix}: optional industry words`,
    );
    for (const word of lesson.extensionVocabulary)
      assert.equal(
        expressions[word.id - 1].text.toLowerCase(),
        word.text.toLowerCase(),
        `${prefix}: archived extension ID`,
      );
    assert.equal(lesson.day, index + 1);
    assert.equal(lesson.vocabulary.length, 20, prefix);
    assert.equal(
      new Set(lesson.vocabulary.map((w) => w.text.toLowerCase())).size,
      20,
      prefix,
    );
    assert.deepEqual(
      lesson.vocabulary.map((w) => w.id),
      lesson.vocabularyIds,
      prefix,
    );
    assert.deepEqual(lesson.articleVocabularyIds, lesson.vocabularyIds, prefix);
    const singles = lesson.vocabulary.filter((w) => !w.text.includes(" ")).length;
    assert.equal(singles, 10, `${prefix}: ten words and ten conversational chunks`);
    const paragraphSentences = lesson.article.paragraphs.flatMap((p) => {
      const sentences = splitEnglishSentences(p.text);
      assert.equal(
        sentences.length,
        p.sentenceTranslations.length,
        `${prefix}: sentence translations`,
      );
      assert(
        sentences.every((_, i) => p.sentenceTranslations[i]?.trim()),
        prefix,
      );
      return sentences.map((sentence, i) => [sentence, p.sentenceTranslations[i]]);
    });
    for (const word of lesson.vocabulary) {
      assert(word.example.match(literal(word.text)), `${prefix}: missing ${word.text}`);
      assert(
        paragraphSentences.some(([s, t]) => s === word.example && t === word.translation),
        `${prefix}: example/translation for ${word.text}`,
      );
      assert.equal(
        expressions[word.id - 1].text.toLowerCase(),
        word.text.toLowerCase(),
        `${prefix}: stable word ID`,
      );
    }
    assert(
      paragraphSentences.some(([s]) => s === lesson.grammar.example),
      `${prefix}: grammar source`,
    );
    const groups = lesson.vocabularyGroups.flatMap((g) => g.vocabularyIds);
    assert.deepEqual(
      [...groups].sort((a, b) => a - b),
      [...lesson.vocabularyIds].sort((a, b) => a - b),
      `${prefix}: groups`,
    );
    const gaps = lessonGaps(lesson);
    assert.equal(gaps.length, 6, prefix);
    assert.deepEqual(
      gaps.map((g) => g.type),
      ["词汇", "词汇", "词汇", "搭配", "搭配", "语法"],
      prefix,
    );
    assert.equal(
      new Set(gaps.map((g) => g.sentence)).size,
      6,
      `${prefix}: distinct exercises`,
    );
    for (const gap of gaps) {
      assert.equal((gap.sentence.match(/______/g) ?? []).length, 1, prefix);
      assert(
        !gap.sentence.match(literal(gap.answer)),
        `${prefix}: visible answer ${gap.answer}`,
      );
      assert(
        paragraphSentences.some(
          ([s]) => s === gap.sentence.replace("______", gap.answer),
        ),
        `${prefix}: reconstructed gap`,
      );
      assert(gap.hint.trim() && gap.explanation.trim(), prefix);
    }
    const readingGap = lesson.article.gap;
    assert(
      lesson.article.paragraphs.some((p) =>
        p.text
          .toLowerCase()
          .includes(
            readingGap.sentence.replace("______", readingGap.answer).toLowerCase(),
          ),
      ),
      `${prefix}: reading gap context`,
    );
    for (const question of lesson.article.questions) {
      assert(
        question.options[question.answer]?.trim() && question.explanation.trim(),
        `${prefix}: reading answer`,
      );
    }
    rows.push(
      `| ${lesson.day} | ${lesson.theme} | ${singles} / ${20 - singles} | 20 / 20 | 6 | ${lesson.vocabularyGroups.map((g) => g.title).join(" → ")} |`,
    );
  }
  const { readingGaps } = await import(
    pathToFileURL(path.join(compiled, "readingGaps.js"))
  );
  const lessonByArticle = new Map(
    dailyLessons.map((lesson) => [lesson.article.id, lesson]),
  );
  let readingGapCount = 0;
  for (const base of baseArticles) {
    const lesson = lessonByArticle.get(base.id);
    const article = lesson?.article ?? base;
    const gaps = readingGaps(article, [...(lesson?.vocabulary ?? []), ...expressions]);
    assert.equal(gaps.length, 3, `Reading ${article.id}: exactly three completions`);
    assert.equal(
      new Set(gaps.map((g) => g.sentence)).size,
      3,
      `Reading ${article.id}: distinct questions`,
    );
    assert.equal(
      new Set(gaps.map((g) => normalizeGapAnswer(g.answer))).size,
      3,
      `Reading ${article.id}: different targets`,
    );
    gaps.forEach((gap, index) => {
      assert.equal((gap.sentence.match(/______/g) ?? []).length, 1);
      assert(
        !gap.sentence.match(literal(gap.answer)),
        `Reading ${article.id}: no visible answer`,
      );
      assert(gap.hint.trim());
      assert(
        article.paragraphs.some((p) => p.text.match(literal(gap.answer))),
        `Reading ${article.id}: answer from text`,
      );
      if (index > 0)
        assert(
          article.paragraphs.some((p) =>
            p.text.includes(gap.sentence.replace("______", gap.answer)),
          ),
          `Reading ${article.id}: extra gap exact source`,
        );
    });
    readingGapCount += gaps.length;
  }
  assert.equal(readingGapCount, 120);
  assert.deepEqual(contexts, { daily: 15, work: 15 });
  // Regression: invalid initial candidates must not reduce the number of exercises.
  const retry = structuredClone(dailyLessons[0]);
  retry.vocabulary[0].example = "No target here.";
  retry.vocabulary[1].example = "No target here either.";
  assert.equal(lessonGaps(retry).length, 6);
  // Regression: blank "so" must not remove the beginning of "Sofia".
  const boundary = structuredClone(dailyLessons[24]);
  boundary.grammar.example = "Sofia planned carefully so everyone could prepare.";
  boundary.grammarBlank = "so";
  assert.equal(
    lessonGaps(boundary).at(-1).sentence,
    "Sofia planned carefully ______ everyone could prepare.",
  );
  assert.equal(normalizeGapAnswer("  LET’S   try  "), "let's try");
  assert.equal(normalizeGapAnswer("  MORNING "), "morning");
  console.log(
    "PASS: 30 lessons, 600 vocabulary entries, 180 consolidation gaps, 120 reading completions across 40 articles, 120 dialogue turns, 15 daily/15 workplace lessons; IDs, optional extensions, groups, original examples and regressions.",
  );
  if (process.argv.includes("--report")) {
    await writeFile(
      path.join(root, "docs/lesson-audit-table.md"),
      "# 前 30 天逐日结构核验\n\n由 `npm run audit:lessons -- --report` 基于实际课程数据生成。单词/短语按是否含空格统计；文章关联以完整词边界检查，并核对例句及对应句译。选词与课程说明见 conversation-course-update.md。\n\n| 天数 | 场景 | 单词 / 短语 | 文章关联 | 巩固填空 | 关联分组 |\n| --- | --- | --- | --- | --- | --- |\n" +
        rows.join("\n") +
        "\n",
    );
  }
} finally {
  await rm(compiled, { recursive: true, force: true });
}
