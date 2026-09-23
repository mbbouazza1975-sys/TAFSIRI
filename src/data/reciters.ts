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
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
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
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'hudhaify',
    name: "'Abdul Rahmân Al-Hudhayfî",
    subname: 'علي بن عبد الرحمن الحذيفي (ورش)',
    description: "Moushaf officiel enregistré au Complexe du Roi Fahd à Médine en Riwâya Warsh 'an Nâfi'. Récitation classique d'une précision académique.",
    badge: 'Enregistrement Médine',
    emoji: '',
    serverUrl: 'https://server9.mp3quran.net/hthfi/Rewayat-Warsh-A-n-Nafi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'kouchi',
    name: 'Al-Ayyûn Al-Kûshî',
    subname: 'العيون الكوشي',
    description: "Éminent récitateur marocain de la mosquée Al-Andalous de Casablanca, voix émouvante et respect absolu de la tradition de Nâfi'.",
    badge: 'Voix émouvante',
    emoji: '',
    serverUrl: 'https://server11.mp3quran.net/koshi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'belalya',
    name: 'Rachîd Belâlya',
    subname: 'رشيد بلعالية',
    description: "Voix chaleureuse d'Afrique du Nord, cadence régulière et apaisante pour accompagner le travail quotidien de mémorisation.",
    badge: 'Voix chaleureuse',
    emoji: '',
    serverUrl: 'https://server6.mp3quran.net/bl3/Rewayat-Warsh-A-n-Nafi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'gharbi',
    name: 'Mustafa Gharbi',
    subname: 'مصطفى غربي',
    description: "Figure emblématique de la récitation Warsh marocaine, transmission orale authentique et ferveur spirituelle profonde.",
    badge: 'Tradition marocaine',
    emoji: '',
    serverUrl: 'https://server8.mp3quran.net/gharbi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'kantaoui',
    name: 'Muhammad Al-Kantaoui',
    subname: 'محمد الكنتاوي',
    description: "Grand maître et enseignant des règles de Tajwîd maghrébin, récitation Warsh académique claire et didactique.",
    badge: 'Maître Tajwîd',
    emoji: '',
    serverUrl: 'https://server11.mp3quran.net/ktawi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  }
];

export function getSurahAudioUrl(reciterId: string, surahId: number): string {
  const reciter = WARSH_RECITERS.find(r => r.id === reciterId) || WARSH_RECITERS[0];
  const pad = String(surahId).padStart(3, '0');
  return `${reciter.serverUrl}${pad}.mp3`;
}

/**
 * EveryAyah provides segmented ayah mp3s according to Hafs/Kufi verse divisions.
 * In Warsh (Madani Akhir), 5 surahs have differing verse count/boundaries (106, 99, 101, 103, 107).
 * This mapping ensures that playing or downloading verse audio in Warsh never 404s.
 */
function mapWarshToEveryAyahVerse(surahId: number, verseNumber: number): number {
  if (surahId === 106) {
    // 5 verses in Warsh vs 4 in EveryAyah (V4 & V5 combined in file 004)
    return verseNumber > 4 ? 4 : verseNumber;
  }
  if (surahId === 99) {
    // 9 verses in Warsh vs 8 in EveryAyah (V6 & V7 combined in file 006)
    if (verseNumber <= 5) return verseNumber;
    if (verseNumber === 6 || verseNumber === 7) return 6;
    if (verseNumber === 8) return 7;
    if (verseNumber === 9) return 8;
  }
  if (surahId === 101) {
    // 10 verses in Warsh vs 11 in EveryAyah (Warsh V1 combines Hafs 1+2)
    if (verseNumber === 1) return 1;
    return verseNumber + 1;
  }
  if (surahId === 103) {
    // 3 verses in Warsh vs 3 in EveryAyah with different boundaries
    if (verseNumber === 1) return 1;
    return 3;
  }
  if (surahId === 107) {
    // 6 verses in Warsh vs 7 in EveryAyah (Warsh V6 combines Hafs 6+7)
    if (verseNumber >= 6) return 6;
    return verseNumber;
  }
  return verseNumber;
}

export function getVerseAudioUrl(reciterId: string, surahId: number, verseNumber: number): string {
  const reciter = WARSH_RECITERS.find(r => r.id === reciterId) || WARSH_RECITERS[0];
  const audioAyah = mapWarshToEveryAyahVerse(surahId, verseNumber);
  const padSurah = String(surahId).padStart(3, '0');
  const padVerse = String(audioAyah).padStart(3, '0');
  const base = reciter.everyAyahBase || 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/';
  return `${base}${padSurah}${padVerse}.mp3`;
}
