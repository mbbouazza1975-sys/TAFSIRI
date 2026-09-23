import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Volume2,
  Brain,
  Quote,
  CheckCircle2,
  Library,
  FileCheck,
  Compass,
  Info
} from 'lucide-react';
import {
  CANONICAL_SOURCES,
  METHODOLOGICAL_PILLARS,
  STUDY_GROUP_IMPROVEMENTS,
  SURAH_EXPERT_ADVICES,
  WARSH_TRIPLE_CERTIFICATION,
  ReferenceSource
} from '../data/studyGroupData';
import { Surah } from '../types';

interface StudyGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSurah?: Surah | null;
}

type TabKey = 'sources' | 'warsh' | 'pillars' | 'surahAdvice' | 'improvements';

export const StudyGroupModal: React.FC<StudyGroupModalProps> = ({
  isOpen,
  onClose,
  activeSurah
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(activeSurah ? 'surahAdvice' : 'sources');
  const [selectedSource, setSelectedSource] = useState<ReferenceSource | null>(CANONICAL_SOURCES[0]);

  if (!isOpen) return null;

  const currentSurahAdvice = activeSurah ? SURAH_EXPERT_ADVICES[activeSurah.id] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#FAF6EC] dark:bg-[#101E17] text-[#14332A] dark:text-[#FAF6EC] rounded-2xl sm:rounded-3xl border border-[#C9A24B]/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#C9A24B]/20 bg-white/80 dark:bg-[#14261E]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#C9A24B] to-[#997328] text-white flex items-center justify-center shadow-md shrink-0">
              <Library className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-[#14332A] dark:text-[#FAF6EC]">
                  Méthode, Sources & Règles de Récitation
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#C9A24B]/15 text-[#8a5a22] dark:text-[#E6BE65] text-[11px] font-bold border border-[#C9A24B]/30">
                  Corpus Classique & Warsh
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Sources canoniques (Ibn Kathir, As-Sa'di, Lisân al-'Arab) & Voie d'Al-Azraq
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

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/50 p-1.5 sm:p-2 gap-1.5 overflow-x-auto no-scrollbar">
          {activeSurah && (
            <button
              onClick={() => setActiveTab('surahAdvice')}
              className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'surahAdvice'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#C9A24B]" />
              <span>Conseils Sourate {activeSurah.id}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('sources')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'sources'
                ? 'bg-primary text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#C9A24B]" />
            <span>Sources & Références</span>
          </button>

          <button
            onClick={() => setActiveTab('warsh')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'warsh'
                ? 'bg-primary text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            <span>Variantes Warsh ({WARSH_TRIPLE_CERTIFICATION.correctedVariants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pillars')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'pillars'
                ? 'bg-primary text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <Compass className="w-4 h-4 text-[#C9A24B]" />
            <span>Charte & Pédagogie</span>
          </button>

          <button
            onClick={() => setActiveTab('improvements')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'improvements'
                ? 'bg-primary text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Notes de Version</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: Sources & Références */}
          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-sm">
                  <Info className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span>Cadre Scientifique & Références Utilisées</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-semibold">
                  Cette application repose sur les corpus classiques de référence de la tradition musulmane.
                  Le texte coranique et les particularités de récitation suivent la voie d'Al-Azraq d'après l'Imâm Nâfi' de Médine.
                  Les repères lexicaux et étymologiques s'appuient sur les dictionnaires arabes majeurs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2 md:col-span-1">
                  {CANONICAL_SOURCES.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => setSelectedSource(source)}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-3 ${
                        selectedSource?.id === source.id
                          ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-[#14332A] dark:text-[#FAF6EC] shadow-xs'
                          : 'bg-white/60 dark:bg-[#14261E]/50 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800/40'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {source.avatar}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-xs truncate">{source.name}</div>
                        <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{source.badge}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="md:col-span-2 bg-white/80 dark:bg-[#14261E]/80 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 space-y-4">
                  {selectedSource && (
                    <>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#C9A24B] px-2 py-0.5 rounded-md bg-[#C9A24B]/10 border border-[#C9A24B]/30">
                          {selectedSource.badge}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-[#14332A] dark:text-[#FAF6EC] mt-2">
                          {selectedSource.name}
                        </h3>
                        <p className="text-xs font-bold text-stone-600 dark:text-stone-300">
                          {selectedSource.role}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF6EC] dark:bg-[#0E1A14] border border-[#C9A24B]/20 text-xs italic font-semibold leading-relaxed text-stone-700 dark:text-stone-200 flex gap-2.5">
                        <Quote className="w-5 h-5 text-[#C9A24B] shrink-0 opacity-70" />
                        <span>« {selectedSource.quote} »</span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="font-bold text-[#14332A] dark:text-[#FAF6EC]">Champs d'application :</div>
                        <p className="text-stone-600 dark:text-stone-400 font-semibold leading-relaxed">
                          {selectedSource.specialty}
                        </p>
                      </div>

                      <div className="space-y-1.5 text-xs border-t border-stone-200 dark:border-stone-800 pt-3">
                        <div className="font-bold text-[#14332A] dark:text-[#FAF6EC]">Ouvrages & Corpus de référence :</div>
                        <p className="text-stone-600 dark:text-stone-400 font-semibold leading-relaxed">
                          {selectedSource.bio}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Variantes Warsh (sélection) */}
          {activeTab === 'warsh' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/40 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
                  <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{WARSH_TRIPLE_CERTIFICATION.title}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 font-semibold leading-relaxed">
                  {WARSH_TRIPLE_CERTIFICATION.verdict}
                </p>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold pt-1">
                  Référence : <span className="font-bold">{WARSH_TRIPLE_CERTIFICATION.conformanceReference}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Différences de lecture Warsh / Hafs ({WARSH_TRIPLE_CERTIFICATION.correctedVariants.length} exemples)
                </h4>

                {WARSH_TRIPLE_CERTIFICATION.correctedVariants.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#14261E]/70 border border-stone-200 dark:border-stone-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-[#14332A] dark:text-[#FAF6EC]">
                        {item.surah} • Verset {item.verse}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C9A24B]/15 text-[#8a5a22] dark:text-[#E6BE65]">
                        Règle Nâfi'
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40">
                        <div className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 mb-1">
                          Lecture Warsh (Présente dans l'app)
                        </div>
                        <div className="arabic text-base sm:text-lg text-emerald-950 dark:text-emerald-100 text-right">
                          {item.warshReading}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
                        <div className="text-[10px] font-black uppercase text-stone-600 dark:text-stone-400 mb-1">
                          Lecture Hafs (À titre comparatif)
                        </div>
                        <div className="arabic text-base sm:text-lg text-stone-700 dark:text-stone-300 text-right">
                          {item.hafsContrast}
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600 dark:text-stone-300 font-semibold leading-relaxed pt-1">
                      <span className="font-bold text-[#14332A] dark:text-[#FAF6EC]">Justification grammaticale :</span> {item.grammaticalNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Charte & Pédagogie */}
          {activeTab === 'pillars' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF6EC] dark:bg-[#14261E] border border-[#C9A24B]/30 space-y-2">
                <div className="flex items-center gap-2 text-sm font-black text-[#14332A] dark:text-[#FAF6EC]">
                  <Compass className="w-4 h-4 text-[#C9A24B]" />
                  <span>Transparence & Rôle de l'Outil Numérique</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 font-semibold leading-relaxed">
                  Cette application est conçue pour faciliter l'écoute, la mémorisation autonome et la découverte du vocabulaire du Coran chez soi ou en mobilité.
                  Les rubriques contemporaines et d'éveil sont générées avec l'appui d'outils d'intelligence artificielle rigoureusement ancrés dans les sources classiques.
                </p>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 font-bold leading-relaxed">
                  Important : Pour valider formellement une mémorisation (Hifz) et s'assurer de la parfaite prononciation des lettres arabes (Makhârij), rien ne remplace le suivi direct auprès d'un enseignant qualifié (Mou'allim ou Shaykh).
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {METHODOLOGICAL_PILLARS.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/80 dark:bg-[#14261E]/70 border border-stone-200 dark:border-stone-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-sm text-[#14332A] dark:text-[#FAF6EC]">
                        {pillar.category}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {pillar.level}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      ✓ {pillar.verdict}
                    </div>
                    <p className="text-stone-600 dark:text-stone-400 font-semibold leading-relaxed">
                      {pillar.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Conseils par Sourate */}
          {activeTab === 'surahAdvice' && activeSurah && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#14332A] to-[#1E4D3E] text-[#FAF6EC] shadow-md space-y-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#C9A24B]">
                  Fiche Pédagogique Spécifique
                </div>
                <h3 className="text-base sm:text-lg font-black">
                  Sourate {activeSurah.number || activeSurah.id} • {activeSurah.nameFrench || activeSurah.name} ({activeSurah.nameArabic})
                </h3>
                <p className="text-xs text-[#FAF6EC]/85 font-semibold">
                  Conseils d'articulation Warsh, ancrage mémoriel et réflexion contemporaine
                </p>
              </div>

              {currentSurahAdvice ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#14261E]/70 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-black text-sm text-[#14332A] dark:text-[#FAF6EC]">
                      <Volume2 className="w-4 h-4 text-[#C9A24B]" />
                      <span>Règle & Articulation Warsh Spécifique</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 font-semibold leading-relaxed">
                      {currentSurahAdvice.recitationTipWarsh}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#14261E]/70 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-black text-sm text-[#14332A] dark:text-[#FAF6EC]">
                      <Sparkles className="w-4 h-4 text-[#C9A24B]" />
                      <span>Interprétation pour notre époque</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 font-semibold leading-relaxed">
                      {currentSurahAdvice.contemporaryAdoInsight}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#14261E]/70 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-black text-sm text-[#14332A] dark:text-[#FAF6EC]">
                      <Brain className="w-4 h-4 text-[#C9A24B]" />
                      <span>Technique d'Ancrage Mémoriel (Hifz)</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 font-semibold leading-relaxed">
                      {currentSurahAdvice.memorizationTechnique}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#14261E]/70 border border-stone-200 dark:border-stone-800 text-xs space-y-2">
                  <p className="text-stone-700 dark:text-stone-300 font-semibold leading-relaxed">
                    Utilisez le module d'entraînement avec le masquage progressif pour cette sourate. Écoutez le récitateur mot par mot en suivant les règles de Tajwîd illuminées en couleur.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Notes de Version */}
          {activeTab === 'improvements' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Améliorations Validées & Déployées
              </h4>

              {STUDY_GROUP_IMPROVEMENTS.map((imp) => (
                <div
                  key={imp.id}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-[#14261E]/70 border border-stone-200 dark:border-stone-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#14332A] dark:text-[#FAF6EC]">
                      {imp.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      {imp.tag}
                    </span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-300 font-semibold leading-relaxed">
                    {imp.description}
                  </p>
                  <div className="text-[11px] font-bold text-[#8a5a22] dark:text-[#E6BE65] pt-1">
                    Impact : {imp.impact}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/50 flex justify-between items-center text-xs">
          <span className="text-stone-500 font-semibold text-[11px]">
            Juz 'Amma Warsh • Mémorisation & Compréhension
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
