# Charte & Recommandations du Groupe de Travail Design & Expérience Utilisateur (UI/UX)

## 1. Vision Artistique & Philosophie
Le Groupe de Travail Design a pour mission d’élever l'application vers un standard esthétique digne d’un manuscrit coranique d'art contemporain, en respectant les impératifs de sobriété spirituelle (« Anti-Slop ») :
- **Absence de clichés génériques** : Bannissement absolu des dégradés violets/bleus saturés, du glassmorphism flou illisible et des bordures épaisses superflues.
- **Harmonie chromatique noble** :
  - *Vert Nuit Impérial* (`#14332A` / `#0E2A20`) : Référence aux reliures traditionnelles des Mushafs.
  - *Or Ciselé Antique* (`#C9A24B` / `#E6BE65`) : Dorure d'enluminure pour les numéros de versets, accents actifs et boutons principaux.
  - *Parchemin Chaleureux* (`#FAF6EC` / `#F5EFE0`) : Écrin reposant pour les yeux évitant le blanc pur agressif.

## 2. Typographie & Lisibilité Coranique
- **Texte Arabe Sacré** : Police *Amiri Quran* avec rendu Uthmani et ligatures Warsh natives.
- **Taille adaptable** : Échelle dynamique (de 24px à 48px) avec interlignage calculé (`leading-loose`, 2.2x la taille du corps) pour éviter tout chevauchement des diacritiques (chaddah, tanwîn, madd).
- **Texte Français & Interface** : *Plus Jakarta Sans* pour une lisibilité géométrique et contemporaine.

## 3. Système de Surlignage Mot-à-Mot (Karaoké Audio)
- **Fluidité 60fps** : Détection temps réel indexée sur la progression audio.
- **Contraste & Éclat Doré** :
  - Le mot actif est enveloppé d’un halo lumineux ambré (`rgba(201, 162, 75, 0.38)`), bordé d’un liséré or fin de 2px.
  - Une micro-élévation (`translateY(-1px) scale(1.04)`) met en exergue le mot récité sans décaler les lignes du texte coranique.
- **Interactivité** : Chaque mot est cliquable pour révéler sa racine et son sens dans le *Dictionnaire du Chamelier*.

## 4. Ratios d'Espacement & Accessibilité (WCAG AA)
- Règle mathématique des bordures intérieures : `Rayon intérieur = Rayon extérieur - Espacement`.
- Touch targets sur mobile supérieures ou égales à 44x44px.
- Contraste minimal texte/fond de 4.5:1 rigoureusement maintenu en mode clair comme en mode sombre.
