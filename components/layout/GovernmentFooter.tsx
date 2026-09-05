'use client';

import React from 'react';
import SangamSetuLogo from '@/components/brand/SangamSetuLogo';
import { GovernmentEmblem, PartnerLogosBar } from '@/components/brand/GovernmentEmblem';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, FileText, Scale, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function GovernmentFooter() {
  return (
    <footer className="bg-sangam-navy-900 text-white border-t-4 border-sangam-saffron-500 select-none">
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Government Identity & Portal Mission */}
          <div className="space-y-4">
            <SangamSetuLogo variant="white" size="md" />
            <p className="text-xs text-slate-300 leading-relaxed">
              SangamSetu (संगमसेतु) is the official Government of India innovation procurement portal connecting Central & State Ministries with DPIIT-recognized startups for transparent, AI-driven problem solving and scale-up deployment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img
                src="/images/emblem-india.svg"
                alt="State Emblem of India"
                className="h-12 w-auto object-contain drop-shadow-sm bg-white/10 p-1 rounded-sm border border-white/20"
                referrerPolicy="no-referrer"
              />
              <div className="text-[11px] text-slate-300">
                <p className="font-bold text-white">Department for Promotion of Industry and Internal Trade (DPIIT)</p>
                <p className="text-slate-400">Ministry of Commerce & Industry • Govt. of India</p>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Pathways — Real <a> / <Link> anchors */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Platform Pathways
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/challenges"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Browse Active Challenges</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/9-step-workflow"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>9-Step Procurement Workflow</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pilot-outcomes"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Pilot Success Stories & GeM Integration</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Standard Procurement Templates</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/circulars"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Official Circulars & Gazette Orders</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance, RTI & Compliance — Real <a> / <Link> anchors */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Governance & RTI
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/governance/rti"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Right to Information (RTI Act 2005)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/governance/cpgrams"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Public Grievances (CPGRAMS)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/governance/startup-exemptions"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>GFR 2017 Startup Exemption Norms</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Frequently Asked Questions (FAQ)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Complete Portal Sitemap</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Helpdesk & National Support */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              National Helpdesk
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Toll-Free Helpline</p>
                  <p>1800-115-565 (Mon-Sat, 9:00 AM - 6:00 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Email Support</p>
                  <p>support@sangamsetu.gov.in / helpdesk-dpiit@gov.in</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">DPIIT Central Secretariat</p>
                  <p className="text-slate-400">Vanijya Bhawan, 16 Akbar Road, New Delhi - 110011</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Partner Logostrip */}
        <div className="border-t border-white/10 pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <PartnerLogosBar />
          <div className="flex items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> STQC & MeitY Certified
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium">NIC Cloud Hosted</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar — Real <a> / <Link> anchors */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap gap-3 text-slate-300">
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/legal/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/legal/copyright" className="hover:text-white transition-colors">
              Copyright Policy
            </Link>
            <span>•</span>
            <Link href="/legal/hyperlinking" className="hover:text-white transition-colors">
              Hyperlinking Policy
            </Link>
            <span>•</span>
            <Link href="/legal/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/legal/accessibility" className="hover:text-white transition-colors">
              Accessibility Statement (GIGW 3.0)
            </Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} SangamSetu Portal, DPIIT, Government of India.</p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Content owned, updated and maintained by Department for Promotion of Industry and Internal Trade. Last Updated: 04 September 2026.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
