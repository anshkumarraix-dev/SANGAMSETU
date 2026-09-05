'use client';

import React from 'react';
import Link from 'next/link';
import { AlternativeSolution, GovernmentSolution } from '@/lib/innovation-exchange/types';
import StatusBadge from './StatusBadge';
import {
  TrendingDown,
  Clock,
  Sparkles,
  ArrowUpRight,
  Heart,
  MessageSquare,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';

interface AlternativeCardProps {
  alternative: AlternativeSolution;
  governmentSolution?: GovernmentSolution;
  showGovContext?: boolean;
}

export default function AlternativeCard({
  alternative,
  governmentSolution,
  showGovContext = true,
}: AlternativeCardProps) {
  const { likeAlternative } = useInnovationExchange();

  return (
    <div className="bg-white rounded-md border border-slate-200 hover:border-sangam-blue-400 hover:shadow-xs transition-all duration-150 flex flex-col justify-between overflow-hidden">
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {alternative.startupName}
            </span>
            <Link
              href={`/innovation-exchange/${alternative.id}`}
              className="text-base sm:text-lg font-bold text-sangam-navy-900 hover:text-sangam-blue-600 transition-colors line-clamp-2 leading-snug"
            >
              {alternative.title}
            </Link>
          </div>
          <StatusBadge status={alternative.status} size="sm" />
        </div>

        {/* Target Government Context */}
        {showGovContext && governmentSolution && (
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between gap-2">
            <div className="truncate">
              <span className="text-slate-400 text-[10px] block">Modernizing Department Challenge:</span>
              <span className="font-semibold text-slate-800 truncate block">
                {governmentSolution.name}
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 shrink-0">
              {governmentSolution.category}
            </span>
          </div>
        )}

        {/* Core Value Proposition Metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded bg-emerald-50/60 border border-emerald-200/80">
            <span className="text-[10px] font-bold uppercase text-emerald-900 block">Proposed Cost</span>
            <div className="text-base font-black text-emerald-800 font-mono">
              ₹{alternative.proposedCost} Lakhs
            </div>
            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" />
              {alternative.costReductionPercent}% Savings
            </span>
          </div>

          <div className="p-2.5 rounded bg-blue-50/60 border border-blue-200/80">
            <span className="text-[10px] font-bold uppercase text-blue-900 block">Timeline</span>
            <div className="text-base font-black text-blue-800 font-mono">
              {alternative.proposedTimelineMonths} Months
            </div>
            <span className="text-[10px] font-bold text-blue-700 flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              {alternative.timeReductionPercent}% Faster
            </span>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1">
          {alternative.technologyStack.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
            >
              {tech}
            </span>
          ))}
          {alternative.technologyStack.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-500 font-bold">
              +{alternative.technologyStack.length - 3}
            </span>
          )}
        </div>

        {/* Brief description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {alternative.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-150 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <button
            onClick={() => likeAlternative(alternative.id)}
            className="flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
            title="Endorse proposal"
          >
            <Heart className="w-3.5 h-3.5" />
            <span className="font-mono text-xs">{alternative.likes}</span>
          </button>

          <Link
            href={`/innovation-exchange/${alternative.id}#comments`}
            className="flex items-center gap-1 text-slate-500 hover:text-sangam-blue-600 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="font-mono text-xs">{alternative.comments.length}</span>
          </Link>
        </div>

        <Link
          href={`/innovation-exchange/${alternative.id}`}
          className="font-bold text-sangam-blue-600 hover:text-sangam-navy-900 flex items-center gap-1 group"
        >
          <span>View Comparison</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
