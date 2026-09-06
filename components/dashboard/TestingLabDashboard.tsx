'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Prototype, TestReport, TestVerdict } from '@/lib/types';
import {
  FlaskConical,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Award,
  AlertTriangle,
  ExternalLink,
  Upload,
  Cpu,
  Sparkles,
  ClipboardList,
} from 'lucide-react';

export default function TestingLabDashboard() {
  const {
    prototypes,
    testReports,
    submitTestReport,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'queue' | 'reports'>('queue');
  const [selectedProtoForTest, setSelectedProtoForTest] = useState<Prototype | null>(null);

  // Test form state
  const [testingOrgName, setTestingOrgName] = useState('Standardisation Testing and Quality Certification (STQC) Directorate');
  const [functionalityScore, setFunctionalityScore] = useState<number>(9);
  const [performanceScore, setPerformanceScore] = useState<number>(9);
  const [securityScore, setSecurityScore] = useState<number>(9);
  const [usabilityScore, setUsabilityScore] = useState<number>(9);
  const [integrationScore, setIntegrationScore] = useState<number>(9);
  const [verdict, setVerdict] = useState<TestVerdict>('PASS');
  const [functionalityReport, setFunctionalityReport] = useState('94.8% edge accuracy verified under real operating speeds up to 80 km/h with zero dropped telemetry frames.');
  const [performanceReport, setPerformanceReport] = useState('Low latency under 200ms per inference batch. Thermal footprint stable at 42°C in ambient 45°C stress chamber.');
  const [securityReport, setSecurityReport] = useState('CERT-In level 3 vulnerability audit cleared. End-to-end TLS 1.3 encryption and salted SHA-256 HMAC for all IoT sensor payloads.');
  const [recommendations, setRecommendations] = useState('Recommended for direct unconditional live corridor pilot deployment with NHAI.');
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProtoForTest) return;

    submitTestReport({
      prototypeId: selectedProtoForTest.id,
      proposalId: selectedProtoForTest.proposalId,
      challengeId: selectedProtoForTest.challengeId,
      startupName: selectedProtoForTest.startupName,
      solutionTitle: selectedProtoForTest.solutionTitle,
      testingOrgName,
      testingOrgId: 'stqc-dir',
      functionalityScore,
      performanceScore,
      securityScore,
      usabilityScore,
      integrationScore,
      overallScore: Math.round(((functionalityScore + performanceScore + securityScore + usabilityScore + integrationScore) / 50) * 100),
      functionalityReport,
      performanceReport,
      securityReport,
      usabilityReport: 'High usability score with clean interface and localized vernacular assistance.',
      integrationReport: 'Seamless REST/MQTT integration with standard government data lake schemas.',
      recommendations,
      issues: [
        'Minor UI label wrap on ultra-wide 4K monitor (resolved)',
        'Recommended secondary backup battery harness for rural brownouts',
      ],
      verdict,
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setSelectedProtoForTest(null);
      setActiveTab('reports');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Empanelled Lab Profile Header */}
      <div className="relative bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 shadow-xs overflow-hidden">
        <Image
          src="/images/dash-testing-lab.jpg"
          alt="High-tech electronics test laboratory, oscilloscope instrumentation"
          fill
          loading="lazy"
          className="object-cover object-center opacity-75"
          sizes="100vw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/35 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-sm bg-cyan-400 text-slate-950 text-xs font-black tracking-wide flex items-center gap-1">
                <FlaskConical className="w-3.5 h-3.5" />
                EMPANELLED TESTING ORGANISATION
              </span>
              <span className="px-2.5 py-0.5 rounded-sm bg-white/20 text-slate-200 text-xs font-semibold">
                Ministry of Electronics & IT (MeitY)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black">
              STQC Directorate / C-DAC Certification Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Standardisation Testing and Quality Certification • Objective hardware, firmware, software benchmarking, CERT-In compliance, and field readiness validation.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20 text-xs space-y-1 shrink-0">
            <div className="font-bold text-cyan-300">Empanelment ID: MEITY-STQC-8821</div>
            <div className="text-slate-300 text-[11px]">NABL Accredited & CERT-In Empanelled</div>
            <div className="text-[10px] text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Certification Authority
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'queue'
              ? 'bg-sangam-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Prototype Testing Queue ({prototypes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-sangam-navy-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Issued Test Certificates ({testReports.length})</span>
        </button>
      </div>

      {/* TAB 1: PROTOTYPE TESTING QUEUE */}
      {activeTab === 'queue' && (
        <div className="space-y-6">
          {prototypes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
              <FlaskConical className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Testing Queue is Empty</h3>
              <p className="text-xs text-slate-500 mt-1">
                Shortlisted startup prototypes submitted for STQC / C-DAC independent laboratory evaluation will appear here for verification.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
            {prototypes.map(proto => (
              <div
                key={proto.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase">Shortlisted Innovation Prototype</span>
                    <h3 className="text-lg sm:text-xl font-black text-sangam-navy-900 mt-0.5">
                      {proto.solutionTitle}
                    </h3>
                    <span className="text-xs text-slate-600 font-semibold">Startup: {proto.startupName}</span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold self-start sm:self-auto">
                    {proto.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">Live Demo / Staging URL:</span>
                    <a href={proto.submissionUrl} target="_blank" className="text-blue-600 underline font-semibold break-all">
                      {proto.submissionUrl}
                    </a>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">Walkthrough Video:</span>
                    {proto.demoVideoUrl ? (
                      <a href={proto.demoVideoUrl} target="_blank" className="text-blue-600 underline font-semibold break-all">
                        {proto.demoVideoUrl}
                      </a>
                    ) : (
                      <span className="text-slate-400">Not provided</span>
                    )}
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-1">Harness / Specs Repository:</span>
                    {proto.repositoryUrl ? (
                      <a href={proto.repositoryUrl} target="_blank" className="text-blue-600 underline font-semibold break-all">
                        {proto.repositoryUrl}
                      </a>
                    ) : (
                      <span className="text-slate-400">Private</span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <strong>Startup Lab Notes:</strong> {proto.architectureNotes}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setSelectedProtoForTest(proto)}
                    className="px-5 py-2.5 rounded-xl bg-sangam-navy-900 hover:bg-sangam-navy-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <FlaskConical className="w-4 h-4 text-cyan-400" />
                    <span>Conduct Lab Benchmarking & Issue Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      )}

      {/* TAB 2: ISSUED CERTIFICATES */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {testReports.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
              <FileCheck className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Certificates Issued Yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Official test certificates issued after laboratory stress testing and CERT-In audits will be archived here.
              </p>
            </div>
          ) : (
            testReports.map(rep => (
            <div key={rep.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 uppercase">{rep.testingOrgName}</span>
                  <h4 className="text-xl font-black text-sangam-navy-900 mt-0.5">{rep.solutionTitle}</h4>
                  <p className="text-xs text-slate-600 font-semibold">Startup: {rep.startupName}</p>
                </div>

                <div className="text-right">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black">
                    VERDICT: {rep.verdict}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block mt-1">
                    Cert No: <strong>{rep.certificateNumber}</strong>
                  </span>
                </div>
              </div>

              {/* Score Radar / 5-Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Functionality</span>
                  <span className="text-xl font-black text-sangam-blue-600">{rep.functionalityScore}/10</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Performance</span>
                  <span className="text-xl font-black text-sangam-blue-600">{rep.performanceScore}/10</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Security (CERT-In)</span>
                  <span className="text-xl font-black text-sangam-blue-600">{rep.securityScore}/10</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Usability</span>
                  <span className="text-xl font-black text-sangam-blue-600">{rep.usabilityScore}/10</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Integration</span>
                  <span className="text-xl font-black text-sangam-blue-600">{rep.integrationScore}/10</span>
                </div>
              </div>

              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p><strong>Functional Analysis:</strong> {rep.functionalityReport}</p>
                <p><strong>Performance & Stress Benchmarking:</strong> {rep.performanceReport}</p>
                <p><strong>Security & Vulnerability Audit:</strong> {rep.securityReport}</p>
                <p className="text-emerald-900 font-bold"><strong>Formal Lab Recommendation:</strong> {rep.recommendations}</p>
              </div>
            </div>
          )))
        }
        </div>
      )}

      {/* BENCHMARKING MODAL */}
      {selectedProtoForTest && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[11px] font-bold text-indigo-600 uppercase">STQC Testing Laboratory Evaluation</span>
              <h3 className="text-xl font-black text-sangam-navy-900 mt-1">
                Conduct Prototype Benchmarking & Issue Certificate
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">Evaluating: <strong>{selectedProtoForTest.solutionTitle}</strong> ({selectedProtoForTest.startupName})</p>
            </div>

            {reportSuccess && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Test Report and Certificate issued successfully! Forwarded to Ministry Committee.</span>
              </div>
            )}

            <form onSubmit={handleTestSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* 5 Scores Inputs */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">
                  1. Multi-Dimensional Score Metrics (1 to 10 scale):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-600 block">Functionality (1-10)</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={functionalityScore}
                      onChange={e => setFunctionalityScore(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Performance (1-10)</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={performanceScore}
                      onChange={e => setPerformanceScore(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Security CERT-In (1-10)</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={securityScore}
                      onChange={e => setSecurityScore(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Usability (1-10)</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={usabilityScore}
                      onChange={e => setUsabilityScore(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Integration (1-10)</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={integrationScore}
                      onChange={e => setIntegrationScore(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Overall Verdict</label>
                    <select
                      value={verdict}
                      onChange={e => setVerdict(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-bold bg-white"
                    >
                      <option value="PASS">PASS (Certified for Pilot)</option>
                      <option value="CONDITIONAL_PASS">CONDITIONAL PASS (Minor Fixes)</option>
                      <option value="FAIL">FAIL (Does Not Meet Specs)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Functionality Findings & Field Accuracy *</label>
                <textarea
                  rows={2}
                  value={functionalityReport}
                  onChange={e => setFunctionalityReport(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">CERT-In Security & Vulnerability Assessment *</label>
                <textarea
                  rows={2}
                  value={securityReport}
                  onChange={e => setSecurityReport(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Empanelled Lab Formal Recommendation *</label>
                <textarea
                  rows={2}
                  value={recommendations}
                  onChange={e => setRecommendations(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedProtoForTest(null)}
                  className="px-5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-sangam-navy-900 hover:bg-sangam-navy-800 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Issue STQC Test Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
