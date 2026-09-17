import React, { useState } from 'react';
import { parseTajwidVerseToTokens } from '../data/tajwid';
import { TajwidFamily } from '../types';

interface TajwidHighlighterProps {
  text: string;
  enabled?: boolean;
  fontSize?: number;
  className?: string;
}

export const TajwidHighlighter: React.FC<TajwidHighlighterProps> = ({
  text,
  enabled = true,
  fontSize = 30,
  className = ''
}) => {
  const [activeTooltip, setActiveTooltip] = useState<{ text: string; rule: string; x: number; y: number } | null>(null);

  if (!enabled) {
    return (
      <span
        dir="rtl"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.9 }}
        className={`font-quran tracking-wide text-slate-900 dark:text-amber-50 select-text ${className}`}
      >
        {text}
      </span>
    );
  }

  // Parse verse with full cross-word context (Rule 1 & Rule 4)
  const tokens = parseTajwidVerseToTokens(text);

  const getRuleBadge = (rule: TajwidFamily) => {
    switch (rule) {
      case 'madd':
        return { label: 'Madd (Prolongation 2, 4 ou 6 temps)', color: 'text-rose-600 dark:text-rose-400 font-bold' };
      case 'ghunna':
        return { label: 'Ghunna (Nasalisation 2 temps - Ikhfâ\', Idghâm, Iqlâb)', color: 'text-emerald-600 dark:text-emerald-400 font-bold' };
      case 'qalqala':
        return { label: 'Qalqala (Rebond)', color: 'text-blue-600 dark:text-blue-400 font-bold' };
      case 'tafkhim':
        return { label: 'Tafkhîm (Emphase)', color: 'text-amber-700 dark:text-amber-400 font-bold' };
      case 'naql':
        return { label: 'Naql (Transfert de voyelle - Warsh)', color: 'text-cyan-600 dark:text-cyan-400 font-bold' };
      default:
        return { label: '', color: '' };
    }
  };

  const getRuleColorStyle = (rule?: TajwidFamily) => {
    switch (rule) {
      case 'madd':
        return 'text-rose-600 dark:text-rose-400 font-bold';
      case 'ghunna':
        return 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/40 rounded-sm px-0.5';
      case 'qalqala':
        return 'text-blue-600 dark:text-blue-400 font-bold';
      case 'tafkhim':
        return 'text-amber-700 dark:text-amber-400 font-bold';
      case 'naql':
        return 'text-cyan-600 dark:text-cyan-400 font-bold underline decoration-dotted decoration-cyan-500';
      default:
        return '';
    }
  };

  return (
    <div className="relative inline-block w-full">
      <p
        dir="rtl"
        style={{ fontSize: `${fontSize}px`, lineHeight: 2.1 }}
        className={`font-quran tracking-wide text-slate-900 dark:text-[#F5EFE0] select-text text-right w-full ${className}`}
      >
        {tokens.map((token, tIdx) => {
          if (token.isSpace) {
            return <span key={tIdx}> </span>;
          }
          return (
            <span key={tIdx} className="inline mx-0.5">
              {token.segments.map((seg, sIdx) => {
                if (!seg.rule) {
                  return <span key={sIdx}>{seg.text}</span>;
                }
                const colorClass = getRuleColorStyle(seg.rule);
                const badge = getRuleBadge(seg.rule);
                return (
                  <span
                    key={sIdx}
                    className={`${colorClass} transition-colors cursor-help inline`}
                    title={`${seg.text} : ${badge.label}`}
                    onClick={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setActiveTooltip({
                        text: seg.text,
                        rule: badge.label,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8
                      });
                      setTimeout(() => setActiveTooltip(null), 2500);
                    }}
                  >
                    {seg.text}
                  </span>
                );
              })}
            </span>
          );
        })}
      </p>

      {/* Floating active hint */}
      {activeTooltip && (
        <div
          style={{
            position: 'fixed',
            left: `${activeTooltip.x}px`,
            top: `${activeTooltip.y}px`,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999
          }}
          className="bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl border border-amber-400/40 pointer-events-none animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap"
        >
          <span className="font-bold font-quran text-amber-300 ml-1.5 text-sm">{activeTooltip.text}</span>
          <span>{activeTooltip.rule}</span>
        </div>
      )}
    </div>
  );
};
