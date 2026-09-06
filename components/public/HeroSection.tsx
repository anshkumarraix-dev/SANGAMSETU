'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <section className="relative bg-slate-950 border-b border-slate-800 pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden">
      {/* 1. Full-Width Photographic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-parliament.jpg"
          alt="Aerial view of the Parliament of India and Central Vista New Delhi"
          fill
          priority
          className="object-cover object-center scale-100 transition-transform duration-1000"
          sizes="100vw"
          referrerPolicy="no-referrer"
        />
        {/* Navy Gradient Scrim tuned for maximum image visibility with high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1d]/40 via-[#0a1428]/45 to-[#050b16]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_20%,transparent_20%,rgba(5,11,22,0.65)_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Official National Initiative & Authority Logos */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-10 py-2.5 px-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-lg">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
            Where <span className="text-amber-400">Innovation</span> Meets{' '}
            <span className="text-sky-400">Governance</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 font-normal max-w-3xl mx-auto leading-relaxed">
            A structured, transparent, AI-powered bridge connecting <strong className="text-white font-semibold">Central & State Ministries</strong> with <strong className="text-white font-semibold">DPIIT-Recognized Startups</strong> to solve mission-critical operational challenges with verified field testing under GFR 2017.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/challenges"
              onClick={onExploreProblems}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sangam-blue-600 hover:bg-sangam-blue-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-98"
            >
              <span>Explore Government Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              onClick={onPostProblem}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Post Ministry Challenge</span>
            </Link>

            <Link
              href="/register"
              onClick={onRegisterStartup}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-emerald-600" />
              <span>Register DPIIT Startup</span>
            </Link>
          </div>
        </div>

        {/* Live Official Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10">
          {/* Card 1: Problems */}
          <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-slate-700/70 hover:border-slate-600 transition-all shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-slate-800 text-sky-400 border border-slate-700 shadow-2xs">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                25+ Ministries
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {challenges.length}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
              Government Challenges
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 leading-normal">
              Active tenders across Infrastructure, Health, Agri & Energy
            </div>
          </div>

          {/* Card 2: Startups */}
          <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-slate-700/70 hover:border-slate-600 transition-all shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700 shadow-2xs">
                <Rocket className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800">
                DPIIT Recognized
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              5,000+
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
              DPIIT Startups
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 leading-normal">
              100% exempt from prior turnover & experience thresholds
            </div>
          </div>

          {/* Card 3: Innovation Funding */}
          <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-slate-700/70 hover:border-slate-600 transition-all shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 shadow-2xs">
                <IndianRupee className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800">
                DBT Milestones
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ₹{totalFundAllocatedCr} Cr+
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
              Innovation Outlay
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 leading-normal">
              Directly disbursed for pilot testing & prototyping via PFMS
            </div>
          </div>

          {/* Card 4: Scaled Solutions */}
          <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-slate-700/70 hover:border-slate-600 transition-all shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-slate-800 text-purple-400 border border-slate-700 shadow-2xs">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800">
                GeM Scaled
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {totalScaledSolutions}+
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
              Solutions Scaled
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 leading-normal">
              Transitioned from successful pilots to full public procurement
            </div>
          </div>
        </div>

        {/* Live Ministry Ticker & Last Updated */}
        <div className="mt-8 bg-slate-900/85 backdrop-blur-md rounded-xl border border-slate-800 p-4 flex flex-col md:flex-row items-center justify-between gap-3.5 text-xs shadow-md">
          <div className="flex items-center gap-2 font-bold text-slate-300 shrink-0">
            <span className="uppercase tracking-wider text-amber-400 text-[11px]">Participating Central Ministries:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-200 font-medium">
            <span className="px-2.5 py-1 bg-slate-800/90 rounded-md border border-slate-700 text-xs shadow-2xs">MoRTH (Highways)</span>
            <span className="px-2.5 py-1 bg-slate-800/90 rounded-md border border-slate-700 text-xs shadow-2xs">MoHFW (Health)</span>
            <span className="px-2.5 py-1 bg-slate-800/90 rounded-md border border-slate-700 text-xs shadow-2xs">Ministry of Power</span>
            <span className="px-2.5 py-1 bg-slate-800/90 rounded-md border border-slate-700 text-xs shadow-2xs">Ministry of Jal Shakti</span>
            <span className="px-2.5 py-1 bg-slate-800/90 rounded-md border border-slate-700 text-xs shadow-2xs">Indian Railways (RDSO)</span>
            <span className="px-2.5 py-1 bg-slate-800/90 rounded-md border border-slate-700 text-xs shadow-2xs">MeitY (Digital India)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono shrink-0">
            Last Updated: 04 September 2026
          </div>
        </div>
      </div>
    </section>
  );
}
