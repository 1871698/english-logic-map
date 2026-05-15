export const storyEpisodes = [
  {
    id: 'forest-relative',
    title: '定语从句森林',
    summary: '拖拽逻辑钩子修复藤蔓，再一键脱水抽出主干。',
    accent: 'from-lavender/85 via-sky/70 to-emerald-200',
    levels: [
      {
        id: 'relative-bridge-1',
        sceneType: 'hook',
        title: '藤蔓桥修复',
        grammarTag: '定语从句',
        difficulty: '新手',
        scenePrompt: '帮助树屋点亮第一盏灯笼，让"人"的名词与 who 建立连接。',
        story: '小猫助手发现桥边藤蔓断开了，先找到真正的先行词，再把正确的钩子吸过去。',
        question: 'The boy who is wearing a green scarf is my brother.',
        stemWords: ['The boy', 'is', 'my brother'],
        modifierWords: ['who', 'is wearing', 'a green scarf'],
        nounAnchors: [
          { id: 'boy-anchor', label: 'boy', kind: 'person', clue: '会说话、会行动的人物名词' },
          { id: 'scarf-anchor', label: 'scarf', kind: 'thing', clue: '被穿戴的物品名词' }
        ],
        hookOptions: ['who', 'which'],
        correctHook: 'who',
        correctAnchorId: 'boy-anchor',
        scrollText: 'who 要紧跟"人"的先行词，修饰信息脱水后，主干就是 The boy is my brother.',
        reward: '金质捕梦网碎片',
        timeLimit: 90
      },
      {
        id: 'relative-bridge-2',
        sceneType: 'hook',
        title: '树冠导航',
        grammarTag: '定语从句',
        difficulty: '进阶',
        scenePrompt: '辨认"物"的先行词，给 which 找到正确基座。',
        story: '雾气挡住了树冠路线，你需要修复描述"物"的逻辑分支。',
        question: 'The camera which was on the desk belongs to Lily.',
        stemWords: ['The camera', 'belongs to', 'Lily'],
        modifierWords: ['which', 'was on', 'the desk'],
        nounAnchors: [
          { id: 'camera-anchor', label: 'camera', kind: 'thing', clue: '不会说话的物品名词' },
          { id: 'lily-anchor', label: 'Lily', kind: 'person', clue: '专有名词，表示人物' }
        ],
        hookOptions: ['who', 'which'],
        correctHook: 'which',
        correctAnchorId: 'camera-anchor',
        scrollText: 'which 修饰"物"。抽出主干后，核心信息是 The camera belongs to Lily.',
        reward: '逻辑指南针碎片',
        timeLimit: 75
      },
      {
        id: 'relative-bridge-3',
        sceneType: 'hook',
        title: '树屋总控台',
        grammarTag: '定语从句',
        difficulty: '挑战',
        scenePrompt: '连续修复灯笼链路，准备迎接后续多层嵌套句。',
        story: '总控台还被迷雾覆盖，完成前两关后才能进入更复杂的语法树。',
        question: 'The scientist who discovered the star wrote a book.',
        stemWords: ['The scientist', 'wrote', 'a book'],
        modifierWords: ['who', 'discovered', 'the star'],
        nounAnchors: [
          { id: 'scientist-anchor', label: 'scientist', kind: 'person', clue: '职业人物名词' },
          { id: 'star-anchor', label: 'star', kind: 'thing', clue: '天体或物体名词' }
        ],
        hookOptions: ['who', 'which'],
        correctHook: 'who',
        correctAnchorId: 'scientist-anchor',
        scrollText: '当你能稳定锁定先行词时，多层定语从句也会变得可拆可解。',
        reward: '套娃大师印记',
        timeLimit: 60
      }
    ]
  },
  {
    id: 'sentence-types-museum',
    title: '句子类型博物馆',
    summary: '系统学习陈述句、疑问句、感叹句、祈使句、倒装句等句型结构。',
    accent: 'from-amber-100 via-orange-50 to-rose-100',
    levels: [
      {
        id: 'sentence-types-overview',
        sceneType: 'sentence-type',
        title: '句子类型总览',
        grammarTag: '句子种类',
        difficulty: '入门',
        scenePrompt: '探索各种句子类型的特点和用法。',
        story: '欢迎来到句子类型博物馆！这里收藏了英语中各种句型，快来一一探索吧。',
        reward: '句型探索家徽章',
        timeLimit: 300
      }
    ]
  }
]