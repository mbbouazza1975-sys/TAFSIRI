import { TajwidRuleItem, TajwidFamily } from '../types';

export const TAJWID_RULES: TajwidRuleItem[] = [
  {
    id: 'madd',
    name: 'Madd — Son long',
    description: 'Prolongation de la voix (2, 4 ou 6 temps selon le type)',
    subrules: "Madd normal (2 temps), Madd al-Badal (2/4/6 temps chez Warsh), Madd Muttasil & Munfasil (6 temps / Ishbâ' obligatoire chez Warsh), Madd Lâzim (6 temps).",
    colorHex: '#DC2626', // High-contrast crimson red
    darkColorHex: '#F87171',
    badgeClass: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800'
  },
  {
    id: 'ghunna',
    name: 'Ghunna — Résonance nasale',
    description: 'Résonance nasale de 2 temps émise depuis la cavité nasale (Al-Khayshûm)',
    subrules: "Comprend les 4 catégories : 1) Nûn et Mîm redoublés (نّ / مّ), 2) Ikhfâ' (dissimulation devant les 15 lettres dont ك، ق، ص...), 3) Idghâm bi-Ghunna (assimilation nasale devant ي، ن، م، و), et 4) Iqlâb (conversion en Mîm devant ب).",
    colorHex: '#16A34A', // Saturated, vivid emerald green (contrast > 4.5:1)
    darkColorHex: '#4ADE80',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
  },
  {
    id: 'qalqala',
    name: 'Qalqala — Rebond',
    description: 'Secousse sonore vive sur la consonne muette',
    subrules: "Les 5 lettres de Qutb Jad (ق، ط، ب، ج، د) lorsqu'elles portent un sukûn ou lors de l'arrêt en fin de verset.",
    colorHex: '#2563EB', // Sapphire blue
    darkColorHex: '#60A5FA',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
  },
  {
    id: 'tafkhim',
    name: 'Tafkhîm — Emphatique',
    description: 'Épaississement et plénitude de la lettre dans la cavité buccale',
    subrules: "Lettres d'Isti'lâ (ص، ض، ط، ظ، ق، غ، خ), le Lâm du Nom divin (Allâh) précédé d'une fatha ou damma, et le Râ' emphatique selon les règles Warsh.",
    colorHex: '#B45309', // High-contrast amber-bronze (contrast > 5:1 on light)
    darkColorHex: '#FBBF24',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
  },
  {
    id: 'naql',
    name: 'Naql — Spécifique Warsh',
    description: 'Transfert de la voyelle du hamza vers la consonne muette qui précède',
    subrules: "Règle emblématique de la lecture Warsh 'an Nâfi' sans équivalent chez Hafs : le hamza disparaît et sa voyelle glisse sur la lettre précédente (ex. قَدْ أَفْلَحَ → قَدَفْلَحَ, ٱلْأَرْضِ).",
    colorHex: '#0D9488', // Deep turquoise / teal
    darkColorHex: '#2DD4BF',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
  }
];

export interface TajwidSegment {
  text: string;
  rule?: TajwidFamily;
}

export interface TajwidWordToken {
  word: string;
  isSpace: boolean;
  segments: TajwidSegment[];
}

const IKHFA_LETTERS = new Set(['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك']);
const IDGHAM_LETTERS = new Set(['ي', 'ن', 'م', 'و']);
const QALQALA_LETTERS = new Set(['ق', 'ط', 'ب', 'ج', 'د']);
const TAFKHIM_LETTERS = new Set(['ص', 'ض', 'ط', 'ظ', 'ق', 'غ', 'خ']);
const DIACRITICS = new Set(['َ', 'ُ', 'ِ', 'ْ', 'ّ', 'ً', 'ٍ', 'ٌ', 'ٰ', 'ٓ', 'ۭ', 'ۢ', 'ۡ', 'ـ']);

function isVowelled(text: string, idx: number): boolean {
  for (let j = idx + 1; j < text.length; j++) {
    const c = text[j];
    if (c === 'َ' || c === 'ُ' || c === 'ِ' || c === 'ّ') return true;
    if (c === 'ْ' || c === 'ۡ' || c === 'ۢ' || c === 'ۭ') return false;
    if (!DIACRITICS.has(c)) break;
  }
  return false;
}

function getNextConsonant(text: string, fromIdx: number): { char: string; idx: number } | null {
  let j = fromIdx;
  while (j < text.length && (DIACRITICS.has(text[j]) || text[j] === ' ' || text[j] === 'ا' || text[j] === 'ى' || text[j] === 'ٱ')) {
    j++;
  }
  if (j < text.length) return { char: text[j], idx: j };
  return null;
}

// Complete Warsh Tajweed parser operating with full cross-word context
export function parseTajwidVerseToTokens(text: string): TajwidWordToken[] {
  const rules = new Array<TajwidFamily | null>(text.length).fill(null);

  // 1. Naql prefixes in Warsh
  const naqlPrefixes = ['ٱلْأَ', 'ٱلْإِ', 'ٱلْأُ', 'قَدَفْلَحَ', 'مَنَامَنَ', 'ءَالْـَٔـٰنَ', 'ٱلْـَٔاخِرَةِ', 'ٱلْأَرْضِ'];
  for (const prefix of naqlPrefixes) {
    let pos = 0;
    while ((pos = text.indexOf(prefix, pos)) !== -1) {
      for (let k = pos; k < pos + prefix.length; k++) {
        rules[k] = 'naql';
      }
      pos += prefix.length;
    }
  }

  for (let i = 0; i < text.length; i++) {
    if (rules[i]) continue;
    const ch = text[i];

    // 2. Madd: Maddah mark (~ or ٓ), alif khanjariyya (ٰ)
    if (ch === 'ٓ' || ch === 'ٰ' || ch === '~') {
      rules[i] = 'madd';
      continue;
    }

    // 3. Small Meem (Iqlâb mark ۢ or ۭ)
    if (ch === 'ۢ' || ch === 'ۭ') {
      rules[i] = 'ghunna';
      if (i > 0 && text[i - 1] === 'ن') {
        rules[i - 1] = 'ghunna';
      }
      continue;
    }

    // 4. Ghunna (Case A): Shaddah on Nûn or Mîm (نّ or مّ)
    if ((ch === 'ن' || ch === 'م') && (text[i + 1] === 'ّ' || text[i + 2] === 'ّ')) {
      rules[i] = 'ghunna';
      let k = i + 1;
      while (k < text.length && (text[k] === 'ّ' || text[k] === 'َ' || text[k] === 'ُ' || text[k] === 'ِ')) {
        rules[k] = 'ghunna';
        k++;
      }
      i = k - 1;
      continue;
    }

    // 5. Ghunna (Case B): Nûn Sâkinah (Ikhfâ', Idghâm bi-Ghunna, Iqlâb)
    // Covers inside-word (ex: عَنكَ, أَنقَضَ, فَٱنصَبْ, ٱلْإِنسَٰنَ) and across words (ex: مِن شَرِّ, مَن يَقُولُ, مَن وَٰقٍ)
    if (ch === 'ن' && !isVowelled(text, i)) {
      const nextCons = getNextConsonant(text, i + 1);
      if (nextCons) {
        if (IKHFA_LETTERS.has(nextCons.char) || IDGHAM_LETTERS.has(nextCons.char) || nextCons.char === 'ب') {
          rules[i] = 'ghunna';
          let k = i + 1;
          while (k < text.length && (text[k] === 'ْ' || text[k] === 'ۡ' || text[k] === 'ۢ' || text[k] === 'ۭ')) {
            rules[k] = 'ghunna';
            k++;
          }
          // If within the same word, color the recipient consonant to make the Ikhfa visually prominent
          const hasSpace = text.slice(i, nextCons.idx).includes(' ');
          if (!hasSpace) {
            rules[nextCons.idx] = 'ghunna';
            let m = nextCons.idx + 1;
            while (m < text.length && ['َ', 'ُ', 'ِ', 'ّ'].includes(text[m])) {
              rules[m] = 'ghunna';
              m++;
            }
          }
        }
      }
    }

    // 6. Ghunna (Case C): Tanwîn (ً ٍ ٌ) followed by Ikhfâ', Idghâm bi-Ghunna, or Iqlâb (ب)
    if (ch === 'ً' || ch === 'ٍ' || ch === 'ٌ') {
      const nextCons = getNextConsonant(text, i + 1);
      if (nextCons) {
        if (IKHFA_LETTERS.has(nextCons.char) || IDGHAM_LETTERS.has(nextCons.char) || nextCons.char === 'ب') {
          rules[i] = 'ghunna';
          // Color the base letter carrying the tanwin for clear visual cue
          if (i > 0 && !rules[i - 1] && text[i - 1] !== ' ') {
            rules[i - 1] = 'ghunna';
          }
          // If followed by silent alif (ـًا)
          if (i + 1 < text.length && (text[i + 1] === 'ا' || text[i + 1] === 'ى')) {
            rules[i + 1] = 'ghunna';
          }
        }
      }
    }

    // 7. Ghunna (Case D): Mîm Sâkinah (Ikhfâ' Shafawî before ب, Idghâm Shafawî before م)
    if (ch === 'م' && !isVowelled(text, i) && rules[i] === null) {
      const nextCons = getNextConsonant(text, i + 1);
      if (nextCons && (nextCons.char === 'ب' || nextCons.char === 'م')) {
        rules[i] = 'ghunna';
        let k = i + 1;
        while (k < text.length && (text[k] === 'ْ' || text[k] === 'ۡ')) {
          rules[k] = 'ghunna';
          k++;
        }
      }
    }

    // 7. Qalqala: Qutb Jad (ق ط ب ج د) carrying sukûn or stop
    if (QALQALA_LETTERS.has(ch) && rules[i] === null) {
      const hasSukun = text[i + 1] === 'ْ' || text[i + 1] === 'ۡ';
      const isWordEnd = i === text.length - 1 || text[i + 1] === ' ';
      if (hasSukun || (isWordEnd && !isVowelled(text, i))) {
        rules[i] = 'qalqala';
        if (hasSukun) rules[i + 1] = 'qalqala';
      }
    }

    // 8. Tafkhîm: Isti'lâ letters (ص ض ط ظ ق غ خ)
    if (TAFKHIM_LETTERS.has(ch) && rules[i] === null) {
      rules[i] = 'tafkhim';
      let k = i + 1;
      while (k < text.length && ['َ', 'ُ', 'ِ', 'ْ', 'ّ', 'ً', 'ٍ', 'ٌ'].includes(text[k])) {
        rules[k] = 'tafkhim';
        k++;
      }
      i = k - 1;
      continue;
    }
  }

  // Group into words and segments to keep pristine typography
  const tokens: TajwidWordToken[] = [];
  const words = text.split(/(\s+)/);
  let globalCharIdx = 0;

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ word, isSpace: true, segments: [{ text: word }] });
      globalCharIdx += word.length;
      continue;
    }
    const segments: TajwidSegment[] = [];
    let currentRule = rules[globalCharIdx];
    let currentText = '';

    for (let w = 0; w < word.length; w++) {
      const cIdx = globalCharIdx + w;
      const r = rules[cIdx];
      if (r === currentRule) {
        currentText += word[w];
      } else {
        if (currentText.length > 0) {
          segments.push({ text: currentText, ...(currentRule ? { rule: currentRule } : {}) });
        }
        currentRule = r;
        currentText = word[w];
      }
    }
    if (currentText.length > 0) {
      segments.push({ text: currentText, ...(currentRule ? { rule: currentRule } : {}) });
    }
    tokens.push({ word, isSpace: false, segments });
    globalCharIdx += word.length;
  }

  return tokens;
}

// Single-word backwards compatibility wrapper
export function parseTajwidSegments(word: string): TajwidSegment[] {
  const tokens = parseTajwidVerseToTokens(word);
  const segments: TajwidSegment[] = [];
  for (const tok of tokens) {
    segments.push(...tok.segments);
  }
  return segments.length > 0 ? segments : [{ text: word }];
}
