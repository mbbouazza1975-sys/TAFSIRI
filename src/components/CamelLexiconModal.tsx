import React, { useState } from 'react';
import { X, Search, BookOpen, Sparkles, ExternalLink, ShieldCheck, Compass } from 'lucide-react';
import { CAMEL_LEXICON_DATABASE, CamelLexiconEntry } from '../data/camelLexicon';

interface CamelLexiconModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTerm?: string;
}

export const CamelLexiconModal: React.FC<CamelLexiconModalProps> = ({
  isOpen,
  onClose,
  initialTerm = ''
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialTerm);
  const [selectedSurahFilter, setSelectedSurahFilter] = useState<number | 'all'>('all');

  if (!isOpen) return null;

  const filteredEntries = CAMEL_LEXICON_DATABASE.filter(entry => {
    const matchesQuery =
      entry.termArabic.includes(searchQuery) ||
      entry.termTranslit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.root.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.desertOriginalMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.quranicElevation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSurah =
      selectedSurahFilter === 'all' || entry.surahId === selectedSurahFilter;

    return matchesQuery && matchesSurah;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#FAF6EC] dark:bg-[#121E18] text-[#14332A] dark:text-[#FAF6EC] rounded-2xl sm:rounded-3xl border border-[#C9A24B]/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#C9A24B]/20 bg-white/80 dark:bg-[#16261E]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">🐪</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-[#14332A] dark:text-[#FAF6EC]">
                  Le Dictionnaire du Chamelier
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9A24B]/20 text-[#8a5a22] dark:text-[#E6BE65] border border-[#C9A24B]/40">
                  Sources Classiques Vérifiées
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Les racines du désert et l'élévation spirituelle coranique (Lisân al-'Arab & Maqâyîs al-Lugha)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-3 sm:p-4 border-b border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/50 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par mot arabe, translitération, racine (ex: ك ث ر) ou sens..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                Effacer
              </button>
            )}
          </div>

          <select
            value={selectedSurahFilter}
            onChange={(e) => setSelectedSurahFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
          >
            <option value="all">Toutes les sourates du Lexique</option>
            <option value={102}>Sourate 102 · At-Takâthur</option>
            <option value={103}>Sourate 103 · Al-‘Asr</option>
            <option value={108}>Sourate 108 · Al-Kawthar</option>
            <option value={112}>Sourate 112 · Al-Ikhlâs</option>
            <option value={113}>Sourate 113 · Al-Falaq</option>
            <option value={114}>Sourate 114 · An-Nâs</option>
          </select>
        </div>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-stone-500 dark:text-stone-400">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#C9A24B]" />
              <p className="font-semibold text-sm">Aucun terme correspondant</p>
              <p className="text-xs mt-1">Essayez avec un autre mot ou réinitialisez la recherche.</p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-800 shadow-xs hover:border-[#C9A24B]/50 transition-colors space-y-3"
              >
                {/* Word Card Header */}
                <div className="flex items-start justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-quran text-2xl sm:text-3xl text-[#14332A] dark:text-[#C9A24B]">
                        {entry.termArabic}
                      </span>
                      <span className="font-bold text-sm text-stone-700 dark:text-stone-200">
                        {entry.termTranslit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 font-semibold text-[#8a5a22] dark:text-[#E6BE65]">
                        Racine : {entry.root}
                      </span>
                      <span>•</span>
                      <span>Sourate {entry.surahName} (v. {entry.verseNumber})</span>
                    </div>
                  </div>

                  <span className="text-xl">🏜️</span>
                </div>

                {/* 1. Original Desert Meaning (Chamelier) */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Chez le chamelier & dans le désert préislamique :</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pl-5">
                    {entry.desertOriginalMeaning}
                  </p>
                </div>

                {/* 2. Quranic Spiritual Elevation */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Élévation coranique & sens spirituel :</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pl-5">
                    {entry.quranicElevation}
                  </p>
                </div>

                {/* 3. Pedagogical Mental Image */}
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/30 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                  <span className="text-base shrink-0">💡</span>
                  <div>
                    <span className="font-bold">Image mentale pour mémoriser : </span>
                    <span>{entry.mentalImage}</span>
                  </div>
                </div>

                {/* Source stamp */}
                <div className="pt-2 flex items-center justify-between text-[10px] text-stone-400 dark:text-stone-500 border-t border-stone-100 dark:border-stone-800">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Source : {entry.verifiedSource}
                  </span>
                  <span className="italic">Vérifié par le Comité Philologique</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-[#16261E]/50 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 dark:text-stone-400">
            {filteredEntries.length} terme(s) certifié(s) dans le corpus
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#14332A] hover:bg-[#1F4D3D] text-[#FAF6EC] dark:bg-[#C9A24B] dark:hover:bg-[#d6b059] dark:text-[#14332A] font-bold text-xs transition-colors"
          >
            Fermer le dictionnaire
          </button>
        </div>
      </div>
    </div>
  );
};
