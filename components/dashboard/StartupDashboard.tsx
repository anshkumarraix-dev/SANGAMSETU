'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Challenge, Proposal, Prototype, StartupProfile } from '@/lib/types';
import {
  Rocket,
  FileText,
  Send,
  CheckCircle2,
  Clock,
  Award,
  DollarSign,
  AlertCircle,
  Upload,
  Cpu,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Paperclip,
  IndianRupee,
  Layers,
  MapPin,
  Globe,
  X,
} from 'lucide-react';

interface StartupDashboardProps {
  preselectedChallenge?: Challenge | null;
}

export default function StartupDashboard({ preselectedChallenge }: StartupDashboardProps) {
  const {
    currentUser,
    startups,
    challenges,
    proposals,
    prototypes,
    pilots,
    submitProposal,
    submitPrototype,
    requestMilestonePayment,
  } = useApp();

  const defaultStartup: StartupProfile = {
    id: 'startup-default',
    userId: currentUser.id,
    name: currentUser.organization || 'My Registered Startup',
    dpiitNumber: 'DIPP-PENDING',
    dpiitVerified: true,
    panNumber: 'AABCS1234F',
    gstNumber: '07AABCS1234F1Z5',
    udyamNumber: 'UDYAM-DL-01-0012345',
    website: 'https://startupindia.gov.in',
    description: 'DPIIT Registered Startup Profile - No active dummy profile loaded.',
    foundingYear: new Date().getFullYear(),
    teamSize: 5,
    sectors: ['DeepTech', 'Innovation'],
    technologies: ['AI', 'IoT'],
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    bankAccountNumber: '912010048912341',
    ifscCode: 'SBIN0001234',
    accountHolderName: currentUser.name,
  };

  const currentStartup = startups.find(s => s.userId === currentUser.id) || startups[0] || defaultStartup;

  const [activeTab, setActiveTab] = useState<'proposals' | 'apply' | 'prototypes' | 'milestones'>(
    preselectedChallenge ? 'apply' : 'proposals'
  );

  // Proposal Submission Form State
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    preselectedChallenge?.id || challenges[0]?.id || ''
  );
  const [proposalTitle, setProposalTitle] = useState('');
  const [solutionOverview, setSolutionOverview] = useState('');
  const [technicalApproach, setTechnicalApproach] = useState('');
  const [innovation, setInnovation] = useState('');
  const [teamDetails, setTeamDetails] = useState('');
  const [totalBudget, setTotalBudget] = useState<number>(3800000);
  const [timelineMonths, setTimelineMonths] = useState<number>(6);
  const [impactMetrics, setImpactMetrics] = useState('');
  const [scalability, setScalability] = useState('');
  const [riskAnalysis, setRiskAnalysis] = useState('');
  const [formSubmittedSuccess, setFormSubmittedSuccess] = useState(false);

  // Prototype Submission Form State
  const [selectedProposalForProto, setSelectedProposalForProto] = useState<string>('');
  const [protoUrl, setProtoUrl] = useState('');
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [archNotes, setArchNotes] = useState('');
  const [protoSuccess, setProtoSuccess] = useState(false);

  // AI Gemini Analysis state for proposal
  const [geminiAnalysisLoading, setGeminiAnalysisLoading] = useState<string | null>(null);
  const [geminiAnalysisResult, setGeminiAnalysisResult] = useState<any | null>(null);

  const myProposals = proposals.filter(p => p.startupId === currentStartup.id);
  const myPrototypes = prototypes.filter(p => p.startupId === currentStartup.id);
  const myPilots = pilots.filter(p => p.startupId === currentStartup.id);

  // Handle Proposal Submission
  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const challenge = challenges.find(c => c.id === selectedChallengeId);
    if (!challenge) return;

    submitProposal({
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      startupId: currentStartup.id,
      startupName: currentStartup.name,
      dpiitNumber: currentStartup.dpiitNumber,
      title: proposalTitle,
      solutionOverview,
      technicalApproach,
      innovation,
      teamDetails,
      budgetBreakdown: {
        rdDevelopment: Math.round(totalBudget * 0.35),
        hardwareInfrastructure: Math.round(totalBudget * 0.3),
        pilotTesting: Math.round(totalBudget * 0.15),
        teamManpower: Math.round(totalBudget * 0.15),
        contingency: Math.round(totalBudget * 0.05),
      },
      totalBudget,
      timelineMonths,
      impactMetrics,
      scalability,
      riskAnalysis,
      documents: [
        { name: `${proposalTitle.slice(0, 20)}_Technical_Dossier.pdf`, size: '3.4 MB', url: '#' },
        { name: 'DPIIT_Registration_Certificate.pdf', size: '1.2 MB', url: '#' },
      ],
    });

    setFormSubmittedSuccess(true);
    setTimeout(() => {
      setFormSubmittedSuccess(false);
      setActiveTab('proposals');
      // Reset form
      setProposalTitle('');
      setSolutionOverview('');
      setTechnicalApproach('');
      setInnovation('');
    }, 1500);
  };

  // Handle Prototype Submission
  const handlePrototypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProp = proposals.find(p => p.id === selectedProposalForProto);
    if (!targetProp) return;

    submitPrototype({
      proposalId: targetProp.id,
      challengeId: targetProp.challengeId,
      startupId: currentStartup.id,
      startupName: currentStartup.name,
      solutionTitle: targetProp.title,
      submissionUrl: protoUrl,
      demoVideoUrl,
      repositoryUrl: repoUrl,
      documentation: [
        { title: 'STQC Testing Harness Manual', url: '#' },
        { title: 'API Endpoint Specs', url: '#' },
      ],
      architectureNotes: archNotes,
    });

    setProtoSuccess(true);
    setTimeout(() => {
      setProtoSuccess(false);
      setActiveTab('prototypes');
    }, 1500);
  };

  // Trigger Gemini AI Strategic Review
  const runGeminiStrategicReview = async (prop: Proposal) => {
    setGeminiAnalysisLoading(prop.id);
    try {
      const res = await fetch('/api/gemini/analyze-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalTitle: prop.title,
          startupName: prop.startupName,
          solutionOverview: prop.solutionOverview,
          technicalApproach: prop.technicalApproach,
          challengeTitle: prop.challengeTitle,
          budget: prop.totalBudget,
        }),
      });
      const data = await res.json();
      setGeminiAnalysisResult({ ...data, proposalId: prop.id });
    } catch {
      console.error('[AI] Proposal analysis fetch error');
    } finally {
      setGeminiAnalysisLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Startup Profile Card */}
      <div className="relative bg-sangam-navy-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 shadow-sm overflow-hidden">
        <Image
          src="/images/dash-startup.jpg"
          alt="Startup technology lab, agile software engineering team"
          fill
          loading="lazy"
          className="object-cover object-center opacity-75"
          sizes="100vw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sangam-navy-950/90 via-sangam-navy-950/65 to-sangam-navy-950/35 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-sm bg-amber-400 text-slate-950 text-xs font-black tracking-wide flex items-center gap-1">
                <Rocket className="w-3.5 h-3.5" />
                DPIIT RECOGNIZED STARTUP
              </span>
              <span className="px-2.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified ({currentStartup.dpiitNumber})
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black">{currentStartup.name}</h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              {currentStartup.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {currentStartup.city}, {currentStartup.state}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                Team: {currentStartup.teamSize} Members
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                {currentStartup.website}
              </span>
              <span>•</span>
              <span className="text-amber-300 font-bold">GFR 2017 Exemption Active</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20 text-xs space-y-2 shrink-0">
            <div className="font-bold text-amber-300">Registered Bank Account (DBT)</div>
            <div className="font-mono text-slate-200">{currentStartup.bankAccountNumber}</div>
            <div className="text-slate-300 text-[11px]">IFSC: {currentStartup.ifscCode}</div>
            <div className="text-[10px] text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct Bank Transfer Ready
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('proposals')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'proposals'
              ? 'bg-sangam-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>My Submitted Proposals ({myProposals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('apply')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'apply'
              ? 'bg-sangam-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Submit New Proposal</span>
        </button>

        <button
          onClick={() => setActiveTab('prototypes')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'prototypes'
              ? 'bg-sangam-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Prototype Submissions ({myPrototypes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'milestones'
              ? 'bg-sangam-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <IndianRupee className="w-4 h-4" />
          <span>Pilots & DBT Payments ({myPilots.length})</span>
        </button>
      </div>

      {/* TAB 1: MY SUBMITTED PROPOSALS */}
      {activeTab === 'proposals' && (
        <div className="space-y-6">
          {myProposals.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No proposals submitted yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Browse open government challenges and submit your innovation proposal to get scored by AI.
              </p>
              <button
                onClick={() => setActiveTab('apply')}
                className="mt-4 px-5 py-2.5 rounded-xl bg-sangam-blue-600 text-white text-xs font-bold"
              >
                Apply for a Challenge
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {myProposals.map(prop => (
                <div
                  key={prop.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="text-[11px] font-bold text-sangam-blue-600 flex items-center gap-1.5 uppercase">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{prop.challengeTitle}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-sangam-navy-900 mt-1">
                        {prop.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {prop.g1Category && (
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-700" />
                          G1 Leader (Rank #{prop.rankG1 || 1})
                        </span>
                      )}
                      {prop.g2Category && (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                          G2 Cost-Effective (Rank #{prop.rankG2 || 1})
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                        {prop.status}
                      </span>
                    </div>
                  </div>

                  {/* Summary & Technical Strategy */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Solution Overview:</span>
                        <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                          {prop.solutionOverview}
                        </p>
                      </div>

                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Innovation Novelty:</span>
                        <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                          {prop.innovation}
                        </p>
                      </div>

                      {/* Documents */}
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Submitted Dossiers:</span>
                        <div className="flex flex-wrap gap-2">
                          {prop.documents.map((doc, idx) => (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium"
                            >
                              <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                              <span>{doc.name}</span>
                              <span className="text-[10px] text-slate-400">({doc.size})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI Scoring Breakdown Card */}
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-extrabold uppercase text-sangam-navy-900 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-sangam-blue-600" />
                          AI Scorecard
                        </span>
                        <div className="text-right">
                          <span className="text-xl font-black text-sangam-blue-600">
                            {prop.aiScore || 88}/100
                          </span>
                        </div>
                      </div>

                      {prop.aiScoreBreakdown && (
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-slate-700">
                            <span>Problem-Solution Fit:</span>
                            <span className="font-bold text-slate-900">{prop.aiScoreBreakdown.problemSolutionFit}/100</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Technical Feasibility:</span>
                            <span className="font-bold text-slate-900">{prop.aiScoreBreakdown.technicalFeasibility}/100</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Innovation Quotient:</span>
                            <span className="font-bold text-slate-900">{prop.aiScoreBreakdown.innovation}/100</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Impact Potential:</span>
                            <span className="font-bold text-slate-900">{prop.aiScoreBreakdown.impactPotential}/100</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Cost-Effectiveness:</span>
                            <span className="font-bold text-emerald-700">{prop.aiScoreBreakdown.costEffectiveness}/100</span>
                          </div>
                        </div>
                      )}

                      {prop.aiExplanation && (
                        <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100 text-[11px] text-slate-700 leading-relaxed">
                          <strong>AI Evaluator Note:</strong> {prop.aiExplanation}
                        </div>
                      )}

                      {/* Gemini Strategic AI Advisor Button */}
                      <button
                        onClick={() => runGeminiStrategicReview(prop)}
                        disabled={geminiAnalysisLoading === prop.id}
                        className="w-full py-2 px-3 rounded-lg bg-sangam-navy-900 hover:bg-sangam-navy-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{geminiAnalysisLoading === prop.id ? 'Generating AI Review...' : 'AI Strategic Committee Review'}</span>
                      </button>
                    </div>
                  </div>

                  {/* AI Strategic Review Drawer if open for this proposal */}
                  {geminiAnalysisResult && geminiAnalysisResult.proposalId === prop.id && (
                    <div className="p-5 bg-slate-50 rounded-md border border-slate-200 text-xs space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sangam-navy-900 text-sm flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-sangam-blue-600" />
                          SangamSetu AI Strategic Evaluation Report
                        </span>
                        <button
                          onClick={() => setGeminiAnalysisResult(null)}
                          className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Close</span>
                        </button>
                      </div>

                      <p className="text-slate-800 leading-relaxed font-medium">
                        {geminiAnalysisResult.summary}
                      </p>

                      <div className="p-3 bg-white/80 rounded-lg border border-indigo-100">
                        <span className="font-bold text-indigo-900 block mb-1">Formal Recommendation:</span>
                        <p className="text-indigo-950">{geminiAnalysisResult.recommendation}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="bg-white/70 p-3 rounded-lg border border-slate-200">
                          <span className="font-bold text-rose-800 block mb-1">Identified Operational Risks:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                            {geminiAnalysisResult.risks?.map((r: string, idx: number) => (
                              <li key={idx}>{r}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/70 p-3 rounded-lg border border-slate-200">
                          <span className="font-bold text-emerald-800 block mb-1">Proposed Mitigations:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                            {geminiAnalysisResult.mitigations?.map((m: string, idx: number) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions (Submit Prototype if shortlisted) */}
                  {(prop.g1Category || prop.g2Category) && (
                    <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-amber-900">
                        <Award className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          <strong>Congratulations!</strong> This solution is shortlisted. Please submit your working prototype for STQC Lab Evaluation.
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProposalForProto(prop.id);
                          setActiveTab('prototypes');
                        }}
                        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-2xs"
                      >
                        Submit Prototype Data
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SUBMIT NEW PROPOSAL FORM */}
      {activeTab === 'apply' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-sangam-navy-900">
              Submit Innovation Proposal (DPIIT Track)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              7-Part Structured Proposal compliant with Government of India innovation procurement criteria.
            </p>
          </div>

          {formSubmittedSuccess && (
            <div className="p-4 mb-6 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Proposal submitted successfully! AI Scoring Engine is evaluating your parameters.</span>
            </div>
          )}

          <form onSubmit={handleProposalSubmit} className="space-y-6 text-xs sm:text-sm">
            {/* 1. Target Challenge Selector */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">
                1. Select Government Challenge *
              </label>
              <select
                value={selectedChallengeId}
                onChange={e => setSelectedChallengeId(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 bg-white font-medium focus:border-sangam-blue-500 outline-none"
              >
                {challenges.map(c => (
                  <option key={c.id} value={c.id}>
                    [{c.ministryName}] {c.title} (Max: ₹{(c.budgetMax / 100000).toFixed(0)}L)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Proposal Title */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">
                2. Innovation Solution Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., MargDrishti: Dual-Camera Edge AI Pothole & Roughness Profiler"
                value={proposalTitle}
                onChange={e => setProposalTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 focus:border-sangam-blue-500 outline-none"
              />
            </div>

            {/* 3. Solution Overview */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">
                3. Solution Overview & Operational Workflow *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe how your solution functions in field conditions, sensor inputs, edge algorithms, and output synchronization..."
                value={solutionOverview}
                onChange={e => setSolutionOverview(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 focus:border-sangam-blue-500 outline-none leading-relaxed"
              />
            </div>

            {/* 4. Technical Approach */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">
                4. Technical Approach, Architecture & Stack *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Hardware specifications, TensorRT / quantized model pipeline, cloud telemetry (MQTT/REST), offline buffering..."
                value={technicalApproach}
                onChange={e => setTechnicalApproach(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 focus:border-sangam-blue-500 outline-none leading-relaxed"
              />
            </div>

            {/* 5. Innovation Novelty & IP */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">
                5. Innovation Quotient & Proprietary Novelty *
              </label>
              <textarea
                required
                rows={2}
                placeholder="What makes your approach novel over conventional manual or imported solutions? (Patents, algorithms, custom IP)"
                value={innovation}
                onChange={e => setInnovation(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 focus:border-sangam-blue-500 outline-none leading-relaxed"
              />
            </div>

            {/* 6. Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  6. Proposed Pilot Budget (INR ₹) *
                </label>
                <input
                  type="number"
                  required
                  min={500000}
                  max={10000000}
                  step={100000}
                  value={totalBudget}
                  onChange={e => setTotalBudget(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 focus:border-sangam-blue-500 outline-none font-bold"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  ₹{(totalBudget / 100000).toFixed(2)} Lakhs (Auto-scored for Cost-Effectiveness)
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  7. Pilot Delivery Timeline (Months) *
                </label>
                <select
                  value={timelineMonths}
                  onChange={e => setTimelineMonths(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 bg-white font-bold"
                >
                  <option value={3}>3 Months (Rapid Prototype)</option>
                  <option value={6}>6 Months (Standard Pilot)</option>
                  <option value={9}>9 Months (Multi-State Field Trial)</option>
                </select>
              </div>
            </div>

            {/* 7. Team & Scalability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  Team Capability & Leadership *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Led by PhD / IIT alumni with 10+ yrs domain track record..."
                  value={teamDetails}
                  onChange={e => setTeamDetails(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  Scalability & Field Deployment *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Pan-India cloud scale, multi-lingual, low-bandwidth resilience..."
                  value={scalability}
                  onChange={e => setScalability(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                />
              </div>
            </div>

            {/* Risk & Mitigation */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">
                Risk Management & Data Security *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Hardware ruggedization, CERT-In compliance, failover modes..."
                value={riskAnalysis}
                onChange={e => setRiskAnalysis(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 leading-relaxed"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('proposals')}
                className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submit Proposal for AI Scoring</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: PROTOTYPE SUBMISSION PORTAL */}
      {activeTab === 'prototypes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-black text-sangam-navy-900 mb-1">
              Prototype & Testing Documentation Portal
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Shortlisted G1 and G2 startups must submit working prototypes and credentials for independent STQC / CDAC Lab benchmarking.
            </p>

            {protoSuccess && (
              <div className="p-4 mb-6 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Prototype submitted! Assigned to STQC Testing Directorate for validation.</span>
              </div>
            )}

            <form onSubmit={handlePrototypeSubmit} className="space-y-5 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  Select Shortlisted Proposal *
                </label>
                <select
                  value={selectedProposalForProto}
                  onChange={e => setSelectedProposalForProto(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 bg-white font-medium"
                >
                  <option value="">-- Choose Shortlisted Proposal --</option>
                  {myProposals.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} (AI Score: {p.aiScore}/100)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-800 block mb-1.5">
                    Live Staging / Cloud Prototype URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://demo.startup.ai/gov-sandbox"
                    value={protoUrl}
                    onChange={e => setProtoUrl(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1.5">
                    Demo Video Walkthrough (YouTube / Drive)
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={demoVideoUrl}
                    onChange={e => setDemoVideoUrl(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  Source Code / Test Harness Repository (Private / NIC Auth)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/startup-org/sangamsetu-prototype"
                  value={repoUrl}
                  onChange={e => setRepoUrl(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  Lab Setup & Physical Calibration Instructions *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Details on physical hardware units shipped to STQC lab, pinouts, power requirements, API keys..."
                  value={archNotes}
                  onChange={e => setArchNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sangam-navy-900 hover:bg-sangam-navy-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Prototype to STQC Lab</span>
                </button>
              </div>
            </form>
          </div>

          {/* List of Submitted Prototypes */}
          {myPrototypes.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Active Prototype Testing Queue
              </h4>
              {myPrototypes.map(proto => (
                <div key={proto.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sangam-navy-900 text-base">{proto.solutionTitle}</span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                      {proto.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div><strong>Live URL:</strong> <a href={proto.submissionUrl} target="_blank" className="text-blue-600 underline">{proto.submissionUrl}</a></div>
                    {proto.demoVideoUrl && <div><strong>Video:</strong> <a href={proto.demoVideoUrl} target="_blank" className="text-blue-600 underline">{proto.demoVideoUrl}</a></div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PILOTS & DBT PAYMENTS */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          {myPilots.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <Award className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No active pilots yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Once your prototype passes STQC Lab testing and the Ministry awards the contract, milestone DBT tracking will appear here.
              </p>
            </div>
          ) : (
            myPilots.map(pilot => (
              <div key={pilot.id} className="bg-white rounded-md border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase">Active Pilot Contract</span>
                    <h3 className="text-xl font-black text-sangam-navy-900 mt-0.5">{pilot.challengeTitle}</h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Corridor: {pilot.location}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Sanctioned Budget</span>
                    <span className="text-2xl font-black text-emerald-700">
                      ₹{(pilot.totalBudget / 100000).toFixed(2)} Lakhs
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Disbursed: ₹{(pilot.disbursedAmount / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">{pilot.currentPhase}</span>
                    <span className="text-sangam-blue-600">{pilot.progress}% Completed</span>
                  </div>
                  <div className="w-full h-2.5 rounded-sm bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-500"
                      style={{ width: `${pilot.progress}%` }}
                    />
                  </div>
                </div>

                {/* Milestones List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Payment Milestones & DBT Fund Release
                  </h4>

                  {pilot.milestones.map((ms, idx) => (
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
                            UTR: {ms.utrNumber}
                          </div>
                        )}
                      </div>

                      <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{(ms.paymentAmount / 100000).toFixed(2)} Lakhs
                        </span>

                        {ms.paymentStatus === 'PENDING' && (
                          <button
                            onClick={() => requestMilestonePayment(pilot.id, ms.id)}
                            className="px-3 py-1.5 rounded-lg bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs cursor-pointer"
                          >
                            Request Fund Release
                          </button>
                        )}
                        {ms.paymentStatus === 'REQUESTED' && (
                          <span className="text-[11px] text-amber-700 font-semibold">Under Dept Approval</span>
                        )}
                        {ms.paymentStatus === 'PAID' && (
                          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Credited to Bank
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
