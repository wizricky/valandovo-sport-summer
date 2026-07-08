import React, { useState, useEffect } from 'react';
import {
  Trophy,
  User,
  Mail,
  Phone,
  Users,
  Plus,
  Trash2,
  CheckCircle,
  Dribbble,
  CreditCard,
  Footprints,
  Target,
  Hand,
  Globe,
  CircleDot,
  Volleyball
} from 'lucide-react';
import { Language, Registration, Sport } from '../types';
import { translations, sportsData } from '../data';

interface RegistrationFormProps {
  currentLanguage: Language;
}

export default function RegistrationForm({ currentLanguage }: RegistrationFormProps) {
  const [sports, setSports] = useState<Sport[]>(sportsData);
  const [selectedSport, setSelectedSport] = useState<string>(sportsData[0].id);
  const selectedSportData = sports.find(s => s.id === selectedSport);
  const isSportFull = selectedSportData ? selectedSportData.registeredCount >= selectedSportData.maxTeams : false;
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roster, setRoster] = useState<string[]>(['', '', '']); // Default 3 empty player spaces
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smtpStatusMsg, setSmtpStatusMsg] = useState('');
  
  // Stored registrations
  const [myRegistrations, setMyRegistrations] = useState<Registration[]>([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('valandovo_registrations');
    if (saved) {
      try {
        setMyRegistrations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse registrations', e);
      }
    }
  }, []);

  const t = (key: string) => translations[key]?.[currentLanguage] || '';

  // Get sport detail
  const getSportName = (id: string) => {
    const s = sports.find(item => item.id === id);
    return s ? (currentLanguage === 'en' ? s.nameEn : s.nameMk) : '';
  };

  const getSportIcon = (id: string) => {
    switch (id) {
      case 'basketball': return <Dribbble className="h-5 w-5 text-brand-orange" />;
      case 'soccer': return <Footprints className="h-5 w-5 text-emerald-400" />;
      case 'tennis': return <Target className="h-5 w-5 text-lime-400" />;
      case 'handball': return <Hand className="h-5 w-5 text-red-500" />;
      case 'volleyball': return <Volleyball className="h-5 w-5 text-sky-400" />;
      case 'pingpong': return <CircleDot className="h-5 w-5 text-yellow-400" />;
      default: return <Trophy className="h-5 w-5 text-brand-orange" />;
    }
  };

  // Manage roster inputs
  const handleRosterChange = (index: number, value: string) => {
    const newRoster = [...roster];
    newRoster[index] = value;
    setRoster(newRoster);
  };

  const addPlayerRow = () => {
    setRoster([...roster, '']);
  };

  const removePlayerRow = (index: number) => {
    if (roster.length <= 1) return;
    const newRoster = roster.filter((_, i) => i !== index);
    setRoster(newRoster);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Form validations
    if (!teamName.trim()) {
      setErrorMsg(currentLanguage === 'en' ? 'Team Name is required' : 'Името на екипата е задолжително');
      return;
    }
    if (!captainName.trim()) {
      setErrorMsg(currentLanguage === 'en' ? 'Captain Name is required' : 'Името на капитенот е задолжително');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(currentLanguage === 'en' ? 'A valid email is required' : 'Внесете валидна е-пошта');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(currentLanguage === 'en' ? 'Phone number is required' : 'Телефонскиот број е задолжителен');
      return;
    }

    // Filter roster
    const activeRoster = roster.map(p => p.trim()).filter(p => p !== '');
    if (activeRoster.length === 0) {
      setErrorMsg(currentLanguage === 'en' ? 'Please add at least one player to your roster' : 'Ве молиме додадете барем еден играч во тимот');
      return;
    }

    // Create registration
    const newReg: Registration = {
      id: 'reg_' + Date.now(),
      teamName: teamName.trim(),
      captainName: captainName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      sportId: selectedSport,
      roster: activeRoster,
      timestamp: new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'mk-MK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setIsSubmitting(true);
    setSmtpStatusMsg('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReg),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (currentLanguage === 'en' ? 'Failed to submit registration' : 'Неуспешно испраќање на пријавата'));
      }

      // Save to local state and local storage
      const updated = [newReg, ...myRegistrations];
      setMyRegistrations(updated);
      localStorage.setItem('valandovo_registrations', JSON.stringify(updated));

      // Update sports registrations count locally for display
      setSports(prev => prev.map(s => {
        if (s.id === selectedSport) {
          return { ...s, registeredCount: Math.min(s.maxTeams, s.registeredCount + 1) };
        }
        return s;
      }));

      // Set status msg based on backend configuration
      if (data.smtpConfigured === false) {
        setSmtpStatusMsg(
          currentLanguage === 'en'
            ? '✓ Registered locally (configure SMTP in secrets to send to streetballvalandovo@gmail.com)'
            : '✓ Успешна локална пријава (конфигурирајте SMTP во подесувањата за испраќање на е-пошта)'
        );
      } else {
        setSmtpStatusMsg(
          currentLanguage === 'en'
            ? '✉ Registration details sent to streetballvalandovo@gmail.com!'
            : '✉ Податоците за пријавата се испратени на streetballvalandovo@gmail.com!'
        );
      }

      // Reset Form & Show success
      setSuccess(true);
      setTeamName('');
      setCaptainName('');
      setEmail('');
      setPhone('');
      setRoster(['', '', '']);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || (currentLanguage === 'en' ? 'Connection error. Please try again.' : 'Грешка во врската. Ве молиме обидете се повторно.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteRegistration = (id: string) => {
    const updated = myRegistrations.filter(r => r.id !== id);
    setMyRegistrations(updated);
    localStorage.setItem('valandovo_registrations', JSON.stringify(updated));
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Registration Form */}
      <div className="lg:col-span-7 bg-brand-card rounded-2xl border border-brand-border p-6 sm:p-8 shadow-xl relative overflow-hidden orange-glow">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-orange to-brand-orange-light"></div>
        
        {success ? (
          <div className="text-center py-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-orange/15 border border-brand-orange/30 mb-2">
                <CheckCircle className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                {t('formSuccess')}
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                {t('formSuccessDesc')}
              </p>
              {smtpStatusMsg && (
                <div className="mt-3 text-xs bg-brand-orange/10 border border-brand-orange/30 text-brand-orange-light rounded-lg py-2.5 px-4 inline-block font-semibold">
                  {smtpStatusMsg}
                </div>
              )}
            </div>

            {/* Payment instructions */}
            {selectedSport === 'volleyball' ? (
              <div className="text-left bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 space-y-3 max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                  <Trophy className="h-4.5 w-4.5" />
                  <span>{currentLanguage === 'en' ? 'Free Entry' : 'Бесплатно учество'}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {currentLanguage === 'en'
                    ? 'This tournament is completely free of charge! No payment or bank transfer is required. Your registration has been received successfully.'
                    : 'Овој турнир е целосно бесплатен за учество! Не е потребна никаква уплата или банкарски трансфер. Вашата пријава е успешно зачувана.'}
                </p>
              </div>
            ) : (
              <div className="text-left bg-black/40 border border-brand-border rounded-xl p-5 space-y-4 max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-brand-orange font-bold text-sm uppercase tracking-wider">
                  <CreditCard className="h-4.5 w-4.5" />
                  <span>{currentLanguage === 'en' ? 'Payment Information' : 'Информации за плаќање'}</span>
                </div>
                <div className="space-y-2.5 text-xs text-gray-300">
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-gray-400">{currentLanguage === 'en' ? 'Entry Fee' : 'Котизација'}:</span>
                    <span className="font-bold text-white">
                      {selectedSport === 'soccer' && (currentLanguage === 'en' ? '5,000 MKD (€80)' : '5.000 МКД')}
                      {selectedSport === 'basketball' && (currentLanguage === 'en' ? '5,000 MKD (€80)' : '5.000 МКД')}
                      {selectedSport === 'tennis' && (currentLanguage === 'en' ? '1,200 MKD (€20)' : '1.200 МКД')}
                      {selectedSport === 'handball' && (currentLanguage === 'en' ? '1,000 MKD (€18)' : '1.000 МКД')}
                      {selectedSport === 'pingpong' && (currentLanguage === 'en' ? '800 MKD (€13)' : '800 МКД')}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-gray-400">{currentLanguage === 'en' ? 'Bank Account' : 'Жиро Сметка'}:</span>
                    <span className="font-mono font-bold text-white">210075945850150</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-gray-400">{currentLanguage === 'en' ? 'Bank Name' : 'Банка'}:</span>
                    <span className="font-bold text-white">NLB Banka</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-gray-400">{currentLanguage === 'en' ? 'Recipient' : 'Примач'}:</span>
                    <span className="font-bold text-white">"GG3x3 Basket Valandovo"</span>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <span className="text-gray-400">{currentLanguage === 'en' ? 'Payment Purpose' : 'Цел на дознака'}:</span>
                    <span className="bg-white/5 border border-white/10 px-2.5 py-2 rounded font-mono text-[11px] text-white break-all">
                      {selectedSport === 'soccer' && 'Котизација за Мал Фудбал - [Име на екипа]'}
                      {selectedSport === 'basketball' && 'Котизација за 3х3 Баскет - [Име на екипа]'}
                      {selectedSport === 'tennis' && 'Котизација за Тенис Опен - [Име и Презиме]'}
                      {selectedSport === 'handball' && 'Котизација за Ракомет - [Име на екипа]'}
                      {selectedSport === 'volleyball' && 'Котизација за Одбојка - [Име на екипа]'}
                      {selectedSport === 'pingpong' && 'Котизација за Пинг Понг - [Име и Презиме]'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setSuccess(false)}
              className="inline-flex items-center justify-center rounded-lg border border-brand-border bg-black/40 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-white/5 cursor-pointer"
              id="register-another-btn"
            >
              {currentLanguage === 'en' ? 'Register Another Team' : 'Пријави уште една екипа'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-display text-xl font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
              <Trophy className="h-5 w-5 text-brand-orange" />
              {currentLanguage === 'en' ? 'Enter Tournament' : 'Пријави учество'}
            </h3>

            {/* Sport Selection */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2">
                {t('formSport')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sports.map(sport => (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => setSelectedSport(sport.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer relative ${
                      selectedSport === sport.id
                        ? 'bg-brand-orange/10 border-brand-orange shadow-md shadow-brand-orange/5'
                        : 'bg-black/30 border-brand-border hover:border-gray-500 hover:bg-black/40'
                    }`}
                    id={`sport-select-${sport.id}`}
                  >
                    {getSportIcon(sport.id)}
                    <span className="mt-2 text-[11px] font-extrabold text-white tracking-tight leading-tight">
                      {currentLanguage === 'en' ? sport.nameEn : sport.nameMk}
                    </span>
                    <span className="mt-1 text-[9px] text-gray-400">
                      {sport.registeredCount}/{sport.maxTeams}
                    </span>
                    {sport.registeredCount >= sport.maxTeams && (
                      <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {selectedSport === 'basketball' || selectedSport === 'tennis' ? (
              selectedSport === 'basketball' ? (
                <div className="p-6 rounded-xl border border-brand-orange/30 bg-brand-orange/5 text-center space-y-4">
                  <Dribbble className="h-12 w-12 text-brand-orange mx-auto animate-bounce" />
                  <h4 className="font-display text-lg font-extrabold text-white uppercase tracking-tight">
                    {currentLanguage === 'en' ? 'Official FIBA 3x3 Registration Required' : 'Потребна е официјална FIBA 3x3 пријава'}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {currentLanguage === 'en' 
                      ? 'To participate in the 3x3 Basketball tournament, teams must register directly through the official FIBA 3x3 platform.'
                      : 'За учество на 3х3 Баскет турнирот, екипите мора да се пријават директно преку официјалната FIBA 3х3 платформа.'}
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://play.fiba3x3.com/events/a6810e93-cc2a-4c0f-b8bb-f6f586007b95/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-brand-orange hover:bg-black border border-brand-orange py-3 text-base font-extrabold text-white transition-all duration-300 hover:text-brand-orange shadow-md shadow-brand-orange/20 cursor-pointer"
                      id="fiba-register-btn"
                    >
                      <Trophy className="h-5 w-5" />
                      {currentLanguage === 'en' ? 'Register on play.fiba3x3.com' : 'Пријави се на play.fiba3x3.com'}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-brand-orange/30 bg-brand-orange/5 text-center space-y-4">
                  <Target className="h-12 w-12 text-lime-400 mx-auto animate-bounce" />
                  <h4 className="font-display text-lg font-extrabold text-white uppercase tracking-tight">
                    {currentLanguage === 'en' ? 'Official MojTenis Registration Required' : 'Потребна е официјална МојТенис пријава'}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {currentLanguage === 'en' 
                      ? 'To participate in the Tennis tournament, players must register directly through the official mojtenis.mk platform.'
                      : 'За учество на тенискиот турнир, играчите мора да се пријават директно преку официјалната МојТенис платформа (mojtenis.mk).'}
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://www.mojtenis.mk/events/0563efa3-f1a3-4e04-8acf-531e5d912d6d"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-brand-orange hover:bg-black border border-brand-orange py-3 text-base font-extrabold text-white transition-all duration-300 hover:text-brand-orange shadow-md shadow-brand-orange/20 cursor-pointer"
                      id="mojtenis-register-btn"
                    >
                      <Trophy className="h-5 w-5" />
                      {currentLanguage === 'en' ? 'Register on mojtenis.mk' : 'Пријави се на mojtenis.mk'}
                    </a>
                  </div>
                </div>
              )
            ) : isSportFull ? (
              <div className="p-8 rounded-2xl border border-red-500/30 bg-red-500/5 text-center space-y-4 max-w-lg mx-auto my-4 shadow-xl">
                <Trophy className="h-14 w-14 text-red-500 mx-auto animate-pulse" />
                <h4 className="font-display text-xl font-extrabold text-white uppercase tracking-tight">
                  {currentLanguage === 'en' ? 'Registration Closed' : 'Пријавувањето е затворено'}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {currentLanguage === 'en' 
                    ? `Registration is closed for this tournament because the maximum limit of ${selectedSportData?.maxTeams} ${selectedSportData?.id === 'pingpong' ? 'players' : 'teams'} has been reached.`
                    : `Пријавувањето за овој турнир е затворено бидејќи максималниот лимит од ${selectedSportData?.maxTeams} ${selectedSportData?.id === 'pingpong' ? 'играчи' : 'екипи'} е веќе пополнет.`}
                </p>
                <div className="pt-2 text-xs text-gray-400">
                  {currentLanguage === 'en'
                    ? 'Please choose another available sport to participate in our sports event!'
                    : 'Ве молиме изберете друг слободен спорт за учество на нашиот спортски настан!'}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Team Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="teamName" className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      {t('formTeamName')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Trophy className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full bg-black/40 border border-brand-border text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block pl-10 pr-3 py-2.5 placeholder-gray-500 outline-none transition-colors"
                        placeholder={currentLanguage === 'en' ? 'e.g. Valandovo All-Stars' : 'пр. Валандово Ал-Старс'}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="captainName" className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      {t('formCaptainName')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="captainName"
                        value={captainName}
                        onChange={(e) => setCaptainName(e.target.value)}
                        className="w-full bg-black/40 border border-brand-border text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block pl-10 pr-3 py-2.5 placeholder-gray-500 outline-none transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      {t('formEmail')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-brand-border text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block pl-10 pr-3 py-2.5 placeholder-gray-500 outline-none transition-colors"
                        placeholder="example@mail.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      {t('formPhone')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-black/40 border border-brand-border text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block pl-10 pr-3 py-2.5 placeholder-gray-500 outline-none transition-colors"
                        placeholder="+389 7X XXX XXX"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Player Roster */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                      {t('formRoster')}
                    </label>
                    <button
                      type="button"
                      onClick={addPlayerRow}
                      className="flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-brand-orange-light transition-colors cursor-pointer"
                      id="add-player-btn"
                    >
                      <Plus className="h-3 w-3" />
                      {currentLanguage === 'en' ? 'Add Player' : 'Додади Играч'}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {roster.map((player, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Users className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <input
                            type="text"
                            value={player}
                            onChange={(e) => handleRosterChange(index, e.target.value)}
                            className="w-full bg-black/30 border border-brand-border text-white text-xs rounded-lg focus:ring-brand-orange focus:border-brand-orange block pl-9 pr-3 py-2 placeholder-gray-600 outline-none"
                            placeholder={`${currentLanguage === 'en' ? 'Player' : 'Играч'} ${index + 1}`}
                          />
                        </div>
                        {roster.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePlayerRow(index)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                            title={currentLanguage === 'en' ? 'Remove Player' : 'Отстрани играч'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-base font-extrabold text-white transition-all shadow-md cursor-pointer ${
                    isSubmitting
                      ? 'bg-brand-orange/50 cursor-not-allowed'
                      : 'bg-brand-orange hover:bg-brand-orange-hover hover:scale-[1.01] active:scale-[0.99] shadow-brand-orange/20'
                  }`}
                  id="registration-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      {currentLanguage === 'en' ? 'Submitting...' : 'Се испраќа...'}
                    </>
                  ) : (
                    <>
                      <Trophy className="h-5 w-5" />
                      {t('formSubmit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Registration Channels Sidebar */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-brand-card rounded-2xl border border-brand-border p-6 shadow-xl space-y-4">
          <h3 className="font-display text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Mail className="h-5 w-5 text-brand-orange" />
            {currentLanguage === 'en' ? 'Submission Channels' : 'Канали за Пријавување'}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {currentLanguage === 'en'
              ? 'Teams and individual players can register using either of the following two official channels. Choose the one most convenient for you:'
              : 'Екипите и играчите можат да се пријават преку еден од двата официјални канали. Изберете го оној што ви е најсоодветен:'}
          </p>
          
          <div className="space-y-3 pt-1">
            <div className="p-4 bg-black/35 rounded-xl border border-brand-border/60">
              <h4 className="font-bold text-xs text-white uppercase flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange/15 text-[10px] text-brand-orange font-bold">1</span>
                {currentLanguage === 'en' ? 'Online Registration Form' : 'Онлајн Формулар'}
              </h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-medium">
                {currentLanguage === 'en'
                  ? 'Simply fill out the registration form on this page. Choose your sport, input your team details and roster, and submit directly.'
                  : 'Пополнете го интерактивниот формулар од левата страна. Изберете ја дисциплината, пополнете ги податоците за тимот и играчите и испратете.'}
              </p>
            </div>

            <div className="p-4 bg-black/35 rounded-xl border border-brand-border/60">
              <h4 className="font-bold text-xs text-white uppercase flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange/15 text-[10px] text-brand-orange font-bold">2</span>
                {currentLanguage === 'en' ? 'Direct Email Registration' : 'Пријавување преку Е-пошта'}
              </h4>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-medium font-medium">
                {currentLanguage === 'en'
                  ? 'You can also register by sending an email directly to streetballvalandovo@gmail.com. Please include:'
                  : 'Може да се пријавите и со испраќање е-пошта на streetballvalandovo@gmail.com. Ве молиме наведете:'}
              </p>
              <ul className="text-[11px] text-gray-500 mt-2 space-y-1 list-disc list-inside">
                <li>{currentLanguage === 'en' ? 'Selected Sport discipline' : 'Спортска дисциплина'}</li>
                <li>{currentLanguage === 'en' ? 'Team Name & Captain Details' : 'Име на екипа и податоци за капитен'}</li>
                <li>{currentLanguage === 'en' ? 'Full roster (player names)' : 'Целосен список на играчи'}</li>
                <li>{currentLanguage === 'en' ? 'Contact phone number' : 'Контакт телефонски број'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick details / Payment guidelines block */}
        <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-br from-brand-orange/5 to-transparent p-5 space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-brand-orange" />
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {currentLanguage === 'en' ? 'Payment Guidelines' : 'Уплата и Котизација'}
            </h4>
          </div>
          
          <p className="text-xs text-gray-400 leading-relaxed">
            {currentLanguage === 'en'
              ? 'Participation in some sports requires an entry fee to fund the prize pool. Volleyball is completely free of charge. You can pay directly via bank transfer:'
              : 'За учество во одредени спортови е претпишана котизација која оди во наградниот фонд. Учеството за одбојка е целосно бесплатно. Уплатата се врши на следната жиро сметка:'}
          </p>

          <div className="bg-black/40 border border-brand-border rounded-xl p-3.5 space-y-2 text-[11px] text-gray-300 font-medium">
            <div className="flex justify-between border-b border-brand-border/40 pb-1.5">
              <span className="text-gray-500">{currentLanguage === 'en' ? 'Bank Account:' : 'Жиро Сметка:'}</span>
              <span className="font-mono font-bold text-white">210075945850150</span>
            </div>
            <div className="flex justify-between border-b border-brand-border/40 pb-1.5">
              <span className="text-gray-500">{currentLanguage === 'en' ? 'Bank Name:' : 'Банка:'}</span>
              <span className="text-white">NLB Banka</span>
            </div>
            <div className="flex justify-between border-b border-brand-border/40 pb-1.5">
              <span className="text-gray-500">{currentLanguage === 'en' ? 'Recipient:' : 'Примач:'}</span>
              <span className="font-bold text-white">"GG3x3 Basket Valandovo"</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-gray-500">{currentLanguage === 'en' ? 'Payment Deadline:' : 'Рок за уплата:'}</span>
              <span className="font-bold text-brand-orange">{currentLanguage === 'en' ? 'August 2nd, 2026' : '2-ри Август, 2026'}</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-brand-border/30">
            <button
              onClick={() => {
                const element = document.getElementById('rules');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  // Focus the registration tab in rules
                  setTimeout(() => {
                    const regTab = document.querySelector('[class*="registration"]');
                    if (regTab) (regTab as HTMLButtonElement).click();
                  }, 500);
                }
              }}
              className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-brand-orange/10 hover:bg-brand-orange border border-brand-orange/30 hover:border-brand-orange text-brand-orange hover:text-white px-3.5 py-2 text-xs font-bold transition-all cursor-pointer"
            >
              {currentLanguage === 'en' ? 'View Sport-Specific Fees & Rules' : 'Види правила и висина на котизации'}
              <Trophy className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
