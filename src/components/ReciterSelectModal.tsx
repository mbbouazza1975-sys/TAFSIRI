import React, { useEffect } from 'react';
import { UserCheck, Sparkles, X, Volume2 } from 'lucide-react';
import { WARSH_RECITERS } from '../data/reciters';
import { Reciter } from '../types';

interface ReciterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedReciterId: string;
  onSelectReciter: (reciterId: string) => void;
}

export const ReciterSelectModal: React.FC<ReciterSelectModalProps> = ({
  isOpen,
  onClose,
  selectedReciterId,
  onSelectReciter
}) => {
  // 1. DÉCLENCHEUR ÉCHAP (Escape key listener)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 2. DÉCLENCHEUR SÉLECTION (Nouveau ou déjà sélectionné)
  const handleItemClick = (reciter: Reciter) => {
    onSelectReciter(reciter.id);
    onClose();
  };

  // 3. DÉCLENCHEUR CLIC EXTÉRIEUR (Backdrop click)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="reciter-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reciter-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        id="reciter-modal-container"
        className="bg-[#FAF6EC] dark:bg-[#14261F] text-[#14332A] dark:text-[#FAF6EC] rounded-2xl max-w-lg w-full p-4 sm:p-5 border-2 border-[#C9A24B]/40 shadow-2xl space-y-4 my-auto relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with explicit close button */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#14332A] text-[#C9A24B] flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 id="reciter-modal-title" className="font-extrabold text-base sm:text-lg flex items-center gap-1.5">
                <span>Récitateurs Warsh 'an Nâfi'</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A24B] text-[#14332A] font-bold font-mono">
                  {WARSH_RECITERS.length}/9
                </span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Transmission authentique Tariq Al-Azraq
              </p>
            </div>
          </div>

          <button
            id="close-reciter-modal-btn"
            onClick={onClose}
            aria-label="Fermer le sélecteur"
            className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reciters List - ALL 9 RECITERS */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {WARSH_RECITERS.map(reciter => {
            const isSelected = reciter.id === selectedReciterId;
            return (
              <div
                key={reciter.id}
                id={`reciter-option-${reciter.id}`}
                onClick={() => handleItemClick(reciter)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleItemClick(reciter);
                  }
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 text-left focus:outline-hidden focus:ring-2 focus:ring-[#C9A24B] ${
                  isSelected
                    ? 'bg-[#14332A] text-[#FAF6EC] border-[#C9A24B] shadow-sm ring-2 ring-[#C9A24B]/60'
                    : 'bg-white dark:bg-[#16221C] border-stone-200 dark:border-stone-800 hover:border-[#C9A24B] text-stone-800 dark:text-stone-200'
                }`}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs sm:text-sm">{reciter.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                        isSelected
                          ? 'bg-[#C9A24B] text-[#14332A] font-bold'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {reciter.badge}
                    </span>
                  </div>

                  <p className="font-quran text-xs sm:text-sm text-[#C9A24B] font-bold" dir="rtl">
                    {reciter.subname}
                  </p>

                  <p
                    className={`text-[11px] leading-relaxed line-clamp-2 ${
                      isSelected ? 'text-stone-300' : 'text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    {reciter.description}
                  </p>
                </div>

                <div className="shrink-0 pt-0.5">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#C9A24B] text-[#14332A] flex items-center justify-center shadow-xs">
                      <UserCheck className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center opacity-40 hover:opacity-100">
                      <span className="w-2 h-2 rounded-full bg-transparent" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Hint */}
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
          <span>Touchez un récitateur ou appuyez sur <kbd className="px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 rounded-md font-mono text-[10px]">Échap</kbd></span>
          <button
            onClick={onClose}
            className="text-[#C9A24B] hover:underline font-bold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
