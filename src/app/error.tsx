"use client";

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050E1A] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-center text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md relative z-10 space-y-6">
        <div className="inline-flex p-4 rounded-full bg-rose-500/10 border border-rose-500/30 mb-2">
          <AlertTriangle className="h-10 w-10 text-rose-500" />
        </div>

        <div className="relative z-10 space-y-3">
          <h2 className="font-serif text-3xl font-bold tracking-wide">
            Concierge Desk Interrupted
          </h2>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm mx-auto font-light">
            An unexpected server issue occurred while preparing your itinerary. Please try reloading the page or contact our guest support.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            onClick={() => reset()}
            className="bg-gold hover:bg-gold-hover text-navy font-bold py-6 px-6 rounded-full text-xs uppercase tracking-widest border border-gold hover:border-gold-hover transition-all duration-300 gap-2 cursor-pointer shadow-lg"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-white/20 hover:border-gold text-white hover:text-gold font-bold py-4 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 gap-2 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
