import Dexie, { Table } from 'dexie';
import { UserSettings, UserProgress, QuizResult } from '../types';

export interface CachedAudioRecord {
  id: string; // e.g. "reciterId_surahId"
  reciterId: string;
  surahId: number;
  blob: Blob;
  sizeBytes: number;
  cachedAt: number;
}

export interface StoredProgressRecord {
  id: string;
  data: UserProgress;
}

export interface StoredSettingsRecord {
  id: string;
  data: UserSettings;
}

export class WarshHifzDatabase extends Dexie {
  settings!: Table<StoredSettingsRecord, string>;
  progress!: Table<StoredProgressRecord, string>;
  quizHistory!: Table<QuizResult, number>;
  audioCache!: Table<CachedAudioRecord, string>;

  constructor() {
    super('WarshHifzDB');
    this.version(1).stores({
      settings: 'id',
      progress: 'id',
      quizHistory: '++id, timestamp, scope',
      audioCache: 'id, reciterId, surahId'
    });
  }
}

export const db = new WarshHifzDatabase();

export const DEFAULT_SETTINGS: UserSettings = {
  preferredReciterId: 'yasin',
  playbackSpeed: 1,
  repeatMode: '1',
  dailyGoalVerses: 5,
  theme: 'light',
  arabicFontSize: 30,
  dailyReminder: false
};

const TODAY = new Date().toISOString().split('T')[0];

export const DEFAULT_PROGRESS: UserProgress = {
  memorizedSurahIds: [],
  inProgressSurahIds: [114],
  streakDays: 1,
  lastActiveDate: TODAY,
  points: 50,
  totalListeningSeconds: 0,
  favorites: [],
  history: [{ date: TODAY, seconds: 0, versesLearned: 0 }]
};

export async function loadUserSettings(): Promise<UserSettings> {
  try {
    const record = await db.settings.get('main');
    if (record && record.data) {
      return { ...DEFAULT_SETTINGS, ...record.data };
    }
  } catch (err) {
    console.warn('Could not read settings from DB, trying localStorage', err);
  }
  const local = localStorage.getItem('warsh_settings');
  return local ? { ...DEFAULT_SETTINGS, ...JSON.parse(local) } : DEFAULT_SETTINGS;
}

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  try {
    await db.settings.put({ id: 'main', data: settings });
  } catch (err) {
    console.warn('Could not save settings to DB', err);
  }
  localStorage.setItem('warsh_settings', JSON.stringify(settings));
}

export async function loadUserProgress(): Promise<UserProgress> {
  try {
    const record = await db.progress.get('main');
    if (record && record.data) {
      return { ...DEFAULT_PROGRESS, ...record.data };
    }
  } catch (err) {
    console.warn('Could not read progress from DB, trying localStorage', err);
  }
  const local = localStorage.getItem('warsh_progress');
  return local ? { ...DEFAULT_PROGRESS, ...JSON.parse(local) } : DEFAULT_PROGRESS;
}

export async function saveUserProgress(progress: UserProgress): Promise<void> {
  try {
    await db.progress.put({ id: 'main', data: progress });
  } catch (err) {
    console.warn('Could not save progress to DB', err);
  }
  localStorage.setItem('warsh_progress', JSON.stringify(progress));
}

export async function recordQuizResult(result: Omit<QuizResult, 'id'>): Promise<void> {
  try {
    await db.quizHistory.add({ ...result } as QuizResult);
  } catch (err) {
    console.warn('Failed to save quiz result', err);
  }
}

export async function getQuizHistory(): Promise<QuizResult[]> {
  try {
    return await db.quizHistory.orderBy('timestamp').reverse().limit(30).toArray();
  } catch {
    return [];
  }
}

// Audio offline caching via IndexedDB & Cache API
export async function cacheSurahAudio(reciterId: string, surahId: number, audioUrl: string): Promise<boolean> {
  try {
    const response = await fetch(audioUrl, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const id = `${reciterId}_${surahId}`;
    await db.audioCache.put({
      id,
      reciterId,
      surahId,
      blob,
      sizeBytes: blob.size,
      cachedAt: Date.now()
    });
    return true;
  } catch (err) {
    console.error('Failed to cache audio:', err);
    return false;
  }
}

export async function getCachedAudioUrl(reciterId: string, surahId: number): Promise<string | null> {
  try {
    const id = `${reciterId}_${surahId}`;
    const record = await db.audioCache.get(id);
    if (record && record.blob) {
      return URL.createObjectURL(record.blob);
    }
  } catch (err) {
    console.warn('Error reading cached audio:', err);
  }
  return null;
}

export async function isSurahAudioCached(reciterId: string, surahId: number): Promise<boolean> {
  try {
    const id = `${reciterId}_${surahId}`;
    const count = await db.audioCache.where('id').equals(id).count();
    return count > 0;
  } catch {
    return false;
  }
}

export async function getAllCachedAudios(): Promise<CachedAudioRecord[]> {
  try {
    return await db.audioCache.toArray();
  } catch {
    return [];
  }
}

export async function clearAudioCache(): Promise<void> {
  try {
    await db.audioCache.clear();
  } catch (err) {
    console.error('Failed to clear audio cache', err);
  }
}

export async function exportUserData(): Promise<string> {
  const settings = await loadUserSettings();
  const progress = await loadUserProgress();
  const quizzes = await getQuizHistory();
  return JSON.stringify({ settings, progress, quizzes, exportedAt: new Date().toISOString() }, null, 2);
}

export async function importUserData(jsonStr: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonStr);
    if (data.settings) await saveUserSettings(data.settings);
    if (data.progress) await saveUserProgress(data.progress);
    return true;
  } catch {
    return false;
  }
}

/**
 * Migrations des données enregistrées sur l'appareil.
 *
 * v2 (23/09/2026) : passage de la numérotation Hafs (koufie) au comptage madanî de Warsh.
 * Seules les sourates 79, 89 et 96 changent de numérotation dans le Juz 'Amma
 * (99, 101, 103, 106 et 107 étaient déjà découpées selon Warsh avant cette version).
 * Les versets « connus » et les favoris enregistrés avec l'ancienne numérotation
 * sont renumérotés une seule fois.
 */

const MIGRATION_KEY = 'warsh_verse_numbering';
const TARGET_VERSION = '2';

/** Ancien numéro (Hafs) → nouveau(x) numéro(s) (Warsh). */
export function mapHafsToWarshVerse(surahId: number, n: number): number[] {
  switch (surahId) {
    case 79: // Hafs 37 + 38 = Warsh 37
      if (n <= 37) return [n];
      if (n === 38) return [37];
      return [n - 1];
    case 89: // Hafs 15, 16, 23 coupés ; Hafs 29 + 30 = Warsh 32
      if (n <= 14) return [n];
      if (n === 15) return [15, 16];
      if (n === 16) return [17, 18];
      if (n <= 22) return [n + 2];
      if (n === 23) return [25, 26];
      if (n <= 28) return [n + 4];
      return [32];
    case 96: // Hafs 15 coupé
      if (n <= 14) return [n];
      if (n === 15) return [15, 16];
      return [n + 1];
    default:
      return [n];
  }
}

const CHANGED_SURAHS = [79, 89, 96];

function migrateKnownVerses(): void {
  for (const surahId of CHANGED_SURAHS) {
    const key = `warsh_known_verses_${surahId}`;
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    let old: Record<string, boolean>;
    try {
      old = JSON.parse(raw);
    } catch {
      continue;
    }
    // Un verset Warsh issu de deux versets Hafs n'est « connu » que si les deux l'étaient.
    const votes: Record<number, boolean[]> = {};
    for (const [num, known] of Object.entries(old)) {
      for (const target of mapHafsToWarshVerse(surahId, Number(num))) {
        (votes[target] = votes[target] || []).push(!!known);
      }
    }
    const merged: Record<number, number> = { 79: 37, 89: 32 } as Record<number, number>;
    const updated: Record<number, boolean> = {};
    for (const [target, vals] of Object.entries(votes)) {
      const t = Number(target);
      const needsTwo = merged[surahId] === t;
      const allKnown = vals.every(Boolean) && (!needsTwo || vals.length >= 2);
      if (allKnown) updated[t] = true;
    }
    localStorage.setItem(key, JSON.stringify(updated));
  }
}

function migrateFavorites(favorites: string[]): string[] {
  const out = favorites.map(key => {
    const [s, v] = key.split(':').map(Number);
    if (!CHANGED_SURAHS.includes(s) || !v) return key;
    return `${s}:${mapHafsToWarshVerse(s, v)[0]}`;
  });
  return Array.from(new Set(out));
}

export async function runDataMigrations(): Promise<void> {
  try {
    if (localStorage.getItem(MIGRATION_KEY) === TARGET_VERSION) return;

    migrateKnownVerses();

    // Favoris : IndexedDB (source principale) + copie localStorage
    try {
      const record = await db.progress.get('main');
      if (record?.data?.favorites?.length) {
        record.data.favorites = migrateFavorites(record.data.favorites);
        await db.progress.put(record);
      }
    } catch (err) {
      console.warn('[Migration] IndexedDB indisponible', err);
    }
    const local = localStorage.getItem('warsh_progress');
    if (local) {
      try {
        const p = JSON.parse(local);
        if (Array.isArray(p.favorites)) {
          p.favorites = migrateFavorites(p.favorites);
          localStorage.setItem('warsh_progress', JSON.stringify(p));
        }
      } catch {
        /* données illisibles : on ne touche à rien */
      }
    }

    localStorage.setItem(MIGRATION_KEY, TARGET_VERSION);
  } catch (err) {
    console.warn('[Migration] échec, données laissées intactes', err);
  }
}
