import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, EyeOff, RotateCcw, CheckCircle2, ChevronRight, ChevronLeft, Volume2, BookOpen, Clock, Award } from 'lucide-react';
import { Surah, UserProgress } from '../types';
import { ALL_SURAHS, getSurahById } from '../data/surahs';
import { TajwidHighlighter } from '../components/TajwidHighlighter';
import { useAudio, RepeatCountMode } from '../context/AudioContext';

interface MemorizeViewProps {
  initialSurah?: Surah;
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  arabicFontSize?: number;
}

export type RoutinePhase = 'sabaq' | 'sabqi' | 'manzil';
export type MaskLevel = 0 | 1 | 2 | 3;

export const MemorizeView: React.FC<MemorizeViewProps> = ({
  initialSurah,
  progress,
  onUpdateProgress,
  arabicFontSize = 32
}) => {
  const [currentSurahId, setCurrentSurahId] = useState<number>(
    initialSurah ? initialSurah.id : progress.inProgressSurahIds[0] || 114
  );
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(0);
  const [maskLevel, setMaskLevel] = useState<MaskLevel>(0);
  const [revealedVerses, setRevealedVerses] = useState<Record<number, boolean>>({});
  const [routinePhase, setRoutinePhase] = useState<RoutinePhase>('sabaq');

  const {
    playSurah,
    setRepeatMode,
    repeatMode,
    repeatCounter,
    isPlaying,
    togglePlay,
    playbackSpeed,
    setSpeed
  } = useAudio();

  const currentSurah = getSurahById(currentSurahId) || ALL_SURAHS[36]; // default 114
  const currentVerse = currentSurah.verses[currentVerseIndex] || currentSurah.verses[0];
  const isMemorized = progress.memorizedSurahIds.includes(currentSurah.id);

  // Reset verse index when surah changes
  useEffect(() => {
    setCurrentVerseIndex(0);
    setRevealedVerses({});
  }, [currentSurahId]);

  const handleNextVerse = () => {
    if (currentVerseIndex < currentSurah.verses.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
    }
  };

  const handlePrevVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(prev => prev - 1);
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A24B', '#1F4D3D', '#FAF6EC', '#16A34A']
    });
  };

  const handleToggleMemorized = () => {
    const isAlready = progress.memorizedSurahIds.includes(currentSurah.id);
    let newMemorized = [...progress.memorizedSurahIds];
    let newInProgress = [...progress.inProgressSurahIds];

    if (isAlready) {
      newMemorized = newMemorized.filter(id => id !== currentSurah.id);
      if (!newInProgress.includes(currentSurah.id)) {
        newInProgress.push(currentSurah.id);
      }
    } else {
      newMemorized.push(currentSurah.id);
      newInProgress = newInProgress.filter(id => id !== currentSurah.id);
      triggerCelebration();
    }

    const updated: UserProgress = {
      ...progress,
      memorizedSurahIds: newMemorized,
      inProgressSurahIds: newInProgress,
      points: progress.points + (isAlready ? 0 : 25)
    };
    onUpdateProgress(updated);
  };

  // Mask text generator according to MaskLevel (Rule 1: string integrity maintained)
  const renderMaskedText = (arabicText: string, verseNum: number) => {
    const isRevealed = revealedVerses[verseNum];
    if (maskLevel === 0 || isRevealed) {
      return (
        <TajwidHighlighter
          text={arabicText}
          enabled={true}
          fontSize={arabicFontSize}
        />
      );
    }

    const words = arabicText.split(/\s+/).filter(Boolean);

    if (maskLevel === 3) {
      // 100% masked: show only first word, rest hidden
      return (
        <div
          onClick={() => setRevealedVerses(prev => ({ ...prev, [verseNum]: true }))}
          className="cursor-pointer group select-none p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-dashed border-amber-400/50 text-right w-full"
          title="Cliquez pour révéler le verset"
        >
          <span
            dir="rtl"
            style={{ fontSize: `${arabicFontSize}px` }}
            className="font-quran text-slate-800 dark:text-[#FAF6EC] ml-2"
          >
            {words[0]}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-lg bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 group-hover:scale-105 transition-transform">
            👁️ Toucher pour révéler
          </span>
        </div>
      );
    }

    // Level 1: mask 1 word out of 3; Level 2: mask 2 words out of 3
    const maskModulo = maskLevel === 1 ? 3 : 2;
    return (
      <div
        dir="rtl"
        style={{ fontSize: `${arabicFontSize}px`, lineHeight: 2.1 }}
        className="font-quran tracking-wide text-right w-full select-text"
      >
        {words.map((w, idx) => {
          const isHidden = idx % maskModulo === 0;
          if (isHidden) {
            return (
              <span
                key={idx}
                onClick={() => setRevealedVerses(prev => ({ ...prev, [verseNum]: true }))}
                className="inline-block mx-1 px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/50 text-transparent select-none cursor-pointer border border-dashed border-amber-400/60 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
                title="Cliquer pour dévoiler ce mot"
              >
                {w}
              </span>
            );
          }
          return (
            <span key={idx} className="inline-block mx-1 text-slate-900 dark:text-[#FAF6EC]">
              {w}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28">
      {/* Studio Header */}
      <div className="w-full rounded-3xl bg-[#1F4D3D] text-[#FAF6EC] p-5 sm:p-7 border border-[#C9A24B]/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B] text-[#14332A] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio de Mémorisation (Hifz)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Méthode Traditionnelle en 3 Temps
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6EC]/80">
            Sabaq (Nouvelle leçon) • Sabqi (Révision récente) • Manzil (Consolidation globale)
          </p>
        </div>

        {/* Routine Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#14332A]/70 p-1 rounded-2xl border border-[#C9A24B]/30 shrink-0">
          <button
            onClick={() => setRoutinePhase('sabaq')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              routinePhase === 'sabaq'
                ? 'bg-[#C9A24B] text-[#14332A] shadow-sm'
                : 'text-[#FAF6EC]/70 hover:text-white'
            }`}
          >
            1. Sabaq
          </button>
          <button
            onClick={() => setRoutinePhase('sabqi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              routinePhase === 'sabqi'
                ? 'bg-[#C9A24B] text-[#14332A] shadow-sm'
                : 'text-[#FAF6EC]/70 hover:text-white'
            }`}
          >
            2. Sabqi
          </button>
          <button
            onClick={() => setRoutinePhase('manzil')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              routinePhase === 'manzil'
                ? 'bg-[#C9A24B] text-[#14332A] shadow-sm'
                : 'text-[#FAF6EC]/70 hover:text-white'
            }`}
          >
            3. Manzil
          </button>
        </div>
      </div>

      {/* Routine Explanation Banner */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 flex items-center justify-between w-full shadow-sm">
        <div>
          <span className="font-bold text-[#14332A] dark:text-[#C9A24B]">
            {routinePhase === 'sabaq' && '📌 Phase Sabaq : '}
            {routinePhase === 'sabqi' && '🔄 Phase Sabqi : '}
            {routinePhase === 'manzil' && '🏰 Phase Manzil : '}
          </span>
          <span>
            {routinePhase === 'sabaq' && 'Apprentissage minutieux de votre nouvelle sourate, verset après verset.'}
            {routinePhase === 'sabqi' && 'Répétition fluide des 5 dernières sourates apprises pour éviter l’oubli précoce.'}
            {routinePhase === 'manzil' && 'Révision en cycle continu de toutes les sourates mémorisées pour ancrer le Hifz.'}
          </span>
        </div>
      </div>

      {/* Surah Selector Dropdown & Quick Navigator */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2 flex-1">
          <label htmlFor="surah-select-dropdown" className="text-xs font-bold text-stone-500 shrink-0">
            Sourate active :
          </label>
          <select
            id="surah-select-dropdown"
            value={currentSurahId}
            onChange={e => setCurrentSurahId(parseInt(e.target.value, 10))}
            className="w-full sm:w-72 px-3 py-2 rounded-xl bg-white/90 dark:bg-[#16221C] border border-stone-300 dark:border-stone-700 text-sm font-semibold text-[#14332A] dark:text-[#FAF6EC] focus:ring-2 focus:ring-[#C9A24B] focus:outline-none"
          >
            {ALL_SURAHS.map(s => (
              <option key={s.id} value={s.id}>
                {s.id}. {s.nameTranslit} ({s.nameArabic}) - {s.versesCount} v.
              </option>
            ))}
          </select>
        </div>

        {/* Memorized Toggle Button */}
        <button
          onClick={handleToggleMemorized}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            isMemorized
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white/80 dark:bg-[#16221C] border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-emerald-500'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isMemorized ? 'Sourate validée (Hafidh)' : 'Marquer comme mémorisée'}</span>
        </button>
      </div>

      {/* Memorization Tool Bar: Masking Level & Repetition Controls */}
      <div className="w-full rounded-2xl p-4 bg-white/80 dark:bg-[#16221C] border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Masking controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400 flex items-center gap-1">
              {maskLevel === 0 ? <Eye className="w-3.5 h-3.5 text-stone-500" /> : <EyeOff className="w-3.5 h-3.5 text-amber-500" />}
              <span>Masquage :</span>
            </span>
            <div className="flex items-center gap-1">
              {([0, 1, 2, 3] as MaskLevel[]).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => {
                    setMaskLevel(lvl);
                    setRevealedVerses({});
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    maskLevel === lvl
                      ? 'bg-[#14332A] text-[#FAF6EC]'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                  }`}
                >
                  {lvl === 0 ? '0%' : lvl === 1 ? '33%' : lvl === 2 ? '66%' : '100%'}
                </button>
              ))}
            </div>
          </div>

          {/* Repeat Controls */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400 flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Boucle audio :</span>
            </span>
            <div className="flex items-center gap-1">
              {(['1', '2', '3', '5', 'loop'] as RepeatCountMode[]).map(rep => (
                <button
                  key={rep}
                  onClick={() => setRepeatMode(rep)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    repeatMode === rep
                      ? 'bg-[#C9A24B] text-[#14332A]'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                  }`}
                >
                  {rep === 'loop' ? '∞' : `${rep}x`}
                </button>
              ))}
            </div>
            {repeatMode !== '1' && isPlaying && (
              <span className="text-[11px] font-mono font-bold text-[#C9A24B]">
                ({repeatCounter}/{repeatMode === 'loop' ? '∞' : repeatMode})
              </span>
            )}

            {/* Speed toggle chip */}
            <div className="flex items-center gap-1 ml-1">
              {[0.75, 1, 1.25].map(spd => (
                <button
                  key={spd}
                  onClick={() => setSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    playbackSpeed === spd
                      ? 'bg-[#14332A] text-[#FAF6EC]'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Quick Audio trigger */}
            <button
              onClick={() => {
                if (isPlaying) {
                  togglePlay();
                } else {
                  playSurah(currentSurah.id);
                }
              }}
              className="p-1.5 rounded-lg bg-[#C9A24B]/20 text-[#C9A24B] hover:bg-[#C9A24B]/30 ml-1"
              title={isPlaying ? "Pause" : "Lancer l'écoute"}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Focus Mode: Active Verse Display Box */}
      <div className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#16221C] border-l-4 border-l-[#C9A24B] border-y border-r border-[#14332A]/10 dark:border-stone-800 shadow-md space-y-6">
        {/* Step indicator */}
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3 w-full">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#C9A24B] text-white flex items-center justify-center text-[10px] font-bold shadow-sm shrink-0 font-mono">
              {currentVerse.number}
            </span>
            <span className="text-sm font-bold text-[#14332A] dark:text-[#FAF6EC]">
              Verset {currentVerse.number} sur {currentSurah.versesCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevVerse}
              disabled={currentVerseIndex === 0}
              className="p-2 rounded-xl border border-[#14332A]/10 dark:border-stone-700 text-stone-600 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Verset précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextVerse}
              disabled={currentVerseIndex === currentSurah.verses.length - 1}
              className="p-2 rounded-xl border border-[#14332A]/10 dark:border-stone-700 text-stone-600 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Verset suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Large Arabic Warsh Verse Area */}
        <div className="w-full py-4 text-right min-h-[140px] flex items-center justify-end">
          {renderMaskedText(currentVerse.text, currentVerse.number)}
        </div>

        {/* French translation and meaning */}
        <div className="w-full pt-4 border-t border-stone-100 dark:border-stone-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B]">
            Traduction & Méditation
          </span>
          <p className="text-sm sm:text-base text-[#1F4D3D] dark:text-[#FAF6EC]/85 leading-relaxed font-sans italic">
            {currentVerse.translation}
          </p>
        </div>
      </div>

      {/* Full Surah Overview in Sequence */}
      <div className="w-full rounded-2xl p-5 bg-white/80 dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#14332A] dark:text-[#FAF6EC] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C9A24B]" />
            <span>Tous les versets de {currentSurah.nameTranslit}</span>
          </h3>
          <span className="text-xs text-stone-500">Cliquez sur un verset pour vous y positionner</span>
        </div>

        <div className="space-y-2">
          {currentSurah.verses.map((v, idx) => {
            const isSelected = idx === currentVerseIndex;
            return (
              <div
                key={v.number}
                onClick={() => setCurrentVerseIndex(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#1F4D3D]/10 dark:bg-[#1F4D3D]/30 border-[#C9A24B] ring-1 ring-[#C9A24B]'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center justify-center font-mono shrink-0">
                    {v.number}
                  </span>
                  <p className="text-xs text-stone-600 dark:text-stone-400 truncate max-w-xs sm:max-w-md">
                    {v.translation}
                  </p>
                </div>
                <span className="font-quran text-lg text-[#14332A] dark:text-[#FAF6EC] shrink-0">
                  {v.text.slice(0, 30)}...
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
