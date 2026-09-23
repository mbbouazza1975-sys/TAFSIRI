export interface CamelLexiconEntry {
  id: string;
  termArabic: string;
  termTranslit: string;
  root: string; // ex: "ك - ث - ر"
  surahId: number;
  surahName: string;
  verseNumber: number;
  desertOriginalMeaning: string; // Le geste physique ou matériel du chamelier / bédouin
  quranicElevation: string; // Le sens spirituel et moral dans le Coran
  mentalImage: string; // L'image sensorielle percutante pour l'esprit
  verifiedSource: string; // Référence lexicographique classique
}

export const CAMEL_LEXICON_DATABASE: CamelLexiconEntry[] = [
  // --- SOURATE 102 : AT-TAKATHUR ---
  {
    id: '102-1-alhakum',
    termArabic: 'أَلْهَىٰكُمُ',
    termTranslit: 'Alhâkum',
    root: 'ل - ه - و (L-H-W)',
    surahId: 102,
    surahName: 'At-Takâthur',
    verseNumber: 1,
    desertOriginalMeaning: 'Chez les nomades, « al-lahw » désignait le fait qu’une chamelle ou un voyageur quitte la piste balisée de la caravane pour brouter une herbe sèche insignifiante sur le bas-côté, oubliant que la caravane s’éloigne.',
    quranicElevation: 'Désigne l’illusion terrestre qui détourne l’esprit humain de l’essentiel (la mort, le Jugement, l’œuvre pieuse) par de futiles distractions.',
    mentalImage: 'Un chamelier qui s’arrête pour ramasser un caillou brillant pendant que sa caravane disparaît derrière la dune.',
    verifiedSource: 'Lisân al-\'Arab (Ibn Manẓûr) & Maqâyîs al-Lugha (Ibn Fâris)'
  },
  {
    id: '102-1-takathur',
    termArabic: 'ٱلتَّكَاثُرُ',
    termTranslit: 'At-Takâthur',
    root: 'ك - ث - ر (K-TH-R)',
    surahId: 102,
    surahName: 'At-Takâthur',
    verseNumber: 1,
    desertOriginalMeaning: '« Kâthara » chez les tribus du désert décrivait la coutume de rivaliser publiquement en dénombrant ses troupeaux de chameaux (al-ibil), chamelles laitières et guerriers au puits pour humilier le rival.',
    quranicElevation: 'L’obsession maladive d’accumuler toujours plus de richesses, de titres et d’apparences dans une concurrence effrénée jusqu’à l’agonie.',
    mentalImage: 'Deux chameliers au bord d’un point d’eau qui se disputent pour savoir qui possède la plus grande harde de bêtes.',
    verifiedSource: 'Le Lexique du Chameau (Mu\'jam al-Ibil) & Tafsîr Ibn Kathîr'
  },
  {
    id: '102-2-maqabir',
    termArabic: 'ٱلْمَقَابِرَ',
    termTranslit: 'Al-Maqâbir',
    root: 'ق - ب - ر (Q-B-R)',
    surahId: 102,
    surahName: 'At-Takâthur',
    verseNumber: 2,
    desertOriginalMeaning: 'Lors des disputes de clans (« mufâkharah »), lorsque deux tribus étaient à égalité de nombre, elles allaient au cimetière du désert pointer les tombes en criant : « Untel et Untel étaient des nôtres ! » pour surpasser l’autre clan.',
    quranicElevation: 'Le rappel cinglant que cette surenchère ne s’interrompt qu’au moment où la terre referme la tombe sur celui qui croyait tout posséder.',
    mentalImage: 'Un homme qui compte les monticules de pierres des morts, avant d’y être lui-même descendu.',
    verifiedSource: 'Asbâb an-Nuzûl (Al-Wâhidî) & Lisân al-\'Arab'
  },
  {
    id: '102-6-jahim',
    termArabic: 'ٱلْجَحِيمَ',
    termTranslit: 'Al-Jaḥîm',
    root: 'ج - ح - م (J-H-M)',
    surahId: 102,
    surahName: 'At-Takâthur',
    verseNumber: 6,
    desertOriginalMeaning: '« Jaḥmat an-nâr » désignait le foyer ardent resserré dans un trou de pierres pour le protéger du vent glacé du désert, où les braises étouffées rougissent avec une chaleur furieuse.',
    quranicElevation: 'La Fournaise étouffante et comprimée de l’Au-delà, dont l’intensité consume jusqu’aux cœurs.',
    mentalImage: 'Un foyer de braises incandescentes resserré entre trois pierres noircies, vibrant d’une chaleur impitoyable.',
    verifiedSource: 'Maqâyîs al-Lugha (Ibn Fâris) & Tafsîr At-Tabarî'
  },
  {
    id: '102-7-ayn-yaqin',
    termArabic: 'عَيْنَ ٱلْيَقِينِ',
    termTranslit: '‘Ayna l-Yaqîn',
    root: 'ع - ي - ن ( ‘-Y-N)',
    surahId: 102,
    surahName: 'At-Takâthur',
    verseNumber: 7,
    desertOriginalMeaning: 'Pour le nomade assoiffé, « ‘ayn » est la source d’eau vive palpable et réelle vue de ses propres yeux, par opposition au mirage trompeur (« sarâb »).',
    quranicElevation: 'La certitude absolue par la vue directe et sans voile lors du dévoilement des réalités de la Résurrection.',
    mentalImage: 'La source d’eau limpide que le voyageur découvre enfin après avoir failli périr dans l’illusion du mirage.',
    verifiedSource: 'Lisân al-\'Arab & Tafsîr As-Sa‘dî'
  },
  {
    id: '102-8-naim',
    termArabic: 'ٱلنَّعِيمِ',
    termTranslit: 'An-Na‘îm',
    root: 'ن - ع - م (N- ‘-M)',
    surahId: 102,
    surahName: 'At-Takâthur',
    verseNumber: 8,
    desertOriginalMeaning: '« An-Na‘mah » était pour le bédouin la gorgée d’eau douce et fraîche, l’ombre de la tente après une marche torride, et la sécurité du campement.',
    quranicElevation: 'Tous les bienfaits divins (la vue, la santé, le toit, l’eau, la paix) dont chaque âme devra rendre compte en vérité.',
    mentalImage: 'Une coupe d’eau fraîche tendue au voyageur épuisé sous le zénith du désert.',
    verifiedSource: 'Hadith authentique rapporté par At-Tirmidhî & Lisân al-\'Arab'
  },

  // --- SOURATE 103 : AL-'ASR ---
  {
    id: '103-1-asr',
    termArabic: 'وَٱلْعَصْرِ',
    termTranslit: 'Wal-‘Asr',
    root: 'ع - ص - ر ( ‘-S-R)',
    surahId: 103,
    surahName: 'Al-‘Asr',
    verseNumber: 1,
    desertOriginalMeaning: '« ‘Asara » signifie presser avec force, comme on presse une datte ou une grappe pour en faire sortir la dernière goutte de suc.',
    quranicElevation: 'Le temps de la vie humaine qui est pressé goutte à goutte et qui s’épuise sans retour possible.',
    mentalImage: 'Une outre ou une datte que l’on presse jusqu’à la dernière goutte restante avant qu’elle ne sèche.',
    verifiedSource: 'Maqâyîs al-Lugha & Tafsîr Ibn Kathîr'
  },
  {
    id: '103-2-khusr',
    termArabic: 'خُسْرٍ',
    termTranslit: 'Khusr',
    root: 'خ - س - ر (KH-S-R)',
    surahId: 103,
    surahName: 'Al-‘Asr',
    verseNumber: 1,
    desertOriginalMeaning: 'La faillite irréversible de la caravane commerciale dont les marchandises ont péri dans les sables et dont le marchand rentre sans capital ni profit.',
    quranicElevation: 'La perdition de l’être humain qui a dilapidé son capital suprême (le temps imparti de sa vie).',
    mentalImage: 'Le marchand qui ouvre ses sacoches au retour du désert pour n’y trouver que du sable.',
    verifiedSource: 'Lisân al-\'Arab & Tafsîr As-Sa‘dî'
  },

  // --- SOURATE 108 : AL-KAWTHAR ---
  {
    id: '108-1-kawthar',
    termArabic: 'ٱلْكَوْثَرَ',
    termTranslit: 'Al-Kawthar',
    root: 'ك - ث - ر (K-TH-R)',
    surahId: 108,
    surahName: 'Al-Kawthar',
    verseNumber: 1,
    desertOriginalMeaning: 'L’oasis jaillissante dont l’eau surabonde au point d’abreuver des milliers de chameaux sans que son niveau ne faiblisse.',
    quranicElevation: 'Le bassin céleste et l’abondance infinie de grâces accordés au Prophète Muhammad ﷺ ici-bas et dans l’Au-delà.',
    mentalImage: 'Une source aux eaux plus blanches que le lait et plus douces que le miel au milieu d’un désert infini.',
    verifiedSource: 'Sahih Al-Bukhari & Lisân al-\'Arab'
  },
  {
    id: '108-2-inhar',
    termArabic: 'وَٱنْحَرْ',
    termTranslit: 'Wanḥar',
    root: 'ن - ح - ر (N-H-R)',
    surahId: 108,
    surahName: 'Al-Kawthar',
    verseNumber: 2,
    desertOriginalMeaning: '« An-Naḥr » est le terme précis réservé au sacrifice du chameau, debout, en le piquant à la gorge (manḥar) pour partager sa viande généreusement avec toute la tribu et les démunis.',
    quranicElevation: 'L’acte de dévotion pure et de générosité absolue rendu uniquement pour Allah, rompant avec les sacrifices idolâtres des bédouins.',
    mentalImage: 'Le chamelier qui sacrifie sa plus belle chamelle pour nourrir les affamés du désert au nom du Créateur.',
    verifiedSource: 'Le Lexique du Chameau (Mu\'jam al-Ibil) & Tafsîr At-Tabarî'
  },
  {
    id: '108-3-abtar',
    termArabic: 'ٱلْأَبْتَرُ',
    termTranslit: 'Al-Abtar',
    root: 'ب - ت - ر (B-T-R)',
    surahId: 108,
    surahName: 'Al-Kawthar',
    verseNumber: 3,
    desertOriginalMeaning: 'L’animal dont la queue a été coupée ras (« batr »), incapable de chasser les insectes et vulnérable. Terme insultant jeté par Quraysh après le décès du fils du Prophète.',
    quranicElevation: 'L’inversion divine : c’est l’ennemi de la Vérité qui sera retranché de tout bien et oublié de l’Histoire.',
    mentalImage: 'Un arbre déraciné dont les branches sont coupées net, ne laissant aucune descendance.',
    verifiedSource: 'Lisân al-\'Arab & Asbâb an-Nuzûl'
  },

  // --- SOURATE 112 : AL-IKHLAS ---
  {
    id: '112-2-samad',
    termArabic: 'ٱلصَّمَدُ',
    termTranslit: 'As-Samad',
    root: 'ص - م - د (S-M-D)',
    surahId: 112,
    surahName: 'Al-Ikhlâs',
    verseNumber: 2,
    desertOriginalMeaning: 'Pour les bédouins, « as-samad » est le rocher massif, compact et sans faille auquel les voyageurs s’adossent pendant la tempête de sable, et le chef noble vers lequel toute la tribu converge en temps de détresse.',
    quranicElevation: 'L’Être Suprême, autosuffisant, sans creux ni besoin, dont toute la création dépend à chaque instant.',
    mentalImage: 'Un monolithe rocheux inébranlable au cœur du désert vers lequel tous les regards se tournent durant la tempête.',
    verifiedSource: 'Lisân al-\'Arab & Tafsîr Ibn Kathîr'
  },

  // --- SOURATE 113 : AL-FALAQ ---
  {
    id: '113-1-falaq',
    termArabic: 'ٱلْفَلَقِ',
    termTranslit: 'Al-Falaq',
    root: 'ف - ل - ق (F-L-Q)',
    surahId: 113,
    surahName: 'Al-Falaq',
    verseNumber: 1,
    desertOriginalMeaning: 'La fente soudaine qui fend l’obscurité comme un trait d’épée lorsque l’aube pointe sur les dunes, ou la fissure de la roche d’où jaillit une source d’eau.',
    quranicElevation: 'Le Seigneur qui fend les ténèbres de l’inconnu pour faire jaillir la lumière et la protection suprême.',
    mentalImage: 'La première lueur dorée du matin qui déchire l’ombre noire du désert.',
    verifiedSource: 'Maqâyîs al-Lugha & Tafsîr As-Sa‘dî'
  },
  {
    id: '113-3-ghasiq',
    termArabic: 'غَاسِقٍ إِذَا وَقَبَ',
    termTranslit: 'Ghâsiqin idhâ waqab',
    root: 'غ - س - ق / و - ق - ب',
    surahId: 113,
    surahName: 'Al-Falaq',
    verseNumber: 3,
    desertOriginalMeaning: 'La nuit noire sans lune qui tombe d’un coup sur le désert et s’enfonce (« waqaba ») dans les dépressions rocheuses où rôdent bêtes féroces et scorpions.',
    quranicElevation: 'La protection contre les maux insidieux et les périls cachés qui surviennent lorsque la conscience s’assombrit.',
    mentalImage: 'L’obscurité d’encre qui engloutit les campements du désert lorsque la dernière lueur s’éteint.',
    verifiedSource: 'Lisân al-\'Arab & Tafsîr Ibn Kathîr'
  },
  {
    id: '113-4-naffathat',
    termArabic: 'ٱلنَّفَّٰثَٰتِ فِي ٱلْعُقَدِ',
    termTranslit: 'An-Naffâthâti fî l-‘uqad',
    root: 'ن - ف - ث / ع - ق - د',
    surahId: 113,
    surahName: 'Al-Falaq',
    verseNumber: 4,
    desertOriginalMeaning: 'Les nœuds serrés faits dans les cordes d’attache en crin de chameau ou de palmier (« al-‘uqad »), sur lesquels les sorciers soufflaient un postillon léger (« nafth ») pour lier un mauvais sort.',
    quranicElevation: 'La supplique envers Allah pour dénouer les liens maléfiques, les blocages psychologiques et les malveillances.',
    mentalImage: 'Une corde de chameau nouée et imprégnée d’incantations pour nuire, que la foi dénoue instantanément.',
    verifiedSource: 'Tafsîr At-Tabarî & Lisân al-\'Arab'
  },

  // --- SOURATE 114 : AN-NAS ---
  {
    id: '114-4-waswas',
    termArabic: 'ٱلْوَسْوَاسِ ٱلْخَنَّاسِ',
    termTranslit: 'Al-Waswâsi l-Khannâs',
    root: 'و - س - و - س / خ - ن - س',
    surahId: 114,
    surahName: 'An-Nâs',
    verseNumber: 4,
    desertOriginalMeaning: '« Al-Khannâs » : chez les bédouins, la vipère des sables ou le petit chacal qui s’enfouit et disparaît en arrière dès qu’il entend un pas ou le nom du maître, puis ressurgit dès que la vigilance faiblit.',
    quranicElevation: 'Le démon tentateur dont les suggestions s’évanouissent dès que le nom d’Allah est invoqué avec ferveur.',
    mentalImage: 'Un prédateur furtif du sable qui recule précipitamment dans son terrier à la moindre étincelle de lumière.',
    verifiedSource: 'Lisân al-\'Arab & Tafsîr Ibn Kathîr'
  }
];

export function getCamelEntriesForSurah(surahId: number): CamelLexiconEntry[] {
  return CAMEL_LEXICON_DATABASE.filter(e => e.surahId === surahId);
}

export function getCamelEntryForWord(wordArabic: string, surahId?: number): CamelLexiconEntry | undefined {
  const clean = wordArabic.replace(/[\u064B-\u065F\u0670]/g, '').trim();
  return CAMEL_LEXICON_DATABASE.find(e => {
    const entryClean = e.termArabic.replace(/[\u064B-\u065F\u0670]/g, '').trim();
    const matchesWord = entryClean.includes(clean) || clean.includes(entryClean);
    return surahId ? matchesWord && e.surahId === surahId : matchesWord;
  });
}
