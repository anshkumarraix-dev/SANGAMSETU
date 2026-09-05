'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Layers,
  Building2,
  Award,
  PlusCircle,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function InnovationExchangeNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/innovation-exchange', icon: Compass },
    { label: 'Browse Alternatives', href: '/innovation-exchange/browse', icon: Sparkles },
    { label: 'Gov Challenges', href: '/innovation-exchange/solutions', icon: Building2 },
    { label: 'Success Stories', href: '/innovation-exchange/success-stories', icon: Award },
    {
      label: 'Submit Proposal',
      href: '/dashboard/startup/innovation-exchange/submit',
      icon: PlusCircle,
      highlight: true,
    },
    { label: 'Evaluator Portal', href: '/dashboard/evaluator/innovation-exchange', icon: ShieldCheck },
    { label: 'Dept Oversight', href: '/dashboard/department/innovation-exchange', icon: Layers },
  ];

  return (
    <nav aria-label="Innovation Exchange navigation" className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between overflow-x-auto scrollbar-none py-2 gap-2">
        <div className="flex items-center gap-1 shrink-0">
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded-xs mr-2">
            GFR Rule 149(iv)
          </span>
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-sangam-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {navItems.slice(4).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  item.highlight
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-xs'
                    : isActive
                    ? 'bg-slate-800 text-white font-bold border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
