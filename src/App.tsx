import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Trophy,
  ChevronRight,
  Info,
  ExternalLink,
  Phone,
  Mail,
  Dribbble,
  Activity,
  Flame,
  Zap,
  Moon,
  Music,
  Utensils,
  Coins,
  Globe,
  Sparkles,
  Footprints,
  Target,
  Hand,
  CircleDot,
  Volleyball,
  Facebook,
  Instagram
} from 'lucide-react';
import { Language } from './types';
import { translations, sportsData, featuresData, SHOW_SCHEDULE } from './data';

// Component imports
import Header from './components/Header';
import Countdown from './components/Countdown';
import ScheduleSection from './components/ScheduleSection';
import RegistrationForm from './components/RegistrationForm';
import TournamentRules from './components/TournamentRules';
import eventLogo from './assets/images/official_logo.jpg';

const HERO_BG_IMAGES = [
  'https://scontent.fskp4-2.fna.fbcdn.net/v/t39.30808-6/529837246_775780034817650_4828942756276293560_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1638&ctp=s2048x1638&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=r9uc8p7LAU4Q7kNvwFNyzZB&_nc_oc=AdrzUoYdusWHjJ9tFXoNKTnf0x41y7Zjkedc5NUXv-P-wGsYr049_uYOO_xC9vjfwqk&_nc_zt=23&_nc_ht=scontent.fskp4-2.fna&_nc_gid=r8HPnXt7uDXfDEnFCIN4JQ&_nc_ss=7b2a8&oh=00_AQDi0nX2QRAI3cyAHGShnD-mqjls-lUdWFznQMQq0rI9Rw&oe=6A4C4E8D', // Custom tournament photo uploaded by user
  'https://scontent.fskp4-1.fna.fbcdn.net/v/t39.30808-6/530528495_776584454737208_6237928088310807724_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1582&ctp=s2048x1582&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=zUscI7--pw8Q7kNvwEi_7JU&_nc_oc=Adq6lAPSW1hDc9pKc8TfM9f1vA7zMyREeeuovdvpZhn-2Xoj-xRINn1MM3HOcRVOpAI&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_gid=OdAjgRhvpiQ-oM4eclmlYA&_nc_ss=7b2a8&oh=00_AQBHNEVV7mCP10J2fUptOLoHwBhnB-Nq1D8brpJoVyAjFA&oe=6A4C333F', // Basketball action
  'https://scontent.fskp4-2.fna.fbcdn.net/v/t39.30808-6/530787347_775779641484356_3049329951404244684_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1639&ctp=s2048x1639&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=SKUVgYhhB9AQ7kNvwHluQee&_nc_oc=AdqRXLd3qZwZXKhnEsAKGIvDeeB0K4cLVPs9cGHswFoZAAMThzxEljtFwYmKBnObIfQ&_nc_zt=23&_nc_ht=scontent.fskp4-2.fna&_nc_gid=8SDnr6KbgESC0KG6zsmxlg&_nc_ss=7b2a8&oh=00_AQBGFGxWsBNs0TudB1Ghkf28QAlTmfdk6bp2rCo0wekbzw&oe=6A4C4A70', // Football penalty
  'https://scontent.fskp4-2.fna.fbcdn.net/v/t39.30808-6/530628063_776583981403922_6390441427270446645_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1583&ctp=s2048x1583&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=A98DLxqBEiYQ7kNvwEIfc39&_nc_oc=AdpxBmKV5F93JLU8WuMt6ZlnuPihfoY4LXradSZAlASADWclV5ehZH9cnBpIEui1jaU&_nc_zt=23&_nc_ht=scontent.fskp4-2.fna&_nc_gid=z-HaE_6XNwITJV7GGzpnWA&_nc_ss=7b2a8&oh=00_AQDi9mC3UiFuhbe2w1vDGXPSMHDY-g0LnyXjUZx4CBAxVA&oe=6A4C663F', // Crowd / evening lights
  'https://scontent.fskp4-1.fna.fbcdn.net/v/t39.30808-6/530673550_776584688070518_7107155258495990376_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1583&ctp=s2048x1583&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=kfv0NfJ3Z5EQ7kNvwEikPnE&_nc_oc=Adq79T4pzBPl_1BpnLoEa7UqqjTvvowPxb_QbpHhv__aY2OJ3E9SUrBTU0MvJuIjZxs&_nc_zt=23&_nc_ht=scontent.fskp4-1.fna&_nc_gid=qPqag5SsdUeDQrrEGnPdGw&_nc_ss=7b2a8&oh=00_AQAl0R118iHC-WTPA1fyNB2_iqy2xVvYbx5rf1av3KitVg&oe=6A4C35AA'  // Celebration / winners
];

export default function App() {
  // Localization state
  const [currentLanguage, setCurrentLanguage] = useState<Language>('mk'); // Default to MK since it is a local festival, but supports EN flawlessly
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedRulesSport, setSelectedRulesSport] = useState('basketball');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const t = (key: string) => translations[key]?.[currentLanguage] || '';

  // Handle language changes
  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  // Scroll to section helper
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // height of sticky header
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        });
      }
    }
  };

  // Cycle Hero background images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Observe scroll position to update active navigation highlights
  useEffect(() => {
    const sections = ['hero', 'sports', ...(SHOW_SCHEDULE ? ['schedule'] : []), 'features', 'register', 'venue'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset

      for (const sectionId of sections) {
        if (sectionId === 'hero') {
          const element = document.getElementById('hero');
          if (element && scrollPosition < element.offsetHeight) {
            setActiveSection('hero');
            break;
          }
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon': return <Moon className="h-6 w-6 text-brand-orange" />;
      case 'Music': return <Music className="h-6 w-6 text-purple-400" />;
      case 'Utensils': return <Utensils className="h-6 w-6 text-emerald-400" />;
      case 'Coins': return <Coins className="h-6 w-6 text-amber-400" />;
      default: return <Sparkles className="h-6 w-6 text-brand-orange" />;
    }
  };

  const getSportIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dribbble': return <Dribbble className="h-8 w-8 text-brand-orange" />;
      case 'Footprints': return <Footprints className="h-8 w-8 text-emerald-400" />;
      case 'Target': return <Target className="h-8 w-8 text-lime-400" />;
      case 'Hand': return <Hand className="h-8 w-8 text-red-500" />;
      case 'Volleyball': return <Volleyball className="h-8 w-8 text-sky-400" />;
      case 'CircleDot': return <CircleDot className="h-8 w-8 text-yellow-400" />;
      default: return <Trophy className="h-8 w-8 text-brand-orange" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange selection:text-white">
      
      {/* Sticky Navigation Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center min-h-[92vh] px-4 sm:px-6 lg:px-8 py-16 text-center overflow-hidden border-b border-brand-border bg-brand-dark"
      >
        {/* Dynamic sliding deck background with crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          {HERO_BG_IMAGES.map((imgUrl, index) => (
            <div
              key={imgUrl}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-in-out transform ${
                index === currentBgIndex 
                  ? 'opacity-[0.55] scale-100' 
                  : 'opacity-0 scale-[1.04]'
              }`}
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          ))}
          {/* Softened ambient gradient layer to let the picture shine through while preserving text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-brand-dark/20"></div>
          {/* Grid overlay for tech/sports aesthetic */}
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(240,90,36,0.1)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(240,90,36,0.1)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
          {/* Subtle glowing center blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-brand-orange/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6">
          
          {/* Main Logo */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-brand-orange/5 border-2 border-brand-orange/40 shadow-2xl shadow-brand-orange/10 overflow-hidden flex items-center justify-center orange-border-glow transition-all duration-500 hover:scale-[1.04] p-2 group">
            <img
              src={eventLogo}
              alt="Valandovo Sports Summer Logo"
              className="h-full w-full object-contain rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Top Event Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-brand-orange uppercase tracking-widest animate-pulse">
            <Trophy className="h-4 w-4" />
            {currentLanguage === 'en' ? 'Premier Summer Sports Event' : 'Најголем Летен Спортски Настан'}
          </div>

          {/* Epic Main Title */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
              {currentLanguage === 'en' ? 'Valandovo' : 'Валандовско'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-orange-light to-amber-500 orange-text-glow">
                {currentLanguage === 'en' ? 'Sports Summer' : 'Спортско Лето'}
              </span>
              <span className="block text-2xl sm:text-4xl tracking-widest text-gray-300 font-light mt-2">
                2026
              </span>
            </h1>
          </div>

          {/* Quick Date and Location Info Cards */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center w-full max-w-2xl">
            <div className="flex items-center gap-3 bg-brand-card/70 border border-brand-border rounded-xl px-5 py-3 w-full sm:w-auto shadow-md">
              <Calendar className="h-5 w-5 text-brand-orange flex-shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                  {currentLanguage === 'en' ? 'DATES' : 'ДАТУМИ'}
                </span>
                <span className="text-sm font-extrabold text-gray-200">
                  {t('heroDates')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-brand-card/70 border border-brand-border rounded-xl px-5 py-3 w-full sm:w-auto shadow-md">
              <MapPin className="h-5 w-5 text-brand-orange flex-shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                  {currentLanguage === 'en' ? 'LOCATION' : 'ЛОКАЦИЈА'}
                </span>
                <span className="text-sm font-extrabold text-gray-200">
                  {t('heroLocation')}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Countdown Timer */}
          <Countdown currentLanguage={currentLanguage} />

          {/* Action Call-to-Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <button
              onClick={() => navigateToSection('register')}
              className="px-8 py-4 bg-brand-orange text-white font-extrabold uppercase tracking-wide rounded-xl shadow-lg shadow-brand-orange/20 transition-all hover:bg-brand-orange-hover hover:scale-[1.03] active:scale-[0.98] cursor-pointer text-center"
              id="hero-register-cta"
            >
              {t('heroBtnRegister')}
            </button>
            {SHOW_SCHEDULE && (
              <button
                onClick={() => navigateToSection('schedule')}
                className="px-8 py-4 bg-transparent border border-brand-border text-white font-extrabold uppercase tracking-wide rounded-xl transition-all hover:bg-white/5 cursor-pointer text-center"
                id="hero-schedule-cta"
              >
                {t('heroBtnSchedule')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Quick Counter Bar */}
      <section className="bg-brand-card border-b border-brand-border py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle orange ambient glow in stats background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-brand-orange/5 blur-[50px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left Stats Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10 w-full md:w-auto md:flex-1 text-center justify-center">
            <div className="space-y-1.5">
              <div className="font-display text-3xl sm:text-4xl font-black text-brand-orange leading-none">6</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('statsSports')}</div>
            </div>
            <div className="space-y-1.5">
              <div className="font-display text-3xl sm:text-4xl font-black text-brand-orange leading-none">5</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('statsDays')}</div>
            </div>
          </div>

          {/* Central Standout In-Your-Face Prize Pool KPI */}
          <div className="w-full md:w-auto md:px-10 flex flex-col items-center justify-center py-5 px-8 bg-gradient-to-br from-brand-orange/20 to-amber-500/5 border-2 border-brand-orange/50 rounded-2xl shadow-2xl shadow-brand-orange/5 relative group overflow-hidden text-center min-w-[280px] sm:min-w-[340px]">
            {/* Pulse glow background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-amber-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <Trophy className="h-8 w-8 text-amber-400 mb-2 animate-bounce" />
              <span className="text-[11px] font-black uppercase text-brand-orange tracking-widest leading-none mb-1 block">
                {t('statsPrizePool')}
              </span>
              <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white leading-none orange-text-glow">
                {currentLanguage === 'en' ? '€11,400+' : '700.000 МКД+'}
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold text-gray-400 mt-1.5 uppercase tracking-wide">
                {currentLanguage === 'en' ? '700,000 MKD+ Total Value' : 'Вкупно околу €11.400+'}
              </div>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10 w-full md:w-auto md:flex-1 text-center justify-center">
            <div className="space-y-1.5">
              <div className="font-display text-3xl sm:text-4xl font-black text-brand-orange leading-none">300+</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('statsTeams')}</div>
            </div>
            <div className="space-y-1.5">
              <div className="font-display text-3xl sm:text-4xl font-black text-brand-orange leading-none">10,000+</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('statsSpectators')}</div>
            </div>
          </div>

        </div>
      </section>

      {/* Sports Grid Section */}
      <section id="sports" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {t('sportsTitle')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {t('sportsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportsData.map((sport) => (
            <div
              key={sport.id}
              className={`bg-brand-card border rounded-2xl p-6 flex flex-col justify-between orange-border-glow transition-all duration-300 shadow-md group relative overflow-hidden ${
                sport.registeredCount >= sport.maxTeams ? 'border-red-500/20' : 'border-brand-border'
              }`}
            >
              {sport.registeredCount >= sport.maxTeams && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                  <div className="text-[52px] font-black tracking-widest text-red-500/10 uppercase font-display -rotate-12 whitespace-nowrap">
                    {currentLanguage === 'en' ? 'CAPACITY FILLED' : 'ПОПОЛНЕТО'}
                  </div>
                </div>
              )}

              {sport.id === 'basketball' && (
                <div className="absolute top-4 right-4 bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-md z-10">
                  {currentLanguage === 'en' ? 'Premier Sport' : 'Главен Спорт'}
                </div>
              )}

              {sport.id === 'volleyball' && sport.registeredCount < sport.maxTeams && (
                <div className="absolute top-4 right-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-md z-10">
                  {currentLanguage === 'en' ? 'Free Entry' : 'Бесплатно'}
                </div>
              )}

              {sport.registeredCount >= sport.maxTeams && sport.id !== 'basketball' && (
                <div className="absolute top-4 right-4 bg-red-500/15 border border-red-500/30 text-red-500 text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-md z-10">
                  {currentLanguage === 'en' ? 'Filled' : 'Пополнето'}
                </div>
              )}

              <div className="space-y-4">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-black/40 border border-brand-border group-hover:border-brand-orange/40 transition-colors">
                  {getSportIcon(sport.iconName)}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-white uppercase tracking-tight">
                    {currentLanguage === 'en' ? sport.nameEn : sport.nameMk}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed min-h-[64px]">
                    {currentLanguage === 'en' ? sport.detailsEn : sport.detailsMk}
                  </p>
                </div>
              </div>

              {/* Tournament Details Info */}
              <div className="mt-6 pt-5 border-t border-brand-border/60 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="block text-gray-500 font-semibold">{t('prizePoolLabel')}</span>
                    <span className="font-bold text-white text-sm">
                      {currentLanguage === 'en' ? sport.prizePoolEn : sport.prizePoolMk}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-500 font-semibold">
                      {sport.id === 'tennis' || sport.id === 'pingpong'
                        ? (currentLanguage === 'en' ? 'Max Players:' : 'Макс. Играчи:')
                        : t('maxTeamsLabel')}
                    </span>
                    <span className="font-bold text-white text-sm">
                      {sport.maxTeams} {sport.id === 'tennis' || sport.id === 'pingpong'
                        ? (currentLanguage === 'en' ? 'Players' : 'Играчи')
                        : (currentLanguage === 'en' ? 'Teams' : 'Екипи')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <button
                    disabled={sport.registeredCount >= sport.maxTeams}
                    onClick={() => {
                      if (sport.registeredCount >= sport.maxTeams) return;
                      if (sport.id === 'basketball') {
                        window.open('https://play.fiba3x3.com/events/a6810e93-cc2a-4c0f-b8bb-f6f586007b95/register', '_blank', 'noopener,noreferrer');
                      } else if (sport.id === 'tennis') {
                        window.open('https://www.mojtenis.mk/events/0563efa3-f1a3-4e04-8acf-531e5d912d6d', '_blank', 'noopener,noreferrer');
                      } else {
                        navigateToSection('register');
                        // Find registration dropdown/radio and focus it
                        setTimeout(() => {
                          const element = document.getElementById(`sport-select-${sport.id}`);
                          if (element) element.click();
                        }, 500);
                      }
                    }}
                    className={`w-full flex items-center justify-center gap-1 text-xs font-bold py-2.5 rounded-lg border transition-all duration-300 relative z-10 ${
                      sport.registeredCount >= sport.maxTeams
                        ? 'bg-neutral-800/80 border-neutral-700/50 text-neutral-500 cursor-not-allowed'
                        : 'bg-brand-orange hover:bg-black border-brand-orange text-white hover:text-brand-orange cursor-pointer'
                    }`}
                    id={`register-sport-btn-${sport.id}`}
                  >
                    {sport.registeredCount >= sport.maxTeams
                      ? (currentLanguage === 'en' ? 'CLOSED' : 'ЗАТВОРЕНО')
                      : sport.id === 'tennis' || sport.id === 'pingpong'
                      ? t('btnRegisterIndividual')
                      : t('btnRegisterTeam')}
                    {sport.registeredCount < sport.maxTeams && <ChevronRight className="h-3.5 w-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRulesSport(sport.id);
                      navigateToSection('rules');
                    }}
                    className="w-full flex items-center justify-center gap-1 bg-transparent hover:bg-white/5 border border-brand-border text-xs font-bold py-2.5 rounded-lg text-gray-300 hover:text-white transition-all duration-300 cursor-pointer relative z-10"
                    id={`more-info-sport-btn-${sport.id}`}
                  >
                    {t('btnMoreInfo')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program & Schedule Section */}
      {SHOW_SCHEDULE && (
        <section id="schedule" className="py-20 bg-brand-card/30 border-y border-brand-border px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {t('scheduleTitle')}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {t('scheduleSubtitle')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <ScheduleSection currentLanguage={currentLanguage} />
            </div>
          </div>
        </section>
      )}

      {/* Event Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {t('featuresTitle')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-brand-card border border-brand-border rounded-2xl p-6 orange-border-glow transition-all duration-300 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-black/40 border border-brand-border">
                  {getFeatureIcon(feature.iconName)}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-base font-extrabold text-white uppercase tracking-tight">
                    {currentLanguage === 'en' ? feature.titleEn : feature.titleMk}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {currentLanguage === 'en' ? feature.descEn : feature.descMk}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Registration Section */}
      <section id="register" className="py-20 bg-brand-card/40 border-t border-brand-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              {t('registerTitle')}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {t('registerSubtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <RegistrationForm currentLanguage={currentLanguage} />
          </div>
        </div>
      </section>

      {/* Tournament Rules & Regulations (Directly accessible but unlisted in nav headers) */}
      <TournamentRules 
        currentLanguage={currentLanguage} 
        selectedSportId={selectedRulesSport}
        onSportChange={setSelectedRulesSport}
      />

      {/* Location Section */}
      <section id="venue" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {t('venueTitle')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {t('venueSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Location information text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1 text-xs font-bold text-brand-orange uppercase">
                <MapPin className="h-3.5 w-3.5" />
                {currentLanguage === 'en' ? 'Valandovo Sport Complex' : 'Спортски Комплекс Валандово'}
              </div>
              <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                {t('venueLocationLabel')}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t('venueDesc')}
              </p>
            </div>

            {/* Landmarks points list */}
            <div className="space-y-3 pt-3 border-t border-brand-border/60">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">
                {currentLanguage === 'en' ? 'Nearby Attractions' : 'Обележја во Близина'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300 font-bold">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                  {currentLanguage === 'en' ? 'Freedom Monument' : 'Споменик на Слободата'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                  {currentLanguage === 'en' ? 'St. George Monastery' : 'Манастир Св. Ѓорѓи'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                  {currentLanguage === 'en' ? 'Valandovo Waterfalls' : 'Валандовски Водопади'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                  {currentLanguage === 'en' ? 'Plostad / Town Square' : 'Градски Плоштад'}
                </div>
              </div>
            </div>
          </div>

          {/* Styled visual Map/Landmark Box */}
          <div className="lg:col-span-7 bg-brand-card rounded-2xl border border-brand-border shadow-xl relative overflow-hidden h-[380px] group flex flex-col justify-end">
            
            {/* Google Map Embed with custom dark theme filter */}
            <div className="absolute inset-0 z-0 w-full h-full">
              <iframe
                title="Valandovo Sports Courts Map"
                width="100%"
                height="100%"
                className="w-full h-full border-0 opacity-70 group-hover:opacity-85 transition-opacity duration-300"
                src="https://maps.google.com/maps?q=8H85%2B8W3,%20Valandovo&t=&z=16&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
                style={{ filter: 'grayscale(100%) invert(90%) hue-rotate(180deg) contrast(115%)' }}
              ></iframe>
            </div>

            {/* Bottom Floating Card info */}
            <div className="relative z-10 bg-brand-dark/95 border border-brand-border p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-sm m-4">
              <div>
                <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-tight">
                  {currentLanguage === 'en' ? 'Valandovo Sport Complex' : 'Спортски Комплекс Валандово'}
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
                  {currentLanguage === 'en' ? 'Prvomajska, Valandovo, Macedonia' : 'Првомајска, Валандово, Македонија'}
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=8H85%2B8W3%2C%20Valandovo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white border border-brand-orange/30 hover:border-brand-orange px-3 py-1.5 text-xs font-bold transition-all cursor-pointer"
                id="google-maps-btn"
              >
                {currentLanguage === 'en' ? 'Get Directions' : 'Насоки за Движење'}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black/90 border-t border-brand-border py-12 px-4 sm:px-6 lg:px-8 text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo & About Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10 border border-brand-orange/20 shadow-md shadow-brand-orange/10 overflow-hidden">
                <img
                  src={eventLogo}
                  alt="Valandovo Sports Summer Logo"
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display text-sm font-black text-white uppercase tracking-tight">
                  {currentLanguage === 'en' ? 'Valandovo Leto' : 'Валандовско Лето'}
                </span>
                <span className="block text-[10px] text-brand-orange font-bold uppercase tracking-wider">
                  2026
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              {t('footerDesc')}
            </p>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {currentLanguage === 'en' ? 'Quick Navigation' : 'Брза Навигација'}
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => navigateToSection('sports')} className="text-left hover:text-brand-orange transition-colors cursor-pointer">
                {t('navSports')}
              </button>
              {SHOW_SCHEDULE && (
                <button onClick={() => navigateToSection('schedule')} className="text-left hover:text-brand-orange transition-colors cursor-pointer">
                  {t('navSchedule')}
                </button>
              )}
              <button onClick={() => navigateToSection('features')} className="text-left hover:text-brand-orange transition-colors cursor-pointer">
                {t('navFeatures')}
              </button>
              <button onClick={() => navigateToSection('register')} className="text-left hover:text-brand-orange transition-colors cursor-pointer">
                {t('navRegister')}
              </button>
              <button onClick={() => navigateToSection('venue')} className="text-left hover:text-brand-orange transition-colors cursor-pointer">
                {t('navVenue')}
              </button>
            </div>
          </div>

          {/* Contact / Organizer Info */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {t('contactLabel')}
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-orange" />
                <a href="mailto:streetballvalandovo@gmail.com" className="hover:text-white transition-colors">
                  streetballvalandovo@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-orange" />
                <a href="tel:+38978646666" className="hover:text-white transition-colors">
                  +389 78 646 666
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-orange" />
                <span className="text-gray-300">
                  {currentLanguage === 'en' ? 'Municipality of Valandovo, Macedonia' : 'Општина Валандово, Македонија'}
                </span>
              </div>
            </div>

            {/* Social handles mockup */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('organizerLabel')}</span>
              <a 
                href="https://www.instagram.com/valandovosportssummer" 
                target="_blank" 
                rel="noreferrer" 
                className="px-2 py-1 rounded bg-brand-border text-[9px] text-gray-300 font-extrabold uppercase tracking-wide hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
              >
                GG3x3
              </a>
              <a 
                href="https://valandovo.gov.mk/" 
                target="_blank" 
                rel="noreferrer" 
                className="px-2 py-1 rounded bg-brand-border text-[9px] text-gray-300 font-extrabold uppercase tracking-wide hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
              >
                {currentLanguage === 'en' ? 'Municipality of Valandovo' : 'Општина Валандово'}
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href="https://www.facebook.com/profile.php?id=100071569822747" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded bg-brand-border/40 text-gray-400 hover:text-white hover:bg-brand-orange/20 border border-brand-border/60 hover:border-brand-orange/30 transition-all cursor-pointer"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/valandovosportssummer" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded bg-brand-border/40 text-gray-400 hover:text-white hover:bg-brand-orange/20 border border-brand-border/60 hover:border-brand-orange/30 transition-all cursor-pointer"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="mailto:streetballvalandovo@gmail.com" 
                className="p-2 rounded bg-brand-border/40 text-gray-400 hover:text-white hover:bg-brand-orange/20 border border-brand-border/60 hover:border-brand-orange/30 transition-all cursor-pointer"
                title="Gmail"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; 2026 {currentLanguage === 'en' ? 'Valandovo Sports Summer' : 'Валандовско Спортско Лето'}. {t('rightsReserved')}
          </div>
          <div className="flex gap-4">
            <a href="https://kimcodeacademy.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
              Designed & Developed by Kimcode Academy
              <ExternalLink className="h-3 w-3 text-brand-orange" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
