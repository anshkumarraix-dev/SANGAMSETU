'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Download,
  Shield,
  CheckCircle2,
  BookOpen,
  Scale,
  Lock,
  Calendar,
  Building2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function GuidelinesSection() {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'TEMPLATES' | 'GFR' | 'IPR' | 'DBT'>('TEMPLATES');

  const templates = [
    {
      id: 'TPL-001',
      title: 'Operational Problem Statement Formulation Template',
      code: 'DPIIT/SETU/2026/TPL-PS',
      category: 'Government Departments',
      description: 'Standard format for defining baseline metrics, operational constraints, target KPIs, and pilot corridor environments under GFR Rule 149.',
      fileType: 'PDF / DOCX',
      size: '245 KB',
      lastRevised: '15 August 2026',
    },
    {
      id: 'TPL-002',
      title: 'Multi-Criteria AI & Technical Evaluation Rubric',
      code: 'DPIIT/SETU/2026/TPL-EVAL',
      category: 'Evaluation Committees',
      description: 'Comprehensive 8-parameter scoring framework with weightages, scoring matrices, and G1 (Quality) vs G2 (Cost-Effectiveness) thresholds.',
      fileType: 'PDF / XLSX',
      size: '310 KB',
      lastRevised: '01 August 2026',
    },
    {
      id: 'TPL-003',
      title: 'Milestone-Based Innovation Pilot Agreement (Tripartite)',
      code: 'MoF/DOE/2026/SETU-AGR',
      category: 'Contracting',
      description: 'Standard model agreement between Ministry, DPIIT Startup, and STQC Testing Lab governing milestone deliverables, fund escrow, and trial terms.',
      fileType: 'PDF / DOCX',
      size: '420 KB',
      lastRevised: '20 July 2026',
    },
    {
      id: 'TPL-004',
      title: 'STQC Standard Test Protocol & Verification Checklist',
      code: 'MeitY/STQC/2026/INNOV-STD',
      category: 'Testing Labs',
      description: '5-pillar lab benchmarking protocol: Edge Functionality, Load Stress, CERT-In Level 3 Security, Usability, and Government API Interoperability.',
      fileType: 'PDF',
      size: '580 KB',
      lastRevised: '10 June 2026',
    },
  ];

  const handleDownload = (title: string) => {
    alert(`Official Template Download Initiated: "${title}". Generated under DPIIT Reference No. SETU/DOC/2026.`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* Contextual Visual Header Banner */}
      <div className="relative w-full h-44 sm:h-52 md:h-60 rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-sm bg-slate-900">
        <Image
          src="/images/banner-guidelines.jpg"
          alt="Government gazette, statutory guidelines and legal standard templates"
          fill
          loading="lazy"
          className="object-cover object-center opacity-85 hover:scale-102 transition-transform duration-700"
          sizes="(max-width: 1440px) 100vw, 1440px"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/20 flex flex-col justify-center px-6 sm:px-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sangam-blue-600/90 text-white text-xs font-bold mb-2.5 w-fit border border-sky-400/30 backdrop-blur-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Reference Manual</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
            Guidelines, Statutory Norms & Standard Templates
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-100 max-w-2xl leading-relaxed drop-shadow-sm font-medium">
            Official frameworks governing challenge formulation, GFR 2017 exemptions, milestone disbursements, and intellectual property protection.
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Official Reference Manual</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Guidelines, Statutory Norms & Standard Templates
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Official frameworks governing challenge formulation, GFR 2017 exemptions, milestone disbursements, and intellectual property protection for government innovation procurement.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 rounded-sm p-3 shrink-0">
            <div>Gazette Ref: CG-DL-E-2026-0904</div>
            <div className="text-slate-700 font-bold mt-0.5">Last Updated: 04 September 2026</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-md px-4 pt-3 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('TEMPLATES')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'TEMPLATES'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Standard Procurement Templates
        </button>
        <button
          onClick={() => setActiveTab('GFR')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'GFR'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          GFR 2017 & Public Procurement Exemptions
        </button>
        <button
          onClick={() => setActiveTab('IPR')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'IPR'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Intellectual Property (IP) Protection
        </button>
        <button
          onClick={() => setActiveTab('DBT')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'DBT'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Direct Benefit Transfer (DBT) Milestones
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'TEMPLATES' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between hover:border-sangam-blue-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm border border-slate-200">
                      {tpl.code}
                    </span>
                    <span className="text-[11px] font-bold text-sangam-blue-600 bg-sangam-blue-50 px-2 py-0.5 rounded-sm">
                      {tpl.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{tpl.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{tpl.description}</p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Format: {tpl.fileType} ({tpl.size})</span>
                  <button
                    onClick={() => handleDownload(tpl.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold rounded-sm text-xs cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-sangam-saffron-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Mandatory Usage Note:</span> All government ministries and autonomous bodies publishing challenges on SangamSetu must format requirements using Template Code <strong>DPIIT/SETU/2026/TPL-PS</strong> to ensure automated compatibility with the AI Multi-Criteria Scoring Engine.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'GFR' && (
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-sangam-green-600 font-bold text-xs uppercase mb-1">
              <Scale className="w-4 h-4" />
              <span>Statutory Procurement Exemption</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              General Financial Rules (GFR 2017) — Rule 161(iv) & Rule 149 Special Provisions
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Statutory relaxation of prior turnover and prior experience thresholds for DPIIT-recognized startups participating in government innovation challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm mb-2">1. Prior Turnover Exemption</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As per Ministry of Finance Office Memorandum No. F.20/2/2014-PPD(Pt.), DPIIT-recognized startups are <strong>100% exempt</strong> from any prior turnover threshold in technical innovation challenges, subject to meeting quality and technical specifications verified by an empanelled testing lab.
              </p>
            </div>

            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm mb-2">2. Prior Experience Exemption</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Departments are prohibited from mandating &apos;prior government project experience&apos; as an eligibility barrier. Technical capability is evaluated purely through algorithmic scoring of the submitted architecture and independent STQC lab benchmarking.
              </p>
            </div>

            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm mb-2">3. Earnest Money Deposit (EMD) Waiver</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Startups recognized under the Startup India scheme are completely exempt from submitting Earnest Money Deposit (EMD) or Bid Security during proposal submission. A simple Bid Securing Declaration is accepted.
              </p>
            </div>

            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm mb-2">4. Direct GeM National Scale-Up</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Solutions that successfully complete a 6-month field pilot with STQC certification can be directly cataloged on the <strong>Government e-Marketplace (GeM)</strong> Startup Runway for rapid nationwide procurement without repetitive re-tendering.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'IPR' && (
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-sangam-blue-600 font-bold text-xs uppercase mb-1">
              <Lock className="w-4 h-4" />
              <span>Intellectual Property Governance</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              National Intellectual Property & Data Sovereignty Policy
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Strict protections ensuring that all intellectual property, source code, patents, and proprietary algorithms created by participating startups remain 100% startup-owned.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 border-l-4 border-sangam-blue-600 bg-slate-50 rounded-r-sm">
              <h4 className="font-bold text-slate-900 mb-1">100% Background and Foreground IP Retention</h4>
              <p className="leading-relaxed">
                The participating startup retains full, unencumbered ownership of all background IP and foreground innovations developed during the pilot program. Government departments receive a non-exclusive, perpetual, royalty-free license to use the solution within the designated project jurisdiction.
              </p>
            </div>

            <div className="p-4 border-l-4 border-sangam-green-600 bg-slate-50 rounded-r-sm">
              <h4 className="font-bold text-slate-900 mb-1">Confidentiality & Non-Disclosure (NDA) Mandate</h4>
              <p className="leading-relaxed">
                All submitted source code repositories, architectural designs, and proprietary schematics are encrypted at rest and accessible exclusively by designated evaluation committee members and assigned STQC lab auditors under strict digital confidentiality agreements.
              </p>
            </div>

            <div className="p-4 border-l-4 border-sangam-saffron-500 bg-slate-50 rounded-r-sm">
              <h4 className="font-bold text-slate-900 mb-1">Data Sovereignty & Localization</h4>
              <p className="leading-relaxed">
                All telemetry data, government sensor feeds, and citizen information generated during pilot testing must remain hosted on MeitY-empaneled cloud data centers physically located within the sovereign territory of the Republic of India.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'DBT' && (
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-sangam-green-600 font-bold text-xs uppercase mb-1">
              <Building2 className="w-4 h-4" />
              <span>Payment Assurance Mechanism</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Milestone-Based Direct Benefit Transfer (DBT) Workflow
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Transparent, automated fund release schedule tied strictly to verified milestones through Public Financial Management System (PFMS) and RBI-NEFT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sangam-blue-600 text-xs">Milestone 1 (30%)</span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-sm">Days 1–30</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Fabrication & Mobilization</h4>
              <p className="text-xs text-slate-600">
                Released upon submission of hardware bill of materials, staging server deployment, and initial site calibration clearance with department engineers.
              </p>
            </div>

            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sangam-saffron-600 text-xs">Milestone 2 (40%)</span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-sm">Days 31–120</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Field Trial & STQC Testing</h4>
              <p className="text-xs text-slate-600">
                Released upon successful completion of 90-day continuous real-world field trials and issuance of an official STQC Pass Certificate.
              </p>
            </div>

            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sangam-green-600 text-xs">Milestone 3 (30%)</span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm">Days 121–180</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Scale-up & Handover</h4>
              <p className="text-xs text-slate-600">
                Released upon final project sign-off, delivery of nationwide scale-up architecture, and cataloging on the GeM portal.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
