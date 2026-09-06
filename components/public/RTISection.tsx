'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FileCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Shield,
  Download,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function RTISection() {
  const [activeTab, setActiveTab] = useState<'OFFICERS' | 'DISCLOSURES' | 'HOW_TO_APPLY'>('OFFICERS');

  const handleDownloadDisclosure = (docName: string) => {
    alert(`RTI Proactive Disclosure Document Downloaded: "${docName}". (Section 4(1)(b) compliant).`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* Contextual Visual Header Banner */}
      <div className="relative w-full h-44 sm:h-52 md:h-60 rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-sm bg-slate-900">
        <Image
          src="/images/banner-rti.jpg"
          alt="Statutory compliance, legal right to information disclosure records"
          fill
          loading="lazy"
          className="object-cover object-center opacity-85 hover:scale-102 transition-transform duration-700"
          sizes="(max-width: 1440px) 100vw, 1440px"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/20 flex flex-col justify-center px-6 sm:px-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sangam-blue-600/90 text-white text-xs font-bold mb-2.5 w-fit border border-sky-400/30 backdrop-blur-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>Statutory Compliance • RTI Act 2005</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
            Right to Information (RTI) Transparency Portal
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-100 max-w-2xl leading-relaxed drop-shadow-sm font-medium">
            Proactive Section 4(1)(b) disclosures, designated Central Public Information Officers (CPIO), and statutory appeal workflows.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>Statutory Compliance • RTI Act 2005</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Right to Information (RTI) Transparency Portal
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Proactive disclosures, designated Central Public Information Officers (CPIO), First Appellate Authority details, and procedures for seeking official information regarding SangamSetu operations.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 rounded-sm p-3 shrink-0">
            <div>Section 4(1)(b) Manual</div>
            <div className="text-slate-700 font-bold mt-0.5">Last Updated: 04 September 2026</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-md px-4 pt-3 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('OFFICERS')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'OFFICERS'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Designated CPIO & Appellate Authority
        </button>
        <button
          onClick={() => setActiveTab('DISCLOSURES')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'DISCLOSURES'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Proactive Disclosures (Section 4)
        </button>
        <button
          onClick={() => setActiveTab('HOW_TO_APPLY')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'HOW_TO_APPLY'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Procedure to File an RTI Request
        </button>
      </div>

      {/* Tab 1: Officers */}
      {activeTab === 'OFFICERS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPIO Card */}
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sangam-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                Central Public Information Officer (CPIO)
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">Shri Rajesh Kumar Sharma</h3>
              <p className="text-xs text-slate-600">Director (Startup Procurement & Innovation), DPIIT</p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Department for Promotion of Industry and Internal Trade, Ministry of Commerce & Industry</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Room No. 348, Vanijya Bhawan, 16 Akbar Road, New Delhi - 110011</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>+91-11-2306-1842 (Ext. 402)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>cpio-sangamsetu@gov.in</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              Jurisdiction: All administrative, financial, and challenge evaluation records under SangamSetu.
            </div>
          </div>

          {/* First Appellate Authority */}
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sangam-green-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                First Appellate Authority (FAA)
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">Smt. Meenakshi Sundaram, IAS</h3>
              <p className="text-xs text-slate-600">Joint Secretary, DPIIT</p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Department for Promotion of Industry and Internal Trade</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Room No. 204, Vanijya Bhawan, 16 Akbar Road, New Delhi - 110011</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>+91-11-2306-2580</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>appellate-sangamsetu@gov.in</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              First Appeal Timeline: Within 30 days from receipt of CPIO response or non-response.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Disclosures */}
      {activeTab === 'DISCLOSURES' && (
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Mandatory Disclosures under Section 4(1)(b) of the RTI Act
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              {
                clause: '4(1)(b)(i)',
                title: 'Particulars of the Organization, Functions and Duties',
                desc: 'Detailed charter of the SangamSetu National Innovation Procurement Platform under DPIIT.',
              },
              {
                clause: '4(1)(b)(ii)',
                title: 'Powers and Duties of Officers and Employees',
                desc: 'Delegation of financial and administrative authority regarding innovation grant sanctions and DBT releases.',
              },
              {
                clause: '4(1)(b)(iii)',
                title: 'Procedure followed in the Decision Making Process',
                desc: 'Full specification of the 9-step procurement cycle, AI G1/G2 mathematical criteria, and committee review rules.',
              },
              {
                clause: '4(1)(b)(iv)',
                title: 'Norms set by it for the Discharge of its Functions',
                desc: 'Timelines and service level agreements (SLAs): 30-day challenge window, 14-day lab testing, 7-day payment release.',
              },
              {
                clause: '4(1)(b)(xi)',
                title: 'Budget Allocated to each Agency, Programs & Expenditures',
                desc: 'Financial year 2026-27 total innovation procurement outlay: ₹210 Crore across participating Central Ministries.',
              },
            ].map((item) => (
              <div key={item.clause} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-sangam-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-sm">
                      Section {item.clause}
                    </span>
                    <span className="font-bold text-slate-900">{item.title}</span>
                  </div>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleDownloadDisclosure(item.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-sm text-xs cursor-pointer shrink-0 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: How to Apply */}
      {activeTab === 'HOW_TO_APPLY' && (
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Step-by-Step Procedure to Submit an RTI Application</h3>
            <p className="text-xs text-slate-600">
              Citizens of India can request official documents, evaluation logs, or audit records not covered under non-disclosure clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <div className="font-bold text-sangam-blue-600 mb-1">Step 1: Online RTI Portal</div>
              <p className="text-slate-600 leading-relaxed">
                Visit the official <strong>rtionline.gov.in</strong> portal. Select Ministry: <em>Ministry of Commerce & Industry</em> and Public Authority: <em>Department for Promotion of Industry and Internal Trade (DPIIT)</em>.
              </p>
            </div>

            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <div className="font-bold text-sangam-blue-600 mb-1">Step 2: Pay Prescribed Fee</div>
              <p className="text-slate-600 leading-relaxed">
                Pay the statutory RTI fee of ₹10 (Rupees Ten only) online via Internet Banking, UPI, RuPay Card, or offline via Indian Postal Order (IPO) in favour of &quot;Accounts Officer, DPIIT, New Delhi&quot;.
              </p>
            </div>

            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <div className="font-bold text-sangam-blue-600 mb-1">Step 3: Response Timeline</div>
              <p className="text-slate-600 leading-relaxed">
                The CPIO shall respond to the application within <strong>30 calendar days</strong> of receipt. If dissatisfied, file a First Appeal to the First Appellate Authority within 30 days.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Statutory Exemption under Section 8(1)(d):</span> Commercial confidence, trade secrets, proprietary startup source code, and unreleased patent architectures are exempt from public disclosure under the RTI Act 2005.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
