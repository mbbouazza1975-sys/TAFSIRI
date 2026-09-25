import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  Volume2,
  ArrowRight,
  BookOpen,
  Flame,
  Heart,
  Timer,
  Zap,
  Scroll,
  Trophy,
  Check,
  ChevronRight,
  ShieldCheck,
  Compass,
  Target,
  Shield,
  History,
  Clock
} from 'lucide-react';
import { Surah, QuizQuestion, QuizQuestionType } from '../types';
import { ALL_SURAHS, getSurahById } from '../data/surahs';
import { recordQuizResult } from '../services/storage';
import { getSurahAudioUrl } from '../data/reciters';
import { HISTORICAL_AND_MEANING_QUIZ } from '../data/historicalAndMeaningQuiz';

interface QuizViewProps {
  onPointsEarned: (points: number) => void;
}

export type QuizGameMode = 'balanced' | 'history' | 'contemporary' | 'warsh' | 'sprint' | 'survival';

export const QuizView: React.FC<QuizViewProps> = ({ onPointsEarned }) => {
  // Mode & Scope configuration
  const [gameMode, setGameMode] = useState<QuizGameMode>('balanced');
  const [selectedScope, setSelectedScope] = useState<string>('indispensables');
  const [selectedSurahId, setSelectedSurahId] = useState<number>(112); // Al-Ikhlas
  const [questionCount, setQuestionCount] = useState<number>(8);

  // Active quiz state
  const [isPlayingQuiz, setIsPlayingQuiz] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [reorderedVerses, setReorderedVerses] = useState<{ id: number; text: string; originalIndex: number }[]>([]);

  // Gamification: Streaks, Multipliers, Lives, and Timer
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3); // For Survival mode
  const [timeLeft, setTimeLeft] = useState<number>(60); // For Sprint mode (60s)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio snippet player
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Timer loop for Sprint mode
  useEffect(() => {
    if (isPlayingQuiz && gameMode === 'sprint' && !isQuizCompleted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [isPlayingQuiz, gameMode, isQuizCompleted]);

  const handleTimeUp = () => {
    setIsQuizCompleted(true);
    setIsPlayingQuiz(false);
  };

  // Stop active audio on unmount or question change
  useEffect(() => {
    return () => {
      if (activeAudio) {
        activeAudio.pause();
      }
    };
  }, [currentIndex, activeAudio]);

  // Procedural question generator combining historical context, adolescent reflections, audio, and Warsh specifics
  const generateQuizQuestions = (): QuizQuestion[] => {
    let pool: Surah[] = [];
    if (selectedScope === 'single') {
      const s = getSurahById(selectedSurahId);
      if (s) pool = [s];
    } else if (selectedScope === 'indispensables') {
      pool = ALL_SURAHS.filter(s => s.category === 'indispensables');
    } else if (selectedScope === 'coeur') {
      pool = ALL_SURAHS.filter(s => s.category === 'coeur');
    } else if (selectedScope === 'recits') {
      pool = ALL_SURAHS.filter(s => s.category === 'recits');
    } else if (selectedScope === 'grandes') {
      pool = ALL_SURAHS.filter(s => s.category === 'grandes');
    } else {
      pool = ALL_SURAHS;
    }

    if (pool.length === 0) pool = ALL_SURAHS.slice(25);

    const generated: QuizQuestion[] = [];
    const surahIds = pool.map(s => s.id);

    // 1. If Game Mode is HISTORY, focus strictly on Asbab an-Nuzul & Sirah
    if (gameMode === 'history') {
      const historyQuestions = HISTORICAL_AND_MEANING_QUIZ.filter(
        q => q.category === 'histoire' && (selectedScope === 'all' || surahIds.includes(q.surahId))
      );
      historyQuestions.forEach(hq => {
        generated.push({
          id: hq.id,
          surahId: hq.surahId,
          surahName: hq.surahName,
          type: 'asbab_an_nuzul',
          prompt: hq.question,
          subPrompt: hq.contextBanner,
          contextBanner: hq.contextBanner,
          options: hq.options,
          correctIndex: hq.correctIndex,
          explanation: hq.explanation,
          sourceReference: hq.sourceReference,
          modernReflection: hq.modernReflection,
          difficulty: hq.difficulty
        });
      });
      return generated.sort(() => 0.5 - Math.random()).slice(0, questionCount);
    }

    // 2. If Game Mode is CONTEMPORARY (Sens & Sagesses pour Ados)
    if (gameMode === 'contemporary') {
      const meaningQuestions = HISTORICAL_AND_MEANING_QUIZ.filter(
        q => q.category === 'sens' && (selectedScope === 'all' || surahIds.includes(q.surahId))
      );
      meaningQuestions.forEach(mq => {
        generated.push({
          id: mq.id,
          surahId: mq.surahId,
          surahName: mq.surahName,
          type: 'contemporary_meaning',
          prompt: mq.question,
          subPrompt: mq.contextBanner,
          contextBanner: mq.contextBanner,
          options: mq.options,
          correctIndex: mq.correctIndex,
          explanation: mq.explanation,
          sourceReference: mq.sourceReference,
          modernReflection: mq.modernReflection,
          difficulty: mq.difficulty
        });
      });
      return generated.sort(() => 0.5 - Math.random()).slice(0, questionCount);
    }

    // 3. For BALANCED, SPRINT, and SURVIVAL modes: Assemble a rich, balanced mix
    // A. Inject 2-3 expert historical and adolescent meaning questions first
    const relevantExperts = HISTORICAL_AND_MEANING_QUIZ.filter(
      q => selectedScope === 'all' || surahIds.includes(q.surahId)
    ).sort(() => 0.5 - Math.random());

    relevantExperts.slice(0, 3).forEach(eq => {
      generated.push({
        id: eq.id,
        surahId: eq.surahId,
        surahName: eq.surahName,
        type: eq.category === 'histoire' ? 'asbab_an_nuzul' : 'contemporary_meaning',
        prompt: eq.question,
        subPrompt: eq.contextBanner,
        contextBanner: eq.contextBanner,
        options: eq.options,
        correctIndex: eq.correctIndex,
        explanation: eq.explanation,
        sourceReference: eq.sourceReference,
        modernReflection: eq.modernReflection,
        difficulty: eq.difficulty
      });
    });

    // B. Warsh specific rules question
    generated.push({
      id: 'warsh-spec-1',
      surahId: 112,
      surahName: 'Al-Ikhlas',
      type: 'warsh_tajwid',
      prompt: 'Dans la lecture de Warsh ‘an Nafi’, comment se prononce et s’écrit le dernier mot de la sourate Al-Ikhlas ?',
      subPrompt: '« وَلَمْ يَكُن لَّهُۥ كُفُؤًا أَحَدٌۢ » (Verset 4)',
      options: [
        '« Kufu-an » (كُفُؤًا) avec une hamza explicite sur le wāw',
        '« Kufwan » (كُفُوًا) sans hamza avec une voyelle courte',
        '« Kufa-an » avec allongement obligatoire de 6 temps',
        '« Kuf-an » avec sukun sur le fā’'
      ],
      correctIndex: 0,
      explanation: 'Selon la lecture canonique de Warsh d’après Nâfi‘ (voie d’Al-Azraq), on prononce « Kufu-an » (كُفُؤًا) avec la hamza conservée, contrairement à la lecture de Hafs qui assimile en « Kufuwan » sans hamza.',
      sourceReference: 'Matn Ach-Chatibiyyah & Traité de Tajwîd selon Warsh (Dr. Ayman Swayd)'
    });

    // C. Verset Suivant
    for (const randomSurah of pool) {
      if (randomSurah.verses.length >= 2 && generated.length < questionCount * 2) {
        const vIdx = Math.floor(Math.random() * (randomSurah.verses.length - 1));
        const currentV = randomSurah.verses[vIdx];
        const nextV = randomSurah.verses[vIdx + 1];

        const wrongVerses = ALL_SURAHS.flatMap(s => s.verses)
          .filter(v => v.text !== nextV.text && v.text.length > 5)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(v => v.text);

        const options = [nextV.text, ...wrongVerses].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(nextV.text);

        generated.push({
          id: `next-${randomSurah.id}-${vIdx}`,
          surahId: randomSurah.id,
          surahName: randomSurah.nameTranslit,
          type: 'complete_next_verse',
          prompt: `Quel verset suit immédiatement celui-ci dans la sourate ${randomSurah.nameTranslit} ?`,
          subPrompt: currentV.text,
          options,
          correctIndex,
          explanation: `Le verset ${currentV.number} est immédiatement suivi du verset ${nextV.number} : « ${nextV.text} » (${nextV.translation}).`
        });
        break;
      }
    }

    // D. Mot manquant dans un verset
    for (const randomSurah of pool) {
      const v = randomSurah.verses[Math.floor(Math.random() * randomSurah.verses.length)];
      const words = v.text.split(/\s+/).filter(Boolean);

      if (words.length >= 3 && generated.length < questionCount * 2) {
        const targetWordIdx = Math.floor(Math.random() * words.length);
        const targetWord = words[targetWordIdx];
        const promptWithBlank = words.map((w, idx) => (idx === targetWordIdx ? '______' : w)).join(' ');

        const otherWords = ALL_SURAHS.flatMap(s => s.verses)
          .flatMap(v2 => v2.text.split(/\s+/))
          .filter(w => w !== targetWord && w.length >= 3)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [targetWord, ...otherWords].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(targetWord);

        generated.push({
          id: `missing-${randomSurah.id}-${v.number}`,
          surahId: randomSurah.id,
          surahName: randomSurah.nameTranslit,
          type: 'complete_missing_word',
          prompt: `Complétez le mot manquant dans ce verset de la sourate ${randomSurah.nameTranslit} :`,
          subPrompt: promptWithBlank,
          options,
          correctIndex,
          explanation: `Le mot exact dans la recension de Warsh est « ${targetWord} » : « ${v.text} ».`
        });
        break;
      }
    }

    // E. Audio identification
    if (pool.length > 0) {
      const audioSurah = pool[Math.floor(Math.random() * pool.length)];
      const otherNames = ALL_SURAHS.filter(s => s.id !== audioSurah.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(s => s.nameTranslit);

      const options = [audioSurah.nameTranslit, ...otherNames].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(audioSurah.nameTranslit);

      generated.push({
        id: `audio-${audioSurah.id}`,
        surahId: audioSurah.id,
        surahName: audioSurah.nameTranslit,
        type: 'audio_identify_surah',
        prompt: 'Écoutez la récitation audio en style Warsh. De quelle sourate s’agit-il ?',
        audioUrl: getSurahAudioUrl('husary_warsh', audioSurah.id),
        options,
        correctIndex,
        explanation: `Il s'agit de la sourate ${audioSurah.nameTranslit} (${audioSurah.nameArabic}), récitée par Cheikh Mahmoud Khalil Al-Hussary selon la lecture de Warsh.`
      });
    }

    // Shuffle and pick target count
    const shuffled = generated.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, questionCount);
  };

  const startQuiz = () => {
    const qList = generateQuizQuestions();
    setQuestions(qList);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setComboStreak(0);
    setMaxStreak(0);
    setLives(3);
    setTimeLeft(60);
    setIsQuizCompleted(false);
    setIsPlayingQuiz(true);

    if (qList.length > 0 && qList[0].versesToOrder) {
      setReorderedVerses(qList[0].versesToOrder);
    }
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted) return;

    const currentQ = questions[currentIndex];
    let isCorrect = false;

    if (currentQ.type === 'reorder_verses') {
      let isOrdered = true;
      for (let i = 0; i < reorderedVerses.length - 1; i++) {
        if (reorderedVerses[i].originalIndex > reorderedVerses[i + 1].originalIndex) {
          isOrdered = false;
          break;
        }
      }
      isCorrect = isOrdered;
    } else {
      if (selectedAnswer === null) return;
      isCorrect = selectedAnswer === currentQ.correctIndex;
    }

    setIsAnswerSubmitted(true);

    if (isCorrect) {
      const nextStreak = comboStreak + 1;
      setComboStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);

      const multiplier = nextStreak >= 5 ? 2.5 : nextStreak >= 3 ? 1.5 : 1.0;
      const basePts = currentQ.type === 'asbab_an_nuzul' || currentQ.type === 'contemporary_meaning' ? 15 : 10;
      const pts = Math.round(basePts * multiplier);

      setScore(prev => prev + 1);
      onPointsEarned(pts);

      // In sprint mode, add +5 bonus seconds!
      if (gameMode === 'sprint') {
        setTimeLeft(prev => prev + 5);
      }

      if (nextStreak >= 3) {
        try {
          confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#C9A24B', '#256150', '#ffffff']
          });
        } catch (_) {}
      }
    } else {
      setComboStreak(0);

      // Survival mode: lose a heart
      if (gameMode === 'survival') {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          // Game Over Survival
          setTimeout(() => {
            setIsQuizCompleted(true);
            setIsPlayingQuiz(false);
          }, 1400);
        }
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);

      if (questions[nextIdx] && questions[nextIdx].versesToOrder) {
        setReorderedVerses(questions[nextIdx].versesToOrder);
      }
    } else {
      // Completed!
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsQuizCompleted(true);
    setIsPlayingQuiz(false);

    const percentage = Math.round((score / questions.length) * 100);
    recordQuizResult({
      timestamp: Date.now(),
      scope: `${gameMode} - ${selectedScope}`,
      totalQuestions: questions.length,
      score,
      percentage
    });

    if (percentage >= 75) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C9A24B', '#14332A', '#16A34A', '#FAF6EC']
        });
      } catch (_) {}
    }
  };

  const handlePlayQuestionAudio = (url?: string) => {
    if (!url) return;
    if (activeAudio) {
      activeAudio.pause();
    }
    const audio = new Audio(url);
    setActiveAudio(audio);
    setIsPlayingAudio(true);
    audio.play();
    audio.onended = () => setIsPlayingAudio(false);
    audio.onerror = () => setIsPlayingAudio(false);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div id="quiz-view-page" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28">
      {/* 1. QUIZ HERO BANNER */}
      <div className="w-full rounded-3xl bg-gradient-to-r from-[#14332A] to-[#1F4D3D] text-[#FAF6EC] p-5 sm:p-7 border-2 border-[#C9A24B]/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B] text-[#14332A] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ludique & Pédagogique</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Grand Quiz du Juz 'Amma
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6EC]/85 max-w-xl">
            Testez vos connaissances : contexte historique de la révélation (Asbâb an-Nuzûl), sens profond pour ados, règles canoniques de Warsh et mémorisation.
          </p>
        </div>

        {isPlayingQuiz && (
          <div className="flex items-center gap-3 flex-wrap">
            {/* Survival hearts */}
            {gameMode === 'survival' && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/40 border border-rose-500/40 text-rose-400 font-bold text-xs">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-4 h-4 ${i < lives ? 'fill-rose-500 text-rose-500' : 'text-stone-600'}`}
                  />
                ))}
              </div>
            )}

            {/* Sprint Timer */}
            {gameMode === 'sprint' && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs ${
                  timeLeft <= 10
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-ping'
                    : 'bg-black/40 border-[#C9A24B]/40 text-[#C9A24B]'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            )}

            {/* Combo Streak */}
            {comboStreak >= 2 && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow-xs animate-pulse">
                <Flame className="w-4 h-4" />
                <span>Combo ×{comboStreak >= 5 ? '2.5' : comboStreak >= 3 ? '1.5' : '1.0'}</span>
              </div>
            )}

            <div className="px-3.5 py-1.5 rounded-xl bg-[#14332A]/90 border border-[#C9A24B]/40 text-xs font-bold text-[#C9A24B]">
              Q. {currentIndex + 1} / {questions.length} • Score : {score}
            </div>
          </div>
        )}
      </div>

      {/* 2. CONFIGURATION SCREEN (Before starting) */}
      {!isPlayingQuiz && !isQuizCompleted && (
        <div className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#16221C] border border-stone-200 dark:border-stone-800 shadow-md space-y-7">
          {/* Game Modes Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#C9A24B]" />
                <span>1. Choisissez le Mode de Jeu :</span>
              </label>
              <span className="text-[11px] text-stone-500">6 modes adaptés à tous les profils</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  id: 'balanced',
                  title: 'Défi Équilibré',
                  desc: 'Mix complet : Histoire, sens ados, verset suivant, mot manquant, audio',
                  badge: 'Recommandé'
                },
                {
                  id: 'history',
                  title: 'Contexte & Histoire',
                  desc: 'Asbâb an-Nuzûl, Quraysh, Abu Lahab, Abraha, négociations prophétiques',
                  badge: 'Histoire vivante'
                },
                {
                  id: 'contemporary',
                  title: 'Sens & Sagesses',
                  desc: 'Méditation contemporaine, éthique, discernement et mise en pratique',
                  badge: 'Méditation'
                },
                {
                  id: 'warsh',
                  title: 'Spécificités Warsh',
                  desc: 'Naql, hamza, Rasm maghrébin, règles canoniques de l’Imam Nâfi‘',
                  badge: 'Transmission'
                },
                {
                  id: 'sprint',
                  title: 'Sprint Chrono (60s)',
                  desc: 'Testez vos réflexes ! +5s par bonne réponse, bonus de vitesse',
                  badge: 'Chrono'
                },
                {
                  id: 'survival',
                  title: 'Arène de Mémorisation',
                  desc: '3 erreurs permises. Combien de questions consécutives réussirez-vous ?',
                  badge: 'Défi Maîtrise'
                }
              ].map(mode => (
                <div
                  key={mode.id}
                  onClick={() => setGameMode(mode.id as QuizGameMode)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-2 text-left ${
                    gameMode === mode.id
                      ? 'bg-[#1F4D3D]/10 dark:bg-[#1F4D3D]/40 border-[#C9A24B] ring-2 ring-[#C9A24B]/30 shadow-sm'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#14332A] dark:text-[#FAF6EC]">
                        {mode.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                        {mode.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scope selection - Aligned vertically one below the other */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#C9A24B]" />
              <span>2. Périmètre de Révision :</span>
            </label>
            <div className="flex flex-col space-y-2">
              {[
                {
                  id: 'indispensables',
                  title: 'Les Indispensables',
                  count: 'Sourates 103 à 114 (12 sourates courtes de la prière)',
                  icon: BookOpen,
                  badge: 'Quotidien'
                },
                {
                  id: 'coeur',
                  title: 'Le Cœur du Juz',
                  count: 'Sourates 93 à 102 (Tendresse spirituelle, Ad-Duha à At-Takathur)',
                  icon: Sparkles,
                  badge: 'Essentiel'
                },
                {
                  id: 'recits',
                  title: 'Récits & Enseignements',
                  count: 'Sourates 85 à 92 (Nations passées, serments cosmiques)',
                  icon: Scroll,
                  badge: 'Méditation'
                },
                {
                  id: 'grandes',
                  title: 'Les Grandes Sourates',
                  count: 'Sourates 78 à 84 (Ouverture majestueuse & Jour Dernier)',
                  icon: Award,
                  badge: 'Grandes Sourates'
                },
                {
                  id: 'all',
                  title: 'L\'Ensemble du Juz \'Amma',
                  count: 'Les 37 sourates complètes (78 à 114)',
                  icon: Compass,
                  badge: 'Intégral'
                },
                {
                  id: 'single',
                  title: 'Sourate Ciblée',
                  count: 'Choisissez une sourate précise à réviser',
                  icon: Target,
                  badge: 'Ciblé'
                }
              ].map(opt => {
                const Icon = opt.icon;
                const isSelected = selectedScope === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedScope(opt.id)}
                    className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] ring-1 ring-[#C9A24B] shadow-sm'
                        : 'bg-white dark:bg-[#16221C] border-stone-200 dark:border-stone-800 hover:border-[#C9A24B]/40 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#C9A24B] text-[#14332A]'
                            : 'bg-stone-100 dark:bg-stone-800 text-[#C9A24B]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-xs sm:text-sm truncate">{opt.title}</p>
                        <p
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-[#FAF6EC]/80' : 'text-stone-500 dark:text-stone-400'
                          }`}
                        >
                          {opt.count}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline-block ${
                          isSelected ? 'bg-white/20 text-[#FAF6EC]' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                        }`}
                      >
                        {opt.badge}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#C9A24B] bg-[#C9A24B]' : 'border-stone-300 dark:border-stone-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#14332A]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* If single surah chosen */}
          {selectedScope === 'single' && (
            <div className="space-y-1.5 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <label htmlFor="quiz-surah-picker" className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Sourate spécifique :
              </label>
              <select
                id="quiz-surah-picker"
                value={selectedSurahId}
                onChange={e => setSelectedSurahId(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#121A16] border border-stone-300 dark:border-stone-700 text-sm font-semibold"
              >
                {ALL_SURAHS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.id}. {s.nameTranslit} ({s.nameArabic}) - {s.versesCount} versets
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Question count selector (not applicable in survival) */}
          {gameMode !== 'survival' && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Nombre de questions :
              </label>
              <div className="flex items-center gap-2">
                {[5, 8, 12, 15].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCount(cnt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      questionCount === cnt
                        ? 'bg-[#14332A] text-[#FAF6EC] shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                    }`}
                  >
                    {cnt} questions
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Start CTA */}
          <button
            id="start-quiz-btn"
            onClick={startQuiz}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C9A24B] to-[#d8b056] text-[#14332A] font-black text-base hover:opacity-95 transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-[#14332A]" />
            <span>Lancer la Session ({gameMode.toUpperCase()})</span>
            <ArrowRight className="w-5 h-5 text-[#14332A]" />
          </button>
        </div>
      )}

      {/* 3. ACTIVE QUESTION SCREEN */}
      {isPlayingQuiz && currentQuestion && (
        <div className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#16221C] border-2 border-[#C9A24B]/40 shadow-lg space-y-6">
          {/* Question Category & Origin */}
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800/80 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#C9A24B]/20 text-[#14332A] dark:text-[#C9A24B] font-mono font-bold text-xs">
                Question {currentIndex + 1} / {questions.length}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs">
                {currentQuestion.type === 'asbab_an_nuzul'
                  ? 'Contexte Historique'
                  : currentQuestion.type === 'contemporary_meaning'
                  ? 'Sens & Sagesses'
                  : currentQuestion.type === 'warsh_tajwid'
                  ? 'Règle Canonique Warsh'
                  : currentQuestion.type === 'audio_identify_surah'
                  ? 'Reconnaissance Audio'
                  : currentQuestion.type === 'complete_missing_word'
                  ? 'Compléter le Mot'
                  : 'Mémorisation & Récitation'}
              </span>
            </div>

            {currentQuestion.surahName && (
              <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
                Sourate {currentQuestion.surahName}
              </span>
            )}
          </div>

          {/* Context Banner if Historical Question */}
          {currentQuestion.contextBanner && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/40 dark:to-emerald-950/40 border border-[#C9A24B]/40 text-[#14332A] dark:text-[#FAF6EC] flex items-center gap-3 text-xs font-medium shadow-2xs">
              <Scroll className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <span><strong>Contexte historique :</strong> {currentQuestion.contextBanner}</span>
            </div>
          )}

          {/* Prompt */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-extrabold text-[#14332A] dark:text-[#FAF6EC] leading-snug">
              {currentQuestion.prompt}
            </h2>

            {/* Sub-prompt (e.g. Arabic verse or incomplete verse) */}
            {currentQuestion.subPrompt && currentQuestion.subPrompt !== currentQuestion.contextBanner && (
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-right w-full">
                <p
                  dir="rtl"
                  className="font-quran text-2xl sm:text-3xl text-stone-900 dark:text-[#FAF6EC] leading-loose"
                >
                  {currentQuestion.subPrompt}
                </p>
              </div>
            )}

            {/* Audio question button */}
            {currentQuestion.audioUrl && (
              <div className="pt-2">
                <button
                  onClick={() => handlePlayQuestionAudio(currentQuestion.audioUrl)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A24B] text-[#14332A] font-extrabold text-xs hover:bg-[#d8b056] transition-all shadow-sm"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                  <span>{isPlayingAudio ? 'Lecture en cours (Warsh)...' : 'Écouter l\'extrait audio'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.correctIndex;
              let optionStyle = 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-[#121A16]';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-300';
                } else {
                  optionStyle = 'opacity-40 border-stone-200 dark:border-stone-800';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] ring-2 ring-[#C9A24B]/40 shadow-sm';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-medium ${optionStyle}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#C9A24B] text-[#14332A]'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback & Exegesis Card */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-2xl space-y-2 border text-xs sm:text-sm ${
                selectedAnswer === currentQuestion.correctIndex
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-400 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-400 text-rose-950 dark:text-rose-200'
              }`}
            >
              <div className="font-extrabold flex items-center gap-1.5">
                {selectedAnswer === currentQuestion.correctIndex ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Exact ! Macha’Allah (+{comboStreak >= 3 ? 'Bonus Combo !' : '10 pts'})</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Pas tout à fait...</span>
                  </>
                )}
              </div>

              <p className="leading-relaxed opacity-95">{currentQuestion.explanation}</p>

              {/* Source Reference */}
              {currentQuestion.sourceReference && (
                <div className="pt-2 border-t border-current/20 flex items-center gap-1.5 text-[11px] opacity-80">
                  <BookOpen className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                  <span><strong>Source académique :</strong> {currentQuestion.sourceReference}</span>
                </div>
              )}

              {/* Adolescent Reflection Box */}
              {currentQuestion.modernReflection && (
                <div className="mt-2.5 p-3 rounded-xl bg-white/80 dark:bg-black/30 border border-[#C9A24B]/30 text-[11px] leading-relaxed">
                  <span className="font-extrabold text-[#C9A24B] flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Réflexion pour aujourd'hui (Spécial Ados) :</span>
                  </span>
                  <p className="text-stone-700 dark:text-stone-300 font-medium">
                    {currentQuestion.modernReflection}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Button: Validate or Next */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {isAnswerSubmitted ? 'Question validée' : 'Sélectionnez une réponse'}
            </span>

            {!isAnswerSubmitted ? (
              <button
                id="validate-quiz-answer-btn"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-2.5 rounded-xl bg-[#14332A] text-[#FAF6EC] font-bold text-xs uppercase tracking-wider disabled:opacity-40 hover:bg-[#1F4D3D] transition-colors shadow-sm"
              >
                Valider ma réponse
              </button>
            ) : (
              <button
                id="next-quiz-question-btn"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-[#C9A24B] text-[#14332A] font-black text-xs uppercase tracking-wider hover:bg-[#d8b056] transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>{currentIndex < questions.length - 1 ? 'Question suivante' : 'Bilan & Trophées'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. FINAL SCORE & TROPHIES SUMMARY */}
      {isQuizCompleted && (
        <div className="w-full rounded-3xl p-8 bg-white dark:bg-[#16221C] border-2 border-[#C9A24B]/50 shadow-xl text-center space-y-7 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-[#C9A24B]/20 text-[#C9A24B] flex items-center justify-center mx-auto border-2 border-[#C9A24B]/40 shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">
              Session {gameMode.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#14332A] dark:text-[#FAF6EC]">
              {score === questions.length
                ? 'Score Parfait ! Macha’Allah'
                : score >= Math.ceil(questions.length * 0.7)
                ? 'Excellente Maîtrise !'
                : 'Bilan de la Session'}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
              Vous avez répondu avec succès à <strong className="text-[#C9A24B] text-lg">{score}</strong> sur{' '}
              <strong>{questions.length}</strong> questions ({Math.round((score / questions.length) * 100)}%).
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold border border-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>+{score * 12} pts Hifz gagnés</span>
            </div>

            {maxStreak >= 2 && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-300">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Meilleure série : {maxStreak} d'affilée</span>
              </div>
            )}

            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-extrabold border border-blue-300">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Conforme Warsh & Tafsir Vetté</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => {
                setIsPlayingQuiz(false);
                setIsQuizCompleted(false);
              }}
              className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Changer de mode de jeu
            </button>

            <button
              onClick={startQuiz}
              className="px-6 py-2.5 rounded-xl bg-[#C9A24B] text-[#14332A] text-xs font-black hover:bg-[#d8b056] shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rejouer une série</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
