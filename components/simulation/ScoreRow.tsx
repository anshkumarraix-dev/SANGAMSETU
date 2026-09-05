'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  Award,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export interface ScoreRowProps {
  label: string;
  value: number | string; // Score 0-100 or a verdict string like 'Pass' | 'Conditional' | 'Fail' | 'Eligible' | 'Ineligible' | 'Approve' | 'Reject'
  weight?: number; // Optional percentage (e.g., 20)
  justification: string; // The mandatory concise justification sentence
  evidence?: string[]; // Optional list of evidence points
  confidence?: 'High' | 'Medium' | 'Low';
  isMandatory?: boolean;
  category?: string;
  subLabel?: string;
  className?: string;
  id?: string;
}

export default function ScoreRow({
  label,
  value,
  weight,
  justification,
  evidence = [],
  confidence,
  isMandatory,
  category,
  subLabel,
  className = '',
  id,
}: ScoreRowProps) {
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(false);

  // Render badge or score
  const isNumericScore = typeof value === 'number';
  const valString = String(value).toLowerCase();

  const getBadgeStyle = () => {
    if (isNumericScore) {
      if (value >= 90) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      if (value >= 75) return 'bg-blue-100 text-blue-900 border-blue-300';
      if (value >= 60) return 'bg-amber-100 text-amber-900 border-amber-300';
      return 'bg-rose-100 text-rose-900 border-rose-300';
    }

    if (
      valString === 'pass' ||
      valString === 'eligible' ||
      valString === 'accept' ||
      valString === 'complete' ||
      valString === 'clear' ||
      valString === 'valid' ||
      valString === 'approved' ||
      valString === 'approve for prototype' ||
      valString === 'satisfactory' ||
      valString === 'exemplary'
    ) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-300';
    }

    if (
      valString === 'conditional' ||
      valString === 'conditional pass' ||
      valString === 'needs clarification' ||
      valString === 'pending' ||
      valString === 'request clarification' ||
      valString === 'keep on reserve' ||
      valString === 'review further' ||
      valString === 'g2 candidate' ||
      valString === 'concern'
    ) {
      return 'bg-amber-50 text-amber-900 border-amber-300';
    }

    return 'bg-rose-50 text-rose-800 border-rose-300';
  };

  const getVerdictIcon = () => {
    if (isNumericScore) return null;
    if (
      valString === 'pass' ||
      valString === 'eligible' ||
      valString === 'accept' ||
      valString === 'complete' ||
      valString === 'clear' ||
      valString === 'valid' ||
      valString === 'approved' ||
      valString === 'approve for prototype' ||
      valString === 'satisfactory' ||
      valString === 'exemplary'
    ) {
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
    }
    if (
      valString === 'conditional' ||
      valString === 'conditional pass' ||
      valString === 'needs clarification' ||
      valString === 'pending' ||
      valString === 'request clarification' ||
      valString === 'keep on reserve' ||
      valString === 'review further' ||
      valString === 'g2 candidate' ||
      valString === 'concern'
    ) {
      return <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
    }
    return <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
  };

  const getConfidenceBadge = () => {
    if (!confidence) return null;
    if (confidence === 'High') {
      return (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
          High Conf.
        </span>
      );
    }
    if (confidence === 'Medium') {
      return (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
          Med Conf.
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
        Low Conf.
      </span>
    );
  };

  return (
    <div
      id={id}
      className={`p-3.5 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-2 ${className}`}
    >
      {/* Top Header Line: Parameter Label + Badges + Value */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          {category && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-xs">
              {category}
            </span>
          )}
          <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
            {label}
            {isMandatory && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-xs bg-rose-100 text-rose-800 border border-rose-200">
                Mandatory
              </span>
            )}
          </span>

          {weight !== undefined && (
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-xs border border-slate-200">
              Weight: {weight}%
            </span>
          )}

          {getConfidenceBadge()}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {isNumericScore ? (
            <div className="flex items-center gap-1.5">
              <span
                className={`px-2.5 py-0.5 rounded-sm border font-mono font-black text-xs sm:text-sm ${getBadgeStyle()}`}
              >
                {value}/100
              </span>
            </div>
          ) : (
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm border font-bold text-xs capitalize ${getBadgeStyle()}`}
            >
              {getVerdictIcon()}
              <span>{String(value)}</span>
            </div>
          )}
        </div>
      </div>

      {subLabel && <p className="text-[11px] text-slate-500 italic">{subLabel}</p>}

      {/* Justification Line: Explainable AI / Officer Reasoning (Always Visible) */}
      <div className="bg-slate-50/90 rounded-sm p-2.5 border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-sangam-blue-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <strong className="text-slate-900 font-semibold mr-1">Justification:</strong>
          <span>{justification}</span>
        </div>
      </div>

      {/* Expandable Evidence Checklist (If Available) */}
      {evidence && evidence.length > 0 && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsEvidenceExpanded(!isEvidenceExpanded)}
            className="text-[11px] font-bold text-sangam-blue-600 hover:text-sangam-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{isEvidenceExpanded ? 'Hide Verified Evidence' : 'View Verified Evidence'}</span>
            <span className="text-[10px] text-slate-500 font-normal">({evidence.length} points)</span>
            {isEvidenceExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {isEvidenceExpanded && (
            <div className="mt-2 p-2.5 bg-white rounded-sm border border-slate-200 space-y-1.5 text-xs animate-in fade-in duration-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Audited Evidentiary Checkpoints:
              </div>
              <ul className="space-y-1 text-slate-600">
                {evidence.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-snug">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
