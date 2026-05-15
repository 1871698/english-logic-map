<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { shuffle } from 'lodash-es'
import {
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  WandSparkles
} from 'lucide-vue-next'

const props = defineProps({
  level: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'complete'])

const queue = ref([])
const questionIndex = ref(0)
const correctCount = ref(0)
const solvedCount = ref(0)
const selectedOption = ref('')
const typedAnswer = ref('')
const feedback = ref('')
const revealed = ref(false)
const mainBranchVisible = ref(false)
const completionSent = ref(false)
const branchCardRef = ref(null)

const currentQuestion = computed(() => queue.value[questionIndex.value] ?? null)
const answerReveal = computed(
  () =>
    currentQuestion.value?.answerText ||
    currentQuestion.value?.answerKey ||
    currentQuestion.value?.originalText ||
    '请参考原题'
)
const progressLabel = computed(() =>
  `${Math.min(questionIndex.value + 1, queue.value.length)} / ${queue.value.length || 0}`
)
const canAutoGrade = computed(
  () =>
    currentQuestion.value?.type === 'multiple_choice' ||
    Boolean(currentQuestion.value?.answerText)
)

function normalizeAnswer(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function resetSession() {
  queue.value = shuffle([...props.level.questionBank.questions])
  questionIndex.value = 0
  correctCount.value = 0
  solvedCount.value = 0
  selectedOption.value = ''
  typedAnswer.value = ''
  feedback.value = props.level.story
  revealed.value = false
  mainBranchVisible.value = false
  completionSent.value = false
}

function awardCompletionIfNeeded() {
  if (completionSent.value || correctCount.value < props.level.completionGoal) return
  completionSent.value = true
  emit('complete', {
    levelId: props.level.id,
    stars: correctCount.value >= props.level.completionGoal + 2 ? 3 : 2
  })
}

function revealMainBranch() {
  mainBranchVisible.value = true
  nextTick(() => {
    if (!branchCardRef.value) return
    gsap.fromTo(
      branchCardRef.value,
      { opacity: 0, y: 14, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
    )
  })
}

function markSolved(isCorrect) {
  if (!revealed.value) {
    solvedCount.value += 1
    if (isCorrect) {
      correctCount.value += 1
    }
  }

  revealed.value = true
  awardCompletionIfNeeded()
}

function chooseOption(optionKey) {
  if (!currentQuestion.value || revealed.value) return
  selectedOption.value = optionKey
  const isCorrect = optionKey === currentQuestion.value.answerKey
  feedback.value = isCorrect
    ? `答对了。${currentQuestion.value.analysis}`
    : `这一题更适合选 ${currentQuestion.value.answerKey}。${currentQuestion.value.analysis}`
  markSolved(isCorrect)
}

function submitTypedAnswer() {
  if (!currentQuestion.value || revealed.value) return

  if (!canAutoGrade.value) {
    revealAnswer()
    return
  }

  const expected = normalizeAnswer(currentQuestion.value.answerText || '')
  const received = normalizeAnswer(typedAnswer.value)
  const isCorrect = expected && received === expected

  feedback.value = isCorrect
    ? `填写正确。${currentQuestion.value.analysis}`
    : `参考答案是 ${answerReveal.value}。${currentQuestion.value.analysis}`
  markSolved(Boolean(isCorrect))
}

function revealAnswer() {
  if (!currentQuestion.value || revealed.value) return
  feedback.value = `参考答案：${answerReveal.value}。${currentQuestion.value.analysis}`
  markSolved(false)
}

function nextQuestion() {
  if (questionIndex.value >= queue.value.length - 1) {
    feedback.value = '这一组卷轴已经翻完了，可以返回地图，或重新进入本营地再刷一轮。'
    return
  }

  questionIndex.value += 1
  selectedOption.value = ''
  typedAnswer.value = ''
  revealed.value = false
  mainBranchVisible.value = false
  feedback.value = '继续下一题，先观察空格和语境，再决定是否需要脱水查看主干。'
}

watch(
  () => props.level.id,
  () => {
    resetSession()
  },
  { immediate: true }
)
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <button class="ghost-button" @click="emit('back')">
        <ArrowLeft class="h-4 w-4" />
        返回地图
      </button>
      <div class="flex flex-wrap gap-3">
        <div class="tag-pill bg-white/75 text-slate-700">
          <BookOpenText class="h-4 w-4 text-sky-700" />
          {{ progressLabel }}
        </div>
        <div class="tag-pill bg-emerald-50 text-emerald-800">
          <CheckCircle2 class="h-4 w-4" />
          正确 {{ correctCount }} / {{ level.completionGoal }}
        </div>
      </div>
    </div>

    <div class="grid gap-5 xl:grid-cols-[1.15fr,0.85fr]">
      <div class="panel">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-slate-500">{{ level.grammarTag }}</p>
            <h1 class="mt-2 font-display text-3xl font-bold text-bark">{{ level.title }}</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-700">{{ level.scenePrompt }}</p>
          </div>
          <div class="tag-pill bg-lavender-100 text-lavender-800">
            <Sparkles class="h-4 w-4" />
            {{ level.questionBank.questionCount }} 题已接入
          </div>
        </div>

        <div
          v-if="currentQuestion"
          class="mt-6 rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-sm"
        >
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="tag-pill bg-sky-100 text-sky-800">
              {{ currentQuestion.type === 'multiple_choice' ? '选择题' : '填空题' }}
            </span>
            <span class="tag-pill bg-emerald-100 text-emerald-800">{{ currentQuestion.category }}</span>
          </div>

          <p class="mt-5 text-lg leading-8 text-slate-800">{{ currentQuestion.prompt }}</p>

          <div v-if="currentQuestion.type === 'multiple_choice'" class="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              v-for="option in currentQuestion.options"
              :key="option.key"
              class="answer-option"
              :class="
                revealed
                  ? option.key === currentQuestion.answerKey
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                    : selectedOption === option.key
                      ? 'border-rose-300 bg-rose-50 text-rose-700'
                      : ''
                  : ''
              "
              @click="chooseOption(option.key)"
            >
              <span class="font-semibold">{{ option.key }}.</span>
              <span>{{ option.text }}</span>
            </button>
          </div>

          <div v-else class="mt-6 space-y-3">
            <input
              v-model="typedAnswer"
              type="text"
              class="field-input"
              :placeholder="canAutoGrade ? '在这里输入你的答案' : '这题暂不支持自动判分，请直接查看参考答案'"
              :disabled="revealed"
              @keydown.enter.prevent="canAutoGrade ? submitTypedAnswer() : revealAnswer()"
            />
            <p v-if="!canAutoGrade" class="text-xs leading-6 text-slate-500">
              这道题的参考答案保留为长句改写，当前不会自动判错，你可以直接查看参考答案继续闯关。
            </p>
            <div class="flex flex-wrap gap-3">
              <button
                class="action-button"
                :disabled="revealed || (canAutoGrade && !typedAnswer.trim())"
                @click="submitTypedAnswer"
              >
                {{ canAutoGrade ? '提交答案' : '查看参考答案' }}
              </button>
              <button class="ghost-button" :disabled="revealed" @click="revealAnswer">
                查看答案
              </button>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <button
              class="ghost-button"
              :disabled="!currentQuestion.mainBranch"
              @click="revealMainBranch"
            >
              <WandSparkles class="h-4 w-4" />
              一键脱水
            </button>
            <button class="action-button" :disabled="!revealed" @click="nextQuestion">
              下一题
            </button>
          </div>
        </div>
      </div>

      <aside class="space-y-5">
        <div class="panel">
          <div class="flex items-center gap-2">
            <Lightbulb class="h-4 w-4 text-amber-500" />
            <h2 class="font-display text-lg font-semibold text-bark">卷轴反馈</h2>
          </div>
          <p class="mt-4 rounded-[1.5rem] bg-amber-50 px-4 py-4 text-sm leading-7 text-slate-700">
            {{ feedback }}
          </p>
        </div>

        <div v-if="mainBranchVisible && currentQuestion?.mainBranch" ref="branchCardRef" class="panel">
          <h2 class="font-display text-lg font-semibold text-bark">脱水后的主干</h2>
          <p class="mt-4 rounded-[1.5rem] bg-sky-50 px-4 py-4 text-sm leading-7 text-slate-700">
            {{ currentQuestion.mainBranch }}
          </p>
        </div>

        <div class="panel">
          <h2 class="font-display text-lg font-semibold text-bark">当前营地目标</h2>
          <p class="mt-3 text-sm leading-7 text-slate-700">
            当前已完成 {{ solvedCount }} 题，答对 {{ correctCount }} 题。累计答对
            {{ level.completionGoal }} 题后，这个营地会计入地图进度。
          </p>
        </div>

        <div class="panel">
          <h2 class="font-display text-lg font-semibold text-bark">原题参考</h2>
          <p class="mt-3 text-sm leading-7 text-slate-700">{{ currentQuestion?.originalText }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>
