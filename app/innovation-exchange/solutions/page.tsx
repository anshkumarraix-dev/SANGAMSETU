'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import OpportunityBadge from '@/components/innovation-exchange/OpportunityBadge';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  Building2,
  TrendingDown,
  Clock,
  ArrowRight,
  ShieldAlert,
  Search,
  IndianRupee,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function GovernmentSolutionsPage() {
  const { governmentSolutions, alternatives } = useInnovationExchange();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSolutions = governmentSolutions.filter((sol) => {
    if (selectedCategory !== 'all' && sol.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        sol.name.toLowerCase().includes(q) ||
        sol.department.toLowerCase().includes(q) ||
        sol.ministry.toLowerCase().includes(q) ||
        sol.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="challenges" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sangam-blue-600 uppercase tracking-wider mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Department Challenges Repository</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight">
              Government Baseline Problem Statements
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Published public sector operational workflows, cost baselines, and expiring vendor contracts
              ready for startup modernization under GFR Rule 149(iv).
            </p>
          </div>

          <Link
            href="/dashboard/startup/innovation-exchange/submit"
            className="px-4 py-2.5 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Submit Alternative Proposal</span>
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by department, ministry, or problem description..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:border-sangam-blue-500 bg-white"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-2 px-3 text-xs rounded border border-slate-300 focus:outline-none focus:border-sangam-blue-500 bg-white text-slate-700"
          >
            <option value="all">All Sectors</option>
            <option value="Urban Infrastructure">Urban Infrastructure</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Water Management">Water Management</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSolutions.map((sol) => {
            const matchedAlternatives = alternatives.filter((a) => a.targetSolutionId === sol.id);

            return (
              <div
                key={sol.id}
                className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs hover:border-sangam-blue-400 transition-all flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                      {sol.category}
                    </span>
                    <OpportunityBadge score={sol.opportunityScore} size="sm" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-sangam-navy-900 leading-snug">
                      {sol.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                      <span>{sol.department}</span>
                      <span>•</span>
                      <span>{sol.ministry}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Financial & Time Baselines */}
                  <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Annual Outlay</span>
                      <strong className="text-slate-900 font-mono text-sm">₹{sol.currentCost} L</strong>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Deploy Timeline</span>
                      <strong className="text-slate-900 font-mono text-sm">{sol.currentImplementationTime} Mo</strong>
                    </div>

                    <div className="p-2.5 bg-amber-50 rounded border border-amber-200">
                      <span className="text-[10px] text-amber-800 block font-bold">Contract Expiry</span>
                      <strong className="text-amber-900 font-mono text-sm">{sol.contractExpiryDays} Days</strong>
                    </div>
                  </div>

                  {/* Pain Points */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Reported Bottlenecks:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {sol.painPoints.slice(0, 3).map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom / Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Sparkles className="w-3.5 h-3.5 text-sangam-blue-600" />
                    <span className="font-bold text-slate-800 font-mono">
                      {matchedAlternatives.length}
                    </span>
                    <span>Alternatives Proposed</span>
                  </div>

                  <Link
                    href={`/dashboard/startup/innovation-exchange/submit?solutionId=${sol.id}`}
                    className="px-3.5 py-1.5 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Submit Proposal</span>
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
