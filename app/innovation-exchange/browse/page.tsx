'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import AlternativeCard from '@/components/innovation-exchange/AlternativeCard';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  Search,
  SlidersHorizontal,
  PlusCircle,
  Sparkles,
  TrendingDown,
  Building2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { AlternativeStatus } from '@/lib/innovation-exchange/types';

export default function BrowseAlternativesPage() {
  const { alternatives, governmentSolutions } = useInnovationExchange();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [minSavings, setMinSavings] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'savings' | 'speed' | 'score' | 'newest'>('savings');

  // Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    governmentSolutions.forEach((g) => set.add(g.category));
    return ['all', ...Array.from(set)];
  }, [governmentSolutions]);

  // Filtered & Sorted Alternatives
  const filteredAlternatives = useMemo(() => {
    return alternatives
      .filter((alt) => {
        const govSol = governmentSolutions.find((g) => g.id === alt.targetSolutionId);

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = alt.title.toLowerCase().includes(q);
          const matchStartup = alt.startupName.toLowerCase().includes(q);
          const matchDesc = alt.description.toLowerCase().includes(q);
          const matchTech = alt.technologyStack.some((t) => t.toLowerCase().includes(q));
          const matchGov = govSol ? govSol.name.toLowerCase().includes(q) : false;

          if (!matchTitle && !matchStartup && !matchDesc && !matchTech && !matchGov) {
            return false;
          }
        }

        // Category
        if (selectedCategory !== 'all') {
          if (!govSol || govSol.category !== selectedCategory) {
            return false;
          }
        }

        // Status
        if (selectedStatus !== 'all') {
          if (alt.status !== selectedStatus) {
            return false;
          }
        }

        // Min Savings
        if (alt.costReductionPercent < minSavings) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'savings') return b.costReductionPercent - a.costReductionPercent;
        if (sortBy === 'speed') return b.timeReductionPercent - a.timeReductionPercent;
        if (sortBy === 'score') return b.aiFeasibilityScore - a.aiFeasibilityScore;
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      });
  }, [alternatives, governmentSolutions, searchQuery, selectedCategory, selectedStatus, minSavings, sortBy]);

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'all' || selectedStatus !== 'all' || minSavings > 0;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setMinSavings(0);
    setSortBy('savings');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="challenges" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-6">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sangam-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Public Repository</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight">
              Startup Alternative Solutions Exchange
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Browse DPIIT-validated innovations proposing cost and timeline reductions against
              incumbent public infrastructure solutions.
            </p>
          </div>

          <Link
            href="/dashboard/startup/innovation-exchange/submit"
            className="px-4 py-2.5 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Submit Your Alternative</span>
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by startup, technology, or department challenge..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded border border-slate-300 focus:outline-none focus:border-sangam-blue-500 bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded border border-slate-300 focus:outline-none focus:border-sangam-blue-500 bg-white font-medium text-slate-700"
              >
                <option value="all">All Sectors &amp; Categories</option>
                {categories
                  .filter((c) => c !== 'all')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded border border-slate-300 focus:outline-none focus:border-sangam-blue-500 bg-white font-medium text-slate-700"
              >
                <option value="all">All Evaluation States</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Technical Review</option>
                <option value="approved_for_pilot">Approved for Pilot</option>
                <option value="pilot_ongoing">Pilot Ongoing</option>
                <option value="approved">Approved &amp; Scaled</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded border border-slate-300 focus:outline-none focus:border-sangam-blue-500 bg-white font-medium text-slate-700"
              >
                <option value="savings">Highest % Cost Savings</option>
                <option value="speed">Fastest Deployment %</option>
                <option value="score">Highest AI Feasibility</option>
                <option value="newest">Recently Submitted</option>
              </select>
            </div>
          </div>

          {/* Secondary Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-150 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                Minimum Cost Reduction:
              </span>
              {[0, 10, 25, 40, 50].map((savingsVal) => (
                <button
                  key={savingsVal}
                  onClick={() => setMinSavings(savingsVal)}
                  className={`px-2.5 py-1 rounded-xs font-mono font-bold text-xs transition-colors cursor-pointer ${
                    minSavings === savingsVal
                      ? 'bg-sangam-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {savingsVal === 0 ? 'Any Savings' : `≥ ${savingsVal}%`}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-sangam-blue-600 hover:text-sangam-navy-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Reset All Filters</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900 font-mono">{filteredAlternatives.length}</strong>{' '}
            alternative proposals
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>GFR Rule 149(iv) 10% threshold compliant</span>
          </div>
        </div>

        {/* Alternatives Grid */}
        {filteredAlternatives.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlternatives.map((alt) => {
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
        ) : (
          <div className="bg-white p-12 rounded-md border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                No matching alternative solutions found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try adjusting your search criteria, reducing the minimum cost reduction percentage, or
                switching sectors.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded bg-sangam-navy-900 text-white font-bold text-xs"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <GovernmentFooter />
    </div>
  );
}
