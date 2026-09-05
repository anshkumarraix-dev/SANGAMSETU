'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Challenge } from '@/lib/types';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import HeroSection from '@/components/public/HeroSection';
import WorkflowSection from '@/components/public/WorkflowSection';
import ProblemBrowser from '@/components/public/ProblemBrowser';
import SuccessStories from '@/components/public/SuccessStories';
import GuidelinesSection from '@/components/public/GuidelinesSection';
import CircularsSection from '@/components/public/CircularsSection';
import RTISection from '@/components/public/RTISection';
import GrievanceSection from '@/components/public/GrievanceSection';
import FaqSection from '@/components/public/FaqSection';
import SitemapSection from '@/components/public/SitemapSection';
import CompliancePages from '@/components/public/CompliancePages';
import PlatformShowcase from '@/components/public/PlatformShowcase';
import StartupDashboard from '@/components/dashboard/StartupDashboard';
import GovernmentDashboard from '@/components/dashboard/GovernmentDashboard';
import TestingLabDashboard from '@/components/dashboard/TestingLabDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import SimulationToast from '@/components/simulation/SimulationToast';
import { Rocket, Building2, FlaskConical, Shield, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const { role, setRole, activeView, setActiveView } = useApp();
  const [preselectedChallengeForApply, setPreselectedChallengeForApply] = useState<Challenge | null>(null);

  const handleExploreProblems = () => {
    setActiveView('challenges');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostProblem = () => {
    setRole('GOVERNMENT');
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterStartup = () => {
    setRole('STARTUP');
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyForChallenge = (challenge: Challenge) => {
    setPreselectedChallengeForApply(challenge);
    setRole('STARTUP');
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-amber-400 selection:text-slate-950">
      {/* Main Navigation Bar with Persona Switcher */}
      <MainNavbar />

      {/* 3. Main Body Content Switcher */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div>
            {/* Hero Section with Live Metrics */}
            <HeroSection
              onExploreProblems={handleExploreProblems}
              onPostProblem={handlePostProblem}
              onRegisterStartup={handleRegisterStartup}
            />

            {/* Platform Promotional Showcase */}
            <PlatformShowcase />
          </div>
        )}

        {(activeView === 'challenges' || activeView === 'problems') && (
          <div className="py-4">
            <ProblemBrowser onApplyForChallenge={handleApplyForChallenge} />
          </div>
        )}

        {activeView === 'workflow' && (
          <div className="py-4">
            <WorkflowSection />
          </div>
        )}

        {activeView === 'success-stories' && (
          <div className="py-4">
            <SuccessStories />
          </div>
        )}

        {activeView === 'guidelines' && (
          <div className="py-4">
            <GuidelinesSection />
          </div>
        )}

        {activeView === 'circulars' && (
          <div className="py-4">
            <CircularsSection />
          </div>
        )}

        {activeView === 'rti' && (
          <div className="py-4">
            <RTISection />
          </div>
        )}

        {activeView === 'grievance' && (
          <div className="py-4">
            <GrievanceSection />
          </div>
        )}

        {activeView === 'faq' && (
          <div className="py-4">
            <FaqSection />
          </div>
        )}

        {activeView === 'sitemap' && (
          <div className="py-4">
            <SitemapSection />
          </div>
        )}

        {(activeView === 'privacy' ||
          activeView === 'terms' ||
          activeView === 'copyright' ||
          activeView === 'hyperlink' ||
          activeView === 'disclaimer' ||
          activeView === 'accessibility') && (
          <div className="py-4">
            <CompliancePages pageType={activeView} />
          </div>
        )}

        {activeView === 'dashboard' && (
          <div className="max-w-[1440px] mx-auto px-4 py-8">
            {/* Top Bar: Return Link & Role Switcher Tabs */}
            <div className="bg-white border border-slate-200 rounded-md p-4 mb-6 shadow-2xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveView('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sangam-navy-900 hover:text-sangam-blue-600 transition-colors cursor-pointer py-1 px-2 rounded-sm hover:bg-slate-100"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Public Portal</span>
                  </button>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <div className="text-xs font-semibold text-slate-500 hidden sm:block">
                    Procurement Lifecycle Roles:
                  </div>
                </div>

                {/* 4 Interactive Persona Tabs */}
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

            {/* Role-Specific Dashboard Renderer */}
            {(role === 'STARTUP' || role === 'PUBLIC') && (
              <StartupDashboard preselectedChallenge={preselectedChallengeForApply} />
            )}
            {role === 'GOVERNMENT' && <GovernmentDashboard />}
            {(role === 'TESTING_ORG' || role === 'TESTING_LAB') && <TestingLabDashboard />}
            {role === 'ADMIN' && <AdminDashboard />}
          </div>
        )}
      </main>

      {/* 4. Official Government Footer */}
      <GovernmentFooter />

      {/* System Notification Toasts */}
      <SimulationToast />
    </div>
  );
}
