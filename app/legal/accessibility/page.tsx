'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { Eye, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="accessibility-page">
      <MainNavbar activeTab="accessibility" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Legal & Policies</span>
            <span>/</span>
            <span className="text-slate-300">Accessibility Statement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Eye className="w-7 h-7 text-sangam-saffron-400" />
            <span>Accessibility Statement (GIGW 3.0 & WCAG 2.1 AA Compliance)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Commitment to digital inclusion, assistive technology compatibility, and compliance with the Guidelines for Indian Government Websites (GIGW 3.0).
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-6" id="main-content">
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Commitment to Accessibility</h2>
            <p>
              The Department for Promotion of Industry and Internal Trade (DPIIT) is committed to ensuring that the SangamSetu portal is accessible to all users irrespective of device in use, technology or ability. It has been built with an aim to provide maximum accessibility and usability to its visitors.
            </p>
            <p>
              This portal complies with the <strong>Guidelines for Indian Government Websites (GIGW 3.0)</strong> and conforms to Level AA of the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Accessibility Features Built into the Portal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 text-xs block">Skip to Main Content Anchor</span>
                <p className="text-[11px] text-slate-600">Allows screen reader and keyboard users to bypass repetitive top navigation bars and jump straight to primary content.</p>
              </div>
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 text-xs block">Text Size Adjustment (A-, A, A+)</span>
                <p className="text-[11px] text-slate-600">Interactive controls to scale root typography by up to +25% without layout degradation or overflow truncations.</p>
              </div>
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 text-xs block">High-Contrast Color Mode</span>
                <p className="text-[11px] text-slate-600">High-contrast toggle offering strict contrast ratios exceeding WCAG AA 4.5:1 standards for visually impaired users.</p>
              </div>
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 text-xs block">Bilingual Support (English & Hindi)</span>
                <p className="text-[11px] text-slate-600">Full linguistic accessibility in both official languages of the Union Government.</p>
              </div>
            </div>
          </section>

          <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <p className="font-bold text-slate-900 mb-1">Feedback & Accessibility Contact:</p>
            <p>If you encounter any accessibility barriers, please report them to: accessibility-sangamsetu@gov.in</p>
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
