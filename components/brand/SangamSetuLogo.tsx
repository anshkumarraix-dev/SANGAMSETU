'use client';

import React from 'react';

interface SangamSetuLogoProps {
  variant?: 'full' | 'icon' | 'white' | 'horizontal';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function SangamSetuLogo({
  variant = 'icon',
  className = '',
  size = 'md',
}: SangamSetuLogoProps) {
  const sizeClasses = {
    sm: 'h-9 sm:h-10 w-auto',
    md: 'h-12 sm:h-14 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
    xl: 'h-24 sm:h-28 w-auto',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/sangam-setu-logo.png"
        alt="SangamSetu Logo"
        className={`${sizeClasses[size]} object-contain`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes('sangam-setu-logo.png')) {
            target.src = '/images/logo.png';
          } else if (target.src.includes('logo.png')) {
            target.src = '/images/image.png';
          } else if (target.src.includes('/images/image.png')) {
            target.src = '/image.png';
          }
        }}
      />
    </div>
  );
}
