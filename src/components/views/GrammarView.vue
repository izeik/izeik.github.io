<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import type { TrainerContext } from "../../composables/useTrainer";

const context = inject<TrainerContext>("trainer")!;
const { store, grammar, grammarIndex, currentGrammar, nextGrammar } = context;
const grammarAnswer = ref("");
const followUpAnswer = ref("");
const reviewLogged = ref(false);
const firstSubmitted = ref(false);
const followUpSubmitted = ref(false);

const completedCount = computed(
  () => Number(firstSubmitted.value) + Number(followUpSubmitted.value),
);

watch(grammarIndex, () => resetPractice());

function resetPractice() {
  grammarAnswer.value = "";
  reviewLogged.value = false;
  followUpAnswer.value = "";
  firstSubmitted.value = false;
  followUpSubmitted.value = false;
}

function submitFirstTask() {
  if (firstSubmitted.value || !grammarAnswer.value.trim()) return;
  firstSubmitted.value = true;
  store.logSession(2);
}

function submitFollowUp() {
  if (!firstSubmitted.value || followUpSubmitted.value || !followUpAnswer.value.trim())
    return;
  followUpSubmitted.value = true;
  store.logSession(2);
}
function logReview() {
  if (!followUpSubmitted.value || reviewLogged.value) return;
  store.logSession(1);
  reviewLogged.value = true;
}
</script>

<template>
  <section>
    <div class="page-title">把语法用进真实表达</div>
    <div class="muted mt-1 mb-4">
      先完成一个生活或职场表达任务，再换个内容用同一个句型。每次约 3 分钟，不做考试题。
    </div>
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="pa-3">
          <div class="d-flex justify-space-between align-center px-3 py-2">
            <div class="font-weight-bold">实用表达主题</div>
            <v-chip size="small" color="primary" variant="tonal"
              >{{ grammar.length }} 组</v-chip
            >
          </div>
          <v-list density="compact" class="grammar-list">
            <v-list-item
              v-for="(item, index) in grammar"
              :key="item.id"
              :title="item.title"
              :active="grammarIndex === index"
              rounded="lg"
              @click="grammarIndex = index"
            />
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card class="pa-4 pa-md-5">
          <div class="d-flex flex-wrap justify-space-between align-center ga-2">
            <v-chip color="primary" variant="tonal"
              >{{ currentGrammar.vocabularyExpression ? "词库搭配实战" : "场景实战" }} ·
              {{ currentGrammar.title }}</v-chip
            >
            <span class="text-caption muted">本组进度 {{ completedCount }} / 2</span>
          </div>

          <v-card flat color="deep-purple-lighten-5" class="pa-4 mt-4">
            <div class="eyebrow">场景</div>
            <div class="text-body-1 font-weight-medium mt-1">
              {{ currentGrammar.scenario }}
            </div>
          </v-card>

          <div class="mt-5">
            <div class="eyebrow">先试着表达</div>
            <div class="text-body-1 mt-2">{{ currentGrammar.task }}</div>
            <v-text-field
              v-model="grammarAnswer"
              label="用英文写下你会怎么说"
              placeholder="先按自己的想法表达，不必追求复杂句子"
              variant="outlined"
              class="mt-3"
              hide-details
              :disabled="firstSubmitted"
              @keyup.enter="submitFirstTask"
            />
            <v-btn
              class="mt-3"
              color="primary"
              :disabled="firstSubmitted || !grammarAnswer.trim()"
              @click="submitFirstTask"
            >
              {{ firstSubmitted ? "已完成" : "查看自然表达" }}
            </v-btn>
            <v-expand-transition>
              <v-card
                v-if="firstSubmitted"
                flat
                color="green-lighten-5"
                class="pa-4 mt-4"
              >
                <div class="eyebrow">自然表达示例</div>
                <div class="text-body-1 font-weight-medium mt-2">
                  {{ currentGrammar.model }}
                </div>
                <div class="text-body-2 mt-2">你的表达：{{ grammarAnswer }}</div>
                <div class="text-body-2 muted mt-2">
                  {{ currentGrammar.explanation }} {{ currentGrammar.note }}
                </div>
                <div class="text-caption mt-2">
                  对照时只关注本组句型是否用对；意思相近的表达也可以成立。
                </div>
              </v-card>
            </v-expand-transition>
          </div>

          <v-divider class="my-4" />

          <div :class="{ 'practice-locked': !firstSubmitted }">
            <div class="d-flex flex-wrap justify-space-between align-center ga-2">
              <div>
                <div class="eyebrow">换个情境，再用一次</div>
                <div class="text-body-1 mt-1">{{ currentGrammar.followUp }}</div>
              </div>
              <v-chip v-if="!firstSubmitted" size="small" variant="outlined"
                >先完成上一个表达</v-chip
              >
            </div>
            <v-text-field
              v-model="followUpAnswer"
              label="试着自己组织一句英文"
              variant="outlined"
              class="mt-3"
              hide-details
              :disabled="!firstSubmitted || followUpSubmitted"
              @keyup.enter="submitFollowUp"
            />
            <div class="d-flex flex-wrap ga-2 mt-3">
              <v-btn
                variant="outlined"
                :disabled="!firstSubmitted || followUpSubmitted || !followUpAnswer.trim()"
                @click="submitFollowUp"
              >
                {{ followUpSubmitted ? "已完成迁移练习" : "完成迁移练习" }}
              </v-btn>
              <v-btn
                v-if="followUpSubmitted"
                variant="text"
                :disabled="reviewLogged"
                @click="logReview"
                >{{ reviewLogged ? "已记录复习" : "记录复习" }}</v-btn
              >
            </div>
            <v-alert v-if="followUpSubmitted" type="success" variant="tonal" class="mt-4">
              <div class="font-weight-medium">
                参考表达：{{ currentGrammar.followUpModel }}
              </div>
              <div class="text-body-2 mt-1">
                把你的句子和参考表达对照，看看是否能在新情境里复用同一个句型。
              </div>
            </v-alert>
          </div>

          <v-divider class="my-4" />
          <v-expansion-panels variant="accordion">
            <v-expansion-panel title="简明语法提示">
              <v-expansion-panel-text>
                <p>{{ currentGrammar.explanation }}</p>
                <p class="mt-3">
                  <span class="text-error">常见说法：</span>{{ currentGrammar.wrong }}
                </p>
                <p class="mt-1">
                  <span class="text-success">更自然：</span>{{ currentGrammar.correct }}
                </p>
                <p class="text-caption muted mt-2">{{ currentGrammar.note }}</p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <div class="d-flex justify-end mt-5">
            <v-btn
              color="primary"
              variant="tonal"
              append-icon="mdi-arrow-right"
              @click="nextGrammar"
              >下一个表达主题</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<style scoped>
.grammar-list {
  max-height: min(70vh, 720px);
  overflow-y: auto;
}
.practice-locked {
  opacity: 0.58;
}
@media (max-width: 959px) {
  .grammar-list {
    max-height: 260px;
  }
}
</style>
