/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'light',
  size = 'md',
  showTagline = true,
}) => {
  const isDark = theme === 'dark';

  const sizeMap = {
    sm: { icon: 30, title: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 36, title: 'text-base sm:text-lg', sub: 'text-[10px]' },
    lg: { icon: 46, title: 'text-xl sm:text-2xl', sub: 'text-xs' },
  };

  const { icon, title, sub } = sizeMap[size];

  return (
    <div className="flex items-center gap-2.5 select-none group cursor-pointer">
      {/* Nimbus-inspired Minimalist Circular Monogram */}
      <div
        className="relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 shrink-0"
        style={{
          width: icon,
          height: icon,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base outer circle ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={isDark ? '#3A3C42' : '#E5E7EB'}
            strokeWidth="8"
          />
          {/* Distinctive Nimbus Vibrant Yellow Crescent Arc */}
          <path
            d="M50 8C73.196 8 92 26.804 92 50C92 73.196 73.196 92 50 92"
            stroke="#FFB800"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Center Geometric Letter DKY Dot */}
          <circle cx="50" cy="50" r="16" fill="#18191B" />
          <circle cx="50" cy="50" r="8" fill="#FFB800" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight uppercase ${title} ${
              isDark ? 'text-white' : 'text-[#18191B]'
            }`}
          >
            DKY <span className="text-[#FFB800]">VISUALWORKS</span>
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-semibold tracking-wider uppercase mt-1 ${sub} ${
              isDark ? 'text-stone-400' : 'text-[#6C7278]'
            }`}
          >
            HARGA MURAH KUALITAS MEWAH
          </span>
        )}
      </div>
    </div>
  );
};
