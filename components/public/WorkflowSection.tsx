'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Search,
  Cpu,
  Award,
  DollarSign,
  Clock,
  FlaskConical,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Info,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Calculator,
  Download,
  Check,
  Building2,
  Rocket,
  Shield,
} from 'lucide-react';

export default function WorkflowSection() {
  const { setActiveView } = useApp();
  const [selectedStep, setSelectedStep] = useState(3); // Default highlighting AI Scoring
  const [corridorMode, setCorridorMode] = useState<'standard' | 'fastTrack'>('standard');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'statutory' | 'artifacts' | 'scoringEngine'>('overview');

  // Interactive step auto-walkthrough timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setSelectedStep(prev => (prev === 9 ? 1 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const steps = [
    {
      step: 1,
      title: 'Government Posts Problem',
      tagline: 'Demand Articulation',
      icon: <FileText className="w-4 h-4 text-sangam-blue-600" />,
      badge: 'Step 01',
      description: 'Central/State Government departments define operational bottlenecks, technical constraints, budget range (e.g. ₹30L-₹80L), and measurable KPIs without prescribing specific proprietary vendor technologies.',
      actor: 'Government Department / Ministry',
      timelineStandard: 'Days 1 - 15',
      timelineFastTrack: 'Days 1 - 7',
      statutoryRule: 'Rule 161(iv) GFR 2017 & DPIIT Notification No. 5(4)/2017-IPR-I',
      deliverables: ['Functional Problem Statement', 'Evaluation Matrix & Scoring Weightages', 'Pilot Corridor / Site Specification'],
      sampleArtifact: 'MoRTH-NHAI-Challenge-Spec-2026-V1.pdf',
    },
    {
      step: 2,
      title: 'Startups Browse & Apply',
      tagline: 'Competitive Proposal Submission',
      icon: <Search className="w-4 h-4 text-sangam-saffron-600" />,
      badge: 'Step 02',
      description: 'DPIIT-recognized startups discover challenges matching their domain expertise. Startups submit 7-part structured proposals detailing technical approach, innovation novelty, milestones, and itemized budget.',
      actor: 'DPIIT-Recognized Startups',
      timelineStandard: 'Days 15 - 45 (30 Days window)',
      timelineFastTrack: 'Days 7 - 21 (14 Days window)',
      statutoryRule: 'Exemption from Prior Turnover & Prior Experience (GFR Rule 173(i))',
      deliverables: ['Technical Architecture Blueprint', 'Itemized CapEx/OpEx Budget', 'Team & IP Documentation'],
      sampleArtifact: 'Startup-Technical-Proposal-Template-DPIIT.pdf',
    },
    {
      step: 3,
      title: 'AI Scores All Solutions (500+)',
      tagline: 'Multi-Criteria Algorithmic Assessment',
      icon: <Cpu className="w-4 h-4 text-sangam-blue-600" />,
      badge: 'Step 03',
      description: 'SangamSetu AI Scoring Engine ingests 500+ proposals, evaluating 8 weighted parameters (Problem-Solution Fit, Feasibility, Innovation, Impact, Team, Scalability, Risk, Cost) with Fairlearn bias auditing.',
      actor: 'SangamSetu AI Engine (XGBoost/LightGBM)',
      timelineStandard: 'Real-time (Within 48 hours of close)',
      timelineFastTrack: 'Real-time (Within 24 hours of close)',
      statutoryRule: 'National Strategy for AI (NITI Aayog) & Responsible AI Guidelines',
      deliverables: ['0-100 Multi-Parameter Scorecard', 'SHAP/XAI Feature Attribution', 'Strengths & Risk Identification'],
      sampleArtifact: 'AI-Scoring-Ledger-Audit-Report.json',
    },
    {
      step: 4,
      title: 'AI Creates G1 Category (Top 5 Best)',
      tagline: 'Top 5 Best-in-Class Performers',
      icon: <Award className="w-4 h-4 text-sangam-saffron-600" />,
      badge: 'Step 04',
      description: 'Proposals achieving the highest overall technical and innovation scores (typically >85/100) are automatically compiled into the G1 Category shortlist for advanced hardware/software prototype validation.',
      actor: 'Automated AI Classification',
      timelineStandard: 'Automated Post-Scoring',
      timelineFastTrack: 'Automated Post-Scoring',
      statutoryRule: 'Quality and Cost Based Selection (QCBS) Norms',
      deliverables: ['G1 Shortlist Roster', 'Detailed Technical Comparative Dossier', 'Committee Review Summary'],
      sampleArtifact: 'G1-Shortlist-Technical-Dossier.pdf',
    },
    {
      step: 5,
      title: 'AI Creates G2 Category (Top 5 Cost-Effective)',
      tagline: 'Top 5 High-Value Frugal Innovations',
      icon: <DollarSign className="w-4 h-4 text-sangam-green-600" />,
      badge: 'Step 05',
      description: 'Identifies solutions with exceptional cost-effectiveness scores (>85/100) alongside high technical soundness (>80/100), ensuring public funds maximize ROI without compromising quality.',
      actor: 'Automated AI Classification',
      timelineStandard: 'Automated Post-Scoring',
      timelineFastTrack: 'Automated Post-Scoring',
      statutoryRule: 'Value for Money (VfM) Public Procurement Directives',
      deliverables: ['G2 Shortlist Roster', 'Cost-Per-Impact Economic Analysis', 'Budget Optimization Report'],
      sampleArtifact: 'G2-Cost-Effectiveness-Assessment.pdf',
    },
    {
      step: 6,
      title: 'Prototype Submission Deadline (30 Days)',
      tagline: 'Physical / Software Proof-of-Concept',
      icon: <Clock className="w-4 h-4 text-slate-700" />,
      badge: 'Step 06',
      description: 'Shortlisted G1 and G2 startups receive a development window to submit physical hardware prototypes, live staging URLs, API endpoints, test harnesses, and repository links.',
      actor: 'Shortlisted Startups',
      timelineStandard: '30 Days Post-Shortlisting',
      timelineFastTrack: '15 Days Rapid PoC',
      statutoryRule: 'Intellectual Property Protection Protocol (Govt retains zero IP rights)',
      deliverables: ['Working Prototype / Lab Units', 'Interactive Demo Video & Repo', 'Lab Testing Calibration Manual'],
      sampleArtifact: 'Prototype-Benchmarking-Harness-Guide.pdf',
    },
    {
      step: 7,
      title: 'Empanelled Labs Test Prototypes',
      tagline: 'Rigorous Independent Benchmarking',
      icon: <FlaskConical className="w-4 h-4 text-cyan-700" />,
      badge: 'Step 07',
      description: 'Independent empanelled testing organizations (STQC Directorate, CDAC, NIELIT) perform stress testing, security audits, and field accuracy trials across 5 technical metrics (1-10 scores).',
      actor: 'STQC / C-DAC / NIELIT Labs',
      timelineStandard: '15 - 20 Days Benchmarking',
      timelineFastTrack: '7 - 10 Days Express Lab Audit',
      statutoryRule: 'STQC MeitY Laboratory Accreditation Standard ISO/IEC 17025',
      deliverables: ['STQC Official Test Certificate', 'Vulnerability & CERT-In Assessment', 'PASS / CONDITIONAL Verdict'],
      sampleArtifact: 'STQC-MeitY-Standard-Certificate.pdf',
    },
    {
      step: 8,
      title: 'Government Selects Winner(s)',
      tagline: 'Transparent Committee Award',
      icon: <CheckCircle2 className="w-4 h-4 text-sangam-green-600" />,
      badge: 'Step 08',
      description: 'The Ministry Evaluation Committee reviews the combined AI ranking and official STQC Lab reports to select 1-3 final winning startups for pilot award and direct contract execution.',
      actor: 'Ministry Evaluation Committee',
      timelineStandard: '7 Days Post-Lab Report',
      timelineFastTrack: '3 Days Fast Sanction',
      statutoryRule: 'Public Financial Management System (PFMS) Direct Sanction',
      deliverables: ['Sanction Order & Contract Number', 'Initial Mobilization Fund Disbursal', 'Legal IP & NDA Agreements'],
      sampleArtifact: 'DPIIT-Sanction-Order-Template.pdf',
    },
    {
      step: 9,
      title: 'Pilot Deployment → Scale-Up on GeM',
      tagline: 'Real-World Validation & Procurement',
      icon: <TrendingUp className="w-4 h-4 text-sangam-blue-600" />,
      badge: 'Step 09',
      description: 'Startups deploy solutions across live pilot corridors. Milestone-based Direct Bank Transfer (DBT) funds are released against verified field KPIs, leading to national scale-up onboarding on GeM.',
      actor: 'Government Dept & Winner Startup',
      timelineStandard: '6 - 9 Months Active Pilot',
      timelineFastTrack: '3 - 6 Months Rapid Pilot',
      statutoryRule: 'Government e-Marketplace (GeM) Startup Runway Direct Listing',
      deliverables: ['Milestone KPI Telemetry Data', 'Final Acceptance Audit Report', 'Direct GeM Scale-out Listing'],
      sampleArtifact: 'GeM-Scale-Out-Direct-Listing-Notice.pdf',
    },
  ];

  const current = steps[selectedStep - 1];

  return (
    <section id="workflow" className="py-12 md:py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-sangam-blue-50 text-sangam-blue-700 text-xs font-bold mb-2 border border-sangam-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>National Innovation Procurement Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              The 9-Step Innovation Procurement Pathway
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
              Eliminating traditional tender friction through multi-parameter AI scoring, independent STQC lab benchmarking, and milestone-backed PFMS DBT pilot scale-up.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Timeline Corridor Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-sm border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setCorridorMode('standard')}
                className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                  corridorMode === 'standard'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard (90 Days)
              </button>
              <button
                onClick={() => setCorridorMode('fastTrack')}
                className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                  corridorMode === 'fastTrack'
                    ? 'bg-sangam-blue-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fast-Track (45 Days)
              </button>
            </div>

            {/* Interactive Automated Walkthrough Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-bold transition-colors cursor-pointer ${
                isAutoPlaying
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pause Walkthrough</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-sangam-blue-600" />
                  <span>Step-by-Step Walkthrough</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 9 Step Nav Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 mb-6">
          {steps.map(s => {
            const isSelected = selectedStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => {
                  setSelectedStep(s.step);
                  setIsAutoPlaying(false);
                }}
                className={`flex flex-col items-center text-center p-2 rounded-sm border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sangam-navy-900 text-white border-sangam-navy-900 shadow-2xs ring-2 ring-sangam-blue-500/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1 py-0.5 rounded-sm mb-1 ${
                    isSelected ? 'bg-sangam-saffron-500 text-slate-950 font-black' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {s.badge}
                </span>
                <div className={`p-1 rounded-sm mb-0.5 ${isSelected ? 'bg-white/10' : 'bg-white border border-slate-200'}`}>
                  {s.icon}
                </div>
                <span className="text-[10px] font-bold line-clamp-2 leading-tight">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Panel (White Paper Aesthetic) */}
        <div className="bg-slate-50 rounded-md border border-slate-200 p-5 sm:p-6">
          {/* Sub-Tabs for Step Detail */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 mb-5 gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-sm bg-sangam-navy-900 text-white text-xs font-bold">
                {current.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {current.title}
              </h3>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-2.5 py-1 rounded-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-sangam-blue-600 border border-slate-300 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Workflow Details
              </button>
              <button
                onClick={() => setActiveTab('statutory')}
                className={`px-2.5 py-1 rounded-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'statutory'
                    ? 'bg-white text-sangam-blue-600 border border-slate-300 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Statutory GFR Rule
              </button>
              <button
                onClick={() => setActiveTab('artifacts')}
                className={`px-2.5 py-1 rounded-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'artifacts'
                    ? 'bg-white text-sangam-blue-600 border border-slate-300 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Template & Artifact
              </button>
              {current.step === 3 && (
                <button
                  onClick={() => setActiveTab('scoringEngine')}
                  className={`px-2.5 py-1 rounded-sm font-semibold transition-colors cursor-pointer ${
                    activeTab === 'scoringEngine'
                      ? 'bg-white text-sangam-blue-600 border border-slate-300 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  8-Parameter Matrix
                </button>
              )}
            </div>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {current.description}
                </p>

                {/* Key Meta Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-3 rounded-sm border border-slate-200">
                    <div className="text-[10px] font-bold uppercase text-slate-500">Responsible Authority</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sangam-green-600" />
                      {current.actor}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-sm border border-slate-200">
                    <div className="text-[10px] font-bold uppercase text-slate-500">
                      SLA Timeline ({corridorMode === 'standard' ? 'Standard' : 'Fast-Track'})
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sangam-saffron-600" />
                      {corridorMode === 'standard' ? current.timelineStandard : current.timelineFastTrack}
                    </div>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Official Outputs & Milestones:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {current.deliverables.map((del, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white text-slate-800 border border-slate-300 text-xs font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sangam-green-600" />
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Context Card */}
              <div className="bg-white p-4 rounded-sm border border-slate-200 space-y-3 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Info className="w-3.5 h-3.5 text-sangam-blue-600" />
                  <span>Audit & Compliance Trail</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Every decision, submission hash, score ledger entry, and test verdict in Step {current.step} is cryptographically anchored in the SangamSetu National Innovation Audit Ledger.
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    disabled={selectedStep === 1}
                    onClick={() => setSelectedStep(prev => Math.max(1, prev - 1))}
                    className="px-2.5 py-1 rounded-sm border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    {current.step} of 9
                  </span>

                  <button
                    disabled={selectedStep === 9}
                    onClick={() => setSelectedStep(prev => Math.min(9, prev + 1))}
                    className="px-2.5 py-1 rounded-sm bg-sangam-navy-900 text-white hover:bg-sangam-navy-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Statutory Rules */}
          {activeTab === 'statutory' && (
            <div className="bg-white p-4 rounded-sm border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-sangam-blue-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Procurement Authority & Government Gazette Ref:</span>
              </div>
              <p className="text-xs font-mono bg-slate-50 p-3 rounded-sm border border-slate-200 text-slate-800">
                {current.statutoryRule}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under the Government of India innovation procurement mandate, this stage is insulated against conventional vendor pre-qualification restrictions, ensuring DPIIT startups can participate without commercial balance sheet constraints.
              </p>
            </div>
          )}

          {/* Tab 3: Artifacts */}
          {activeTab === 'artifacts' && (
            <div className="bg-white p-4 rounded-sm border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500">Official Standard Template</span>
                  <p className="text-xs font-bold text-slate-900">{current.sampleArtifact}</p>
                </div>
                <button
                  onClick={() => alert(`Standard Template: ${current.sampleArtifact} is verified in compliance with GFR 2017 standards.`)}
                  className="px-3 py-1.5 rounded-sm bg-sangam-blue-50 text-sangam-blue-700 border border-sangam-blue-200 hover:bg-sangam-blue-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Template</span>
                </button>
              </div>
              <p className="text-xs text-slate-600">
                Prescribed by DPIIT & MeitY for uniform nationwide procurement across all Central and State Ministries.
              </p>
            </div>
          )}

          {/* Tab 4: 8-Parameter Scoring Matrix (for Step 3) */}
          {activeTab === 'scoringEngine' && (
            <div className="bg-white p-4 rounded-sm border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
                SangamSetu Multi-Parameter AI Weightage Distribution:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Problem-Solution Fit</span>
                  <span className="font-bold text-sangam-blue-700">20% Weight</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Technical Feasibility</span>
                  <span className="font-bold text-sangam-blue-700">15% Weight</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Innovation Quotient</span>
                  <span className="font-bold text-sangam-blue-700">15% Weight</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Impact Potential</span>
                  <span className="font-bold text-sangam-blue-700">15% Weight</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Team Capability</span>
                  <span className="font-bold text-sangam-blue-700">10% Weight</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Scalability & Deployment</span>
                  <span className="font-bold text-sangam-blue-700">10% Weight</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Risk Management</span>
                  <span className="font-bold text-sangam-blue-700">8% Weight</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Cost-Effectiveness</span>
                  <span className="font-bold text-sangam-blue-700">7% Weight</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 9-Step Process Summary & Action Gateway */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-sangam-blue-700">
                  <Search className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Step 1 & 2: Articulation</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Browse open challenges released by Central Ministries without prior turnover barriers under GFR 161(iv).
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveView('challenges');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-3 w-full py-2 px-3 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Browse Active Challenges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-sangam-navy-900">
                  <Cpu className="w-4 h-4 text-sangam-blue-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Steps 3-7: AI & Lab Testing</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Experience multi-parameter AI scoring, G1/G2 shortlisting, and STQC hardware/software validation.
                </p>
              </div>
              <button
                onClick={() => setActiveView('guidelines')}
                className="mt-3 w-full py-2 px-3 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Review GFR 2017 Guidelines</span>
              </button>
            </div>

            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-emerald-700">
                  <TrendingUp className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Steps 8 & 9: Pilots & GeM</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Review milestone-based DBT fund disbursals and commercialization via GeM Rule 149(ii) direct onboarding.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-3 w-full py-2 px-3 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Enter Role Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Statutory Authority Footnote Strip */}
          <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sangam-green-600 shrink-0" />
              <span>
                <strong>Statutory Framework:</strong> General Financial Rules (GFR) 2017 Rules 149, 161(iv), and 173(i) notified by Ministry of Finance, Govt of India.
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 shrink-0">
              Corridor Standard: 90 Days • Fast-Track: 45 Days
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
