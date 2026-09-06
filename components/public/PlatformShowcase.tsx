'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ActiveView } from '@/lib/types';
import {
  Shield,
  Building2,
  Rocket,
  FlaskConical,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  FileCheck2,
  Globe2,
  Lock,
  ExternalLink,
  ChevronRight,
  Users,
  Target,
  Zap,
} from 'lucide-react';

export default function PlatformShowcase() {
  const { setActiveView, setRole } = useApp();

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchRole = (targetRole: 'STARTUP' | 'GOVERNMENT' | 'TESTING_LAB') => {
    setRole(targetRole);
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectors = [
    {
      title: 'Smart Governance & AI',
      desc: 'Multilingual citizen service bots, automated fraud detection, and biometric entitlement verification.',
      icon: Cpu,
      color: 'border-blue-200 bg-blue-50/50 text-blue-700',
      badge: '9 Challenges',
    },
    {
      title: 'Agriculture & Water Resiliency',
      desc: 'IoT sensor canal monitoring, satellite crop damage assessment, and precision MSP procurement.',
      icon: TrendingUp,
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
      badge: '14 Challenges',
    },
    {
      title: 'Healthcare & MedTech',
      desc: 'Ayushman Bharat digital integrations, remote diagnostic kits, and medical cold-chain telematics.',
      icon: Shield,
      color: 'border-rose-200 bg-rose-50/50 text-rose-700',
      badge: '8 Challenges',
    },
    {
      title: 'Defence, Drone & Aerospace',
      desc: 'High-altitude autonomous logistics, counter-UAS sensor grids, and encrypted tactical mesh radios.',
      icon: Target,
      color: 'border-amber-200 bg-amber-50/50 text-amber-700',
      badge: '11 Challenges',
    },
    {
      title: 'Clean Energy & Net Zero',
      desc: 'Microgrid load balancers, solar rooftop feeder automation, and decentralized battery telemetry.',
      icon: Zap,
      color: 'border-teal-200 bg-teal-50/50 text-teal-700',
      badge: '6 Challenges',
    },
    {
      title: 'Urban Mobility & Logistics',
      desc: 'Adaptive traffic AI signalling, multi-modal FASTag freight optimization, and pothole mapping.',
      icon: Globe2,
      color: 'border-indigo-200 bg-indigo-50/50 text-indigo-700',
      badge: '12 Challenges',
    },
  ];

  const pillars = [
    {
      role: 'GOVERNMENT',
      title: 'For Ministries & Departments',
      subtitle: 'Benefits for Ministries & Departments',
      icon: Building2,
      accent: 'border-sangam-blue-300 hover:border-sangam-blue-500',
      badgeColor: 'bg-sangam-blue-50 text-sangam-blue-700 border-sangam-blue-200',
      logoSrc: '/images/emblem-india.svg',
      logoAlt: 'State Emblem of India',
      points: [
        'Post real operational bottlenecks without lengthy, rigid DPR requirements.',
        'AI evaluates proposals across 7 GFR-compliant quality & cost metrics.',
        'Mandatory testing by STQC / C-DAC accredited laboratories before pilot release.',
        'Scale validated innovations directly to all departments via GeM integration.',
      ],
      ctaText: 'Enter Department Workspace',
      targetRole: 'GOVERNMENT' as const,
    },
    {
      role: 'STARTUP',
      title: 'For DPIIT-Recognized Startups',
      subtitle: 'Benefits for DPIIT-Recognised Startups',
      icon: Rocket,
      accent: 'border-sangam-saffron-300 hover:border-sangam-saffron-500',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      logoSrc: '/images/dpiit-recognised.svg',
      logoAlt: 'Recognised by DPIIT',
      points: [
        'Bypass traditional 3-year turnover and prior-experience tender disqualification.',
        'Win funded pilot contracts ranging from ₹10 Lakhs to ₹1 Crore+.',
        'Guaranteed milestone-based disbursements via PFMS within 30 days.',
        'One-click fast-track onboarding to Government e-Marketplace (GeM).',
      ],
      ctaText: 'Access Startup Workspace',
      targetRole: 'STARTUP' as const,
    },
    {
      role: 'TESTING_LAB',
      title: 'For Empanelled Testing Labs',
      subtitle: 'Benefits for Empanelled Laboratories',
      icon: FlaskConical,
      accent: 'border-emerald-300 hover:border-emerald-500',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      logoSrc: '',
      logoAlt: 'Accredited Testing Labs',
      points: [
        'Empanelled network comprising STQC, C-DAC, NIELIT, and premier IIT laboratories.',
        'Validate functionality, load endurance, data residency, and CERT-In security.',
        'Issue authoritative digital test reports with binding PASS / CONDITIONAL verdict.',
        'Ensure public funds are deployed exclusively on robust, field-tested IP.',
      ],
      ctaText: 'Enter Testing Lab Workspace',
      targetRole: 'TESTING_LAB' as const,
    },
  ];

  const techFeatures = [
    {
      icon: Sparkles,
      title: 'Explainable Dual-Category AI Ranking',
      desc: 'Our Explainable Multi-Parameter AI Scoring Engine tabulates 7 transparent dimensions, automatically categorizing submissions into G1 (Top Quality) and G2 (Top Value-for-Money) with audit-proof justifications.',
    },
    {
      icon: FileCheck2,
      title: 'GFR 2017 & Public Procurement Compliance',
      desc: 'Designed strictly in accordance with General Financial Rules (GFR) 2017 Rule 194 and DPIIT procurement exemptions, ensuring legal safety and audit readiness for government officers.',
    },
    {
      icon: Lock,
      title: 'DPDP Act 2023 & MeitY Cloud Sovereign Security',
      desc: 'Role-based access controls, digital signature verification, encrypted document vaults, and comprehensive immutable audit trails conforming to national data privacy statutes.',
    },
    {
      icon: Layers,
      title: 'Automated GeM Scale-Up Pipeline',
      desc: 'Successful pilot completions are certified on-chain and directly catalogued on the Government e-Marketplace (GeM) for frictionless nationwide procurement by any PSU or State.',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 pb-16">
      {/* 1. Value Proposition Banner */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-4">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              National Public Procurement Modernization
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Unified National Framework for <span className="text-sangam-blue-600">Startup-Government</span> Innovation Procurement
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              SangamSetu eliminates traditional tender roadblocks by establishing a regulated sandbox where government ministries field-test cutting-edge startup solutions before committing large-scale capital.
            </p>

            {/* Quick Portal Navigation Links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate('challenges')}
                className="px-5 py-2.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Browse Innovation Challenges</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigate('workflow')}
                className="px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Explore 9-Step Pathway</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => handleNavigate('success-stories')}
                className="px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>View Pilot Case Studies</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tri-Pillar Ecosystem Value Propositions */}
      <section className="py-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-sangam-blue-600 uppercase tracking-wider">
            Ecosystem Integration
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
            Built for Every Stakeholder in Public Governance
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5">
            A cohesive three-sided marketplace aligning ministerial mandates, startup ingenuity, and rigorous lab certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.role}
                className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between ${pillar.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-sangam-navy-900 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </span>
                      {pillar.logoSrc && (
                        <img
                          src={pillar.logoSrc}
                          alt={pillar.logoAlt}
                          className="h-9 w-auto object-contain drop-shadow-2xs"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.subtitle}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 mb-2">{pillar.title}</h4>

                  <ul className="space-y-3 mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100">
                  <button
                    onClick={() => handleLaunchRole(pillar.targetRole)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-sangam-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow"
                  >
                    <span>{pillar.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Core Architectural & Algorithmic Advantages */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Technological Integrity
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
              Engineered for Transparent, Unbiased Public Procurement
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5">
              Combining cutting-edge artificial intelligence with statutory government compliance frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {techFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sangam-blue-600 mb-4 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-2">{feat.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Strategic Priority Sectors */}
      <section className="py-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between max-w-6xl mx-auto mb-8 gap-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-5">
            <img
              src="/images/aatmanirbhar-bharat.svg"
              alt="Aatmanirbhar Bharat Abhiyan"
              className="h-16 sm:h-20 w-auto object-contain shrink-0 drop-shadow-2xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-xs font-bold text-sangam-saffron-600 uppercase tracking-wider">
                National Mission Focus
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mt-0.5">
                Priority Focus Sectors for Atmanirbhar Bharat
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Mission-critical pilot tenders deployed across vital developmental sectors for sovereign capabilities.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleNavigate('challenges')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sangam-blue-50 hover:bg-sangam-blue-100 text-sangam-blue-700 text-xs sm:text-sm font-bold border border-sangam-blue-200 transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            <span>View all 50+ sector challenges</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                onClick={() => handleNavigate('challenges')}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-sangam-blue-400 hover:shadow-md transition-all cursor-pointer shadow-xs group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`p-3 rounded-xl border ${sec.color}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {sec.badge}
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900 group-hover:text-sangam-blue-600 transition-colors">
                  {sec.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{sec.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. How It Works Quick Teaser */}
      <section className="py-16 bg-sangam-navy-900 text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-amber-300 border border-white/20 mb-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Streamlined Procurement Lifecycle
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              From Operational Bottleneck to GeM Nationwide Rollout
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
              SangamSetu enforces a standardized 9-step governance pipeline that turns high-risk procurement into verifiable, milestones-backed pilot contracts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 text-left">
              <div className="bg-white/5 hover:bg-white/8 border border-white/10 p-5 rounded-2xl transition-all">
                <span className="text-[11px] font-black text-amber-400 tracking-wider px-2 py-0.5 rounded-sm bg-white/10">PHASE 1</span>
                <h4 className="font-bold text-base text-white mt-2.5">Challenge & AI Match</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Ministries publish problems; DPIIT startups submit proposals; SangamSetu AI Engine ranks top G1 (Quality) & G2 (Cost) contenders.
                </p>
              </div>

              <div className="bg-white/5 hover:bg-white/8 border border-white/10 p-5 rounded-2xl transition-all">
                <span className="text-[11px] font-black text-amber-400 tracking-wider px-2 py-0.5 rounded-sm bg-white/10">PHASE 2</span>
                <h4 className="font-bold text-base text-white mt-2.5">Prototype & Lab Testing</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Shortlisted startups submit working MVPs; STQC and C-DAC laboratories conduct functional, load, and security benchmarks.
                </p>
              </div>

              <div className="bg-white/5 hover:bg-white/8 border border-white/10 p-5 rounded-2xl transition-all">
                <span className="text-[11px] font-black text-amber-400 tracking-wider px-2 py-0.5 rounded-sm bg-white/10">PHASE 3</span>
                <h4 className="font-bold text-base text-white mt-2.5">Field Pilot & GeM Scale</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Government awards funded pilot contract with PFMS milestone disbursals, concluding in nationwide GeM catalogue onboarding.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => handleNavigate('workflow')}
                className="px-7 py-3 rounded-xl bg-sangam-saffron-500 hover:bg-sangam-saffron-600 text-slate-950 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow active:scale-98"
              >
                <span>Read the Detailed 9-Step Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. National Statutory Accreditations & Key Initiatives Gallery */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-sangam-blue-600 uppercase tracking-wider">
              Institutional Anchors & National Missions
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
              Statutory Authority & National Partnerships
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Operating under statutory frameworks empowered by the Government of India and leading national development missions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {/* 1. National Emblem of India */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-xs hover:shadow-sm transition-all hover:bg-slate-50">
              <div className="h-20 flex items-center justify-center mb-3">
                <img
                  src="/images/emblem-india.svg"
                  alt="State Emblem of India"
                  className="h-16 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Government of India</h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Authorized under GFR 2017 Rule 194 for public innovation procurement.
              </p>
            </div>

            {/* 2. DPIIT Recognised */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-xs hover:shadow-sm transition-all hover:bg-slate-50">
              <div className="h-20 flex items-center justify-center mb-3">
                <img
                  src="/images/dpiit-recognised.svg"
                  alt="Recognised by DPIIT"
                  className="h-16 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">DPIIT Recognition</h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Full exemption from turnover and prior-experience criteria for startups.
              </p>
            </div>

            {/* 3. Digital India */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-xs hover:shadow-sm transition-all hover:bg-slate-50">
              <div className="h-20 flex items-center justify-center mb-3">
                <img
                  src="/images/digital-india.svg"
                  alt="Digital India"
                  className="h-14 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Digital India</h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Power to Empower with paperless digital milestones and verifiable audit trails.
              </p>
            </div>

            {/* 4. Aatmanirbhar Bharat */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-xs hover:shadow-sm transition-all hover:bg-slate-50">
              <div className="h-20 flex items-center justify-center mb-3">
                <img
                  src="/images/aatmanirbhar-bharat.svg"
                  alt="Aatmanirbhar Bharat"
                  className="h-14 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Aatmanirbhar Bharat</h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Fostering indigenous self-reliance across defence, cyber, and civil technologies.
              </p>
            </div>

            {/* 5. G20 India */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 flex flex-col items-center text-center shadow-xs hover:shadow-sm transition-all hover:bg-slate-50">
              <div className="h-20 flex items-center justify-center mb-3">
                <img
                  src="/images/g20-india.png"
                  alt="G20 India 2023"
                  className="h-14 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (!el.src.includes('g20-india.svg')) {
                      el.src = '/images/g20-india.svg';
                    }
                  }}
                />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">G20 India Benchmark</h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Conforming to premier multilateral innovation procurement standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
