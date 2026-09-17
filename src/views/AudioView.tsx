import React, { useState } from 'react';
import { Volume2, Play, Pause, Download, Check, Sparkles, Filter, Music, RotateCcw, Gauge } from 'lucide-react';
import { Surah, SurahCategory } from '../types';
import { ALL_SURAHS, CATEGORIES_INFO } from '../data/surahs';
import { WARSH_RECITERS } from '../data/reciters';
import { useAudio, RepeatCountMode } from '../context/AudioContext';

export const AudioView: React.FC = () => {
  const {
    currentSurah,
    currentReciter,
    isPlaying,
    playSurah,
    togglePlay,
    setReciter,
    playbackSpeed,
    setSpeed,
    repeatMode,
    setRepeatMode,
    repeatCounter,
    downloadCurrentForOffline,
    isCached,
    isDownloading
  } = useAudio();

  const [selectedCategory, setSelectedCategory] = useState<SurahCategory | 'all'>('all');

  const speedOptions = [
    { value: 0.75, label: '0.75x', hint: 'Lent (Hifz)' },
    { value: 1, label: '1.0x', hint: 'Normal' },
    { value: 1.25, label: '1.25x', hint: 'Fluide' },
    { value: 1.5, label: '1.5x', hint: 'Rapide' }
  ];

  const repeatOptions: { mode: RepeatCountMode; label: string; hint: string }[] = [
    { mode: '1', label: '1x', hint: 'Une fois' },
    { mode: '2', label: '2x', hint: '2 écoutes' },
    { mode: '3', label: '3x', hint: '3 répétitions' },
    { mode: '5', label: '5x', hint: '5 répétitions' },
    { mode: 'loop', label: '∞', hint: 'En boucle' }
  ];

  const filteredSurahs = selectedCategory === 'all'
    ? ALL_SURAHS
    : ALL_SURAHS.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28">
      {/* Header Banner */}
      <div className="w-full rounded-3xl bg-gradient-to-br from-[#14332A] via-[#1F4D3D] to-[#122b22] text-[#FAF6EC] p-5 sm:p-7 border border-[#C9A24B]/30 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/30 text-xs font-bold uppercase tracking-wider">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Écoute Continue & Récitateurs Warsh</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Lecteur Audio Warsh 'an Nâfi'
        </h1>
        <p className="text-xs sm:text-sm text-[#FAF6EC]/80 leading-relaxed max-w-2xl">
          Les 37 sourates du Juz 'Amma en récitation authentique. Choisissez votre récitateur de référence et téléchargez les sourates pour une écoute sans connexion internet.
        </p>
      </div>

      {/* Reciter Selector Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#14332A] dark:text-[#FAF6EC] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C9A24B]" />
          <span>Choisissez votre Récitateur Warsh vérifié :</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {WARSH_RECITERS.map(reciter => {
            const isSelected = currentReciter.id === reciter.id;
            return (
              <div
                key={reciter.id}
                onClick={() => setReciter(reciter.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#1F4D3D]/15 dark:bg-[#1F4D3D]/40 border-[#C9A24B] ring-2 ring-[#C9A24B]/40 shadow-sm'
                    : 'bg-white/80 dark:bg-[#16221C] border-stone-200 dark:border-stone-800 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#14332A] dark:text-[#FAF6EC]">
                      {reciter.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-ping" />
                    )}
                  </div>
                  <p className="font-quran text-xs text-[#C9A24B] mt-0.5">{reciter.subname}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold self-start">
                  {reciter.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speed & Repetition Controls Panel */}
      <div className="w-full rounded-2xl p-4 sm:p-5 bg-white/90 dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#C9A24B]" />
            <h3 className="font-bold text-sm text-[#14332A] dark:text-[#FAF6EC]">
              Paramètres d'écoute & Répétition (Hifz)
            </h3>
          </div>
          {currentSurah && (
            <span className="text-[11px] font-semibold text-[#C9A24B] px-2.5 py-0.5 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/20">
              Sourate en cours : {currentSurah.nameTranslit} ({currentSurah.nameArabic})
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Speed Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span>Vitesse de récitation :</span>
              </span>
              <span className="font-mono font-bold text-[#C9A24B]">{playbackSpeed}x</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {speedOptions.map(opt => {
                const isActive = playbackSpeed === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSpeed(opt.value)}
                    className={`py-2 px-1 rounded-xl text-center transition-all border flex flex-col items-center justify-center ${
                      isActive
                        ? 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] shadow-sm ring-1 ring-[#C9A24B]'
                        : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-[#C9A24B]/40'
                    }`}
                  >
                    <span className="text-xs font-bold">{opt.label}</span>
                    <span className="text-[9px] opacity-70 hidden sm:inline">{opt.hint}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Repeat Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Répétition de la sourate :</span>
              </span>
              <span className="font-mono font-bold text-[#C9A24B]">
                {repeatMode === 'loop' ? 'En boucle (∞)' : `${repeatMode} fois`}
                {repeatMode !== '1' && isPlaying && ` (Tour ${repeatCounter})`}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {repeatOptions.map(opt => {
                const isActive = repeatMode === opt.mode;
                return (
                  <button
                    key={opt.mode}
                    onClick={() => setRepeatMode(opt.mode)}
                    className={`py-2 px-1 rounded-xl text-center transition-all border flex flex-col items-center justify-center ${
                      isActive
                        ? 'bg-[#C9A24B] text-[#14332A] font-bold border-[#C9A24B] shadow-sm'
                        : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-[#C9A24B]/40'
                    }`}
                  >
                    <span className="text-xs font-bold">{opt.label}</span>
                    <span className="text-[9px] opacity-70 truncate max-w-full px-0.5">{opt.hint}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            selectedCategory === 'all'
              ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm'
              : 'bg-white dark:bg-[#16221C] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Toutes (37)</span>
        </button>

        {CATEGORIES_INFO.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] shadow-sm'
                : 'bg-white dark:bg-[#16221C] text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-400'
            }`}
          >
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Playlist Grid / List */}
      <div className="space-y-2.5 w-full">
        {filteredSurahs.map(surah => {
          const isThisPlaying = isPlaying && currentSurah?.id === surah.id;
          return (
            <div
              key={surah.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isThisPlaying
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-[#C9A24B] shadow-sm'
                  : 'bg-white/80 dark:bg-[#16221C] border-stone-200 dark:border-stone-800 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => {
                    if (isThisPlaying) {
                      togglePlay();
                    } else {
                      playSurah(surah.id);
                    }
                  }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isThisPlaying
                      ? 'bg-[#C9A24B] text-[#14332A] shadow-md'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-[#C9A24B]/20 hover:text-[#14332A]'
                  }`}
                >
                  {isThisPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#C9A24B]">
                      {String(surah.id).padStart(3, '0')}
                    </span>
                    <h4 className="text-sm font-bold text-[#14332A] dark:text-[#FAF6EC] truncate">
                      {surah.nameTranslit}
                    </h4>
                    <span className="text-xs text-stone-400 hidden sm:inline">({surah.nameFrench})</span>
                  </div>
                  <span className="text-[11px] text-stone-500 block">
                    {surah.type} • {surah.versesCount} versets
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {isThisPlaying && (
                  <div className="flex items-end gap-0.5 h-5 px-2">
                    <span className="w-1 bg-[#C9A24B] rounded-full animate-audio-bar-1" />
                    <span className="w-1 bg-[#C9A24B] rounded-full animate-audio-bar-2" />
                    <span className="w-1 bg-[#C9A24B] rounded-full animate-audio-bar-3" />
                    <span className="w-1 bg-[#C9A24B] rounded-full animate-audio-bar-4" />
                  </div>
                )}
                <span className="font-quran text-2xl text-[#14332A] dark:text-[#C9A24B]">
                  {surah.nameArabic}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
