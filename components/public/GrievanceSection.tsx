'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  Send,
  Search,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';

export default function GrievanceSection() {
  const [activeTab, setActiveTab] = useState<'SUBMIT' | 'TRACK' | 'NODAL'>('SUBMIT');

  // Grievance Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startupDpiit, setStartupDpiit] = useState('');
  const [category, setCategory] = useState('PROPOSAL_EVALUATION');
  const [challengeRef, setChallengeRef] = useState('');
  const [description, setDescription] = useState('');
  const [submittedRegId, setSubmittedRegId] = useState<string | null>(null);

  // Tracking State
  const [trackRegId, setTrackRegId] = useState('');
  const [trackedStatus, setTrackedStatus] = useState<{
    regId: string;
    date: string;
    category: string;
    status: string;
    remarks: string;
    nodalOfficer: string;
  } | null>(null);

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !description) {
      alert('Please fill in all mandatory fields.');
      return;
    }
    const newRegId = `DPIIT/GRV/2026/${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRegId(newRegId);
  };

  const handleTrackGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRegId.trim()) {
      alert('Please enter a valid Grievance Registration Number.');
      return;
    }
    setTrackedStatus({
      regId: trackRegId.toUpperCase(),
      date: '29 August 2026',
      category: 'Milestone Payment Verification Delay',
      status: 'UNDER_INQUIRY',
      remarks: 'Forwarded to Accounts Division for PFMS sanction clearance. Expected resolution by 08 September 2026.',
      nodalOfficer: 'Shri Amitabh Kant, Nodal Grievance Officer, DPIIT',
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>Public Grievance Redressal Mechanism • CPGRAMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Grievance Lodging, Escalation & Dispute Resolution
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Official institutional portal for resolving startup grievances, technical evaluation queries, milestone disbursement issues, and administrative concerns under DPIIT time-bound resolution guidelines (SLA: 15 Working Days).
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 rounded-sm p-3 shrink-0">
            <div>Portal Code: CPGRAMS-SETU</div>
            <div className="text-slate-700 font-bold mt-0.5">Last Updated: 04 September 2026</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-md px-4 pt-3 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('SUBMIT')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'SUBMIT'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Lodge New Grievance
        </button>
        <button
          onClick={() => setActiveTab('TRACK')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'TRACK'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Track Grievance Status
        </button>
        <button
          onClick={() => setActiveTab('NODAL')}
          className={`pb-3 px-4 text-xs font-bold transition-colors cursor-pointer border-b-2 shrink-0 ${
            activeTab === 'NODAL'
              ? 'border-sangam-blue-600 text-sangam-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Public Grievance Officers & Escalation Matrix
        </button>
      </div>

      {/* Tab 1: Submit Form */}
      {activeTab === 'SUBMIT' && (
        <div className="bg-white border border-slate-200 rounded-md p-6">
          {submittedRegId ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-md text-center max-w-xl mx-auto space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">Grievance Registered Successfully</h3>
              <p className="text-xs text-emerald-800">
                Your grievance has been logged into the National CPGRAMS repository. An SMS and email acknowledgment have been dispatched to your registered contact.
              </p>
              <div className="p-3 bg-white border border-emerald-300 rounded-sm font-mono text-sm font-bold text-slate-900">
                Registration No: {submittedRegId}
              </div>
              <p className="text-[11px] text-emerald-700">
                Resolution Officer: Designated Public Grievance Officer, DPIIT. Expected resolution within 15 working days.
              </p>
              <button
                onClick={() => {
                  setSubmittedRegId(null);
                  setFullName('');
                  setDescription('');
                }}
                className="mt-2 px-4 py-2 bg-sangam-blue-600 text-white rounded-sm text-xs font-bold hover:bg-sangam-blue-700 transition-colors"
              >
                Submit Another Grievance
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitGrievance} className="space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Complainant Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikramaditya Sen"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-sangam-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. founder@startup.in"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-sangam-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (for SMS Alerts) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-sangam-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    DPIIT Startup Recognition No. (if applicable)
                  </label>
                  <input
                    type="text"
                    value={startupDpiit}
                    onChange={(e) => setStartupDpiit(e.target.value)}
                    placeholder="e.g. DIPP-98214"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-sangam-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Grievance Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm bg-white font-medium focus:outline-none focus:border-sangam-blue-600"
                  >
                    <option value="PROPOSAL_EVALUATION">AI Evaluation / Scoring Clarification</option>
                    <option value="PAYMENT_DELAY">Milestone Payment / DBT Delay</option>
                    <option value="TESTING_LAB">STQC Testing Lab Audit Query</option>
                    <option value="TECHNICAL_PORTAL">Portal Bug / Technical Submission Error</option>
                    <option value="OTHER">Administrative / General Grievance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Related Challenge ID or Proposal ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={challengeRef}
                    onChange={(e) => setChallengeRef(e.target.value)}
                    placeholder="e.g. CH-2026-001 or PROP-8410"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-sangam-blue-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Description of Grievance <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide precise details, dates, transaction references, or specific clauses in question..."
                  className="w-full p-3 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-sangam-blue-600"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Protected under Central Grievance Redressal Guidelines (DARPG).
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold rounded-sm text-xs cursor-pointer transition-colors shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Official Grievance</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Track */}
      {activeTab === 'TRACK' && (
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <form onSubmit={handleTrackGrievance} className="max-w-xl space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Enter Grievance Registration Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={trackRegId}
                onChange={(e) => setTrackRegId(e.target.value)}
                placeholder="e.g. DPIIT/GRV/2026/894120"
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-sm font-mono uppercase focus:outline-none focus:border-sangam-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white font-bold text-xs rounded-sm transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track Status</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500">
              Registration numbers are 16-character alphanumeric identifiers sent via SMS upon submission.
            </div>
          </form>

          {trackedStatus && (
            <div className="border border-slate-200 rounded-sm p-5 bg-slate-50 space-y-3 max-w-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-mono text-xs font-bold text-slate-900">{trackedStatus.regId}</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-sm border border-amber-300">
                  {trackedStatus.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Registered On:</span>
                  <p className="font-bold text-slate-900">{trackedStatus.date}</p>
                </div>
                <div>
                  <span className="text-slate-500">Category:</span>
                  <p className="font-bold text-slate-900">{trackedStatus.category}</p>
                </div>
              </div>
              <div className="text-xs">
                <span className="text-slate-500">Current Action / Remarks:</span>
                <p className="font-medium text-slate-800 mt-0.5">{trackedStatus.remarks}</p>
              </div>
              <div className="text-xs border-t border-slate-200 pt-2 text-slate-600">
                Assigned Officer: <span className="font-bold text-slate-900">{trackedStatus.nodalOfficer}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Nodal Officers */}
      {activeTab === 'NODAL' && (
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Public Grievance Officers & Escalation Matrix</h3>
            <p className="text-xs text-slate-600 mt-1">
              If your grievance remains unaddressed past 15 working days, direct escalations may be forwarded to the designated Nodal Authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <span className="text-[10px] font-bold text-sangam-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-sm">
                Level 1: Nodal Grievance Officer
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1.5">Dr. Harshvardhan Saxena</h4>
              <p className="text-slate-600">Director of Innovation Redressal, DPIIT</p>
              <div className="mt-3 space-y-1 text-slate-700">
                <div>Email: grievance-nodal@sangamsetu.gov.in</div>
                <div>Phone: +91-11-2306-3912</div>
                <div>Office: Vanijya Bhawan, 16 Akbar Road, New Delhi</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-sm p-4 bg-slate-50">
              <span className="text-[10px] font-bold text-rose-600 uppercase bg-rose-50 px-2 py-0.5 rounded-sm">
                Level 2: Directorate of Public Grievances (DPG), Cabinet Secretariat
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-1.5">Appellate Grievance Commission</h4>
              <p className="text-slate-600">Cabinet Secretariat, Government of India</p>
              <div className="mt-3 space-y-1 text-slate-700">
                <div>Portal: pgportal.gov.in (CPGRAMS)</div>
                <div>Toll Free Helpline: 1800-11-4000</div>
                <div>Office: Rashtrapati Bhawan, New Delhi - 110004</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
