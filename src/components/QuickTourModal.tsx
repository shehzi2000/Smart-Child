import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Bot,
  Users,
  Compass,
  Play,
  CheckCircle2,
  Gamepad2,
  Palette,
  Laptop,
  Code2,
  Activity,
  Salad,
  Moon,
  Heart,
  Video,
  Eye,
  Rocket,
} from 'lucide-react';

interface QuickTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiCoach: () => void;
  onOpenParentMode: () => void;
  onWatchVideo: () => void;
  onStartExploring: () => void;
}

export const QuickTourModal: React.FC<QuickTourModalProps> = ({
  isOpen,
  onClose,
  onOpenAiCoach,
  onOpenParentMode,
  onWatchVideo,
  onStartExploring,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && currentStep < totalSteps + 1) {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps + 1));
      } else if (e.key === 'ArrowLeft' && currentStep > 1) {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, onClose]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep <= totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const handleChildMode = () => {
    onClose();
    onStartExploring();
  };

  const handleParentMode = () => {
    onClose();
    onOpenParentMode();
  };

  const handleTalkToAi = () => {
    onClose();
    onOpenAiCoach();
  };

  const handleWatchIntroVideo = () => {
    onClose();
    onWatchVideo();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Smart Child Quick Tour"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header / Progress Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {currentStep <= totalSteps ? `STEP ${currentStep} OF ${totalSteps}` : 'READY TO TRY IT?'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentStep <= totalSteps && (
              <button
                onClick={handleSkip}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Skip Tour
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close tour"
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator Bar */}
        {currentStep <= totalSteps && (
          <div className="w-full bg-slate-100 h-1 flex">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`flex-1 h-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-teal-600' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        )}

        {/* Modal Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 text-center space-y-6">
          
          {/* ======================================================== */}
          {/* STEP 1: WELCOME TO SMART CHILD */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto shadow-2xs border border-teal-200">
                <Sparkles className="w-8 h-8 text-teal-600" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-extrabold uppercase tracking-widest border border-teal-200">
                Quick Tour
              </span>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                “WELCOME TO SMART CHILD”
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-md mx-auto">
                “Smart Child helps children use technology with more purpose while making room for movement, creativity, learning and real-world connection.”
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-500">
                <span className="px-3 py-1 rounded-xl bg-slate-100">🏃 Movement</span>
                <span className="px-3 py-1 rounded-xl bg-slate-100">🎨 Creativity</span>
                <span className="px-3 py-1 rounded-xl bg-slate-100">🤖 AI Literacy</span>
                <span className="px-3 py-1 rounded-xl bg-slate-100">❤️ Real Life</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: UNDERSTAND THE PROBLEM */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <div className="space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto shadow-2xs border border-amber-200">
                <Eye className="w-8 h-8 text-amber-600" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-extrabold uppercase tracking-widest border border-amber-200">
                Clear Understanding
              </span>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                “UNDERSTAND THE PROBLEM”
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-md mx-auto">
                “Technology can be useful, but too much passive screen use can take time away from movement, sleep, family interaction, creativity and outdoor activities.”
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>The Real Goal:</span>
                </div>
                <p>
                  We don't blame technology or make parents feel guilty. We simply shine a light on what gets displaced when screen time is purely passive.
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: REDIRECT THEIR INTEREST */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto shadow-2xs border border-indigo-200">
                <Compass className="w-8 h-8 text-indigo-600" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-[11px] font-extrabold uppercase tracking-widest border border-indigo-200">
                Core Philosophy
              </span>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                “REDIRECT THEIR INTEREST”
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-md mx-auto">
                “We don't simply tell children to stop using technology. We help them discover productive ways to use it.”
              </p>

              {/* 4 Shift Cards */}
              <div className="grid grid-cols-2 gap-2.5 text-left pt-1">
                <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200">
                  <div className="text-lg mb-1">🎮</div>
                  <div className="text-xs font-bold text-slate-900">Gaming</div>
                  <div className="text-[11px] text-teal-800 font-semibold mt-0.5">→ Game Design</div>
                </div>

                <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200">
                  <div className="text-lg mb-1">🎨</div>
                  <div className="text-xs font-bold text-slate-900">Drawing</div>
                  <div className="text-[11px] text-purple-800 font-semibold mt-0.5">→ Digital Design</div>
                </div>

                <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                  <div className="text-lg mb-1">🤖</div>
                  <div className="text-xs font-bold text-slate-900">AI</div>
                  <div className="text-[11px] text-indigo-800 font-semibold mt-0.5">→ Learn & Create</div>
                </div>

                <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200">
                  <div className="text-lg mb-1">📱</div>
                  <div className="text-xs font-bold text-slate-900">Technology</div>
                  <div className="text-[11px] text-sky-800 font-semibold mt-0.5">→ Building</div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: MEET THE AI COACH */}
          {/* ======================================================== */}
          {currentStep === 4 && (
            <div className="space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto shadow-2xs border border-teal-200">
                <Bot className="w-8 h-8 text-teal-600" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-extrabold uppercase tracking-widest border border-teal-200">
                Interactive Assistant
              </span>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                “MEET THE AI COACH”
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-md mx-auto">
                “Children and parents can ask questions and get age-appropriate guidance.”
              </p>

              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-slate-200 text-xs text-slate-600 space-y-2">
                <p>
                  Speaks and listens fluently in <strong>English</strong>, <strong>Urdu</strong>, and <strong>Roman Urdu</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleTalkToAi}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-98"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Talk To Specialist</span>
                  </button>
                  <span className="text-[11px] text-slate-400 mt-1.5 block">
                    Opens the real Smart Child AI Coach
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 5: BUILD HEALTHIER HABITS */}
          {/* ======================================================== */}
          {currentStep === 5 && (
            <div className="space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs border border-emerald-200">
                <Activity className="w-8 h-8 text-emerald-600" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase tracking-widest border border-emerald-200">
                Everyday Balance
              </span>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                “BUILD HEALTHIER HABITS”
              </h3>

              {/* 6 Habit Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span className="text-base">🏃</span>
                  <span className="text-xs font-bold text-slate-800">Movement</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span className="text-base">🥗</span>
                  <span className="text-xs font-bold text-slate-800">Smart Food</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span className="text-base">😴</span>
                  <span className="text-xs font-bold text-slate-800">Sleep</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span className="text-base">❤️</span>
                  <span className="text-xs font-bold text-slate-800">Family Time</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span className="text-base">🎨</span>
                  <span className="text-xs font-bold text-slate-800">Creativity</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span className="text-base">📱</span>
                  <span className="text-xs font-bold text-slate-800">Digital Balance</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-teal-800 pt-1">
                “The goal is balance — not perfection.”
              </p>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 6: BUILD THE FUTURE */}
          {/* ======================================================== */}
          {currentStep === 6 && (
            <div className="space-y-4 py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-slate-900 text-teal-300 flex items-center justify-center mx-auto shadow-2xs">
                <Rocket className="w-8 h-8" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-extrabold uppercase tracking-widest border border-teal-200">
                Future-Ready Skills
              </span>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                “BUILD THE FUTURE”
              </h3>

              {/* Future Horizon Icons */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-sm mx-auto">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">🤖 AI</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">💻 Coding</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">🎮 Game Dev</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">🎨 Digital Design</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">📱 App Dev</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">💡 Problem Solving</span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-medium max-w-md mx-auto">
                “Help children become creators, not just consumers of technology.”
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep(7)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-98"
                >
                  <span>START EXPLORING</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 7: READY TO TRY IT? (DEMO CTA & VIDEO CONNECTION) */}
          {/* ======================================================== */}
          {currentStep > totalSteps && (
            <div className="space-y-5 py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                “READY TO TRY IT?”
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Choose an experience to begin, or watch the 1-minute video introduction on the homepage:
              </p>

              {/* Three Choices */}
              <div className="space-y-2.5 max-w-md mx-auto text-left">
                <button
                  onClick={handleChildMode}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200 font-bold text-xs uppercase tracking-wider text-teal-950 transition-all cursor-pointer shadow-2xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">👦</span>
                    <span>CHILD MODE (7-DAY CHALLENGE)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleParentMode}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-900 transition-all cursor-pointer shadow-2xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">👨‍👩‍👧</span>
                    <span>PARENT MODE (FAMILY SNAPSHOT)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleTalkToAi}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 hover:bg-teal-700 font-bold text-xs uppercase tracking-wider text-white transition-all cursor-pointer shadow-2xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <Bot className="w-5 h-5 text-teal-400" />
                    <span>TALK TO SPECIALIST (VOICE & TEXT)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Watch Intro Video Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleWatchIntroVideo}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>WATCH THE 1-MINUTE INTRO</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Modal Navigation Bar (Only for Steps 1-6) */}
        {currentStep <= totalSteps && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-[#FAFAF8] flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                currentStep === 1
                  ? 'text-slate-300 pointer-events-none'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <span>{currentStep === totalSteps ? 'FINISH' : 'NEXT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
