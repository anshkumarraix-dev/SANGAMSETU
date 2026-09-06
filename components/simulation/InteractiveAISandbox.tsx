'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Sliders,
  TrendingUp,
  Award,
  ShieldCheck,
  AlertTriangle,
  IndianRupee,
  RotateCcw,
  PlusCircle,
  CheckCircle2,
  Cpu,
  Layers,
  HelpCircle,
  FlaskConical,
} from 'lucide-react';
import { calculateCostEffectiveness, computeOverallAIScore, computeG2ValueScore } from '@/lib/ai-scoring';

interface InteractiveAISandboxProps {
  onInjectStartup?: (startupData: any) => void;
}

export default function InteractiveAISandbox({ onInjectStartup }: InteractiveAISandboxProps) {
  // Scenario Presets
  const SCENARIOS = [
    {
      id: 'g1-champion',
      name: 'Breakthrough DeepTech (G1 Quality)',
      desc: 'High innovation & edge camera architecture with moderate budget.',
      budget: 35,
      fit: 94,
      tech: 92,
      innov: 95,
      impact: 90,
      scale: 88,
      team: 92,
      risk: 90,
    },
    {
      id: 'g2-frugal',
      name: 'Frugal Edge AI (G2 Best Value)',
      desc: 'Highly cost-effective solution optimized for multi-junction scaling.',
      budget: 18,
      fit: 88,
      tech: 85,
      innov: 82,
      impact: 86,
      scale: 92,
      team: 84,
      risk: 88,
    },
    {
      id: 'high-cost',
      name: 'Expensive Enterprise Suite',
      desc: 'High tech capability but exceeds the optimal budget ceiling.',
      budget: 68,
      fit: 90,
      tech: 91,
      innov: 88,
      impact: 85,
      scale: 80,
      team: 95,
      risk: 86,
    },
    {
      id: 'risk-flagged',
      name: 'Unverified Compliance Proposal',
      desc: 'Good novelty but weak data localization & cybersecurity assurances.',
      budget: 28,
      fit: 82,
      tech: 78,
      innov: 84,
      impact: 75,
      scale: 72,
      team: 70,
      risk: 45,
    },
  ];

  const [activeScenario, setActiveScenario] = useState<string>('g1-champion');
  const [startupName, setStartupName] = useState('NeuralFlow Traffic AI');
  const [budgetLakhs, setBudgetLakhs] = useState<number>(35);
  const [maxBudgetCap] = useState<number>(50); // ₹50 Lakhs challenge ceiling

  // 8 Metric States
  const [fitScore, setFitScore] = useState<number>(94);
  const [techScore, setTechScore] = useState<number>(92);
  const [innovScore, setInnovScore] = useState<number>(95);
  const [impactScore, setImpactScore] = useState<number>(90);
  const [scaleScore, setScaleScore] = useState<number>(88);
  const [teamScore, setTeamScore] = useState<number>(92);
  const [riskScore, setRiskScore] = useState<number>(90);

  // Derived Cost Score (15% Weight) based on Budget Slider vs ₹50L Cap
  const costScore = useMemo(() => {
    return calculateCostEffectiveness(budgetLakhs * 100000, maxBudgetCap * 100000);
  }, [budgetLakhs, maxBudgetCap]);

  // Overall Weighted Score Computation (Document Page 5 Standard)
  const overallScore = useMemo(() => {
    const raw =
      fitScore * 0.20 +
      techScore * 0.15 +
      innovScore * 0.15 +
      impactScore * 0.15 +
      costScore * 0.15 +
      scaleScore * 0.10 +
      teamScore * 0.05 +
      riskScore * 0.05;
    return Math.round(raw * 10) / 10;
  }, [fitScore, techScore, innovScore, impactScore, costScore, scaleScore, teamScore, riskScore]);

  // G1 and G2 Eligibility Classification
  const isG1Eligible = overallScore >= 88;
  const isG2Eligible = overallScore >= 75 && costScore >= 85;

  // G2 Value-for-Money Index
  const g2ValueIndex = useMemo(() => {
    return Math.round((overallScore * 0.6 + costScore * 0.4) * 10) / 10;
  }, [overallScore, costScore]);

  // SHAP Feature Attributions
  const shapAttributions = useMemo(() => {
    const baseline = 75;
    return [
      { name: 'Problem Fit (20%)', delta: Number(((fitScore - baseline) * 0.20).toFixed(1)), score: fitScore },
      { name: 'Tech Feasibility (15%)', delta: Number(((techScore - baseline) * 0.15).toFixed(1)), score: techScore },
      { name: 'Innovation (15%)', delta: Number(((innovScore - baseline) * 0.15).toFixed(1)), score: innovScore },
      { name: 'Public Impact (15%)', delta: Number(((impactScore - baseline) * 0.15).toFixed(1)), score: impactScore },
      { name: 'Cost Value (15%)', delta: Number(((costScore - baseline) * 0.15).toFixed(1)), score: costScore },
      { name: 'Scalability (10%)', delta: Number(((scaleScore - baseline) * 0.10).toFixed(1)), score: scaleScore },
      { name: 'Team Skills (5%)', delta: Number(((teamScore - baseline) * 0.05).toFixed(1)), score: teamScore },
      { name: 'Risk & Privacy (5%)', delta: Number(((riskScore - baseline) * 0.05).toFixed(1)), score: riskScore },
    ];
  }, [fitScore, techScore, innovScore, impactScore, costScore, scaleScore, teamScore, riskScore]);

  // Apply Scenario Preset
  const handleApplyScenario = (scenarioId: string) => {
    const s = SCENARIOS.find((item) => item.id === scenarioId);
    if (!s) return;
    setActiveScenario(scenarioId);
    setStartupName(s.name.split(' ')[0] + ' Labs');
    setBudgetLakhs(s.budget);
    setFitScore(s.fit);
    setTechScore(s.tech);
    setInnovScore(s.innov);
    setImpactScore(s.impact);
    setScaleScore(s.scale);
    setTeamScore(s.team);
    setRiskScore(s.risk);
  };

  const handleInjectIntoSimulation = () => {
    if (onInjectStartup) {
      onInjectStartup({
        name: startupName,
        budget: budgetLakhs,
        overallScore,
        costScore,
        isG1Eligible,
        isG2Eligible,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden space-y-6 p-5">
      {/* HEADER WITH SCENARIO PRESET PILLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Interactive AI Sandbox
            </span>
            <span className="text-xs text-slate-500 font-mono">Live 8-Criteria Real-Time Tuner</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <span>Dynamic AI Evaluation Playground</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Adjust the sliders or pick a pre-configured scenario to see live re-scoring into <strong>G1 (Quality)</strong> and <strong>G2 (Value)</strong> shortlists.
          </p>
        </div>

        {/* Quick Scenario Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleApplyScenario(sc.id)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                activeScenario === sc.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {sc.name.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* TWO-COLUMN INTERACTIVE WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INTERACTIVE SLIDERS (7 COLS) */}
        <div className="lg:col-span-7 space-y-4 bg-slate-50/60 p-4 rounded-lg border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              Adjust Proposal Parameters
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Standard DPIIT Evaluation Matrix</span>
          </div>

          {/* Proposal Budget Slider */}
          <div className="bg-white p-3 rounded border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                Proposed Pilot Budget:
              </label>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ₹{budgetLakhs} Lakhs
                </span>
                <span className="text-[10px] text-slate-500">
                  (Cap: ₹{maxBudgetCap}L)
                </span>
              </div>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={1}
              value={budgetLakhs}
              onChange={(e) => {
                setBudgetLakhs(Number(e.target.value));
                setActiveScenario('custom');
              }}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹10L (Frugal)</span>
              <span>₹50L (Ceiling Limit)</span>
              <span>₹80L (Overbudget)</span>
            </div>
          </div>

          {/* 7 Dimension Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Problem Fit (20%) */}
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Problem-Solution Fit</span>
                <span className="text-indigo-600 font-mono">{fitScore}/100</span>
              </div>
              <input
                type="range"
                min={40}
                max={99}
                value={fitScore}
                onChange={(e) => {
                  setFitScore(Number(e.target.value));
                  setActiveScenario('custom');
                }}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>Operational Fit</span>
                <span className="font-bold text-indigo-700">Weight: 20%</span>
              </div>
            </div>

            {/* 2. Technical Feasibility (15%) */}
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Technical Feasibility</span>
                <span className="text-indigo-600 font-mono">{techScore}/100</span>
              </div>
              <input
                type="range"
                min={40}
                max={99}
                value={techScore}
                onChange={(e) => {
                  setTechScore(Number(e.target.value));
                  setActiveScenario('custom');
                }}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>Architecture & Edge AI</span>
                <span className="font-bold text-indigo-700">Weight: 15%</span>
              </div>
            </div>

            {/* 3. Innovation (15%) */}
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Innovation Quotient</span>
                <span className="text-indigo-600 font-mono">{innovScore}/100</span>
              </div>
              <input
                type="range"
                min={40}
                max={99}
                value={innovScore}
                onChange={(e) => {
                  setInnovScore(Number(e.target.value));
                  setActiveScenario('custom');
                }}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>Novelty & Patents</span>
                <span className="font-bold text-indigo-700">Weight: 15%</span>
              </div>
            </div>

            {/* 4. Impact Potential (15%) */}
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Public Impact Potential</span>
                <span className="text-indigo-600 font-mono">{impactScore}/100</span>
              </div>
              <input
                type="range"
                min={40}
                max={99}
                value={impactScore}
                onChange={(e) => {
                  setImpactScore(Number(e.target.value));
                  setActiveScenario('custom');
                }}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>Citizen Outcomes</span>
                <span className="font-bold text-indigo-700">Weight: 15%</span>
              </div>
            </div>

            {/* 5. Scalability (10%) */}
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Scalability & Deployment</span>
                <span className="text-indigo-600 font-mono">{scaleScore}/100</span>
              </div>
              <input
                type="range"
                min={40}
                max={99}
                value={scaleScore}
                onChange={(e) => {
                  setScaleScore(Number(e.target.value));
                  setActiveScenario('custom');
                }}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>Pan-India Rollout</span>
                <span className="font-bold text-indigo-700">Weight: 10%</span>
              </div>
            </div>

            {/* 6. Team Capability (5%) */}
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Team & Execution</span>
                <span className="text-indigo-600 font-mono">{teamScore}/100</span>
              </div>
              <input
                type="range"
                min={40}
                max={99}
                value={teamScore}
                onChange={(e) => {
                  setTeamScore(Number(e.target.value));
                  setActiveScenario('custom');
                }}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>Domain Track Record</span>
                <span className="font-bold text-indigo-700">Weight: 5%</span>
              </div>
            </div>

            {/* 7. Risk & Compliance (5%) */}
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-2xs space-y-1.5 sm:col-span-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Cybersecurity & DPDP Act Compliance</span>
                <span className="text-indigo-600 font-mono">{riskScore}/100</span>
              </div>
              <input
                type="range"
                min={30}
                max={99}
                value={riskScore}
                onChange={(e) => {
                  setRiskScore(Number(e.target.value));
                  setActiveScenario('custom');
                }}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>Data Localization & STQC Test Readiness</span>
                <span className="font-bold text-indigo-700">Weight: 5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME SCORE GAUGE & AI CLASSIFICATION (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real-time Dynamic Gauge Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-lg p-5 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                Live AI Inference Output
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-slate-300">
                GFR 194 Model
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-1">
                  <span>{overallScore}</span>
                  <span className="text-sm font-normal text-slate-400">/100</span>
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Overall Weighted Merit Score
                </div>
              </div>

              {/* Status Pill */}
              <div className="text-right">
                {isG1Eligible ? (
                  <div className="px-3 py-1.5 rounded bg-blue-500/20 border border-blue-400/40 text-blue-300 font-bold text-xs flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span>G1 Shortlist Ready</span>
                  </div>
                ) : isG2Eligible ? (
                  <div className="px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>G2 Best Value Ready</span>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>General Pool (Review)</span>
                  </div>
                )}
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  G2 Value Index: <strong>{g2ValueIndex}</strong>
                </div>
              </div>
            </div>

            {/* G1 / G2 Qualification Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className={`p-2.5 rounded border ${isG1Eligible ? 'bg-blue-900/30 border-blue-500/40 text-blue-200' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                <div className="font-bold flex items-center justify-between">
                  <span>G1: Quality Roster</span>
                  {isG1Eligible && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                </div>
                <div className="text-[10px] mt-0.5 text-slate-400">
                  Threshold: ≥ 88.0 Score
                </div>
              </div>

              <div className={`p-2.5 rounded border ${isG2Eligible ? 'bg-emerald-900/30 border-emerald-500/40 text-emerald-200' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                <div className="font-bold flex items-center justify-between">
                  <span>G2: Value Roster</span>
                  {isG2Eligible && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-[10px] mt-0.5 text-slate-400">
                  Score ≥ 75 & Low Budget
                </div>
              </div>
            </div>

            {/* Live Natural Language Explanation */}
            <div className="bg-white/5 p-3 rounded border border-white/10 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-white flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AI Recommendation Summary:
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                {isG1Eligible
                  ? `High technical confidence (${overallScore}/100). Solution qualifies for G1 Quality shortlist with strong marks in Problem Fit (${fitScore}) and Innovation (${innovScore}).`
                  : isG2Eligible
                  ? `Exceptional cost-to-quality ratio (G2 Value score: ${g2ValueIndex}). Proposed ₹${budgetLakhs}L budget delivers optimum public value for money under MoRTH challenge.`
                  : `Score (${overallScore}/100) placed in general review. Recommend strengthening ${riskScore < 70 ? 'cybersecurity mitigation' : costScore < 70 ? 'budget justification' : 'technical depth'}.`}
              </p>
            </div>
          </div>

          {/* SHAP Feature Attribution Bars */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                SHAP Feature Attribution (Impact on Baseline 75):
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Live Delta</span>
            </div>

            <div className="space-y-1.5">
              {shapAttributions.map((attr, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] gap-2">
                  <span className="text-slate-600 truncate w-36">{attr.name}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex items-center">
                    {attr.delta >= 0 ? (
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, attr.delta * 20)}%` }}
                      />
                    ) : (
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.abs(attr.delta) * 20)}%` }}
                      />
                    )}
                  </div>
                  <span className={`font-mono font-bold text-[10px] w-12 text-right ${attr.delta >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {attr.delta > 0 ? `+${attr.delta}` : attr.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
