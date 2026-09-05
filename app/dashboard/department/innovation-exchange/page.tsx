'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import StatusBadge from '@/components/innovation-exchange/StatusBadge';
import OpportunityBadge from '@/components/innovation-exchange/OpportunityBadge';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  Building2,
  PlusCircle,
  TrendingDown,
  Activity,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  X,
  IndianRupee,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function DepartmentInnovationExchangePage() {
  const { governmentSolutions, alternatives, addGovernmentSolution } = useInnovationExchange();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSolName, setNewSolName] = useState('');
  const [newSolDepartment, setNewSolDepartment] = useState('Central Public Works Department (CPWD)');
  const [newSolMinistry, setNewSolMinistry] = useState('Ministry of Housing and Urban Affairs');
  const [newSolCategory, setNewSolCategory] = useState('Urban Infrastructure');
  const [newSolDesc, setNewSolDesc] = useState('');
  const [newSolCost, setNewSolCost] = useState<number>(120);
  const [newSolTime, setNewSolTime] = useState<number>(6);
  const [newSolTech, setNewSolTech] = useState('Legacy CCTV and on-site manual logging registers');
  const [newSolPainPoints, setNewSolPainPoints] = useState('High operational expenditure, Delayed incident response, No central audit trail');

  const handleCreateSolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSolName.trim()) return;

    addGovernmentSolution({
      name: newSolName.trim(),
      department: newSolDepartment,
      ministry: newSolMinistry,
      category: newSolCategory,
      description: newSolDesc.trim() || 'Municipal workflow open for startup AI modernization.',
      currentCost: newSolCost,
      annualMaintenanceCost: Math.round(newSolCost * 0.15),
      currentImplementationTime: newSolTime,
      currentTechnology: newSolTech,
      currentVendor: 'Public Sector Empaneled Enterprise',
      contractExpiryDays: 90,
      painPoints: newSolPainPoints.split(',').map((p) => p.trim()).filter(Boolean),
      opportunityScore: 88,
      location: 'National / Smart Cities Corridor',
    });

    setShowAddModal(false);
    setNewSolName('');
    setNewSolDesc('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="dashboard" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-6">
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sangam-blue-600 uppercase tracking-wider mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Municipal &amp; Ministry Modernization Cell</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight">
              Department Innovation Oversight
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Publish legacy problem statements, monitor incoming startup alternative challenges, and
              sanction live field pilots with escrow milestones under GFR Rule 149(iv).
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Publish New Gov Challenge</span>
          </button>
        </div>

        {/* Oversight Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active Baseline Challenges
            </span>
            <div className="text-2xl sm:text-3xl font-black text-sangam-navy-900 font-mono">
              {governmentSolutions.length}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Published across departments</div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Active Startup Bids
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
              {alternatives.length}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium">Alternative proposals received</div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Corridor Pilots Sanctioned
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">
              {alternatives.filter((a) => a.pilot.approved).length}
            </div>
            <div className="text-[11px] text-amber-600 font-medium">Live testing under PFMS escrow</div>
          </div>
        </div>

        {/* Managed Solutions Breakdown */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-sangam-navy-900">
            Published Department Challenges &amp; Incoming Startup Alternatives
          </h2>

          <div className="space-y-5">
            {governmentSolutions.map((sol) => {
              const matchedAlternatives = alternatives.filter((a) => a.targetSolutionId === sol.id);

              return (
                <div
                  key={sol.id}
                  className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-2xs space-y-4 p-5 sm:p-6"
                >
                  {/* Solution Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-150 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {sol.category}
                        </span>
                        <OpportunityBadge score={sol.opportunityScore} size="sm" />
                      </div>
                      <h3 className="text-lg font-bold text-sangam-navy-900">{sol.name}</h3>
                      <div className="text-xs text-slate-500">
                        {sol.department} • {sol.ministry}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Annual Outlay</span>
                        <strong className="text-slate-900 text-sm">₹{sol.currentCost} L/yr</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Contract Expiry</span>
                        <strong className="text-amber-700 text-sm">{sol.contractExpiryDays} Days</strong>
                      </div>
                    </div>
                  </div>

                  {/* Matched Startup Proposals */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 uppercase tracking-wider">
                        Startup Alternatives Submitted ({matchedAlternatives.length})
                      </span>
                      <Link
                        href={`/dashboard/startup/innovation-exchange/submit?solutionId=${sol.id}`}
                        className="text-xs font-bold text-sangam-blue-600 hover:text-sangam-navy-900 flex items-center gap-1"
                      >
                        <span>Invite Startup Bids</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {matchedAlternatives.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-3">
                        {matchedAlternatives.map((alt) => (
                          <div
                            key={alt.id}
                            className="p-3.5 bg-slate-50 rounded border border-slate-200 hover:border-sangam-blue-400 transition-all flex flex-col justify-between space-y-2 text-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <StatusBadge status={alt.status} size="sm" />
                                <span className="font-mono font-bold text-slate-900 text-[11px]">
                                  Score: {alt.review.overallScore}/10
                                </span>
                              </div>
                              <Link
                                href={`/innovation-exchange/${alt.id}`}
                                className="font-bold text-sangam-navy-900 hover:text-sangam-blue-600 block line-clamp-1"
                              >
                                {alt.title}
                              </Link>
                              <div className="text-[11px] text-slate-500">
                                By <strong className="text-slate-700">{alt.startupName}</strong>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                              <span className="text-emerald-700 font-bold">
                                ₹{alt.proposedCost}L ({alt.costReductionPercent}% savings)
                              </span>
                              <Link
                                href={`/dashboard/evaluator/innovation-exchange/evaluate/${alt.id}`}
                                className="text-sangam-blue-600 font-bold hover:underline"
                              >
                                Review &amp; Sanction →
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded text-center text-xs text-slate-400 italic">
                        No startup proposals submitted yet for this challenge. Open for submissions.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Challenge Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-md border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3">
                <h3 className="text-base font-bold text-sangam-navy-900">
                  Publish Department Baseline Problem Statement
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSolution} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Problem Statement Name</label>
                  <input
                    type="text"
                    required
                    value={newSolName}
                    onChange={(e) => setNewSolName(e.target.value)}
                    placeholder="e.g. Automated Municipal Drainage Clog Detection"
                    className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Department</label>
                    <input
                      type="text"
                      value={newSolDepartment}
                      onChange={(e) => setNewSolDepartment(e.target.value)}
                      className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Ministry</label>
                    <input
                      type="text"
                      value={newSolMinistry}
                      onChange={(e) => setNewSolMinistry(e.target.value)}
                      className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Annual Spend (₹ L)</label>
                    <input
                      type="number"
                      value={newSolCost}
                      onChange={(e) => setNewSolCost(Number(e.target.value))}
                      className="w-full p-2 text-xs rounded border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Rollout Time (Mo)</label>
                    <input
                      type="number"
                      value={newSolTime}
                      onChange={(e) => setNewSolTime(Number(e.target.value))}
                      className="w-full p-2 text-xs rounded border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-800">Category</label>
                    <select
                      value={newSolCategory}
                      onChange={(e) => setNewSolCategory(e.target.value)}
                      className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                    >
                      <option value="Urban Infrastructure">Urban Infrastructure</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Water Management">Water Management</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Description</label>
                  <textarea
                    value={newSolDesc}
                    onChange={(e) => setNewSolDesc(e.target.value)}
                    rows={2}
                    placeholder="Briefly describe the operational bottleneck and desired modernization outcomes."
                    className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">
                    Known Pain Points (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newSolPainPoints}
                    onChange={(e) => setNewSolPainPoints(e.target.value)}
                    className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-150">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs shadow-xs"
                  >
                    Publish to Innovation Exchange
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <GovernmentFooter />
    </div>
  );
}
