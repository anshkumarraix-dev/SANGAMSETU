'use client';

import React, { useState } from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { HelpCircle, ChevronDown, ChevronUp, Search, Briefcase, Landmark, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  category: 'startup' | 'government' | 'testing' | 'general';
  question: string;
  answer: string;
  statutoryRef?: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'startup',
    question: 'How do DPIIT-recognized startups qualify for prior turnover relaxation?',
    answer: 'Under General Financial Rules (GFR) 2017 Rule 161(iv) and Department of Expenditure OM No. F.20/2/2014-PPD(Pt.), any entity possessing valid DPIIT startup recognition is completely exempt from prior turnover and prior operational experience criteria across all innovation procurement challenges hosted on SangamSetu.',
    statutoryRef: 'GFR 2017 Rule 161(iv)',
  },
  {
    id: 'faq-2',
    category: 'startup',
    question: 'What is the pilot grant payment schedule and how is money disbursed?',
    answer: 'Pilot funding follows a statutory 40-30-30 electronic disbursement structure: 40% immediate mobilization advance upon contract sanctioning, 30% upon successful STQC/NABL lab prototype benchmark clearance, and 30% upon final ministry field validation and acceptance report.',
    statutoryRef: 'PFMS Electronic Transfer & GFR 2017',
  },
  {
    id: 'faq-3',
    category: 'startup',
    question: 'Is Earnest Money Deposit (EMD) required when submitting a proposal?',
    answer: 'No. All registered DPIIT startups are 100% exempt from submitting EMD or bid security fees under Rule 170(i) of GFR 2017.',
    statutoryRef: 'GFR 2017 Rule 170(i)',
  },
  {
    id: 'faq-4',
    category: 'government',
    question: 'How do Central Ministries publish problem statements under GFR Rule 149?',
    answer: 'Procurement officers log into the Government Portal dashboard using verified official government credentials (.gov.in / .nic.in / Udyam ID), specify the statutory budget ceiling (typically ₹25L to ₹2.5 Cr for pilots), select evaluation weighting matrices, and publish directly to the national challenge repository.',
    statutoryRef: 'GFR 2017 Rule 149 & GeM Direct Procurement',
  },
  {
    id: 'faq-5',
    category: 'government',
    question: 'How does the direct scale-out to GeM work after a successful pilot?',
    answer: 'Upon issuance of an STQC Lab Certificate and a satisfactory field trial report signed by the Procuring Officer, the solution is automatically catalogued on the Government e-Marketplace (GeM) as a verified innovation product, permitting single-source or direct procurement by any Union Ministry without fresh competitive re-tendering.',
    statutoryRef: 'DPIIT Innovation Scale-out Protocol',
  },
  {
    id: 'faq-6',
    category: 'testing',
    question: 'What is the role of STQC and NABL empanelled testing laboratories?',
    answer: 'Empanelled testing laboratories execute rigorous hardware, cybersecurity, stress testing, data sovereignty, and interoperability benchmarks. The lab issues a tamper-evident digital certificate with cryptographic verification before the second milestone disbursement is triggered.',
    statutoryRef: 'MeitY & STQC Standardization Guidelines',
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'How does the SangamSetu AI Evaluation Algorithm prevent bias?',
    answer: 'The platform evaluation engine scores proposals across 7 objective criteria using multi-criteria matrix analysis and SHAP explainability. It strictly operates demographic parity and geographic fairness checks to prevent bias against tier-2/3 innovators or early-stage founders.',
    statutoryRef: 'DPIIT Algorithmic Governance Charter',
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleOpen = (id: string) => {
    setOpenIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const filteredFaqs = FAQS.filter(f => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="faq-page">
      <MainNavbar activeTab="faq" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Support & Help</span>
            <span>/</span>
            <span className="text-slate-300">Frequently Asked Questions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-sangam-saffron-400" />
            <span>Frequently Asked Questions (FAQ)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Statutory, operational, and financial answers for DPIIT startups, Ministry procurement officers, and empanelled testing laboratories.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-6" id="main-content">
        {/* Controls: Search + Categories */}
        <div className="bg-white rounded-md border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, GFR rule, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-sangam-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setSelectedCategory('startup')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'startup'
                  ? 'bg-sangam-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>For Startups</span>
            </button>
            <button
              onClick={() => setSelectedCategory('government')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'government'
                  ? 'bg-sangam-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>For Ministries</span>
            </button>
            <button
              onClick={() => setSelectedCategory('testing')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                selectedCategory === 'testing'
                  ? 'bg-sangam-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>For Test Labs</span>
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-md border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-sangam-blue-600 uppercase tracking-wider">
                      {faq.category === 'startup' && 'Startup Innovation'}
                      {faq.category === 'government' && 'Ministry Procurement'}
                      {faq.category === 'testing' && 'Testing & Quality Lab'}
                      {faq.category === 'general' && 'Platform Governance'}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="shrink-0 mt-1 text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-sangam-blue-600" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.statutoryRef && (
                      <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-2 rounded-xs border border-emerald-200 inline-block">
                        Statutory Reference: {faq.statutoryRef}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help */}
        <div className="bg-slate-900 text-white rounded-md p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">Have a specific question not answered here?</h4>
            <p className="text-xs text-slate-300 mt-0.5">Contact the SangamSetu Nodal Helpdesk or submit an inquiry ticket.</p>
          </div>
          <Link
            href="/forgot-password"
            className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shrink-0"
          >
            Contact Portal Helpdesk
          </Link>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
