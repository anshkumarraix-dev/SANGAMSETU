'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import GuidelinesSection from '@/components/public/GuidelinesSection';
import { BookOpen, ShieldCheck, Scale, FileText } from 'lucide-react';
import Link from 'next/link';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="guidelines-page">
      <MainNavbar activeTab="guidelines" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Statutory Guidelines & GFR Provisions</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-sangam-saffron-400" />
                <span>Statutory Procurement Guidelines & Standard Operating Procedures</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Comprehensive operational manual under General Financial Rules (GFR) 2017 Rules 149 & 161(iv), DPIIT notification norms, and STQC lab certification standards.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/circulars"
                className="px-3.5 py-2 rounded-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Circulars</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8" id="main-content">
        <GuidelinesSection />
      </main>

      <GovernmentFooter />
    </div>
  );
}
