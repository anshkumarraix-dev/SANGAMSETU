'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { ShieldCheck, CheckCircle2, FileText, ArrowRight, Download, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function StartupExemptionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="startup-exemptions-page">
      <MainNavbar activeTab="guidelines" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Statutory Governance</span>
            <span>/</span>
            <span className="text-slate-300">GFR 2017 Startup Exemption Norms</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-sangam-saffron-400" />
            <span>GFR 2017 Startup Exemption Norms & Relaxation Provisions</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Statutory waiver of Prior Turnover, Prior Experience, and Earnest Money Deposit (EMD) for DPIIT-recognized startups under Department of Expenditure OM No. F.20/2/2014-PPD(Pt.) and GFR Rule 161(iv).
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-8" id="main-content">
        {/* Core Statutory Exemption Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-sm bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Exemption from Prior Turnover</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Procuring entities cannot prescribe mandatory minimum turnover thresholds (e.g., ₹10 Cr, ₹50 Cr) for DPIIT-recognized startups participating in public innovation procurement.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-800 bg-emerald-50/60 p-2 rounded-xs border border-emerald-200">
              Authority: Rule 161(iv), GFR 2017
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-sm bg-blue-50 text-sangam-blue-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Exemption from Prior Experience</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Criteria requiring prior supply orders to government bodies or a minimum operating history are waived, provided technical capability is proven via STQC/NABL lab benchmarking.
            </p>
            <div className="pt-2 text-[11px] font-mono text-sangam-blue-800 bg-blue-50/60 p-2 rounded-xs border border-blue-200">
              Authority: DoE OM F.20/2/2014-PPD(Pt.)
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-sm bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">Mandatory EMD & Bid Security Waiver</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Startups are exempt from submitting Earnest Money Deposit (EMD) or Bid Security fees across all innovation challenges and expression of interest (EoI) tenders published on the portal.
            </p>
            <div className="pt-2 text-[11px] font-mono text-amber-800 bg-amber-50/60 p-2 rounded-xs border border-amber-200">
              Authority: Rule 170(i), GFR 2017
            </div>
          </div>
        </div>

        {/* Detailed Compliance Table */}
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Statutory Matrix: Conventional Tenders vs. SangamSetu Startup Channel</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Procurement Parameter</th>
                  <th className="p-3">Standard GeM / CPPP Tender</th>
                  <th className="p-3">SangamSetu DPIIT Startup Channel</th>
                  <th className="p-3">Statutory Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Prior Annual Turnover</td>
                  <td className="p-3 text-rose-700 font-medium">30%–100% of estimated tender value</td>
                  <td className="p-3 text-emerald-700 font-bold">Nil (100% Waived)</td>
                  <td className="p-3 font-mono text-[11px]">GFR Rule 161(iv)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Prior Supply Experience</td>
                  <td className="p-3 text-rose-700 font-medium">3–5 years of proven government supply</td>
                  <td className="p-3 text-emerald-700 font-bold">Nil (Waived; technical proof via lab)</td>
                  <td className="p-3 font-mono text-[11px]">DoE OM dated 25.07.2016</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Bid Security / EMD</td>
                  <td className="p-3 text-rose-700 font-medium">2%–5% of estimated tender value</td>
                  <td className="p-3 text-emerald-700 font-bold">Nil (100% Waived)</td>
                  <td className="p-3 font-mono text-[11px]">GFR Rule 170(i)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Pilot Advance Disbursement</td>
                  <td className="p-3 text-slate-600">Typically nil; post-delivery payment</td>
                  <td className="p-3 text-emerald-700 font-bold">40% Immediate Advance upon Sanction</td>
                  <td className="p-3 font-mono text-[11px]">DPIIT Scale-up Protocol</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Post-Pilot GeM Scale-out</td>
                  <td className="p-3 text-slate-600">Fresh open tender re-bidding required</td>
                  <td className="p-3 text-emerald-700 font-bold">Direct Single-Source GeM Transition</td>
                  <td className="p-3 font-mono text-[11px]">GFR Rule 149 Innovation Provision</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-md p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">Have Questions About Your DPIIT Recognition Status?</h4>
            <p className="text-xs text-slate-300 mt-0.5">Verify your entity credentials and access open public sector challenges immediately.</p>
          </div>
          <Link
            href="/challenges"
            className="px-4 py-2 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>Explore Challenges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
