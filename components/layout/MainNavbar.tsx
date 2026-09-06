'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import SangamSetuLogo from '@/components/brand/SangamSetuLogo';
import Link from 'next/link';
import {
  Bell,
  Search,
  Menu,
  X,
  Building2,
  Rocket,
  FlaskConical,
  ShieldAlert,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  Shield,
  FileText,
  HelpCircle,
  Globe,
  Sparkles,
  Scale,
} from 'lucide-react';
import { UserRole, ActiveView } from '@/lib/types';

interface MainNavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function MainNavbar({ activeTab: propActiveTab }: MainNavbarProps = {}) {
  const {
    role,
    setRole,
    currentUser,
    notifications,
    markNotificationRead,
    language,
    setLanguage,
    activeView,
    setActiveView,
  } = useApp();
  const { user, profile } = useAuth();
  const activeTab = propActiveTab || activeView;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  
  // Accessibility states
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);

  React.useEffect(() => {
    // Apply accessibility font size directly to root html so REM units scale proportionally
    const root = document.documentElement;
    if (textSize === 'large') {
      root.style.fontSize = '18px';
    } else if (textSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }

    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [textSize, highContrast]);

  const unreadNotifs = notifications.filter((n) => !n.read);

  const handleMissionControlClick = () => {
    setRole('ADMIN');
    setActiveView('dashboard');
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Consolidated Government Utility & GIGW 3.0 Accessibility Bar */}
      <div className="bg-slate-900 text-white text-[10px] md:text-xs py-1.5 px-4 z-[60] relative border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          {/* Left: Skip to content + National identity */}
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <a
              href="#main-content"
              className="hover:text-amber-300 focus:outline-none focus:ring-1 focus:ring-white transition-colors underline-offset-2 hover:underline"
            >
              {language === 'en' ? 'Skip to Main Content' : 'मुख्य सामग्री पर जाएं'}
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 font-semibold">
              <span>Government of India</span>
            </div>
            <span className="text-slate-600 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300 text-[10px]">
              <span>Department for Promotion of Industry and Internal Trade (DPIIT) • Ministry of Commerce & Industry</span>
            </div>
          </div>

          {/* Right: Accessibility Controls & Language */}
          <div className="flex items-center gap-2 md:gap-3 ml-auto">
            {/* Text Size Controls (A-, A, A+) */}
            <div className="flex items-center gap-0.5 border border-slate-700 rounded-sm overflow-hidden bg-slate-800/80">
              <button
                onClick={() => setTextSize('normal')}
                className={`px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                  textSize === 'normal' ? 'bg-sangam-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
                }`}
                title="Default Text Size"
              >
                A-
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                  textSize === 'large' ? 'bg-sangam-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
                }`}
                title="Large Text Size (+15%)"
              >
                A
              </button>
              <button
                onClick={() => setTextSize('xlarge')}
                className={`px-2 py-0.5 font-bold transition-colors cursor-pointer ${
                  textSize === 'xlarge' ? 'bg-sangam-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
                }`}
                title="Extra Large Text Size (+25%)"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`px-2 py-0.5 rounded-sm border text-[10px] font-bold transition-colors cursor-pointer ${
                highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
              title="Toggle High Contrast Mode"
            >
              {highContrast ? 'Normal Contrast' : 'High Contrast'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs select-none">
        <div className="max-w-[1440px] mx-auto px-4 py-2 sm:py-2.5">
          <div className="flex items-center justify-between gap-2 lg:gap-6">
            {/* Left: Official Brand Identity */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <SangamSetuLogo variant="icon" size="sm" />
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base sm:text-xl font-black tracking-tight text-sangam-navy-900 font-serif">
                      SANGAM<span className="text-sangam-saffron-500">SETU</span>
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-sangam-blue-700 tracking-wide">
                      Portal
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-700 font-semibold tracking-tight">
                    National Startup Innovation Procurement Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Primary Desktop Navigation Links — Real <a> / <Link> anchors */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-bold">
              {/* 1. Home */}
              <Link
                href="/"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  activeTab === 'home' || activeTab === ''
                    ? 'bg-sangam-blue-50 text-sangam-blue-600 border border-sangam-blue-200'
                    : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
                }`}
              >
                {language === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
              </Link>

              {/* 2. Challenges / Browse Problems */}
              <Link
                href="/challenges"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  activeTab === 'problems' || activeTab === 'challenges'
                    ? 'bg-sangam-blue-50 text-sangam-blue-600 border border-sangam-blue-200'
                    : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
                }`}
              >
                {language === 'en' ? 'Challenges' : 'समस्याएं'}
              </Link>

              {/* 3. 9-Step Workflow */}
              <Link
                href="/9-step-workflow"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  activeTab === 'workflow'
                    ? 'bg-sangam-blue-50 text-sangam-blue-600 border border-sangam-blue-200'
                    : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
                }`}
              >
                {language === 'en' ? '9-Step Workflow' : '9-चरणीय प्रक्रिया'}
              </Link>

              {/* 4. Pilot Outcomes / Success Stories */}
              <Link
                href="/pilot-outcomes"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  activeTab === 'success-stories'
                    ? 'bg-sangam-blue-50 text-sangam-blue-600 border border-sangam-blue-200'
                    : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
                }`}
              >
                {language === 'en' ? 'Pilot Outcomes' : 'पायलट परिणाम'}
              </Link>

              {/* 5. Guidelines */}
              <Link
                href="/guidelines"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  activeTab === 'guidelines'
                    ? 'bg-sangam-blue-50 text-sangam-blue-600 border border-sangam-blue-200'
                    : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
                }`}
              >
                {language === 'en' ? 'Guidelines' : 'दिशानिर्देश'}
              </Link>

              {/* 6. Circulars */}
              <Link
                href="/circulars"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  activeTab === 'circulars'
                    ? 'bg-sangam-blue-50 text-sangam-blue-600 border border-sangam-blue-200'
                    : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
                }`}
              >
                {language === 'en' ? 'Circulars' : 'परिपत्र'}
              </Link>

              {/* 7. Evaluation Simulation */}
              <Link
                href="/simulation"
                className={`px-2.5 py-1.5 rounded-sm transition-colors flex items-center gap-1.5 ${
                  activeTab === 'simulation'
                    ? 'bg-sangam-blue-50 text-sangam-blue-600 border border-sangam-blue-200'
                    : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-sangam-blue-600" />
                <span>{language === 'en' ? 'Evaluation Simulation' : 'मूल्यांकन सिमुलेशन'}</span>
              </Link>

              {/* 8. Portal Dashboard */}
              <Link
                href="/dashboard"
                className={`px-2.5 py-1.5 rounded-sm transition-colors ${
                  activeTab === 'dashboard' && role !== 'ADMIN'
                    ? 'bg-sangam-blue-50 text-sangam-blue-600 border border-sangam-blue-200'
                    : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
                }`}
              >
                {language === 'en' ? 'Portal Dashboard' : 'पोर्टल डैशबोर्ड'}
              </Link>

              {/* 9. DPIIT Mission Control */}
              <Link
                href="/dashboard"
                onClick={handleMissionControlClick}
                className={`px-2.5 py-1.5 rounded-sm transition-colors flex items-center gap-1 ${
                  activeTab === 'dashboard' && role === 'ADMIN'
                    ? 'bg-sangam-navy-900 text-white font-black'
                    : 'text-sangam-navy-900 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'en' ? 'DPIIT Mission Control' : 'डीपीआईआईटी मिशन नियंत्रण'}</span>
              </Link>
            </div>

            {/* Right: Language, Auth & Notifications */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Quick Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-slate-300 hover:border-sangam-blue-500 bg-slate-50 hover:bg-white text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                title="Toggle Hindi / English"
              >
                <Globe className="w-3.5 h-3.5 text-sangam-blue-600" />
                <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
              </button>

              {/* Authentication / Dashboard */}
              {!user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3 py-1.5 rounded-sm border border-slate-300 hover:border-sangam-blue-500 bg-slate-50 hover:bg-white text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Login' : 'लॉग इन'}
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-1.5 rounded-sm bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Register' : 'पंजीकरण'}
                  </Link>
                </div>
              ) : (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-sangam-blue-300 hover:border-sangam-blue-500 bg-sangam-blue-50 text-xs font-bold text-sangam-blue-700 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {profile ? profile.organizationName : 'Workspace'}
                  </span>
                  <span className="sm:hidden">Workspace</span>
                </Link>
              )}

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-sm border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                      {unreadNotifs.length}
                    </span>
                  )}
                </button>

                {/* Notification Box */}
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-md shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                      <span className="text-xs font-bold text-slate-800">
                        Notifications & Alerts ({notifications.length})
                      </span>
                      <span className="text-[10px] text-sangam-blue-600 font-semibold">Government Telemetry</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 text-left transition-colors cursor-pointer hover:bg-slate-50 ${
                            !n.read ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900">{n.title}</span>
                            {!n.read && (
                              <span className="w-2 h-2 rounded-full bg-sangam-blue-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1.5 block font-mono">
                            {new Date(n.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-sm border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer — Real <a> / <Link> anchors */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-200 space-y-1 text-xs font-bold">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-sm ${activeTab === 'home' ? 'bg-sangam-blue-50 text-sangam-blue-600 font-black' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {language === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
              </Link>
              <Link
                href="/challenges"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-sm ${activeTab === 'problems' || activeTab === 'challenges' ? 'bg-sangam-blue-50 text-sangam-blue-600 font-black' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {language === 'en' ? 'Challenges' : 'समस्याएं'}
              </Link>
              <Link
                href="/9-step-workflow"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-sm ${activeTab === 'workflow' ? 'bg-sangam-blue-50 text-sangam-blue-600 font-black' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {language === 'en' ? '9-Step Workflow' : '9-चरणीय प्रक्रिया'}
              </Link>
              <Link
                href="/pilot-outcomes"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-sm ${activeTab === 'success-stories' ? 'bg-sangam-blue-50 text-sangam-blue-600 font-black' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {language === 'en' ? 'Pilot Outcomes' : 'पायलट परिणाम'}
              </Link>
              <Link
                href="/guidelines"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-sm ${activeTab === 'guidelines' ? 'bg-sangam-blue-50 text-sangam-blue-600 font-black' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {language === 'en' ? 'Guidelines' : 'दिशानिर्देश'}
              </Link>
              <Link
                href="/circulars"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-sm ${activeTab === 'circulars' ? 'bg-sangam-blue-50 text-sangam-blue-600 font-black' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {language === 'en' ? 'Circulars' : 'परिपत्र'}
              </Link>
              <Link
                href="/simulation"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-sm ${activeTab === 'simulation' ? 'bg-sangam-blue-50 text-sangam-blue-600 font-black' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {language === 'en' ? 'Evaluation Simulation' : 'मूल्यांकन सिमुलेशन'}
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-sm ${activeTab === 'dashboard' && role !== 'ADMIN' ? 'bg-sangam-blue-50 text-sangam-blue-600 font-black' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                {language === 'en' ? 'Portal Dashboard' : 'पोर्टल डैशबोर्ड'}
              </Link>
              <Link
                href="/dashboard"
                onClick={handleMissionControlClick}
                className="w-full text-left px-3 py-2 rounded-sm bg-sangam-navy-900 text-white flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'en' ? 'DPIIT Mission Control' : 'डीपीआईआईटी मिशन नियंत्रण'}</span>
              </Link>
              <div className="pt-2 border-t border-slate-200 mt-2 flex items-center gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-sm border border-slate-300 text-xs font-bold text-slate-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-sm bg-sangam-blue-600 text-white text-xs font-bold"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
