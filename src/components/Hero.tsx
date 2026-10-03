import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Palette,
  Sun,
  Activity,
  Apple,
  Brain,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface HeroProps {
  onStartJourney: () => void;
  onExploreFuture: () => void;
  onOpenTour?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExploreFuture, onOpenTour }) => {
  const [imageError, setImageError] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  // Subtle visual elements: physical activity, outdoor play, healthy food, creativity, AI, coding
  const visualPillars = [
    {
      id: 'ai',
      label: 'AI Exploration',
      icon: Brain,
      color: 'text-indigo-700 bg-white/95 border-indigo-200/80 shadow-indigo-100/50',
      position: '-top-3 left-4 sm:-left-4',
    },
    {
      id: 'coding',
      label: 'Coding & Logic',
      icon: Code2,
      color: 'text-teal-800 bg-white/95 border-teal-200/80 shadow-teal-100/50',
      position: 'top-1/4 -right-2 sm:-right-6',
    },
    {
      id: 'creativity',
      label: 'Creativity & Art',
      icon: Palette,
      color: 'text-purple-700 bg-white/95 border-purple-200/80 shadow-purple-100/50',
      position: 'top-1/2 -left-3 sm:-left-6',
    },
    {
      id: 'outdoor',
      label: 'Outdoor Play',
      icon: Sun,
      color: 'text-amber-700 bg-white/95 border-amber-200/80 shadow-amber-100/50',
      position: 'bottom-20 -right-2 sm:-right-6',
    },
    {
      id: 'sports',
      label: 'Physical Activity',
      icon: Activity,
      color: 'text-emerald-700 bg-white/95 border-emerald-200/80 shadow-emerald-100/50',
      position: '-bottom-3 left-6 sm:left-4',
    },
    {
      id: 'food',
      label: 'Healthy Food',
      icon: Apple,
      color: 'text-rose-700 bg-white/95 border-rose-200/80 shadow-rose-100/50',
      position: '-bottom-3 right-6 sm:right-6',
    },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Soft Ambient Light Gradients */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-gradient-to-tr from-teal-100/35 via-sky-50/40 to-emerald-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-teal-100/25 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Typography & Core Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* 1. Small Hero Badge (Updated per requirement) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>A HEALTHIER DIGITAL FUTURE FOR CHILDREN</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-slate-950 tracking-tight leading-[1.08] text-balance">
              DON’T JUST TAKE THE PHONE AWAY.
            </h1>

            {/* Second Highlighted Line */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-800 tracking-tight leading-[1.15] mt-2 mb-6 text-balance">
              TURN SCREEN TIME INTO SKILL TIME.
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mb-8">
              Help children build a healthier relationship with technology — while discovering
              creativity, physical activity, healthy habits and the skills of an AI-powered future.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartJourney}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-teal-700 active:scale-98 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-sm sm:text-base"
              >
                <span>Start the Journey</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </button>

              <button
                onClick={onExploreFuture}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 active:scale-98 transition-all duration-200 shadow-xs cursor-pointer text-sm sm:text-base"
              >
                <Compass className="w-4 h-4 text-teal-600" />
                <span>Explore the Future</span>
              </button>
            </div>

            {/* Subtle "Take a Quick Tour" trigger */}
            {onOpenTour && (
              <div className="mt-4 flex items-center justify-start">
                <button
                  onClick={onOpenTour}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-900 hover:text-teal-950 bg-teal-50/80 hover:bg-teal-100/90 border border-teal-200/90 px-4 py-2 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
                  <span>TAKE A QUICK TOUR</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}

            {/* 6. Philosophy Stats Cards (0% Fear, 1:1 Balance, Creator First) */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl text-left">
              {/* Card 1: 0% Fear */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-lg sm:text-xl font-black text-slate-900">
                    0% Fear
                  </span>
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                </div>
                <div className="text-xs font-semibold text-teal-800 mb-0.5">
                  Empowerment, Not Guilt
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  No device panic or shaming. We redirect natural curiosity toward high-value skills.
                </p>
              </div>

              {/* Card 2: 1:1 Balance */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-lg sm:text-xl font-black text-slate-900">
                    1:1 Balance
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-xs font-semibold text-emerald-800 mb-0.5">
                  Screen vs Real Life
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Every hour of digital creation is matched with sports, sunlight, and restorative sleep.
                </p>
              </div>

              {/* Card 3: Creator First */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-lg sm:text-xl font-black text-teal-800">
                    Creator First
                  </span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <div className="text-xs font-semibold text-indigo-900 mb-0.5">
                  AI, Code & Design
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Replacing mindless algorithmic scrolling with active building and original storytelling.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition (Technology + Creativity + Health + Future) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
              {/* Core Philosophy Formula Bar (Top of Visual Composition) */}
              <div className="mb-3 flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200/80 text-[11px] font-bold text-slate-700 shadow-2xs">
                <span className="text-teal-700">Technology</span>
                <span className="text-slate-300">+</span>
                <span className="text-purple-700">Creativity</span>
                <span className="text-slate-300">+</span>
                <span className="text-emerald-700">Health</span>
                <span className="text-slate-300">+</span>
                <span className="text-indigo-700">Future</span>
              </div>

              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-br from-teal-200/50 via-emerald-100/40 to-indigo-100/40 rounded-3xl blur-xl opacity-70 -z-10" />

              {/* Main Card Frame */}
              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-slate-200/80">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100">
                  {!imageError ? (
                    <img
                      src="/src/assets/images/hero_creative_learning_1790869639855.jpg"
                      alt="Young creator happily programming an educational project in a sunlit workspace"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    /* Fallback container adhering to Zero-Broken-Image Policy */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-teal-50 to-emerald-50 text-center">
                      <Brain className="w-12 h-12 text-teal-600 mb-2" />
                      <div className="font-display font-bold text-slate-900">Creative Learning Studio</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Coding · AI · Outdoor Sports · Nutrition
                      </div>
                    </div>
                  )}

                  {/* Gradient Scrim & Status Callout on the Image */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent flex items-end p-4">
                    <div className="text-white w-full flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                          <span>Active Creator Mindset</span>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-100 mt-0.5">
                          Designing algorithms · Building games · Real-world balance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Floating Elements representing:
                    physical activity, outdoor play, healthy food, creativity, AI, coding */}
                {visualPillars.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveHighlight(item.id)}
                      onMouseLeave={() => setActiveHighlight(null)}
                      className={`absolute ${item.position} flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm backdrop-blur-md transition-all duration-200 cursor-pointer ${item.color} ${
                        activeHighlight === item.id ? 'scale-110 shadow-md ring-2 ring-teal-400/40' : 'hover:scale-105'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[11px] font-bold whitespace-nowrap">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Subtle Balance Indicator */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-2">
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sunlight & movement first</span>
                </span>
                <span className="font-semibold text-teal-800">100% Balanced Childhood</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
