'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, X, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

interface SimulationToastProps {
  message?: string;
  type?: 'success' | 'info' | 'error';
  onDismiss?: () => void;
}

export default function SimulationToast({
  message: propMessage,
  type: propType,
  onDismiss: propOnDismiss,
}: SimulationToastProps = {}) {
  const { simulationToast, dismissSimulationToast } = useApp();

  const activeMessage = propMessage || (simulationToast?.show ? simulationToast.message : null);
  const activeType = propType || simulationToast?.type || 'info';
  const handleDismiss = propOnDismiss || dismissSimulationToast;

  useEffect(() => {
    if (activeMessage) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeMessage, handleDismiss]);

  if (!activeMessage) return null;

  const isSuccess = activeType === 'success';
  const isError = activeType === 'error';

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[90] max-w-md w-full animate-in slide-in-from-bottom-5 duration-300"
    >
      <div
        className={`p-4 rounded-lg border shadow-xl flex items-start gap-3 ${
          isSuccess
            ? 'bg-slate-900 border-emerald-500/50 text-white'
            : isError
            ? 'bg-slate-900 border-rose-500/50 text-white'
            : 'bg-slate-900 border-slate-700 text-white'
        }`}
      >
        <div
          className={`p-1.5 rounded-md shrink-0 ${
            isSuccess
              ? 'bg-emerald-500/20 text-emerald-400'
              : isError
              ? 'bg-rose-500/20 text-rose-400'
              : 'bg-blue-500/20 text-blue-400'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : isError ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 pr-2">
          <p
            className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${
              isSuccess ? 'text-emerald-400' : isError ? 'text-rose-400' : 'text-amber-400'
            }`}
          >
            SangamSetu System Notification
          </p>
          <p className="text-xs text-slate-200 leading-relaxed">{activeMessage}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-xs transition-colors shrink-0 cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
