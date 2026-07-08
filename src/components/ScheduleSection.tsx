import React, { useState } from 'react';
import { Clock, MapPin, Calendar, Trophy, Music, Sparkles, Filter, Dribbble, Footprints, Target, Hand, Globe, CircleDot, Volleyball } from 'lucide-react';
import { Language, ScheduleItem, Sport } from '../types';
import { translations, scheduleData, sportsData, SHOW_FULL_SCHEDULE } from '../data';

interface ScheduleSectionProps {
  currentLanguage: Language;
}

export default function ScheduleSection({ currentLanguage }: ScheduleSectionProps) {
  const dates = [
    { value: '2026-08-05', labelEn: 'Day 1 • Aug 5', labelMk: 'Ден 1 • 5 Авг' },
    { value: '2026-08-06', labelEn: 'Day 2 • Aug 6', labelMk: 'Ден 2 • 6 Авг' },
    { value: '2026-08-07', labelEn: 'Day 3 • Aug 7', labelMk: 'Ден 3 • 7 Авг' },
    { value: '2026-08-08', labelEn: 'Day 4 • Aug 8', labelMk: 'Ден 4 • 8 Авг' },
    { value: '2026-08-09', labelEn: 'Day 5 • Aug 9', labelMk: 'Ден 5 • 9 Авг' },
  ];

  const [selectedDate, setSelectedDate] = useState('2026-08-05');
  const [selectedType, setSelectedType] = useState<'all' | 'match' | 'ceremony' | 'entertainment'>('all');
  const [selectedSportId, setSelectedSportId] = useState<string>('all');

  const t = (key: string) => translations[key]?.[currentLanguage] || '';

  const getSportName = (id?: string) => {
    if (!id) return '';
    const sport = sportsData.find(s => s.id === id);
    return sport ? (currentLanguage === 'en' ? sport.nameEn : sport.nameMk) : '';
  };

  const getEventIcon = (item: ScheduleItem) => {
    if (item.type === 'match') {
      switch (item.sportId) {
        case 'basketball': return <Dribbble className="h-4 w-4 text-brand-orange" />;
        case 'soccer': return <Footprints className="h-4 w-4 text-emerald-400" />;
        case 'tennis': return <Target className="h-4 w-4 text-lime-400" />;
        case 'handball': return <Hand className="h-4 w-4 text-red-500" />;
        case 'volleyball': return <Volleyball className="h-4 w-4 text-sky-400" />;
        case 'pingpong': return <CircleDot className="h-4 w-4 text-yellow-400" />;
        default: return <Trophy className="h-4 w-4 text-brand-orange" />;
      }
    }
    if (item.type === 'ceremony') {
      return <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />;
    }
    if (item.type === 'entertainment') {
      return <Music className="h-4 w-4 text-purple-400 animate-pulse" />;
    }
    return <Calendar className="h-4 w-4 text-blue-400" />;
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'match': return 'border-l-4 border-l-brand-orange';
      case 'ceremony': return 'border-l-4 border-l-yellow-500';
      case 'entertainment': return 'border-l-4 border-l-purple-500';
      default: return 'border-l-4 border-l-blue-500';
    }
  };

  // Filtering logic
  const filteredEvents = scheduleData.filter((event) => {
    const matchesDate = event.date === selectedDate;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSport = selectedSportId === 'all' || event.sportId === selectedSportId;
    return matchesDate && matchesType && matchesSport;
  });

  if (!SHOW_FULL_SCHEDULE) {
    return (
      <div className="relative overflow-hidden bg-brand-card/40 border border-brand-border rounded-2xl p-6 sm:p-10 space-y-8 orange-border-glow text-center max-w-2xl mx-auto">
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange animate-pulse">
            <Calendar className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              {currentLanguage === 'en' ? 'Full Program Revealing Soon!' : 'Програмата се подготвува!'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
              {currentLanguage === 'en'
                ? 'The full match schedule and event agenda will be revealed on August 3rd, 2026, immediately following the official team drawings. Get ready for five days of athletic competition and great summer music!'
                : 'Комплетниот распоред на натпревари и програмата на настанот ќе бидат објавени на 3-ти Август, 2026, веднаш по официјалното извлекување на групите. Подгответе се за пет дена спорт и прекрасна летна атмосфера!'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto pt-2">
          <div className="p-4 bg-black/30 border border-brand-border/60 rounded-xl flex items-start gap-3">
            <div className="mt-0.5 p-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {currentLanguage === 'en' ? 'Opening Ceremony' : 'Свечено Отворање'}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {currentLanguage === 'en' ? 'Spectacular lights & vibes' : 'Спектакуларно шоу'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-black/30 border border-brand-border/60 rounded-xl flex items-start gap-3">
            <div className="mt-0.5 p-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {currentLanguage === 'en' ? 'Championship Battles' : 'Спортски Борби'}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {currentLanguage === 'en' ? 'Across multiple sports' : 'Во сите спортски дисциплини'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-black/30 border border-brand-border/60 rounded-xl flex items-start gap-3">
            <div className="mt-0.5 p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Music className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {currentLanguage === 'en' ? 'Summer Beats' : 'Музичка Програма'}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {currentLanguage === 'en' ? 'Background tunes & summer playlists' : 'Пријатна летна музика'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-black/30 border border-brand-border/60 rounded-xl flex items-start gap-3">
            <div className="mt-0.5 p-1.5 rounded-lg bg-sky-400/10 border border-sky-400/20 text-sky-400">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {currentLanguage === 'en' ? 'Grand Final Shows' : 'Големи Финалиња'}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {currentLanguage === 'en' ? 'Awards and celebrations' : 'Доделување награди'}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 text-[10px] font-mono tracking-widest uppercase text-brand-orange font-bold">
          {currentLanguage === 'en' ? '★ August 5 - 9, 2026 ★' : '★ 5 - 9 Август, 2026 ★'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Date selector tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none snap-x">
        {dates.map((date) => (
          <button
            key={date.value}
            onClick={() => setSelectedDate(date.value)}
            className={`px-5 py-3.5 rounded-xl text-sm font-extrabold flex-shrink-0 transition-all cursor-pointer snap-start ${
              selectedDate === date.value
                ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-[1.01]'
                : 'bg-brand-card hover:bg-brand-card-hover border border-brand-border text-gray-400 hover:text-white'
            }`}
            id={`date-tab-${date.value}`}
          >
            {currentLanguage === 'en' ? date.labelEn : date.labelMk}
          </button>
        ))}
      </div>

      {/* Filter panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-brand-border bg-black/40">
        
        {/* Event Type Filters */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              selectedType === 'all'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t('filterAll')}
          </button>
          <button
            onClick={() => setSelectedType('match')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedType === 'match'
                ? 'bg-brand-orange/25 border border-brand-orange text-white font-extrabold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
            {t('filterMatches')}
          </button>
          <button
            onClick={() => setSelectedType('ceremony')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedType === 'ceremony'
                ? 'bg-yellow-500/20 border border-yellow-500 text-white font-extrabold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
            {t('filterCeremonies')}
          </button>
          <button
            onClick={() => setSelectedType('entertainment')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedType === 'entertainment'
                ? 'bg-purple-500/20 border border-purple-500 text-white font-extrabold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
            {t('filterMusic')}
          </button>
        </div>

        {/* Sport-Specific Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-gray-500" />
          <select
            value={selectedSportId}
            onChange={(e) => setSelectedSportId(e.target.value)}
            className="bg-brand-card border border-brand-border text-gray-300 text-xs rounded-lg focus:ring-brand-orange focus:border-brand-orange block p-2 outline-none cursor-pointer"
            id="sport-filter-dropdown"
          >
            <option value="all">
              {currentLanguage === 'en' ? 'All Sports' : 'Сите Спортови'}
            </option>
            {sportsData.map(s => (
              <option key={s.id} value={s.id}>
                {currentLanguage === 'en' ? s.nameEn : s.nameMk}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events timeline list */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-dashed border-brand-border bg-black/10">
            <Calendar className="h-10 w-10 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400 font-medium">
              {currentLanguage === 'en'
                ? 'No events scheduled for the selected filters.'
                : 'Нема закажани настани за избраните филтри.'}
            </p>
          </div>
        ) : (
          <div className="relative border-l border-brand-border pl-4 sm:pl-6 ml-3 space-y-6">
            {filteredEvents.map((item) => (
              <div
                key={item.id}
                className={`relative bg-brand-card border border-brand-border p-4 rounded-xl orange-border-glow transition-all duration-300 ${getTypeStyle(
                  item.type
                )}`}
              >
                {/* Visual marker dot on the timeline line */}
                <div className="absolute -left-[21px] sm:-left-[29px] top-1/2 -translate-y-1/2 flex items-center justify-center h-4 w-4 rounded-full bg-brand-dark border-2 border-brand-border">
                  <div className={`h-1.5 w-1.5 rounded-full ${
                    item.type === 'match' ? 'bg-brand-orange' :
                    item.type === 'ceremony' ? 'bg-yellow-500' :
                    item.type === 'entertainment' ? 'bg-purple-500' : 'bg-blue-500'
                  }`} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1.5">
                    
                    {/* Time Badge & Sport / Event Type Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 text-xs font-extrabold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-md">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </span>

                      {item.type === 'match' && item.sportId && (
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-400 bg-black/40 px-2 py-0.5 rounded-md border border-brand-border">
                          {getSportName(item.sportId)}
                        </span>
                      )}

                      {item.type === 'ceremony' && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-md border border-yellow-500/20">
                          {currentLanguage === 'en' ? 'Ceremony' : 'Церемонија'}
                        </span>
                      )}

                      {item.type === 'entertainment' && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                          {currentLanguage === 'en' ? 'Music / Fest' : 'Забавна Програма'}
                        </span>
                      )}
                    </div>

                    {/* Localized Title */}
                    <h4 className="font-display text-base sm:text-lg font-black text-white tracking-tight">
                      {currentLanguage === 'en' ? item.titleEn : item.titleMk}
                    </h4>

                    {/* Location Badge */}
                    <p className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                      <MapPin className="h-3.5 w-3.5 text-gray-500" />
                      {currentLanguage === 'en' ? item.locationEn : item.locationMk}
                    </p>
                  </div>

                  {/* Icon details right */}
                  <div className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-black/40 border border-brand-border/60">
                    {getEventIcon(item)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
