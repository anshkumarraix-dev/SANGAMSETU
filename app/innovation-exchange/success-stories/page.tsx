'use client';

import React from 'react';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  Award,
  TrendingDown,
  Clock,
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  IndianRupee,
} from 'lucide-react';

export default function SuccessStoriesPage() {
  const { alternatives, governmentSolutions } = useInnovationExchange();

  const completedOrActivePilots = alternatives.filter(
    (a) => a.status === 'approved' || a.status === 'pilot_ongoing' || a.pilot.approved
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="challenges" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-8">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Proven Public Value &amp; Scaled Deployments</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-sangam-navy-900 tracking-tight">
            GFR Rule 149(iv) Success Stories
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Case studies of DPIIT-recognized startups that replaced expensive legacy government systems,
            saving crores in public expenditure while accelerating delivery timelines across municipal
            and national missions.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="space-y-6">
          {completedOrActivePilots.map((alt) => {
            const govSol = governmentSolutions.find((g) => g.id === alt.targetSolutionId);
            if (!govSol) return null;

            const annualSavings = Math.max(0, govSol.currentCost - alt.proposedCost);

            return (
              <div
                key={alt.id}
                className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs hover:border-sangam-blue-400 transition-all grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200"
              >
                {/* Left Overview (7/12) */}
                <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      {alt.recognition?.recognitionLevel || 'DPIIT Approved Alternative'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {alt.startupLocation} • {alt.startupDpiitNumber}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-sangam-navy-900 leading-snug">
                    {alt.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {alt.description}
                  </p>

                  <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-700 block uppercase text-[10px] tracking-wider">
                      Target Department Problem Replaced:
                    </span>
                    <span className="font-bold text-slate-900 block">{govSol.name}</span>
                    <span className="text-slate-500 block text-[11px]">
                      {govSol.department} ({govSol.ministry})
                    </span>
                  </div>

                  {alt.review.comments && (
                    <div className="p-3 bg-amber-50/50 rounded border border-amber-200 text-xs text-slate-700 italic">
                      &ldquo;{alt.review.comments}&rdquo;
                      <div className="text-[10px] text-slate-500 font-bold not-italic mt-1">
                        — {alt.review.reviewerName || 'Evaluation Committee'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Metrics & Outcomes (5/12) */}
                <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/70 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Audited Fiscal &amp; Time Impact
                    </span>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white rounded border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">Annual Savings</span>
                        <div className="text-xl font-black text-emerald-700 font-mono flex items-center">
                          ₹{annualSavings} Lakhs
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700">
                          {alt.costReductionPercent}% Outlay Saved
                        </span>
                      </div>

                      <div className="p-3 bg-white rounded border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">Time Acceleration</span>
                        <div className="text-xl font-black text-blue-700 font-mono">
                          {alt.timeReductionPercent}%
                        </div>
                        <span className="text-[10px] font-bold text-blue-700">
                          {govSol.currentImplementationTime - alt.proposedTimelineMonths} Months Quicker
                        </span>
                      </div>
                    </div>

                    {alt.pilot.pilotSite && (
                      <div className="p-3 bg-white rounded border border-slate-200 text-xs space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                          Validated Pilot Site
                        </span>
                        <div className="font-bold text-slate-900">{alt.pilot.pilotSite}</div>
                        <div className="text-[11px] text-slate-600">
                          Monitored by: <strong>{alt.pilot.monitoringAgency}</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-800">
                      Score: {alt.review.overallScore}/10
                    </span>

                    <Link
                      href={`/innovation-exchange/${alt.id}`}
                      className="px-4 py-2 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>Read Deep-Dive Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
