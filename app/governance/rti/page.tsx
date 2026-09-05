'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { Scale, FileText, UserCheck, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function RTIPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="rti-page">
      <MainNavbar activeTab="rti" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Governance & Compliance</span>
            <span>/</span>
            <span className="text-slate-300">Right to Information (RTI)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Scale className="w-7 h-7 text-sangam-saffron-400" />
            <span>Right to Information Act, 2005 (Section 4(1)(b) Disclosures)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Statutory proactive disclosures, Central Public Information Officer (CPIO) particulars, First Appellate Authority details, and automated audit trails for the SangamSetu National Innovation Procurement Portal.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-8" id="main-content">
        {/* Section 1: Overview & Statutory Mandate */}
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sangam-blue-700 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-sangam-blue-600" />
            <span>Proactive Public Disclosure</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Obligations under Section 4(1)(b) of the RTI Act, 2005
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            SangamSetu operates under the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry. In adherence to Section 4 of the Right to Information Act, all procurement challenge publications, technical qualification criteria, algorithm weighting methodologies, and pilot grant sanction registers are maintained in an immutable, digitally verifiable ledger.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-sm bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-1">Public Challenge Registers</span>
              <p className="text-[11px] text-slate-600">All challenge budget sanctions, terms of reference, and participating DPIIT startup rosters are published in open machine-readable format.</p>
            </div>
            <div className="p-4 rounded-sm bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-1">Algorithm Evaluation Transparency</span>
              <p className="text-[11px] text-slate-600">Mathematical weighting rules (GFR 149 / 161(iv)) and SHAP explanation vectors are publicly auditable to prevent subjective discretion.</p>
            </div>
            <div className="p-4 rounded-sm bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-1">STQC Testing Certificates</span>
              <p className="text-[11px] text-slate-600">Standard test reports and benchmarking scores issued by empanelled government testing labs are recorded with cryptographic timestamps.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Designated RTI Officers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-sangam-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Central Public Information Officer (CPIO)</h3>
            </div>
            <div className="text-xs space-y-1.5 text-slate-700 bg-slate-50 p-4 rounded-sm border border-slate-200">
              <p className="font-bold text-slate-900 text-sm">Shri R. K. Verma, Director (Startup Procurement)</p>
              <p>Department for Promotion of Industry and Internal Trade (DPIIT)</p>
              <p>Room No. 312, Vanijya Bhawan, 16 Akbar Road, New Delhi - 110011</p>
              <p className="flex items-center gap-2 pt-2 text-slate-800 font-medium">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tel: 011-2306-1234 (Ext. 402)</span>
              </p>
              <p className="flex items-center gap-2 text-slate-800 font-medium">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>Email: cpio-sangamsetu@gov.in</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-900">First Appellate Authority (FAA)</h3>
            </div>
            <div className="text-xs space-y-1.5 text-slate-700 bg-slate-50 p-4 rounded-sm border border-slate-200">
              <p className="font-bold text-slate-900 text-sm">Smt. Sunita Sharma, Joint Secretary (Innovation)</p>
              <p>Department for Promotion of Industry and Internal Trade (DPIIT)</p>
              <p>Room No. 204, Vanijya Bhawan, 16 Akbar Road, New Delhi - 110011</p>
              <p className="flex items-center gap-2 pt-2 text-slate-800 font-medium">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tel: 011-2306-5678</span>
              </p>
              <p className="flex items-center gap-2 text-slate-800 font-medium">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>Email: faa-sangamsetu@gov.in</span>
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Online RTI Application Submission */}
        <div className="bg-slate-900 text-white rounded-md p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Filing an Online RTI Application</h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Citizens wishing to seek information under the RTI Act, 2005 may file an application online through the National RTI Online Portal by selecting &quot;Department for Promotion of Industry and Internal Trade&quot; as the nodal department.
            </p>
          </div>
          <a
            href="https://rtionline.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 transition-colors shadow-sm"
          >
            <span>Visit RTI Online Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
