import React, { useState } from 'react';
import { FUTURE_DOMAINS } from '../data/content';
import {
  Brain,
  Bot,
  Code,
  Palette,
  Sparkles,
  Briefcase,
  HeartPulse,
  GraduationCap,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { FutureSkillDomain } from '../types';

export const FutureSection: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('ai-ml');
  const [imageError, setImageError] = useState(false);

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'ai-ml':
        return Brain;
      case 'robotics':
        return Bot;
      case 'coding':
        return Code;
      case 'design-ux':
        return Palette;
      case 'creativity':
        return Sparkles;
      case 'entrepreneurship':
        return Briefcase;
      case 'health-tech':
        return HeartPulse;
      case 'ed-tech':
        return GraduationCap;
      default:
        return Sparkles;
    }
  };

  const activeDomain =
    FUTURE_DOMAINS.find((d) => d.id === selectedDomainId) || FUTURE_DOMAINS[0];
  const ActiveIcon = getDomainIcon(activeDomain.id);

  return (
    <section id="future-domains" className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Tomorrow's Prepared Generation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight text-balance">
            THE WORLD IS CHANGING. ARE OUR CHILDREN READY?
          </h2>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal text-balance">
            “AI is becoming part of everyday life. Children need more than the ability to use
            technology — they need creativity, critical thinking, digital literacy and the ability to
            create with it.”
          </p>
        </div>

        {/* Feature Hero Card with Lab Image */}
        <div className="mb-14 rounded-3xl overflow-hidden bg-slate-800/90 border border-slate-700 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Frame */}
            <div className="lg:col-span-7 relative aspect-16/9 lg:aspect-auto min-h-[260px] bg-slate-950">
              {!imageError ? (
                <img
                  src="/src/assets/images/future_skills_lab_1790869654844.jpg"
                  alt="Modern youth innovation discovery lab with friendly educational robotics and creative displays"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-800 text-center">
                  <Bot className="w-12 h-12 text-teal-400 mb-2" />
                  <div className="font-display font-bold text-lg text-white">Innovation Learning Hub</div>
                  <div className="text-xs text-slate-400 mt-1">Robotics · AI · Creative Coding · Ethics</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Content Sidebar in Banner */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                  Featured Pathway
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
                  From Spectators to Innovators
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Children naturally possess limitless imagination. When we introduce them to safe,
                  creative AI models, modular robotics, and interactive code, they realize computers are
                  not passive entertainment boxes, but instruments of invention.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <span>Demystify how machine learning algorithms function</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <span>Promote digital ethics, copyright respect, and critical fact-checking</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <span>Preserve human empathy, curiosity, and artistic originality</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">8 Core Future Domains</span>
                <span className="text-xs font-bold text-teal-400">Explore Matrix Below ↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Domains Interactive Grid (User specified domains) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {FUTURE_DOMAINS.map((domain) => {
            const Icon = getDomainIcon(domain.id);
            const isSelected = selectedDomainId === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomainId(domain.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'bg-teal-500/20 border-teal-400 text-white shadow-lg ring-1 ring-teal-400'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-teal-400 text-slate-900' : 'bg-slate-700/70 text-teal-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-teal-400/20 text-teal-200' : 'text-slate-400'
                    }`}
                  >
                    {domain.ageRecommendation}
                  </span>
                </div>
                <div className="font-display text-xs sm:text-sm font-bold leading-tight">
                  {domain.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Deep Dive Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700/90 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ActiveIcon className="w-4 h-4" />
                <span>Domain Details</span>
                <span>·</span>
                <span>{activeDomain.ageRecommendation}</span>
              </div>
              <h4 className="font-display text-2xl font-bold text-white mb-2">
                {activeDomain.name}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {activeDomain.shortDesc}
              </p>
              <div className="text-xs text-teal-200/90 bg-teal-950/60 border border-teal-800/50 p-3 rounded-xl">
                <strong className="text-teal-300 font-semibold">Why It Matters: </strong>
                {activeDomain.relevance}
              </div>
            </div>

            <div className="md:col-span-5 bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Sample Starter Project for Kids
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-200 mb-4">
                  “{activeDomain.starterProject}”
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Recommended Tool:</span>
                <span className="font-semibold text-teal-400 flex items-center gap-1">
                  {activeDomain.practicalTool}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
