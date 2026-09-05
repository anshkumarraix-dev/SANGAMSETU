'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { ShieldCheck, Lock, FileText, Database } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="privacy-page">
      <MainNavbar activeTab="privacy" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Legal & Policies</span>
            <span>/</span>
            <span className="text-slate-300">Privacy Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-sangam-saffron-400" />
            <span>Government of India Privacy Policy & Data Sovereignty</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Data protection principles, Digital Personal Data Protection (DPDP) Act compliance, and sovereign data residency guarantees for the SangamSetu National Innovation Procurement Portal.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-6" id="main-content">
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-sangam-blue-600" />
              <span>1. Information Collection & Usage</span>
            </h2>
            <p>
              SangamSetu does not automatically capture any specific personal information from you (like name, phone number, or e-mail address) that allows us to identify you individually, unless you specifically choose to provide such information by registering an entity, submitting an innovation proposal, or lodging a procurement challenge.
            </p>
            <p>
              All entity information (DPIIT startup numbers, Ministry officer designations, test reports) is processed exclusively for statutory verification, algorithmic evaluation, lab benchmarking, and PFMS financial disbursements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>2. Sovereign Data Residency & Security</span>
            </h2>
            <p>
              In accordance with Ministry of Electronics and Information Technology (MeitY) guidelines, all application data, source code repositories submitted for lab testing, proprietary algorithm weights, and financial transaction records reside exclusively on certified Government of India cloud infrastructure within the geographical borders of India.
            </p>
            <p>
              All communications are encrypted in transit using 256-bit SSL/TLS encryption and stored with multi-factor cryptographic access controls.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>3. Non-Disclosure of Proprietary Startup IP</span>
            </h2>
            <p>
              Technological proposals, architecture blueprints, patent claims, and source code submitted by DPIIT startups remain the exclusive intellectual property of the founding entity. Government evaluators and testing laboratories operate under statutory non-disclosure obligations.
            </p>
          </section>

          <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <p className="font-bold text-slate-900 mb-1">Nodal Data Privacy Officer:</p>
            <p>DPIIT Cyber Security Division, Vanijya Bhawan, New Delhi - 110011 | Email: privacy-sangamsetu@gov.in</p>
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
