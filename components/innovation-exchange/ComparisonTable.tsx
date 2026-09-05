'use client';

import React from 'react';
import { GovernmentSolution, AlternativeSolution } from '@/lib/innovation-exchange/types';
import {
  TrendingDown,
  Clock,
  ShieldAlert,
  Sparkles,
  Layers,
  ArrowRight,
  IndianRupee,
  CheckCircle2,
} from 'lucide-react';

interface ComparisonTableProps {
  governmentSolution: GovernmentSolution;
  alternative: Partial<AlternativeSolution>;
  showRule149Notice?: boolean;
}

export default function ComparisonTable({
  governmentSolution,
  alternative,
  showRule149Notice = true,
}: ComparisonTableProps) {
  const govCost = governmentSolution.currentCost;
  const proposedCost = alternative.proposedCost || govCost;
  const costReduction = Math.max(0, govCost - proposedCost);
  const costReductionPct =
    alternative.costReductionPercent !== undefined
      ? alternative.costReductionPercent
      : Math.round(((govCost - proposedCost) / govCost) * 100);

  const govTime = governmentSolution.currentImplementationTime;
  const proposedTime = alternative.proposedTimelineMonths || govTime;
  const timeReduction = Math.max(0, govTime - proposedTime);
  const timeReductionPct =
    alternative.timeReductionPercent !== undefined
      ? alternative.timeReductionPercent
      : Math.round(((govTime - proposedTime) / govTime) * 100);

  const meetsRule149 = costReductionPct >= 10 || timeReductionPct >= 25;

  return (
    <div className="space-y-4">
      {/* Side-by-Side Comparison Container */}
      <div className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Government Current Baseline (Left) */}
          <div className="p-5 sm:p-6 bg-slate-50/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-slate-400" />
                Current Department Baseline
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                Legacy Mode
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {governmentSolution.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {governmentSolution.department} • {governmentSolution.ministry}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Annual Outlay</span>
                <span className="text-lg font-black text-slate-900 font-mono flex items-center">
                  <IndianRupee className="w-4 h-4 text-slate-600" />
                  {govCost} Lakhs
                </span>
                <span className="text-[10px] text-slate-400">Recurring maintenance ₹{governmentSolution.annualMaintenanceCost}L</span>
              </div>

              <div className="p-3 bg-white rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Deployment Time</span>
                <span className="text-lg font-black text-slate-900 font-mono flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-600" />
                  {govTime} Months
                </span>
                <span className="text-[10px] text-slate-400">Legacy vendor cycle</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-slate-700">Current Technology Stack:</span>
              <p className="text-xs text-slate-600 bg-white p-2.5 rounded border border-slate-200 font-mono">
                {governmentSolution.currentTechnology}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700">Key Bottlenecks:</span>
              <ul className="space-y-1 text-xs text-slate-600">
                {governmentSolution.painPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Startup Proposed Alternative (Right) */}
          <div className="p-5 sm:p-6 bg-emerald-50/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Startup Innovation Alternative
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                DPIIT Modernization
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-emerald-950 leading-snug">
                {alternative.title || 'Startup Alternative Solution'}
              </h4>
              <p className="text-xs text-emerald-800/80 mt-0.5 font-medium">
                By {alternative.startupName || 'Registered DPIIT Startup'} •{' '}
                {alternative.startupLocation || 'India'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white rounded border border-emerald-200 shadow-2xs">
                <span className="text-[11px] text-emerald-900 block font-medium">Proposed Outlay</span>
                <span className="text-lg font-black text-emerald-800 font-mono flex items-center">
                  <IndianRupee className="w-4 h-4 text-emerald-700" />
                  {proposedCost} Lakhs
                </span>
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                  <TrendingDown className="w-3 h-3" />
                  {costReductionPct}% Savings (Save ₹{costReduction}L)
                </span>
              </div>

              <div className="p-3 bg-white rounded border border-emerald-200 shadow-2xs">
                <span className="text-[11px] text-emerald-900 block font-medium">Proposed Timeline</span>
                <span className="text-lg font-black text-emerald-800 font-mono flex items-center gap-1">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  {proposedTime} Months
                </span>
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                  <TrendingDown className="w-3 h-3" />
                  {timeReductionPct}% Faster ({timeReduction} mo saved)
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-emerald-950">Modernized Technology Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {alternative.technologyStack && alternative.technologyStack.length > 0 ? (
                  alternative.technologyStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white text-emerald-900 border border-emerald-200"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">Edge AI / Cloud / IoT Stack</span>
                )}
              </div>
            </div>

            {alternative.howItWorks && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-emerald-950">Operational Mechanism:</span>
                <p className="text-xs text-slate-700 bg-white p-2.5 rounded border border-emerald-200 whitespace-pre-line leading-relaxed">
                  {alternative.howItWorks}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Delta Summary Footer */}
        <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                Direct Fiscal Savings
              </span>
              <span className="text-emerald-400 font-mono font-black text-sm">
                ₹{costReduction} Lakhs / year ({costReductionPct}%)
              </span>
            </div>
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                Time-to-Deploy Advantage
              </span>
              <span className="text-cyan-400 font-mono font-black text-sm">
                {timeReduction} Months Faster ({timeReductionPct}%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {meetsRule149 ? (
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                GFR Rule 149(iv) Compliant (Fast-Track Pilot Eligible)
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1.5">
                Under Standard 10% Fiscal Threshold
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Rule 149 Notice Box */}
      {showRule149Notice && (
        <div className="p-3.5 bg-blue-50/70 rounded-md border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
          <Layers className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-blue-950">GFR Rule 149(iv) Modernization Standard:</span>
            <p className="text-blue-800 leading-relaxed text-[11px]">
              Startups offering a verified minimum 10% cost reduction or 25% timeline compression against published
              government baselines qualify for fast-track pilot testing, exemption from prior turnover criteria,
              and sandbox escrow disbursement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
