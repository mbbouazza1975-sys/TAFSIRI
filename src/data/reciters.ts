import { Reciter } from '../types';

/**
 * 9 Récitateurs authentiques vérifiés en Riwâya Warsh 'an Nâfi'
 * Note : 'Abdul Bâsit 'Abdus-Samad a été retiré car ses enregistrements mondiaux
 * diffusés sur everyayah/serveurs sont en transmission Hafs 'an 'Asim.
 * Les 9 maîtres ci-dessous récitent rigoureusement en Warsh 'an Nâfi' (Tariq Al-Azraq).
 */
export const WARSH_RECITERS: Reciter[] = [
  {
    id: 'yasin',
    name: "Yâsîn Al-Jazâ'irî",
    subname: 'القارئ ياسين الجزائري',
    description: "Récitation Warsh 'an Nâfi' d'une clarté exemplaire, référence absolue pour la mémorisation et la répétition mot à mot.",
    badge: 'Idéal Hifz',
    emoji: '',
    serverUrl: 'https://server11.mp3quran.net/qari/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'hussary',
    name: 'Mahmûd Khalîl Al-Husarî',
    subname: 'محمود خليل الحصري (ورش)',
    description: "L'enregistrement historique de référence mondiale en Riwâya Warsh 'an Nâfi'. Cadence lente, solennelle et rigueur de Tajwîd incomparable.",
    badge: 'École du Hifz',
    emoji: '',
    serverUrl: 'https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/',
    verseAudioNote: "Verset par verset : voix de Yâsîn Al-Jazâ'irî (aucun enregistrement verset par verset de ce récitateur n'est disponible)."
  },
  {
    id: 'dosari',
    name: 'Ibrâhîm Ad-Dôsarî',
    subname: 'إبراهيم الدوسري',
    description: "Récitation Warsh 'an Nâfi' posée et sereine, respectant scrupuleusement les temps de prolongation et d'amincissement.",
    badge: 'Lecture posée',
    emoji: '',
    serverUrl: 'https://server10.mp3quran.net/ibrahim_dosri/Rewayat-Warsh-A-n-Nafi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_ibrahim_aldosary_128kbps/'
  },
  {
    id: 'qazabri',
    name: "'Umar Al-Qazâbrî",
    subname: 'عمر القزابري',
    description: "L'illustre imam de la Grande Mosquée Hassan II de Casablanca, timbre marocain chaleureux et récitation Warsh mélodieuse.",
    badge: 'Mosquée Hassan II',
    emoji: '',
    serverUrl: 'https://server9.mp3quran.net/omr/',
    verseAudioNote: "Verset par verset : voix de Yâsîn Al-Jazâ'irî (aucun enregistrement verset par verset de ce récitateur n'est disponible)."
  },
  {
    id: 'hudhaify',
    name: "'Abdul Rahmân Al-Hudhayfî",
    subname: 'علي بن عبد الرحمن الحذيفي (ورش)',
    description: "Moushaf officiel enregistré au Complexe du Roi Fahd à Médine en Riwâya Warsh 'an Nâfi'. Récitation classique d'une précision académique.",
    badge: 'Enregistrement Médine',
    emoji: '',
    serverUrl: 'https://server9.mp3quran.net/hthfi/Rewayat-Warsh-A-n-Nafi/',
    verseAudioNote: "Verset par verset : voix de Yâsîn Al-Jazâ'irî (aucun enregistrement verset par verset de ce récitateur n'est disponible)."
  },
  {
    id: 'kouchi',
    name: 'Al-Ayyûn Al-Kûshî',
    subname: 'العيون الكوشي',
    description: "Éminent récitateur marocain de la mosquée Al-Andalous de Casablanca, voix émouvante et respect absolu de la tradition de Nâfi'.",
    badge: 'Voix émouvante',
    emoji: '',
    serverUrl: 'https://server11.mp3quran.net/koshi/',
    verseAudioNote: "Verset par verset : voix de Yâsîn Al-Jazâ'irî (aucun enregistrement verset par verset de ce récitateur n'est disponible)."
  },
  {
    id: 'belalya',
    name: 'Rachîd Belâlya',
    subname: 'رشيد بلعالية',
    description: "Voix chaleureuse d'Afrique du Nord, cadence régulière et apaisante pour accompagner le travail quotidien de mémorisation.",
    badge: 'Voix chaleureuse',
    emoji: '',
    serverUrl: 'https://server6.mp3quran.net/bl3/Rewayat-Warsh-A-n-Nafi/',
    verseAudioNote: "Verset par verset : voix de Yâsîn Al-Jazâ'irî (aucun enregistrement verset par verset de ce récitateur n'est disponible)."
  },
  {
    id: 'gharbi',
    name: 'Mustafa Gharbi',
    subname: 'مصطفى غربي',
    description: "Figure emblématique de la récitation Warsh marocaine, transmission orale authentique et ferveur spirituelle profonde.",
    badge: 'Tradition marocaine',
    emoji: '',
    serverUrl: 'https://server8.mp3quran.net/gharbi/',
    verseAudioNote: "Verset par verset : voix de Yâsîn Al-Jazâ'irî (aucun enregistrement verset par verset de ce récitateur n'est disponible)."
  },
  {
    id: 'kantaoui',
    name: 'Muhammad Al-Kantaoui',
    subname: 'محمد الكنتاوي',
    description: "Grand maître et enseignant des règles de Tajwîd maghrébin, récitation Warsh académique claire et didactique.",
    badge: 'Maître Tajwîd',
    emoji: '',
    serverUrl: 'https://server11.mp3quran.net/ktawi/',
    verseAudioNote: "Verset par verset : voix de Yâsîn Al-Jazâ'irî (aucun enregistrement verset par verset de ce récitateur n'est disponible)."
  }
];

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

const YASSIN_EVERYAYAH = 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/';

export function getVerseAudioSegments(reciterId: string, surahId: number, verseNumber: number): VerseAudioSegment[] {
  const reciter = WARSH_RECITERS.find(r => r.id === reciterId) || WARSH_RECITERS[0];
  const base = reciter.everyAyahBase || YASSIN_EVERYAYAH;
  const padSurah = String(surahId).padStart(3, '0');
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
  return getVerseAudioSegments(reciterId, surahId, verseNumber)[0].url;
}
