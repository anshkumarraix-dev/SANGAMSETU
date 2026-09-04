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
} from 'lucide-react';
import { UserRole, ActiveView } from '@/lib/types';

interface MainNavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function MainNavbar({ activeTab: propActiveTab, setActiveTab: propSetActiveTab }: MainNavbarProps = {}) {
  const { role, setRole, currentUser, notifications, markNotificationRead, language, setLanguage, activeView, setActiveView } = useApp();
  const { user, profile } = useAuth();
  const activeTab = propActiveTab || activeView;
  const setActiveTab = propSetActiveTab || ((tab: string) => setActiveView(tab as ActiveView));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  
  // Accessibility states
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);

  React.useEffect(() => {
    // Apply accessibility classes to document body
    document.body.classList.remove('text-normal', 'text-large', 'text-xlarge', 'high-contrast');
    document.body.classList.add(`text-${textSize}`);
    if (highContrast) {
      document.body.classList.add('high-contrast');
    }
  }, [textSize, highContrast]);

  const unreadNotifs = notifications.filter((n) => !n.read);

  const handleNavClick = (tabKey: ActiveView | string) => {
    setActiveTab(tabKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* GIGW 3.0 Accessibility Top Bar */}
      <div className="bg-slate-900 text-white text-[10px] md:text-xs py-1 px-4 z-[60] relative flex items-center justify-between">
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="#main-content" className="hover:text-sangam-saffron-400 focus:outline-none focus:ring-1 focus:ring-white transition-colors underline-offset-2 hover:underline">
              {language === 'en' ? 'Skip to Main Content' : 'मुख्य सामग्री पर जाएं'}
            </a>
            <div className="hidden sm:flex items-center gap-1.5 opacity-80">
              <Shield className="w-3.5 h-3.5" />
              <span>Government of India</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            {/* Text Size Controls */}
            <div className="flex items-center gap-0.5 border border-slate-700 rounded-sm overflow-hidden">
              <button 
                onClick={() => setTextSize('normal')}
                className={`px-2 py-0.5 font-bold transition-colors ${textSize === 'normal' ? 'bg-sangam-blue-600' : 'hover:bg-slate-800'}`}
                title="Normal Text Size"
              >
                A-
              </button>
              <button 
                onClick={() => setTextSize('large')}
                className={`px-2 py-0.5 font-bold transition-colors ${textSize === 'large' ? 'bg-sangam-blue-600' : 'hover:bg-slate-800'}`}
                title="Large Text Size"
              >
                A
              </button>
              <button 
                onClick={() => setTextSize('xlarge')}
                className={`px-2 py-0.5 font-bold transition-colors ${textSize === 'xlarge' ? 'bg-sangam-blue-600' : 'hover:bg-slate-800'}`}
                title="Extra Large Text Size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`px-2 py-0.5 border font-bold rounded-sm transition-colors ${highContrast ? 'bg-yellow-400 text-black border-yellow-400' : 'border-slate-700 hover:bg-slate-800'}`}
              title="Toggle High Contrast"
            >
              {language === 'en' ? 'High Contrast' : 'उच्च कंट्रास्ट'}
            </button>
            
            {/* Screen Reader Access */}
            <button className="hidden sm:block hover:text-sangam-saffron-400 transition-colors">
              {language === 'en' ? 'Screen Reader Access' : 'स्क्रीन रीडर एक्सेस'}
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex justify-between items-center py-2.5 sm:py-3 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <SangamSetuLogo size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-bold">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-sangam-blue-50 text-sangam-blue-600'
                  : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
              }`}
            >
              {language === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
            </button>

            <button
              onClick={() => handleNavClick('problems')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'problems' || activeTab === 'challenges'
                  ? 'bg-sangam-blue-50 text-sangam-blue-600'
                  : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
              }`}
            >
              {language === 'en' ? 'Challenges' : 'समस्याएं'}
            </button>

            <button
              onClick={() => handleNavClick('workflow')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'workflow'
                  ? 'bg-sangam-blue-50 text-sangam-blue-600'
                  : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
              }`}
            >
              {language === 'en' ? '9-Step Workflow' : 'प्रक्रिया'}
            </button>

            <button
              onClick={() => handleNavClick('success-stories')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'success-stories'
                  ? 'bg-sangam-blue-50 text-sangam-blue-600'
                  : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
              }`}
            >
              {language === 'en' ? 'Pilot Outcomes' : 'सफलता'}
            </button>

            <button
              onClick={() => handleNavClick('guidelines')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'guidelines'
                  ? 'bg-sangam-blue-50 text-sangam-blue-600'
                  : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
              }`}
            >
              {language === 'en' ? 'Guidelines' : 'दिशानिर्देश'}
            </button>

            <button
              onClick={() => handleNavClick('circulars')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'circulars'
                  ? 'bg-sangam-blue-50 text-sangam-blue-600'
                  : 'text-slate-700 hover:text-sangam-blue-600 hover:bg-slate-50'
              }`}
            >
              {language === 'en' ? 'Circulars' : 'परिपत्र'}
            </button>
          </div>

          {/* Right: Role Switcher Dropdown, Language & Notifications */}
          <div className="flex items-center gap-2 sm:gap-2.5">
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-1 text-xs font-bold">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2 rounded-sm text-slate-700 hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('problems')}
              className="w-full text-left px-3 py-2 rounded-sm text-slate-700 hover:bg-slate-100"
            >
              Browse Problems & Challenges
            </button>
            <button
              onClick={() => handleNavClick('workflow')}
              className="w-full text-left px-3 py-2 rounded-sm text-slate-700 hover:bg-slate-100"
            >
              9-Step Procurement Process
            </button>
            <button
              onClick={() => handleNavClick('success-stories')}
              className="w-full text-left px-3 py-2 rounded-sm text-slate-700 hover:bg-slate-100"
            >
              Pilot Success Stories
            </button>
            <button
              onClick={() => handleNavClick('guidelines')}
              className="w-full text-left px-3 py-2 rounded-sm text-slate-700 hover:bg-slate-100"
            >
              Guidelines & Templates
            </button>
            <button
              onClick={() => handleNavClick('circulars')}
              className="w-full text-left px-3 py-2 rounded-sm text-slate-700 hover:bg-slate-100"
            >
              Official Circulars & OMs
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-3 py-2 rounded-sm bg-sangam-blue-600 text-white"
            >
              Open Workspace ({role})
            </button>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
