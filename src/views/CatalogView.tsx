import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  Filter,
  X,
  Award,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Circle,
  LayoutList,
  Rows,
  Layers,
  BookOpen,
  Scroll,
  LayoutGrid,
  List,
  Check
} from 'lucide-react';
import { Surah, SurahCategory, UserProgress } from '../types';
import { ALL_SURAHS, CATEGORIES_INFO } from '../data/surahs';
import { SurahRow } from '../components/SurahRow';
import { useAudio } from '../context/AudioContext';

interface CatalogViewProps {
  progress: UserProgress;
  onSelectSurah: (surah: Surah, tab?: 'verses' | 'test') => void;
  onMemorizeSurah: (surah: Surah) => void;
  onOpenQuiz?: (surah: Surah) => void;
}

type SortOrder = 'mushaf' | 'hifz' | 'verses';
type StatusFilter = 'all' | 'memorized' | 'in_progress' | 'todo';

export const CatalogView: React.FC<CatalogViewProps> = ({
  progress,
  onSelectSurah,
  onMemorizeSurah,
  onOpenQuiz
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SurahCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('mushaf');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [categoryLayout, setCategoryLayout] = useState<'vertical' | 'grid'>('vertical');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'indispensables':
        return BookOpen;
      case 'coeur':
        return Sparkles;
      case 'recits':
        return Scroll;
      case 'grandes':
        return Award;
      default:
        return Layers;
    }
  };

  const { currentSurah, isPlaying, playSurah, pause, resume } = useAudio();

  const memorizedCount = progress.memorizedSurahIds.length;
  const inProgressCount = progress.inProgressSurahIds.length;
  const todoCount = 37 - memorizedCount - inProgressCount;
  const progressPercent = Math.round((memorizedCount / 37) * 100);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; memorized: number }> = {
      all: { total: 37, memorized: memorizedCount }
    };
    CATEGORIES_INFO.forEach(cat => {
      const surahsInCat = ALL_SURAHS.filter(s => s.category === cat.id);
      const memInCat = surahsInCat.filter(s => progress.memorizedSurahIds.includes(s.id)).length;
      stats[cat.id] = { total: surahsInCat.length, memorized: memInCat };
    });
    return stats;
  }, [progress.memorizedSurahIds, memorizedCount]);

  const filteredAndSortedSurahs = useMemo(() => {
    let result = ALL_SURAHS.filter(surah => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || surah.category === selectedCategory;

      // Status filter
      let matchesStatus = true;
      const isMem = progress.memorizedSurahIds.includes(surah.id);
      const isInProg = progress.inProgressSurahIds.includes(surah.id);

      if (statusFilter === 'memorized') matchesStatus = isMem;
      else if (statusFilter === 'in_progress') matchesStatus = isInProg;
      else if (statusFilter === 'todo') matchesStatus = !isMem && !isInProg;

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        surah.nameTranslit.toLowerCase().includes(q) ||
        surah.nameFrench.toLowerCase().includes(q) ||
        surah.nameArabic.includes(q) ||
        surah.id.toString() === q;

      return matchesCategory && matchesStatus && matchesSearch;
    });

    // Sorting
    if (sortOrder === 'hifz') {
      // Traditional reverse pedagogical order (114 -> 78: shortest to longest)
      result = [...result].sort((a, b) => b.id - a.id);
    } else if (sortOrder === 'verses') {
      result = [...result].sort((a, b) => b.versesCount - a.versesCount);
    } else {
      // Standard Quranic order (78 -> 114)
      result = [...result].sort((a, b) => a.id - b.id);
    }

    return result;
  }, [selectedCategory, statusFilter, sortOrder, searchQuery, progress]);

  return (
    <div id="catalog-view-container" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28">
      {/* 1. WELCOME & PROGRESS BANNER */}
      <div className="w-full rounded-3xl bg-gradient-to-r from-[#14332A] to-[#1F4D3D] text-[#FAF6EC] p-5 sm:p-7 border-2 border-[#C9A24B]/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full bg-[#C9A24B]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A24B] text-[#14332A] text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4 text-[#14332A]" />
              <span>JUZ 'AMMA (JUZ 30) • LECTURE WARSH AUTHENTIQUE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
              Index des 37 Sourates
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF6EC]/85 leading-relaxed">
              Présentation linéaire épurée : naviguez, écoutez et mémorisez chaque sourate de la 78 (An-Naba) à la 114 (An-Nas) avec lecture Warsh authentique.
            </p>
          </div>

          {/* Progress Gauge */}
          <div className="w-full md:w-64 bg-[#14332A]/80 rounded-2xl p-4 border border-[#C9A24B]/40 backdrop-blur-sm shrink-0 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-[#FAF6EC]/85 uppercase tracking-wider text-[10px]">Progression Hifz</span>
              <span className="text-[#C9A24B] font-mono">{memorizedCount} / 37 ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/10">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-[#C9A24B] to-[#e4be65] rounded-full transition-all duration-500 shadow-sm"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#FAF6EC]/70 mt-2">
              <span>{37 - memorizedCount} sourates restantes</span>
              <Award className="w-3.5 h-3.5 text-[#C9A24B]" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & CONTROLS BAR */}
      <div className="w-full space-y-3">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="catalog-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, numéro (ex: 112), arabe (الإخلاص) ou traduction (L'Aube)..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white dark:bg-[#16221C] border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] text-sm text-[#14332A] dark:text-[#FAF6EC] shadow-xs placeholder:text-stone-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Section - Aligned vertically one below the other with layout toggle */}
        <div className="surface p-3 sm:p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C9A24B]" />
              <h2 className="text-xs font-black uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Périmètres de Mémorisation
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-[11px] font-bold text-[#C9A24B] hover:underline mr-2"
                >
                  Afficher tout le Juz (37)
                </button>
              )}

              {/* View Layout Switch: Aligné verticalement vs Grille */}
              <div className="inline-flex items-center p-0.5 rounded-lg bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 text-[11px]">
                <button
                  type="button"
                  onClick={() => setCategoryLayout('vertical')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                    categoryLayout === 'vertical'
                      ? 'bg-white dark:bg-[#14332A] text-[#14332A] dark:text-[#FAF6EC] shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                  title="Aligner les catégories l'une sous l'autre"
                >
                  <List className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span className="hidden sm:inline">Aligné</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryLayout('grid')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                    categoryLayout === 'grid'
                      ? 'bg-white dark:bg-[#14332A] text-[#14332A] dark:text-[#FAF6EC] shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                  title="Afficher sous forme de grille compacte"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span className="hidden sm:inline">Grille</span>
                </button>
              </div>
            </div>
          </div>

          {/* MODE 1: VERTICAL STACK ("aligné les un dessous de l'autre") */}
          {categoryLayout === 'vertical' ? (
            <div className="flex flex-col space-y-2">
              {/* All surahs row */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between gap-3 ${
                  selectedCategory === 'all'
                    ? 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] shadow-sm ring-1 ring-[#C9A24B]/50'
                    : 'bg-white dark:bg-[#16221C] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-[#C9A24B]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedCategory === 'all'
                      ? 'bg-[#C9A24B]/20 text-[#C9A24B]'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}>
                    <Layers className="w-4 h-4 text-[#C9A24B]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-extrabold">Ensemble du Juz 'Amma</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                        selectedCategory === 'all'
                          ? 'bg-[#C9A24B]/20 text-[#C9A24B]'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}>
                        Sourates 78 à 114 · 37 sourates
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 truncate hidden sm:block ${
                      selectedCategory === 'all' ? 'text-[#FAF6EC]/80' : 'text-stone-500 dark:text-stone-400'
                    }`}>
                      Vue intégrale sur les 37 sourates du 30ème Juz pour un apprentissage libre ou global.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold block">
                      {memorizedCount} / 37
                    </span>
                    <span className="text-[10px] opacity-70 block hidden sm:block">mémorisées</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    selectedCategory === 'all'
                      ? 'border-[#C9A24B] bg-[#C9A24B] text-[#14332A]'
                      : 'border-stone-300 dark:border-stone-700'
                  }`}>
                    {selectedCategory === 'all' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </button>

              {/* Individual Category Rows */}
              {CATEGORIES_INFO.map(cat => {
                const isSelected = selectedCategory === cat.id;
                const catStat = categoryStats[cat.id] || { total: 0, memorized: 0 };
                const Icon = getCategoryIcon(cat.id);
                const isAllMemorized = catStat.memorized === catStat.total && catStat.total > 0;
                const percentage = catStat.total > 0 ? Math.round((catStat.memorized / catStat.total) * 100) : 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] shadow-sm ring-1 ring-[#C9A24B]/50'
                        : 'bg-white dark:bg-[#16221C] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-[#C9A24B]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#C9A24B]/20 text-[#C9A24B]'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}>
                        <Icon className="w-4 h-4 text-[#C9A24B]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-extrabold">{cat.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                            isSelected
                              ? 'bg-[#C9A24B]/20 text-[#C9A24B]'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}>
                            Sourates {cat.range} · {cat.countText}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 truncate hidden sm:block ${
                          isSelected ? 'text-[#FAF6EC]/80' : 'text-stone-500 dark:text-stone-400'
                        }`}>
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className={`text-xs font-mono font-bold block ${
                          isAllMemorized ? 'text-emerald-500' : ''
                        }`}>
                          {catStat.memorized} / {catStat.total}
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden mt-1 hidden sm:block">
                          <div
                            className={`h-full transition-all ${
                              isAllMemorized ? 'bg-emerald-500' : 'bg-[#C9A24B]'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'border-[#C9A24B] bg-[#C9A24B] text-[#14332A]'
                          : 'border-stone-300 dark:border-stone-700'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* MODE 2: GRID COMPACTE */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-2.5 rounded-xl text-left transition-all border flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] shadow-sm ring-1 ring-[#C9A24B]/40'
                    : 'bg-white dark:bg-[#16221C] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-[#C9A24B]/40'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                    <span className="text-xs font-extrabold truncate">Toutes</span>
                  </div>
                  <p className="text-[10px] opacity-70 mt-0.5 font-medium">Sourates 78 à 114</p>
                </div>
                <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/10 dark:bg-white/10 shrink-0 font-mono">
                  {memorizedCount}/37
                </span>
              </button>

              {CATEGORIES_INFO.map(cat => {
                const isSelected = selectedCategory === cat.id;
                const catStat = categoryStats[cat.id] || { total: 0, memorized: 0 };
                const Icon = getCategoryIcon(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                    className={`p-2.5 rounded-xl text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] shadow-sm ring-1 ring-[#C9A24B]/40'
                        : 'bg-white dark:bg-[#16221C] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-[#C9A24B]/40'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                        <span className="text-xs font-extrabold truncate">{cat.title}</span>
                      </div>
                      <p className="text-[10px] opacity-70 mt-0.5 font-medium truncate">
                        {cat.countText} · {cat.range}
                      </p>
                    </div>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 font-mono ${
                      catStat.memorized === catStat.total && catStat.total > 0
                        ? 'bg-emerald-500/20 text-emerald-400 font-black'
                        : 'bg-black/10 dark:bg-white/10'
                    }`}>
                      {catStat.memorized}/{catStat.total}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Sub-bar: Status filters + Sort selector + Density toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 border-t border-stone-100 dark:border-stone-800/80">
          {/* Status Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1 hidden sm:inline">
              Statut :
            </span>
            {[
              { id: 'all', label: 'Toutes', count: 37 },
              { id: 'memorized', label: 'Mémorisées', count: memorizedCount, icon: CheckCircle2, color: 'text-emerald-600' },
              { id: 'in_progress', label: 'En cours', count: inProgressCount, icon: Clock, color: 'text-amber-600' },
              { id: 'todo', label: 'À apprendre', count: Math.max(0, todoCount), icon: Circle, color: 'text-stone-400' }
            ].map(tab => {
              const isActive = statusFilter === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id as StatusFilter)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#14332A] text-[#FAF6EC] shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                  }`}
                >
                  {Icon && <Icon className={`w-3 h-3 ${tab.color || ''}`} />}
                  <span>{tab.label}</span>
                  <span className="opacity-75 font-mono text-[10px]">({tab.count})</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Sort + Compact Mode */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Dropdown / Selector */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                id="catalog-sort-select"
                aria-label="Trier les sourates"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value as SortOrder)}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#16221C] border border-stone-200 dark:border-stone-700 text-xs font-bold text-[#14332A] dark:text-[#FAF6EC] focus:outline-none focus:ring-1 focus:ring-[#C9A24B]"
              >
                <option value="mushaf">Ordre Mushaf (78 ➔ 114)</option>
                <option value="hifz">Ordre Hifz (114 ➔ 78)</option>
                <option value="verses">Nombre de versets (Décroissant)</option>
              </select>
            </div>

            {/* Density Toggle */}
            <button
              onClick={() => setIsCompact(!isCompact)}
              title={isCompact ? 'Passer en affichage étendu' : 'Passer en affichage compact'}
              className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#16221C] text-stone-600 dark:text-stone-300 hover:text-[#C9A24B] transition-colors"
            >
              {isCompact ? <LayoutList className="w-4 h-4" /> : <Rows className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE CATEGORY BANNER (If filtered) */}
      {selectedCategory !== 'all' && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between w-full shadow-2xs">
          <div>
            <span className="font-bold">
              {CATEGORIES_INFO.find(c => c.id === selectedCategory)?.title}
            </span>
            <span className="mx-2">•</span>
            <span>{CATEGORIES_INFO.find(c => c.id === selectedCategory)?.description}</span>
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-amber-700 dark:text-amber-400 hover:underline font-bold shrink-0 ml-2"
          >
            Afficher toutes
          </button>
        </div>
      )}

      {/* 4. RESULTS COUNT BAR */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1 w-full font-medium">
        <span>
          <strong className="text-[#14332A] dark:text-[#FAF6EC] font-bold">
            {filteredAndSortedSurahs.length}
          </strong>{' '}
          sourate{filteredAndSortedSurahs.length > 1 ? 's' : ''} affichée{filteredAndSortedSurahs.length > 1 ? 's' : ''} sous forme de lignes
        </span>
        <span className="hidden sm:inline">Juz 30 • 566 versets (comptage Warsh)</span>
      </div>

      {/* 5. LINEAR VERTICAL LIST: SOURATES ALIGNÉES EN LIGNES LES UNES SOUS LES AUTRES */}
      <div
        id="surahs-linear-list"
        className="flex flex-col space-y-2.5 sm:space-y-3 w-full"
      >
        {filteredAndSortedSurahs.length > 0 ? (
          filteredAndSortedSurahs.map(surah => {
            const isMemorized = progress.memorizedSurahIds.includes(surah.id);
            const isInProgress = progress.inProgressSurahIds.includes(surah.id);
            const isCurrentlyPlaying = isPlaying && currentSurah?.id === surah.id;

            return (
              <SurahRow
                key={surah.id}
                surah={surah}
                isMemorized={isMemorized}
                isInProgress={isInProgress}
                isCurrentlyPlaying={isCurrentlyPlaying}
                onOpenSurah={onSelectSurah}
                onPlayAudio={s => {
                  if (isCurrentlyPlaying) {
                    pause();
                  } else if (currentSurah?.id === s.id) {
                    resume();
                  } else {
                    playSurah(s.id);
                  }
                }}
                onMemorize={onMemorizeSurah}
                onOpenQuiz={onOpenQuiz || (s => onSelectSurah(s, 'test'))}
                compact={isCompact}
              />
            );
          })
        ) : (
          <div className="w-full p-12 text-center rounded-3xl bg-white dark:bg-[#16221C] border border-stone-200 dark:border-stone-800 space-y-3">
            <p className="text-base font-bold text-stone-600 dark:text-stone-300">
              Aucune sourate ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setStatusFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#C9A24B] text-[#14332A] font-bold text-xs shadow-sm hover:bg-[#d8b056]"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
