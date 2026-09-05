'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, TrendingUp, Building2, ExternalLink, ShieldCheck, Zap, Layers, Filter } from 'lucide-react';

export default function SuccessStories() {
  const [selectedDomain, setSelectedDomain] = useState<'ALL' | 'INFRA' | 'HEALTH' | 'JAL'>('ALL');

  const stories = [
    {
      id: 'infra-1',
      domain: 'INFRA',
      domainLabel: 'Transportation & Highways',
      title: 'AI Pothole & Road Quality Survey on National Expressways',
      ministry: 'Ministry of Road Transport & Highways (NHAI)',
      startup: 'MargVision AI Solutions Pvt Ltd',
      dpiit: 'DIPP-89421',
      budget: '₹42,00,000 Pilot → ₹18.4 Cr GeM Scale-out',
      timeline: 'Completed in 6 Months',
      highlights: [
        'Surveyed 150 km of NH-48 Delhi-Jaipur Expressway at 80 km/h with 94.8% detection precision',
        'Reduced highway asset inspection cost from ₹1,800/km to ₹240/km (74% savings)',
        'Direct automated integration with NHAI Data Lake (RAMS)',
      ],
      metrics: {
        accuracy: '94.8%',
        savings: '74% Cost Reduction',
        scale: '12 Highway Divisions',
      },
      verdict: 'STQC Certified Score: 92/100',
      status: 'Scaled to 12 National Highway Divisions on GeM',
    },
    {
      id: 'health-1',
      domain: 'HEALTH',
      domainLabel: 'Healthcare & ABDM',
      title: 'Offline Tele-Diagnostics & Multi-lingual Triage for Tribal PHCs',
      ministry: 'Ministry of Health & Family Welfare (Ayushman Bharat)',
      startup: 'SwasthyaSetu Health Technologies',
      dpiit: 'DIPP-72109',
      budget: '₹50,00,000 Pilot → ₹26.5 Cr GeM Scale-out',
      timeline: 'Completed in 9 Months',
      highlights: [
        'Screened 64,000+ rural citizens across Gadchiroli tribal blocks with zero internet connectivity',
        'Multi-lingual voice assistant in Marathi and Gondi reduced patient triage intake to under 3.5 mins',
        '100% compliant with ABDM FHIR M3 health record exchange',
      ],
      metrics: {
        accuracy: '98.2%',
        savings: '65% Faster Triage',
        scale: '500+ Arogya Mandirs',
      },
      verdict: 'CDAC Benchmark Score: 86/100',
      status: 'Scale-out approved for 500+ Ayushman Arogya Mandirs',
    },
    {
      id: 'jal-1',
      domain: 'JAL',
      domainLabel: 'Water & Clean Ganga',
      title: 'Solar IoT Buoys for Real-Time Industrial Effluent Tracking',
      ministry: 'Ministry of Jal Shakti (Namami Gange)',
      startup: 'JalSuraksha Innovations Pvt Ltd',
      dpiit: 'DIPP-81290',
      budget: '₹35,00,000 Pilot → ₹12.0 Cr GeM Scale-out',
      timeline: 'Completed in 6 Months',
      highlights: [
        '18 autonomous solar buoys deployed on Ganga River basin (Kanpur-Prayagraj stretch)',
        'Ultrasonic anti-fouling sensor maintained continuous calibration for 180 uninterrupted days',
        'Alerted CPCB within 3 minutes of nocturnal chemical discharge breach',
      ],
      metrics: {
        accuracy: '99.1%',
        savings: '3-Min Alert Latency',
        scale: '5 River Basins',
      },
      verdict: 'IIT Kanpur & CPCB Verified',
      status: 'Onboarded on GeM for 5 River Basin Authorities',
    },
  ];

  const filteredStories = stories.filter(
    s => selectedDomain === 'ALL' || s.domain === selectedDomain
  );

  return (
    <section id="success-stories" className="py-12 md:py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-200">
              <Award className="w-3.5 h-3.5" />
              <span>National Innovation Scale-Up Outcomes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Impactful Pilot Scale-Up Stories
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Real government operational breakthroughs delivered by DPIIT startups under the SangamSetu framework, transitioning directly to GeM procurement.
            </p>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-sm border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedDomain('ALL')}
              className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                selectedDomain === 'ALL'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Sectors
            </button>
            <button
              onClick={() => setSelectedDomain('INFRA')}
              className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                selectedDomain === 'INFRA'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Highways
            </button>
            <button
              onClick={() => setSelectedDomain('HEALTH')}
              className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                selectedDomain === 'HEALTH'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Healthcare
            </button>
            <button
              onClick={() => setSelectedDomain('JAL')}
              className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                selectedDomain === 'JAL'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Water
            </button>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredStories.map(story => (
            <div
              key={story.id}
              className="bg-slate-50 rounded-md border border-slate-200 p-4 flex flex-col justify-between hover:border-emerald-400 transition-colors overflow-hidden"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <span className="text-[10px] font-bold text-sangam-blue-600 uppercase flex items-center gap-1 min-w-0 flex-1">
                    <Building2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{story.ministry}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0 overflow-hidden whitespace-nowrap">
                    DPIIT Verified
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {story.title}
                </h3>

                <div className="p-2.5 bg-white rounded-sm border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-500">Startup:</span>
                    <span className="font-bold text-slate-900">{story.startup}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-500">Outlay & Scale:</span>
                    <span className="font-bold text-emerald-700">{story.budget}</span>
                  </div>
                </div>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-3 gap-1.5 py-1 text-center">
                  <div className="p-1.5 bg-white rounded-sm border border-slate-200">
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">Accuracy</span>
                    <span className="text-xs font-black text-slate-900">{story.metrics.accuracy}</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-sm border border-slate-200">
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">Benefit</span>
                    <span className="text-[11px] font-bold text-emerald-700">{story.metrics.savings}</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-sm border border-slate-200">
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">Scale</span>
                    <span className="text-[11px] font-bold text-sangam-blue-700">{story.metrics.scale}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                    Verified Field Results:
                  </span>
                  {story.highlights.map((hl, j) => (
                    <div key={j} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sangam-green-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-3 mt-3 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-sangam-blue-600" /> {story.verdict}
                  </span>
                </div>
                <div className="p-2 bg-emerald-50 rounded-sm border border-emerald-200 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{story.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
