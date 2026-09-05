'use client';

import React from 'react';
import MainNavbar from '@/components/layout/MainNavbar';
import GovernmentFooter from '@/components/layout/GovernmentFooter';
import { FileText, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" id="copyright-page">
      <MainNavbar activeTab="copyright" />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Legal & Policies</span>
            <span>/</span>
            <span className="text-slate-300">Copyright Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <FileText className="w-7 h-7 text-sangam-saffron-400" />
            <span>Government Copyright Policy & Open Data License</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Copyright ownership, re-use permissions for government challenge specifications, and Open Data licensing norms.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-8 space-y-6" id="main-content">
        <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Material Ownership</h2>
            <p>
              Material featured on this portal (including procurement guidelines, statutory circulars, evaluation matrices, and public problem statements) may be reproduced free of charge in any format or media without requiring specific prior permission, subject to the material being reproduced accurately and not being used in a derogatory manner or in a misleading context.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Source Attribution</h2>
            <p>
              Where the material is being published or issued to others, the source must be prominently acknowledged as <strong>&quot;SangamSetu Portal, DPIIT, Ministry of Commerce & Industry, Government of India&quot;</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Third-Party & Startup Proprietary Material</h2>
            <p>
              The permission to reproduce this material does not extend to any material on this site which is identified as being the intellectual property of a third party, registered startup applicant, or accredited testing laboratory. Authorization to reproduce such material must be obtained directly from the respective copyright holders.
            </p>
          </section>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
}
