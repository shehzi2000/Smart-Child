import React, { useState } from 'react';
import { PILLARS } from '../data/content';
import { Smartphone, Footprints, Apple, Bot, ChevronRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { PillarData } from '../types';

export const CorePillars: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('tech-wisely');

  const getIcon = (iconName: PillarData['iconName']) => {
    switch (iconName) {
      case 'smartphone':
        return Smartphone;
      case 'running':
        return Footprints;
      case 'food':
        return Apple;
      case 'robot':
        return Bot;
    }
  };

  const selectedPillar = PILLARS.find((p) => p.id === selectedPillarId) || PILLARS[0];
  const ActiveIcon = getIcon(selectedPillar.iconName);

  return (
    <section id="pillars" className="py-20 md:py-28 bg-white border-y border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase font-bold tracking-widest text-teal-700 mb-2">
            The Foundation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight text-balance">
            A HEALTHIER DIGITAL LIFE STARTS WITH BALANCE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            We don’t believe in demonizing modern devices. Technology becomes harmful only when it crowds
            out the foundational anchors of a thriving childhood: deep sleep, vigorous physical play,
            real food, and creative agency.
          </p>
        </div>

        {/* 4 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = getIcon(pillar.iconName);
            const isSelected = selectedPillarId === pillar.id;

            return (
              <div
                key={pillar.id}
                id={pillar.id === 'tech-wisely' ? undefined : pillar.id === 'move-more' ? 'move' : pillar.id === 'eat-smart' ? 'eat-smart' : 'discover-ai'}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xl ring-2 ring-teal-500/50 scale-[1.02] border-slate-900'
                    : 'bg-slate-50/70 text-slate-900 hover:bg-white hover:shadow-lg hover:-translate-y-1 border-slate-200/80'
                }`}
              >
                <div>
                  {/* Top Bar: Clean Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`font-display font-black text-xs tracking-widest uppercase ${
                        isSelected ? 'text-teal-400' : 'text-teal-700'
                      }`}
                    >
                      {pillar.number} — Pillar
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-teal-500/20 text-teal-300'
                          : 'bg-white shadow-xs text-slate-700 group-hover:text-teal-700 group-hover:bg-teal-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    className={`font-display text-lg sm:text-xl font-bold tracking-tight mb-2 ${
                      isSelected ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isSelected ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>

                {/* Card Footer: Interactive Callout */}
                <div className="pt-4 border-t border-slate-200/40 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-teal-300' : 'text-slate-500 group-hover:text-teal-700'}>
                    {isSelected ? 'Currently Viewing' : 'Explore Action Plan'}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'text-teal-300 translate-x-1' : 'text-slate-400 group-hover:translate-x-1 group-hover:text-teal-700'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Detailed Drilldown Drawer for Selected Pillar */}
        <div className="mt-10 bg-slate-50 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Insight */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-900 text-xs font-semibold uppercase tracking-wider mb-3">
                <ActiveIcon className="w-3.5 h-3.5 text-teal-700" />
                <span>Deep Dive · Pillar {selectedPillar.number}</span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                {selectedPillar.title}
              </h4>
              <p className="mt-1 text-teal-800 font-medium text-sm sm:text-base">
                {selectedPillar.tagline}
              </p>

              <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Why This Matters for Child Development
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedPillar.impactText}
                </p>
              </div>

              {/* Action Tips */}
              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Practical Habits for Parents & Children
                </div>
                <div className="space-y-2.5">
                  {selectedPillar.actionTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Swap Lab */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw className="w-4 h-4 text-teal-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    The Smart Swap Formula
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Do not leave an empty vacuum when reducing passive digital stimulation. Immediately swap
                  it for an engaging physical, creative, or sensory activity.
                </p>

                <div className="space-y-4">
                  {selectedPillar.swaps.map((swap, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800 shrink-0">
                          From
                        </span>
                        <span className="text-xs sm:text-sm text-slate-600 line-through decoration-rose-300">
                          {swap.from}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                          To
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">
                          {swap.to}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Pillar Switcher Tabs */}
              <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Select Pillar to examine:</span>
                <div className="flex gap-1.5">
                  {PILLARS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPillarId(p.id)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        selectedPillarId === p.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {p.number}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
