'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6 text-center">
      <div className="max-w-md bg-white p-6 rounded-xl border border-rose-200 shadow-sm">
        <h2 className="text-xl font-bold text-rose-700 mb-2">Unexpected Portal Error</h2>
        <p className="text-slate-600 text-sm mb-6">
          {error?.message || 'An unexpected error occurred while loading this section.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-sangam-blue-600 hover:bg-sangam-blue-700 text-white rounded-md text-sm font-semibold transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-semibold transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
