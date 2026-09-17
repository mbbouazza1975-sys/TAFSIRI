import React, { useState } from 'react';
import { BookMarked, Sparkles, Volume2, Info, CheckCircle2 } from 'lucide-react';
import { TAJWID_RULES } from '../data/tajwid';
import { TajwidFamily } from '../types';
import { TajwidHighlighter } from '../components/TajwidHighlighter';
import { useAudio } from '../context/AudioContext';

export const TajwidGuideView: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<TajwidFamily>('naql');
  const { playSurah } = useAudio();

  const activeRule = TAJWID_RULES.find(r => r.id === selectedRuleId) || TAJWID_RULES[0];

  const ruleExamples: Record<TajwidFamily, { title: string; surahId: number; verseText: string; verseTranslation: string; explanation: string }[]> = {
    naql: [
      {
        title: 'Naql dans la Sourate Al-Fajr (89:10)',
        surahId: 89,
        verseText: 'وَفِرْعَوْنَ ذِى ٱلْأَوْتَادِ',
        verseTranslation: 'Et avec Pharaon, le pourvoyeur d’armées (aux pieux) ?',
        explanation: 'En récitation Warsh, la voyelle du hamza glisse sur le lâm muet précédent (prononcé « dhilawtâd »).'
      },
      {
        title: 'Naql dans la Sourate An-Naba (78:6)',
        surahId: 78,
        verseText: 'أَلَمْ نَجْعَلِ ٱلْأَرْضَ مِهَـٰدًا',
        verseTranslation: 'N’avons-Nous pas étendu la terre telle une couche ?',
        explanation: 'Le mot ٱلْأَرْضِ est prononcé avec transfert de la fatha sur le lâm : « al-arda » sans rupture glottale.'
      },
      {
        title: 'Naql dans la Sourate Al-Kawthar (108:3)',
        surahId: 108,
        verseText: 'إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ',
        verseTranslation: 'C’est celui qui te hait qui sera sans postérité.',
        explanation: 'Le mot ٱلْأَبْتَرُ est lu avec naql Warsh caractéristique : la hamza s’efface au profit de la voyelle précédente.'
      }
    ],
    madd: [
      {
        title: 'Madd Muttasil & Munfasil à 6 temps (Ishbâ\')',
        surahId: 78,
        verseText: 'وَأَنزَلْنَا مِنَ ٱلْمُعْصِرَٰتِ مَآءً ثَجَّاجًا',
        verseTranslation: 'Des nuages, Nous avons fait descendre une eau abondante.',
        explanation: 'Dans le mot « مَآءً », la prolongation porte un madd obligatoire étiré à 6 temps complets chez l’Imam Warsh.'
      },
      {
        title: 'Madd al-Badal (2, 4 ou 6 temps)',
        surahId: 103,
        verseText: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ',
        verseTranslation: 'À l’exception de ceux qui ont cru et accompli de bonnes œuvres...',
        explanation: 'Le mot « ءَامَنُوا۟ » (Badal) peut être lu en 2 temps (qasr), 4 temps (tawassut - le plus réputé), ou 6 temps (toul).'
      }
    ],
    ghunna: [
      {
        title: 'Ghunna sur Mîm et Nûn redoublés (نّ / مّ)',
        surahId: 114,
        verseText: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ',
        verseTranslation: 'Dis : Je cherche protection auprès du Seigneur des hommes.',
        explanation: 'Sur « ٱلنَّاسِ », le nûn avec shaddah exige une résonance nasale continue de 2 temps émise depuis la cavité nasale.'
      },
      {
        title: 'Idghâm bi-ghunna (Tanween devant Waw)',
        surahId: 111,
        verseText: 'تَبَّتْ يَدَآ أَبِى لَهَبٍ وَتَبَّ',
        verseTranslation: 'Périssent les deux mains d’Abou Lahab, et que lui-même périsse !',
        explanation: 'Sur « لَهَبٍ وَتَبَّ », le tanween fusionne dans le Waw avec une ghunna nasale distincte.'
      }
    ],
    qalqala: [
      {
        title: 'Qalqala sur Baa et Daal (ب / د)',
        surahId: 112,
        verseText: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ • ٱللَّهُ ٱلصَّمَدُ • لَمْ يَلِدْ وَلَمْ يُولَدْ',
        verseTranslation: 'Dis : Il est Allah, l’Un. Allah, Le Seul à être imploré. Il n’a pas engendré, n’a pas été engendré.',
        explanation: 'À chaque fin de verset, l’arrêt sur le dâl produit un rebond net et éclatant (Qalqala Kubrâ).'
      },
      {
        title: 'Qalqala sur Qaf et Jim (ق / ج)',
        surahId: 85,
        verseText: 'وَٱلسَّمَآءِ ذَاتِ ٱلْبُرُوجِ',
        verseTranslation: 'Par le ciel aux constellations !',
        explanation: 'L’arrêt sur le jîm de « ٱلْبُرُوجِ » fait rebondir la consonne muette avec vivacité.'
      }
    ],
    tafkhim: [
      {
        title: 'Lettres d’Isti’lâ et Lâm de Majesté',
        surahId: 112,
        verseText: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
        verseTranslation: 'Dis : Il est Allah, l’Un.',
        explanation: 'Le Qaf (ق) et le Lâm du Nom divin (Allâh) précédé d’une damma sont prononcés avec pleine emphase dans la cavité buccale.'
      },
      {
        title: 'Particularités du Râ\' chez Warsh (Tarqîq & Exceptions)',
        surahId: 89,
        verseText: 'إِرَمَ ذَاتِ ٱلْعِمَادِ',
        verseTranslation: 'Iram, la cité aux colonnes monumentales ?',
        explanation: 'Dans le nom propre « إِرَمَ », bien que le râ\' soit précédé d’une kasra, il reste emphatique (tafkhîm) car c’est un nom étranger (non-arabe).'
      }
    ]
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-32">
      {/* Header Banner */}
      <div className="w-full rounded-3xl bg-[#1F4D3D] text-[#FAF6EC] p-5 sm:p-7 border border-[#C9A24B]/30 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B] text-[#14332A] text-xs font-bold uppercase tracking-wider shadow-sm">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Guide Pédagogique du Tajwîd</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Les 5 Familles de Règles en Récitation Warsh
        </h1>
        <p className="text-xs sm:text-sm text-[#FAF6EC]/80 leading-relaxed max-w-2xl">
          Code couleur à fort contraste spécialement calibré pour le Juz 'Amma selon la transmission de l'Imam Warsh 'an Nâfi' de Médine.
        </p>
      </div>

      {/* 5 Family Tabs */}
      <div className="relative w-full overflow-hidden">
        {/* Mobile fade cue */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#FAF6EC] dark:from-[#0F1715] to-transparent sm:hidden z-10" />

        <div className="flex items-stretch gap-2 overflow-x-auto scrollbar-none pb-2 sm:grid sm:grid-cols-5 sm:gap-2.5">
          {TAJWID_RULES.map(rule => {
            const isSelected = selectedRuleId === rule.id;
            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRuleId(rule.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 shrink-0 min-w-[145px] sm:min-w-0 ${
                  isSelected
                    ? 'bg-white dark:bg-[#16221C] border-[#C9A24B] shadow-md ring-1 ring-[#C9A24B]'
                    : 'bg-white/70 dark:bg-[#16221C]/60 border-[#14332A]/10 dark:border-stone-800 hover:border-[#C9A24B]/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    style={{ backgroundColor: rule.colorHex }}
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm ring-1 ring-black/10"
                  />
                  <span className="text-xs font-bold truncate text-[#14332A] dark:text-[#FAF6EC]">
                    {rule.name.split('—')[0].trim()}
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 leading-tight">
                  {rule.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Card of Selected Rule */}
      <div className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 shadow-md space-y-6">
        {/* Header of rule */}
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <span
              style={{ backgroundColor: activeRule.colorHex }}
              className="w-6 h-6 rounded-xl shadow-md shrink-0"
            />
            <div>
              <h2 className="text-xl font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
                {activeRule.name}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {activeRule.description}
              </p>
            </div>
          </div>

          <span className={`text-xs px-3 py-1 rounded-full font-bold border ${activeRule.badgeClass}`}>
            Code couleur officiel
          </span>
        </div>

        {/* Subrules description */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
            Détail des règles regroupées :
          </span>
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {activeRule.subrules}
          </p>
        </div>

        {/* Real Examples from Juz 'Amma */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-[#14332A] dark:text-[#FAF6EC] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A24B]" />
            <span>Exemples concrets dans le Juz 'Amma :</span>
          </h3>

          <div className="space-y-3">
            {ruleExamples[selectedRuleId]?.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-[#121A16] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14332A] dark:text-[#C9A24B]">
                    {ex.title}
                  </span>
                  <button
                    onClick={() => playSurah(ex.surahId)}
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-[#C9A24B]/20 text-[#C9A24B] hover:bg-[#C9A24B]/30 font-semibold"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Écouter la sourate {ex.surahId}</span>
                  </button>
                </div>

                <div className="py-2 text-right">
                  <TajwidHighlighter
                    text={ex.verseText}
                    enabled={true}
                    fontSize={30}
                  />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic">
                  « {ex.verseTranslation} »
                </p>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 text-xs text-stone-600 dark:text-stone-400">
                  <strong className="text-stone-800 dark:text-stone-200">Application Warsh : </strong>
                  {ex.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
