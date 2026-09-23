export interface QuizItem {
  id: string;
  category: 'histoire' | 'sens' | 'tajwid_warsh' | 'general';
  surahId: number;
  surahName: string;
  difficulty: 'facile' | 'moyen' | 'expert';
  question: string;
  contextBanner?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceReference: string;
  modernReflection?: string;
}

export const HISTORICAL_AND_MEANING_QUIZ: QuizItem[] = [
  // ==========================================
  // SOURATE AL-FIL (105) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'fil-hist-1',
    category: 'histoire',
    surahId: 105,
    surahName: 'Al-Fîl (L\'Éléphant)',
    difficulty: 'facile',
    question: 'Pourquoi Abraha, vice-roi d\'Abyssinie au Yémen, a-t-il marché sur La Mecque avec une armée d\'éléphants ?',
    contextBanner: 'L\'An de l\'Éléphant (570 ap. J.-C.) — Année de naissance du Prophète ﷺ',
    options: [
      'Pour piller les richesses commerciales de la tribu de Quraysh',
      'Pour détruire la Kaaba car elle détournait les pèlerins de sa gigantesque cathédrale (Al-Qullays) au Yémen',
      'Pour venger la défaite de l\'empire byzantin face aux Perses',
      'Pour contraindre les Mecquois à adopter le christianisme de force'
    ],
    correctIndex: 1,
    explanation: 'Abraha avait bâti à Sanaa une cathédrale somptueuse nommée Al-Qullays afin de monopoliser le pèlerinage arabe. Furieux de voir les Arabes continuer à vénérer la Kaaba, il décida de raser le sanctuaire de La Mecque.',
    sourceReference: 'Ibn Hisham (As-Sîrah) & Asbâb an-Nuzûl d\'Al-Wâhidî',
    modernReflection: 'Cette histoire montre que l\'arrogance matérielle et technologique ne peut rien contre la protection divine.'
  },
  {
    id: 'fil-hist-2',
    category: 'histoire',
    surahId: 105,
    surahName: 'Al-Fîl (L\'Éléphant)',
    difficulty: 'moyen',
    question: 'Quelle fut la réponse historique d\'Abd al-Muttalib (grand-père du Prophète ﷺ) lorsqu\'Abraha s\'empara de ses 200 chameaux ?',
    contextBanner: 'La négociation historique aux portes de La Mecque',
    options: [
      'Il leva une coalition armée de toutes les tribus bédouines du Hedjaz',
      'Il offrit les trésors de la Kaaba en rançon',
      'Il dit : « Je suis le seigneur des chameaux, quant à la Maison (la Kaaba), elle a un Seigneur qui la protègera »',
      'Il demanda l\'asile politique auprès de l\'empereur de Perse'
    ],
    correctIndex: 2,
    explanation: 'Abd al-Muttalib réclama uniquement ses chameaux. Étonné, Abraha lui demanda pourquoi il ne plaidait pas pour la Kaaba. Abd al-Muttalib prononça cette phrase légendaire démontrant sa foi inébranlable en la sauvegarde de la Kaaba par Dieu.',
    sourceReference: 'Tafsir At-Tabarî & Ibn Kathir',
    modernReflection: 'Connaître ses limites et remettre avec certitude ce qui nous dépasse à Dieu est une clé de sérénité.'
  },
  {
    id: 'fil-sens-1',
    category: 'sens',
    surahId: 105,
    surahName: 'Al-Fîl (L\'Éléphant)',
    difficulty: 'moyen',
    question: 'Que signifie l\'image coranique « كَعَصْفٍ مَّأْكُولٍۭ » (ka-\'asfin ma\'kûl) décrivant l\'état final de l\'armée d\'Abraha ?',
    contextBanner: 'Verset 5 : فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍۭ',
    options: [
      'Comme des arbres géants déracinés par une tornade',
      'Comme une paille mâchée, broyée et piétinée par du bétail',
      'Comme des pierres volcaniques calcinées par la lave',
      'Comme des statues de sel dissoutes par l\'eau'
    ],
    correctIndex: 1,
    explanation: '« Al-\'Asf » désigne la paille ou le foin sec. « Ma\'kūl » signifie broyé par les dents du bétail puis rejeté. Les projectiles d\'argile cuite (sijjîl) ont pulvérisé la puissante armée au point de la réduire en miettes insignifiantes.',
    sourceReference: 'Al-Mufradât de Raghib Al-Isfahani & Tafsir Al-Qurtubi',
    modernReflection: 'Le Coran désamorce le gigantisme des oppresseurs : la plus grande armada peut devenir poussière en un instant.'
  },

  // ==========================================
  // SOURATE QURAYSH (106) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'quraysh-hist-1',
    category: 'histoire',
    surahId: 106,
    surahName: 'Quraysh',
    difficulty: 'facile',
    question: 'Quelles sont les deux expéditions commerciales (« رِحْلَةَ ٱلشِّتَآءِ وَٱلصَّيْفِ ») mentionnées pour la tribu de Quraysh ?',
    contextBanner: 'La Mecque, carrefour marchand de la péninsule arabique',
    options: [
      'En hiver vers l\'Égypte, et en été vers la Perse',
      'En hiver vers le Yémen (au climat doux), et en été vers le Shâm / Syrie (plus frais)',
      'En hiver vers l\'Inde par bateau, et en été vers l\'Éthiopie',
      'En hiver vers Médine, et en été vers l\'Irak'
    ],
    correctIndex: 1,
    explanation: 'Grâce au prestige de la Kaaba et aux pactes d\'alliance (Îlâf) initiés par Hâshim, les caravanes de Quraysh voyageaient en toute sécurité : l\'hiver vers le Sud (Yémen) et l\'été vers le Nord (Shâm/Syrie).',
    sourceReference: 'Tafsir Ibn Kathir & Sîrat Ibn Hisham',
    modernReflection: 'La stabilité économique et la sécurité alimentaire sont des bienfaits divins immenses qui exigent reconnaissance.'
  },
  {
    id: 'quraysh-sens-1',
    category: 'sens',
    surahId: 106,
    surahName: 'Quraysh',
    difficulty: 'moyen',
    question: 'Pourquoi Allah dit-Il « فَلْيَعْبُدُوا۟ رَبَّ هَـٰذَا ٱلْبَيْتِ » (Qu\'ils adorent donc le Seigneur de cette Maison) ?',
    contextBanner: 'Verset 3 : L\'appel à la reconnaissance sincère',
    options: [
      'Pour leur rappeler que leur prospérité ne vient pas de leurs talents de négociateurs, mais du Maître de la Kaaba',
      'Pour leur ordonner de payer des impôts aux gardiens du temple',
      'Pour instaurer une monarchie religieuse à La Mecque',
      'Pour leur interdire tout commerce avec les tribus voisines'
    ],
    correctIndex: 0,
    explanation: 'Alors que la péninsule connaissait pillages et famines, La Mecque jouissait de deux privilèges uniques : être nourrie et vivre sans peur. Allah rappelle que ce sanctuaire est la source de toute leur subsistance.',
    sourceReference: 'Tafsir As-Sa\'di',
    modernReflection: 'Nos réussites professionnelles ou scolaires ne viennent pas de notre seul mérite, mais des opportunités accordées par Allah.'
  },

  // ==========================================
  // SOURATE AL-MASAD (111) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'masad-hist-1',
    category: 'histoire',
    surahId: 111,
    surahName: 'Al-Masad (Les Fibres / Abu Lahab)',
    difficulty: 'facile',
    question: 'À quelle occasion précise la sourate Al-Masad a-t-elle été révélée contre Abu Lahab ?',
    contextBanner: 'La proclamation publique sur le mont As-Safâ',
    options: [
      'Après la bataille de Badr où Abu Lahab refusa de participer',
      'Quand le Prophète ﷺ monta sur As-Safâ pour appeler tous les clans et qu\'Abu Lahab cria : « Péris le reste du jour ! Est-ce pour cela que tu nous as réunis ? »',
      'Quand Abu Lahab refusa d\'accueillir les pèlerins à Mina',
      'Lors de l\'émigration (Hijra) vers Médine'
    ],
    correctIndex: 1,
    explanation: 'Lorsque l\'ordre de prêcher publiquement fut révélé, le Prophète ﷺ gravit le mont As-Safâ et alerta Quraysh d\'un châtiment imminent. Son oncle paternel Abu Lahab le maudit grossièrement. Allah fit alors descendre la réplique : « Que périssent les deux mains d\'Abu Lahab, et que lui-même périsse ! »',
    sourceReference: 'Sahih Al-Bukhari (Hadith 4770) & Sahih Muslim',
    modernReflection: 'La défense de la vérité est assurée par Allah lorsque les croyants subissent des attaques injustes.'
  },
  {
    id: 'masad-hist-2',
    category: 'histoire',
    surahId: 111,
    surahName: 'Al-Masad (Les Fibres)',
    difficulty: 'moyen',
    question: 'Qui était la « porteuse de bois » (« حَمَّالَةَ ٱلْحَطَبِ ») et que faisait-elle contre le Prophète ﷺ ?',
    contextBanner: 'Verset 4 : وَٱمْرَأَتُهُۥ حَمَّالَةَ ٱلْحَطَبِ',
    options: [
      'Hind bint Utba, qui finançait les armes des Qurayshites',
      'Umm Jamil (Arwa bint Harb), la femme d\'Abu Lahab, qui semait des ronces et des épines acérées sur le chemin du Prophète ﷺ',
      'Asma bint Abi Bakr avant sa conversion',
      'Une servante persane envoyée par le roi Khosro'
    ],
    correctIndex: 1,
    explanation: 'Umm Jamil, sœur d\'Abu Sufyan et épouse d\'Abu Lahab, vouait une haine féroce au Prophète ﷺ. Elle ramassait des épines venimeuses dans le désert pour les placer la nuit devant la porte du Prophète ﷺ pour blesser ses pieds nus.',
    sourceReference: 'Ibn Kathir & Asbâb an-Nuzûl d\'Al-Wâhidî',
    modernReflection: 'Le cyber-harcèlement et la méchanceté gratuite ne datent pas d\'hier : cette sourate flétrit ceux qui sèment des pièges pour nuire.'
  },
  {
    id: 'masad-sens-1',
    category: 'sens',
    surahId: 111,
    surahName: 'Al-Masad (Les Fibres)',
    difficulty: 'expert',
    question: 'Pourquoi les exégètes considèrent-ils la sourate Al-Masad comme un miracle prophétique éclatant ?',
    contextBanner: 'Un défi ouvert à la liberté humaine pendant plus de dix ans',
    options: [
      'Parce qu\'elle prédisait la chute de l\'empire romain',
      'Parce qu\'elle a affirmé qu\'Abu Lahab mourrait mécréant ; s\'il avait simplement prétendu se convertir, même par hypocrisie, il aurait réfuté le Coran',
      'Parce qu\'elle a été gravée sur une stèle retrouvée à La Mecque',
      'Parce qu\'elle a guéri miraculeusement les premiers musulmans'
    ],
    correctIndex: 1,
    explanation: 'La sourate a été révélée plus de 10 ans avant la mort d\'Abu Lahab. Pendant toute cette décennie, Abu Lahab aurait pu anéantir l\'islam en disant publiquement : « Je me convertis, donc votre Coran a menti ! ». Il ne le fit jamais et mourut dans l\'incroyance la plus totale.',
    sourceReference: 'Ibn Kathir & Dr. Zakir Naik (Analyse apologétique)',
    modernReflection: 'La précision des prophéties coraniques confirme l\'origine transcendante du texte sacré.'
  },

  // ==========================================
  // SOURATE AL-KAWTHAR (108) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'kawthar-hist-1',
    category: 'histoire',
    surahId: 108,
    surahName: 'Al-Kawthar (L\'Abondance)',
    difficulty: 'facile',
    question: 'Pourquoi les polythéistes insultaient-ils le Prophète ﷺ en le traitant d\'« Al-Abtar » (l\'homme sans postérité) ?',
    contextBanner: 'La tristesse d\'un père après la perte de ses enfants',
    options: [
      'Parce qu\'il n\'avait pas d\'argent pour payer la dot',
      'Parce que ses fils Al-Qâsim et \'Abdullah étaient morts en bas âge, et selon les normes bédouines de l\'époque, un homme sans fils mâle était considéré comme coupé de tout avenir',
      'Parce qu\'il avait quitté la caravane commerciale de Khadija',
      'Parce qu\'il refusait de porter des armes dans La Mecque'
    ],
    correctIndex: 1,
    explanation: 'Al-\'Âs ibn Wâ\'il disait avec cruauté : « Laissez-le, Mohammed est un homme abtar (sans postérité mâle) ; dès qu\'il mourra, son souvenir disparaîtra ! ». Allah fit descendre cette sourate pour le consoler avec Al-Kawthar.',
    sourceReference: 'Ibn Abbas, rapporté par Al-Bayhaqî et Ibn Kathir',
    modernReflection: 'La vraie valeur d\'une personne ne se mesure pas au statut social ou aux stéréotypes familiaux, mais à son héritage spirituel.'
  },
  {
    id: 'kawthar-sens-1',
    category: 'sens',
    surahId: 108,
    surahName: 'Al-Kawthar (L\'Abondance)',
    difficulty: 'moyen',
    question: 'Que signifie linguistiquement le mot « Al-Kawthar » selon les maîtres de la langue arabe ?',
    contextBanner: 'Verset 1 : إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ',
    options: [
      'Une petite rivière temporaire après la pluie',
      'Une abondance surabondante et inépuisable de bienfaits dans ce monde et l\'au-delà (dont le fleuve au Paradis)',
      'Un vêtement d\'or réservé aux souverains',
      'Une victoire militaire éclair'
    ],
    correctIndex: 1,
    explanation: 'Construit sur le schème intensif « Faw\'al » dérivé de « Kathra » (abondance), Al-Kawthar désigne une profusion sans limite : la prophétie, la communauté des croyants, la bénédiction perpétuelle et le célèbre bassin céleste (Hawd).',
    sourceReference: 'Lisân al-\'Arab & Tafsir Al-Qurtubi',
    modernReflection: 'Même lorsque le monde te fait sentir insignifiant ou blessé, ce qu\'Allah te réserve dépasse infiniment les moqueries.'
  },

  // ==========================================
  // SOURATE AL-KAFIRUN (109) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'kafirun-hist-1',
    category: 'histoire',
    surahId: 109,
    surahName: 'Al-Kâfirûn (Les Infidèles)',
    difficulty: 'facile',
    question: 'Quelle proposition de compromis les chefs de Quraysh (Al-Walid, Umayya, Al-Aswad) ont-ils faite au Prophète ﷺ avant la révélation d\'Al-Kafirun ?',
    contextBanner: 'La négociation du syncrétisme religieux à La Mecque',
    options: [
      'De lui donner tout l\'or de La Mecque en échange de son silence',
      'D\'adorer son Dieu pendant un an, puis que les musulmans adorent leurs idoles pendant un an en alternance',
      'De lui accorder le titre de roi de La Mecque s\'il cessait de condamner les idoles',
      'De partager le commandement de la Kaaba entre lui et Abu Jahl'
    ],
    correctIndex: 1,
    explanation: 'Les Qurayshites cherchaient un compromis hybride : « Adore nos dieux Lât et \'Uzzâ pendant une année, et nous adorerons ton Seigneur pendant une année ». La sourate tranche catégoriquement : aucune transaction n\'est possible sur l\'Unicité absolue (Tawhid).',
    sourceReference: 'Ibn Is-hâq & Tafsir At-Tabarî',
    modernReflection: 'La tolérance ne signifie pas dissoudre son intégrité ou adopter des principes contraires à ses valeurs pour plaire aux autres.'
  },
  {
    id: 'kafirun-sens-1',
    category: 'sens',
    surahId: 109,
    surahName: 'Al-Kâfirûn (Les Infidèles)',
    difficulty: 'moyen',
    question: 'Quelle est la portée fondamentale de la conclusion « لَكُمْ دِينُكُمْ وَلِيَ دِينِ » (À vous votre religion, et à moi ma religion) ?',
    contextBanner: 'Verset 6 : La frontière de la foi et du libre arbitre',
    options: [
      'Un ordre d\'entrer en guerre immédiate contre les voisins',
      'Une déclaration claire de désaveu du polythéisme tout en affirmant la liberté de conscience sans compromission théologique',
      'Une autorisation de mélanger plusieurs cultes en secret',
      'Une prophétie de paix perpétuelle entre tous les peuples'
    ],
    correctIndex: 1,
    explanation: 'Ce verset établit la clarté : les croyants ne forcent personne mais n\'acceptent aucune dilution de leur foi. C\'est le principe de la liberté de conscience doublé d\'une fidélité sans compromis envers le Tawhid.',
    sourceReference: 'Tafsir Ibn Kathir',
    modernReflection: 'Apprendre à assumer sereinement son identité sans agressivité ni complexe face à la pression sociale du groupe.'
  },

  // ==========================================
  // SOURATE AN-NASR (110) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'nasr-hist-1',
    category: 'histoire',
    surahId: 110,
    surahName: 'An-Nasr (Le Secours)',
    difficulty: 'moyen',
    question: 'Que comprirent \'Omar ibn al-Khattab et le jeune \'Abdullah ibn \'Abbas lorsque la sourate An-Nasr fut révélée ?',
    contextBanner: 'L\'assemblée des vétérans de Badr sous le califat d\'Omar',
    options: [
      'Qu\'il fallait lancer de nouvelles conquêtes militaires',
      'Que la mission prophétique était accomplie et que la mort du Prophète ﷺ était très proche',
      'Que les musulmans allaient tous devenir riches',
      'Qu\'il fallait reconstruire la mosquée de Médine'
    ],
    correctIndex: 1,
    explanation: 'Lorsque la victoire et la conversion en masse des tribus eurent lieu, cela signifiait que la mission du Prophète ﷺ touchait à sa fin. Ibn \'Abbas expliqua : « C\'est l\'annonce du terme de la vie du Messager d\'Allah ». Omar confirma : « Je n\'en comprends pas autre chose que ce que tu as dit ».',
    sourceReference: 'Sahih Al-Bukhari (Hadith 4970)',
    modernReflection: 'La vraie réussite terrestre ne gonfle pas d\'orgueil : elle pousse à la gratitude, au repentir et à l\'humilité.'
  },

  // ==========================================
  // SOURATE AT-TAKATHUR (102) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'takathur-hist-1',
    category: 'histoire',
    surahId: 102,
    surahName: 'At-Takâthur (La Course aux Richesses)',
    difficulty: 'moyen',
    question: 'Quelle pratique absurde des clans de Quraysh (Banu \'Abd Manaf et Banu Sahm) a provoqué la révélation d\'At-Takathur ?',
    contextBanner: 'Verset 1-2 : أَلْهَىٰكُمُ ٱلتَّكَاثُرُ حَتَّىٰ زُرْتُمُ ٱلْمَقَابِرَ',
    options: [
      'Ils brûlaient leurs récoltes pour faire monter les prix',
      'Ils rivalisaient sur le nombre de membres de leur clan, et quand les vivants ne suffirent plus, ils allèrent dans les cimetières compter les tombes de leurs ancêtres morts pour prouver leur supériorité !',
      'Ils pariaient des fortunes aux courses de chevaux',
      'Ils jetaient leurs bijoux dans la mer pour impressionner les poètes'
    ],
    correctIndex: 1,
    explanation: 'L\'aveuglement par la course aux chiffres était tel qu\'ils pointaient du doigt les tombes : « Untel était de notre clan, untel aussi ! ». Le Coran dénonce cette compétition stérile qui distrait de l\'essentiel jusqu\'à ce que la mort nous rattrape.',
    sourceReference: 'Muqatil ibn Sulayman & Asbâb an-Nuzûl d\'Al-Wâhidî',
    modernReflection: 'Hier c\'était les tombes des ancêtres, aujourd\'hui c\'est la course aux followers, aux likes et aux marques de vêtements.'
  },
  {
    id: 'takathur-sens-1',
    category: 'sens',
    surahId: 102,
    surahName: 'At-Takâthur (La Course aux Richesses)',
    difficulty: 'expert',
    question: 'Quels sont les trois degrés de certitude évoqués dans la sourate At-Takathur et Al-Waqi\'ah ?',
    contextBanner: 'Verset 5 & 7 : عِلْمَ ٱلْيَقِينِ et عَيْنَ ٱلْيَقِينِ',
    options: [
      'Le doute, la supposition et la preuve',
      'La certitude par la connaissance (\'Ilm al-Yaqîn), la certitude visuelle (\'Ayn al-Yaqîn), et la certitude vécue (Haqq al-Yaqîn)',
      'Le savoir des livres, le savoir des anciens et le savoir des anges',
      'La croyance aveugle, l\'expérience et la logique'
    ],
    correctIndex: 1,
    explanation: '\'Ilm al-Yaqîn est la certitude rationnelle par l\'information vérifiée. \'Ayn al-Yaqîn est la vision directe de ses propres yeux. Haqq al-Yaqîn est l\'immersion directe dans la réalité (comme goûter le miel après l\'avoir vu).',
    sourceReference: 'Madârij as-Sâlikîn d\'Ibn Al-Qayyim',
    modernReflection: 'Ne pas attendre de voir la fin de notre vie pour réaliser que nos priorités étaient superficielles.'
  },

  // ==========================================
  // SOURATE AL-\'ASR (103) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'asr-sens-1',
    category: 'sens',
    surahId: 103,
    surahName: 'Al-\'Asr (Le Temps)',
    difficulty: 'facile',
    question: 'Quelle déclaration célèbre l\'imam Ash-Shâfi\'î a-t-il faite à propos de la sourate Al-\'Asr ?',
    contextBanner: 'La sourate aux trois versets résumant tout le Coran',
    options: [
      '« Cette sourate ne devrait être récitée que pendant les nuits de Ramadan »',
      '« Si les hommes ne méditaient profondément que cette seule sourate, elle leur suffirait (pour guider leur vie entière) »',
      '« C\'est la première sourate révélée à Médine »',
      '« Elle a été gravée sur l\'épée du Prophète ﷺ »'
    ],
    correctIndex: 1,
    explanation: 'L\'imam Ash-Shâfi\'î a souligné sa synthèse prodigieuse : elle pose le diagnostic de l\'humanité (la perte universelle) et les quatre remèdes indispensables : la foi, l\'action pieuse, l\'exhortation mutuelle à la vérité et l\'exhortation mutuelle à la patience.',
    sourceReference: 'Tafsir Ibn Kathir (Introduction à Al-\'Asr)',
    modernReflection: 'Trois versets suffisent à concevoir un plan de vie équilibré face à la dispersion moderne.'
  },
  {
    id: 'asr-sens-2',
    category: 'sens',
    surahId: 103,
    surahName: 'Al-\'Asr (Le Temps)',
    difficulty: 'moyen',
    question: 'Pourquoi les linguistes expliquent-ils qu\'« Al-\'Asr » évoque un temps qui s\'écoule comme un liquide pressé ?',
    contextBanner: 'La racine linguistique \'A-S-R (ع-ص-ر)',
    options: [
      'Parce que \'Asr signifie le déluge universel',
      'Parce que le verbe \'Asara signifie « presser, essorer » jusqu\'à la dernière goutte (comme un fruit pour en tirer le jus), symbolisant le temps qui s\'épuise irréversiblement',
      'Parce que le mot désigne le vent violent du sud',
      'Parce qu\'il fait référence à la fin des vendanges en Arabie'
    ],
    correctIndex: 1,
    explanation: '« Al-\'Asr » n\'est pas un temps statique (Dahr) ou une heure vide (Sâ\'ah) : c\'est le temps qui s\'épuise et se resserre. Chaque heure qui passe est comme une goutte pressée hors de ton existence que tu ne pourras jamais récupérer.',
    sourceReference: 'Analyse linguistique (éclairage contemporain)',
    modernReflection: 'La procrastination et le scroll sans fin sur les réseaux sociaux vident nos journées de leur précieux jus.'
  },

  // ==========================================
  // SOURATE AD-DUHA (93) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'duha-hist-1',
    category: 'histoire',
    surahId: 93,
    surahName: 'Ad-Duhâ (Le Jour Montant)',
    difficulty: 'facile',
    question: 'Pourquoi la révélation s\'était-elle interrompue temporairement (Fatrat al-Wahy), attristant profondément le Prophète ﷺ ?',
    contextBanner: 'La pause de la révélation et le réconfort divin',
    options: [
      'Parce que l\'Ange Jibril était envoyé dans un autre pays',
      'Pour éprouver le cœur du Prophète ﷺ et intensifier son désir de Dieu, tandis que les polythéistes disaient : « Son Seigneur l\'a abandonné et détesté ! »',
      'Parce que les musulmans avaient cessé de faire la prière',
      'À cause d\'une guerre civile qui avait éclaté à La Mecque'
    ],
    correctIndex: 1,
    explanation: 'Pendant plusieurs jours (ou semaines), Jibril ne descendit pas. Umm Jamil et les moqueurs prétendaient que Dieu s\'était détourné de lui. Allah fit alors descendre Ad-Duhâ avec un serment par la clarté du matin et le calme de la nuit pour affirmer : « Ton Seigneur ne t\'a ni abandonné, ni détesté ».',
    sourceReference: 'Sahih Al-Bukhari (Hadith 4950) & Sahih Muslim',
    modernReflection: 'Les périodes de vide spirituel, de doute ou de solitude ne signifient pas qu\'Allah nous a oubliés : ce sont des sas d\'élévation.'
  },
  {
    id: 'duha-sens-1',
    category: 'sens',
    surahId: 93,
    surahName: 'Ad-Duhâ (Le Jour Montant)',
    difficulty: 'moyen',
    question: 'Quels sont les trois rappels personnels qu\'Allah adresse au Prophète ﷺ dans Ad-Duhâ pour lui prouver Sa constante bienveillance ?',
    contextBanner: 'Versets 6 à 8 : أَلَمْ يَجِدْكَ يَتِيمًۭا فَـَٔاوَىٰ...',
    options: [
      'Tu étais pauvre Il t\'a donné une armée, tu étais seul Il t\'a couronné roi, tu étais malade Il t\'a guéri',
      'Ne t\'a-t-Il pas trouvé orphelin puis t\'a accueilli ? Ne t\'a-t-Il pas trouvé en quête (égaré) puis t\'a guidé ? Ne t\'a-t-Il pas trouvé dans le besoin puis t\'a enrichi ?',
      'Tu étais prisonnier Il t\'a libéré, tu avais soif Il a fait jaillir l\'eau, tu voyageais Il a calmé la mer',
      'Il a fait triompher tes ancêtres contre Abraha, contre la Perse et contre Byzance'
    ],
    correctIndex: 1,
    explanation: 'Allah lui rappelle ses épreuves d\'enfance : la perte de son père et de sa mère (l\'orphelin recueilli), sa quête spirituelle dans la grotte de Hira (la guidance reçue), et sa pauvreté comblée par son alliance avec Khadija. En conclusion : ne repousse jamais l\'orphelin ni le mendiant.',
    sourceReference: 'Tafsir Ibn Kathir & As-Sa\'di',
    modernReflection: 'Se remémorer les épreuves dont on est sorti par la grâce divine redonne une force immense dans les moments difficiles.'
  },

  // ==========================================
  // SOURATE ASH-SHAMS (91) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'shams-hist-1',
    category: 'histoire',
    surahId: 91,
    surahName: 'Ash-Shams (Le Soleil)',
    difficulty: 'moyen',
    question: 'Quel est l\'avertissement historique incarné par le peuple des Thamûd et leur prophète Sâlih dans la sourate Ash-Shams ?',
    contextBanner: 'Verset 11-14 : كَذَّبَتْ ثَمُودُ بِطَغْوَىٰهَآ',
    options: [
      'Ils ont construit des pyramides idolâtres dans le désert',
      'Ils ont bravé l\'ordre divin en égorgeant la chamelle miraculeuse que Sâlih leur avait confiée comme signe sacré, menés par le plus misérable d\'entre eux (Qudâr ibn Sâlif)',
      'Ils ont refusé de payer l\'aumône légale aux orphelins de Médine',
      'Ils ont attaqué les caravanes de pèlerins se rendant à Jérusalem'
    ],
    correctIndex: 1,
    explanation: 'Le peuple des Thamûd a exigé un miracle. Allah leur accorda une chamelle sortant du rocher avec un droit d\'abreuvement partagé. Poussés par l\'arrogance, ils ont mandaté Qudâr ibn Sâlif (« ashqâ-hâ » : le plus scélérat d\'entre eux) pour lui trancher les jarrets, entraînant la destruction de la cité.',
    sourceReference: 'Ibn Kathir (Récit des Prophètes) & Tafsir Al-Baghawî',
    modernReflection: 'La complicité tacite avec le mal collectif : le silence du groupe face à l\'acte destructeur d\'un individu engage la responsabilité de tous.'
  },
  {
    id: 'shams-sens-1',
    category: 'sens',
    surahId: 91,
    surahName: 'Ash-Shams (Le Soleil)',
    difficulty: 'moyen',
    question: 'Pourquoi la sourate Ash-Shams détient-elle le record des serments cosmiques consécutifs (11 serments) ?',
    contextBanner: 'La plus longue séquence de serments du Coran',
    options: [
      'Pour annoncer la date de la fin du monde',
      'Pour souligner l\'importance cruciale de la purification de l\'âme : « A réussi celui qui la purifie, et a échoué celui qui l\'étouffe sous les péchés »',
      'Pour décrire l\'astronomie et le mouvement des planètes',
      'Pour instaurer le calendrier lunaire obligatoire'
    ],
    correctIndex: 1,
    explanation: 'Allah jure par le Soleil, sa clarté, la Lune, le Jour, la Nuit, le Ciel, la Terre et l\'Âme pour proclamer une vérité fondamentale : l\'enjeu suprême de l\'existence humaine est la purification intérieure (Tazkiyah).',
    sourceReference: 'Tafsir Al-Alûsî',
    modernReflection: 'Aucun succès matériel n\'a de valeur si l\'âme intérieure est polluée par la jalousie, l\'arrogance ou la rancœur.'
  },

  // ==========================================
  // SOURATE AL-IKHLAS (112) - SENS & SPÉCIFICITÉ WARSH
  // ==========================================
  {
    id: 'ikhlas-sens-1',
    category: 'sens',
    surahId: 112,
    surahName: 'Al-Ikhlâs (Le Monothéisme Pur)',
    difficulty: 'facile',
    question: 'Que signifie précisément l\'Attribut divin sublime « ٱلصَّمَدُ » (As-Samad) ?',
    contextBanner: 'Verset 2 : ٱللَّهُ ٱلصَّمَدُ',
    options: [
      'Celui qui dort et se réveille selon les saisons',
      'Le Maître absolu, autosuffisant, sans faille ni besoin, vers Lequel toutes les créatures se tournent dans la détresse',
      'Le Créateur de la lumière et du feu',
      'Celui qui réside au sommet des montagnes'
    ],
    correctIndex: 1,
    explanation: 'Ibn Abbas a défini As-Samad : « Le Seigneur dont la souveraineté est parfaite, vers Qui tout le monde se tourne pour satisfaire ses besoins, et Qui n\'a besoin de personne ». Linguistiquement, il désigne aussi une forteresse inébranlable.',
    sourceReference: 'Sahih Al-Bukhari & Lisân al-\'Arab',
    modernReflection: 'Quand tout tangue autour de nous, As-Samad est le seul ancrage qui ne cède jamais.'
  },
  {
    id: 'ikhlas-warsh-1',
    category: 'tajwid_warsh',
    surahId: 112,
    surahName: 'Al-Ikhlâs (Le Monothéisme Pur)',
    difficulty: 'expert',
    question: 'Comment s\'écrit et se prononce le 4e verset d\'Al-Ikhlas selon la lecture authentique de Warsh \'an Nâfi\' ?',
    contextBanner: 'Spécificité canonique de la récitation Warsh',
    options: [
      '« وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ » (avec Waw sans Hamza, comme chez Hafs)',
      '« وَلَمْ يَكُن لَّهُۥ كُفُؤًا أَحَدٌۢ » (avec une Hamza prononcée : Kufu-an)',
      '« وَلَمْ يَكُن لَّهُۥ كِفَاءً أَحَدٌ »',
      '« وَلَمْ يَكُن لَّهُۥ شَبِيهًا أَحَدٌ »'
    ],
    correctIndex: 1,
    explanation: 'Dans la lecture de Warsh selon Nâfi\' de Médine, le mot se récite avec une Hamza franche : « كُفُؤًا » (kufu-an). La lecture de Hafs \'an \'Asim la remplace par un Waw « كُفُوًا » (kufuwan). C\'est une règle canonique préservée dans les Mushafs maghrébins.',
    sourceReference: 'Matn Hirz al-Amânî (Ash-Shâtibiyyah) & Mushaf Warsh al-Madinah',
    modernReflection: 'La diversité des lectures coraniques canoniques (Qirâ\'ât) enrichit la précision linguistique du texte sacré.'
  },

  // ==========================================
  // SOURATE AL-FALAQ & AN-NAS (113-114) - ASBAB AN-NUZUL
  // ==========================================
  {
    id: 'muawwidhat-hist-1',
    category: 'histoire',
    surahId: 113,
    surahName: 'Al-Falaq & An-Nâs (Les Protectrices)',
    difficulty: 'moyen',
    question: 'Quel événement historique a motivé la descente conjointe des deux sourates protectrices (Al-Mu\'awwidhatayn) ?',
    contextBanner: 'La guérison prophétique face au complot invisible',
    options: [
      'La morsure d\'un scorpion venimeux dans le désert',
      'Un maléfice et ensorcellement orchestré par Labîd ibn al-A\'sam (avec 11 nœuds jetés dans le puits de Dharwân) ; l\'Ange Jibril révéla les 11 versets pour dénouer chaque nœud',
      'La famine qui toucha la ville de Médine la première année de l\'Hégire',
      'Une épidémie de peste venue de Syrie'
    ],
    correctIndex: 1,
    explanation: 'Le Prophète ﷺ tomba malade suite à un sortilège lié à 11 nœuds cachés. Jibril lui apporta Al-Falaq (5 versets) et An-Nas (6 versets), totalisant 11 versets. À chaque verset récité, un nœud se déliait et le Prophète ﷺ retrouva sa pleine vigueur.',
    sourceReference: 'Sahih Al-Bukhari (Hadith 5763) & Asbâb an-Nuzûl d\'Al-Wâhidî',
    modernReflection: 'La foi n\'empêche pas d\'être confronté à des épreuves : elle donne les boucliers spirituels pour en sortir.'
  },
  {
    id: 'muawwidhat-sens-1',
    category: 'sens',
    surahId: 114,
    surahName: 'An-Nâs (Les Hommes)',
    difficulty: 'moyen',
    question: 'Quelle est la distinction fondamentale entre la protection demandée dans Al-Falaq et celle demandée dans An-Nâs ?',
    contextBanner: 'L\'architecture spirituelle des deux protectrices',
    options: [
      'Al-Falaq protège les hommes et An-Nas protège les femmes',
      'Al-Falaq protège contre les maux extérieurs physiques (la nuit noire, la jalousie, la sorcellerie), tandis qu\'An-Nâs protège contre le mal intérieur invisible : les chuchotements insidieux (Waswâs) qui attaquent la foi',
      'Al-Falaq est récitée le matin et An-Nas est interdite le soir',
      'Il n\'y a aucune différence, ce sont de purs doublons'
    ],
    correctIndex: 1,
    explanation: 'Le mal intérieur combattu dans An-Nâs est le plus dangereux pour l\'éternité de l\'âme. C\'est pourquoi dans An-Nâs, on invoque Dieu avec trois attributs majeurs (Seigneur, Roi, Dieu) pour repousser un seul ennemi : le chuchoteur furtif (Al-Khannâs).',
    sourceReference: 'Ibn Al-Qayyim (Badâ\'i\' al-Fawâ\'id)',
    modernReflection: 'Le pire piège n\'est pas toujours l\'obstacle devant nous, mais la voix intérieure qui nous souffle de baisser les bras.'
  },

  // ==========================================
  // SOURATE AL-BURUJ (85) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'buruj-hist-1',
    category: 'histoire',
    surahId: 85,
    surahName: 'Al-Burûj (Les Constellations)',
    difficulty: 'moyen',
    question: 'Qui étaient les « Gens du Fossé » (« أَصْحَـٰبِ ٱلْأُخْدُودِ ») dont le sacrifice héroïque est immortalisé dans Al-Burûj ?',
    contextBanner: 'La persécution des croyants monothéistes de Najrân (Yémen)',
    options: [
      'Des mineurs prisonniers de l\'empire romain',
      'Des croyants monothéistes jetés vivants dans des tranchées enflammées par un roi tyran (Dhû Nuwâs) pour avoir refusé de renier leur foi en Allah',
      'Des ouvriers qui creusaient le fossé de la bataille d\'Al-Khandaq',
      'Une tribu bédouine engloutie par des sables mouvants'
    ],
    correctIndex: 1,
    explanation: 'À Najrân, sous l\'influence d\'un jeune croyant vertueux, tout le peuple embrassa la foi en Dieu. Le roi idolâtre Dhû Nuwâs fit creuser d\'immenses fossés remplis de feu et y précipita les croyants qui préféraient le martyre à l\'apostasie. Le Coran maudit les bourreaux.',
    sourceReference: 'Sahih Muslim (Hadith du jeune homme et du moine) & Ibn Kathir',
    modernReflection: 'L\'intégrité morale et la fidélité à ses convictions face aux pressions tyranniques constituent la plus grande noblesse.'
  },
  {
    id: 'buruj-warsh-1',
    category: 'tajwid_warsh',
    surahId: 85,
    surahName: 'Al-Burûj (Les Constellations)',
    difficulty: 'expert',
    question: 'Quelle est la particularité canonique de lecture du verset 22 dans la récitation de Warsh \'an Nâfi\' ?',
    contextBanner: 'Verset 22 : فِي لَوْحٍ مَّحْفُوظٌ vs مَّحْفُوظٍ',
    options: [
      'Warsh récite « فِى لَوْحٍ مَّحْفُوظٌ » avec une damma (nominatif), qualifiant le Coran lui-même (« C\'est un Coran glorieux, préservé sur une Table »)',
      'Warsh récite « مَّحْفُوظًا » avec un tanwin fathah',
      'Warsh omet le mot « Lawh »',
      'Il n\'y a aucune différence avec Hafs'
    ],
    correctIndex: 0,
    explanation: 'Nâfi\' (dont Warsh est le rapporteur) est l\'un des rares maîtres à réciter avec Rafa\' (damma) : « مَّحْفُوظٌ » (mahfūdhun). L\'adjectif renvoie alors directement à « Qor\'ānun majîdun » (le Coran glorieux est préservé). Hafs récite au cas génitif (kasra) « مَّحْفُوظٍ » qualifiant la Table.',
    sourceReference: 'Ash-Shâtibiyyah (« وَمَحْفُوظٌ ارْفَعْهُ فِي صَفَا حَرَمٍ عَلَا »)',
    modernReflection: 'Une simple voyelle finale modifie avec subtilité et profondeur la perspective théologique du verset.'
  },

  // ==========================================
  // SOURATE 'ABASA (80) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'abasa-hist-1',
    category: 'histoire',
    surahId: 80,
    surahName: '\'Abasa (Il s\'est renfrogné)',
    difficulty: 'facile',
    question: 'Qui était l\'homme aveugle au sujet duquel Allah a interpellé Son Prophète ﷺ dans les premiers versets d\'\'Abasa ?',
    contextBanner: 'Verset 1-2 : عَبَسَ وَتَوَلَّىٰٓ أَن جَآءَهُ ٱلْأَعْمَىٰ',
    options: [
      'Bilal ibn Rabah',
      '\'Abdullah ibn Umm Maktûm, un compagnon sincère et pauvre',
      'Salmân Al-Fârisî',
      'Abu Dharr Al-Ghifârî'
    ],
    correctIndex: 1,
    explanation: 'Pendant que le Prophète ﷺ s\'efforçait de convaincre les grands notables de Quraysh (Utba, Abu Jahl), \'Abdullah ibn Umm Maktûm vint avec ferveur demander un enseignement. Le Prophète ﷺ fronça légèrement les sourcils pour ne pas être interrompu. Allah fit descendre ce rappel direct, prouvant l\'impartialité divine.',
    sourceReference: 'Jâmi\' At-Tirmidhî & Muwatta de l\'Imam Malik',
    modernReflection: 'Le Coran n\'est pas un panégyrique : il consigne fidèlement les reproches divins, gage absolu de son authenticité.'
  },
  {
    id: 'abasa-sens-1',
    category: 'sens',
    surahId: 80,
    surahName: '\'Abasa (Il s\'est renfrogné)',
    difficulty: 'moyen',
    question: 'Quelle leçon d\'éthique sociale fondamentale la sourate \'Abasa enseigne-t-elle à toute l\'humanité ?',
    contextBanner: 'La balance des priorités humaines selon Dieu',
    options: [
      'Qu\'il faut toujours privilégier les personnalités influentes pour faire grandir un projet',
      'Que la valeur d\'un être humain repose sur la pureté de son intention et sa soif de vérité, jamais sur son statut social, sa fortune ou son handicap physique',
      'Qu\'il est interdit d\'enseigner aux personnes non-voyantes',
      'Qu\'il ne faut jamais parler aux chefs de tribu'
    ],
    correctIndex: 1,
    explanation: 'Le pauvre sincère qui cherche à se purifier auprès de Dieu a infiniment plus de poids dans la balance divine que l\'oligarque arrogant qui se croit autosuffisant (« أَمَّا مَنِ ٱسْتَغْنَىٰ »). Plus tard, le Prophète ﷺ accueillait Ibn Umm Maktum en disant : « Bienvenue à celui pour qui mon Seigneur m\'a réprimandé ! ».',
    sourceReference: 'Tafsir Al-Qurtubi',
    modernReflection: 'Ne jamais snober ou ignorer un camarade timide pour tenter de se faire bien voir par le groupe populaire de la classe.'
  },

  // ==========================================
  // SOURATE AT-TIN (95) - HISTOIRE & SENS
  // ==========================================
  {
    id: 'tin-sens-1',
    category: 'sens',
    surahId: 95,
    surahName: 'At-Tîn (Le Figuier)',
    difficulty: 'moyen',
    question: 'Quels lieux sacrés des quatre grands messagers monothéistes sont désignés par les serments de la sourate At-Tîn ?',
    contextBanner: 'Verset 1-3 : Le Figuier, l\'Olivier, le Mont Sinaï et la Cité Sûre',
    options: [
      'Le Nil, l\'Euphrate, le Tigre et la mer Rouge',
      'Jérusalem/Palestine (terre de Jésus), le Mont Sinaï (Moïse) et La Mecque (Mohammed ﷺ)',
      'Damas, Bagdad, Le Caire et Médine',
      'L\'Éthiopie, le Yémen, l\'Irak et l\'Égypte'
    ],
    correctIndex: 1,
    explanation: 'Le figuier et l\'olivier renvoient à Jérusalem et la Palestine où Jésus prêchait ; le Mont Sinaï (Tûr Sînîn) est le mont où Moïse reçut la Torah ; la Cité Sûre (Al-Balad al-Amîn) est La Mecque où Mohammed ﷺ reçut le Coran. Ces serments unissent l\'héritage prophétique.',
    sourceReference: 'Tafsir Ibn Kathir & Al-Baydawi',
    modernReflection: 'La continuité du message divin à travers l\'histoire rappelle notre fraternité humaine fondamentale.'
  },

  // ==========================================
  // SOURATE AL-MUTAFIFIN (83) - WARSH & ETHIQUE
  // ==========================================
  {
    id: 'mutaffifin-warsh-1',
    category: 'tajwid_warsh',
    surahId: 83,
    surahName: 'Al-Mutaffifîn (Les Fraudeurs)',
    difficulty: 'expert',
    question: 'Quelle est la lecture de Warsh \'an Nâfi\' au verset 24 décrivant les visages radieux des bienheureux ?',
    contextBanner: 'Verset 24 : تَعْرِفُ vs تُعْرَفُ',
    options: [
      '« تُعْرَفُ فِى وُجُوهِهِمْ نَضْرَةُ ٱلنَّعِيمِ » (Tu’rafu... nadratu : à la forme passive « On reconnaît sur leurs visages l\'éclat du délice »)',
      '« تَعْرِفُ فِى وُجُوهِهِمْ نَضْرَةَ ٱلنَّعِيمِ » (forme active)',
      '« يَبْدُو فِى وُجُوهِهِمْ بَهْجَةُ ٱلنَّعِيمِ »',
      '« تَنْظُرُ فِى وُجُوهِهِمْ نَضْرَةُ ٱلنَّعِيمِ »'
    ],
    correctIndex: 1,
    explanation: 'Warsh \'an Nâfi\' lit ici comme Hafs, à la forme active : « تَعْرِفُ » (ta\'rifu, « tu reconnais ») avec « نَضْرَةَ ٱلنَّعِيمِ » à l\'accusatif. La forme passive « تُعْرَفُ … نَضْرَةُ » est la lecture d\'Abu Ja\'far et de Ya\'qub, pas celle de Nâfi\'.',
    sourceReference: 'Tafsir Al-Qurtubi (sourate 83, verset 24)',
    modernReflection: 'La précision des voyelles coraniques éclaire la beauté descriptive du Paradis.'
  },

  // ==========================================
  // SOURATE AL-A\'LA (87) - WARSH & SENS
  // ==========================================
  {
    id: 'ala-warsh-1',
    category: 'tajwid_warsh',
    surahId: 87,
    surahName: 'Al-A\'lâ (Le Très-Haut)',
    difficulty: 'expert',
    question: 'Quelle règle de récitation Warsh s\'applique sur le mot « تُؤْثِرُونَ » au verset 16 ?',
    contextBanner: 'Verset 16 : بَلْ تُوثِرُونَ ٱلْحَيَوٰةَ ٱلدُّنْيَا',
    options: [
      'Une règle de Naql (transfert)',
      'Une règle d\'Ibdâl : la Hamza quiescente précédée d\'une damma se transforme en un Waw allongé (« Bal tûthirûn »)',
      'Une règle d\'Imâla majeure',
      'Une règle d\'Ikhfâ'
    ],
    correctIndex: 1,
    explanation: 'Selon les principes de Warsh \'an Nâfi\', toute Hamza fermée (sâkinah) située à la place de la racine et précédée d\'une damma subit un Ibdâl en Waw méditatif : on récite « بَلْ تُوثِرُونَ » (Bal tûthirûna) au lieu de « تُؤْثِرُونَ ».',
    sourceReference: 'Al-Muyassar fî Qirâ\'at Warsh & Ash-Shâtibiyyah',
    modernReflection: 'Le son doux et fluide de l\'Ibdâl donne à la récitation Warsh sa musicalité mélodieuse caractéristique.'
  }
];

export function getQuizByCategory(cat: 'histoire' | 'sens' | 'tajwid_warsh' | 'general' | 'all'): QuizItem[] {
  if (cat === 'all') return HISTORICAL_AND_MEANING_QUIZ;
  return HISTORICAL_AND_MEANING_QUIZ.filter(q => q.category === cat);
}

export function getQuizBySurah(surahId: number): QuizItem[] {
  return HISTORICAL_AND_MEANING_QUIZ.filter(q => q.surahId === surahId);
}
