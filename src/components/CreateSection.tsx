import React, { useState } from 'react';
import {
  Smartphone,
  Globe,
  Gamepad2,
  Palette,
  Brain,
  Video,
  Lightbulb,
  Rocket,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Laptop,
  CheckCircle2,
  X,
  Zap,
  HelpCircle,
  Share2,
  Search,
  Hammer,
  Layers,
  Heart,
} from 'lucide-react';

interface CreateSectionProps {
  onTakeChallenge: () => void;
}

export const CreateSection: React.FC<CreateSectionProps> = ({ onTakeChallenge }) => {
  const [imageError, setImageError] = useState(false);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [activeQuestionTab, setActiveQuestionTab] = useState<number>(0);
  const [isStarterModalOpen, setIsStarterModalOpen] = useState(false);

  // 8 Creation Paths
  const creationPaths = [
    {
      id: 'app',
      num: '01',
      title: 'Create an App',
      icon: Smartphone,
      desc: 'Turn an idea into a simple mobile or web application.',
      examples: ['To-do app', 'Quiz app', 'Calculator', 'Study planner', 'Habit tracker'],
      btnText: 'Explore App Ideas',
      starterTool: 'Thunkable & MIT App Inventor',
      guide: 'Children learn how user input, buttons, screen navigation, and variables turn daily logic into working mobile software.',
    },
    {
      id: 'website',
      num: '02',
      title: 'Create a Website',
      icon: Globe,
      desc: 'Learn how websites work and create something useful for yourself or your community.',
      examples: ['Portfolio', 'School project', 'Personal blog', 'Community website', 'Small business website'],
      btnText: 'Explore Web Creation',
      starterTool: 'HTML5, CSS & GitHub Pages / Webflow',
      guide: 'Kids build layout wireframes, write semantic structure, and host real pages accessible by grandparents and classmates.',
    },
    {
      id: 'game',
      num: '03',
      title: 'Create a Game',
      icon: Gamepad2,
      desc: 'Move from playing games to understanding how games are designed.',
      examples: ['Quiz game', 'Puzzle game', 'Platform game', 'Educational game', 'Simple adventure'],
      btnText: 'Explore Game Creation',
      starterTool: 'Scratch 3.0 & Godot / Roblox Studio',
      guide: 'Shifts attention from passive button-mashing to coordinate physics, sprite animation, jump velocity, and win-state triggers.',
    },
    {
      id: 'design',
      num: '04',
      title: 'Design',
      icon: Palette,
      desc: 'Turn ideas into posters, interfaces, illustrations and digital artwork.',
      examples: ['Posters', 'Logos', 'UI designs', 'Digital art', '3D concepts'],
      btnText: 'Explore Design',
      starterTool: 'Figma for Education & Tinkercad 3D',
      guide: 'Fosters visual balance, typography hierarchies, contrast ratios, and spatial awareness for both screen and print.',
    },
    {
      id: 'ai',
      num: '05',
      title: 'Create with AI',
      icon: Brain,
      desc: 'Use AI as a creative partner while keeping your own ideas and decisions at the center.',
      examples: ['Images', 'Stories', 'Presentations', 'Ideas', 'AI assistants', 'Creative experiments'],
      btnText: 'Explore AI Creation',
      starterTool: 'Google Teachable Machine & Prompt Canvas',
      guide: 'Children learn iterative prompt crafting, train custom machine learning classification models, and direct AI output creatively.',
    },
    {
      id: 'video',
      num: '06',
      title: 'Create Videos',
      icon: Video,
      desc: 'Turn ideas into short films, educational videos, animations and stories.',
      examples: ['Educational videos', 'Short films', 'Animation', 'Tutorials', 'Storytelling'],
      btnText: 'Explore Video',
      starterTool: 'CapCut Desktop & Stop Motion Studio',
      guide: 'Teaches narrative storyboarding, scene pacing, audio level balancing, and confident spoken presentation skills.',
    },
    {
      id: 'problem',
      num: '07',
      title: 'Solve a Problem',
      icon: Lightbulb,
      desc: 'Look around your home, school or community and find something technology could improve.',
      examples: [
        'Can we make studying easier?',
        'Can we help people find information?',
        'Can we reduce food waste?',
        'Can we make school activities easier?',
      ],
      btnText: 'Find a Problem',
      starterTool: 'Design Thinking Journal & Sticky Notes',
      guide: 'Empowers kids to interview family members, identify daily friction, and brainstorm practical technological solutions.',
    },
    {
      id: 'future',
      num: '08',
      title: 'Imagine the Future',
      icon: Rocket,
      desc: 'Explore robotics, AI, smart devices, automation and technologies that could change the world.',
      examples: ['Robot ideas', 'Smart home concepts', 'AI assistants', 'Environmental technology', 'Future transportation'],
      btnText: 'Imagine & Build',
      starterTool: 'Micro:bit & Tinker Robotics Simulators',
      guide: 'Hands-on electronic sensors, micro-controllers, solar-power telemetry, and speculative future invention prototyping.',
    },
  ];

  // 4 Creator Mindset Shifts
  const mindsetShifts = [
    {
      consumer: '“What can I watch?”',
      creator: '“What can I make?”',
      sub: 'Transforming passive viewing into purposeful digital craftsmanship.',
    },
    {
      consumer: '“What game should I play?”',
      creator: '“How was this game made?”',
      sub: 'Peeling back graphics to understand logic, collision math, and player psychology.',
    },
    {
      consumer: '“What should I search?”',
      creator: '“What problem can I solve?”',
      sub: 'Using the internet as an active research library to fix community pain points.',
    },
    {
      consumer: '“What can AI give me?”',
      creator: '“What can I create with AI?”',
      sub: 'Treating intelligent algorithms as apprentices rather than homework replacers.',
    },
  ];

  // 7 Beginner Project Ideas
  const projectIdeas = [
    {
      difficulty: 'EASY',
      diffColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      title: 'Make a Digital Poster',
      desc: 'Design an inspiring motivational poster for your bedroom wall or a school sports tournament.',
      learning: 'Color harmony, typography, and graphic layout composition.',
    },
    {
      difficulty: 'EASY',
      diffColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      title: 'Build a Quiz',
      desc: 'Create an interactive 5-question trivia game to test your family members about history or animals.',
      learning: 'Conditional branch logic (If/Else), scoring variables, and feedback.',
    },
    {
      difficulty: 'BEGINNER',
      diffColor: 'bg-teal-100 text-teal-900 border-teal-200',
      title: 'Create a Personal Website',
      desc: 'Publish a single-page digital portfolio showcasing your hobbies, favorite books, and drawings.',
      learning: 'HTML structure, web accessibility, and personal digital branding.',
    },
    {
      difficulty: 'BEGINNER',
      diffColor: 'bg-teal-100 text-teal-900 border-teal-200',
      title: 'Make a Simple Game',
      desc: 'Code a bouncing ball paddle game or maze escape with multiple collectible stars.',
      learning: 'X/Y Cartesian coordinates, collision loops, and game win-states.',
    },
    {
      difficulty: 'INTERMEDIATE',
      diffColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      title: 'Build a Study App',
      desc: 'Program a clean flashcard flipper with a 25-minute study focus timer for exam revision.',
      learning: 'Data state management, countdown intervals, and user experience.',
    },
    {
      difficulty: 'INTERMEDIATE',
      diffColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      title: 'Create an AI Assistant',
      desc: 'Train a vision classifier that recognizes whether your desk has a healthy fruit or water bottle.',
      learning: 'Computer vision, training dataset curation, and model confidence.',
    },
    {
      difficulty: 'ADVANCED',
      diffColor: 'bg-purple-100 text-purple-900 border-purple-200',
      title: 'Build a Real-World Solution',
      desc: 'Design an automated family grocery inventory tracker that prevents household food waste.',
      learning: 'Product architecture, real-world utility, and iterative user testing.',
    },
  ];

  const activePath = creationPaths.find((p) => p.id === selectedPathId);

  return (
    <section id="create" className="py-20 md:py-28 bg-[#FAFAF8] relative overflow-hidden border-b border-slate-200/80">
      {/* Background Soft Creative Aura */}
      <div className="absolute top-10 left-1/4 w-[800px] h-[500px] bg-gradient-to-b from-teal-100/35 via-indigo-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-50/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro (User specified) */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>FROM CONSUMER TO CREATOR</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12] text-balance">
            WHAT IF SCREEN TIME BECAME CREATION TIME?
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal text-balance">
            “A phone or laptop doesn't have to be only for watching and scrolling. Children can use
            technology to build, design, experiment, solve problems and create things of their own.”
          </p>
        </div>

        {/* HERO VISUAL (User specified) */}
        <div className="relative mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-16/9 md:aspect-21/9 bg-slate-900">
            {!imageError ? (
              <img
                src="/src/assets/images/young_creator_tech_1790897563072.jpg"
                alt="Focused child at desk coding and designing with floating creative technology icons"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-teal-950 to-slate-900 text-center text-white">
                <Laptop className="w-16 h-16 text-teal-400 mb-3" />
                <div className="font-display text-2xl font-bold">
                  CREATE — DON'T JUST CONSUME.
                </div>
                <div className="text-sm text-slate-300 mt-1">
                  Coding · Game Creation · App Creation · Design · AI · Video · Websites
                </div>
              </div>
            )}

            {/* Bottom Scrim & Statement */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5 text-teal-400" />
                  <span>The Creative Shift</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  “CREATE — DON'T JUST CONSUME.”
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  When young minds shift from passive scrolling to active building, technology becomes
                  a runway for confidence, spatial logic, and lifelong independence.
                </p>
              </div>

              {/* Floating Creative Disciplines */}
              <div className="hidden lg:flex flex-wrap gap-2 justify-end max-w-md">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">💻 Coding</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🎮 Game Creation</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">📱 App Creation</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🎨 Design</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🤖 AI</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🎬 Video</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🌐 Websites</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">💡 Ideas</span>
              </div>
            </div>
          </div>
        </div>

        {/* CREATION PATHS: Large Interactive Grid with 8 Paths (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-700">
              Eight Distinct Pathways
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              CREATION PATHS
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Every child's curiosity is unique. Select an area below to inspect beginner projects and tools:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creationPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-teal-700">
                        {path.num} — Track
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-teal-300 transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-2">
                      {path.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {path.desc}
                    </p>

                    <div className="mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Beginner Examples:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {path.examples.map((ex, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPathId(path.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white transition-all cursor-pointer mt-2"
                  >
                    <span>{path.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* THE CREATOR MINDSET: CHANGE THE QUESTION (User specified) */}
        <div className="my-20 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-teal-400 block mb-2">
                THE CREATOR MINDSET
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                “CHANGE THE QUESTION”
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                Curiosity shifts the moment children ask how technology works instead of passively absorbing it:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mindsetShifts.map((shift, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveQuestionTab(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeQuestionTab === idx
                      ? 'bg-slate-800 border-teal-400 shadow-md ring-1 ring-teal-400/40'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-rose-400 font-bold uppercase tracking-wider">Instead of:</span>
                    <span className="text-teal-400 font-extrabold uppercase tracking-wider">Ask:</span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-rose-900/40 text-xs text-rose-300 font-semibold line-through decoration-rose-500">
                      {shift.consumer}
                    </div>
                    <div className="p-2.5 rounded-xl bg-teal-950/70 border border-teal-500/50 text-xs sm:text-sm text-teal-200 font-extrabold">
                      {shift.creator}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    {shift.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PHONE → LAPTOP → FUTURE (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-700">
              The Hardware & Growth Progression
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              PHONE → LAPTOP → FUTURE
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              How children expand their digital horizons step-by-step:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Step 1: PHONE */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between text-center group hover:border-teal-300 transition-all">
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-display font-extrabold text-lg text-slate-950 mb-3">
                  PHONE
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
                  <div className="p-1.5 rounded-lg bg-slate-50">Learn</div>
                  <div className="p-1.5 rounded-lg bg-slate-50">Explore</div>
                  <div className="p-1.5 rounded-lg bg-slate-50">Create</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-teal-700">
                Mobile Foundation
              </div>
            </div>

            {/* Step 2: LAPTOP */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between text-center group hover:border-teal-300 transition-all">
              <div>
                <div className="text-3xl mb-2">💻</div>
                <h4 className="font-display font-extrabold text-lg text-slate-950 mb-3">
                  LAPTOP
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
                  <div className="p-1.5 rounded-lg bg-slate-50">Code</div>
                  <div className="p-1.5 rounded-lg bg-slate-50">Design</div>
                  <div className="p-1.5 rounded-lg bg-slate-50">Build</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-teal-700">
                Workstation Agency
              </div>
            </div>

            {/* Step 3: AI + TECHNOLOGY */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between text-center group hover:border-teal-300 transition-all">
              <div>
                <div className="text-3xl mb-2">🤖</div>
                <h4 className="font-display font-extrabold text-lg text-slate-950 mb-3">
                  AI + TECHNOLOGY
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
                  <div className="p-1.5 rounded-lg bg-slate-50">Experiment</div>
                  <div className="p-1.5 rounded-lg bg-slate-50">Solve</div>
                  <div className="p-1.5 rounded-lg bg-slate-50">Innovate</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-indigo-700">
                Augmented Power
              </div>
            </div>

            {/* Step 4: REAL-WORLD IMPACT */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col justify-between text-center group hover:bg-slate-950 transition-all">
              <div>
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-display font-extrabold text-lg text-white mb-3">
                  REAL-WORLD IMPACT
                </h4>
                <div className="space-y-1.5 text-xs text-slate-200 font-semibold">
                  <div className="p-1.5 rounded-lg bg-slate-800">Help</div>
                  <div className="p-1.5 rounded-lg bg-slate-800">Share</div>
                  <div className="p-1.5 rounded-lg bg-slate-800">Improve</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-bold text-teal-400">
                Lifelong Contribution
              </div>
            </div>
          </div>
        </div>

        {/* BEGINNER PROJECT IDEAS: START SMALL. BUILD SOMETHING REAL. (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-700">
              Low Floor, High Ceiling
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              START SMALL. BUILD SOMETHING REAL.
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Gentle starting points graded by difficulty to help children build momentum:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectIdeas.map((proj, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${proj.diffColor}`}
                    >
                      {proj.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Project #{i + 1}</span>
                  </div>

                  <h4 className="font-display font-extrabold text-lg text-slate-950 mb-2">
                    “{proj.title}”
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 block font-medium mb-0.5">Learning Focus:</span>
                  <span className="font-bold text-slate-900">{proj.learning}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHILD PROJECT JOURNEY: 5-Step Process (User specified) */}
        <div className="my-20 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-700">
              The 5-Step Path
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              CHILD PROJECT JOURNEY
            </h3>
            <p className="text-base text-teal-800 font-bold mt-2">
              “You don't have to know everything before you start.”
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80">
              <div className="text-2xl mb-1">💡</div>
              <div className="font-display font-black text-sm text-slate-950">1. IDEA</div>
              <div className="text-[11px] text-slate-600 mt-1">Spot a fun goal</div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80">
              <div className="text-2xl mb-1">🔎</div>
              <div className="font-display font-black text-sm text-slate-950">2. EXPLORE</div>
              <div className="text-[11px] text-slate-600 mt-1">See how others did it</div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
              <div className="text-2xl mb-1">🧠</div>
              <div className="font-display font-black text-sm text-slate-950">3. LEARN</div>
              <div className="text-[11px] text-slate-600 mt-1">Pick up 1 or 2 tools</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="text-2xl mb-1">🛠️</div>
              <div className="font-display font-black text-sm text-slate-950">4. BUILD</div>
              <div className="text-[11px] text-slate-600 mt-1">Make mistakes & iterate</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="text-2xl mb-1">🌍</div>
              <div className="font-display font-black text-sm text-slate-950">5. SHARE</div>
              <div className="text-[11px] text-slate-600 mt-1">Show family & friends</div>
            </div>
          </div>
        </div>

        {/* PARENT GUIDANCE: LET THEM EXPERIMENT (User specified) */}
        <div className="my-20 max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-teal-50/80 via-emerald-50/50 to-white border border-teal-200/90 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-teal-900">
              PARENT PERSPECTIVE
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase">
              Parent Guidance
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mb-3 tracking-tight">
            “LET THEM EXPERIMENT.”
          </h3>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
            “Children learn by trying, making mistakes, asking questions and building things. You
            don't need to know every technology yourself. Encourage curiosity, ask what they are
            making and celebrate the learning process.”
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/90 text-white border border-emerald-500/50">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block mb-1">
                ASK INSTEAD:
              </span>
              <span className="font-display text-base font-extrabold text-emerald-100">
                “What are you building?”
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block mb-1">
                INSTEAD OF:
              </span>
              <span className="text-sm text-slate-600 line-through decoration-rose-400">
                “Why are you always on the phone?”
              </span>
            </div>
          </div>
        </div>

        {/* IMPORTANT BALANCE (User specified) */}
        <div className="my-20 bg-[#FAFAF8] rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              Healthy Creative Boundaries
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              “CREATION SHOULD NOT MEAN MORE SCREEN TIME ALL DAY.”
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              “Use technology to create — then take the creation into the real world whenever possible.”
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <span className="text-xl">⚽</span>
              <div className="text-xs">
                <strong className="text-slate-900 block">Design a football poster</strong>
                <span className="text-teal-700 font-bold">→ Go play football outside with friends</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <span className="text-xl">🍲</span>
              <div className="text-xs">
                <strong className="text-slate-900 block">Create a food project or menu</strong>
                <span className="text-teal-700 font-bold">→ Cook something healthy with family</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <span className="text-xl">🎮</span>
              <div className="text-xs">
                <strong className="text-slate-900 block">Build a cooperative multiplayer game</strong>
                <span className="text-teal-700 font-bold">→ Practice real teamwork in board games or sports</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <span className="text-xl">🌱</span>
              <div className="text-xs">
                <strong className="text-slate-900 block">Create an environmental idea</strong>
                <span className="text-teal-700 font-bold">→ Plant trees or pick up litter in community</span>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA (User specified) */}
        <div className="text-center pt-6 max-w-2xl mx-auto">
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight mb-3">
            WHAT WILL YOU CREATE?
          </h3>

          <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
            “Your next idea could be a skill, a project, a business or a solution to a real problem.”
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsStarterModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-teal-700 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-base uppercase tracking-wider"
            >
              <span>START CREATING</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </button>

            <button
              onClick={onTakeChallenge}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 active:scale-98 transition-all duration-200 shadow-xs cursor-pointer text-base"
            >
              <span>TAKE THE 7-DAY CHALLENGE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Path Detail Modal */}
      {selectedPathId && activePath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPathId(null)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <activePath.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                  Track {activePath.num}
                </span>
                <h4 className="font-display font-extrabold text-xl text-slate-950">
                  {activePath.title}
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {activePath.guide}
            </p>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-1">
                Recommended Starter Tools:
              </div>
              <div className="font-display font-bold text-sm text-slate-950">
                {activePath.starterTool}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Project Ideas to Try:
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                {activePath.examples.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedPathId(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close & Explore Others
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Creating Project Launcher Modal */}
      {isStarterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsStarterModalOpen(false)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-xl text-slate-950">
                  Ready to Create?
                </h4>
                <p className="text-xs text-slate-500">Pick your first zero-cost creative project:</p>
              </div>
            </div>

            <div className="space-y-2 my-5">
              {[
                { label: 'Scratch 3.0 Game Studio', sub: 'Drag-and-drop code blocks for animations & games (Ages 7–14)' },
                { label: 'Canva for Youth Design', sub: 'Create custom sports posters, birthday cards & logos' },
                { label: 'Thunkable App Builder', sub: 'Visual block-based iOS & Android mobile app designer' },
                { label: 'Google Teachable Machine', sub: 'Train custom image and sound AI classifiers with webcam' },
              ].map((tool, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{tool.label}</span>
                    <span className="text-[11px] text-slate-500">{tool.sub}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 mb-5">
              💡 <strong>Parent Tip:</strong> Start with a 30-minute shared session, then encourage 30 minutes of real-world physical play outdoors!
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Free & Safe Starter Tools</span>
              <button
                onClick={() => setIsStarterModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold transition-colors cursor-pointer"
              >
                Let's Go!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
