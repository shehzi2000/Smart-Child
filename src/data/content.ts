import { PillarData, TransformationItem, FutureSkillDomain, ChallengeDay } from '../types';

export const PILLARS: PillarData[] = [
  {
    id: 'tech-wisely',
    number: '01',
    title: 'USE TECHNOLOGY WISELY',
    tagline: 'Preserve real childhood, sleep, and deep focus.',
    iconName: 'smartphone',
    description:
      'Excessive, unguided screen use quietly displaces essential human experiences: bedtime melatonin cycles, deep face-to-face conversations, uninterrupted homework concentration, and unstructured daydreaming.',
    impactText:
      'Screens before sleep delay REM cycles by up to 90 minutes. Setting a calm device charging station outside bedrooms creates an instant quality-of-life shift.',
    actionTips: [
      'Establish the 60-Minute Sunset: All screens off 1 hour before sleep to restore natural melatonin release.',
      'Designate No-Device Zones: Dining table, bedroom pillows, and morning breakfast conversations remain 100% human.',
      'Replace Passive Autoplay: Turn off algorithm recommendations and infinite scroll feeds on phones and tablets.'
    ],
    swaps: [
      { from: 'Endless short-video doomscroll in bed', to: 'Audiobook, podcast, or bedside paper book' },
      { from: 'Phone right next to the morning pillow', to: 'Traditional analog alarm clock + morning sunlight' }
    ],
    colorTheme: 'teal'
  },
  {
    id: 'move-more',
    number: '02',
    title: 'MOVE MORE',
    tagline: 'An energized body builds a sharp, resilient mind.',
    iconName: 'running',
    description:
      'A developing nervous system needs physical movement. Outdoor games, running, cycling, and team sports stimulate neuroplasticity, relieve mental fatigue, and directly improve academic attention.',
    impactText:
      'Just 40 minutes of outdoor aerobic play increases dopamine, serotonin, and hippocampal blood flow — dramatically reducing screen agitation.',
    actionTips: [
      'The 1:1 Movement Rule: Pair every 45 minutes of seated digital creation with 20 minutes of active physical movement.',
      'Sunlight First: Encourage 20 minutes of morning natural light and fresh air before any screen is turned on.',
      'Active Hobbies: Support cycling, swimming, martial arts, skateboarding, or recreational soccer alongside digital projects.'
    ],
    swaps: [
      { from: 'Sitting on the sofa gaming for 3 continuous hours', to: 'Park cycle ride or backyard ball drill between levels' },
      { from: 'Staring down with forward-head posture', to: 'Stretching, hanging from pull-up bars, or trampoline jump' }
    ],
    colorTheme: 'emerald'
  },
  {
    id: 'eat-smart',
    number: '03',
    title: 'EAT SMART',
    tagline: 'Brain fuel instead of mindless screen-grazing.',
    iconName: 'food',
    description:
      'Children who sit in front of televisions and smartphones tend to snack mindlessly without registering satiety signals. Replacing ultra-processed snacks with real nutrition stabilizes mood, focus, and energy.',
    impactText:
      'High-sugar snacks trigger rapid insulin spikes followed by brain fog and irritability. Stable nutrition keeps young minds alert for learning and creative thinking.',
    actionTips: [
      'Zero Screen-Snacking: Food is eaten at the dining table with attention, not during video playback or gaming sessions.',
      'Brain-Fuel Kitchen Bar: Keep cut berries, crisp apple slices, walnuts, carrot sticks, and water bottles readily accessible.',
      'Cook Together: Involve children in preparing simple whole foods — turning food preparation into a hands-on life skill.'
    ],
    swaps: [
      { from: 'Mindlessly eating chips while watching YouTube', to: 'Crunchy cucumber or carrot sticks with hummus at the table' },
      { from: 'Caffeinated energy sodas during gaming', to: 'Chilled fruit-infused water or light herbal tea' }
    ],
    colorTheme: 'amber'
  },
  {
    id: 'build-future',
    number: '04',
    title: 'BUILD THE FUTURE',
    tagline: 'Turn passive screen consumers into confident creators.',
    iconName: 'robot',
    description:
      'Technology isn’t an enemy to be feared; it is the brush, canvas, and engine of tomorrow. When children learn how algorithms work, how to prompt AI, and how to write code, they take control of their destiny.',
    impactText:
      'A child who understands how digital tools operate is no longer vulnerable to algorithmic manipulation — they become creative architects of the modern world.',
    actionTips: [
      'Adopt the Creator Mindset: Whenever your child enjoys digital media, ask: "Could you create something like this yourself?"',
      'Start with Visual Tools: Scratch, Roblox Studio, Tinkercad, and beginner generative AI models turn ideas into tangible projects.',
      'Encourage Problem-Solving: Let them build digital solutions for everyday needs: a family chore tracker, a pet quiz, or a digital postcard.'
    ],
    swaps: [
      { from: 'Watching someone else play games on a stream', to: 'Designing their own 2D puzzle or platformer level' },
      { from: 'Consuming viral video trends passively', to: 'Storyboarding and editing a mini science documentary' }
    ],
    colorTheme: 'indigo'
  }
];

export const TRANSFORMATION_ITEMS: TransformationItem[] = [
  {
    id: 'gaming',
    interest: 'Video Games & Virtual Worlds',
    passiveLabel: 'Passive Screen Time',
    passiveDescription: 'Spends 4 hours tapping repetitive mobile matches or spectator streaming.',
    productiveLabel: 'Productive Screen Time',
    productiveDescription: 'Builds interactive worlds, programs custom physics, and tests game mechanics.',
    realWorldSkill: 'Spatial logic, loop structures, collision mathematics, and user feedback design.',
    futureOpportunity: '3D Simulation Engineer, Game Architect, XR Experience Developer.',
    beginnerTool: 'Scratch 3.0 & Roblox Studio'
  },
  {
    id: 'videos',
    interest: 'Short Videos & Social Clips',
    passiveLabel: 'Passive Screen Time',
    passiveDescription: 'Mindlessly swipes algorithmic clips with dwindling attention span.',
    productiveLabel: 'Productive Screen Time',
    productiveDescription: 'Writes scripts, organizes B-roll footage, and edits cohesive video stories.',
    realWorldSkill: 'Narrative pacing, sound design, audience psychology, and clear communication.',
    futureOpportunity: 'Creative Director, Multimedia Producer, Digital Communications Lead.',
    beginnerTool: 'CapCut Desktop & DaVinci Resolve'
  },
  {
    id: 'ai-tech',
    interest: 'Curiosity About Gadgets & AI',
    passiveLabel: 'Passive Screen Time',
    passiveDescription: 'Uses AI merely to copy homework answers or generate silly memes.',
    productiveLabel: 'Productive Screen Time',
    productiveDescription: 'Learns prompt engineering, tests logic edge cases, and trains custom image models.',
    realWorldSkill: 'Critical thinking, system decomposition, ethics evaluation, and algorithmic reasoning.',
    futureOpportunity: 'AI Solutions Specialist, Machine Learning Engineer, Tech Ethicist.',
    beginnerTool: 'Teachable Machine & Python for Kids'
  },
  {
    id: 'art-doodles',
    interest: 'Drawing, Doodling & Visual Art',
    passiveLabel: 'Passive Screen Time',
    passiveDescription: 'Scrawls random phone stickers or uses automated face filters.',
    productiveLabel: 'Productive Screen Time',
    productiveDescription: 'Designs vector assets, creates digital storybook characters, and experiments with 3D CAD.',
    realWorldSkill: 'Visual hierarchy, typography, color harmony, and human-centered design.',
    futureOpportunity: 'Product Designer (UI/UX), Industrial CAD Modeler, Concept Artist.',
    beginnerTool: 'Canva for Youth & Tinkercad 3D'
  }
];

export const FUTURE_DOMAINS: FutureSkillDomain[] = [
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & Machine Learning',
    shortDesc: 'Understanding neural networks, conversational agents, and responsible data usage.',
    relevance: 'AI is becoming the core infrastructure of modern professions.',
    ageRecommendation: 'Ages 9–17',
    starterProject: 'Train a vision model to distinguish healthy leaves from diseased plants.',
    practicalTool: 'Google Teachable Machine'
  },
  {
    id: 'robotics',
    name: 'Robotics & Autonomous Systems',
    shortDesc: 'Connecting digital software instructions with physical motors, sensors, and wheels.',
    relevance: 'Bridges abstract coding with hands-on mechanical physics.',
    ageRecommendation: 'Ages 8–16',
    starterProject: 'Build an obstacle-avoiding smart rover using distance sensors.',
    practicalTool: 'LEGO Spike Prime / micro:bit'
  },
  {
    id: 'coding',
    name: 'Coding & Computational Thinking',
    shortDesc: 'Decomposing complex problems into algorithmic sequences, loops, and conditions.',
    relevance: 'Teaches structured patience and how to debug real-world challenges.',
    ageRecommendation: 'Ages 7–18',
    starterProject: 'Program an automated math puzzle generator with score tracking.',
    practicalTool: 'Scratch 3.0 / Python'
  },
  {
    id: 'design-ux',
    name: 'Digital Design & Spatial UX',
    shortDesc: 'Crafting user-friendly interfaces, accessibility standards, and 3D virtual spaces.',
    relevance: 'Technology is useless without intuitive, empathetic human interfaces.',
    ageRecommendation: 'Ages 10–18',
    starterProject: 'Redesign a mobile library app so elderly grandparents can easily read it.',
    practicalTool: 'Figma for Education / Tinkercad'
  },
  {
    id: 'creativity',
    name: 'Digital Creativity & Storytelling',
    shortDesc: 'Combining interactive animation, sound engineering, and rich narrative worlds.',
    relevance: 'Human storytelling remains irreplaceable even as AI tools evolve.',
    ageRecommendation: 'Ages 8–18',
    starterProject: 'Author an interactive "choose-your-own-adventure" digital storybook.',
    practicalTool: 'Twine / Wick Editor'
  },
  {
    id: 'entrepreneurship',
    name: 'Youth Entrepreneurship & Problem-Solving',
    shortDesc: 'Identifying genuine neighborhood challenges and prototyping sustainable solutions.',
    relevance: 'Empowers children to view technology as an instrument of positive community impact.',
    ageRecommendation: 'Ages 11–18',
    starterProject: 'Launch a school community recycling tracker with digital badges.',
    practicalTool: 'Notion / Google Sheets App'
  },
  {
    id: 'health-tech',
    name: 'Healthcare & Sports Science Tech',
    shortDesc: 'Tracking sleep patterns, heart rates, ergonomic postures, and bio-informatics.',
    relevance: 'Inspires youth to use technology to safeguard human longevity and wellness.',
    ageRecommendation: 'Ages 10–18',
    starterProject: 'Build a desk posture reminder alert using webcam pose estimation.',
    practicalTool: 'Scratch Pose Blocks / Python'
  },
  {
    id: 'ed-tech',
    name: 'Education Tech & Knowledge Systems',
    shortDesc: 'Creating peer flashcards, interactive science experiments, and collaborative quizzes.',
    relevance: 'Deepens mastery by encouraging children to teach others with digital tools.',
    ageRecommendation: 'Ages 9–17',
    starterProject: 'Design an interactive solar system gravity simulator for classmates.',
    practicalTool: 'PhET Interactive / GeoGebra'
  }
];

export const CHALLENGE_DAYS: ChallengeDay[] = [
  {
    dayNumber: 1,
    title: 'The Screen Audit & Sunset Curfew',
    focus: 'Technology Wisdom & Sleep Health',
    mission: 'Map out daily screen habits without judgment and power down all devices 60 minutes before bedtime.',
    parentTip: 'Provide a cozy bedside book basket and move chargers into the kitchen or hallway.',
    childActivity: 'Log your favorite digital activities on paper and highlight which ones felt truly fun versus just boring habits.'
  },
  {
    dayNumber: 2,
    title: 'The 45-Minute Green Zone Sprint',
    focus: 'Outdoor Movement & Sunlight',
    mission: 'Spend 45 continuous minutes outdoors riding bikes, kicking a soccer ball, or walking in nature before turning on gaming consoles.',
    parentTip: 'Join your child outdoors without bringing your work smartphone along.',
    childActivity: 'Count how many different bird or plant species you can spot while breathing fresh outdoor air.'
  },
  {
    dayNumber: 3,
    title: 'The Consumption-to-Creation Swap',
    focus: 'Productive Screen Time',
    mission: 'Trade 30 minutes of passive video watching for building something original in a creative tool.',
    parentTip: 'Celebrate their effort rather than demanding a polished masterpiece.',
    childActivity: 'Build a simple 2D maze in Scratch or design a personalized 3D keychain in Tinkercad.'
  },
  {
    dayNumber: 4,
    title: 'Brain Fuel Kitchen Lab',
    focus: 'Smart Nutrition & Steady Focus',
    mission: 'Ban screen-snacking today and prepare a colorful, brain-boosting meal or snack together.',
    parentTip: 'Explain how protein, healthy fats, and crisp vegetables keep mental energy smooth without sugar crashes.',
    childActivity: 'Invent your own "Super-Thinker Snack Bowl" using berries, pumpkin seeds, apple slices, and yogurt.'
  },
  {
    dayNumber: 5,
    title: 'AI Prompt Explorer & Story Lab',
    focus: 'Discovering Modern AI',
    mission: 'Collaborate with an AI tool to write an exciting illustrated science-fiction story or animal tale.',
    parentTip: 'Show how prompting works by asking the AI to explain a complex topic in simple, fun analogies.',
    childActivity: 'Test 3 different prompts to see how AI responds to creative constraints and detailed instructions.'
  },
  {
    dayNumber: 6,
    title: 'The Analog Family Arena',
    focus: 'Human Connection & Offline Joy',
    mission: 'Host an uninterrupted 90-minute family board game, cooperative cooking session, or backyard sports match.',
    parentTip: 'Place all adult phones in a designated basket first to lead by authentic example.',
    childActivity: 'Teach your parents the rules of a new game or challenge them to an obstacle course.'
  },
  {
    dayNumber: 7,
    title: 'The Future Creator Showcase',
    focus: 'Celebration & Long-Term Balance',
    mission: 'Review the week’s discoveries and establish a balanced weekly rhythm for technology, sport, and creativity.',
    parentTip: 'Discuss together which habits felt energizing and agree on a sustainable family media charter.',
    childActivity: 'Showcase your favorite project or sketch created during the week to your family.'
  }
];
