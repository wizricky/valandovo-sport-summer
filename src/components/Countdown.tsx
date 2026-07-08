import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data';

interface CountdownProps {
  currentLanguage: Language;
}

export default function Countdown({ currentLanguage }: CountdownProps) {
  // Target date: August 5th, 2026 at 19:30:00 UTC+2 (Local Macedonia time)
  // Let's set a standard UTC-based or timestamp-based target for reliability.
  const targetDate = new Date('2026-08-05T19:30:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const t = (key: string) => translations[key]?.[currentLanguage] || '';

  if (timeLeft.isOver) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-6 py-4 text-center text-white backdrop-blur-md max-w-lg mx-auto">
        <Clock className="h-6 w-6 text-brand-orange animate-pulse" />
        <span className="font-display text-lg font-extrabold uppercase tracking-wide">
          {currentLanguage === 'en' ? 'THE EVENT HAS BEGUN!' : 'НАСТАНОТ ЗАПОЧНА!'}
        </span>
      </div>
    );
  }

  const timeBlocks = [
    { value: timeLeft.days, label: t('days') },
    { value: timeLeft.hours, label: t('hours') },
    { value: timeLeft.minutes, label: t('minutes') },
    { value: timeLeft.seconds, label: t('seconds') },
  ];

  return (
    <div className="w-full max-w-xl rounded-2xl border border-brand-border bg-brand-card/70 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-4 flex items-center justify-center gap-2 text-gray-400">
        <Clock className="h-4 w-4 text-brand-orange" />
        <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
          {t('countdownTitle')}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center">
        {timeBlocks.map((block, index) => (
          <div key={index} className="relative group">
            {/* Ambient card design */}
            <div className="flex flex-col rounded-xl bg-black/60 p-3 sm:p-4 border border-brand-border transition-all duration-300 group-hover:border-brand-orange/40">
              <span className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight leading-none">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="mt-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-gray-400 group-hover:text-brand-orange transition-colors">
                {block.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
