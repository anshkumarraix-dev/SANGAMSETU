'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Map,
  Compass,
  FileText,
  Shield,
  Building2,
  Rocket,
  FlaskConical,
  Scale,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { ActiveView } from '@/lib/types';

export default function SitemapSection() {
  const { setActiveView, setRole } = useApp();

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sitemapCategories = [
    {
      title: 'Public Innovation Marketplace',
      icon: Rocket,
      links: [
        { label: 'National Innovation Portal Home', view: 'home' as ActiveView },
        { label: 'Live Problem Statements & Challenges', view: 'challenges' as ActiveView },
        { label: '9-Step Innovation Procurement Workflow', view: 'workflow' as ActiveView },
        { label: 'Pilot Success Stories & Case Studies', view: 'success-stories' as ActiveView },
      ],
    },
    {
      title: 'Statutory Guidelines & Reference Norms',
      icon: Scale,
      links: [
        { label: 'Standard Procurement Templates', view: 'guidelines' as ActiveView },
        { label: 'GFR 2017 & Public Procurement Exemptions', view: 'guidelines' as ActiveView },
        { label: 'Official Circulars & Office Memorandums', view: 'circulars' as ActiveView },
        { label: 'Frequently Asked Questions (FAQ)', view: 'faq' as ActiveView },
      ],
    },
    {
      title: 'Governance, Transparency & RTI',
      icon: Shield,
      links: [
        { label: 'Right to Information (RTI) Disclosures', view: 'rti' as ActiveView },
        { label: 'Public Grievance Redressal (CPGRAMS)', view: 'grievance' as ActiveView },
        { label: 'CPIO & First Appellate Authority Directory', view: 'rti' as ActiveView },
        { label: 'Audited Procurement Logs Repository', view: 'guidelines' as ActiveView },
      ],
    },
    {
      title: 'Legal, Privacy & Compliance Policies',
      icon: FileText,
      links: [
        { label: 'Privacy Policy (DPDP Act 2023)', view: 'privacy' as ActiveView },
        { label: 'Terms & Conditions of Service', view: 'terms' as ActiveView },
        { label: 'Copyright & Intellectual Property Policy', view: 'copyright' as ActiveView },
        { label: 'Hyperlinking Policy', view: 'hyperlink' as ActiveView },
        { label: 'Official Disclaimer', view: 'disclaimer' as ActiveView },
        { label: 'Accessibility Statement (GIGW 3.0)', view: 'accessibility' as ActiveView },
      ],
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>GIGW 3.0 Mandatory Index</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Complete Portal Sitemap & Index Directory
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Structured directory of all public endpoints, dashboard workspaces, official circulars, statutory disclosures, and regulatory resources hosted on SangamSetu.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 rounded-sm p-3 shrink-0">
            <div>XML Sitemap Index: /sitemap.xml</div>
            <div className="text-slate-700 font-bold mt-0.5">Last Updated: 04 September 2026</div>
          </div>
        </div>
      </div>

      {/* Grid of Sitemap Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sitemapCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-md p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-sm bg-sangam-blue-50 border border-sangam-blue-200 flex items-center justify-center text-sangam-blue-600 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
              </div>

              <ul className="space-y-2">
                {cat.links.map((lnk, lIdx) => (
                  <li key={lIdx}>
                    <button
                      onClick={() => handleNavigate(lnk.view)}
                      className="w-full text-left py-1.5 px-2.5 rounded-sm hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-sangam-blue-600 flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span>{lnk.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sangam-blue-600 transition-colors" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Role-Based Secure Workspaces Index */}
      <div className="mt-6 bg-white border border-slate-200 rounded-md p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Authenticated Role-Based Portals (Single Sign-On / Parichay)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 border border-slate-200 rounded-sm bg-slate-50">
            <div className="font-bold text-slate-900">DPIIT Startup Workspace</div>
            <p className="text-slate-500 mt-1 text-[11px]">Proposal formulation, prototype dispatch tracking, and milestone invoice submissions.</p>
          </div>
          <div className="p-3 border border-slate-200 rounded-sm bg-slate-50">
            <div className="font-bold text-slate-900">Ministry / Department Portal</div>
            <p className="text-slate-500 mt-1 text-[11px]">Challenge creation wizard, AI G1/G2 committee shortlisting, and PFMS fund sanctioning.</p>
          </div>
          <div className="p-3 border border-slate-200 rounded-sm bg-slate-50">
            <div className="font-bold text-slate-900">STQC Testing Lab Console</div>
            <p className="text-slate-500 mt-1 text-[11px]">Prototype intake logging, 5-pillar test score entry, and digital certificate issuance.</p>
          </div>
          <div className="p-3 border border-slate-200 rounded-sm bg-slate-50">
            <div className="font-bold text-slate-900">DPIIT National Admin Desk</div>
            <p className="text-slate-500 mt-1 text-[11px]">System-wide audit trail, algorithmic bias fairness monitor, and ministry analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
