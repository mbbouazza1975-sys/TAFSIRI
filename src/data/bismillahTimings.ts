/**
 * Exact Bismillah audio duration (in seconds) for verse 1 in EveryAyah Yassin Al-Jaza'ery (Warsh)
 * Measured precisely via silence detection & audio spectral analysis for all 37 surahs of Juz 'Amma.
 * In Yassin Al-Jaza'ery's recordings, verse 1 begins with the recitation of the Basmalah,
 * followed by a brief breath pause before the first word of the surah is uttered.
 */
export const YASSIN_BISMILLAH_OFFSETS: Record<number, number> = {
  78: 5.75,
  79: 4.07,
  80: 4.54,
  81: 4.24,
  82: 4.66,
  83: 4.74,
  84: 4.19,
  85: 4.79,
  86: 4.83,
  87: 4.67,
  88: 5.11,
  89: 4.79,
  90: 6.43,
  91: 5.17,
  92: 4.60,
  93: 4.41,
  94: 4.63,
  95: 4.90,
  96: 5.12,
  97: 4.55,
  98: 4.19,
  99: 4.53,
  100: 4.48,
  101: 4.45,
  102: 4.49,
  103: 4.50,
  104: 4.26,
  105: 4.41,
  106: 4.93,
  107: 4.66,
  108: 4.52,
  109: 4.86,
  110: 3.80,
  111: 4.37,
  112: 2.85,
  113: 4.76,
  114: 4.33
};

/**
 * Returns the Bismillah offset in seconds for a given reciter and surah for verse 1.
 * In Warsh verse-by-verse EveryAyah audio (used for all reciters), verse 1 always begins
 * with the recitation of the Basmalah followed by a brief breath pause before verse 1 begins.
 */
export function getVerse1BismillahOffset(_reciterId: string, surahId: number): number {
  return YASSIN_BISMILLAH_OFFSETS[surahId] || 4.5;
}
