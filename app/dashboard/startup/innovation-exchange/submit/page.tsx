'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import ComparisonTable from '@/components/innovation-exchange/ComparisonTable';
import OpportunityBadge from '@/components/innovation-exchange/OpportunityBadge';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  ArrowLeft,
  Sparkles,
  TrendingDown,
  Clock,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Upload,
  CheckCircle2,
  HelpCircle,
  IndianRupee,
  Layers,
  FileText,
  X,
} from 'lucide-react';

function SubmitAlternativeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedSolutionId = searchParams.get('solutionId') || '';

  const {
    governmentSolutions,
    addAlternative,
    calculateFeasibilityScore,
    checkDuplicateWarning,
  } = useInnovationExchange();

  // Wizard Step
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedGovSolutionId, setSelectedGovSolutionId] = useState<string>(() => {
    return preselectedSolutionId || (governmentSolutions[0] ? governmentSolutions[0].id : '');
  });

  const selectedGovSolution = useMemo(() => {
    return governmentSolutions.find((g) => g.id === selectedGovSolutionId) || governmentSolutions[0];
  }, [governmentSolutions, selectedGovSolutionId]);

  const [startupName, setStartupName] = useState('CogniScale Intelligence Labs');
  const [startupDpiitNumber, setStartupDpiitNumber] = useState('DPIIT-2024-KA-11982');
  const [startupFoundedYear, setStartupFoundedYear] = useState<number>(2023);
  const [startupLocation, setStartupLocation] = useState('Bengaluru, Karnataka');

  const [title, setTitle] = useState(() => {
    const sol = governmentSolutions.find((g) => g.id === (preselectedSolutionId || (governmentSolutions[0]?.id))) || governmentSolutions[0];
    return sol ? `Next-Gen AI Alternative for ${sol.name}` : '';
  });
  const [proposedCost, setProposedCost] = useState<number>(() => {
    const sol = governmentSolutions.find((g) => g.id === (preselectedSolutionId || (governmentSolutions[0]?.id))) || governmentSolutions[0];
    return sol ? Math.round(sol.currentCost * 0.55) : 75;
  });
  const [proposedTimelineMonths, setProposedTimelineMonths] = useState<number>(() => {
    const sol = governmentSolutions.find((g) => g.id === (preselectedSolutionId || (governmentSolutions[0]?.id))) || governmentSolutions[0];
    return sol ? Math.max(1, Math.round(sol.currentImplementationTime * 0.5)) : 3;
  });
  const [technologyStackInput, setTechnologyStackInput] = useState('Edge AI, Jetson IoT, Sovereign Cloud, GIS API');
  const [description, setDescription] = useState('');
  const [howItWorks, setHowItWorks] = useState('');
  const [architectureDetails, setArchitectureDetails] = useState('');

  const [uploadedDocs, setUploadedDocs] = useState<
    { name: string; size: string; type: string }[]
  >([
    {
      name: 'Architecture_Blueprint_v1.pdf',
      size: '2.4 MB',
      type: 'Technical Whitepaper',
    },
    {
      name: 'DPIIT_Registration_Certificate.pdf',
      size: '850 KB',
      type: 'Statutory Verification',
    },
  ]);

  const [newDocName, setNewDocName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGovSolutionChange = (newId: string) => {
    setSelectedGovSolutionId(newId);
    const sol = governmentSolutions.find((g) => g.id === newId);
    if (sol) {
      setProposedCost(Math.round(sol.currentCost * 0.55));
      setProposedTimelineMonths(Math.max(1, Math.round(sol.currentImplementationTime * 0.5)));
      setTitle(`Next-Gen AI Alternative for ${sol.name}`);
    }
  };

  // Parsed Tech Stack
  const techStackList = useMemo(() => {
    return technologyStackInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }, [technologyStackInput]);

  // Real-time AI Feasibility Calculation
  const aiFeasibility = useMemo(() => {
    if (!selectedGovSolution) return { score: 75, justification: '' };
    return calculateFeasibilityScore(
      proposedCost,
      selectedGovSolution.currentCost,
      proposedTimelineMonths,
      selectedGovSolution.currentImplementationTime,
      techStackList
    );
  }, [
    proposedCost,
    proposedTimelineMonths,
    selectedGovSolution,
    techStackList,
    calculateFeasibilityScore,
  ]);

  // Duplicate pricing warning
  const duplicateWarning = useMemo(() => {
    if (!selectedGovSolution) return null;
    return checkDuplicateWarning(selectedGovSolution.id, proposedCost);
  }, [selectedGovSolution, proposedCost, checkDuplicateWarning]);

  // Handle Document Add
  const handleAddDoc = () => {
    if (!newDocName.trim()) return;
    setUploadedDocs((prev) => [
      ...prev,
      {
        name: newDocName.trim().endsWith('.pdf') ? newDocName.trim() : `${newDocName.trim()}.pdf`,
        size: '1.5 MB',
        type: 'Benchmark Verification',
      },
    ]);
    setNewDocName('');
  };

  const handleRemoveDoc = (index: number) => {
    setUploadedDocs((prev) => prev.filter((_, i) => i !== index));
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedGovSolution) return;

    setIsSubmitting(true);

    const newId = addAlternative({
      title: title.trim(),
      startupName: startupName.trim(),
      startupDpiitNumber: startupDpiitNumber.trim(),
      startupFoundedYear: Number(startupFoundedYear),
      startupLocation: startupLocation.trim(),
      targetSolutionId: selectedGovSolution.id,
      proposedCost: Number(proposedCost),
      proposedTimelineMonths: Number(proposedTimelineMonths),
      technologyStack: techStackList,
      description: description.trim() || 'Modernized Edge-AI and automated IoT architecture designed for high-availability public service delivery.',
      howItWorks:
        howItWorks.trim() ||
        '1. Hardware sensors/edge cameras deploy across public corridors.\n2. On-device inference eliminates manual survey labor.\n3. Encrypted GIS webhooks interface with state dashboards.\n4. Automated contractor settlement on verified outcome metrics.',
      architectureDetails:
        architectureDetails.trim() ||
        'Sovereign multi-tenant cloud architecture with ISO 27001 and MeitY-empanelled data storage.',
      uploadedDocuments: uploadedDocs,
      status: 'submitted',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/innovation-exchange/${newId}`);
    }, 600);
  };

  const costReductionPct = selectedGovSolution
    ? Math.max(0, Math.round(((selectedGovSolution.currentCost - proposedCost) / selectedGovSolution.currentCost) * 100))
    : 0;

  const timeReductionPct = selectedGovSolution
    ? Math.max(
        0,
        Math.round(
          ((selectedGovSolution.currentImplementationTime - proposedTimelineMonths) /
            selectedGovSolution.currentImplementationTime) *
            100
        )
      )
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="dashboard" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/dashboard/startup/innovation-exchange"
            className="text-xs font-bold text-slate-600 hover:text-sangam-navy-900 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workspace</span>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>GFR Rule 149(iv) Fast-Track Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight">
            Submit Startup Alternative Solution Proposal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Specify how your technology replaces legacy public workflows. Our AI scoring engine evaluates
            your proposal in real-time against statutory 10% cost and 25% timeline thresholds.
          </p>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-150 text-xs">
            <button
              onClick={() => setCurrentStep(1)}
              className={`p-2.5 rounded text-left font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                currentStep === 1
                  ? 'bg-sangam-blue-50 text-sangam-blue-800 border border-sangam-blue-300'
                  : 'bg-slate-50 text-slate-600'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-sangam-blue-600 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Target Challenge</span>
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              className={`p-2.5 rounded text-left font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                currentStep === 2
                  ? 'bg-sangam-blue-50 text-sangam-blue-800 border border-sangam-blue-300'
                  : 'bg-slate-50 text-slate-600'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-sangam-blue-600 text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Value &amp; Cost Delta</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className={`p-2.5 rounded text-left font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                currentStep === 3
                  ? 'bg-sangam-blue-50 text-sangam-blue-800 border border-sangam-blue-300'
                  : 'bg-slate-50 text-slate-600'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-sangam-blue-600 text-white flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Technical Specs</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className={`p-2.5 rounded text-left font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                currentStep === 4
                  ? 'bg-sangam-blue-50 text-sangam-blue-800 border border-sangam-blue-300'
                  : 'bg-slate-50 text-slate-600'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-sangam-blue-600 text-white flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Review &amp; Submit</span>
            </button>
          </div>
        </div>

        {/* Wizard Form Layout (2 Columns: Left Form / Right Live AI Copilot) */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Form (7/12) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Select Target Problem Statement */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h2 className="text-base font-bold text-sangam-navy-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-sangam-blue-600" />
                    <span>Select the Target Government Baseline to Modernize</span>
                  </h2>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">
                      Department Baseline Problem Statement
                    </label>
                    <select
                      value={selectedGovSolutionId}
                      onChange={(e) => handleGovSolutionChange(e.target.value)}
                      className="w-full p-2.5 text-xs sm:text-sm rounded border border-slate-300 bg-white font-medium text-slate-800"
                    >
                      {governmentSolutions.map((sol) => (
                        <option key={sol.id} value={sol.id}>
                          {sol.name} ({sol.department} - ₹{sol.currentCost}L/yr)
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedGovSolution && (
                    <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Current Cost Baseline:</span>
                        <strong className="text-slate-900 font-mono">
                          ₹{selectedGovSolution.currentCost} Lakhs/year
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Current Deployment Time:</span>
                        <strong className="text-slate-900 font-mono">
                          {selectedGovSolution.currentImplementationTime} Months
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Incumbent Vendor:</span>
                        <span className="text-slate-600">{selectedGovSolution.currentVendor}</span>
                      </div>
                    </div>
                  )}

                  {/* Startup Details */}
                  <div className="pt-4 border-t border-slate-150 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Proposing Startup Credentials
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Startup Legal Name</label>
                        <input
                          type="text"
                          value={startupName}
                          onChange={(e) => setStartupName(e.target.value)}
                          className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">DPIIT Number</label>
                        <input
                          type="text"
                          value={startupDpiitNumber}
                          onChange={(e) => setStartupDpiitNumber(e.target.value)}
                          className="w-full p-2 text-xs rounded border border-slate-300 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Headquarters / Location</label>
                        <input
                          type="text"
                          value={startupLocation}
                          onChange={(e) => setStartupLocation(e.target.value)}
                          className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Year Founded</label>
                        <input
                          type="number"
                          value={startupFoundedYear}
                          onChange={(e) => setStartupFoundedYear(Number(e.target.value))}
                          className="w-full p-2 text-xs rounded border border-slate-300 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs shadow-xs"
                    >
                      Next: Value &amp; Cost Delta →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Value & Cost Delta */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h2 className="text-base font-bold text-sangam-navy-900 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <span>Proposed Cost &amp; Timeline Delta</span>
                  </h2>

                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-800">Alternative Solution Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Edge-AI Computer Vision System for Municipal Road Distress"
                      className="w-full p-2.5 text-xs sm:text-sm rounded border border-slate-300 bg-white font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-4 bg-emerald-50/50 rounded border border-emerald-200 space-y-2">
                      <label className="font-bold text-emerald-950 block">
                        Proposed Annual Outlay (₹ Lakhs)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-4 h-4 text-emerald-700 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          required
                          min={1}
                          max={selectedGovSolution?.currentCost || 1000}
                          value={proposedCost}
                          onChange={(e) => setProposedCost(Number(e.target.value))}
                          className="w-full pl-8 pr-3 py-2 rounded border border-emerald-300 bg-white font-mono font-bold text-sm text-emerald-900"
                        />
                      </div>
                      <div className="text-[11px] font-bold text-emerald-700">
                        {costReductionPct}% Savings vs Gov ₹{selectedGovSolution?.currentCost}L
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50/50 rounded border border-blue-200 space-y-2">
                      <label className="font-bold text-blue-950 block">
                        Proposed Deployment Timeline (Months)
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-blue-700 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          required
                          min={1}
                          max={selectedGovSolution?.currentImplementationTime || 24}
                          value={proposedTimelineMonths}
                          onChange={(e) => setProposedTimelineMonths(Number(e.target.value))}
                          className="w-full pl-8 pr-3 py-2 rounded border border-blue-300 bg-white font-mono font-bold text-sm text-blue-900"
                        />
                      </div>
                      <div className="text-[11px] font-bold text-blue-700">
                        {timeReductionPct}% Faster vs Gov {selectedGovSolution?.currentImplementationTime} Mo
                      </div>
                    </div>
                  </div>

                  {/* Duplicate warning notification */}
                  {duplicateWarning && (
                    <div className="p-3 bg-amber-50 rounded border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Similar Pricing Proposal Alert:</span>
                        <p className="text-[11px] leading-relaxed">{duplicateWarning}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2 rounded bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs shadow-xs"
                    >
                      Next: Technical Architecture →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Technical Specs & Uploads */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h2 className="text-base font-bold text-sangam-navy-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sangam-blue-600" />
                    <span>Technical Architecture &amp; Methodology</span>
                  </h2>

                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-800">
                      Technology Stack (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={technologyStackInput}
                      onChange={(e) => setTechnologyStackInput(e.target.value)}
                      placeholder="e.g. YOLOv10 Edge Vision, Jetson Orin Nano IoT, NIC GIS Webhooks"
                      className="w-full p-2.5 text-xs rounded border border-slate-300 bg-white font-mono"
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-800">Executive Solution Summary</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the overarching innovation and how it eliminates legacy recurring bottlenecks..."
                      className="w-full p-2.5 text-xs rounded border border-slate-300 bg-white"
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-800">
                      How It Works (Step-by-step operational workflow)
                    </label>
                    <textarea
                      rows={3}
                      value={howItWorks}
                      onChange={(e) => setHowItWorks(e.target.value)}
                      placeholder="1. Sensor data collected...\n2. Edge inferencing...\n3. Encrypted webhook..."
                      className="w-full p-2.5 text-xs rounded border border-slate-300 bg-white font-mono"
                    />
                  </div>

                  {/* Document Uploads */}
                  <div className="space-y-2 pt-2 border-t border-slate-150">
                    <label className="text-xs font-bold text-slate-800 block">
                      Attach Architecture Whitepaper &amp; Statutory Certifications
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newDocName}
                        onChange={(e) => setNewDocName(e.target.value)}
                        placeholder="e.g. Lab_Benchmark_Report_2026.pdf"
                        className="flex-1 p-2 text-xs rounded border border-slate-300 bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddDoc}
                        className="px-3 py-2 rounded bg-slate-900 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Add Doc</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {uploadedDocs.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-sangam-blue-600" />
                            <span className="font-medium text-slate-800">{doc.name}</span>
                            <span className="text-[10px] text-slate-400">({doc.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveDoc(idx)}
                            className="text-red-500 hover:text-red-700 p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2 rounded bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-5 py-2 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs shadow-xs"
                    >
                      Next: Final Review →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Final Submission */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <h2 className="text-base font-bold text-sangam-navy-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Review Proposal Summary</span>
                  </h2>

                  <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">
                        Proposal Title
                      </span>
                      <strong className="text-slate-900 text-sm">{title}</strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Proposing Startup</span>
                        <strong className="text-slate-800">{startupName}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Target Challenge</span>
                        <strong className="text-slate-800">{selectedGovSolution?.name}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Proposed Outlay</span>
                        <strong className="text-emerald-700 font-mono text-sm">
                          ₹{proposedCost} Lakhs ({costReductionPct}% savings)
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Proposed Timeline</span>
                        <strong className="text-blue-700 font-mono text-sm">
                          {proposedTimelineMonths} Months ({timeReductionPct}% faster)
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Statutory Fast-Track Declaration:</span>
                      <p className="text-[11px] leading-relaxed">
                        By submitting, you certify that this alternative meets DPIIT compliance guidelines and
                        complies with GFR Rule 149(iv) sovereign data residency requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 rounded bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isSubmitting ? 'Transmitting to Evaluation Cell...' : 'Submit to Innovation Exchange'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Live Copilot Sidebar (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live AI Feasibility Score Meter */}
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Real-Time AI Feasibility Engine
                </span>
                <span className="text-base font-black text-emerald-700 font-mono">
                  {aiFeasibility.score}/100
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${aiFeasibility.score}%` }}
                />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                {aiFeasibility.justification}
              </p>

              <div className="space-y-2 text-xs pt-2 border-t border-slate-150">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Cost Reduction Metric</span>
                  <strong className="text-emerald-700 font-mono">
                    {costReductionPct}% {costReductionPct >= 10 ? '✓ (Meets Rule 149)' : '✗ (< 10%)'}
                  </strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Timeline Compression</span>
                  <strong className="text-blue-700 font-mono">
                    {timeReductionPct}% {timeReductionPct >= 25 ? '✓ (Fast-Track)' : 'Standard'}
                  </strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Technology Depth</span>
                  <strong className="text-slate-900 font-mono">{techStackList.length} Components</strong>
                </div>
              </div>
            </div>

            {/* Target Baseline Live Context */}
            {selectedGovSolution && (
              <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Target Challenge Context
                  </span>
                  <OpportunityBadge score={selectedGovSolution.opportunityScore} size="sm" />
                </div>

                <h3 className="text-sm font-bold text-sangam-navy-900">{selectedGovSolution.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {selectedGovSolution.description}
                </p>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                    Legacy Pain Points to Address:
                  </span>
                  <ul className="space-y-1 text-slate-600 mt-1">
                    {selectedGovSolution.painPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}

export default function SubmitAlternativePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
          Loading Submission Wizard...
        </div>
      }
    >
      <SubmitAlternativeContent />
    </Suspense>
  );
}
