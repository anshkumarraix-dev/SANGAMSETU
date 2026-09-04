'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Building,
  Search,
  Filter,
  ExternalLink,
  Shield,
  Tag,
} from 'lucide-react';

interface Circular {
  id: string;
  refNumber: string;
  title: string;
  issuingAuthority: string;
  date: string;
  category: 'PROCUREMENT_RELAXATION' | 'AI_GOVERNANCE' | 'TESTING_NORMS' | 'BUDGET_DISBURSEMENT';
  summary: string;
  fileSize: string;
}

const CIRCULARS_DATA: Circular[] = [
  {
    id: 'CIR-2026-08',
    refNumber: 'MoF-DoE/PPD/2026/08/SETU',
    title: 'Advisory on Mandatory Utilization of SangamSetu for Innovation Tenders under GFR 161(iv)',
    issuingAuthority: 'Department of Expenditure, Ministry of Finance',
    date: '28 August 2026',
    category: 'PROCUREMENT_RELAXATION',
    summary: 'Directs all Central Ministries and CPSEs to route technology innovation challenges with budgets below ₹5 Crore exclusively through the SangamSetu portal to foster DPIIT startup participation.',
    fileSize: '412 KB',
  },
  {
    id: 'CIR-2026-07',
    refNumber: 'DPIIT/STARTUP/2026/AI-EVAL',
    title: 'Standard Operating Procedure (SOP) for Dual-Cohort G1 (Quality) and G2 (Cost-Effective) Shortlisting',
    issuingAuthority: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    date: '14 August 2026',
    category: 'AI_GOVERNANCE',
    summary: 'Notifies the formal mathematical guidelines for the 8-parameter weighted scoring algorithm, Fairlearn algorithmic bias checks, and committee override transparency logging.',
    fileSize: '685 KB',
  },
  {
    id: 'CIR-2026-06',
    refNumber: 'MeitY/STQC/INNOV/2026/22',
    title: 'Empanelment of 45 Testing Labs under STQC and C-DAC for Rapid Prototype Benchmarking',
    issuingAuthority: 'Ministry of Electronics and Information Technology (MeitY)',
    date: '02 August 2026',
    category: 'TESTING_NORMS',
    summary: 'Announces fixed-tariff testing protocols, 14-day turnaround SLAs, and standardized test certificate formats for IoT, AI, and CleanTech startup prototypes.',
    fileSize: '530 KB',
  },
  {
    id: 'CIR-2026-05',
    refNumber: 'DPIIT/FIN/2026/PFMS-DBT',
    title: 'Guidelines for Automated PFMS Milestone-Based Direct Bank Transfers for Pilot Projects',
    issuingAuthority: 'DPIIT & Controller General of Accounts',
    date: '18 July 2026',
    category: 'BUDGET_DISBURSEMENT',
    summary: 'Outlines the tripartite escrow and automated RBI-NEFT disbursement mechanism for releasing 30%-40%-30% tranche payments upon verified digital milestones.',
    fileSize: '390 KB',
  },
  {
    id: 'CIR-2026-04',
    refNumber: 'GeM/TECH/2026/STARTUP-SCALE',
    title: 'Fast-Track Direct GeM Cataloging Framework for STQC-Certified Innovation Pilots',
    issuingAuthority: 'Government e-Marketplace (GeM) Secretariat',
    date: '05 July 2026',
    category: 'PROCUREMENT_RELAXATION',
    summary: 'Specifies the seamless onboarding pathway from SangamSetu pilot graduation to the GeM Startup Runway with pre-approved price discovery for all government buyers.',
    fileSize: '495 KB',
  },
  {
    id: 'CIR-2026-03',
    refNumber: 'MoRTH/RDSO/2026/AI-INFRA',
    title: 'Adoption of Computer Vision & IoT Sensor Technologies for National Highway Asset Monitoring',
    issuingAuthority: 'Ministry of Road Transport and Highways',
    date: '15 June 2026',
    category: 'PROCUREMENT_RELAXATION',
    summary: 'Special procurement directive welcoming edge-AI automated pavement inspection and AI toll traffic optimization solutions developed by Indian startups.',
    fileSize: '740 KB',
  },
];

export default function CircularsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredCirculars = CIRCULARS_DATA.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.issuingAuthority.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (c: Circular) => {
    alert(`Official Gazette Document Download: "${c.title}" (Ref: ${c.refNumber}). Authenticated with NIC Digital Signature.`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>Official Gazette & Notifications</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Circulars, Office Memorandums & Statutory Notices
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Authentic policy circulars issued by the Ministry of Commerce & Industry, Ministry of Finance, and MeitY governing startup procurement exemptions, AI scoring protocols, and testing standards.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 rounded-sm p-3 shrink-0">
            <div>Repository ID: SETU/CIRC/2026</div>
            <div className="text-slate-700 font-bold mt-0.5">Last Updated: 04 September 2026</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search circulars by keyword, reference number, or issuing ministry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-sangam-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white font-medium focus:outline-none focus:border-sangam-blue-600"
            >
              <option value="ALL">All Categories</option>
              <option value="PROCUREMENT_RELAXATION">Procurement & GFR Relaxations</option>
              <option value="AI_GOVERNANCE">AI Governance & Scoring SOPs</option>
              <option value="TESTING_NORMS">STQC Lab Testing Norms</option>
              <option value="BUDGET_DISBURSEMENT">PFMS Budget Disbursement</option>
            </select>
          </div>
        </div>
        <div className="text-[11px] text-slate-500 mt-2 font-medium">
          Showing {filteredCirculars.length} of {CIRCULARS_DATA.length} official circulars
        </div>
      </div>

      {/* Circulars Listing Table */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-2xs">
        <div className="divide-y divide-slate-200">
          {filteredCirculars.map((circ) => (
            <div key={circ.id} className="p-5 hover:bg-slate-50/70 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sangam-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-sm">
                      {circ.refNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {circ.date}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm">
                      {circ.category.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-1">{circ.title}</h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{circ.issuingAuthority}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{circ.summary}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
                  <div className="text-[11px] text-slate-500 text-right hidden sm:block">
                    <div>Format: PDF (Official)</div>
                    <div className="font-medium">{circ.fileSize}</div>
                  </div>

                  <button
                    onClick={() => handleDownload(circ)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold rounded-sm text-xs cursor-pointer transition-colors shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
