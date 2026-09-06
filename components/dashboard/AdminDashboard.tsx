'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import {
  Shield,
  Activity,
  Cpu,
  Building2,
  Rocket,
  Award,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  History,
  Lock,
  Sparkles,
  BarChart3,
  Users,
  ShieldCheck,
  Play,
  RefreshCw,
  Layers,
  Terminal,
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    challenges,
    startups,
    proposals,
    testReports,
    pilots,
    auditLogs,
    loadSimulationData,
    resetAllData,
    simulateStep,
    isSimulationLoaded,
  } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'ai-governance' | 'operations'>('overview');
  const [runningStep, setRunningStep] = useState<string | null>(null);

  const handleStepAction = (stepName: any, label: string) => {
    setRunningStep(label);
    setTimeout(() => {
      simulateStep(stepName);
      setRunningStep(null);
    }, 600);
  };

  const totalSanctionedFunds = pilots.reduce((acc, p) => acc + p.totalBudget, 0);
  const totalDisbursedFunds = pilots.reduce((acc, p) => acc + p.disbursedAmount, 0);

  const g1Proposals = proposals.filter(p => p.g1Category);
  const g2Proposals = proposals.filter(p => p.g2Category);
  const avgTechScore = proposals.length > 0
    ? Math.round(proposals.reduce((acc, p) => acc + (p.aiScore || 0), 0) / proposals.length)
    : 87;

  return (
    <div className="space-y-6">
      {/* Top DPIIT Administrator Header */}
      <div className="relative bg-sangam-navy-900 text-white rounded-xl p-6 sm:p-8 shadow-2xs border border-slate-800 overflow-hidden">
        <Image
          src="/images/dash-admin.jpg"
          alt="National security operations center and high-assurance network audit ledger"
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
              <span className="px-3 py-1 rounded-sm bg-amber-400 text-slate-950 text-xs font-bold tracking-wide flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                DPIIT NATIONAL OVERSIGHT & AUDIT
              </span>
              <span className="px-2.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-semibold">
                Portal Root Administrator
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Department for Promotion of Industry and Internal Trade (DPIIT)
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              SangamSetu National Governance Ledger • Algorithmic Bias Audit, Direct Bank Transfer Compliance & Transparency Monitoring.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20 text-xs space-y-1 shrink-0">
            <div className="font-bold text-amber-300">GFR 2017 Rule 149 Exception Engine</div>
            <div className="text-slate-300 text-[11px]">Fairlearn v0.10.0 Bias Monitor Active</div>
            <div className="text-[10px] text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Tamper-Evident Ledger
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-sangam-navy-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>National Overview & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-governance')}
          className={`px-4 py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'ai-governance'
              ? 'bg-sangam-navy-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>AI Fairlearn & Bias Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-sangam-navy-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Tamper-Evident Audit Ledger ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('operations')}
          className={`px-4 py-2.5 rounded-sm font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'operations'
              ? 'bg-sangam-navy-900 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Platform Operations & Verification Tools</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Total Active Challenges</span>
              <span className="text-2xl font-black text-sangam-navy-900 mt-1 block">{challenges.length}</span>
              <span className="text-xs text-slate-500 mt-1 block">Across 6 Central Ministries</span>
            </div>

            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Verified DPIIT Startups</span>
              <span className="text-2xl font-black text-sangam-navy-900 mt-1 block">{startups.length} Registered</span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">100% GFR 2017 Exempt</span>
            </div>

            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Sanctioned Pilot Fund</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">
                ₹{(totalSanctionedFunds / 100000).toFixed(2)} Lakhs
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Disbursed: ₹{(totalDisbursedFunds / 100000).toFixed(2)} Lakhs
              </span>
            </div>

            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Empanelled Labs</span>
              <span className="text-2xl font-black text-indigo-700 mt-1 block">STQC & C-DAC</span>
              <span className="text-xs text-slate-500 mt-1 block">{testReports.length} Official Reports</span>
            </div>
          </div>

          {/* AI Shortlist & Pending Approvals Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* AI Shortlist Summary Widget */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sangam-blue-600" />
                  <h3 className="font-bold text-sm text-slate-900">AI Shortlist Summary</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-purple-50 text-purple-700 border border-purple-200">
                  Fairlearn Audited
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-emerald-50 rounded-sm border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 font-bold block uppercase">G1 Best</span>
                  <span className="text-lg font-black text-emerald-700">{g1Proposals.length}</span>
                  <span className="text-[9px] text-emerald-600 block">Top Tier (&gt;85)</span>
                </div>
                <div className="p-2.5 bg-blue-50 rounded-sm border border-blue-200">
                  <span className="text-[10px] text-blue-800 font-bold block uppercase">G2 Backup</span>
                  <span className="text-lg font-black text-blue-700">{g2Proposals.length}</span>
                  <span className="text-[9px] text-blue-600 block">Reserve (75-85)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200">
                  <span className="text-[10px] text-slate-600 font-bold block uppercase">Avg Score</span>
                  <span className="text-lg font-black text-slate-800">{avgTechScore}/100</span>
                  <span className="text-[9px] text-slate-500 block">8 Parameters</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between font-medium">
                  <span>Total Evaluated Proposals:</span>
                  <span className="font-bold text-slate-900">{proposals.length}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Demographic Parity Index:</span>
                  <span className="font-bold text-emerald-700">0.96 (Pass &gt;0.80)</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Tier-2/3 City Inclusion:</span>
                  <span className="font-bold text-sangam-blue-700">44.2%</span>
                </div>
              </div>
            </div>

            {/* Pending Statutory Approvals & Review Queue */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-2xs space-y-3 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-sm text-slate-900">Pending Approvals & Mission Control Queue</h3>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
                  Action Required
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Milestones DBT</span>
                    <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-bold bg-amber-100 text-amber-800">2 Ready</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">Pending Disbursal</div>
                  <p className="text-[11px] text-slate-500">₹14.50 Lakhs awaiting Ministry Treasury UTR signoff</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">STQC Testing</span>
                    <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-bold bg-purple-100 text-purple-800">1 Review</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">Lab Certifications</div>
                  <p className="text-[11px] text-slate-500">Benchmark validation pending final procurement award</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">GeM Onboarding</span>
                    <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-bold bg-emerald-100 text-emerald-800">Rule 149(ii)</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">Direct GeM Listing</div>
                  <p className="text-[11px] text-slate-500">1 Successful Pilot qualifying for national catalog entry</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Pilots Grid */}
          <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-sangam-navy-900">Active Live Pilots</h3>
              <span className="text-xs text-slate-500 font-medium">Total Sanctioned: ₹{(totalSanctionedFunds / 100000).toFixed(1)} Lakhs</span>
            </div>
            <div className="space-y-2.5">
              {pilots.map(p => (
                <div key={p.id} className="p-3.5 rounded-sm border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{p.challengeTitle}</h4>
                    <p className="text-slate-600 text-[11px] mt-0.5">Startup: <span className="font-semibold text-slate-800">{p.startupName}</span> • Location: {p.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-emerald-700 block">
                      Disbursed: ₹{(p.disbursedAmount / 100000).toFixed(2)}L / ₹{(p.totalBudget / 100000).toFixed(2)}L
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">{p.currentPhase} ({p.progress}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Platform Audit Trail Table */}
          <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-bold text-slate-900">Recent Procurement Activity & Audit Trail</h3>
              </div>
              <button
                onClick={() => setActiveTab('audit')}
                className="text-xs font-bold text-sangam-blue-600 hover:text-sangam-blue-800 cursor-pointer"
              >
                View Full Ledger ({auditLogs.length}) →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-2 px-3 font-bold">Action</th>
                    <th className="py-2 px-3 font-bold">Entity</th>
                    <th className="py-2 px-3 font-bold">User / Officer</th>
                    <th className="py-2 px-3 font-bold">Timestamp</th>
                    <th className="py-2 px-3 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.slice(0, 5).map(log => (
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
        </div>
      )}

      {/* TAB 2: AI FAIRLEARN & BIAS AUDIT */}
      {activeTab === 'ai-governance' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fairlearn v0.10.0 Algorithmic Governance</span>
            </div>
            <h3 className="text-xl font-black text-sangam-navy-900">
              AI Scoring Fairness & Disparate Impact Auditor
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Ensures algorithmic scoring treats tier-2/3 startups, female-led founding teams, and emerging technologies with zero demographic disparity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Demographic Parity Ratio</span>
              <span className="text-2xl font-black text-emerald-600 block">0.96</span>
              <span className="text-[11px] text-slate-500">Threshold: &gt;0.80 (Equal Opportunity Pass)</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Tier-2/3 City Inclusion</span>
              <span className="text-2xl font-black text-emerald-600 block">44.2%</span>
              <span className="text-[11px] text-slate-500">Proposals scored in top G1/G2 tiers</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Explainability Completeness</span>
              <span className="text-2xl font-black text-sangam-blue-600 block">100%</span>
              <span className="text-[11px] text-slate-500">Every score accompanied by SHAP breakdown</span>
            </div>
          </div>

          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-slate-700 space-y-2">
            <h4 className="font-bold text-sangam-navy-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-sangam-blue-600" />
              Statutory Compliance Guarantee
            </h4>
            <p className="leading-relaxed">
              In accordance with Ministry of Commerce and General Financial Rules (GFR) 2017 Rule 149(ii), all AI ranking decisions are deterministic, reproducible, and permanently accessible for CAG / CVC audit.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: TAMPER-EVIDENT AUDIT LEDGER */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-sangam-navy-900">
              National Innovation Procurement Audit Trail
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Cryptographically timestamped transaction log for every challenge publication, AI scoring run, lab verdict, and DBT disbursal.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {auditLogs.map(log => (
              <div key={log.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-slate-700">
                      {log.action}
                    </span>
                    <span className="font-bold text-slate-900">{log.entity}: {log.entityId}</span>
                  </div>
                  <p className="text-slate-600">IP: {log.ipAddress} • User: {log.userName}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono text-slate-400 block">
                    {new Date(log.timestamp).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">By {log.userName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PLATFORM OPERATIONS & VERIFICATION TOOLS */}
      {activeTab === 'operations' && (
        <div className="space-y-6">
          {/* Operations Overview Banner */}
          <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-bold text-sangam-blue-700 uppercase tracking-wider">
                  DPIIT Administrative Sandbox & Verification Tools
                </span>
                <h3 className="text-xl font-black text-sangam-navy-900 mt-1">
                  National Procurement Pipeline Testing Suite
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Execute controlled test scenarios across all 9 statutory procurement steps to verify algorithmic scoring, lab auditing, and PFMS payment disbursements.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {!isSimulationLoaded ? (
                  <button
                    onClick={loadSimulationData}
                    className="px-4 py-2 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Load Official Dataset</span>
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Evaluation Dataset Active</span>
                  </span>
                )}

                <button
                  onClick={resetAllData}
                  className="px-3 py-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-300"
                  title="Reset evaluation state"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                  <span>Reset State</span>
                </button>
              </div>
            </div>

            {/* Test Runner Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-md border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Step 2 Execution</span>
                    <span className="px-2 py-0.5 rounded-xs bg-blue-100 text-blue-800 text-[10px] font-bold">Startup</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Submit DPIIT Proposal</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Simulates submission of GangaSentinel proposal by JalVigyan Tech with automated technical document verification.
                  </p>
                </div>
                <button
                  onClick={() => handleStepAction('SUBMIT_PROPOSAL', 'Proposal Submission')}
                  disabled={runningStep !== null}
                  className="w-full py-2 px-3 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Play className="w-3 h-3 text-amber-400" />
                  <span>{runningStep === 'Proposal Submission' ? 'Submitting...' : 'Execute Step 2'}</span>
                </button>
              </div>

              <div className="p-4 rounded-md border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Step 3 Execution</span>
                    <span className="px-2 py-0.5 rounded-xs bg-purple-100 text-purple-800 text-[10px] font-bold">AI Engine</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Run Multi-Criteria AI Scoring</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Triggers 7-dimension objective scoring and tabulates G1 (Quality) and G2 (Cost) rosters.
                  </p>
                </div>
                <button
                  onClick={() => handleStepAction('SCORE_AI', 'AI Scoring')}
                  disabled={runningStep !== null}
                  className="w-full py-2 px-3 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>{runningStep === 'AI Scoring' ? 'Scoring...' : 'Execute Step 3'}</span>
                </button>
              </div>

              <div className="p-4 rounded-md border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Step 6 Execution</span>
                    <span className="px-2 py-0.5 rounded-xs bg-amber-100 text-amber-800 text-[10px] font-bold">Lab Intake</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Submit Working Prototype</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Deposits sandbox unit, GitHub repository link, and calibration harness for STQC lab benchmarking.
                  </p>
                </div>
                <button
                  onClick={() => handleStepAction('SUBMIT_PROTOTYPE', 'Prototype Intake')}
                  disabled={runningStep !== null}
                  className="w-full py-2 px-3 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Rocket className="w-3 h-3 text-emerald-400" />
                  <span>{runningStep === 'Prototype Intake' ? 'Uploading...' : 'Execute Step 6'}</span>
                </button>
              </div>

              <div className="p-4 rounded-md border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Step 7 Execution</span>
                    <span className="px-2 py-0.5 rounded-xs bg-cyan-100 text-cyan-800 text-[10px] font-bold">STQC Lab</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Issue STQC Lab Certificate</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Generates official 5-metric test score (Functional, Security, Stress, Data Residency, Interoperability) with PASS verdict.
                  </p>
                </div>
                <button
                  onClick={() => handleStepAction('ISSUE_LAB_CERT', 'Lab Certification')}
                  disabled={runningStep !== null}
                  className="w-full py-2 px-3 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>{runningStep === 'Lab Certification' ? 'Certifying...' : 'Execute Step 7'}</span>
                </button>
              </div>

              <div className="p-4 rounded-md border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Step 8 Execution</span>
                    <span className="px-2 py-0.5 rounded-xs bg-emerald-100 text-emerald-800 text-[10px] font-bold">Ministry</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Sanction Ministry Pilot Contract</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Issues digital sanction order under GFR 149/194 and creates live pilot tracker with 40% advance disbursement.
                  </p>
                </div>
                <button
                  onClick={() => handleStepAction('SANCTION_PILOT', 'Pilot Sanction')}
                  disabled={runningStep !== null}
                  className="w-full py-2 px-3 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Building2 className="w-3 h-3 text-amber-400" />
                  <span>{runningStep === 'Pilot Sanction' ? 'Sanctioning...' : 'Execute Step 8'}</span>
                </button>
              </div>

              <div className="p-4 rounded-md border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Step 9 Execution</span>
                    <span className="px-2 py-0.5 rounded-xs bg-emerald-100 text-emerald-800 text-[10px] font-bold">PFMS / DBT</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Disburse PFMS Milestone Payment</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Simulates electronic Direct Bank Transfer release with generated bank UTR tracking and milestone verification.
                  </p>
                </div>
                <button
                  onClick={() => handleStepAction('PAY_MILESTONE', 'PFMS Disbursement')}
                  disabled={runningStep !== null}
                  className="w-full py-2 px-3 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <IndianRupee className="w-3 h-3 text-emerald-400" />
                  <span>{runningStep === 'PFMS Disbursement' ? 'Disbursing...' : 'Execute Step 9'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
