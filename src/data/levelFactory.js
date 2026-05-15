import grammarBank from './grammarBank.json'
import { storyEpisodes } from './storyLevels'

function buildBankLevels() {
  return grammarBank.categories.map((category, index) => ({
    id: `${category.id}-${index + 1}`,
    sceneType: 'bank',
    title: category.name,
    grammarTag: '题库营地',
    difficulty: `${category.questionCount} 题`,
    scenePrompt: `已清洗 ${category.questionCount} 道可练习题，支持选择题与填空题。`,
    story: `从 ${category.name} 营地取出卷轴，完成 3 题即可点亮新的路径。`,
    reward: `${category.name}徽记`,
    completionGoal: 3,
    questionBank: category
  }))
}

export const levelEpisodes = [
  ...storyEpisodes,
  {
    id: 'grammar-bank-camp',
    title: '题库营地',
    summary: `接入 ${grammarBank.stats.usableQuestionCount} 道清洗后的题目，按语法主题拆成 ${grammarBank.stats.usableCategoryCount} 个练习营地。`,
    accent: 'from-sky/85 via-white/70 to-emerald-100',
    levels: buildBankLevels()
  }
]

export const grammarBankStats = grammarBank.stats
