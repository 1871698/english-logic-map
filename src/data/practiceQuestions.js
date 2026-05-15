export const practiceQuestions = {
  exclamation: [
    {
      id: "exclamation_1",
      type: "感叹句",
      question: "____ beautiful flower it is!",
      options: ["What a", "What an", "How a", "How"],
      answer: "What a",
      explanation: "what引导的感叹句修饰可数名词单数，需要加不定冠词a/an"
    },
    {
      id: "exclamation_2",
      type: "感叹句",
      question: "____ hard-working students they are!",
      options: ["What", "What a", "How", "How a"],
      answer: "What",
      explanation: "what引导的感叹句修饰可数名词复数，不用加冠词"
    },
    {
      id: "exclamation_3",
      type: "感叹句",
      question: "____ cold it is today!",
      options: ["What a", "What", "How a", "A"],
      answer: "How",
      explanation: "how引导的感叹句修饰形容词，结构为How + 形容词 + 主语 + 谓语"
    },
    {
      id: "exclamation_4",
      type: "感叹句",
      question: "____ interesting the story is!",
      options: ["What a", "What an", "How", "What"],
      answer: "How",
      explanation: "how引导的感叹句修饰形容词"
    },
    {
      id: "exclamation_5",
      type: "感叹句",
      question: "____ good weather it is!",
      options: ["What a", "What", "How a", "How"],
      answer: "What",
      explanation: "what引导的感叹句修饰不可数名词，不用加冠词"
    }
  ],

  inversion: [
    {
      id: "inversion_1",
      type: "倒装句",
      question: "Tom has ever been to Beijing. ____ has Mike.",
      options: ["So", "Neither", "Also", "Either"],
      answer: "So",
      explanation: "表示某某也如此用So + 助动词 + 主语"
    },
    {
      id: "inversion_2",
      type: "倒装句",
      question: "Tom doesn't like coffee. ____ do I.",
      options: ["So", "Neither", "Also", "Too"],
      answer: "Neither",
      explanation: "表示某某也不用Neither/Nor + 助动词 + 主语"
    },
    {
      id: "inversion_3",
      type: "倒装句",
      question: "He passed the exam. ____ he did.",
      options: ["So", "Neither", "Either", "Neither"],
      answer: "So",
      explanation: "表示强调某某的确如此用So + 主语 + 助动词"
    },
    {
      id: "inversion_4",
      type: "倒装句",
      question: "She never goes there. ____ does he.",
      options: ["So", "Neither", "Too", "Either"],
      answer: "Neither",
      explanation: "表示否定转移时用Neither/Nor + 助动词 + 主语"
    },
    {
      id: "inversion_5",
      type: "倒装句",
      question: "I am a student. ____ am I.",
      options: ["So", "Neither", "Both", "Either"],
      answer: "Neither",
      explanation: "表示某某也不用Neither + 助动词/be动词 + 主语"
    }
  ],

  imperative: [
    {
      id: "imperative_1",
      type: "祈使句",
      question: "____ not make noise in the classroom.",
      options: ["Don't", "Not", "Do", "Let's"],
      answer: "Don't",
      explanation: "祈使句的否定形式用Don't + 动词原形"
    },
    {
      id: "imperative_2",
      type: "祈使句",
      question: "____ go to school together!",
      options: ["Let us", "Let's", "Let we", "Let's us"],
      answer: "Let's",
      explanation: "Let's等于Let us，表示让我们"
    },
    {
      id: "imperative_3",
      type: "祈使句",
      question: "____ be late for school!",
      options: ["Don't", "Not", "Never", "Both A and C"],
      answer: "Both A and C",
      explanation: "祈使句的否定还可用Never或Don't"
    },
    {
      id: "imperative_4",
      type: "祈使句",
      question: "____ smoking here!",
      options: ["Not", "No", "Don't", "Won't"],
      answer: "No",
      explanation: "No + 名词/v-ing 表示禁止"
    },
    {
      id: "imperative_5",
      type: "祈使句",
      question: "____ careful when you cross the street.",
      options: ["Be", "Are", "Is", "Being"],
      answer: "Be",
      explanation: "祈使句用动词原形，be动词直接用原形"
    }
  ],

  thereBe: [
    {
      id: "therebe_1",
      type: "There Be句型",
      question: "There ____ a book and two pens on the desk.",
      options: ["is", "are", "has", "have"],
      answer: "is",
      explanation: "就近原则：第一个主语是单数book，用is"
    },
    {
      id: "therebe_2",
      type: "There Be句型",
      question: "There ____ many students in the classroom.",
      options: ["is", "are", "has", "have"],
      answer: "are",
      explanation: "students是复数名词，用are"
    },
    {
      id: "therebe_3",
      type: "There Be句型",
      question: "There ____ some water in the bottle.",
      options: ["is", "are", "has", "have"],
      answer: "is",
      explanation: "water是不可数名词，用is"
    },
    {
      id: "therebe_4",
      type: "There Be句型",
      question: "____ there any apples in the basket?",
      options: ["Is", "Are", "Has", "Have"],
      answer: "Are",
      explanation: "一般疑问句中be动词放在there前面，apples是复数用are"
    },
    {
      id: "therebe_5",
      type: "There Be句型",
      question: "There ____ a concert in the park tomorrow.",
      options: ["will be", "will have", "is going to have", "are going to be"],
      answer: "will be",
      explanation: "There be句型的将来时用There will be或There is going to be"
    }
  ],

  generalQuestion: [
    {
      id: "general_1",
      type: "一般疑问句",
      question: "____ you like English?",
      options: ["Do", "Does", "Is", "Are"],
      answer: "Do",
      explanation: "一般疑问句中动词like需要助动词do帮助构成疑问"
    },
    {
      id: "general_2",
      type: "一般疑问句",
      question: "____ she ____ to school every day?",
      options: ["Does, goes", "Do, go", "Is, going", "Does, going"],
      answer: "Does, goes",
      explanation: "一般疑问句中does后接动词原形，但主语是she，谓语用goes"
    },
    {
      id: "general_3",
      type: "一般疑问句",
      question: "____ you a student?",
      options: ["Are", "Do", "Does", "Is"],
      answer: "Are",
      explanation: "be动词开头的一般疑问句直接提前"
    },
    {
      id: "general_4",
      type: "一般疑问句",
      question: "____ you ____ finish the work yesterday?",
      options: ["Did, able to", "Can, able to", "Are, able to", "Do, able to"],
      answer: "Did, able to",
      explanation: "一般疑问句中过去时用did，able to是固定搭配"
    },
    {
      id: "general_5",
      type: "一般疑问句",
      question: "____ they ____ basketball now?",
      options: ["Are, playing", "Do, play", "Does, play", "Is, playing"],
      answer: "Are, playing",
      explanation: "现在进行时的一般疑问句将be动词提前"
    }
  ],

  specialQuestion: [
    {
      id: "special_1",
      type: "特殊疑问句",
      question: "____ is in the classroom?",
      options: ["Who", "What", "Where", "When"],
      answer: "Who",
      explanation: "询问人用Who"
    },
    {
      id: "special_2",
      type: "特殊疑问句",
      question: "____ does he live?",
      options: ["What", "Who", "Where", "Which"],
      answer: "Where",
      explanation: "询问地点用Where"
    },
    {
      id: "special_3",
      type: "特殊疑问句",
      question: "____ will you go to Beijing?",
      options: ["What", "Why", "When", "How"],
      answer: "When",
      explanation: "询问时间用When"
    },
    {
      id: "special_4",
      type: "特殊疑问句",
      question: "____ students are there in your class?",
      options: ["How many", "How much", "How long", "How often"],
      answer: "How many",
      explanation: "提问可数名词数量用How many"
    },
    {
      id: "special_5",
      type: "特殊疑问句",
      question: "____ is the weather like today?",
      options: ["What", "How", "Which", "Who"],
      answer: "What",
      explanation: "询问天气用What is the weather like或How is the weather"
    },
    {
      id: "special_6",
      type: "特殊疑问句",
      question: "____ is it from your home to school?",
      options: ["How far", "How long", "How often", "How soon"],
      answer: "How far",
      explanation: "询问距离用How far"
    },
    {
      id: "special_7",
      type: "特殊疑问句",
      question: "____ does he study English?",
      options: ["Why", "When", "How", "Where"],
      answer: "How",
      explanation: "询问方式用How"
    },
    {
      id: "special_8",
      type: "特殊疑问句",
      question: "____ does the train arrive?",
      options: ["How soon", "How long", "How far", "How often"],
      answer: "How soon",
      explanation: "询问多久以后用How soon"
    }
  ],

  choiceQuestion: [
    {
      id: "choice_1",
      type: "选择疑问句",
      question: "Do you like tea ____ coffee?",
      options: ["or", "and", "but", "so"],
      answer: "or",
      explanation: "选择疑问句用or连接两个选项"
    },
    {
      id: "choice_2",
      type: "选择疑问句",
      question: "____ do you prefer, apple or banana?",
      options: ["What", "Which", "Who", "Whom"],
      answer: "Which",
      explanation: "在选择疑问句中提问选择用Which"
    },
    {
      id: "choice_3",
      type: "选择疑问句",
      question: "Is she a teacher ____ a doctor?",
      options: ["or", "and", "but", "yet"],
      answer: "or",
      explanation: "一般选择疑问句用or连接"
    },
    {
      id: "choice_4",
      type: "选择疑问句",
      question: "Will you go there today ____ tomorrow?",
      options: ["or", "and", "but", "so"],
      answer: "or",
      explanation: "选择疑问句表示今天或明天"
    },
    {
      id: "choice_5",
      type: "选择疑问句",
      question: "____ music do you like, pop or classical?",
      options: ["What", "Which", "Whose", "Where"],
      answer: "What",
      explanation: "提问种类用What"
    }
  ],

  tagQuestion: [
    {
      id: "tag_1",
      type: "反意疑问句",
      question: "You are a student, ____ you?",
      options: ["aren't", "are", "don't", "doesn't"],
      answer: "aren't",
      explanation: "肯定的陈述句 + 否定的附加疑问"
    },
    {
      id: "tag_2",
      type: "反意疑问句",
      question: "He doesn't like coffee, ____ he?",
      options: ["does", "doesn't", "is", "isn't"],
      answer: "does",
      explanation: "否定的陈述句 + 肯定的附加疑问"
    },
    {
      id: "tag_3",
      type: "反意疑问句",
      question: "She can swim, ____ she?",
      options: ["can't", "can", "doesn't", "don't"],
      answer: "can't",
      explanation: "情态动词的附加疑问用对应的否定形式"
    },
    {
      id: "tag_4",
      type: "反意疑问句",
      question: "They will come tomorrow, ____ they?",
      options: ["won't", "will", "don't", "doesn't"],
      answer: "won't",
      explanation: "将来时的附加疑问用won't"
    },
    {
      id: "tag_5",
      type: "反意疑问句",
      question: "You have finished the work, ____ you?",
      options: ["haven't", "have", "don't", "doesn't"],
      answer: "haven't",
      explanation: "完成时的附加疑问用haven't"
    }
  ],

  declarative: [
    {
      id: "declarative_1",
      type: "陈述句",
      question: "I ____ (not be) a teacher.",
      options: ["am not", "is not", "are not", "be not"],
      answer: "am not",
      explanation: "第一人称I用am的否定形式am not"
    },
    {
      id: "declarative_2",
      type: "陈述句",
      question: "She ____ (not like) pop music.",
      options: ["doesn't like", "don't like", "isn't like", "aren't like"],
      answer: "doesn't like",
      explanation: "第三人称单数谓语动词需要加s/es，否定用doesn't + 动词原形"
    },
    {
      id: "declarative_3",
      type: "陈述句",
      question: "We ____ (be) students.",
      options: ["are", "is", "am", "be"],
      answer: "are",
      explanation: "复数主语we用are"
    },
    {
      id: "declarative_4",
      type: "陈述句",
      question: "He ____ (have) a new bike.",
      options: ["has", "have", "is having", "having"],
      answer: "has",
      explanation: "第三人称单数用has"
    },
    {
      id: "declarative_5",
      type: "陈述句",
      question: "They ____ (play) basketball every day.",
      options: ["play", "plays", "playing", "played"],
      answer: "play",
      explanation: "复数主语they动词用原形"
    }
  ]
}

export function getQuestionsByType(typeKey) {
  const keyMap = {
    'exclamation': 'exclamation',
    'inversion': 'inversion',
    'imperative': 'imperative',
    'thereBe': 'thereBe',
    'there-be': 'thereBe',
    'generalQuestion': 'generalQuestion',
    'general-question': 'generalQuestion',
    'specialQuestion': 'specialQuestion',
    'special-question': 'specialQuestion',
    'choiceQuestion': 'choiceQuestion',
    'choice-question': 'choiceQuestion',
    'tagQuestion': 'tagQuestion',
    'tag-question': 'tagQuestion',
    'declarative': 'declarative'
  }
  const key = keyMap[typeKey] || typeKey
  return practiceQuestions[key] || []
}