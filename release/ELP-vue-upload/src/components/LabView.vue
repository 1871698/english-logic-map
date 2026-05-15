<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import Sortable from 'sortablejs'
import confetti from 'canvas-confetti'
import { gsap } from 'gsap'
import { ArrowLeft, Lightbulb, Move3D, Sparkles, Timer, WandSparkles } from 'lucide-vue-next'
import { shuffle } from 'lodash-es'
import { playCue } from '../lib/soundscape'

const props = defineProps({
  level: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'complete'])

const countdown = ref(0)
const stage = ref('idle')
const feedback = ref('')
const selectedHook = ref('')
const selectedAnchorId = ref('')
const dehydrationReady = ref(false)
const completionSent = ref(false)
const sceneRef = ref(null)
const stemBoardRef = ref(null)
const anchorRefs = ref({})
const hookDeck = ref([])
let sortableInstance

function setAnchorRef(id, element) {
  if (!element) return
  anchorRefs.value[id] = element
}

const incorrectAnchors = computed(() =>
  props.level.nounAnchors.filter((anchor) => anchor.id !== props.level.correctAnchorId)
)

function resetScene() {
  countdown.value = props.level.timeLimit
  stage.value = 'idle'
  feedback.value = props.level.story
  selectedHook.value = ''
  selectedAnchorId.value = ''
  dehydrationReady.value = false
  completionSent.value = false
  hookDeck.value = shuffle([...props.level.hookOptions])
  resume()

  nextTick(() => {
    gsap.fromTo(
      '.forest-chip',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
    )
  })
}

const { pause, resume } = useIntervalFn(() => {
  if (countdown.value <= 0) {
    pause()
    stage.value = 'timeout'
    feedback.value = '雾气重新聚拢了，先返回地图再试一次会更稳。'
    return
  }

  countdown.value -= 1
}, 1000, { immediate: false })

function onDragStart(hook, event) {
  selectedHook.value = hook
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', hook)
}

function onDrop(anchor) {
  if (stage.value === 'linked' || stage.value === 'completed') return

  const droppedHook = selectedHook.value
  const anchorElement = anchorRefs.value[anchor.id]

  if (droppedHook === props.level.correctHook && anchor.id === props.level.correctAnchorId) {
    stage.value = 'linked'
    selectedAnchorId.value = anchor.id
    dehydrationReady.value = true
    feedback.value = `连接成功：${props.level.correctHook} 已吸附到 ${anchor.label}，现在可以提取句子主干。`
    playCue('chime')

    if (anchorElement) {
      gsap.fromTo(
        anchorElement,
        { scale: 0.96, y: 0 },
        { scale: 1.06, y: -8, duration: 0.35, yoyo: true, repeat: 1, ease: 'back.out(2)' }
      )
    }

    gsap.to('.lantern-glow', {
      opacity: 1,
      scale: 1.08,
      duration: 0.4,
      ease: 'power2.out'
    })
  } else {
    stage.value = 'repelled'
    feedback.value = `${droppedHook || '这个钩子'} 和 ${anchor.label} 不匹配，再观察一下它是“人”还是“物”。`
    playCue('breeze')

    if (anchorElement) {
      gsap.fromTo(
        anchorElement,
        { x: -4 },
        { x: 4, duration: 0.08, repeat: 5, yoyo: true, ease: 'power1.inOut' }
      )
    }
  }
}

function dehydrateSentence() {
  if (!dehydrationReady.value || stage.value === 'completed') return

  stage.value = 'dehydrated'
  feedback.value = props.level.scrollText
  playCue('success')

  const modifiers = sceneRef.value?.querySelectorAll('.modifier-chip') ?? []
  const stem = sceneRef.value?.querySelectorAll('.stem-chip') ?? []

  const timeline = gsap.timeline({
    onComplete: () => {
      finishLevel()
    }
  })

  timeline
    .to(modifiers, {
      opacity: 0.18,
      scale: 0.72,
      y: -14,
      duration: 0.35,
      stagger: 0.05,
      ease: 'power2.inOut'
    })
    .to(
      stem,
      {
        scale: 1.08,
        y: -6,
        backgroundColor: 'rgba(100, 181, 246, 0.2)',
        duration: 0.35,
        stagger: 0.04,
        ease: 'back.out(1.6)'
      },
      '-=0.05'
    )
}

function finishLevel() {
  if (completionSent.value) return

  stage.value = 'completed'
  completionSent.value = true
  pause()
  emit('complete', {
    levelId: props.level.id,
    stars: countdown.value >= 50 ? 3 : countdown.value >= 20 ? 2 : 1
  })

  confetti({
    particleCount: 120,
    spread: 75,
    origin: { y: 0.6 },
    colors: ['#B39DDB', '#64B5F6', '#81C784', '#F9D675']
  })
}

function initSortable() {
  if (!stemBoardRef.value) return
  sortableInstance?.destroy()
  sortableInstance = Sortable.create(stemBoardRef.value, {
    animation: 180,
    ghostClass: 'chip-ghost'
  })
}

watch(
  () => props.level.id,
  async () => {
    resetScene()
    await nextTick()
    initSortable()
  },
  { immediate: true }
)

onMounted(async () => {
  await nextTick()
  initSortable()
})

onBeforeUnmount(() => {
  pause()
  sortableInstance?.destroy()
})
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <button class="ghost-button" @click="emit('back')">
        <ArrowLeft class="h-4 w-4" />
        返回地图
      </button>
      <div class="tag-pill bg-white/75 text-slate-700">
        <Timer class="h-4 w-4 text-sky-600" />
        剩余 {{ countdown }}s
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
            {{ level.reward }}
          </div>
        </div>

        <div
          ref="sceneRef"
          class="mt-6 overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(219,234,254,0.88))] p-5"
        >
          <div class="forest-scene">
            <div class="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(179,157,219,0.28),transparent_70%)]" />
            <div class="absolute bottom-0 left-0 right-0 h-28 rounded-t-[50%] bg-emerald-200/70 blur-xl" />

            <div class="relative z-10 flex flex-wrap gap-3">
              <span class="tag-pill bg-emerald-100 text-emerald-800">
                <Move3D class="h-4 w-4" />
                物理钩子
              </span>
              <span class="tag-pill bg-sky-100 text-sky-800">
                <WandSparkles class="h-4 w-4" />
                一键脱水
              </span>
            </div>

            <div class="relative z-10 mt-6 flex flex-wrap gap-3">
              <span
                v-for="word in level.stemWords"
                :key="word"
                class="forest-chip stem-chip bg-sky-100/90 text-sky-900"
              >
                {{ word }}
              </span>
              <span
                v-for="word in level.modifierWords"
                :key="word"
                class="forest-chip modifier-chip bg-lavender-100/90 text-lavender-900"
              >
                {{ word }}
              </span>
            </div>

            <div class="relative z-10 mt-8 grid gap-4 md:grid-cols-2">
              <div
                v-for="anchor in level.nounAnchors"
                :key="anchor.id"
                :ref="(element) => setAnchorRef(anchor.id, element)"
                class="anchor-card"
                :class="
                  selectedAnchorId === anchor.id
                    ? 'ring-2 ring-emerald-400 bg-emerald-50'
                    : incorrectAnchors.some((item) => item.id === anchor.id) && stage === 'repelled'
                      ? 'ring-2 ring-rose-300'
                      : ''
                "
                @dragover.prevent
                @drop.prevent="onDrop(anchor)"
              >
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">
                  {{ anchor.kind === 'person' ? '人物先行词' : '物体先行词' }}
                </p>
                <p class="mt-3 font-display text-2xl font-semibold text-bark">{{ anchor.label }}</p>
                <p class="mt-2 text-sm leading-6 text-slate-600">{{ anchor.clue }}</p>
              </div>
            </div>

            <div class="relative z-10 mt-8 flex items-center gap-3">
              <div class="lantern-shell">
                <div class="lantern-glow" />
              </div>
              <div>
                <p class="text-sm font-semibold text-bark">逻辑灯笼</p>
                <p class="text-xs text-slate-600">
                  {{ stage === 'linked' || stage === 'completed' ? '灯笼已点亮，逻辑通路畅通。' : '修复正确连接后会亮起。' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap gap-3">
          <button
            v-for="hook in hookDeck"
            :key="hook"
            class="hook-button"
            draggable="true"
            @dragstart="onDragStart(hook, $event)"
          >
            {{ hook }}
          </button>

          <button
            class="action-button"
            :disabled="!dehydrationReady"
            @click="dehydrateSentence"
          >
            提取主干
          </button>
        </div>
      </div>

      <aside class="space-y-5">
        <div class="panel">
          <div class="flex items-center gap-2">
            <Lightbulb class="h-4 w-4 text-amber-500" />
            <h2 class="font-display text-lg font-semibold text-bark">卷轴解释</h2>
          </div>
          <p class="mt-4 rounded-[1.5rem] bg-amber-50 px-4 py-4 text-sm leading-7 text-slate-700">
            {{ feedback }}
          </p>
        </div>

        <div class="panel">
          <h2 class="font-display text-lg font-semibold text-bark">主干工作台</h2>
          <p class="mt-2 text-sm text-slate-600">抽出主干后，可以继续拖拽排序，帮助学生稳住句子骨架。</p>
          <div
            ref="stemBoardRef"
            class="mt-5 flex min-h-28 flex-wrap gap-3 rounded-[1.75rem] bg-sky-50 p-4"
          >
            <span
              v-for="word in level.stemWords"
              :key="`stem-${word}`"
              class="forest-chip cursor-grab bg-white text-slate-800 shadow-sm"
            >
              {{ word }}
            </span>
          </div>
        </div>

        <div class="panel">
          <h2 class="font-display text-lg font-semibold text-bark">当前句子</h2>
          <p class="mt-3 text-sm leading-7 text-slate-700">{{ level.question }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>
