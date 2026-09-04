'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Shield,
  FileText,
  Lock,
  Link as LinkIcon,
  AlertTriangle,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { ActiveView } from '@/lib/types';

interface CompliancePagesProps {
  pageType: 'privacy' | 'terms' | 'copyright' | 'hyperlink' | 'disclaimer' | 'accessibility';
}

export default function CompliancePages({ pageType }: CompliancePagesProps) {
  const { setActiveView } = useApp();

  const renderContent = () => {
    switch (pageType) {
      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
                <Lock className="w-4 h-4" />
                <span>Statutory Compliance • DPDP Act 2023</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Privacy Policy</h1>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Compliance ID: DPDP-GOI-2026-SETU • Last Revised: 04 September 2026
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 text-slate-700">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">1. Commitment to Data Protection</h3>
                <p>
                  SangamSetu is operated by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, Government of India. We are committed to protecting the privacy of all registered startups, government procurement officers, testing lab evaluators, and public citizens in strict accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">2. Categories of Information Collected</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Startup Entity Data:</strong> DPIIT recognition numbers, PAN, GSTIN, registered incorporation address, authorized signatory credentials, and technical solution proposals.</li>
                  <li><strong>Government Officer Data:</strong> Official @gov.in / @nic.in email credentials, ministry designation, and challenge authorization tokens.</li>
                  <li><strong>Audit & Security Logs:</strong> Digital IP addresses, timestamped blockchain hashes of evaluation inputs, and cryptographically verified transaction trails.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">3. Purpose of Processing</h3>
                <p>
                  Personal and organizational data is processed solely for verifying startup credentials, computing multi-criteria AI innovation scores, coordinating physical lab prototype benchmarking, releasing milestone-based PFMS payments, and maintaining statutory audit trails required under General Financial Rules (GFR 2017). Data is never sold, rented, or commercialized.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">4. Data Sovereignty & Hosting</h3>
                <p>
                  All server infrastructure, database repositories, and cryptographic keys are hosted exclusively within MeitY-empaneled Tier-IV Cloud Data Centers physically located within the sovereign borders of the Republic of India.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">5. Data Protection Officer (DPO) Contact</h3>
                <p>
                  For inquiries regarding data erasure, consent withdrawal, or grievance redressal under DPDP Act 2023:
                  <br />
                  <strong>Data Protection Officer, DPIIT</strong>
                  <br />
                  Vanijya Bhawan, 16 Akbar Road, New Delhi - 110011
                  <br />
                  Email: <code>dpo-sangamsetu@gov.in</code>
                </p>
              </section>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4" />
                <span>Statutory Agreement</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Terms & Conditions of Service</h1>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Policy Ref: GFR-149-SETU-TOS • Last Revised: 04 September 2026
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 text-slate-700">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">1. Acceptance of Terms</h3>
                <p>
                  By accessing or utilizing the SangamSetu National Innovation Procurement Portal, participating entities agree to be bound by these Terms and Conditions, all applicable Union Government procurement directives, and the General Financial Rules (GFR 2017).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">2. Eligibility & DPIIT Recognition</h3>
                <p>
                  Only startups holding a valid, unrevoked DPIIT Recognition Certificate issued under the Startup India initiative are eligible to submit solutions. Misrepresentation or submission of fraudulent credentials constitutes an offense punishable under the Bharatiya Nyaya Sanhita (BNS) and results in permanent debarment across all Central Government procurement.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">3. Proposal Submission & Confidentiality</h3>
                <p>
                  All technical proposals must be original work. By submitting, startups declare they possess all necessary intellectual property rights. All evaluation committee members, technical experts, and testing lab personnel are bound by statutory Non-Disclosure Agreements.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">4. Dispute Jurisdiction</h3>
                <p>
                  Any dispute, controversy, or claim arising out of or relating to challenges, evaluation scores, or milestone contracts shall be settled under the Arbitration and Conciliation Act, 1996, with seat and venue exclusively in New Delhi, India.
                </p>
              </section>
            </div>
          </div>
        );

      case 'copyright':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
                <Shield className="w-4 h-4" />
                <span>Intellectual Property Governance</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Copyright & Content Policy</h1>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Gazette Copyright Protocol • Last Revised: 04 September 2026
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 text-slate-700">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">1. Portal Content & Government Emblems</h3>
                <p>
                  The material featured on this portal (including logos, state emblems, challenge formulations, official circulars, and scoring documentation) is protected under the Copyright Act, 1957. The National Emblem of India is protected under the State Emblem of India (Prohibition of Improper Use) Act, 2005 and may not be reproduced without explicit statutory sanction.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">2. Startup Proprietary Intellectual Property</h3>
                <p>
                  All technical architectures, patentable claims, algorithmic formulations, and source code submitted by participating startups remain the sole and exclusive intellectual property of the respective startup. Government departments do not acquire proprietary copyright ownership by virtue of reviewing proposals.
                </p>
              </section>
            </div>
          </div>
        );

      case 'hyperlink':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
                <LinkIcon className="w-4 h-4" />
                <span>GIGW 3.0 Mandatory Standard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Hyperlinking Policy</h1>
              <p className="text-xs text-slate-500 font-mono mt-1">
                GIGW Compliance Ref: HYP-2026 • Last Revised: 04 September 2026
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 text-slate-700">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">1. Links to External Government & State Portals</h3>
                <p>
                  At several points throughout SangamSetu, direct links are provided to external government websites (e.g., GeM, Startup India, Digital India, PFMS, CPGRAMS). These links are provided solely for user convenience. DPIIT is not responsible for the contents and reliability of external websites and does not necessarily endorse the views expressed within them.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">2. Linking to SangamSetu from Third-Party Websites</h3>
                <p>
                  Prior formal permission is not required to direct hyperlinks to the SangamSetu homepage. However, we do not permit our pages to be loaded into frames on your site. The pages of this portal must load into a newly opened browser window or tab of the user.
                </p>
              </section>
            </div>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Official Notice</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Official Disclaimer</h1>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Legal Notice Ref: DSC-2026-GOI • Last Revised: 04 September 2026
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 text-slate-700">
              <section className="space-y-2">
                <p>
                  Though all efforts have been made to ensure the accuracy and currency of the content on this portal, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department for Promotion of Industry and Internal Trade (DPIIT) and/or other source(s), and to obtain appropriate professional advice.
                </p>
                <p>
                  Under no circumstances will DPIIT or the Government of India be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this portal.
                </p>
              </section>
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-sangam-blue-600 font-bold uppercase tracking-wider mb-1">
                <Eye className="w-4 h-4" />
                <span>Accessibility Mandate • GIGW 3.0</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Accessibility Statement</h1>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Standards: WCAG 2.1 Level AA & GIGW 3.0 • Last Certified: 04 September 2026
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 text-slate-700">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">1. Commitment to Universal Access</h3>
                <p>
                  SangamSetu is designed to be fully accessible to all citizens, including individuals with visual, hearing, motor, or cognitive disabilities. The portal strictly conforms to the <strong>Guidelines for Indian Government Websites (GIGW 3.0)</strong> and the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">2. Built-in Accessibility Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Text Sizing:</strong> Real-time on-page font magnification controls (A-, A, A+) in the header utility bar.</li>
                  <li><strong>Color Contrast:</strong> Minimum 4.5:1 contrast ratio across all text and interactive UI elements.</li>
                  <li><strong>Keyboard Navigation:</strong> Full focus indicators (<code>focus-visible:ring</code>) allowing comprehensive tab-key navigation without a mouse.</li>
                  <li><strong>Screen Reader Support:</strong> Standard ARIA attributes, semantic landmark regions, and descriptive alt text on all vector marks.</li>
                  <li><strong>Bilingual Parity:</strong> Seamless switching between English and Noto Sans Devanagari (Hindi) scripts.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">3. Accessibility Feedback & Assistance</h3>
                <p>
                  If you encounter any accessibility barrier while accessing this portal, please report it to our accessibility officer:
                  <br />
                  Email: <code>accessibility@sangamsetu.gov.in</code>
                </p>
              </section>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8 max-w-4xl mx-auto shadow-2xs">
        {renderContent()}

        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>Published under the authority of Ministry of Commerce & Industry, GoI</div>
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sangam-blue-600 font-bold hover:underline cursor-pointer"
          >
            ← Return to National Portal Home
          </button>
        </div>
      </div>
    </div>
  );
}
