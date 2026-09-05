'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import SuccessStories from '@/components/public/SuccessStories';
import { Award, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PilotOutcomesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="pilot-outcomes-page">
      <MainNavbar activeTab="success-stories" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Pilot Outcomes & GeM Scale-out</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
                <Award className="w-7 h-7 text-sangam-saffron-400" />
                <span>Pilot Outcomes & GeM Scale-out Deployments</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Documented case studies of successful technological pilots across National Highways, Jal Shakti, and Indian Railways scaled directly into pan-India GeM long-term contracts.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/challenges"
                className="px-3.5 py-2 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Apply to Open Challenges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8" id="main-content">
        <SuccessStories />
      </main>

      <GovernmentFooter />
    </div>
  );
}
