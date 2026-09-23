import React from 'react';
import { Surah } from '../types';
import { Sparkles, MapPin, Hash, BookOpen } from 'lucide-react';

interface SurahHeaderCartoucheProps {
  surah: Surah;
  arabicFontSize?: number;
  isRecitingBismillah?: boolean;
}

/**
 * Traditional Illuminated Surah Cartouche (طرة السورة المزخرفة بالتذهيب)
 * Inspired by Maghrebi Warsh manuscripts and the Royal Moroccan Codex.
 */
export const SurahHeaderCartouche: React.FC<SurahHeaderCartoucheProps> = ({
  surah,
  arabicFontSize = 32,
  isRecitingBismillah = false
}) => {
  return (
    <div className="w-full relative select-none">
      {/* Outer Illuminated Cartouche Frame */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#14332A] via-[#1B4237] to-[#102B23] text-[#FAF6EC] border-2 border-[#C9A24B] shadow-2xl p-6 sm:p-8">
        
        {/* Subtle geometric Arabesque Islamic watermark pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C9A24B 1px, transparent 1px), radial-gradient(#C9A24B 1px, #102B23 1px)`,
            backgroundSize: `24px 24px`,
            backgroundPosition: `0 0, 12px 12px`
          }}
        />

        {/* Decorative Corner Ornaments (Gold Finials) */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#C9A24B] rounded-tl-xl opacity-60 pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#C9A24B] rounded-tr-xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#C9A24B] rounded-bl-xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#C9A24B] rounded-br-xl opacity-60 pointer-events-none" />

        {/* Inner Gold Inset Filigree Border */}
        <div className="relative border border-[#C9A24B]/40 rounded-2xl p-4 sm:p-6 bg-[#14332A]/50 backdrop-blur-xs flex flex-col items-center text-center space-y-4">
          
          {/* Top Metadata Ribbon: Numéro • Type de Révélation • Versets */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs font-bold text-[#EAE6DB]">
            {/* Surah Number Badge */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#C9A24B] text-[#14332A] font-extrabold shadow-sm">
              <Hash className="w-3.5 h-3.5" />
              <span>Sourate {surah.id}</span>
            </span>

            {/* Revelation Origin */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#C9A24B]/30 backdrop-blur-xs text-[#FAF6EC]">
              <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>{surah.type}</span>
            </span>

            {/* Verse Count */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#C9A24B]/30 backdrop-blur-xs text-[#FAF6EC]">
              <BookOpen className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>{surah.versesCount} versets</span>
            </span>

            {/* Juz 30 Badge - High contrast and bold visibility */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/25 border-2 border-[#C9A24B] text-[#FAF6EC] font-extrabold shadow-sm tracking-wide">
              <span className="text-[#C9A24B] text-xs">📖</span>
              <span>Juz 30 ('Amma)</span>
            </span>
          </div>

          {/* Central Illuminated Calligraphy */}
          <div className="py-2 space-y-1">
            <h1
              dir="rtl"
              className="font-quran text-4xl sm:text-5xl md:text-6xl text-[#FAF6EC] tracking-wide filter drop-shadow-[0_2px_12px_rgba(201,162,75,0.4)]"
              style={{ lineHeight: 1.4 }}
            >
              سُورَةُ {surah.nameArabic.replace('سورة', '').trim()}
            </h1>
            
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C9A24B]" />
              <p className="text-sm sm:text-base font-extrabold text-[#C9A24B] tracking-wider uppercase font-mono">
                {surah.nameTranslit} • {surah.nameFrench}
              </p>
              <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C9A24B]" />
            </div>
          </div>

          {/* Key Spiritual Core Message */}
          {surah.keyMessage && (
            <p className="max-w-2xl text-xs sm:text-sm text-stone-300 leading-relaxed font-normal italic px-4">
              « {surah.keyMessage} »
            </p>
          )}

          {/* Centered Bismillah Ornamentation */}
          {surah.bismillah && (
            <div className="w-full pt-3">
              <div
                className={`mx-auto max-w-md py-3 px-6 rounded-2xl border transition-all duration-500 shadow-inner ${
                  isRecitingBismillah
                    ? 'bg-gradient-to-r from-[#C9A24B]/30 via-[#C9A24B]/50 to-[#C9A24B]/30 border-[#C9A24B] ring-2 ring-[#C9A24B]/60 scale-[1.02] shadow-[0_0_20px_rgba(201,162,75,0.35)]'
                    : 'bg-gradient-to-r from-[#C9A24B]/10 via-[#C9A24B]/25 to-[#C9A24B]/10 border-[#C9A24B]/50'
                }`}
              >
                <p
                  dir="rtl"
                  className={`font-quran text-2xl sm:text-3xl md:text-4xl tracking-normal filter drop-shadow-sm transition-colors duration-300 ${
                    isRecitingBismillah ? 'text-amber-200' : 'text-[#FAF6EC]'
                  }`}
                  style={{ lineHeight: 1.8 }}
                >
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </p>
                <span className={`text-[10px] tracking-widest font-mono uppercase block pt-0.5 transition-colors duration-300 ${
                  isRecitingBismillah ? 'text-amber-300 font-bold' : 'text-[#C9A24B]'
                }`}>
                  {isRecitingBismillah ? '• Récitation de la Basmalah en cours •' : "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux"}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
