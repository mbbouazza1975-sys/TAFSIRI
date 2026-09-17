import React from 'react';

interface QuranicRosetteProps {
  verseNumber: number;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

/**
 * Traditional Illuminated Quranic Ayah Rosette (علامة نهاية الآية)
 * Inspired by classic Moroccan / Madinah illuminated manuscript borders.
 */
export const QuranicRosette: React.FC<QuranicRosetteProps> = ({
  verseNumber,
  isActive = false,
  size = 'md',
  className = '',
  onClick
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm'
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center relative select-none shrink-0 transition-transform duration-200 ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${dim} ${className}`}
      title={`Verset ${verseNumber}`}
      role="img"
      aria-label={`Fin du verset ${verseNumber}`}
    >
      {/* Illuminated Golden Rosette SVG */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full transition-all duration-300 ${
          isActive
            ? 'filter drop-shadow-[0_0_8px_rgba(201,162,75,0.7)] scale-105'
            : 'filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
        }`}
      >
        <defs>
          <linearGradient id={`goldGrad-${verseNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isActive ? '#F59E0B' : '#D4AF37'} />
            <stop offset="50%" stopColor={isActive ? '#FDE047' : '#E6CA65'} />
            <stop offset="100%" stopColor={isActive ? '#B45309' : '#AA7C11'} />
          </linearGradient>
          <linearGradient id={`innerGrad-${verseNumber}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isActive ? '#FEF3C7' : '#FFFDF7'} />
            <stop offset="100%" stopColor={isActive ? '#FDE68A' : '#F5EED8'} />
          </linearGradient>
        </defs>

        {/* 8-pointed star / Petals Outer Ring */}
        <g transform="translate(50,50)">
          {/* 8 rotating petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path
              key={i}
              d="M 0,-48 C 6,-40 10,-32 0,-24 C -10,-32 -6,-40 0,-48 Z"
              transform={`rotate(${angle})`}
              fill={`url(#goldGrad-${verseNumber})`}
              stroke={isActive ? '#92400E' : '#855E0E'}
              strokeWidth="1.2"
            />
          ))}

          {/* Secondary interlaced 8 diamond tips */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
            <circle
              key={i}
              cx="0"
              cy="-36"
              r="2.2"
              transform={`rotate(${angle})`}
              fill={isActive ? '#F59E0B' : '#D4AF37'}
            />
          ))}

          {/* Outer circular gold border with dots */}
          <circle
            cx="0"
            cy="0"
            r="30"
            fill="none"
            stroke={`url(#goldGrad-${verseNumber})`}
            strokeWidth="2.5"
          />
          <circle
            cx="0"
            cy="0"
            r="26"
            fill="none"
            stroke={isActive ? '#D97706' : '#C9A24B'}
            strokeWidth="0.8"
            strokeDasharray="2.5 2"
          />

          {/* Inner Medallion Background */}
          <circle
            cx="0"
            cy="0"
            r="23"
            fill={`url(#innerGrad-${verseNumber})`}
            className="dark:fill-[#1E2E25]"
          />
        </g>
      </svg>

      {/* Verse Number in the center */}
      <span
        className={`absolute font-extrabold font-mono transition-colors duration-200 z-10 ${
          isActive
            ? 'text-[#92400E] dark:text-[#FDE047]'
            : 'text-[#14332A] dark:text-[#FAF6EC]'
        }`}
        style={{ letterSpacing: '-0.02em' }}
      >
        {verseNumber}
      </span>
    </div>
  );
};
