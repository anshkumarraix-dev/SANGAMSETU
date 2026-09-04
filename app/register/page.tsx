'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Shield, Mail, Lock, Loader2, AlertCircle, Building, Briefcase, Landmark, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'startup' | 'government' | 'testing_org'>('startup');
  const [organizationName, setOrganizationName] = useState('');
  const [orgId, setOrgId] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!orgId || !orgId.match(/^[a-zA-Z0-9\-_]+$/)) {
        throw new Error("Invalid Organization ID format.");
      }

      // We use a pseudo-email for Firebase Auth since the platform strictly uses Gov/Org IDs
      const pseudoEmail = `${orgId.toLowerCase()}@${role}.sangamsetu.internal`;
      
      const userCredential = await createUserWithEmailAndPassword(auth, pseudoEmail, password);
      
      const userData = {
        email: pseudoEmail,
        contactEmail: contactEmail,
        orgId: orgId.toUpperCase(),
        role: role,
        organizationName: organizationName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isApproved: false, // Requires admin approval
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      
      // We don't automatically log them in since they require approval
      await auth.signOut();
      
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This Organization ID is already registered.');
      } else {
        setError(err.message || 'Failed to register account.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden text-center p-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful</h2>
          <p className="text-slate-600 mb-6">
            Your account has been created and is pending administrator approval. You will receive an email at <span className="font-semibold">{contactEmail}</span> once your {role} account is verified.
          </p>
          <Link 
            href="/login"
            className="inline-flex justify-center items-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-bold text-white bg-sangam-blue-600 hover:bg-sangam-blue-700 transition-colors"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex flex-col items-center">
          <Shield className="w-12 h-12 text-sangam-saffron-400 mb-3" />
          <h1 className="text-2xl font-bold">Register on SangamSetu</h1>
          <p className="text-sm opacity-80 mt-1">Multi-Role Access Portal</p>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-sm text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('startup')}
                  className={`py-2 px-1 border text-xs font-bold rounded-sm flex flex-col items-center justify-center gap-1 transition-colors ${role === 'startup' ? 'bg-sangam-blue-50 border-sangam-blue-500 text-sangam-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Briefcase className="w-4 h-4" />
                  Startup
                </button>
                <button
                  type="button"
                  onClick={() => setRole('government')}
                  className={`py-2 px-1 border text-xs font-bold rounded-sm flex flex-col items-center justify-center gap-1 transition-colors ${role === 'government' ? 'bg-sangam-blue-50 border-sangam-blue-500 text-sangam-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Landmark className="w-4 h-4" />
                  Government
                </button>
                <button
                  type="button"
                  onClick={() => setRole('testing_org')}
                  className={`py-2 px-1 border text-xs font-bold rounded-sm flex flex-col items-center justify-center gap-1 transition-colors ${role === 'testing_org' ? 'bg-sangam-blue-50 border-sangam-blue-500 text-sangam-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Testing Org
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="orgId">
                {role === 'government' ? 'Udyam / Department ID' : role === 'startup' ? 'DPIIT Recognition Number' : 'Govt Empanelment Number'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {role === 'government' ? <Landmark className="h-4 w-4 text-slate-400" /> : role === 'startup' ? <Building className="h-4 w-4 text-slate-400" /> : <ShieldCheck className="h-4 w-4 text-slate-400" />}
                </div>
                <input
                  id="orgId"
                  type="text"
                  required
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value.toUpperCase())}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500 focus:border-sangam-blue-500 sm:text-sm transition-colors uppercase"
                  placeholder={role === 'startup' ? 'KA1234567890' : role === 'government' ? 'UDYAM-KA-12-1234567' : 'STQC-2023-12345'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="organization">
                {role === 'government' ? 'Department / Ministry Name' : role === 'startup' ? 'Startup Name (As per DPIIT)' : 'Organization Name'}
              </label>
              <div className="relative">
                <input
                  id="organization"
                  type="text"
                  required
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500 focus:border-sangam-blue-500 sm:text-sm transition-colors"
                  placeholder="Official Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
                Contact Email Address
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
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500 focus:border-sangam-blue-500 sm:text-sm transition-colors"
                  placeholder="Official Email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">
                Create Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-sangam-blue-500 focus:border-sangam-blue-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Must be at least 8 characters long.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-bold text-white bg-sangam-blue-600 hover:bg-sangam-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sangam-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Submit Registration'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Already have an account? </span>
            <Link href="/login" className="font-bold text-sangam-blue-600 hover:text-sangam-blue-500 hover:underline">
              Login Here
            </Link>
          </div>
          
          <div className="mt-4 text-center">
             <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 underline">
               Back to Home
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
