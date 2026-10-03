import React from 'react';
import { ArrowRight, Bot, Users, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onStartExploring: () => void;
  onTalkToAi: () => void;
  onForParents: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onStartExploring,
  onTalkToAi,
  onForParents,
}) => {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-[#F5F5F0] border-t border-slate-200 text-center relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-black uppercase tracking-widest shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>JOIN THE POSITIVE MOVEMENT</span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          SMART CHILD — SMART FUTURE
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          “Technology is part of the future.
          <br className="hidden sm:inline" />
          Let's teach children how to use it wisely.”
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
          <button
            onClick={onStartExploring}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
          >
            <span>START EXPLORING</span>
            <ArrowRight className="w-4 h-4 text-teal-200" />
          </button>

          <button
            onClick={onTalkToAi}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
          >
            <Bot className="w-4 h-4 text-teal-400" />
            <span>Talk To Specialist</span>
          </button>

          <button
            onClick={onForParents}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
          >
            <Users className="w-4 h-4 text-slate-600" />
            <span>FOR PARENTS</span>
          </button>
        </div>

        {/* Core Tagline */}
        <div className="pt-6 text-xs text-slate-400 uppercase tracking-widest font-bold">
          Learn • Create • Move • Connect • Build
        </div>

      </div>
    </section>
  );
};
