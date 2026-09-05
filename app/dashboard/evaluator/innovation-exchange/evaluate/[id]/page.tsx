'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import ComparisonTable from '@/components/innovation-exchange/ComparisonTable';
import StatusBadge from '@/components/innovation-exchange/StatusBadge';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import { AlternativeStatus } from '@/lib/innovation-exchange/types';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Save,
  Building2,
  Award,
  IndianRupee,
  Layers,
  FileText,
} from 'lucide-react';

export default function EvaluatorScoringTerminalPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const {
    getAlternativeById,
    getSolutionById,
    updateReviewScores,
    updateAlternativeStatus,
  } = useInnovationExchange();

  const alternative = getAlternativeById(id);
  const govSolution = alternative ? getSolutionById(alternative.targetSolutionId) : undefined;

  // Local Scoring States
  const [technicalScore, setTechnicalScore] = useState<number>(
    alternative?.review?.technicalScore || 8
  );
  const [feasibilityScore, setFeasibilityScore] = useState<number>(
    alternative?.review?.feasibilityScore || 8
  );
  const [impactScore, setImpactScore] = useState<number>(
    alternative?.review?.impactScore || 8
  );
  const [innovationScore, setInnovationScore] = useState<number>(
    alternative?.review?.innovationScore || 8
  );
  const [comments, setComments] = useState<string>(
    alternative?.review?.comments || ''
  );
  const [evaluatorName, setEvaluatorName] = useState<string>(
    alternative?.review?.reviewerName || 'Dr. K. S. Verma'
  );
  const [evaluatorDesignation, setEvaluatorDesignation] = useState<string>(
    alternative?.review?.reviewerDesignation || 'Member Secretary, Tech Advisory Committee'
  );

  const [status, setStatus] = useState<AlternativeStatus>(
    alternative?.status || 'under_review'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!alternative || !govSolution) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <MainNavbar activeTab="dashboard" />
        <InnovationExchangeNav />
        <main id="main-content" className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-md border border-slate-200 text-center space-y-4 max-w-md">
            <h2 className="text-xl font-bold text-slate-900">Proposal Not Found</h2>
            <Link
              href="/dashboard/evaluator/innovation-exchange"
              className="px-4 py-2 rounded bg-sangam-navy-900 text-white font-bold text-xs inline-block"
            >
              Back to Evaluator Portal
            </Link>
          </div>
        </main>
        <GovernmentFooter />
      </div>
    );
  }

  // Calculated Overall Average
  const calculatedOverall = Number(
    ((technicalScore + feasibilityScore + impactScore + innovationScore) / 4).toFixed(1)
  );

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();

    updateReviewScores(
      alternative.id,
      {
        technicalScore,
        feasibilityScore,
        impactScore,
        innovationScore,
        overallScore: calculatedOverall,
        comments,
        reviewerName: evaluatorName,
        reviewerDesignation: evaluatorDesignation,
      },
      status
    );

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDirectSanction = () => {
    updateReviewScores(
      alternative.id,
      {
        technicalScore: Math.max(technicalScore, 9),
        feasibilityScore: Math.max(feasibilityScore, 9),
        impactScore: Math.max(impactScore, 9),
        innovationScore: Math.max(innovationScore, 9),
        overallScore: 9.2,
        comments: `Fast-Track Sanction authorized under GFR Rule 149(iv). Milestone escrow account approved for pilot deployment. Remarks: ${comments || 'Exceeds public modernization criteria.'}`,
        reviewerName: evaluatorName,
        reviewerDesignation: evaluatorDesignation,
      },
      'approved_for_pilot'
    );
    setStatus('approved_for_pilot');
    setSavedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="dashboard" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-6">
        {/* Top Back Nav */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/evaluator/innovation-exchange"
            className="text-xs font-bold text-slate-600 hover:text-sangam-navy-900 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Evaluation Portal</span>
          </Link>
          <StatusBadge status={status} size="md" />
        </div>

        {/* Title Header */}
        <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-sangam-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>GFR Rule 149(iv) Technical Evaluation Terminal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight">
            {alternative.title}
          </h1>
          <p className="text-xs text-slate-600">
            Startup: <strong className="text-slate-900">{alternative.startupName}</strong> (
            {alternative.startupDpiitNumber}) • Target: <strong>{govSolution.name}</strong>
          </p>
        </div>

        {/* Comparison Table */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-sangam-navy-900">
            Benchmark Analysis vs Government Baseline
          </h2>
          <ComparisonTable governmentSolution={govSolution} alternative={alternative} />
        </div>

        {/* Evaluation Form + Actions */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Evaluation Scoring Form (8/12) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div>
                <h3 className="text-base font-bold text-sangam-navy-900">
                  Committee Scoring Rubric
                </h3>
                <p className="text-xs text-slate-500">Scale of 1.0 to 10.0</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  Weighted Score
                </span>
                <strong className="text-xl font-black text-sangam-blue-600 font-mono">
                  {calculatedOverall} / 10
                </strong>
              </div>
            </div>

            <form onSubmit={handleSaveEvaluation} className="space-y-6">
              {/* Sliders Grid */}
              <div className="grid sm:grid-cols-2 gap-5 text-xs">
                {/* 1. Technical Rigor */}
                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">1. Technical Rigor</span>
                    <span className="font-mono text-sangam-navy-900 text-sm">{technicalScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={technicalScore}
                    onChange={(e) => setTechnicalScore(Number(e.target.value))}
                    className="w-full accent-sangam-blue-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Architecture viability, stack sovereignty, edge compute.
                  </span>
                </div>

                {/* 2. Field Feasibility */}
                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">2. Field Feasibility</span>
                    <span className="font-mono text-sangam-navy-900 text-sm">{feasibilityScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={feasibilityScore}
                    onChange={(e) => setFeasibilityScore(Number(e.target.value))}
                    className="w-full accent-sangam-blue-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Integration ease with legacy NIC/municipal webhooks.
                  </span>
                </div>

                {/* 3. Public Impact */}
                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">3. Public Impact &amp; Savings</span>
                    <span className="font-mono text-sangam-navy-900 text-sm">{impactScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={impactScore}
                    onChange={(e) => setImpactScore(Number(e.target.value))}
                    className="w-full accent-sangam-blue-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Taxpayer savings magnitude and citizen service speed.
                  </span>
                </div>

                {/* 4. Innovation / Novelty */}
                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">4. Innovation Novelty</span>
                    <span className="font-mono text-sangam-navy-900 text-sm">{innovationScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={innovationScore}
                    onChange={(e) => setInnovationScore(Number(e.target.value))}
                    className="w-full accent-sangam-blue-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Defensibility of proprietary algorithms and hardware IP.
                  </span>
                </div>
              </div>

              {/* Committee Remarks */}
              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-800">
                  Official Technical Committee Evaluation Remarks
                </label>
                <textarea
                  rows={4}
                  required
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Record formal technical observations, lab validation findings, and reasons for pilot sanction or deferral..."
                  className="w-full p-3 text-xs rounded border border-slate-300 bg-white leading-relaxed"
                />
              </div>

              {/* Evaluator Identity */}
              <div className="grid sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-150">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Evaluator Name</label>
                  <input
                    type="text"
                    value={evaluatorName}
                    onChange={(e) => setEvaluatorName(e.target.value)}
                    className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Official Designation</label>
                  <input
                    type="text"
                    value={evaluatorDesignation}
                    onChange={(e) => setEvaluatorDesignation(e.target.value)}
                    className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-800">Statutory Lifecycle Decision</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AlternativeStatus)}
                  className="w-full p-2.5 text-xs rounded border border-slate-300 bg-white font-bold text-slate-800"
                >
                  <option value="under_review">Keep Under Technical Review</option>
                  <option value="approved_for_pilot">Sanction Sandbox Pilot Trial (Rule 149(iv))</option>
                  <option value="pilot_ongoing">Mark as Pilot Trial Ongoing</option>
                  <option value="approved">Final Approval &amp; National Scale Empanelment</option>
                  <option value="rejected">Decline Proposal</option>
                </select>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-150">
                {savedSuccess ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Evaluation Saved &amp; Propagated to National Registry!</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">All edits recorded under sovereign audit log.</span>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Committee Evaluation</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Sanction Action Panel (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-sangam-navy-900 text-white p-6 rounded-md border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Fast-Track Pilot Sanction</span>
              </div>

              <h4 className="text-base font-bold">Authorize Corridor Sandbox Pilot</h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                Immediately approve this proposal under GFR Rule 149(iv), allocating ₹25 Lakhs in escrow milestone
                funding for municipal corridor testing.
              </p>

              <button
                onClick={handleDirectSanction}
                className="w-full py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sanction Pilot Corridor Trial</span>
              </button>
            </div>

            {/* Statutory Compliance Checklist */}
            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-3 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider block text-[11px]">
                Rule 149(iv) Statutory Checklist
              </span>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>DPIIT Startup Recognition Verified</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cost reduction ≥ 10% (Achieved: {alternative.costReductionPercent}%)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sovereign Data Storage Certified</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Exempt from prior turnover &amp; experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
