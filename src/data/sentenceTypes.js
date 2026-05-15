export const sentenceTypesData = {
  declarative: {
    id: "declarative",
    name: "陈述句",
    icon: "FileText",
    color: "slate",
    bgGradient: "from-slate-100 to-gray-100",
    definition: "陈述句用来陈述事实、表达观点或描述事物。句末用句号，朗读时用降调。陈述句是英语中最基本、最常见的句型。",
    structures: [
      {
        type: "肯定陈述句",
        pattern: "主语 + 谓语 + 其他成分",
        examples: [
          "I love English. 我爱英语。",
          "She is a teacher. 她是一名老师。",
          "They play basketball every day. 他们每天都打篮球。"
        ]
      },
      {
        type: "否定陈述句",
        pattern: "主语 + be动词/助动词/情态动词 + not + 其他成分",
        examples: [
          "I am not a student. 我不是学生。",
          "She doesn't like coffee. 她不喜欢咖啡。",
          "I cannot finish the work today. 我今天无法完成这项工作。"
        ]
      },
      {
        type: "复合句",
        pattern: "主句 + 从属连词 + 从句",
        examples: [
          "I know that he is right. 我知道他是正确的。",
          "If it rains tomorrow, we will stay home. 如果明天下雨，我们就待在家里。"
        ]
      }
    ],
    tips: "陈述句是最基本的句型，要注意主谓一致和时态的使用。"
  },

  exclamation: {
    id: "exclamation",
    name: "感叹句",
    icon: "Sparkles",
    color: "amber",
    bgGradient: "from-amber-100 to-orange-100",
    definition: "感叹句是用来表达喜、怒、哀、乐等强烈感情的句子，句末用感叹号，读降调。感叹句往往由what或how引导，what修饰名词，how修饰形容词、副词或动词。",
    structures: [
      {
        type: "What引导",
        pattern: "What + a/an + 形容词 + 可数名词单数 + (主语 + 谓语)!",
        examples: [
          "What a beautiful city! 多么美丽的一座城市啊！",
          "What an interesting book it is! 多么有趣的一本书啊！"
        ]
      },
      {
        type: "What引导",
        pattern: "What + 形容词 + 可数名词复数 + (主语 + 谓语)!",
        examples: [
          "What beautiful pictures they are! 多么美丽的图画啊！"
        ]
      },
      {
        type: "What引导",
        pattern: "What + 形容词 + 不可数名词 + (主语 + 谓语)!",
        examples: [
          "What terrible weather it is! 天气多么糟糕啊！",
          "What nice music it is! 多么美妙的音乐啊！"
        ]
      },
      {
        type: "How引导",
        pattern: "How + 形容词/副词 + (主语 + 谓语)!",
        examples: [
          "How fine the weather is! 多么好的天气啊！",
          "How well he plays the violin! 他拉小提琴拉得多好啊！",
          "How cold it is! 天气多么冷啊！"
        ]
      }
    ],
    tips: "what引导的感叹句和how引导的感叹句可以互换，但只适用于含有形容词的句子。如：What a good student he is! = How good a student he is!"
  },

  inversion: {
    id: "inversion",
    name: "倒装句",
    icon: "ArrowUpDown",
    color: "sky",
    bgGradient: "from-sky-100 to-blue-100",
    definition: "通常英语句子的自然语序是主语在谓语之前，但有时由于句子结构的需要或表示强调，就要采用倒装形式，即把谓语动词放于主语之前。将谓语动词全部移到主语之前称全部倒装；只将助动词或情态动词置于主语之前称部分倒装。初中阶段主要以考察部分倒装为主。",
    structures: [
      {
        type: "So + 助动词/情态动词/be动词 + 主语",
        pattern: '表示肯定，意为"某某也是如此"',
        examples: [
          "Tom has ever been to China. 汤姆去过中国。",
          "So has Mike. 迈克也去过。"
        ]
      },
      {
        type: "Neither + 助动词/情态动词/be动词 + 主语",
        pattern: '表示否定，意为"某某也不……"',
        examples: [
          "Tom doesn't like bananas. 汤姆不喜欢香蕉。",
          "Neither do I. 我也不喜欢。"
        ]
      },
      {
        type: "So + 主语 + 助动词/情态动词/be动词",
        pattern: '表示肯定，意为"某某的确如此"',
        examples: [
          "He passed the exam. 他通过了考试。",
          "So he did. 的确如此。"
        ]
      },
      {
        type: "Neither + 主语 + 助动词/情态动词/be动词",
        pattern: '表示否定，意为"某某的确如此"',
        examples: [
          "It isn't sunny. 天气不是晴朗的。",
          "Neither it is. 的确如此。"
        ]
      }
    ],
    tips: "初中阶段主要以考察部分倒装为主。部分倒装只将助动词或情态动词置于主语之前。"
  },

  imperative: {
    id: "imperative",
    name: "祈使句",
    icon: "Volume2",
    color: "emerald",
    bgGradient: "from-emerald-100 to-teal-100",
    definition: "祈使句表示命令、请求、建议或劝告等。主语通常被省略，谓语动词用原形，句末用感叹号或句号。",
    structures: [
      {
        type: "肯定形式",
        pattern: "动词原形 + 其他成分",
        examples: [
          "Give them more personal space. 给他们更多私人空间。",
          "Be quiet, please! 请安静！"
        ]
      },
      {
        type: "Let型",
        pattern: "Let sb. + 动词原形",
        examples: [
          "Let's go to school! 让我们一起去学校吧！"
        ]
      },
      {
        type: "否定形式 - Don't",
        pattern: "Don't + 动词原形 + 其他成分",
        examples: [
          "Don't stand too close to North Americans. 不要站得离北美人太近。"
        ]
      },
      {
        type: "否定形式 - Let's not",
        pattern: "Let's/Let sb. + not + 动词原形",
        examples: [
          "Let's not make noise here. 我们不要在这里制造噪音。"
        ]
      },
      {
        type: "否定形式 - No",
        pattern: "No + 名词/v-ing",
        examples: [
          "No smoking! 禁止吸烟！",
          "No photos! 禁止拍照！"
        ]
      },
      {
        type: "否定形式 - Never",
        pattern: "Never + 动词原形",
        examples: [
          "Never be late for school! 上学绝对不要迟到！"
        ]
      }
    ],
    tips: "祈使句的回答用一般将来时（Yes, I will. / No, I won't.）。祈使句 + and/or + 句子，可以转换成if引导的条件状语从句。如：Hurry up, or you'll be late = If you don't hurry up, you'll be late."
  },

  thereBe: {
    id: "there-be",
    name: "There Be 句型",
    icon: "MapPin",
    color: "violet",
    bgGradient: "from-violet-100 to-purple-100",
    definition: '"There be + 主语(人或物) + 地点"，表示"在某地有某物"。be动词的单复数形式必须和之后的第一个主语保持一致（就近原则）。',
    structures: [
      {
        type: "基本结构",
        pattern: "There is/are + 主语 + 地点",
        examples: [
          "There is a book on the desk. 桌上有一本书。",
          "There are some flowers in the garden. 花园里有一些花。"
        ]
      },
      {
        type: "否定句",
        pattern: "There be + not + 主语 + 地点",
        examples: [
          "There isn't any water in the bottle. 瓶子里没有水。"
        ]
      },
      {
        type: "一般疑问句",
        pattern: "Be + there + 主语 + 地点?",
        examples: [
          "Is there a hospital near here? 附近有医院吗？",
          "Yes, there is. / No, there isn't."
        ]
      },
      {
        type: "时态变化",
        pattern: "不同时态的be形式",
        examples: [
          "There was a concert yesterday. 昨天有一场音乐会。",
          "There will be a meeting tomorrow. 明天有一个会议。",
          "There have been many changes. 已经有很多变化了。"
        ]
      }
    ],
    tips: "就近原则：如果第一个主语是可数名词单数或不可数名词，be动词用单数；如果第一个主语是可数名词复数，be动词用复数。例如：There is a table and two chairs. / There are two chairs and a table."
  },

  generalQuestion: {
    id: "general-question",
    name: "一般疑问句",
    icon: "HelpCircle",
    color: "rose",
    bgGradient: "from-rose-100 to-pink-100",
    definition: "一般疑问句用Yes或No回答，句末用问号，朗读时用升调。",
    structures: [
      {
        type: "be动词开头",
        pattern: "Be动词 + 主语 + ...?",
        examples: [
          "Are you a student? 你是学生吗？",
          "Is she at home? 她在家吗？"
        ]
      },
      {
        type: "助动词开头",
        pattern: "助动词 + 主语 + 动词原形/be动词 + ...?",
        examples: [
          "Do you like English? 你喜欢英语吗？",
          "Does he play basketball? 他打篮球吗？",
          "Have you finished your homework? 你完成作业了吗？"
        ]
      },
      {
        type: "情态动词开头",
        pattern: "情态动词 + 主语 + 动词原形 + ...?",
        examples: [
          "Can you speak English? 你会说英语吗？",
          "Should I go now? 我应该现在走吗？"
        ]
      }
    ],
    tips: "回答时不能用Yes, I think. 或 No, I don't think. 等方式，要直接回答。"
  },

  specialQuestion: {
    id: "special-question",
    name: "特殊疑问句",
    icon: "Search",
    color: "indigo",
    bgGradient: "from-indigo-100 to-blue-100",
    definition: "特殊疑问句以疑问词开头，对句子某一部分进行提问，不能用Yes或No回答。",
    structures: [
      {
        type: "Who 谁",
        pattern: "询问人",
        examples: [
          "Who gave you the gift? 谁给你的礼物？"
        ]
      },
      {
        type: "What 什么",
        pattern: "询问事物",
        examples: [
          "What is this? 这是什么？",
          "What did you say? 你说什么？"
        ]
      },
      {
        type: "When 何时",
        pattern: "询问时间",
        examples: [
          "When will the meeting start? 会议什么时候开始？"
        ]
      },
      {
        type: "Where 何地",
        pattern: "询问地点",
        examples: [
          "Where do you live? 你住在哪里？"
        ]
      },
      {
        type: "Why 为什么",
        pattern: "询问原因",
        examples: [
          "Why are you late? 你为什么迟到？"
        ]
      },
      {
        type: "How 如何",
        pattern: "询问方式/状态",
        examples: [
          "How do you go to school? 你怎么去学校？",
          "How are you? 你好吗？"
        ]
      },
      {
        type: "How many 多少",
        pattern: "提问数量（可数名词）",
        examples: [
          "How many students are there in your class? 你们班有多少学生？"
        ]
      },
      {
        type: "How much 多少/多少钱",
        pattern: "提问数量（不可数名词）/价格",
        examples: [
          "How much water is there in the bottle? 瓶子里有多少水？",
          "How much is this book? 这本书多少钱？"
        ]
      },
      {
        type: "How long 多久",
        pattern: "提问持续时间/长度",
        examples: [
          "How long have you been here? 你在这里多久了？"
        ]
      },
      {
        type: "How often 多久一次",
        pattern: "提问频率",
        examples: [
          "How often do you exercise? 你多久锻炼一次？"
        ]
      },
      {
        type: "How far 多远",
        pattern: "提问距离",
        examples: [
          "How far is it from your home to school? 从你家到学校多远？"
        ]
      },
      {
        type: "How soon 多久以后",
        pattern: "提问时间点多远",
        examples: [
          "How soon will the train arrive? 火车多久后会到达？"
        ]
      }
    ],
    tips: "疑问词放在句首，后接一般疑问句语序。"
  },

  choiceQuestion: {
    id: "choice-question",
    name: "选择疑问句",
    icon: "GitBranch",
    color: "cyan",
    bgGradient: "from-cyan-100 to-sky-100",
    definition: "选择疑问句提供两个或多个选项供选择，结构为：一般疑问句 + or + 被选择的部分？",
    structures: [
      {
        type: "一般选择疑问句",
        pattern: "一般疑问句 + or + 被选择的部分?",
        examples: [
          "Do you like traditional Western music or pop music? 你喜欢传统西方音乐还是流行音乐？",
          "Well, I like both. 哦，两个我都喜欢。"
        ]
      },
      {
        type: "特殊选择疑问句",
        pattern: "特殊疑问句，A or B?",
        examples: [
          "Which do you prefer, coffee or tea? 咖啡和茶，你更喜欢哪一个？",
          "Tea. 茶。"
        ]
      }
    ],
    tips: "选择疑问句不能直接用Yes或No回答，需要从选项中选择一个回答。"
  },

  tagQuestion: {
    id: "tag-question",
    name: "反意疑问句",
    icon: "MessageCircle",
    color: "fuchsia",
    bgGradient: "from-fuchsia-100 to-pink-100",
    definition: "反意疑问句由陈述句 + 简短附加疑问句构成，询问对方意见或确认某事。",
    structures: [
      {
        type: "肯定的陈述句 + 否定的附加疑问",
        pattern: "..., don't you? / aren't they? 等",
        examples: [
          "You know him, don't you? 你认识他，对吗？",
          "She is a teacher, isn't she? 她是老师，对吗？"
        ]
      },
      {
        type: "否定的陈述句 + 肯定的附加疑问",
        pattern: "..., do you? / are they? 等",
        examples: [
          "You don't like it, do you? 你不喜欢它，对吗？",
          "He can't swim, can he? 他不会游泳，对吗？"
        ]
      },
      {
        type: "特殊动词后的反意疑问",
        pattern: "根据陈述句中的动词确定附加疑问",
        examples: [
          "Few of them can understand, can they? 他们中很少有人能理解，对吗？",
          "Little money remains, does it? 很少的钱留下了，是吗？"
        ]
      }
    ],
    tips: "回答时根据事实回答，而不是根据问句形式。事实为肯定时用Yes，事实为否定时用No。例如：You don't smoke, do you? - No, I don't. (事实是不抽烟)"
  }
}

export const sentenceTypeCategories = [
  {
    id: 'declarative',
    name: '陈述句',
    icon: 'FileText',
    description: '陈述事实或观点'
  },
  {
    id: 'question',
    name: '疑问句',
    icon: 'HelpCircle',
    description: '提出问题',
    children: ['一般疑问句', '特殊疑问句', '选择疑问句', '反意疑问句']
  },
  {
    id: 'exclamation',
    name: '感叹句',
    icon: 'Sparkles',
    description: '表达强烈情感'
  },
  {
    id: 'imperative',
    name: '祈使句',
    icon: 'Volume2',
    description: '发出命令或请求'
  },
  {
    id: 'inversion',
    name: '倒装句',
    icon: 'ArrowUpDown',
    description: '强调或语法需要的倒装'
  },
  {
    id: 'there-be',
    name: 'There Be句型',
    icon: 'MapPin',
    description: '表示某地存在某物'
  }
]