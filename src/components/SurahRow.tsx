import React from 'react';
import {
  Play,
  Pause,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  HelpCircle,
  ChevronRight,
  Volume2
} from 'lucide-react';
import { Surah } from '../types';

interface SurahRowProps {
  surah: Surah;
  isMemorized: boolean;
  isInProgress: boolean;
  isCurrentlyPlaying: boolean;
  onOpenSurah: (surah: Surah) => void;
  onPlayAudio: (surah: Surah) => void;
  onMemorize: (surah: Surah) => void;
  onOpenQuiz?: (surah: Surah) => void;
  compact?: boolean;
}

export const SurahRow: React.FC<SurahRowProps> = ({
  surah,
  isMemorized,
  isInProgress,
  isCurrentlyPlaying,
  onOpenSurah,
  onPlayAudio,
  onMemorize,
  onOpenQuiz,
  compact = false
}) => {
  return (
    <div
      id={`surah-row-${surah.id}`}
      onClick={() => onOpenSurah(surah)}
      className={`group w-full rounded-2xl transition-all duration-200 border cursor-pointer select-none relative overflow-hidden flex items-center justify-between gap-3 sm:gap-4 ${
        compact ? 'p-3 sm:p-3.5' : 'p-3.5 sm:p-4 md:p-5'
      } ${
        isCurrentlyPlaying
          ? 'bg-[#1F4D3D]/10 dark:bg-[#1F4D3D]/40 border-[#C9A24B] ring-2 ring-[#C9A24B]/40 shadow-md'
          : isMemorized
          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500 hover:shadow-md'
          : isInProgress
          ? 'bg-amber-50/40 dark:bg-amber-950/20 border-[#C9A24B]/40 hover:border-[#C9A24B] hover:shadow-md'
          : 'bg-white dark:bg-[#16221C] border-stone-200 dark:border-stone-800 hover:border-[#C9A24B]/60 hover:shadow-md'
      }`}
    >
      {/* Accent Indicator bar on the left */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${
          isCurrentlyPlaying
            ? 'bg-[#C9A24B]'
            : isMemorized
            ? 'bg-emerald-500'
            : isInProgress
            ? 'bg-amber-500'
            : 'bg-transparent group-hover:bg-[#C9A24B]/50'
        }`}
      />

      {/* Left section: Rosette badge + Transliteration & Details */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 pl-1">
        {/* Rosette number badge */}
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center font-black transition-transform group-hover:scale-105 shrink-0 shadow-inner ${
            isCurrentlyPlaying
              ? 'bg-[#C9A24B] text-[#14332A] ring-2 ring-[#C9A24B]/50'
              : isMemorized
              ? 'bg-emerald-600 text-white'
              : 'bg-[#14332A] text-[#FAF6EC] border border-[#C9A24B]/40'
          }`}
        >
          <span className="text-xs sm:text-sm font-sans leading-none">{surah.id}</span>
          <span className="text-[8px] uppercase tracking-tighter opacity-80 mt-0.5">Sourate</span>
        </div>

        {/* Text Details */}
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-extrabold text-sm sm:text-base text-[#14332A] dark:text-[#FAF6EC] tracking-tight group-hover:text-[#C9A24B] transition-colors truncate">
              {surah.nameTranslit}
            </h3>

            {/* Status chip */}
            {isMemorized && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Mémorisée</span>
              </span>
            )}
            {!isMemorized && isInProgress && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>En cours</span>
              </span>
            )}
          </div>

          {/* Subtitle: French meaning and metadata pills */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 flex-wrap">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              {surah.nameFrench}
            </span>
            <span>•</span>
            <span className="text-[11px]">{surah.versesCount} versets</span>
            <span>•</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-semibold">
              {surah.type}
            </span>
          </div>

          {/* Key message (hidden in compact mode or on small mobile screens) */}
          {!compact && (
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 hidden md:block pt-0.5">
              {surah.keyMessage}
            </p>
          )}
        </div>
      </div>

      {/* Right section: Arabic calligraphy + Actions buttons */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        {/* Arabic Calligraphy Name */}
        <div className="text-right">
          <span
            dir="rtl"
            className="font-quran text-2xl sm:text-3xl text-[#14332A] dark:text-[#C9A24B] leading-none block group-hover:scale-105 transition-transform"
          >
            {surah.nameArabic}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#C9A24B] dark:text-[#C9A24B]/80 font-mono hidden sm:block">
            Warsh ‘an Nâfi‘
          </span>
        </div>

        {/* Action Button Group */}
        <div
          className="flex items-center gap-1 sm:gap-2"
          onClick={e => e.stopPropagation()} // Prevent row click when pressing sub-buttons
        >
          {/* Audio Play Button */}
          <button
            type="button"
            onClick={() => onPlayAudio(surah)}
            title={isCurrentlyPlaying ? 'Mettre en pause' : `Écouter ${surah.nameTranslit}`}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
              isCurrentlyPlaying
                ? 'bg-[#C9A24B] text-[#14332A] shadow-md ring-2 ring-[#C9A24B]'
                : 'bg-[#14332A] text-[#FAF6EC] hover:bg-[#C9A24B] hover:text-[#14332A] dark:bg-[#C9A24B] dark:text-[#14332A] shadow-xs'
            }`}
          >
            {isCurrentlyPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse text-[#14332A]" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Test / Quiz Button */}
          {onOpenQuiz && (
            <button
              type="button"
              onClick={() => onOpenQuiz(surah)}
              title={`Tester ma mémorisation de ${surah.nameTranslit}`}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/40 hover:bg-amber-200/80 dark:hover:bg-amber-900/60 transition-colors border border-amber-300/40"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Test</span>
            </button>
          )}

          {/* Hifz Button */}
          <button
            type="button"
            onClick={() => onMemorize(surah)}
            title={`Mémoriser ${surah.nameTranslit} (Sabaq, Sabqi, Manzil)`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#14332A] dark:text-[#FAF6EC] bg-stone-100 dark:bg-stone-800 hover:bg-[#C9A24B]/20 hover:text-[#14332A] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Hifz</span>
          </button>

          {/* Open / Read Verses Button */}
          <button
            type="button"
            onClick={() => onOpenSurah(surah)}
            title={`Lire et étudier ${surah.nameTranslit}`}
            className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-[#14332A] hover:bg-[#1F4D3D] text-[#FAF6EC] transition-all shadow-sm group-hover:bg-[#C9A24B] group-hover:text-[#14332A]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lire</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
