export interface ReferenceSource {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  badge: string;
  quote: string;
  bio: string;
}

export interface MethodologicalPillar {
  category: string;
  level: string;
  verdict: string;
  details: string;
}

export interface AppliedImprovement {
  id: string;
  source: string;
  title: string;
  description: string;
  impact: string;
  status: 'implemented' | 'verified';
  tag: string;
}

export interface SurahExpertAdvice {
  surahId: number;
  recitationTipWarsh: string;
  contemporaryAdoInsight: string;
  memorizationTechnique: string;
}

export interface WarshCertification {
  title: string;
  date: string;
  edition: string;
  scope: string;
  conformanceReference: string;
  correctedVariants: {
    surah: string;
    verse: number;
    warshReading: string;
    hafsContrast: string;
    grammaticalNote: string;
  }[];
  verdict: string;
}

export const CANONICAL_SOURCES: ReferenceSource[] = [
  {
    id: "warsh-azraq",
    name: "Lecture Warsh 'an Nâfi' (Voie d'Al-Azraq)",
    role: "Corpus Phonétique & Règles Canoniques de Tajwîd",
    specialty: "Rasm maghrébin, règles du Naql (transport de voyelle), amincissement des Râ' et des Lâm, allongements (Badal, Lîn)",
    avatar: "WA",
    badge: "Récitation Warsh",
    quote: "La lecture selon Warsh d'après Nâfi' al-Madanî est le joyau traditionnel du Maghreb et de l'Afrique de l'Ouest : sa mélodie, ses liaisons fluides et ses particularités de vocalisation exigent une fidélité philologique scrupuleuse.",
    bio: "Source de référence : Mushaf al-Madînah an-Nabawiyyah (bi-Riwâyat Warsh 'an Nâfi' min Tarîq al-Azraq) et Mushaf al-Jamahiriyyah / Al-Maghribi al-Atharî."
  },
  {
    id: "tafsir-classique",
    name: "Tafsîr Ibn Kathîr & Tafsîr As-Sa'dî",
    role: "Grandes Exégèses Canoniques Sunnites",
    specialty: "Exégèse du Coran par le Coran et les Ahâdîth authentiques, morale et compréhension spirituelle limpide",
    avatar: "IK",
    badge: "Exégèse Canonique",
    quote: "L'exégèse classique pose le socle inébranlable du sens voulu par la Révélation, protégeant le texte contre toute déformation tout en nourrissant la foi.",
    bio: "Tafsîr al-Qur'ân al-'Adhîm d'Ibn Kathîr (m. 774 H) et Taysîr al-Karîm ar-Rahmân fî Tafsîr Kalâm al-Mannân du Cheikh 'Abd ar-Rahmân As-Sa'dî (m. 1376 H)."
  },
  {
    id: "asbab-nuzul",
    name: "Asbâb an-Nuzûl (Al-Wâhidî & As-Suyûtî)",
    role: "Causes & Contexte Historique de la Révélation",
    specialty: "Événements historiques de la période mecquoise et médinoise, persécutions de Quraysh, défis prophétiques",
    avatar: "AN",
    badge: "Histoire & Contexte",
    quote: "Connaître la cause et le contexte historique de la révélation d'une sourate est la clé essentielle pour en saisir la portée émotionnelle et vivante.",
    bio: "Kitâb Asbâb an-Nuzûl d'Al-Wâhidî an-Naysâbûrî (m. 468 H) et Lubâb an-Nuqûl fî Asbâb an-Nuzûl de l'Imâm Jalâl ad-Dîn As-Suyûtî (m. 911 H)."
  },
  {
    id: "lisan-arab",
    name: "Lisân al-'Arab & Maqâyîs al-Lugha",
    role: "Lexicographie Arabe & Racines du Désert",
    specialty: "Étymologie sémitique, métaphores pastorales bédouines et sémantique originelle du désert",
    avatar: "LA",
    badge: "Dictionnaire du Bédouin",
    quote: "Le Coran a été révélé dans la langue vivante des nomades et commerçants d'Arabie : chaque racine puise son intensité dans les réalités du désert avant d'être élevée à la grandeur céleste.",
    bio: "Lisân al-'Arab d'Ibn Manzûr (m. 711 H) et Mu'jam Maqâyîs al-Lugha d'Ibn Fâris (m. 395 H)."
  },
  {
    id: "pedagogie-hifz",
    name: "Méthode Traditionnelle Sabaq / Sabqi / Manzil",
    role: "Pédagogie de Mémorisation Coranique Structurée",
    specialty: "Ancrage mnésique progressif, répétition espacée, masquage progressif des mots et écoute attentive",
    avatar: "PZ",
    badge: "Méthode Hifz",
    quote: "La mémorisation durable repose sur l'alternance rythmée : la leçon du jour (Sabaq), la consolidation récente (Sabqi) et la révision globale permanente (Manzil).",
    bio: "Pédagogie séculaire des écoles coraniques maghrébines et moyen-orientales, augmentée par les principes modernes de désencombrement cognitif."
  }
];

export const WARSH_TRIPLE_CERTIFICATION: WarshCertification = {
  title: "Vérification Philologique & Variantes Canoniques Warsh",
  date: "Édition 2026",
  edition: "Juz 'Amma (Sourates 78 An-Naba à 114 An-Nâs)",
  scope: "564 versets selon la lecture de Warsh 'an Nâfi'",
  conformanceReference: "Mushaf al-Madînah an-Nabawiyyah (Warsh 'an Nâfi' min Tarîq al-Azraq) & Rasm Al-Maghribi al-Atharî",
  verdict: "Texte relu selon la lecture de Warsh 'an Nâfi' et documentation des 8 variantes canoniques face à Hafs. Une erreur ? Signalez-la pour correction.",
  correctedVariants: [
    {
      surah: "Al-Burûj (85)",
      verse: 22,
      warshReading: "فِى لَوْحٍ مَّحْفُوظٌۭ",
      hafsContrast: "فِى لَوْحٍ مَّحْفُوظٍۭ",
      grammaticalNote: "Rafa' (nominatif avec tanwin damma) chez Nâfi' (Warsh & Qalûn) : l'adjectif 'Mahfûdhun' s'accorde avec 'Qur'ânun majîdun' (Le Coran est préservé)."
    },
    {
      surah: "Al-A'lâ (87)",
      verse: 16,
      warshReading: "بَلْ تُوثِرُونَ ٱلْحَيَوٰةَ ٱلدُّنْيَا",
      hafsContrast: "بَلْ تُؤْثِرُونَ ٱلْحَيَوٰةَ ٱلدُّنْيَا",
      grammaticalNote: "Règle d'Ibdâl de la Hamza quiescente après damma en un Waw allongé mélodieux (Bal tûthirûna)."
    },
    {
      surah: "Al-Fajr (89)",
      verse: 15,
      warshReading: "فَيَقُولُ رَبِّىَ أَكْرَمَنِ",
      hafsContrast: "فَيَقُولُ رَبِّىٓ أَكْرَمَنِ",
      grammaticalNote: "Fathah sur le Yâ' d'annexion (Yâ' al-Idhâfah) chez Warsh : 'Rabbî-ya akraman'."
    },
    {
      surah: "Al-Fajr (89)",
      verse: 16,
      warshReading: "فَيَقُولُ رَبِّىَ أَهَـٰنَنِ",
      hafsContrast: "فَيَقُولُ رَبِّىٓ أَهَـٰنَنِ",
      grammaticalNote: "Fathah sur le Yâ' d'annexion chez Warsh : 'Rabbî-ya ahânan'."
    },
    {
      surah: "Ash-Shams (91)",
      verse: 15,
      warshReading: "فَلَا يَخَافُ عُقْبَـٰهَا",
      hafsContrast: "وَلَا يَخَافُ عُقْبَـٰهَا",
      grammaticalNote: "Rasm canonique du codex Médinois et Damascène avec un Fâ' (فَلَا) au lieu d'un Wâw (وَلَا)."
    },
    {
      surah: "Al-Bayyinah (98)",
      verse: 6,
      warshReading: "أُو۟لَـٰٓئِكَ هُمْ شَرُّ ٱلْبَرِيٓـَٔةِ",
      hafsContrast: "أُو۟لَـٰٓئِكَ هُمْ شَرُّ ٱلْبَرِيَّةِ",
      grammaticalNote: "Maintien de la Hamza originelle (Al-Barî'ah, issue de la racine Bara'a = créer sans modèle) chez Nâfi'."
    },
    {
      surah: "Al-Bayyinah (98)",
      verse: 7,
      warshReading: "أُو۟لَـٰٓئِكَ هُمْ خَيْرُ ٱلْبَرِيٓـَٔةِ",
      hafsContrast: "أُو۟لَـٰٓئِكَ هُمْ خَيْرُ ٱلْبَرِيَّةِ",
      grammaticalNote: "Maintien de la Hamza originelle (Al-Barî'ah) chez Nâfi' (Warsh & Qalûn)."
    },
    {
      surah: "Al-Ikhlâs (112)",
      verse: 4,
      warshReading: "وَلَمْ يَكُن لَّهُۥ كُفُؤًا أَحَدٌۢ",
      hafsContrast: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
      grammaticalNote: "Prononciation avec Hamza franche (Kufu-an) chez Warsh 'an Nâfi', préservée dans les éditions maghrébines."
    }
  ]
};

export const METHODOLOGICAL_PILLARS: MethodologicalPillar[] = [
  {
    category: "Fidélité & Récitation Warsh 'an Nâfi'",
    level: "Rigueur Canonique",
    verdict: "Voie d'Al-Azraq respectée",
    details: "Respect rigoureux du Rasm et de la voie d'Al-Azraq. Les 8 variantes canoniques face à Hafs (dont 85:22, 91:15, 98:6-7, 112:4) sont documentées avec leurs justifications grammaticales."
  },
  {
    category: "Contexte Historique & Asbâb an-Nuzûl",
    level: "Sources Classiques",
    verdict: "Al-Wâhidî & Ibn Kathîr",
    details: "Intégration des causes de la révélation pour chaque sourate (Abraha, Abu Lahab, négociation de Quraysh, Al-Kawthar, Ibn Umm Maktum) pour replacer les versets dans leur environnement prophétique vivant."
  },
  {
    category: "Interprétation pour notre époque",
    level: "Pédagogie & Réflexion",
    verdict: "Applicabilité Contemporaine",
    details: "L'application propose des éclairages contemporains formulés avec l'aide de l'IA pour relier les enseignements coraniques aux défis actuels (scroll infini, amitiés toxiques, estime de soi, gestion du temps et du stress)."
  },
  {
    category: "Pédagogie Hifz & Synchronisation Audio",
    level: "Ergonomie d'Apprentissage",
    verdict: "Précision Mot à Mot",
    details: "Surlignage mot à mot en temps réel avec synchronisation audio (gestion exacte du temps de Basmalah), défilement automatique doux et masque progressif de mémorisation."
  }
];

export const STUDY_GROUP_IMPROVEMENTS: AppliedImprovement[] = [
  {
    id: "imp-audit-warsh",
    source: "Relecture Philologique Warsh",
    title: "Vérification Complète & Correction des 8 Variantes Canoniques Warsh",
    description: "Revue minutieuse de chaque verset de Juz 'Amma (Sourates 78 à 114) par rapport au Mushaf de Médine Warsh. Correction et documentation des variantes historiques (85:22, 87:16, 89:15-16, 91:15, 98:6-7, 112:4).",
    impact: "Garantit une fidélité textuelle conforme à la tradition maghrébine et médinoise.",
    status: "verified",
    tag: "Texte Warsh"
  },
  {
    id: "imp-audio-bismillah",
    source: "Synchronisation Audio & Silence Detection",
    title: "Calibrage Exact de la Basmalah sur les 37 Sourates",
    description: "Mesure acoustique par analyse spectrale du temps exact de la Bismillah au verset 1. Élimination du décalage lors du passage au premier mot de la sourate.",
    impact: "Synchronisation parfaite entre la voix du récitateur et l'illumination du mot à mot.",
    status: "verified",
    tag: "Audio & Récitation"
  },
  {
    id: "imp-dico-bedouin",
    source: "Lexique du Désert (Lisân al-'Arab)",
    title: "Dictionnaire du Bédouin & Racines Pastorales",
    description: "Restitution des racines originelles du désert (chameau, caravane, tente, oasis) pour chaque mot-clé avant d'en montrer l'élévation spirituelle dans le Coran.",
    impact: "Permet de comprendre la force et la poésie concrète de la langue arabe de la Révélation.",
    status: "verified",
    tag: "Lexique"
  },
  {
    id: "imp-quiz-asbab",
    source: "Module Éducatif",
    title: "Quiz Historique, Sens Profond & Modes Sprint / Survie",
    description: "Questions d'histoire vivante (Asbâb an-Nuzûl), sagesses contemporaines, mode Sprint chrono 60s, mode Survie à 3 cœurs et fiches d'exégèse explicatives.",
    impact: "Transforme la révision en une expérience active, stimulante et mémorable.",
    status: "verified",
    tag: "Quiz & Hifz"
  }
];

export const SURAH_EXPERT_ADVICES: Record<number, SurahExpertAdvice> = {
  103: {
    surahId: 103,
    recitationTipWarsh: "Dans 'Wa-l-'Asr', appliquez un tafkhîm (emphase) majestueux sur le Saad (ص) avec un arrêt doux sur le Ra (ر) légèrement emphatisé sans exagérer la vibration.",
    contemporaryAdoInsight: "Al-'Asr est le rappel universel contre le scroll infini : 3 versets qui vous rappellent que perdre 3 heures sur son smartphone sans but est un déficit irrécupérable de votre capital de vie.",
    memorizationTechnique: "Répétez la sourate en binôme avec un ami (chacun récite un verset à l'autre) conformément à la tradition des Compagnons du Prophète ﷺ."
  },
  104: {
    surahId: 104,
    recitationTipWarsh: "Attention à la Ghunna complète sur 'Humazah' et 'Lumazah', et au son percutant de 'Al-Hutamah' qui doit être récité avec gravité.",
    contemporaryAdoInsight: "Ne participez jamais à un groupe WhatsApp ou Discord où l'on se moque d'un camarade absent. Le Coran qualifie ces moqueries de feu destructeur.",
    memorizationTechnique: "Visualisez les deux profils dénoncés (le moqueur physique et le moqueur verbal) pour ancrer fermement les versets 1 et 2."
  },
  105: {
    surahId: 105,
    recitationTipWarsh: "Dans 'Bi-ashâbi l-fîl', prononcez le Yâ' avec une prolongation de 2, 4 ou 6 temps à l'arrêt (Madd 'Arid li-ssukûn), et soignez le son d'argile dans 'Sijjîl'.",
    contemporaryAdoInsight: "Cette sourate rappelle que les plus grands empires ou les tyrans les plus arrogants peuvent s'effondrer en quelques instants sous des moyens d'apparence minuscule.",
    memorizationTechnique: "Mémorisez la sourate en visualisant le film historique : la marche des éléphants, l'arrêt du grand Mahmoud, l'envoi des volées d'oiseaux et la dispersion finale comme une paille broyée."
  },
  106: {
    surahId: 106,
    recitationTipWarsh: "Dans 'Li-îlâfi Quraysh', respectez le Madd Badal sur 'Îlâf' (2, 4 ou 6 temps au choix de Warsh) et le Madd Lîn sur 'Sayf' et 'Khawf' à l'arrêt.",
    contemporaryAdoInsight: "Avoir un réfrigérateur plein et dormir la nuit sans peur de la guerre sont deux bénédictions inestimables mentionnées ici. Ne devenons pas blasés du confort quotidien.",
    memorizationTechnique: "Reliez toujours Sourate Al-Fil et Sourate Quraysh ensemble dans votre esprit : la première détruit l'ennemi extérieur, la seconde célèbre la sécurité commerciale."
  },
  108: {
    surahId: 108,
    recitationTipWarsh: "Respectez le Madd Munfasil de 6 temps obligatoires selon Warsh dans 'Innaa a'taynâk' (إِنَّآ أَعْطَيْنَـٰكَ). Prononciation nette du Kha' (خ) guttural dans 'Wan-har'.",
    contemporaryAdoInsight: "Quand les gens se moquent de toi ou cherchent à te rabaisser en ligne, souviens-toi qu'Allah accorde Ses plus beaux trésors à ceux qui gardent leur dignité.",
    memorizationTechnique: "Trois versets seulement : l'offrande divine (v1), l'action de grâce (v2) et la sentence contre le moqueur (v3). Récitation en une seule respiration possible."
  },
  111: {
    surahId: 111,
    recitationTipWarsh: "Qalqala majeur (Kubrâ) à l'arrêt sur 'Tabba' (وَتَبَّ) avec décharge d'énergie après la shaddah, et Qalqala moyen sur 'Kasab' (كَسَبَ) et 'Masad' (مَسَدٍ).",
    contemporaryAdoInsight: "La richesse, la beauté et les followers d'Abu Lahab et d'Umm Jamil ne leur ont servi à rien face à leur méchanceté. La bonté du cœur est la seule chose qui demeure.",
    memorizationTechnique: "Remarquez la rime en 'B' (Ba) sur les versets 1 à 3 puis la transition vers le feu et la corde au cou (D/Dal) aux versets 4 et 5."
  },
  112: {
    surahId: 112,
    recitationTipWarsh: "En récitation Warsh authentique, le verset 4 se récite avec une Hamza franche : 'Kufu-an' (كُفُؤًا) et non 'Kufuwan'. Qalqala clair sur 'Ahad', 'As-Samad', 'Yalid', 'Yûlad'.",
    contemporaryAdoInsight: "As-Samad signifie que tout dans l'univers a besoin de Dieu alors que Lui n'a besoin de rien. Débarrassez-vous de la dépendance maladive au regard et à la validation d'autrui.",
    memorizationTechnique: "Récitez cette sourate 3 fois avant de dormir en méditant sur chaque phrase : elle équivaut au tiers du Coran en substance théologique."
  }
};
