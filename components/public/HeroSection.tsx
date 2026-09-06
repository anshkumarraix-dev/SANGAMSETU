'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Shield,
  Building2,
  Rocket,
  Award,
  IndianRupee,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProblems?: () => void;
  onPostProblem?: () => void;
  onRegisterStartup?: () => void;
}

export default function HeroSection({
  onExploreProblems,
  onPostProblem,
  onRegisterStartup,
}: HeroSectionProps = {}) {
  const { challenges } = useApp();

  const totalFundAllocatedCr = 210; // ₹210 Cr+
  const totalScaledSolutions = 24;

  return (
    <section className="relative bg-white border-b border-slate-200/80 pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden">
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Official National Initiative & Authority Logos */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-10 py-2.5 px-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-xs">
            {/* 1. National Emblem of India */}
            <div className="flex items-center">
              <img
                src="/images/emblem-india.svg"
                alt="State Emblem of India"
                className="h-10 sm:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="h-7 w-px bg-slate-200 hidden sm:block" />

            {/* 2. DPIIT Recognised */}
            <div className="flex items-center gap-2">
              <img
                src="/images/dpiit-recognised.svg"
                alt="Recognised by DPIIT"
                className="h-9 sm:h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="h-7 w-px bg-slate-200 hidden sm:block" />

            {/* 3. Aatmanirbhar Bharat */}
            <div className="flex items-center gap-2">
              <img
                src="/images/aatmanirbhar-bharat.svg"
                alt="Aatmanirbhar Bharat"
                className="h-8 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="h-7 w-px bg-slate-200 hidden sm:block" />

            {/* 4. G20 India */}
            <div className="flex items-center gap-2">
              <img
                src="/images/g20-logo.jpg"
                alt="G20 India"
                className="h-8 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src.includes('g20-logo.jpg')) {
                    el.src = '/images/g20-logo.png';
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Where <span className="text-sangam-saffron-600">Innovation</span> Meets{' '}
            <span className="text-sangam-blue-600">Governance</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed">
            A structured, transparent, AI-powered bridge connecting <strong className="text-slate-900 font-semibold">Central & State Ministries</strong> with <strong className="text-slate-900 font-semibold">DPIIT-Recognized Startups</strong> to solve mission-critical operational challenges with verified field testing under GFR 2017.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/challenges"
              onClick={onExploreProblems}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer transform active:scale-98"
            >
              <span>Explore Government Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              onClick={onPostProblem}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Post Ministry Challenge</span>
            </Link>

            <Link
              href="/register"
              onClick={onRegisterStartup}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-xs hover:border-slate-400 transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-emerald-600" />
              <span>Register DPIIT Startup</span>
            </Link>
          </div>
        </div>

        {/* Live Official Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10">
          {/* Card 1: Problems */}
          <div className="bg-slate-50/80 hover:bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/90 transition-all hover:border-slate-300 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-white text-sangam-blue-600 border border-slate-200/80 shadow-2xs">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                25+ Ministries
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {challenges.length}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Government Challenges
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5 leading-normal">
              Active tenders across Infrastructure, Health, Agri & Energy
            </div>
          </div>

          {/* Card 2: Startups */}
          <div className="bg-slate-50/80 hover:bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/90 transition-all hover:border-slate-300 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-white text-amber-600 border border-slate-200/80 shadow-2xs">
                <Rocket className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200">
                DPIIT Recognized
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              5,000+
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              DPIIT Startups
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5 leading-normal">
              100% exempt from prior turnover & experience thresholds
            </div>
          </div>

          {/* Card 3: Innovation Funding */}
          <div className="bg-slate-50/80 hover:bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/90 transition-all hover:border-slate-300 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-white text-emerald-600 border border-slate-200/80 shadow-2xs">
                <IndianRupee className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-800 border border-blue-200">
                DBT Milestones
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ₹{totalFundAllocatedCr} Cr+
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Innovation Outlay
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5 leading-normal">
              Directly disbursed for pilot testing & prototyping via PFMS
            </div>
          </div>

          {/* Card 4: Scaled Solutions */}
          <div className="bg-slate-50/80 hover:bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/90 transition-all hover:border-slate-300 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-white text-purple-600 border border-slate-200/80 shadow-2xs">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100/80 text-purple-800 border border-purple-200">
                GeM Scaled
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {totalScaledSolutions}+
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Solutions Scaled
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5 leading-normal">
              Transitioned from successful pilots to full public procurement
            </div>
          </div>
        </div>

        {/* Live Ministry Ticker & Last Updated */}
        <div className="mt-8 bg-slate-50/90 rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row items-center justify-between gap-3.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700 shrink-0">
            <span className="uppercase tracking-wider text-slate-900 text-[11px]">Participating Central Ministries:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-700 font-medium">
            <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 text-xs shadow-2xs">MoRTH (Highways)</span>
            <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 text-xs shadow-2xs">MoHFW (Health)</span>
            <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 text-xs shadow-2xs">Ministry of Power</span>
            <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 text-xs shadow-2xs">Ministry of Jal Shakti</span>
            <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 text-xs shadow-2xs">Indian Railways (RDSO)</span>
            <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 text-xs shadow-2xs">MeitY (Digital India)</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono shrink-0">
            Last Updated: 04 September 2026
          </div>
        </div>
      </div>
    </section>
  );
}
