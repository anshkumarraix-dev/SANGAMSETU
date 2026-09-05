'use client';

import React from 'react';
import { Sparkles, Flame, AlertTriangle } from 'lucide-react';

interface OpportunityBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function OpportunityBadge({
  score,
  size = 'md',
  showLabel = true,
  className = '',
}: OpportunityBadgeProps) {
  let badgeStyle = {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-300',
    tier: 'High Opportunity',
    icon: Flame,
  };

  if (score >= 85) {
    badgeStyle = {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      tier: 'High Opportunity',
      icon: Flame,
    };
  } else if (score >= 70) {
    badgeStyle = {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      tier: 'Medium Opportunity',
      icon: Sparkles,
    };
  } else {
    badgeStyle = {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      tier: 'Standard',
      icon: AlertTriangle,
    };
  }

  const Icon = badgeStyle.icon;

  const sizeMap = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <div
      className={`inline-flex items-center font-bold rounded-xs border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border} ${sizeMap[size]} ${className}`}
      title={`Opportunity Score: ${score}/100 based on legacy cost, manual pain points & contract expiry`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3 text-amber-500' : 'w-3.5 h-3.5 text-amber-500'} />
      <span className="font-black font-mono">{score}/100</span>
      {showLabel && <span className="opacity-90 font-medium">({badgeStyle.tier})</span>}
    </div>
  );
}
