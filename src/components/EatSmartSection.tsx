import React, { useState } from 'react';
import {
  Apple,
  Utensils,
  Droplet,
  Sparkles,
  Heart,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Layers,
  ChefHat,
  Zap,
  Info,
  Calendar,
} from 'lucide-react';

interface EatSmartSectionProps {
  onBuildRoutine: () => void;
}

export const EatSmartSection: React.FC<EatSmartSectionProps> = ({ onBuildRoutine }) => {
  const [imageError, setImageError] = useState(false);
  const [activeSwapIndex, setActiveSwapIndex] = useState<number>(0);
  const [completedFoodDays, setCompletedFoodDays] = useState<Record<string, boolean>>({
    mon: true,
    tue: true,
  });

  const toggleFoodDay = (dayKey: string) => {
    setCompletedFoodDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  const swapCards = [
    {
      from: 'CHIPS',
      to: 'ROASTED CHICKPEAS / HOMEMADE SNACK',
      fromCategory: 'Ultra-processed salty bag',
      toCategory: 'Crispy crunchy & high-fiber',
      reason: 'Delivers the crunch children crave while providing sustained plant protein without sodium dehydration.',
    },
    {
      from: 'SUGARY DRINK',
      to: 'WATER / MILK / UNSWEETENED OPTIONS',
      fromCategory: 'Caffeinated or syrup sodas',
      toCategory: 'Pure hydration & calcium',
      reason: 'Keeps young brains hydrated and attention steady, avoiding energy spikes and late-afternoon mood dips.',
    },
    {
      from: 'CANDY EVERY DAY',
      to: 'FRUIT / YOGURT / OCCASIONAL TREAT',
      fromCategory: 'Daily refined sugar candy',
      toCategory: 'Natural sweetness & live cultures',
      reason: 'Treats can remain an occasional delight while seasonal fruits and creamy curd become joyful everyday go-tos.',
    },
    {
      from: 'FAST FOOD',
      to: 'HOMEMADE BURGER / WRAP / BALANCED MEAL',
      fromCategory: 'Commercial fried drive-thru',
      toCategory: 'Freshly seasoned kitchen wrap',
      reason: 'Children still enjoy burgers and wraps, but made with clean oils, lean patties, fresh lettuce, and whole roti.',
    },
  ];

  const pakistaniFoods = [
    { emoji: '🥚', name: 'Eggs', benefit: 'Choline & protein for growing memory and cellular repair.' },
    { emoji: '🥛', name: 'Milk / Yogurt', benefit: 'Natural calcium, probiotic gut health, and refreshing cooling.' },
    { emoji: '🍌', name: 'Bananas & Seasonal Fruit', benefit: 'Potassium, vitamins, and instant natural energy for sports.' },
    { emoji: '🥜', name: 'Nuts / Roasted Chickpeas', benefit: 'Healthy fats, zinc, and a beloved crunchy tea-time snack.' },
    { emoji: '🍲', name: 'Daal', benefit: 'Comforting plant protein, iron, and slow-burning complex carbs.' },
    { emoji: '🍚', name: 'Balanced Rice Meals', benefit: 'Paired with vegetables or lentils for complete amino acid profiles.' },
    { emoji: '🫓', name: 'Roti with Nutritious Curry', benefit: 'Whole-wheat fiber and antioxidant spices like turmeric.' },
    { emoji: '🥗', name: 'Fresh Salad', benefit: 'Cucumbers, tomatoes, and greens for hydration and digestion.' },
    { emoji: '💧', name: 'Pure Water', benefit: 'The foundational baseline of energy, clear focus, and vitality.' },
  ];

  const weeklyFoodPlan = [
    { key: 'mon', day: 'MON', challenge: 'Choose water', tip: 'Carry a cool reusable water bottle to school and desk.' },
    { key: 'tue', day: 'TUE', challenge: 'Add one fruit', tip: 'Enjoy an afternoon apple, banana, or bowl of pomegranate.' },
    { key: 'wed', day: 'WED', challenge: 'Try a homemade snack', tip: 'Roasted chickpeas, roasted nuts, or yogurt with honey.' },
    { key: 'thu', day: 'THU', challenge: 'Screen-free meal', tip: 'Turn off screens during dinner and share funny day stories.' },
    { key: 'fri', day: 'FRI', challenge: 'Help prepare food', tip: 'Let the child wash greens, peel fruit, or assemble a wrap.' },
    { key: 'sat', day: 'SAT', challenge: 'Try a new healthy food', tip: 'Pick one colorful new vegetable or fruit at the bazaar.' },
    { key: 'sun', day: 'SUN', challenge: 'Family meal', tip: 'Sit together for a wholesome Sunday lunch with no devices.' },
  ];

  return (
    <section id="eat-smart" className="py-20 md:py-28 bg-[#FAFAF8] relative overflow-hidden border-b border-slate-200/80">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[450px] bg-gradient-to-b from-amber-100/30 via-emerald-50/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-50/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro (User specified) */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Apple className="w-3.5 h-3.5 text-emerald-600" />
            <span>FOOD + ENERGY + GROWTH</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12] text-balance">
            FUEL YOUR BODY. FEED YOUR FUTURE.
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal text-balance">
            “Children need good food and enough energy to learn, play, think, create and grow. The
            goal isn't to ban every treat — it's to build healthier everyday habits.”
          </p>
        </div>

        {/* HERO VISUAL: Child-Friendly Balanced Meal Visual (User specified) */}
        <div className="relative mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-16/9 md:aspect-21/9 bg-slate-100">
            {!imageError ? (
              <img
                src="/src/assets/images/eat_smart_balanced_meal_1790897115279.jpg"
                alt="Colorful, appetizing child-friendly balanced meal with fruits, egg, yogurt, roti, cucumber salad, and water"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-50 to-emerald-50 text-center">
                <Utensils className="w-14 h-14 text-emerald-600 mb-3" />
                <div className="font-display text-2xl font-bold text-slate-900">
                  Nutritious, Balanced Everyday Plate
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Fruit · Vegetables · Eggs · Milk · Whole Grains · Water
                </div>
              </div>
            )}

            {/* Bottom Scrim & Balance Message */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Wholesome Nutrition</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  “Balance — not restriction.”
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                  Healthy living isn't about guilt or strict dieting. It's about prioritizing foods that
                  give children clear minds, joyful movement, and steady vitality.
                </p>
              </div>

              {/* Quick Pills */}
              <div className="hidden lg:flex flex-wrap gap-2 justify-end max-w-sm">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🍎 Fresh Fruit</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🥚 Farm Eggs</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🥛 Fresh Curd</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">🫓 Whole Roti</span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">💧 Pure Water</span>
              </div>
            </div>
          </div>
        </div>

        {/* THE PROBLEM: WHEN SNACKING BECOMES A HABIT (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800">
              Understanding Eating Routines
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              WHEN SNACKING BECOMES A HABIT
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              “Fast food, sugary drinks, chips, sweets and other highly processed snacks can be
              convenient and enjoyable. The concern is when they become a regular replacement for
              nutritious meals and snacks.”
            </p>
          </div>

          {/* Four Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: TOO MUCH FAST FOOD */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">🍟</div>
                <h4 className="font-display font-extrabold text-lg text-slate-950 mb-2">
                  TOO MUCH FAST FOOD
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Frequent fast food can make it harder to maintain a balanced eating routine.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700">
                Heavy routine displacement
              </div>
            </div>

            {/* Card 2: SUGARY DRINKS */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">🥤</div>
                <h4 className="font-display font-extrabold text-lg text-slate-950 mb-2">
                  SUGARY DRINKS
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Water and nutritious drinks should have a regular place in a child's routine.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-bold text-teal-700">
                Hydration over empty syrups
              </div>
            </div>

            {/* Card 3: CONSTANT SNACKING */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">🍫</div>
                <h4 className="font-display font-extrabold text-lg text-slate-950 mb-2">
                  CONSTANT SNACKING
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Eating while watching videos or gaming can make children less aware of how much they
                  are eating.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-bold text-rose-700">
                Mindless screen grazing
              </div>
            </div>

            {/* Card 4: LESS NUTRITIOUS CHOICES */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">🥗</div>
                <h4 className="font-display font-extrabold text-lg text-slate-950 mb-2">
                  LESS NUTRITIOUS CHOICES
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Children need a variety of nutritious foods to support growth, learning and activity.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
                Nutrient diversity matters
              </div>
            </div>
          </div>
        </div>

        {/* SWAP, DON'T JUST STOP (User specified) */}
        <div className="my-20 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
              Positive Substitution Strategy
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              “SWAP, DON'T JUST STOP.”
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              “Instead of simply saying ‘No’, give children an attractive alternative.”
            </p>
            <div className="mt-2 text-xs text-slate-400 italic">
              (Suggestions and examples — not strict medical rules)
            </div>
          </div>

          {/* 4 Interactive Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {swapCards.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveSwapIndex(idx)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  activeSwapIndex === idx
                    ? 'bg-[#FBFBFA] border-emerald-400 shadow-md ring-2 ring-emerald-300/40'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-4">
                    <span>Swap Pair #{idx + 1}</span>
                    <span className="text-emerald-700 font-extrabold uppercase text-[11px]">
                      Gentle Alternative
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Before */}
                    <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">
                          Current Screen Habit
                        </span>
                        <span className="text-sm font-bold text-slate-800 line-through decoration-rose-300">
                          {item.from}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">{item.fromCategory}</span>
                    </div>

                    <div className="flex justify-center text-emerald-600 font-bold text-sm">↓</div>

                    {/* After */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                          Tasty Upgrade
                        </span>
                        <span className="text-sm font-extrabold text-emerald-950">
                          {item.to}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-800 font-semibold">{item.toCategory}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-4 leading-relaxed italic">
                  💡 {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PAKISTANI FAMILY OPTIONS: HEALTHIER CHOICES FROM HOME (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-800">
              Culturally Familiar & Wholesome
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
              HEALTHIER CHOICES FROM HOME
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-semibold text-emerald-900">
              “Healthy food doesn't have to be expensive, foreign or complicated.”
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Time-tested, accessible staples from traditional kitchens that naturally nourish growing children.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pakistaniFoods.map((food, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <div className="text-3xl mb-2">{food.emoji}</div>
                <h4 className="font-display font-bold text-base text-slate-950 mb-1">
                  {food.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {food.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SCREEN + FOOD: DON'T MAKE EVERY SCREEN SESSION A SNACK SESSION (User specified) */}
        <div className="my-20 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-teal-400 block mb-2">
              MINDFUL DIGITAL BOUNDARIES
            </span>

            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              “DON'T MAKE EVERY SCREEN SESSION A SNACK SESSION.”
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8 text-balance">
              “When children always eat while watching videos or gaming, eating can become connected to
              screen time. Try creating some screen-free meals and snack times.”
            </p>

            {/* Visual Transformation Flow:
                SCREEN + SNACK ↓ SCREEN-FREE MEAL ↓ MINDFUL EATING ↓ BETTER HABITS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">Trigger</span>
                <span className="text-xs font-black text-white">SCREEN + SNACK</span>
                <span className="text-[11px] text-slate-400 block mt-1">Unaware munching</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Shift</span>
                <span className="text-xs font-black text-white">SCREEN-FREE MEAL</span>
                <span className="text-[11px] text-slate-400 block mt-1">Devices put away</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">Experience</span>
                <span className="text-xs font-black text-white">MINDFUL EATING</span>
                <span className="text-[11px] text-slate-400 block mt-1">Taste, chew & chat</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block mb-1">Outcome</span>
                <span className="text-xs font-black text-emerald-100">BETTER HABITS</span>
                <span className="text-[11px] text-emerald-300 block mt-1">Healthy long-term cues</span>
              </div>
            </div>
          </div>
        </div>

        {/* PARENT TIP: MAKE HEALTHY FOOD EASY TO CHOOSE (User specified) */}
        <div className="my-20 max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-amber-50/70 via-emerald-50/60 to-white border border-emerald-200/90 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-900">
              PARENT PRACTICAL GUIDE
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase">
              Parent Tip
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mb-3 tracking-tight">
            “MAKE HEALTHY FOOD EASY TO CHOOSE.”
          </h3>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
            “Children are more likely to choose healthy options when nutritious foods are available,
            visible and convenient. Involve children in choosing, preparing and learning about food.”
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: '🍎', text: 'Let them choose a fruit', sub: 'At the grocery shop or home fruit bowl' },
              { icon: '🥪', text: 'Prepare a simple snack together', sub: 'Spreading nut butter or making a roll' },
              { icon: '👩‍🍳', text: 'Let them help in the kitchen', sub: 'Washing vegetables and setting the table' },
              { icon: '🏷️', text: 'Teach them to read food labels', sub: 'Spotting hidden sugars and sodium' },
              { icon: '💧', text: 'Make water easily available', sub: 'Keep a clean water jug within child reach' },
            ].map((tip, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/90 border border-emerald-100 shadow-2xs">
                <div className="text-xl mb-1">{tip.icon}</div>
                <div className="font-bold text-xs text-slate-900">{tip.text}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{tip.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* IMPORTANT MESSAGE (User specified) */}
        <div className="my-20 p-8 sm:p-12 rounded-3xl bg-[#FAFAF8] text-center border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
          <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-800 mb-2">
            HEALTHY DOESN'T MEAN BORING.
          </div>

          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 tracking-tight mb-6 text-balance">
            “FOOD SHOULD GIVE CHILDREN ENERGY TO PLAY, LEARN AND CREATE.”
          </h3>

          {/* Visual Connection Formula */}
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
            <span className="text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg">GOOD FOOD</span>
            <span className="text-emerald-600">+</span>
            <span className="text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg">MOVEMENT</span>
            <span className="text-emerald-600">+</span>
            <span className="text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg">SLEEP</span>
            <span className="text-emerald-600">+</span>
            <span className="text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg">SMART TECHNOLOGY</span>
            <span className="text-emerald-600 font-extrabold">=</span>
            <span className="text-emerald-950 font-black bg-emerald-100 px-3 py-1 rounded-lg">
              HEALTHIER CHILDHOOD
            </span>
          </div>
        </div>

        {/* WEEKLY FOOD CHALLENGE: THIS WEEK'S EAT SMART CHALLENGE (User specified) */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-800">
              7-Day Family Habits
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              THIS WEEK'S EAT SMART CHALLENGE
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Gentle daily intentions that turn nutritious choices into effortless routines:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklyFoodPlan.map((item) => {
              const isDone = completedFoodDays[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleFoodDay(item.key)}
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
                      {item.challenge}
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

        {/* FINAL CTA: WHAT DOES YOUR CHILD EAT MOST? (User specified) */}
        <div className="text-center pt-6 max-w-2xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-2">
            WHAT DOES YOUR CHILD EAT MOST?
          </h3>

          <p className="text-sm sm:text-base text-slate-600 mb-6">
            “Small changes in everyday food habits can make a big difference over time.”
          </p>

          <button
            onClick={onBuildRoutine}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-emerald-700 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-base uppercase tracking-wider"
          >
            <span>BUILD A HEALTHIER ROUTINE</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
