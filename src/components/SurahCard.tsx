import React from 'react';
import { Play, BookOpen, Sparkles, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import { Surah } from '../types';

interface SurahCardProps {
  surah: Surah;
  isMemorized: boolean;
  isInProgress: boolean;
  isCurrentlyPlaying: boolean;
  onOpenSurah: (surah: Surah) => void;
  onPlayAudio: (surah: Surah) => void;
  onMemorize: (surah: Surah) => void;
  onOpenQuiz?: (surah: Surah) => void;
}

export const SurahCard: React.FC<SurahCardProps> = ({
  surah,
  isMemorized,
  isInProgress,
  isCurrentlyPlaying,
  onOpenSurah,
  onPlayAudio,
  onMemorize,
  onOpenQuiz
}) => {
  return (
    <div
      id={`surah-card-${surah.id}`}
      className={`w-full rounded-2xl p-4 sm:p-5 transition-all duration-200 border flex flex-col justify-between gap-3 bg-white/90 dark:bg-[#16221C] shadow-sm hover:shadow-md ${
        isCurrentlyPlaying
          ? 'border-[#C9A24B] ring-2 ring-[#C9A24B]/40'
          : isMemorized
          ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20'
          : isInProgress
          ? 'border-[#C9A24B]/40 bg-amber-50/20 dark:bg-amber-950/10'
          : 'border-[#14332A]/10 dark:border-stone-800 hover:border-[#C9A24B]/50'
      }`}
    >
      {/* Top row: Number rosette, badges, and status */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#14332A] text-[#FAF6EC] border border-[#C9A24B]/50 flex items-center justify-center font-bold text-sm shadow-inner shrink-0">
            {surah.id}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C9A24B]/20 text-[#14332A] dark:text-[#C9A24B]">
                {surah.type}
              </span>
              <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
                {surah.versesCount} versets
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              {isMemorized && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Mémorisée ✓
                </span>
              )}
              {!isMemorized && isInProgress && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  En cours
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Arabic Name badge */}
        <div className="text-right">
          <span className="font-quran text-2xl sm:text-3xl text-[#14332A] dark:text-[#C9A24B] leading-none block">
            {surah.nameArabic}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-sans">
            Warsh
          </span>
        </div>
      </div>

      {/* Middle row: Transliteration & French meaning */}
      <div className="w-full space-y-1 my-1 cursor-pointer" onClick={() => onOpenSurah(surah)}>
        <div className="flex items-baseline justify-between w-full">
          <h3 className="font-bold text-base sm:text-lg text-[#14332A] dark:text-[#FAF6EC] tracking-tight hover:text-[#C9A24B] transition-colors">
            {surah.nameTranslit}
          </h3>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            {surah.nameFrench}
          </span>
        </div>
        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
          {surah.keyMessage}
        </p>
      </div>

      {/* Bottom row: Action buttons */}
      <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#14332A]/5 dark:border-stone-800/80 w-full flex-wrap">
        {/* Play Audio */}
        <button
          onClick={() => onPlayAudio(surah)}
          title={`Écouter ${surah.nameTranslit}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isCurrentlyPlaying
              ? 'bg-[#C9A24B] text-[#14332A] shadow-sm'
              : 'bg-[#1F4D3D]/5 dark:bg-white/5 text-[#14332A] dark:text-[#FAF6EC] hover:bg-[#C9A24B]/20'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isCurrentlyPlaying ? 'fill-current' : ''}`} />
          <span>{isCurrentlyPlaying ? 'En lecture' : 'Écouter'}</span>
        </button>

        <div className="flex items-center gap-1.5">
          {/* Test / Quiz Shortcut Button */}
          {onOpenQuiz && (
            <button
              onClick={() => onOpenQuiz(surah)}
              title={`Tester la mémorisation de ${surah.nameTranslit}`}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-colors border border-amber-300/40"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Test</span>
            </button>
          )}

          {/* Hifz Studio direct access */}
          <button
            onClick={() => onMemorize(surah)}
            title={`Mémoriser ${surah.nameTranslit} (Sabaq, Sabqi, Manzil)`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#1F4D3D] dark:text-[#C9A24B] hover:bg-[#C9A24B]/15 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="hidden sm:inline">Hifz</span>
          </button>

          {/* Open Surah Verses */}
          <button
            onClick={() => onOpenSurah(surah)}
            title={`Lire et étudier ${surah.nameTranslit}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#1F4D3D] hover:bg-[#14332A] text-[#FAF6EC] transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Lire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
