import assert from "node:assert/strict";
import { createServer } from "vite";
import { createPinia, setActivePinia, disposePinia } from "pinia";
import { nextTick } from "vue";
const memory = new Map();
let rejectRead = false,
  rejectWrite = false;
const originalStorage = globalThis.localStorage;
globalThis.localStorage = {
  getItem(key) {
    if (rejectRead) throw Error("storage disabled");
    return memory.get(key) ?? null;
  },
  setItem(key, value) {
    if (rejectWrite) throw Error("storage full");
    memory.set(key, value);
  },
};
const server = await createServer({
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: "custom",
  logLevel: "error",
});
let pinia;
try {
  const { usePictureDrillStore } = await server.ssrLoadModule(
    "/src/stores/pictureDrill.ts",
  );
  const { useLearningStore } = await server.ssrLoadModule("/src/stores/learning.ts");
  const { useReinforcementStore } = await server.ssrLoadModule(
    "/src/stores/reinforcement.ts",
  );
  const reset = () => {
    if (pinia) disposePinia(pinia);
    pinia = createPinia();
    setActivePinia(pinia);
    return usePictureDrillStore();
  };
  let drill = reset();
  assert.equal(drill.phase, "setup");
  drill.start(5, "daily");
  const ids = [...drill.round.ids];
  assert.equal(drill.current.category, "daily");
  drill.next();
  assert.equal(drill.round.index, 0);
  const incorrect = drill.options.find((w) => w.id !== drill.current.id).id;
  drill.choose("not-an-option");
  assert.equal(drill.answered, false);
  drill.choose(incorrect);
  assert.equal(
    drill.answered,
    true,
    "Adding an answer must immediately update button/transition state",
  );
  assert.equal(drill.recognitionScore, 0);
  drill.choose(drill.current.id);
  assert.equal(useReinforcementStore().summaries["看图刷词 · 词义"].attempts, 1);
  assert.equal(useLearningStore().errors.length, 1);
  assert.equal(useLearningStore().errors[0].exercise.options.length, 4);
  drill.next();
  for (let i = 1; i < 5; i++) {
    drill.choose(drill.current.id);
    assert(drill.answered);
    drill.next();
  }
  assert.equal(drill.phase, "offer");
  assert.equal(drill.recognitionScore, 4);
  drill.next();
  assert.equal(drill.phase, "offer");
  drill.beginSpelling();
  assert.deepEqual([...drill.round.spellingOrder].sort(), [...ids].sort());
  const order = [...drill.round.spellingOrder];
  drill.beginSpelling();
  assert.deepEqual(drill.round.spellingOrder, order);
  for (let i = 0; i < 5; i++) {
    assert.equal(drill.answered, false);
    drill.draft = i ? drill.current.word.toUpperCase() : "incorrect";
    drill.spell();
    assert.equal(
      drill.answered,
      true,
      "A false spelling result still means the item was answered",
    );
    drill.spell();
    assert.equal(useReinforcementStore().summaries["看图刷词 · 拼写"].attempts, i + 1);
    drill.next();
    assert.equal(drill.draft, "");
  }
  assert.equal(drill.phase, "summary");
  assert.equal(drill.spellingScore, 4);
  assert.equal(useLearningStore().streak, 1);
  assert.equal(useLearningStore().minutes, 0);
  await nextTick();
  drill = reset();
  assert.equal(drill.phase, "summary");
  assert.equal(drill.recognitionScore, 4);
  assert.equal(drill.spellingScore, 4);
  assert.deepEqual(drill.round.ids, ids);
  assert.equal(drill.seen.length, 5);
  drill.reset();
  assert.equal(drill.phase, "setup");
  drill.start(5, "daily");
  assert(!drill.round.ids.some((id) => ids.includes(id)));
  for (let i = 0; i < 5; i++) {
    drill.choose(drill.current.id);
    drill.next();
  }
  drill.skipSpelling();
  assert.equal(drill.phase, "summary");
  assert.equal(drill.round.spellingOrder.length, 0);
  assert.equal(drill.spellingScore, 0);
  await nextTick();
  const saved = JSON.parse(memory.get("eet-picture-drill-v1"));
  saved.round.options = {};
  memory.set("eet-picture-drill-v1", JSON.stringify(saved));
  drill = reset();
  assert.equal(drill.round, null);
  assert.equal(drill.seen.length, 10);
  assert(drill.warning);
  rejectWrite = true;
  drill.start(5, "work");
  await nextTick();
  assert(drill.warning.includes("无法保存"));
  assert.equal(drill.current.category, "work");
  rejectRead = true;
  drill = reset();
  assert.equal(drill.phase, "setup");
  assert(drill.warning.includes("无法读取"));
  console.log(
    "PASS picture-drill store: reactive answer lock, invalid/double submissions, same-word spelling, skip, saved progress, unseen priority, activity and unavailable storage.",
  );
} finally {
  if (pinia) disposePinia(pinia);
  await server.close();
  if (originalStorage === undefined) delete globalThis.localStorage;
  else globalThis.localStorage = originalStorage;
}
