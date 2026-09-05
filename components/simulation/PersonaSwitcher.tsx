'use client';

import React, { useState } from 'react';
import { SimPersona } from '@/app/simulation/types';
import {
  Eye,
  Rocket,
  Building2,
  UserCheck,
  Shield,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface PersonaSwitcherProps {
  currentPersona: SimPersona;
  onSelectPersona: (persona: SimPersona) => void;
  departmentName?: string;
  isFloating?: boolean;
}

export default function PersonaSwitcher({
  currentPersona,
  onSelectPersona,
  departmentName = 'MoRTH',
  isFloating = false,
}: PersonaSwitcherProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getPillLabel = (persona: SimPersona) => {
    switch (persona) {
      case 'public':
        return 'Public';
      case 'startup':
        return 'DPIIT Verified';
      case 'department':
        return departmentName;
      case 'evaluator':
        return 'Blind Review';
      case 'admin':
        return 'SuperAdmin';
    }
  };

  const personas = [
    {
      id: 'public' as SimPersona,
      name: 'Public Portal',
      icon: Eye,
      badge: 'Visitor',
      colorClass: 'text-blue-600',
      activeBg: 'bg-blue-600 text-white border-blue-600 shadow-xs',
      activeBadgeBg: 'bg-white/20 text-white',
      badgeBg: 'bg-slate-100 text-slate-600',
    },
    {
      id: 'startup' as SimPersona,
      name: 'Startup View',
      icon: Rocket,
      badge: 'DPIIT Verified',
      colorClass: 'text-amber-700',
      activeBg: 'bg-amber-600 text-white border-amber-600 shadow-xs',
      activeBadgeBg: 'bg-white/20 text-white',
      badgeBg: 'bg-slate-100 text-slate-600',
    },
    {
      id: 'department' as SimPersona,
      name: 'Department View',
      icon: Building2,
      badge: departmentName,
      colorClass: 'text-blue-700',
      activeBg: 'bg-sangam-blue-600 text-white border-sangam-blue-600 shadow-xs',
      activeBadgeBg: 'bg-white/20 text-white',
      badgeBg: 'bg-slate-100 text-slate-600',
    },
    {
      id: 'evaluator' as SimPersona,
      name: 'Evaluator View',
      icon: UserCheck,
      badge: 'Blind Review Mode',
      colorClass: 'text-emerald-700',
      activeBg: 'bg-emerald-700 text-white border-emerald-700 shadow-xs',
      activeBadgeBg: 'bg-white/20 text-white',
      badgeBg: 'bg-slate-100 text-slate-600',
    },
    {
      id: 'admin' as SimPersona,
      name: 'Platform Admin',
      icon: Shield,
      badge: 'SuperAdmin',
      colorClass: 'text-slate-900',
      activeBg: 'bg-slate-950 text-white border-slate-950 shadow-xs',
      activeBadgeBg: 'bg-white/20 text-white',
      badgeBg: 'bg-slate-100 text-slate-600',
    },
  ];

  return (
    <div
      className={`rounded-lg overflow-hidden border border-slate-300/80 shadow-md transition-all duration-200 ${
        isFloating
          ? 'w-80 bg-white'
          : 'w-full max-w-xs bg-white'
      }`}
    >
      {/* Dark Navy-to-Blue Gradient Header */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-3 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-full bg-amber-400/20 text-amber-400 shrink-0">
            <RotateCcw className="w-3.5 h-3.5 animate-spin-reverse" />
          </div>
          <span className="text-xs font-black tracking-wider text-white uppercase">
            PERSONA SWITCHER
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs">
            {getPillLabel(currentPersona)}
          </span>
          <button
            type="button"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Toggle persona menu"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body with 5 Rows */}
      {!isCollapsed && (
        <div className="p-3 space-y-2 bg-white">
          <p className="text-[11px] text-slate-500 font-medium px-1">
            Switch view to test role features:
          </p>

          <div className="space-y-1.5">
            {personas.map(p => {
              const Icon = p.icon;
              const isSelected = currentPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPersona(p.id)}
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? p.activeBg
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-white' : p.colorClass
                      }`}
                    />
                    <span className={`truncate ${isSelected ? 'text-white' : p.colorClass}`}>
                      {p.name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected ? p.activeBadgeBg : p.badgeBg
                    }`}
                  >
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
