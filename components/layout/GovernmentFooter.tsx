'use client';

import React from 'react';
import SangamSetuLogo from '@/components/brand/SangamSetuLogo';
import { GovernmentEmblem, PartnerLogosBar } from '@/components/brand/GovernmentEmblem';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, FileText, Scale, HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ActiveView } from '@/lib/types';

export default function GovernmentFooter() {
  const { setActiveView } = useApp();

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              <GovernmentEmblem color="white" className="h-10 w-auto" />
              <div className="text-[11px] text-slate-300">
                <p className="font-bold text-white">Department for Promotion of Industry and Internal Trade (DPIIT)</p>
                <p className="text-slate-400">Ministry of Commerce & Industry</p>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Pathways */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Platform Pathways
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('challenges')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Browse Active Challenges</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('workflow')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>9-Step Procurement Workflow</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('success-stories')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Pilot Success Stories & GeM Integration</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guidelines')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Standard Procurement Templates</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('circulars')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Official Circulars & Gazette Orders</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance, RTI & Compliance */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Governance & RTI
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('rti')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Right to Information (RTI Act 2005)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('grievance')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Public Grievances (CPGRAMS)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guidelines')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>GFR 2017 Startup Exemption Norms</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Frequently Asked Questions (FAQ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('sitemap')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span>Complete Portal Sitemap</span>
                </button>
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

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap gap-3 text-slate-300">
            <button onClick={() => handleNav('privacy')} className="hover:text-white cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('terms')} className="hover:text-white cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => handleNav('copyright')} className="hover:text-white cursor-pointer">
              Copyright Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('hyperlink')} className="hover:text-white cursor-pointer">
              Hyperlinking Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('disclaimer')} className="hover:text-white cursor-pointer">
              Disclaimer
            </button>
            <span>•</span>
            <button onClick={() => handleNav('accessibility')} className="hover:text-white cursor-pointer">
              Accessibility Statement (GIGW 3.0)
            </button>
            <span>•</span>
            <button onClick={() => handleNav('sitemap')} className="hover:text-white cursor-pointer">
              Sitemap
            </button>
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
