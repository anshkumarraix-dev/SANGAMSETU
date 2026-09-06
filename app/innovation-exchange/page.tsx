'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import StatsCounter from '@/components/innovation-exchange/StatsCounter';
import AlternativeCard from '@/components/innovation-exchange/AlternativeCard';
import OpportunityBadge from '@/components/innovation-exchange/OpportunityBadge';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  Sparkles,
  TrendingDown,
  Clock,
  ShieldCheck,
  Building2,
  ArrowRight,
  Layers,
  Award,
  CheckCircle2,
  IndianRupee,
  Cpu,
  FileCheck,
  Search,
} from 'lucide-react';

export default function InnovationExchangeLandingPage() {
  const { governmentSolutions, alternatives, stats } = useInnovationExchange();

  const featuredAlternatives = alternatives.slice(0, 3);
  const highOpportunitySolutions = governmentSolutions.filter((g) => g.opportunityScore >= 90);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="challenges" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 space-y-12 pb-16">
        {/* Hero Section */}
        <section className="bg-sangam-navy-900 text-white pt-12 pb-16 px-4 border-b border-sangam-navy-800 relative overflow-hidden">
          <Image
            src="/images/banner-innovation-exchange.jpg"
            alt="Modern digital infrastructure, smart tech skyscraper architecture"
            fill
            loading="lazy"
            className="object-cover object-center opacity-70"
            sizes="100vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sangam-navy-950/85 via-sangam-navy-950/60 to-sangam-navy-950/30 pointer-events-none" />
          <div className="max-w-[1440px] mx-auto space-y-8 relative z-10">
            {/* Tag / Eyebrow */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                GFR Rule 149(iv) Innovation Exchange
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Sovereign Public Procurement Fast-Track
              </span>
            </div>

            {/* Headline */}
            <div className="max-w-4xl space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Disrupt Legacy Government Monopolies with{' '}
                <span className="text-amber-400">Next-Gen Tech Alternatives</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                SangamSetu Innovation Exchange enables verified DPIIT-recognized startups to propose
                higher-performance, cost-efficient alternatives against legacy public contracts.
                Qualify for sandbox testing with a minimum 10% cost reduction or 25% accelerated
                deployment.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard/startup/innovation-exchange/submit"
                className="px-6 py-3 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xs transition-all"
              >
                <span>Propose an Alternative</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/innovation-exchange/browse"
                className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition-colors"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Browse Live Alternatives</span>
              </Link>

              <Link
                href="/innovation-exchange/solutions"
                className="px-6 py-3 rounded bg-transparent hover:bg-white/10 text-slate-200 font-bold text-sm border border-white/20 flex items-center gap-2 transition-colors"
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>View Department Baseline Challenges</span>
              </Link>
            </div>

            {/* Real-Time Platform Impact Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="p-4 rounded-md bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  Cumulative Treasury Savings
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
                  ₹<StatsCounter value={stats.totalCostSavingsLakhs} /> Lakhs
                </div>
                <span className="text-[11px] text-slate-400">Direct taxpayer savings</span>
              </div>

              <div className="p-4 rounded-md bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  Avg. Cost Reduction
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1">
                  <StatsCounter value={stats.averageCostReductionPercent} suffix="%" />
                </div>
                <span className="text-[11px] text-slate-400">Exceeds Rule 149(iv) threshold</span>
              </div>

              <div className="p-4 rounded-md bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  Avg. Deployment Speedup
                </span>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">
                  <StatsCounter value={stats.averageTimeReductionPercent} suffix="%" />
                </div>
                <span className="text-[11px] text-slate-400">Months saved per project</span>
              </div>

              <div className="p-4 rounded-md bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  Active Verified Alternatives
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                  <StatsCounter value={stats.totalAlternatives} />
                </div>
                <span className="text-[11px] text-slate-400">DPIIT solutions submitted</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (3-Step Rule 149(iv) Pipeline) */}
        <section className="max-w-[1440px] mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-sangam-navy-900 tracking-tight">
                How GFR Rule 149(iv) Alternative Procurement Works
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                A legally sanctioned fast-track route designed to eliminate single-vendor lock-in.
              </p>
            </div>
            <Link
              href="/circulars"
              className="text-xs font-bold text-sangam-blue-600 hover:text-sangam-navy-900 flex items-center gap-1"
            >
              <span>View Official GFR Circulars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-sangam-blue-600 font-black font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-sangam-navy-900">
                Identify Legacy Inefficiencies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse government-published baseline problem statements. Filter by category, annual
                taxpayer outlay, and expiring incumbent contracts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-black font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-sangam-navy-900">
                Propose Qualified Modern Alternative
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit an AI-scored proposal delivering at least 10% cost reduction or 25% timeline
                acceleration with zero prior turnover restrictions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-black font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-sangam-navy-900">
                Pilot Testing &amp; GeM Fast-Track Onboarding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive departmental pilot sanction with 100% escrow milestone funding, field
                validation, and direct National Scale empanelment.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Live Alternative Proposals */}
        <section className="max-w-[1440px] mx-auto px-4 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Live Exchange
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-sangam-navy-900 tracking-tight mt-1">
                Featured Startup Alternative Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Verified DPIIT innovations actively disrupting legacy municipal and ministry workflows.
              </p>
            </div>

            <Link
              href="/innovation-exchange/browse"
              className="px-4 py-2 rounded bg-white border border-slate-300 text-sangam-navy-900 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <span>Explore All Alternatives</span>
              <ArrowRight className="w-3.5 h-3.5 text-sangam-blue-600" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredAlternatives.map((alt) => {
              const govSol = governmentSolutions.find((g) => g.id === alt.targetSolutionId);
              return (
                <AlternativeCard
                  key={alt.id}
                  alternative={alt}
                  governmentSolution={govSol}
                  showGovContext={true}
                />
              );
            })}
          </div>
        </section>

        {/* High Opportunity Government Challenges */}
        <section className="max-w-[1440px] mx-auto px-4 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                High Priority Modernization
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-sangam-navy-900 tracking-tight mt-0.5">
                Expiring Legacy Contracts Open for Disruption
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Incumbent solutions with upcoming contract expiries where departments are actively seeking
                startup alternatives.
              </p>
            </div>

            <Link
              href="/innovation-exchange/solutions"
              className="text-xs font-bold text-sangam-blue-600 hover:text-sangam-navy-900 flex items-center gap-1"
            >
              <span>View All Challenges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {highOpportunitySolutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-white p-6 rounded-md border border-slate-200 hover:border-sangam-blue-400 transition-colors shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {sol.category}
                    </span>
                    <OpportunityBadge score={sol.opportunityScore} size="sm" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-sangam-navy-900 leading-snug">
                      {sol.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {sol.department} • {sol.ministry}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                    <div className="p-2 bg-slate-50 rounded border border-slate-150">
                      <span className="text-[10px] text-slate-500 block">Current Spend</span>
                      <strong className="text-slate-900 font-mono">₹{sol.currentCost} L/yr</strong>
                    </div>
                    <div className="p-2 bg-slate-50 rounded border border-slate-150">
                      <span className="text-[10px] text-slate-500 block">Rollout Time</span>
                      <strong className="text-slate-900 font-mono">{sol.currentImplementationTime} Mo</strong>
                    </div>
                    <div className="p-2 bg-amber-50 rounded border border-amber-200">
                      <span className="text-[10px] text-amber-800 block font-bold">Expires In</span>
                      <strong className="text-amber-900 font-mono">{sol.contractExpiryDays} Days</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-150 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Incumbent: <strong className="text-slate-700">{sol.currentVendor}</strong>
                  </span>
                  <Link
                    href={`/dashboard/startup/innovation-exchange/submit?solutionId=${sol.id}`}
                    className="px-3 py-1.5 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors"
                  >
                    <span>Submit Alternative</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-[1440px] mx-auto px-4">
          <div className="bg-gradient-to-r from-sangam-navy-900 via-slate-900 to-sangam-blue-900 text-white p-8 sm:p-10 rounded-md border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Calling DPIIT Innovators
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Have a Superior Technological Solution for Indian Governance?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Take advantage of General Financial Rule 149(iv) exemptions. Submit your solution
                directly to ministry evaluators with zero tender submission fees.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard/startup/innovation-exchange/submit"
                className="px-6 py-3 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xs transition-colors"
              >
                Submit Startup Alternative Now
              </Link>
              <Link
                href="/guidelines"
                className="px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
              >
                Eligibility Guidelines
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GovernmentFooter />
    </div>
  );
}
