import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { Surah, Reciter } from '../types';
import { WARSH_RECITERS, normalizeReciterId, getSurahAudioUrl, getVerseAudioSegments, VerseAudioSegment } from '../data/reciters';
import { ALL_SURAHS, getSurahById } from '../data/surahs';
import { getVerse1BismillahOffset } from '../data/bismillahTimings';
import { getCachedAudioUrl, isSurahAudioCached, cacheSurahAudio } from '../services/storage';

export type RepeatCountMode = '1' | '2' | '3' | '5' | '10' | 'loop';

interface AudioContextType {
  currentSurah: Surah | null;
  currentReciter: Reciter;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  repeatMode: RepeatCountMode;
  repeatCounter: number;
  isCached: boolean;
  isDownloading: boolean;
  currentVerseNumber: number | null;
  currentWordIndex: number | null;
  isRecitingBismillah: boolean;
  isVerseMode: boolean;
  syncWordHighlight: (verseNum?: number) => void;
  playSurah: (surahId: number, reciterId?: string) => Promise<void>;
  playVerse: (surahId: number, verseNumber: number, reciterId?: string) => Promise<void>;
  stopVerse: () => void;
  pause: () => void;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (seconds: number) => void;
  seekToWord: (surahId: number, verseNumber: number, wordIdx: number) => Promise<void>;
  setSpeed: (speed: number) => void;
  setRepeatMode: (mode: RepeatCountMode) => void;
  setReciter: (reciterId: string) => Promise<void>;
  nextSurah: () => void;
  prevSurah: () => void;
  downloadCurrentForOffline: () => Promise<boolean>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial preferences from localStorage if available
  const initialReciter = normalizeReciterId(localStorage.getItem('warsh_reciter_id'));
  const initialSpeed = parseFloat(localStorage.getItem('warsh_playback_speed') || '1') || 1;
  const initialRepeat = (localStorage.getItem('warsh_repeat_mode') as RepeatCountMode) || '1';

  const [currentSurahId, setCurrentSurahId] = useState<number | null>(null);
  const [currentVerseNumber, setCurrentVerseNumber] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [isRecitingBismillah, setIsRecitingBismillah] = useState<boolean>(false);
  const [isVerseMode, setIsVerseMode] = useState<boolean>(false);
  const [reciterId, setReciterId] = useState<string>(initialReciter);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(initialSpeed);
  const [repeatMode, setRepeatModeState] = useState<RepeatCountMode>(initialRepeat);
  const [repeatCounter, setRepeatCounter] = useState<number>(1);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Synchronized refs to avoid recreating Audio element on state updates
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const repeatModeRef = useRef<RepeatCountMode>(initialRepeat);
  const repeatCounterRef = useRef<number>(1);
  const playbackSpeedRef = useRef<number>(initialSpeed);
  const reciterIdRef = useRef<string>(initialReciter);
  const currentSurahIdRef = useRef<number | null>(null);
  const currentVerseNumberRef = useRef<number | null>(null);
  const currentWordIndexRef = useRef<number | null>(null);
  const isRecitingBismillahRef = useRef<boolean>(false);
  const isVerseModeRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);
  const isTransitioningRef = useRef<boolean>(false);
  const highlightIntervalRef = useRef<any>(null);
  // Lecture par segments (comptage madanî de Warsh vs fichiers everyayah en numérotation Hafs)
  const segmentsRef = useRef<VerseAudioSegment[]>([]);
  const segmentIdxRef = useRef<number>(0);
  const segmentEndHandledRef = useRef<boolean>(false);
  const segmentEndHandlerRef = useRef<(() => void) | null>(null);

  const currentSegment = (): VerseAudioSegment =>
    segmentsRef.current[segmentIdxRef.current] || { url: '', from: 0, to: 1, vFrom: 0, vTo: 1 };

  /** Début / fin absolus (s) d'un segment ; fin = Infinity si le segment va jusqu'au bout du fichier. */
  const segStartSec = (seg: VerseAudioSegment, dur: number) => seg.startSec ?? seg.from * dur;
  const segEndSec = (seg: VerseAudioSegment, dur: number) => seg.endSec ?? (seg.to < 1 ? seg.to * dur : Infinity);
  const segIsPartial = (seg: VerseAudioSegment | undefined) => !!seg && (seg.endSec !== undefined || seg.to < 1);

  /** Charge le segment i dans l'élément audio et se place au début de sa portion. */
  const loadSegment = (audio: HTMLAudioElement, i: number) => {
    const seg = segmentsRef.current[i];
    segmentIdxRef.current = i;
    segmentEndHandledRef.current = false;
    audio.defaultPlaybackRate = playbackSpeedRef.current;
    audio.playbackRate = playbackSpeedRef.current;
    if (seg.startSec !== undefined) {
      // Fichier sourate entière minuté : si déjà chargé, simple déplacement (enchaînement sans coupure)
      if (audio.src === seg.url && audio.readyState >= 1) {
        audio.currentTime = seg.startSec;
      } else {
        audio.src = seg.url;
        audio.load();
        const start = seg.startSec;
        audio.addEventListener('loadedmetadata', () => { audio.currentTime = start; }, { once: true });
      }
      return;
    }
    audio.src = seg.url;
    audio.load();
    if (seg.from > 0) {
      const setStart = () => {
        if (audio.duration && Number.isFinite(audio.duration)) {
          audio.currentTime = seg.from * audio.duration;
        }
      };
      audio.addEventListener('loadedmetadata', setStart, { once: true });
    }
  };

  const currentSurah = currentSurahId ? getSurahById(currentSurahId) || null : null;
  const currentReciter = WARSH_RECITERS.find(r => r.id === reciterId) || WARSH_RECITERS[0];

  /**
   * Warsh phonetic timing weights for each word in the verse.
   * Prolongations (Madd) and nasalizations (Ghunna) are weighted proportionally.
   */
  const computeVerseWordWeights = useCallback((verseText: string): number[] => {
    const clean = verseText.replace(/<[^>]*>/g, '').trim();
    const words = clean.split(/\s+/).filter(Boolean);
    if (!words.length) return [1];

    return words.map(w => {
      const rootLetters = w.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');
      let weight = Math.max(1.3, rootLetters.length * 1.15);
      // Madd: ٓ or آ (4-6 beats elongation)
      if (w.includes('ٓ') || w.includes('آ')) weight += 4.5;
      // Ghunna: Shaddah on Noon / Meem or Tanwin
      if (/(?:نّ|مّ|[ًٌٍٖٗٞ])/.test(w)) weight += 2.8;
      // Qalqala: قطبجد with Sukun
      if (/[قطبجد]ْ/.test(w) || /[قطبجد]$/.test(w)) weight += 1.4;
      return weight;
    });
  }, []);

  const computeVerseWordThresholds = useCallback((weights: number[]): number[] => {
    const total = weights.reduce((acc, v) => acc + v, 0);
    const thresholds: number[] = [];
    let running = 0;
    for (let i = 0; i < weights.length; i++) {
      running += weights[i];
      thresholds.push(running / total);
    }
    return thresholds;
  }, []);

  const clearWordHighlight = useCallback(() => {
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current);
      highlightIntervalRef.current = null;
    }
    currentWordIndexRef.current = null;
    setCurrentWordIndex(null);
    isRecitingBismillahRef.current = false;
    setIsRecitingBismillah(false);
    document.querySelectorAll('.w-word.hl').forEach(el => el.classList.remove('hl'));
  }, []);

  const startHighlightTracker = useCallback((targetVerseNum?: number) => {
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current);
      highlightIntervalRef.current = null;
    }

    const updateTracker = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!isPlayingRef.current) {
        return;
      }

      const dur = audio.duration;
      if (audio.paused || !dur || Number.isNaN(dur) || dur <= 0) {
        return;
      }

      const surahId = currentSurahIdRef.current;
      const verseNum = targetVerseNum || currentVerseNumberRef.current;
      if (!surahId || !verseNum) return;

      const surah = getSurahById(surahId);
      const verse = surah?.verses[verseNum - 1];
      if (!verse) return;

      // Check if this verse is verse 1 and reciter includes Bismillah
      let bismillahOffset = 0;
      const segNow = currentSegment();
      if (segNow.introSec !== undefined) {
        bismillahOffset = segNow.introSec; // minutage officiel : début réel du verset 1
      } else if (verseNum === 1 && surah.bismillah && segmentIdxRef.current === 0 && segNow.from === 0) {
        bismillahOffset = getVerse1BismillahOffset(reciterIdRef.current, surahId);
      }

      const cTime = audio.currentTime;

      // Fin d'un segment partiel (verset Warsh issu d'un verset Hafs scindé) : détection fine (30 ms)
      const activeSeg = segmentsRef.current[segmentIdxRef.current];
      if (activeSeg && segIsPartial(activeSeg) && !segmentEndHandledRef.current && cTime >= segEndSec(activeSeg, dur)) {
        segmentEndHandledRef.current = true;
        segmentEndHandlerRef.current?.();
        return;
      }

      // During Bismillah recitation, do not highlight any verse words
      if (bismillahOffset > 0 && cTime < bismillahOffset) {
        if (!isRecitingBismillahRef.current) {
          isRecitingBismillahRef.current = true;
          setIsRecitingBismillah(true);
        }
        if (currentWordIndexRef.current !== null) {
          currentWordIndexRef.current = null;
          setCurrentWordIndex(null);
          const card = document.getElementById(`vc${verseNum}`);
          if (card) {
            card.querySelectorAll('.w-word.hl').forEach(w => w.classList.remove('hl'));
          }
        }
        return;
      }

      // Past the Bismillah: verse recitation is active
      if (isRecitingBismillahRef.current) {
        isRecitingBismillahRef.current = false;
        setIsRecitingBismillah(false);
      }

      const weights = computeVerseWordWeights(verse.text);
      const thresholds = computeVerseWordThresholds(weights);

      // Effective duration and elapsed time of verse words (excluding introductory Bismillah)
      // Progression dans le verset Warsh, segment par segment
      const seg = currentSegment();
      const segStart = segStartSec(seg, dur) + bismillahOffset;
      const segEnd = Math.min(dur, segEndSec(seg, dur));
      const local = Math.max(0, Math.min(1, (cTime - segStart) / Math.max(0.1, segEnd - segStart)));
      const progress = Math.max(0, Math.min(0.999, seg.vFrom + local * (seg.vTo - seg.vFrom)));
      let idx = thresholds.findIndex(t => progress <= t);
      if (idx === -1) idx = weights.length - 1;

      if (idx >= 0) {
        if (currentWordIndexRef.current !== idx) {
          currentWordIndexRef.current = idx;
          setCurrentWordIndex(idx);
        }

        // Direct DOM update on active verse card for ultra-smooth 60fps highlighting
        const card = document.getElementById(`vc${verseNum}`);
        if (card) {
          const liveWords = card.querySelectorAll('.w-word');
          liveWords.forEach((w, wIdx) => {
            if (wIdx === idx) {
              if (!w.classList.contains('hl')) w.classList.add('hl');
            } else {
              if (w.classList.contains('hl')) w.classList.remove('hl');
            }
          });
        }
      }
    };

    updateTracker();
    highlightIntervalRef.current = setInterval(updateTracker, 30);
  }, [computeVerseWordWeights, computeVerseWordThresholds]);

  const syncWordHighlight = useCallback((verseNum?: number) => {
    const vNum = verseNum || currentVerseNumberRef.current;
    if (vNum) {
      currentVerseNumberRef.current = vNum;
      setCurrentVerseNumber(vNum);
    }
    startHighlightTracker(vNum || undefined);
  }, [startHighlightTracker]);

  // Initialize single HTML5 Audio element instance ONCE for entire app lifecycle
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.defaultPlaybackRate = playbackSpeedRef.current;
    audio.playbackRate = playbackSpeedRef.current;
    if ('preservesPitch' in audio) {
      (audio as any).preservesPitch = true;
    }
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      const seg = segmentsRef.current[segmentIdxRef.current];
      if (
        isVerseModeRef.current && segIsPartial(seg) && audio.duration &&
        !segmentEndHandledRef.current && audio.currentTime >= segEndSec(seg, audio.duration)
      ) {
        segmentEndHandledRef.current = true;
        handleSegmentEnd();
      }
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      audio.defaultPlaybackRate = playbackSpeedRef.current;
      audio.playbackRate = playbackSpeedRef.current;
    };

    const onPlay = () => {
      isTransitioningRef.current = false;
      setIsPlaying(true);
      isPlayingRef.current = true;
      audio.playbackRate = playbackSpeedRef.current;
      if (isVerseModeRef.current && currentVerseNumberRef.current !== null) {
        startHighlightTracker(currentVerseNumberRef.current);
      }
    };

    const onPause = () => {
      // Guard against transient pause event fired during automated verse transitions
      if (isTransitioningRef.current) return;
      setIsPlaying(false);
      isPlayingRef.current = false;
      clearWordHighlight();
    };

    const handleSegmentEnd = () => {
      // Segment suivant du même verset Warsh (verset Hafs suivant ou suite du fichier)
      if (isVerseModeRef.current && segmentIdxRef.current < segmentsRef.current.length - 1) {
        isTransitioningRef.current = true;
        loadSegment(audio, segmentIdxRef.current + 1);
        audio.play().then(() => {
          isTransitioningRef.current = false;
          if (currentVerseNumberRef.current !== null) {
            startHighlightTracker(currentVerseNumberRef.current);
          }
        }).catch(console.warn);
        return;
      }

      const mode = repeatModeRef.current;
      const targetRepeats = parseInt(mode, 10) || 1;

      if (mode === 'loop' || repeatCounterRef.current < targetRepeats) {
        const needsReload =
          isVerseModeRef.current &&
          (segmentsRef.current.length > 1 || segmentIdxRef.current !== 0 || (segmentsRef.current[0]?.from ?? 0) > 0 ||
            segmentsRef.current[0]?.startSec !== undefined);
        if (needsReload) {
          isTransitioningRef.current = true;
          loadSegment(audio, 0);
        } else {
          audio.currentTime = 0;
          segmentEndHandledRef.current = false;
        }
        audio.playbackRate = playbackSpeedRef.current;
        repeatCounterRef.current += 1;
        setRepeatCounter(repeatCounterRef.current);
        audio.play().then(() => {
          if (isVerseModeRef.current && currentVerseNumberRef.current !== null) {
            startHighlightTracker(currentVerseNumberRef.current);
          }
        }).catch(console.warn);
        return;
      }

      // Repetitions cycle completed for current item
      if (isVerseModeRef.current && currentVerseNumberRef.current !== null && currentSurahIdRef.current) {
        const activeSurah = getSurahById(currentSurahIdRef.current);
        const nextVerse = currentVerseNumberRef.current + 1;
        if (activeSurah && nextVerse <= activeSurah.versesCount) {
          repeatCounterRef.current = 1;
          setRepeatCounter(1);
          playVerse(currentSurahIdRef.current, nextVerse);
          return;
        }
      }

      if (!audio.paused) audio.pause(); // segment partiel : arrêter à la fin de la portion
      setIsPlaying(false);
      isPlayingRef.current = false;
      repeatCounterRef.current = 1;
      setRepeatCounter(1);
      clearWordHighlight();
    };
    segmentEndHandlerRef.current = handleSegmentEnd;

    const onEnded = () => {
      if (segmentEndHandledRef.current) return;
      segmentEndHandledRef.current = true;
      handleSegmentEnd();
    };

    const onError = (e: Event) => {
      if (!audio.error || audio.error.code === 20 /* ABORT */) {
        return;
      }
      console.warn('Audio playback error', e, audio.error);
      setIsPlaying(false);
      isPlayingRef.current = false;
      clearWordHighlight();
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      clearWordHighlight();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [clearWordHighlight, startHighlightTracker]);

  // Check cache status when surah or reciter changes
  useEffect(() => {
    if (currentSurahId) {
      isSurahAudioCached(reciterId, currentSurahId).then(setIsCached);
    }
  }, [currentSurahId, reciterId]);

  const playSurah = async (surahId: number, targetReciterId?: string) => {
    // Starting at verse 1 with playVerse guarantees verse tracking and word-by-word Tajwid sync
    await playVerse(surahId, 1, targetReciterId);
  };

  const playVerse = async (surahId: number, verseNumber: number, targetReciterId?: string) => {
    const activeReciterId = targetReciterId || reciterIdRef.current;
    setCurrentSurahId(surahId);
    currentSurahIdRef.current = surahId;
    setCurrentVerseNumber(verseNumber);
    currentVerseNumberRef.current = verseNumber;
    setIsVerseMode(true);
    isVerseModeRef.current = true;

    if (targetReciterId && targetReciterId !== reciterIdRef.current) {
      setReciterId(targetReciterId);
      reciterIdRef.current = targetReciterId;
      localStorage.setItem('warsh_reciter_id', targetReciterId);
    }

    repeatCounterRef.current = 1;
    setRepeatCounter(1);

    if (!audioRef.current) return;

    try {
      isTransitioningRef.current = true;
      audioRef.current.pause();
      clearWordHighlight();

      const currentSurahObj = getSurahById(surahId);
      const isStartingBismillah = verseNumber === 1 && !!currentSurahObj?.bismillah;
      isRecitingBismillahRef.current = isStartingBismillah;
      setIsRecitingBismillah(isStartingBismillah);
      currentWordIndexRef.current = null;
      setCurrentWordIndex(null);

      segmentsRef.current = getVerseAudioSegments(activeReciterId, surahId, verseNumber);
      loadSegment(audioRef.current, 0);

      await audioRef.current.play();
      isTransitioningRef.current = false;
      setIsPlaying(true);
      isPlayingRef.current = true;
      startHighlightTracker(verseNumber);
    } catch (err: any) {
      isTransitioningRef.current = false;
      if (err.name !== 'AbortError') {
        console.warn('Could not play verse audio:', err);
        setIsPlaying(false);
        isPlayingRef.current = false;
      }
    }
  };

  const stopVerse = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
      clearWordHighlight();
      setCurrentVerseNumber(null);
      currentVerseNumberRef.current = null;
      setIsVerseMode(false);
      isVerseModeRef.current = false;
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
      clearWordHighlight();
    }
  };

  const resume = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.playbackRate = playbackSpeedRef.current;
        await audioRef.current.play();
        setIsPlaying(true);
        isPlayingRef.current = true;
        if (isVerseModeRef.current && currentVerseNumberRef.current !== null) {
          syncWordHighlight(currentVerseNumberRef.current);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.warn('Resume failed:', err);
        }
      }
    }
  };

  const togglePlay = async () => {
    if (isPlayingRef.current) {
      pause();
    } else {
      if (isVerseModeRef.current && currentVerseNumberRef.current && currentSurahIdRef.current) {
        await playVerse(currentSurahIdRef.current, currentVerseNumberRef.current);
      } else if (currentSurahIdRef.current) {
        await resume();
      } else {
        await playSurah(102);
      }
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const seekToWord = async (surahId: number, verseNumber: number, wordIdx: number) => {
    if (currentSurahIdRef.current !== surahId || currentVerseNumberRef.current !== verseNumber || !isVerseModeRef.current) {
      await playVerse(surahId, verseNumber);
    }

    const audio = audioRef.current;
    if (!audio) return;

    const surah = getSurahById(surahId);
    const verse = surah?.verses[verseNumber - 1];
    if (verse) {
      const weights = computeVerseWordWeights(verse.text);
      const thresholds = computeVerseWordThresholds(weights);
      const prevT = wordIdx === 0 ? 0 : thresholds[wordIdx - 1];
      const target = Math.min(0.999, prevT + 0.005);

      // Segment (fichier) qui contient ce mot
      const segs = segmentsRef.current;
      let si = segs.findIndex(sg => target >= sg.vFrom && target < sg.vTo);
      if (si < 0) si = Math.max(0, segs.length - 1);
      if (segs.length > 1 && si !== segmentIdxRef.current) {
        isTransitioningRef.current = true;
        loadSegment(audio, si);
        await new Promise<void>(resolve => {
          if (audio.readyState >= 1) resolve();
          else audio.addEventListener('loadedmetadata', () => resolve(), { once: true });
        });
        isTransitioningRef.current = false;
      }
      const seg = currentSegment();

      let bismillahOffset = 0;
      if (verseNumber === 1 && surah.bismillah && segmentIdxRef.current === 0 && seg.from === 0) {
        bismillahOffset = getVerse1BismillahOffset(reciterIdRef.current, surahId);
      }

      if (audio.duration && Number.isFinite(audio.duration)) {
        const segStart = seg.from * audio.duration + bismillahOffset;
        const segEnd = seg.to * audio.duration;
        const local = (target - seg.vFrom) / Math.max(0.001, seg.vTo - seg.vFrom);
        audio.currentTime = Math.max(0, segStart + local * (segEnd - segStart));
        segmentEndHandledRef.current = false;
        setCurrentTime(audio.currentTime);
      }
    }

    isRecitingBismillahRef.current = false;
    setIsRecitingBismillah(false);
    currentWordIndexRef.current = wordIdx;
    setCurrentWordIndex(wordIdx);

    const card = document.getElementById(`vc${verseNumber}`);
    if (card) {
      const words = card.querySelectorAll('.w-word');
      words.forEach((w, i) => {
        if (i === wordIdx) {
          w.classList.add('hl');
        } else {
          w.classList.remove('hl');
        }
      });
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        isPlayingRef.current = true;
      } catch (err) {
        console.warn('Audio play error:', err);
      }
    }

    startHighlightTracker(verseNumber);
  };

  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    playbackSpeedRef.current = speed;
    localStorage.setItem('warsh_playback_speed', String(speed));

    if (audioRef.current) {
      audioRef.current.defaultPlaybackRate = speed;
      audioRef.current.playbackRate = speed;
    }
  };

  const setRepeatMode = (mode: RepeatCountMode) => {
    setRepeatModeState(mode);
    repeatModeRef.current = mode;
    localStorage.setItem('warsh_repeat_mode', mode);
  };

  const setReciter = async (newReciterId: string) => {
    setReciterId(newReciterId);
    reciterIdRef.current = newReciterId;
    localStorage.setItem('warsh_reciter_id', newReciterId);

    const surahId = currentSurahIdRef.current;
    if (!surahId || !audioRef.current) return;

    const wasPlaying = isPlayingRef.current;
    const previousTime = audioRef.current.currentTime || 0;

    try {
      isTransitioningRef.current = true;
      audioRef.current.pause();
      clearWordHighlight();

      if (isVerseModeRef.current && currentVerseNumberRef.current !== null) {
        segmentsRef.current = getVerseAudioSegments(newReciterId, surahId, currentVerseNumberRef.current);
        loadSegment(audioRef.current, 0);
      } else {
        const cachedUrl = await getCachedAudioUrl(newReciterId, surahId);
        audioRef.current.src = cachedUrl || getSurahAudioUrl(newReciterId, surahId);
        audioRef.current.load();
        audioRef.current.defaultPlaybackRate = playbackSpeedRef.current;
        audioRef.current.playbackRate = playbackSpeedRef.current;
      }

      if (!isVerseModeRef.current && previousTime > 0 && Number.isFinite(previousTime)) {
        audioRef.current.currentTime = previousTime;
      }

      if (wasPlaying) {
        await audioRef.current.play();
        isTransitioningRef.current = false;
        setIsPlaying(true);
        isPlayingRef.current = true;
        if (isVerseModeRef.current && currentVerseNumberRef.current !== null) {
          startHighlightTracker(currentVerseNumberRef.current);
        }
      } else {
        isTransitioningRef.current = false;
        setIsPlaying(false);
        isPlayingRef.current = false;
      }
    } catch (err: any) {
      isTransitioningRef.current = false;
      if (err.name !== 'AbortError') {
        console.warn('Error switching reciter:', err);
      }
    }
  };

  const nextSurah = () => {
    const current = currentSurahIdRef.current;
    if (!current) {
      playSurah(78);
      return;
    }
    if (current < 114) {
      playSurah(current + 1);
    } else {
      playSurah(78);
    }
  };

  const prevSurah = () => {
    const current = currentSurahIdRef.current;
    if (!current) {
      playSurah(114);
      return;
    }
    if (current > 78) {
      playSurah(current - 1);
    } else {
      playSurah(114);
    }
  };

  const downloadCurrentForOffline = async (): Promise<boolean> => {
    const current = currentSurahIdRef.current;
    if (!current) return false;
    setIsDownloading(true);
    const audioUrl = getSurahAudioUrl(reciterIdRef.current, current);
    const ok = await cacheSurahAudio(reciterIdRef.current, current, audioUrl);
    setIsDownloading(false);
    if (ok) setIsCached(true);
    return ok;
  };

  return (
    <AudioContext.Provider
      value={{
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
        currentWordIndex,
        isRecitingBismillah,
        isVerseMode,
        syncWordHighlight,
        playSurah,
        playVerse,
        stopVerse,
        pause,
        resume,
        togglePlay,
        seek,
        seekToWord,
        setSpeed,
        setRepeatMode,
        setReciter,
        nextSurah,
        prevSurah,
        downloadCurrentForOffline
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}
