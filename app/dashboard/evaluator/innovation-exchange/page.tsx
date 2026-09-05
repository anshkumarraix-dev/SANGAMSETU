'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import StatusBadge from '@/components/innovation-exchange/StatusBadge';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  ShieldCheck,
  Search,
  Filter,
  TrendingDown,
  Clock,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function EvaluatorInnovationExchangeHub() {
  const { alternatives, governmentSolutions } = useInnovationExchange();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAlternatives = alternatives.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="dashboard" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-6">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-sangam-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-sangam-blue-600" />
            <span>Ministry Technical Evaluation Committee</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight">
            GFR Rule 149(iv) Evaluation &amp; Pilot Sanction Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Review alternative proposals submitted by DPIIT-recognized startups against legacy public
            procurement baselines. Grade technical rigor, feasibility, public impact, and authorize sandbox
            escrow funding.
          </p>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-150 text-xs">
            <span className="font-bold text-slate-600 uppercase text-[10px] tracking-wider mr-1">
              Filter by Pipeline:
            </span>
            {['all', 'submitted', 'under_review', 'approved_for_pilot', 'pilot_ongoing', 'approved'].map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded font-bold transition-colors cursor-pointer ${
                    filterStatus === st
                      ? 'bg-sangam-navy-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Proposals' : st.replace(/_/g, ' ')}
                </button>
              )
            )}
          </div>
        </div>

        {/* Proposals List for Evaluation */}
        <div className="space-y-4">
          {filteredAlternatives.map((alt) => {
            const govSol = governmentSolutions.find((g) => g.id === alt.targetSolutionId);

            return (
              <div
                key={alt.id}
                className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs p-6 space-y-4 hover:border-sangam-blue-400 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-150 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={alt.status} size="sm" />
                      <span className="text-[11px] font-mono text-slate-500">
                        Startup: <strong className="text-slate-800">{alt.startupName}</strong> (
                        {alt.startupDpiitNumber})
                      </span>
                    </div>

                    <Link
                      href={`/dashboard/evaluator/innovation-exchange/evaluate/${alt.id}`}
                      className="text-base sm:text-lg font-bold text-sangam-navy-900 hover:text-sangam-blue-600 block"
                    >
                      {alt.title}
                    </Link>

                    <div className="text-xs text-slate-500">
                      Challenging Department: <strong className="text-slate-700">{govSol?.name}</strong> (
                      {govSol?.department})
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Treasury Savings
                      </span>
                      <strong className="text-emerald-700 font-mono text-base">
                        ₹{alt.proposedCost}L ({alt.costReductionPercent}%)
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Committee Score
                      </span>
                      <strong className="text-sangam-navy-900 font-mono text-base">
                        {alt.review.overallScore}/10
                      </strong>
                    </div>

                    <Link
                      href={`/dashboard/evaluator/innovation-exchange/evaluate/${alt.id}`}
                      className="px-4 py-2 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Evaluate &amp; Score</span>
                    </Link>
                  </div>
                </div>

                {/* Score Summary & Key Details */}
                <div className="grid md:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-200/80">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Technical Rigor</span>
                    <strong className="font-mono text-slate-900">{alt.review.technicalScore}/10</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Field Feasibility</span>
                    <strong className="font-mono text-slate-900">{alt.review.feasibilityScore}/10</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Public Impact</span>
                    <strong className="font-mono text-slate-900">{alt.review.impactScore}/10</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">AI Baseline Score</span>
                    <strong className="font-mono text-emerald-700">{alt.aiFeasibilityScore}/100</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
