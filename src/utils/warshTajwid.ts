/**
 * Warsh 'an Nâfi' Tajwîd Formatter
 * Accurately highlights Madd, Ghunna, Qalqala, Tafkhîm, and Naql (Transfert Warsh).
 */

// Inclut les signes propres au Mushaf Warsh KFGQPC (tanwîn, imâla, hamzat wasl, pauses…)
const DIACRITICS = "\\u064B-\\u065F\\u0670\\u06D6-\\u06ED";
const isDiacritic = (char: string) => RegExp(`[${DIACRITICS}]`).test(char);
const QALQALA = "قطبجد";
const TAFKHIM = "خصضطظغق";
const SUKUN = "ْ";
const SHADDAH = "ّ";
const MADD_SIGN = "ٓ";
const TANWIN = "ًٌٍٖٗٞ";
const FATHA = "َ";
const DAMMA = "ُ";
const KASRA = "ِ";
const HAMZAS = "أإؤئءآ";
const HARF_MADD = "اويىے";
const SHORT_VOWELS = "َُِ";
const DROPPED_HAMZA = "۟";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function hasNaql(currentWord: string, nextWord: string): boolean {
  if (!currentWord || !nextWord) return false;
  // Mushaf Warsh KFGQPC : le naql est déjà écrit (ex. « مَنُ ا۟وتِيَ ») — alif initial portant ۟
  const nextChars = [...nextWord];
  if (nextChars[0] === "ا" && nextChars[1] === DROPPED_HAMZA) return true;
  const charsWithoutDiacritics = [...currentWord].filter(c => !isDiacritic(c));
  const lastBase = charsWithoutDiacritics.pop() ?? "";
  if (!currentWord.endsWith(SUKUN) || HARF_MADD.includes(lastBase)) return false;
  const firstNext = [...nextWord][0] ?? "";
  return HAMZAS.includes(firstNext) ? isDiacritic([...nextWord][1] ?? "") : false;
}

export function formatWarshWord(word: string, opts: { naqlStart?: boolean; naqlEnd?: boolean } = {}): string {
  const clusters: string[] = [];
  for (const char of word) {
    if (isDiacritic(char) && clusters.length > 0) {
      clusters[clusters.length - 1] += char;
    } else {
      clusters.push(char);
    }
  }

  const rules: (string | null)[] = clusters.map(() => null);

  clusters.forEach((cluster, idx) => {
    const base = cluster[0];
    const diacs = cluster.slice(1);
    const prevDiacs = (clusters[idx - 1] ?? "").slice(1);
    const isEnd = idx === clusters.length - 1;

    if (TAFKHIM.includes(base)) rules[idx] = "tafkhim";
    if (base === "ر" && !diacs.includes(KASRA)) rules[idx] = "tafkhim";
    if (QALQALA.includes(base) && (diacs.includes(SUKUN) || (isEnd && !diacs))) rules[idx] = "qalqala";
    if ((base === "ن" || base === "م") && (diacs.includes(SHADDAH) || diacs.includes(SUKUN))) rules[idx] = "ghunna";
    if ([...TANWIN].some(t => diacs.includes(t))) rules[idx] = "ghunna";
    if (base === "آ" || diacs.includes(MADD_SIGN)) rules[idx] = "madd";
    if (base === "ا" && !diacs && prevDiacs.includes(FATHA)) rules[idx] = "madd";
    if (base === "و" && !diacs && prevDiacs.includes(DAMMA)) rules[idx] = "madd";
    if (base === "ى" && !diacs && prevDiacs.includes(KASRA)) rules[idx] = "madd";
    if ((base === "ي" || base === "ے") && !diacs && prevDiacs.includes(KASRA)) rules[idx] = "madd";
    if (base === "ٰ") rules[idx] = "madd";
  });

  // Naql à l'intérieur de l'article (Mushaf Warsh KFGQPC : « اَ۬لَارْضَ », « اَ۬لِانسَٰنُ », « وَالَارْضِ »)
  clusters.forEach((cluster, idx) => {
    const next = clusters[idx + 1];
    const prev = clusters[idx - 1];
    if (
      cluster[0] === "ل" && !cluster.includes(SHADDAH) && [...SHORT_VOWELS].some(v => cluster.includes(v)) &&
      next === "ا" && prev && prev[0] === "ا"
    ) {
      rules[idx] = "naql";
      rules[idx + 1] = "naql";
    }
  });

  if (opts.naqlEnd && rules.length > 0) rules[rules.length - 1] = "naql";
  if (opts.naqlStart && rules.length > 0) rules[0] = "naql";

  let out = "";
  let i = 0;
  while (i < clusters.length) {
    const rule = rules[i];
    let j = i;
    while (j < clusters.length && rules[j] === rule) j++;
    const slice = escapeHtml(clusters.slice(i, j).join(""));
    out += rule ? `<span class="w-${rule}">${slice}</span>` : slice;
    i = j;
  }
  return out;
}

export function formatWarshVerseHtml(
  verseText: string,
  tajwidEnabled: boolean = true,
  verseNumber?: number,
  highlightedWordIdx?: number | null
): string {
  const clean = verseText.replace(/<[^>]*>/g, "").trim();
  const words = clean.split(/\s+/);
  return words
    .map((word, idx) => {
      const next = words[idx + 1] ?? "";
      const prev = words[idx - 1] ?? "";
      const formatted = tajwidEnabled
        ? formatWarshWord(word, {
            naqlEnd: hasNaql(word, next),
            naqlStart: hasNaql(prev, word)
          })
        : escapeHtml(word);
      const cleanWord = word.replace(/[\u064B-\u065F\u0670]/g, "").trim();
      const isHl = typeof highlightedWordIdx === 'number' && highlightedWordIdx === idx;
      return `<span class="w-word qw${isHl ? ' hl' : ''}" data-word-idx="${idx}" data-raw="${escapeHtml(cleanWord)}" data-verse="${verseNumber || ''}">${formatted}</span>`;
    })
    .join(" ");
}


/** HTML de chaque mot d'un verset (avec contexte de naql entre mots) — utilisé par la vue Mushaf continu. */
export function formatWarshWordsHtml(verseText: string, tajwidEnabled: boolean = true): string[] {
  const words = verseText.replace(/<[^>]*>/g, "").trim().split(/\s+/);
  return words.map((word, idx) =>
    tajwidEnabled
      ? formatWarshWord(word, {
          naqlEnd: hasNaql(word, words[idx + 1] ?? ""),
          naqlStart: hasNaql(words[idx - 1] ?? "", word)
        })
      : escapeHtml(word)
  );
}
