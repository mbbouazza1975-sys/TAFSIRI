import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2, Download, Check, ChevronUp, UserCheck } from 'lucide-react';
import { useAudio, RepeatCountMode } from '../context/AudioContext';
import { WARSH_RECITERS } from '../data/reciters';
import { ReciterSelectModal } from './ReciterSelectModal';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const AudioPlayerBar: React.FC = () => {
  const {
    currentSurah,
    currentReciter,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    repeatMode,
    repeatCounter,
    isCached,
    isDownloading,
    currentVerseNumber,
    isVerseMode,
    togglePlay,
    seek,
    setSpeed,
    setRepeatMode,
    setReciter,
    nextSurah,
    prevSurah,
    downloadCurrentForOffline
  } = useAudio();

  const [showRecitersModal, setShowRecitersModal] = useState(false);

  if (!currentSurah) return null;

  const repeatOptions: RepeatCountMode[] = ['1', '2', '3', '5', '10', 'loop'];
  const speedOptions = [0.75, 1, 1.25, 1.5];

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

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

  return (
    <>
      <div
        id="global-audio-bar"
        className="fixed bottom-14 md:bottom-0 left-0 right-0 z-30 backdrop-blur-xl bg-[#14332A]/95 dark:bg-[#0D1914]/95 text-[#FAF6EC] border-t-2 border-[#C9A24B]/50 shadow-[0_-12px_40px_rgba(0,0,0,0.4)] px-3 sm:px-6 py-2.5 sm:py-3 transition-all"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          {/* Main Controls Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Surah & Reciter Info */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 w-1/3 sm:w-1/4">
              <button
                onClick={() => setShowRecitersModal(true)}
                title="Changer de Récitateur Warsh"
                className="w-10 h-10 rounded-2xl border border-[#C9A24B]/40 flex items-center justify-center text-white shrink-0 hover:border-[#C9A24B] hover:scale-105 transition-all bg-[#C9A24B]/10 shadow-inner group"
              >
                <span className="text-xs font-quran text-[#C9A24B] group-hover:scale-110 transition-transform">
                  ورش
                </span>
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#C9A24B] uppercase tracking-wider font-mono font-bold block truncate">
                    {isVerseMode && currentVerseNumber
                      ? `Verset ${currentVerseNumber} · Sourate ${currentSurah.id}`
                      : `Warsh · Sourate ${currentSurah.id}`}
                  </span>
                  {isPlaying && (
                    <div className="hidden sm:flex items-end gap-0.5 h-3 shrink-0" title="Audio actif">
                      <span className="w-0.5 h-2 bg-[#C9A24B] rounded-full animate-pulse" />
                      <span className="w-0.5 h-3 bg-[#C9A24B] rounded-full animate-bounce" />
                      <span className="w-0.5 h-1.5 bg-[#C9A24B] rounded-full animate-pulse" />
                      <span className="w-0.5 h-2.5 bg-[#C9A24B] rounded-full animate-bounce" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-extrabold truncate text-white">
                    {isVerseMode && currentVerseNumber
                      ? `${currentSurah.nameTranslit} · V.${currentVerseNumber}`
                      : currentSurah.nameTranslit}
                  </h4>
                  <span className="font-quran text-xs text-[#C9A24B] hidden lg:inline">
                    {currentSurah.nameArabic}
                  </span>
                </div>
                <button
                  onClick={() => setShowRecitersModal(true)}
                  className="text-[11px] text-stone-300 hover:text-[#C9A24B] transition-colors flex items-center gap-1 truncate font-medium"
                >
                  <span className="truncate">{currentReciter.name}</span>
                  <ChevronUp className="w-3 h-3 text-[#C9A24B] shrink-0" />
                </button>
              </div>
            </div>

            {/* Center Controls & Slider */}
            <div className="flex-1 flex flex-col items-center gap-1.5 max-w-lg">
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={cycleRepeat}
                  title="Changer le mode de répétition"
                  className="text-white/60 hover:text-[#C9A24B] text-base transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={prevSurah}
                  title="Sourate précédente"
                  className="text-white/70 hover:text-white text-base transition-colors"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  id="audio-play-pause-btn"
                  onClick={togglePlay}
                  title={isPlaying ? 'Pause' : 'Lecture'}
                  className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-b from-[#E6CA65] via-[#C9A24B] to-[#AA7C11] text-[#14332A] rounded-2xl flex items-center justify-center hover:brightness-110 transition-all transform active:scale-95 shadow-[0_4px_16px_rgba(201,162,75,0.4)] shrink-0 border border-[#FFFDF7]/40"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={nextSurah}
                  title="Sourate suivante"
                  className="text-white/70 hover:text-white text-base transition-colors"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => setShowRecitersModal(true)}
                  title="Sélectionner récitateur"
                  className="text-white/60 hover:text-[#C9A24B] text-base transition-colors"
                >
                  <UserCheck className="w-4 h-4" />
                </button>
              </div>

              {/* Slider Row */}
              <div className="flex items-center gap-2.5 w-full sm:w-4/5 text-[9px] text-white/60 font-mono">
                <span className="w-8 text-right">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#C9A24B]"
                />
                <span className="w-8">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Tools: Repeat, Speed, Offline Cache */}
            <div className="w-1/3 sm:w-1/4 flex items-center justify-end gap-2">
              {/* Repeat Mode Chip */}
              <button
                onClick={cycleRepeat}
                title={`Répétition : ${repeatMode === 'loop' ? 'En boucle' : `${repeatMode} fois`}${repeatMode !== '1' ? ` (Tour ${repeatCounter})` : ''}`}
                className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border transition-colors ${
                  repeatMode !== '1'
                    ? 'bg-[#C9A24B]/25 border-[#C9A24B]/60 text-[#C9A24B]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                }`}
              >
                <span className="text-[9px] opacity-60 font-bold tracking-tight">RÉP.</span>
                <span className="text-[10px] font-bold">
                  {repeatMode === 'loop' ? '∞' : isPlaying && repeatMode !== '1' ? `${repeatCounter}/${repeatMode}` : `x${repeatMode}`}
                </span>
              </button>

              {/* Playback Speed Chip */}
              <button
                onClick={cycleSpeed}
                title="Vitesse de lecture (0.75x, 1x, 1.25x, 1.5x)"
                className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border transition-colors ${
                  playbackSpeed !== 1
                    ? 'bg-[#C9A24B]/25 border-[#C9A24B]/60 text-[#C9A24B]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                }`}
              >
                <span className="text-[9px] opacity-60 font-bold tracking-tight">VIT.</span>
                <span className="text-[10px] font-bold">{playbackSpeed}x</span>
              </button>

              {/* Offline Cache Download Button */}
              <button
                onClick={downloadCurrentForOffline}
                disabled={isCached || isDownloading}
                title={isCached ? 'Audio disponible hors-ligne' : 'Télécharger pour écoute hors-ligne'}
                className={`p-1.5 rounded-lg text-xs font-medium border flex items-center gap-1 transition-colors ${
                  isCached
                    ? 'bg-emerald-900/50 border-emerald-500/50 text-emerald-300'
                    : isDownloading
                    ? 'border-amber-500/50 text-amber-300 animate-pulse'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                }`}
              >
                {isCached ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reciters Selection Modal (Shared, handles Escape, outside click, and item selection) */}
      <ReciterSelectModal
        isOpen={showRecitersModal}
        onClose={() => setShowRecitersModal(false)}
        selectedReciterId={currentReciter.id}
        onSelectReciter={id => setReciter(id)}
      />
    </>
  );
};
