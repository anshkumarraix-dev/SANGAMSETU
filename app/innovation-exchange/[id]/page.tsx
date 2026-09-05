'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import InnovationExchangeNav from '@/components/innovation-exchange/InnovationExchangeNav';
import StatusBadge from '@/components/innovation-exchange/StatusBadge';
import ComparisonTable from '@/components/innovation-exchange/ComparisonTable';
import { useInnovationExchange } from '@/context/InnovationExchangeContext';
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Sparkles,
  Download,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Share2,
  FileText,
  UserCheck,
  Send,
  Award,
} from 'lucide-react';

export default function AlternativeDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const {
    getAlternativeById,
    getSolutionById,
    likeAlternative,
    addComment,
  } = useInnovationExchange();

  const alternative = getAlternativeById(id);
  const govSolution = alternative ? getSolutionById(alternative.targetSolutionId) : undefined;

  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('Technical Observer');
  const [authorRole, setAuthorRole] = useState<'Startup Founder' | 'Department Official' | 'Evaluator' | 'Observer'>('Observer');
  const [isCopied, setIsCopied] = useState(false);

  if (!alternative || !govSolution) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <MainNavbar activeTab="challenges" />
        <InnovationExchangeNav />
        <main id="main-content" className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-md border border-slate-200 text-center space-y-4 max-w-md">
            <h2 className="text-xl font-bold text-slate-900">Alternative Solution Not Found</h2>
            <p className="text-xs text-slate-500">
              The requested proposal ID does not exist in the national repository.
            </p>
            <Link
              href="/innovation-exchange/browse"
              className="px-4 py-2 rounded bg-sangam-navy-900 text-white font-bold text-xs inline-block"
            >
              Back to Repository
            </Link>
          </div>
        </main>
        <GovernmentFooter />
      </div>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(alternative.id, commentText.trim(), authorName, authorRole);
    setCommentText('');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavbar activeTab="challenges" />
      <InnovationExchangeNav />

      <main id="main-content" className="flex-1 py-8 px-4 max-w-[1440px] mx-auto w-full space-y-6">
        {/* Top Back & Action Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/innovation-exchange/browse"
            className="text-xs font-bold text-slate-600 hover:text-sangam-navy-900 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Alternative Solutions</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => likeAlternative(alternative.id)}
              className="px-3 py-1.5 rounded bg-white border border-slate-300 hover:border-red-400 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-50" />
              <span>Endorse ({alternative.likes})</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Title Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                {govSolution.category}
              </span>
              <StatusBadge status={alternative.status} size="md" />
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Submitted: <strong className="text-slate-800">{alternative.submittedAt}</strong>
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-sangam-navy-900 tracking-tight leading-snug">
              {alternative.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>
                By <strong className="text-slate-900">{alternative.startupName}</strong>
              </span>
              <span>•</span>
              <span className="font-mono">{alternative.startupDpiitNumber}</span>
              <span>•</span>
              <span>{alternative.startupLocation}</span>
              <span>•</span>
              <span>Est. {alternative.startupFoundedYear}</span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-sangam-navy-900">
            Head-to-Head Modernization Benchmark
          </h2>
          <ComparisonTable governmentSolution={govSolution} alternative={alternative} />
        </div>

        {/* Two-Column Deep Dive */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detailed Description */}
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-sangam-navy-900">Executive Technical Summary</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {alternative.description}
              </p>
            </div>

            {/* Architecture Details */}
            {alternative.architectureDetails && (
              <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-base font-bold text-sangam-navy-900">
                  Data Sovereign Cloud &amp; Security Architecture
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded border border-slate-200">
                  {alternative.architectureDetails}
                </p>
              </div>
            )}

            {/* Attached Verification & Audit Documents */}
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-sangam-navy-900">
                Statutory Documents &amp; Lab Benchmark Certifications
              </h3>

              <div className="space-y-2">
                {alternative.uploadedDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-sangam-blue-600" />
                      <div>
                        <span className="font-bold text-slate-800 block">{doc.name}</span>
                        <span className="text-[10px] text-slate-500">
                          {doc.type} • {doc.size}
                        </span>
                      </div>
                    </div>

                    <button className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Deliberation & Feedback */}
            <div id="comments" className="bg-white p-6 rounded-md border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3">
                <h3 className="text-base font-bold text-sangam-navy-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sangam-blue-600" />
                  <span>Technical Deliberation &amp; Field Notes ({alternative.comments.length})</span>
                </h3>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {alternative.comments.length > 0 ? (
                  alternative.comments.map((c) => (
                    <div key={c.id} className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900">{c.author}</strong>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                            {c.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{c.date}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{c.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    No technical notes logged yet. Be the first to share an observation.
                  </p>
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="space-y-3 pt-3 border-t border-slate-150 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Your Name / Title</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                      placeholder="e.g. Ramesh Chandra"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Your Role</label>
                    <select
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value as any)}
                      className="w-full p-2 text-xs rounded border border-slate-300 bg-white"
                    >
                      <option value="Department Official">Department Official</option>
                      <option value="Evaluator">Technical Evaluator</option>
                      <option value="Startup Founder">Startup Founder</option>
                      <option value="Observer">Civil Society Observer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Observation / Question</label>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    placeholder="Provide technical feedback, field observations, or ask questions to the founding team..."
                    className="w-full p-2 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-sangam-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sangam-navy-900 hover:bg-sangam-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Technical Observation</span>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Column (1/3) */}
          <div className="space-y-6">
            {/* AI Feasibility Card */}
            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Automated AI Feasibility
                </span>
                <span className="text-xs font-bold text-emerald-700 font-mono">
                  {alternative.aiFeasibilityScore}/100
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${alternative.aiFeasibilityScore}%` }}
                />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                {alternative.aiJustification}
              </p>
            </div>

            {/* Technical Committee Score Card */}
            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                <span className="text-xs font-bold text-sangam-navy-900 uppercase tracking-wider">
                  Technical Committee Evaluation
                </span>
                <span className="text-sm font-black text-sangam-blue-600 font-mono">
                  {alternative.review.overallScore}/10
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Technical Rigor</span>
                  <strong className="font-mono text-slate-900">{alternative.review.technicalScore}/10</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Field Feasibility</span>
                  <strong className="font-mono text-slate-900">{alternative.review.feasibilityScore}/10</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Public Impact</span>
                  <strong className="font-mono text-slate-900">{alternative.review.impactScore}/10</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Novelty</span>
                  <strong className="font-mono text-slate-900">{alternative.review.innovationScore}/10</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-150 space-y-1">
                <span className="text-[11px] font-bold text-slate-700">Official Committee Comments:</span>
                <p className="text-xs text-slate-600 italic bg-amber-50/60 p-2.5 rounded border border-amber-200 leading-relaxed">
                  &ldquo;{alternative.review.comments}&rdquo;
                </p>
                {alternative.review.reviewerName && (
                  <div className="text-[11px] text-slate-500 text-right pt-1">
                    — {alternative.review.reviewerName} ({alternative.review.reviewerDesignation})
                  </div>
                )}
              </div>

              <Link
                href={`/dashboard/evaluator/innovation-exchange/evaluate/${alternative.id}`}
                className="w-full py-2 rounded bg-slate-900 hover:bg-sangam-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-2xs transition-colors block text-center"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Enter Evaluator Portal</span>
              </Link>
            </div>

            {/* Live Pilot Corridor Status */}
            <div className="bg-white p-5 rounded-md border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Pilot Testing Status
                </span>
                {alternative.pilot.approved ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Sanctioned
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                    Pending Sanction
                  </span>
                )}
              </div>

              {alternative.pilot.approved ? (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sanctioned Pilot Site</span>
                    <strong className="text-slate-900">{alternative.pilot.pilotSite}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Escrow Budget</span>
                      <strong className="text-slate-900 font-mono">₹{alternative.pilot.budgetLakhs} Lakhs</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Progress</span>
                      <strong className="text-emerald-700 font-mono">{alternative.pilot.progressPct}%</strong>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Auditing Agency</span>
                    <strong className="text-slate-700 text-[11px]">{alternative.pilot.monitoringAgency}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  This alternative is undergoing technical review. Upon qualification, pilot escrow funding
                  will be disbursed directly under GFR Rule 149(iv).
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
