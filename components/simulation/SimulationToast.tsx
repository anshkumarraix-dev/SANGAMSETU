'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, X, CheckCircle2, Info } from 'lucide-react';

export default function SimulationToast() {
  const { simulationToast, dismissSimulationToast } = useApp();

  useEffect(() => {
    if (simulationToast?.show) {
      const timer = setTimeout(() => {
        dismissSimulationToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [simulationToast, dismissSimulationToast]);

  if (!simulationToast || !simulationToast.show) return null;

  const isSuccess = simulationToast.type === 'success';

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[90] max-w-md w-full animate-in slide-in-from-bottom-5 duration-300"
    >
      <div
        className={`p-4 rounded-lg border shadow-xl flex items-start gap-3 ${
          isSuccess
            ? 'bg-slate-900 border-amber-500/50 text-white'
            : 'bg-slate-900 border-slate-700 text-white'
        }`}
      >
        <div
          className={`p-1.5 rounded-md shrink-0 ${
            isSuccess ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
          }`}
        >
          {isSuccess ? <Sparkles className="w-5 h-5" /> : <Info className="w-5 h-5" />}
        </div>
        <div className="flex-1 pr-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-0.5">
            SangamSetu System Notification
          </p>
          <p className="text-xs text-slate-200 leading-relaxed">{simulationToast.message}</p>
        </div>
        <button
          onClick={dismissSimulationToast}
          className="text-slate-400 hover:text-white p-1 rounded-xs transition-colors shrink-0 cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
