'use client';

import React, { useEffect, useState } from 'react';

interface StatsCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function StatsCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1200,
  className = '',
}: StatsCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startVal = 0;
    const endVal = value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(startVal + (endVal - startVal) * easedProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(endVal);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span className={`font-mono font-black ${className}`}>
      {prefix}
      {displayValue.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
