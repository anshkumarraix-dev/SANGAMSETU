'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, LogOut, Shield, Building2, Landmark, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sangam-blue-600" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-sangam-saffron-400" />
            <h1 className="text-xl font-bold text-slate-900">SangamSetu Workspace</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:inline">
              Welcome, <span className="font-bold text-slate-900">{profile.organizationName}</span>
            </span>
            <div className="flex flex-col text-right">
              <span className="text-[10px] px-2 py-0.5 bg-sangam-blue-50 text-sangam-blue-700 border border-sangam-blue-200 rounded-sm font-bold uppercase tracking-wider mb-0.5 inline-block self-end">
                {profile.role}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">{profile.orgId}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-sm transition-colors border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm mb-6 flex items-start gap-4">
           {profile.role === 'startup' && <Building2 className="w-12 h-12 text-slate-300 shrink-0" />}
           {profile.role === 'government' && <Landmark className="w-12 h-12 text-slate-300 shrink-0" />}
           {profile.role === 'testing_org' && <ShieldCheck className="w-12 h-12 text-slate-300 shrink-0" />}
           <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {profile.organizationName} Dashboard
              </h2>
              <p className="text-slate-600 mt-1">
                This is your secure, role-based workspace. From here, you can access features specific to your role.
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.role === 'government' && (
            <>
              <DashboardCard title="Post Challenge" description="Draft and publish new problem statements." />
              <DashboardCard title="View Solutions" description="Review and shortlist submitted proposals." />
              <DashboardCard title="Monitor Pilots" description="Track the progress of ongoing deployments." />
            </>
          )}
          
          {profile.role === 'startup' && (
            <>
              <DashboardCard title="Browse Challenges" description="Find problems matching your tech stack." />
              <DashboardCard title="My Proposals" description="Track the status of your submitted solutions." />
              <DashboardCard title="Active Pilots" description="Manage milestones and request payments." />
            </>
          )}
          
          {profile.role === 'testing_org' && (
            <>
              <DashboardCard title="Assigned Prototypes" description="View prototypes pending evaluation." />
              <DashboardCard title="Submit Reports" description="Upload final testing reports and scores." />
            </>
          )}

          {profile.role === 'admin' && (
            <>
              <DashboardCard title="User Management" description="Approve or suspend platform users." />
              <DashboardCard title="Challenge Moderation" description="Review challenges before publication." />
              <DashboardCard title="Platform Analytics" description="View system-wide performance metrics." />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function DashboardCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-5 hover:border-sangam-blue-300 hover:shadow-md transition-all cursor-pointer group">
      <h3 className="font-bold text-lg text-slate-900 group-hover:text-sangam-blue-700 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
