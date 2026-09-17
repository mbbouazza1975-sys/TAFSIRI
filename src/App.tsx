import React, { useState, useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/Navbar';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { CatalogView } from './views/CatalogView';
import { SurahDetailView } from './views/SurahDetailView';
import { MemorizeView } from './views/MemorizeView';
import { AudioView } from './views/AudioView';
import { QuizView } from './views/QuizView';
import { TajwidGuideView } from './views/TajwidGuideView';
import { SettingsView } from './views/SettingsView';
import { Surah, UserProgress, UserSettings } from './types';
import { ALL_SURAHS, getSurahById } from './data/surahs';
import { loadUserProgress, saveUserProgress, loadUserSettings, saveUserSettings } from './services/storage';
import { registerAppServiceWorker, initInstallPromptListener } from './services/pwa';
import { StudyGroupModal } from './components/StudyGroupModal';

const applyThemeToDocument = (theme: UserSettings['theme']) => {
  const root = document.documentElement;
  root.classList.remove('dark', 'theme-parchemin', 'theme-nuit', 'theme-emeraude');
  if (theme === 'dark' || theme === 'nuit') {
    root.classList.add('dark', 'theme-nuit');
  } else if (theme === 'emeraude') {
    root.classList.add('dark', 'theme-emeraude');
  } else if (theme === 'parchemin') {
    root.classList.add('theme-parchemin');
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'memorize' | 'audio' | 'quiz' | 'tajwid' | 'settings'>('catalog');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedSurahTab, setSelectedSurahTab] = useState<'verses' | 'test' | 'meaning' | 'context' | 'hadith'>('verses');
  const [memorizeTargetSurah, setMemorizeTargetSurah] = useState<Surah | undefined>(undefined);
  const [isStudyGroupOpen, setIsStudyGroupOpen] = useState(false);

  const [progress, setProgress] = useState<UserProgress>({
    memorizedSurahIds: [],
    inProgressSurahIds: [114],
    favorites: [],
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    points: 0,
    totalListeningSeconds: 0,
    history: []
  });

  const [settings, setSettings] = useState<UserSettings>({
    preferredReciterId: 'hussary',
    arabicFontSize: 32,
    theme: 'light',
    dailyGoalVerses: 5,
    playbackSpeed: 1,
    repeatMode: '1',
    dailyReminder: false
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize service worker and local IndexedDB state
  useEffect(() => {
    registerAppServiceWorker();
    initInstallPromptListener();

    async function loadData() {
      try {
        const [savedProgress, savedSettings] = await Promise.all([
          loadUserProgress(),
          loadUserSettings()
        ]);

        if (savedProgress) {
          // Check streak
          const today = new Date().toISOString().split('T')[0];
          let currentStreak = savedProgress.streakDays;
          if (savedProgress.lastActiveDate !== today) {
            const lastDate = new Date(savedProgress.lastActiveDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
            if (diffDays === 1) {
              currentStreak += 1;
            } else if (diffDays > 1) {
              currentStreak = 1;
            }
          }
          const updated = {
            ...savedProgress,
            streakDays: currentStreak,
            lastActiveDate: today
          };
          setProgress(updated);
          await saveUserProgress(updated);
        }

        if (savedSettings) {
          setSettings(savedSettings);
          applyThemeToDocument(savedSettings.theme);
        }
      } catch (err) {
        console.warn('Could not load stored data from IndexedDB:', err);
      } finally {
        setIsLoaded(true);
      }
    }

    loadData();
  }, []);

  const handleUpdateProgress = async (newProgress: UserProgress) => {
    setProgress(newProgress);
    await saveUserProgress(newProgress);
  };

  const handleUpdateSettings = async (newSettings: UserSettings) => {
    setSettings(newSettings);
    applyThemeToDocument(newSettings.theme);
    await saveUserSettings(newSettings);
  };

  const handleToggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'nuit' : 'light';
    handleUpdateSettings({ ...settings, theme: newTheme });
  };

  const handleToggleMemorized = async (surahId: number) => {
    const isMem = progress.memorizedSurahIds.includes(surahId);
    let newMem = [...progress.memorizedSurahIds];
    let newInProg = [...progress.inProgressSurahIds];

    if (isMem) {
      newMem = newMem.filter(id => id !== surahId);
      if (!newInProg.includes(surahId)) newInProg.push(surahId);
    } else {
      newMem.push(surahId);
      newInProg = newInProg.filter(id => id !== surahId);
    }

    const updated = {
      ...progress,
      memorizedSurahIds: newMem,
      inProgressSurahIds: newInProg,
      points: progress.points + (isMem ? 0 : 30)
    };
    await handleUpdateProgress(updated);
  };

  const handleToggleFavorite = async (verseKey: string) => {
    const isFav = progress.favorites.includes(verseKey);
    const newFavs = isFav
      ? progress.favorites.filter(k => k !== verseKey)
      : [...progress.favorites, verseKey];

    const updated = {
      ...progress,
      favorites: newFavs
    };
    await handleUpdateProgress(updated);
  };

  const handleOpenSurahDetail = (surah: Surah, tab: 'verses' | 'test' | 'meaning' | 'context' | 'hadith' = 'verses') => {
    setSelectedSurah(surah);
    setSelectedSurahTab(tab);
    setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMemorizeStudio = (surah: Surah) => {
    setMemorizeTargetSurah(surah);
    setSelectedSurah(null);
    setActiveTab('memorize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePointsEarned = async (pts: number) => {
    const updated = {
      ...progress,
      points: progress.points + pts
    };
    await handleUpdateProgress(updated);
  };

  const handleResetProgress = async () => {
    if (confirm('Voulez-vous réinitialiser complètement votre progression ?')) {
      const resetP: UserProgress = {
        memorizedSurahIds: [],
        inProgressSurahIds: [114],
        favorites: [],
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        points: 0,
        totalListeningSeconds: 0,
        history: []
      };
      await handleUpdateProgress(resetP);
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen w-full bg-[#F5EFE0] dark:bg-[#0D1914] text-[#14332A] dark:text-[#FAF6EC] transition-colors duration-200 flex flex-col justify-between">
        {/* Top & Mobile Navbar */}
        <Navbar
          activeTab={activeTab}
          onTabChange={tab => {
            setActiveTab(tab);
            if (tab !== 'catalog') {
              setSelectedSurah(null);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          progress={progress}
          theme={settings.theme}
          onToggleTheme={handleToggleTheme}
          onOpenStudyGroup={() => setIsStudyGroupOpen(true)}
        />

        {/* Main View Area (Strictly with w-full container to prevent blank screens) */}
        <main className="w-full flex-1">
          {activeTab === 'catalog' && !selectedSurah && (
            <CatalogView
              progress={progress}
              onSelectSurah={handleOpenSurahDetail}
              onMemorizeSurah={handleOpenMemorizeStudio}
              onOpenQuiz={s => handleOpenSurahDetail(s, 'test')}
            />
          )}

          {activeTab === 'catalog' && selectedSurah && (
            <SurahDetailView
              surah={selectedSurah}
              progress={progress}
              onBack={() => setSelectedSurah(null)}
              onMemorize={handleOpenMemorizeStudio}
              onToggleMemorized={handleToggleMemorized}
              onToggleFavorite={handleToggleFavorite}
              onSelectSurah={handleOpenSurahDetail}
              onPointsEarned={handlePointsEarned}
              arabicFontSize={settings.arabicFontSize}
              initialTab={selectedSurahTab}
            />
          )}

          {activeTab === 'memorize' && (
            <MemorizeView
              initialSurah={memorizeTargetSurah}
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              arabicFontSize={settings.arabicFontSize}
            />
          )}

          {activeTab === 'audio' && <AudioView />}

          {activeTab === 'quiz' && (
            <QuizView onPointsEarned={handlePointsEarned} />
          )}

          {activeTab === 'tajwid' && <TajwidGuideView />}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              progress={progress}
              onUpdateSettings={handleUpdateSettings}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>

        {/* Global Study Group & Advisory Committee Modal */}
        <StudyGroupModal
          isOpen={isStudyGroupOpen}
          onClose={() => setIsStudyGroupOpen(false)}
          activeSurah={selectedSurah || undefined}
        />

        {/* Persistent Global Audio Player Bar (only when not viewing surah detail) */}
        {(!selectedSurah || activeTab !== 'catalog') && <AudioPlayerBar />}
      </div>
    </AudioProvider>
  );
}
