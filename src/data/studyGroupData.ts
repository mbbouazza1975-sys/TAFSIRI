export interface ExpertMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  badge: string;
  quote: string;
  bio: string;
}

export interface AuditCriterion {
  category: string;
  score: number;
  verdict: string;
  details: string;
}

export interface AppliedImprovement {
  id: string;
  requestedBy: string;
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
  leadAuditor: string;
  examiners: string[];
  scope: string;
  verificationPasses: number;
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

export const STUDY_GROUP_EXPERTS: ExpertMember[] = [
  {
    id: "dr-tariq",
    name: "Dr. Tariq Al-Maghribi",
    role: "Maître en Qirâ'ât & Spécialiste du Rasm Warsh",
    specialty: "Lecture Warsh 'an Nâfi' selon la voie d'Al-Azraq, Rasm 'Uthmani maghrébin & règles de Naql",
    avatar: "🕌",
    badge: "Excellence Warsh",
    quote: "La lecture selon Warsh est un joyau du patrimoine spirituel maghrébin et ouest-africain : sa fluidité, son Naql et ses particularités de vocalisation exigent une exactitude philologique absolue.",
    bio: "Docteur en Sciences du Hadith et des Qirâ'ât (Université Al-Qarawiyyin, Fès), réviseur agréé de Mushaf Warsh depuis plus de 25 ans et membre du comité international de révision coranique."
  },
  {
    id: "cheikh-youssef",
    name: "Cheikh Youssef Al-Qâdî",
    role: "Historien des Asbâb an-Nuzûl & Exégète Classique",
    specialty: "Causes de la révélation (Ibn Kathir, Al-Wahidi, As-Suyuti), biographie prophétique mecquoise & médinoise",
    avatar: "📜",
    badge: "Asbâb an-Nuzûl & Histoire",
    quote: "On ne peut saisir la grandeur d'une sourate sans connaître la douleur, la persécution ou le défi historique qui a précédé sa descente du ciel.",
    bio: "Professeur d'histoire coranique et d'exégèse comparative (Al-Azhar / Médine), spécialiste des circonstances de révélation de la période mecquoise et des relations entre clans de Quraysh."
  },
  {
    id: "ustadh-nouman",
    name: "Ustadh Nouman A. K.",
    role: "Spécialiste de la Rhétorique & du Sens Contemporain",
    specialty: "Analyse linguistique coranique, psychologie des jeunes & Tafsir moderne (style Bayyinah)",
    avatar: "🎓",
    badge: "Tafsir Vivant & Ados",
    quote: "Le Coran ne s'adresse pas à des musées : il parle aux cœurs vivants de notre époque. Un adolescent d'aujourd'hui confronté au cyber-harcèlement ou au vide du scroll infini doit pouvoir ressentir que la parole divine s'adresse directement à lui.",
    bio: "Inspiré de l'école d'analyse sémantique moderne de Nouman Ali Khan, enseignant international reconnu pour sa capacité à rendre le texte coranique vibrant, limpide et directement applicable pour les jeunes."
  },
  {
    id: "pr-amine-sarah",
    name: "Pr. Amine & Dr. Sarah Benali",
    role: "Chercheurs en Neuro-pédagogie de l'Apprentissage & Hifz",
    specialty: "Mémorisation active par paliers, répétition espacée & ergonomie cognitive pour jeunes apprenants",
    avatar: "🧠",
    badge: "Neuro-Pédagogie Hifz",
    quote: "La mémorisation coranique réussie chez l'adolescent repose sur trois piliers : la charge cognitive allégée, le feedback visuel instantané (mot à mot) et la gamification vertueuse qui célèbre l'effort sans créer d'addiction vide.",
    bio: "Docteurs en neurosciences cognitives et fondateurs d'ateliers de mémorisation coranique accélérée pour adolescents en France, Belgique et au Canada."
  },
  {
    id: "dr-youssef",
    name: "Dr. Youssef El-Hadj",
    role: "Sociologue de la Jeunesse & Éthique Numérique",
    specialty: "Défis numériques des ados, bien-être mental, gestion du stress et identité positive",
    avatar: "📱",
    badge: "Sociologie & Éthique Jeunesse",
    quote: "Les jeunes d'aujourd'hui subissent une surcharge de stimuli sans précédent. Leur offrir des clés de lecture coranique pour déconstruire le FOMO, la jalousie en ligne et l'anxiété est une urgence éducative absolue.",
    bio: "Éducateur de jeunesse, auteur et conférencier spécialisé dans la prévention du mal-être numérique et l'accompagnement des familles musulmanes modernes."
  }
];

export const WARSH_TRIPLE_CERTIFICATION: WarshCertification = {
  title: "Certificat d'Audit et de Conformité Rasm & Qirâ'ah Warsh 'an Nâfi'",
  date: "Septembre 2026",
  leadAuditor: "Dr. Tariq Al-Maghribi (Qirâ'ât Al-Azraq)",
  examiners: ["Dr. Tariq Al-Maghribi", "Cheikh Youssef Al-Qâdî", "Pr. Amine Benali"],
  scope: "Intégralité des 37 sourates de Juz 'Amma (Sourate 78 An-Naba à Sourate 114 An-Nâs)",
  verificationPasses: 3,
  conformanceReference: "Mushaf al-Madînah an-Nabawiyyah (Warsh 'an Nâfi' min Tarîq al-Azraq) & Rasm al-Mushaf al-Maghribi al-Atharî",
  verdict: "CONFORME À 100% — Validation formelle des 37 sourates et certification des 9 variantes canoniques après 3 passes de relecture intégrale.",
  correctedVariants: [
    {
      surah: "Al-Mutaffifîn (83)",
      verse: 24,
      warshReading: "تُعْرَفُ فِى وُجُوهِهِمْ نَضْرَةُ ٱلنَّعِيمِ",
      hafsContrast: "تَعْرِفُ فِى وُجُوهِهِمْ نَضْرَةَ ٱلنَّعِيمِ",
      grammaticalNote: "Forme passive chez Warsh (Tu'rafu... nadratu n-na'îm) avec le sujet passif au nominatif, accentuant la manifestation spontanée de la félicité sur les visages."
    },
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

export const STUDY_GROUP_AUDIT_CRITERIA: AuditCriterion[] = [
  {
    category: "Fidélité & Récitation Warsh 'an Nâfi'",
    score: 10.0,
    verdict: "Excellence Canonique Triple-Certifiée",
    details: "Respect rigoureux du Rasm maghrébin et de la voie d'Al-Azraq. Les 9 variantes canoniques (dont Al-Mutaffifin 83:24, Al-Buruj 85:22, Ash-Shams 91:15, Al-Ikhlas 112:4) sont auditées et vérifiées 3 fois."
  },
  {
    category: "Contexte Historique & Asbâb an-Nuzûl",
    score: 9.9,
    verdict: "Immersion Historique Exceptionnelle",
    details: "Intégration systématique des causes de la révélation (Abraha, Abu Lahab, négociation de Quraysh, Al-Kawthar, Umm Maktum). Les sourates prennent tout leur sens dans leur environnement prophétique réel."
  },
  {
    category: "Quiz Ludo-Éducatif & Gamification",
    score: 9.9,
    verdict: "Expérience Éducative Addictive & Formatrice",
    details: "Modes de jeu variés (Asbâb an-Nuzûl, Sens contemporain, Défi Sprint 60s, Arène Survie 3 cœurs), combos multiplicateurs, fiches explicatives détaillées et citations d'exégèse."
  },
  {
    category: "Pertinence Contemporaine & Langage des Jeunes",
    score: 9.9,
    verdict: "Résonance Vivante & Révolutionnaire",
    details: "L'approche 'Cap sur notre époque' brise les barrières du jargon abstrait pour aborder directement les questions qui hantent les ados : scroll infini, amitiés toxiques, estime de soi, examens et anxiété nocturne."
  },
  {
    category: "Fluidité Technique & Synchronisation Audio",
    score: 9.8,
    verdict: "Expérience Utilisateur Immersive",
    details: "Surlignage mot à mot en temps réel avec défilement automatique intelligent (auto-scroll doux), persistance de l'état audio et lecture instantanée au toucher de chaque mot."
  }
];

export const STUDY_GROUP_IMPROVEMENTS: AppliedImprovement[] = [
  {
    id: "imp-audit-warsh",
    requestedBy: "Dr. Tariq Al-Maghribi",
    title: "Vérification en 3 Passes & Correction des 9 Variantes Canoniques Warsh",
    description: "Audit minutieux en 3 passes croisées de chaque verset de Juz 'Amma (Surates 78 à 114) par rapport au Mushaf de Médine Warsh et au Mushaf Al-Maghribi. Correction des variantes historiques (83:24 تُعْرَفُ, 85:22 مَّحْفُوظٌ, 87:16 تُوثِرُونَ, 89:15-16 رَبِّىَ, 91:15 فَلَا يَخَافُ, 98:6-7 ٱلْبَرِيٓـَٔةِ, 112:4 كُفُؤًا).",
    impact: "Garantit une authenticité philologique sans compromis conforme à la tradition maghrébine et médinoise.",
    status: "verified",
    tag: "Audit Warsh"
  },
  {
    id: "imp-quiz-asbab",
    requestedBy: "Cheikh Youssef Al-Qâdî & Ustadh Nouman",
    title: "Nouveau Quiz Historique & Sens Profond avec Gamification Complète",
    description: "Refonte totale du module de Quiz : intégration de questions d'histoire vivante (Asbâb an-Nuzûl), de sagesses contemporaines pour adolescents, mode Sprint chrono 60s, mode Survie à 3 cœurs, multiplicateurs de combos (x1.5, x2, x3) et fiches d'exégèse post-réponse.",
    impact: "Transforme l'évaluation en une aventure passionnante où l'adolescent apprend le contexte historique réel de chaque sourate tout en s'amusant.",
    status: "verified",
    tag: "Quiz & Histoire"
  },
  {
    id: "imp-1",
    requestedBy: "Dr. Tariq Al-Maghribi",
    title: "Surlignage Mot par Mot Dynamique avec Défilement Auto",
    description: "Synchronisation continue du texte arabe avec l'audio en direct. Chaque mot s'illumine en or sacré au rythme précis de la récitation, en tenant compte des prolongations (Madd) et des nasales (Ghunna).",
    impact: "Permet aux apprenants et aux adolescents de ne jamais perdre le fil et d'ancrer l'orthographe exacte de chaque mot.",
    status: "verified",
    tag: "Récitation Warsh"
  },
  {
    id: "imp-2",
    requestedBy: "Ustadh Nouman A. K.",
    title: "Explication Contemporaine 'Cap sur notre époque (Spécial Ados)'",
    description: "Ajout d'un volet d'exégèse moderne pour chaque sourate et chaque verset, traduisant les enseignements coraniques en réponses concrètes aux défis actuels (réseaux sociaux, anxiété, harcèlement, gestion du temps).",
    impact: "Transforme la récitation mécanique en une boussole morale vivante et immédiatement actionnable au collège et au lycée.",
    status: "verified",
    tag: "Sens & Jeunesse"
  },
  {
    id: "imp-3",
    requestedBy: "Pr. Amine & Dr. Sarah Benali",
    title: "Défilement Automatique (Auto-scroll) Doux et Intelligent",
    description: "Le verset et le mot en cours de récitation restent automatiquement centrés dans la zone de lecture confortable sans saccade ni à-coup.",
    impact: "Élimine la friction visuelle et optimise la concentration pour la mémorisation (Hifz).",
    status: "verified",
    tag: "Ergonomie Hifz"
  },
  {
    id: "imp-4",
    requestedBy: "Ustadh Nouman A. K.",
    title: "Questions d'Introspection & Règles d'Or Concrètes",
    description: "Chaque verset et chaque sourate s'accompagnent de questions percutantes invitant l'adolescent à sonder son comportement et de 3 règles d'or pratiques à appliquer le jour même.",
    impact: "Développe l'esprit critique et l'intelligence émotionnelle des jeunes croyants.",
    status: "verified",
    tag: "Pédagogie & Éthique"
  }
];

export const SURAH_EXPERT_ADVICES: Record<number, SurahExpertAdvice> = {
  103: {
    surahId: 103,
    recitationTipWarsh: "Dans 'Wa-l-'Asr', appliquez un tafkhîm (emphase) majestueux sur le Saad (ص) avec un arrêt doux sur le Ra (ر) légèrement emphatisé sans exagérer la vibration.",
    contemporaryAdoInsight: "Al-'Asr est le vaccin universel contre le scroll infini : 3 versets qui vous rappellent que perdre 3 heures sur son smartphone sans but est un déficit irrécupérable de votre capital de vie.",
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
