'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Shield, Lock, Loader2, AlertCircle, Building2, Landmark, ShieldCheck, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'startup' | 'government' | 'testing_org'>('startup');
  const [orgId, setOrgId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (!orgId) {
        throw new Error("Organization ID is required.");
      }

      const pseudoEmail = `${orgId.toLowerCase()}@${userType}.sangamsetu.internal`;
      const userCredential = await signInWithEmailAndPassword(auth, pseudoEmail, password);
      
      // Fetch user role
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (!userData.isApproved && userData.role !== 'admin') {
          setError('Your account is pending admin approval. Please wait for verification.');
          await auth.signOut();
        } else if (userData.role !== userType && userData.role !== 'admin') {
           setError('Invalid role mismatch. Please select the correct login tab.');
           await auth.signOut();
        } else {
          setSuccess('Login successful! Redirecting...');
          router.push('/dashboard');
        }
      } else {
        setError('User profile not found. Please contact support.');
        await auth.signOut();
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
         setError('Invalid credentials. Please check your ID and password.');
      } else {
         setError(err.message || 'Failed to sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sangam-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-sangam-blue-700" />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-sangam-navy-800">SangamSetu</h1>
              <p className="text-sm text-slate-600">Innovation Procurement Platform</p>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-sangam-navy-800 mb-2">Login to Your Account</h2>
          <p className="text-slate-600 text-sm">Use your government-verified ID to login</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg border border-sangam-blue-200 p-6">
          {/* User Type Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setUserType('startup')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-1 text-sm font-semibold rounded-md transition-all ${userType === 'startup' ? 'bg-white text-sangam-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Startup</span>
            </button>
            <button
              onClick={() => setUserType('government')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-1 text-sm font-semibold rounded-md transition-all ${userType === 'government' ? 'bg-white text-sangam-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Landmark className="w-4 h-4" />
              <span className="hidden sm:inline">Government</span>
            </button>
            <button
              onClick={() => setUserType('testing_org')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-1 text-sm font-semibold rounded-md transition-all ${userType === 'testing_org' ? 'bg-white text-sangam-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Testing Org</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Organization ID Input */}
            <div className="space-y-1.5">
              <label htmlFor="orgId" className="block text-sm font-semibold text-slate-700">
                {userType === 'startup' && 'DPIIT Recognition Number'}
                {userType === 'government' && 'Udyam / Department ID'}
                {userType === 'testing_org' && 'Government Empanelment Number'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {userType === 'startup' && <Building2 className="w-4 h-4 text-slate-400" />}
                  {userType === 'government' && <Landmark className="w-4 h-4 text-slate-400" />}
                  {userType === 'testing_org' && <ShieldCheck className="w-4 h-4 text-slate-400" />}
                </div>
                <input
                  id="orgId"
                  type="text"
                  placeholder={
                    userType === 'startup' ? 'KA1234567890' :
                    userType === 'government' ? 'UDYAM-KA-12-1234567' :
                    'STQC-2023-12345'
                  }
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value.toUpperCase())}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangam-blue-500 focus:border-transparent sm:text-sm transition-colors uppercase"
                  required
                />
              </div>
              <p className="text-xs text-slate-500">
                {userType === 'startup' && 'Enter your DPIIT recognition number'}
                {userType === 'government' && 'Enter your Udyam or Department ID'}
                {userType === 'testing_org' && 'Enter your government empanelment number'}
              </p>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangam-blue-500 focus:border-transparent sm:text-sm transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 text-sangam-blue-600 border-slate-300 rounded focus:ring-sangam-blue-500" />
                <label htmlFor="remember" className="text-sm text-slate-600">Remember me</label>
              </div>
              <Link href="#" className="text-sm text-sangam-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-sangam-blue-600 hover:bg-sangam-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sangam-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging In...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-800">
              {userType === 'startup' && 'Login using your DPIIT-verified organization ID'}
              {userType === 'government' && 'Login using your government department ID'}
              {userType === 'testing_org' && 'Login using your government empanelment ID'}
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Don&apos;t have an account?</span>
            </div>
          </div>

          {/* Register Button */}
          <Link
            href="/register"
            className="w-full flex justify-center items-center py-2.5 px-4 border-2 border-sangam-blue-600 rounded-md shadow-sm text-sm font-bold text-sangam-blue-600 hover:bg-sangam-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sangam-blue-500 transition-colors"
          >
            Register New Account
          </Link>
          
          {/* Help Link */}
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-sangam-blue-600 underline">
              Back to Home
            </Link>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p className="flex items-center justify-center gap-2 mb-2">
            🔒 Government-Verified IDs Only | 🛡️ SSL Encrypted | ✅ 2FA Mandatory
          </p>
          <p>For support, call 1800-123-4567 or email support@sangamsetu.gov.in</p>
        </div>
      </div>
    </div>
  );
}
