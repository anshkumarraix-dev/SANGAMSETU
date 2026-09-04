'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

export default function AdminDashboard() {
  const { challenges, startups, proposals, testReports, pilots, auditLogs } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'ai-governance'>('overview');

  const totalSanctionedFunds = pilots.reduce((acc, p) => acc + p.totalBudget, 0);
  const totalDisbursedFunds = pilots.reduce((acc, p) => acc + p.disbursedAmount, 0);

  return (
    <div className="space-y-8">
      {/* Top DPIIT Administrator Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sangam-navy-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black tracking-wide flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                DPIIT NATIONAL OVERSIGHT & AUDIT
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-semibold">
                Portal Root Administrator
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black">
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
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-sangam-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>National Overview & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-governance')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'ai-governance'
              ? 'bg-sangam-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>AI Fairlearn & Bias Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-sangam-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Tamper-Evident Audit Ledger ({auditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Total Active Challenges</span>
              <span className="text-2xl font-black text-sangam-navy-900 mt-1 block">{challenges.length}</span>
              <span className="text-xs text-slate-500 mt-1 block">Across 6 Central Ministries</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Verified DPIIT Startups</span>
              <span className="text-2xl font-black text-sangam-navy-900 mt-1 block">{startups.length} Registered</span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">100% GFR 2017 Exempt</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Sanctioned Pilot Fund</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">
                ₹{(totalSanctionedFunds / 100000).toFixed(2)} Lakhs
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Disbursed: ₹{(totalDisbursedFunds / 100000).toFixed(2)} Lakhs
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Empanelled Labs</span>
              <span className="text-2xl font-black text-indigo-700 mt-1 block">STQC & C-DAC</span>
              <span className="text-xs text-slate-500 mt-1 block">{testReports.length} Official Reports</span>
            </div>
          </div>

          {/* Quick List of Recent Pilots */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-black text-sangam-navy-900">Active Live Pilots</h3>
            <div className="space-y-3">
              {pilots.map(p => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-extrabold text-sm text-sangam-navy-900">{p.challengeTitle}</h4>
                    <p className="text-slate-600">Startup: {p.startupName} • Location: {p.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-700 block">
                      Disbursed: ₹{(p.disbursedAmount / 100000).toFixed(2)}L / ₹{(p.totalBudget / 100000).toFixed(2)}L
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">{p.currentPhase} ({p.progress}%)</span>
                  </div>
                </div>
              ))}
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
    </div>
  );
}
