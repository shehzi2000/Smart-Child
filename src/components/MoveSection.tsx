import React, { useState } from 'react';
import {
  Activity,
  Footprints,
  Bike,
  Sun,
  Trees,
  Users,
  Timer,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Heart,
  Calendar,
  Clock,
  Compass,
  Zap,
} from 'lucide-react';

interface MoveSectionProps {
  onStartMoveChallenge: () => void;
}

export const MoveSection: React.FC<MoveSectionProps> = ({ onStartMoveChallenge }) => {
  const [imageError, setImageError] = useState(false);
  const [activeDuration, setActiveDuration] = useState<'15' | '30' | '60'>('30');
  const [selectedActivity, setSelectedActivity] = useState<string>('football');
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({
    mon: true,
    tue: true,
  });

  const toggleDay = (dayKey: string) => {
    setCompletedDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  const activities = [
    {
      id: 'football',
      name: 'Football',
      emoji: '⚽',
      tagline: 'Team play & field endurance',
      desc: 'Run, play, cooperate and have fun with friends on the grass.',
      benefit: 'Aerobic stamina, agility, and social cooperation.',
    },
    {
      id: 'cricket',
      name: 'Cricket',
      emoji: '🏏',
      tagline: 'Precision & concentration',
      desc: 'Learn teamwork, concentration and outdoor hand-eye coordination.',
      benefit: 'Focus endurance, reflexes, and strategic thinking.',
    },
    {
      id: 'cycling',
      name: 'Cycling',
      emoji: '🚲',
      tagline: 'Everyday active mobility',
      desc: 'Build movement into everyday life while exploring your neighborhood.',
      benefit: 'Leg strength, vestibular balance, and navigation.',
    },
    {
      id: 'running',
      name: 'Running',
      emoji: '🏃',
      tagline: 'Natural dopamine sprint',
      desc: 'Build stamina, clear mental chatter, and feel the natural breeze.',
      benefit: 'Cardiovascular health, mood elevation, and bone density.',
    },
    {
      id: 'walking',
      name: 'Walking',
      emoji: '🚶',
      tagline: 'Gentle mindful pacing',
      desc: 'Simple daily walks for peaceful conversation, curiosity and reflection.',
      benefit: 'Low-impact joint health, stress relief, and family connection.',
    },
    {
      id: 'badminton',
      name: 'Badminton',
      emoji: '🏸',
      tagline: 'High-speed reaction',
      desc: 'Fast reflexes, agility, and easy backyard fun with siblings.',
      benefit: 'Hand-eye coordination, quick direction shifts, and laughter.',
    },
    {
      id: 'swimming',
      name: 'Swimming',
      emoji: '🏊',
      tagline: 'Full-body vitality',
      desc: 'Full-body endurance, gentle on joints, and refreshing vitality.',
      benefit: 'Lung capacity, symmetrical muscular development, and cool energy.',
    },
    {
      id: 'creative-play',
      name: 'Outdoor Creative Play',
      emoji: '🎨',
      tagline: 'Imaginative playground',
      desc: 'Chalk drawing, obstacle building, and open-ended imagination.',
      benefit: 'Spatial problem solving, hands-on crafting, and creativity.',
    },
    {
      id: 'nature',
      name: 'Nature Exploration',
      emoji: '🌳',
      tagline: 'Curiosity in the wild',
      desc: 'Put the screen down and discover the world around you.',
      benefit: 'Sensory awareness, ecological curiosity, and grounding calmness.',
    },
    {
      id: 'family',
      name: 'Family Activities',
      emoji: '👨‍👩‍👧',
      tagline: 'Screen-free bonding',
      desc: 'Weekend park visits, treasure hunts, and device-free memories.',
      benefit: 'Shared laughter, emotional security, and lifelong active habits.',
    },
  ];

  const weekSchedule = [
    { key: 'mon', day: 'MON', activity: '20 min walk', tip: 'Unwind after school with an easy neighborhood stroll.' },
    { key: 'tue', day: 'TUE', activity: 'Outdoor game', tip: 'Tag, hide & seek, or playground monkey bars.' },
    { key: 'wed', day: 'WED', activity: 'Cycling', tip: 'Pedal around the local park or dedicated bike lane.' },
    { key: 'thu', day: 'THU', activity: 'Family walk', tip: 'Listen to birds and chat about the school week.' },
    { key: 'fri', day: 'FRI', activity: 'Football / Cricket', tip: 'Friendly park match with classmates or siblings.' },
    { key: 'sat', day: 'SAT', activity: 'Park adventure', tip: 'Pack a water flask and explore a nearby green reserve.' },
    { key: 'sun', day: 'SUN', activity: 'Family activity', tip: 'Backyard badminton, frisbee, or beach walk.' },
  ];

  const currentActivityObj = activities.find((a) => a.id === selectedActivity) || activities[0];

  return (
    <section id="move" className="py-20 md:py-28 bg-white relative overflow-hidden border-b border-slate-200/80">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/3 w-[650px] h-[450px] bg-gradient-to-b from-emerald-100/35 via-teal-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-50/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (User specified) */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>FROM SCREEN TO REAL WORLD</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12] text-balance">
            MOVE YOUR BODY. CLEAR YOUR MIND.
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal text-balance">
            “Technology can be part of a child's life without replacing movement. Every child needs time
            for outdoor play, sports, walking, exercise, nature and real-world experiences.”
          </p>
        </div>

        {/* HERO VISUAL: Large energetic visual showing children doing different physical activities */}
        <div className="relative mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-16/9 md:aspect-21/9 bg-slate-100">
            {!imageError ? (
              <img
                src="/src/assets/images/kids_outdoor_movement_1790896768687.jpg"
                alt="Active children happily playing football, cycling, and running in a sunny park"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 text-center">
                <Sun className="w-14 h-14 text-emerald-600 mb-3" />
                <div className="font-display text-2xl font-bold text-slate-900">
                  Outdoor Movement & Play
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Football · Cricket · Cycling · Running · Nature Exploration
                </div>
              </div>
            )}

            {/* Bottom Scrim & Message */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-World Vitality</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  “Every movement counts.”
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                  Not about training professional athletes — but making healthy, joyful motion a normal
                  part of everyday growing up.
                </p>
              </div>

              {/* Floating Sports Quick-Pills */}
              <div className="hidden lg:flex flex-wrap gap-2 justify-end max-w-sm">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">⚽ Football</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🏏 Cricket</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🚲 Cycling</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🏃 Running</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🌳 Nature</span>
              </div>
            </div>
          </div>
        </div>

        {/* BALANCE MESSAGE: Large visual comparison (User specified) */}
        <div className="my-16 bg-[#FAFAF8] rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
              The Physical Shift
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 mt-1">
              Comparing Daily Routines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Left: TOO MUCH SITTING */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-white border border-rose-200 shadow-xs text-center">
              <div className="text-xs font-extrabold uppercase tracking-wider text-rose-800 mb-2">
                Unbalanced Routine
              </div>
              <div className="font-display text-xl sm:text-2xl font-black text-slate-900 mb-1">
                TOO MUCH SITTING
              </div>
              <div className="text-3xl my-2">📱</div>
              <div className="text-sm font-bold text-rose-600 mb-2">↓</div>
              <div className="inline-block px-4 py-2 rounded-xl bg-rose-50 text-rose-800 font-extrabold text-sm border border-rose-100">
                LESS MOVEMENT
              </div>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Slouched posture, reduced blood oxygen, eye strain, and delayed sleep onset.
              </p>
            </div>

            {/* Center Bridge Arrow */}
            <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-teal-300 flex items-center justify-center font-bold shadow-md my-1">
                <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">
                SHIFT
              </span>
            </div>

            {/* Right: SMART DIGITAL BALANCE */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-white border border-emerald-200 shadow-xs text-center">
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-2">
                Healthy Living Formula
              </div>
              <div className="font-display text-xl sm:text-2xl font-black text-slate-900 mb-1">
                SMART DIGITAL BALANCE
              </div>
              <div className="text-3xl my-2 flex items-center justify-center gap-2">
                <span>📱</span>
                <span className="text-lg font-bold text-slate-400">+</span>
                <span>🏃</span>
              </div>
              <div className="text-sm font-bold text-emerald-600 mb-2">↓</div>
              <div className="inline-block px-4 py-2 rounded-xl bg-emerald-50 text-emerald-900 font-extrabold text-sm border border-emerald-200">
                MORE ACTIVE TIME
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Natural Vitamin D, elevated mood, cardiovascular resilience, and calm, restorative sleep.
              </p>
            </div>
          </div>
        </div>

        {/* ACTIVITY DISCOVERY: What does your child enjoy? (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-800">
              Pick What Sparkles
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              What does your child enjoy?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Every child has a unique movement style. Explore these ten enjoyable activities:
            </p>
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {activities.map((item) => {
              const isSelected = selectedActivity === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedActivity(item.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-400/50 scale-[1.02]'
                      : 'bg-white text-slate-900 border-slate-200/80 hover:border-emerald-300 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="text-3xl mb-3">{item.emoji}</div>
                    <h4 className="font-display font-extrabold text-base mb-1">
                      {item.name}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                      “{item.desc}”
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100/20 text-[11px] font-semibold text-emerald-500">
                    Tap to view impact →
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Activity Detail Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentActivityObj.emoji}</span>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-900">
                  Featured Movement: {currentActivityObj.name}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                  <strong>Developmental Gain:</strong> {currentActivityObj.benefit}
                </p>
              </div>
            </div>
            <button
              onClick={onStartMoveChallenge}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              Add to Weekly Routine
            </button>
          </div>
        </div>

        {/* 15 / 30 / 60 MINUTE CHALLENGES (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-800">
              Flexible Daily Windows
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              15 / 30 / 60 Minute Challenges
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Suggestions adapted for any family schedule — not medical prescriptions.
            </p>
          </div>

          {/* 3 Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 15 Minutes: Quick Move */}
            <div
              onClick={() => setActiveDuration('15')}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                activeDuration === '15'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl ring-2 ring-emerald-400/50'
                  : 'bg-white text-slate-900 border-slate-200/90 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-black uppercase tracking-widest ${activeDuration === '15' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    15 MINUTES
                  </span>
                  <Clock className="w-5 h-5 text-emerald-500" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-black mb-3">
                  “Quick Move”
                </h4>
                <p className={`text-xs sm:text-sm mb-6 ${activeDuration === '15' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Perfect between school and homework. Easy quick sparks that break the sedentary groove.
                </p>
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center gap-2">✓ Quick neighborhood walk</div>
                  <div className="flex items-center gap-2">✓ Living room stretch routine</div>
                  <div className="flex items-center gap-2">✓ Jump rope or trampoline bounces</div>
                  <div className="flex items-center gap-2">✓ Play outside in the yard</div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100/20 text-xs font-bold">
                Low effort · Immediate reset
              </div>
            </div>

            {/* 30 Minutes: Active Break */}
            <div
              onClick={() => setActiveDuration('30')}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                activeDuration === '30'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl ring-2 ring-emerald-400/50'
                  : 'bg-white text-slate-900 border-slate-200/90 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-black uppercase tracking-widest ${activeDuration === '30' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    30 MINUTES
                  </span>
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-black mb-3">
                  “Active Break”
                </h4>
                <p className={`text-xs sm:text-sm mb-6 ${activeDuration === '30' ? 'text-slate-300' : 'text-slate-600'}`}>
                  A structured athletic burst that builds cardiovascular strength and sharpens attention.
                </p>
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center gap-2">✓ Football or soccer shootouts</div>
                  <div className="flex items-center gap-2">✓ Cricket bowling & batting session</div>
                  <div className="flex items-center gap-2">✓ Cycling path laps</div>
                  <div className="flex items-center gap-2">✓ Walking with family and sharing stories</div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100/20 text-xs font-bold">
                Daily sweet spot · Elevates focus
              </div>
            </div>

            {/* 60 Minutes: Real-World Adventure */}
            <div
              onClick={() => setActiveDuration('60')}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                activeDuration === '60'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl ring-2 ring-emerald-400/50'
                  : 'bg-white text-slate-900 border-slate-200/90 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-black uppercase tracking-widest ${activeDuration === '60' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    60 MINUTES
                  </span>
                  <Sun className="w-5 h-5 text-emerald-500" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-black mb-3">
                  “Real-World Adventure”
                </h4>
                <p className={`text-xs sm:text-sm mb-6 ${activeDuration === '60' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Deep immersion in the outdoors. Restores natural circadian sleep cycles.
                </p>
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center gap-2">✓ Team outdoor sports games</div>
                  <div className="flex items-center gap-2">✓ Park visit with playground obstacles</div>
                  <div className="flex items-center gap-2">✓ Extended family cycling loop</div>
                  <div className="flex items-center gap-2">✓ Nature trail scavenger activity</div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100/20 text-xs font-bold">
                Weekend reset · Deep sleep booster
              </div>
            </div>
          </div>
        </div>

        {/* SCREEN BREAK IDEA: THE 20–20–20 IDEA (User specified) */}
        <div className="my-20 max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-teal-50/90 via-emerald-50/60 to-white border border-teal-200/90 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              SMART DEVICE ROUTINE
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase">
              Screen Break Idea
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mb-3 tracking-tight">
            “THE 20–20–20 IDEA”
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            “For screen-heavy activities, encourage regular breaks. Every child is different, so
            parents should choose routines appropriate for the child's age and needs.”
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center bg-white p-5 rounded-2xl border border-teal-100 shadow-2xs">
            {/* Visual Timer Indicator */}
            <div className="flex items-center justify-center p-4">
              <div className="relative w-36 h-36 rounded-full border-4 border-teal-200 flex items-center justify-center">
                <div className="absolute inset-1 rounded-full border-2 border-dashed border-teal-400 animate-spin [animation-duration:15s]" />
                <div className="text-center">
                  <div className="text-xs font-bold uppercase text-teal-700">Every</div>
                  <div className="font-mono text-2xl font-black text-slate-950">20 min</div>
                  <div className="text-[10px] text-slate-500">Pause & Stretch</div>
                </div>
              </div>
            </div>

            {/* The 4 Actions */}
            <div className="space-y-2 text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-teal-50/60">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                <span>Stand up.</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-teal-50/60">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                <span>Look away into the distance.</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-teal-50/60">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                <span>Move around.</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-100/60 text-emerald-900 font-extrabold">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                <span>Come back refreshed.</span>
              </div>
            </div>
          </div>
        </div>

        {/* WEEKLY MOVEMENT CHALLENGE: THIS WEEK'S MOVE CHALLENGE (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-800">
              7-Day Momentum
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              THIS WEEK'S MOVE CHALLENGE
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Click any day to mark it completed or adjust for your family's schedule:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weekSchedule.map((item) => {
              const isDone = completedDays[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleDay(item.key)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isDone
                      ? 'bg-emerald-50/90 border-emerald-300 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-black uppercase text-slate-900">
                        {item.day}
                      </span>
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isDone ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'
                        }`}
                      />
                    </div>
                    <div className="font-display font-extrabold text-xs sm:text-sm text-slate-950 mb-1">
                      {item.activity}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100 leading-tight">
                    {item.tip}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PARENT TIP: MAKE MOVEMENT NORMAL — NOT A PUNISHMENT (User specified) */}
        <div className="my-20 max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 bg-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 block mb-2">
              PARENT COACHING TIP
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              “MAKE MOVEMENT NORMAL — NOT A PUNISHMENT.”
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              “Don't present physical activity as something children must do because they used their
              phone. Make movement a normal and enjoyable part of everyday life.”
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block mb-1">
                  DON’T SAY:
                </span>
                <span className="text-xs sm:text-sm text-rose-200 font-semibold italic">
                  “You used your phone, now go outside.”
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/60">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block mb-1">
                  TRY INSTEAD:
                </span>
                <span className="text-xs sm:text-sm text-emerald-100 font-extrabold">
                  “Let's go outside and do something fun.”
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* IMPORTANT BALANCE MESSAGE: THE GOAL ISN'T TO ELIMINATE SCREENS (User specified) */}
        <div className="my-20 p-8 sm:p-12 rounded-3xl bg-[#FAFAF8] text-center border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
          <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-800 mb-2">
            THE GOAL ISN'T TO ELIMINATE SCREENS.
          </div>

          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 tracking-tight mb-4 text-balance">
            THE GOAL IS TO MAKE ROOM FOR LIFE.
          </h3>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto text-balance">
            “Screens can teach. Technology can create opportunities. But children also need to run,
            play, explore, laugh, move and experience the real world.”
          </p>
        </div>

        {/* CTA: READY TO GET MOVING? (User specified) */}
        <div className="text-center pt-6 max-w-2xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-2">
            READY TO GET MOVING?
          </h3>

          <p className="text-sm sm:text-base text-slate-600 mb-6">
            “Choose one small activity today.”
          </p>

          <button
            onClick={onStartMoveChallenge}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-emerald-700 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-base uppercase tracking-wider"
          >
            <span>START A MOVE CHALLENGE</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
