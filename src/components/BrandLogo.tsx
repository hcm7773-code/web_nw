import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showSeal?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  showSeal = true,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
  };

  const subtextSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Visual Identity Emblem: Fish + Flame + Cauldron Rim */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_12px_rgba(194,43,34,0.45)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Bronze Cauldron Rim with oriental notches */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="#d49b55"
            strokeWidth="1.8"
            strokeDasharray="4 2 28 3 4 2 28 3"
            opacity="0.85"
          />
          <circle
            cx="50"
            cy="50"
            r="41"
            stroke="#c22b22"
            strokeWidth="1"
            opacity="0.4"
          />

          {/* Dynamic Yin-Yang Water & Flame Swirl (Fish Leaping & Fire Rising) */}
          {/* Flame Tail / Fiery chili shape */}
          <path
            d="M50 14C54 28 68 34 68 50C68 62 58 72 50 72C42 72 40 64 45 56C48 50 49 42 45 36C42 30 46 20 50 14Z"
            fill="url(#flameGradient)"
          />
          {/* Dynamic Fish Leap Wave (Boiled Fish Water Essence) */}
          <path
            d="M50 86C45 74 32 68 32 50C32 38 42 28 50 28C57 28 60 36 55 44C52 50 51 58 55 64C58 70 54 80 50 86Z"
            fill="url(#copperWaveGradient)"
            opacity="0.9"
          />

          {/* Central Boiling Spark & Fish Eye */}
          <circle cx="50" cy="50" r="3.5" fill="#f6f4f0" />
          <circle cx="50" cy="50" r="1.5" fill="#c22b22" />

          {/* Linear Gradients */}
          <defs>
            <linearGradient id="flameGradient" x1="50" y1="14" x2="68" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e13b2e" />
              <stop offset="0.6" stopColor="#c22b22" />
              <stop offset="1" stopColor="#87140e" />
            </linearGradient>
            <linearGradient id="copperWaveGradient" x1="50" y1="86" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e2b068" />
              <stop offset="0.5" stopColor="#d49b55" />
              <stop offset="1" stopColor="#8c5822" />
            </linearGradient>
          </defs>
        </svg>

        {/* Small Traditional Red Cinnabar Seal "華" */}
        {showSeal && size !== 'sm' && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#c22b22] text-[#f6f4f0] rounded-[2px] border border-[#d49b55]/50 flex items-center justify-center text-[9px] font-oriental font-bold shadow-sm">
            華
          </div>
        )}
      </div>

      {/* Brand Typography Lockup */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-oriental font-bold text-[#f5f1ea] tracking-wider leading-none ${textSizes[size]}`}
          >
            華神<span className="text-[#d49b55] mx-1">·</span>椒麻
          </span>
          {showSeal && (
            <span className="hidden sm:inline-block border border-[#c22b22] text-[#e13b2e] bg-[#c22b22]/10 px-1 py-0.2 text-[10px] font-oriental tracking-widest rounded-xs scale-90">
              沸騰川魂
            </span>
          )}
        </div>

        {showSubtitle && (
          <span
            className={`font-oriental text-[#d49b55] font-semibold mt-0.5 tracking-widest ${subtextSizes[size]}`}
          >
            極致饗宴
          </span>
        )}
      </div>
    </div>
  );
};
