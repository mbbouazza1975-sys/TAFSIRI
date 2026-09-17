import React, { useState } from 'react';
import { X, Palette, BookOpen, CheckCircle2, ShieldCheck, Sparkles, Feather, Compass, Layers } from 'lucide-react';

interface WorkingGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkingGroupsModal: React.FC<WorkingGroupsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'translation'>('design');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#FAF6EC] dark:bg-[#121E18] text-[#14332A] dark:text-[#FAF6EC] rounded-2xl sm:rounded-3xl border border-[#C9A24B]/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Islamic Geometric Accent */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#C9A24B]/20 bg-white/70 dark:bg-[#16261E]/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C9A24B]/20 to-[#14332A]/10 dark:from-[#C9A24B]/30 dark:to-[#0D1812] border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-[#14332A] dark:text-[#FAF6EC]">
                Comités & Groupes de Travail Dédiés
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Garantie d'excellence visuelle, philologique et spirituelle
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/40 p-1.5 sm:p-2 gap-2">
          <button
            onClick={() => setActiveTab('design')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'design'
                ? 'bg-[#14332A] text-[#FAF6EC] dark:bg-[#C9A24B] dark:text-[#14332A] shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Groupe 1 · Design & Ergonomie (UI/UX)</span>
          </button>
          <button
            onClick={() => setActiveTab('translation')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'translation'
                ? 'bg-[#14332A] text-[#FAF6EC] dark:bg-[#C9A24B] dark:text-[#14332A] shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Groupe 2 · Philologie & Exégèse (Tafsîr)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs sm:text-sm leading-relaxed">
          {activeTab === 'design' ? (
            <div className="space-y-6">
              {/* Mission Statement */}
              <div className="p-4 rounded-2xl bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#14332A] dark:text-[#FAF6EC] text-sm">
                    Mission du Groupe de Travail Design
                  </h3>
                  <p className="text-stone-700 dark:text-stone-300 mt-1">
                    Offrir une expérience d'étude coranique sacrée, digne d'une enluminure royale et débarrassée des stéréotypes génériques d'interfaces d'IA. Chaque espace, police et interaction est rigoureusement pensé pour faciliter la mémorisation du Saint Coran.
                  </p>
                </div>
              </div>

              {/* Guidelines Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-[#14332A] dark:text-[#C9A24B] mb-2">
                    <Feather className="w-4 h-4" />
                    <span>Typographie Sacrée & Lisibilité</span>
                  </div>
                  <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Amiri Quran</strong> pour le texte sacré, préservant la splendeur de la calligraphie Warsh sans distorsion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Interlignage généreux (2.2x) empêchant tout chevauchement des diacritiques complexes.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-[#14332A] dark:text-[#C9A24B] mb-2">
                    <Layers className="w-4 h-4" />
                    <span>Surlignage Mot-à-Mot Audio</span>
                  </div>
                  <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Synchronisation temps réel : le mot psalmodié s'illumine d'un éclat or chaud avec micro-élévation subtile.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Mots interactifs : touchez n'importe quel mot pour révéler sa définition dans le Lexique du Chamelier.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Anti-Slop Charter */}
              <div className="p-4 rounded-2xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                <h4 className="font-bold text-[#14332A] dark:text-[#FAF6EC] mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                  <span>Règles de Sobriété Spirituelle (Anti-Slop)</span>
                </h4>
                <p className="text-stone-600 dark:text-stone-400">
                  Refus des gradients multicolores aveuglants, des bordures latérales épaisses et des ombres agressives. Priorité aux contrastes certifiés WCAG AA, aux teintes naturelles (parchemin chaud `#FAF6EC` et vert émeraude nuit `#14332A`) et aux boutons tactiles confortables.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mission Statement */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#14332A] dark:text-[#FAF6EC] text-sm">
                    Mission du Groupe Philologique & Exégétique
                  </h3>
                  <p className="text-stone-700 dark:text-stone-300 mt-1">
                    Garantir la rectitude absolue des explications, la traçabilité des racines arabes et la fidélité des métaphores bédouines (« Dictionnaire du Chamelier ») aux sources classiques incontestées.
                  </p>
                </div>
              </div>

              {/* Corpus of Authority */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#14332A] dark:text-[#FAF6EC] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C9A24B]" />
                  <span>Corpus Lexicographique & Exégétique de Référence</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-800">
                    <p className="font-bold text-[#14332A] dark:text-[#C9A24B]">Lisân al-'Arab (لسان العرب)</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      Chef-d'œuvre monumental d'Ibn Manẓûr réunissant le vocabulaire le plus pur du désert d'Arabie.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-800">
                    <p className="font-bold text-[#14332A] dark:text-[#C9A24B]">Maqâyîs al-Lugha (مقاييس اللغة)</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      D'Ibn Fâris : la référence pour retrouver le noyau sémantique originel de chaque racine trilitère.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-800">
                    <p className="font-bold text-[#14332A] dark:text-[#C9A24B]">Le Lexique du Chameau (معجم الإبل)</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      Édité par l'Académie Mondiale du Roi Salmane (KSGAAL) pour l'encyclopédie du patrimoine bédouin.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#16261E] border border-stone-200 dark:border-stone-800">
                    <p className="font-bold text-[#14332A] dark:text-[#C9A24B]">Tafsîrs Authentiques d'Ibn Kathîr & As-Sa'dî</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                      Vérification systématique du sens spirituel, du contexte de révélation (Asbâb an-Nuzûl) et des hadiths.
                    </p>
                  </div>
                </div>
              </div>

              {/* Protocol for the Camel Driver Dictionary */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <h4 className="font-bold text-[#14332A] dark:text-amber-200">
                  Protocole de Certification « Dictionnaire du Chamelier »
                </h4>
                <p className="text-stone-700 dark:text-stone-300">
                  Chaque terme est décortiqué selon 4 paliers immuables :
                </p>
                <ol className="list-decimal list-inside space-y-1 text-stone-600 dark:text-stone-300 text-xs sm:text-sm pl-2">
                  <li><strong>La Racine Trilitère</strong> (الجذر) extraite selon les règles de la morphologie arabe.</li>
                  <li><strong>Le Geste Concret du Bédouin</strong> (conduite de la chamelle, point d'eau, braises dans le creux des pierres, caravane de nuit).</li>
                  <li><strong>L'Élévation Métaphysique Coranique</strong> (comment la Révélation transfigure ce geste en rappel spirituel).</li>
                  <li><strong>L'Image Mentale Pédagogique</strong> pour ancrer le verset dans la mémoire immédiate.</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-[#16261E]/50 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Vérification continue par les deux comités
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#14332A] hover:bg-[#1F4D3D] text-[#FAF6EC] dark:bg-[#C9A24B] dark:hover:bg-[#d6b059] dark:text-[#14332A] font-bold text-xs transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
