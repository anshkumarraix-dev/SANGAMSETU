'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Rocket,
  Building2,
  FlaskConical,
  Scale,
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'STARTUP' | 'GOVERNMENT' | 'SCORING' | 'TESTING' | 'PAYMENTS';
  question: string;
  answer: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'FAQ-001',
    category: 'STARTUP',
    question: 'Who is eligible to submit solution proposals on SangamSetu?',
    answer: 'Any entity recognized as a "Startup" by the Department for Promotion of Industry and Internal Trade (DPIIT) holding an active DIPP recognition number is eligible. Startups are 100% exempt from prior turnover and prior experience clauses as per GFR 2017 Rule 161(iv).',
  },
  {
    id: 'FAQ-002',
    category: 'SCORING',
    question: 'How does the AI Multi-Criteria Scoring Engine evaluate proposals?',
    answer: 'Every proposal is scored across 8 weighted statutory parameters: Problem-Solution Fit (20%), Technical Feasibility (15%), Innovation & Novelty (15%), Cost-Effectiveness (15%), Scalability (10%), Implementation Roadmap (10%), Team Expertise (10%), and Regulatory/Cyber Compliance (5%). The algorithmic scoring is deterministic and generates a detailed per-parameter breakdown.',
  },
  {
    id: 'FAQ-003',
    category: 'SCORING',
    question: 'What is the difference between Cohort G1 and Cohort G2?',
    answer: 'Cohort G1 comprises the Top 5 highest overall quality solutions regardless of cost. Cohort G2 comprises the Top 5 most cost-effective solutions that meet a minimum quality floor (Score >= 70). Both cohorts are granted equal opportunity to submit working prototypes for independent STQC lab benchmarking.',
  },
  {
    id: 'FAQ-004',
    category: 'TESTING',
    question: 'Who conducts prototype testing and what are the evaluation metrics?',
    answer: 'Prototypes are independently benchmarked by empanelled government testing organizations such as Standardisation Testing and Quality Certification (STQC) Directorate, C-DAC, or NIELIT. Testing covers Functionality Verification, Load Stress Performance, CERT-In Level 3 Security, Usability, and API Interoperability.',
  },
  {
    id: 'FAQ-005',
    category: 'PAYMENTS',
    question: 'How are milestone payments released to selected startups?',
    answer: 'Payments are disbursed directly into the startup bank account via Public Financial Management System (PFMS) / RBI-NEFT in three tranches: 30% on mobilization and hardware setup, 40% on successful 90-day field trials with STQC Pass certification, and 30% on final pilot acceptance and GeM scale-up blueprint delivery.',
  },
  {
    id: 'FAQ-006',
    category: 'GOVERNMENT',
    question: 'How can government departments post a new challenge?',
    answer: 'Authorized procurement officers log in with their official @gov.in or @nic.in credentials and utilize the 4-step Challenge Formulation Wizard to input problem context, operational constraints, target KPIs, pilot corridor location, and approved budget range.',
  },
  {
    id: 'FAQ-007',
    category: 'GOVERNMENT',
    question: 'Does selecting a startup under SangamSetu violate open tendering rules?',
    answer: 'No. The 9-step innovation procurement pathway operates under the Special Innovation Procurement Framework sanctioned by the Ministry of Finance under GFR Rule 149 and Rule 161(iv), backed by competitive algorithmic shortlisting and mandatory third-party lab verification.',
  },
  {
    id: 'FAQ-008',
    category: 'STARTUP',
    question: 'Does the government take ownership of our intellectual property (IP)?',
    answer: 'No. The participating startup retains 100% of all background and foreground Intellectual Property (IP), patents, and source code. The procuring department receives only a non-exclusive license for operational deployment within the project scope.',
  },
];

export default function FaqSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('FAQ-001');

  const filteredFaqs = FAQS_DATA.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Knowledge Base & Support</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions (FAQ)
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Official clarifications on eligibility, algorithmic AI scoring, prototype testing protocols, milestone disbursements, and statutory procurement rules.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 rounded-sm p-3 shrink-0">
            <div>Helpdesk Code: FAQ-2026</div>
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
              placeholder="Search FAQs by query or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-sangam-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white font-medium focus:outline-none focus:border-sangam-blue-600"
            >
              <option value="ALL">All Categories</option>
              <option value="STARTUP">DPIIT Startups</option>
              <option value="GOVERNMENT">Government Departments</option>
              <option value="SCORING">AI Scoring & Shortlists</option>
              <option value="TESTING">STQC Lab Testing</option>
              <option value="PAYMENTS">Milestone Payments (DBT)</option>
            </select>
          </div>
        </div>
        <div className="text-[11px] text-slate-500 mt-2 font-medium">
          Showing {filteredFaqs.length} of {FAQS_DATA.length} answers
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white border border-slate-200 rounded-md overflow-hidden transition-colors"
            >
              <button
                onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-sangam-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                    {faq.category}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-700 leading-relaxed bg-slate-50/50">
                  <div className="pt-3">{faq.answer}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
