import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles, Volume2, HelpCircle, BookMarked, Settings, Flame, Wifi, WifiOff, Users, Sun, Moon } from 'lucide-react';
import { UserProgress } from '../types';

export type TabType = 'catalog' | 'memorize' | 'audio' | 'quiz' | 'tajwid' | 'settings';

interface NavbarProps {
  currentTab?: TabType;
  activeTab?: TabType;
  onTabChange: (tab: TabType) => void;
  progress: UserProgress;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenStudyGroup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  activeTab,
  onTabChange,
  progress,
  theme = 'light',
  onToggleTheme,
  onOpenStudyGroup
}) => {
  const selectedTab = currentTab || activeTab || 'catalog';
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    { id: 'catalog', label: 'Catalogue', icon: BookOpen, subtext: '37 sourates' },
    { id: 'memorize', label: 'Mémoriser', icon: Sparkles, subtext: 'Hifz Studio' },
    { id: 'audio', label: 'Écouter', icon: Volume2, subtext: '4 Récitateurs' },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, subtext: '7 épreuves' },
    { id: 'tajwid', label: 'Tajwîd', icon: BookMarked, subtext: '5 familles' },
    { id: 'settings', label: 'Réglages', icon: Settings, subtext: 'Options & PWA' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#14332A] text-[#FAF6EC] border-b border-[#1F4D3D] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo and Brand */}
          <div
            id="brand-logo-button"
            role="button"
            tabIndex={0}
            onClick={() => onTabChange('catalog')}
            onKeyDown={e => e.key === 'Enter' && onTabChange('catalog')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#E5BE64] via-[#C9A24B] to-[#997328] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 border border-[#E5BE64]/40">
              <span className="font-quran text-3xl font-black text-[#14332A] drop-shadow-xs">عمّ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-normal font-sans text-[#FAF6EC] flex items-center gap-1.5">
                  <span className="text-[#C9A24B]">Juz</span> 'Amma
                </span>
                <span className="text-[11px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-[#C9A24B] text-[#14332A] shadow-xs">
                  Warsh
                </span>
              </div>
              <p className="text-xs text-[#FAF6EC]/85 font-medium hidden sm:block">37 sourates • Récitation Warsh 'an Nâfi'</p>
            </div>
          </div>

          {/* Center Navigation for Desktop */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = selectedTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => onTabChange(item.id as TabType)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#1F4D3D] text-[#FAF6EC] border border-[#C9A24B]/60 shadow-sm'
                      : 'text-[#FAF6EC]/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A24B]' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status Indicators */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Method & Sources Reference Button */}
            {onOpenStudyGroup && (
              <button
                onClick={onOpenStudyGroup}
                title="Méthode, Sources classiques & Règles Warsh"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C9A24B]/20 hover:bg-[#C9A24B]/30 border border-[#C9A24B]/50 text-[#FAF6EC] text-xs font-bold transition-all shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span className="hidden sm:inline">Méthode & Sources</span>
              </button>
            )}

            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
                className="p-1.5 rounded-full bg-[#1F4D3D] hover:bg-white/10 text-[#FAF6EC] transition-all"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-stone-200" />}
              </button>
            )}

            {/* Online / Offline badge */}
            <div
              title={isOnline ? 'En ligne' : 'Mode Hors-ligne actif'}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                isOnline
                  ? 'bg-[#1F4D3D]/80 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-950/60 border-amber-500/50 text-amber-300'
              }`}
            >
              {isOnline ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
              <span>{isOnline ? 'En ligne' : 'Hors-ligne'}</span>
            </div>

            {/* Streak Counter */}
            <div
              id="streak-indicator"
              title={`${progress.streakDays} jours consécutifs de révision`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1F4D3D] border border-[#C9A24B]/40 text-[#FAF6EC] text-xs font-semibold shadow-sm"
            >
              <Flame className="w-3.5 h-3.5 text-[#C9A24B] fill-[#C9A24B] animate-pulse" />
              <span>{progress.streakDays} j</span>
            </div>

            {/* Points / Memorized count */}
            <div
              id="progress-score-badge"
              title={`${progress.memorizedSurahIds.length} sur 37 sourates mémorisées`}
              className="px-2.5 py-1 rounded-full bg-[#C9A24B] text-[#14332A] text-xs font-bold shadow-sm"
            >
              <span>{progress.memorizedSurahIds.length}/37</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14332A]/95 backdrop-blur-md border-t border-[#1F4D3D] pb-safe">
        <div className="grid grid-cols-6 h-14">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = selectedTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => onTabChange(item.id as TabType)}
                className={`flex flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-[#C9A24B]' : 'text-[#FAF6EC]/60 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] mt-0.5 uppercase tracking-tight font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
