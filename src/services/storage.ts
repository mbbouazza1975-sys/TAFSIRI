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
