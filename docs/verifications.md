# Journal des vérifications — contenu religieux

Ce fichier trace ce qui a été vérifié, avec quelle source et quand. Chaque session de travail repart d'ici.

## 25 septembre 2026

### Hadiths (carte « hadith » de chaque sourate)
- Les 37 hadiths ont été remplacés par des textes vérifiés un par un sur **sunnah.com** (texte, rapporteur, numéro).
- Le degré indiqué (sahîh / hasan) est celui affiché par sunnah.com (Darussalam ou Al-Albânî).
- Erreurs corrigées : hadith d'An-Nâs attribué à tort au Prophète ﷺ (parole d'Ibn 'Abbâs) ; versets du Coran présentés comme hadiths (99) ; faits historiques étiquetés « hadith authentique » (85, 105, 106) ; récit sans source (78) ; affirmation sans fondement (89) ; « vendredi soir » au lieu du Dhouhr/'Asr (86) ; texte faible présenté comme sûr (94).
- Sourate 100 : aucun hadith authentique spécifique — l'app l'indique clairement.
- Sourate 103 : pratique des Compagnons rapportée par At-Tabarânî (citée par Ibn Kathîr), présentée comme telle.
- L'affichage n'utilise plus le champ `hadithText` (qui mélangeait un texte et la source d'un autre).

### Classification mecquoise / médinoise
- Référence : Mushaf de Médine (vérifié via l'API Quran.com). Médinoises dans le Juz 'Amma : 98, 99, 110.
- 83, 113, 114 reclassées mecquoises, avec mention des avis divergents.
- Références de contexte corrigées : 83 (Ibn Mâjah 2223, pas An-Nasâ'î), 110 (Ibn 'Abbâs, approuvé par 'Umar — Boukhârî 4970), 113 (Boukhârî 5763 ne cite pas les sourates), 99 (tradition « moitié du Coran » : chaîne faible), 112 (Tirmidhî 3364 : faible).
- Quiz Al-Falaq/An-Nâs : le récit des « 11 nœuds » (Al-Wâhidî) est signalé comme faible.

### Mentions de caution
- Retrait des formulations de fausse certification (« Validé par les Spécialistes », « rectitude absolue », « Protocole de Certification », édition attribuée à une académie).
- Mention honnête : contenu rédigé avec l'aide de l'IA, inspiré des sources classiques, non encore relu par un savant.

### Dictionnaire mot à mot
- 712 gloses mot à mot et 661 entrées du dictionnaire contenaient de l'arabe non traduit (« Le / la ْجِبَالُ »). Toutes corrigées.
- Base : traduction mot à mot de Quran.com (anglais), traduite en français selon le contexte du verset. Texte arabe inchangé (vérifié).

### Interprétation pour notre époque (25 septembre 2026, après-midi)
- Constat : 548 versets sur 566 affichaient la même phrase générique (« Ce verset t'invite à aligner tes intentions… ») et 22 sourates (79 à 92, 95 à 102) un bloc de présentation générique.
- Correction : 548 interprétations propres à chaque verset + 22 blocs de sourate, dans `src/data/verseInsights.json` (numérotation Warsh vérifiée verset par verset sur la traduction de l'app).
- Démarche : partir d'un mot ou d'une image du verset (sens de la racine, contexte) pour arriver à une application concrète pour un jeune. Inspirée de la méthode de Nouman Ali Khan, sans lui attribuer de propos.
- Contrôle automatique : aucun verset manquant, aucune interprétation ni question en double.
- Retirés à la relecture : un hadith faible cité en 95:8, une affirmation de « miracle scientifique » en 96:17.
- Reste à faire : relecture par un enseignant, en priorité pour les sens de racines arabes cités.

### Mot à mot et dictionnaire — deuxième passe (25 septembre 2026, soir)
- Constat : de nombreuses gloses avaient été attribuées par mot arabe sans tenir compte du contexte. Exemples : « parmi les djinns » pour *al-janna* (le Paradis, 79:40 et 81:13), « les tortionnaires criminels de » pour *ashâb* (90:18-19), « des grains et céréales » pour *hubban* (amour, 89:22), « comment ton Seigneur Tout-Puissant a châtié » pour *kayfa* (88:17-20), « Prie donc humblement » pour *fasl* (86:13), « depuis / contre » pour *man / min*, « de ce qu' » pour la négation *mâ*.
- Correction : les 2 308 gloses mot à mot ont été réécrites verset par verset (1 673 modifiées), alignées sur la traduction mot à mot de Quran.com (anglais) et sur le sens du verset. Les 708 entrées du dictionnaire qui recopiaient ces gloses ont suivi, et 23 entrées rédigées à part ont été corrigées (fautes de sens, d'accord ou de frappe).
- Contrôles automatiques : même nombre de gloses que de mots dans chaque verset (2 308), texte arabe inchangé (versets, mots, dictionnaire), build OK.
- Deuxième relecture indépendante (4 relecteurs, 2 308 lignes lues, toutes sourates) : aucun contresens grave ; 16 corrections mineures appliquées (83:12, 88:3, 88:5, 95:5, 98:7, 100:5, accords et graphies de 6 entrées du dictionnaire, 3 fautes dans les traductions 79:35, 98:7, 100:1).

### Reste à faire
- Relecture par un imam ou un enseignant de lecture Warsh (priorité).
- Mot à mot : glose volontairement littérale ; quelques mots admettent plusieurs sens selon les exégètes (ex. 81:6 *sujjirat*, 81:17 *'as'asa*, 90:2 *hillun*), les deux sens sont alors indiqués.
