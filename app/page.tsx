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
import QuickSimulationModal from '@/components/simulation/QuickSimulationModal';
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
            {/* Return to Public Portal Bar */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <button
                onClick={() => {
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sangam-navy-900 hover:text-sangam-blue-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Public Portal</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Viewing Workspace as:</span>
                <span className="px-3 py-1 rounded-sm text-xs font-bold bg-sangam-navy-900 text-white flex items-center gap-1.5">
                  {role === 'STARTUP' && <Rocket className="w-3.5 h-3.5 text-amber-400" />}
                  {role === 'GOVERNMENT' && <Building2 className="w-3.5 h-3.5 text-blue-300" />}
                  {(role === 'TESTING_ORG' || role === 'TESTING_LAB') && <FlaskConical className="w-3.5 h-3.5 text-cyan-300" />}
                  {role === 'ADMIN' && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                  <span>
                    {role === 'STARTUP' && 'DPIIT Startup'}
                    {role === 'GOVERNMENT' && 'Ministry Procurement Officer'}
                    {(role === 'TESTING_ORG' || role === 'TESTING_LAB') && 'Empanelled STQC Lab'}
                    {role === 'ADMIN' && 'DPIIT Oversight Admin'}
                  </span>
                </span>
              </div>
            </div>

            {/* Role-Specific Dashboard Renderer */}
            {role === 'STARTUP' && (
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

      {/* Quick Simulation Modal & Notification Toasts */}
      <QuickSimulationModal />
      <SimulationToast />
    </div>
  );
}
