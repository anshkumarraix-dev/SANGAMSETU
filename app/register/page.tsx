'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import {
  Shield,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Building,
  Briefcase,
  Landmark,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  FileText,
  User,
  MapPin,
  Eye,
  EyeOff,
} from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'startup' | 'government' | 'testing_org'>('startup');

  // Common fields
  const [organizationName, setOrganizationName] = useState('');
  const [orgId, setOrgId] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Role-specific fields
  // Startup specific
  const [cinNumber, setCinNumber] = useState('');
  const [startupSector, setStartupSector] = useState('AI & Machine Learning');
  const [registeredState, setRegisteredState] = useState('New Delhi');

  // Government specific
  const [ministryName, setMinistryName] = useState('Ministry of Commerce & Industry');
  const [officerDesignation, setOfficerDesignation] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  // Testing Lab specific
  const [labCategory, setLabCategory] = useState('STQC Cyber & Code Auditing');
  const [accreditationStandard, setAccreditationStandard] = useState('ISO/IEC 17025');
  const [labCity, setLabCity] = useState('');

  // Terms agreement
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Dynamic CAPTCHA
  const [captchaNum1, setCaptchaNum1] = useState(() => Math.floor(Math.random() * 20) + 5);
  const [captchaNum2, setCaptchaNum2] = useState(() => Math.floor(Math.random() * 20) + 3);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [regAttempts, setRegAttempts] = useState<number[]>([]);
  const [isLockedOut, setIsLockedOut] = useState(false);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 20) + 5;
    const n2 = Math.floor(Math.random() * 20) + 3;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting: Max 5 registration attempts per 5 minutes
    const now = Date.now();
    const recentAttempts = regAttempts.filter((t) => now - t < 300000);
    if (recentAttempts.length >= 5) {
      setIsLockedOut(true);
      setError('Registration attempt limit exceeded. Please wait 5 minutes before trying again.');
      setTimeout(() => {
        setIsLockedOut(false);
        setRegAttempts([]);
        setError(null);
      }, 300000);
      return;
    }

    setRegAttempts([...recentAttempts, now]);
    setError(null);

    // Validation checks
    if (!orgId || !orgId.match(/^[a-zA-Z0-9\-_]+$/)) {
      setError('Invalid Organization ID format. Please use alphanumeric characters, dashes, or underscores.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    if (!termsAgreed) {
      setError('You must agree to the Terms of Service and Privacy Policy to register.');
      return;
    }

    const expectedCaptcha = captchaNum1 + captchaNum2;
    if (parseInt(captchaInput.trim(), 10) !== expectedCaptcha) {
      setCaptchaError(true);
      setError('Incorrect CAPTCHA verification answer. Please calculate again.');
      generateCaptcha();
      return;
    }

    setLoading(true);

    try {
      // Use pseudo-email for Firebase Auth since the platform strictly uses Gov/Org IDs
      const pseudoEmail = `${orgId.toLowerCase()}@${role}.sangamsetu.internal`;

      const userCredential = await createUserWithEmailAndPassword(auth, pseudoEmail, password);

      const userData: Record<string, any> = {
        email: pseudoEmail,
        contactEmail: contactEmail,
        orgId: orgId.toUpperCase(),
        role: role,
        organizationName: organizationName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isApproved: false, // Requires nodal admin approval
      };

      // Attach role-specific metadata
      if (role === 'startup') {
        userData.cinNumber = cinNumber.toUpperCase();
        userData.sector = startupSector;
        userData.registeredState = registeredState;
      } else if (role === 'government') {
        userData.ministryName = ministryName;
        userData.officerDesignation = officerDesignation;
        userData.employeeId = employeeId.toUpperCase();
      } else if (role === 'testing_org') {
        userData.labCategory = labCategory;
        userData.accreditationStandard = accreditationStandard;
        userData.labCity = labCity;
      }

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);

      // Sign out since account requires approval
      await auth.signOut();

      setSuccess(true);
    } catch (err: any) {
      // Sanitized: Log generic failure notice without emitting raw user credentials or full error dumps
      console.error('[AUTH] User registration request failed');
      if (err?.code === 'auth/email-already-in-use') {
        setError('This Organization ID is already registered on the SangamSetu portal.');
      } else {
        setError('Failed to register account. Please verify input data and network connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden text-center p-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Registration Application Submitted</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your registration as a <strong>{role.toUpperCase()}</strong> entity with ID <strong>{orgId.toUpperCase()}</strong> has been submitted for statutory verification.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-sm p-3 text-xs text-slate-700 text-left space-y-1">
            <p><span className="font-bold">Organization:</span> {organizationName}</p>
            <p><span className="font-bold">Contact Email:</span> {contactEmail}</p>
            <p><span className="font-bold">Status:</span> <span className="text-amber-600 font-semibold">Pending DPIIT / Nodal Verification</span></p>
          </div>
          <p className="text-xs text-slate-500">
            You will receive an activation confirmation at <span className="font-semibold">{contactEmail}</span> within 24 working hours once verified against the official statutory register.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex justify-center items-center py-2.5 px-6 rounded-sm shadow-sm text-xs font-bold text-white bg-sangam-blue-600 hover:bg-sangam-blue-700 transition-colors"
            >
              Proceed to Portal Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-md shadow-xs border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex flex-col items-center text-center">
          <Shield className="w-10 h-10 text-sangam-saffron-400 mb-2" />
          <h1 className="text-2xl font-black tracking-tight">SangamSetu Entity Registration</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-md">
            Statutory onboarding for DPIIT Startups, Government Buyers, and Empanelled Testing Labs
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 bg-red-50 text-red-700 border border-red-200 rounded-sm text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* 1. Role Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Select Entity Category <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setRole('startup')}
                  className={`py-3 px-2 border text-xs font-bold rounded-sm flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    role === 'startup'
                      ? 'bg-sangam-blue-50 border-sangam-blue-600 text-sangam-blue-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>DPIIT Startup</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('government')}
                  className={`py-3 px-2 border text-xs font-bold rounded-sm flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    role === 'government'
                      ? 'bg-sangam-blue-50 border-sangam-blue-600 text-sangam-blue-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Landmark className="w-5 h-5" />
                  <span>Government Ministry</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('testing_org')}
                  className={`py-3 px-2 border text-xs font-bold rounded-sm flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    role === 'testing_org'
                      ? 'bg-sangam-blue-50 border-sangam-blue-600 text-sangam-blue-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Testing Org / Lab</span>
                </button>
              </div>
            </div>

            {/* 2. Common Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="orgId">
                  {role === 'startup' && 'DPIIT Recognition Number *'}
                  {role === 'government' && 'Udyam / Department ID *'}
                  {role === 'testing_org' && 'STQC / NABL Empanelment ID *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {role === 'startup' ? <Building className="h-4 w-4 text-slate-400" /> : role === 'government' ? <Landmark className="h-4 w-4 text-slate-400" /> : <ShieldCheck className="h-4 w-4 text-slate-400" />}
                  </div>
                  <input
                    id="orgId"
                    type="text"
                    required
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value.toUpperCase())}
                    className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500 uppercase font-mono"
                    placeholder={role === 'startup' ? 'DIPP12345' : role === 'government' ? 'UDYAM-GOV-01' : 'STQC-LAB-99'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="organization">
                  {role === 'startup' && 'Startup Entity Name (as per DPIIT) *'}
                  {role === 'government' && 'Department / Ministry Name *'}
                  {role === 'testing_org' && 'Laboratory / Testing Entity Name *'}
                </label>
                <input
                  id="organization"
                  type="text"
                  required
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="block w-full px-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500"
                  placeholder="Official registered name"
                />
              </div>
            </div>

            {/* 3. Role-Specific Dynamic Fields */}
            {role === 'startup' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
                <span className="text-[11px] font-bold text-sangam-blue-700 uppercase tracking-wider block">
                  Startup Entity Particulars (GFR 161(iv) Verification)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="cin">
                      CIN / LLPIN Number
                    </label>
                    <input
                      id="cin"
                      type="text"
                      value={cinNumber}
                      onChange={(e) => setCinNumber(e.target.value.toUpperCase())}
                      placeholder="U72900DL2021PTC123456"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="sector">
                      Technology Domain
                    </label>
                    <select
                      id="sector"
                      value={startupSector}
                      onChange={(e) => setStartupSector(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm bg-white"
                    >
                      <option>AI & Machine Learning</option>
                      <option>IoT, Sensors & Hardware</option>
                      <option>Drones & Autonomous Systems</option>
                      <option>CleanTech & Jal Shakti</option>
                      <option>HealthTech & Medical Devices</option>
                      <option>Cybersecurity & Defense</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="state">
                      Registered State
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={registeredState}
                      onChange={(e) => setRegisteredState(e.target.value)}
                      placeholder="e.g. Karnataka / Delhi"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {role === 'government' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
                <span className="text-[11px] font-bold text-sangam-blue-700 uppercase tracking-wider block">
                  Government Procuring Officer Credentials
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="ministry">
                      Union / State Ministry
                    </label>
                    <input
                      id="ministry"
                      type="text"
                      value={ministryName}
                      onChange={(e) => setMinistryName(e.target.value)}
                      placeholder="e.g. Ministry of Road Transport"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="designation">
                      Officer Designation *
                    </label>
                    <input
                      id="designation"
                      type="text"
                      required
                      value={officerDesignation}
                      onChange={(e) => setOfficerDesignation(e.target.value)}
                      placeholder="e.g. Director / Procurement Officer"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="empId">
                      Employee ID / PPO *
                    </label>
                    <input
                      id="empId"
                      type="text"
                      required
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                      placeholder="e.g. GOV-EMP-4491"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm uppercase font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {role === 'testing_org' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
                <span className="text-[11px] font-bold text-sangam-blue-700 uppercase tracking-wider block">
                  Testing Facility & Accreditation Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="labCat">
                      Primary Lab Category
                    </label>
                    <select
                      id="labCat"
                      value={labCategory}
                      onChange={(e) => setLabCategory(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm bg-white"
                    >
                      <option>STQC Cyber & Code Auditing</option>
                      <option>NABL Electronics & EMI/EMC</option>
                      <option>AI Model Benchmark & Stress Lab</option>
                      <option>Drones & Hardware Testing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="standard">
                      Accreditation Standard
                    </label>
                    <input
                      id="standard"
                      type="text"
                      value={accreditationStandard}
                      onChange={(e) => setAccreditationStandard(e.target.value)}
                      placeholder="ISO/IEC 17025"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="labCity">
                      Facility City / Location *
                    </label>
                    <input
                      id="labCity"
                      type="text"
                      required
                      value={labCity}
                      onChange={(e) => setLabCity(e.target.value)}
                      placeholder="e.g. Bengaluru / Hyderabad"
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Contact Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="email">
                Official Contact Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500"
                  placeholder={role === 'government' ? 'officer.name@gov.in' : 'contact@entity.in'}
                />
              </div>
            </div>

            {/* 5. Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="password">
                  Create Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-9 pr-9 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500"
                    placeholder="Min 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="confirmPassword">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block w-full pl-9 pr-3 py-2 text-xs border rounded-sm focus:outline-none focus:ring-1 ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-red-300 focus:ring-red-500 bg-red-50/30'
                        : 'border-slate-300 focus:ring-sangam-blue-500'
                    }`}
                    placeholder="Re-type password"
                  />
                </div>
              </div>
            </div>

            {/* 6. Dynamic Government CAPTCHA */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Security Verification (CAPTCHA) <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-slate-800 text-amber-300 font-mono font-black text-sm tracking-widest rounded-xs border border-slate-700 select-none">
                  {captchaNum1} + {captchaNum2} = ?
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-2 border border-slate-300 rounded-xs text-slate-600 hover:bg-slate-200 transition-colors"
                  title="Refresh CAPTCHA"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  required
                  value={captchaInput}
                  onChange={(e) => {
                    setCaptchaInput(e.target.value);
                    setCaptchaError(false);
                  }}
                  placeholder="Answer"
                  className={`w-28 px-3 py-2 text-xs border rounded-xs font-mono font-bold focus:outline-none focus:ring-1 ${
                    captchaError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-sangam-blue-500'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Please enter the mathematical sum to verify human submission.
              </p>
            </div>

            {/* 7. Mandatory Terms and Privacy Policy Consent */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-sangam-blue-600 border-slate-300 rounded focus:ring-sangam-blue-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-700 leading-snug cursor-pointer">
                I hereby declare that all information submitted is true to the best of my knowledge, and I agree to the{' '}
                <Link href="/legal/terms" target="_blank" className="font-bold text-sangam-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy-policy" target="_blank" className="font-bold text-sangam-blue-600 hover:underline">
                  Privacy Policy
                </Link>{' '}
                under General Financial Rules 2017.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isLockedOut}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-sm shadow-sm text-xs font-bold text-white bg-sangam-blue-600 hover:bg-sangam-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sangam-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Submitting Statutory Registration...</span>
                </>
              ) : isLockedOut ? (
                'Registration Throttled (5m)'
              ) : (
                'Submit Entity Registration'
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">
              Already registered?{' '}
              <Link href="/login" className="font-bold text-sangam-blue-600 hover:underline">
                Login Here
              </Link>
            </span>
            <Link href="/" className="text-slate-500 hover:text-slate-800 underline">
              Return to Homepage
            </Link>
          </div>

          {/* Feature B: Demo User Option */}
          <div className="mt-5 pt-4 border-t border-dashed border-slate-300 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-md space-y-3 text-center">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-sangam-blue-700 bg-sangam-blue-100 px-2 py-0.5 rounded-xs">
                Interactive Multi-Persona Demo
              </span>
              <h3 className="text-xs font-bold text-slate-800">
                Exploring for a hackathon or demo? Continue as Demo User
              </h3>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Skip registration to test all 5 roles (Public, Startup, Ministry, STQC Evaluator & SuperAdmin) with live AI scoring and stage pipeline.
              </p>
            </div>
            <Link
              href="/simulation?persona=public"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-sangam-navy-900 hover:bg-slate-800 text-white font-black text-xs shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Launch Demo Mode (Persona Switcher)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
