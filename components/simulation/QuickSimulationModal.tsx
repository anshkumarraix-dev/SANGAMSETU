'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  X,
  CheckCircle2,
  Send,
  FlaskConical,
  Award,
  CreditCard,
  RotateCcw,
  Building2,
  Rocket,
  Shield,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck,
} from 'lucide-react';

export default function QuickSimulationModal() {
  const {
    isSimulationModalOpen,
    setIsSimulationModalOpen,
    isSimulationLoaded,
    loadSimulationData,
    simulateStep,
    resetAllData,
    challenges,
    startups,
    proposals,
    testReports,
    pilots,
    setRole,
    setActiveView,
  } = useApp();

  const [executingStep, setExecutingStep] = useState<string | null>(null);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  if (!isSimulationModalOpen) return null;

  const totalDisbursed = pilots.reduce((sum, p) => sum + (p.disbursedAmount || 0), 0);

  const handleExecute = async (step: 'SUBMIT_PROPOSAL' | 'ISSUE_LAB_CERT' | 'SANCTION_PILOT' | 'PAY_MILESTONE') => {
    setExecutingStep(step);
    // Add micro-delay for realistic simulation feeling
    setTimeout(() => {
      const result = simulateStep(step);
      setExecutingStep(null);
      setLastActionMessage(result.message);
    }, 400);
  };

  const handleSwitchPersona = (roleTarget: 'STARTUP' | 'GOVERNMENT' | 'TESTING_ORG' | 'ADMIN') => {
    setRole(roleTarget);
    setActiveView('dashboard');
    setIsSimulationModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sangam-navy-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white leading-tight">
                  National Procurement Simulation Engine
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs bg-amber-500 text-slate-950">
                  Quick Demo Mode
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Simulate end-to-end procurement under GFR Rule 149 & 194 in one click.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSimulationModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-sm hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close Simulation Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Status & Live Counts */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Current Dataset State:</span>
                {isSimulationLoaded ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Full Simulation Dataset Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                    Baseline Dataset (5 Core Challenges)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!isSimulationLoaded ? (
                  <button
                    onClick={loadSimulationData}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Load Full Simulation Dataset
                  </button>
                ) : (
                  <button
                    onClick={resetAllData}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    Reset to Baseline
                  </button>
                )}
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-3">
              <div className="bg-white p-2.5 rounded-md border border-slate-200 text-center">
                <span className="block text-[11px] font-semibold text-slate-500">Challenges</span>
                <span className="text-lg font-bold text-slate-900">{challenges.length}</span>
              </div>
              <div className="bg-white p-2.5 rounded-md border border-slate-200 text-center">
                <span className="block text-[11px] font-semibold text-slate-500">Startups</span>
                <span className="text-lg font-bold text-slate-900">{startups.length}</span>
              </div>
              <div className="bg-white p-2.5 rounded-md border border-slate-200 text-center">
                <span className="block text-[11px] font-semibold text-slate-500">Proposals</span>
                <span className="text-lg font-bold text-slate-900">{proposals.length}</span>
              </div>
              <div className="bg-white p-2.5 rounded-md border border-slate-200 text-center">
                <span className="block text-[11px] font-semibold text-slate-500">STQC Certs</span>
                <span className="text-lg font-bold text-slate-900">{testReports.length}</span>
              </div>
              <div className="bg-white p-2.5 rounded-md border border-slate-200 text-center">
                <span className="block text-[11px] font-semibold text-slate-500">Live Pilots</span>
                <span className="text-lg font-bold text-slate-900">{pilots.length}</span>
              </div>
              <div className="bg-white p-2.5 rounded-md border border-slate-200 text-center">
                <span className="block text-[11px] font-semibold text-slate-500">Disbursed</span>
                <span className="text-lg font-bold text-emerald-700">₹{(totalDisbursed / 100000).toFixed(1)}L</span>
              </div>
            </div>
          </div>

          {/* Last Simulation Toast inside modal if triggered */}
          {lastActionMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md flex items-center justify-between text-xs text-emerald-900 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lastActionMessage}</span>
              </div>
              <button
                onClick={() => setLastActionMessage(null)}
                className="text-emerald-700 hover:text-emerald-900 text-xs underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Step-by-Step Simulation Sandbox */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sangam-blue-600" />
                Interactive Lifecycle Simulator (1-Click Execution)
              </h3>
              <span className="text-xs text-slate-500">Click any stage to trigger real-time actions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Step 1: Submit Startup Proposal */}
              <div className="p-4 rounded-lg border border-slate-200 hover:border-sangam-blue-300 bg-white shadow-2xs transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sangam-blue-600">
                      Stage 2 • Startup Submission
                    </span>
                    <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-xs font-mono">
                      AI Scoring
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Submit Proposal with Instant AI Score
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Submits a proposal from <strong>JalVigyan Technologies</strong> to the Jal Shakti Challenge. The AI Scoring engine automatically ranks it <strong>93.8/100 (G1 Leader)</strong>.
                  </p>
                </div>
                <button
                  disabled={executingStep === 'SUBMIT_PROPOSAL'}
                  onClick={() => handleExecute('SUBMIT_PROPOSAL')}
                  className="w-full py-2 px-3 rounded-sm bg-sangam-blue-50 hover:bg-sangam-blue-100 text-sangam-blue-700 border border-sangam-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {executingStep === 'SUBMIT_PROPOSAL' ? 'Simulating...' : 'Simulate Startup Submission'}
                </button>
              </div>

              {/* Step 2: Issue STQC Lab Certificate */}
              <div className="p-4 rounded-lg border border-slate-200 hover:border-cyan-300 bg-white shadow-2xs transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
                      Stage 3 • Lab Benchmarking
                    </span>
                    <span className="text-[11px] bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-xs font-mono">
                      STQC Directorate
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Issue STQC Lab Test Certificate
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Simulates testing by MeitY STQC laboratory, evaluates hardware against NABL standards, issues <strong>94/100 score</strong> and official Certificate.
                  </p>
                </div>
                <button
                  disabled={executingStep === 'ISSUE_LAB_CERT'}
                  onClick={() => handleExecute('ISSUE_LAB_CERT')}
                  className="w-full py-2 px-3 rounded-sm bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  {executingStep === 'ISSUE_LAB_CERT' ? 'Simulating...' : 'Issue STQC Test Certificate'}
                </button>
              </div>

              {/* Step 3: Sanction Pilot Work Order */}
              <div className="p-4 rounded-lg border border-slate-200 hover:border-amber-300 bg-white shadow-2xs transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      Stage 4 • Ministry Sanction
                    </span>
                    <span className="text-[11px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-xs font-mono">
                      GFR Rule 194
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Sanction Pilot & Disburse Advance
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Ministry Committee sanctions a <strong>₹40.5 Lakh</strong> field pilot contract with 3 defined milestones and releases the initial <strong>40% mobilization advance</strong>.
                  </p>
                </div>
                <button
                  disabled={executingStep === 'SANCTION_PILOT'}
                  onClick={() => handleExecute('SANCTION_PILOT')}
                  className="w-full py-2 px-3 rounded-sm bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Award className="w-3.5 h-3.5" />
                  {executingStep === 'SANCTION_PILOT' ? 'Simulating...' : 'Sanction Ministry Pilot Order'}
                </button>
              </div>

              {/* Step 4: Disburse Milestone Payment */}
              <div className="p-4 rounded-lg border border-slate-200 hover:border-emerald-300 bg-white shadow-2xs transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      Stage 5 • PFMS Disbursal
                    </span>
                    <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-xs font-mono">
                      RBI-NEFT UTR
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Approve Milestone & Release Funds
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Verifies field milestone completion, updates pilot progress to <strong>70%+</strong>, and credits funds to startup bank account with authentic <strong>RBI-NEFT UTR</strong>.
                  </p>
                </div>
                <button
                  disabled={executingStep === 'PAY_MILESTONE'}
                  onClick={() => handleExecute('PAY_MILESTONE')}
                  className="w-full py-2 px-3 rounded-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  {executingStep === 'PAY_MILESTONE' ? 'Simulating...' : 'Release Milestone via RBI-NEFT'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Persona Jump Section */}
          <div className="pt-2">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sangam-saffron-500" />
              Quick Persona Switcher (Jump Directly to Any Dashboard)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleSwitchPersona('STARTUP')}
                className="p-3 rounded-md border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/60 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <Rocket className="w-4 h-4 text-amber-500" />
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <span className="block text-xs font-bold text-slate-900">DPIIT Startup</span>
                <span className="text-[11px] text-slate-500">Apply & Claim Payments</span>
              </button>

              <button
                onClick={() => handleSwitchPersona('GOVERNMENT')}
                className="p-3 rounded-md border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/60 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <span className="block text-xs font-bold text-slate-900">Ministry Officer</span>
                <span className="text-[11px] text-slate-500">Post & Sanction Pilots</span>
              </button>

              <button
                onClick={() => handleSwitchPersona('TESTING_ORG')}
                className="p-3 rounded-md border border-slate-200 hover:border-cyan-400 bg-slate-50 hover:bg-cyan-50/60 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <FlaskConical className="w-4 h-4 text-cyan-600" />
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <span className="block text-xs font-bold text-slate-900">STQC Testing Lab</span>
                <span className="text-[11px] text-slate-500">Benchmark & Certify</span>
              </button>

              <button
                onClick={() => handleSwitchPersona('ADMIN')}
                className="p-3 rounded-md border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <Shield className="w-4 h-4 text-slate-700" />
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                </div>
                <span className="block text-xs font-bold text-slate-900">DPIIT Admin</span>
                <span className="text-[11px] text-slate-500">Audit Logs & Oversight</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Compliant with DPIIT Procurement Framework 2026 & GFR Rule 149/194</span>
          </div>
          <button
            onClick={() => setIsSimulationModalOpen(false)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-sm text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
