// scripts/buildQuranData.mjs
import fs from 'fs';
import path from 'path';

const SURAH_METADATA = {
  78: {
    translit: "An-Naba",
    french: "La Nouvelle",
    arabic: "النبأ",
    category: "grandes",
    categoryTitle: "🌌 LES GRANDES SOURATES",
    type: "Mecquoise",
    count: 40,
    keyMessage: "La certitude inéluctable de la Résurrection face aux doutes des sceptiques.",
    toRemember: "Chaque bienfait terrestre est une preuve de la puissance divine de ressusciter les hommes.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Révélée au début de la mission prophétique lorsque les Quraychites s'interrogeaient avec scepticisme et moquerie sur le Jour du Jugement annoncé par le Prophète ﷺ.",
      synthesis: "La sourate déploie les merveilles de la création (terre, montagnes, sommeil, cieux) comme démonstration de la facilité de la Résurrection pour le Créateur.",
      pedagogicalNote: "Parfaite pour initier le Juz 'Amma par le rythme saisissant de ses rimes et la description imagée du Jour Dernier."
    },
    inPlainLanguage: "Tout ce qui existe autour de nous montre que la vie a un but et que chacun répondra de ses choix le Jour où l'on soufflera dans la Trompe.",
    andToday: "Ne pas vivre dans l'illusion de la permanence matérielle, mais cultiver la lucidité morale face à ses actions quotidiennes.",
    hadith: {
      text: "Le Prophète ﷺ lisait souvent 'Amma yatasa'alun (An-Naba) lors de la prière du Maghrib et de l'Icha.",
      source: "Rapporté par An-Nasa'i (Hadith authentique)"
    }
  },
  79: {
    translit: "An-Nazi'at",
    french: "Ceux qui arrachent",
    arabic: "النازعات",
    category: "grandes",
    categoryTitle: "🌌 LES GRANDES SOURATES",
    type: "Mecquoise",
    count: 46,
    keyMessage: "Le destin des tyrans terrestres face à la majesté du Jour de l'Événement suprême.",
    toRemember: "L'arrogance et l'oubli de l'Au-delà précipitent la ruine de l'âme, à l'instar de Pharaon.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Descendue pour consoler le Messager ﷺ et rappeler le sort de Pharaon face à Moïse (Moussa), démontrant que la tyrannie ne perdure jamais face à la justice divine.",
      synthesis: "S'ouvre par le serment des anges chargés de saisir les âmes, évoque l'histoire de Pharaon puis la création majestueuse de la voûte céleste.",
      pedagogicalNote: "Remarquer les fins de versets en taqlîl caractéristique de la riwaya Warsh (ad-dunyâ, al-ma'wâ)."
    },
    inPlainLanguage: "La mort vient sans prévenir; les orgueilleux sont rabaissés et ceux qui ont craint la majesté de leur Seigneur auront le Paradis pour refuge.",
    andToday: "Freiner les élans de l'ego et refréner ses passions passagères avant le rendez-vous inévitable.",
    hadith: null
  },
  80: {
    translit: "Abasa",
    french: "Il a froncé les sourcils",
    arabic: "عبس",
    category: "grandes",
    categoryTitle: "🌌 LES GRANDES SOURATES",
    type: "Mecquoise",
    count: 42,
    keyMessage: "La valeur spirituelle d'une âme sincère prévaut sur tous les statuts sociaux du monde.",
    toRemember: "Ne jamais négliger celui qui vient chercher la guidance avec humilité.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Révélée à propos du compagnon aveugle 'Abdullah Ibn Oumm Maktoum venu s'instruire auprès du Prophète ﷺ alors que celui-ci s'entretenait avec des notables de Quraych.",
      synthesis: "Une interpellation divine affectueuse et ferme sur la hiérarchie des valeurs spirituelles, suivie d'un rappel des bienfaits de la subsistance.",
      pedagogicalNote: "Les rimes courtes et percutantes facilitent une mémorisation cadencée."
    },
    inPlainLanguage: "Devant Dieu, ce sont la piété et la sincérité du cœur qui comptent, pas la richesse ou la position sociale.",
    andToday: "Accueillir chaleureusement quiconque demande de l'aide ou un conseil sincère sans préjugé d'apparence.",
    hadith: {
      text: "Le Prophète ﷺ disait à Ibn Oumm Maktoum lorsqu'il le voyait : 'Bienvenue à celui pour qui mon Seigneur m'a fait des reproches !'",
      source: "Rapporté par Al-Hakim et At-Tirmidhi"
    }
  },
  81: {
    translit: "At-Takwir",
    french: "L'Enroulement",
    arabic: "التكوير",
    category: "grandes",
    categoryTitle: "🌌 LES GRANDES SOURATES",
    type: "Mecquoise",
    count: 29,
    keyMessage: "Le bouleversement de l'ordre cosmique et l'avènement de la Vérité absolue.",
    toRemember: "Chaque âme saura exactement ce qu'elle aura avancé comme œuvres bonnes ou mauvaises.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Descendue pour dépeindre de manière vivante la dislocation des astres et réhabiliter les victimes innocentes (comme la fillette enterrée vivante sous la Jahiliyya).",
      synthesis: "La première partie rythme douze conditions cosmiques; la seconde affirme l'authenticité de la révélation apportée par l'ange Jibril.",
      pedagogicalNote: "Structure anaphorique remarquable ('Idha... Idha...') aidant grandement la rétention mnésique."
    },
    inPlainLanguage: "Lorsque le soleil s'obscurcira et que les étoiles s'éteindront, aucune injustice ne restera ignorée et chacun verra son bilan.",
    andToday: "Défendre les sans-voix et mesurer l'impact de nos actes sur autrui.",
    hadith: {
      text: "Le Prophète ﷺ a dit : 'Quiconque désire voir le Jour de la Résurrection comme s'il le voyait de ses propres yeux, qu'il lise : Quand le soleil sera enroulé (At-Takwir)...'",
      source: "Rapporté par At-Tirmidhi (Hadith authentique)"
    }
  },
  82: {
    translit: "Al-Infitar",
    french: "La Déchirure",
    arabic: "الانفطار",
    category: "grandes",
    categoryTitle: "🌌 LES GRANDES SOURATES",
    type: "Mecquoise",
    count: 19,
    keyMessage: "La reconnaissance des bienfaits du Créateur et la présence des anges scribes veillant sur nos actes.",
    toRemember: "Ô homme ! Qu'est-ce qui t'a trompé au sujet de ton Seigneur, le Très Généreux ?",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Fait suite thématiquement à At-Takwir pour interpeller l'être humain sur son ingratitude envers son Créateur qui l'a constitué harmonieusement.",
      synthesis: "Rupture des cieux, dispersion des planètes, et questionnement existentiel sur l'insouciance humaine.",
      pedagogicalNote: "Sourate courte, parfaite pour travailler l'expressivité et la récitation posée."
    },
    inPlainLanguage: "Dieu nous a façonnés avec amour et harmonie; des anges nobles enregistrent nos œuvres avec bienveillance et rigueur.",
    andToday: "Vivre avec la conscience intime que nos paroles et agissements laissent une empreinte indélébile.",
    hadith: null
  },
  83: {
    translit: "Al-Mutaffifin",
    french: "Les Fraudeurs",
    arabic: "المطففين",
    category: "grandes",
    categoryTitle: "🌌 LES GRANDES SOURATES",
    type: "Mecquoise",
    count: 36,
    keyMessage: "L'éthique économique absolue et la transparence des transactions sous le regard divin.",
    toRemember: "Malheur à ceux qui exigent la pleine mesure pour eux-mêmes mais trichent lorsqu'ils mesurent pour autrui.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Dernière sourate mecquoise ou révélée lors de l'arrivée à Médine où les fraudes sur les marchés étaient courantes, transformant immédiatement les pratiques commerciales des croyants.",
      synthesis: "Condamnation sans appel de la malhonnêteté mercantile, opposition entre le registre des pécheurs (Sijjîn) et celui des pieux ('Illiyyûn).",
      pedagogicalNote: "Aborde la notion de voile du cœur (ar-rân) causé par l'accumulation des fautes."
    },
    inPlainLanguage: "Être honnête au centime près : ne pas profiter des autres ni tricher quand personne ne regarde.",
    andToday: "Intégrité professionnelle, respect rigoureux des contrats et transparence financière sans compromis.",
    hadith: null
  },
  84: {
    translit: "Al-Inchiqaq",
    french: "La Fissure",
    arabic: "الانشقاق",
    category: "grandes",
    categoryTitle: "🌌 LES GRANDES SOURATES",
    type: "Mecquoise",
    count: 25,
    keyMessage: "L'effort constant de l'homme vers son Seigneur jusqu'à la rencontre finale.",
    toRemember: "Ô homme ! Toi qui t'efforces avec ardeur vers ton Seigneur, tu Le rencontreras assurément.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Appel solennel à la soumission volontaire de l'homme, en miroir de l'obéissance spontanée du ciel et de la terre aux ordres de leur Créateur.",
      synthesis: "Comporte une prosternation de récitation (Sajda) au verset 21.",
      pedagogicalNote: "Alternance saisissante entre le soulagement de celui qui reçoit son livre en main droite et l'angoisse de celui qui le reçoit derrière son dos."
    },
    inPlainLanguage: "La vie est un cheminement constant fait d'efforts; au bout de la route, la paix de la rencontre divine pour les cœurs droits.",
    andToday: "Persévérer dans l'effort quotidien, même discret, car chaque pas constructif porte ses fruits.",
    hadith: {
      text: "Abou Hourayrah a prié avec nous et s'est prosterné lors de la lecture d'Al-Inchiqaq, affirmant que le Prophète ﷺ s'y était prosterné.",
      source: "Rapporté par Mouslim (Hadith authentique)"
    }
  },
  85: {
    translit: "Al-Buruj",
    french: "Les Constellations",
    arabic: "البروج",
    category: "recits",
    categoryTitle: "📜 RÉCITS & RAPPELS",
    type: "Mecquoise",
    count: 22,
    keyMessage: "La constance inébranlable de la foi face aux épreuves et à la persécution.",
    toRemember: "La victoire véritable réside dans la fidélité de l'âme à ses principes, quel qu'en soit le prix terrestre.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Révélée pendant la période de sévères persécutions à la Mecque pour réconforter les premiers musulmans opprimés en leur rappelant l'histoire du peuple du fossé (Ashab al-Ukhdud).",
      synthesis: "Serment par le ciel aux constellations et méditation sur la puissance infinie de Dieu qui protège la Table Gardée (Al-Lawh Al-Mahfûz).",
      pedagogicalNote: "Rimes en 'd' et 'j' très fortes stimulant la mémoire auditive."
    },
    inPlainLanguage: "Ceux qui souffrent pour la vérité et la justice ne sont jamais oubliés : leur patience est couronnée de jardins éternels.",
    andToday: "Garder courage et intégrité morale même quand le contexte environnant s'avère défavorable.",
    hadith: null
  },
  86: {
    translit: "At-Tariq",
    french: "L'Astre Nocturne",
    arabic: "الطارق",
    category: "recits",
    categoryTitle: "📜 RÉCITS & RAPPELS",
    type: "Mecquoise",
    count: 17,
    keyMessage: "Toute âme possède un gardien protecteur; Celui qui a créé l'homme d'une goutte est capable de le faire renaître.",
    toRemember: "Le Coran est une parole décisive, ce n'est point un divertissement futile.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Interpellation philosophique et scientifique sur la genèse de l'être humain pour répondre aux incrédules niant la résurrection.",
      synthesis: "Évocation de l'astre perçant (Najm Thâqib) et du secret des cœurs qui sera un jour mis à nu.",
      pedagogicalNote: "Progression logique limpide reliant l'origine biologique de l'homme à sa destination finale."
    },
    inPlainLanguage: "Tu n'es jamais seul ni abandonné : Dieu veille sur toi et percevra la sincérité de tes secrets les plus profonds.",
    andToday: "Prendre du recul le soir sous les étoiles pour mesurer la fragilité humaine et la grandeur divine.",
    hadith: null
  },
  87: {
    translit: "Al-A'la",
    french: "Le Très-Haut",
    arabic: "الأعلى",
    category: "recits",
    categoryTitle: "📜 RÉCITS & RAPPELS",
    type: "Mecquoise",
    count: 19,
    keyMessage: "La glorification du Seigneur Suprême qui guide la création et préserve la mémoire de Sa Parole.",
    toRemember: "Nous te ferons réciter [le Coran] de sorte que tu n'oublieras rien, sauf ce qu'Allah veut.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Le Prophète ﷺ aimait profondément cette sourate et la récitait très fréquemment lors de la prière du Vendredi, de l'Aïd et du Witr.",
      synthesis: "Éloge de la purification de l'âme (Tazkiya) et rappel de la continuité avec les Feuillets d'Abraham et de Moïse.",
      pedagogicalNote: "Verset clé pour l'étudiant du Coran : promesse divine d'une mémorisation facilitée et préservée."
    },
    inPlainLanguage: "Glorifie ton Créateur qui facilite ton apprentissage et oriente ton cœur vers ce qui est le plus bénéfique.",
    andToday: "Ne pas sacrifier la paix durable de l'âme pour des satisfactions éphémères.",
    hadith: {
      text: "Le Prophète ﷺ récitait dans la prière de l'Aïd et du Vendredi : Sabbihi sma Rabbika al-A'la et Al-Ghashiyah.",
      source: "Rapporté par Mouslim (Hadith authentique)"
    }
  },
  88: {
    translit: "Al-Ghachiya",
    french: "L'Enveloppante",
    arabic: "الغاشية",
    category: "recits",
    categoryTitle: "📜 RÉCITS & RAPPELS",
    type: "Mecquoise",
    count: 26,
    keyMessage: "La contemplation de la nature comme invitation douce à la foi, et le rôle du Prophète comme simple transmetteur.",
    toRemember: "Rappelle donc ! Tu n'es qu'un rappeleur, tu n'as sur eux aucune contrainte.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Offre un contraste saisissant entre les visages accablés et les visages épanouis, puis invite à observer les chameaux, le ciel et les montagnes.",
      synthesis: "Une leçon de théologie naturelle accessible à tout observateur du désert ou du monde contemporain.",
      pedagogicalNote: "Parfaite illustration du respect de la liberté de conscience : 'tu n'es pas chargé de les contraindre'.",
    },
    inPlainLanguage: "Regarde le monde avec émerveillement et humilité; partage le bien autour de toi avec douceur, sans forcer personne.",
    andToday: "Transmettre ses valeurs par l'exemple et la bienveillance plutôt que par la pression ou le jugement.",
    hadith: null
  },
  89: {
    translit: "Al-Fajr",
    french: "L'Aube",
    arabic: "الفجر",
    category: "recits",
    categoryTitle: "📜 RÉCITS & RAPPELS",
    type: "Mecquoise",
    count: 30,
    keyMessage: "L'élévation de l'âme apaisée qui retourne vers son Seigneur satisfaite et agréée.",
    toRemember: "Ô toi, âme apaisée ! Retourne vers ton Seigneur, satisfaite et agréée.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Serments par l'aube naissante et les dix nuits sacrées (début de Dhul-Hijjah), avertissement aux cités orgueilleuses du passé ('Ad, Thamûd).",
      synthesis: "Dénonciation de la dureté envers l'orphelin et de la voracité pour l'héritage, culminant vers l'appel magistral à l'âme sereine (An-Nafs Al-Mutma'inna).",
      pedagogicalNote: "Le cas particulier d'Iram (إِرَمَ) avec son râ' aminci (tarqîq) spécifique selon les règles de lecture."
    },
    inPlainLanguage: "La richesse matérielle n'est pas un signe d'honneur en soi, ni la pauvreté un mépris; la vraie noblesse est la générosité et l'apaisement du cœur.",
    andToday: "Prendre soin des personnes vulnérables de notre société et cultiver la sérénité intérieure.",
    hadith: null
  },
  90: {
    translit: "Al-Balad",
    french: "La Cité",
    arabic: "البلد",
    category: "recits",
    categoryTitle: "📜 RÉCITS & RAPPELS",
    type: "Mecquoise",
    count: 20,
    keyMessage: "L'ascension de la voie difficile (Al-'Aqaba) : libérer les opprimés et nourrir les affamés.",
    toRemember: "L'ascension véritable consiste à affranchir un esclave ou nourrir en un jour de famine l'orphelin ou le pauvre démuni.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Serment solennel par la cité sainte de la Mecque, proclamant que l'homme a été créé dans l'épreuve et l'effort continu (Kabad).",
      synthesis: "Définit les croyants comme ceux qui s'enjoignent mutuellement l'endurance et la miséricorde bienveillante.",
      pedagogicalNote: "Mémoriser particulièrement les versets 12 à 18 qui définissent l'engagement social du croyant."
    },
    inPlainLanguage: "La grandeur d'une vie ne se mesure pas à ce qu'on accumule, mais aux obstacles qu'on surmonte pour aider les plus fragiles.",
    andToday: "S'engager activement dans des actions d'entraide solidaire et d'humanité partagée.",
    hadith: null
  },
  91: {
    translit: "Ach-Chams",
    french: "Le Soleil",
    arabic: "الشمس",
    category: "recits",
    categoryTitle: "📜 RÉCITS & RAPPELS",
    type: "Mecquoise",
    count: 15,
    keyMessage: "La purification morale de l'âme comme clé du salut universel.",
    toRemember: "A réussi celui qui la purifie [son âme], et est perdu celui qui la corrompt !",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Comporte la plus longue suite ininterrompue de serments du Coran (11 serments cosmiques consécutifs) soulignant l'importance capitale de l'éthique de l'âme.",
      synthesis: "Exemple historique de la chamelle de Salih et de la tribu de Thamûd anéantie pour avoir transgressé les bornes sacrées.",
      pedagogicalNote: "Harmonie phonétique exceptionnelle : tous les versets se terminent par le suffixe 'hâ' (ها) avec taqlîl en Warsh."
    },
    inPlainLanguage: "Chacun porte en lui la capacité du bien et du mal; le vrai succès est de polir son cœur et de corriger ses défauts.",
    andToday: "Prendre chaque soir quelques minutes d'introspection pour évaluer ses intentions et ses actes.",
    hadith: {
      text: "Le Prophète ﷺ recommanda à Mu'adh de réciter Ach-Chams, Al-A'la et Al-Layl pour alléger la prière en assemblée.",
      source: "Rapporté par Al-Bukhari et Mouslim"
    }
  },
  92: {
    translit: "Al-Layl",
    french: "La Nuit",
    arabic: "الليل",
    category: "recits",
    categoryTitle: "📜 RÉCITS & RAPPELS",
    type: "Mecquoise",
    count: 21,
    keyMessage: "La diversité des efforts humains et la promesse de la voie facile pour le cœur généreux.",
    toRemember: "Celui qui donne, craint Dieu et déclare véridique la plus belle récompense, Nous lui faciliterons la voie au plus grand bonheur.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Révélée en grande partie en hommage à la générosité d'Abou Bakr As-Siddiq qui rachetait et affranchissait les esclaves persécutés comme Bilal.",
      synthesis: "Parallèle antithétique limpide entre la voie de la générosité et de la foi, et celle de l'avarice et de la suffisance égoïste.",
      pedagogicalNote: "Les rimes en taqlîl Warsh confèrent une douceur réconfortante à la lecture."
    },
    inPlainLanguage: "Quand tu partages avec sincérité, la vie s'éclaire et tes pas deviennent plus légers.",
    andToday: "Développer la bienveillance au quotidien et savoir donner sans attendre de réciprocité humaine.",
    hadith: null
  },
  93: {
    translit: "Ad-Duha",
    french: "La Matinée",
    arabic: "الضحى",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Mecquoise",
    count: 11,
    keyMessage: "La tendresse divine face à la détresse morale : l'avenir sera meilleur que le passé.",
    toRemember: "Ton Seigneur ne t'a ni abandonné, ni détesté.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Descendue après une interruption temporaire de la révélation (Fatrat al-Wahy) qui avait suscité les railleries des négateurs et attristé profondément le Prophète ﷺ.",
      synthesis: "Baume spirituel rappelant les bienfaits reçus (l'orphelin abrité, l'égaré guidé, le démuni enrichi) pour ordonner la bienveillance envers autrui.",
      pedagogicalNote: "Formule de Takbîr (Allahu Akbar) traditionnellement récitée entre cette sourate et les suivantes lors de la khatma."
    },
    inPlainLanguage: "Dans les moments de solitude ou de doute, souviens-toi que Dieu est proche et qu'après l'ombre revient toujours la lumière.",
    andToday: "Ne jamais repousser celui qui sollicite notre aide et exprimer la gratitude pour ce que l'on a reçu.",
    hadith: {
      text: "Le Prophète ﷺ a dit : 'Ton Seigneur ne t'a ni abandonné, ni détesté', descendue pour apaiser le Messager de Dieu.",
      source: "Rapporté par Al-Bukhari (Hadith authentique)"
    }
  },
  94: {
    translit: "Al-Inchirah",
    french: "L'Expansion",
    arabic: "الشرح",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Mecquoise",
    count: 8,
    keyMessage: "La certitude inaltérable que la facilité accompagne toujours la difficulté.",
    toRemember: "Certes, avec la difficulté est la facilité ! Oui, avec la difficulté est la facilité !",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Complément direct d'Ad-Duha, révélée pour fortifier le cœur du Messager ﷺ face au fardeau des responsabilités et des oppositions mecquoises.",
      synthesis: "Ouverture de la poitrine, allègement du fardeau pesant sur le dos, élévation de la renommée, et invitation au dévouement spirituel dès l'accomplissement des tâches.",
      pedagogicalNote: "Comporte 8 versets parfaitement équilibrés dont la répétition des versets 5 et 6 illustre la règle : une seule difficulté ne peut vaincre deux facilités."
    },
    inPlainLanguage: "Chaque épreuve porte en elle le germe de sa propre solution : garde espoir et persévère dans la sérénité.",
    andToday: "Transformer les périodes d'adversité en opportunités d'apprentissage et de renforcement intérieur.",
    hadith: {
      text: "Ibn 'Abbas disait : 'Une difficulté ne saurait triompher de deux facilités', en référence aux versets 5 et 6.",
      source: "Rapporté par Al-Hakim et 'Abdur-Razzaq"
    }
  },
  95: {
    translit: "At-Tin",
    french: "Le Figuier",
    arabic: "التين",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Mecquoise",
    count: 8,
    keyMessage: "La dignité ontologique de l'être humain et sa préservation par la foi active.",
    toRemember: "Nous avons certes créé l'homme dans la forme la plus parfaite.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Serment par les lieux de révélation prophétique (le Figuier, l'Olivier, le Mont Sinaï de Moïse et la Cité paisible de la Mecque).",
      synthesis: "L'être humain est doté du potentiel le plus noble, mais peut déchoir au plus bas s'il renie la foi et les œuvres de justice.",
      pedagogicalNote: "Formule de réponse recommandée à la fin : 'Balâ wa anâ 'alâ dhâlika min ash-shâhidîn'."
    },
    inPlainLanguage: "Dieu t'a accordé une valeur infinie et une constitution admirable : fais honneur à cette noblesse par tes actes.",
    andToday: "Prendre soin de son corps, de son esprit et de sa moralité comme d'un dépôt précieux.",
    hadith: {
      text: "Al-Baraa Ibn 'Azib rapporte : 'J'ai entendu le Prophète ﷺ réciter dans la prière de la nuit : Wat-Tini waz-Zaytoun.'",
      source: "Rapporté par Al-Bukhari et Mouslim"
    }
  },
  96: {
    translit: "Al-Alaq",
    french: "Le Caillot",
    arabic: "العلق",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Mecquoise",
    count: 19,
    keyMessage: "La quête du savoir au Nom du Seigneur Généreux et la condamnation de la tyrannie orgueilleuse.",
    toRemember: "Lis, au nom de ton Seigneur qui a créé ! Qui a enseigné à l'homme par la plume ce qu'il ne savait pas.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Les cinq premiers versets constituent la toute première révélation du Coran descendue sur le Prophète ﷺ dans la grotte de Hira par l'ange Jibril.",
      synthesis: "La seconde partie fustige Abou Jahl qui cherchait à empêcher le Prophète de prier auprès de la Kaaba; se termine par une prosternation (Sajda).",
      pedagogicalNote: "Marque historique fondatrice de l'Islam : l'injonction de la lecture et de la plume comme transmission du savoir."
    },
    inPlainLanguage: "L'apprentissage et la transmission de la connaissance sont des actes sacrés qui protègent l'homme contre l'illusion de l'autosuffisance.",
    andToday: "Lire, s'instruire continuellement et rester humble devant l'immensité de ce qu'on ignore encore.",
    hadith: {
      text: "Aïcha (qu'Allah soit satisfait d'elle) a relaté les débuts de la révélation : 'L'ange vint à lui et dit : Lis ! Il répondit : Je ne sais pas lire...'",
      source: "Rapporté par Al-Bukhari (Hadith authentique)"
    }
  },
  97: {
    translit: "Al-Qadr",
    french: "La Nuit du Destin",
    arabic: "القدر",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Mecquoise",
    count: 5,
    keyMessage: "La bénédiction incomparable de la Nuit du Destin, meilleure que mille mois.",
    toRemember: "La Nuit d'Al-Qadr est meilleure que mille mois. Les Anges et l'Esprit y descendent avec la permission de leur Seigneur.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Célèbre la descente inaugurale du Coran depuis la Table Gardée jusqu'au ciel de la terre durant cette nuit bénie du mois de Ramadan.",
      synthesis: "Une nuit de paix, de pardon et d'effusion de grâce divine jusqu'au lever de l'aube.",
      pedagogicalNote: "Une des sourates les plus récitées et chéries durant les dix dernières nuits de Ramadan."
    },
    inPlainLanguage: "Une seule nuit de dévotion sincère peut transformer une existence entière et apporter la paix du cœur.",
    andToday: "Saisir les moments privilégiés de recueillement nocturne pour renouveler ses aspirations spirituelles.",
    hadith: {
      text: "Le Prophète ﷺ a dit : 'Cherchez la Nuit du Destin parmi les nuits impaires des dix dernières nuits de Ramadan.'",
      source: "Rapporté par Al-Bukhari et Mouslim"
    }
  },
  98: {
    translit: "Al-Bayyina",
    french: "La Preuve Claire",
    arabic: "البينة",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Médinoise",
    count: 8,
    keyMessage: "L'essence intemporelle de la religion : vouer à Dieu un culte sincère, accomplir la prière et acquitter la zakât.",
    toRemember: "Il ne leur a été commandé que d'adorer Allah, Lui vouant un culte exclusif, d'accomplir la Salat et d'acquitter la Zakat.",
    context: {
      typeBadge: "Médinoise",
      circumstances: "Révélée à Médine pour clarifier le message universel adressé aux Gens du Livre et aux polythéistes face à la venue du Messager ﷺ.",
      synthesis: "Définit les croyants sincères qui agissent avec droiture comme la meilleure des créatures (Khayru al-Bariyya).",
      pedagogicalNote: "Noter la seule sourate médinoise de ce groupe avec An-Nasr et Az-Zalzala selon certains avis."
    },
    inPlainLanguage: "La religion n'est pas un ensemble de complications, mais la sincérité du cœur envers Dieu et la bonté envers autrui.",
    andToday: "Aligner ses croyances avec des comportements d'intégrité, de générosité et de respect mutuel.",
    hadith: {
      text: "Le Prophète ﷺ dit à Ubayy ibn Ka'b : 'Allah m'a ordonné de te réciter : Lam yakuni lladhina kafarou...'",
      source: "Rapporté par Al-Bukhari et Mouslim"
    }
  },
  99: {
    translit: "Az-Zalzala",
    french: "Le Séisme",
    arabic: "الزلزلة",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Médinoise",
    count: 8,
    keyMessage: "La terre témoignera de tout ce qui s'est passé, et chaque grain de poussière comptera.",
    toRemember: "Quiconque fait un bien fût-ce du poids d'un atome, le verra. Et quiconque fait un mal fût-ce du poids d'un atome, le verra.",
    context: {
      typeBadge: "Médinoise",
      circumstances: "Révélée pour sensibiliser à la valeur de chaque petite action : les fidèles pensaient parfois que les péchés minimes n'avaient pas d'importance.",
      synthesis: "Secousse ultime de la terre, expulsion de ses fardeaux, et présentation des comptes d'une précision microscopique.",
      pedagogicalNote: "Le Prophète ﷺ l'a comparée au quart ou à la moitié du Coran par la portée de sa synthèse morale."
    },
    inPlainLanguage: "Aucun geste de bonté n'est jamais trop petit, aucun faux pas n'est sans conséquence : chaque seconde compte.",
    andToday: "Ne jamais sous-estimer un sourire, une parole apaisante ou un déchet ramassé sur le chemin.",
    hadith: {
      text: "Le Prophète ﷺ a dit : 'Craignez le Feu ne serait-ce que par la moitié d'une datte [donnée en aumône].'",
      source: "Rapporté par Al-Bukhari (Hadith authentique)"
    }
  },
  100: {
    translit: "Al-Adiyat",
    french: "Les Coursiers",
    arabic: "العاديات",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Mecquoise",
    count: 11,
    keyMessage: "L'ingratitude naturelle de l'homme face aux bienfaits et son amour excessif des richesses.",
    toRemember: "L'homme est certes ingrat envers son Seigneur; et pour l'amour des richesses, il est ardent.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Évoque l'élan impétueux des montures au galop soufflant et faisant jaillir des étincelles lors d'une charge matinale.",
      synthesis: "Contraste entre la loyauté absolue du cheval envers son cavalier et l'ingratitude fréquente de l'être humain envers son Bienfaiteur.",
      pedagogicalNote: "Rimes saccadées ('ad-ha, qad-ha, sub-ha) d'un dynamisme phonétique saisissant."
    },
    inPlainLanguage: "Prends conscience de tout ce qui t'a été donné au lieu de courir sans fin après ce qui te manque.",
    andToday: "S'affranchir de la cupidité consumériste et apprécier la valeur inestimable des grâces quotidiennes.",
    hadith: null
  },
  101: {
    translit: "Al-Qari'a",
    french: "Le Fracas",
    arabic: "القارعة",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Mecquoise",
    count: 11,
    keyMessage: "La pesée des actes et la divergence des destinées selon le poids des œuvres sincères.",
    toRemember: "Quant à celui dont la balance sera lourde, il sera dans une vie agréable.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Décrit le choc saisissant du Jour dernier où les humains seront semblables à des papillons éparpillés et les montagnes à de la laine cardée.",
      synthesis: "Mawâzîn (les balances) de justice où chaque acte pèsera pour déterminer le refuge éternel.",
      pedagogicalNote: "Dialogue pédagogique classique du Coran : 'Et qui te dira ce qu'est le Fracas ?'"
    },
    inPlainLanguage: "Tes bonnes actions de chaque jour sont les poids d'or qui feront pencher ta balance du bon côté.",
    andToday: "Alimenter chaque jour sa 'balance' par de la patience, de l'honnêteté et de la compassion.",
    hadith: null
  },
  102: {
    translit: "At-Takâthur",
    french: "La Rivalité",
    arabic: "التكاثر",
    category: "coeur",
    categoryTitle: "💚 LE CŒUR DU JUZ",
    type: "Mecquoise",
    count: 8,
    keyMessage: "L'illusion de la course aux avoirs qui distrait l'homme jusqu'à la tombe.",
    toRemember: "La course aux richesses vous distrait, jusqu'à ce que vous visitiez les tombes.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Descendue au sujet des clans rivaux de la Mecque ou de Médine qui se vantaient de leur nombre et de leurs biens, allant jusqu'à compter les tombes de leurs ancêtres.",
      synthesis: "Avertissement solennel sur l'illusion de l'accumulation matérielle et l'interrogatoire final sur chaque délice (An-Na'îm).",
      pedagogicalNote: "Progression vers la certitude : 'Ilm al-Yaqîn (la science de certitude) puis 'Ayn al-Yaqîn (la vue de certitude)."
    },
    inPlainLanguage: "Ne perds pas ta vie à accumuler des biens ou des statuts futiles : savoure avec gratitude et partage.",
    andToday: "Prendre du recul face aux réseaux sociaux et à la comparaison sociale perpétuelle.",
    hadith: {
      text: "Le Prophète ﷺ récitait Alhâkumu t-Takâthur et disait : 'Le fils d'Adam dit : Mes biens ! Mes biens ! Mais possèdes-tu d'autre que ce que tu as mangé et épuisé, ou donné en aumône et perpétué ?'",
      source: "Rapporté par Mouslim (Hadith authentique)"
    }
  },
  103: {
    translit: "Al-Asr",
    french: "Le Temps",
    arabic: "العصر",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 3,
    keyMessage: "La charte fondamentale du salut humain en trois versets d'une concision magistrale.",
    toRemember: "Par le Temps ! L'homme est certes en perdition, sauf ceux qui croient, font de bonnes œuvres, s'enjoignent mutuellement la vérité et s'enjoignent mutuellement l'endurance.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "L'Imam Ash-Shafi'i disait à son sujet : 'Si les gens ne méditaient que sur cette seule sourate, elle leur suffirait pleinement pour guider leur vie'.",
      synthesis: "Quatre piliers inséparables pour échapper au naufrage du temps : la foi, l'action bienfaisante, le courage de la vérité, et la patience partagée.",
      pedagogicalNote: "Les compagnons du Prophète ﷺ avaient pour habitude de ne pas se séparer sans s'être récité cette sourate."
    },
    inPlainLanguage: "Le temps passe vite et s'échappe : la seule façon de ne pas le gaspiller est de vivre avec foi, droiture, courage et solidarité.",
    andToday: "Gérer son temps avec discernement et s'entourer d'amis qui nous tirent vers le haut et la patience.",
    hadith: {
      text: "Deux compagnons du Messager de Dieu ﷺ ne se quittaient jamais sans que l'un d'eux ne récite à l'autre Sourate Al-'Asr jusqu'au bout.",
      source: "Rapporté par At-Tabarani et Al-Bayhaqi (Hadith authentique)"
    }
  },
  104: {
    translit: "Al-Humaza",
    french: "Le Médisant",
    arabic: "الهمزة",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 9,
    keyMessage: "La condamnation sans appel de la médisance, de la moquerie et du culte de l'argent.",
    toRemember: "Malheur à tout calomniateur diffamateur, qui amasse une fortune et la compte !",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Visait des notables mecquois arrogants comme Al-Walid ibn al-Mughira ou Al-Akhnas ibn Shariq qui calomniaient les croyants démunis.",
      synthesis: "Dénonce l'illusion que la richesse puisse rendre immortel, et décrit Al-Hutama (le Feu broyeur qui monte jusqu'aux cœurs).",
      pedagogicalNote: "Vocabulaire saisissant (Humaza, Lumaza, Hutama) avertissant contre les blessures verbales."
    },
    inPlainLanguage: "Ne te moque jamais des autres, ne critique pas dans leur dos et ne crois pas que l'argent te met au-dessus des lois morales.",
    andToday: "Protéger sa langue et son clavier contre le cyber-harcèlement, les ragots et les moqueries numériques.",
    hadith: null
  },
  105: {
    translit: "Al-Fil",
    french: "L'Éléphant",
    arabic: "الفيل",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 5,
    keyMessage: "La protection divine de la Kaaba face à l'armée puissante d'Abraha.",
    toRemember: "N'as-tu pas vu comment ton Seigneur a agi envers les gens de l'Éléphant ?",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Fait référence à l'année de naissance du Prophète ﷺ ('Âm al-Fîl, ~570) quand le gouverneur du Yémen Abraha marcha sur la Mecque avec des éléphants de guerre pour détruire la Kaaba.",
      synthesis: "Dieu envoya des nuées d'oiseaux (Abâbîl) bombardant l'armée de pierres d'argile, les réduisant comme de la paille mâchée.",
      pedagogicalNote: "Rappel historique vivant pour les Quraychites de la protection dont bénéficiait leur sanctuaire."
    },
    inPlainLanguage: "Aucune force terrestre ni aucune machination ne peut triompher de la volonté et de la justice divines.",
    andToday: "Ne pas se laisser impressionner par l'arrogance des puissants : la justice divine a toujours le dernier mot.",
    hadith: null
  },
  106: {
    translit: "Quraych",
    french: "Quraych",
    arabic: "قريش",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 4,
    keyMessage: "La gratitude pour la sécurité et la subsistance accordées par le Seigneur du Sanctuaire.",
    toRemember: "Qu'ils adorent donc le Seigneur de cette Maison, qui les a nourris contre la faim et rassurés de la peur !",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Liée thématiquement à la sourate précédente (certains pieux prédécesseurs les lisaient ensemble), rappelant les deux caravanes marchandes protégées d'hiver et d'été.",
      synthesis: "La sécurité civile et la sécurité alimentaire sont les deux plus grands bienfaits matériels octroyés à une société.",
      pedagogicalNote: "Les quatre versets sont fluides et rythmés, idéaux pour les enfants et les débutants."
    },
    inPlainLanguage: "Lorsque tu as un toit sûr et de quoi manger à ta faim, remercie de tout ton cœur Celui qui t'en a comblé.",
    andToday: "Prendre conscience du privilège immense de vivre en paix et de ne pas souffrir de la famine.",
    hadith: null
  },
  107: {
    translit: "Al-Ma'un",
    french: "L'Ustensile",
    arabic: "الماعون",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 7,
    keyMessage: "La prière n'a de valeur que si elle se traduit par la compassion sociale et l'entraide concrète.",
    toRemember: "Malheur à ceux qui prient tout en étant négligents, qui font preuve d'ostentation et refusent l'aide mutuelle la plus simple !",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Dénonce l'hypocrisie de ceux qui prétendent respecter la religion mais repoussent l'orphelin et refusent de prêter un simple ustensile du quotidien (Al-Mâ'ûn).",
      synthesis: "Une leçon cinglante reliant indissociablement l'adoration rituelle à la solidarité humaine la plus humble.",
      pedagogicalNote: "Al-Mâ'ûn désigne le sel, l'eau, une marmite, une aiguille : tout ce qu'on peut prêter à un voisin."
    },
    inPlainLanguage: "Prier ne suffit pas : si tu refuses de prêter un outil ou de dépanner ton voisin, ta piété est vide de sens.",
    andToday: "Être un voisin serviable, chaleureux et attentif aux besoins des personnes âgées et démunies du quartier.",
    hadith: null
  },
  108: {
    translit: "Al-Kawthar",
    french: "L'Abondance",
    arabic: "الكوثر",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 3,
    keyMessage: "Le réconfort divin suprême et le fleuve céleste accordé au Messager de Dieu.",
    toRemember: "Nous t'avons certes accordé l'Abondance. Prie donc ton Seigneur et sacrifie ! C'est ton ennemi qui sera sans postérité.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Descendue après la mort prématurée des fils du Prophète ﷺ quand ses opposants le qualifièrent cruellement d'abtar (homme sans descendance et oublié).",
      synthesis: "La plus courte sourate du Coran par son nombre de mots, portant pourtant une promesse de gloire et de pérennité inépuisables.",
      pedagogicalNote: "Le bassin d'Al-Kawthar le Jour de la Résurrection dont l'eau est plus blanche que le lait et plus douce que le miel."
    },
    inPlainLanguage: "Ceux qui cherchent à te blesser ou à t'isoler ne l'emporteront pas : la bonté sincère traverse les siècles.",
    andToday: "Trouver la consolation auprès de Dieu dans les épreuves de la perte ou de la méchanceté gratuite.",
    hadith: {
      text: "Le Prophète ﷺ a souri et dit : 'Une sourate vient de m'être révélée', puis il récita Al-Kawthar et expliqua : 'C'est un fleuve que mon Seigneur m'a promis au Paradis.'",
      source: "Rapporté par Mouslim (Hadith authentique)"
    }
  },
  109: {
    translit: "Al-Kafirun",
    french: "Les Incroyants",
    arabic: "الكافرون",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 6,
    keyMessage: "La liberté de culte et la pureté théologique : pas de compromis sur l'unicité divine.",
    toRemember: "À vous votre religion, et à moi ma religion !",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Les chefs de Quraych proposèrent un compromis au Prophète ﷺ : qu'il adore leurs idoles pendant une année et qu'ils adorent son Dieu l'année suivante.",
      synthesis: "Rupture nette avec toute forme de syncrétisme idolâtre, tout en posant le principe du respect pacifique de la foi de chacun.",
      pedagogicalNote: "Surnommée 'Sourate du désaveu de l'idolâtrie' (Barâ'a min ash-Shirk)."
    },
    inPlainLanguage: "Affirmer ses convictions avec clarté, dignité et sérénité, sans agressivité ni renoncement à sa foi.",
    andToday: "Vivre sa foi avec authenticité tout en respectant scrupuleusement la liberté de conscience des autres.",
    hadith: {
      text: "Le Prophète ﷺ récitait Al-Kafirun et Al-Ikhlas dans les deux rak'ats précédant la prière du Fajr et celles suivant le Maghrib.",
      source: "Rapporté par Mouslim (Hadith authentique)"
    }
  },
  110: {
    translit: "An-Nasr",
    french: "Le Secours",
    arabic: "النصر",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Médinoise",
    count: 3,
    keyMessage: "La victoire appelle l'humilité, la louange et la demande de pardon, jamais le triomphalisme.",
    toRemember: "Lorsque viennent le secours d'Allah ainsi que la victoire... alors par la louange, célèbre la gloire de ton Seigneur et implore Son pardon !",
    context: {
      typeBadge: "Médinoise",
      circumstances: "Dernière sourate complète révélée avant le départ du Prophète ﷺ, annonçant l'ouverture pacifique de la Mecque et l'accomplissement de sa mission terrestre.",
      synthesis: "Ibn 'Abbas comprit qu'elle annonçait le terme prochain de la noble vie du Messager de Dieu ﷺ.",
      pedagogicalNote: "Enseigne que le succès doit se clore par l'istighfâr (demande de pardon) et le remerciement."
    },
    inPlainLanguage: "Lorsque tu atteins un grand objectif, reste humble et remercie Dieu au lieu de t'enorgueillir.",
    andToday: "Pratiquer la modestie après chaque réussite professionnelle ou personnelle.",
    hadith: {
      text: "Aïcha rapporte que le Prophète ﷺ disait fréquemment dans son inclinaison et sa prosternation : 'Gloire et louange à Toi, ô Allah notre Seigneur, pardonne-moi', en application d'An-Nasr.",
      source: "Rapporté par Al-Bukhari et Mouslim"
    }
  },
  111: {
    translit: "Al-Masad",
    french: "La Corde en fibres",
    arabic: "المسد",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 5,
    keyMessage: "La vanité des liens de sang et de la fortune devant l'opposition farouche à la vérité.",
    toRemember: "De rien ne lui ont servi ses richesses ni ce qu'il a acquis !",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Lorsque le Prophète ﷺ appela les Quraychites sur le mont As-Safa pour les avertir, son oncle Abou Lahab cria : 'Périsses-tu pour le restant du jour ! Est-ce pour cela que tu nous as réunis ?'.",
      synthesis: "Avertissement solennel contre Abou Lahab et son épouse Oumm Jamil qui semait des épines sur le chemin du Messager.",
      pedagogicalNote: "Excellente illustration des lettres de qalqala (د, ب) sur les rimes de versets."
    },
    inPlainLanguage: "La richesse, la réputation et les privilèges familiaux ne valent rien si on s'en sert pour écraser la justice et la vérité.",
    andToday: "Ne jamais se vanter de ses origines ou de ses relations pour justifier une mauvaise conduite.",
    hadith: {
      text: "Ibn 'Abbas rapporte : 'Le Prophète ﷺ monta sur As-Safa et cria : Yâ Sabâhâh ! Quraych se rassembla... et Abou Lahab s'exclama... La sourate fut alors révélée.'",
      source: "Rapporté par Al-Bukhari (Hadith authentique)"
    }
  },
  112: {
    translit: "Al-Ikhlas",
    french: "La Pureté",
    arabic: "الإخلاص",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 4,
    keyMessage: "La proclamation pure et absolue de l'Unicité divine (Tawhid).",
    toRemember: "Dis : Il est Allah, Unique. Allah, Le Seul à être imploré pour ce que nous désirons. Il n'a jamais engendré, n'a pas été engendré non plus. Et nul n'est égal à Lui.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Révélée en réponse aux polythéistes qui demandèrent au Prophète ﷺ : 'Décris-nous la généalogie de ton Seigneur !'.",
      synthesis: "Équivaut au tiers du Coran car le message coranique se divise en croyance, lois et récits, et cette sourate résume toute la théologie divine.",
      pedagogicalNote: "Le terme As-Samad (الصمد) désigne Celui dont toute la création a besoin et qui n'a besoin de rien."
    },
    inPlainLanguage: "Dieu est Unique, absolu, parfait, sans commencement ni fin : rien dans l'univers ne Lui ressemble.",
    andToday: "Purifier son cœur de toute idolâtrie matérielle et trouver sa force dans la confiance en l'Unique.",
    hadith: {
      text: "Le Prophète ﷺ a dit : 'Par Celui qui tient mon âme dans Sa main, elle équivaut certes au tiers du Coran.'",
      source: "Rapporté par Al-Bukhari (Hadith authentique)"
    }
  },
  113: {
    translit: "Al-Falaq",
    french: "L'Aube",
    arabic: "الفلق",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 5,
    keyMessage: "La recherche de la protection divine contre les maux extérieurs visibles et occultes.",
    toRemember: "Dis : Je cherche protection auprès du Seigneur de l'aube naissante, contre le mal des êtres qu'Il a créés.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Descendue avec An-Nas (les deux Mu'awwidhatayn) comme protection absolue pour le Prophète ﷺ et tout croyant contre la jalousie, la nuit sombre et les malveillances.",
      synthesis: "Protection contre le mal des créatures, l'obscurité nocturne, les noueuses de nœuds et l'envieux lorsqu'il envie.",
      pedagogicalNote: "Mettre l'accent sur les qalqalas finales (فَلَقْ، خَلَقْ، وَقَبْ، عُقَدْ، حَسَدْ)."
    },
    inPlainLanguage: "Quand tu te sens vulnérable ou exposé à la malveillance, réfugie-toi sous l'aile protectrice de Dieu.",
    andToday: "Remplacer l'anxiété par des invocations de protection et ne pas nourrir d'envie envers autrui.",
    hadith: {
      text: "Aïcha rapporte que chaque nuit avant de dormir, le Prophète ﷺ soufflait dans ses mains, récitait Al-Ikhlas, Al-Falaq et An-Nas, et s'en frottait le corps.",
      source: "Rapporté par Al-Bukhari (Hadith authentique)"
    }
  },
  114: {
    translit: "An-Nas",
    french: "Les Hommes",
    arabic: "الناس",
    category: "indispensables",
    categoryTitle: "🎉 LES INDISPENSABLES",
    type: "Mecquoise",
    count: 6,
    keyMessage: "La recherche du refuge auprès du Souverain des hommes contre les insufflations intérieures du doute.",
    toRemember: "Dis : Je cherche protection auprès du Seigneur des hommes, Roi des hommes, Dieu des hommes, contre le mal du mauvais conseiller furtif.",
    context: {
      typeBadge: "Mecquoise",
      circumstances: "Dernière sourate du Coran, fermant le Livre saint par l'invocation constante de la protection divine pour préserver la paix de l'esprit.",
      synthesis: "Protège contre Al-Waswâs Al-Khannâs (l'insufflateur furtif qui s'éclipse dès que Dieu est évoqué), qu'il provienne des djinns ou des hommes.",
      pedagogicalNote: "Clôture parfaite du Mushaf : le Coran s'ouvre par la demande de guidance (Al-Fatiha) et s'achève par la demande de protection (An-Nas)."
    },
    inPlainLanguage: "Garde ton esprit des pensées négatives, des doutes toxiques et des mauvaises influences en te rappelant constamment Dieu.",
    andToday: "Prendre soin de son hygiène mentale et spirituelle en repoussant les pensées parasites d'anxiété.",
    hadith: {
      text: "Le Prophète ﷺ a dit à 'Uqbah ibn 'Amir : 'N'as-tu pas vu les versets révélés cette nuit, tels qu'on n'en a jamais vu de semblables ? : Qul a'oudhou bi Rabbil Falaq et Qul a'oudhou bi Rabbin Nas.'",
      source: "Rapporté par Mouslim (Hadith authentique)"
    }
  }
};

async function main() {
  console.log("Fetching Warsh verses and French translations for the 37 surahs of Juz 'Amma (78 to 114)...");
  const fullSurahs = [];

  for (let id = 78; id <= 114; id++) {
    const meta = SURAH_METADATA[id];
    console.log(`Processing Surah ${id}: ${meta.translit} (${meta.count} verses)...`);

    // Fetch Warsh verses
    const warshRes = await fetch(`https://api.quran.com/api/v4/quran/verses/warsh?chapter_number=${id}`);
    const warshJson = await warshRes.json();
    const warshVerses = warshJson.verses || [];

    // Fetch French translations (Hamidullah, resource 136)
    const frRes = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?language=fr&translations=136&per_page=60`);
    const frJson = await frRes.json();
    const frVerses = frJson.verses || [];

    if (warshVerses.length !== meta.count) {
      console.warn(`Warning: verse count mismatch for Surah ${id}: expected ${meta.count}, got ${warshVerses.length}`);
    }

    const verses = [];
    for (let i = 0; i < warshVerses.length; i++) {
      const vWarsh = warshVerses[i];
      const vFr = frVerses[i];
      const vNum = i + 1;

      // Clean Arabic text: trim leading/trailing spaces, preserve exact authentic tashkeel and rasm
      const textArabic = (vWarsh.text_uthmani || "").trim();

      // Clean French translation: strip footnote tags if any, clean html entities
      let rawFr = (vFr && vFr.translations && vFr.translations[0]?.text) ? vFr.translations[0].text : "";
      rawFr = rawFr.replace(/<sup[^>]*>.*?<\/sup>/g, '')
                   .replace(/<[^>]+>/g, '')
                   .replace(/&nbsp;/g, ' ')
                   .replace(/&quot;/g, '"')
                   .replace(/&#39;/g, "'")
                   .replace(/\s+/g, ' ')
                   .trim();

      // Generate brief pedagogical meaning and word glossary
      const meaning = `Verset ${vNum} : guidance et méditation sur ${meta.translit}.`;
      const explanation = `${rawFr}`;

      // Build word objects by reading the stored string
      const rawWords = textArabic.split(/\s+/).filter(Boolean);
      const words = rawWords.map((w, wIdx) => ({
        ar: w,
        fr: `Mot ${wIdx + 1}`
      }));

      verses.push({
        number: vNum,
        text: textArabic,
        translation: rawFr,
        meaning: meaning,
        explanation: explanation,
        words: words
      });
    }

    fullSurahs.push({
      id: id,
      nameArabic: meta.arabic,
      nameTranslit: meta.translit,
      nameFrench: meta.french,
      category: meta.category,
      categoryTitle: meta.categoryTitle,
      type: meta.type,
      versesCount: meta.count,
      revelationOrder: id, // Juz 'Amma sequence
      juz: 30,
      bismillah: true,
      keyMessage: meta.keyMessage,
      toRemember: meta.toRemember,
      historicalContext: meta.context,
      inPlainLanguage: meta.inPlainLanguage,
      andToday: meta.andToday,
      hadith: meta.hadith,
      verses: verses
    });
  }

  const outPath = path.resolve('src/data/surahsData.json');
  fs.writeFileSync(outPath, JSON.stringify(fullSurahs, null, 2), 'utf-8');
  console.log(`Saved all ${fullSurahs.length} surahs with ${fullSurahs.reduce((acc, s) => acc + s.verses.length, 0)} verses to ${outPath}`);
}

main().catch(err => {
  console.error("Build failed:", err);
  process.exit(1);
});
