'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { ShieldAlert, CheckCircle2, Clock, Mail, Phone, ExternalLink, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function CPGRAMSPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="cpgrams-page">
      <MainNavbar activeTab="grievance" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Governance & Compliance</span>
            <span>/</span>
            <span className="text-slate-300">Public Grievances (CPGRAMS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-sangam-saffron-400" />
            <span>Public Grievance Redressal Mechanism (CPGRAMS)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Centralized Public Grievance Redress and Monitoring System integration, DPIIT grievance redressal charter, and dedicated dispute escalation timelines for participating startups and government buyers.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-8" id="main-content">
        {/* Service Level Charter */}
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            Citizen & Startup Grievance Redressal Service Charter
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            In line with the Government of India&apos;s commitment to transparent and accountable public procurement, SangamSetu adheres to a strict 15-day resolution window for all procurement-related grievances filed by DPIIT startups or government procurement officers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-sangam-blue-600 font-bold text-xs">
                <Clock className="w-4 h-4" />
                <span>Level 1: Nodal Helpdesk</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold">Turnaround: 48 Hours</p>
              <p className="text-[11px] text-slate-600">Technical inquiries, registration verification, OTP discrepancies, and document upload clarifications.</p>
            </div>

            <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
                <ShieldAlert className="w-4 h-4" />
                <span>Level 2: Grievance Officer</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold">Turnaround: 7 Working Days</p>
              <p className="text-[11px] text-slate-600">Evaluation scoring disputes, GFR exemption rejections, STQC lab scheduling delays, or PFMS payment queries.</p>
            </div>

            <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Level 3: CPGRAMS Portal</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold">Turnaround: 15 Working Days</p>
              <p className="text-[11px] text-slate-600">Formal statutory escalation to DARPG (Department of Administrative Reforms and Public Grievances).</p>
            </div>
          </div>
        </div>

        {/* Nodal Grievance Officer Details */}
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900">DPIIT Nodal Public Grievance Officer</h3>
          <div className="text-xs space-y-1.5 text-slate-700 bg-slate-50 p-4 rounded-sm border border-slate-200">
            <p className="font-bold text-slate-900 text-sm">Dr. Amit Mathur, Director (Public Grievances)</p>
            <p>Department for Promotion of Industry and Internal Trade (DPIIT)</p>
            <p>Vanijya Bhawan, 16 Akbar Road, New Delhi - 110011</p>
            <p className="flex items-center gap-2 pt-2 text-slate-800 font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Helpline: 1800-115-565 / 011-2306-9988</span>
            </p>
            <p className="flex items-center gap-2 text-slate-800 font-medium">
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span>Grievance Email: grievances-sangamsetu@gov.in</span>
            </p>
          </div>
        </div>

        {/* CPGRAMS Official Link Banner */}
        <div className="bg-slate-900 text-white rounded-md p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Lodge a Grievance on CPGRAMS</h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              If your grievance remains unaddressed beyond the stipulated service charter timeline, you may escalate directly via the Government of India CPGRAMS portal under &quot;Ministry of Commerce and Industry → DPIIT&quot;.
            </p>
          </div>
          <a
            href="https://pgportal.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 transition-colors shadow-sm"
          >
            <span>Visit CPGRAMS Portal (pgportal.gov.in)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
