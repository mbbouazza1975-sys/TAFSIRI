import VERSE_INSIGHTS from './verseInsights.json';

// Interprétations par verset et blocs de sourate rédigés le 25/09/2026 (voir docs/verifications.md).
// Chaque entrée est propre à son verset (numérotation Warsh). Démarche inspirée de la méthode de
// Nouman Ali Khan (partir du sens des mots pour arriver à la vie d'aujourd'hui), sans lui attribuer de propos.
type VerseInsight = { titreAdo: string; impactAdo: string; questionIntrospection: string };
const INSIGHTS = VERSE_INSIGHTS as unknown as Record<string, { surah?: Omit<SurahYouthExegesis, 'surahId' | 'versesAdos'>; verses?: Record<string, VerseInsight> }>;

export interface SurahYouthExegesis {
  surahId: number;
  themeAdo: string;
  hookAdos: string;
  defiQuotidien: string;
  reponseCoranique: string;
  metaphoreModerne: string;
  troisReglesDOr: string[];
  noumanTakeaway: string;
  versesAdos?: Record<number, {
    titreAdo: string;
    impactAdo: string;
    questionIntrospection: string;
  }>;
}

export const CONTEMPORARY_YOUTH_EXEGESIS: Record<number, SurahYouthExegesis> = {
  103: {
    surahId: 103,
    themeAdo: "Gestion du temps, Scroll infini & Choix des vrais amis",
    hookAdos: "3 versets pour sauver ta journée du trou noir des réseaux sociaux et de la procrastination.",
    defiQuotidien: "Tu ouvres ton téléphone pour 2 minutes, et tu te retrouves 3 heures plus tard sur TikTok ou Instagram avec la sensation d'avoir gâché ta soirée et accumulé du retard sur tes cours.",
    reponseCoranique: "Allah jure par le Temps (Al-'Asr) pour te dire : chaque seconde est une devise non remboursable. Par défaut, sans intention active, tout être humain dérive vers la perte. La seule échappatoire : une team solide, un mindset ancré et l'action concrète.",
    metaphoreModerne: "Imagine un compte bancaire où on verse 86 400 € chaque matin, mais tout ce qui n'est pas utilisé disparaît à minuit sans report. Ce compte, ce sont les 86 400 secondes de ta journée d'adolescent.",
    troisReglesDOr: [
      "Fixe une limite d'écran avant 22h : ton cerveau n'est pas fait pour digérer 500 vidéos avant de dormir.",
      "Entoure-toi d'au moins un ami qui te rappelle de faire le bien quand tu t'apprêtes à déraper.",
      "Avant chaque décision impulsive, prends 5 secondes de pause (Sabr) : est-ce que ça construit ton avenir ?"
    ],
    noumanTakeaway: "L'analyse linguistique rappelle que 'Al-'Asr' est le temps qui presse, comme le jus qu'on extrait d'un fruit jusqu'à la dernière goutte. Ne laisse pas le monde contemporain presser ton temps pour le vider de sa substance.",
    versesAdos: {
      1: {
        titreAdo: "Le compte à rebours invisible",
        impactAdo: "Le temps n'est pas infini. Ta jeunesse et ton énergie au collège/lycée sont le moment où tes habitudes se forgent pour toute ta vie d'adulte.",
        questionIntrospection: "Si tu regardes le temps d'écran de ton téléphone aujourd'hui, reflète-t-il la personne que tu veux devenir ?"
      },
      2: {
        titreAdo: "Le piège du mode automatique",
        impactAdo: "Sans discipline, la pente naturelle de l'humain est de glisser vers la futilité, la distraction et le regret. Ne subis pas ta vie en spectateur.",
        questionIntrospection: "Quelle mauvaise habitude répètes-tu en boucle en sachant qu'elle te fait perdre du temps et de l'énergie ?"
      },
      3: {
        titreAdo: "La recette des 4 piliers de survie",
        impactAdo: "1. Foi solide (savoir pourquoi tu vis) · 2. Bonnes actions (travailler, aider, créer) · 3. Vérité (parler avec authenticité sans masque) · 4. Patience (résister à la facilité et aux tentations immédiates).",
        questionIntrospection: "Tes amis actuels te tirent-ils vers le haut, ou as-tu peur de montrer tes vraies valeurs devant eux ?"
      }
    }
  },
  104: {
    surahId: 104,
    themeAdo: "Cyber-harcèlement, Moqueries, Commérage & Pression des marques",
    hookAdos: "La réponse chirurgicale du Coran au 'clash', aux groupes de ragots et à l'illusion des followers.",
    defiQuotidien: "Les screens partagés en scred pour rigoler d'un camarade de classe, les surnoms dégradants dans les couloirs ou la sensation qu'il faut absolument porter telle paire de sneakers pour exister aux yeux des autres.",
    reponseCoranique: "Al-Humazah dénonce frontalement le vice de rabaisser autrui par des mimiques, des sous-entendus ou des paroles assassines, tout en croyant que l'accumulation de biens matériels confère l'immortalité ou la supériorité.",
    metaphoreModerne: "Un 'like' ou un mème moqueur sur WhatsApp peut sembler inoffensif sur un écran, mais dans le cœur de celui qui le reçoit, c'est une flèche enflammée qui détruit son estime personnelle.",
    troisReglesDOr: [
      "Quitte ou fais taire tout groupe de discussion où l'on casse du sucre sur le dos d'un absent.",
      "Ne juge jamais la valeur d'une personne à la marque de ses vêtements ou à son nombre d'abonnés.",
      "Si tu as blessé quelqu'un par une vanne ou un regard méprisant, excuse-toi le jour même sans fierté mal placée."
    ],
    noumanTakeaway: "Dans l'analyse linguistique fine, 'Humazah' désigne celui qui brise la dignité d'autrui par des gestes et mimiques, tandis que 'Lumazah' le poignarde avec la langue. C'est l'essence même du harcèlement moderne.",
    versesAdos: {
      1: {
        titreAdo: "Le poison du dénigrement",
        impactAdo: "Chaque vanne blessante, chaque regard moqueur dans le dos d'un camarade laisse une cicatrice.",
        questionIntrospection: "T'es-t-il déjà arrivé de rire d'une moquerie par simple conformisme pour ne pas être rejeté du groupe ?"
      },
      2: {
        titreAdo: "L'illusion de l'accumulation",
        impactAdo: "Compter ses abonnés, ses vues, ses paires de baskets comme si cela donnait une valeur à son âme.",
        questionIntrospection: "Si on retirait toutes tes possessions matérielles, que resterait-il de ta véritable personnalité ?"
      }
    }
  },
  105: {
    surahId: 105,
    themeAdo: "Face aux 'Bullies', à la Tyrannie & au Sentiment d'Impuissance",
    hookAdos: "Quand les problèmes ou les intimidateurs te paraissent gigantesques comme des éléphants.",
    defiQuotidien: "Se sentir tout petit face à une situation injuste, à un caïd au collège, ou à l'angoisse de l'avenir dans un monde incertain.",
    reponseCoranique: "L'armée la plus puissante avec ses colosses a été neutralisée par de minuscules oiseaux envoyés par le Maître des cieux. La taille physique et l'arrogance ne gagnent jamais face à la vérité divine.",
    metaphoreModerne: "Un virus microscopique peut immobiliser la machine la plus lourde. Ne sous-estime jamais le pouvoir d'une sincère invocation ou d'une petite action juste face à une épreuve colossale.",
    troisReglesDOr: [
      "Ne laisse jamais l'intimidation d'un groupe ou d'un individu te faire douter de ta dignité.",
      "Ne deviens jamais toi-même le dominant ou l'arrogant dès que tu te trouves en position de force.",
      "Place ta confiance totale en Allah quand tu affrontes une épreuve qui dépasse tes capacités physiques."
    ],
    noumanTakeaway: "L'ironie divine est saisissante : Abraha venait avec l'arme la plus lourde de l'époque (les éléphants), et Allah a répondu avec l'arme la plus légère (des petits oiseaux et des pierres d'argile). La force brute s'effondre toujours face à la justice.",
    versesAdos: {
      1: {
        titreAdo: "L'illusion des invincibles",
        impactAdo: "Ceux qui s'imaginent intouchables par leur force ou leur popularité finissent toujours par tomber.",
        questionIntrospection: "Face à quelle peur as-tu besoin de te rappeler qu'Allah est infiniment plus grand que tes soucis ?"
      }
    }
  },
  106: {
    surahId: 106,
    themeAdo: "Sortir du Syndrome de l'Éternel Insatisfait & Voir ses Bénédictions",
    hookAdos: "Le frigo plein, le lit chaud, la sécurité : pourquoi nous plaignons-nous encore tout le temps ?",
    defiQuotidien: "Râler parce que la connexion Wi-Fi rame 10 secondes, parce que le repas ne nous plaît pas ou parce qu'on n'a pas le dernier smartphone.",
    reponseCoranique: "Quraysh bénéficiait de deux privilèges majeurs : la sécurité face à la peur et la nourriture abondante. La réponse attendue n'est pas l'indifférence, mais l'adoration reconnaissante du Maître de cette Maison.",
    metaphoreModerne: "Un ado vivant en sécurité avec de l'eau potable au robinet et un toit vit mieux que les plus grands rois d'il y a trois siècles. Réveiller son 'mode gratitude' change immédiatement la chimie du cerveau.",
    troisReglesDOr: [
      "Remercie tes parents pour chaque repas préparé, sans jamais faire la moue.",
      "Pense chaque jour à 3 choses simples dont tu bénéficies et dont des millions d'enfants sont privés.",
      "Transforme ton confort en service : utilise ton énergie et ton temps libre pour aider ta famille et ta communauté."
    ],
    noumanTakeaway: "La gratitude n'est pas un sentiment passif ; c'est un moteur d'action. Reconnaître le bienfait pousse naturellement à honorer le Donateur.",
    versesAdos: {
      4: {
        titreAdo: "Nourriture & Sécurité : Les vraies richesses",
        impactAdo: "Avoir de quoi manger aujourd'hui et dormir sans entendre de bombes : 90% du monde donnerait tout pour cela.",
        questionIntrospection: "Quand as-tu dit un vrai 'Alhamdulillah' venant du fond du cœur pour la dernière fois ?"
      }
    }
  },
  107: {
    surahId: 107,
    themeAdo: "La Religion du Paraître vs La Bienveillance Concrète au Foyer",
    hookAdos: "Prier à la perfection à la mosquée mais refuser de rendre service à la maison : l'incohérence démasquée.",
    defiQuotidien: "Se donner une image de sainteté ou poster des rappels islamiques sur les réseaux, mais ignorer sa petite sœur en pleurs, délaisser les tâches ménagères ou ignorer les plus démunis.",
    reponseCoranique: "Cette sourate lie directement la foi au comportement social le plus basique : nourrir le pauvre, protéger l'orphelin et prêter les ustensiles du quotidien (Al-Mâ'ûn). Une prière déconnectée de l'empathie est un mirage.",
    metaphoreModerne: "Un profil Instagram avec des citations spirituelles sublimes, mais une attitude hautaine et égoïste dès qu'on éteint l'écran de son téléphone.",
    troisReglesDOr: [
      "Sois le premier à débarrasser la table ou à jeter la poubelle sans qu'on ait besoin de te le demander 3 fois.",
      "Ne repousse jamais sèchement quelqu'un qui te demande un service, un cours ou un coup de main.",
      "Purifie ton intention : n'accomplis pas tes prières ou tes bonnes actions pour être vu ou applaudi."
    ],
    noumanTakeaway: "Al-Mâ'ûn est le test décisif de la sincérité : prêter un simple bol ou une pincée de sel révèle si ton cœur est vraiment doux ou s'il est endurci par l'hypocrisie.",
    versesAdos: {
      1: {
        titreAdo: "Démasquer l'incohérence",
        impactAdo: "La foi se mesure dans la façon dont tu traites les personnes vulnérables qui ne peuvent rien t'apporter en retour.",
        questionIntrospection: "Traites-tu ta famille avec la même politesse que celle que tu réserves à tes meilleurs potes ?"
      }
    }
  },
  108: {
    surahId: 108,
    themeAdo: "Se Sentir Rejeté, Différent, ou Incompris par ses Pairs",
    hookAdos: "Quand les autres te traitent de 'bizarre' ou essaient de t'isoler parce que tu ne fais pas comme tout le monde.",
    defiQuotidien: "La solitude de ne pas boire, de ne pas sortir dans les mêmes soirées, ou d'essayer de préserver sa pudeur quand tout le monde autour cède à la mode du moment.",
    reponseCoranique: "Les notables moquaient le Prophète ﷺ en disant qu'il était sans postérité (Abtar). Allah lui a répondu en lui accordant l'Abondance (Al-Kawthar). Ceux qui se moquent de ta droiture seront les véritables oubliés de l'Histoire.",
    metaphoreModerne: "Être un diamant brut au milieu de babioles en plastique : ça dérange ceux qui brillent d'un éclat artificiel, mais sa valeur intrinsèque est éternelle.",
    troisReglesDOr: [
      "Garde la tête haute quand tes principes te rendent minoritaire : la vérité n'a jamais dépendu du nombre de votes.",
      "Réponds aux remarques blessantes par l'excellence morale, le travail et la prière persévérante.",
      "Rappelle-toi que l'approbation d'Allah surpasse l'adhésion de tous les groupes d'adolescents réunis."
    ],
    noumanTakeaway: "Al-Kawthar est un câlin divin descendu du ciel pour réconforter un cœur blessé par les quolibets. Ne cherche pas la reconnaissance des moqueurs quand l'Abondance t'attend.",
    versesAdos: {
      1: {
        titreAdo: "L'Abondance intérieure",
        impactAdo: "Ce que Dieu t'a donné en guidance et en paix intérieure dépasse tous les privilèges matériels.",
        questionIntrospection: "As-tu déjà renoncé à tes principes par peur d'être catalogué comme 'bizarre' ?"
      }
    }
  },
  109: {
    surahId: 109,
    themeAdo: "Affirmer son Identité Sans Agressivité & Résister au Compromis Toxique",
    hookAdos: "La 'pression des pairs' et l'art de dire un NON ferme, poli et inébranlable.",
    defiQuotidien: "Quand les camarades te disent : 'Allez, juste une fois, teste avec nous, fais pas ton coincé !' Que ce soit pour une cigarette, un mensonge, de la drogue ou un comportement interdit.",
    reponseCoranique: "Al-Kafirun enseigne la diplomatie ferme : pas d'arrogance, pas d'insulte, mais une frontière morale infranchissable. 'À vous votre voie, et à moi ma voie.'",
    metaphoreModerne: "Le pare-feu (firewall) de ton système d'exploitation moral. Tu es ouvert à la discussion et au respect, mais les virus destructeurs ne franchissent pas la porte.",
    troisReglesDOr: [
      "Apprends à dire 'Non merci, ce n'est pas mon délire' avec un sourire calme et assuré.",
      "Ne rentre jamais dans des débats stériles ou agressifs qui ne mènent qu'à l'animosité.",
      "Respecte les choix d'autrui tout en restant intraitable sur tes propres lignes rouges éthiques."
    ],
    noumanTakeaway: "La répétition dans cette sourate n'est pas une redondance : elle tranche le présent et le futur. 'Je n'adore pas ce que vous adorez aujourd'hui, et je ne l'adorerai jamais demain.' Clarté absolue.",
    versesAdos: {
      6: {
        titreAdo: "La tolérance sans compromission",
        impactAdo: "Respecter l'autre ne veut pas dire copier ses égarements pour lui faire plaisir.",
        questionIntrospection: "Quelle est ta ligne rouge morale que tu as juré de ne jamais franchir, quoi qu'il arrive ?"
      }
    }
  },
  110: {
    surahId: 110,
    themeAdo: "Gérer la Réussite Sans Prendre la Grosse Tête (Ego & Humilité)",
    hookAdos: "Quand tu cartonnes à un examen, au foot ou que ta cote de popularité explose : le vaccin anti-arrogance.",
    defiQuotidien: "Avoir réussi quelque chose de brillant et commencer à regarder les autres de haut, en s'attribuant tout le mérite personnel.",
    reponseCoranique: "Lorsque la victoire suprême et le triomphe arrivent, la prescription divine n'est pas le défilé triomphaliste, mais la glorification reconnaissante d'Allah et la demande sincère de pardon (Istighfar).",
    metaphoreModerne: "Un joueur qui marque un but d'anthologie et va immédiatement serrer son entraîneur dans ses bras et saluer ses coéquipiers, plutôt que de faire une célébration provocatrice vers le public adverse.",
    troisReglesDOr: [
      "Après chaque succès marquant, formule un 'Alhamdulillah' secret et prie deux rak'ahs de gratitude.",
      "Partage ta réussite en félicitant ceux qui t'ont aidé : parents, professeurs, amis discrets.",
      "Garde en tête que les talents que tu possèdes sont un prêt divin, non une supériorité biologique."
    ],
    noumanTakeaway: "Finir sur l'Istighfâr au sommet de la gloire rappelle à l'humain qu'aucune œuvre humaine n'est parfaite sans la grâce d'Allah.",
    versesAdos: {
      3: {
        titreAdo: "Le réflexe des grands cœurs",
        impactAdo: "La vraie grandeur se mesure à ton humilité lorsque tout le monde t'applaudit.",
        questionIntrospection: "T'attribues-tu tout le mérite de tes réussites, ou sais-tu remercier ceux qui t'ont porté ?"
      }
    }
  },
  111: {
    surahId: 111,
    themeAdo: "L'Ego Toxique, la Richesse Mal Acquise & l'Amertume Destructrice",
    hookAdos: "Quand la haine et la jalousie consument celui qui les porte jusqu'à le détruire de l'intérieur.",
    defiQuotidien: "Se focaliser sur la jalousie envers quelqu'un au point d'organiser sa ruine ou de colporter des rumeurs venimeuses pour salir sa réputation.",
    reponseCoranique: "Abû Lahab avait l'argent, la prestance physique et le statut social, mais son hostilité acharnée envers la vérité l'a conduit à la faillite intégrale. La haine finit toujours par étouffer celui qui la cultive.",
    metaphoreModerne: "Boire une fiole de poison en espérant que ce soit l'autre qui meure : c'est exactement ce que produit la rancœur et l'animosité gratuite.",
    troisReglesDOr: [
      "Évacue immédiatement toute jalousie dès qu'elle pointe dans ton cœur en invoquant du bien pour la personne visée.",
      "Ne compte jamais sur l'argent ou le statut de tes parents pour te croire supérieur à autrui.",
      "Ne prête jamais main-forte à ceux qui propagent des calomnies et de la zizanie autour de toi."
    ],
    noumanTakeaway: "La corde de fibres autour du cou de la femme d'Abû Lahab symbolise le fait que les instruments utilisés pour nuire se transforment en instruments de notre propre châtiment.",
    versesAdos: {
      2: {
        titreAdo: "La faillite matérielle",
        impactAdo: "L'argent de poche, les fringues ou les relations ne te sauveront jamais de ta propre laideur intérieure.",
        questionIntrospection: "Y a-t-il une personne que tu détestes au point que cela te ronge tes pensées quotidiennes ?"
      }
    }
  },
  112: {
    surahId: 112,
    themeAdo: "Qui est Dieu ? Déconstruire les Doutes Métaphysiques des Ados",
    hookAdos: "L'Ancre inébranlable dans un univers où tout est éphémère, fragile et changeant.",
    defiQuotidien: "Les questions existentielles qui taraudent les adolescents : 'D'où venons-nous ?', 'Pourquoi Dieu n'a-t-il pas de créateur ?', 'Comment concevoir l'Infini avec notre cerveau limité ?'",
    reponseCoranique: "Al-Ikhlas définit Dieu en 4 phrases géométriquement parfaites : Unique (Ahad), Autosuffisant dont tout dépend (As-Samad), sans ascendance ni descendance, et sans aucun équivalent pensable.",
    metaphoreModerne: "La source d'énergie ultime. Tout appareil dans l'univers a besoin d'être branché pour fonctionner. Allah est la Seule Réalité qui alimente tout sans jamais avoir besoin d'être branchée.",
    troisReglesDOr: [
      "Quand un doute métaphysique te traverse l'esprit, rappelle-toi que l'Infini ne peut pas entrer dans une boîte finie.",
      "N'accorde à aucune créature (star, influenceur, idole) la place centrale réservée à Allah dans ton cœur.",
      "Récite Al-Ikhlas chaque soir en méditant sur la pureté absolue du Créateur."
    ],
    noumanTakeaway: "Le terme 'As-Samad' désigne le roc inébranlable vers lequel tout le monde se tourne dans la tempête, alors que Lui-même n'a besoin de rien. C'est l'antidote ultime à la dépendance affective.",
    versesAdos: {
      2: {
        titreAdo: "As-Samad : Le Refuge Indestructible",
        impactAdo: "Tout ce que tu aimes sur Terre peut te décevoir ou disparaître. Seul Allah reste fidèle à chaque seconde.",
        questionIntrospection: "Vers quoi te tournes-tu en premier quand tu vis un coup dur : ton téléphone ou la prière ?"
      }
    }
  },
  113: {
    surahId: 113,
    themeAdo: "L'Anxiété Nocturne, les Pensées Noires, la Jalousie & le Mauvais Œil",
    hookAdos: "Le bouclier psychologique et spirituel quand les angoisses t'assaillent la nuit dans ton lit.",
    defiQuotidien: "L'overthinking à 1 heure du matin, les scénarios catastrophes dans la tête, la jalousie des autres sur les réseaux sociaux, ou la peur de l'inconnu et du regard malveillant.",
    reponseCoranique: "Chercher refuge auprès du Seigneur de l'Aube naissante (Falaq) qui fend les ténèbres les plus denses pour faire jaillir la lumière. Aucun mal extérieur ne peut franchir cette protection divine.",
    metaphoreModerne: "L'aube qui déchire la nuit noire comme un rayon laser. Aucune obscurité, qu'elle vienne de tes angoisses ou des intentions malveillantes d'autrui, ne peut résister à la lumière d'Allah.",
    troisReglesDOr: [
      "Prends l'habitude de réciter les 3 protectrices (Mu'awwidhatayn & Ikhlas) dans tes mains avant de dormir.",
      "Lorsque tu vois une réussite chez autrui, dis immédiatement 'Allahumma Barik' pour désamorcer tout mauvais œil.",
      "Ne reste pas seul dans le noir à faire défiler des contenus anxiogènes sur ton téléphone quand l'angoisse monte."
    ],
    noumanTakeaway: "Le mot 'Falaq' suggère une fissure violente dans la nuit pour faire naître le jour. Peu importe à quel point ton anxiété te paraît sombre, l'espoir divin fend toujours la détresse.",
    versesAdos: {
      1: {
        titreAdo: "Fendre l'obscurité",
        impactAdo: "Tes angoisses et tes doutes ne sont pas éternels : le Seigneur du matin a le pouvoir d'apaiser ton esprit.",
        questionIntrospection: "Qu'est-ce qui t'empêche le plus souvent de trouver le sommeil sereinement ?"
      }
    }
  },
  114: {
    surahId: 114,
    themeAdo: "Les Mauvaises Voix Intérieures, la Tentation Silencieuse & la Culpabilité",
    hookAdos: "Gérer cette petite voix qui te chuchote de déraper et d'abandonner tes bonnes résolutions.",
    defiQuotidien: "Le murmure sournois (Waswas) : 'Allez, regarde encore cette vidéo interdite, personne ne te voit', 'T'es nul, de toute façon Dieu ne te pardonnera pas', 'Tu commenceras à prier quand tu seras vieux'.",
    reponseCoranique: "Chercher protection auprès du Roi et Dieu de tous les Hommes contre ce murmurateur furtif qui attaque par surprise et s'enfuit dès qu'on invoque Allah. Le combat est intérieur et invisible.",
    metaphoreModerne: "Une notification toxique qui s'affiche en tâche de fond dans ton esprit. Si tu cliques dessus, elle installe un malware émotionnel. Dès que tu dis 'A'oudhou billah', tu désinstalles le malware.",
    troisReglesDOr: [
      "Ne culpabilise pas d'avoir une mauvaise pensée passagère : l'important est de ne pas lui donner suite ni de l'héberger.",
      "Fais attention aux amis qui agissent comme des 'chuchoteurs' en te poussant discrètement vers l'interdit.",
      "Dès que le Waswas s'active, change d'activité physique, fais tes ablutions et parle à un proche de confiance."
    ],
    noumanTakeaway: "Al-Khannas est celui qui recule lâchement dès qu'Allah est mentionné. Le diable n'a aucun pouvoir sur toi en dehors de simples suggestions : c'est toi qui as les commandes de tes actes.",
    versesAdos: {
      4: {
        titreAdo: "Le murmurateur furtif",
        impactAdo: "Tes mauvaises envies ne définissent pas qui tu es : elles ne sont que des bruits de fond que tu peux éteindre.",
        questionIntrospection: "Quand une mauvaise idée te traverse l'esprit, as-tu le réflexe de répliquer par le rappel d'Allah ?"
      }
    }
  },
  78: {
    surahId: 78,
    themeAdo: "La Grande Question : Pourquoi Sommes-Nous sur Terre ?",
    hookAdos: "Sortir de la bulle d'insouciance : le monde n'est pas un jeu vidéo sans sauvegarde ni conséquences.",
    defiQuotidien: "Vivre au jour le jour comme si la mort n'existait pas, en reportant sans cesse les vraies questions à plus tard.",
    reponseCoranique: "An-Naba pose la question choc : 'Sur quoi s'interrogent-ils ? Sur la Grande Nouvelle !' La terre comme berceau, les montagnes comme piliers, le sommeil comme repos : toute la création pointe vers un Jour de reddition de comptes.",
    metaphoreModerne: "Un élève qui passe toute son année scolaire à jouer sans jamais réviser, et qui est soudain convoqué devant le jury d'examen final sans issue de secours.",
    troisReglesDOr: [
      "Prends 5 minutes de solitude par semaine pour réfléchir au but de ton existence sur Terre.",
      "Observe la nature (le ciel, les étoiles, les saisons) pour reconnecter ton esprit à la majesté du Créateur.",
      "Prépare aujourd'hui le bilan que tu aimerais présenter devant Allah le Jour du Jugement."
    ],
    noumanTakeaway: "L'insouciance est le plus grand anesthésiant de l'adolescence. An-Naba est une décharge électrique pour réveiller la conscience endormie.",
    versesAdos: {
      1: {
        titreAdo: "La question fondamentale",
        impactAdo: "Ne laisse pas les futilités du quotidien étouffer les grandes questions de ton âme.",
        questionIntrospection: "Que répondrais-tu si quelqu'un te demandait quel est le sens ultime de ta vie ?"
      }
    }
  },
  93: {
    surahId: 93,
    themeAdo: "Dépression, Solitude, Sentiment d'Abandon & Espoir Renaissant",
    hookAdos: "Quand tu as l'impression que personne ne te comprend et que même le ciel est devenu silencieux.",
    defiQuotidien: "Les baisses de moral sévères, les périodes où la prière semble fade, le sentiment d'être abandonné de tous et de ne plus avoir la force d'avancer.",
    reponseCoranique: "Le serment par le Jour montant et par la Nuit quand elle s'étend : 'Ton Seigneur ne t'a ni abandonné, ni détesté.' Et la promesse lumineuse : 'La fin sera pour toi bien meilleure que le début.'",
    metaphoreModerne: "Une nuit d'hiver glaciale où le soleil semble ne plus jamais vouloir se lever. Pourtant, dans quelques heures, l'aube dorée inondera à nouveau ta chambre.",
    troisReglesDOr: [
      "Dans les moments de détresse psychologique, répète-toi ce verset : 'Ton Seigneur ne t'a ni abandonné, ni détesté.'",
      "Rappelle-toi comment Allah t'a déjà sorti d'impasses par le passé : Il le fera encore demain.",
      "Ne reste pas enfermé dans ta douleur : prends soin d'un plus faible que toi (l'orphelin, le démuni) pour guérir ton cœur."
    ],
    noumanTakeaway: "Ad-Duha est la sourate de la santé mentale et du réconfort absolu. Quand la révélation s'était interrompue et que les ennemis se moquaient, Allah a enveloppé le Prophète ﷺ d'un amour infini.",
    versesAdos: {
      3: {
        titreAdo: "La fin du doute toxique",
        impactAdo: "Même quand tu te sens au fond du gouffre, Allah n'a jamais cessé de veiller sur toi avec bienveillance.",
        questionIntrospection: "Quelle épreuve passée as-tu surmontée qui te prouve qu'Allah ne t'abandonne jamais ?"
      }
    }
  },
  94: {
    surahId: 94,
    themeAdo: "Le Soulagement Après l'Épreuve & Alléger le Poids sur sa Poitrine",
    hookAdos: "La formule universelle : avec toute difficulté vient inévitablement une facilité.",
    defiQuotidien: "Se sentir submergé par le stress des examens, les problèmes familiaux ou le sentiment d'étouffer sous les responsabilités.",
    reponseCoranique: "Allah rappelle l'apaisement de la poitrine et l'allégement du fardeau. 'Certes, avec la difficulté est la facilité' (répété deux fois pour graver la certitude absolue).",
    metaphoreModerne: "Une séance d'entraînement intense où tes muscles brûlent : la douleur physique du moment prépare la puissance et l'endurance de demain.",
    troisReglesDOr: [
      "Face à chaque coup dur, cherche immédiatement où se cache la graine de la facilité et de la bénédiction future.",
      "Ne baisse jamais les bras : la nuit la plus sombre annonce toujours l'aube la plus éclatante.",
      "Quand une tâche est accomplie, relève-toi pour la suivante sans sombrer dans la léthargie."
    ],
    noumanTakeaway: "En arabe, la difficulté est au singulier défini ('Al-'Usr') alors que la facilité est au pluriel indéfini ('Yusrâ'). Une seule difficulté ne pourra jamais vaincre deux facilités !",
    versesAdos: {
      5: {
        titreAdo: "La promesse mathématique",
        impactAdo: "La facilité n'arrive pas après l'épreuve : elle grandit à l'intérieur même de l'épreuve.",
        questionIntrospection: "Quelle difficulté actuelle pourrais-tu transformer en opportunité de grandir ?"
      }
    }
  }
};

/**
 * Fallback generator for surahs not explicitly detailed above
 */
export function getYouthExegesisForSurah(surahId: number, surahName?: string): SurahYouthExegesis {
  if (CONTEMPORARY_YOUTH_EXEGESIS[surahId]) {
    return CONTEMPORARY_YOUTH_EXEGESIS[surahId];
  }
  const block = INSIGHTS[String(surahId)]?.surah;
  if (block) {
    return { surahId, ...block };
  }

  // Smart dynamic contemporary youth analysis fallback
  return {
    surahId,
    themeAdo: `Méditation Contemporaine & Mindset Jeunesse (${surahName || 'Sourate ' + surahId})`,
    hookAdos: `Comprendre la sagesse de cette sourate pour relever tes défis d'adolescent au quotidien.`,
    defiQuotidien: `Trouver sa boussole morale dans un monde hyperconnecté où tout va vite et où les repères s'effacent.`,
    reponseCoranique: `Le Coran n'est pas un livre d'Histoire ancienne, mais un GPS en temps réel. Cette sourate t'enseigne à canaliser tes émotions, préserver ton intégrité et viser l'excellence dans tes études et ta foi.`,
    metaphoreModerne: `Un gyroscope intérieur : peu importe les secousses de ton environnement, l'ancrage coranique te maintient toujours en équilibre.`,
    troisReglesDOr: [
      "Consacre chaque jour un moment au calme sans notification pour écouter et comprendre un verset.",
      "Applique un principe moral clé de cette sourate dans ta classe ou avec ta famille dès aujourd'hui.",
      "Fais de ta foi une force motrice pour exceller scolairement et humainement."
    ],
    noumanTakeaway: `L'approche linguistique contemporaine nous invite à regarder chaque mot arabe comme une pépite de sagesse qui répond directement aux questionnements de notre époque moderne.`
  };
}

export function getVerseYouthInsight(surahId: number, verseNumber: number, verseTranslation?: string) {
  const surahData = CONTEMPORARY_YOUTH_EXEGESIS[surahId];
  if (surahData?.versesAdos?.[verseNumber]) {
    return surahData.versesAdos[verseNumber];
  }
  const insight = INSIGHTS[String(surahId)]?.verses?.[String(verseNumber)];
  if (insight) {
    return insight;
  }

  // Dynamic fallback for individual verses
  return {
    titreAdo: `Verset ${verseNumber} · Clé de Vie`,
    impactAdo: `Ce verset t'invite à aligner tes intentions et tes actes : chaque parole divine éclaire tes choix concrets au quotidien (${verseTranslation || 'méditation du verset'}).`,
    questionIntrospection: `Comment peux-tu concrètement appliquer ce rappel dans ta journée entre amis ou en famille ?`
  };
}
