import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Bot,
  Code2,
  Palette,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Compass,
  Zap,
  Globe,
  Users,
  Cpu,
  Layers,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface DiscoverAiSectionProps {
  onStartCreating: () => void;
}

export const DiscoverAiSection: React.FC<DiscoverAiSectionProps> = ({ onStartCreating }) => {
  const [imageError, setImageError] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [selectedCreationIdea, setSelectedCreationIdea] = useState<string>('game');

  // What is AI Examples
  const aiExamples = [
    { emoji: '🗣️', name: 'Voice Assistants', desc: 'Understanding spoken questions and responding in natural language.' },
    { emoji: '🖼️', name: 'Image Generation', desc: 'Transforming text descriptions into custom digital illustrations.' },
    { emoji: '💻', name: 'Coding Assistants', desc: 'Explaining functions, fixing bugs, and suggesting starter code.' },
    { emoji: '📚', name: 'Learning Assistants', desc: 'Breaking down math, science, and history concepts into easy steps.' },
    { emoji: '🎬', name: 'Video Tools', desc: 'Generating captions, audio voiceovers, and storyboard animations.' },
    { emoji: '🤖', name: 'Robotics', desc: 'Guiding robotic sensors to navigate obstacles and automate tasks.' },
    { emoji: '🔎', name: 'Research Tools', desc: 'Synthesizing knowledge and finding answers across vast libraries.' },
    { emoji: '🌐', name: 'Translation', desc: 'Bridging languages so children around the world can communicate.' },
  ];

  // 6 Productive Ways
  const productiveWays = [
    {
      num: '01',
      title: 'LEARN',
      icon: BookOpen,
      desc: 'Use AI to explain difficult concepts, practice languages and explore new subjects.',
      color: 'teal',
      tag: 'Academic Mastery',
    },
    {
      num: '02',
      title: 'CREATE',
      icon: Sparkles,
      desc: 'Use AI for ideas, stories, illustrations, presentations and creative projects.',
      color: 'purple',
      tag: 'Original Expression',
    },
    {
      num: '03',
      title: 'CODE',
      icon: Code2,
      desc: 'Learn programming concepts and build simple websites, games and applications.',
      color: 'blue',
      tag: 'Computational Thinking',
    },
    {
      num: '04',
      title: 'RESEARCH',
      icon: Search,
      desc: 'Ask questions, compare ideas and learn how to verify information using reliable sources.',
      color: 'amber',
      tag: 'Fact Verification',
    },
    {
      num: '05',
      title: 'DESIGN',
      icon: Palette,
      desc: 'Explore graphic design, UI design, animation and digital creativity.',
      color: 'pink',
      tag: 'Visual Literacy',
    },
    {
      num: '06',
      title: 'SOLVE PROBLEMS',
      icon: Lightbulb,
      desc: 'Use AI as a brainstorming partner to break difficult problems into smaller steps.',
      color: 'emerald',
      tag: 'Critical Reasoning',
    },
  ];

  // AI + Creativity Transformations
  const creativityExamples = [
    {
      childWish: '“I have an idea for a game.”',
      aiHelp: 'AI helps with brainstorming mechanics, rules, and level layouts.',
      childAction: 'Child designs the game in Scratch or Roblox Studio with original art.',
      outcome: 'Game Design & Spatial Architecture',
    },
    {
      childWish: '“I want to make an app.”',
      aiHelp: 'AI explains code snippets, button event listeners, and data loops.',
      childAction: 'Child builds, tests, and refines the interactive app.',
      outcome: 'Computer Science & Software Logic',
    },
    {
      childWish: '“I want to create a story.”',
      aiHelp: 'AI generates plot twists, villain motives, and fantasy creature lore.',
      childAction: 'Child writes the dialogue, illustrates scenes, and edits the ending.',
      outcome: 'Creative Writing & Narrative Empathy',
    },
    {
      childWish: '“I want to make art.”',
      aiHelp: 'AI explores color palettes, retro cyberpunk styles, and watercolor ideas.',
      childAction: 'Child develops their own distinct aesthetic on paper and digital canvas.',
      outcome: 'Fine Arts & Aesthetic Direction',
    },
  ];

  // Future Areas (10 Badges)
  const futureAreas = [
    { emoji: '🤖', name: 'Artificial Intelligence' },
    { emoji: '💻', name: 'Software Engineering' },
    { emoji: '🧬', name: 'Biotechnology' },
    { emoji: '🚀', name: 'Robotics & Aerospace' },
    { emoji: '🎨', name: 'Digital Design' },
    { emoji: '🏥', name: 'Health Technology' },
    { emoji: '🌱', name: 'Climate Technology' },
    { emoji: '🎓', name: 'Education Technology' },
    { emoji: '🎮', name: 'Games & Interactive Media' },
    { emoji: '💼', name: 'Entrepreneurship' },
  ];

  // Child Creation Ideas
  const creationOptions = [
    { id: 'app', emoji: '💡', title: 'Invent an app idea', desc: 'Design an app that helps classmates organize homework or share books.' },
    { id: 'game', emoji: '🎮', title: 'Design a game idea', desc: 'Craft a 2D eco-adventure where players plant forests to save animals.' },
    { id: 'poster', emoji: '🎨', title: 'Create a digital poster', desc: 'Combine AI color ideas with original typography for a school sports gala.' },
    { id: 'story', emoji: '📖', title: 'Write a short story', desc: 'Co-write a mystery story set in a futuristic solar-powered city.' },
    { id: 'local', emoji: '🌍', title: 'Solve a local problem', desc: 'Brainstorm how smart sensors could reduce neighborhood water waste.' },
    { id: 'bot', emoji: '🤖', title: 'Design a helpful AI assistant', desc: 'Outline the personality and rules for a friendly science tutor bot.' },
  ];

  return (
    <section id="discover-ai" className="py-20 md:py-28 bg-white relative overflow-hidden border-b border-slate-200/80">
      {/* Background Soft Futuristic Glows */}
      <div className="absolute top-10 right-1/4 w-[750px] h-[500px] bg-gradient-to-b from-indigo-100/30 via-teal-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-50/25 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro (User specified) */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Brain className="w-3.5 h-3.5 text-indigo-600" />
            <span>THE FUTURE IS ALREADY HERE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12] text-balance">
            DON'T JUST USE AI. LEARN TO CREATE WITH IT.
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal text-balance">
            “Artificial intelligence is changing how people learn, work, create and solve problems.
            Children don't need to be afraid of AI — they need to learn how to use it safely,
            creatively and intelligently.”
          </p>
        </div>

        {/* HERO AI VISUAL (User specified) */}
        <div className="relative mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-16/9 md:aspect-21/9 bg-slate-950">
            {!imageError ? (
              <img
                src="/src/assets/images/child_exploring_ai_1790897275490.jpg"
                alt="Curious child exploring AI with laptop, robotics, and creative digital sketchpad in a warm modern space"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-950 to-slate-900 text-center text-white">
                <Brain className="w-16 h-16 text-teal-400 mb-3" />
                <div className="font-display text-2xl font-bold">
                  Curious, Creative & Confident with AI
                </div>
                <div className="text-sm text-slate-300 mt-1">
                  AI Assistant · Robotics · Coding · Digital Art · Critical Thinking
                </div>
              </div>
            )}

            {/* Bottom Scrim & Message */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5 text-teal-400" />
                  <span>Human-Centered Intelligence</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  “Curious and creative — never dependent.”
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  AI gives children a collaborator for brainstorming and prototyping, while human
                  heart, morality, and creative decision-making remain in charge.
                </p>
              </div>

              {/* Futuristic Floating Badges */}
              <div className="hidden lg:flex flex-wrap gap-2 justify-end max-w-sm">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🤖 Assistant</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">💻 Coding</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🎨 Digital Art</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🗣️ Voice AI</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🚀 Robotics</span>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT IS AI? (User specified) */}
        <div className="my-20 bg-[#FAFAF8] rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-700">
              Clear & Simple Explanation
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              SO, WHAT IS AI?
            </h3>
            <p className="text-base sm:text-lg text-slate-700 mt-3 font-medium leading-relaxed">
              “AI is technology that can recognize patterns, understand information, generate content
              and help people solve problems.”
            </p>
          </div>

          {/* 8 Child-Friendly Examples Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aiExamples.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <h4 className="font-display font-extrabold text-xs sm:text-sm text-slate-950 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI IS A TOOL — NOT A REPLACEMENT FOR THINKING (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-800">
              Intellectual Integrity
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1 text-balance">
              “USE AI TO THINK BETTER — NOT TO STOP THINKING.”
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed text-balance">
              “AI can give ideas, explanations and suggestions, but children should still ask
              questions, check information, think critically and make their own decisions.”
            </p>
          </div>

          {/* Visual Comparison: Bad Use vs Good Use */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* BAD USE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/50 border border-rose-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-800">
                    Passive Trap
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">
                    BAD USE
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-slate-900 mb-6">
                  Bypassing the Brain
                </h4>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white border border-rose-100 text-center font-display text-xs sm:text-sm font-bold text-slate-700">
                    QUESTION
                  </div>
                  <div className="flex justify-center text-rose-500 font-bold text-sm">↓</div>
                  <div className="p-3.5 rounded-xl bg-white border border-rose-100 text-center font-display text-xs sm:text-sm font-bold text-slate-700">
                    COPY AI ANSWER
                  </div>
                  <div className="flex justify-center text-rose-500 font-bold text-sm">↓</div>
                  <div className="p-3.5 rounded-xl bg-white border border-rose-100 text-center font-display text-xs sm:text-sm font-bold text-slate-700">
                    SUBMIT
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs text-rose-800 font-semibold">
                Result: Zero understanding retained, dependency created, thinking outsourced.
              </div>
            </div>

            {/* GOOD USE */}
            <div className="p-6 sm:p-8 rounded-3xl bg-teal-50/60 border border-teal-200 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-teal-800">
                    Active Thinking Pipeline
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[10px] font-black uppercase">
                    GOOD USE
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-slate-900 mb-6">
                  Amplifying Original Intellect
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-white border border-teal-100 font-display text-xs font-black text-slate-900">
                    QUESTION
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-teal-100 font-display text-xs font-black text-teal-800">
                    ASK AI
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-teal-100 font-display text-xs font-black text-slate-900">
                    UNDERSTAND
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-teal-100 font-display text-xs font-black text-teal-800">
                    CHECK
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-teal-100 font-display text-xs font-black text-slate-900">
                    THINK
                  </div>
                  <div className="p-3 rounded-xl bg-teal-600 text-white font-display text-xs font-black shadow-xs">
                    CREATE
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-teal-200 text-xs text-teal-900 font-semibold">
                Result: Deep conceptual mastery, verification habits, original creative projects.
              </div>
            </div>
          </div>
        </div>

        {/* 6 WAYS CHILDREN CAN USE AI PRODUCTIVELY (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-700">
              Practical Applications
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              6 WAYS CHILDREN CAN USE AI PRODUCTIVELY
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Transforming passive screen moments into active creation and learning:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productiveWays.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-indigo-700">
                        {item.num}
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-teal-300 transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-2">
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Outcome:</span>
                    <span className="font-bold text-indigo-900">{item.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI + CHILD CREATIVITY (User specified) */}
        <div className="my-20 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-800">
              The Creative Superpower
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              “AI CAN AMPLIFY CREATIVITY.”
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              “AI should be a creative partner — not a replacement for creativity.”
            </p>
          </div>

          {/* Transformation Pipeline:
              IDEA ↓ AI ASSISTANCE ↓ CHILD'S CREATIVITY ↓ PROJECT ↓ REAL-WORLD SKILL */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#FAFAF8] border border-slate-200 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs font-bold text-slate-800 items-center">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block uppercase">Step 1</span>
                IDEA
              </div>
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900">
                <span className="text-[10px] text-teal-600 block uppercase">Step 2</span>
                AI ASSISTANCE
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block uppercase">Step 3</span>
                CHILD'S CREATIVITY
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900">
                <span className="text-[10px] text-indigo-600 block uppercase">Step 4</span>
                PROJECT
              </div>
              <div className="p-3 rounded-xl bg-slate-900 text-white font-extrabold">
                <span className="text-[10px] text-teal-400 block uppercase">Result</span>
                REAL-WORLD SKILL
              </div>
            </div>
          </div>

          {/* Interactive Examples Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {creativityExamples.map((ex, i) => (
              <div
                key={i}
                onClick={() => setSelectedExampleIndex(i)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedExampleIndex === i
                    ? 'bg-teal-50/80 border-teal-300 shadow-xs ring-2 ring-teal-200/50'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="font-display font-extrabold text-sm text-slate-950 mb-2">
                  {ex.childWish}
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>
                    <span className="text-teal-700 font-bold">→ </span>
                    {ex.aiHelp}
                  </div>
                  <div>
                    <span className="text-indigo-700 font-bold">→ </span>
                    <strong className="text-slate-900">{ex.childAction}</strong>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-teal-800">
                  Skill Built: {ex.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI SAFETY: LEARN AI. USE IT SAFELY. (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-800">
              Essential Digital Guardrails
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              LEARN AI. USE IT SAFELY.
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Four fundamental rules every child and parent should know:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: PRIVACY */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-display font-extrabold text-base text-slate-950 mb-2">
                  🔐 PRIVACY
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  “Never share passwords, private information or sensitive family details with AI tools.”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-rose-700">
                Safe data protection
              </div>
            </div>

            {/* Card 2: THINK CRITICALLY */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="font-display font-extrabold text-base text-slate-950 mb-2">
                  🧠 THINK CRITICALLY
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  “AI can make mistakes. Don't automatically believe everything it says.”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700">
                Fact verification habit
              </div>
            </div>

            {/* Card 3: HUMAN DECISIONS */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-display font-extrabold text-base text-slate-950 mb-2">
                  👤 HUMAN DECISIONS
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  “Important decisions should involve trusted adults and qualified professionals when appropriate.”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-indigo-700">
                Adult guidance always
              </div>
            </div>

            {/* Card 4: KIND & RESPONSIBLE */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-display font-extrabold text-base text-slate-950 mb-2">
                  🤝 KIND & RESPONSIBLE
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  “Use AI to create, learn and help — never to harm, bully or deceive others.”
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
                Ethical digital citizenship
              </div>
            </div>
          </div>
        </div>

        {/* AI AND THE FUTURE: WHAT WILL WORK LOOK LIKE WHEN YOU GROW UP? (User specified) */}
        <div className="my-20 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-teal-400 block mb-2">
              LOOKING AHEAD
            </span>

            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              “WHAT WILL WORK LOOK LIKE WHEN YOU GROW UP?”
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal mb-8 text-balance">
              “Some jobs will change. Some new jobs will appear. The most valuable skills will
              increasingly include creativity, communication, problem solving, critical thinking,
              adaptability and the ability to work with technology.”
            </p>

            {/* 10 Future Areas Badges */}
            <div className="flex flex-wrap gap-2.5 justify-center max-w-3xl mx-auto mb-10">
              {futureAreas.map((area, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>{area.emoji}</span>
                  <span>{area.name}</span>
                </span>
              ))}
            </div>

            {/* AI Future Timeline */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 max-w-3xl mx-auto text-left">
              <div className="text-xs font-black uppercase tracking-widest text-teal-400 mb-4 text-center">
                CONCEPTUAL ADAPTATION TIMELINE
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs font-black uppercase text-teal-300 mb-1">TODAY</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>• AI assistants</div>
                    <div>• Image generation</div>
                    <div>• Voice AI</div>
                    <div>• Coding assistants</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs font-black uppercase text-indigo-300 mb-1">NEXT</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>• AI-powered education</div>
                    <div>• Robotics</div>
                    <div>• Personalized learning</div>
                    <div>• Creative tools</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs font-black uppercase text-purple-300 mb-1">FUTURE</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>• New careers</div>
                    <div>• New industries</div>
                    <div>• Human + AI collaboration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMPORTANT MESSAGE (User specified) */}
        <div className="my-20 p-8 sm:p-12 rounded-3xl bg-[#FAFAF8] text-center border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
          <div className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-2 text-balance">
            “THE FUTURE BELONGS TO CHILDREN WHO CAN THINK, CREATE AND ADAPT.”
          </div>

          <p className="text-base sm:text-lg text-teal-800 font-semibold mt-2">
            “AI is powerful. Human curiosity is powerful too.”
          </p>
        </div>

        {/* PARENT SECTION (User specified) */}
        <div className="my-20 max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-indigo-50/70 via-teal-50/60 to-white border border-indigo-200/90 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-950">
              FOR PARENTS
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase">
              Mindset Question
            </span>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-rose-700 mb-1">
            DON'T ONLY ASK:
          </div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-800 mb-3">
            “HOW MUCH AI IS MY CHILD USING?”
          </h4>

          <div className="text-xs sm:text-sm font-semibold text-teal-800 mb-1">
            INSTEAD, ASK:
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mb-6">
            “WHAT IS MY CHILD LEARNING, CREATING AND UNDERSTANDING WITH IT?”
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mb-2">1</span>
              <div className="font-bold text-xs text-slate-950 mb-1">Explore AI together.</div>
              <p className="text-[11px] text-slate-500">Sit side-by-side to experiment with creative prompts and discuss answers.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mb-2">2</span>
              <div className="font-bold text-xs text-slate-950 mb-1">Ask them to explain.</div>
              <p className="text-[11px] text-slate-500">Have your child teach you what the AI explained to verify their comprehension.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mb-2">3</span>
              <div className="font-bold text-xs text-slate-950 mb-1">Encourage creation.</div>
              <p className="text-[11px] text-slate-500">Direct AI outputs toward making real projects instead of passive consumption.</p>
            </div>
          </div>
        </div>

        {/* CHILD CHALLENGE: YOUR FIRST AI CREATION (User specified) */}
        <div className="my-20 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-800">
              Interactive Starter Prompt
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              YOUR FIRST AI CREATION
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Choose one project idea to ignite your child's creative journey:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {creationOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelectedCreationIdea(opt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCreationIdea === opt.id
                    ? 'bg-indigo-50/80 border-indigo-300 shadow-xs ring-2 ring-indigo-200'
                    : 'bg-[#FBFBFA] border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-2xl mb-1">{opt.emoji}</div>
                  <h4 className="font-display font-extrabold text-sm text-slate-950 mb-1">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-bold text-indigo-700">
                  {selectedCreationIdea === opt.id ? '✓ Selected Challenge' : 'Select'}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onStartCreating}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-indigo-700 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-sm uppercase tracking-wider"
            >
              <span>START CREATING</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </button>
          </div>
        </div>

        {/* FINAL CTA (User specified) */}
        <div className="text-center pt-6 max-w-2xl mx-auto">
          <div className="font-display text-xl sm:text-2xl font-black text-slate-800 mb-1">
            “YOUR FUTURE DOESN'T HAVE TO BE BUILT BY AI.”
          </div>

          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-teal-700 to-indigo-900 tracking-tight mb-4">
            “LEARN TO BUILD IT WITH AI.”
          </h3>

          <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
            “Start with curiosity. Learn the tools. Keep thinking. Keep creating.”
          </p>

          <button
            onClick={onStartCreating}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-teal-700 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-base uppercase tracking-wider"
          >
            <span>EXPLORE CREATION</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
