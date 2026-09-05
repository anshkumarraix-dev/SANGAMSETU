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
  const { user, profile, signOut } = useAuth();
  const { role, setRole, setActiveView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      <MainNavbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 py-6 sm:py-8 w-full">
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
      </main>

      <GovernmentFooter />
      <SimulationToast />
    </div>
  );
}
