import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Sparkles,
  Trophy,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Users,
  User,
  Heart,
  Smartphone,
  Salad,
  Bot,
  Compass,
  Lightbulb,
  Check,
  Zap,
  Info,
  Apple,
  Activity,
  Smile,
  Globe2,
  BookOpen,
  Send,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  TreePine,
  Gamepad2,
  Palette,
  Film,
  Code2,
} from 'lucide-react';

interface ChallengeSectionProps {
  onOpenAiPlan?: () => void;
}

const STORAGE_KEY = 'smart_child_7day_challenge_state_v2';

type Lang = 'en' | 'roman' | 'ur';

interface Day7Result {
  idea: string;
  problem: string;
  whoItHelps: string;
  firstStep: string;
  skillsToLearn: string[];
  nextStep: string;
}

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({ onOpenAiPlan }) => {
  const [lang, setLang] = useState<Lang>('en');
  const [audienceMode, setAudienceMode] = useState<'child' | 'parent'>('child');
  const [activeDayNum, setActiveDayNum] = useState<number>(1);

  // Persistent Challenge State
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.completedDays)) return parsed.completedDays;
      }
    } catch {
      // fallback
    }
    return [];
  });

  // User responses for each day
  const [day1MostUsed, setDay1MostUsed] = useState<string>('🎮 Gaming');
  const [day1Reduce, setDay1Reduce] = useState<string>('📱 Videos');
  const [day2MoveChoice, setDay2MoveChoice] = useState<string>('🏏 Cricket');
  const [day3FoodChoice, setDay3FoodChoice] = useState<string>('💧 Drink more water');
  const [day4CreateChoice, setDay4CreateChoice] = useState<string>('🎮 Design a game');
  const [day5AiQuery, setDay5AiQuery] = useState<string>('How does a game work?');
  const [day5AiAnswer, setDay5AiAnswer] = useState<string | null>(null);
  const [day5IsThinking, setDay5IsThinking] = useState<boolean>(false);
  const [day6RealWorldChoice, setDay6RealWorldChoice] = useState<string>('👨‍👩‍👧 Spend time with family');
  const [day7IdeaType, setDay7IdeaType] = useState<string>('📱 App');
  const [day7ProblemText, setDay7ProblemText] = useState<string>('Helping students organize school books and share notes');
  const [day7Result, setDay7Result] = useState<Day7Result | null>(null);
  const [day7IsLoading, setDay7IsLoading] = useState<boolean>(false);

  const [justCompletedDay, setJustCompletedDay] = useState<number | null>(null);

  // Save progress automatically to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completedDays,
          activeDayNum,
          day1MostUsed,
          day1Reduce,
          day2MoveChoice,
          day3FoodChoice,
          day4CreateChoice,
          day6RealWorldChoice,
          day7IdeaType,
          day7ProblemText,
          day7Result,
        })
      );
    } catch {
      // ignore
    }
  }, [
    completedDays,
    activeDayNum,
    day1MostUsed,
    day1Reduce,
    day2MoveChoice,
    day3FoodChoice,
    day4CreateChoice,
    day6RealWorldChoice,
    day7IdeaType,
    day7ProblemText,
    day7Result,
  ]);

  const toggleDayCompletion = (dayNum: number) => {
    if (completedDays.includes(dayNum)) {
      setCompletedDays((prev) => prev.filter((d) => d !== dayNum));
      setJustCompletedDay(null);
    } else {
      setCompletedDays((prev) => [...prev, dayNum]);
      setJustCompletedDay(dayNum);
      setTimeout(() => setJustCompletedDay(null), 4000);
      if (dayNum < 7) {
        setActiveDayNum(dayNum + 1);
      }
    }
  };

  const handleResetChallenge = () => {
    setCompletedDays([]);
    setActiveDayNum(1);
    setJustCompletedDay(null);
    setDay7Result(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Day 5 AI Query Execution
  const handleAskDay5Ai = async () => {
    if (!day5AiQuery.trim()) return;
    setDay5IsThinking(true);
    setDay5AiAnswer(null);

    try {
      const response = await fetch('/api/ai-coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `I'm a young learner asking for Day 5 of the 7-Day Challenge: "${day5AiQuery}". Explain in 2 short, fun, inspiring sentences for kids. Remember: teach me to verify facts!`,
          mode: 'text',
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setDay5AiAnswer(data.reply || 'Great question! Games use coordinate math and game loops to run smoothly. Always check facts!');
    } catch {
      setDay5AiAnswer(
        'Great question! Video games work using "loops" that check what keys you press 60 times a second. Remember to fact-check with books and teachers!'
      );
    } finally {
      setDay5IsThinking(false);
    }
  };

  // Day 7 AI Future Idea Breakdown
  const handleGenerateDay7Idea = async () => {
    if (!day7ProblemText.trim()) return;
    setDay7IsLoading(true);

    try {
      const response = await fetch('/api/ai-coach/day7-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ideaType: day7IdeaType,
          problemText: day7ProblemText,
          age: '9-14',
          language: lang,
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data: Day7Result = await response.json();
      setDay7Result(data);
      if (!completedDays.includes(7)) {
        toggleDayCompletion(7);
      }
    } catch {
      setDay7Result({
        idea: `Smart ${day7IdeaType} for ${day7ProblemText.slice(0, 24)}`,
        problem: day7ProblemText,
        whoItHelps: 'Fellow students, neighborhood families, and friends.',
        firstStep: 'Sketch 3 screen boxes on paper: 1. Welcome screen, 2. Feature screen, 3. Success action.',
        skillsToLearn: ['Design Thinking', 'User Interface Wireframing', 'Logical Decomposition'],
        nextStep: 'Show your paper wireframe to a family member and ask for 1 idea to make it even better!',
      });
      if (!completedDays.includes(7)) {
        toggleDayCompletion(7);
      }
    } finally {
      setDay7IsLoading(false);
    }
  };

  const isAllComplete = completedDays.length === 7;

  return (
    <section id="challenges" className="py-20 sm:py-28 bg-[#FAFAF8] text-slate-900 border-t border-slate-200 relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* ======================================================== */}
        {/* 1. CHALLENGE INTRODUCTION */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-2xs">
            <Trophy className="w-4 h-4 text-teal-600" />
            <span>INTERACTIVE HABIT JOURNEY</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            “7 DAYS. 7 SMALL CHANGES.”
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            You don't have to change everything today. Try one small challenge each day and discover how technology, movement, creativity, and real life can work together.
          </p>

          {/* Controls: Mode & Language */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {/* Child vs Parent Toggle */}
            <div className="inline-flex rounded-2xl bg-white border border-slate-200 p-1 shadow-2xs">
              <button
                onClick={() => setAudienceMode('child')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  audienceMode === 'child'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Child View</span>
              </button>
              <button
                onClick={() => setAudienceMode('parent')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  audienceMode === 'parent'
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Parent View</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="inline-flex rounded-2xl bg-white border border-slate-200 p-1 shadow-2xs">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('roman')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  lang === 'roman' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Roman Urdu
              </button>
              <button
                onClick={() => setLang('ur')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  lang === 'ur' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                اردو
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. PROGRESS TRACKER */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span className="font-display font-black text-slate-950 text-base sm:text-lg">
                CHALLENGE PROGRESS
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                {completedDays.length} / 7 DAYS COMPLETE
              </span>

              {completedDays.length > 0 && (
                <button
                  onClick={handleResetChallenge}
                  title="Reset 7-Day Progress"
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* 7 Days Stepper Pill Bar */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
              const isDone = completedDays.includes(dayNum);
              const isActive = activeDayNum === dayNum;
              return (
                <button
                  key={dayNum}
                  onClick={() => setActiveDayNum(dayNum)}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isActive
                      ? 'ring-2 ring-teal-500 bg-teal-50/80 border-teal-300'
                      : isDone
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-[#FAFAF8] border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase">D{dayNum}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Daily Celebration Banner */}
          {justCompletedDay && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95 duration-200 text-emerald-950">
              <div className="font-display font-black text-sm flex items-center justify-center gap-1.5">
                <span>DAY {justCompletedDay} COMPLETE! 🎉</span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                “One small change can become a lifelong positive habit.”
              </p>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 3. ACTIVE DAY INTERACTIVE CHALLENGE CARD */}
        {/* ======================================================== */}
        {!isAllComplete && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-teal-200 shadow-sm max-w-4xl mx-auto space-y-6 text-left">
            
            {/* Day Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-teal-700">
                  DAY {activeDayNum} OF 7
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-950 mt-1">
                  {activeDayNum === 1 && 'NOTICE YOUR DIGITAL DAY'}
                  {activeDayNum === 2 && 'MOVE YOUR BODY'}
                  {activeDayNum === 3 && 'MAKE ONE SMART FOOD CHOICE'}
                  {activeDayNum === 4 && 'CREATE SOMETHING'}
                  {activeDayNum === 5 && 'USE AI TO LEARN'}
                  {activeDayNum === 6 && 'LEAVE THE SCREEN'}
                  {activeDayNum === 7 && 'YOUR FUTURE IDEA'}
                </h3>
              </div>

              <button
                onClick={() => toggleDayCompletion(activeDayNum)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                  completedDays.includes(activeDayNum)
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-slate-900 text-white hover:bg-teal-700'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{completedDays.includes(activeDayNum) ? 'Day Completed!' : 'Mark Day Complete'}</span>
              </button>
            </div>

            {/* PARENT MODE GUIDANCE */}
            {audienceMode === 'parent' && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-xs sm:text-sm space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-indigo-900">
                  <Heart className="w-4 h-4 text-indigo-600" />
                  <span>HOW TO SUPPORT TODAY'S CHALLENGE (FOR PARENTS):</span>
                </span>
                <p className="leading-relaxed font-medium">
                  {activeDayNum === 1 && 'Observe your child’s habits with curiosity rather than criticism. Do not take the phone away today—just understand what apps capture their interest.'}
                  {activeDayNum === 2 && 'Suggest fun, low-pressure movement. Invite them for an evening bicycle ride or play a game of badminton together.'}
                  {activeDayNum === 3 && 'Keep fresh water and sliced fruit nearby while they work. Have a screen-free family dinner where everyone shares their day.'}
                  {activeDayNum === 4 && 'Ask your child to show you what they created. You don’t need to understand coding or design—just show genuine interest!'}
                  {activeDayNum === 5 && 'Help them verify one interesting question with AI. Remind them that AI is a tool, not an oracle.'}
                  {activeDayNum === 6 && 'Join your child for a walk, board game, or outdoor exploration. Real-world memories last longer than screen feeds.'}
                  {activeDayNum === 7 && 'Ask what real-world problem their idea solves. Encourage their confidence that they can be builders of the future.'}
                </p>
              </div>
            )}

            {/* DAY 1: NOTICE YOUR DIGITAL DAY */}
            {activeDayNum === 1 && (
              <div className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {lang === 'roman'
                    ? 'Aaj ka challenge hai ke aap bina kisi self-blame ke ye note karein ke aapka screen time kahan guzar raha hai.'
                    : lang === 'ur'
                    ? 'آج کا چیلنج یہ ہے کہ آپ بغیر کسی ندامت کے یہ دیکھیں کہ آپ کا زیادہ تر اسکرین وقت کن سرگرمیوں میں گزرتا ہے۔'
                    : 'Think about what you usually do on your phone or laptop. Understanding your habits is the first step toward self-regulation.'}
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-2">
                    1. What do you spend most of your screen time doing?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      '🎮 Gaming',
                      '📺 Videos',
                      '📱 Social media',
                      '📚 Learning',
                      '🎨 Creating',
                      '💬 Chatting',
                      '🤖 AI',
                      'Other',
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => setDay1MostUsed(item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                          day1MostUsed === item
                            ? 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-300'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-2">
                    2. Which activity would you like to spend less time doing?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['🎮 Gaming', '📱 Videos', '📱 Social media', 'Endless scrolling'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setDay1Reduce(item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                          day1Reduce === item
                            ? 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-300'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 leading-relaxed font-semibold">
                  “Great start! You noticed your habits today with zero guilt. That is the first step toward building your smart future.”
                </div>
              </div>
            )}

            {/* DAY 2: MOVE YOUR BODY */}
            {activeDayNum === 2 && (
              <div className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {lang === 'roman'
                    ? 'Movement ko saza mat samjhein. Apni pasand ki koi aisi physical activity chunein jo aapko maza de!'
                    : lang === 'ur'
                    ? 'ورزش کو بوجھ نہ سمجھیں۔ اپنی پسند کی کوئی ایسی جسمانی سرگرمی منتخب کریں جس سے آپ لطف اندوز ہوں۔'
                    : 'Movement doesn’t have to feel like strict exercise. Choose an activity you genuinely enjoy and give your body fresh air.'}
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-2">
                    Choose one physical activity to try today (~20–30 mins):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      '⚽ Football',
                      '🏏 Cricket',
                      '🚲 Cycling',
                      '🏸 Badminton',
                      '🚶 Walking in park',
                      '🏃 Running',
                      '💃 Dancing',
                      '🌳 Backyard tag',
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => setDay2MoveChoice(item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                          day2MoveChoice === item
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-300'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-semibold">
                  “Nice! Your body and eyes deserve time away from screens. Now put your device down and go enjoy your {day2MoveChoice}!”
                </div>
              </div>
            )}

            {/* DAY 3: MAKE ONE SMART FOOD CHOICE */}
            {activeDayNum === 3 && (
              <div className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {lang === 'roman'
                    ? 'Aapko kisi sakht diet ki zaroorat nahi hai. Aaj bas ek behtar wholesome food habit chunein.'
                    : lang === 'ur'
                    ? 'آپ کو کسی سخت خوراک کی ضرورت نہیں۔ بس آج کے دن کے لیے ایک صحت مند اور بہتر عادت چنیں۔'
                    : 'You don’t need a perfect diet. No calorie counting, no weight talk. One better choice is enough for today.'}
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-2">
                    Pick your smart food habit for today:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      '💧 Drink a glass of water when you feel like snacking',
                      '🍎 Eat a fresh apple, orange, or seasonal fruit',
                      '🥕 Add fresh vegetables to your meal',
                      '🥗 Enjoy a balanced home-cooked lunch or dinner',
                      '🍿 Choose a nutritious snack instead of chips while gaming',
                      '👨‍👩‍👧 Eat dinner with family completely screen-free',
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => setDay3FoodChoice(item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                          day3FoodChoice === item
                            ? 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-300'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed font-semibold">
                  “Awesome! Wholesome nourishment keeps your brain sharp and energetic. Small healthy choices build a strong foundation.”
                </div>
              </div>
            )}

            {/* DAY 4: CREATE SOMETHING */}
            {activeDayNum === 4 && (
              <div className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {lang === 'roman'
                    ? 'Sirf doosron ka content dekhne ke bajaye aaj technology ko create karne ke liye istemal karein.'
                    : lang === 'ur'
                    ? 'صرف دوسروں کا بنایا ہوا مواد دیکھنے کے بجائے آج ٹیکنالوجی کو کچھ نیا تخلیق کرنے کے لیے استعمال کریں۔'
                    : 'Use technology to make something instead of only consuming content. Don’t just watch—build!'}
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-2">
                    What would you like to create today?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      '🎮 Design a game',
                      '📱 Design an app',
                      '🎨 Create digital art',
                      '🌐 Design a website',
                      '🎬 Make a short video',
                      '📖 Write a story',
                      '🤖 Create an AI project',
                      '💡 Invent something',
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => setDay4CreateChoice(item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                          day4CreateChoice === item
                            ? 'bg-purple-50 border-purple-500 text-purple-950 ring-1 ring-purple-300'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 leading-relaxed space-y-1">
                  <span className="font-bold block">💡 Your Project Blueprint for Today:</span>
                  <p className="font-medium">
                    {day4CreateChoice.includes('game') && 'Draw 3 game levels and character stats on a sheet of paper, or make a sprite move in Scratch 3.0!'}
                    {day4CreateChoice.includes('app') && 'Draw the home screen of an app idea that solves a real problem in your house or school.'}
                    {day4CreateChoice.includes('art') && 'Pick 2 colors and draw a futuristic superhero logo on paper or a digital canvas.'}
                    {day4CreateChoice.includes('video') && 'Write a 4-line script and record a 30-second stop-motion animation with clay or paper!'}
                    {day4CreateChoice.includes('story') && 'Write a 200-word adventure with a surprise ending and illustrate the main scene.'}
                    {day4CreateChoice.includes('website') && 'Sketch the layout of a personal portfolio displaying your favorite hobbies and goals.'}
                    {day4CreateChoice.includes('AI') && 'Ask AI to help brainstorm a funny story outline, then rewrite the ending yourself!'}
                    {day4CreateChoice.includes('Invent') && 'Pick one daily household hassle and sketch a creative invention that solves it!'}
                  </p>
                </div>
              </div>
            )}

            {/* DAY 5: USE AI TO LEARN */}
            {activeDayNum === 5 && (
              <div className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Ask AI something you’ve always wanted to understand. Remember the rule:{' '}
                  <strong>ASK → THINK → CHECK → LEARN</strong>. Never trust answers blindly!
                </p>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 block">
                    Choose or type a curiosity question:
                  </label>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'How does a video game work?',
                      'How are mobile apps made?',
                      'Why does the sky change color?',
                      'How does AI learn from data?',
                      'How can I make a simple website?',
                    ].map((sample) => (
                      <button
                        key={sample}
                        onClick={() => setDay5AiQuery(sample)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-900 transition-colors text-slate-700 font-medium cursor-pointer"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={day5AiQuery}
                      onChange={(e) => setDay5AiQuery(e.target.value)}
                      placeholder="Ask any curiosity question..."
                      className="flex-1 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    />
                    <button
                      onClick={handleAskDay5Ai}
                      disabled={day5IsThinking}
                      className="px-4 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      {day5IsThinking ? 'Asking...' : 'Ask AI'}
                    </button>
                  </div>

                  {day5AiAnswer && (
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 space-y-2">
                      <span className="font-bold block text-teal-900">AI Explanation:</span>
                      <p className="leading-relaxed font-medium">{day5AiAnswer}</p>
                      <div className="text-[11px] text-teal-800 bg-white/70 p-2 rounded-lg border border-teal-100 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Verification Check: Can you find a book or adult to confirm this fact today?</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DAY 6: LEAVE THE SCREEN */}
            {activeDayNum === 6 && (
              <div className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {lang === 'roman'
                    ? 'Technology zindagi ka hissa hai, lekin technology ko poori zindagi nahi banna chahiye. Aaj screen band karein aur real life enjoy karein!'
                    : lang === 'ur'
                    ? 'ٹیکنالوجی زندگی کا ایک حصہ ہے، لیکن یہ پوری زندگی نہیں ہونی چاہیے۔ آج اسکرین بند کریں اور حقیقی دنیا سے جڑیں۔'
                    : 'Technology is part of life—but it shouldn’t replace life. Put all devices down for 45 minutes and experience the physical world.'}
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-2">
                    Pick your real-world offline activity:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      '👨‍👩‍👧 Spend time with family',
                      '⚽ Play outside',
                      '🌳 Explore nature / park',
                      '📚 Read a physical book',
                      '🎨 Sketch in notebook',
                      '🧩 Play a board game',
                      '🗣️ Long chat with friends',
                      '🚶 Evening walk',
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => setDay6RealWorldChoice(item)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                          day6RealWorldChoice === item
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-300'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-semibold">
                  “Good job! Real-world memories matter. Now close this website and go enjoy {day6RealWorldChoice}!”
                </div>
              </div>
            )}

            {/* DAY 7: YOUR FUTURE IDEA */}
            {activeDayNum === 7 && (
              <div className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {lang === 'roman'
                    ? 'Aapke zehen mein koi idea hai jo kisi real problem ko solve kar sake? AI Coach aapko usko implement karne ka roadmap dega!'
                    : lang === 'ur'
                    ? 'کیا آپ کے ذہن میں کوئی ایسا خیال ہے جو کسی حقیقی مسئلے کو حل کر سکے؟ آئیے اسے ایک عملی منصوبے میں تبدیل کریں۔'
                    : 'Think of something you would like to create. What real-world problem would your invention solve?'}
                </p>

                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-2">
                    1. Select your invention type:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      '📱 App',
                      '🎮 Game',
                      '🌐 Website',
                      '🤖 AI Assistant',
                      '🎨 Design Project',
                      '🌱 Environmental Tool',
                      '🏫 School Solution',
                      '🏘️ Community Solution',
                      '💡 Something Else',
                    ].map((type) => (
                      <button
                        key={type}
                        onClick={() => setDay7IdeaType(type)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                          day7IdeaType === type
                            ? 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-300'
                            : 'bg-[#FAFAF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-2">
                    2. What problem would your idea solve?
                  </label>
                  <textarea
                    rows={2}
                    value={day7ProblemText}
                    onChange={(e) => setDay7ProblemText(e.target.value)}
                    placeholder="e.g. Help younger students practice math with a friendly robot, or share neighborhood sports equipment..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>

                <button
                  onClick={handleGenerateDay7Idea}
                  disabled={day7IsLoading}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {day7IsLoading ? 'Generating Your Future Blueprint...' : 'Break Down My Future Idea with Gemini AI'}
                </button>

                {day7Result && (
                  <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-slate-200 space-y-3 animate-in fade-in duration-200 text-left">
                    <div className="border-b border-slate-200 pb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                        GEMINI FUTURE BLUEPRINT
                      </span>
                      <h4 className="font-display font-black text-lg text-slate-950">
                        {day7Result.idea}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Problem Solved:</span>
                        <p className="text-slate-600">{day7Result.problem}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Who It Helps:</span>
                        <p className="text-slate-600">{day7Result.whoItHelps}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950">
                      <span className="font-bold block mb-0.5">Your First Step Today (15 Mins):</span>
                      <p className="font-semibold">{day7Result.firstStep}</p>
                    </div>

                    <div className="text-xs">
                      <span className="font-bold text-slate-900 block mb-1">Skills to Cultivate:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {day7Result.skillsToLearn.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. GRAND COMPLETION SCREEN (AFTER DAY 7) */}
        {/* ======================================================== */}
        {isAllComplete && (
          <div className="bg-gradient-to-br from-teal-800 via-emerald-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-8 shadow-xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-amber-300 text-2xl shadow-lg">
              🌟
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-teal-300">
                CHALLENGE COMPLETED
              </span>
              <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                “YOU DID IT! 7 DAYS OF SMARTER CHOICES.”
              </h3>
              <p className="text-xs sm:text-sm text-teal-100 max-w-xl mx-auto leading-relaxed">
                You don't have to be perfect. The goal is simply to keep making small, better choices every single day.
              </p>
            </div>

            {/* 6 Accomplishment Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-xl mb-1">📱</div>
                <span className="text-xs font-bold block text-white">Better Digital Balance</span>
                <p className="text-[11px] text-teal-200 mt-0.5">Noticed habits with zero guilt</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-xl mb-1">🏃</div>
                <span className="text-xs font-bold block text-white">More Movement</span>
                <p className="text-[11px] text-teal-200 mt-0.5">Physical play that feels like fun</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-xl mb-1">🥗</div>
                <span className="text-xs font-bold block text-white">Smarter Food Choices</span>
                <p className="text-[11px] text-teal-200 mt-0.5">Wholesome nourishment without diets</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-xl mb-1">🎨</div>
                <span className="text-xs font-bold block text-white">More Creativity</span>
                <p className="text-[11px] text-teal-200 mt-0.5">Turned screen time into creation</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-xl mb-1">🤖</div>
                <span className="text-xs font-bold block text-white">Productive Technology</span>
                <p className="text-[11px] text-teal-200 mt-0.5">Used AI as a thinking tool</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <div className="text-xl mb-1">❤️</div>
                <span className="text-xs font-bold block text-white">More Real-World Time</span>
                <p className="text-[11px] text-teal-200 mt-0.5">Connected with family & offline life</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onOpenAiPlan && (
                <button
                  onClick={onOpenAiPlan}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-teal-950 hover:bg-teal-50 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>BUILD MY NEXT PLAN (AI COACH)</span>
                </button>
              )}

              <button
                onClick={handleResetChallenge}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-white/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start Challenge Again</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
