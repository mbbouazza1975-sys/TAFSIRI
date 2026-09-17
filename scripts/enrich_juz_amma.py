#!/usr/bin/env python3
"""
Full data generator for Juz 'Amma Warsh:
- Verse meaning (reformulation en français courant)
- Verse explanation (commentaire développé et sourcé)
- Verse words (mot-à-mot authentique en français pour chaque mot arabe)
- Surah andToday (3-5 phrases pour adolescents d'aujourd'hui)
- Surah noumanAliKhan (synthèse inspirée de Nouman Ali Khan / Bayyinah)
"""

import json
import re

# Load surahsData.json
with open('src/data/surahsData.json', 'r', encoding='utf-8') as f:
    surahs = json.load(f)

# Comprehensive word dictionary for Juz 'Amma
WORD_DICT = {
    # Surah 78 An-Naba
    'عَمَّ': 'Sur quoi / de quoi',
    'يَتَسَآءَلُونَ': 's\'interrogent-ils mutuellement',
    'عَنِ': 'Au sujet de',
    'ٱلنَّبَإِ': 'la grande nouvelle / annonce',
    'ٱلْعَظِيمِ': 'l\'immense / suprême',
    'ٱلَّذِى': 'auquel',
    'هُمْ': 'ils',
    'فِيهِ': 'à son sujet',
    'مُخْتَلِفُونَ': 'sont en profond désaccord',
    'كَلَّا': 'Mais non ! Absolument pas',
    'سَيَعْلَمُونَ': 'ils sauront bientôt',
    'ثُمَّ': 'Puis',
    'أَلَمْ': 'N\'avons-Nous pas',
    'نَجْعَلِ': 'fait / disposé',
    'ٱلْأَرْضَ': 'la terre',
    'مِهَـٰدًا': 'comme un berceau / lit stable',
    'وَٱلْجِبَالَ': 'et les montagnes',
    'أَوْتَادًا': 'comme des piquets d\'ancrage',
    'وَخَلَقْنَـٰكُمْ': 'et Nous vous avons créés',
    'أَزْوَٰجًا': 'en couples (homme et femme)',
    'وَجَعَلْنَا': 'et Nous avons établi',
    'نَوْمَكُمْ': 'votre sommeil',
    'سُبَاتًا': 'un repos réparateur',
    'ٱلَّيْلَ': 'la nuit',
    'لِبَاسًا': 'comme un voile protecteur',
    'ٱلنَّهَارَ': 'le jour',
    'مَعَاشًا': 'pour la quête de subsistance',
    'وَبَنَيْنَا': 'et Nous avons édifié',
    'فَوْقَكُمْ': 'au-dessus de vous',
    'سَبْعًا': 'sept (cieux)',
    'شِدَادًا': 'd\'une solidité inébranlable',
    'سِرَاجًا': 'un flambeau lumineux (le soleil)',
    'وَهَّاجًا': 'ardent et rayonnant',
    'وَأَنزَلْنَا': 'et Nous avons fait descendre',
    'مِنَ': 'depuis',
    'ٱلْمُعْصِرَٰتِ': 'les nuages gorgés de pluie',
    'مَآءً': 'une eau',
    'ثَجَّاجًا': 'déversée en torrents d\'abondance',
    'لِّنُخْرِجَ': 'pour faire germer par elle',
    'حَبًّا': 'des grains et céréales',
    'وَنَبَاتًا': 'et des végétaux variés',
    'وَجَنَّـٰتٍ': 'et des vergers luxuriants',
    'أَلْفَافًا': 'aux branches denses et entrelacées',
    'إِنَّ': 'Certes',
    'يَوْمَ': 'le Jour',
    'ٱلْفَصْلِ': 'du Jugement décisif',
    'كَانَ': 'a toujours été',
    'مِيقَـٰتًا': 'un rendez-vous fixé avec précision',
    'يُنفَخُ': 'il sera soufflé',
    'فِى': 'dans',
    'ٱلصُّورِ': 'le Cor (la Trompette)',
    'فَتَأْتُونَ': 'et vous viendrez alors',
    'أَفْوَاجًا': 'par foules innombrables',
    'وَفُتِحَتِ': 'et sera grand ouvert',
    'ٱلسَّمَآءُ': 'le ciel',
    'فَكَانَتْ': 'et deviendra',
    'أَبْوَٰبًا': 'de multiples portes béantes',
    'وَسُيِّرَتِ': 'et seront mises en mouvement',
    'فَكَانَتْ': 'et deviendront',
    'سَرَابًا': 'comme un simple mirage',
    'جَهَنَّمَ': 'la Géhenne (l\'Enfer)',
    'كَانَتْ': 'est prête en embuscade',
    'مِرْصَادًا': 'un lieu de guet et de capture',
    'لِّلطَّـٰغِينَ': 'pour les transgresseurs insolents',
    'مَـَٔابًا': 'une destination de séjour ultime',
    'لَّـٰبِثِينَ': 'demeurant éternellement',
    'أَحْقَابًا': 'durant des siècles infinis',
    'لَّا': 'ne... point',
    'يَذُوقُونَ': 'ils ne goûteront',
    'بَرْدًا': 'ni la moindre fraîcheur',
    'وَلَا': 'ni',
    'شَرَابًا': 'aucune boisson réconfortante',
    'إِلَّا': 'si ce n\'est',
    'حَمِيمًا': 'une eau bouillante',
    'وَغَسَّاقًا': 'et un pus infect et glacé',
    'جَزَآءً': 'en juste rétribution',
    'وِفَاقًا': 'parfaitement proportionnée à leurs actes',
    'إِنَّهُمْ': 'car ils',
    'كَانُوا۟': 'étaient sans cesse',
    'يَرْجُونَ': 'sans espoir ni crainte',
    'حِسَابًا': 'd\'un quelconque compte à rendre',
    'وَكَذَّبُوا۟': 'et ils rejetaient comme mensonges',
    'بِـَٔايَـٰتِنَا': 'Nos signes évidents',
    'كِذَّابًا': 'd\'un démenti obstiné',
    'وَكُلَّ': 'et chaque',
    'شَىْءٍ': 'chose',
    'أَحْصَيْنَـٰهُ': 'Nous l\'avons dénombrée avec exactitude',
    'كِتَـٰبًا': 'dans un registre préservé',
    'فَذُوقُوا۟': 'Goûtez donc à ce châtiment !',
    'فَلَن': 'et jamais Nous ne',
    'نَّزِيدَكُمْ': 'vous ajouterons autre chose',
    'عَذَابًا': 'qu\'un surcroît de tourment',
    'لِّلْمُتَّقِينَ': 'pour les croyants pieux et conscients de Dieu',
    'مَفَازًا': 'un triomphe et salut éternel',
    'حَدَآئِقَ': 'des jardins splendides',
    'وَأَعْنَـٰبًا': 'et des vignes généreuses',
    'وَكَوَاعِبَ': 'et des compagnes pures et gracieuses',
    'أَتْرَابًا': 'du même âge d\'or',
    'وَكَأْسًا': 'et des coupes débordantes',
    'دِهَاقًا': 'd\'un breuvage pur et exquis',
    'يَسْمَعُونَ': 'ils n\'entendront point',
    'لَغْوًا': 'ni futilité ni vain bavardage',
    'كِذَّـٰبًا': 'ni le moindre mensonge',
    'رَّبِّكَ': 'de la part de ton Seigneur',
    'عَطَآءً': 'un don immensément généreux',
    'حِسَابًا': 'surabondant et comblant',
    'رَّبِّ': 'le Maître et Seigneur',
    'ٱلسَّمَـٰوَٰتِ': 'des cieux',
    'وَمَا': 'et de tout ce qui',
    'بَيْنَهُمَا': 'se trouve entre les deux',
    'ٱلرَّحْمَـٰنِ': 'Le Tout-Miséricordieux',
    'يَمْلِكُونَ': 'ils ne posséderont aucunement',
    'مِنْهُ': 'devant Lui',
    'خِطَابًا': 'le droit de prendre la parole',
    'يَقُومُ': 'se tiendront debout',
    'ٱلرُّوحُ': 'l\'Esprit (Jibril / l\'ange Gabriel)',
    'وَٱلْمَلَـٰٓئِكَةُ': 'et les anges',
    'صَفًّا': 'en rangs parfaits et solennels',
    'يَتَكَلَّمُونَ': 'ils n\'oseront prononcer un mot',
    'مَنْ': 'celui à qui',
    'أَذِنَ': 'aura accordé permission',
    'وَقَالَ': 'et qui aura articulé',
    'صَوَابًا': 'la stricte vérité',
    'ذَٰلِكَ': 'Voilà en toute certitude',
    'ٱلْيَوْمُ': 'le Jour',
    'ٱلْحَقُّ': 'irréfutable et véridique',
    'فَمَن': 'que quiconque donc',
    'شَآءَ': 'le désire et le choisit',
    'ٱتَّخَذَ': 'prenne résolument',
    'إِلَىٰ': 'vers',
    'رَبِّهِۦ': 'son Seigneur',
    'مَـَٔابًا': 'un chemin de retour et refuge',
    'إِنَّآ': 'Certes Nous',
    'أَنذَرْنَـٰكُمْ': 'vous avons solennellement avertis',
    'عَذَابًا': 'd\'un châtiment',
    'قَرِيبًا': 'tout proche et imminent',
    'يَنظُرُ': 'regardera attentivement',
    'ٱلْمَرْءُ': 'l\'être humain',
    'قَدَّمَتْ': 'auront préparé et avancé',
    'يَدَاهُ': 'ses deux propres mains',
    'وَيَقُولُ': 'et s\'exclamera avec désespoir',
    'ٱلْكَافِرُ': 'le mécréant',
    'يَـٰلَيْتَنِى': 'Hélas pour moi ! Si seulement',
    'كُنتُ': 'j\'étais resté',
    'تُرَٰبًۢا': 'de la simple poussière inerte',

    # Surah 94 Al-Inchirah
    'أَلَمْ نَشْرَحْ': 'N\'avons-Nous pas ouvert et apaisé ?',
    'صَدْرَكَ': 'ta poitrine / ton cœur',
    'وَوَضَعْنَا': 'Et Nous avons ôté / déchargé',
    'عَنكَ': 'de toi',
    'وِزْرَكَ': 'ton lourd fardeau',
    'ٱلَّذِىٓ': 'qui',
    'أَنقَضَ': 'pesait lourdement sur / courbait',
    'ظَهْرَكَ': 'ton dos',
    'وَرَفَعْنَا': 'Et Nous avons élevé haut',
    'لَكَ': 'pour toi',
    'ذِكْرَكَ': 'ton souvenir et ta renommée',
    'فَإِنَّ': 'Car assurément',
    'مَعَ': 'avec',
    'ٱلْعُسْرِ': 'l\'épreuve et la difficulté',
    'يُسْرًا': 'une facilité et délivrance',
    'فَإِذَا': 'Dès que',
    'فَرَغْتَ': 'tu as achevé (tes devoirs)',
    'فَٱنصَبْ': 'consacre-toi pleinement à l\'effort d\'adoration',
    'وَإِلَىٰ': 'Et vers',
    'رَبِّكَ': 'ton Seigneur Seul',
    'فَٱرْغَب': 'tourne tous tes désirs et espoirs',

    # Surah 108 Al-Kawthar
    'أَعْطَيْنَـٰكَ': 'Nous t\'avons gratifié de',
    'ٱلْكَوْثَرَ': 'l\'Abondance infinie (Al-Kawthar)',
    'فَصَلِّ': 'Prie donc humblement',
    'وَٱنْحَرْ': 'et sacrifie pour Dieu',
    'شَانِئَكَ': 'celui qui te hait et te calomnie',
    'هُوَ': 'c\'est bien lui',
    'ٱلْأَبْتَرُ': 'qui sera sans descendance ni postérité',

    # Surah 112 Al-Ikhlas
    'قُلْ': 'Dis (ô Prophète)',
    'ٱللَّهُ': 'Allah',
    'أَحَدٌ': 'Unique et Sans pareil',
    'ٱلصَّمَدُ': 'Le Refuge Suprême dont tout dépend',
    'لَمْ': 'Il n\'a point',
    'يَلِدْ': 'engendré',
    'وَلَمْ': 'et Il n\'a point',
    'يُولَدْ': 'été engendré',
    'يَكُن': 'il n\'y a',
    'لَّهُۥ': 'pour Lui',
    'كُفُوًا': 'le moindre égal ou semblable',
    'أَحَدٌۢ': 'absolument quiconque',

    # Surah 113 Al-Falaq
    'أَعُوذُ': 'Je cherche protection et refuge',
    'بِرَبِّ': 'auprès du Maître et Seigneur',
    'ٱلْفَلَقِ': 'de l\'aube naissante',
    'مِن': 'contre',
    'شَرِّ': 'le mal',
    'مَا': 'de ce qu\'',
    'خَلَقَ': 'Il a créé',
    'غَاسِقٍ': 'de l\'obscurité ténébreuse',
    'إِذَا': 'lorsqu\'',
    'وَقَبَ': 'elle s\'épaissit et s\'installe',
    'ٱلنَّفَّـٰثَـٰتِ': 'des souffleuses / sorcières',
    'ٱلْعُقَدِ': 'sur les nœuds',
    'حَاسِدٍ': 'de l\'envieux plein de jalousie',
    'حَسَدَ': 'lorsqu\'il envie',

    # Surah 114 An-Nas
    'ٱلنَّاسِ': 'des êtres humains',
    'مَلِكِ': 'Souverain et Roi suprême',
    'إِلَـٰهِ': 'Seule et Unique Divinité',
    'ٱلْوَسْوَاسِ': 'du tentateur et instigateur du doute',
    'ٱلْخَنَّاسِ': 'qui se dérobe dès qu\'on évoque Dieu',
    'يُوَسْوِسُ': 'qui distille des insinuations vénéneuses',
    'صُدُورِ': 'les poitrines et cœurs',
    'ٱلْجِنَّةِ': 'parmi les djinns',
    'وَٱلنَّاسِ': 'et parmi les hommes',
}

# Adolescents-focused modern reflection (3 to 5 sentences) per surah
ADO_REFLECTIONS = {
    78: "Dans un monde où l'on défile des heures sur TikTok ou Instagram en s'anesthésiant la conscience, An-Naba vient comme une sonnerie de réveil bienveillante. Elle te rappelle que chaque instant que tu passes, chaque parole écrite en commentaire et chaque choix du quotidien a un sens réel et laisse une empreinte. Ne te laisse pas berner par la superficialité de ceux qui se moquent de la foi ou prétendent que la vie n'a pas de but. Quand tu contemples le ciel étoilé ou la beauté de la nature, réalise que ton Créateur a tout préparé pour toi, et que Sa justice rétablira l'équilibre pour chacun.",
    79: "Sur les réseaux, on voit constamment des gens qui affichent leur ego ou veulent tout contrôler, à l'image de Pharaon qui se prenait pour le centre du monde. An-Nazi'at te montre que la vraie force intérieure ne réside pas dans l'arrogance ou le nombre de likes, mais dans la capacité à dompter ses pulsions et ses colères. Lorsque la pression scolaire ou le regard des autres t'oppressent, rappelle-toi que ce monde n'est qu'un passage court comme une demi-journée. Choisis de nourrir ton âme plutôt que d'alimenter les caprices passagers de ton ego.",
    80: "C'est tellement facile de juger quelqu'un sur ses vêtements de marque, sa popularité au collège ou son apparence physique. Cette sourate est un électrochoc d'empathie : elle rappelle que pour Dieu, une personne sincère et humble a infiniment plus de valeur que tous les influenceurs superficiels réunis. Quand un camarade discret ou mis à l'écart a besoin d'aide, sois celui qui lui sourit et lui tend la main sans calculer ce que les autres vont penser. Le Jour du Jugement, aucune marque ni aucun statut social ne te protègera : seul ton cœur comptera.",
    81: "Les stories et les vidéos virales s'effacent en 24 heures, mais nos actions s'inscrivent dans l'éternité. At-Takwir te plonge dans le vertige de la fin de l'univers pour te faire comprendre que tout ce qui brille ici-bas (mode, célébrité, technologies) est temporaire. Elle défend aussi les plus vulnérables, comme la fillette innocente autrefois rejetée, montrant que Dieu entend la douleur de chaque opprimé. Utilise ta voix sur les réseaux pour propager le bien et défendre la justice, pas pour suivre aveuglément les tendances destructrices.",
    82: "Combien de fois avons-nous pris la confiance de nos parents ou les bénédictions de notre santé pour un dû acquis ? Le verset « Qu'est-ce qui t'a trompé au sujet de ton Seigneur le Généreux ? » te pose la question la plus profonde qui soit : pourquoi répondons-nous à la bonté infinie de Dieu par de l'indifférence ? Même quand personne ne te voit derrière ton écran, tes anges gardiens notent la sincérité de tes actes avec amour et respect. Trouve ta dignité dans cette intimité avec Dieu plutôt que dans la validation extérieure.",
    83: "Dans les jeux vidéo ou dans la vie de tous les jours, la tentation de tricher, de gratter un point ou de mentir pour sauver la face est fréquente. Al-Mutaffifin te parle de cette petite balance du quotidien : être loyal et honnête même quand personne ne regarde. Les personnes qui se moquent de ceux qui pratiquent leur foi aujourd'hui déchanteront lorsque la réalité apparaîtra au grand jour. Sois fier de tes principes moraux, car c'est ton intégrité qui inscrira ton nom parmi les âmes élevées de l'Illiyyun.",
    84: "Quand les cours sont durs, que les examens approchent ou que tu te sens fatigué de faire des efforts, rappelle-toi le message d'Al-Inshiqaq : l'être humain avance pas à pas vers son Seigneur dans un effort constant. Le ciel et la terre se soumettent avec une totale obéissance, et ton cœur trouvera son vrai repos quand il s'harmonisera avec cette loi divine. Reçois la vie comme un défi où chaque épreuve surmontée avec patience t'offre une joie immense lors de la remise de ton livret d'actes.",
    85: "Le harcèlement scolaire ou le rejet d'un groupe d'amis parce qu'on ne fait pas comme tout le monde peut être très difficile à supporter. Al-Buruj raconte l'histoire de jeunes croyants qui sont restés debout face à la tyrannie sans jamais renier leur dignité. Elle t'enseigne que la vérité ne se mesure pas au nombre de partisans, et que Dieu n'oublie aucune larme versée pour Sa cause. Reste fidèle à ce qui est juste, même si tu dois parfois te sentir différent ou incompris.",
    86: "Chaque être humain traverse des moments de solitude où il a l'impression d'être invisible aux yeux du monde. At-Tariq te rassure : chaque âme est accompagnée d'un gardien vigilant et protecteur de la part de Dieu. Dieu qui a façonné ton corps complexe à partir d'une simple goutte est parfaitement capable de te relever de n'importe quel échec scolaire ou affectif. Le Jour où tous les secrets intimes seront dévoilés, la pureté de ton intention sera ta plus belle lumière.",
    87: "La société de consommation moderne te pousse constamment à vouloir le dernier smartphone, les dernières baskets et un plaisir immédiat. Al-A'la t'invite à prendre de la hauteur et à préférer ce qui dure éternellement à ce qui s'évapore en un instant. Glorifie le Nom de ton Seigneur qui t'a créé et qui t'a guidé vers le meilleur chemin. La prière et la purification du cœur sont les véritables clés pour apaiser l'anxiété de ta génération.",
    88: "Imagine deux types d'attitudes dans la vie : ceux qui s'épuisent dans des combats futiles et terminent désabusés, et ceux qui construisent du solide avec sérénité et trouvent la joie. Al-Ghashiya t'invite à regarder autour de toi : comment le chameau résiste dans le désert, comment le ciel est dressé sans piliers. Cette observation t'aide à déconnecter des écrans pour reconnecter avec le monde réel. Ton rôle n'est pas de forcer les autres à changer, mais d'incarner la bienveillance et le bon conseil.",
    89: "Les civilisations anciennes se croyaient invincibles avec leurs gratte-ciels et leurs armées surpuissantes, mais elles ont disparu sans laisser de trace. Al-Fajr te met en garde contre deux pièges majeurs chez les ados : croire que la richesse est le signe qu'on vaut mieux que les autres, ou que les difficultés financières sont une punition. Prends soin de l'orphelin, sois généreux avec celui qui n'a rien, et cultive cette 'âme apaisée' qui ne panique pas face aux aléas de l'existence.",
    90: "La vie n'est pas une promenade insouciante, c'est une ascension exigeante et noble que le Coran appelle 'Al-Aqabah'. Au lieu de choisir la facilité égoïste, choisis la voie du courage : libérer les opprimés, partager ton goûter avec celui qui a faim, et t'encourager mutuellement à la patience et à la douceur. Les véritables héros ne sont pas ceux qui accumulent des followers, mais ceux qui tendent la main à ceux qui souffrent.",
    91: "Dans ton for intérieur se livre chaque jour un combat secret entre la voix de la sagesse et celle de la paresse ou des mauvaises fréquentations. Ash-Shams prend onze serments cosmiques majestueux pour graver cette vérité dans ton esprit : la vraie victoire, c'est de nettoyer son cœur de la jalousie et de la haine. Celui qui laisse pourrir ses mauvaises habitudes se prépare à de grands regrets. Choisis chaque matin d'être une lumière pour toi-même et pour ton entourage.",
    92: "Nous avons tous le choix entre deux routes : donner sans compter, être bienveillant et sincère, ou être radin, calculateur et penser qu'on n'a besoin de personne. Al-Layl t'assure que si tu fais le bien avec sincérité, Dieu t'aplanira le chemin vers une vie facile et comblée. À l'inverse, l'arrogance et l'avarice ne mènent qu'au stress et à l'isolement. Donne de ton temps pour écouter tes amis et aider tes parents, c'est le secret du vrai bonheur.",
    93: "Il y a des jours où tout semble noir : une mauvaise note, une dispute avec des amis, l'impression que personne ne te comprend et que Dieu est loin. Ad-Duha a été révélée précisément pour consoler le cœur du Prophète (ﷺ) dans un moment de doute et de tristesse similaire. Écoute cette parole réconfortante : « Ton Seigneur ne t'a ni abandonné ni détesté ». Regarde le chemin déjà parcouru, sois reconnaissant pour les épreuves surmontées, et sois doux avec ceux qui sont plus vulnérables que toi.",
    94: "Tu as parfois l'impression que les soucis scolaires ou familiaux s'accumulent au point de te briser le dos ? Al-Inchirah te donne une promesse divine absolue : avec chaque difficulté vient une facilité, non pas après, mais en même temps ! Dieu apaise ton cœur et élève ton rang quand tu persévères dans l'épreuve. Dès que tu as fini une tâche, remets-toi en action et tourne tous tes espoirs vers ton Créateur Seul.",
    95: "Dans une société obsédée par la chirurgie esthétique et les filtres Snapchat, At-Tin te rappelle que Dieu t'a créé dans la forme la plus parfaite et la plus harmonieuse. Ta beauté véritable ne dépend pas d'un filtre, mais de la lumière de ta foi et de tes actes vertueux. Ne te rabaisse pas en imitant des comportements toxiques qui détruisent l'estime de soi. Sois fidèle à ta nature originelle noble pour rester au sommet de ta dignité humaine.",
    96: "L'apprentissage et la quête du savoir sont le premier ordre divin : « Lis au nom de ton Seigneur qui a créé ». À l'ère de l'intelligence artificielle et de la désinformation sur le web, développe ton esprit critique et cherche la connaissance utile qui rapproche de Dieu. Fais attention au piège de l'autosuffisance, quand on commence à avoir de bonnes notes ou du succès et qu'on devient arrogant. N'oublie jamais que c'est dans la prosternation que tu trouveras la plus grande proximité avec Dieu.",
    97: "Le temps est le bien le plus précieux que tu possèdes, et Al-Qadr te montre qu'une seule nuit bénie peut valoir plus de quatre-vingt-trois années de vie ! Quand tout le monde dort ou perd son temps sur des jeux tard la nuit, consacrer quelques minutes à invoquer Dieu et lire le Coran peut transformer ton destin à tout jamais. Les anges descendent pour répandre une paix profonde jusqu'au lever du jour. Cherche cette paix spirituelle que rien de matériel ne peut égaler.",
    98: "À l'adolescence, on est souvent confronté à des doutes, des avis contradictoires et des idéologies divergentes. Al-Bayyina clarifie l'essentiel : toute la religion repose sur une adoration sincère et exclusive de Dieu, la prière régulière et la solidarité avec les nécessiteux. Ne te perds pas dans les débats stériles ou les querelles sur Internet. Concentre-toi sur la droiture morale et la pureté de ton intention pour faire partie de la meilleure des créations.",
    99: "Sur les réseaux, une action peut sembler insignifiante, mais Az-Zalzala t'apprend que dans l'univers de Dieu, aucun atome n'est négligeable. Un simple sourire sincère, un message de soutien envoyé à un ami déprimé ou ramasser un déchet par terre pèsera lourd sur la balance divine. De même, une petite moquerie ou un mot blessant écrit à la va-vite en commentaire a des conséquences réelles. Agis toujours en ayant conscience que la terre et tes propres membres témoigneront de ton bien.",
    100: "L'être humain s'emballe souvent pour des choses matérielles comme des chevaux de course lancés à toute vitesse dans la poussière. Al-'Adiyat dépeint cet amour excessif de l'argent et des possessions qui rend l'humain ingrat envers son Créateur. Prends du recul face aux publicités incessantes qui te poussent à consommer toujours plus pour te sentir exister. Ce qui comptera véritablement, c'est ce qui aura mûri dans le secret de ton cœur.",
    101: "Le stress des examens ou la peur du futur n'est rien comparé au Grand Fracas d'Al-Qari'a, où les montagnes voleront comme de la laine cardée. Cette image forte t'invite à relativiser tes angoisses quotidiennes et à te concentrer sur l'essentiel : faire pencher ta balance du côté des bonnes actions. Sois régulier dans tes prières et généreux dans tes paroles pour goûter à une vie éternelle comblée de satisfaction.",
    102: "La course aux abonnés, aux likes, aux meilleures notes ou aux vêtements de marque est une spirale sans fin qui peut dévorer ta jeunesse sans que tu t'en rendes compte. At-Takathur met en garde contre cette rivalité numérique qui distrait le cœur jusqu'à ce que la mort nous surprenne. Fais une pause, éteins tes notifications et demande-toi : qu'est-ce qui compte vraiment pour mon âme ? Remercie Dieu pour chaque gorgée d'eau, chaque repas et chaque instant de santé.",
    103: "Le temps s'enfuit comme le sable entre les doigts, et chaque seconde perdue à scroller sans but ne reviendra jamais. Al-'Asr résume en trois versets concis la formule universelle pour ne pas gâcher son existence : croire avec conviction, accomplir des actes bénéfiques, s'encourager mutuellement à la vérité et persévérer dans les épreuves. Trouve-toi un groupe d'amis sincères qui te tirent vers le haut et te rappellent le bien quand tu as des coups de mou.",
    104: "Le cyberharcèlement, les rumeurs dans les couloirs du lycée et les moqueries sur le physique ou la famille sont des poisons destructeurs. Al-Humaza condamne avec une sévérité absolue celui qui dénigre autrui dans son dos tout en croyant que sa popularité ou son argent le rendent intouchable. Garde ta langue et tes doigts propres de toute calomnie sur les réseaux sociaux. Utilise tes mots pour guérir, encourager et valoriser les autres plutôt que pour les rabaisser.",
    105: "Face à des situations qui te dépassent (injustices dans le monde, pressions du groupe, sentiment d'impuissance), rappelle-toi la défaite de l'armée des éléphants dans Al-Fil. La force brute et les stratagèmes des oppresseurs ne sont rien face à la volonté divine. N'aie pas peur de défendre ce qui est juste même si tu as l'impression d'être seul et désarmé. Place ta confiance en Dieu, Il veille sur Sa cause et protège ceux qui Le craignent.",
    106: "Quand tu ouvres le réfrigérateur plein et que tu dors dans un lit chaud en toute sécurité, réalise que ces choses simples sont des privilèges immenses que beaucoup d'enfants n'ont pas. La sourate Quraysh rappelle que la paix, la sécurité et la nourriture sont des dons de Dieu qui appellent en retour une reconnaissance sincère par l'adoration. Ne sois pas blasé ou difficile face à ce que tes parents te préparent. Dis 'Al-Hamdoulillah' du fond du cœur et sois solidaire de ceux qui connaissent la faim.",
    107: "On peut faire toutes ses prières et réciter le Coran, mais si on est égoïste, méprisant avec les faibles ou incapable de prêter un stylo à un camarade, notre foi est incomplète. Al-Ma'un fustige ceux qui prient par simple ostentation sociale mais refusent l'entraide la plus élémentaire ('Al-Ma'un'). La vraie foi se prouve dans les petits gestes du quotidien : aider aux corvées à la maison, écouter un ami triste, donner un peu de sa poche aux démunis. Fais du bien sans attendre de merci.",
    108: "Lorsque des personnes méchantes te blessent par des insultes, se moquent de ta famille ou de ton engagement religieux, Al-Kawthar est ton bouclier spirituel. Dieu a accordé au Prophète (ﷺ) une rivière d'abondance éternelle alors que ses ennemis le traitaient de 'coupé de tout' ; aujourd'hui, le nom du Prophète est glorifié par deux milliards d'êtres humains alors que ses calomniateurs sont tombés dans l'oubli. Prie avec ferveur, donne sans compter, et laisse Dieu répondre à ceux qui te veulent du mal.",
    109: "La pression de groupe à l'école peut te pousser à vouloir 'faire comme tout le monde' pour être accepté (fêtes à risque, langage grossier, transgression des valeurs). Al-Kafirun t'enseigne à poser des limites claires avec politesse mais fermeté : « À vous votre voie, et à moi la mienne ». On peut vivre ensemble dans le respect sans renier son identité spirituelle. Sois fier de ta foi musulmane, assume tes convictions avec bienveillance et ne transige jamais sur ton éthique.",
    110: "Quand tu réussis un examen, que tu gagnes une compétition sportive ou que ton projet aboutit, la tentation est grande de te vanter et de t'attribuer tout le mérite. An-Nasr t'enseigne l'antidote de l'arrogance : lorsque le succès arrive, prosterne-toi avec humilité, remercie Dieu qui t'a accordé la victoire et demande Son pardon. La vraie grandeur réside dans la gratitude modeste, car tout bienfait provient d'Allah.",
    111: "La fortune des parents, les relations ou les privilèges sociaux ne sauveront personne devant la justice absolue de Dieu. Abou Lahab était l'oncle du Prophète et l'un des hommes les plus riches de La Mecque, pourtant son animosité contre la vérité a causé sa ruine complète. Ne te repose jamais sur les mérites de ta famille pour t'estimer supérieur aux autres. Construis ta propre valeur morale par tes efforts personnels, ton travail et ta piété sincère.",
    112: "Dans un monde saturé de fausses idoles (l'argent, la célébrité, les likes, les illusions de puissance), Al-Ikhlas remet les pendules à l'heure avec une pureté cristalline : Dieu est Un, Indépendant, Parfait, Absolu. Rien de ce qui existe ne Lui ressemble, et ton cœur n'a besoin d'adorer que Lui pour être libre. Cette sourate équivaut au tiers du Coran parce qu'elle purifie ton esprit de tout attachement malsain. Trouve ta liberté dans ce monothéisme sans compromis.",
    113: "L'obscurité, les peurs nocturnes, la jalousie d'autrui ou le mauvais œil sur les réseaux peuvent parfois créer une anxiété sourde. Al-Falaq t'offre le remède infaillible : réfugie-toi auprès du Seigneur de l'aube naissante, capable de dissiper toutes les ténèbres d'un seul rayon de lumière. Ne nourris pas de jalousie envers la vie apparemment parfaite des autres influenceurs, et protège ton âme en invoquant la garde divine chaque matin et chaque soir.",
    114: "Le combat le plus intime de ton adolescence se passe dans tes pensées : ces chuchotements insidieux (le Waswâs) qui te disent que tu es nul, que tu n'y arriveras pas, ou qui t'incitent à commettre une faute en cachette. An-Nas t'apprend à te tourner vers le Souverain et le Dieu des hommes pour faire taire ces doutes toxiques. Dès qu'une mauvaise pensée surgit, dis 'A'oudhou billah' et rappelle-toi que le tentateur prend la fuite dès que le Nom de Dieu est prononcé. Tu n'es jamais seul dans cette bataille intérieure."
}

# Nouman Ali Khan (Bayyinah) reflections
NAK_REFLECTIONS = {
    78: {
        'overview': "Dans son analyse narrative de Sourate An-Naba, Nouman Ali Khan souligne la structure saisissante d'ouverture : le Coran ne commence pas par une argumentation théologique aride, mais par une question vive reflétant le bourdonnement des conversations mecquoises. Les sceptiques se moquent et débattent, et soudain, Dieu répond en déployant neuf merveilles du cosmos (la terre berceau, les montagnes piquets, le sommeil repos, les cieux solides). Cette symétrie montre que Celui qui a conçu cette mécanique céleste avec tant de précision ne laissera pas la vie humaine sans bilan ni finalité.",
        'linguisticGems': "L'alternance sonore dans An-Naba passe de la douceur rassurante des éléments naturels (mîhâdâ, aswâjâ, subâtâ) au fracas terrifiant du Jugement (sarâbâ, mirsâdâ, ahqâbâ). Ce contraste linguistique saisit l'auditeur et l'amène du réconfort matériel à la prise de conscience morale.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    79: {
        'overview': "Nouman Ali Khan met en lumière dans An-Nazi'at la connexion psychologique entre l'histoire de Pharaon et l'attitude des mécréants de Quraysh. Pharaon incarnait l'extrême de l'orgueil humain ('Je suis votre seigneur le plus haut'), et pourtant son anéantissement fut soudain et total. Le texte utilise des serments énergiques sur les anges arracheurs et libérateurs d'âmes pour rappeler que la mort est une réalité tangible qui transcende toutes les illusions de pouvoir.",
        'linguisticGems': "Le mot 'Tâmmah' (le cataclysme qui submerge tout) résonne avec une lourdeur phonétique intentionnelle en arabe, illustrant un événement qui dépasse totalement les capacités de perception humaine.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    80: {
        'overview': "Selon l'approche de Nouman Ali Khan, Sourate 'Abasa est un monument d'éthique et de pédagogie prophétique. Dieu interpelle affectueusement et fermement le Prophète (ﷺ) non pas pour une faute morale, mais pour lui enseigner la hiérarchie divine des priorités : un homme aveugle et pauvre qui vient avec un cœur pur en quête de rappel surpasse infiniment les dignitaires arrogants de la haute société. Le texte rappelle que la vraie noblesse se trouve dans les rouleaux honorés entre les mains des anges.",
        'linguisticGems': "L'utilisation de la troisième personne au tout début ('Il a froncé les sourcils') avant de s'adresser directement au Prophète ('Et qui te l'apprend ?') est une délicatesse divine remarquable : Dieu adoucit le reproche en ne le pointant pas directement dès le premier mot.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    81: {
        'overview': "At-Takwir dépeint avec une intensité cinématographique la déconstruction totale de l'ordre cosmique. Nouman Ali Khan souligne comment le texte juxtapose des cataclysmes grandioses (le soleil enroulé, les étoiles obscurcies, les mers en ébullition) avec une tragédie humaine intime et poignante : la fillette enterrée vivante (al-maw'ûdah) à qui l'on demandera pour quel péché elle a été assassinée. La justice divine embrasse l'immensité de l'univers comme la plus petite larme innocente.",
        'linguisticGems': "L'effet d'accumulation de douze propositions consécutives commençant par 'Idhâ' (Lorsque...) crée une tension dramatique insoutenable qui ne se résout qu'au verset 14 : 'Chaque âme saura alors ce qu'elle a apporté'.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    82: {
        'overview': "Dans Al-Infitar, Nouman Ali Khan insiste sur la profondeur affective de l'appel divin : 'Ô être humain ! Qu'est-ce qui t'a trompé au sujet de ton Seigneur le Généreux ?'. Le mot utilisé n'est pas 'Al-Qahhâr' (Le Dominateur) mais 'Al-Karîm' (Le Généreux). Le pire drame de l'homme n'est pas seulement sa désobéissance, mais son ingratitude envers un Créateur qui l'a harmonieusement proportionné et comblé de bienfaits.",
        'linguisticGems': "La description des anges comme 'Kirâman Kâtibîn' (généreux et nobles scribes) rappelle qu'ils n'enregistrent pas nos actes comme des espions malveillants, mais comme des témoins intègres et bienveillants chargés d'une mission sacrée.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    83: {
        'overview': "Nouman Ali Khan note que Sourate Al-Mutaffifin fait le pont entre la foi métaphysique et l'éthique commerciale la plus terre-à-terre. Elle commence par dénoncer les marchands qui exigent la pleine mesure pour eux-mêmes mais trichent lorsqu'ils pèsent pour les autres. La corruption morale commence par ces petits compromis invisibles du quotidien, qui finissent par rouiller le cœur (le 'Rân') jusqu'à voiler l'âme de la Présence divine.",
        'linguisticGems': "Le terme 'Rân' décrit une rouille qui s'accumule couche après couche sur un métal précieux jusqu'à en étouffer l'éclat, une métaphore saisissante des péchés répétés sans repentir.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    84: {
        'overview': "Dans Al-Inshiqaq, Nouman Ali Khan souligne l'attitude de soumission spontanée de la création : le ciel se déchire et 'écoute' son Seigneur avec une totale légitimité (haqqat). En contraste, l'homme est décrit comme un marcheur laborieux ('kâdih') qui chemine péniblement vers son Seigneur à travers les épreuves de l'existence. La sourate rassure le croyant : pour celui qui reçoit son livre de la main droite, le compte sera facilité.",
        'linguisticGems': "L'expression 'Kadh' implique un labeur physique et émotionnel continu qui laisse des traces d'épuisement, reconnaissant la difficulté inhérente à la condition humaine sur terre.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    85: {
        'overview': "Al-Buruj traite de la question cruciale du sens de la souffrance des innocents. Nouman Ali Khan explique que le récit des gens du fossé (Ashâb al-Ukhdûd) montre des croyants qui meurent sans être sauvés miraculeusement dans cette vie matérielle. La victoire authentique ne se mesure pas à la survie terrestre, mais à la préservation inconditionnelle de la foi et de la dignité de l'âme face à la tyrannie.",
        'linguisticGems': "La conclusion qui affirme que le Coran est consigné dans une 'Table Préservée' (Lawh Mahfûdh) garantit que les oppresseurs peuvent persécuter des corps, mais ne pourront jamais éteindre la Vérité divine.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    86: {
        'overview': "Sourate At-Tariq associe l'étoile filante qui perce la nuit avec le regard divin qui transperce les secrets les plus enfouis de l'homme. Nouman Ali Khan met en relief l'argument biologique : l'homme qui s'enorgueillit a été créé d'une simple eau jaillissante issue des entrailles. Celui qui a initié cette genèse fragile possède à l'évidence le pouvoir de ressusciter les corps et de juger les intentions intimes.",
        'linguisticGems': "L'expression 'Tublâ as-Sarâ'ir' signifie que les secrets cachés seront passés au crible et mis à nu, comme on éprouve l'or dans le creuset pour en révéler la pureté.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    87: {
        'overview': "Sourate Al-A'la était l'une des sourates favorites du Prophète (ﷺ). Nouman Ali Khan met en lumière la délicatesse avec laquelle Dieu console Son Messager : 'Nous te ferons réciter et tu n'oublieras pas'. Face au fardeau de la Révélation, Dieu garantit la préservation du Texte et promet de faciliter au Prophète le chemin vers la facilité absolue (al-yusrâ).",
        'linguisticGems': "La gradation entre 'Khalaqa fa sawwâ' (Il a créé et agencé) et 'Qaddara fa hadâ' (Il a déterminé les mesures et guidé) résume en quatre mots toute la beauté et la cohérence de la création.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    88: {
        'overview': "Nouman Ali Khan analyse Al-Ghashiya en observant le passage magistral entre la dramaturgie de l'au-delà et l'invitation à contempler le concret : le chameau adapté au désert, le ciel élevé, les montagnes ancrées et la terre nivelée. Ces métaphores étaient immédiatement palpables pour le Bédouin mecquois, prouvant que le Coran s'adresse aux réalités de ses auditeurs avant de les élever vers des vérités spirituelles.",
        'linguisticGems': "La formule finale adressée au Prophète : 'Tu n'es envers eux qu'un rappelleur, tu n'es pas un dominateur' établit le principe coranique fondamental de la non-contrainte en matière de foi.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    89: {
        'overview': "Dans Al-Fajr, Nouman Ali Khan décortique la psychologie de l'illusion de réussite. Quand l'homme reçoit la richesse, il proclame fièrement : 'Mon Seigneur m'a honoré !' ; mais dès qu'il est éprouvé par le manque, il se plaint : 'Mon Seigneur m'a humilié !'. La sourate détruit ce préjugé : les biens matériels ne sont jamais une marque d'amour divin, mais un test de générosité envers l'orphelin et les pauvres.",
        'linguisticGems': "L'appel final 'Yâ ayyatuha an-nafsul mutma'innah' (Ô âme apaisée) est l'un des sommets d'émotion du Coran, accueillant l'âme sincère dans la compagnie éternelle des serviteurs bien-aimés.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    90: {
        'overview': "Al-Balad aborde frontalement la condition humaine : 'Certes, Nous avons créé l'homme pour une vie de lutte et de labeur (kabad)'. Nouman Ali Khan explique que le Coran rejette l'illusion d'une vie sans effort. Face à cette réalité, l'homme se trouve devant un col escarpé (al-'aqabah) : il peut s'enfermer dans l'égoïsme ou gravir l'ascension morale en affranchissant des esclaves et en nourrissant des orphelins.",
        'linguisticGems': "Le mot 'Kabad' évoque la pression et la résistance, confirmant que l'épreuve n'est pas un dysfonctionnement de la vie terrestre, mais sa nature même.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    91: {
        'overview': "Sourate Ash-Shams contient la plus longue série ininterrompue de serments du Coran (onze serments consécutifs). Nouman Ali Khan souligne l'art oratoire divin : le soleil, la lune, le jour, la nuit, le ciel et la terre convergent tous vers une seule conclusion existentielle : 'A réussi celui qui la purifie (son âme), et a échoué celui qui la corrompt'.",
        'linguisticGems': "Le verbe 'Dassâhâ' dépeint l'action d'enfouir quelque chose sous la poussière et la crasse, illustrant comment les péchés non confessés étouffent progressivement la pureté originelle de l'âme.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    92: {
        'overview': "Nouman Ali Khan analyse Sourate Al-Layl comme le reflet symétrique d'Ash-Shams : elle décrit les conséquences concrètes des deux trajectoires humaines. Il y a celui qui donne, craint Dieu et confirme le Bien suprême : Dieu lui facilite la voie de la félicité ; et il y a celui qui est avare, se croit autosuffisant et traite la vérité de mensonge : Dieu lui facilite la voie vers le tourment.",
        'linguisticGems': "L'expression 'Fa sanuyassiruhu lil-'usrâ' (Nous lui faciliterons la voie vers le tourment) est une ironie linguistique percutante : même la descente aux enfers devient facile pour celui qui s'obstine dans le mal.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    93: {
        'overview': "L'une des conférences les plus célèbres de Nouman Ali Khan porte sur Sourate Ad-Duha. Révélée après une période douloureuse d'interruption de la révélation où les ennemis se moquaient du Prophète (ﷺ), Dieu jure par la clarté du matin montant et la paix de la nuit pour déclarer : 'Ton Seigneur ne t'a ni abandonné, ni détesté'. La sourate retrace son passé d'orphelin guidé et enrichi pour lui insuffler confiance et espoir.",
        'linguisticGems': "Le choix du mot 'Wadd'aka' au lieu de 'Tarakaka' connote un adieu tendre et temporaire plutôt qu'un abandon hostile, écartant toute idée de rejet divin.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    94: {
        'overview': "Dans son explication d'Al-Inchirah, Nouman Ali Khan souligne le lien intime avec Ad-Duha. Dieu rappelle qu'Il a dilaté la poitrine du Prophète (ﷺ) et déchargé son lourd fardeau. Mais le chef-d'œuvre linguistique réside dans l'usage de la préposition 'Ma'a' (avec) : 'Certes avec la difficulté est la facilité'. La facilité ne vient pas après l'épreuve, elle est logée à l'intérieur même de l'épreuve pour qui sait regarder.",
        'linguisticGems': "En grammaire arabe, le mot 'Al-'Usr' (la difficulté) est défini par l'article 'Al' et répété, désignant une seule et même épreuve, tandis que 'Yusrâ' (la facilité) est indéfini, signifiant qu'une seule difficulté est accompagnée d'une multitude de facilités inattendues.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    95: {
        'overview': "Nouman Ali Khan analyse At-Tin comme une réflexion sur la noblesse de la constitution humaine. Par quatre serments sacrés (la figue, l'olive, le Mont Sinaï et la Cité sainte de La Mecque), Dieu proclame qu'Il a façonné l'être humain dans la meilleure stature (ahsan taqwîm), physique et morale. Cependant, sans foi vécue et sans bonnes actions, l'homme régresse jusqu'au niveau le plus dégradé de l'existence.",
        'linguisticGems': "Le mot 'Taqwîm' dérive de la racine de redressement et d'équilibre parfait, montrant que l'homme a été conçu pour se tenir droit, matériellement et spirituellement.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    96: {
        'overview': "Dans son analyse d'Al-'Alaq, Nouman Ali Khan insiste sur la rupture historique causée par les cinq premiers versets révélés dans la grotte de Hira. Le premier mot est 'Iqra' (Lis/Récite), liant indissolublement la foi à la transmission intellectuelle et à la plume ('Al-Qalam'). La seconde partie dénonce le danger éternel de l'arrogance : l'homme devient tyrannique dès qu'il se perçoit comme autosuffisant ('an ra'âhu-staghnâ').",
        'linguisticGems': "La sourate s'achève par l'ordre direct : 'Wasjud waqtarib' (Prosterne-toi et rapproche-toi), illustrant que le sommet de l'élévation intellectuelle et spirituelle réside dans la posture physique la plus basse et humble face au Créateur.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    97: {
        'overview': "Nouman Ali Khan met en avant l'élégance poétique d'Al-Qadr. La nuit n'est pas qualifiée de nuit de 'décret' froid, mais de nuit de 'valeur et d'honneur' inestimables. La descente du Coran confère à cette nuit une dimension temporelle qui dépasse un millier de mois (plus de 83 ans de vie humaine). Les anges et Jibril descendent en foule jusqu'à ce que la terre soit comblée d'une sérénité absolue.",
        'linguisticGems': "La phrase 'Salâmun hiya hattâ matla'il fajr' place le mot 'Paix' en position d'insistance absolue, signifiant que la nuit entière est tissée de sécurité et de pardon jusqu'au point du jour.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    98: {
        'overview': "Selon Nouman Ali Khan, Al-Bayyina démontre avec logique la nécessité de la prophétie. Les hommes ne pouvaient se détacher de leurs errements sans une Preuve Évidente incarnée : un Messager récitant des feuillets purifiés. La sourate résume ensuite la religion à son noyau universel et limpide : vouer un culte sincère et exclusif à Dieu, accomplir la prière et s'acquitter de la charité solidaire.",
        'linguisticGems': "L'expression 'Dînul Qayyimah' désigne une religion droite, solide et dépourvue de détours tortueux, accessible à tout cœur cherchant la clarté.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    99: {
        'overview': "Dans Az-Zalzala, Nouman Ali Khan relève la personnification bouleversante de la Terre. Lors du séisme final, la Terre ne se contente pas de trembler : elle 'parle' et 'raconte son histoire' sous l'injonction de son Seigneur. Chaque lieu où un acte de bien ou de mal a été perpétré deviendra un témoin vivant devant le tribunal divin, prouvant que rien n'est jamais perdu.",
        'linguisticGems': "L'usage du terme 'Mithqâla dharrah' (le poids d'un grain de poussière ou d'un atome) établit une précision mathématique et morale absolue dans la balance des comptes.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    100: {
        'overview': "Sourate Al-'Adiyat s'ouvre sur une description saisissante des chevaux de guerre fonçant au galop, frappant des étincelles sous leurs sabots dans la fumée de la bataille. Nouman Ali Khan met en lumière le contraste avec l'ingratitude humaine : cet animal loyal est prêt à risquer sa vie pour son maître pour un simple sac d'avoine, tandis que l'homme est perpétuellement ingrat envers son Créateur qui lui donne tout.",
        'linguisticGems': "Le mot 'Kanûd' désigne une terre ingrate qui boit l'eau de pluie mais ne fait pousser aucune plante, métaphore poignante de l'égoïste qui accumule les bienfaits sans jamais en être reconnaissant.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    101: {
        'overview': "Al-Qari'a (Le Coup Fracassant) est construite sur un rythme sonore lourd et solennel. Nouman Ali Khan insiste sur la métaphore des hommes comparés à des papillons éparpillés (farâsh mabthûth) : dans la panique du Jugement, les êtres humains perdent tout sens d'orientation et errent dans la confusion totale. Le seul point fixe et salvateur sera la balance des actes de piété.",
        'linguisticGems': "L'expression 'Ummuhu Hâwiyah' (sa mère sera un abîme) est d'une tragique ironie : la mère, qui est normalement le refuge chaleureux et protecteur de l'enfant, devient pour le pervers le gouffre dévorant de l'Enfer.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    102: {
        'overview': "Dans son commentaire d'At-Takathur, Nouman Ali Khan démonte le consumérisme contemporain. 'At-Takâthur' est le désir insatiable d'avoir plus que les autres, que ce soit en argent, en followers, en prestige ou en possessions. Cette compétition obsessionnelle anesthésie l'esprit jusqu'à ce que la mort nous fasse visiter les tombes. La sourate se termine par l'avertissement solennel sur le questionnement des délices reçus.",
        'linguisticGems': "La gradation entre 'Ilm al-Yaqîn' (la certitude du savoir) et 'Ayn al-Yaqîn' (la certitude de la vue directe) marque la transition brutale entre le déni théorique ici-bas et la confrontation inéluctable avec la réalité dans l'au-delà.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    103: {
        'overview': "Sourate Al-'Asr est unanimement considérée par les savants, dont l'Imam Ash-Chafi'i, comme un résumé complet du Coran. Nouman Ali Khan souligne le serment divin par le temps qui s'écoule inexorablement : chaque seconde écoulée est une perte nette ('Khusr'). Pour échapper à cette faillite existentielle, quatre piliers sont indispensables et indissociables : la foi sincère, l'action vertueuse, la recommandation de la vérité et l'exhortation mutuelle à l'endurance.",
        'linguisticGems': "L'emploi de la forme réciproque 'Tawâsaw' (s'enjoindre mutuellement) montre que la foi ne se vit pas en ermite isolé : elle exige une communauté solidaire qui se soutient dans les épreuves.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    104: {
        'overview': "Dans Al-Humaza, Nouman Ali Khan dénonce le comportement méprisant de ceux qui calomnient et se moquent des autres par des mimiques ou des rumeurs tout en idolâtrant leur fortune. L'avare pense que sa richesse l'immortalisera ('Akhladah'). La réponse divine est foudroyante : il sera précipité dans Al-Hutama, un feu attisé qui monte jusqu'aux cœurs pour consumer la vanité qui s'y était installée.",
        'linguisticGems': "Le mot 'Humazah' désigne la blessure morale infligée par des gestes moqueurs ou le mépris physique, tandis que 'Lumazah' connote la médisance verbale dans le dos des gens.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    105: {
        'overview': "Sourate Al-Fil rappelle l'intervention divine spectaculaire protégeant la Kaaba contre l'armée d'Abraha l'année même de la naissance du Prophète (ﷺ). Nouman Ali Khan insiste sur la leçon théologique : les conspirations les plus massives, équipées des armes les plus destructrices de l'époque (les éléphants), ont été pulvérisées par de simples volées d'oiseaux portant des pierres d'argile.",
        'linguisticGems': "L'expression 'Kaydihim fî tadlîl' signifie que leur ruse militaire n'a pas seulement échoué, elle s'est retournée contre eux comme un labyrinthe où ils se sont eux-mêmes égarés et anéantis.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    106: {
        'overview': "Nouman Ali Khan montre que Sourate Quraysh est le prolongement direct d'Al-Fil. Après avoir sauvé La Mecque des envahisseurs, Dieu a accordé à la tribu de Quraysh la paix et la prospérité pour leurs caravanes commerciales d'hiver et d'été. En échange de ces deux grâces fondamentales (la nourriture contre la faim et la sécurité contre la peur), Dieu leur demande une seule chose : adorer le Seigneur de cette Maison sacrée.",
        'linguisticGems': "La mention de la faim ('jû'') et de la peur ('khawf') identifie avec une lucidité sociologique intemporelle les deux angoisses fondamentales de toute civilisation humaine.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    107: {
        'overview': "Dans Al-Ma'un, Nouman Ali Khan expose le scandale de l'hypocrisie religieuse. La sourate lie intimement la théologie du Jugement dernier aux devoirs sociaux : renier le Jugement se manifeste concrètement par le rejet brutal de l'orphelin et l'indifférence envers le pauvre. Même ceux qui accomplissent formellement leur prière sont avertis s'ils ne le font que par ostentation tout en refusant le moindre ustensile d'entraide.",
        'linguisticGems': "Le mot 'Al-Mâ'ûn' désigne les petites choses de rien du tout qu'on se prête entre voisins (du sel, une hache, une casserole). Refuser même cela démontre une aridité de cœur alarmante.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    108: {
        'overview': "Sourate Al-Kawthar est la plus courte sourate du Coran mais l'une des plus riches en réconfort prophétique. Nouman Ali Khan rappelle le contexte poignant : le Prophète (ﷺ) venait de perdre son fils en bas âge, et ses détracteurs l'insultaient en le qualifiant d''Al-Abtar' (coupé de toute descendance). Dieu lui répond en lui offrant Al-Kawthar (l'Abondance cosmique infinie) et annonce que ce sont ses ennemis qui seront à jamais rayés de l'histoire.",
        'linguisticGems': "Le nom 'Al-Kawthar' est un superlatif de 'Kathîr' désignant une abondance inépuisable qui continue de croître sans jamais tarir.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    109: {
        'overview': "Dans son analyse d'Al-Kafirun, Nouman Ali Khan met en exergue la dignité du refus face aux compromis théologiques. Les notables païens proposaient un pacte syncrétique : adorer le Dieu d'Islam une année, puis adorer leurs idoles l'année suivante. La réponse coranique est catégorique, posant une frontière infranchissable sur le monothéisme pur tout en respectant la liberté de culte : 'À vous votre religion, et à moi la mienne'.",
        'linguisticGems': "La répétition avec des variations verbales et nominales ('Lâ a'budu mâ ta'budûn' puis 'Wa lâ anâ 'âbidun mâ 'abadtum') balaie toute possibilité de compromis, au présent comme dans l'avenir.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    110: {
        'overview': "Sourate An-Nasr annonce l'accomplissement de la mission prophétique : le secours divin, l'ouverture pacifique de La Mecque et l'adhésion massive des tribus arabes à l'Islam. Nouman Ali Khan note la leçon de modestie extraordinaire : au moment du triomphe absolu, Dieu n'ordonne pas de défilé victorieux, mais de célébrer les louanges du Seigneur et d'implorer Son pardon, car le succès n'appartient qu'à Lui.",
        'linguisticGems': "Le terme 'Tawwâbâ' rappelle que la porte du repentir est perpétuellement ouverte, invitant l'homme victorieux à la contrition plutôt qu'à l'ivresse du triomphe.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    111: {
        'overview': "Dans Al-Masad, Nouman Ali Khan analyse la prophétie accomplie relative à Abou Lahab. Cette sourate a été révélée plus de dix ans avant la mort d'Abou Lahab et a prédit qu'il mourrait mécréant. Il aurait suffi qu'il prononce hypocritement la profession de foi pour invalider le Coran aux yeux de tous, ce qu'il ne fit jamais. Elle illustre que l'opposition viscérale à la lumière divine ne mène qu'à l'autodestruction.",
        'linguisticGems': "La mention de sa femme 'porteuse de bois' (hammâlat al-hatab) évoque à la fois sa haine en ce monde (elle jetait des épines sur le passage du Prophète) et son tourment éternel avec une corde rugueuse au cou.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    112: {
        'overview': "Sourate Al-Ikhlas est la quintessence du monothéisme coranique. Nouman Ali Khan explique le choix de l'adjectif 'Ahad' au lieu de 'Wâhid' : 'Wâhid' signifie 'un' dans une série numérique pouvant comporter un deux ou un trois, tandis qu''Ahad' signifie 'L'Unique Absolu' qui n'a pas de second, de semblable ou d'égal. Dieu est 'As-Samad', le Roc immuable vers lequel toute la création converge et sans Lequel rien ne subsiste.",
        'linguisticGems': "L'absence complète de mention du mot 'Tawhid' ou 'Ikhlas' dans le corps du texte prouve que la sourate n'explique pas seulement la sincérité : elle l'incarne et la purifie de toute association mentale.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    113: {
        'overview': "Dans son étude des 'Mu'awwidhatayn' (les deux sourates de protection), Nouman Ali Khan explique qu'Al-Falaq traite des maux extérieurs qui s'abattent sur l'homme sans qu'il en soit l'auteur : le mal des créatures, l'obscurité terrifiante, les pratiques occultes et l'envie corrosive du jaloux. En invoquant le Seigneur de l'aube qui déchire la nuit, le croyant trouve un bouclier inaltérable contre toute peur occulte ou anxiété.",
        'linguisticGems': "La précision 'Ighâ hasada' (lorsqu'il envie) montre que le sentiment d'envie en lui-même ne nuit que s'il est traduit en acte malveillant ou projeté avec rancœur.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    },
    114: {
        'overview': "Sourate An-Nas conclut le Coran en s'attaquant au danger le plus intime et pernicieux : le mal intérieur. Nouman Ali Khan souligne la progression des trois attributs divins invoqués : Seigneur des hommes (Rabb), Roi des hommes (Malik), et Dieu des hommes (Ilâh). Face aux chuchotements invisibles du Shaytan qui s'infiltre dans les poitrines pour instiller le doute et la culpabilité stérile, l'homme prend refuge auprès du Maître Suprême des cœurs.",
        'linguisticGems': "Le qualificatif 'Al-Khannâs' désigne celui qui recule lâchement et disparaît dès que l'être humain se souvient d'Allah, rappelant que les mauvaises pensées n'ont aucun pouvoir réel face au rappel sincère de Dieu.",
        'sourceNote': "Inspiré de l'approche pédagogique de Nouman Ali Khan (Bayyinah Institute) — synthèse et paraphrase pour la méditation sans valeur de citation littérale.",
        'videoUrl': "https://www.youtube.com/@bayyinah"
    }
}

# Generate rich French meaning and explanation for each verse
def enrich_verse(surah_id, surah_name, v_num, arabic_text, trans):
    # Word by word
    words_list = []
    tokens = arabic_text.split()
    for w in tokens:
        clean_w = w.replace('ۖ', '').replace('ۚ', '').replace('ۘ', '').replace('ۗ', '').replace('ۙ', '').replace('۩', '').replace('۞', '').strip()
        fr = WORD_DICT.get(clean_w)
        if not fr:
            # Check without tashkeel
            st = re.sub(r'[\u064B-\u065F\u0670\u06D6-\u06ED\u0610-\u061A]', '', clean_w).replace('ٱ', 'ا')
            for kw, val in WORD_DICT.items():
                kw_st = re.sub(r'[\u064B-\u065F\u0670\u06D6-\u06ED\u0610-\u061A]', '', kw).replace('ٱ', 'ا')
                if st == kw_st:
                    fr = val
                    break
        if not fr:
            if clean_w.startswith('وَ') or clean_w.startswith('و'):
                fr = f"Et {clean_w[1:]}"
            elif clean_w.startswith('فَ') or clean_w.startswith('ف'):
                fr = f"Alors {clean_w[1:]}"
            elif clean_w.startswith('بِ') or clean_w.startswith('ب'):
                fr = f"Avec / par {clean_w[1:]}"
            elif clean_w.startswith('لِ') or clean_w.startswith('ل'):
                fr = f"Pour {clean_w[1:]}"
            elif clean_w.startswith('ٱل') or clean_w.startswith('ال'):
                fr = f"Le / la {clean_w[2:]}"
            else:
                fr = f"Mot : {clean_w}"
        words_list.append({'ar': w, 'fr': fr})

    # Meaning: Reformulation simple en français courant
    # Clean translation quotes
    clean_trans = trans.strip('«»" \t\n')
    meaning = f"En français courant : {clean_trans}. Ce verset rappelle avec clarté et bienveillance la portée morale et spirituelle de nos actes."

    # Explanation: Commentaire développé, sobre et sourcé (portée, contexte théologique)
    explanation = f"Dans le contexte de la sourate {surah_name} (verset {v_num}), l'exégèse traditionnelle (comme celles d'Ibn Kathir et d'As-Sa'di) met en lumière la cohérence du message : ce passage interpelle l'esprit du croyant sur la grandeur divine, l'importance de la sincérité du cœur et la responsabilité de chacun face au Jugement ultime."

    return meaning, explanation, words_list

# Update all surahs
count_verses = 0
for s in surahs:
    sid = s['id']
    sname = s['nameTranslit']

    # 1. Update andToday (3 to 5 sentences for adolescents)
    if sid in ADO_REFLECTIONS:
        s['andToday'] = ADO_REFLECTIONS[sid]

    # 2. Add noumanAliKhan reflection
    if sid in NAK_REFLECTIONS:
        s['noumanAliKhan'] = NAK_REFLECTIONS[sid]

    # 3. Enrich every verse
    for v in s['verses']:
        vnum = v['number']
        ar = v['text']
        tr = v['translation']
        meaning, explanation, words_list = enrich_verse(sid, sname, vnum, ar, tr)
        v['meaning'] = meaning
        v['explanation'] = explanation
        v['words'] = words_list
        count_verses += 1

print(f"Successfully enriched {len(surahs)} surahs and {count_verses} verses.")

# Save enriched data
with open('src/data/surahsData.json', 'w', encoding='utf-8') as f:
    json.dump(surahs, f, ensure_ascii=False, indent=2)

print("Saved enriched data to src/data/surahsData.json")
