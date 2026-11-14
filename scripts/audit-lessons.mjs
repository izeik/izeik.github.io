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
  const { pictureWords, pictureWordById, pictureScenes, pictureWordParts } = await import(
    pathToFileURL(path.join(compiled, "pictureVocabulary/index.js"))
  );
  const { createPictureRound, restorePictureRound, spellingMatches } = await import(
    pathToFileURL(path.join(compiled, "pictureDrill.js"))
  );
  assert.equal(pictureWords.length, 1024);
  assert.equal(pictureWordById.size, 1024);
  assert(pictureWords.filter((w) => /^[a-z]+$/.test(w.word)).length > 1000);
  for (const category of ["daily", "work"])
    assert.equal(pictureWords.filter((w) => w.category === category).length, 512);
  assert.equal(new Set(pictureWords.map((w) => w.scene)).size, 24);
  const elementary = new Set(
    "apple banana cat dog red blue school teacher student happy sad good bad go come eat drink read write work home family friend like love city bus car book desk chair table computer weekend holiday money buy sell shop office meeting help want need can must because future word second interest compare available explain review shadow".split(
      " ",
    ),
  );
  for (const w of pictureWords) {
    assert(!elementary.has(w.word), `Elementary headword: ${w.word}`);
    assert(/^[a-z]+(?:-[a-z]+)*$/.test(w.word));
    assert(w.meaning.trim() && w.partOfSpeech.trim() && w.contrast.trim());
    assert(pictureScenes[w.scene]);
    assert.equal(w.category, w.scene < 12 ? "daily" : "work");
    assert.equal(
      [...w.sentence.matchAll(literal(w.word))].length,
      1,
      `${w.word}: one target in its own sentence`,
    );
    const parts = pictureWordParts(w);
    assert.equal(parts.before + parts.target + parts.after, w.sentence);
    assert(!literal(w.word).test(parts.before + "______" + parts.after));
    assert.equal(w.peers.length, 3);
    assert.equal(new Set([w.id, ...w.peers]).size, 4);
    const peers = w.peers.map((id) => pictureWordById.get(id));
    assert(
      peers.every(
        (p) =>
          p &&
          p.category === w.category &&
          p.scene === w.scene &&
          p.partOfSpeech === w.partOfSpeech &&
          p.peers.includes(w.id),
      ),
    );
    assert.equal(new Set([w.meaning, ...peers.map((p) => p.meaning)]).size, 4);
    assert(spellingMatches(w, "  " + w.word.toUpperCase() + "  "));
    assert(!spellingMatches(w, ""));
  }
  let seed = 1907;
  const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
  for (const scope of ["all", "daily", "work"])
    for (const count of [5, 10, 20, 30, 50, 100]) {
      const round = createPictureRound(pictureWords, scope, count, [], random);
      assert.equal(round.ids.length, count);
      assert.equal(new Set(round.ids).size, count);
      assert(
        round.ids.every(
          (id) => scope === "all" || pictureWordById.get(id).category === scope,
        ),
      );
      assert(restorePictureRound(round, pictureWordById));
      assert(
        round.ids.every(
          (id) => round.options[id].length === 4 && round.options[id].includes(id),
        ),
      );
    }
  const drill = createPictureRound(pictureWords, "all", 20, [], random);
  const positions = new Set(drill.ids.map((id) => drill.options[id].indexOf(id)));
  assert.equal(positions.size, 4);
  const freshWords = createPictureRound(
    pictureWords,
    "all",
    5,
    pictureWords.slice(0, -5).map((w) => w.id),
    random,
  );
  assert(freshWords.ids.every((id) => pictureWords.slice(-5).some((w) => w.id === id)));
  for (const count of [0, 4, 101, NaN, 5.5])
    assert.throws(() => createPictureRound(pictureWords, "all", count));
  assert(spellingMatches(pictureWordById.get("apologize"), "APOLOGISE"));
  assert(!spellingMatches(pictureWordById.get("burnt-out"), "burntout"));
  for (const corrupted of [
    { ...drill, index: 20 },
    { ...drill, phase: "offer" },
    { ...drill, ids: [drill.ids[0], ...drill.ids.slice(0, -1)] },
    { ...drill, options: {} },
  ])
    assert.equal(restorePictureRound(corrupted, pictureWordById), null);
  const offered = {
    ...drill,
    phase: "offer",
    choices: Object.fromEntries(drill.ids.map((id) => [id, id])),
  };
  assert(restorePictureRound(offered, pictureWordById));
  const spellingRound = {
    ...offered,
    phase: "spelling",
    index: 1,
    spellingOrder: [...drill.ids],
    spellings: { [drill.ids[0]]: false },
  };
  assert(restorePictureRound(spellingRound, pictureWordById));
  assert.equal(
    restorePictureRound(
      { ...spellingRound, spellingOrder: drill.ids.slice(1) },
      pictureWordById,
    ),
    null,
  );
  for (const filename of ["vocabulary-daily.webp", "vocabulary-work.webp"]) {
    const png = await readFile(path.join(root, "public/images", filename));
    assert.equal(png.subarray(0, 4).toString(), "RIFF");
    assert.equal(png.subarray(8, 16).toString(), "WEBPVP8 ");
    assert.equal(png.readUInt16LE(26) & 0x3fff, 1536);
    assert.equal(png.readUInt16LE(28) & 0x3fff, 1024);
  }
  console.log(
    "PASS: 1024 unique picture words (512 daily/512 work), 24 local scenes, 256 contrast sets, source sentences, spelling variants, randomized rounds and saved-state validation.",
  );
  const { tenses, tenseAnswerMatches, mixedTenseExercises } = await import(
    pathToFileURL(path.join(compiled, "tenses.js"))
  );
  const { grammarHint } = await import(
    pathToFileURL(path.join(compiled, "grammarHints.js"))
  );
  const { grammar: baseGrammar } = await import(
    pathToFileURL(path.join(compiled, "grammar.js"))
  );
  assert.equal(tenses.length, 16);
  assert.equal(new Set(tenses.map((t) => t.id)).size, 16);
  for (const group of ["现在", "过去", "将来", "过去将来"])
    assert.equal(tenses.filter((t) => t.group === group).length, 4);
  for (const tense of tenses) {
    for (const field of [
      "name",
      "english",
      "usage",
      "structure",
      "negative",
      "question",
      "clues",
      "pitfall",
      "example",
      "translation",
    ])
      assert(tense[field]?.trim(), `${tense.id}: ${field}`);
    assert(tenses.some((t) => t.id === tense.contrast.id));
    assert.notEqual(tense.contrast.id, tense.id);
    assert(tense.exercises.length >= 3);
  }
  const tenseQuestions = [...tenses.flatMap((t) => t.exercises), ...mixedTenseExercises];
  assert.equal(tenseQuestions.length, 54);
  assert.equal(new Set(tenseQuestions.map((q) => q.sentence)).size, 54);
  for (const q of tenseQuestions) {
    assert.equal((q.sentence.match(/______/g) ?? []).length, 1, q.sentence);
    assert(q.verb.trim() && q.translation.trim() && q.reason.trim());
    assert(tenseAnswerMatches(q, "  " + q.answer.toUpperCase() + "  "));
    assert(!tenseAnswerMatches(q, ""));
    for (const alternate of q.alternatives) assert(tenseAnswerMatches(q, alternate));
  }
  for (const q of mixedTenseExercises) assert(tenses.some((t) => t.id === q.tenseId));
  const presentNegative = tenses[0].exercises[1];
  assert(tenseAnswerMatches(presentNegative, " DOESN’T   DRINK "));
  assert(!tenseAnswerMatches(presentNegative, "does not drinks"));
  assert(!tenseAnswerMatches(tenses[2].exercises[0], "have send"));
  const timeClause = mixedTenseExercises.at(-1);
  assert.equal(timeClause.tenseId, "present-simple");
  assert(!tenseAnswerMatches(timeClause, "will get"));
  for (const focus of [...baseGrammar, ...dailyLessons.map((l) => l.grammar)]) {
    const teaching = grammarHint(focus);
    assert(teaching.label.trim() && teaching.structure.trim() && teaching.note.trim());
    for (const id of teaching.tenseIds) assert(tenses.some((t) => t.id === id));
  }
  for (const day of [2, 3, 4, 10, 11, 15, 16, 25])
    assert.equal(
      grammarHint(dailyLessons[day - 1].grammar).tenseIds.length,
      0,
      `Day ${day}: polite modal is not automatically past`,
    );
  assert.deepEqual(grammarHint(dailyLessons[21].grammar).tenseIds, [
    "future-simple",
    "present-simple",
  ]);
  console.log(
    `PASS: 16 tense guides, 54 tense exercises, hints for ${baseGrammar.length + dailyLessons.length} grammar topics; contractions, non-tense modals and future time-clause regressions.`,
  );
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
