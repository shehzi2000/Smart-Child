import React from 'react';
import { X, ShieldCheck, Heart, Sparkles, BookOpen, Users } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTopic: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, activeTopic }) => {
  if (!isOpen) return null;

  const getContent = () => {
    switch (activeTopic) {
      case 'about':
        return {
          title: 'About Smart Child — Smart Future',
          icon: Sparkles,
          subtitle: 'Our Purpose & Balanced Vision',
          text: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Smart Child — Smart Future</strong> is an independent educational initiative
                created to transform the conversation around youth and technology. Rather than fighting
                technology with fear and total prohibition, we advocate for intelligent equilibrium.
              </p>
              <p>
                Technology is the ultimate creative medium of the 21st century. By guiding young people
                to shift from passive, algorithmic consumers into active designers, coders, and thinkers,
                we preserve their real-world childhood while preparing them for high-impact futures.
              </p>
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 text-teal-900 font-medium">
                “Don’t just take the phone away. Turn screen time into skill time.”
              </div>
            </div>
          ),
        };
      case 'parents':
        return {
          title: 'Guidance for Parents & Educators',
          icon: Users,
          subtitle: 'Empowerment strategies without household conflict',
          text: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                The biggest friction point in modern families is screen time arguments. Punitive confiscation
                often leads to secrecy and alienation. Instead, implement clear environmental rules:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>No screens 60 minutes before sleep:</strong> Safeguard deep REM sleep and natural melatonin production.</li>
                <li><strong>Bedroom device charging ban:</strong> Charge all phones and tablets in a shared kitchen or hallway dock overnight.</li>
                <li><strong>Pair seated screen time with physical movement:</strong> 45 minutes of creative digital work equals 20 minutes of active sports or outdoor play.</li>
                <li><strong>Show genuine curiosity:</strong> Ask your child to teach you what they built or programmed today.</li>
              </ul>
            </div>
          ),
        };
      case 'children':
        return {
          title: 'For Children & Teenagers',
          icon: Heart,
          subtitle: 'How to be a creator, not an algorithm’s target',
          text: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Notice how apps are engineered to keep you scrolling forever? That is called algorithmic capture.
                Social media feeds and mobile games are designed by behavioral psychologists to extract your attention.
              </p>
              <p>
                You are much smarter than that! You can take the wheel. Use the exact same laptop or tablet to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Code your own 2D and 3D games in Scratch, Godot, or Roblox Studio</li>
                <li>Animate characters, draw digital comics, and record podcasts</li>
                <li>Prompt AI to help you learn foreign languages, astronomy, or guitar</li>
                <li>Then get outside, run with your friends, ride bikes, and enjoy real life!</li>
              </ul>
            </div>
          ),
        };
      case 'ai-future':
        return {
          title: 'AI & The Future of Skills',
          icon: BookOpen,
          subtitle: 'Preparing young minds for an AI-infused world',
          text: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Artificial Intelligence is rapidly becoming the foundational layer of engineering, medicine,
                architecture, and governance. Knowing how to use AI responsibly is the new basic literacy.
              </p>
              <p>
                The essential competencies of the next 20 years are not rote memorization, but:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Algorithmic Thinking:</strong> Breaking complex dilemmas into clear, solvable steps</li>
                <li><strong>Critical Verification:</strong> Questioning AI outputs, checking sources, detecting hallucinations</li>
                <li><strong>Human Empathy & Design:</strong> Building products that genuinely serve real human needs</li>
              </ul>
            </div>
          ),
        };
      case 'habits':
        return {
          title: 'Healthy Habits Architecture',
          icon: Heart,
          subtitle: 'Sleep, nutrition, and daily physical movement',
          text: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                A high-performing brain requires physical wellness. Our four foundational pillars reinforce each other:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block text-xs">Deep Sleep</span>
                  <span className="text-xs text-slate-600">8–10 hours per night without blue light interference</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block text-xs">Active Movement</span>
                  <span className="text-xs text-slate-600">At least 60 minutes of vigorous daily outdoor play</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block text-xs">Mindful Nutrition</span>
                  <span className="text-xs text-slate-600">Whole fruits, water, and zero screen-time grazing</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block text-xs">Creator Agency</span>
                  <span className="text-xs text-slate-600">Turning digital consumption into productive mastery</span>
                </div>
              </div>
            </div>
          ),
        };
      case 'privacy':
      default:
        return {
          title: 'Child Privacy & Ethical Commitment',
          icon: ShieldCheck,
          subtitle: 'Our strict safety standards for families',
          text: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Smart Child — Smart Future</strong> is committed to child safety, digital ethics,
                and zero telemetry abuse.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We do not sell, rent, or monetize child or family information.</li>
                <li>We do not run tracking cookies or third-party advertising networks.</li>
                <li>All educational tools recommended on our platform are thoroughly vetted for age-appropriate child privacy laws (COPPA / GDPR-K compliant).</li>
                <li>Our mission is pure education, positive habits, and creative empowerment.</li>
              </ul>
            </div>
          ),
        };
    }
  };

  const content = getContent();
  const Icon = content.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-slate-950">
              {content.title}
            </h3>
            <p className="text-xs text-teal-800 font-semibold">{content.subtitle}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="mt-4">{content.text}</div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
