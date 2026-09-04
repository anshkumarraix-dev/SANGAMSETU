'use client';

import React from 'react';

export function GovernmentEmblem({
  color = 'gold',
  className = 'h-10 w-auto',
}: {
  color?: 'gold' | 'white' | 'dark';
  className?: string;
}) {
  const strokeColor = color === 'white' ? '#FFFFFF' : color === 'gold' ? '#D97706' : '#002852';
  const fillColor = color === 'white' ? '#FFFFFF' : color === 'gold' ? '#F59E0B' : '#002852';

  return (
    <svg
      viewBox="0 0 100 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="National Emblem of India"
    >
      {/* Three Lions Representation */}
      <g transform="translate(10, 10)">
        {/* Central Lion Head */}
        <circle cx="40" cy="24" r="14" fill={fillColor} opacity="0.9" />
        <circle cx="36" cy="22" r="2.5" fill="#FFFFFF" />
        <circle cx="44" cy="22" r="2.5" fill="#FFFFFF" />
        <path d="M38 28 C38 31 42 31 42 28 Z" fill="#FFFFFF" />
        <path d="M30 18 C30 10 50 10 50 18 Z" fill={fillColor} />
        {/* Crown/Mane Tufts */}
        <path d="M26 22 C22 28 24 38 30 42 C36 44 44 44 50 42 C56 38 58 28 54 22 Z" fill={fillColor} />

        {/* Left Lion Head (Profile) */}
        <path d="M22 26 C16 26 12 32 14 38 C16 44 24 45 28 42 Z" fill={fillColor} opacity="0.85" />
        <circle cx="18" cy="30" r="1.8" fill="#FFFFFF" />

        {/* Right Lion Head (Profile) */}
        <path d="M58 26 C64 26 68 32 66 38 C64 44 56 45 52 42 Z" fill={fillColor} opacity="0.85" />
        <circle cx="62" cy="30" r="1.8" fill="#FFFFFF" />

        {/* Abacus / Pedestal */}
        <rect x="15" y="46" width="50" height="7" rx="1.5" fill={fillColor} />

        {/* Small Ashoka Chakra on Abacus */}
        <circle cx="40" cy="49.5" r="3" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1" />
        {/* Bull & Horse silhouettes on sides */}
        <circle cx="26" cy="49.5" r="1.5" fill="#FFFFFF" />
        <circle cx="54" cy="49.5" r="1.5" fill="#FFFFFF" />

        {/* Lotus Bell Base */}
        <path d="M20 54 C24 64 56 64 60 54 Z" fill={fillColor} opacity="0.95" />
        <line x1="16" y1="65" x2="64" y2="65" stroke={strokeColor} strokeWidth="2" />

        {/* Satyameva Jayate Motto (Stylized) */}
        <text
          x="40"
          y="74"
          textAnchor="middle"
          fontSize="5.5"
          fontFamily="serif"
          fontWeight="bold"
          fill={strokeColor}
          letterSpacing="0.5"
        >
          सत्यमेव जयते
        </text>
      </g>
    </svg>
  );
}

export function PartnerLogosBar({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 select-none ${className}`}>
      {/* DPIIT */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded border border-white/20">
        <span className="text-xs font-extrabold tracking-wider text-slate-100">DPIIT</span>
        <span className="text-[10px] text-slate-300">Govt of India</span>
      </div>

      {/* Startup India */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded border border-white/20">
        <span className="text-amber-400 font-black text-xs">#startup</span>
        <span className="text-white font-bold text-xs">india</span>
      </div>

      {/* Digital India */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded border border-white/20">
        <span className="text-sky-400 font-extrabold text-xs">Digital</span>
        <span className="text-emerald-400 font-extrabold text-xs">India</span>
      </div>

      {/* Make in India */}
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded border border-white/20">
        <span className="text-xs font-bold text-orange-300">🇮🇳 Make in India</span>
      </div>
    </div>
  );
}
