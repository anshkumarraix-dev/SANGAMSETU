'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth, UserRole as AuthUserRole } from '@/context/AuthContext';
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
  Lock,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Landmark,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  KeyRound,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import StartupDashboard from '@/components/dashboard/StartupDashboard';
import GovernmentDashboard from '@/components/dashboard/GovernmentDashboard';
import TestingLabDashboard from '@/components/dashboard/TestingLabDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import SimulationToast from '@/components/simulation/SimulationToast';
import { GovernmentEmblem } from '@/components/brand/GovernmentEmblem';

export default function DashboardPage() {
  const {
    user,
    profile,
    loading: authLoading,
    signIn,
    signInDemo,
    signUp,
    signOut,
    deleteAccount,
  } = useAuth();
  const { role, setRole, setActiveView } = useApp();

  // Auth Gateway States (When unauthenticated)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<AuthUserRole>('government');
  
  // Sign In Form States
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [demoLoadingRole, setDemoLoadingRole] = useState<AuthUserRole | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Sign Up Form States
  const [signUpOrgName, setSignUpOrgName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpOrgId, setSignUpOrgId] = useState('');
  const [signUpOfficerName, setSignUpOfficerName] = useState('');
  const [signUpDesignation, setSignUpDesignation] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpSector, setSignUpSector] = useState('DeepTech & AI');
  const [signUpTerms, setSignUpTerms] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  // Privacy Modal
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Sync role with profile if authenticated
  React.useEffect(() => {
    if (profile?.role) {
      if (profile.role === 'admin') setRole('ADMIN');
      else if (profile.role === 'government') setRole('GOVERNMENT');
      else if (profile.role === 'startup') setRole('STARTUP');
      else if (profile.role === 'testing_org') setRole('TESTING_ORG');
    }
  }, [profile, setRole]);

  // Handle Instant 1-Click Demo Persona Sign-In
  const handleDemoSignIn = async (roleKey: AuthUserRole) => {
    setDemoLoadingRole(roleKey);
    setAuthError(null);
    setAuthSuccess(null);

    if (roleKey === 'admin') setRole('ADMIN');
    else if (roleKey === 'government') setRole('GOVERNMENT');
    else if (roleKey === 'startup') setRole('STARTUP');
    else if (roleKey === 'testing_org') setRole('TESTING_ORG');

    const res = await signInDemo(roleKey);
    setDemoLoadingRole(null);

    if (res.success) {
      setAuthSuccess(`Institutional authorization granted as ${roleKey.toUpperCase()}. Entering procurement desk...`);
    } else {
      setAuthError(res.error || 'Failed to authenticate official demo session.');
    }
  };

  // Handle Standard Sign-In Submit
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!signInIdentifier.trim()) {
      setAuthError('Please enter your official email or Organization ID.');
      return;
    }

    setSignInLoading(true);

    if (selectedRole === 'admin') setRole('ADMIN');
    else if (selectedRole === 'government') setRole('GOVERNMENT');
    else if (selectedRole === 'startup') setRole('STARTUP');
    else if (selectedRole === 'testing_org') setRole('TESTING_ORG');

    const res = await signIn(signInIdentifier.trim(), signInPassword, selectedRole);
    setSignInLoading(false);

    if (res.success) {
      setAuthSuccess('Credentials verified. Access unlocked.');
    } else {
      setAuthError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  // Handle Sign-Up Submit
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!signUpOrgName.trim()) {
      setAuthError('Organization / Department Name is required.');
      return;
    }
    if (!signUpEmail.trim()) {
      setAuthError('Official email is required.');
      return;
    }
    if (!signUpOrgId.trim()) {
      setAuthError('Organization ID / Registration Number is required.');
      return;
    }
    if (signUpPassword.length < 8) {
      setAuthError('Password must be at least 8 characters long.');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    if (!signUpTerms) {
      setAuthError('You must agree to the Statutory Terms of Service and DPDP Act 2023 Guidelines.');
      return;
    }

    setSignUpLoading(true);

    if (selectedRole === 'admin') setRole('ADMIN');
    else if (selectedRole === 'government') setRole('GOVERNMENT');
    else if (selectedRole === 'startup') setRole('STARTUP');
    else if (selectedRole === 'testing_org') setRole('TESTING_ORG');

    const res = await signUp({
      email: signUpEmail.trim(),
      orgId: signUpOrgId.trim().toUpperCase(),
      role: selectedRole,
      organizationName: signUpOrgName.trim(),
      officerName: signUpOfficerName.trim() || undefined,
      designation: signUpDesignation.trim() || undefined,
      sector: signUpSector,
      password: signUpPassword,
    });

    setSignUpLoading(false);

    if (res.success) {
      setAuthSuccess('Organization registered and verified successfully! Access granted.');
    } else {
      setAuthError(res.error || 'Registration failed. Please check inputs and try again.');
    }
  };

  // Handle Account Erasure (DPDP)
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
        {/* ========================================================================= */}
        {/* 1. AUTHENTICATION LOADING STATE */}
        {/* ========================================================================= */}
        {authLoading && (
          <div className="min-h-[450px] flex flex-col items-center justify-center space-y-4 bg-white rounded-xl border border-slate-200 p-8 shadow-2xs">
            <GovernmentEmblem color="gold" className="h-12 w-auto animate-pulse" />
            <div className="flex items-center gap-2 text-sangam-navy-900 font-bold text-sm">
              <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
              <span>Verifying Statutory Security Token & RBAC Credentials...</span>
            </div>
            <p className="text-xs text-slate-500">Government of India • SangamSetu Secure Gateway</p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. ACCESS RESTRICTED SCREEN (WHEN UNAUTHENTICATED) */}
        {/* ========================================================================= */}
        {!authLoading && !user && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Restricted Banner Notification */}
            <div className="relative bg-sangam-navy-900 text-white rounded-2xl overflow-hidden shadow-md border border-slate-800">
              <Image
                src="/images/banner-auth.jpg"
                alt="Government of India National Gatekeeper Rashtrapati Bhavan Architecture"
                fill
                priority
                className="object-cover object-center opacity-30"
                sizes="(max-width: 1024px) 100vw, 1024px"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 p-6 sm:p-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-sm bg-rose-500/90 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <Lock className="w-3.5 h-3.5" />
                    Restricted Access
                  </span>
                  <span className="px-2.5 py-0.5 rounded-sm bg-amber-400 text-slate-950 text-xs font-bold">
                    GFR 2017 Rule 149 Gateway
                  </span>
                  <span className="px-2.5 py-0.5 rounded-sm bg-slate-800/80 text-slate-200 text-xs font-medium border border-slate-700">
                    DPIIT • MoRTH • MeitY • NIC
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight">
                  National Procurement Desks & Governance Ledger
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                  Access to the <strong>DPIIT Mission Control</strong>, <strong>Ministry Procurement Desks</strong>, <strong>DPIIT Startup Workspaces</strong>, and <strong>STQC Testing Lab Workbenches</strong> requires verified institutional authentication. Please sign in with your official credentials or register your organization.
                </p>
              </div>
            </div>

            {/* Gatekeeper Card with Dual Tabs (Sign In vs Register) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Tab Header */}
              <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthError(null);
                    setAuthSuccess(null);
                  }}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authMode === 'signin'
                      ? 'bg-white text-sangam-navy-900 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <KeyRound className="w-4 h-4 text-sangam-blue-600" />
                  <span>1. Official Sign-In / Persona Access</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError(null);
                    setAuthSuccess(null);
                  }}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authMode === 'signup'
                      ? 'bg-white text-sangam-navy-900 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>2. New Entity Registration (Sign Up)</span>
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Feedback Alerts */}
                {authError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}
                {authSuccess && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                {/* TAB 1: SIGN IN CONTENT */}
                {authMode === 'signin' && (
                  <div className="space-y-6">
                    {/* Persona 1-Click Instant Sign In */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="text-xs font-bold text-sangam-navy-900 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span>Instant Official Persona Access (Evaluator & Reviewer Mode):</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">One-click cryptographically signed login</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {/* 1. DPIIT Admin */}
                        <button
                          type="button"
                          onClick={() => handleDemoSignIn('admin')}
                          disabled={demoLoadingRole !== null || signInLoading}
                          className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all cursor-pointer group shadow-2xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-amber-800">
                              <Shield className="w-4 h-4 text-amber-500" />
                              <span>4. DPIIT Mission Control</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded-sm">
                              Admin Root
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-700">Dr. S. K. Gupta, IAS</div>
                          <div className="text-[11px] text-slate-500">Joint Secretary & Mission Director, DPIIT</div>
                        </button>

                        {/* 2. Ministry Officer */}
                        <button
                          type="button"
                          onClick={() => handleDemoSignIn('government')}
                          disabled={demoLoadingRole !== null || signInLoading}
                          className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/40 text-left transition-all cursor-pointer group shadow-2xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-blue-800">
                              <Landmark className="w-4 h-4 text-blue-600" />
                              <span>2. Ministry Officer Desk</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-900 font-bold rounded-sm">
                              Government
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-700">Dr. Rajesh Verma, IAS</div>
                          <div className="text-[11px] text-slate-500">Chief Engineer, MoRTH / NHAI Innovation</div>
                        </button>

                        {/* 3. Startup */}
                        <button
                          type="button"
                          onClick={() => handleDemoSignIn('startup')}
                          disabled={demoLoadingRole !== null || signInLoading}
                          className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all cursor-pointer group shadow-2xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                              <Rocket className="w-4 h-4 text-emerald-600" />
                              <span>1. DPIIT Startup Workspace</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold rounded-sm">
                              Startup
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-700">Aarav Sharma</div>
                          <div className="text-[11px] text-slate-500">Founder, Navgati Spatial Technologies</div>
                        </button>

                        {/* 4. Testing Lab */}
                        <button
                          type="button"
                          onClick={() => handleDemoSignIn('testing_org')}
                          disabled={demoLoadingRole !== null || signInLoading}
                          className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all cursor-pointer group shadow-2xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-purple-800">
                              <FlaskConical className="w-4 h-4 text-purple-600" />
                              <span>3. Empanelled Testing Lab</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-900 font-bold rounded-sm">
                              Third-Party Lab
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-700">Shri K. S. Sundaram</div>
                          <div className="text-[11px] text-slate-500">Lead Quality Auditor, STQC / MeitY Lab</div>
                        </button>
                      </div>
                    </div>

                    <div className="relative flex py-1 items-center">
                      <div className="grow border-t border-slate-200"></div>
                      <span className="shrink mx-3 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        Or Sign In with Custom Credentials
                      </span>
                      <div className="grow border-t border-slate-200"></div>
                    </div>

                    {/* Standard Sign In Form */}
                    <form onSubmit={handleSignInSubmit} className="space-y-4">
                      {/* Target Role Selector */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Target Procurement Role
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 p-1.5 rounded-lg">
                          <button
                            type="button"
                            onClick={() => setSelectedRole('government')}
                            className={`py-2 px-2 text-center text-xs font-bold rounded-md transition-all cursor-pointer truncate ${
                              selectedRole === 'government'
                                ? 'bg-white text-sangam-navy-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Govt Officer
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedRole('startup')}
                            className={`py-2 px-2 text-center text-xs font-bold rounded-md transition-all cursor-pointer truncate ${
                              selectedRole === 'startup'
                                ? 'bg-white text-sangam-navy-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            DPIIT Startup
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedRole('testing_org')}
                            className={`py-2 px-2 text-center text-xs font-bold rounded-md transition-all cursor-pointer truncate ${
                              selectedRole === 'testing_org'
                                ? 'bg-white text-sangam-navy-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Testing Lab
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedRole('admin')}
                            className={`py-2 px-2 text-center text-xs font-bold rounded-md transition-all cursor-pointer truncate ${
                              selectedRole === 'admin'
                                ? 'bg-white text-sangam-navy-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            DPIIT Admin
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Official Email / Organization ID
                          </label>
                          <input
                            type="text"
                            required
                            value={signInIdentifier}
                            onChange={(e) => setSignInIdentifier(e.target.value)}
                            placeholder={
                              selectedRole === 'government'
                                ? 'r.verma@gov.in or MORTH-ENG'
                                : selectedRole === 'startup'
                                ? 'aarav@startup.gov.in or DPIIT-KA-01'
                                : selectedRole === 'testing_org'
                                ? 'director@stqc.gov.in or STQC-LAB-01'
                                : 'director-dpiit@nic.in'
                            }
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Password / Security Token
                          </label>
                          <div className="relative">
                            <input
                              type={showSignInPassword ? 'text' : 'password'}
                              required
                              value={signInPassword}
                              onChange={(e) => setSignInPassword(e.target.value)}
                              placeholder="••••••••••••"
                              className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignInPassword(!showSignInPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={signInLoading}
                        className="w-full py-3 px-4 rounded-xl bg-sangam-navy-900 hover:bg-sangam-navy-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        {signInLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying Credentials...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-amber-400" />
                            <span>Authenticate & Unlock {selectedRole.toUpperCase()} Dashboard</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 2: SIGN UP / REGISTRATION CONTENT */}
                {authMode === 'signup' && (
                  <form onSubmit={handleSignUpSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Select Organization Category
                      </label>
                      <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setSelectedRole('startup')}
                          className={`py-2 px-2 text-center text-xs font-bold rounded-md transition-all cursor-pointer ${
                            selectedRole === 'startup'
                              ? 'bg-white text-sangam-navy-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          DPIIT Startup
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedRole('government')}
                          className={`py-2 px-2 text-center text-xs font-bold rounded-md transition-all cursor-pointer ${
                            selectedRole === 'government'
                              ? 'bg-white text-sangam-navy-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Govt Ministry / PSU
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedRole('testing_org')}
                          className={`py-2 px-2 text-center text-xs font-bold rounded-md transition-all cursor-pointer ${
                            selectedRole === 'testing_org'
                              ? 'bg-white text-sangam-navy-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          STQC / NABL Lab
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Organization / Ministry / Lab Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={signUpOrgName}
                          onChange={(e) => setSignUpOrgName(e.target.value)}
                          placeholder="e.g., Bharat Quantum AI Solutions Pvt Ltd"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Official Institutional Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="e.g., contact@bharatquantum.in"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          {selectedRole === 'startup' && 'DPIIT Recognition / CIN Number *'}
                          {selectedRole === 'government' && 'Ministry / Department Code *'}
                          {selectedRole === 'testing_org' && 'STQC / NABL Accreditation ID *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={signUpOrgId}
                          onChange={(e) => setSignUpOrgId(e.target.value)}
                          placeholder="e.g., DPIIT-DELHI-2026-9901"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none uppercase font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Primary Domain / Sector
                        </label>
                        <select
                          value={signUpSector}
                          onChange={(e) => setSignUpSector(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none bg-white"
                        >
                          <option value="DeepTech & AI">DeepTech, AI & Automation</option>
                          <option value="Clean Energy & Smart Grid">Clean Energy & Smart Grid</option>
                          <option value="Healthcare & MedTech">Healthcare & MedTech Devices</option>
                          <option value="Defence, Drone & Aerospace">Defence, Drone & Aerospace</option>
                          <option value="Agritech & Water Systems">Agritech & Water Systems</option>
                          <option value="Fintech & Digital Governance">Fintech & Digital Governance</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Officer / Authorized Person Name
                        </label>
                        <input
                          type="text"
                          value={signUpOfficerName}
                          onChange={(e) => setSignUpOfficerName(e.target.value)}
                          placeholder="e.g., Vikramaditya Singh"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Officer Designation
                        </label>
                        <input
                          type="text"
                          value={signUpDesignation}
                          onChange={(e) => setSignUpDesignation(e.target.value)}
                          placeholder="e.g., Chief Technology Officer / Director"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Password (Min 8 characters) *
                        </label>
                        <input
                          type={showSignUpPassword ? 'text' : 'password'}
                          required
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Confirm Password *
                        </label>
                        <input
                          type={showSignUpPassword ? 'text' : 'password'}
                          required
                          value={signUpConfirmPassword}
                          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sangam-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={signUpTerms}
                          onChange={(e) => setSignUpTerms(e.target.checked)}
                          className="w-4 h-4 mt-0.5 text-sangam-blue-600 border-slate-300 rounded focus:ring-sangam-blue-500"
                        />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          I certify that this entity meets statutory DPIIT / GFR 2017 eligibility criteria and agree to the DPDP Act 2023 privacy terms and national security disclosure covenants.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={signUpLoading}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      {signUpLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Registering Institutional Entity...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Register Entity & Open Workspace</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. AUTHENTICATED DASHBOARD VIEW */}
        {/* ========================================================================= */}
        {!authLoading && user && (
          <div className="space-y-6">
            {/* User Session & DPDP Data Privacy Ribbon */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-semibold text-slate-500">Authenticated Session:</span>
                <span className="font-black text-sangam-navy-900 bg-slate-100 px-2.5 py-1 rounded-md">
                  {profile?.organizationName || user.email || 'Government Department'}
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-sangam-blue-50 text-sangam-blue-700 border border-sangam-blue-200 text-[11px] font-bold">
                  Role: {role}
                </span>
                <span className="text-slate-300 hidden md:inline">|</span>
                <span className="text-slate-500 text-[11px] hidden md:inline">
                  DPDP Act 2023 Protected
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition-colors cursor-pointer text-xs"
                >
                  Data Privacy & Rights
                </button>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock & Sign Out</span>
                </button>
              </div>
            </div>

            {/* Top Role Selector & Navigation Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sangam-navy-900 hover:text-sangam-blue-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Public Portal</span>
                  </Link>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <div className="text-xs font-semibold text-slate-500 hidden sm:block">
                    Procurement Desks:
                  </div>
                </div>

                {/* 4 Role Switcher Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                  <button
                    onClick={() => setRole('STARTUP')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
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
          </div>
        )}

        {/* Data Privacy & DPDP Act 2023 Rights Modal */}
        {showPrivacyModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 text-slate-900 space-y-4">
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
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
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
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg font-semibold text-center">
                      ✓ Account and personal data successfully erased. Redirecting to home...
                    </div>
                  ) : (
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors cursor-pointer text-center text-xs"
                    >
                      {isDeleting ? 'Erasing User Profile Data...' : 'Permanently Delete Account & Erase Personal Data'}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
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
