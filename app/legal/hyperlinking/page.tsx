'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { ExternalLink, Link2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function HyperlinkingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="hyperlinking-page">
      <MainNavbar activeTab="hyperlink" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Legal & Policies</span>
            <span>/</span>
            <span className="text-slate-300">Hyperlinking Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Link2 className="w-7 h-7 text-sangam-saffron-400" />
            <span>Hyperlinking Policy (GIGW 3.0 Compliance)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Norms for linking to SangamSetu from external websites and guidelines for outbound links to other Government of India portals.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-6" id="main-content">
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Links to SangamSetu from External Sites</h2>
            <p>
              We do not object to you linking directly to the information that is hosted on this portal and no prior permission is required for the same. However, we do not permit our pages to be loaded into frames on your site. The pages belonging to this portal must load into a newly opened window or tab of the user.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Links to External Websites / Portals</h2>
            <p>
              At many places in this portal, you shall find links to other websites/portals (e.g., DPIIT, GeM, Startup India, PFMS, CPGRAMS, and NABL). These links have been placed for your convenience. SangamSetu is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them.
            </p>
            <p>
              We cannot guarantee that these links will work all the time and we have no control over the availability of linked pages.
            </p>
          </section>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
