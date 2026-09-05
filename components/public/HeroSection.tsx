'use client';

import React from 'react';
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
    <section className="relative bg-white border-b border-slate-200 pt-6 pb-12 md:pt-10 md:pb-16">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Top Government Initiative & National Emblems Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-sangam-blue-50 border border-sangam-blue-200 text-sangam-blue-800 text-xs font-bold mb-4">
            <Shield className="w-4 h-4 text-sangam-blue-600" />
            <span>Government of India National Innovation Procurement Portal • DPIIT</span>
          </div>

          {/* Official National Initiative Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-4 py-2.5 rounded-lg bg-slate-50/80 border border-slate-200/80 max-w-4xl w-full shadow-2xs">
            {/* 1. National Emblem of India */}
            <div className="flex items-center gap-2.5">
              <img
                src="/images/emblem-india.svg"
                alt="State Emblem of India"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-2xs"
                referrerPolicy="no-referrer"
              />
              <div className="text-left leading-none">
                <p className="text-[11px] font-extrabold text-slate-900">भारत सरकार</p>
                <p className="text-[9px] font-semibold text-slate-600 mt-0.5">Government of India</p>
              </div>
            </div>

            <div className="hidden sm:block h-7 w-px bg-slate-200" />

            {/* 2. DPIIT Recognised */}
            <div className="flex items-center gap-2">
              <img
                src="/images/dpiit-recognised.svg"
                alt="Recognised by DPIIT"
                className="h-10 sm:h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="text-left leading-tight hidden xs:block">
                <p className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider">DPIIT Validated</p>
                <p className="text-[9px] text-slate-500">Startup India Network</p>
              </div>
            </div>

            <div className="hidden md:block h-7 w-px bg-slate-200" />

            {/* 3. Digital India */}
            <div className="flex items-center gap-2">
              <img
                src="/images/digital-india.svg"
                alt="Digital India - Power To Empower"
                className="h-9 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="hidden lg:block h-7 w-px bg-slate-200" />

            {/* 4. Aatmanirbhar Bharat */}
            <div className="hidden sm:flex items-center gap-2">
              <img
                src="/images/aatmanirbhar-bharat.svg"
                alt="Aatmanirbhar Bharat Abhiyan"
                className="h-9 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="hidden lg:block h-7 w-px bg-slate-200" />

            {/* 5. G20 India */}
            <div className="hidden md:flex items-center gap-2">
              <img
                src="/images/g20-india.png"
                alt="G20 India 2023 - Vasudhaiva Kutumbakam"
                className="h-9 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.src.includes('g20-india.svg')) {
                    el.src = '/images/g20-india.svg';
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Where <span className="text-sangam-saffron-600">Innovation</span> Meets{' '}
            <span className="text-sangam-blue-600">Governance</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-700 font-normal max-w-3xl mx-auto leading-relaxed">
            A structured, transparent, AI-powered bridge connecting <strong>Central & State Ministries</strong> with <strong>DPIIT-Recognized Startups</strong> to solve mission-critical operational challenges with verified field testing under GFR 2017.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreProblems}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              <span>Explore Government Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onPostProblem}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Post Ministry Challenge</span>
            </button>

            <button
              onClick={onRegisterStartup}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-emerald-600" />
              <span>Register DPIIT Startup</span>
            </button>
          </div>
        </div>

        {/* Live Official Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8">
          {/* Card 1: Problems */}
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-sm bg-white text-sangam-blue-600 border border-slate-200">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                25+ Ministries
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {challenges.length + 145}+
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              Government Challenges
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Active tenders across Infrastructure, Health, Agri & Energy
            </div>
          </div>

          {/* Card 2: Startups */}
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-sm bg-white text-amber-600 border border-slate-200">
                <Rocket className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-50 text-amber-700 border border-amber-200">
                DPIIT Recognized
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              5,000+
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              DPIIT Startups
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              100% exempt from prior turnover & experience thresholds
            </div>
          </div>

          {/* Card 3: Innovation Funding */}
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-sm bg-white text-emerald-600 border border-slate-200">
                <IndianRupee className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 border border-blue-200">
                DBT Milestones
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              ₹{totalFundAllocatedCr} Cr+
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              Innovation Outlay
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Directly disbursed for pilot testing & prototyping via PFMS
            </div>
          </div>

          {/* Card 4: Scaled Solutions */}
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-sm bg-white text-purple-600 border border-slate-200">
                <Award className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-purple-50 text-purple-700 border border-purple-200">
                GeM Scaled
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {totalScaledSolutions}+
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              Solutions Scaled
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Transitioned from successful pilots to full public procurement
            </div>
          </div>
        </div>

        {/* Live Ministry Ticker & Last Updated */}
        <div className="mt-8 bg-slate-50 rounded-md border border-slate-200 p-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700 shrink-0">
            <span className="uppercase tracking-wider text-slate-900">Participating Central Ministries:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-600 font-medium">
            <span className="px-2 py-0.5 bg-white rounded-sm border border-slate-200">MoRTH (Highways)</span>
            <span className="px-2 py-0.5 bg-white rounded-sm border border-slate-200">MoHFW (Health)</span>
            <span className="px-2 py-0.5 bg-white rounded-sm border border-slate-200">Ministry of Power</span>
            <span className="px-2 py-0.5 bg-white rounded-sm border border-slate-200">Ministry of Jal Shakti</span>
            <span className="px-2 py-0.5 bg-white rounded-sm border border-slate-200">Indian Railways (RDSO)</span>
            <span className="px-2 py-0.5 bg-white rounded-sm border border-slate-200">MeitY (Digital India)</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono shrink-0">
            Last Updated: 04 September 2026
          </div>
        </div>
      </div>
    </section>
  );
}
