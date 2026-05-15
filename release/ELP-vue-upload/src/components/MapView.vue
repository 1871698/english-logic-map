<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { Award, Lock, Map, Sparkles, Stars, Timer } from 'lucide-vue-next'

const props = defineProps({
  episodes: {
    type: Array,
    required: true
  },
  session: {
    type: Object,
    required: true
  },
  progressPercent: {
    type: Number,
    required: true
  },
  medals: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['start'])

function isUnlocked(levelId) {
  return props.session.unlockedIds.includes(levelId)
}

function isCompleted(levelId) {
  return props.session.completedIds.includes(levelId)
}

onMounted(() => {
  gsap.from('.map-node', {
    opacity: 0,
    y: 28,
    duration: 0.7,
    ease: 'back.out(1.5)',
    stagger: 0.12
  })

  gsap.to('.map-node__badge', {
    y: -6,
    duration: 1.9,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.1
  })
})
</script>

<template>
  <section class="space-y-6">
    <div class="grid gap-4 lg:grid-cols-[1.4fr,0.8fr]">
      <div class="panel overflow-hidden">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-3">
            <span class="tag-pill bg-white/70 text-forest-900">
              <Map class="h-4 w-4" />
              语法秘境地图
            </span>
            <div>
              <h1 class="font-display text-3xl font-bold text-bark sm:text-4xl">
                English Logic Map
              </h1>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">
                用森林探险的方式拆解长句逻辑。先修复藤蔓，再把修饰成分温柔“脱水”，让句子主干自己发光。
              </p>
            </div>
          </div>
          <div class="hidden rounded-[1.75rem] bg-white/60 px-4 py-3 shadow-glow sm:block">
            <p class="text-xs uppercase tracking-[0.28em] text-slate-500">即时语法扫描器</p>
            <p class="mt-2 text-sm text-slate-700">后续可接入拍照识句或题库搜索入口</p>
          </div>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-3">
          <div class="stat-card">
            <Timer class="h-4 w-4 text-sky-600" />
            <div>
              <p class="stat-label">已点亮进度</p>
              <p class="stat-value">{{ progressPercent }}%</p>
            </div>
          </div>
          <div class="stat-card">
            <Stars class="h-4 w-4 text-lavender-700" />
            <div>
              <p class="stat-label">星辉值</p>
              <p class="stat-value">{{ session.totalStars }}</p>
            </div>
          </div>
          <div class="stat-card">
            <Award class="h-4 w-4 text-emerald-600" />
            <div>
              <p class="stat-label">勋章碎片</p>
              <p class="stat-value">{{ session.medalShelf.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <aside class="panel">
        <div class="flex items-center gap-2">
          <Sparkles class="h-4 w-4 text-amber-500" />
          <h2 class="font-display text-lg font-semibold text-bark">勋章陈列馆</h2>
        </div>
        <div class="mt-4 grid gap-3">
          <div
            v-for="medal in medals"
            :key="medal.id"
            class="rounded-3xl border border-white/60 px-4 py-3 transition"
            :class="medal.earned ? 'bg-emerald-50' : 'bg-slate-100/80 opacity-70'"
          >
            <p class="text-sm font-semibold text-slate-800">{{ medal.name }}</p>
            <p class="mt-1 text-xs text-slate-600">
              {{ medal.earned ? '已收入背包，地图迷雾进一步消散。' : '继续前进，这枚勋章会在后面等你。' }}
            </p>
          </div>
        </div>
      </aside>
    </div>

    <div
      v-for="(episode, episodeIndex) in episodes"
      :key="episode.id"
      class="panel relative overflow-hidden"
    >
      <div
        class="absolute inset-x-6 top-16 hidden h-px border-t border-dashed border-slate-300/80 lg:block"
      />
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.32em] text-slate-500">
            Chapter {{ String(episodeIndex + 1).padStart(2, '0') }}
          </p>
          <h2 class="mt-1 font-display text-2xl font-bold text-bark">{{ episode.title }}</h2>
          <p class="mt-2 max-w-2xl text-sm text-slate-600">{{ episode.summary }}</p>
        </div>
        <div class="tag-pill bg-emerald-100 text-emerald-800">
          <Sparkles class="h-4 w-4" />
          {{ episode.id === 'grammar-bank-camp' ? '清洗后真实题库' : '横向卷轴原型' }}
        </div>
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-3">
        <article
          v-for="(level, index) in episode.levels"
          :key="level.id"
          class="map-node relative rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-glow backdrop-blur"
          :class="isUnlocked(level.id) ? '' : 'fog-mask'"
        >
          <div
            class="map-node__badge absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
            :class="isCompleted(level.id) ? 'bg-emerald-200 text-emerald-900' : 'bg-lavender/90 text-white'"
          >
            {{ isCompleted(level.id) ? '已修复' : `关卡 ${index + 1}` }}
          </div>

          <div class="pt-5">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ level.grammarTag }}</p>
                <h3 class="mt-2 font-display text-xl font-semibold text-bark">{{ level.title }}</h3>
              </div>
              <Lock v-if="!isUnlocked(level.id)" class="h-5 w-5 text-slate-400" />
            </div>

            <p class="mt-3 text-sm leading-6 text-slate-700">{{ level.scenePrompt }}</p>

            <div class="mt-4 flex flex-wrap gap-2 text-xs">
              <span class="tag-pill bg-sky-100 text-sky-800">{{ level.difficulty }}</span>
              <span class="tag-pill bg-lavender-100 text-lavender-800">{{ level.reward }}</span>
            </div>

            <button
              class="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
              :class="
                isUnlocked(level.id)
                  ? 'bg-bark text-white hover:-translate-y-0.5'
                  : 'cursor-not-allowed bg-slate-200 text-slate-500'
              "
              :disabled="!isUnlocked(level.id)"
              @click="emit('start', level.id)"
            >
              <Map class="h-4 w-4" />
              {{ isCompleted(level.id) ? '再次进入' : '开始探险' }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
