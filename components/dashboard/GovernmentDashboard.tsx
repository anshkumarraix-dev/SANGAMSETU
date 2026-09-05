'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Challenge, Proposal, TestReport } from '@/lib/types';
import {
  Building2,
  PlusCircle,
  Cpu,
  Award,
  DollarSign,
  FileCheck,
  CheckCircle2,
  TrendingUp,
  FlaskConical,
  IndianRupee,
  Sparkles,
  Search,
  Filter,
  Users,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export default function GovernmentDashboard() {
  const {
    currentUser,
    challenges,
    proposals,
    testReports,
    pilots,
    auditLogs,
    addChallenge,
    runAIScoring,
    selectWinner,
    approveMilestonePayment,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'manage' | 'post' | 'ai-shortlist' | 'test-reports' | 'pilots'>('ai-shortlist');

  // Selected Challenge for AI Review
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(challenges[0]?.id || '');

  // Post Challenge Form State
  const [title, setTitle] = useState('');
  const [ministryName, setMinistryName] = useState('Ministry of Road Transport & Highways');
  const [departmentName, setDepartmentName] = useState('National Highways Authority of India (NHAI)');
  const [contactPerson, setContactPerson] = useState('Dr. Rajesh Verma, IAS, Chief Engineer (Innovation)');
  const [problemStatement, setProblemStatement] = useState('');
  const [expectedOutcomes, setExpectedOutcomes] = useState('');
  const [sector, setSector] = useState('Infrastructure & Smart Mobility');
  const [tags, setTags] = useState('AI, Computer Vision, Edge Computing');
  const [budgetMin, setBudgetMin] = useState<number>(3000000);
  const [budgetMax, setBudgetMax] = useState<number>(5000000);
  const [timelineMonths, setTimelineMonths] = useState<number>(6);
  const [eligibilityCriteria, setEligibilityCriteria] = useState('DPIIT recognized startup incorporated in India.');
  const [evaluationCriteria, setEvaluationCriteria] = useState('Problem-Solution Fit (20%), Technical Feasibility (15%), Innovation (15%), Impact (15%), Team (10%), Scalability (10%), Risk (8%), Cost (7%).');
  const [pilotLocation, setPilotLocation] = useState('Delhi-Jaipur Expressway (NH-48) - 150 km Stretch');
  const [challengeCreatedSuccess, setChallengeCreatedSuccess] = useState(false);

  // AI Scoring Trigger State
  const [isScoringRunning, setIsScoringRunning] = useState(false);
  const [scoringNotification, setScoringNotification] = useState<string | null>(null);

  // Winner Selection Modal State
  const [selectedProposalForWinner, setSelectedProposalForWinner] = useState<Proposal | null>(null);
  const [winnerPrizeAmount, setWinnerPrizeAmount] = useState<number>(4200000);
  const [winnerNotes, setWinnerNotes] = useState('Selected based on top G1 rank (92.4/100) and exemplary STQC Lab Test Verdict (92/100, PASS). Pilot deployment contract issued.');
  const [winnerSuccess, setWinnerSuccess] = useState(false);

  // Payment approval modal state
  const [approvingPayment, setApprovingPayment] = useState<{ pilotId: string; milestoneId: string; amount: number } | null>(null);
  const [utrInput, setUtrInput] = useState('RBI-NEFT-2026-928410');

  // Target challenge & its proposals
  const activeChallenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];
  const challengeProposals = proposals.filter(p => p.challengeId === activeChallenge?.id);
  const g1Proposals = challengeProposals.filter(p => p.g1Category).sort((a, b) => ((b.aiScore || 0) - (a.aiScore || 0)));
  const g2Proposals = challengeProposals.filter(p => p.g2Category).sort((a, b) => {
    const costA = a.aiScoreBreakdown?.costEffectiveness || 70;
    const costB = b.aiScoreBreakdown?.costEffectiveness || 70;
    return costB - costA;
  });

  const challengeTestReports = testReports.filter(r => r.challengeId === activeChallenge?.id);
  const challengePilots = pilots.filter(p => p.challengeId === activeChallenge?.id);

  // Handle Post Challenge
  const handlePostChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    const newCh = addChallenge({
      governmentDeptId: 'govt-user',
      ministryName,
      departmentName,
      contactPerson,
      title,
      problemStatement,
      expectedOutcomes,
      sector,
      tags: tags.split(',').map(t => t.trim()),
      budgetMin,
      budgetMax,
      currency: 'INR',
      timelineMonths,
      eligibilityCriteria,
      evaluationCriteria,
      status: 'APPLICATION_OPEN',
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      pilotLocation,
    });

    setChallengeCreatedSuccess(true);
    setTimeout(() => {
      setChallengeCreatedSuccess(false);
      setSelectedChallengeId(newCh.id);
      setActiveTab('manage');
    }, 1500);
  };

  // Run AI Scoring
  const handleTriggerAIScoring = () => {
    if (!activeChallenge) return;
    setIsScoringRunning(true);
    setTimeout(() => {
      const result = runAIScoring(activeChallenge.id);
      setIsScoringRunning(false);
      setScoringNotification(`AI Scoring complete! ${result.g1.length} proposals placed in G1 (Best-in-Class) and ${result.g2.length} in G2 (Cost-Effective).`);
      setTimeout(() => setScoringNotification(null), 4000);
    }, 1000);
  };

  // Handle Winner Award
  const handleAwardWinner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProposalForWinner || !activeChallenge) return;

    selectWinner(activeChallenge.id, selectedProposalForWinner.id, winnerPrizeAmount, winnerNotes);
    setWinnerSuccess(true);
    setTimeout(() => {
      setWinnerSuccess(false);
      setSelectedProposalForWinner(null);
      setActiveTab('pilots');
    }, 1500);
  };

  // Handle Payment Approval
  const handleApprovePayment = () => {
    if (!approvingPayment) return;
    approveMilestonePayment(approvingPayment.pilotId, approvingPayment.milestoneId, utrInput);
    setApprovingPayment(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Department Header Card */}
      <div className="bg-sangam-navy-900 text-white rounded-md p-6 sm:p-8 shadow-2xs border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-sm bg-emerald-400 text-slate-950 text-xs font-bold tracking-wide flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                GOVERNMENT PROCUREMENT DESK
              </span>
              <span className="px-2.5 py-0.5 rounded-sm bg-white/20 text-slate-200 text-xs font-semibold">
                Ministry of Road Transport & Highways (MoRTH)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Dr. Rajesh Verma, IAS - Chief Engineer (Innovation)
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              National Highways Authority of India (NHAI) • Fast-track Innovation Procurement Portal for GFR-2017 Exempt Startup Pilots.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('post')}
              className="px-4 py-2 rounded-sm bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs cursor-pointer transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Challenge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('ai-shortlist')}
          className={`px-4 py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'ai-shortlist'
              ? 'bg-sangam-navy-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>AI Shortlist Center (G1 & G2)</span>
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'manage'
              ? 'bg-sangam-navy-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Manage Challenges ({challenges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('test-reports')}
          className={`px-4 py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'test-reports'
              ? 'bg-sangam-navy-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>STQC Lab Test Reports ({testReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pilots')}
          className={`px-4 py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'pilots'
              ? 'bg-sangam-navy-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Active Pilots & DBT Disbursals ({pilots.length})</span>
        </button>
      </div>

      {/* ACTIVE CHALLENGE SELECTOR STRIP (FOR CONTEXT) */}
      {challenges.length > 0 ? (
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold uppercase text-slate-500 shrink-0">Select Challenge:</span>
            <select
              value={selectedChallengeId}
              onChange={e => setSelectedChallengeId(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-sangam-navy-900 bg-slate-50 outline-none"
            >
              {challenges.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.totalApplications} Applications)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
            <span>Status: <strong className="text-sangam-blue-600">{activeChallenge?.status || 'OPEN'}</strong></span>
            <span>•</span>
            <span>Budget: <strong className="text-emerald-700">₹{activeChallenge?.budgetMax ? (activeChallenge.budgetMax / 100000).toFixed(0) : '0'}L</strong></span>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span>No active challenges published yet. Click &quot;Post New Challenge&quot; to publish your first problem statement.</span>
          <button
            onClick={() => setActiveTab('post')}
            className="px-3 py-1.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold cursor-pointer"
          >
            Post New Challenge
          </button>
        </div>
      )}

      {/* TAB 1: AI SHORTLIST CENTER (G1 & G2) */}
      {activeTab === 'ai-shortlist' && (
        <div className="space-y-6">
          {/* AI Trigger Banner */}
          <div className="bg-sangam-navy-900 border border-slate-800 text-white p-6 rounded-md shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5" />
                SANGAMSETU MULTI-CRITERIA AI SCORING ENGINE
              </div>
              <h3 className="text-xl font-black">
                Automated 8-Parameter Proposal Evaluation & Categorization
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Evaluates Problem-Solution Fit, Feasibility, Innovation, Impact, Team, Scalability, Risk, and Cost. Generates transparent G1 (Best Overall) and G2 (Cost-Effective) rosters.
              </p>
            </div>

            <button
              onClick={handleTriggerAIScoring}
              disabled={isScoringRunning}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer shadow-md transition-transform hover:scale-105"
            >
              <Cpu className="w-4 h-4" />
              <span>{isScoringRunning ? 'Evaluating with ML Engine...' : 'Run AI Scoring on All Proposals'}</span>
            </button>
          </div>

          {scoringNotification && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{scoringNotification}</span>
            </div>
          )}

          {/* G1 & G2 COMPARISON GRIDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* G1 CATEGORY (TOP 5 BEST-IN-CLASS) */}
            <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-100 text-amber-800">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-black text-amber-950">G1 Category (Top 5 Best-in-Class)</h4>
                    <p className="text-[11px] text-amber-800">Ranked by Highest Aggregate AI Score</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                  {g1Proposals.length} Selected
                </span>
              </div>

              {g1Proposals.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No proposals categorized yet. Click &quot;Run AI Scoring&quot; above.
                </div>
              ) : (
                <div className="space-y-4">
                  {g1Proposals.map((prop, idx) => (
                    <div
                      key={prop.id}
                      className="p-4 rounded-xl border border-slate-200 bg-amber-50/30 hover:bg-amber-50/70 transition-colors space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 uppercase">
                            Rank #{prop.rankG1 || idx + 1}
                          </span>
                          <h5 className="font-extrabold text-sm text-sangam-navy-900 mt-1">
                            {prop.title}
                          </h5>
                          <span className="text-xs text-slate-600 font-semibold">{prop.startupName} ({prop.dpiitNumber})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-amber-800 block">
                            {prop.aiScore}/100
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold">Overall Score</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                        {prop.solutionOverview}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-amber-100">
                        <span className="font-bold text-slate-700">
                          Proposed Budget: <strong className="text-emerald-700">₹{(prop.totalBudget / 100000).toFixed(2)}L</strong>
                        </span>

                        <button
                          onClick={() => {
                            setSelectedProposalForWinner(prop);
                            setWinnerPrizeAmount(prop.totalBudget);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-sangam-navy-900 hover:bg-sangam-navy-800 text-white font-bold text-xs cursor-pointer shadow-2xs"
                        >
                          Select as Winner & Award
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* G2 CATEGORY (TOP 5 COST-EFFECTIVE) */}
            <div className="bg-white rounded-2xl border-2 border-emerald-300 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                    <DollarSign className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-black text-emerald-950">G2 Category (Top 5 Cost-Effective)</h4>
                    <p className="text-[11px] text-emerald-800">Ranked by Value-for-Money & Tech Soundness</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
                  {g2Proposals.length} Selected
                </span>
              </div>

              {g2Proposals.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No proposals categorized yet. Click &quot;Run AI Scoring&quot; above.
                </div>
              ) : (
                <div className="space-y-4">
                  {g2Proposals.map((prop, idx) => (
                    <div
                      key={prop.id}
                      className="p-4 rounded-xl border border-slate-200 bg-emerald-50/30 hover:bg-emerald-50/70 transition-colors space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 uppercase">
                            Rank #{prop.rankG2 || idx + 1}
                          </span>
                          <h5 className="font-extrabold text-sm text-sangam-navy-900 mt-1">
                            {prop.title}
                          </h5>
                          <span className="text-xs text-slate-600 font-semibold">{prop.startupName} ({prop.dpiitNumber})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-emerald-700 block">
                            {prop.aiScoreBreakdown?.costEffectiveness || 95}/100
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold">Cost-Value Index</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                        {prop.solutionOverview}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-100">
                        <span className="font-bold text-slate-700">
                          Budget: <strong className="text-emerald-700">₹{(prop.totalBudget / 100000).toFixed(2)}L</strong>
                        </span>

                        <button
                          onClick={() => {
                            setSelectedProposalForWinner(prop);
                            setWinnerPrizeAmount(prop.totalBudget);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-sangam-navy-900 hover:bg-sangam-navy-800 text-white font-bold text-xs cursor-pointer shadow-2xs"
                        >
                          Select as Winner & Award
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POST NEW CHALLENGE WIZARD */}
      {activeTab === 'post' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-sangam-navy-900">
              Publish Government Innovation Challenge
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Define operational problem statement, sanctioned innovation budget, and target pilot corridor.
            </p>
          </div>

          {challengeCreatedSuccess && (
            <div className="p-4 mb-6 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Challenge published successfully! Startups nationwide can now submit proposals.</span>
            </div>
          )}

          <form onSubmit={handlePostChallenge} className="space-y-6 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Ministry / Organization *</label>
                <input
                  type="text"
                  required
                  value={ministryName}
                  onChange={e => setMinistryName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Department / Wing *</label>
                <input
                  type="text"
                  required
                  value={departmentName}
                  onChange={e => setDepartmentName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1.5">Challenge Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., AI-Powered Automated Pothole & Road Quality Survey on Expressways"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1.5">Detailed Operational Problem Statement *</label>
              <textarea
                required
                rows={4}
                placeholder="Explain the existing field operational bottleneck, frequency of issue, manual inspection challenges..."
                value={problemStatement}
                onChange={e => setProblemStatement(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 leading-relaxed"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1.5">Target Outcomes & Measurable Deliverables *</label>
              <textarea
                required
                rows={3}
                placeholder="Specific KPIs: >90% precision, GIS georeferencing, >65% cost reduction, real-time data sync..."
                value={expectedOutcomes}
                onChange={e => setExpectedOutcomes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Minimum Budget (INR ₹) *</label>
                <input
                  type="number"
                  required
                  step={100000}
                  value={budgetMin}
                  onChange={e => setBudgetMin(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Maximum Budget (INR ₹) *</label>
                <input
                  type="number"
                  required
                  step={100000}
                  value={budgetMax}
                  onChange={e => setBudgetMax(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Pilot Timeline (Months) *</label>
                <input
                  type="number"
                  required
                  min={3}
                  max={24}
                  value={timelineMonths}
                  onChange={e => setTimelineMonths(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1.5">Designated Pilot Corridor / Location *</label>
              <input
                type="text"
                required
                value={pilotLocation}
                onChange={e => setPilotLocation(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('manage')}
                className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Challenge on National Portal</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: STQC LAB TEST REPORTS REVIEW */}
      {activeTab === 'test-reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-black text-sangam-navy-900">
                Independent Empanelled Lab Benchmarks (STQC / C-DAC)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Official test certificates submitted by MeitY empanelled testing laboratories for prototype validation.
              </p>
            </div>

            {testReports.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
                <FlaskConical className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">No lab test reports received yet</h4>
                <p className="text-xs text-slate-500 mt-1">Empanelled testing laboratories (STQC/C-DAC) will submit independent validation reports here.</p>
              </div>
            ) : (
              testReports.map(rep => (
              <div key={rep.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-700 uppercase flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5" />
                      {rep.testingOrgName}
                    </span>
                    <h4 className="text-lg font-black text-sangam-navy-900 mt-0.5">{rep.solutionTitle}</h4>
                    <span className="text-xs text-slate-600 font-semibold">Startup: {rep.startupName}</span>
                  </div>

                  <div className="text-right">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${
                      rep.verdict === 'PASS'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      Verdict: {rep.verdict}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 block mt-1">
                      Cert: {rep.certificateNumber}
                    </span>
                  </div>
                </div>

                {/* 5 Technical Scores */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Functionality</span>
                    <span className="text-lg font-black text-sangam-blue-600">{rep.functionalityScore}/10</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Performance</span>
                    <span className="text-lg font-black text-sangam-blue-600">{rep.performanceScore}/10</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Security (CERT-In)</span>
                    <span className="text-lg font-black text-sangam-blue-600">{rep.securityScore}/10</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Usability</span>
                    <span className="text-lg font-black text-sangam-blue-600">{rep.usabilityScore}/10</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Integration</span>
                    <span className="text-lg font-black text-sangam-blue-600">{rep.integrationScore}/10</span>
                  </div>
                </div>

                {/* Findings & Recommendations */}
                <div className="space-y-2 text-xs bg-white p-4 rounded-xl border border-slate-200">
                  <p><strong>Functionality & Accuracy:</strong> {rep.functionalityReport}</p>
                  <p><strong>Security Assessment:</strong> {rep.securityReport}</p>
                  <p className="text-emerald-900 font-semibold"><strong>Lab Recommendation:</strong> {rep.recommendations}</p>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PILOT MANAGEMENT & PAYMENT APPROVAL */}
      {activeTab === 'pilots' && (
        <div className="space-y-6">
          {pilots.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
              <TrendingUp className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No active pilots sanctioned</h3>
              <p className="text-xs text-slate-500 mt-1">
                When top-ranked G1/G2 startups complete STQC testing and receive pilot work orders under GFR 149/194, their contracts and milestone payment approval queues will appear here.
              </p>
            </div>
          ) : (
            pilots.map(pilot => (
            <div key={pilot.id} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Sanctioned Pilot Contract</span>
                  <h3 className="text-xl font-black text-sangam-navy-900 mt-0.5">{pilot.challengeTitle}</h3>
                  <p className="text-xs text-slate-600 mt-1">Winner Startup: <strong>{pilot.startupName}</strong> • Corridor: {pilot.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Sanctioned Value</span>
                  <span className="text-2xl font-black text-emerald-700">
                    ₹{(pilot.totalBudget / 100000).toFixed(2)} Lakhs
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Disbursed so far: ₹{(pilot.disbursedAmount / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
              </div>

              {/* Milestones & Approval Queue */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Milestone Fund Release Requests
                </h4>

                {pilot.milestones.map(ms => (
                  <div
                    key={ms.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-sangam-navy-900">{ms.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ms.paymentStatus === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ms.paymentStatus === 'REQUESTED'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {ms.paymentStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{ms.description}</p>
                      {ms.utrNumber && (
                        <div className="text-[11px] font-mono text-emerald-800 font-bold">
                          Disbursed UTR: {ms.utrNumber}
                        </div>
                      )}
                    </div>

                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                      <span className="text-sm font-extrabold text-slate-900">
                        ₹{(ms.paymentAmount / 100000).toFixed(2)} Lakhs
                      </span>

                      {ms.paymentStatus === 'REQUESTED' && (
                        <button
                          onClick={() => setApprovingPayment({ pilotId: pilot.id, milestoneId: ms.id, amount: ms.paymentAmount })}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md"
                        >
                          Approve & Issue DBT Payment
                        </button>
                      )}
                      {ms.paymentStatus === 'PAID' && (
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Cleared via RBI-NEFT
                        </span>
                      )}
                      {ms.paymentStatus === 'PENDING' && (
                        <span className="text-[11px] text-slate-400">Awaiting startup deliverable</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )))
        }
        </div>
      )}

      {/* MINISTRY OFFICER ACTION QUEUE & STATUTORY AUDIT STRIP */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-500">DBT Fund Disbursal</span>
              <span className="px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                Action Required
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">2 Milestone Payments Ready</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verify startup milestone proofs and authorize RBI-NEFT / Treasury UTR transfer.
            </p>
            <button
              onClick={() => setActiveTab('pilots')}
              className="mt-2 w-full py-1.5 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <span>Review Pilots & Disburse</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-500">STQC Lab Validation</span>
              <span className="px-2 py-0.5 rounded-sm bg-purple-50 text-purple-800 text-[10px] font-bold border border-purple-200">
                Lab Certified
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{testReports.length} Test Reports Available</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Examine official test verdicts from STQC Bengaluru and C-DAC Pune prior to final award.
            </p>
            <button
              onClick={() => setActiveTab('test-reports')}
              className="mt-2 w-full py-1.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <span>Examine Test Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-500">AI Scoring Engine</span>
              <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                G1 / G2 Active
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Algorithmic Proposal Triage</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review multi-criteria scores, SHAP explanations, and Fairlearn demographic parity checks.
            </p>
            <button
              onClick={() => setActiveTab('ai-shortlist')}
              className="mt-2 w-full py-1.5 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <span>View AI Shortlists</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Real-time Department Audit Trail Table */}
        <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sangam-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Ministry Innovation Procurement Activity Ledger</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Live CAG/CVC Audit Mirror</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="py-2 px-3 font-bold">Action Type</th>
                  <th className="py-2 px-3 font-bold">Procurement Item</th>
                  <th className="py-2 px-3 font-bold">Authorized Officer</th>
                  <th className="py-2 px-3 font-bold">Date & Time</th>
                  <th className="py-2 px-3 font-bold text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.slice(0, 4).map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-800 font-mono text-[10px] font-bold border border-slate-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{log.entity}: {log.entityId}</td>
                    <td className="py-2.5 px-3 text-slate-600">{log.userName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                      {new Date(log.timestamp).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Recorded
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statutory GFR 2017 Notice Strip */}
        <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Procurement Governance:</strong> Fully compliant with General Financial Rules (GFR) 2017 Rule 161(iv), Rule 173(i) (No Prior Turnover/Experience Required), and DPIIT Startup Innovation Procurement Guidelines.
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-500 shrink-0">
            NHAI Desk ID: MORTH-NHAI-INN-2026
          </div>
        </div>
      </div>

      {/* WINNER SELECTION MODAL */}
      {selectedProposalForWinner && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[11px] font-bold text-amber-600 uppercase">Sanction Pilot Contract</span>
              <h3 className="text-xl font-black text-sangam-navy-900 mt-1">
                Select Winning Startup & Execute Award
              </h3>
            </div>

            {winnerSuccess && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Winner awarded and pilot initialized successfully!</span>
              </div>
            )}

            <form onSubmit={handleAwardWinner} className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800">Winning Proposal:</span>
                <p className="text-sangam-navy-900 font-extrabold">{selectedProposalForWinner.title}</p>
                <p className="text-slate-600">{selectedProposalForWinner.startupName} ({selectedProposalForWinner.dpiitNumber})</p>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Sanctioned Pilot Fund (INR ₹) *</label>
                <input
                  type="number"
                  required
                  value={winnerPrizeAmount}
                  onChange={e => setWinnerPrizeAmount(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Committee Award Remarks & Sanction Order *</label>
                <textarea
                  required
                  rows={3}
                  value={winnerNotes}
                  onChange={e => setWinnerNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedProposalForWinner(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sangam-navy-900 hover:bg-sangam-navy-800 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  Confirm Award & Issue Pilot Sanction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPROVE PAYMENT MODAL */}
      {approvingPayment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-5">
            <h3 className="text-lg font-black text-sangam-navy-900">Authorize Direct Bank Transfer (DBT)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are authorizing milestone fund release of <strong>₹{(approvingPayment.amount / 100000).toFixed(2)} Lakhs</strong> to the verified startup bank account.
            </p>

            <div>
              <label className="font-bold text-xs text-slate-700 block mb-1">RBI-NEFT / Treasury UTR Number *</label>
              <input
                type="text"
                required
                value={utrInput}
                onChange={e => setUtrInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setApprovingPayment(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleApprovePayment}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Authorize & Disburse Fund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
