import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Circle,
  MessageSquare,
  Mic,
  Activity,
  Apple,
  Gamepad2,
  Palette,
  Bot,
  Compass,
  Lightbulb,
  Lock,
  Calendar,
  Check,
  HelpCircle,
  EyeOff,
  Sun,
  BookOpen,
} from 'lucide-react';

interface ParentFamilyViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiCoach: () => void;
  onOpenSmartBalancePlan: () => void;
  onOpenChallenge: () => void;
}

type Lang = 'en' | 'roman' | 'ur';

interface ChildProfile {
  age: string;
  interests: string[];
  mainConcern: string;
  futureSkill: string;
}

const FAMILY_PROFILE_STORAGE_KEY = 'smart_child_family_profile_v1';
const CHALLENGE_STORAGE_KEY = 'smart_child_7day_challenge_state_v2';

export const ParentFamilyViewModal: React.FC<ParentFamilyViewModalProps> = ({
  isOpen,
  onClose,
  onOpenAiCoach,
  onOpenSmartBalancePlan,
  onOpenChallenge,
}) => {
  const [lang, setLang] = useState<Lang>('en');
  // Screen: 'entry' -> 'profile' -> 'dashboard'
  const [screen, setScreen] = useState<'entry' | 'profile' | 'dashboard'>('entry');

  // Basic child profile (strictly non-identifying)
  const [childProfile, setChildProfile] = useState<ChildProfile>(() => {
    try {
      const saved = localStorage.getItem(FAMILY_PROFILE_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      age: '9–12',
      interests: ['Gaming', 'Videos'],
      mainConcern: 'Too much passive screen time',
      futureSkill: 'Coding & Game Design',
    };
  });

  // Challenge progress from local storage
  const [challengeProgress, setChallengeProgress] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const challengeData = localStorage.getItem(CHALLENGE_STORAGE_KEY);
        if (challengeData) {
          const parsed = JSON.parse(challengeData);
          if (Array.isArray(parsed.completedDays)) {
            setChallengeProgress(parsed.completedDays);
          }
        }
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveProfile = (profile: ChildProfile) => {
    setChildProfile(profile);
    try {
      localStorage.setItem(FAMILY_PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
    setScreen('dashboard');
  };

  const handleExploreWithoutSaving = () => {
    setScreen('dashboard');
  };

  const toggleInterest = (interest: string) => {
    setChildProfile((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated.length > 0 ? updated : ['Gaming'] };
    });
  };

  // Dynamic Suggestion based on interests & concerns
  const isGaming = childProfile.interests.some((i) => i.toLowerCase().includes('game') || i.toLowerCase().includes('gaming'));
  const isVideos = childProfile.interests.some((i) => i.toLowerCase().includes('video'));
  const isDrawing = childProfile.interests.some((i) => i.toLowerCase().includes('draw') || i.toLowerCase().includes('art'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-800 flex items-center justify-center shrink-0 shadow-2xs">
              <Users className="w-5 h-5 text-teal-700" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-950 leading-tight">
                  PARENT & FAMILY VIEW
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-900">
                  Support • Not Surveillance
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Work WITH your child, not against technology.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="hidden sm:inline-flex rounded-xl bg-slate-100 p-0.5 text-xs font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  lang === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('roman')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  lang === 'roman' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Roman
              </button>
              <button
                onClick={() => setLang('ur')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  lang === 'ur' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                اردو
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Parent Mode"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* ======================================================== */}
          {/* SCREEN 1: ENTRY SCREEN */}
          {/* ======================================================== */}
          {screen === 'entry' && (
            <div className="py-6 sm:py-10 text-center max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-teal-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
                <Heart className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-teal-800">
                  Collaborative Parenting
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                  “Help your child build a healthier relationship with technology.”
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Parent Mode helps you understand your child’s passions, habits, and creative potential.
                  No spying, no secret tracking, and no guilt—just practical guidance to turn screen time into skill time.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-left flex items-start gap-3 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs text-teal-950 space-y-0.5">
                  <span className="font-bold block">Zero Surveillance Commitment</span>
                  <p className="text-teal-900 leading-relaxed">
                    This tool does NOT track keystrokes, monitor browsing, access cameras, or record private chats.
                    We respect your family’s privacy 100%.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setScreen('profile')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  <Users className="w-4 h-4" />
                  <span>CREATE FAMILY VIEW</span>
                </button>

                <button
                  onClick={handleExploreWithoutSaving}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                >
                  <span>EXPLORE WITHOUT SAVING DATA</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 2: CHILD PROFILE INPUT (Strictly Non-Identifying) */}
          {/* ======================================================== */}
          {screen === 'profile' && (
            <div className="max-w-2xl mx-auto space-y-6 text-left">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-black text-xl text-slate-950">
                    Basic Child Profile
                  </h4>
                  <p className="text-xs text-slate-500">
                    Enter general info to tailor recommendations. No names or private details needed!
                  </p>
                </div>

                <button
                  onClick={() => setScreen('entry')}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Back
                </button>
              </div>

              {/* 1. Age */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2">
                  1. Child's Age Group:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['6–8', '9–12', '13–15', '16–17'].map((a) => (
                    <button
                      key={a}
                      onClick={() => setChildProfile({ ...childProfile, age: a })}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        childProfile.age === a
                          ? 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-300'
                          : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {a} yrs
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Interests */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2">
                  2. Child's Primary Interests (Select all that apply):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Gaming',
                    'Videos',
                    'Drawing & Art',
                    'Sports',
                    'Reading',
                    'Coding',
                    'AI & Robotics',
                    'Music',
                  ].map((int) => {
                    const isSelected = childProfile.interests.includes(int);
                    return (
                      <button
                        key={int}
                        onClick={() => toggleInterest(int)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-teal-50 border-teal-500 text-teal-950'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{int}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Main Concern */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2">
                  3. What is your biggest concern?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Too much passive screen time',
                    'Not enough physical activity',
                    'Junk food while watching screens',
                    'Difficulty stopping without frustration',
                    'Sleep routine affected by screens',
                    'Want to develop real creator skills',
                  ].map((c) => (
                    <button
                      key={c}
                      onClick={() => setChildProfile({ ...childProfile, mainConcern: c })}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                        childProfile.mainConcern === c
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-1 ring-indigo-300'
                          : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Future Skill */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2">
                  4. Future skills they might enjoy learning:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Coding & Game Design',
                    'Digital Art & UI Design',
                    'AI Literacy & Prompting',
                    'Video Creation & Editing',
                    'Robotics & Electronics',
                    'Writing & Storytelling',
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => setChildProfile({ ...childProfile, futureSkill: s })}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                        childProfile.futureSkill === s
                          ? 'bg-purple-50 border-purple-500 text-purple-950 ring-1 ring-purple-300'
                          : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleSaveProfile(childProfile)}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  Generate Family Dashboard →
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SCREEN 3: FAMILY DASHBOARD (SUPPORTIVE & EMPOWERING) */}
          {/* ======================================================== */}
          {screen === 'dashboard' && (
            <div className="space-y-8 text-left">
              
              {/* Dashboard Subheader & Perspective Notice */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FAFAF8] border border-slate-200">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-800">
                    Child Profile: Age {childProfile.age} • Interests: {childProfile.interests.join(', ')}
                  </span>
                  <h4 className="font-display font-black text-base sm:text-lg text-slate-950">
                    Family Guidance Snapshot
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScreen('profile')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={onOpenAiCoach}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold text-xs border border-teal-200 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
                    <span>Ask AI Coach</span>
                  </button>
                </div>
              </div>

              {/* 1. FAMILY SNAPSHOT (6 Non-Judgmental Balance Dimensions) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-black text-xs uppercase tracking-widest text-slate-900">
                    FAMILY SNAPSHOT (NOT MEDICAL SCORES)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Holistic balance benchmarks
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xl mb-1">📱</div>
                    <span className="text-[11px] font-black uppercase text-slate-900 block">Digital Balance</span>
                    <span className="text-[10px] text-teal-700 font-bold">Purposeful Use</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xl mb-1">🏃</div>
                    <span className="text-[11px] font-black uppercase text-slate-900 block">Movement</span>
                    <span className="text-[10px] text-emerald-700 font-bold">Joyful Play</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xl mb-1">🥗</div>
                    <span className="text-[11px] font-black uppercase text-slate-900 block">Food Habits</span>
                    <span className="text-[10px] text-amber-700 font-bold">Screen-Free Dining</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xl mb-1">🎨</div>
                    <span className="text-[11px] font-black uppercase text-slate-900 block">Creativity</span>
                    <span className="text-[10px] text-purple-700 font-bold">Active Building</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xl mb-1">🤖</div>
                    <span className="text-[11px] font-black uppercase text-slate-900 block">Future Skills</span>
                    <span className="text-[10px] text-indigo-700 font-bold">Critical Literacy</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-xl mb-1">❤️</div>
                    <span className="text-[11px] font-black uppercase text-slate-900 block">Family Time</span>
                    <span className="text-[10px] text-rose-700 font-bold">Daily Connection</span>
                  </div>
                </div>
              </div>

              {/* 2. SMART BALANCE SUMMARY */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200 shadow-2xs space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-800">
                  SMART BALANCE SUMMARY
                </span>
                
                <div className="space-y-1">
                  <h4 className="font-display font-black text-sm text-slate-900">
                    CURRENT FOCUS:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    “Your child enjoys {childProfile.interests.join(' & ')} and shows interest in {childProfile.futureSkill}.”
                  </p>
                </div>

                <div className="space-y-1 pt-1 border-t border-teal-200/60">
                  <h4 className="font-display font-black text-sm text-teal-950">
                    SUGGESTED DIRECTION:
                  </h4>
                  <p className="text-xs sm:text-sm text-teal-900 font-semibold leading-relaxed">
                    {isGaming &&
                      'Use gaming as a natural starting point for learning game design and block-based coding, while pairing screen sessions with enjoyable physical outdoor play.'}
                    {isDrawing && !isGaming &&
                      'Channel their sketching into digital UI wireframing and illustration tools, with dedicated screen-free family art sessions.'}
                    {!isGaming && !isDrawing &&
                      'Redirect passive viewing into hands-on project creation, while safeguarding consistent sleep and screen-free meals.'}
                  </p>
                </div>
              </div>

              {/* 3. 7-DAY CHALLENGE SYNCHRONIZED PROGRESS */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                      7-DAY SMART CHILD CHALLENGE STATUS
                    </h5>
                  </div>

                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {challengeProgress.length} of 7 Completed
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
                    const isDone = challengeProgress.includes(dayNum);
                    return (
                      <div
                        key={dayNum}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                          isDone
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-500'
                        }`}
                      >
                        <span>Day {dayNum}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-300" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs text-slate-500 italic">
                  “You can continue whenever you're ready. Small changes build long-term positive routines without pressure.”
                </p>
              </div>

              {/* 4. PARENT SUPPORT TIPS */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                    PRACTICAL PARENT SUPPORT TIPS
                  </h5>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                    <span className="font-bold text-amber-950 block">Regarding Technology:</span>
                    <p className="leading-relaxed">
                      “Instead of suddenly removing gaming or videos, ask what your child enjoys about them. That interest could lead directly toward game design, storytelling, coding, or digital creativity.”
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-950 block">Regarding Movement:</span>
                    <p className="leading-relaxed">
                      “Try connecting movement with something your child already enjoys. A friendly evening cricket match, badminton, or a bike ride with music feels like play rather than a chore.”
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200 space-y-1">
                    <span className="font-bold text-teal-950 block">Regarding Food Habits:</span>
                    <p className="leading-relaxed">
                      “Start with one healthier choice—like fresh fruit or a water bottle at the desk—rather than attempting a restrictive diet change all at once.”
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. CONVERSATION STARTERS ("TALK TO YOUR CHILD") */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                    CONVERSATION STARTERS (NO INTERROGATION)
                  </h5>
                </div>
                <p className="text-xs text-slate-500">
                  Use open-ended questions during dinner or car rides to encourage self-reflection:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    '“What do you enjoy most about gaming or the videos you watch?”',
                    '“If you could build an app for our family, what would it do?”',
                    '“What would you like to explore or learn with AI?”',
                    '“What outdoor game or activity would you enjoy this weekend?”',
                    '“What is one problem at school or in our community you’d like to solve?”',
                    '“What would you like to create together this week?”',
                  ].map((q, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAFAF8] border border-slate-200 font-medium text-slate-700">
                      {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. TRY THIS TOGETHER (Parent + Child Co-Activities) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <h5 className="font-display font-black text-xs uppercase tracking-wider text-slate-900">
                    TRY THIS TOGETHER (CONNECTION OVER SURVEILLANCE)
                  </h5>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">🎮 Game Concept</span>
                    <p className="text-slate-600 text-[11px]">Design a simple 3-level game idea on paper together.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">🤖 AI Fact Check</span>
                    <p className="text-slate-600 text-[11px]">Ask AI a science question, then fact-check it with a book.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">🚶 Evening Walk</span>
                    <p className="text-slate-600 text-[11px]">A 20-minute screen-free walk around the neighborhood.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">🍎 Healthy Snack</span>
                    <p className="text-slate-600 text-[11px]">Prepare a fresh fruit platter or homemade smoothie.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">💡 Family App Idea</span>
                    <p className="text-slate-600 text-[11px]">Sketch an app that organizes household chores or grocery lists.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">📚 New Topic</span>
                    <p className="text-slate-600 text-[11px]">Pick a curiosity—space, oceans, animals—and read together.</p>
                  </div>
                </div>
              </div>

              {/* 7. HIGHLIGHTED PHILOSOPHY: DON'T JUST REMOVE. REDIRECT. */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-md space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-teal-400">
                  CORE PARENTING PRINCIPLE
                </span>
                <h4 className="font-display font-black text-xl text-white">
                  “DON'T JUST REMOVE. REDIRECT.”
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  If your child spends a lot of time on technology, first understand what they enjoy about it.
                  Gaming can lead to game design. Drawing can lead to digital design. Videos can lead to storytelling.
                  AI can lead to problem solving. Technology can become a tool for creation.
                </p>
              </div>

              {/* 8. PHYSICAL MOVEMENT, JUNK FOOD & PREPARE DON'T FEAR */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5 uppercase text-[11px]">
                    <Activity className="w-3.5 h-3.5" />
                    <span>WHY MOVEMENT MATTERS</span>
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Long periods of passive screen use can replace time otherwise spent moving, exploring, and interacting. Balance brings energy and mental calm.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <span className="font-bold text-amber-800 flex items-center gap-1.5 uppercase text-[11px]">
                    <Apple className="w-3.5 h-3.5" />
                    <span>SMART FOOD HABITS</span>
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Keep water easily available, create screen-free family dinners, and avoid using food as a reward or punishment. No diets or calorie talk.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <span className="font-bold text-indigo-800 flex items-center gap-1.5 uppercase text-[11px]">
                    <Bot className="w-3.5 h-3.5" />
                    <span>PREPARE, DON'T FEAR</span>
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    AI Literacy → Critical Thinking → Creativity → Problem Solving → Creation. Children don't need to fear AI when they learn to use it responsibly.
                  </p>
                </div>
              </div>

              {/* 9. ZERO SURVEILLANCE & PRIVACY STATEMENT */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <EyeOff className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Strict Anti-Surveillance Architecture</span>
                  <p className="leading-relaxed text-[11px]">
                    This application contains zero background spyware, keyloggers, microphone monitoring, or secret activity reporting.
                    Parent Mode is designed as a constructive conversation coach to build mutual family trust.
                  </p>
                </div>
              </div>

              {/* 10. FINAL MESSAGE & QUICK ACTION BUTTONS */}
              <div className="p-6 sm:p-8 rounded-3xl bg-teal-50 border border-teal-200 text-center space-y-4">
                <div className="space-y-1 max-w-lg mx-auto">
                  <h4 className="font-display font-black text-lg sm:text-xl text-teal-950">
                    “YOUR CHILD DOESN'T NEED TO CHOOSE BETWEEN TECHNOLOGY AND REAL LIFE.”
                  </h4>
                  <p className="text-xs text-teal-800 font-medium leading-relaxed">
                    Help them learn to use technology as a tool — while making time to move, create, connect, explore, and grow.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSmartBalancePlan();
                    }}
                    className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    <span>START SMART BALANCE PLAN</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenChallenge();
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    <span>START 7-DAY CHALLENGE</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenAiCoach();
                    }}
                    className="px-5 py-3 rounded-xl bg-white border border-teal-200 hover:bg-teal-100 text-teal-900 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                  >
                    <Mic className="w-3.5 h-3.5 text-teal-700" />
                    <span>Talk To Specialist</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Privacy Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-[#FAFAF8] text-center text-[11px] text-slate-500">
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700 mb-0.5">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Privacy matters.</span>
          </div>
          <p>
            No account required. All preferences stay in your local browser. Never enter sensitive passwords or personal details.
          </p>
        </div>
      </div>
    </div>
  );
};
