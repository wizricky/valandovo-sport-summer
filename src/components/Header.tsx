import React, { useState } from 'react';
import { Menu, X, Globe, Trophy } from 'lucide-react';
import { Language } from '../types';
import { translations, SHOW_SCHEDULE } from '../data';
import eventLogo from '../assets/images/official_logo.jpg';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({
  currentLanguage,
  onLanguageChange,
  activeSection,
  onNavigate,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (key: string) => translations[key]?.[currentLanguage] || '';

  const navItems = [
    { id: 'sports', label: t('navSports') },
    ...(SHOW_SCHEDULE ? [{ id: 'schedule', label: t('navSchedule') }] : []),
    { id: 'register', label: t('navRegister') },
    { id: 'venue', label: t('navVenue') },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Title */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 transition-transform hover:scale-[1.02] text-left cursor-pointer"
          id="header-logo-btn"
        >
          {/* Official logo image */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/10 border border-brand-orange/20 shadow-md shadow-brand-orange/10 overflow-hidden">
            <img
              src={eventLogo}
              alt="Valandovo Sports Summer Logo"
              className="h-full w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="font-display text-sm font-extrabold tracking-tight text-white uppercase leading-none">
              {currentLanguage === 'en' ? 'Valandovo' : 'Валандовско'}
            </div>
            <div className="font-display text-xs font-bold text-brand-orange uppercase tracking-wider leading-none mt-0.5">
              {currentLanguage === 'en' ? 'Sports Summer 2026' : 'Спортско Лето 2026'}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                activeSection === item.id
                  ? 'text-brand-orange bg-brand-orange/10 font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              id={`nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language Switcher & Call To Action */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-lg border border-brand-border bg-black/40 p-1">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all cursor-pointer ${
                currentLanguage === 'en'
                  ? 'bg-brand-orange text-white shadow-sm shadow-brand-orange/30'
                  : 'text-gray-400 hover:text-white'
              }`}
              id="lang-en"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('mk')}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all cursor-pointer ${
                currentLanguage === 'mk'
                  ? 'bg-brand-orange text-white shadow-sm shadow-brand-orange/30'
                  : 'text-gray-400 hover:text-white'
              }`}
              id="lang-mk"
            >
              МК
            </button>
          </div>

          <button
            onClick={() => handleNavClick('register')}
            className="flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-extrabold text-white transition-all duration-200 hover:bg-brand-orange-hover hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-brand-orange/20 cursor-pointer"
            id="header-cta"
          >
            <Trophy className="h-4 w-4" />
            {currentLanguage === 'en' ? 'Register' : 'Пријави се'}
          </button>
        </div>

        {/* Mobile menu toggle & Lang switcher (Mobile) */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mini Lang Switcher for mobile */}
          <div className="flex items-center rounded-lg border border-brand-border bg-black/40 p-0.5">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-md transition-all ${
                currentLanguage === 'en' ? 'bg-brand-orange text-white' : 'text-gray-400'
              }`}
              id="lang-en-mob"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('mk')}
              className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-md transition-all ${
                currentLanguage === 'mk' ? 'bg-brand-orange text-white' : 'text-gray-400'
              }`}
              id="lang-mk-mob"
            >
              МК
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border bg-brand-dark px-4 py-4 space-y-3 shadow-2xl transition-all duration-300">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 text-base font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-brand-orange bg-brand-orange/10 font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                id={`mob-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-brand-border">
            <button
              onClick={() => handleNavClick('register')}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange py-3 text-base font-extrabold text-white transition-all hover:bg-brand-orange-hover shadow-md shadow-brand-orange/20 cursor-pointer"
              id="mob-header-cta"
            >
              <Trophy className="h-5 w-5" />
              {currentLanguage === 'en' ? 'Register' : 'Пријави се'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
