'use client';

import React, { useState } from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { KeyRound, Mail, Shield, ArrowLeft, CheckCircle2, AlertCircle, Building2, Landmark, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [role, setRole] = useState<'startup' | 'government' | 'testing_org'>('startup');
  const [orgId, setOrgId] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgId.trim() || !contactEmail.trim()) {
      setError('Please provide both your Organization ID and verified official contact email.');
      return;
    }
    setError(null);
    setLoading(true);

    // Simulate official nodal recovery protocol
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="forgot-password-page">
      <MainNavbar />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/login" className="hover:text-amber-400 transition-colors">Login</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Account Recovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <KeyRound className="w-7 h-7 text-sangam-saffron-400" />
            <span>Official Credential & Password Recovery Service</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Statutory credential reset for DPIIT-recognized startups, Union/State Ministry procurement officers, and empanelled test laboratories.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-12 flex items-center justify-center" id="main-content">
        <div className="w-full max-w-lg bg-white rounded-md border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Recovery Instructions Dispatched</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A digitally signed, time-limited password reset link and One-Time Authorization PIN (valid for 15 minutes) have been generated for <strong>{orgId.toUpperCase()}</strong> and sent to:
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm font-mono text-xs text-slate-800 font-bold">
                {contactEmail}
              </div>
              <p className="text-[11px] text-slate-500">
                If you do not receive the recovery email within 3 minutes, please check your spam folder or reach out to the National Helpdesk at <span className="font-semibold">support@sangamsetu.gov.in</span>.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-4 py-2 bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white text-xs font-bold rounded-sm transition-colors"
                >
                  Return to Portal Login
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setOrgId('');
                    setContactEmail('');
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-sm transition-colors cursor-pointer"
                >
                  Request for Another ID
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Reset Your Access Password</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your portal entity category and enter your registered identifiers.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-sm text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Entity Role Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Entity Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('startup')}
                    className={`py-2 px-2 text-xs font-bold rounded-sm border transition-colors flex flex-col items-center gap-1 cursor-pointer ${
                      role === 'startup'
                        ? 'bg-sangam-blue-50 border-sangam-blue-500 text-sangam-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Startup</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('government')}
                    className={`py-2 px-2 text-xs font-bold rounded-sm border transition-colors flex flex-col items-center gap-1 cursor-pointer ${
                      role === 'government'
                        ? 'bg-sangam-blue-50 border-sangam-blue-500 text-sangam-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Government</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('testing_org')}
                    className={`py-2 px-2 text-xs font-bold rounded-sm border transition-colors flex flex-col items-center gap-1 cursor-pointer ${
                      role === 'testing_org'
                        ? 'bg-sangam-blue-50 border-sangam-blue-500 text-sangam-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Testing Lab</span>
                  </button>
                </div>
              </div>

              {/* Organization / Gov ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="recovery-org-id">
                  {role === 'startup' && 'DPIIT Recognition Number'}
                  {role === 'government' && 'Udyam / Department ID'}
                  {role === 'testing_org' && 'STQC / NABL Empanelment ID'}
                </label>
                <div className="relative">
                  <input
                    id="recovery-org-id"
                    type="text"
                    required
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value.toUpperCase())}
                    placeholder={
                      role === 'startup' ? 'e.g. KA1234567890' :
                      role === 'government' ? 'e.g. UDYAM-KA-12-1234567' :
                      'e.g. STQC-2023-12345'
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500 uppercase font-mono"
                  />
                </div>
              </div>

              {/* Official Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="recovery-email">
                  Registered Official Contact Email
                </label>
                <div className="relative">
                  <input
                    id="recovery-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. nodal.officer@startup.gov.in"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Must match the verified primary email address recorded during entity empanelment.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-sangam-blue-600 hover:bg-sangam-blue-700 disabled:bg-slate-400 text-white font-bold text-xs rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Statutory Directory...</span>
                  </>
                ) : (
                  <span>Send Reset Authorization Link</span>
                )}
              </button>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
                <Link href="/login" className="flex items-center gap-1 hover:text-sangam-blue-600 hover:underline">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </Link>
                <Link href="/faq" className="hover:text-sangam-blue-600 hover:underline">
                  Need Help? Read FAQ
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
