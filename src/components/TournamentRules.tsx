import React, { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  Users,
  Clock,
  ShieldAlert,
  Calendar,
  Search,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Flame,
  Scale,
  Dribbble,
  Activity,
  Zap,
  Sparkles,
  CreditCard,
  Target,
  Dumbbell,
  Medal,
  Footprints,
  Hand,
  Globe,
  Orbit,
  CircleDot,
  Volleyball
} from 'lucide-react';
import { Language } from '../types';
import { sportsData } from '../data';

interface TournamentRulesProps {
  currentLanguage: Language;
  selectedSportId: string;
  onSportChange: (sportId: string) => void;
}

export default function TournamentRules({ currentLanguage, selectedSportId, onSportChange }: TournamentRulesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'matches' | 'format' | 'discipline' | 'registration'>('all');
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});

  // Reset expanded articles and search when sport changes
  useEffect(() => {
    setExpandedArticles({
      'art-1': true, // Keep first article expanded by default
      'format-card': true // Keep format expanded by default
    });
    setSearchQuery('');
    setActiveTab('all');
  }, [selectedSportId]);

  const toggleArticle = (id: string) => {
    setExpandedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const t = {
    title: {
      en: 'Rules & Regulations',
      mk: 'Правила и Прописи'
    },
    subtitle: {
      en: 'Official regulations, timing, scoring, and tournament structures for all sport categories.',
      mk: 'Официјални правила, времетраење, бодирање и формати за сите спортски дисциплини.'
    },
    searchPlaceholder: {
      en: 'Search rules or articles...',
      mk: 'Пребарај правила или членови...'
    },
    tabs: {
      all: { en: 'All Rules', mk: 'Сите Правила' },
      core: { en: 'Team & Play', mk: 'Екипа и Игра' },
      matches: { en: 'Match & Scoring', mk: 'Време и Бодови' },
      format: { en: 'Format & Groups', mk: 'Структура и Групи' },
      discipline: { en: 'Discipline', mk: 'Дисциплина' },
      registration: { en: 'Registration & Fees', mk: 'Котизација и Уплата' }
    },
    sports: {
      basketball: { en: '3x3 Basketball', mk: '3х3 Баскет' },
      soccer: { en: 'Futsal', mk: 'Мал Фудбал' },
      tennis: { en: 'Tennis', mk: 'Тенис' },
      handball: { en: 'Handball', mk: 'Ракомет' },
      volleyball: { en: 'Volleyball', mk: 'Одбојка' },
      pingpong: { en: 'Table Tennis', mk: 'Пинг Понг' }
    },
    quickStats: {
      soccer: {
        stat1: { title: { en: '5+1 Players', mk: '5+1 Играчи' }, desc: { en: '5 court + 1 keeper', mk: '5 во поле + 1 голман' } },
        stat2: { title: { en: 'Size 5 Ball', mk: 'Топка Број 5' }, desc: { en: 'Standard tournament ball', mk: 'Стандардна фудбалска топка' } },
        stat3: { title: { en: '12 Teams', mk: '12 Тимови' }, desc: { en: '4 groups of 3', mk: '4 групи по 3 екипи' } },
        stat4: { title: { en: '5 Days', mk: '5 Дневен Турнир' }, desc: { en: 'Intense summer schedule', mk: 'Густ летен распоред' } }
      },
      basketball: {
        stat1: { title: { en: '3+1 Players', mk: '3+1 Играчи' }, desc: { en: '3 on court + 1 sub', mk: '3 на терен + 1 замена' } },
        stat2: { title: { en: 'Size 6 Ball', mk: 'Топка Број 6' }, desc: { en: 'Official FIBA 3x3 ball', mk: 'Официјална FIBA 3x3 топка' } },
        stat3: { title: { en: '16 Teams', mk: '16 Тимови' }, desc: { en: '4 groups of 4', mk: '4 групи по 4 екипи' } },
        stat4: { title: { en: 'FIBA Profile', mk: 'FIBA Профил' }, desc: { en: 'Points count for ranking', mk: 'Поени за ранкинг листа' } }
      },
      tennis: {
        stat1: { title: { en: 'Singles', mk: 'Сингл Игра' }, desc: { en: '1v1 elimination bracket', mk: '1 на 1 елиминации' } },
        stat2: { title: { en: 'Best of 3 Sets', mk: '2 Добиени Сета' }, desc: { en: 'Regular sets with tie-break', mk: 'Регуларни сетови со тај-брејк' } },
        stat3: { title: { en: '32 Players', mk: '32 Играчи' }, desc: { en: 'Strict limit of participants', mk: 'Максимален број учесници' } },
        stat4: { title: { en: 'Advantage Scoring', mk: 'Игра со Предност' }, desc: { en: 'Standard advantage at deuce', mk: 'Игра со предност при изедначено' } }
      },
      handball: {
        stat1: { title: { en: '6+1 Players', mk: '6+1 Играчи' }, desc: { en: '6 court + 1 keeper', mk: '6 во поле + 1 голман' } },
        stat2: { title: { en: 'Size 3 Ball', mk: 'Топка Број 3' }, desc: { en: 'Official handball ball', mk: 'Официјална ракометна топка' } },
        stat3: { title: { en: '6 Teams', mk: '6 Тимови' }, desc: { en: '2 groups of 3 teams', mk: '2 групи по 3 екипи' } },
        stat4: { title: { en: '40 Min Matches', mk: '40 Мин. Натпревар' }, desc: { en: '2 x 20 minutes', mk: '2 х 20 минути игра' } }
      },
      volleyball: {
        stat1: { title: { en: '6v6 Women', mk: '6v6 Жени' }, desc: { en: "Women's only tournament", mk: 'Турнир исклучиво за жени' } },
        stat2: { title: { en: 'Best of 3', mk: 'Подобар во 3 сета' }, desc: { en: 'To 21, tiebreak to 15', mk: 'До 21 поен, тајбрејк до 15' } },
        stat3: { title: { en: '6 Teams', mk: '6 Тимови' }, desc: { en: '2 groups of 3 teams', mk: '2 групи по 3 екипи' } },
        stat4: { title: { en: 'Net Foul', mk: 'Грешка на Мрежа' }, desc: { en: 'Strict net touch rules', mk: 'Строги правила за допир на мрежа' } }
      },
      pingpong: {
        stat1: { title: { en: '1v1 Singles', mk: 'Сингл 1на1' }, desc: { en: 'Fast-paced table tennis', mk: 'Брз и динамичен пинг понг' } },
        stat2: { title: { en: 'Best of 5', mk: 'До 3 добиени гејма' }, desc: { en: 'Each game played to 11', mk: 'Секој гејм се игра до 11' } },
        stat3: { title: { en: '32 Players', mk: '32 Учесници' }, desc: { en: 'Knockout tournament', mk: 'Директен нокаут систем' } },
        stat4: { title: { en: 'ITTF Tables', mk: 'ITTF Маси' }, desc: { en: 'Professional equipment', mk: 'Професионални маси и мрежи' } }
      }
    },
    noResults: {
      en: 'No matching rules found for this category. Try another search query.',
      mk: 'Не се пронајдени совпаѓања за оваа категорија. Обидете се со друго пребарување.'
    }
  };

  // Structured rules and format data for all sports
  const sportsRulesData = useMemo<Record<string, {
    formatCard: {
      id: string;
      category: 'format';
      titleEn: string;
      titleMk: string;
      pointsEn: string[];
      pointsMk: string[];
      icon: any;
    };
    articles: Array<{
      id: string;
      category: 'core' | 'matches' | 'discipline';
      numEn: string;
      numMk: string;
      titleEn: string;
      titleMk: string;
      pointsEn: string[];
      pointsMk: string[];
      icon: any;
    }>;
  }>>(() => ({
    soccer: {
      formatCard: {
        id: 'format-card',
        category: 'format',
        titleEn: 'Tournament Structure & Scheduling',
        titleMk: 'Структура и распоред на турнирот',
        pointsEn: [
          'Ball Size: Played exclusively with a professional size 5 futsal ball.',
          'Team Count & Groups: 12 teams in total, divided into 4 groups of 3 teams each.',
          'Elimination: The top two teams from each group advance to the knockout/elimination stage (Quarterfinals).',
          'Tournament Span: Exactly 5 days of competitive play:',
          '  • Days 1 & 2: Group Stage matches',
          '  • Day 3: Quarterfinal matches',
          '  • Day 4: Semifinal matches',
          '  • Day 5: Third-place play-off and Grand Finale',
          'Schedule Draw: The schedule and group drawings are conducted a few days before the tournament starts and are final.',
          'Special Requests: Teams can request to avoid playing on 1 specific day out of the first 2 group stage days, provided they inform the organizers at least 1 day before the draw.'
        ],
        pointsMk: [
          'Топка за игра: Се игра исклучиво со професионална фудбалска топка број 5.',
          'Тимови и Групи: Вкупно 12 екипи, распоредени во 4 групи по 3 тима.',
          'Елиминациона фаза: Двете првопласирани екипи од секоја група продолжуваат во четвртфинале.',
          'Времетраење на турнирот: Турнирот трае точно 5 дена:',
          '  • Ден 1 и 2: Натпревари по групи',
          '  • Ден 3: Четвртфинална фаза',
          '  • Ден 4: Полуфинални натпревари',
          '  • Ден 5: Мало финале (3-то место) и Големо Финале',
          'Ждрепка и Распоред: Распоредот и ждрепката се прават неколку дена пред почетокот на турнирот и се конечни.',
          'Специфични барања: Тимовите можат, најдоцна 1 ден пред извлекувањето, да наведат максимум 1 ден од првите два дена (групна фаза) во кој не сакаат или не можат да играат.'
        ],
        icon: Calendar
      },
      articles: [
        {
          id: 'soccer-art-1',
          category: 'core',
          numEn: 'Article 1',
          numMk: 'Член 1',
          titleEn: 'Team Composition',
          titleMk: 'Состав на екипа',
          pointsEn: [
            'The match is played with 6 players (5 outfield players + 1 goalkeeper).',
            'Each team can register a maximum of 12 players.',
            'The minimum number of players to start a match is 4 (including the goalkeeper).'
          ],
          pointsMk: [
            'Натпреварот се игра со 6 играчи (5 играчи во поле + 1 голман).',
            'Екипата може да пријави најмногу 12 играчи.',
            'Минимален број играчи за почеток на натпревар е 4 (вклучувајќи голман).'
          ],
          icon: Users
        },
        {
          id: 'soccer-art-2',
          category: 'core',
          numEn: 'Article 2',
          numMk: 'Член 2',
          titleEn: 'Substitutions',
          titleMk: 'Замени',
          pointsEn: [
            'Substitutions are unlimited.',
            'Substitutions can be made on-the-fly ("flying substitutions") through the designated substitution zone.',
            'The player being substituted must fully leave the pitch before the substitute enters.'
          ],
          pointsMk: [
            'Замени се неограничени.',
            'Замени можат да се вршат во текот на играта („летечки замени“), преку означената зона за замена.',
            'Играчот што излегува мора целосно да го напушти теренот пред влегување на замената.'
          ],
          icon: Clock
        },
        {
          id: 'soccer-art-3',
          category: 'matches',
          numEn: 'Article 3',
          numMk: 'Член 3',
          titleEn: 'Match Duration',
          titleMk: 'Времетраење на натпревар',
          pointsEn: [
            'Group stage matches are played as 2 x 15 minutes with a 3-minute half-time break.',
            'All knockout/elimination matches are played as 2 x 20 minutes.',
            'The clock runs continuously, except in case of a serious injury or by decision of the referee.'
          ],
          pointsMk: [
            'Натпреварите во групна фаза се играат 2 x 15 минути со пауза од 3 минути.',
            'Сите елиминациони натпревари се играат во формат 2 полувремиња по 20 минути.',
            'Времето тече непрекинато, освен при потешка повреда или по одлука на судијата.'
          ],
          icon: Clock
        },
        {
          id: 'soccer-art-4',
          category: 'matches',
          numEn: 'Article 4',
          numMk: 'Член 4',
          titleEn: 'Point System',
          titleMk: 'Систем на бодирање',
          pointsEn: [
            'Win: 3 points | Draw: 1 point | Loss: 0 points.',
            'In case of a tie in points, the group ranking is determined by:',
            '1. Head-to-head match result',
            '2. Goal difference',
            '3. Most goals scored',
            '4. Fewest goals conceded',
            '5. Draw (lottery).'
          ],
          pointsMk: [
            'Победа: 3 бода | Нерешено: 1 бод | Пораз: 0 бодови.',
            'При еднаков број бодови редоследот во групата се одредува според:',
            '1. Меѓусебен дуел',
            '2. Гол-разлика',
            '3. Повеќе постигнати голови',
            '4. Помалку примени голови',
            '5. Ждрепка.'
          ],
          icon: Trophy
        },
        {
          id: 'soccer-art-5',
          category: 'core',
          numEn: 'Article 5',
          numMk: 'Член 5',
          titleEn: 'Game Rules',
          titleMk: 'Правила на игра',
          pointsEn: [
            'The offside rule does not apply.',
            'Kick-ins must be taken with the foot, and the ball must be placed exactly on the touchline.',
            'Opposing players must stand at least 3 meters away from the ball during any free kick or restart.',
            'A goal cannot be scored directly from a kick-in unless touched by another player.'
          ],
          pointsMk: [
            'Не се применува правило за офсајд.',
            'При изведување на аут, топката мора да биде поставена точно на линијата.',
            'Противничките играчи мора да бидат оддалечени најмалку 3 метри при изведување на прекин.',
            'Гол од аут не важи доколку никој друг не ја допрел топката.'
          ],
          icon: BookOpen
        },
        {
          id: 'soccer-art-6',
          category: 'core',
          numEn: 'Article 6',
          numMk: 'Член 6',
          titleEn: 'Goalkeeper Policy',
          titleMk: 'Голман',
          pointsEn: [
            'The goalkeeper is not allowed to touch the ball with their hands after a deliberate backpass from a teammate.',
            'The goalkeeper has a maximum of 5 seconds to release and put the ball back into play.'
          ],
          pointsMk: [
            'Голманот не смее да ја земе топката со рака по намерно враќање од свој соиграч.',
            'Голманот има најмногу 5 секунди за да ја пушти топката во игра.'
          ],
          icon: ShieldAlert
        },
        {
          id: 'soccer-art-7',
          category: 'discipline',
          numEn: 'Article 7',
          numMk: 'Член 7',
          titleEn: 'Fouls and Discipline',
          titleMk: 'Прекршоци и дисциплина',
          pointsEn: [
            'Sliding tackles towards an opponent are strictly prohibited.',
            'Accumulated Fouls: From the 6th foul onwards in each half (after 5 accumulated fouls), every subsequent foul results in a direct free kick taken from the 10-meter double penalty mark.',
            'For unsporting behavior, the referee can issue yellow or red cards.',
            'A player receiving a red card must leave the match and is suspended for the remainder of that game.',
            'The organizer reserves the right to impose additional disciplinary actions on players or teams.'
          ],
          pointsMk: [
            'Лизгачки стартови кон противник се забранети.',
            'Акумулирани прекршоци: После 5-тиот фаул во едно полувреме, секој нареден прекршок се казнува со директен шут од 10 метри.',
            'За неспортско однесување судијата може да додели жолт или црвен картон.',
            'Играч со црвен картон го напушта натпреварот и нема право на настап до крајот на истиот.',
            'Организаторот има право дополнително дисциплински да казни играч или екипа.'
          ],
          icon: Flame
        },
        {
          id: 'soccer-art-8',
          category: 'matches',
          numEn: 'Article 8',
          numMk: 'Член 8',
          titleEn: 'Knockout Stage (Penalties)',
          titleMk: 'Нокаут фаза',
          pointsEn: [
            'If a knockout match ends in a draw, a penalty shootout will be taken immediately.',
            'Each team takes 3 penalty kicks.',
            'If still tied after 3 kicks, penalties continue in a sudden-death system ("one-by-one") until a winner is determined.'
          ],
          pointsMk: [
            'Ако натпреварот заврши нерешено во нокаут фазата, веднаш се изведуваат пенали.',
            'Секоја екипа изведува по 3 пенали.',
            'Ако резултатот остане нерешен, се продолжува по систем „еден за еден“ до добивање победник.'
          ],
          icon: Trophy
        },
        {
          id: 'soccer-art-9',
          category: 'core',
          numEn: 'Article 9',
          numMk: 'Член 9',
          titleEn: 'Equipment & Jerseys',
          titleMk: 'Опрема',
          pointsEn: [
            'All team players must wear matching jerseys or colored bibs.',
            'Wearing shin guards is highly recommended, and the organizer may declare them mandatory.'
          ],
          pointsMk: [
            'Сите играчи мора да носат исти дресови или маркери.',
            'Носење штитници е препорачливо, а организаторот може да го направи задолжително.'
          ],
          icon: Award
        },
        {
          id: 'soccer-art-10',
          category: 'discipline',
          numEn: 'Article 10',
          numMk: 'Член 10',
          titleEn: 'Jurisdiction & Acceptance',
          titleMk: 'Надлежност',
          pointsEn: [
            'All disputed situations are resolved by the head referee on the pitch.',
            'The decisions of the organizer and the referee are final.',
            'By registering for the tournament, all teams and players fully accept these regulations.'
          ],
          pointsMk: [
            'Сите спорни ситуации ги решава главниот судија.',
            'Одлуките на организаторот и судијата се конечни.',
            'Со пријавување на турнирот, сите екипи го прифаќаат овој правилник.'
          ],
          icon: Scale
        },
        {
          id: 'soccer-art-reg',
          category: 'registration',
          numEn: 'Registration details',
          numMk: 'Детали за пријавување',
          titleEn: 'Team Registration & Fees',
          titleMk: 'Пријавување на екипа и котизација',
          pointsEn: [
            'Entry Fee: 5,000 MKD per team.',
            'Bank Account: 210075945850150 (NLB Banka).',
            'Account Recipient: "GG3x3 Basket Valandovo".',
            'Payment Purpose: "Котизација за учество во Мал Фудбал - [Team Name]".',
            'Deadline: Registration and payment must be completed at least 3 days prior to the tournament start.'
          ],
          pointsMk: [
            'Котизација за учество: 5.000 МКД по екипа.',
            'Жиро сметка: 210075945850150 (НЛБ Банка).',
            'Примач: "GG3x3 Basket Valandovo".',
            'Цел на дознака: "Котизација за Мал Фудбал - [Име на Екипа]".',
            'Рок на уплата: Пријавувањето и уплатата мора да се комплетираат најдоцна 3 дена пред почетокот на турнирот.'
          ],
          icon: CreditCard
        }
      ]
    },
    basketball: {
      formatCard: {
        id: 'format-card',
        category: 'format',
        titleEn: '3x3 Tournament Format & Draws',
        titleMk: '3х3 Структура и ждрепка',
        pointsEn: [
          'Teams and Groups: 16 teams total, divided into 4 groups of 4.',
          'Knockout Progression: Top 2 teams from each group advance to the Quarterfinals.',
          'FIBA Rules Integration: Matches are played under official FIBA 3x3 rules.',
          'FIBA Ranking Points: The tournament is registered in the FIBA 3x3 Planet network. All registered players with valid FIBA 3x3 profiles will receive official world ranking points.',
          'Timing & Scheduling: Held over 3 evening sessions with full floodlights and DJ animation.'
        ],
        pointsMk: [
          'Тимови и Групи: Вкупно 16 екипи, поделени во 4 групи со по 4 екипи.',
          'Елиминации: Првите две екипи од секоја група продолжуваат во четвртфинале.',
          'Официјални FIBA правила: Се игра под официјалните FIBA 3х3 правила.',
          'FIBA Ранкинг Поени: Турнирот е регистриран во мрежата на FIBA 3х3. Сите играчи со валиден FIBA профил добиваат официјални поени за светската ранг листа.',
          'Распоред: Се игра во текот на 3 вечери под рефлектори со музичка анимација од диџеј.'
        ],
        icon: Calendar
      },
      articles: [
        {
          id: 'bball-art-1',
          category: 'core',
          numEn: 'Article 1',
          numMk: 'Член 1',
          titleEn: '3x3 Court and Roster',
          titleMk: '3х3 Терен и Состав',
          pointsEn: [
            'Played on a half-court setup with 1 basket.',
            'Roster size: 3 active players on court + 1 substitute (Max 4 players total).',
            'The game must start with at least 3 players.'
          ],
          pointsMk: [
            'Се игра на половина терен со еден кош.',
            'Состав на екипата: 3 активни играчи на терен + 1 замена (максимум 4 играчи).',
            'Натпреварот мора да започне со најмалку 3 играчи.'
          ],
          icon: Users
        },
        {
          id: 'bball-art-2',
          category: 'matches',
          numEn: 'Article 2',
          numMk: 'Член 2',
          titleEn: 'Scoring & Game Clock',
          titleMk: 'Бодирање и Времетраење',
          pointsEn: [
            'Every shot inside the arc is worth 1 point. Every shot behind the arc (three-point line) is worth 2 points.',
            'Free throws are worth 1 point.',
            'Game duration is 10 minutes continuous clock, OR the first team to reach 21 points wins (sudden-death target).',
            'If tied at the end of 10 minutes, overtime is played. The first team to score 2 points in overtime wins the game.',
            'If a team is a no-show for a scheduled match, they are disqualified, and the game is recorded as a Walkover (W/L) in favor of the team present.'
          ],
          pointsMk: [
            'Секој погодок внатре во лакот вреди 1 поен. Секој погодок зад лакот (линија за три поени) вреди 2 поени.',
            'Слободните фрлања вредат 1 поен.',
            'Времетраењето е 10 минути активна игра, ИЛИ додека еден од тимовите прв не постигне 21 поен (директна победа).',
            'Доколку е нерешено по 10 минути, се играат продолженија. Првиот тим кој ќе постигне 2 поени во продолжението победува.',
            'Доколку една екипа не се појави на натпреварот (no-show), таа се дисквалификува и натпреварот се регистрира како службена победа/пораз (W/L) во корист на присутната екипа.'
          ],
          icon: Trophy
        },
        {
          id: 'bball-art-3',
          category: 'core',
          numEn: 'Article 3',
          numMk: 'Член 3',
          titleEn: 'Shot Clock and Possession',
          titleMk: 'Време за напад и Поседување',
          pointsEn: [
            'Teams have a strict 12-second shot clock to attempt a shot.',
            'After a made basket or free throw, the non-scoring team starts directly underneath the basket. They must clear the ball by passing or dribbling it outside the 2-point arc before attempting a shot.',
            'Following a defensive rebound or steal, the ball must also be cleared behind the arc.'
          ],
          pointsMk: [
            'Тимовите имаат на располагање само 12 секунди за напад.',
            'По постигнат кош или слободно фрлање, противничкиот тим ја презема топката под кошот и мора да ја изнесе со пасирање или водење надвор од лакот пред да нападне.',
            'По дефанзивен скок или украдена топка, исто така топката мора да се изнесе зад линијата на лакот.'
          ],
          icon: Clock
        },
        {
          id: 'bball-art-4',
          category: 'discipline',
          numEn: 'Article 4',
          numMk: 'Член 4',
          titleEn: 'Fouls and Free Throws',
          titleMk: 'Лични грешки и Слободни фрлања',
          pointsEn: [
            'Individual fouls are not kept, but team fouls are accumulated.',
            'Team fouls 7, 8, and 9 award 2 free throws to the opposing team.',
            'Team fouls 10 and above award 2 free throws AND possession of the ball.',
            'Unsportsmanlike or technical fouls result in 1 free throw plus possession.'
          ],
          pointsMk: [
            'Не се бројат лични грешки на играчите, туку се акумулираат тимски грешки.',
            'Тимските прекршоци од 7-ми, 8-ми и 9-ти по ред носат 2 слободни фрлања за противникот.',
            'Тимскиот прекршок 10 и секој нареден носат 2 слободни фрлања И посед на топката.',
            'Неспортски или технички грешки носат 1 слободно фрлање и напад за противничкиот тим.'
          ],
          icon: ShieldAlert
        },
        {
          id: 'bball-art-reg',
          category: 'registration',
          numEn: 'Registration details',
          numMk: 'Детали за пријавување',
          titleEn: 'Team Registration & Fees',
          titleMk: 'Пријавување на екипа и котизација',
          pointsEn: [
            'Entry Fee: 5,000 MKD per team.',
            'Bank Account: 210075945850150 (NLB Banka).',
            'Account Recipient: "GG3x3 Basket Valandovo".',
            'Payment Purpose: "Котизација за 3х3 Баскет - [Team Name]".',
            'Deadline: Registration and payment must be completed at least 3 days prior to the tournament start.'
          ],
          pointsMk: [
            'Котизација за учество: 5.000 МКД по екипа.',
            'Жиро сметка: 210075945850150 (НЛБ Банка).',
            'Примач: "GG3x3 Basket Valandovo".',
            'Цел на дознака: "Котизација за 3х3 Баскет - [Име на Екипа]".',
            'Рок на уплата: Пријавувањето и уплатата мора да се комплетираат најдоцна 3 дена пред почетокот на турнирот.'
          ],
          icon: CreditCard
        }
      ]
    },
    tennis: {
      formatCard: {
        id: 'format-card',
        category: 'format',
        titleEn: 'Tennis Bracket & Rules',
        titleMk: 'Тенис Систем и ждрепка',
        pointsEn: [
          'Singles format. 32 players maximum in a direct single-elimination tournament bracket.',
          'The draws are announced 2 days before the start. Match times are fixed and strict.',
          'Warm-up time on court before the match is strictly limited to 5 minutes.'
        ],
        pointsMk: [
          'Се игра исклучиво во сингл конкуренција (1 на 1). Вкупно 32 играчи во директен елиминациски систем.',
          'Ждрепката се објавува 2 дена пред почетокот. Термините се фиксни и мора строго да се почитуваат.',
          'Времето за загревање на терен пред натпреварот е ограничено на максимум 5 минути.'
        ],
        icon: Calendar
      },
      articles: [
        {
          id: 'tennis-art-1',
          category: 'matches',
          numEn: 'Article 1',
          numMk: 'Член 1',
          titleEn: 'Match Format & Sets',
          titleMk: 'Формат на натпревари и сетови',
          pointsEn: [
            'Matches are played as best of 3 sets (two won sets). Each game is played with regular advantage scoring.',
            'Up to the Quarterfinals, in case of a 3rd set, a super tie-break up to 10 points is played instead of a full 3rd set.',
            'From the Quarterfinals (1/4 finals) onwards, a regular full 3rd set is played up to 6 games with advantage scoring.',
            'In case of a 6-6 tie in any set, a standard tie-break to 7 points is played.'
          ],
          pointsMk: [
            'Натпреварите се играат регуларно во два добиени сета (секој гејм се игра со предност).',
            'До четвртфинале (1/4 финале), во случај на трет сет се игра супер тај-брејк до 10 поени за одредување на победникот.',
            'Од четвртфинале па натаму се игра комплетен трет сет регуларно до 6 гејма, при што секој гејм се игра со предност.',
            'Во случај на нерешен резултат од 6-6 во било кој сет, се игра стандарден тај-брејк до 7 поени.'
          ],
          icon: Trophy
        },
        {
          id: 'tennis-art-2',
          category: 'matches',
          numEn: 'Article 2',
          numMk: 'Член 2',
          titleEn: 'Standard Advantage Scoring',
          titleMk: 'Игра со предност',
          pointsEn: [
            'Traditional Advantage scoring rules apply to all matches in this tournament.',
            'At deuce (40-40), a player must win two consecutive points (Advantage and then Game point) to secure the game.',
            'There are no "No-Ad" or sudden-death deciding points at deuce.'
          ],
          pointsMk: [
            'Во сите натпревари на овој турнир се применуваат традиционалните правила за предност (не се игра со златен поен).',
            'При изедначување (40-40), играчот мора да освои два последователни поени (предност, па поен за гејм) за да го освои гејмот.',
            'Нема ненадејна смрт („златен поен“) при резултат на изедначување.'
          ],
          icon: BookOpen
        },
        {
          id: 'tennis-art-3',
          category: 'discipline',
          numEn: 'Article 3',
          numMk: 'Член 3',
          titleEn: 'Walkovers and Punctuality',
          titleMk: 'Каснување и Службен пораз',
          pointsEn: [
            'Players must report to the tournament desk 15 minutes before their scheduled match.',
            'If a player is late by 15 minutes or more from the scheduled start, a walkover (automatic default win for the opponent) will be declared. No exceptions.'
          ],
          pointsMk: [
            'Играчите мора да се пријават на инфо-пултот 15 минути пред нивниот термин.',
            'Доколку играч касни повеќе од 15 минути од официјалниот старт, натпреварот се регистрира со службен пораз за него. Нема отстапки.'
          ],
          icon: Clock
        },
        {
          id: 'tennis-art-4',
          category: 'discipline',
          numEn: 'Article 4',
          numMk: 'Член 4',
          titleEn: 'Refereeing & Match Officials',
          titleMk: 'Судење на натпреварите',
          pointsEn: [
            'Up to the Semifinals, players referee their own matches.',
            'From the Semifinals onwards, official match referees will be present on court to oversee the matches.'
          ],
          pointsMk: [
            'До полуфинале играчите си судат сами.',
            'Од полуфинале па натаму ќе има судии.'
          ],
          icon: Scale
        },
        {
          id: 'tennis-art-reg',
          category: 'registration',
          numEn: 'Registration details',
          numMk: 'Детали за пријавување',
          titleEn: 'Player Registration & Fees',
          titleMk: 'Пријавување на играч и котизација',
          pointsEn: [
            'Registration Platform: Official registration is done via mojtenis.mk.',
            'Entry Fee & Payment: Handled directly through the mojtenis.mk platform (1,200 MKD / €20 per player).',
            'Direct Link: Play on the official tournament page.',
            'Deadline: Ensure your registration is completed on MojTenis before the draw announcement.'
          ],
          pointsMk: [
            'Платформа за пријавување: Официјалното пријавување се врши преку mojtenis.mk.',
            'Котизација и плаќање: Се процесира директно преку МојТенис платформата (1.200 МКД / €20 по играч).',
            'Директен линк: Пријавете се на официјалната страна за овој настан.',
            'Рок на пријавување: Обезбедете го вашето учество на МојТенис пред објавувањето на ждрепката.'
          ],
          icon: CreditCard
        }
      ]
    },
    handball: {
      formatCard: {
        id: 'format-card',
        category: 'format',
        titleEn: 'Handball Tournament Regulations',
        titleMk: 'Ракометни правила и Систем',
        pointsEn: [
          'Teams and Groups: 6 registered teams, divided into 2 groups of 3.',
          'Eliminations: Top two teams from each group qualify for the knockout stage (Semifinals).',
          'Official Handball: Played with official size 3 handball balls.',
          'Referees: Licensed federation referees oversee all matches.'
        ],
        pointsMk: [
          'Екипи и Групи: Вкупно 6 екипи поделени во 2 групи од по 3.',
          'Нокаут фаза: Двете најдобри екипи од секоја група одат во полуфинале.',
          'Официјална топка: Се игра со официјална ракометна топка број 3.',
          'Судии: Официјални лиценцирани судии ги водат сите натпревари.'
        ],
        icon: Calendar
      },
      articles: [
        {
          id: 'handball-art-1',
          category: 'core',
          numEn: 'Article 1',
          numMk: 'Член 1',
          titleEn: 'Handball Team Roster',
          titleMk: 'Состав на ракометен тим',
          pointsEn: [
            'Matches are played with 7 players on court (6 court players + 1 goalkeeper).',
            'Teams can register up to 14 players on their official tournament roster.',
            'Minimum number of players to start the match is 5.'
          ],
          pointsMk: [
            'Натпреварите се играат со 7 играчи на терен (6 во поле + 1 голман).',
            'Секоја екипа може да регистрира најмногу 14 играчи на турнирот.',
            'Минималниот број на играчи за почеток на натпреварот е 5.'
          ],
          icon: Users
        },
        {
          id: 'handball-art-2',
          category: 'matches',
          numEn: 'Article 2',
          numMk: 'Член 2',
          titleEn: 'Match Timing & Shootouts',
          titleMk: 'Време на игра и Пенали',
          pointsEn: [
            'Matches consist of 2 halves of 20 minutes each, with a 5-minute half-time break.',
            'In knockout stages, if the match ends in a draw, no extra-time is played. Instead, a penalty shootout from the 7-meter line takes place immediately (3 throws per team).',
            'If still tied, sudden-death throws continue until a winner emerges.'
          ],
          pointsMk: [
            'Натпреварите се играат 2 полувремиња по 20 минути, со 5 минути пауза.',
            'Во елиминационата фаза, доколку е нерешено, веднаш се шутираат пенали од 7 метри (по 3 пенали од екипа).',
            'Доколку и понатаму е нерешено, се шутира наизменично по еден пенал до победник.'
          ],
          icon: Clock
        },
        {
          id: 'handball-art-3',
          category: 'discipline',
          numEn: 'Article 3',
          numMk: 'Член 3',
          titleEn: 'Suspensions & Cards',
          titleMk: 'Исклучувања и Картони',
          pointsEn: [
            'Standard handball disciplinary rules apply: yellow cards, 2-minute suspensions, and red cards.',
            'A player receiving three 2-minute suspensions in a single match is automatically disqualified (red card) and must leave the bench.'
          ],
          pointsMk: [
            'Важат стандардните ракометни правила: жолт картон, 2 минути исклучување и црвен картон.',
            'Играч кој ќе добие три исклучувања од по 2 минути во еден натпревар автоматски добива црвен картон.'
          ],
          icon: ShieldAlert
        },
        {
          id: 'handball-art-reg',
          category: 'registration',
          numEn: 'Registration details',
          numMk: 'Детали за пријавување',
          titleEn: 'Team Registration & Fees',
          titleMk: 'Пријавување на екипа и котизација',
          pointsEn: [
            'Entry Fee: 1,000 MKD per team.',
            'Bank Account: 210075945850150 (NLB Banka).',
            'Account Recipient: "GG3x3 Basket Valandovo".',
            'Payment Purpose: "Котизација за Ракомет - [Team Name]".',
            'Deadline: Registration and payment must be completed at least 3 days prior to the tournament start.'
          ],
          pointsMk: [
            'Котизација за учество: 1.000 МКД по екипа.',
            'Жиро сметка: 210075945850150 (НЛБ Банка).',
            'Примач: "GG3x3 Basket Valandovo".',
            'Цел на дознака: "Котизација за Ракомет - [Име на Екипа]".',
            'Рок на уплата: Пријавувањето и уплатата мора да се комплетираат најдоцна 3 дена пред почетокот на турнирот.'
          ],
          icon: CreditCard
        }
      ]
    },
    volleyball: {
      formatCard: {
        id: 'format-card',
        category: 'format',
        titleEn: "Women's Volleyball Cup",
        titleMk: 'Турнир во женска одбојка',
        pointsEn: [
          '6 teams divided into 2 groups of 3.',
          'Official volleyball rules played with extreme competitive spirit and friendly summer vibes.',
          'Full-sized tournament court with high-quality netting and referee standing platform.'
        ],
        pointsMk: [
          'Вкупно 6 екипи поделени во 2 групи од по 3.',
          'Официјални правила во одбојка, со натпреварувачки дух и пријателска летна атмосфера.',
          'Стандарден одбојкарски терен со висококвалитетни мрежи и платформа за првиот судија.'
        ],
        icon: Calendar
      },
      articles: [
        {
          id: 'vball-art-1',
          category: 'core',
          numEn: 'Article 1',
          numMk: 'Член 1',
          titleEn: 'Women-only Tournament',
          titleMk: 'Турнир за жени',
          pointsEn: [
            'Played with 6 players on court per team.',
            'This tournament is exclusively for women’s teams, promoting sportsmanship and competitiveness.',
            'Teams can register up to 10 players on their roster.'
          ],
          pointsMk: [
            'Се игра со 6 активни играчи на терен по екипа.',
            'Овој турнир се игра исклучиво во женска конкуренција, промовирајќи спортски дух и натпреварување.',
            'Секој тим може да пријави најмногу 10 играчи на официјалниот список.'
          ],
          icon: Users
        },
        {
          id: 'vball-art-2',
          category: 'matches',
          numEn: 'Article 2',
          numMk: 'Член 2',
          titleEn: 'Set Structure & Points',
          titleMk: 'Бодови и структура на сетови',
          pointsEn: [
            'Matches are played in best-of-3 sets format (first to win 2 sets wins the match).',
            'The first 2 sets are played to 21 points (must win by a 2-point margin, capped at 25).',
            'If a deciding 3rd set is required, it is played to 15 points (must win by 2, capped at 17).'
          ],
          pointsMk: [
            'Натпреварите се играат во два добиени сета (Best of 3).',
            'Првите два сета се играат до 21 поен (мора да има 2 поени разлика, лимит до 25 поени).',
            'Доколку се игра трет одлучувачки сет, тој се игра до 15 поени (мора да има 2 поени разлика, со лимит до 17).'
          ],
          icon: Trophy
        },
        {
          id: 'vball-art-3',
          category: 'discipline',
          numEn: 'Article 3',
          numMk: 'Член 3',
          titleEn: 'Net Touches & Serves',
          titleMk: 'Контакт со мрежа и Сервис',
          pointsEn: [
            'Any touch of the net by a player during active play is a direct violation, awarding a point to the opponents.',
            'Licking or blocking the serve at the net is strictly prohibited.',
            'Underhand and overhand serves are both allowed.'
          ],
          pointsMk: [
            'Секој допир на мрежата од кој било дел од телото на играчот е грешка и носи поен за противникот.',
            'Блокирање на сервис директно на мрежа е строго забрането.',
            'Дозволено е сервирање и одоздола (школски) и одозгора.'
          ],
          icon: ShieldAlert
        },
        {
          id: 'vball-art-reg',
          category: 'registration',
          numEn: 'Registration details',
          numMk: 'Детали за пријавување',
          titleEn: 'Team Registration & Fees',
          titleMk: 'Пријавување на екипа и котизација',
          pointsEn: [
            'Entry Fee: Free of Charge (0 MKD)!',
            'Registration: Simply register your team using our online portal.',
            'No Payment Required: This event is free to participate.',
            'Deadline: Registration must be completed at least 3 days prior to the tournament start.'
          ],
          pointsMk: [
            'Котизација за учество: Бесплатно (0 МКД)!',
            'Пријавување: Пополнете ја онлајн пријавата на нашиот портал.',
            'Не е потребна уплата: Овој турнир е со бесплатно учество.',
            'Рок за пријавување: Пријавувањето мора да се комплетира најдоцна 3 дена пред почетокот на турнирот.'
          ],
          icon: CreditCard
        }
      ]
    },
    pingpong: {
      formatCard: {
        id: 'format-card',
        category: 'format',
        titleEn: 'Table Tennis Open Cup',
        titleMk: 'Пинг Понг Турнир на Маси',
        pointsEn: [
          'Singles format (1v1). Limit of 32 players in a direct single-elimination bracket.',
          'Professional ITTF-approved indoor table tennis tables and standard 3-star 40+ balls are provided.',
          'Players must bring their own rackets/bats; the organizers will not supply rackets.'
        ],
        pointsMk: [
          'Се игра сингл (1 на 1). Вкупно 32 играчи во директен елиминациски систем.',
          'Обезбедени се професионални одобрени ITTF маси за игра и стандардни топчиња 3-star 40+.',
          'Играчите се должни сами да си обезбедат сопствени рекети.'
        ],
        icon: Calendar
      },
      articles: [
        {
          id: 'pong-art-1',
          category: 'matches',
          numEn: 'Article 1',
          numMk: 'Член 1',
          titleEn: 'Match Scoring Rules',
          titleMk: 'Систем на бодови',
          pointsEn: [
            'Matches are played in best-of-5 games format (first to win 3 games wins the match).',
            'A game is won by the player who first scores 11 points.',
            'If the score is tied at 10-10, the game continues until one player gains a 2-point lead.'
          ],
          pointsMk: [
            'Натпреварите се играат во три добиени гејма (Best of 5 games).',
            'Гејмот го освојува играчот кој прв ќе постигне 11 поени.',
            'Доколку резултатот е 10-10, играта продолжува се додека еден играч не направи разлика од 2 поени.'
          ],
          icon: Trophy
        },
        {
          id: 'pong-art-2',
          category: 'core',
          numEn: 'Article 2',
          numMk: 'Член 2',
          titleEn: 'Service Alternation & Rules',
          titleMk: 'Правила на сервис',
          pointsEn: [
            'Service alternates between opponents after every 2 points scored.',
            'The ball must be tossed near-vertically at least 16cm from the palm of the free hand and struck so that it first touches the server\'s court and then the receiver\'s court.',
            'If the serve touches the net ("let") but still lands in the receiver\'s court, the serve is replayed with no penalty.'
          ],
          pointsMk: [
            'Сервисот се менува наизменично по секои 2 освоени поени.',
            'При сервис, топчето мора да се фрли нагоре од отворена дланка најмалку 16цм и да се удри така што ќе удри прво на сопствената половина, па потоа на противничката.',
            'Доколку при сервис топчето ја допре мрежата („нецелосен сервис“), сервисот се повторува.'
          ],
          icon: BookOpen
        },
        {
          id: 'pong-art-3',
          category: 'discipline',
          numEn: 'Article 3',
          numMk: 'Член 3',
          titleEn: 'Punctuality',
          titleMk: 'Навремено пријавување',
          pointsEn: [
            'Players must check in 10 minutes prior to their match time.',
            'If a player is late by more than 10 minutes from their official call time, they will suffer an automatic loss (walkover).'
          ],
          pointsMk: [
            'Играчите мора да бидат присутни 10 минути пред закажаниот термин.',
            'Доколку играч касни повеќе од 10 минути, тој автоматски го губи натпреварот со службен резултат.'
          ],
          icon: Clock
        },
        {
          id: 'pong-art-reg',
          category: 'registration',
          numEn: 'Registration details',
          numMk: 'Детали за пријавување',
          titleEn: 'Player Registration & Fees',
          titleMk: 'Пријавување на играч и котизација',
          pointsEn: [
            'Entry Fee: 800 MKD per player.',
            'Bank Account: 210075945850150 (NLB Banka).',
            'Account Recipient: "GG3x3 Basket Valandovo".',
            'Payment Purpose: "Котизација за Пинг Понг - [Player Name]".',
            'Deadline: Registration and payment must be completed at least 3 days prior to the tournament start.'
          ],
          pointsMk: [
            'Котизација за учество: 800 МКД по играч.',
            'Жиро сметка: 210075945850150 (НЛБ Банка).',
            'Примач: "GG3x3 Basket Valandovo".',
            'Цел на дознака: "Котизација за Пинг Понг - [Име и Презиме]".',
            'Рок на уплата: Пријавувањето и уплатата мора да се комплетираат најдоцна 3 дена пред почетокот на турнирот.'
          ],
          icon: CreditCard
        }
      ]
    }
  }), []);

  // Map sport icons
  const sportIcons: Record<string, any> = {
    basketball: Dribbble,
    soccer: Footprints,
    tennis: Target,
    handball: Hand,
    volleyball: Volleyball,
    pingpong: CircleDot
  };

  const selectedSportData = sportsRulesData[selectedSportId] || sportsRulesData['basketball'];
  const currentSportStats = t.quickStats[selectedSportId as keyof typeof t.quickStats] || t.quickStats['basketball'];

  // Filter & Search Logic
  const filteredArticles = useMemo(() => {
    let result = [...selectedSportData.articles];

    // Category filter
    if (activeTab !== 'all') {
      result = result.filter(art => art.category === activeTab);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(art => {
        const title = currentLanguage === 'en' ? art.titleEn.toLowerCase() : art.titleMk.toLowerCase();
        const num = currentLanguage === 'en' ? art.numEn.toLowerCase() : art.numMk.toLowerCase();
        const points = currentLanguage === 'en' 
          ? art.pointsEn.join(' ').toLowerCase() 
          : art.pointsMk.join(' ').toLowerCase();

        return title.includes(query) || num.includes(query) || points.includes(query);
      });
    }

    return result;
  }, [selectedSportData, activeTab, searchQuery, currentLanguage]);

  // Is format card visible based on filters
  const isFormatCardVisible = useMemo(() => {
    if (activeTab !== 'all' && activeTab !== 'format') return false;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const title = currentLanguage === 'en' ? selectedSportData.formatCard.titleEn.toLowerCase() : selectedSportData.formatCard.titleMk.toLowerCase();
      const points = currentLanguage === 'en'
        ? selectedSportData.formatCard.pointsEn.join(' ').toLowerCase()
        : selectedSportData.formatCard.pointsMk.join(' ').toLowerCase();
      
      return title.includes(query) || points.includes(query);
    }

    return true;
  }, [activeTab, searchQuery, selectedSportData, currentLanguage]);

  return (
    <section id="rules" className="py-20 bg-black/40 border-t border-brand-border scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-3.5 py-1 text-xs font-black text-brand-orange uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            {currentLanguage === 'en' ? t.title.en : t.title.mk}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {currentLanguage === 'en' ? t.title.en : t.title.mk}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {currentLanguage === 'en' ? t.subtitle.en : t.subtitle.mk}
          </p>
        </div>

        {/* Sport Selection Tabs */}
        <div className="bg-brand-card/60 p-2 rounded-2xl border border-brand-border/60 flex flex-wrap gap-1.5 justify-center">
          {Object.entries(t.sports).map(([sportId, names]) => {
            const Icon = sportIcons[sportId] || Trophy;
            const isSelected = selectedSportId === sportId;
            return (
              <button
                key={sportId}
                onClick={() => onSportChange(sportId)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-orange text-white orange-shadow'
                    : 'hover:bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-white animate-pulse' : 'text-gray-500'}`} />
                {currentLanguage === 'en' ? names.en : names.mk}
              </button>
            );
          })}
        </div>

        {/* Entry Fee & Prize Pool Banner */}
        {(() => {
          const selectedSportInfo = sportsData.find(s => s.id === selectedSportId);
          return (
            <div className="bg-gradient-to-r from-brand-orange/15 via-amber-500/5 to-transparent border border-brand-orange/35 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none text-brand-orange group-hover:scale-110 transition-transform duration-500">
                <Trophy className="h-32 w-32" />
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-brand-orange/15 border border-brand-orange/20 text-brand-orange">
                  <Trophy className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-black text-brand-orange tracking-widest block">
                    {currentLanguage === 'en' ? 'Core Incentives' : 'Главни информации'}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
                    {currentLanguage === 'en' ? selectedSportInfo?.nameEn : selectedSportInfo?.nameMk}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 w-full sm:w-auto justify-around sm:justify-end">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Prize Pool' : 'Награден Фонд'}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white orange-text-glow leading-none block mt-1">
                    {currentLanguage === 'en' ? selectedSportInfo?.prizePoolEn : selectedSportInfo?.prizePoolMk}
                  </span>
                </div>
                <div className="h-10 w-px bg-brand-border/60 hidden sm:block"></div>
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
                    {currentLanguage === 'en' ? 'Entry Fee' : 'Котизација'}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-brand-orange leading-none block mt-1">
                    {currentLanguage === 'en' ? selectedSportInfo?.entryFeeEn : selectedSportInfo?.entryFeeMk}
                  </span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Quick Stats Grid for current sport */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-brand-card border border-brand-border/60 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase">
                {currentLanguage === 'en' ? currentSportStats.stat1.title.en : currentSportStats.stat1.title.mk}
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {currentLanguage === 'en' ? currentSportStats.stat1.desc.en : currentSportStats.stat1.desc.mk}
              </p>
            </div>
          </div>

          <div className="bg-brand-card border border-brand-border/60 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase">
                {currentLanguage === 'en' ? currentSportStats.stat2.title.en : currentSportStats.stat2.title.mk}
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {currentLanguage === 'en' ? currentSportStats.stat2.desc.en : currentSportStats.stat2.desc.mk}
              </p>
            </div>
          </div>

          <div className="bg-brand-card border border-brand-border/60 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-lime-400/10 border border-lime-400/20 text-lime-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase">
                {currentLanguage === 'en' ? currentSportStats.stat3.title.en : currentSportStats.stat3.title.mk}
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {currentLanguage === 'en' ? currentSportStats.stat3.desc.en : currentSportStats.stat3.desc.mk}
              </p>
            </div>
          </div>

          <div className="bg-brand-card border border-brand-border/60 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-400/10 border border-sky-400/20 text-sky-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase">
                {currentLanguage === 'en' ? currentSportStats.stat4.title.en : currentSportStats.stat4.title.mk}
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {currentLanguage === 'en' ? currentSportStats.stat4.desc.en : currentSportStats.stat4.desc.mk}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Tabs Controller */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-brand-border pb-6">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {(Object.keys(t.tabs) as Array<keyof typeof t.tabs>).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tabKey
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-card hover:bg-white/5 text-gray-400 hover:text-white border border-brand-border'
                }`}
              >
                {currentLanguage === 'en' ? t.tabs[tabKey].en : t.tabs[tabKey].mk}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLanguage === 'en' ? t.searchPlaceholder.en : t.searchPlaceholder.mk}
              className="w-full bg-brand-card border border-brand-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-all"
            />
          </div>
        </div>

        {/* Rules Render list */}
        <div className="space-y-4">
          
          {/* Format Card */}
          {isFormatCardVisible && (
            <div className="bg-brand-card/75 border border-brand-orange/30 rounded-2xl overflow-hidden orange-border-glow transition-all">
              <button
                onClick={() => toggleArticle(selectedSportData.formatCard.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-gradient-to-r from-brand-orange/5 to-transparent hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-brand-orange/15 text-brand-orange">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-brand-orange tracking-widest block mb-0.5">
                      {currentLanguage === 'en' ? 'TOURNAMENT STRUCTURE' : 'ФОРМАТ НА ТУРНИРОТ'}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-extrabold text-white uppercase tracking-tight">
                      {currentLanguage === 'en' ? selectedSportData.formatCard.titleEn : selectedSportData.formatCard.titleMk}
                    </h3>
                  </div>
                </div>
                {expandedArticles[selectedSportData.formatCard.id] ? (
                  <ChevronUp className="h-5 w-5 text-brand-orange" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedArticles[selectedSportData.formatCard.id] && (
                <div className="px-6 pb-6 pt-2 border-t border-brand-border/40 bg-black/10">
                  <ul className="space-y-3.5 text-xs sm:text-sm text-gray-300">
                    {(currentLanguage === 'en' ? selectedSportData.formatCard.pointsEn : selectedSportData.formatCard.pointsMk).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0"></span>
                        <span className="whitespace-pre-line">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Regular Articles */}
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => {
              const Icon = art.icon;
              const isExpanded = !!expandedArticles[art.id];
              return (
                <div
                  key={art.id}
                  className={`bg-brand-card border border-brand-border/60 rounded-xl overflow-hidden transition-all duration-200 ${
                    isExpanded ? 'ring-1 ring-brand-orange/25' : 'hover:border-brand-border'
                  }`}
                >
                  <button
                    onClick={() => toggleArticle(art.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-lg transition-colors ${isExpanded ? 'bg-brand-orange/15 text-brand-orange' : 'bg-black/35 text-gray-400'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase font-black text-brand-orange tracking-widest block">
                          {currentLanguage === 'en' ? art.numEn : art.numMk}
                        </span>
                        <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-tight mt-0.5">
                          {currentLanguage === 'en' ? art.titleEn : art.titleMk}
                        </h3>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-brand-orange" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1.5 border-t border-brand-border/40 bg-black/10">
                      <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                        {(currentLanguage === 'en' ? art.pointsEn : art.pointsMk).map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            !isFormatCardVisible && (
              <div className="text-center py-12 bg-brand-card/30 border border-brand-border rounded-xl">
                <p className="text-sm text-gray-500 font-medium">
                  {currentLanguage === 'en' ? t.noResults.en : t.noResults.mk}
                </p>
              </div>
            )
          )}
        </div>

      </div>
    </section>
  );
}
