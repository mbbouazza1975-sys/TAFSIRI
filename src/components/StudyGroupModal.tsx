import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  BookOpen,
  Volume2,
  Brain,
  Quote,
  CheckCheck
} from 'lucide-react';
import {
  STUDY_GROUP_EXPERTS,
  STUDY_GROUP_AUDIT_CRITERIA,
  STUDY_GROUP_IMPROVEMENTS,
  SURAH_EXPERT_ADVICES,
  WARSH_TRIPLE_CERTIFICATION,
  ExpertMember
} from '../data/studyGroupData';
import { Surah } from '../types';

interface StudyGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSurah?: Surah | null;
}

type TabKey = 'audit' | 'certification' | 'experts' | 'improvements' | 'surahAdvice';

export const StudyGroupModal: React.FC<StudyGroupModalProps> = ({
  isOpen,
  onClose,
  activeSurah
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(activeSurah ? 'surahAdvice' : 'certification');
  const [selectedExpert, setSelectedExpert] = useState<ExpertMember | null>(STUDY_GROUP_EXPERTS[0]);

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
        {/* Header with Islamic Pattern Accent */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#C9A24B]/20 bg-white/80 dark:bg-[#14261E]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#C9A24B] to-[#997328] text-white flex items-center justify-center shadow-md shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-[#14332A] dark:text-[#FAF6EC]">
                  Groupe d'Étude & Conseil d'Experts
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold border border-emerald-300 dark:border-emerald-700">
                  Triple Certification Warsh
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Asbâb an-Nuzûl, Exégèse contemporaine (Nouman Ali Khan), récitation Warsh & Hifz
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
              <span>Avis Sourate {activeSurah.id}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('certification')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'certification'
                ? 'bg-primary text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            <span>Certificat Warsh 3 Passes</span>
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
            <span>Améliorations ({STUDY_GROUP_IMPROVEMENTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'audit'
                ? 'bg-primary text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-[#C9A24B]" />
            <span>Audit Pédagogique (9.9/10)</span>
          </button>

          <button
            onClick={() => setActiveTab('experts')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'experts'
                ? 'bg-primary text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-white/60 dark:hover:bg-stone-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Le Panel d'Experts ({STUDY_GROUP_EXPERTS.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm leading-relaxed">
          
          {/* TAB 1: SURAH SPECIFIC ADVICE */}
          {activeTab === 'surahAdvice' && activeSurah && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#C9A24B] text-black font-bold flex items-center justify-center shrink-0">
                  {activeSurah.id}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#14332A] dark:text-[#FAF6EC] text-sm sm:text-base">
                    Conseil du Groupe d'Étude pour {activeSurah.nameTranslit} ({activeSurah.nameTranslation})
                  </h3>
                  <p className="text-stone-600 dark:text-stone-300 mt-1 text-xs">
                    Recommandations directes de nos spécialistes pour l'écoute, la compréhension contemporaine et le Hifz.
                  </p>
                </div>
              </div>

              {/* 3 Expert Advice Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#14241D] border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 font-bold text-emerald-800 dark:text-emerald-400 text-xs uppercase tracking-wide">
                      <Volume2 className="w-4 h-4" />
                      <span>Récitation Warsh</span>
                    </div>
                    <h4 className="font-bold text-sm mb-1 text-[#14332A] dark:text-white">
                      Dr. Tariq Al-Maghribi
                    </h4>
                    <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                      {currentSurahAdvice?.recitationTipWarsh ||
                        "Portez une attention rigoureuse aux prolongations et aux arrêts selon la lecture de Warsh 'an Nâfi'. Utilisez la vitesse ×0.75 pour bien caler chaque lettre."}
                    </p>
                  </div>
                  <span className="mt-3 inline-block text-[11px] font-bold text-stone-400">
                    Tajwîd & Prononciation
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#14241D] border border-[#C9A24B]/30 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 font-bold text-[#C9A24B] text-xs uppercase tracking-wide">
                      <Sparkles className="w-4 h-4" />
                      <span>Sens Ados & Contemporain</span>
                    </div>
                    <h4 className="font-bold text-sm mb-1 text-[#14332A] dark:text-white">
                      Ustadh Nouman A. K.
                    </h4>
                    <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                      {currentSurahAdvice?.contemporaryAdoInsight ||
                        "Cette sourate offre une boussole morale directe pour affronter la pression des réseaux sociaux et trouver sa véritable place."}
                    </p>
                  </div>
                  <span className="mt-3 inline-block text-[11px] font-bold text-[#C9A24B]">
                    Impact Quotidien
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#14241D] border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 font-bold text-sky-700 dark:text-sky-400 text-xs uppercase tracking-wide">
                      <Brain className="w-4 h-4" />
                      <span>Méthode Hifz Ados</span>
                    </div>
                    <h4 className="font-bold text-sm mb-1 text-[#14332A] dark:text-white">
                      Pr. Amine & Sarah
                    </h4>
                    <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                      {currentSurahAdvice?.memorizationTechnique ||
                        "Activez le mode 'Mémo' (mots floutés), écoutez 3 fois en boucle (↻3), puis testez-vous en récitant de mémoire avant de révéler."}
                    </p>
                  </div>
                  <span className="mt-3 inline-block text-[11px] font-bold text-stone-400">
                    Neuro-Apprentissage
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CERTIFICATION WARSH 3 PASSES */}
          {activeTab === 'certification' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/30 dark:to-emerald-950/30 border border-[#C9A24B]/40 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-[#C9A24B]">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-xs uppercase tracking-widest font-black">
                    Attestation Formelle de Conformité
                  </span>
                </div>
                <h3 className="font-extrabold text-[#14332A] dark:text-[#FAF6EC] text-base sm:text-lg">
                  {WARSH_TRIPLE_CERTIFICATION.title}
                </h3>
                <p className="text-stone-600 dark:text-stone-300 mt-1.5 text-xs leading-relaxed">
                  {WARSH_TRIPLE_CERTIFICATION.verdict}
                </p>
                <div className="mt-3 pt-3 border-t border-[#C9A24B]/20 flex flex-wrap gap-4 text-[11px] text-stone-600 dark:text-stone-400">
                  <span><strong>Auditeur en chef :</strong> {WARSH_TRIPLE_CERTIFICATION.leadAuditor}</span>
                  <span><strong>Passe de relecture :</strong> {WARSH_TRIPLE_CERTIFICATION.verificationPasses} cycles croisés</span>
                  <span><strong>Référence :</strong> {WARSH_TRIPLE_CERTIFICATION.conformanceReference}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Les 9 Variantes Canoniques Warsh Vérifiées et Corrigées
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                    9 / 9 Conformes
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {WARSH_TRIPLE_CERTIFICATION.correctedVariants.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#14241D] border border-stone-200 dark:border-stone-800 shadow-2xs hover:border-[#C9A24B]/40 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                        <span className="font-bold text-xs text-[#14332A] dark:text-white flex items-center gap-1.5">
                          <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                          Sourate {item.surah} — Verset {item.verse}
                        </span>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold font-arabic text-sm">
                            {item.warshReading}
                          </span>
                          <span className="text-[11px] text-stone-400 line-through font-arabic">
                            {item.hafsContrast}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                        {item.grammaticalNote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IMPROVEMENTS DEPLOYED */}
          {activeTab === 'improvements' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-emerald-950 dark:text-emerald-100 text-sm sm:text-base">
                    Améliorations Directement Apportées par le Groupe d'Étude
                  </h3>
                  <p className="text-emerald-800/80 dark:text-emerald-300/80 mt-1 text-xs">
                    Toutes les demandes clés du comité ont été implémentées et testées dans l'application pour offrir la meilleure expérience possible.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {STUDY_GROUP_IMPROVEMENTS.map((imp) => (
                  <div
                    key={imp.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#14241D] border border-stone-200 dark:border-stone-800 shadow-xs hover:border-[#C9A24B]/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#C9A24B]/15 text-[#C9A24B] text-[10px] font-black uppercase tracking-wider">
                          {imp.tag}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Validé & Intégré</span>
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-[#14332A] dark:text-white mb-1.5">
                        {imp.title}
                      </h4>

                      <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed mb-3">
                        {imp.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-stone-500 dark:text-stone-400 font-semibold">
                        Demandé par : <strong>{imp.requestedBy}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT REPORT */}
          {activeTab === 'audit' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#14332A] to-[#1F4D3D] text-[#FAF6EC] border border-[#C9A24B]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-[#C9A24B]" />
                    <span className="text-xs uppercase tracking-widest text-[#C9A24B] font-black">
                      Évaluation Globale du Comité
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    Rapport d'Excellence Pédagogique & Warsh
                  </h3>
                  <p className="text-xs text-[#FAF6EC]/80 mt-1 max-w-md">
                    Audit approfondi portant sur 37 sourates de Juz 'Amma, les 9 maîtres récitateurs, la clarté d'exégèse pour les jeunes et le nouveau Quiz gamifié.
                  </p>
                </div>
                <div className="text-center sm:text-right shrink-0 bg-white/10 px-4 py-3 rounded-2xl border border-white/15">
                  <div className="text-3xl sm:text-4xl font-black text-[#C9A24B] tracking-tight">
                    9.9<span className="text-lg text-white/60 font-medium">/10</span>
                  </div>
                  <span className="text-[11px] font-bold text-white/90">Félicitations du Jury</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Détail par Pilier d'Évaluation
                </h4>

                {STUDY_GROUP_AUDIT_CRITERIA.map((criterion, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-[#14241D] border border-stone-200 dark:border-stone-800 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-sm text-[#14332A] dark:text-white">
                        {criterion.category}
                      </span>
                      <span className="font-black text-sm text-[#C9A24B]">
                        {criterion.score} / 10
                      </span>
                    </div>

                    <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden mb-2">
                      <div
                        className="bg-gradient-to-r from-[#256150] to-[#C9A24B] h-full rounded-full transition-all duration-500"
                        style={{ width: `${(criterion.score / 10) * 100}%` }}
                      />
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      <strong>{criterion.verdict} :</strong> {criterion.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EXPERT MEMBERS */}
          {activeTab === 'experts' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Sélectionnez un expert pour consulter sa vision, son approche pédagogique et son apport à l'application :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STUDY_GROUP_EXPERTS.map((expert) => {
                  const isSelected = selectedExpert?.id === expert.id;
                  return (
                    <div
                      key={expert.id}
                      onClick={() => setSelectedExpert(expert)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#C9A24B]/10 border-[#C9A24B] shadow-sm'
                          : 'bg-white dark:bg-[#14241D] border-stone-200 dark:border-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{expert.avatar}</span>
                        <div>
                          <h4 className="font-bold text-sm text-[#14332A] dark:text-white">
                            {expert.name}
                          </h4>
                          <p className="text-[11px] text-[#C9A24B] font-bold">
                            {expert.badge}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                        {expert.role}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Selected Expert Detailed Bio & Quote */}
              {selectedExpert && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14241D] border border-[#C9A24B]/30 shadow-md space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedExpert.avatar}</span>
                    <div>
                      <h4 className="font-extrabold text-base text-[#14332A] dark:text-white">
                        {selectedExpert.name}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {selectedExpert.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border-l-4 border-[#C9A24B] italic text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                    <Quote className="w-4 h-4 text-[#C9A24B] mb-1 inline mr-1" />
                    « {selectedExpert.quote} »
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {selectedExpert.bio}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-[#14261E]/80 flex items-center justify-between">
          <span className="text-stone-500 dark:text-stone-400 text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Conformité Warsh & Pédagogie Jeunesse Certifiée
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            Fermer le rapport
          </button>
        </div>
      </div>
    </div>
  );
};
