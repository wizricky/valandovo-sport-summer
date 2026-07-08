export type Language = 'en' | 'mk';

export interface Sport {
  id: string;
  nameEn: string;
  nameMk: string;
  iconName: string; // Used to dynamically map Lucide icons
  detailsEn: string;
  detailsMk: string;
  maxTeams: number;
  prizePoolEn: string;
  prizePoolMk: string;
  registeredCount: number;
  entryFeeEn: string;
  entryFeeMk: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  date: string; // '2026-08-05' to '2026-08-09'
  titleEn: string;
  titleMk: string;
  locationEn: string;
  locationMk: string;
  sportId?: string;
  type: 'match' | 'ceremony' | 'entertainment' | 'other';
}

export interface FeatureItem {
  id: string;
  titleEn: string;
  titleMk: string;
  descEn: string;
  descMk: string;
  iconName: string;
}

export interface Registration {
  id: string;
  teamName: string;
  captainName: string;
  email: string;
  phone: string;
  sportId: string;
  roster: string[];
  timestamp: string;
}

export interface TranslationDict {
  [key: string]: {
    en: string;
    mk: string;
  };
}
