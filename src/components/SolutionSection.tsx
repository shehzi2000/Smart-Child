import React, { useState } from 'react';
import {
  Gamepad2,
  Video,
  Palette,
  Code2,
  Brain,
  Activity,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Heart,
  CheckCircle2,
  Compass,
  X,
  Footprints,
  Trees,
  Apple,
  Users,
  Sun,
  Laptop,
} from 'lucide-react';

interface SolutionSectionProps {
  onExploreMore?: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = () => {
  const [selectedSkillModal, setSelectedSkillModal] = useState<string | null>(null);
  const [isPathFinderOpen, setIsPathFinderOpen] = useState(false);
  const [childInterest, setChildInterest] = useState<string>('gaming');
  const [parentImageError, setParentImageError] = useState(false);

  // Six Solution Cards data
  const solutionCards = [
    {
      id: 'gaming',
      number: '01',
      title: 'LOVE GAMING?',
      icon: Gamepad2,
      insteadOf: 'Only playing games',
      show: 'Learn game design',
      examples: ['Game design', 'Game logic', 'Basic coding', 'Storytelling', 'Level design'],
      buttonText: 'Explore Game Creation',
      color: 'teal',
      starterTool: 'Scratch 3.0 & Roblox Studio',
      detailText: 'Turn hours of tapping into hours of building. Children learn coordinate math, collision loops, and character storytelling by designing their own playable levels.',
    },
    {
      id: 'video',
      number: '02',
      title: 'LOVE WATCHING VIDEOS?',
      icon: Video,
      insteadOf: 'Endless watching',
      show: 'Learn to create videos',
      examples: ['Video editing', 'Storytelling', 'Animation', 'Educational videos', 'YouTube skills'],
      buttonText: 'Explore Video Creation',
      color: 'purple',
      starterTool: 'CapCut Desktop & Stop Motion Studio',
      detailText: 'Shift from a passive screen consumer to a digital director. Youth practice storyboarding, audio balancing, pacing, and clear verbal communication.',
    },
    {
      id: 'design',
      number: '03',
      title: 'LOVE DRAWING & DESIGN?',
      icon: Palette,
      insteadOf: 'Only consuming content',
      show: 'Become a digital creator',
      examples: ['Graphic design', 'Digital art', 'UI design', '3D design', 'Animation'],
      buttonText: 'Explore Design',
      color: 'amber',
      starterTool: 'Tinkercad 3D & Canva for Education',
      detailText: 'Transform phone doodles into high-value design literacy. Learn color theory, spatial composition, user interface wireframing, and 3D printing models.',
    },
    {
      id: 'tech',
      number: '04',
      title: 'LOVE TECHNOLOGY?',
      icon: Code2,
      insteadOf: 'Only using apps',
      show: 'Learn how apps work',
      examples: ['Coding', 'Website creation', 'App development', 'Automation', 'Problem solving'],
      buttonText: 'Explore Coding',
      color: 'blue',
      starterTool: 'Thunkable & Python Turtle',
      detailText: 'Demystify software engineering. Children discover how conditional logic, variables, and event listeners work behind their favorite mobile applications.',
    },
    {
      id: 'ai',
      number: '05',
      title: 'CURIOUS ABOUT AI?',
      icon: Brain,
      insteadOf: 'Using AI only for homework',
      show: 'Learn to create with AI',
      examples: ['AI research', 'Prompting', 'Image creation', 'Voice AI', 'AI applications', 'Critical thinking'],
      buttonText: 'Discover AI',
      color: 'indigo',
      starterTool: 'Google Teachable Machine & Prompt Playground',
      detailText: 'Train custom machine learning vision models with everyday objects, evaluate algorithm bias, and use AI as an artistic thinking partner.',
    },
    {
      id: 'active',
      number: '06',
      title: 'NEED A BREAK FROM SCREENS?',
      icon: Activity,
      insteadOf: 'Continuous indoor screen stare',
      show: 'Go from digital to physical.',
      examples: ['Football', 'Cricket', 'Cycling', 'Walking', 'Running', 'Outdoor games', 'Family activities'],
      buttonText: 'Get Active',
      color: 'emerald',
      starterTool: 'Outdoor Ball, Bicycle & Park Trails',
      detailText: 'Reset dopamine receptors with aerobic sport, fresh air, and sun exposure. Physical movement clears cognitive fatigue and improves sleep onset by 40%.',
    },
  ];

  // Active modal card for drill-down
  const activeCard = solutionCards.find((c) => c.id === selectedSkillModal);

  // Path finder recommendations
  const getPathRecommendation = (interest: string) => {
    switch (interest) {
      case 'gaming':
        return {
          title: 'From Gamer to Game Architect',
          step1: 'Download Scratch or Roblox Studio (Free & Safe)',
          step2: 'Build a 3-obstacle jumping course with your child',
          step3: 'Match with 45 minutes of backyard football or cycling',
          tool: 'Roblox Studio / Scratch 3.0',
        };
      case 'videos':
        return {
          title: 'From Video Viewer to Creator Director',
          step1: 'Pick a favorite animal or science fact to explain',
          step2: 'Create a 60-second stop-motion or edited mini-clip',
          step3: 'Screen-free family viewing night with popcorn',
          tool: 'CapCut Desktop / Stop Motion Studio',
        };
      case 'art':
        return {
          title: 'From Doodler to 3D & Digital Designer',
          step1: 'Open Tinkercad to design a personalized 3D keychain',
          step2: 'Experiment with digital color palettes and font styling',
          step3: 'Sketch outdoors in nature with physical paper & pencils',
          tool: 'Tinkercad / Canva Youth',
        };
      case 'coding':
        return {
          title: 'From App User to Software Builder',
          step1: 'Write first interactive Python turtle drawing script',
          step2: 'Create an automated quiz that challenges parents',
          step3: '30-minute nature walk to debug ideas away from screens',
          tool: 'Python for Beginners / Micro:bit',
        };
      default:
        return {
          title: 'Balanced Creator Roadmap',
          step1: 'Establish the 1:1 rule (1 hr digital creation = 1 hr sport)',
          step2: 'Explore prompt engineering with Teachable Machine',
          step3: 'Device-free dinner conversation celebrating creations',
          tool: 'Family Media Charter & Teachable Machine',
        };
    }
  };

  const pathResult = getPathRecommendation(childInterest);

  return (
    <section id="solution" className="py-20 md:py-28 bg-[#FAFAF8] relative overflow-hidden border-b border-slate-200/80">
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-teal-100/30 via-sky-50/40 to-emerald-50/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro (User specified) */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>THE SMART APPROACH</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12] text-balance">
            DON’T JUST REMOVE. REDIRECT.
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal text-balance">
            “When a child loves technology, taking the phone away is not always the best first step.
            Instead, we can gradually redirect that interest toward creativity, learning, physical
            activity and skills that can shape their future.”
          </p>
        </div>

        {/* MAIN VISUAL: Beautiful Interactive Transformation Pipeline (User specified) */}
        <div className="mb-20 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-700">
              The Evolution of Attention
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 mt-1">
              From Consumption to Real-World Mastery
            </h3>
          </div>

          {/* 4 Connected Stages with Animated Direction Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: PASSIVE SCREEN TIME */}
            <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col justify-between text-center relative group hover:border-rose-300 transition-all">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 block mb-2">
                  Phase 01
                </span>
                <h4 className="font-display text-base font-black text-slate-900 mb-2">
                  PASSIVE SCREEN TIME
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Watching endless autoplay feeds, repetitive mobile tapping, high stimulation with zero agency.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100 text-[11px] font-bold text-rose-700">
                Passive Consumer
              </div>
            </div>

            {/* Desktop Transition Arrow 1 */}
            <div className="hidden md:flex absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-900 text-teal-300 items-center justify-center shadow-md animate-pulse">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Step 2: PRODUCTIVE SCREEN TIME */}
            <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-200/90 flex flex-col justify-between text-center relative group hover:border-teal-400 transition-all">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-800 block mb-2">
                  Phase 02
                </span>
                <h4 className="font-display text-base font-black text-slate-900 mb-2">
                  PRODUCTIVE SCREEN TIME
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Using laptops and tablets to code games, edit videos, test AI prompts, and design 3D art.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-teal-200/80 text-[11px] font-bold text-teal-900">
                Active Creator
              </div>
            </div>

            {/* Desktop Transition Arrow 2 */}
            <div className="hidden md:flex absolute left-2/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-900 text-teal-300 items-center justify-center shadow-md animate-pulse">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Step 3: REAL-WORLD SKILLS */}
            <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200/90 flex flex-col justify-between text-center relative group hover:border-sky-400 transition-all">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-800 block mb-2">
                  Phase 03
                </span>
                <h4 className="font-display text-base font-black text-slate-900 mb-2">
                  REAL-WORLD SKILLS
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Problem solving, narrative communication, digital ethics, spatial geometry, and project discipline.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-200/80 text-[11px] font-bold text-sky-900">
                Transferable Intellect
              </div>
            </div>

            {/* Desktop Transition Arrow 3 */}
            <div className="hidden md:flex absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-900 text-teal-300 items-center justify-center shadow-md animate-pulse">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Step 4: A HEALTHIER FUTURE */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col justify-between text-center relative group shadow-md hover:bg-slate-950 transition-all">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 block mb-2">
                  Phase 04
                </span>
                <h4 className="font-display text-base font-black text-white mb-2">
                  A HEALTHIER FUTURE
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Confidence with modern AI tools, balanced physical vitality, healthy sleep, and future career readiness.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-bold text-teal-300">
                Thriving Balance
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: TURN INTEREST INTO SKILLS (Six Cards - User specified) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-700">
              Personalized Redirection
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1 text-balance">
              TURN INTEREST INTO SKILLS
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 text-balance">
              Every favorite mobile pastime hides a productive superpower. Choose your child's passion
              to see how to redirect it gently.
            </p>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Index and Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-teal-700">
                        {card.number} — Shift
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-teal-300 transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h4 className="font-display text-xl font-extrabold text-slate-950 mb-3 tracking-tight">
                      {card.title}
                    </h4>

                    {/* Instead of / Show Contrast Block */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-4 space-y-1.5 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 shrink-0">
                          Instead of
                        </span>
                        <span className="text-slate-600 line-through decoration-rose-300">
                          “{card.insteadOf}”
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                          Show
                        </span>
                        <span className="font-bold text-slate-950">
                          “{card.show}”
                        </span>
                      </div>
                    </div>

                    {/* Examples List */}
                    <div className="mb-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Skills & Activities:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {card.examples.map((ex, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-700 font-medium"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Button */}
                  <button
                    onClick={() => setSelectedSkillModal(card.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-4 h-4 text-teal-500" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* IMPORTANT PHILOSOPHY SECTION (User specified) */}
        <div className="my-20 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            {/* Highlighted Statement 1 */}
            <div className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              “TECHNOLOGY SHOULD NOT REPLACE CHILDHOOD.”
            </div>

            {/* Statement 2 */}
            <div className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-400 tracking-tight mt-2 mb-4">
              “IT SHOULD HELP CHILDREN BUILD A BETTER FUTURE.”
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-10 max-w-2xl mx-auto">
              “Children need both worlds — the digital world and the real world.”
            </p>

            {/* Two Sides with Center Balance Bridge */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              {/* Left Side: DIGITAL WORLD */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-left">
                <div className="flex items-center gap-2 text-teal-400 font-display font-black text-sm uppercase tracking-wider mb-3">
                  <Laptop className="w-4 h-4" />
                  <span>DIGITAL WORLD</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> AI</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Coding</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Design</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Creativity</span>
                  <span className="flex items-center gap-1.5 col-span-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Learning</span>
                </div>
              </div>

              {/* Center Element: BALANCE */}
              <div className="md:col-span-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-teal-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg my-1">
                  +
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-300 mt-1">
                  BALANCE
                </span>
              </div>

              {/* Right Side: REAL WORLD */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-left">
                <div className="flex items-center gap-2 text-emerald-400 font-display font-black text-sm uppercase tracking-wider mb-3">
                  <Sun className="w-4 h-4" />
                  <span>REAL WORLD</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sports</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Friends</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Family</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Nature</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Movement</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Healthy Food</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PARENT GUIDANCE: TRY THIS INSTEAD (User specified) */}
        <div className="my-20 rounded-3xl p-6 sm:p-10 bg-white border border-slate-200/90 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Dialogues */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Heart className="w-3.5 h-3.5 text-teal-600" />
                <span>Parent Coaching Formula</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
                “TRY THIS INSTEAD”
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Replace abrupt confiscation arguments with gentle redirection. Here are three tested
                dialogue scripts that turn pushback into curiosity:
              </p>

              <div className="space-y-4">
                {/* Dialogue 1: Gaming */}
                <div className="p-4 rounded-2xl bg-[#FBFBFA] border border-slate-200/80">
                  <div className="text-xs text-rose-700 font-semibold mb-1">
                    <strong>Child:</strong> “I want to play games.”
                  </div>
                  <div className="text-xs sm:text-sm text-teal-950 font-bold">
                    <strong>Parent:</strong> “Let's play for a while, and then I'll show you how games are actually made.”
                  </div>
                </div>

                {/* Dialogue 2: Videos */}
                <div className="p-4 rounded-2xl bg-[#FBFBFA] border border-slate-200/80">
                  <div className="text-xs text-rose-700 font-semibold mb-1">
                    <strong>Child:</strong> “I want to watch YouTube.”
                  </div>
                  <div className="text-xs sm:text-sm text-teal-950 font-bold">
                    <strong>Parent:</strong> “Choose one thing you want to learn from it, then let's create something.”
                  </div>
                </div>

                {/* Dialogue 3: AI */}
                <div className="p-4 rounded-2xl bg-[#FBFBFA] border border-slate-200/80">
                  <div className="text-xs text-rose-700 font-semibold mb-1">
                    <strong>Child:</strong> “I want to use AI.”
                  </div>
                  <div className="text-xs sm:text-sm text-teal-950 font-bold">
                    <strong>Parent:</strong> “Great. Let's learn how to use it responsibly and creatively.”
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual illustration */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/9 lg:aspect-4/3 bg-slate-100 relative shadow-md">
                {!parentImageError ? (
                  <img
                    src="/src/assets/images/parent_child_redirect_1790871508407.jpg"
                    alt="Parent and child happily collaborating at a laptop exploring creative digital skills"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                    onError={() => setParentImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-teal-50 text-center">
                    <Heart className="w-10 h-10 text-teal-700 mb-2" />
                    <div className="font-bold text-slate-900 text-sm">Parent & Child Teamwork</div>
                    <div className="text-xs text-slate-500 mt-1">Guiding screen curiosity toward future creation</div>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4">
                  <div className="text-white text-xs font-semibold">
                    Collaboration over confrontation · Positive guidance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CTA: WHAT DOES YOUR CHILD LOVE? (User specified) */}
        <div className="text-center pt-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>Interactive Pathway Discovery</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-3">
            WHAT DOES YOUR CHILD LOVE?
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
            “Tell us what interests your child, and we'll help turn that interest into a productive
            activity.”
          </p>

          <button
            onClick={() => setIsPathFinderOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-teal-700 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-base uppercase tracking-wider"
          >
            <span>FIND THEIR PATH</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>
        </div>
      </div>

      {/* Interactive Drilldown Modal for Individual Skill Cards */}
      {selectedSkillModal && activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedSkillModal(null)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <activeCard.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                  {activeCard.number} — Redirection Blueprint
                </span>
                <h4 className="font-display font-extrabold text-xl text-slate-950">
                  {activeCard.title}
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {activeCard.detailText}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Recommended Starter Tool
              </div>
              <div className="font-display font-bold text-sm text-teal-900">
                {activeCard.starterTool}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Topics Covered:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeCard.examples.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-lg bg-teal-50 text-teal-900 font-semibold"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSkillModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Path Finder Modal (Triggered by FIND THEIR PATH button) */}
      {isPathFinderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsPathFinderOpen(false)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-xl text-slate-950">
                  Find Your Child's Path
                </h4>
                <p className="text-xs text-slate-500">
                  Choose what your child spends the most screen time on:
                </p>
              </div>
            </div>

            {/* Interest Selector Buttons */}
            <div className="grid grid-cols-2 gap-2 my-4">
              {[
                { id: 'gaming', label: 'Video Games' },
                { id: 'videos', label: 'YouTube / Clips' },
                { id: 'art', label: 'Drawing & Doodles' },
                { id: 'coding', label: 'Apps & Tech' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setChildInterest(item.id)}
                  className={`p-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    childInterest === item.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Recommended 3-Step Roadmap */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 my-4 text-left">
              <div className="text-xs font-black uppercase tracking-wider text-teal-900 mb-2">
                {pathResult.title}
              </div>

              <div className="space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <span>{pathResult.step1}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <span>{pathResult.step2}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="font-semibold text-emerald-950">{pathResult.step3}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Free starter guidance</span>
              <button
                onClick={() => setIsPathFinderOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
