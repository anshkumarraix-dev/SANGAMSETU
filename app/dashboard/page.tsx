'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import {
  Rocket,
  Building2,
  FlaskConical,
  Shield,
  ArrowLeft,
  LogOut,
  Bell,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import StartupDashboard from '@/components/dashboard/StartupDashboard';
import GovernmentDashboard from '@/components/dashboard/GovernmentDashboard';
import TestingLabDashboard from '@/components/dashboard/TestingLabDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import SimulationToast from '@/components/simulation/SimulationToast';

export default function DashboardPage() {
  const { user, profile, signOut, deleteAccount } = useAuth();
  const { role, setRole, setActiveView } = useApp();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to permanently delete your account and erase all associated personal data from the SangamSetu portal? This action cannot be undone.')) {
      return;
    }
    setIsDeleting(true);
    const success = await deleteAccount();
    setIsDeleting(false);
    if (success) {
      setDeleteSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <MainNavbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 py-6 sm:py-8 w-full">
        {/* User Session & DPDP Data Privacy Ribbon */}
        {user && (
          <div className="bg-white border border-slate-200 rounded-md p-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-700">Authenticated Session:</span>
              <span className="font-bold text-sangam-navy-900">{profile?.organizationName || user.email || 'Government User'}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">DPDP Act 2023 Protected</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="px-2.5 py-1 rounded-sm border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-colors cursor-pointer"
              >
                Data Privacy & Rights
              </button>
              <button
                onClick={() => signOut()}
                className="px-2.5 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Role Selector & Header Bar */}
        <div className="bg-white border border-slate-200 rounded-md p-4 mb-6 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sangam-navy-900 hover:text-sangam-blue-600 transition-colors py-1 px-2.5 rounded-sm hover:bg-slate-100"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Public Portal</span>
              </Link>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <div className="text-xs font-semibold text-slate-500 hidden sm:block">
                Select Lifecycle Role to Inspect:
              </div>
            </div>

            {/* 4 Role Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <button
                onClick={() => setRole('STARTUP')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  role === 'STARTUP' || role === 'PUBLIC'
                    ? 'bg-sangam-navy-900 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Rocket className="w-3.5 h-3.5 text-amber-400" />
                <span>1. DPIIT Startup</span>
              </button>

              <button
                onClick={() => setRole('GOVERNMENT')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  role === 'GOVERNMENT'
                    ? 'bg-sangam-navy-900 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-blue-300" />
                <span>2. Ministry Officer</span>
              </button>

              <button
                onClick={() => setRole('TESTING_ORG')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  role === 'TESTING_ORG' || role === 'TESTING_LAB'
                    ? 'bg-sangam-navy-900 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5 text-cyan-300" />
                <span>3. Empanelled Lab</span>
              </button>

              <button
                onClick={() => setRole('ADMIN')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  role === 'ADMIN'
                    ? 'bg-sangam-navy-900 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>4. DPIIT Mission Control</span>
              </button>
            </div>
          </div>
        </div>

        {/* Render Active Role Dashboard */}
        {(role === 'STARTUP' || role === 'PUBLIC') && <StartupDashboard />}
        {role === 'GOVERNMENT' && <GovernmentDashboard />}
        {(role === 'TESTING_ORG' || role === 'TESTING_LAB') && <TestingLabDashboard />}
        {role === 'ADMIN' && <AdminDashboard />}

        {/* Data Privacy & DPDP Act 2023 Rights Modal */}
        {showPrivacyModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl border border-slate-200 max-w-lg w-full p-6 text-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sangam-blue-600" />
                  <h3 className="font-bold text-base text-sangam-navy-900">
                    Data Privacy & Personal Data Rights
                  </h3>
                </div>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm space-y-1.5">
                  <div className="font-bold text-slate-800">DPDP Act 2023 Compliance Guarantee:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Passwords are cryptographically salted and hashed by Firebase Authentication.</li>
                    <li>No plain personal data or credentials are persisted in browser cookies or client storage.</li>
                    <li>AI inference payloads strip personal identifiers prior to strategic evaluation.</li>
                  </ul>
                </div>

                <div className="text-slate-700">
                  <span className="font-semibold">Registered User Email:</span> {profile?.contactEmail || user?.email || 'N/A'}
                </div>
                <div className="text-slate-700">
                  <span className="font-semibold">Organization / Agency:</span> {profile?.organizationName || 'N/A'}
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <div className="font-bold text-rose-700 mb-1">Right to Erasure (Account Deletion):</div>
                  <p className="text-slate-500 mb-3">
                    In accordance with India’s Digital Personal Data Protection Act, you may irrevocably erase your account record, credentials, and associated telemetry.
                  </p>
                  
                  {deleteSuccess ? (
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-sm font-semibold text-center">
                      ✓ Account and personal data successfully erased. Redirecting to home...
                    </div>
                  ) : (
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-sm transition-colors cursor-pointer text-center"
                    >
                      {isDeleting ? 'Erasing User Profile Data...' : 'Permanently Delete Account & Erase Personal Data'}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-4 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <GovernmentFooter />
      <SimulationToast />
    </div>
  );
}
