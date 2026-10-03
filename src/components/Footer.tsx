import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenTopic: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTopic }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { id: 'about', label: 'About' },
    { id: 'parents', label: 'For Parents' },
    { id: 'children', label: 'For Children' },
    { id: 'ai-future', label: 'AI & Future' },
    { id: 'habits', label: 'Healthy Habits' },
    { id: 'privacy', label: 'Privacy' },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Left Column: Brand Lockup & Purpose (User specified) */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-2xl tracking-tight text-white">
                SMART CHILD
              </span>
              <span className="text-[11px] tracking-[0.25em] font-bold text-teal-400 uppercase -mt-0.5">
                SMART FUTURE
              </span>
            </div>

            {/* User-specified quote */}
            <p className="mt-4 text-base sm:text-lg font-medium text-slate-300 italic max-w-md">
              “Technology should help children grow — not replace childhood.”
            </p>

            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Empowering families to replace endless algorithmic consumption with active creation,
              healthy nutrition, outdoor sports, and future-ready AI literacy.
            </p>
          </div>

          {/* Right Column: Navigation Links (User specified) */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-between">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-teal-400 mb-4 md:text-right">
                Platform Resources & Guides
              </div>
              <div className="flex flex-wrap md:justify-end gap-x-6 gap-y-3">
                {footerLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onOpenTopic(link.id)}
                    className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 text-teal-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Mission Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Smart Child — Smart Future. Positive Educational Initiative.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Built for balance, curiosity, and youth empowerment</span>
          </div>
        </div>

        {/* Developer / Organization Attribution */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">"Vijax Solution & Services"</span>
            <span className="text-slate-500">•</span>
            <span>By Shahid Saeed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Cell:</span>
            <a
              href="tel:+923337960706"
              className="text-teal-400 hover:text-teal-300 font-mono font-medium transition-colors"
            >
              923337960706
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
