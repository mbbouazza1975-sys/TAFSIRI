export type SurahCategory = 'grandes' | 'recits' | 'coeur' | 'indispensables';

export interface HistoricalContext {
  typeBadge: 'Mecquoise' | 'Médinoise';
  circumstances: string;
  synthesis: string;
  pedagogicalNote?: string;
  periode?: string;
  nak?: string;
}

export interface HadithInfo {
  text: string;
  source: string;
}

export interface WordGlossary {
  ar: string;
  fr: string;
  simple?: string;
  img?: string;
}

export interface VerseDicoWord {
  ar: string;
  simple: string;
  img?: string;
}

export interface Verse {
  number: number;
  text: string;
  translation: string;
  meaning: string;
  explanation: string;
  sens?: string;
  tafsir?: string;
  words: WordGlossary[];
  dico?: VerseDicoWord[];
}

export interface NoumanAliKhanReflection {
  overview: string;
  linguisticGems: string;
  sourceNote: string;
  videoUrl?: string;
}

export interface SurahQuizItem {
  q: string;
  opts: string[];
  rep: number;
  exp?: string;
}

export interface Surah {
  id: number;
  nameArabic: string;
  nameTranslit: string;
  nameFrench: string;
  category: SurahCategory;
  categoryTitle: string;
  type: 'Mecquoise' | 'Médinoise';
  versesCount: number;
  revelationOrder: number;
  juz: number;
  bismillah: boolean;
  keyMessage: string;
  toRemember: string;
  historicalContext: HistoricalContext;
  inPlainLanguage: string;
  andToday: string;
  hadith: HadithInfo | null;
  noumanAliKhan?: NoumanAliKhanReflection;
  intro?: string;
  valeur?: string;
  hadithText?: string;
  enClairSimple?: string;
  etAujourdhui?: string;
  quizQuestions?: SurahQuizItem[];
  verses: Verse[];
}

export interface Reciter {
  id: string;
  name: string;
  subname: string;
  description: string;
  badge: string;
  serverUrl: string;
  everyAyahBase?: string;
  emoji?: string;
}

export type TajwidFamily = 'madd' | 'ghunna' | 'qalqala' | 'tafkhim' | 'naql';

export interface TajwidRuleItem {
  id: TajwidFamily;
  name: string;
  description: string;
  subrules: string;
  colorHex: string;
  darkColorHex: string;
  badgeClass: string;
}

export type QuizQuestionType =
  | 'complete_next_verse'
  | 'complete_missing_word'
  | 'reorder_verses'
  | 'verse_to_meaning'
  | 'meaning_to_verse'
  | 'audio_identify_surah'
  | 'audio_identify_verse'
  | 'asbab_an_nuzul'
  | 'contemporary_meaning'
  | 'warsh_tajwid';

export interface QuizQuestion {
  id: string;
  surahId: number;
  surahName?: string;
  type: QuizQuestionType;
  prompt: string;
  subPrompt?: string;
  contextBanner?: string;
  audioUrl?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  sourceReference?: string;
  modernReflection?: string;
  difficulty?: 'facile' | 'moyen' | 'expert';
  versesToOrder?: { id: number; text: string; originalIndex: number }[];
}

export interface QuizResult {
  id?: number;
  timestamp: number;
  scope: string; // e.g. "Surah 94" or "Juz 'Amma (37 sourates)" or category
  totalQuestions: number;
  score: number;
  percentage: number;
}

export interface UserSettings {
  preferredReciterId: string;
  playbackSpeed: number;
  repeatMode: '1' | '2' | '3' | 'loop';
  dailyGoalVerses: number;
  theme: 'light' | 'dark' | 'system' | 'parchemin' | 'nuit' | 'emeraude';
  arabicFontSize: number; // 24 to 48px
  dailyReminder: boolean;
}

export interface UserProgress {
  memorizedSurahIds: number[];
  inProgressSurahIds: number[];
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  points: number;
  totalListeningSeconds: number;
  favorites: string[]; // e.g. "94:1", "112:3"
  history: Array<{ date: string; seconds: number; versesLearned: number }>;
}
