<script setup>
import { Compass, Leaf, Trophy } from 'lucide-vue-next'
import LabView from './components/LabView.vue'
import MapView from './components/MapView.vue'
import QuestionBankView from './components/QuestionBankView.vue'
import SentenceTypeView from './components/SentenceTypeView.vue'
import { useGameEngine } from './composables/useGameEngine'
import { grammarBankStats } from './data/levelFactory'

const {
  episodes,
  screen,
  session,
  activeLevel,
  medals,
  progressPercent,
  startLevel,
  backToMap,
  completeLevel
} = useGameEngine()
</script>

<template>
  <div class="min-h-screen bg-transparent text-slate-900">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/75 shadow-glow">
            <Leaf class="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p class="text-xs uppercase tracking-[0.32em] text-slate-500">Prototype</p>
            <h1 class="font-display text-xl font-bold text-bark sm:text-2xl">语法秘境探险</h1>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 text-sm">
          <div class="tag-pill bg-white/75 text-slate-700">
            <Compass class="h-4 w-4 text-sky-600" />
            已解锁 {{ session.unlockedIds.length }} 关
          </div>
          <div class="tag-pill bg-white/75 text-slate-700">
            <Leaf class="h-4 w-4 text-emerald-600" />
            题库 {{ grammarBankStats.usableQuestionCount }} 题
          </div>
          <div class="tag-pill bg-white/75 text-slate-700">
            <Trophy class="h-4 w-4 text-amber-500" />
            勋章 {{ medals.filter((item) => item.earned).length }} / {{ medals.length }}
          </div>
        </div>
      </header>

      <main>
        <MapView
          v-if="screen === 'map'"
          :episodes="episodes"
          :session="session"
          :progress-percent="progressPercent"
          :medals="medals"
          @start="startLevel"
        />

        <SentenceTypeView
          v-else-if="activeLevel.sceneType === 'sentence-type'"
          :level="activeLevel"
          @back="backToMap"
          @complete="completeLevel"
        />

        <LabView
          v-else-if="activeLevel.sceneType !== 'bank'"
          :level="activeLevel"
          @back="backToMap"
          @complete="completeLevel"
        />

        <QuestionBankView
          v-else
          :level="activeLevel"
          @back="backToMap"
          @complete="completeLevel"
        />
      </main>
    </div>
  </div>
</template>
