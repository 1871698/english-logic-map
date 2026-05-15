<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import {
  ArrowLeft,
  Sparkles,
  ArrowUpDown,
  Volume2,
  MapPin,
  HelpCircle,
  Search,
  GitBranch,
  MessageCircle,
  FileText,
  ChevronRight,
  Lightbulb,
  BookOpen,
  WandSparkles,
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-vue-next'
import { sentenceTypesData, sentenceTypeCategories } from '../data/sentenceTypes'
import { getQuestionsByType } from '../data/practiceQuestions'

const props = defineProps({
  level: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'complete'])

const selectedCategory = ref(null)
const activeSentenceType = ref(null)
const showAnimation = ref(false)

const showPractice = ref(false)
const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const showResult = ref(false)
const isCorrect = ref(false)
const questions = ref([])
const userAnswers = ref([])

const iconMap = {
  Sparkles,
  ArrowUpDown,
  Volume2,
  MapPin,
  HelpCircle,
  Search,
  GitBranch,
  MessageCircle,
  FileText,
  WandSparkles
}

const categories = sentenceTypeCategories
const sentenceTypes = sentenceTypesData

const nameToKey = {
  '陈述句': 'declarative',
  '感叹句': 'exclamation',
  '倒装句': 'inversion',
  '祈使句': 'imperative',
  'There Be 句型': 'thereBe',
  'There Be句型': 'thereBe',
  '一般疑问句': 'generalQuestion',
  '特殊疑问句': 'specialQuestion',
  '选择疑问句': 'choiceQuestion',
  '反意疑问句': 'tagQuestion'
}

const keyToName = {
  'declarative': '陈述句',
  'exclamation': '感叹句',
  'inversion': '倒装句',
  'imperative': '祈使句',
  'thereBe': 'There Be 句型',
  'generalQuestion': '一般疑问句',
  'specialQuestion': '特殊疑问句',
  'choiceQuestion': '选择疑问句',
  'tagQuestion': '反意疑问句'
}

function getTypeData(nameOrKey) {
  if (sentenceTypes[nameOrKey]) {
    return sentenceTypes[nameOrKey]
  }
  const key = nameToKey[nameOrKey]
  return key ? sentenceTypes[key] : null
}

function selectCategory(category) {
  selectedCategory.value = category
  activeSentenceType.value = null
  closePractice()

  if (category.children) {
    const firstChildName = category.children[0]
    const firstChildData = getTypeData(firstChildName)
    if (firstChildData) {
      setTimeout(() => selectSentenceType(firstChildData), 300)
    }
  } else {
    const typeData = getTypeData(category.name)
    if (typeData) {
      setTimeout(() => selectSentenceType(typeData), 300)
    }
  }

  gsap.fromTo('.category-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 })
}

function selectSentenceType(typeData) {
  activeSentenceType.value = typeData
  showAnimation.value = false
  closePractice()

  setTimeout(() => {
    showAnimation.value = true
    animateContent()
  }, 100)
}

function animateContent() {
  gsap.fromTo('.structure-card', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' })
  gsap.fromTo('.example-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 })
  gsap.fromTo('.pattern-badge', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08 })
}

function getIcon(iconName) {
  return iconMap[iconName] || Sparkles
}

function highlightPattern(pattern) {
  if (!pattern) return ''
  return pattern
    .replace(/\+/g, ' + ')
    .replace(/\[/g, '[')
    .replace(/\]/g, ']')
}

function getChildCategories(childNames) {
  return childNames.map(name => ({
    id: nameToKey[name],
    name: name,
    icon: sentenceTypes[nameToKey[name]]?.icon || 'Sparkles'
  }))
}

function startPractice() {
  if (!activeSentenceType.value) return
  const typeKey = activeSentenceType.value.id
  questions.value = getQuestionsByType(typeKey)
  if (questions.value.length === 0) {
    questions.value = getQuestionsByType(nameToKey[activeSentenceType.value.name])
  }
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showResult.value = false
  isCorrect.value = false
  userAnswers.value = []
  showPractice.value = true
}

function closePractice() {
  showPractice.value = false
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showResult.value = false
  isCorrect.value = false
  questions.value = []
  userAnswers.value = []
}

function selectOption(option) {
  if (showResult.value) return
  selectedAnswer.value = option
}

function checkAnswer() {
  if (!selectedAnswer.value) return
  const currentQ = questions.value[currentQuestionIndex.value]
  isCorrect.value = selectedAnswer.value === currentQ.answer
  userAnswers.value.push({
    question: currentQ.question,
    selected: selectedAnswer.value,
    correct: currentQ.answer,
    isCorrect: isCorrect.value
  })
  showResult.value = true
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    showResult.value = false
    isCorrect.value = false
  }
}

function finishPractice() {
  const correctCount = userAnswers.value.filter(a => a.isCorrect).length
  showPractice.value = false
  emit('complete', {
    levelId: props.level.id,
    stars: correctCount >= questions.value.length * 0.6 ? 3 : correctCount >= questions.value.length * 0.4 ? 2 : 1
  })
}

function getScoreText() {
  const correct = userAnswers.value.filter(a => a.isCorrect).length
  const total = questions.value.length
  const percent = Math.round((correct / total) * 100)
  if (percent >= 90) return '太棒了！'
  if (percent >= 70) return '不错哦！'
  if (percent >= 50) return '继续加油！'
  return '再接再厉！'
}

onMounted(() => {
  gsap.fromTo('.main-container', { opacity: 0 }, { opacity: 1, duration: 0.6 })
  gsap.fromTo('.category-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3 })
})
</script>

<template>
  <section class="main-container space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <button class="ghost-button" @click="emit('back')">
        <ArrowLeft class="h-4 w-4" />
        返回地图
      </button>
      <div class="tag-pill bg-white/75 text-slate-700">
        <BookOpen class="h-4 w-4 text-emerald-600" />
        语法讲堂
      </div>
    </div>

    <div v-if="!showPractice" class="grid gap-5 xl:grid-cols-[1fr,1.2fr]">
      <div class="space-y-5">
        <div class="panel">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 to-teal-200 shadow-glow">
              <WandSparkles class="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">English Logic Map</p>
              <h1 class="font-display text-2xl font-bold text-bark">句子类型博物馆</h1>
            </div>
          </div>
          <p class="mt-4 text-sm leading-6 text-slate-700">
            在这里，你可以系统地学习各种句子类型。点击左侧的卡片开始探索，每种句型都配有详细的结构和例子说明。
          </p>
        </div>

        <div class="panel">
          <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-bark">
            <Sparkles class="h-4 w-4 text-amber-500" />
            选择句子类型
          </h2>
          <div class="grid gap-3 sm:grid-cols-2">
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="category-card group relative overflow-hidden rounded-2xl border border-white/60 p-4 text-left transition-all duration-300 hover:shadow-lg"
              :class="[
                selectedCategory?.id === cat.id
                  ? 'bg-emerald-50 ring-2 ring-emerald-300'
                  : 'bg-white/60 hover:bg-white/80'
              ]"
              @click="selectCategory(cat)"
            >
              <div class="flex items-start gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
                  :class="selectedCategory?.id === cat.id ? 'bg-emerald-200' : 'bg-slate-100 group-hover:bg-emerald-100'"
                >
                  <component :is="getIcon(cat.icon)" class="h-5 w-5 text-slate-600" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-slate-800">{{ cat.name }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ cat.description }}</p>
                </div>
                <ChevronRight
                  class="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1"
                  :class="selectedCategory?.id === cat.id ? 'rotate-90 text-emerald-500' : ''"
                />
              </div>
            </button>
          </div>
        </div>

        <div v-if="selectedCategory?.children" class="panel">
          <h3 class="mb-3 text-sm font-semibold text-slate-600">子类型</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="childName in selectedCategory.children"
              :key="childName"
              class="tag-pill transition-all"
              :class="activeSentenceType?.name === childName ? 'bg-emerald-200 text-emerald-800' : 'bg-white/70 text-slate-600 hover:bg-emerald-50'"
              @click="selectSentenceType(getTypeData(childName))"
            >
              {{ childName }}
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-5">
        <div v-if="activeSentenceType" class="panel">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl"
                :class="`bg-gradient-to-br ${activeSentenceType.bgGradient}`"
              >
                <component :is="getIcon(activeSentenceType.icon)" class="h-6 w-6" :class="`text-${activeSentenceType.color}-600`" />
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ activeSentenceType.id }}</p>
                <h2 class="font-display text-xl font-bold text-bark">{{ activeSentenceType.name }}</h2>
              </div>
            </div>
          </div>

          <div class="mt-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-4">
            <div class="flex items-start gap-2">
              <Lightbulb class="h-4 w-4 shrink-0 text-amber-500 mt-1" />
              <p class="text-sm leading-6 text-slate-700">{{ activeSentenceType.definition }}</p>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <BookOpen class="h-4 w-4" />
              句型结构
            </h3>
            <div class="space-y-4">
              <div
                v-for="(struct, idx) in activeSentenceType.structures"
                :key="idx"
                class="structure-card rounded-2xl border border-white/60 bg-white/50 p-4"
              >
                <div class="mb-3 flex items-center gap-2">
                  <span class="tag-pill bg-sky-100 text-sky-700">{{ struct.type }}</span>
                </div>
                <div class="pattern-badge mb-3 rounded-xl bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2 font-mono text-sm text-violet-800">
                  {{ highlightPattern(struct.pattern) }}
                </div>
                <div class="space-y-2">
                  <p class="text-xs text-slate-500">例句：</p>
                  <div
                    v-for="(ex, exIdx) in struct.examples"
                    :key="exIdx"
                    class="example-item rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  >
                    {{ ex }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeSentenceType.tips" class="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p class="flex items-start gap-2 text-sm text-emerald-800">
              <span class="shrink-0 font-semibold">小贴士：</span>
              <span>{{ activeSentenceType.tips }}</span>
            </p>
          </div>

          <button
            class="action-button mt-6 w-full"
            @click="startPractice"
          >
            开始练习
          </button>
        </div>

        <div v-else class="panel flex h-96 flex-col items-center justify-center text-center">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <Sparkles class="h-10 w-10 text-slate-300" />
          </div>
          <p class="mt-4 text-slate-500">选择一个句子类型开始学习</p>
          <p class="mt-2 text-sm text-slate-400">点击左侧的卡片探索不同的句型结构</p>
        </div>
      </div>
    </div>

    <div v-else class="panel">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="font-display text-xl font-bold text-bark">练习模式</h2>
          <p class="text-sm text-slate-500">第 {{ currentQuestionIndex + 1 }} / {{ questions.length }} 题</p>
        </div>
        <button class="ghost-button" @click="closePractice">
          <ArrowLeft class="h-4 w-4" />
          返回学习
        </button>
      </div>

      <div v-if="questions.length > 0">
        <div class="mb-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
          <p class="text-lg font-semibold text-slate-800">{{ questions[currentQuestionIndex].question }}</p>
          <p class="mt-2 text-sm text-slate-500">{{ questions[currentQuestionIndex].type }}</p>
        </div>

        <div class="mb-6 space-y-3">
          <button
            v-for="(option, idx) in questions[currentQuestionIndex].options"
            :key="idx"
            class="option-button w-full"
            :class="{
              'option-selected': selectedAnswer === option,
              'option-correct': showResult && option === questions[currentQuestionIndex].answer,
              'option-wrong': showResult && selectedAnswer === option && option !== questions[currentQuestionIndex].answer
            }"
            :disabled="showResult"
            @click="selectOption(option)"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + idx) }}.</span>
            <span>{{ option }}</span>
            <CheckCircle v-if="showResult && option === questions[currentQuestionIndex].answer" class="ml-auto h-5 w-5 text-emerald-500" />
            <XCircle v-if="showResult && selectedAnswer === option && option !== questions[currentQuestionIndex].answer" class="ml-auto h-5 w-5 text-red-500" />
          </button>
        </div>

        <div v-if="showResult" class="mb-6 rounded-2xl p-4" :class="isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'">
          <p class="flex items-center gap-2 font-semibold" :class="isCorrect ? 'text-emerald-700' : 'text-red-700'">
            <CheckCircle v-if="isCorrect" class="h-5 w-5" />
            <XCircle v-else class="h-5 w-5" />
            {{ isCorrect ? '回答正确！' : '回答错误' }}
          </p>
          <p class="mt-2 text-sm" :class="isCorrect ? 'text-emerald-600' : 'text-red-600'">
            {{ questions[currentQuestionIndex].explanation }}
          </p>
        </div>

        <div class="flex gap-3">
          <button
            v-if="!showResult"
            class="action-button flex-1"
            :disabled="!selectedAnswer"
            @click="checkAnswer"
          >
            确认答案
          </button>
          <button
            v-else-if="currentQuestionIndex < questions.length - 1"
            class="action-button flex-1"
            @click="nextQuestion"
          >
            下一题
            <ArrowRight class="h-4 w-4" />
          </button>
          <button
            v-else
            class="action-button flex-1"
            @click="finishPractice"
          >
            完成练习
          </button>
        </div>

        <div v-if="userAnswers.length > 0" class="mt-6">
          <p class="mb-3 text-sm font-semibold text-slate-600">答题进度</p>
          <div class="flex gap-2">
            <div
              v-for="(answer, idx) in userAnswers"
              :key="idx"
              class="h-3 w-3 rounded-full"
              :class="answer.isCorrect ? 'bg-emerald-500' : 'bg-red-500'"
            />
          </div>
          <p class="mt-2 text-sm text-slate-500">
            正确率：{{ userAnswers.filter(a => a.isCorrect).length }} / {{ userAnswers.length }}
          </p>
        </div>
      </div>

      <div v-else class="flex h-64 flex-col items-center justify-center text-center">
        <p class="text-slate-500">暂无练习题</p>
        <button class="action-button mt-4" @click="closePractice">
          返回学习
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.option-button {
  @apply flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left transition-all;
  @apply hover:border-emerald-300 hover:bg-emerald-50;
  @apply disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-slate-200 disabled:hover:bg-white;
}

.option-button.option-selected {
  @apply border-emerald-400 bg-emerald-50;
}

.option-button.option-correct {
  @apply border-emerald-500 bg-emerald-50;
}

.option-button.option-wrong {
  @apply border-red-500 bg-red-50;
}

.option-letter {
  @apply flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600;
}

.option-selected .option-letter {
  @apply bg-emerald-200 text-emerald-700;
}

.option-correct .option-letter {
  @apply bg-emerald-200 text-emerald-700;
}

.option-wrong .option-letter {
  @apply bg-red-200 text-red-700;
}
</style>