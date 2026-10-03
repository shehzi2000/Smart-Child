import React, { useState, useEffect } from 'react';
import { Mic, Menu, X, ArrowUpRight, Users, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAiModal: () => void;
  onOpenParentMode?: () => void;
  onOpenTour?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiModal,
  onOpenParentMode,
  onOpenTour,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'understand', label: 'Understand' },
    { id: 'move', label: 'Move' },
    { id: 'eat-smart', label: 'Eat Smart' },
    { id: 'discover-ai', label: 'Discover AI' },
    { id: 'create', label: 'Create' },
    { id: 'world-of-ai', label: 'World of AI' },
    { id: 'challenges', label: 'Challenges' },
  ];

  const handleLinkClick = (id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex flex-col group text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
          >
            <span className="font-display font-black text-xl md:text-2xl tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors">
              SMART CHILD
            </span>
            <span className="text-[10px] md:text-[11px] tracking-[0.22em] font-bold text-teal-700 uppercase -mt-0.5">
              SMART FUTURE
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] xl:text-sm font-medium text-slate-600"
          >
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-teal-800 font-semibold bg-teal-50/80'
                      : 'hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Quick Tour + Parent Mode + Talk to AI */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenTour && (
              <button
                onClick={onOpenTour}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-semibold text-teal-900 bg-teal-50/80 hover:bg-teal-100 border border-teal-200/80 rounded-xl transition-all shadow-2xs whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Quick Tour</span>
              </button>
            )}

            {onOpenParentMode && (
              <button
                onClick={onOpenParentMode}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-xl transition-all shadow-2xs whitespace-nowrap cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-teal-700" />
                <span>Parent Mode</span>
              </button>
            )}

            <button
              onClick={onOpenAiModal}
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
              <Mic className="w-4 h-4 text-teal-300 group-hover:text-white transition-colors" />
              <span>Talk To Specialist</span>
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenParentMode && (
              <button
                onClick={onOpenParentMode}
                aria-label="Parent Mode"
                className="p-2 text-slate-700 hover:text-teal-800 rounded-lg bg-white border border-slate-200 sm:hidden"
              >
                <Users className="w-4 h-4 text-teal-700" />
              </button>
            )}
            <button
              onClick={onOpenAiModal}
              aria-label="Talk To Specialist"
              className="p-2 text-slate-700 hover:text-teal-700 rounded-lg bg-teal-50 sm:hidden"
            >
              <Mic className="w-4 h-4 text-teal-700" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  activeNav === link.id
                    ? 'bg-teal-50 text-teal-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              {onOpenTour && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTour();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 text-teal-900 border border-teal-200 font-bold text-xs uppercase tracking-wider shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <span>Take a Quick Tour</span>
                </button>
              )}
              {onOpenParentMode && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenParentMode();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 text-teal-900 border border-teal-200 font-bold text-xs uppercase tracking-wider shadow-2xs"
                >
                  <Users className="w-4 h-4 text-teal-700" />
                  <span>Open Parent Mode</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm shadow-sm"
              >
                <Mic className="w-4 h-4 text-teal-400" />
                <span>Talk To Specialist</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
