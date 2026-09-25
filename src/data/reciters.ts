import { Reciter } from '../types';
import { VERSE_TIMINGS } from './verseTimings';

/**
 * Récitateurs Warsh 'an Nâfi' — RÈGLE : un récitateur n'est listé que si l'app peut jouer
 * SA propre voix verset par verset, soit :
 *  - fichiers verset par verset everyayah.com (dossiers /warsh/) : Yâsîn, Ad-Dôsarî ;
 *  - fichier sourate entière mp3quran.net + minutage officiel par verset (API ayat_timing,
 *    numérotation Warsh vérifiée sur les 37 sourates) : Al-Husarî, Al-Qazâbrî, Al-Kûshî.
 * Aucun repli vers une autre voix n'existe dans le code.
 */
export const WARSH_RECITERS: Reciter[] = [
  {
    id: 'yasin',
    name: "Yâsîn Al-Jazâ'irî",
    subname: 'القارئ ياسين الجزائري',
    description: "Récitation Warsh 'an Nâfi' claire et régulière, adaptée à la mémorisation et à la répétition.",
    badge: 'Idéal Hifz',
    emoji: '',
    serverUrl: 'https://server11.mp3quran.net/qari/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'dosari',
    name: 'Ibrâhîm Ad-Dôsarî',
    subname: 'إبراهيم الدوسري',
    description: "Récitation Warsh 'an Nâfi' posée et sereine.",
    badge: 'Lecture posée',
    emoji: '',
    serverUrl: 'https://server10.mp3quran.net/ibrahim_dosri/Rewayat-Warsh-A-n-Nafi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_ibrahim_aldosary_128kbps/'
  },
  {
    id: 'hussary',
    name: 'Mahmûd Khalîl Al-Husarî',
    subname: 'محمود خليل الحصري (ورش)',
    description: "Enregistrement Warsh 'an Nâfi' du grand maître égyptien : cadence lente et articulation très nette, excellente pour apprendre.",
    badge: 'Cadence lente',
    emoji: '',
    serverUrl: 'https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/',
    usesVerseTimings: true
  },
  {
    id: 'qazabri',
    name: "'Umar Al-Qazâbrî",
    subname: 'عمر القزابري',
    description: "Imam marocain de la mosquée Hassan II de Casablanca, récitation Warsh mélodieuse.",
    badge: 'Voix marocaine',
    emoji: '',
    serverUrl: 'https://server9.mp3quran.net/omar_warsh/',
    usesVerseTimings: true
  },
  {
    id: 'kouchi',
    name: 'Al-ʿAyûn Al-Kûshî',
    subname: 'العيون الكوشي',
    description: "Récitateur marocain, lecture Warsh fluide au rythme soutenu.",
    badge: 'Rythme fluide',
    emoji: '',
    serverUrl: 'https://server11.mp3quran.net/koshi/',
    usesVerseTimings: true
  }
];

export const DEFAULT_RECITER_ID = 'yasin';

/** Renvoie un identifiant valide (les anciens récitateurs retirés sont ramenés au récitateur par défaut). */
export function normalizeReciterId(id: string | null | undefined): string {
  return id && WARSH_RECITERS.some(r => r.id === id) ? id : DEFAULT_RECITER_ID;
}

export function getSurahAudioUrl(reciterId: string, surahId: number): string {
  const reciter = WARSH_RECITERS.find(r => r.id === reciterId) || WARSH_RECITERS[0];
  const pad = String(surahId).padStart(3, '0');
  return `${reciter.serverUrl}${pad}.mp3`;
}

/**
 * Les fichiers verset par verset d'everyayah.com (dossiers Warsh) suivent la numérotation Hafs (koufie).
 * Le texte de l'app suit le comptage madanî de Warsh : 8 sourates ont des coupures différentes.
 * Chaque verset Warsh est donc joué comme une suite de « segments » :
 *  - ayah : numéro du fichier (numérotation Hafs)
 *  - from / to : portion du fichier à jouer (fraction de sa durée) — pour un verset Warsh né d'un verset Hafs scindé
 *  - vFrom / vTo : part du verset Warsh couverte par ce segment (pour le surlignage mot à mot)
 * Les coupes internes (from/to < 1) sont estimées au prorata des lettres : approximation de quelques dixièmes de seconde.
 */
export interface VerseAudioSegment {
  url: string;
  from: number;
  to: number;
  vFrom: number;
  vTo: number;
  /** Bornes absolues en secondes (fichier sourate entière minuté) — prioritaires sur from/to */
  startSec?: number;
  endSec?: number;
  /** Durée d'introduction (isti'âdha/basmala) au début du segment, sans surlignage */
  introSec?: number;
}

type SegSpec = { ayah: number; from?: number; to?: number; vFrom?: number; vTo?: number };

function whole(ayah: number): SegSpec[] {
  return [{ ayah }];
}
function part(ayah: number, from: number, to: number): SegSpec[] {
  return [{ ayah, from, to }];
}
function merged(a: number, b: number, share: number): SegSpec[] {
  return [
    { ayah: a, vFrom: 0, vTo: share },
    { ayah: b, vFrom: share, vTo: 1 }
  ];
}

function getWarshSegmentSpecs(surahId: number, v: number): SegSpec[] {
  switch (surahId) {
    case 79: // Warsh 37 = Hafs 37 + 38
      if (v < 37) return whole(v);
      if (v === 37) return merged(37, 38, 0.4);
      return whole(v + 1);
    case 89: // Warsh coupe Hafs 15, 16, 23 et réunit Hafs 29 + 30
      if (v <= 14) return whole(v);
      if (v === 15) return part(15, 0, 0.73);
      if (v === 16) return part(15, 0.73, 1);
      if (v === 17) return part(16, 0, 0.69);
      if (v === 18) return part(16, 0.69, 1);
      if (v <= 24) return whole(v - 2);
      if (v === 25) return part(23, 0, 0.33);
      if (v === 26) return part(23, 0.33, 1);
      if (v <= 31) return whole(v - 3);
      return merged(29, 30, 0.57);
    case 96: // Warsh coupe Hafs 15
      if (v <= 14) return whole(v);
      if (v === 15) return part(15, 0, 0.46);
      if (v === 16) return part(15, 0.46, 1);
      return whole(v - 1);
    case 99: // Warsh coupe Hafs 6
      if (v <= 5) return whole(v);
      if (v === 6) return part(6, 0, 0.65);
      if (v === 7) return part(6, 0.65, 1);
      return whole(v - 1);
    case 101: // Warsh 1 = Hafs 1 + 2
      if (v === 1) return merged(1, 2, 0.44);
      return whole(v + 1);
    case 103: // Warsh 1 = Hafs 1 + 2 ; Warsh 2 et 3 = Hafs 3 coupé
      if (v === 1) return merged(1, 2, 0.3);
      if (v === 2) return part(3, 0, 0.75);
      return part(3, 0.75, 1);
    case 106: // Warsh coupe Hafs 4
      if (v <= 3) return whole(v);
      if (v === 4) return part(4, 0, 0.56);
      return part(4, 0.56, 1);
    case 107: // Warsh 6 = Hafs 6 + 7
      if (v <= 5) return whole(v);
      return merged(6, 7, 0.48);
    default:
      return whole(v);
  }
}

export function getVerseAudioSegments(reciterId: string, surahId: number, verseNumber: number): VerseAudioSegment[] {
  const reciter = WARSH_RECITERS.find(r => r.id === reciterId) || WARSH_RECITERS[0];
  const padSurah = String(surahId).padStart(3, '0');
  if (reciter.usesVerseTimings) {
    const t = VERSE_TIMINGS[reciter.id]?.[String(surahId)]?.[verseNumber - 1];
    if (t) {
      const url = `${reciter.serverUrl}${padSurah}.mp3`;
      // Verset 1 : on garde l'introduction (basmala) du fichier, comme les fichiers par verset
      const startSec = verseNumber === 1 ? 0 : t[0] / 1000;
      const introSec = verseNumber === 1 ? t[0] / 1000 : 0;
      return [{ url, from: 0, to: 1, vFrom: 0, vTo: 1, startSec, endSec: t[1] / 1000, introSec }];
    }
    return [];
  }
  const base = reciter.everyAyahBase as string;
  return getWarshSegmentSpecs(surahId, verseNumber).map(spec => ({
    url: `${base}${padSurah}${String(spec.ayah).padStart(3, '0')}.mp3`,
    from: spec.from ?? 0,
    to: spec.to ?? 1,
    vFrom: spec.vFrom ?? 0,
    vTo: spec.vTo ?? 1
  }));
}

export function getVerseAudioUrl(reciterId: string, surahId: number, verseNumber: number): string {
  // Premier fichier du verset (utilisé par les quiz audio)
  return getVerseAudioSegments(reciterId, surahId, verseNumber)[0]?.url ?? '';
}
