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
    badge: '🌙 Idéal Hifz',
    emoji: '🌙',
    serverUrl: 'https://server11.mp3quran.net/qari/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'hussary',
    name: 'Mahmûd Khalîl Al-Husarî',
    subname: 'محمود خليل الحصري (ورش)',
    description: "L'enregistrement historique de référence mondiale en Riwâya Warsh 'an Nâfi'. Cadence lente, solennelle et rigueur de Tajwîd incomparable.",
    badge: '🏆 École du Hifz',
    emoji: '🏆',
    serverUrl: 'https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'dosari',
    name: 'Ibrâhîm Ad-Dôsarî',
    subname: 'إبراهيم الدوسري',
    description: "Récitation Warsh 'an Nâfi' posée et sereine, respectant scrupuleusement les temps de prolongation et d'amincissement.",
    badge: '📖 Lecture posée',
    emoji: '📖',
    serverUrl: 'https://server10.mp3quran.net/ibrahim_dosri/Rewayat-Warsh-A-n-Nafi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_ibrahim_aldosary_128kbps/'
  },
  {
    id: 'qazabri',
    name: "'Umar Al-Qazâbrî",
    subname: 'عمر القزابري',
    description: "L'illustre imam de la Grande Mosquée Hassan II de Casablanca, timbre marocain chaleureux et récitation Warsh mélodieuse.",
    badge: '🕌 Mosquée Hassan II',
    emoji: '🕌',
    serverUrl: 'https://server9.mp3quran.net/omr/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'hudhaify',
    name: "'Abdul Rahmân Al-Hudhayfî",
    subname: 'علي بن عبد الرحمن الحذيفي (ورش)',
    description: "Moushaf officiel enregistré au Complexe du Roi Fahd à Médine en Riwâya Warsh 'an Nâfi'. Récitation classique d'une précision académique.",
    badge: '👑 Enregistrement Médine',
    emoji: '👑',
    serverUrl: 'https://server9.mp3quran.net/hthfi/Rewayat-Warsh-A-n-Nafi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'kouchi',
    name: 'Al-Ayyûn Al-Kûshî',
    subname: 'العيون الكوشي',
    description: "Éminent récitateur marocain de la mosquée Al-Andalous de Casablanca, voix émouvante et respect absolu de la tradition de Nâfi'.",
    badge: '✨ Voix émouvante',
    emoji: '✨',
    serverUrl: 'https://server11.mp3quran.net/koshi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'belalya',
    name: 'Rachîd Belâlya',
    subname: 'رشيد بلعالية',
    description: "Voix chaleureuse d'Afrique du Nord, cadence régulière et apaisante pour accompagner le travail quotidien de mémorisation.",
    badge: '🎧 Voix chaleureuse',
    emoji: '🎧',
    serverUrl: 'https://server6.mp3quran.net/bl3/Rewayat-Warsh-A-n-Nafi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'gharbi',
    name: 'Mustafa Gharbi',
    subname: 'مصطفى غربي',
    description: "Figure emblématique de la récitation Warsh marocaine, transmission orale authentique et ferveur spirituelle profonde.",
    badge: '🌿 Tradition marocaine',
    emoji: '🌿',
    serverUrl: 'https://server8.mp3quran.net/gharbi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  },
  {
    id: 'kantaoui',
    name: 'Muhammad Al-Kantaoui',
    subname: 'محمد الكنتاوي',
    description: "Grand maître et enseignant des règles de Tajwîd maghrébin, récitation Warsh académique claire et didactique.",
    badge: '🎓 Maître Tajwîd',
    emoji: '🎓',
    serverUrl: 'https://server11.mp3quran.net/ktawi/',
    everyAyahBase: 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/'
  }
];

export function getSurahAudioUrl(reciterId: string, surahId: number): string {
  const reciter = WARSH_RECITERS.find(r => r.id === reciterId) || WARSH_RECITERS[0];
  const pad = String(surahId).padStart(3, '0');
  return `${reciter.serverUrl}${pad}.mp3`;
}

export function getVerseAudioUrl(reciterId: string, surahId: number, verseNumber: number): string {
  const reciter = WARSH_RECITERS.find(r => r.id === reciterId) || WARSH_RECITERS[0];
  const padSurah = String(surahId).padStart(3, '0');
  const padVerse = String(verseNumber).padStart(3, '0');
  const base = reciter.everyAyahBase || 'https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/';
  return `${base}${padSurah}${padVerse}.mp3`;
}
