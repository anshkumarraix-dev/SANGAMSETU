'use client';

import React from 'react';

interface SangamSetuLogoProps {
  variant?: 'full' | 'icon' | 'white' | 'compact';
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
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon Emblem */}
      <svg
        viewBox="0 0 420 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${scaleMap[size]} w-auto aspect-[420/220] transition-transform duration-200`}
        aria-label="SangamSetu Official Emblem"
      >
        <defs>
          <linearGradient id="blueBridgeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#001F3D" />
            <stop offset="60%" stopColor="#003D7A" />
            <stop offset="100%" stopColor="#0066CC" />
          </linearGradient>
          <linearGradient id="saffronBridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="60%" stopColor="#FFAA44" />
            <stop offset="100%" stopColor="#E68A00" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central Vertical Spire */}
        <path
          d="M208 8 L212 8 L216 112 L204 112 Z"
          fill={isWhite ? '#FFFFFF' : '#003D7A'}
        />
        <path
          d="M212 8 L214 8 L216 112 L212 112 Z"
          fill={isWhite ? '#FFD480' : '#FF9933'}
        />

        {/* Central Connecting Pivot Circle */}
        <circle cx="210" cy="115" r="10" fill="#FFFFFF" stroke={isWhite ? '#FFFFFF' : '#003D7A'} strokeWidth="4" />

        {/* Left Side: Government Classical Dome & Pillars */}
        <g transform="translate(115, 60)">
          {/* Flag */}
          <path d="M45 4 L45 0 L55 2 L45 5 Z" fill={isWhite ? '#FFD480' : '#FF9933'} />
          <line x1="45" y1="0" x2="45" y2="10" stroke={isWhite ? '#FFFFFF' : '#002852'} strokeWidth="2" />
          {/* Dome */}
          <path
            d="M30 25 C30 13 60 13 60 25 Z"
            fill={isWhite ? '#FFFFFF' : '#002852'}
          />
          {/* Base cornice */}
          <rect x="25" y="25" width="40" height="5" rx="1" fill={isWhite ? '#FFFFFF' : '#002852'} />
          {/* Pillars */}
          <rect x="28" y="32" width="5" height="18" fill={isWhite ? '#FFFFFF' : '#002852'} />
          <rect x="37" y="32" width="5" height="18" fill={isWhite ? '#FFFFFF' : '#002852'} />
          <rect x="47" y="32" width="5" height="18" fill={isWhite ? '#FFFFFF' : '#002852'} />
          <rect x="56" y="32" width="5" height="18" fill={isWhite ? '#FFFFFF' : '#002852'} />
          {/* Plinth */}
          <rect x="24" y="50" width="42" height="6" rx="1" fill={isWhite ? '#FFFFFF' : '#002852'} />
        </g>

        {/* Right Side: Innovation Lightbulb & Rays */}
        <g transform="translate(255, 60)">
          {/* Rays */}
          <line x1="45" y1="0" x2="45" y2="8" stroke={isWhite ? '#FFAA44' : '#FF9933'} strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="12" x2="24" y2="18" stroke={isWhite ? '#FFAA44' : '#FF9933'} strokeWidth="3" strokeLinecap="round" />
          <line x1="72" y1="12" x2="66" y2="18" stroke={isWhite ? '#FFAA44' : '#FF9933'} strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="35" x2="16" y2="35" stroke={isWhite ? '#FFAA44' : '#FF9933'} strokeWidth="3" strokeLinecap="round" />
          <line x1="82" y1="35" x2="74" y2="35" stroke={isWhite ? '#FFAA44' : '#FF9933'} strokeWidth="3" strokeLinecap="round" />
          {/* Bulb Outline */}
          <path
            d="M32 32 C32 24 38 18 45 18 C52 18 58 24 58 32 C58 37 54 41 52 45 L38 45 C36 41 32 37 32 32 Z"
            fill="none"
            stroke={isWhite ? '#FFAA44' : '#FF9933'}
            strokeWidth="3.5"
          />
          {/* Filament */}
          <path
            d="M41 45 L41 33 C41 30 49 30 49 33 L49 45"
            fill="none"
            stroke={isWhite ? '#FFAA44' : '#FF9933'}
            strokeWidth="2"
          />
          {/* Bulb Base */}
          <rect x="40" y="47" width="10" height="3" rx="1" fill={isWhite ? '#FFAA44' : '#FF9933'} />
          <rect x="42" y="51" width="6" height="3" rx="1" fill={isWhite ? '#FFAA44' : '#FF9933'} />
        </g>

        {/* Left Sweeping Bridge (Navy to Blue) */}
        <path
          d="M80 185 C140 180 190 140 210 115 C200 135 150 165 80 170 Z"
          fill="url(#blueBridgeGrad)"
        />
        <path
          d="M95 185 C145 155 185 130 210 115"
          stroke={isWhite ? '#FFFFFF' : '#003D7A'}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Left Bridge Vertical Suspension Cable Struts */}
        <line x1="125" y1="183" x2="125" y2="160" stroke={isWhite ? '#FFFFFF' : '#003D7A'} strokeWidth="4.5" />
        <line x1="145" y1="178" x2="145" y2="148" stroke={isWhite ? '#FFFFFF' : '#003D7A'} strokeWidth="4.5" />
        <line x1="165" y1="170" x2="165" y2="137" stroke={isWhite ? '#FFFFFF' : '#003D7A'} strokeWidth="4.5" />
        <line x1="185" y1="160" x2="185" y2="126" stroke={isWhite ? '#FFFFFF' : '#003D7A'} strokeWidth="4.5" />

        {/* Right Sweeping Bridge (Saffron to Gold) */}
        <path
          d="M340 185 C280 180 230 140 210 115 C220 135 270 165 340 170 Z"
          fill="url(#saffronBridgeGrad)"
        />
        <path
          d="M325 185 C275 155 235 130 210 115"
          stroke={isWhite ? '#FFD480' : '#FF9933'}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Right Bridge Vertical Suspension Cable Struts */}
        <line x1="295" y1="183" x2="295" y2="160" stroke={isWhite ? '#FFD480' : '#FF9933'} strokeWidth="4.5" />
        <line x1="275" y1="178" x2="275" y2="148" stroke={isWhite ? '#FFD480' : '#FF9933'} strokeWidth="4.5" />
        <line x1="255" y1="170" x2="255" y2="137" stroke={isWhite ? '#FFD480' : '#FF9933'} strokeWidth="4.5" />
        <line x1="235" y1="160" x2="235" y2="126" stroke={isWhite ? '#FFD480' : '#FF9933'} strokeWidth="4.5" />

        {/* Lower Main Arch Span */}
        <path
          d="M90 185 C140 145 280 145 330 185"
          stroke={isWhite ? '#FFFFFF' : '#003D7A'}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ashoka Chakra & Decorative Separator Line */}
        <line x1="60" y1="200" x2="190" y2="200" stroke={isWhite ? '#FFFFFF' : '#003D7A'} strokeWidth="2.5" />
        <line x1="230" y1="200" x2="360" y2="200" stroke={isWhite ? '#FFD480' : '#FF9933'} strokeWidth="2.5" />

        {/* Ashoka Chakra Wheel */}
        <g transform="translate(210, 200)">
          <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#003D7A" strokeWidth="2" />
          <circle cx="0" cy="0" r="3" fill="#003D7A" />
          {/* 24 Spokes (simplified radial ticks using deterministic SVG rotation) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2="0"
              y2="-10"
              transform={`rotate(${deg})`}
              stroke="#003D7A"
              strokeWidth="1.2"
            />
          ))}
        </g>
      </svg>

      {/* Brand Typography */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline tracking-tight font-extrabold leading-none">
            <span
              className={`text-xl sm:text-2xl md:text-3xl font-black ${
                isWhite ? 'text-white' : 'text-sangam-navy-900'
              }`}
            >
              SANGAM
            </span>
            <span
              className={`text-xl sm:text-2xl md:text-3xl font-black ${
                isWhite ? 'text-sangam-saffron-400' : 'text-sangam-saffron-500'
              }`}
            >
              SETU
            </span>
          </div>
          <div
            className={`text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-widest uppercase mt-0.5 ${
              isWhite ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            WHERE INNOVATION MEETS GOVERNANCE
          </div>
          {size !== 'sm' && variant !== 'compact' && (
            <div className="flex items-center gap-1 text-[9px] text-sangam-blue-600 font-semibold mt-0.5">
              <span>Government of India Initiative</span>
              <span>•</span>
              <span className="text-slate-500">DPIIT</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
