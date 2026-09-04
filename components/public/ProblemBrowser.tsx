'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Challenge } from '@/lib/types';
import {
  Search,
  Filter,
  Building2,
  Calendar,
  IndianRupee,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
  X,
  FileText,
  AlertCircle,
  ShieldCheck,
  Send,
  Bookmark,
  BookmarkCheck,
  Scale,
  Calculator,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  FlaskConical,
} from 'lucide-react';

interface ProblemBrowserProps {
  onApplyForChallenge?: (challenge: Challenge) => void;
}

export default function ProblemBrowser({ onApplyForChallenge }: ProblemBrowserProps) {
  const { challenges, role, setRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'default' | 'budgetHigh' | 'budgetLow' | 'proposals'>('default');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  
  // Interactive Modal States
  const [activeModalChallenge, setActiveModalChallenge] = useState<Challenge | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'kpis' | 'testing' | 'pfmsTranches'>('overview');
  
  // Interactive Side-by-Side Compare state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);

  // Interactive Eligibility Checker state
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [dpiitNumber, setDpiitNumber] = useState('DIPP-104928');
  const [incorpYear, setIncorpYear] = useState('2023');
  const [turnoverUnder100Cr, setTurnoverUnder100Cr] = useState(true);
  const [eligibilityResult, setEligibilityResult] = useState<boolean | null>(null);

  // Extract unique sectors
  const allSectors = Array.from(new Set(challenges.map(c => c.sector)));

  // Bookmark toggle
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Compare toggle
  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  // Filter challenges
  const filteredChallenges = challenges
    .filter(c => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.ministryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSector = selectedSector === 'ALL' || c.sector === selectedSector;
      const matchesStatus = selectedStatus === 'ALL' || c.status === selectedStatus;
      const matchesBookmark = !showBookmarksOnly || bookmarkedIds.includes(c.id);

      return matchesSearch && matchesSector && matchesStatus && matchesBookmark;
    })
    .sort((a, b) => {
      if (sortBy === 'budgetHigh') return b.budgetMax - a.budgetMax;
      if (sortBy === 'budgetLow') return a.budgetMin - b.budgetMin;
      if (sortBy === 'proposals') return b.totalApplications - a.totalApplications;
      return 0;
    });

  const getStatusBadge = (status: Challenge['status']) => {
    switch (status) {
      case 'APPLICATION_OPEN':
        return <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-300">● Open for Proposals</span>;
      case 'PILOT_IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-300">● Live Pilot</span>;
      case 'TESTING_IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded-sm bg-purple-50 text-purple-800 text-[10px] font-bold border border-purple-300">● STQC Lab Testing</span>;
      case 'SHORTLISTED':
        return <span className="px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-300">● G1/G2 Shortlisted</span>;
      default:
        return <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-300">● {status}</span>;
    }
  };

  const handleApplyClick = (challenge: Challenge) => {
    if (role !== 'STARTUP') {
      setRole('STARTUP');
    }
    if (onApplyForChallenge) {
      onApplyForChallenge(challenge);
    }
    setActiveModalChallenge(null);
  };

  const runEligibilityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = 2026;
    const yearNum = parseInt(incorpYear, 10);
    const age = currentYear - yearNum;
    if (dpiitNumber.trim().length > 3 && age <= 10 && turnoverUnder100Cr) {
      setEligibilityResult(true);
    } else {
      setEligibilityResult(false);
    }
  };

  const comparedChallenges = challenges.filter(c => compareIds.includes(c.id));

  return (
    <section id="problems" className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Section Title & Interactive Tools */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-sangam-blue-50 text-sangam-blue-700 text-xs font-bold mb-2 border border-sangam-blue-200">
              <Building2 className="w-3.5 h-3.5" />
              <span>National Innovation Demand Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Government Innovation Challenges
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Published by Central & State Ministries with guaranteed pilot tranches under General Financial Rules (GFR 2017).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Eligibility Quick-Check Button */}
            <button
              onClick={() => {
                setShowEligibilityModal(true);
                setEligibilityResult(null);
              }}
              className="px-3 py-1.5 rounded-sm bg-white hover:bg-slate-50 text-sangam-blue-700 border border-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sangam-blue-600" />
              <span>GFR 161(iv) Eligibility Self-Check</span>
            </button>

            {/* Compare Bar Button */}
            {compareIds.length > 0 && (
              <button
                onClick={() => setShowCompareDrawer(true)}
                className="px-3 py-1.5 rounded-sm bg-sangam-navy-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Scale className="w-3.5 h-3.5 text-sangam-saffron-400" />
                <span>Compare Selected ({compareIds.length}/2)</span>
              </button>
            )}

            <div className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-sm border border-slate-200">
              Showing {filteredChallenges.length} of {challenges.length}
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-4 rounded-md border border-slate-200 mb-6 space-y-3">
          <div className="flex flex-col md:flex-row gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by keyword, ministry, technology (e.g. 'pothole', 'ABDM', 'drone', 'solar')..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-sm border border-slate-300 focus:border-sangam-blue-500 focus:ring-1 focus:ring-sangam-blue-500 text-xs sm:text-sm text-slate-800 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sector Filter Dropdown */}
            <div className="w-full md:w-56">
              <select
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className="w-full px-3 py-2 rounded-sm border border-slate-300 text-xs sm:text-sm text-slate-700 bg-white font-medium focus:border-sangam-blue-500 outline-none cursor-pointer"
              >
                <option value="ALL">All Sectors & Domains</option>
                {allSectors.map(sec => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48">
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-sm border border-slate-300 text-xs sm:text-sm text-slate-700 bg-white font-medium focus:border-sangam-blue-500 outline-none cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="APPLICATION_OPEN">Open for Proposals</option>
                <option value="SHORTLISTED">G1/G2 Shortlisted</option>
                <option value="TESTING_IN_PROGRESS">STQC Testing</option>
                <option value="PILOT_IN_PROGRESS">Live Pilot</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="w-full md:w-44">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-sm border border-slate-300 text-xs sm:text-sm text-slate-700 bg-white font-medium focus:border-sangam-blue-500 outline-none cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="budgetHigh">Budget: High to Low</option>
                <option value="budgetLow">Budget: Low to High</option>
                <option value="proposals">Most Proposals</option>
              </select>
            </div>
          </div>

          {/* Quick Sector Tags & Bookmark Filter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Quick Sector:
              </span>
              <button
                onClick={() => setSelectedSector('ALL')}
                className={`px-2 py-0.5 rounded-sm text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedSector === 'ALL'
                    ? 'bg-sangam-navy-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {allSectors.map(sec => (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`px-2 py-0.5 rounded-sm text-[11px] font-semibold transition-colors cursor-pointer ${
                    selectedSector === sec
                      ? 'bg-sangam-navy-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Bookmarks Toggle */}
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-2.5 py-1 rounded-sm text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showBookmarksOnly
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-600" />
              <span>Saved Challenges ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <div className="bg-white rounded-md border border-slate-200 p-10 text-center max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No challenges match the active filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the sector, keyword, or saved filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSector('ALL');
                setSelectedStatus('ALL');
                setShowBookmarksOnly(false);
                setSortBy('default');
              }}
              className="mt-3 px-3 py-1.5 rounded-sm bg-sangam-blue-600 text-white text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChallenges.map(challenge => {
              const isBookmarked = bookmarkedIds.includes(challenge.id);
              const isCompared = compareIds.includes(challenge.id);

              return (
                <div
                  key={challenge.id}
                  onClick={() => {
                    setActiveModalChallenge(challenge);
                    setModalTab('overview');
                  }}
                  className="bg-white rounded-md border border-slate-200 p-4 flex flex-col justify-between hover:border-sangam-blue-500 transition-colors cursor-pointer group"
                >
                  <div>
                    {/* Ministry & Status Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="text-[10px] font-bold text-sangam-blue-600 uppercase tracking-wider flex items-center gap-1">
                        <Building2 className="w-3 h-3 shrink-0" />
                        <span className="line-clamp-1">{challenge.ministryName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusBadge(challenge.status)}
                        <button
                          onClick={e => toggleBookmark(challenge.id, e)}
                          className="p-1 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                          title={isBookmarked ? 'Remove bookmark' : 'Bookmark challenge'}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-amber-500" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-sangam-blue-600 transition-colors">
                      {challenge.title}
                    </h3>

                    {/* Problem Snippet */}
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {challenge.problemStatement}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {challenge.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Meta & Action Bar */}
                  <div className="pt-3 mt-3 border-t border-slate-100 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Sanctioned Outlay</span>
                        <span className="font-black text-slate-900">
                          ₹{(challenge.budgetMin / 100000).toFixed(0)}L - ₹{(challenge.budgetMax / 100000).toFixed(0)}L
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Submissions</span>
                        <span className="font-bold text-slate-800">
                          {challenge.totalApplications} Proposals
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-50">
                      <button
                        onClick={e => toggleCompare(challenge.id, e)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-sm border transition-colors cursor-pointer flex items-center gap-1 ${
                          isCompared
                            ? 'bg-sangam-navy-900 text-white border-sangam-navy-900'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isCompared ? 'Compared' : 'Compare'}</span>
                      </button>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleApplyClick(challenge);
                        }}
                        className="px-3 py-1 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Apply (DPIIT)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 1. Interactive Detailed Challenge Preview Modal */}
        {activeModalChallenge && (
          <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-md border border-slate-300 shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-sangam-blue-600 uppercase tracking-wider">
                      {activeModalChallenge.ministryName}
                    </span>
                    {getStatusBadge(activeModalChallenge.status)}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {activeModalChallenge.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalChallenge(null)}
                  className="p-1 rounded-sm text-slate-400 hover:text-slate-700 border border-slate-200 bg-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex items-center border-b border-slate-200 px-4 bg-white text-xs font-semibold gap-2">
                <button
                  onClick={() => setModalTab('overview')}
                  className={`py-2 px-2 border-b-2 cursor-pointer transition-colors ${
                    modalTab === 'overview'
                      ? 'border-sangam-blue-600 text-sangam-blue-600 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Problem Scope
                </button>
                <button
                  onClick={() => setModalTab('kpis')}
                  className={`py-2 px-2 border-b-2 cursor-pointer transition-colors ${
                    modalTab === 'kpis'
                      ? 'border-sangam-blue-600 text-sangam-blue-600 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mandatory KPIs
                </button>
                <button
                  onClick={() => setModalTab('testing')}
                  className={`py-2 px-2 border-b-2 cursor-pointer transition-colors ${
                    modalTab === 'testing'
                      ? 'border-sangam-blue-600 text-sangam-blue-600 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Lab Testing Protocols
                </button>
                <button
                  onClick={() => setModalTab('pfmsTranches')}
                  className={`py-2 px-2 border-b-2 cursor-pointer transition-colors ${
                    modalTab === 'pfmsTranches'
                      ? 'border-sangam-blue-600 text-sangam-blue-600 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  PFMS DBT Tranches
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 overflow-y-auto space-y-4 text-xs">
                {modalTab === 'overview' && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs mb-1">Functional Problem Statement</h4>
                      <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-sm border border-slate-200">
                        {activeModalChallenge.problemStatement}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Sector</span>
                        <span className="font-bold text-slate-900">{activeModalChallenge.sector}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Sanctioned Outlay</span>
                        <span className="font-bold text-emerald-700">
                          ₹{(activeModalChallenge.budgetMin / 100000).toFixed(0)}L - ₹{(activeModalChallenge.budgetMax / 100000).toFixed(0)}L
                        </span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Pilot Duration</span>
                        <span className="font-bold text-slate-900">{activeModalChallenge.timelineMonths} Months</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Proposals Received</span>
                        <span className="font-bold text-slate-900">{activeModalChallenge.totalApplications}</span>
                      </div>
                    </div>
                  </div>
                )}

                {modalTab === 'kpis' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900">Technical Benchmarks & Expected Outcomes</h4>
                    <div className="space-y-2">
                      <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                        <span className="font-bold text-slate-800 block mb-1 text-xs">Expected Outcomes:</span>
                        <p className="text-slate-700 leading-relaxed text-xs">{activeModalChallenge.expectedOutcomes}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                        <span className="font-bold text-slate-800 block mb-1 text-xs">Evaluation Criteria:</span>
                        <p className="text-slate-700 leading-relaxed text-xs">{activeModalChallenge.evaluationCriteria}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                        <span className="font-bold text-slate-800 block mb-1 text-xs">Eligibility Norms:</span>
                        <p className="text-slate-700 leading-relaxed text-xs">{activeModalChallenge.eligibilityCriteria}</p>
                      </div>
                    </div>
                  </div>
                )}

                {modalTab === 'testing' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900">Empanelled STQC Lab Benchmarking Specifications</h4>
                    <p className="text-slate-600">
                      Prototypes selected under G1 and G2 categories undergo rigorous validation across 5 standard testing axes:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                        <span className="font-bold text-slate-900 block">• Functional Accuracy</span>
                        <span className="text-slate-600 text-[11px]">Field precision benchmarked against ground truth logs.</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                        <span className="font-bold text-slate-900 block">• Security & CERT-In Compliance</span>
                        <span className="text-slate-600 text-[11px]">Static/dynamic code audit, OWASP top 10 & firmware integrity.</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                        <span className="font-bold text-slate-900 block">• Stress & Peak Latency</span>
                        <span className="text-slate-600 text-[11px]">Load simulations simulating national deployment conditions.</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                        <span className="font-bold text-slate-900 block">• Interoperability & API</span>
                        <span className="text-slate-600 text-[11px]">Open API 3.0 standards and Government Data Lake integration.</span>
                      </div>
                    </div>
                  </div>
                )}

                {modalTab === 'pfmsTranches' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900">Milestone-Based Direct Bank Transfer (DBT) Plan</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">Tranche 1: Mobilization & Architecture Inception (30%)</span>
                          <span className="text-slate-500 text-[11px]">Disbursed within 7 days of contract execution and tripartite agreement signing.</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-700">
                          ₹{((activeModalChallenge.budgetMax * 0.30) / 100000).toFixed(1)} Lakh
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">Tranche 2: STQC Lab Certification & Sandbox Test (40%)</span>
                          <span className="text-slate-500 text-[11px]">Disbursed upon receiving PASS / CONDITIONAL rating from empanelled lab.</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-700">
                          ₹{((activeModalChallenge.budgetMax * 0.40) / 100000).toFixed(1)} Lakh
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">Tranche 3: Field Corridor Pilot Acceptance & GeM Onboarding (30%)</span>
                          <span className="text-slate-500 text-[11px]">Disbursed upon sign-off by Ministry Project Director and GeM listing.</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-700">
                          ₹{((activeModalChallenge.budgetMax * 0.30) / 100000).toFixed(1)} Lakh
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                <button
                  onClick={() => setActiveModalChallenge(null)}
                  className="px-3 py-1.5 rounded-sm border border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleApplyClick(activeModalChallenge)}
                  className="px-4 py-1.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit DPIIT Proposal</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Interactive Side-by-Side Challenge Comparison Drawer */}
        {showCompareDrawer && (
          <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-md border border-slate-300 shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-sangam-blue-600" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Side-by-Side Challenge Comparison
                  </h3>
                </div>
                <button
                  onClick={() => setShowCompareDrawer(false)}
                  className="p-1 rounded-sm text-slate-400 hover:text-slate-700 border border-slate-200 bg-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {comparedChallenges.map(c => (
                    <div key={c.id} className="p-4 bg-slate-50 rounded-sm border border-slate-200 space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-sangam-blue-600 uppercase">{c.ministryName}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                      </div>

                      <div className="space-y-1.5 border-t border-slate-200 pt-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Sector:</span>
                          <span className="font-bold text-slate-800">{c.sector}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Outlay Range:</span>
                          <span className="font-bold text-emerald-700">
                            ₹{(c.budgetMin / 100000).toFixed(0)}L - ₹{(c.budgetMax / 100000).toFixed(0)}L
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Pilot Duration:</span>
                          <span className="font-bold text-slate-800">{c.timelineMonths} Months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Applications:</span>
                          <span className="font-bold text-slate-800">{c.totalApplications} Proposals</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-2">
                        <span className="font-bold text-slate-900 block mb-1">Expected Outcome:</span>
                        <p className="text-[11px] text-slate-700 line-clamp-2">{c.expectedOutcomes}</p>
                      </div>

                      <button
                        onClick={() => {
                          setShowCompareDrawer(false);
                          handleApplyClick(c);
                        }}
                        className="w-full py-1.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Apply for this Challenge
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Interactive GFR 161(iv) Eligibility Self-Assessment Modal */}
        {showEligibilityModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-md border border-slate-300 shadow-xl max-w-lg w-full flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sangam-green-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    GFR 2017 Rule 161(iv) Startup Eligibility Check
                  </h3>
                </div>
                <button
                  onClick={() => setShowEligibilityModal(false)}
                  className="p-1 rounded-sm text-slate-400 hover:text-slate-700 border border-slate-200 bg-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={runEligibilityCheck} className="p-4 space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    DPIIT Certificate Recognition Number
                  </label>
                  <input
                    type="text"
                    required
                    value={dpiitNumber}
                    onChange={e => setDpiitNumber(e.target.value)}
                    placeholder="e.g. DIPP-104928"
                    className="w-full px-3 py-2 rounded-sm border border-slate-300 font-mono text-slate-800 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Year of Incorporation
                    </label>
                    <input
                      type="number"
                      required
                      min="2016"
                      max="2026"
                      value={incorpYear}
                      onChange={e => setIncorpYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm border border-slate-300 text-slate-800 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Annual Turnover
                    </label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        id="turnoverCheck"
                        checked={turnoverUnder100Cr}
                        onChange={e => setTurnoverUnder100Cr(e.target.checked)}
                        className="rounded-sm text-sangam-blue-600 cursor-pointer"
                      />
                      <label htmlFor="turnoverCheck" className="text-slate-700 cursor-pointer">
                        Under ₹100 Crore
                      </label>
                    </div>
                  </div>
                </div>

                {eligibilityResult !== null && (
                  <div
                    className={`p-3 rounded-sm border ${
                      eligibilityResult
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                    }`}
                  >
                    {eligibilityResult ? (
                      <div className="space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>100% Eligible for GFR Innovation Procurement</span>
                        </div>
                        <p className="text-[11px] text-emerald-800">
                          Your startup qualifies for total exemption from prior turnover, prior experience, and EMD deposit requirements under Rule 161(iv).
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                          <span>Not Eligible under DPIIT Startup Norms</span>
                        </div>
                        <p className="text-[11px] text-rose-800">
                          To qualify, entities must be incorporated within 10 years with valid DPIIT recognition and turnover under ₹100 Cr.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowEligibilityModal(false)}
                    className="px-3 py-1.5 rounded-sm border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold cursor-pointer"
                  >
                    Verify GFR Eligibility
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
