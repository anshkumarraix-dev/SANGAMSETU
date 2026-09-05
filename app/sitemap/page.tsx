'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { Map, ExternalLink, ShieldCheck, FileText, Layers, GitBranch, Award, BookOpen, Scale, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function SitemapPage() {
  const siteSections = [
    {
      title: '1. Primary Portal Navigation',
      icon: Layers,
      links: [
        { label: 'Home (National Innovation Gateway)', href: '/' },
        { label: 'Browse Active Innovation Challenges', href: '/challenges' },
        { label: '9-Step Statutory Procurement Workflow', href: '/9-step-workflow' },
        { label: 'Pilot Outcomes & GeM Scale-out Deployments', href: '/pilot-outcomes' },
        { label: 'Statutory Guidelines & GFR Provisions', href: '/guidelines' },
        { label: 'Official Circulars & Gazette Orders', href: '/circulars' },
        { label: 'Multi-Role Portal Dashboard', href: '/dashboard' },
      ],
    },
    {
      title: '2. User Access & Authentication',
      icon: ShieldCheck,
      links: [
        { label: 'Secure Portal Login', href: '/login' },
        { label: 'Entity Registration (Startup / Govt / Lab)', href: '/register' },
        { label: 'Password Reset & Nodal Helpdesk Verification', href: '/forgot-password' },
      ],
    },
    {
      title: '3. Governance, RTI & Public Grievance',
      icon: Scale,
      links: [
        { label: 'Right to Information (RTI Act 2005 Proactive Disclosures)', href: '/governance/rti' },
        { label: 'Public Grievance Redressal (CPGRAMS Integration)', href: '/governance/cpgrams' },
        { label: 'GFR 2017 Startup Exemption Norms', href: '/governance/startup-exemptions' },
        { label: 'Frequently Asked Questions (FAQ)', href: '/faq' },
      ],
    },
    {
      title: '4. Legal, Compliance & GIGW 3.0 Standards',
      icon: FileText,
      links: [
        { label: 'Privacy Policy & Data Sovereignty', href: '/legal/privacy-policy' },
        { label: 'Terms of Service & Portal Usage Norms', href: '/legal/terms' },
        { label: 'Government Copyright Policy & Open Data License', href: '/legal/copyright' },
        { label: 'Hyperlinking Policy', href: '/legal/hyperlinking' },
        { label: 'Disclaimer & Statutory Disclosures', href: '/legal/disclaimer' },
        { label: 'Accessibility Statement (GIGW 3.0 & WCAG 2.1 AA)', href: '/legal/accessibility' },
        { label: 'Complete Portal Sitemap', href: '/sitemap' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="sitemap-page">
      <MainNavbar activeTab="sitemap" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Portal Directory</span>
            <span>/</span>
            <span className="text-slate-300">Sitemap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Map className="w-7 h-7 text-sangam-saffron-400" />
            <span>Complete Portal Sitemap & Resource Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Index of all verified static, transactional, statutory, and governance endpoints hosted on the SangamSetu National Innovation Procurement Portal.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-6" id="main-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-sangam-navy-900 border-b border-slate-100 pb-3">
                  <Icon className="w-5 h-5 text-sangam-blue-600" />
                  <h2 className="text-base font-bold text-slate-900">{sec.title}</h2>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {sec.links.map((lnk, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={lnk.href}
                        className="text-slate-700 hover:text-sangam-blue-600 hover:underline flex items-center gap-2 py-1 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sangam-blue-500 shrink-0"></span>
                        <span>{lnk.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
