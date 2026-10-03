import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Code2,
  Smartphone,
  Gamepad2,
  Palette,
  Film,
  Cpu,
  Microscope,
  PenTool,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Heart,
  Globe2,
  Layers,
  ChevronRight,
  HelpCircle,
  Lock,
  Search,
  BookOpen,
  Share2,
  Check,
  Zap,
} from 'lucide-react';

interface WorldOfAiSectionProps {
  onExploreFutureSkills?: () => void;
  onStartProject?: () => void;
  onOpenAiPlan?: () => void;
}

type AgeGroup = '6–8' | '9–12' | '13–15' | '16–17';

export const WorldOfAiSection: React.FC<WorldOfAiSectionProps> = ({
  onExploreFutureSkills,
  onStartProject,
  onOpenAiPlan,
}) => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('9–12');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('ai');
  const [selectedTransformIdx, setSelectedTransformIdx] = useState<number>(0);
  const [selectedCreationIdea, setSelectedCreationIdea] = useState<string>('game');

  // 10 Future Skills Data with Age-Adapted "What a child can try"
  const futureSkills = [
    {
      id: 'ai',
      title: 'AI & Prompting',
      icon: Bot,
      color: 'teal',
      badge: 'Core Technology',
      whatItIs:
        'Artificial Intelligence is a computer tool that can analyze patterns, answer questions, draft ideas, and generate images or code.',
      whyItMatters:
        'Understanding how to give clear instructions (prompts) and verify AI outputs turns AI from a passive distraction into a powerful thinking partner.',
      ageAdaptations: {
        '6–8': 'Ask AI to help brainstorm a funny bedtime story about animals and draw the characters on paper.',
        '9–12': 'Learn how to write detailed prompts with roles and constraints, then fact-check the answers.',
        '13–15': 'Use AI for research synthesis, brainstorming project outlines, and debugging beginner code.',
        '16–17': 'Explore API integration, ethical AI frameworks, and training simple models with Teachable Machine.',
      },
    },
    {
      id: 'coding',
      title: 'Coding & Logic',
      icon: Code2,
      color: 'indigo',
      badge: 'Foundational Skill',
      whatItIs:
        'Coding is communicating step-by-step instructions to a computer to solve problems, build tools, and automate tasks.',
      whyItMatters:
        'Learning logic teaches children how to break big, overwhelming problems down into manageable, solvable steps.',
      ageAdaptations: {
        '6–8': 'Learn sequencing through physical arrows or visual block games like ScratchJr without complex syntax.',
        '9–12': 'Build an interactive animated greeting card or simple obstacle script in Scratch 3.0.',
        '13–15': 'Experiment with web languages (HTML/CSS/JavaScript) or write beginner Python loops and functions.',
        '16–17': 'Build functional portfolio projects, automate tasks with Python, or develop full-stack web prototypes.',
      },
    },
    {
      id: 'app',
      title: 'App Development',
      icon: Smartphone,
      color: 'emerald',
      badge: 'Problem Solving',
      whatItIs:
        'App development is the process of designing and programming mobile tools that help people accomplish specific daily goals.',
      whyItMatters:
        'It shifts the child from tapping someone else’s app to understanding user needs, interface layout, and functionality.',
      ageAdaptations: {
        '6–8': 'Draw 3 app screen ideas on paper for a pet feeding reminder or family chore tracker.',
        '9–12': 'Use block-based mobile builders like MIT App Inventor or Thunkable to make a talking soundboard.',
        '13–15': 'Design a simple community helper app wireframe in Figma and prototype the buttons and user flow.',
        '16–17': 'Build cross-platform mobile apps with React Native or Flutter solving a neighborhood or school need.',
      },
    },
    {
      id: 'game',
      title: 'Game Development',
      icon: Gamepad2,
      color: 'violet',
      badge: 'Creativity & Logic',
      whatItIs:
        'Game development combines storytelling, art, sound, and computational rules to create interactive worlds.',
      whyItMatters:
        'It transforms gaming screen time into an engaging masterclass in coordinate math, physics, pacing, and graphic design.',
      ageAdaptations: {
        '6–8': 'Design game rules and draw the map for an offline floor-tile obstacle board game with family.',
        '9–12': 'Build a classic platformer or maze game with scoring and timers in Scratch or MakeCode Arcade.',
        '13–15': 'Learn 2D physics engines in Godot or design 3D obstacle courses and mechanics in Roblox Studio.',
        '16–17': 'Program interactive mechanics in Unity or Godot with custom asset pipelines and multiplayer logic.',
      },
    },
    {
      id: 'design',
      title: 'Digital Design & UI',
      icon: Palette,
      color: 'amber',
      badge: 'Visual Arts',
      whatItIs:
        'Digital design is using color theory, typography, spacing, and layout to visually communicate ideas and create digital experiences.',
      whyItMatters:
        'Visual communication is critical across every modern discipline, from scientific posters to software interfaces.',
      ageAdaptations: {
        '6–8': 'Mix colors and shapes on a tablet or paper to create an imaginative superhero logo.',
        '9–12': 'Design a digital poster for a school event or personal hobby using Canva or Vector ink.',
        '13–15': 'Design user interface wireframes in Figma with interactive button components and design tokens.',
        '16–17': 'Build comprehensive brand identity kits, design systems, and responsive web layouts.',
      },
    },
    {
      id: 'video',
      title: 'Video & Animation',
      icon: Film,
      color: 'rose',
      badge: 'Storytelling',
      whatItIs:
        'Video and animation combine scripts, frame sequencing, lighting, and audio editing to bring narratives to life.',
      whyItMatters:
        'Children learn the discipline of pacing, planning before filming, storytelling, and thoughtful media critique.',
      ageAdaptations: {
        '6–8': 'Create a 15-second clay or toy stop-motion animation using a tablet camera.',
        '9–12': 'Write a 1-minute video script explaining a fun science concept and edit the clip with music.',
        '13–15': 'Learn timeline multi-track editing, audio balancing, and transition pacing in OpenShot or DaVinci.',
        '16–17': 'Produce documentary-style shorts, motion graphics, and educational digital content with polished audio.',
      },
    },
    {
      id: 'robotics',
      title: 'Robotics & Hardware',
      icon: Cpu,
      color: 'cyan',
      badge: 'Physical Tech',
      whatItIs:
        'Robotics merges computer programming with physical sensors, motors, gears, and electronic circuits.',
      whyItMatters:
        'It connects abstract computer code to tangible physical reality: when code runs, wheels turn and lights glow.',
      ageAdaptations: {
        '6–8': 'Build physical cardboard machines with levers, rubber bands, and safe mechanical parts.',
        '9–12': 'Experiment with virtual robotics simulators or visual micro:bit sensor programs.',
        '13–15': 'Program Arduino or Raspberry Pi microcontrollers with temperature sensors and servo motors.',
        '16–17': 'Design IoT circuits, autonomous obstacle-avoiding rovers, or environmental monitoring stations.',
      },
    },
    {
      id: 'science',
      title: 'Science & Technology',
      icon: Microscope,
      color: 'blue',
      badge: 'Inquiry & Discovery',
      whatItIs:
        'Applying digital simulations, data analysis, and sensors to investigate natural phenomena and scientific questions.',
      whyItMatters:
        'Nurtures scientific curiosity and teaches children to form hypotheses, test assumptions, and observe real evidence.',
      ageAdaptations: {
        '6–8': 'Observe insects or backyard plants and keep a colorful digital photo nature diary.',
        '9–12': 'Use interactive PhET web simulations to experiment with gravity, circuit electricity, and waves.',
        '13–15': 'Collect local environmental data (like sunlight hours or temperature) and plot charts in spreadsheets.',
        '16–17': 'Analyze scientific datasets with Python libraries or simulate chemical reactions digitally.',
      },
    },
    {
      id: 'writing',
      title: 'Creative Writing',
      icon: PenTool,
      color: 'orange',
      badge: 'Expression & Depth',
      whatItIs:
        'Crafting stories, character arcs, dialogue, essays, and worldbuilding that emotionally resonate with readers.',
      whyItMatters:
        'Writing is the fundamental foundation of clear thinking, structured reasoning, and emotional empathy.',
      ageAdaptations: {
        '6–8': 'Co-create a short adventure story about a lost kitten with a parent and illustrate the pages.',
        '9–12': 'Write a 3-chapter mystery story with cliffhangers and character profiles.',
        '13–15': 'Develop an interactive branching text-adventure story with multiple endings using Twine.',
        '16–17': 'Write researched articles, persuasive essays, or deep speculative fiction exploring future technology.',
      },
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship',
      icon: Lightbulb,
      color: 'yellow',
      badge: 'Real-World Impact',
      whatItIs:
        'Identifying real human problems in everyday life and designing sustainable, practical solutions to help others.',
      whyItMatters:
        'Empowers youth to realize that ideas become valuable when they bring practical relief or joy to other people.',
      ageAdaptations: {
        '6–8': 'Organize a neighborhood toy swap or simple recycled craft stand with family.',
        '9–12': 'Identify a family or school frustration and brainstorm 3 creative low-cost ways to solve it.',
        '13–15': 'Write a one-page lean project plan: identify target users, costs, and value proposition.',
        '16–17': 'Build an MVP (Minimum Viable Product) prototype, test it with real users, and gather feedback.',
      },
    },
  ];

  // 5 Interactive Transformations (From Consumer to Creator)
  const transformations = [
    {
      from: 'WATCH',
      to: 'CREATE',
      iconFrom: '👁️',
      iconTo: '🎬',
      action: 'From Passive Watching to Active Creation',
      example:
        'Instead of watching 2 hours of gameplay or unboxing videos: write a 30-second script, record your own mini-tutorial, or edit a short clip celebrating a family memory.',
    },
    {
      from: 'PLAY',
      to: 'BUILD',
      iconFrom: '🎮',
      iconTo: '💻',
      action: 'From Game Consumer to Game Architect',
      example:
        'If you love games, dive into the mechanics: design your own game levels, character stats, and scoring rules on paper or in Scratch. Turn tactical reflexes into programming logic.',
    },
    {
      from: 'SCROLL',
      to: 'LEARN',
      iconFrom: '📱',
      iconTo: '📚',
      action: 'From Endless Scrolling to Targeted Exploration',
      example:
        'Instead of mindless algorithmic feeds, pick ONE specific curiosity—how black holes work, how cricket bats are shaped, or how rockets land—and do a 20-minute deep dive.',
    },
    {
      from: 'CONSUME',
      to: 'DESIGN',
      iconFrom: '🛒',
      iconTo: '🎨',
      action: 'From Digital Consumer to Visual Designer',
      example:
        'Stop passively viewing digital posters and stickers: open a sketchbook or free design canvas and design your own club badge, app screen mockup, or community flyer.',
    },
    {
      from: 'USE AI',
      to: 'UNDERSTAND AI',
      iconFrom: '🤖',
      iconTo: '🧠',
      action: 'From Asking Questions to Knowing How AI Works',
      example:
        'Don’t just ask an AI chatbot for an answer. Learn what a prompt is, why AI makes mistakes, how training data shapes models, and how to verify facts independently.',
    },
  ];

  // 6 AI Creator Challenges
  const challenges = [
    {
      title: 'AI Story Creator',
      tag: 'Writing & AI',
      desc: 'Use AI to brainstorm a plot twist, then write the ending yourself and illustrate the characters.',
      action: 'Write a 300-word story with one human-written secret twist.',
    },
    {
      title: 'App Wireframe Designer',
      tag: 'UI & Logic',
      desc: 'Sketch a 3-screen mobile app that solves an everyday problem in your school or home.',
      action: 'Draw the Welcome screen, Main dashboard, and Success button on paper.',
    },
    {
      title: 'Game Rule Architect',
      tag: 'Game Design',
      desc: 'Create the mechanics and rules for a playable game without any expensive gear.',
      action: 'Write down 3 rules, 1 winning condition, and test it with a friend.',
    },
    {
      title: 'AI Fact Investigator',
      tag: 'Critical Thinking',
      desc: 'Ask AI an interesting historical or scientific question, then verify every statement using books or official sources.',
      action: 'Find one fact the AI oversimplified and explain why.',
    },
    {
      title: 'Digital Artwork Explainer',
      tag: 'Art & Design',
      desc: 'Create an illustration (by hand or digitally) that symbolizes an important environmental or friendship theme.',
      action: 'Write 2 sentences explaining the deeper message behind your color choices.',
    },
    {
      title: 'Community Problem Solver',
      tag: 'Entrepreneurship',
      desc: 'Spot one daily problem in your neighborhood and outline a technology-assisted solution.',
      action: 'Draft a 1-page solution proposal with a simple diagram.',
    },
  ];

  // Interactive "What Can I Build?" Idea Generator
  const creationIdeas: Record<
    string,
    {
      title: string;
      beginnerIdea: string;
      whatYouNeed: string;
      firstStep: string;
      skillsLearned: string[];
      nextStep: string;
    }
  > = {
    app: {
      title: 'A Helpful Mobile App',
      beginnerIdea: 'A “Water & Stretch Reminder” app with friendly cartoon animations.',
      whatYouNeed: 'Paper & pencil for wireframing, or MIT App Inventor / Figma (free).',
      firstStep: 'Draw 3 boxes on paper: 1. Welcome Screen, 2. Timer Setup, 3. Congratulation Screen.',
      skillsLearned: ['User Interface Design', 'Event-Driven Logic', 'Empathy for User Needs'],
      nextStep: 'Test your paper prototype by asking a family member to tap your drawn buttons!',
    },
    game: {
      title: 'An Interactive Maze or Platformer Game',
      beginnerIdea: 'A spaceship dodging meteorites with score milestones and power-ups.',
      whatYouNeed: 'A laptop or tablet with Scratch.mit.edu (100% free web tool).',
      firstStep: 'Make a sprite move with arrow keys using "when key pressed" code blocks.',
      skillsLearned: ['Coordinate Math (X/Y)', 'Collision Detection', 'Game Loop Architecture'],
      nextStep: 'Add background music, a life counter, and a winning victory fanfare sound!',
    },
    ai: {
      title: 'A Specialized AI Helper',
      beginnerIdea: 'An AI Homework Study Buddy that quizzes you on science facts instead of giving answers.',
      whatYouNeed: 'A web browser and Google AI Studio or prompt canvas.',
      firstStep: 'Write a system prompt: "You are a friendly quiz master. Ask me 1 question at a time and do not reveal answers."',
      skillsLearned: ['Prompt Engineering', 'Iterative Testing', 'Output Evaluation'],
      nextStep: 'Add constraints so it gives helpful hints when you make a mistake!',
    },
    design: {
      title: 'A Poster or Brand Identity',
      beginnerIdea: 'A vibrant poster promoting “Neighborhood Clean-up & Tree Planting”.',
      whatYouNeed: 'Drawing paper, colored pencils, or free vector tools like Canva/Inkscape.',
      firstStep: 'Choose 2 primary colors and 1 contrasting accent color. Sketch 3 different headline layouts.',
      skillsLearned: ['Visual Hierarchy', 'Typography Spacing', 'Color Psychology'],
      nextStep: 'Export or photograph your poster and share it with your family or class!',
    },
    video: {
      title: 'A 60-Second Explainer Video',
      beginnerIdea: 'A stop-motion clay clip showing how trees turn carbon dioxide into oxygen.',
      whatYouNeed: 'A smartphone camera, daylight, clay or paper cutouts, and a free editor.',
      firstStep: 'Write a 4-line script. Take 1 photo for every tiny movement.',
      skillsLearned: ['Visual Storyboarding', 'Frame Pacing', 'Audio Synchronization'],
      nextStep: 'Add a calm voiceover track and title cards explaining the science.',
    },
    website: {
      title: 'A Personal Digital Showcase',
      beginnerIdea: 'A 1-page website displaying your drawings, favorite books, or sports goals.',
      whatYouNeed: 'Notepad or simple HTML sandbox (CodePen / Glitch) or paper prototype.',
      firstStep: 'Write out the 3 sections: Header with your name, Gallery of your work, and Contact bio.',
      skillsLearned: ['HTML Document Structure', 'CSS Styling', 'Digital Publishing'],
      nextStep: 'Add interactive buttons that smoothly scroll to each section!',
    },
    story: {
      title: 'An Illustrated Branching Storybook',
      beginnerIdea: 'An adventure tale where the reader chooses whether to enter a glowing cave or climb a mountain.',
      whatYouNeed: 'A notebook with index cards, or Twine (free interactive fiction tool).',
      firstStep: 'Write opening chapter 1, then create two separate choices: Choice A and Choice B.',
      skillsLearned: ['Narrative Branching', 'Logical Consequence', 'Creative Empathy'],
      nextStep: 'Illustrate key moments with colored pencil sketches for each path!',
    },
    idea: {
      title: 'A Technology Community Invention',
      beginnerIdea: 'A solar-powered book-sharing box with an interactive barcode or sign-out tracker.',
      whatYouNeed: 'A brainstorming journal and feedback from friends and neighbors.',
      firstStep: 'Interview 3 people: ask what their biggest challenge is with reading or borrowing books.',
      skillsLearned: ['User Research', 'Design Thinking', 'Iterative Prototyping'],
      nextStep: 'Present your concept sketch to a teacher or parent for feedback!',
    },
  };

  const activeSkill = futureSkills.find((s) => s.id === selectedSkillId) || futureSkills[0];
  const activeIdea = creationIdeas[selectedCreationIdea] || creationIdeas.game;

  return (
    <section id="world-of-ai" className="py-20 sm:py-28 bg-[#FAFAF8] text-slate-900 relative overflow-hidden border-t border-slate-200">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20 sm:space-y-28">

        {/* ======================================================== */}
        {/* 1. HERO SECTION */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
            <span>WORLD OF AI & FUTURE SKILLS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08]">
            “THE FUTURE ISN'T JUST SOMETHING YOU WATCH.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700">
              IT'S SOMETHING YOU CAN BUILD.”
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
            Children around the world are beginning to explore coding, artificial intelligence,
            robotics, digital design, game development, storytelling, and other creative technologies.
            Technology is not only for watching and consuming—it is a launchpad to <strong>create, learn, and build.</strong>
          </p>

          {/* Futuristic Visual Circuit Banner */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-slate-600">
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-teal-600" />
              <span>Prompting & AI Literacy</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Computational Logic</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              <span>Digital Design</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Interactive Worlds</span>
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. AGE-BASED EXPLORATION FILTER */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center max-w-4xl mx-auto">
          <div className="text-xs font-black uppercase tracking-widest text-teal-800 mb-2">
            Adaptive Exploration
          </div>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-950 mb-2">
            Explore Content for Your Age Stage
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-xl mx-auto">
            Choose an age range to see realistic, age-appropriate projects and thinking steps.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto">
            {(['6–8', '9–12', '13–15', '16–17'] as AgeGroup[]).map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`py-3 px-4 rounded-2xl font-display font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedAge === age
                    ? 'bg-slate-900 text-white shadow-md ring-2 ring-teal-400'
                    : 'bg-[#FAFAF8] text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>Ages {age}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/60 text-xs text-teal-950 font-medium inline-block">
            {selectedAge === '6–8' && '🌱 Focus: Playful exploration, drawing app screens, tactile story building, and parent co-play.'}
            {selectedAge === '9–12' && '🚀 Focus: Visual block coding, game mechanics, prompting foundations, and simple digital projects.'}
            {selectedAge === '13–15' && '💡 Focus: Real-world coding logic, mobile wireframes, AI research synthesis, and creative independence.'}
            {selectedAge === '16–17' && '⚡ Focus: Portfolio creation, full-stack tools, ethical AI development, and entrepreneurship.'}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. 10 FUTURE SKILL CARDS */}
        {/* ======================================================== */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              Future Skill Horizons
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-slate-950 mt-1">
              10 Ways to Build With Technology
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Select any skill below to see what it is, why it matters, and a hands-on project suited for ages {selectedAge}.
            </p>
          </div>

          {/* Skill Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {futureSkills.map((skill) => {
              const Icon = skill.icon;
              const isSelected = selectedSkillId === skill.id;
              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-300'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{skill.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Detail Showcase Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="md:col-span-1 space-y-4 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-700 flex items-center justify-center">
                <activeSkill.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {activeSkill.badge}
                </span>
                <h4 className="font-display font-black text-xl sm:text-2xl text-slate-950 mt-1">
                  {activeSkill.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Curated specifically for young learners exploring positive technology creation.
              </p>
            </div>

            <div className="md:col-span-2 space-y-5 text-left">
              <div>
                <h5 className="font-display font-extrabold text-xs uppercase tracking-wider text-teal-800 mb-1">
                  WHAT IT IS
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeSkill.whatItIs}
                </p>
              </div>

              <div>
                <h5 className="font-display font-extrabold text-xs uppercase tracking-wider text-indigo-800 mb-1">
                  WHY IT MATTERS
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeSkill.whyItMatters}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                    WHAT A CHILD CAN TRY TODAY (AGES {selectedAge})
                  </h5>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    Action Step
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                  “{activeSkill.ageAdaptations[selectedAge]}”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. FROM CONSUMER TO CREATOR (Interactive Transformation) */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              The Mindset Shift
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-slate-950 mt-1">
              FROM CONSUMER TO CREATOR
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Tap any transformation below to see how a passive screen habit becomes an active creator skill.
            </p>
          </div>

          {/* Transformation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {transformations.map((t, idx) => {
              const isSelected = selectedTransformIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTransformIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-teal-400 scale-102'
                      : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-black tracking-wider flex items-center justify-center gap-1">
                    <span>{t.from}</span>
                    <span className="text-teal-400">→</span>
                    <span className="text-teal-300 font-extrabold">{t.to}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Transformation Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-teal-50/70 via-emerald-50/50 to-teal-50/70 border border-teal-200 text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{transformations[selectedTransformIdx].iconTo}</span>
              <h4 className="font-display font-extrabold text-base sm:text-lg text-teal-950">
                {transformations[selectedTransformIdx].action}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-teal-900 leading-relaxed font-medium">
              {transformations[selectedTransformIdx].example}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. WHAT ARE YOUNG CREATORS EXPLORING? (Real-World Inspiration) */}
        {/* ======================================================== */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              Global Perspectives
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-slate-950 mt-1">
              WHAT ARE YOUNG CREATORS EXPLORING?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Around the world, youth are discovering that technology is an expansive canvas for curiosity, not competition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto text-left">
            {[
              {
                title: 'Visual Block Coding',
                desc: 'Young creators use Scratch and MakeCode to create interactive storycards and obstacle games.',
                icon: Code2,
              },
              {
                title: 'Robotics & Hardware Labs',
                desc: 'Students combine cardboard, simple sensors, and micro:bit boards to monitor plant hydration.',
                icon: Cpu,
              },
              {
                title: 'Ethical AI Experimentation',
                desc: 'Training computer vision models using Google Teachable Machine to identify recyclable objects.',
                icon: Bot,
              },
              {
                title: 'Game Level Architecture',
                desc: 'Designing coordinate math puzzles, character mechanics, and level balance in Godot and Roblox Studio.',
                icon: Gamepad2,
              },
              {
                title: 'Digital Illustration & UI',
                desc: 'Drawing digital comics, vector badges, and responsive wireframes on tablets and canvas tools.',
                icon: Palette,
              },
              {
                title: 'Community Problem Solving',
                desc: 'Brainstorming mobile web directories to help elderly neighbors or schedule school book swaps.',
                icon: Lightbulb,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-950 mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. AI + HUMAN CREATIVITY = POWERFUL (Literacy & Safety) */}
        {/* ======================================================== */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center max-w-5xl mx-auto space-y-8 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-teal-400">
              The Golden Equation
            </span>
            <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              AI + HUMAN CREATIVITY ={' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                POWERFUL
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AI can help brainstorm ideas, explain concepts, and draft code. But the soul of every creation comes entirely from human judgment and heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="text-xs font-extrabold uppercase text-teal-300 block">
                WHAT AI ASSISTS WITH
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-2">✓ Fast brainstorming & story outlines</li>
                <li className="flex items-center gap-2">✓ Explaining difficult code and syntax</li>
                <li className="flex items-center gap-2">✓ Generating starter templates & mock data</li>
                <li className="flex items-center gap-2">✓ Translating ideas across languages</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 space-y-2.5">
              <span className="text-xs font-extrabold uppercase text-emerald-300 block">
                WHAT HUMANS PROVIDE (IRREPLACEABLE)
              </span>
              <ul className="text-xs text-white space-y-1.5 font-semibold">
                <li className="flex items-center gap-2">★ Genuine Curiosity & Wonder</li>
                <li className="flex items-center gap-2">★ Moral Judgment & Critical Thinking</li>
                <li className="flex items-center gap-2">★ Empathy & Emotional Connection</li>
                <li className="flex items-center gap-2">★ Real-World Problem Solving</li>
              </ul>
            </div>
          </div>

          {/* AI Literacy Safeguards Notice */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-3xl mx-auto text-left text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4" />
              <span>CORE AI LITERACY SAFEGUARDS:</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300">
              1. AI is a tool, not an oracle—always fact-check answers. 2. Never copy blindly. 3. Protect private data: never share passwords, full names, or home addresses with AI tools. 4. Use AI to learn and create, never to avoid thinking.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. FUTURE SKILL PATH VISUAL */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              The Learning Journey
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950 mt-1">
              THE CREATOR ROADMAP
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              From an everyday spark of curiosity all the way to solving real-world challenges.
            </p>
          </div>

          {/* Linear Path Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-extrabold text-slate-700 py-3">
            <span className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900">1. INTEREST</span>
            <span className="text-teal-400">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800">2. EXPLORE</span>
            <span className="text-teal-400">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800">3. LEARN</span>
            <span className="text-teal-400">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-teal-100 text-teal-900">4. CREATE</span>
            <span className="text-teal-400">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800">5. BUILD</span>
            <span className="text-teal-400">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800">6. SHARE</span>
            <span className="text-teal-400">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900">7. SOLVE PROBLEMS</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAF8] border border-slate-200 text-left text-xs sm:text-sm text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">Example (Gaming Path):</span>
            <p className="leading-relaxed">
              Love Gaming (Interest) → Explore how games work (Explore) → Learn Scratch block coordinates (Learn) → Design a 2D space game (Create) → Program health & score logic (Build) → Test with classmates (Share) → Build an educational math game for younger kids (Solve Real Problem).
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 8. WHAT WOULD YOU LIKE TO CREATE? (Interactive Playground) */}
        {/* ======================================================== */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              Idea Generator
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-slate-950 mt-1">
              WHAT WOULD YOU LIKE TO CREATE?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Select what you want to build and get an immediate beginner-friendly blueprint.
            </p>
          </div>

          {/* Creation Options */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {[
              { id: 'app', label: '📱 An App' },
              { id: 'game', label: '🎮 A Game' },
              { id: 'ai', label: '🤖 An AI Helper' },
              { id: 'design', label: '🎨 A Design' },
              { id: 'video', label: '🎬 A Video' },
              { id: 'website', label: '🌐 A Website' },
              { id: 'story', label: '📚 A Story' },
              { id: 'idea', label: '💡 A New Invention' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCreationIdea(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCreationIdea === item.id
                    ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-300'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Active Blueprint Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto text-left space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-700">
                Beginner Blueprint
              </span>
              <h4 className="font-display font-black text-xl text-slate-950 mt-0.5">
                {activeIdea.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Idea: <strong>{activeIdea.beginnerIdea}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">What you need:</span>
                <p className="text-slate-600">{activeIdea.whatYouNeed}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200">
                <span className="font-bold text-teal-950 block mb-1">Your first step today:</span>
                <p className="text-teal-900 font-semibold">{activeIdea.firstStep}</p>
              </div>
            </div>

            <div className="pt-2 text-xs">
              <span className="font-bold text-slate-900 block mb-1.5">Skills you will learn:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeIdea.skillsLearned.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 9. AI CREATOR CHALLENGES */}
        {/* ======================================================== */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              Hands-On Projects
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-slate-950 mt-1">
              AI CREATOR CHALLENGES
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Small, achievable projects that build real creator confidence in under 30 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto text-left">
            {challenges.map((c, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    {c.tag}
                  </span>
                  <h4 className="font-display font-extrabold text-base text-slate-950 mt-2 mb-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {c.desc}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-slate-100 text-[11px] text-teal-950 font-semibold">
                  🎯 Try: {c.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 10. PARENT PERSPECTIVE & NO PRESSURE REMINDER */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
          
          {/* Parent Message Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/70 border border-indigo-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 text-indigo-600" />
              <span>A Message for Parents</span>
            </div>
            <h4 className="font-display font-black text-lg text-indigo-950 leading-snug">
              “YOU DON'T HAVE TO TAKE TECHNOLOGY AWAY TO MAKE IT HEALTHIER.”
            </h4>
            <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-medium">
              Help your child move from passive consumption toward active creation. Their existing interests (gaming, drawing, videos) are not obstacles—they are the natural starting points for deep learning and digital self-regulation.
            </p>
          </div>

          {/* No Pressure / Balanced Life Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Technology is One of Many Passions</span>
            </div>
            <h4 className="font-display font-black text-lg text-amber-950 leading-snug">
              NO PRESSURE: BALANCE COMES FIRST
            </h4>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              Not every child needs to become a programmer. We celebrate outdoor sports, painting, crafts, science, music, reading, and family dinners with equal joy. Technology is simply one tool to express your unique life.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 11. RESPONSIBLE FUTURE MESSAGE & SMART BALANCE PLAN CTA */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-teal-700 via-emerald-800 to-slate-900 text-white text-center max-w-4xl mx-auto space-y-6 shadow-xl">
          <span className="text-xs font-black uppercase tracking-widest text-teal-300">
            Smart Future Vision
          </span>

          <h3 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            “THE FUTURE IS NOT ABOUT SPENDING MORE TIME ON SCREENS.{' '}
            <span className="text-teal-200">IT'S ABOUT USING TECHNOLOGY BETTER.”</span>
          </h3>

          <p className="text-xs sm:text-sm text-teal-100 max-w-xl mx-auto leading-relaxed">
            Learn. Create. Move. Connect. Build. Turn what you enjoy into real-world capability while protecting your sleep, physical health, and family relationships.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onOpenAiPlan && (
              <button
                onClick={onOpenAiPlan}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-teal-950 hover:bg-teal-50 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Create My Smart Balance Plan</span>
              </button>
            )}

            {onStartProject && (
              <button
                onClick={onStartProject}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600/40 hover:bg-teal-600/60 text-white border border-teal-400/40 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Start a Creative Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
