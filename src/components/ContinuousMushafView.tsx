import React, { useState } from 'react';
import { Surah, Verse } from '../types';
import { QuranicRosette } from './QuranicRosette';
import { Volume2, Play, Eye, EyeOff, BookOpen } from 'lucide-react';
import { formatWarshWordsHtml } from '../utils/warshTajwid';

interface ContinuousMushafViewProps {
  surah: Surah;
  currentVerseNumber: number;
  currentWordIndex: number | null;
  isPlaying: boolean;
  isRecitingBismillah?: boolean;
  arabicFontSize: number;
  tajwidEnabled?: boolean;
  onSelectVerse?: (verseNumber: number) => void;
  onPlayVerse: (verseNumber: number) => void;
  onSeekToWord?: (verseNumber: number, wordIdx: number) => void;
}

/**
 * Continuous Authentic Mushaf Page (صفحة المصحف المتصلة)
 * Continuous Quranic calligraphy layout with inline golden rosettes,
 * exactly like a traditional physical copy of the Holy Quran.
 */
export const ContinuousMushafView: React.FC<ContinuousMushafViewProps> = ({
  surah,
  currentVerseNumber,
  currentWordIndex,
  isPlaying,
  isRecitingBismillah = false,
  arabicFontSize,
  tajwidEnabled = true,
  onSelectVerse,
  onPlayVerse,
  onSeekToWord
}) => {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="w-full space-y-6">
      {/* Illuminated Mushaf Page Container */}
      <div className="w-full rounded-3xl p-6 sm:p-10 md:p-12 bg-[#FFFDF7] dark:bg-[#14221B] border-2 border-[#C9A24B]/40 shadow-xl relative overflow-hidden">
        
        {/* Ornate Inner Double Border (Page Tracery) */}
        <div className="absolute inset-3 sm:inset-4 border border-[#C9A24B]/30 rounded-2xl pointer-events-none" />
        <div className="absolute inset-4 sm:inset-5 border border-[#C9A24B]/15 rounded-xl pointer-events-none" />

        {/* Top Header of the Mushaf Page: Page / Juz details */}
        <div className="relative flex items-center justify-between pb-6 mb-6 border-b border-[#C9A24B]/20 text-xs font-bold text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1.5">
            <span className="text-[#C9A24B] font-mono uppercase tracking-widest text-[11px]">
              Juz 30 • {surah.type}
            </span>
          </div>
          
          <span className="font-quran text-lg text-[#14332A] dark:text-[#C9A24B]">
            سورة {surah.nameArabic}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlayVerse(1)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#14332A] text-[#FAF6EC] hover:bg-[#C9A24B] hover:text-[#14332A] transition-colors"
              title="Écouter depuis le début"
            >
              <Play className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">Écouter</span>
            </button>
          </div>
        </div>

        {/* Continuous Flowing Quranic Text */}
        <div
          dir="rtl"
          className="relative text-justify font-quran leading-[2.6] select-text px-2 sm:px-4"
          style={{
            fontSize: `${arabicFontSize}px`,
            textAlignLast: 'center'
          }}
        >
          {surah.verses.map(verse => {
            const isCurrentVerse = currentVerseNumber === verse.number;
            const wordsHtml = formatWarshWordsHtml(verse.text, tajwidEnabled);

            return (
              <span
                key={verse.number}
                id={`continuous-verse-${verse.number}`}
                onClick={() => (onSelectVerse ? onSelectVerse(verse.number) : onPlayVerse(verse.number))}
                className={`transition-all duration-200 rounded-xl px-1 py-0.5 cursor-pointer inline ${
                  isCurrentVerse
                    ? 'bg-[#C9A24B]/20 dark:bg-[#C9A24B]/30 ring-1 ring-[#C9A24B]/50'
                    : 'hover:bg-[#C9A24B]/10'
                }`}
              >
                {/* Words with Tajwid & active word highlight */}
                {wordsHtml.map((html, wordIdx) => {
                  const isActiveWord = isCurrentVerse && isPlaying && (!isRecitingBismillah || verse.number !== 1) && currentWordIndex === wordIdx;
                  return (
                    <React.Fragment key={wordIdx}>
                      <span
                        className={`w-word qw${isActiveWord ? ' hl' : ''}`}
                        data-word-idx={wordIdx}
                        onClick={e => {
                          if (onSeekToWord) {
                            e.stopPropagation();
                            onSeekToWord(verse.number, wordIdx);
                          }
                        }}
                        dangerouslySetInnerHTML={{ __html: html }}
                      />{' '}
                    </React.Fragment>
                  );
                })}

                {/* Inline Golden Quranic Rosette with Ayah number */}
                <span className="inline-block align-middle mx-2 my-1">
                  <QuranicRosette
                    verseNumber={verse.number}
                    isActive={isCurrentVerse}
                    size={arabicFontSize > 36 ? 'lg' : arabicFontSize > 28 ? 'md' : 'sm'}
                    onClick={() => onPlayVerse(verse.number)}
                  />
                </span>
              </span>
            );
          })}
        </div>

        {/* Bottom Page Footer: Indicator */}
        <div className="relative flex items-center justify-center pt-8 mt-6 border-t border-[#C9A24B]/20">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#C9A24B]">
            <span>۞</span>
            <span>RÉCITATION SELON WARSH ‘AN NÂFI‘</span>
            <span>۞</span>
          </div>
        </div>
      </div>

      {/* Translation & Reflection Toggle Below the Mushaf */}
      <div className="w-full rounded-2xl p-4 bg-white dark:bg-[#16221C] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#14332A] dark:text-[#FAF6EC]">
            <BookOpen className="w-4 h-4 text-[#C9A24B]" />
            <span>Traduction française continue</span>
          </div>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#C9A24B]/20 text-xs font-bold transition-all"
          >
            {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showTranslation ? 'Masquer la traduction' : 'Afficher la traduction'}</span>
          </button>
        </div>

        {showTranslation && (
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {surah.verses.map(v => (
              <p key={v.number} className="flex items-start gap-2">
                <span className="font-mono font-bold text-[#C9A24B] shrink-0">
                  [{v.number}]
                </span>
                <span>{v.translation}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
