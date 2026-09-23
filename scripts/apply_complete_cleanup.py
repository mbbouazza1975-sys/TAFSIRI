# scripts/apply_complete_cleanup.py
import json
import re
from scripts.lexicon_data_part1 import LEXICON_PART1
from scripts.lexicon_data_part2 import LEXICON_PART2
from scripts.lexicon_data_part3 import LEXICON_PART3
from scripts.lexicon_data_part4 import LEXICON_PART4
from scripts.curated_tafsirs_part1 import TAFSIR_PART1
from scripts.curated_tafsirs_part2 import TAFSIR_PART2
from scripts.curated_tafsirs_part3 import TAFSIR_PART3

# 1. Combine all lexicon entries
LEXICON = {
    **LEXICON_PART1,
    **LEXICON_PART2,
    **LEXICON_PART3,
    **LEXICON_PART4,
}

# 2. Combine all curated tafsirs
CURATED_TAFSIRS = {
    **TAFSIR_PART1,
    **TAFSIR_PART2,
    **TAFSIR_PART3,
}

STOP_MARKS = set(['ۖ', 'ۗ', 'ۘ', 'ۙ', 'ۚ', 'ۛ', 'ۜ', '۞', '۩', '،', '؛', '؟', '۔'])

def normalize_arabic(text):
    # Normalize dagger alif \u0670, alif wasla \u0671 to regular alif \u0627
    t = text.replace('\u0670', 'ا').replace('\u0671', 'ا').replace('ٱ', 'ا').replace('ىٰ', 'ى').replace('ـٰ', 'ا')
    # strip tashkeel
    t = re.sub(r'[\u064B-\u065F\u06D6-\u06ED\u0610-\u061A]', '', t)
    return t

# Build normalized lookup dictionary for fuzzy matches
NORM_LEXICON = {}
for k, v in LEXICON.items():
    nk = normalize_arabic(k)
    if nk not in NORM_LEXICON:
        NORM_LEXICON[nk] = v

with open('src/data/surahsData.json', 'r', encoding='utf-8') as f:
    surahs = json.load(f)

total_verses = 0
updated_tafsir_count = 0
cleaned_meaning_count = 0
unresolved_words_before = 0
unresolved_words_after = 0
empty_words_filtered = 0

for s in surahs:
    s_id = s['id']
    for v in s['verses']:
        total_verses += 1
        v_num = v['number']

        # A. Clean meaning
        meaning = v.get('meaning', '')
        if "Ce verset rappelle avec clarté et bienveillance la portée morale et spirituelle de nos actes." in meaning:
            meaning = meaning.replace("Ce verset rappelle avec clarté et bienveillance la portée morale et spirituelle de nos actes.", "").strip()
            meaning = meaning.rstrip(" .—–-")
            cleaned_meaning_count += 1
        if meaning.startswith("En français courant :"):
            meaning = meaning.replace("En français courant :", "").strip()
        if not meaning:
            meaning = v.get('translation', '').strip()
        v['meaning'] = meaning

        # B. Clean sens and tafsir
        key = (s_id, v_num)
        if key in CURATED_TAFSIRS:
            curated = CURATED_TAFSIRS[key]
            v['sens'] = curated['sens']
            v['tafsir'] = curated['tafsir']
            v['explanation'] = curated['tafsir']
            updated_tafsir_count += 1
        else:
            # Check if existing tafsir had the boilerplate string
            curr_tafsir = v.get('tafsir', '')
            if "l'exégèse traditionnelle (comme celles" in curr_tafsir or not curr_tafsir.strip():
                print(f"Warning: Unexpected boilerplate in ({s_id}, {v_num}) not in curated!")
            else:
                # Synchronize explanation with genuine tafsir
                v['explanation'] = curr_tafsir

        # Make sure v.sens exists
        if not v.get('sens'):
            v['sens'] = v.get('nameTranslit', f"Verset {v_num}")

        # C. Clean words
        cleaned_words = []
        for w in v.get('words', []):
            raw_ar = w.get('ar', '').strip()
            # remove stop marks
            ar = ''.join(c for c in raw_ar if c not in STOP_MARKS).strip()
            if not ar:
                empty_words_filtered += 1
                continue

            fr = w.get('fr', '').strip()
            is_unresolved = (not fr or fr.startswith('Mot :') or fr == ar)
            if is_unresolved:
                unresolved_words_before += 1
                # Try direct lookup
                if ar in LEXICON:
                    fr = LEXICON[ar]
                else:
                    # Try normalized lookup
                    nar = normalize_arabic(ar)
                    if nar in NORM_LEXICON:
                        fr = NORM_LEXICON[nar]
                    else:
                        # Try stripping prefixes
                        found = False
                        for p, p_fr in [('و', 'et '), ('ف', 'alors '), ('ب', 'par '), ('ل', 'pour '), ('ك', 'comme ')]:
                            if nar.startswith(p) and nar[len(p):] in NORM_LEXICON:
                                fr = p_fr + NORM_LEXICON[nar[len(p):]]
                                found = True
                                break
                        if not found:
                            unresolved_words_after += 1
                            print(f"STILL UNRESOLVED: ({s_id}, v{v_num}) -> '{ar}'")

            cleaned_words.append({'ar': ar, 'fr': fr})
        v['words'] = cleaned_words

print(f"=== CLEANUP SUMMARY ===")
print(f"Total verses processed: {total_verses}")
print(f"Verses with authentic curated tafsirs inserted: {updated_tafsir_count}")
print(f"Verses with sanitized meaning (boilerplate removed): {cleaned_meaning_count}")
print(f"Empty/pause mark tokens eliminated: {empty_words_filtered}")
print(f"Unresolved words before: {unresolved_words_before}")
print(f"Unresolved words after: {unresolved_words_after}")

# Save the pristine dataset
with open('src/data/surahsData.json', 'w', encoding='utf-8') as f:
    json.dump(surahs, f, ensure_ascii=False, indent=2)

print("Saved updated src/data/surahsData.json successfully!")
