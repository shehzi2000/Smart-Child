import React, { useState } from 'react';
import { TRANSFORMATION_ITEMS } from '../data/content';
import {
  ArrowDown,
  ArrowRight,
  Sparkles,
  Gamepad2,
  Video,
  Cpu,
  Palette,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';

export const TransformationSection: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('gaming');
  const [imageError, setImageError] = useState(false);

  const activeItem =
    TRANSFORMATION_ITEMS.find((item) => item.id === selectedScenarioId) || TRANSFORMATION_ITEMS[0];

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'gaming':
        return Gamepad2;
      case 'videos':
        return Video;
      case 'ai-tech':
        return Cpu;
      case 'art-doodles':
        return Palette;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="transform" className="py-20 md:py-28 bg-[#F8FAF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-teal-600" />
            <span>The Redirection Philosophy</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight text-balance">
            THE ANSWER ISN’T ALWAYS “PUT THE PHONE AWAY.”
          </h2>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed text-balance">
            “Sometimes the better approach is to redirect a child’s interest. A child who loves games
            can explore game design. A child who loves videos can learn video creation. A child
            interested in technology can learn coding, AI or design.”
          </p>
        </div>

        {/* 4 Clickable Child Interest Pathways */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto">
          {TRANSFORMATION_ITEMS.map((item) => {
            const Icon = getScenarioIcon(item.id);
            const isSelected = selectedScenarioId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedScenarioId(item.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 flex flex-col gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg border-slate-900 scale-102 ring-2 ring-teal-500/40'
                    : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200/80 hover:shadow-xs'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-teal-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-display text-xs sm:text-sm font-bold leading-tight">
                  {item.interest}
                </div>
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? 'text-teal-300' : 'text-slate-500'
                  }`}
                >
                  Click to redirect →
                </span>
              </button>
            );
          })}
        </div>

        {/* The Visual Transformation Pipeline (Requested in brief) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-700">
                Live Transformation Pathway
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Transforming: <span className="text-teal-800">{activeItem.interest}</span>
              </h3>
            </div>
            <div className="text-xs text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200/60 self-start md:self-auto">
              Starter tool: <strong className="text-slate-800 font-semibold">{activeItem.beginnerTool}</strong>
            </div>
          </div>

          {/* 4 Pipeline Stages: PASSIVE -> PRODUCTIVE -> SKILLS -> OPPORTUNITIES */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: Passive Screen Time */}
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-800">
                    Stage 01
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                </div>
                <h4 className="font-display text-sm font-bold text-slate-900 uppercase tracking-tight mb-1">
                  PASSIVE SCREEN TIME
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeItem.passiveDescription}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100 text-[11px] text-rose-700 font-medium">
                High stimulation, low agency
              </div>
            </div>

            {/* Down / Right Indicator */}
            <div className="hidden md:flex absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-900 text-teal-400 items-center justify-center shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Step 2: Productive Screen Time */}
            <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-800">
                    Stage 02
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                </div>
                <h4 className="font-display text-sm font-bold text-slate-900 uppercase tracking-tight mb-1">
                  PRODUCTIVE SCREEN TIME
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeItem.productiveDescription}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-teal-100 text-[11px] text-teal-800 font-semibold">
                Creator & builder mindset
              </div>
            </div>

            {/* Down / Right Indicator */}
            <div className="hidden md:flex absolute left-2/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-900 text-teal-400 items-center justify-center shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Step 3: Real-World Skills */}
            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800">
                    Stage 03
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                </div>
                <h4 className="font-display text-sm font-bold text-slate-900 uppercase tracking-tight mb-1">
                  REAL-WORLD SKILLS
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeItem.realWorldSkill}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-100 text-[11px] text-sky-800 font-semibold">
                Transferable intellect
              </div>
            </div>

            {/* Down / Right Indicator */}
            <div className="hidden md:flex absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-900 text-teal-400 items-center justify-center shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Step 4: Future Opportunities */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-400">
                    Stage 04
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                </div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-tight mb-1">
                  FUTURE OPPORTUNITIES
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeItem.futureOpportunity}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-teal-300 font-semibold">
                High-value career readiness
              </div>
            </div>
          </div>

          {/* Supportive Visual Showcase Banner */}
          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm mb-1">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>The Golden Rule for Parents: Never leave an empty screen void</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When you confiscate a phone with nothing to replace it, children experience withdrawal and
                boredom resentment. When you introduce a collaborative creative tool or a lively sport,
                their natural curiosity takes over.
              </p>
            </div>
            <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-16/9 bg-slate-100 relative">
              {!imageError ? (
                <img
                  src="/src/assets/images/balance_habits_lifestyle_1790869668633.jpg"
                  alt="Balanced lifestyle flat-lay with digital tablet, notebook, fresh apple and sneakers"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-teal-50 text-teal-900 text-xs font-semibold p-4 text-center">
                  Balanced Habit Ecosystem: Digital Creation + Active Outdoor Life
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
