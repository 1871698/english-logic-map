import { computed, reactive, ref } from 'vue'
import { levelEpisodes } from '../data/levelFactory'

function flattenLevels(episodes) {
  return episodes.flatMap((episode) =>
    episode.levels.map((level, index) => ({
      ...level,
      episodeId: episode.id,
      episodeTitle: episode.title,
      index
    }))
  )
}

export function useGameEngine() {
  const episodes = ref(levelEpisodes)
  const initiallyUnlockedIds = episodes.value.flatMap((episode) =>
    episode.id === 'grammar-bank-camp'
      ? episode.levels.map((level) => level.id)
      : episode.levels.slice(0, 1).map((level) => level.id)
  )
  const screen = ref('map')
  const session = reactive({
    activeLevelId: episodes.value[0].levels[0].id,
    completedIds: [],
    unlockedIds: initiallyUnlockedIds,
    totalStars: 0,
    medalShelf: []
  })

  const allLevels = computed(() => flattenLevels(episodes.value))
  const activeLevel = computed(() =>
    allLevels.value.find((level) => level.id === session.activeLevelId) ?? allLevels.value[0]
  )

  const progressPercent = computed(() => {
    if (!allLevels.value.length) return 0
    return Math.round((session.completedIds.length / allLevels.value.length) * 100)
  })

  const medals = computed(() => [
    {
      id: 'dreamcatcher',
      name: '金质捕梦网',
      earned: session.completedIds.includes('relative-bridge-1')
    },
    {
      id: 'compass',
      name: '逻辑指南针',
      earned: session.completedIds.includes('relative-bridge-2')
    },
    {
      id: 'matryoshka',
      name: '套娃大师',
      earned: session.completedIds.includes('relative-bridge-3')
    }
  ])

  function startLevel(levelId) {
    session.activeLevelId = levelId
    screen.value = 'lab'
  }

  function backToMap() {
    screen.value = 'map'
  }

  function completeLevel(payload) {
    const { levelId, stars = 1 } = payload
    if (!session.completedIds.includes(levelId)) {
      session.completedIds.push(levelId)
      session.totalStars += stars
    }

    const currentIndex = allLevels.value.findIndex((level) => level.id === levelId)
    const nextLevel = allLevels.value[currentIndex + 1]
    if (nextLevel && !session.unlockedIds.includes(nextLevel.id)) {
      session.unlockedIds.push(nextLevel.id)
    }

    const reward = allLevels.value.find((level) => level.id === levelId)?.reward
    if (reward && !session.medalShelf.includes(reward)) {
      session.medalShelf.push(reward)
    }
  }

  return {
    episodes,
    screen,
    session,
    activeLevel,
    medals,
    progressPercent,
    startLevel,
    backToMap,
    completeLevel
  }
}
