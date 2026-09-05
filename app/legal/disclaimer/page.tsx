'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="disclaimer-page">
      <MainNavbar activeTab="disclaimer" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Legal & Policies</span>
            <span>/</span>
            <span className="text-slate-300">Disclaimer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-sangam-saffron-400" />
            <span>Government Portal Disclaimer & Statutory Disclosures</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Legal disclaimer regarding portal content accuracy, algorithmic score calculations, and statutory financial sanctions under General Financial Rules 2017.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-6" id="main-content">
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Content Accuracy & Information Notice</h2>
            <p>
              Though all efforts have been made to ensure the accuracy and currency of the content on this portal, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department for Promotion of Industry and Internal Trade (DPIIT) and/or other source(s), and to obtain appropriate professional legal advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Algorithmic Multi-Criteria Scoring</h2>
            <p>
              The SangamSetu AI Evaluation Algorithm provides objective pre-evaluation scores and category rankings based on verifiable proposal parameters. Final procurement sanction orders are formally issued and executed by authorized Government Procuring Officers under their statutory delegated financial powers (GFR Rule 149 / 194).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Limitation of Liability</h2>
            <p>
              Under no circumstances will DPIIT or the Government of India be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this portal.
            </p>
          </section>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
