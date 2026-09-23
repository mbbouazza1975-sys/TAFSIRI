import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Play,
  Pause,
  Heart,
  BookOpen,
  Check,
  RotateCcw,
  Volume2,
  Sliders,
  Sparkles,
  MoveVertical,
  Eye,
  EyeOff,
  Download,
  CheckCircle2,
  Smartphone,
  Users,
  Award,
  Flame,
  ArrowRight,
  ShieldCheck,
  Scroll,
  Lightbulb,
  History,
  Languages,
  Compass,
  Bookmark
} from 'lucide-react';
import { Surah, UserProgress, Verse } from '../types';
import { SurahQuizTab } from '../components/SurahQuizTab';
import { useAudio, RepeatCountMode } from '../context/AudioContext';
import { getSurahById } from '../data/surahs';
import { WARSH_RECITERS } from '../data/reciters';
import { formatWarshVerseHtml } from '../utils/warshTajwid';
import { ReciterSelectModal } from '../components/ReciterSelectModal';
import { StudyGroupModal } from '../components/StudyGroupModal';
import { getYouthExegesisForSurah, getVerseYouthInsight } from '../data/contemporaryYouthExegesis';
import { SurahHeaderCartouche } from '../components/SurahHeaderCartouche';
import { QuranicRosette } from '../components/QuranicRosette';
import { ContinuousMushafView } from '../components/ContinuousMushafView';

interface SurahDetailViewProps {
  surah: Surah;
  progress: UserProgress;
  onBack: () => void;
  onMemorize: (surah: Surah) => void;
  onToggleMemorized: (surahId: number) => void;
  onToggleFavorite: (verseKey: string) => void;
  onSelectSurah?: (surah: Surah, tab?: 'verses' | 'test') => void;
  onPointsEarned?: (points: number) => void;
  arabicFontSize?: number;
  initialTab?: 'verses' | 'test' | 'meaning' | 'context' | 'hadith';
}

type PracticeMode = 'lecture' | 'memo' | 'test';
type SubTabType = 'sens' | 'tafsir' | 'dico' | 'ados';

export const SurahDetailView: React.FC<SurahDetailViewProps> = ({
  surah,
  progress,
  onBack,
  onMemorize,
  onToggleMemorized,
  onToggleFavorite,
  onSelectSurah,
  onPointsEarned,
  arabicFontSize = 30,
  initialTab = 'verses'
}) => {
  const {
    currentSurah,
    currentReciter,
    isPlaying,
    currentTime,
    duration,
    currentVerseNumber,
    currentWordIndex,
    isRecitingBismillah,
    isVerseMode,
    playbackSpeed,
    repeatMode,
    repeatCounter,
    playVerse,
    pause,
    resume,
    seekToWord,
    syncWordHighlight,
    stopVerse,
    setSpeed,
    setRepeatMode,
    setReciter,
    isCached,
    isDownloading,
    downloadCurrentForOffline
  } = useAudio();

  // Mode and view states matching mma-warsh-helper.lovable.app
  const [activeTab, setActiveTab] = useState<'verses' | 'test'>(initialTab === 'test' ? 'test' : 'verses');
  const [viewLayoutMode, setViewLayoutMode] = useState<'study' | 'mushaf'>('study');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('lecture');
  const [tajwidEnabled, setTajwidEnabled] = useState<boolean>(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [showRecitersModal, setShowRecitersModal] = useState<boolean>(false);
  const [showStudyGroupModal, setShowStudyGroupModal] = useState<boolean>(false);

  // Per-verse open sub-tabs ('sens' | 'tafsir' | 'dico') and reveal state in test/memo
  const [openSubTabs, setOpenSubTabs] = useState<Record<number, SubTabType | null>>({});
  const [revealedVerses, setRevealedVerses] = useState<Record<number, boolean>>({});

  // Verse known state
  const [knownVerses, setKnownVerses] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`warsh_known_verses_${surah.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const isMemorized = progress.memorizedSurahIds.includes(surah.id);
  const isCurrentSurahPlaying = isPlaying && currentSurah?.id === surah.id;

  // Previous & Next Surahs in Juz 'Amma (78 to 114)
  const prevSurah = surah.id > 78 ? getSurahById(surah.id - 1) : null;
  const nextSurah = surah.id < 114 ? getSurahById(surah.id + 1) : null;

  // Repeat & speed cycle options
  const repeatOptions: RepeatCountMode[] = ['1', '2', '3', '5', '10', 'loop'];
  const speedOptions = [0.75, 1, 1.25, 1.5];

  const cycleRepeat = () => {
    const currentIndex = repeatOptions.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % repeatOptions.length;
    setRepeatMode(repeatOptions[nextIndex]);
  };

  const cycleSpeed = () => {
    const currentIndex = speedOptions.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speedOptions.length;
    setSpeed(speedOptions[nextIndex]);
  };

  /**
   * Precise smooth auto-scroll to verse container vc{verseNum}.
   * Matches the exact algorithm of mma-warsh-helper.lovable.app.
   */
  const scrollToVerse = useCallback((verseNum: number) => {
    if (!autoScroll) return;
    const el = document.getElementById(`vc${verseNum}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Check if comfortably in viewport between header (90px) and bottom bar (190px)
    if (rect.top >= 90 && rect.bottom <= window.innerHeight - 190) {
      return;
    }
    const targetTop = Math.max(0, window.scrollY + rect.top - 100);
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  }, [autoScroll]);

  // Trigger auto-scroll on active verse change
  useEffect(() => {
    if (isPlaying && autoScroll && currentVerseNumber !== null && currentSurah?.id === surah.id) {
      scrollToVerse(currentVerseNumber);
      const timer = setTimeout(() => scrollToVerse(currentVerseNumber), 150);
      return () => clearTimeout(timer);
    }
  }, [currentVerseNumber, isPlaying, autoScroll, surah.id, currentSurah?.id, scrollToVerse]);

  // Synchronize word-by-word highlight when viewing current reciting surah
  useEffect(() => {
    if (isPlaying && isCurrentSurahPlaying && currentVerseNumber !== null) {
      syncWordHighlight(currentVerseNumber);
    }
  }, [isPlaying, isCurrentSurahPlaying, currentVerseNumber, syncWordHighlight]);

  // Play / Pause a specific verse
  const handlePlayVerse = async (verseNum: number) => {
    if (isCurrentSurahPlaying && currentVerseNumber === verseNum) {
      pause();
    } else {
      if (autoScroll) {
        scrollToVerse(verseNum);
      }
      await playVerse(surah.id, verseNum);
      if (autoScroll) {
        setTimeout(() => scrollToVerse(verseNum), 150);
      }
    }
  };

  // Toggle main bottom play button
  const handleToggleMainPlay = async () => {
    if (isCurrentSurahPlaying) {
      pause();
    } else {
      const targetVerse = (currentSurah?.id === surah.id && currentVerseNumber) ? currentVerseNumber : 1;
      if (autoScroll) {
        scrollToVerse(targetVerse);
      }
      await playVerse(surah.id, targetVerse);
      if (autoScroll) {
        setTimeout(() => scrollToVerse(targetVerse), 150);
      }
    }
  };

  // Toggle memorization status
  const handleToggleMemorized = () => {
    onToggleMemorized(surah.id);
    if (!isMemorized) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
      onPointsEarned?.(50);
    }
  };

  // Toggle verse known state
  const toggleKnownVerse = (verseNum: number) => {
    const updated = { ...knownVerses, [verseNum]: !knownVerses[verseNum] };
    setKnownVerses(updated);
    try {
      localStorage.setItem(`warsh_known_verses_${surah.id}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
    const verseKey = `${surah.id}:${verseNum}`;
    onToggleFavorite(verseKey);
  };

  // Toggle verse reveal in memo / test mode
  const handleToggleVerseReveal = (verseNum: number) => {
    if (practiceMode === 'lecture') return;
    setRevealedVerses(prev => ({ ...prev, [verseNum]: !prev[verseNum] }));
  };

  // Toggle verse sub-tab (sens, tafsir, dico)
  const toggleVerseSubTab = (verseNum: number, tab: SubTabType) => {
    setOpenSubTabs(prev => ({
      ...prev,
      [verseNum]: prev[verseNum] === tab ? null : tab
    }));
  };

  // Extract or build dictionary entries for a verse
  const getVerseDico = (verse: Verse) => {
    if (verse.dico && verse.dico.length > 0) return verse.dico;
    // Fallback if verse words have translations
    if (verse.words && verse.words.length > 0) {
      return verse.words.map(w => ({
        ar: w.ar,
        simple: w.fr,
        img: `Sens direct : ${w.fr}`
      }));
    }
    return [
      {
        ar: verse.text.split(' ')[0] || 'كَلِمَة',
        simple: verse.meaning || verse.translation,
        img: 'Méditation et ancrage visuel du terme.'
      }
    ];
  };

  // Calculate audio progress percentage
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  // Historic circumstances and Nouman Ali Khan overview
  const circumstances =
    surah.historicalContext?.circumstances ||
    surah.historicalContext?.revelationReason ||
    "Révélée durant la période prophétique, guidant les croyants vers la piété et l'excellence.";

  const nakOverview =
    surah.historicalContext?.nak ||
    surah.noumanAliKhan?.overview ||
    null;

  const youthExegesis = getYouthExegesisForSurah(surah.id, surah.nameTranslit);

  return (
    <div className="bg-[#FAF6EC] dark:bg-[#0D1914] min-h-screen text-[#14332A] dark:text-[#FAF6EC] flex flex-col justify-start selection:bg-[#c9a24b]/30">
      <div className="w-full max-w-4xl mx-auto flex flex-col min-h-screen relative pb-40 px-2 sm:px-4">
        
        {/* Sticky Header */}
        <header className="grad-emerald text-white sticky top-0 z-40 px-4 pt-3 pb-3 shadow-md flex items-center justify-between gap-3 rounded-b-2xl">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 active:scale-95 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all"
            aria-label="Retour au catalogue"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg leading-tight font-extrabold tracking-tight">
                {surah.nameTranslit}
              </h1>
              <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#C9A24B] text-[#14332A] shadow-xs">
                Juz 30
              </span>
            </div>
            <p className="text-white/80 truncate text-xs font-semibold">
              {surah.nameTranslation} · {surah.versesCount} versets
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="arabic text-white text-2xl leading-none">
              {surah.nameArabic}
            </span>

            {/* Quick surah navigation */}
            <div className="flex items-center gap-1 pl-1">
              {prevSurah && (
                <button
                  onClick={() => onSelectSurah?.(prevSurah)}
                  title={`Sourate précédente : ${prevSurah.nameTranslit}`}
                  className="bg-white/20 hover:bg-white/30 flex h-7 w-7 items-center justify-center rounded-full text-white transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
              )}
              {nextSurah && (
                <button
                  onClick={() => onSelectSurah?.(nextSurah)}
                  title={`Sourate suivante : ${nextSurah.nameTranslit}`}
                  className="bg-white/20 hover:bg-white/30 flex h-7 w-7 items-center justify-center rounded-full text-white transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="px-2 sm:px-3 pt-3 space-y-4">
          {/* Illuminated Traditional Header Cartouche */}
          <SurahHeaderCartouche
            surah={surah}
            arabicFontSize={arabicFontSize}
            isRecitingBismillah={isCurrentSurahPlaying && isRecitingBismillah}
          />
          
          {/* Section 1: Intro */}
          <section className="surface p-4">
            <p className="text-sm leading-relaxed font-semibold">
              {surah.intro || "Trois versets d'une puissance absolue. L'imam Ash-Shâfi'î disait : « Si les gens méditaient cette seule sourate, elle leur suffirait »."}
            </p>
            <div className="bg-accent-soft text-accent-foreground mt-3 rounded-xl px-3.5 py-2.5 text-xs leading-relaxed font-semibold flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <span>{surah.valeur || "Le temps c'est ta vie. Chaque seconde qui passe ne revient jamais. Qu'en fais-tu ?"}</span>
            </div>
          </section>

          {/* Special Section: Que nous dit cette sourate aujourd'hui */}
          <section className="p-4 rounded-2xl bg-gradient-to-br from-[#14332A] to-[#1F4D3D] text-[#FAF6EC] border border-[#C9A24B]/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#C9A24B]/20 text-[#C9A24B]">
                  <Smartphone className="w-4 h-4" />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-[#C9A24B]">
                  Que nous dit cette sourate aujourd'hui
                </span>
              </div>
              <button
                onClick={() => setShowStudyGroupModal(true)}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] font-bold text-[#FAF6EC] flex items-center gap-1 transition-all"
                title="Méthode & Sources classiques de référence"
              >
                <BookOpen className="w-3 h-3 text-[#C9A24B]" />
                <span>Méthode & Sources</span>
              </button>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#FAF6EC] tracking-tight">
                {youthExegesis.themeAdo}
              </h3>
              <p className="text-xs text-[#FAF6EC]/85 mt-1 leading-relaxed font-medium">
                {youthExegesis.hookAdos}
              </p>
            </div>

            {/* Le Défi Quotidien Vécu par l'Adolescent */}
            <div className="p-3 rounded-xl bg-black/20 border border-white/10 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Le Piège Quotidien (Ce que tu vis)
              </span>
              <p className="text-xs text-[#FAF6EC]/90 leading-relaxed font-semibold">
                {youthExegesis.defiQuotidien}
              </p>
            </div>

            {/* La Réponse Coranique & Analyse Contemporaine */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C9A24B] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> L'Éclairage et l'Analyse Contemporaine
              </span>
              <p className="text-xs text-[#FAF6EC]/90 leading-relaxed">
                {youthExegesis.reponseCoranique}
              </p>
            </div>

            {/* 3 Règles d'Or pour les Ados */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>3 Principes pour ta Journée :</span>
              </span>
              <ul className="space-y-1 text-xs text-[#FAF6EC]/85 font-medium">
                {youthExegesis.troisReglesDOr.map((regle, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#C9A24B] font-bold">#{idx + 1}</span>
                    <span>{regle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 2: Contexte Historique & Analyse */}
          <section className="surface p-4">
            <h2 className="mb-2 text-xs font-black tracking-wide text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Contexte Historique & Révélation</span>
            </h2>
            <p className="bg-secondary mb-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-black">
              {surah.historicalContext?.typeBadge || surah.type}
            </p>
            <p className="text-sm leading-relaxed font-semibold">
              {circumstances}
            </p>
            {surah.historicalContext?.lien && (
              <p className="text-stone-500 dark:text-stone-400 mt-2 text-xs leading-relaxed font-semibold">
                {surah.historicalContext.lien}
              </p>
            )}

            {nakOverview && (
              <div className="bg-primary-soft mt-3 rounded-xl px-3 py-2.5">
                <p className="text-[10px] font-black tracking-wider uppercase opacity-75 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#C9A24B]" />
                  <span>Analyse & Méditation Contemporaine</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed font-semibold">
                  {nakOverview}
                </p>
              </div>
            )}
          </section>

          {/* Section 3: "En clair" & "Méditation & Action" */}
          <section className="surface p-4">
            <h2 className="mb-2 flex items-center gap-1.5 text-xs font-black text-stone-700 dark:text-stone-300">
              <BookOpen size={14} className="text-primary" /> En clair
            </h2>
            <p className="text-sm leading-relaxed font-semibold">
              {surah.enClairSimple || surah.verses[0]?.meaning || "Par le temps ! L'humain est perdant, sauf ceux qui croient, font le bien, se conseillent la vérité et la patience."}
            </p>
          </section>

          <section className="grad-emerald text-white shadow-lift rounded-2xl p-4">
            <h2 className="flex items-center gap-1.5 text-sm font-black">
              <Sparkles className="w-4 h-4 text-[#C9A24B]" />
              <span>Interprétation pour notre époque</span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed font-semibold">
              {surah.etAujourdhui || surah.valeur || "Trois versets, un plan de vie complet. Ton temps s'écoule à chaque seconde et ne revient pas : la seule question est ce que tu y mets."}
            </p>
          </section>

          {/* Section 4: Tajwîd Legend Pills */}
          <div className="surface flex flex-wrap gap-2 p-3 text-[11px] font-bold">
            <span className="flex items-center gap-1 text-[#c62f2f]">
              <span className="h-2 w-2 rounded-full bg-[#c62f2f]"></span>Madd · son long
            </span>
            <span className="flex items-center gap-1 text-[#1e7a45]">
              <span className="h-2 w-2 rounded-full bg-[#1e7a45]"></span>Ghunna · nasal
            </span>
            <span className="flex items-center gap-1 text-[#1a5dab]">
              <span className="h-2 w-2 rounded-full bg-[#1a5dab]"></span>Qalqala · rebond
            </span>
            <span className="flex items-center gap-1 text-[#8a5a22]">
              <span className="h-2 w-2 rounded-full bg-[#8a5a22]"></span>Tafkhîm · emphatique
            </span>
            <span className="flex items-center gap-1 text-[#0d8f9c]">
              <span className="h-2 w-2 rounded-full bg-[#0d8f9c]"></span>Naql · transport (Warsh)
            </span>
          </div>

          {/* Section 5: Control Toolbar (Modes, Tajwîd, Auto-scroll, Offline) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {/* Practice Modes */}
            <div className="flex items-center bg-stone-200/60 dark:bg-stone-800/60 p-1 rounded-full gap-1">
              <button
                onClick={() => {
                  setPracticeMode('lecture');
                  setActiveTab('verses');
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  practiceMode === 'lecture' && activeTab === 'verses'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-300/40'
                }`}
              >
                <BookOpen size={13} />
                <span>Lecture</span>
              </button>

              <button
                onClick={() => {
                  setPracticeMode('memo');
                  setActiveTab('verses');
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  practiceMode === 'memo' && activeTab === 'verses'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-300/40'
                }`}
              >
                <Eye size={13} />
                <span>Mémo</span>
              </button>

              <button
                onClick={() => {
                  setPracticeMode('test');
                  setActiveTab('verses');
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  practiceMode === 'test' && activeTab === 'verses'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-300/40'
                }`}
              >
                <EyeOff size={13} />
                <span>Test</span>
              </button>
            </div>

            {/* Quiz Tab Button */}
            <button
              onClick={() => setActiveTab(activeTab === 'test' ? 'verses' : 'test')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeTab === 'test'
                  ? 'bg-[#C9A24B] text-black font-extrabold shadow-sm'
                  : 'bg-secondary text-primary hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <Sparkles size={13} />
              <span>Quiz ({surah.quizQuestions?.length || 5} Q.)</span>
            </button>

            {/* Method & Sources Modal Button */}
            <button
              onClick={() => setShowStudyGroupModal(true)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold bg-[#C9A24B]/15 text-[#b38933] dark:text-[#E2C376] hover:bg-[#C9A24B]/25 border border-[#C9A24B]/30 transition-all shrink-0"
              title="Méthode d'apprentissage & Sources classiques de référence"
            >
              <BookOpen size={13} className="text-[#C9A24B]" />
              <span>Méthode & Sources</span>
            </button>

            {/* Tajwîd Toggle */}
            <button
              onClick={() => setTajwidEnabled(!tajwidEnabled)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                tajwidEnabled
                  ? 'bg-accent-soft text-accent-foreground ring-1 ring-[#c9a24b]/40'
                  : 'bg-secondary text-stone-500'
              }`}
            >
              Tajwîd
            </button>

            {/* Auto-scroll Toggle */}
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                autoScroll
                  ? 'bg-primary-soft text-primary ring-1 ring-[#1f4d3d]/30 font-extrabold'
                  : 'bg-secondary text-stone-400'
              }`}
            >
              <MoveVertical size={13} />
              <span>Auto-scroll</span>
            </button>

            {/* Offline Download Button */}
            <button
              onClick={() => downloadCurrentForOffline()}
              disabled={isDownloading}
              title={isCached ? "Audio hors-ligne disponible" : "Télécharger pour écouter hors-ligne"}
              className="bg-secondary hover:bg-stone-200 dark:hover:bg-stone-800 shrink-0 rounded-full p-2 transition-all"
            >
              {isCached ? (
                <Check size={14} className="text-emerald-600" />
              ) : (
                <Download size={14} className={isDownloading ? "animate-bounce text-[#C9A24B]" : "text-stone-600 dark:text-stone-300"} />
              )}
            </button>
          </div>

          {/* View Layout Switcher: Mode Étude (Verset par verset) vs Mode Mushaf Continu */}
          {activeTab === 'verses' && (
            <div className="flex items-center justify-between p-1 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-inner">
              <button
                onClick={() => setViewLayoutMode('study')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  viewLayoutMode === 'study'
                    ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm ring-1 ring-[#C9A24B]/40'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Étude Verset par Verset</span>
              </button>
              <button
                onClick={() => setViewLayoutMode('mushaf')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  viewLayoutMode === 'mushaf'
                    ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm ring-1 ring-[#C9A24B]/40'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Scroll className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Lecture Mushaf Continu</span>
              </button>
            </div>
          )}

          {/* Section 6: Verses Content, Continuous Mushaf, or Quiz Tab */}
          {activeTab === 'test' ? (
            <div className="pt-2">
              <SurahQuizTab
                surah={surah}
                onPointsEarned={onPointsEarned}
                onMarkMemorized={handleToggleMemorized}
                isMemorized={isMemorized}
              />
            </div>
          ) : viewLayoutMode === 'mushaf' ? (
            <ContinuousMushafView
              surah={surah}
              currentVerseNumber={currentVerseNumber}
              isPlaying={isPlaying && isCurrentSurahPlaying}
              isRecitingBismillah={isRecitingBismillah}
              currentWordIndex={currentWordIndex}
              arabicFontSize={arabicFontSize}
              tajwidEnabled={tajwidEnabled}
              onPlayVerse={handlePlayVerse}
              onSeekToWord={(verseNum, wordIdx) => seekToWord(surah.id, verseNum, wordIdx)}
            />
          ) : (
            <div className="space-y-3 pt-1">
              {surah.verses.map(verse => {
                const isActiveVerse = isCurrentSurahPlaying && currentVerseNumber === verse.number;
                const isKnown = !!knownVerses[verse.number];
                const isRevealed = !!revealedVerses[verse.number];
                const activeSubTab = openSubTabs[verse.number];
                const dicoEntries = getVerseDico(verse);

                return (
                  <article
                    key={verse.number}
                    id={`vc${verse.number}`}
                    className={`surface p-4 transition-all duration-200 ${
                      isActiveVerse
                        ? 'ring-2 ring-[#256150] bg-[#256150]/10 dark:bg-[#256150]/20 shadow-md'
                        : ''
                    }`}
                  >
                    {/* Verse Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <QuranicRosette
                          verseNumber={verse.number}
                          isActive={isActiveVerse && isPlaying}
                          size="sm"
                          onClick={() => handlePlayVerse(verse.number)}
                        />
                        <span className="text-xs font-mono font-bold text-stone-500">
                          Verset {verse.number}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePlayVerse(verse.number)}
                          className={`rounded-full p-2 transition-all shadow-xs ${
                            isActiveVerse && isPlaying
                              ? 'bg-[#14332A] text-[#C9A24B] ring-2 ring-[#C9A24B] scale-105'
                              : 'bg-[#C9A24B] text-[#14332A] hover:bg-[#d8b159] hover:scale-105'
                          }`}
                          aria-label={`Écouter verset ${verse.number}`}
                        >
                          {isActiveVerse && isPlaying ? (
                            <Pause size={14} className="fill-current" />
                          ) : (
                            <Play size={14} className="fill-current translate-x-[0.5px]" />
                          )}
                        </button>

                        <button
                          onClick={() => toggleKnownVerse(verse.number)}
                          className={`rounded-full p-1.5 transition-all ${
                            isKnown
                              ? 'bg-primary text-white'
                              : 'bg-secondary hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400'
                          }`}
                          aria-label={`Marquer verset ${verse.number} comme connu`}
                        >
                          <Bookmark size={14} className={isKnown ? 'fill-current text-[#C9A24B]' : ''} />
                        </button>
                      </div>
                    </div>

                    {/* Arabic Verse Text with Tajwîd and Word Highlights */}
                    <p
                      dir="rtl"
                      onClick={(e) => {
                        const target = (e.target as HTMLElement).closest('.w-word');
                        if (target) {
                          const wordIdxStr = target.getAttribute('data-word-idx');
                          if (wordIdxStr !== null) {
                            const wordIdx = parseInt(wordIdxStr, 10);
                            if (!isNaN(wordIdx)) {
                              seekToWord(surah.id, verse.number, wordIdx);
                              return;
                            }
                          }
                        }
                        handleToggleVerseReveal(verse.number);
                      }}
                      style={{ fontSize: `${arabicFontSize}px` }}
                      className={`arabic pt-2 leading-[2.3] cursor-pointer select-none ${
                        practiceMode === 'test' && !isRevealed ? 'hide-words' : ''
                      } ${
                        practiceMode === 'memo' && !isRevealed ? 'blur-words' : ''
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: formatWarshVerseHtml(
                          verse.text,
                          tajwidEnabled,
                          verse.number,
                          isActiveVerse && isPlaying && (!isRecitingBismillah || verse.number !== 1) ? currentWordIndex : null
                        )
                      }}
                    />

                    {practiceMode !== 'lecture' && (
                      <p className="text-stone-400 dark:text-stone-500 mt-1 text-center text-[11px] font-bold">
                        {isRevealed ? 'Touche pour masquer' : 'Touche le verset pour révéler'}
                      </p>
                    )}

                    {/* French Translation */}
                    <p className="mt-3 text-sm leading-relaxed font-semibold">
                      {verse.translation}
                    </p>

                    {/* Sub-tabs pills: Sens, Explication, Dictionnaire, Ados & Époque */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => toggleVerseSubTab(verse.number, 'sens')}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeSubTab === 'sens'
                            ? 'bg-primary text-white'
                            : 'bg-secondary hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <Lightbulb className="w-3 h-3 text-[#C9A24B]" />
                        <span>Sens</span>
                      </button>

                      <button
                        onClick={() => toggleVerseSubTab(verse.number, 'tafsir')}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeSubTab === 'tafsir'
                            ? 'bg-primary text-white'
                            : 'bg-secondary hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <BookOpen className="w-3 h-3 text-[#C9A24B]" />
                        <span>Explication</span>
                      </button>

                      <button
                        onClick={() => toggleVerseSubTab(verse.number, 'dico')}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all flex items-center gap-1.5 ${
                          activeSubTab === 'dico'
                            ? 'bg-primary text-white'
                            : 'bg-secondary hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                        title="Dictionnaire du bédouin (Racines et sens originels du désert)"
                      >
                        <Languages className="w-3 h-3 text-[#C9A24B]" />
                        <span>Dictionnaire du bédouin</span>
                      </button>

                      <button
                        onClick={() => toggleVerseSubTab(verse.number, 'ados')}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all flex items-center gap-1 ${
                          activeSubTab === 'ados'
                            ? 'bg-gradient-to-r from-[#C9A24B] to-[#b38933] text-black shadow-xs font-black'
                            : 'bg-[#C9A24B]/15 hover:bg-[#C9A24B]/25 text-[#14332A] dark:text-[#FAF6EC] border border-[#C9A24B]/30'
                        }`}
                        title="Interprétation pour notre époque (Spécial jeunes & ados)"
                      >
                        <Sparkles size={12} className="text-[#C9A24B]" />
                        <span>Interprétation pour notre époque</span>
                      </button>
                    </div>

                    {/* Sub-tab Expanded Content */}
                    {activeSubTab === 'sens' && (
                      <div className="bg-secondary mt-2.5 rounded-xl p-3 text-xs leading-relaxed font-bold">
                        {verse.sens || verse.meaning || "Ce verset rappelle avec clarté et bienveillance la portée de nos actes."}
                      </div>
                    )}

                    {activeSubTab === 'tafsir' && (
                      <div className="bg-secondary mt-2.5 rounded-xl p-3 text-xs leading-relaxed font-semibold">
                        {verse.tafsir || verse.explanation || "L'exégèse traditionnelle met en lumière la profondeur spirituelle et la responsabilité humaine devant Allah."}
                      </div>
                    )}

                    {activeSubTab === 'ados' && (
                      <div className="bg-gradient-to-br from-[#FAF6EC] to-[#F3ECE0] dark:from-[#152720] dark:to-[#101E18] mt-2.5 rounded-xl p-3.5 border border-[#C9A24B]/35 shadow-xs text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#C9A24B] flex items-center gap-1">
                            <Sparkles size={12} /> Interprétation pour notre époque
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold">
                            Verset {verse.number}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-[#14332A] dark:text-white">
                          {getVerseYouthInsight(surah.id, verse.number).titreAdo}
                        </h4>
                        <p className="text-stone-700 dark:text-stone-200 leading-relaxed font-semibold">
                          {getVerseYouthInsight(surah.id, verse.number).impactAdo}
                        </p>
                        <div className="p-2.5 rounded-lg bg-[#C9A24B]/15 border-l-3 border-[#C9A24B] text-[11px] font-bold text-[#14332A] dark:text-[#FAF6EC] flex items-center gap-2">
                          <Compass className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                          <span><span className="underline">Défi introspection :</span> {getVerseYouthInsight(surah.id, verse.number).questionIntrospection}</span>
                        </div>
                      </div>
                    )}

                    {activeSubTab === 'dico' && (
                      <div className="mt-2.5 space-y-2">
                        <div className="p-2.5 rounded-xl bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-center gap-2 text-[11px] font-bold text-[#8a5a22] dark:text-[#E6BE65]">
                          <BookOpen className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                          <span>Dictionnaire du bédouin • Sens originel des racines du désert (Lisân al-'Arab)</span>
                        </div>
                        {dicoEntries.map((entry, idx) => (
                          <div key={idx} className="bg-secondary rounded-xl p-3">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-xs font-black">{entry.simple}</span>
                              <span className="arabic text-base">{entry.ar}</span>
                            </div>
                            <p className="text-stone-500 dark:text-stone-400 mt-1 text-[11px] leading-relaxed font-semibold">
                              {entry.img}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* Section 7: Hadith Card */}
          <div className="surface mt-5 p-4 rounded-2xl">
            <div className="flex items-start gap-2.5">
              <Scroll className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs leading-relaxed font-semibold">
                  {surah.hadithText || surah.hadith?.text || "Deux compagnons du Messager de Dieu ﷺ ne se quittaient jamais sans que l'un d'eux ne récite à l'autre Sourate Al-'Asr jusqu'au bout."}
                </p>
                {surah.hadith?.source && (
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold">
                    {surah.hadith.source}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 8: Big Memorization Button */}
          <button
            onClick={handleToggleMemorized}
            className={`mt-4 mb-28 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-black transition-all ${
              isMemorized
                ? 'bg-primary-soft text-primary'
                : 'grad-emerald text-white shadow-lift active:scale-98'
            }`}
          >
            <Check size={18} strokeWidth={3} />
            <span>
              {isMemorized ? "Mémorisée ✓ (annuler)" : "J'ai mémorisé cette sourate (+50 pts)"}
            </span>
          </button>
        </main>

        {/* Floating Bottom Audio Bar matching mma-warsh-helper.lovable.app */}
        <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+62px)] md:bottom-4 z-40 flex justify-center px-3">
          <div className="surface pointer-events-auto w-full max-w-[494px] p-2.5 shadow-lift backdrop-blur-md">
            {/* Progress line */}
            <div className="bg-secondary mb-2 h-1 overflow-hidden rounded-full">
              <div
                className="bg-[#C9A24B] h-full transition-[width] duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-2">
              {/* Play / Pause button */}
              <button
                onClick={handleToggleMainPlay}
                className="bg-gradient-to-br from-[#E5BE64] via-[#C9A24B] to-[#997328] text-[#14332A] flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-lg active:scale-95 hover:scale-105 transition-all border border-[#FAF6EC]/40"
                aria-label={isCurrentSurahPlaying ? "Pause" : "Lecture"}
              >
                {isCurrentSurahPlaying ? (
                  <Pause size={20} className="fill-current" />
                ) : (
                  <Play size={20} className="fill-current translate-x-[1.5px]" />
                )}
              </button>

              {/* Reciter & Verse selector button */}
              <button
                onClick={() => setShowRecitersModal(true)}
                className="min-w-0 flex-1 text-left cursor-pointer hover:opacity-80 transition-opacity"
              >
                <p className="truncate text-xs font-black flex items-center gap-1">
                  <span>{currentReciter.emoji}</span>
                  <span>{currentReciter.name}</span>
                  <ChevronUp size={12} className="opacity-60" />
                </p>
                <p className="text-stone-500 dark:text-stone-400 truncate text-[11px] font-semibold">
                  Verset {isCurrentSurahPlaying && currentVerseNumber ? currentVerseNumber : 1} · {surah.nameTranslit} ({surah.nameTranslation})
                </p>
              </button>

              {/* Speed toggle pill */}
              <button
                onClick={cycleSpeed}
                className="bg-secondary hover:bg-stone-200 dark:hover:bg-stone-800 shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-black transition-all"
                title="Vitesse de lecture"
              >
                ×{playbackSpeed}
              </button>

              {/* Repeat toggle pill */}
              <button
                onClick={cycleRepeat}
                className={`shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-black transition-all ${
                  repeatMode !== '1'
                    ? 'bg-accent-soft text-accent-foreground font-extrabold ring-1 ring-[#c9a24b]/40'
                    : 'bg-secondary text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
                title="Répétitions pour la mémorisation"
              >
                ↻{repeatMode === 'loop' ? '∞' : repeatMode}
              </button>
            </div>
          </div>
        </div>

        {/* Reciter Select Modal */}
        <ReciterSelectModal
          isOpen={showRecitersModal}
          onClose={() => setShowRecitersModal(false)}
          selectedReciterId={currentReciter.id}
          onSelectReciter={async (id) => {
            await setReciter(id);
            setShowRecitersModal(false);
            if (isCurrentSurahPlaying && currentVerseNumber) {
              await playVerse(surah.id, currentVerseNumber, id);
            }
          }}
        />

        {/* Study Group & Advisory Committee Modal */}
        <StudyGroupModal
          isOpen={showStudyGroupModal}
          onClose={() => setShowStudyGroupModal(false)}
          activeSurah={surah}
        />
      </div>
    </div>
  );
};
