import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  ArrowRight,
  Award,
  Play,
  Pause,
  ListOrdered,
  BookOpen,
  HelpCircle,
  MoveUp,
  MoveDown,
  Check,
  CheckCheck,
  Flame,
  Scroll,
  Info,
  Headphones,
  Shuffle,
  PenTool,
  Lightbulb,
  Target
} from 'lucide-react';
import { Surah, Verse } from '../types';
import { ALL_SURAHS } from '../data/surahs';
import { useAudio } from '../context/AudioContext';
import { getVerseAudioUrl, WARSH_RECITERS } from '../data/reciters';
import { HISTORICAL_AND_MEANING_QUIZ, QuizItem } from '../data/historicalAndMeaningQuiz';

interface SurahQuizTabProps {
  surah: Surah;
  onPointsEarned?: (points: number) => void;
  onMarkMemorized?: () => void;
  isMemorized?: boolean;
}

export type QuizQuestionType =
  | 'missing_word'
  | 'reorder'
  | 'verse_to_meaning'
  | 'audio_test'
  | 'next_verse'
  | 'comprehension'
  | 'history_asbab';

export interface QuizQuestionItem {
  id: string;
  type: QuizQuestionType;
  badgeLabel: string;
  prompt: string;
  subPrompt?: string;
  arabicSnippet?: string;
  audioVerseNumber?: number;
  options: string[];
  correctAnswer: string;
  correctIndex: number;
  explanation: string;
  contextBanner?: string;
  sourceReference?: string;
  modernReflection?: string;
  difficulty?: 'facile' | 'moyen' | 'expert';
  // Specifically for reorder questions
  reorderItems?: { id: number; num: number; text: string; translation: string }[];
}

export const SurahQuizTab: React.FC<SurahQuizTabProps> = ({
  surah,
  onPointsEarned,
  onMarkMemorized,
  isMemorized = false
}) => {
  const { currentReciter } = useAudio();
  const [filterMode, setFilterMode] = useState<'all' | QuizQuestionType>('all');
  const [questions, setQuestions] = useState<QuizQuestionItem[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  // Audio snippet playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioSnippetRef = useRef<HTMLAudioElement | null>(null);

  // Reorder specific interactive state for current question
  const [activeReorderList, setActiveReorderList] = useState<
    { id: number; num: number; text: string; translation: string }[]
  >([]);

  // Cleanup audio on unmount or question change
  useEffect(() => {
    return () => {
      if (audioSnippetRef.current) {
        audioSnippetRef.current.pause();
        audioSnippetRef.current = null;
      }
    };
  }, []);

  // Generate the 5-8 question quiz whenever surah or filterMode changes
  useEffect(() => {
    generateQuiz();
  }, [surah.id, filterMode]);

  const handlePlayAudioSnippet = (verseNum: number) => {
    if (audioSnippetRef.current) {
      audioSnippetRef.current.pause();
      if (isPlayingAudio) {
        setIsPlayingAudio(false);
        return;
      }
    }

    const audioUrl = getVerseAudioUrl(currentReciter.id, surah.id, verseNum);
    const audio = new Audio(audioUrl);
    audioSnippetRef.current = audio;

    audio.onplay = () => setIsPlayingAudio(true);
    audio.onended = () => setIsPlayingAudio(false);
    audio.onerror = () => {
      // Fallback to Yâsîn if current reciter fails
      const fallbackUrl = getVerseAudioUrl('yasin', surah.id, verseNum);
      const fallbackAudio = new Audio(fallbackUrl);
      audioSnippetRef.current = fallbackAudio;
      fallbackAudio.onended = () => setIsPlayingAudio(false);
      fallbackAudio.play().catch(() => setIsPlayingAudio(false));
    };

    audio.play().catch(() => setIsPlayingAudio(false));
  };

  const generateQuiz = () => {
    // Stop any playing audio
    if (audioSnippetRef.current) {
      audioSnippetRef.current.pause();
      setIsPlayingAudio(false);
    }

    setIsSubmitted(false);
    setSelectedOption(null);
    setCurrentQIndex(0);
    setScore(0);
    setIsCompleted(false);

    const verses = surah.verses;
    const vCount = verses.length;

    // Determine target question count based on surah length
    // Short (<= 5 verses): 5 questions
    // Medium (6 - 15 verses): 6 to 7 questions
    // Long (> 15 verses): 8 questions
    let targetCount = 7;
    if (vCount <= 5) targetCount = 5;
    else if (vCount <= 12) targetCount = 6;
    else targetCount = 8;

    const pool: QuizQuestionItem[] = [];

    // Helper: Pick distractors from other verses or surahs
    const getDistractorVerses = (excludeNumber: number, count: number = 3): Verse[] => {
      const candidates = verses.filter(v => v.number !== excludeNumber);
      if (candidates.length >= count) {
        return [...candidates].sort(() => 0.5 - Math.random()).slice(0, count);
      }
      // If surah has too few verses, grab from ALL_SURAHS
      const otherVerses = ALL_SURAHS.filter(s => s.id !== surah.id)
        .flatMap(s => s.verses)
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
      return [...candidates, ...otherVerses].slice(0, count);
    };

    // 1. QUESTION: Compléter le mot manquant
    verses.forEach((v, idx) => {
      const words = v.text.split(/\s+/).filter(Boolean);
      if (words.length >= 2) {
        // Pick a non-trivial word (length >= 3 if possible)
        let wIdx = Math.floor(Math.random() * words.length);
        const targetWord = words[wIdx];
        const blanked = words.map((w, i) => (i === wIdx ? '« ...... »' : w)).join(' ');

        // Gather distractors from other words in this surah or other surahs
        const wordDistractors = ALL_SURAHS.flatMap(s => s.verses)
          .flatMap(v2 => v2.text.split(/\s+/))
          .filter(w => w !== targetWord && w.length >= 2 && !w.includes('ـ'))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [targetWord, ...wordDistractors].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(targetWord);

        pool.push({
          id: `missing-${v.number}-${idx}`,
          type: 'missing_word',
          badgeLabel: 'Mot manquant',
          prompt: `Complétez le mot manquant du verset ${v.number} :`,
          subPrompt: `Sens français du verset : « ${v.translation} »`,
          arabicSnippet: blanked,
          options,
          correctAnswer: targetWord,
          correctIndex,
          explanation: `Le mot exact selon la Riwâya Warsh 'an Nâfi' est « ${targetWord} ». Verset complet : ${v.text}`
        });
      }
    });

    // 2. QUESTION: Associer un verset à son sens (QCM)
    verses.forEach((v, idx) => {
      const distractors = getDistractorVerses(v.number, 3);
      const options = [v.translation, ...distractors.map(d => d.translation)].sort(
        () => 0.5 - Math.random()
      );
      const correctIndex = options.indexOf(v.translation);

      pool.push({
        id: `meaning-${v.number}-${idx}`,
        type: 'verse_to_meaning',
        badgeLabel: 'Sens & Traduction',
        prompt: `Quel est le sens français exact du verset ${v.number} ?`,
        subPrompt: `Sourate ${surah.nameTranslit} · Verset ${v.number}`,
        arabicSnippet: v.text,
        options,
        correctAnswer: v.translation,
        correctIndex,
        explanation: `Traduction exacte du verset ${v.number} : « ${v.translation} ». ${v.meaning || ''}`
      });
    });

    // 3. QUESTION: Reconnaître un extrait audio
    verses.forEach((v, idx) => {
      const distractors = getDistractorVerses(v.number, 3);
      const correctOption = `Verset ${v.number} : « ${v.translation} »`;
      const distractorOptions = distractors.map(d => `Verset ${d.number} : « ${d.translation} »`);
      const options = [correctOption, ...distractorOptions].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(correctOption);

      pool.push({
        id: `audio-${v.number}-${idx}`,
        type: 'audio_test',
        badgeLabel: 'Reconnaissance audio',
        prompt: `Écoutez l'extrait audio en Riwâya Warsh et identifiez le verset correspondant :`,
        subPrompt: `Cliquez sur « Écouter l'extrait » puis choisissez la bonne proposition`,
        audioVerseNumber: v.number,
        options,
        correctAnswer: correctOption,
        correctIndex,
        explanation: `Il s'agit du verset ${v.number} : « ${v.text} » — « ${v.translation} »`
      });
    });

    // 4. QUESTION: Verset suivant (Enchaînement du Hifz)
    if (verses.length >= 2) {
      for (let i = 0; i < verses.length - 1; i++) {
        const currentV = verses[i];
        const nextV = verses[i + 1];
        const distractors = getDistractorVerses(nextV.number, 3);

        const options = [nextV.text, ...distractors.map(d => d.text)].sort(
          () => 0.5 - Math.random()
        );
        const correctIndex = options.indexOf(nextV.text);

        pool.push({
          id: `next-${currentV.number}`,
          type: 'next_verse',
          badgeLabel: 'Verset suivant',
          prompt: `Quel verset suit immédiatement le verset ${currentV.number} ?`,
          subPrompt: `Verset ${currentV.number} : « ${currentV.text} » (${currentV.translation})`,
          arabicSnippet: currentV.text,
          options,
          correctAnswer: nextV.text,
          correctIndex,
          explanation: `Le verset ${nextV.number} est : « ${nextV.text} » (« ${nextV.translation} »).`
        });
      }
    }

    // 5. QUESTION: Remettre les versets dans le bon ordre (Reorder)
    // Create 1 or 2 reorder puzzles with 3 or 4 consecutive verses
    const reorderSpan = Math.min(verses.length, verses.length <= 4 ? verses.length : 4);
    const maxStart = Math.max(0, verses.length - reorderSpan);
    const startIdx = Math.floor(Math.random() * (maxStart + 1));
    const reorderSubset = verses.slice(startIdx, startIdx + reorderSpan).map(v => ({
      id: v.number,
      num: v.number,
      text: v.text,
      translation: v.translation
    }));

    if (reorderSubset.length >= 3) {
      // Scramble until not already in order
      let scrambled = [...reorderSubset].sort(() => 0.5 - Math.random());
      if (scrambled.every((item, i) => item.num === reorderSubset[i].num)) {
        scrambled = [...reorderSubset].reverse();
      }

      pool.push({
        id: `reorder-${startIdx}`,
        type: 'reorder',
        badgeLabel: 'Remettre dans l’ordre',
        prompt: `Remettez ces ${reorderSubset.length} versets dans l'ordre chronologique de récitation :`,
        subPrompt: `Utilisez les flèches ↑ et ↓ pour déplacer chaque verset à sa juste place.`,
        options: [],
        correctAnswer: reorderSubset.map(v => v.num).join(','),
        correctIndex: 0,
        explanation: `L'ordre exact de la sourate est : ${reorderSubset.map(v => `[V.${v.num}]`).join(' → ')}`,
        reorderItems: scrambled
      });
    }

    // 6. QUESTION: Compréhension & Thématique
    if (surah.keyMessage) {
      const distractors = ALL_SURAHS.filter(s => s.id !== surah.id)
        .map(s => s.keyMessage)
        .filter(Boolean)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const options = [surah.keyMessage, ...distractors].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(surah.keyMessage);

      pool.push({
        id: `comp-theme`,
        type: 'comprehension',
        badgeLabel: 'Enseignement & Sagesse',
        prompt: `Quel est le message spirituel central de la sourate ${surah.nameTranslit} ?`,
        subPrompt: `Sourate ${surah.nameArabic} (${surah.versesCount} versets, ${surah.type})`,
        options,
        correctAnswer: surah.keyMessage,
        correctIndex,
        explanation: `Le message clé de la sourate ${surah.nameTranslit} est : « ${surah.keyMessage} ». À retenir : ${surah.toRemember || surah.inPlainLanguage}`
      });
    }

    // 7. QUESTIONS EXPERTES : Contexte Historique & Asbâb an-Nuzûl & Exégèse vivante
    const expertHistorical = HISTORICAL_AND_MEANING_QUIZ.filter(q => q.surahId === surah.id);
    expertHistorical.forEach(eq => {
      pool.push({
        id: eq.id,
        type: 'history_asbab',
        badgeLabel: eq.category === 'histoire' ? 'Contexte Historique' : 'Sens & Sagesse',
        prompt: eq.question,
        subPrompt: eq.contextBanner,
        contextBanner: eq.contextBanner,
        options: eq.options,
        correctAnswer: eq.options[eq.correctIndex],
        correctIndex: eq.correctIndex,
        explanation: eq.explanation,
        sourceReference: eq.sourceReference,
        modernReflection: eq.modernReflection,
        difficulty: eq.difficulty
      });
    });

    // Filter by specific type if user selected a drill mode, otherwise compose the balanced 5-8 question quiz
    let selectedQuestions: QuizQuestionItem[] = [];

    if (filterMode !== 'all') {
      const filtered = pool.filter(q => q.type === filterMode);
      selectedQuestions = filtered.slice(0, targetCount);
    } else {
      // Balanced assembly ensuring ALL requested question types are included!
      const missingWords = pool.filter(q => q.type === 'missing_word');
      const meanings = pool.filter(q => q.type === 'verse_to_meaning');
      const audios = pool.filter(q => q.type === 'audio_test');
      const reorders = pool.filter(q => q.type === 'reorder');
      const nextVerses = pool.filter(q => q.type === 'next_verse');
      const comps = pool.filter(q => q.type === 'comprehension');
      const histories = pool.filter(q => q.type === 'history_asbab');

      const balanced: QuizQuestionItem[] = [];

      // 1. Contexte historique et causes de la révélation (Prioritaire pour l'éveil)
      if (histories.length > 0) balanced.push(histories[0]);
      // 2. Missing word
      if (missingWords.length > 0) balanced.push(missingWords[0]);
      // 3. Meaning QCM
      if (meanings.length > 0) balanced.push(meanings[0]);
      // 4. Audio recognition
      if (audios.length > 0) balanced.push(audios[0]);
      // 5. Next verse
      if (nextVerses.length > 0) balanced.push(nextVerses[0]);
      // 6. Reorder puzzle
      if (reorders.length > 0) balanced.push(reorders[0]);

      // If more questions needed to hit targetCount:
      if (balanced.length < targetCount && histories.length > 1) {
        balanced.push(histories[1]);
      }
      if (balanced.length < targetCount && missingWords.length > 1) {
        balanced.push(missingWords[1]);
      }
      if (balanced.length < targetCount && meanings.length > 1) {
        balanced.push(meanings[1]);
      }
      if (balanced.length < targetCount && audios.length > 1) {
        balanced.push(audios[1]);
      }
      if (balanced.length < targetCount && comps.length > 0) {
        balanced.push(comps[0]);
      }

      // If still under targetCount (for short surahs), fill with available
      if (balanced.length < targetCount) {
        const remaining = pool.filter(q => !balanced.some(b => b.id === q.id));
        balanced.push(...remaining.slice(0, targetCount - balanced.length));
      }

      selectedQuestions = balanced.slice(0, targetCount);
    }

    // Initialize active reorder list for current question if it is a reorder type
    if (selectedQuestions.length > 0 && selectedQuestions[0].type === 'reorder' && selectedQuestions[0].reorderItems) {
      setActiveReorderList(selectedQuestions[0].reorderItems);
    }

    setQuestions(selectedQuestions);
  };

  // Sync active reorder state when advancing question
  useEffect(() => {
    if (questions[currentQIndex]?.type === 'reorder' && questions[currentQIndex]?.reorderItems) {
      setActiveReorderList(questions[currentQIndex].reorderItems);
    }
  }, [currentQIndex, questions]);

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  // Reorder controls
  const handleMoveReorderItem = (fromIdx: number, toIdx: number) => {
    if (isSubmitted) return;
    if (toIdx < 0 || toIdx >= activeReorderList.length) return;
    const copy = [...activeReorderList];
    const item = copy.splice(fromIdx, 1)[0];
    copy.splice(toIdx, 0, item);
    setActiveReorderList(copy);
  };

  const handleValidateAnswer = () => {
    const q = questions[currentQIndex];
    if (!q || isSubmitted) return;

    let isCorrect = false;

    // Handle Reorder question verification
    if (q.type === 'reorder') {
      let isCorrectOrder = true;
      for (let i = 0; i < activeReorderList.length - 1; i++) {
        if (activeReorderList[i].num > activeReorderList[i + 1].num) {
          isCorrectOrder = false;
          break;
        }
      }
      isCorrect = isCorrectOrder;
    } else {
      // Standard QCM verification
      if (selectedOption === null) return;
      isCorrect = selectedOption === q.correctIndex;
    }

    setIsSubmitted(true);

    if (isCorrect) {
      const nextStreak = comboStreak + 1;
      setComboStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);

      const multiplier = nextStreak >= 5 ? 2.0 : nextStreak >= 3 ? 1.5 : 1.0;
      const basePts = q.type === 'history_asbab' ? 15 : q.type === 'reorder' ? 15 : 10;
      const earned = Math.round(basePts * multiplier);

      setScore(prev => prev + 1);
      if (onPointsEarned) onPointsEarned(earned);

      if (nextStreak >= 3) {
        try {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#C9A24B', '#256150', '#ffffff']
          });
        } catch (_) {}
      }
    } else {
      setComboStreak(0);
    }
  };

  const handleNext = () => {
    // Stop any audio playing
    if (audioSnippetRef.current) {
      audioSnippetRef.current.pause();
      setIsPlayingAudio(false);
    }

    if (currentQIndex < questions.length - 1) {
      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      setSelectedOption(null);
      setIsSubmitted(false);

      if (questions[nextIdx]?.type === 'reorder' && questions[nextIdx]?.reorderItems) {
        setActiveReorderList(questions[nextIdx].reorderItems);
      }
    } else {
      setIsCompleted(true);
      // Trigger confetti if good score
      const finalScore = score + (selectedOption === questions[currentQIndex]?.correctIndex ? 0 : 0);
      if (score >= Math.ceil(questions.length * 0.6)) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C9A24B', '#14332A', '#16A34A']
        });
      }
    }
  };

  const currentQ = questions[currentQIndex];

  // If no questions generated yet
  if (!currentQ && !isCompleted) {
    return (
      <div className="bg-white dark:bg-[#16221C] rounded-2xl p-6 text-center text-stone-500">
        Génération du quiz en cours...
      </div>
    );
  }

  return (
    <div id="surah-quiz-container" className="w-full space-y-5">
      {/* 1. QUIZ CATEGORY FILTER / DRILL TABS */}
      <div className="bg-white dark:bg-[#16221C] rounded-2xl p-2.5 sm:p-3 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max text-xs font-bold">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              filterMode === 'all'
                ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Mini-Quiz Complet (5 à 8 Q.)</span>
          </button>

          <button
            onClick={() => setFilterMode('history_asbab')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              filterMode === 'history_asbab'
                ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Scroll className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Contexte & Histoire</span>
          </button>

          <button
            onClick={() => setFilterMode('missing_word')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              filterMode === 'missing_word'
                ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Mot manquant</span>
          </button>

          <button
            onClick={() => setFilterMode('verse_to_meaning')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              filterMode === 'verse_to_meaning'
                ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Sens & QCM</span>
          </button>

          <button
            onClick={() => setFilterMode('audio_test')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              filterMode === 'audio_test'
                ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Audio</span>
          </button>

          <button
            onClick={() => setFilterMode('reorder')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              filterMode === 'reorder'
                ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Remettre en ordre</span>
          </button>
        </div>

        <button
          onClick={generateQuiz}
          title="Régénérer une série de questions"
          className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 2. ACTIVE QUESTION CARD */}
      {!isCompleted && currentQ && (
        <div className="bg-white dark:bg-[#16221C] rounded-3xl p-5 sm:p-7 border-2 border-[#C9A24B]/40 shadow-md space-y-6">
          {/* Header with question counter, badge, combo streak and score */}
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800/80 pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B]/40 text-[#14332A] dark:text-[#C9A24B] font-bold text-xs font-mono">
                Question {currentQIndex + 1} / {questions.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {currentQ.badgeLabel}
              </span>
              {currentQ.difficulty && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 uppercase">
                  {currentQ.difficulty}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {comboStreak >= 2 && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs animate-pulse shadow-xs">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Série {comboStreak} (×{comboStreak >= 5 ? '2.0' : comboStreak >= 3 ? '1.5' : '1.0'})</span>
                </span>
              )}
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <Award className="w-4 h-4 text-[#C9A24B]" />
                <span>Score : {score}</span>
              </div>
            </div>
          </div>

          {/* Prompt, Historical Context Banner & Arabic text */}
          <div className="space-y-2.5">
            {currentQ.contextBanner && (
              <div className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/40 dark:to-emerald-950/40 border border-[#C9A24B]/40 text-[#14332A] dark:text-[#FAF6EC] flex items-center gap-2.5 text-xs font-medium shadow-2xs">
                <Scroll className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span><strong>Contexte historique :</strong> {currentQ.contextBanner}</span>
              </div>
            )}

            <h3 className="text-base sm:text-lg font-extrabold text-[#14332A] dark:text-[#FAF6EC] leading-snug">
              {currentQ.prompt}
            </h3>

            {currentQ.subPrompt && currentQ.subPrompt !== currentQ.contextBanner && (
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 italic">
                {currentQ.subPrompt}
              </p>
            )}

            {/* Arabic Snippet (if available) */}
            {currentQ.arabicSnippet && (
              <div className="p-4 rounded-2xl bg-[#F5EFE0]/60 dark:bg-[#14261F] border border-[#C9A24B]/30 text-center my-3">
                <p
                  className="font-quran text-2xl sm:text-3xl text-[#14332A] dark:text-[#FAF6EC] leading-loose tracking-wide"
                  dir="rtl"
                >
                  {currentQ.arabicSnippet}
                </p>
              </div>
            )}

            {/* Audio snippet player (for audio questions) */}
            {currentQ.type === 'audio_test' && currentQ.audioVerseNumber && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#14332A]/10 via-[#C9A24B]/10 to-[#14332A]/10 border-2 border-[#C9A24B]/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    id="play-quiz-audio-snippet-btn"
                    onClick={() => handlePlayAudioSnippet(currentQ.audioVerseNumber!)}
                    className="w-12 h-12 rounded-full bg-[#14332A] text-[#FAF6EC] hover:bg-[#1F4D3D] flex items-center justify-center shadow-md transition-transform active:scale-95"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5 text-[#C9A24B]" /> : <Play className="w-5 h-5 text-[#C9A24B] ml-0.5" />}
                  </button>
                  <div>
                    <span className="text-xs font-bold text-[#14332A] dark:text-[#FAF6EC] block">
                      {isPlayingAudio ? 'Lecture en cours...' : 'Écouter l’extrait audio'}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Récitation Warsh par {currentReciter.name}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#C9A24B]/20 text-[#14332A] dark:text-[#C9A24B] font-bold flex items-center gap-1">
                  <Headphones className="w-3 h-3 text-[#C9A24B]" />
                  <span>Warsh</span>
                </span>
              </div>
            )}
          </div>

          {/* 3. QUESTION INTERACTIVE BODY */}
          {/* A. REORDER QUESTION */}
          {currentQ.type === 'reorder' ? (
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Classez les versets du premier au dernier :
              </p>

              <div className="space-y-2">
                {activeReorderList.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-[#F5EFE0]/40 dark:bg-[#14261F] border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-[#C9A24B] text-[#14332A] flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-quran text-base sm:text-lg text-[#14332A] dark:text-[#FAF6EC] truncate" dir="rtl">
                          {item.text}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          « {item.translation} »
                        </p>
                      </div>
                    </div>

                    {!isSubmitted && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveReorderItem(idx, idx - 1)}
                          className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#C9A24B] hover:text-[#14332A] text-stone-600 dark:text-stone-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Monter"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          disabled={idx === activeReorderList.length - 1}
                          onClick={() => handleMoveReorderItem(idx, idx + 1)}
                          className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#C9A24B] hover:text-[#14332A] text-stone-600 dark:text-stone-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Descendre"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* B. MULTIPLE CHOICE (QCM) OPTIONS */
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optionClass =
                  'bg-white dark:bg-[#16221C] border-stone-200 dark:border-stone-800 hover:border-[#C9A24B] text-stone-800 dark:text-stone-200';

                if (isSubmitted) {
                  if (isCorrect) {
                    optionClass =
                      'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/40';
                  } else if (isSelected && !isCorrect) {
                    optionClass =
                      'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/40';
                  } else {
                    optionClass = 'opacity-40 border-stone-200 dark:border-stone-800';
                  }
                } else if (isSelected) {
                  optionClass =
                    'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] shadow-md ring-2 ring-[#C9A24B]';
                }

                return (
                  <button
                    key={idx}
                    id={`quiz-option-${idx}`}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-medium ${optionClass}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono shrink-0 ${
                          isSelected
                            ? 'bg-[#C9A24B] text-[#14332A]'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </div>

                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 4. VALIDATION & FEEDBACK AREA */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80">
            {!isSubmitted ? (
              <div className="flex justify-end">
                <button
                  id="validate-quiz-answer-btn"
                  disabled={currentQ.type !== 'reorder' && selectedOption === null}
                  onClick={handleValidateAnswer}
                  className="px-6 py-3 rounded-xl bg-[#14332A] text-[#FAF6EC] font-bold text-xs uppercase tracking-wider hover:bg-[#1F4D3D] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <CheckCheck className="w-4 h-4 text-[#C9A24B]" />
                  <span>Valider ma réponse</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result Message Box */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm ${
                    (currentQ.type === 'reorder' &&
                      activeReorderList.every(
                        (item, i) => i === 0 || item.num > activeReorderList[i - 1].num
                      )) ||
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-400'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-400'
                  }`}
                >
                  <p className="font-extrabold text-sm mb-1 flex items-center gap-1.5">
                    {(currentQ.type === 'reorder' &&
                      activeReorderList.every(
                        (item, i) => i === 0 || item.num > activeReorderList[i - 1].num
                      )) ||
                    selectedOption === currentQ.correctIndex ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Exact ! Macha'Allah</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-500" />
                        <span>Pas tout à fait...</span>
                      </>
                    )}
                  </p>
                  <p className="leading-relaxed opacity-90">{currentQ.explanation}</p>

                  {currentQ.sourceReference && (
                    <div className="mt-3 pt-2.5 border-t border-current/20 flex items-center gap-1.5 text-[11px] opacity-85">
                      <BookOpen className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                      <span><strong>Source :</strong> {currentQ.sourceReference}</span>
                    </div>
                  )}

                  {currentQ.modernReflection && (
                    <div className="mt-2.5 p-3 rounded-xl bg-white/80 dark:bg-black/30 border border-[#C9A24B]/30 text-[11px] leading-relaxed">
                      <span className="font-extrabold text-[#C9A24B] flex items-center gap-1 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Réflexion pour aujourd'hui (Spécial Ados) :</span>
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 font-medium">
                        {currentQ.modernReflection}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Question {currentQIndex + 1} terminée
                  </span>

                  <button
                    id="next-quiz-question-btn"
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-[#14332A] text-[#FAF6EC] font-bold text-xs uppercase tracking-wider hover:bg-[#1F4D3D] transition-colors shadow-md flex items-center gap-2"
                  >
                    <span>{currentQIndex < questions.length - 1 ? 'Question suivante' : 'Voir mon score final'}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. FINAL SCORE & COMPLETION SUMMARY SCREEN */}
      {isCompleted && (
        <div
          id="quiz-results-summary"
          className="bg-white dark:bg-[#16221C] rounded-3xl p-6 sm:p-8 border-2 border-[#C9A24B]/50 shadow-xl text-center space-y-6 animate-fadeIn"
        >
          <div className="w-20 h-20 rounded-full bg-[#C9A24B]/20 text-[#C9A24B] mx-auto flex items-center justify-center shadow-inner border-2 border-[#C9A24B]/40">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono">
              Sourate {surah.id} · {surah.nameTranslit}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
              {score === questions.length
                ? 'Score Parfait ! Macha’Allah'
                : score >= Math.ceil(questions.length * 0.7)
                ? 'Très Belle Performance de Hifz !'
                : 'Bilan du Mini-Quiz'}
            </h3>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium max-w-md mx-auto">
              Vous avez obtenu <strong className="text-[#C9A24B] text-lg">{score}</strong> sur{' '}
              <strong>{questions.length}</strong> questions ({Math.round((score / questions.length) * 100)}%).
            </p>
          </div>

          {/* Points & Streak Banner */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-extrabold border border-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>+{score * 12} points de Hifz gagnés</span>
            </div>

            {maxStreak >= 2 && (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-extrabold border border-amber-300">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Meilleure série : {maxStreak} d'affilée !</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 pt-3 flex-wrap">
            <button
              id="restart-quiz-btn"
              onClick={generateQuiz}
              className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Recommencer ce quiz</span>
            </button>

            {!isMemorized && onMarkMemorized && score >= Math.ceil(questions.length * 0.7) && (
              <button
                id="mark-surah-memorized-quiz-btn"
                onClick={onMarkMemorized}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Marquer la sourate mémorisée ✓</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
