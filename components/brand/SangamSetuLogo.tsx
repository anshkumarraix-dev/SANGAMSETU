'use client';

import React from 'react';

interface SangamSetuLogoProps {
  variant?: 'full' | 'icon' | 'white' | 'compact' | 'horizontal';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function SangamSetuLogo({
  variant = 'full',
  className = '',
  size = 'md',
}: SangamSetuLogoProps) {
  const isWhite = variant === 'white';

  const scaleMap = {
    sm: 'h-9',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official SangamSetu Vector Emblem */}
      <svg
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${scaleMap[size]} w-auto aspect-[500/320] transition-transform duration-200`}
        aria-label="SangamSetu - Where Innovation Meets Governance"
      >
        <defs>
          <linearGradient id="navyBridgeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isWhite ? '#FFFFFF' : '#0B2545'} />
            <stop offset="100%" stopColor={isWhite ? '#E2E8F0' : '#004B87'} />
          </linearGradient>
          <linearGradient id="saffronBridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isWhite ? '#FFD699' : '#FF7700'} />
            <stop offset="100%" stopColor={isWhite ? '#FFAA33' : '#E65100'} />
          </linearGradient>
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* 1. Central Monumental Spire (Left Navy / Right Saffron) */}
        {/* Left Spire Half */}
        <path
          d="M250 12 L244 80 L242 165 C242 165 246 170 250 170 Z"
          fill={isWhite ? '#FFFFFF' : '#0B2545'}
        />
        {/* Right Spire Half */}
        <path
          d="M250 12 L256 80 L258 165 C258 165 254 170 250 170 Z"
          fill={isWhite ? '#FFD480' : '#FF7700'}
        />

        {/* Central Pivot Hub Ring */}
        <circle
          cx="250"
          cy="165"
          r="10"
          fill={isWhite ? '#0B2545' : '#FFFFFF'}
          stroke={isWhite ? '#FFFFFF' : '#0B2545'}
          strokeWidth="4"
        />
        <circle
          cx="250"
          cy="165"
          r="4"
          fill={isWhite ? '#FFD480' : '#FF7700'}
        />

        {/* 2. Left Symbol: Classical Government Dome & Pillars (Navy) */}
        <g transform="translate(145, 80)">
          {/* Flagpole & Flag */}
          <line x1="45" y1="2" x2="45" y2="24" stroke={isWhite ? '#FFFFFF' : '#0B2545'} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M45 4 L60 8 L45 13 Z" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
          {/* Dome Cupola */}
          <path
            d="M24 40 C24 24 66 24 66 40 Z"
            fill={isWhite ? '#FFFFFF' : '#0B2545'}
          />
          {/* Cornice */}
          <rect x="20" y="40" width="50" height="5" rx="1.5" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
          {/* Pillars */}
          <rect x="23" y="48" width="5" height="24" rx="1" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
          <rect x="34" y="48" width="5" height="24" rx="1" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
          <rect x="45" y="48" width="5" height="24" rx="1" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
          <rect x="56" y="48" width="5" height="24" rx="1" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
          <rect x="67" y="48" width="5" height="24" rx="1" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
          {/* Base Plinth */}
          <rect x="18" y="72" width="54" height="6" rx="1.5" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
        </g>

        {/* 3. Right Symbol: Radiant Innovation Light Bulb (Saffron) */}
        <g transform="translate(305, 95)">
          {/* Radiating Aura Rays */}
          <line x1="45" y1="2" x2="45" y2="12" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="14" x2="24" y2="21" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="3" strokeLinecap="round" />
          <line x1="74" y1="14" x2="66" y2="21" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="3" strokeLinecap="round" />
          <line x1="5" y1="42" x2="15" y2="42" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="3" strokeLinecap="round" />
          <line x1="85" y1="42" x2="75" y2="42" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="3" strokeLinecap="round" />
          {/* Bulb Outline */}
          <path
            d="M30 42 C30 33 37 26 45 26 C53 26 60 33 60 42 C60 48 56 52 54 56 L36 56 C34 52 30 48 30 42 Z"
            fill="none"
            stroke={isWhite ? '#FFD480' : '#FF7700'}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Glowing Filament */}
          <path
            d="M40 56 L40 42 C40 38 43 36 45 36 C47 36 50 38 50 42 L50 56"
            fill="none"
            stroke={isWhite ? '#FFD480' : '#FF7700'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Screw Base */}
          <rect x="38" y="58" width="14" height="3.5" rx="1" fill={isWhite ? '#FFD480' : '#FF7700'} />
          <rect x="40" y="63" width="10" height="3" rx="1" fill={isWhite ? '#FFD480' : '#FF7700'} />
          <rect x="42" y="67" width="6" height="2" rx="0.5" fill={isWhite ? '#FFD480' : '#FF7700'} />
        </g>

        {/* 4. Left Sweeping Bridge (Deep Navy) */}
        {/* Bridge Upper Arc */}
        <path
          d="M80 235 C145 230 215 195 246 168 C225 195 160 220 80 225 Z"
          fill="url(#navyBridgeGrad)"
        />
        {/* Main Arch Cable */}
        <path
          d="M95 236 C155 195 210 172 245 168"
          stroke={isWhite ? '#FFFFFF' : '#0B2545'}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Left Bridge Vertical Suspension Struts */}
        <line x1="130" y1="234" x2="130" y2="204" stroke={isWhite ? '#FFFFFF' : '#0B2545'} strokeWidth="5" strokeLinecap="round" />
        <line x1="155" y1="228" x2="155" y2="190" stroke={isWhite ? '#FFFFFF' : '#0B2545'} strokeWidth="5" strokeLinecap="round" />
        <line x1="180" y1="218" x2="180" y2="180" stroke={isWhite ? '#FFFFFF' : '#0B2545'} strokeWidth="5" strokeLinecap="round" />
        <line x1="208" y1="205" x2="208" y2="173" stroke={isWhite ? '#FFFFFF' : '#0B2545'} strokeWidth="5" strokeLinecap="round" />

        {/* 5. Right Sweeping Bridge (Vibrant Saffron) */}
        {/* Bridge Upper Arc */}
        <path
          d="M420 235 C355 230 285 195 254 168 C275 195 340 220 420 225 Z"
          fill="url(#saffronBridgeGrad)"
        />
        {/* Main Arch Cable */}
        <path
          d="M405 236 C345 195 290 172 255 168"
          stroke={isWhite ? '#FFD480' : '#FF7700'}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Right Bridge Vertical Suspension Struts */}
        <line x1="370" y1="234" x2="370" y2="204" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="5" strokeLinecap="round" />
        <line x1="345" y1="228" x2="345" y2="190" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="5" strokeLinecap="round" />
        <line x1="320" y1="218" x2="320" y2="180" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="5" strokeLinecap="round" />
        <line x1="292" y1="205" x2="292" y2="173" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="5" strokeLinecap="round" />

        {/* 6. Lower Continuous Roadway Span */}
        <path
          d="M90 236 C170 198 330 198 410 236"
          stroke={isWhite ? '#FFFFFF' : '#0B2545'}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 7. SANGAMSETU Primary Brand Text */}
        <text
          x="80"
          y="278"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="36"
          fontWeight="900"
          letterSpacing="0.06em"
          fill={isWhite ? '#FFFFFF' : '#0B2545'}
        >
          SANGAM
        </text>
        <text
          x="272"
          y="278"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="36"
          fontWeight="900"
          letterSpacing="0.06em"
          fill={isWhite ? '#FFD480' : '#FF7700'}
        >
          SETU
        </text>

        {/* 8. Separator Bar with Ashoka Chakra Wheel */}
        {/* Left Navy Line */}
        <line x1="80" y1="296" x2="232" y2="296" stroke={isWhite ? '#FFFFFF' : '#0B2545'} strokeWidth="2.5" strokeLinecap="round" />
        {/* Right Saffron Line */}
        <line x1="268" y1="296" x2="420" y2="296" stroke={isWhite ? '#FFD480' : '#FF7700'} strokeWidth="2.5" strokeLinecap="round" />

        {/* Center Ashoka Chakra */}
        <g transform="translate(250, 296)">
          <circle cx="0" cy="0" r="10" fill={isWhite ? '#0B2545' : '#FFFFFF'} stroke={isWhite ? '#FFFFFF' : '#0B2545'} strokeWidth="2" />
          <circle cx="0" cy="0" r="2.5" fill={isWhite ? '#FFFFFF' : '#0B2545'} />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2="0"
              y2="-8"
              transform={`rotate(${deg})`}
              stroke={isWhite ? '#FFFFFF' : '#0B2545'}
              strokeWidth="1.2"
            />
          ))}
        </g>

        {/* 9. Official Tagline: WHERE INNOVATION MEETS GOVERNANCE */}
        <text
          x="250"
          y="314"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="0.28em"
          fill={isWhite ? '#E2E8F0' : '#1E293B'}
        >
          WHERE INNOVATION MEETS GOVERNANCE
        </text>
      </svg>

      {/* Optional Side Label for compact header layouts if variant === 'horizontal' */}
      {variant === 'horizontal' && (
        <div className="hidden sm:flex flex-col justify-center border-l border-slate-200 pl-3">
          <span className="text-[11px] font-black uppercase text-sangam-navy-900 tracking-wider">
            Ministry of Commerce & Industry
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            DPIIT Innovation Procurement Bridge
          </span>
        </div>
      )}
    </div>
  );
}
