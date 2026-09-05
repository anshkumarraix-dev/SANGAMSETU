'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { Scale, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="terms-page">
      <MainNavbar activeTab="terms" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Legal & Policies</span>
            <span>/</span>
            <span className="text-slate-300">Terms of Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Scale className="w-7 h-7 text-sangam-saffron-400" />
            <span>Terms of Service & Portal Usage Norms</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Statutory conditions governing portal access, startup participation, ministry procurement challenges, and binding contract execution under General Financial Rules 2017.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-6" id="main-content">
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing, registering on, or utilizing the SangamSetu portal, users (startups, government procurement officials, and testing laboratory personnel) agree to be bound by these Terms of Service, the General Financial Rules (GFR) 2017, and applicable Government of India procurement directives.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Startup Eligibility & DPIIT Verification</h2>
            <p>
              To participate in innovation challenges and claim GFR 161(iv) prior turnover exemptions, entities must maintain active DPIIT recognition under Notification No. G.S.R. 127(E). Submission of forged, misrepresented, or invalid certificates will result in immediate disqualification and debarment under GFR Rule 151.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Electronic Contract Sanctions & Milestone Integrity</h2>
            <p>
              Digital sanction orders and contracts issued via SangamSetu constitute binding legal commitments. Startup grant recipients are obligated to deliver working prototypes within the designated timeline and facilitate STQC laboratory verification before subsequent grant tranches are disbursed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Applicable Law & Jurisdiction</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in New Delhi.
            </p>
          </section>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
