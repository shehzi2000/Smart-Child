import React, { useState } from 'react';
import {
  Smartphone,
  Activity,
  Apple,
  Users,
  ArrowRight,
  Sparkles,
  Heart,
  Sliders,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Code2,
  Tv,
  Gamepad2,
  Layers,
  Flame,
} from 'lucide-react';

interface UnderstandSectionProps {
  onDiscoverSolution: () => void;
}

export const UnderstandSection: React.FC<UnderstandSectionProps> = ({ onDiscoverSolution }) => {
  // State for interactive screen hours tracker on Card 1
  const [screenHours, setScreenHours] = useState<number>(3.5);

  // State for interactive movement toggle on Card 2
  const [movementMode, setMovementMode] = useState<'screen' | 'move'>('move');

  // State for interactive snack choice on Card 3
  const [activeSnackIndex, setActiveSnackIndex] = useState<number>(0);

  // State for interactive redirect transformation in Parent Card
  const [activeRedirectIndex, setActiveRedirectIndex] = useState<number>(0);

  // Fallback for real-world photo
  const [familyImageError, setFamilyImageError] = useState(false);

  const snackComparisons = [
    {
      junk: 'Salty bag of chips during video autoplay',
      healthy: 'Crisp apple slices with a spoonful of peanut butter',
      note: 'Prevents afternoon blood sugar crashes and sustains steady mental focus.',
    },
    {
      junk: 'Sugary soda or energy drinks during gaming',
      healthy: 'Chilled berry & lemon infused water flask',
      note: 'Hydrates neurons naturally without caffeine agitation or sleep delay.',
    },
    {
      junk: 'Unconscious candy grazing in front of screens',
      healthy: 'Crunchy carrot & cucumber sticks with light hummus',
      note: 'Rich in vitamins and fiber, keeping young minds refreshed.',
    },
  ];

  const redirectTransformations = [
    {
      from: 'WATCH',
      to: 'CREATE',
      fromIcon: Tv,
      toIcon: Code2,
      example: 'Instead of watching 2 hours of gameplay streams → Design a custom 2D obstacle level in Scratch.',
      skill: 'Spatial logic & game mechanics',
    },
    {
      from: 'PLAY',
      to: 'BUILD',
      fromIcon: Gamepad2,
      toIcon: Layers,
      example: 'Instead of repetitive mobile matches → Build a personalized 3D virtual room in Roblox Studio.',
      skill: '3D geometry & environmental design',
    },
    {
      from: 'SCROLL',
      to: 'LEARN',
      fromIcon: Smartphone,
      toIcon: Sparkles,
      example: 'Instead of endless short video doomscrolling → Explore a 15-minute interactive AI astronomy simulation.',
      skill: 'Scientific inquiry & prompt design',
    },
    {
      from: 'CONSUME',
      to: 'CREATE',
      fromIcon: Activity,
      toIcon: Heart,
      example: 'Instead of absorbing passive algorithm feeds → Record a fun podcast story or animate a digital comic.',
      skill: 'Narrative storytelling & visual art',
    },
  ];

  return (
    <section id="understand" className="py-20 md:py-28 bg-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Background Soft Glow Gradients */}
      <div className="absolute top-0 right-1/4 w-[720px] h-[480px] bg-gradient-to-b from-teal-50/40 via-sky-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-50/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Intro (User specified) */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>UNDERSTAND THE CHANGE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12] text-balance">
            WHEN SCREEN TIME STARTS REPLACING REAL LIFE
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal text-balance">
            “Phones, tablets and laptops can be powerful tools for learning and creativity. But when
            screen time begins to replace movement, sleep, healthy food, family time and real-world
            experiences, children can lose an important part of a balanced childhood.”
          </p>
        </div>

        {/* Four Cards Grid (User specified) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {/* CARD 1: TOO MUCH SCREEN TIME */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FBFBFA] border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* Small visual indicator: Passive → Active */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200/60">
                  <span>Passive</span>
                  <span className="text-teal-400">→</span>
                  <span className="text-teal-700">Active</span>
                </span>

                <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center transition-colors group-hover:bg-teal-600 group-hover:text-white shadow-2xs">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 mb-2">
                TOO MUCH SCREEN TIME
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                “Long periods of passive scrolling, watching and gaming can take time away from other
                important activities.”
              </p>
            </div>

            {/* Visual: Phone with gradually increasing screen-time indicators */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-600" />
                  <span>Screen Usage Indicator:</span>
                </span>
                <span className="font-mono text-xs sm:text-sm px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-900 font-semibold">
                  {screenHours.toFixed(1)} hrs/day
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="6"
                step="0.5"
                value={screenHours}
                onChange={(e) => setScreenHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600 mb-3"
              />

              {/* Progress bar visual */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    screenHours <= 2
                      ? 'bg-teal-500'
                      : screenHours <= 4
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${(screenHours / 6) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">1h (Creative)</span>
                <span
                  className={`font-semibold ${
                    screenHours <= 2
                      ? 'text-teal-700'
                      : screenHours <= 4
                      ? 'text-amber-700'
                      : 'text-rose-700'
                  }`}
                >
                  {screenHours <= 2
                    ? 'Active creation mode'
                    : screenHours <= 4
                    ? 'Encroaching on outdoor play'
                    : 'Displacing sleep & real life'}
                </span>
                <span className="text-slate-400">6h+</span>
              </div>
            </div>
          </div>

          {/* CARD 2: LESS MOVEMENT */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FBFBFA] border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* Small visual indicator: Screen → Move */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
                  <span>Screen</span>
                  <span className="text-emerald-400">→</span>
                  <span className="text-emerald-700">Move</span>
                </span>

                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center transition-colors group-hover:bg-emerald-600 group-hover:text-white shadow-2xs">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 mb-2">
                LESS MOVEMENT
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                “Time spent sitting with a device can replace walking, sports, outdoor play and active
                movement.”
              </p>
            </div>

            {/* Visual: Subtle contrast between child sitting with device vs playing outdoors */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700">Body Routine Comparison:</span>
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setMovementMode('screen')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      movementMode === 'screen'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Sitting with Phone
                  </button>
                  <button
                    onClick={() => setMovementMode('move')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      movementMode === 'move'
                        ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Outdoor Sports
                  </button>
                </div>
              </div>

              {movementMode === 'screen' ? (
                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      Sedentary Screen Stance
                    </span>
                    <span className="text-slate-600 leading-relaxed">
                      Hours of immobility, shallow breathing, neck strain, and declining physical stamina.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Sun className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-emerald-950 block mb-0.5">
                      Outdoor Play & Running
                    </span>
                    <span className="text-emerald-900 leading-relaxed">
                      Natural sunlight, bone mineral reinforcement, healthy heart rate, and an energizing dopamine reset.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CARD 3: JUNK FOOD HABITS */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FBFBFA] border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* Small visual indicator: Junk → Better Choices */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200/60">
                  <span>Junk</span>
                  <span className="text-amber-400">→</span>
                  <span className="text-amber-700">Better Choices</span>
                </span>

                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center transition-colors group-hover:bg-amber-600 group-hover:text-white shadow-2xs">
                  <Apple className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 mb-2">
                JUNK FOOD HABITS
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                “Screen-based routines can sometimes go together with frequent snacking, sugary
                drinks and fast food.”
              </p>
            </div>

            {/* Visual: Balanced transition from unhealthy snacks toward healthier choices */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2.5">
                <span>Healthy Snack Shift #{activeSnackIndex + 1}</span>
                <div className="flex gap-1">
                  {snackComparisons.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSnackIndex(i)}
                      className={`w-6 h-6 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                        activeSnackIndex === i
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 line-through">
                    {snackComparisons[activeSnackIndex].junk}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                    Unconscious
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-950">
                    {snackComparisons[activeSnackIndex].healthy}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Better Choice
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 italic">
                {snackComparisons[activeSnackIndex].note}
              </p>
            </div>
          </div>

          {/* CARD 4: LESS REAL-WORLD TIME */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FBFBFA] border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* Small visual indicator: Digital → Real World */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-[11px] font-bold border border-indigo-200/60">
                  <span>Digital</span>
                  <span className="text-indigo-400">→</span>
                  <span className="text-indigo-700">Real World</span>
                </span>

                <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center transition-colors group-hover:bg-indigo-600 group-hover:text-white shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 mb-2">
                LESS REAL-WORLD TIME
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                “Children need sleep, family conversations, friendships, creativity and experiences
                away from screens.”
              </p>
            </div>

            {/* Visual: Family/Friends interacting without phones */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100 relative">
                {!familyImageError ? (
                  <img
                    src="/src/assets/images/family_realworld_moment_1790870266664.jpg"
                    alt="Happy family laughing and interacting at dinner table without any phones"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                    onError={() => setFamilyImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50 p-4 text-center">
                    <Heart className="w-8 h-8 text-indigo-600 mb-1" />
                    <span className="text-xs font-bold text-indigo-900">Family & Friends Sanctuary</span>
                    <span className="text-[11px] text-indigo-700">Laughter · Conversations · Offline Joy</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3">
                  <span className="text-white text-xs font-semibold">
                    100% Screen-Free Family Connection
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMPORTANT MESSAGE (User specified) */}
        <div className="my-16 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center relative overflow-hidden shadow-xl">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            {/* Statement */}
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-400 mb-2">
              THE GOAL IS NOT ZERO SCREEN TIME.
            </div>

            {/* Highlighted Heading */}
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-400 tracking-tight mb-5 text-balance">
              THE GOAL IS HEALTHY BALANCE.
            </h3>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal text-balance">
              “A child does not need to abandon technology. They need to learn how to use it wisely —
              while making time for movement, healthy food, sleep, family, friends and creativity.”
            </p>
          </div>
        </div>

        {/* PARENT MESSAGE (User specified) */}
        <div className="my-16 max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-teal-50/90 via-emerald-50/50 to-white border border-teal-200/90 shadow-md">
          {/* Label */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
              FOR PARENTS
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase">
              Mindset Shift
            </span>
          </div>

          {/* Heading */}
          <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-3">
            DON’T JUST REMOVE. REDIRECT.
          </h3>

          {/* Text */}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8">
            “If a child is already deeply interested in mobile technology, suddenly taking the phone
            away may create resistance. Instead, gradually redirect some of that interest toward
            productive and creative activities.”
          </p>

          {/* Visual Transformation:
              WATCH ↓ CREATE
              PLAY ↓ BUILD
              SCROLL ↓ LEARN
              CONSUME ↓ CREATE */}
          <div className="mb-4">
            <div className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-3">
              The 4 Redirection Shifts (Click to explore):
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {redirectTransformations.map((item, idx) => {
                const isSelected = activeRedirectIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveRedirectIndex(idx)}
                    className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102 ring-2 ring-teal-400/50'
                        : 'bg-white text-slate-700 hover:bg-slate-100/70 border-slate-200/80'
                    }`}
                  >
                    <span className="text-xs font-extrabold tracking-wider line-through decoration-rose-400 text-rose-500">
                      {item.from}
                    </span>
                    <span className="text-xs my-0.5 font-bold text-slate-400">↓</span>
                    <span className={`text-xs font-black tracking-wider ${isSelected ? 'text-teal-300' : 'text-teal-800'}`}>
                      {item.to}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Transformation Deep Dive Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-teal-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>
                    Shift: {redirectTransformations[activeRedirectIndex].from} → {redirectTransformations[activeRedirectIndex].to}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {redirectTransformations[activeRedirectIndex].example}
                </p>
              </div>
              <div className="shrink-0 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100 text-[11px] font-bold text-teal-900">
                Skill: {redirectTransformations[activeRedirectIndex].skill}
              </div>
            </div>
          </div>
        </div>

        {/* FINAL TRANSITION (User specified) */}
        <div className="text-center pt-8 max-w-2xl mx-auto">
          {/* Heading */}
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            SO WHAT CAN WE DO INSTEAD?
          </h3>

          {/* Text */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
            “Let's turn technology from a distraction into a tool for learning, creativity and future
            skills — while bringing children back to the real world.”
          </p>

          {/* Button: DISCOVER THE SOLUTION → */}
          <button
            onClick={onDiscoverSolution}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-teal-700 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-base uppercase tracking-wider"
          >
            <span>DISCOVER THE SOLUTION</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
