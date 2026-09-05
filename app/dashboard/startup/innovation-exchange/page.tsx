'use client';

import React from 'react';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import StatusBadge from '@/components/innovation-exchange/StatusBadge';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  Sparkles,
  PlusCircle,
  FileCheck,
  TrendingDown,
  Building2,
  Clock,
  ArrowRight,
  Activity,
  Layers,
  Award,
} from 'lucide-react';

export default function StartupInnovationExchangeHub() {
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
              <Sparkles className="w-3.5 h-3.5" />
              <span>Startup Innovation Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight">
              GFR Rule 149(iv) Proposal Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Submit technological alternative proposals against public sector baseline challenges,
              track committee evaluations, and manage pilot testing escrow disbursements.
            </p>
          </div>

          <Link
            href="/dashboard/startup/innovation-exchange/submit"
            className="px-5 py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Alternative Proposal</span>
          </Link>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          <Link
            href="/dashboard/startup/innovation-exchange/submit"
            className="bg-white p-6 rounded-md border border-slate-200 hover:border-sangam-blue-400 hover:shadow-xs transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded bg-blue-50 text-sangam-blue-600 flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-sangam-navy-900 group-hover:text-sangam-blue-600 transition-colors">
              Submit Modernization Proposal →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use our interactive wizard with real-time AI feasibility scoring and GFR 149(iv) benchmark calculations.
            </p>
          </Link>

          <Link
            href="/dashboard/startup/innovation-exchange/my-submissions"
            className="bg-white p-6 rounded-md border border-slate-200 hover:border-sangam-blue-400 hover:shadow-xs transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-sangam-navy-900 group-hover:text-sangam-blue-600 transition-colors">
              My Submissions &amp; Pilots →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track technical review feedback, live pilot testing progress, and milestone payout releases.
            </p>
          </Link>

          <Link
            href="/innovation-exchange/solutions"
            className="bg-white p-6 rounded-md border border-slate-200 hover:border-sangam-blue-400 hover:shadow-xs transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-sangam-navy-900 group-hover:text-sangam-blue-600 transition-colors">
              Browse Government Challenges →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find expiring vendor contracts and high-opportunity municipal workflows across Indian departments.
            </p>
          </Link>
        </div>

        {/* Active Proposals Summary Table */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div>
              <h2 className="text-base font-bold text-sangam-navy-900">Recent Innovation Exchange Proposals</h2>
              <p className="text-xs text-slate-500">Live proposals submitted across startup cohorts</p>
            </div>
            <Link
              href="/dashboard/startup/innovation-exchange/my-submissions"
              className="text-xs font-bold text-sangam-blue-600 hover:underline"
            >
              View All Submissions
            </Link>
          </div>

          <div className="space-y-3">
            {alternatives.map((alt) => {
              const govSol = governmentSolutions.find((g) => g.id === alt.targetSolutionId);
              return (
                <div
                  key={alt.id}
                  className="p-4 rounded bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={alt.status} size="sm" />
                      <span className="font-mono text-slate-500 text-[11px]">{alt.startupDpiitNumber}</span>
                    </div>
                    <Link
                      href={`/innovation-exchange/${alt.id}`}
                      className="font-bold text-sangam-navy-900 hover:text-sangam-blue-600 text-sm block"
                    >
                      {alt.title}
                    </Link>
                    <div className="text-slate-500">
                      Target: <strong className="text-slate-700">{govSol?.name}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Cost Savings</span>
                      <strong className="text-emerald-700 font-mono text-sm">
                        ₹{alt.proposedCost}L ({alt.costReductionPercent}%)
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">AI Feasibility</span>
                      <strong className="text-sangam-navy-900 font-mono text-sm">
                        {alt.aiFeasibilityScore}/100
                      </strong>
                    </div>

                    <Link
                      href={`/innovation-exchange/${alt.id}`}
                      className="px-3 py-1.5 rounded bg-white border border-slate-300 hover:border-sangam-blue-500 font-bold text-sangam-navy-900 shadow-2xs"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
