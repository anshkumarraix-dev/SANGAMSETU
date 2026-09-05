'use client';

import React from 'react';
import { AlternativeStatus } from '@/lib/innovation-exchange/types';
import { CheckCircle2, Clock, Activity, Award, XCircle, FileText } from 'lucide-react';

interface StatusBadgeProps {
  status: AlternativeStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StatusBadge({
  status,
  size = 'md',
  className = '',
}: StatusBadgeProps) {
  const configs: Record<
    AlternativeStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    draft: {
      label: 'Draft',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      icon: FileText,
    },
    submitted: {
      label: 'Submitted',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: Clock,
    },
    under_review: {
      label: 'Under Technical Review',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      icon: Clock,
    },
    approved_for_pilot: {
      label: 'Approved for Pilot',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      icon: CheckCircle2,
    },
    pilot_ongoing: {
      label: 'Pilot Trial Ongoing',
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      border: 'border-indigo-300',
      icon: Activity,
    },
    approved: {
      label: 'Approved & Scaled',
      bg: 'bg-emerald-100',
      text: 'text-emerald-900',
      border: 'border-emerald-400',
      icon: Award,
    },
    rejected: {
      label: 'Declined',
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: XCircle,
    },
  };

  const config = configs[status] || configs.submitted;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-xs border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
}
