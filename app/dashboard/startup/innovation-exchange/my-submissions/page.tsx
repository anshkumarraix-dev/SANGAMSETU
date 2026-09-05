'use client';

import React from 'react';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import StatusBadge from '@/components/innovation-exchange/StatusBadge';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  FileCheck,
  PlusCircle,
  TrendingDown,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export default function MySubmissionsPage() {
  const { alternatives, governmentSolutions } = useInnovationExchange();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="dashboard" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-6">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sangam-blue-600 uppercase tracking-wider mb-1">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Startup Portfolio Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight">
              My Alternative Proposals &amp; Pilot Status
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Track the statutory evaluation status, committee review remarks, pilot site sanctions, and
              escrow milestone disbursements for your submitted innovations.
            </p>
          </div>

          <Link
            href="/dashboard/startup/innovation-exchange/submit"
            className="px-4 py-2.5 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Submit New Alternative</span>
          </Link>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {alternatives.map((alt) => {
            const govSol = governmentSolutions.find((g) => g.id === alt.targetSolutionId);

            return (
              <div
                key={alt.id}
                className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs hover:border-sangam-blue-400 transition-all p-6 space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-150 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={alt.status} size="sm" />
                      <span className="font-mono text-slate-500 text-[11px]">
                        ID: {alt.id} • {alt.submittedAt}
                      </span>
                    </div>
                    <Link
                      href={`/innovation-exchange/${alt.id}`}
                      className="text-base sm:text-lg font-bold text-sangam-navy-900 hover:text-sangam-blue-600 block"
                    >
                      {alt.title}
                    </Link>
                    <div className="text-xs text-slate-500">
                      Challenging: <strong className="text-slate-800">{govSol?.name}</strong> (
                      {govSol?.department})
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Proposed Outlay</span>
                      <strong className="text-emerald-700 font-mono text-sm">₹{alt.proposedCost} Lakhs</strong>
                      <span className="text-[10px] text-emerald-600 block">
                        {alt.costReductionPercent}% savings
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Committee Score</span>
                      <strong className="text-sangam-navy-900 font-mono text-sm">
                        {alt.review.overallScore}/10
                      </strong>
                      <span className="text-[10px] text-slate-500 block">AI: {alt.aiFeasibilityScore}%</span>
                    </div>
                  </div>
                </div>

                {/* Pilot / Evaluation Bar */}
                <div className="bg-slate-50 p-4 rounded border border-slate-200/80 text-xs flex flex-wrap items-center justify-between gap-4">
                  {alt.pilot.approved ? (
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">
                          Sanctioned Pilot: {alt.pilot.pilotSite}
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          Escrow Budget: ₹{alt.pilot.budgetLakhs}L • Progress:{' '}
                          <strong className="text-emerald-700">{alt.pilot.progressPct}%</strong> • Agency:{' '}
                          {alt.pilot.monitoringAgency}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>
                        Technical Committee Review in Progress under GFR Rule 149(iv) fast-track corridor.
                      </span>
                    </div>
                  )}

                  <Link
                    href={`/innovation-exchange/${alt.id}`}
                    className="px-3.5 py-1.5 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold flex items-center gap-1 shadow-2xs transition-colors"
                  >
                    <span>View Public Deliberation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
