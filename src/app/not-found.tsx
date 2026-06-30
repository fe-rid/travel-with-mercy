import Link from 'next/link';
import { Compass, Home, Map } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050E1A] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md relative z-10 space-y-6">
        <div className="inline-flex p-4 rounded-full bg-gold/15 border border-gold/30 mb-2">
          <Compass className="h-10 w-10 text-gold animate-spin-slow" />
        </div>

        <h1 className="font-serif text-8xl font-black text-white/10 tracking-widest absolute -top-8 left-1/2 -translate-x-1/2 select-none z-0">
          404
        </h1>

        <div className="relative z-10 space-y-3">
          <h2 className="font-serif text-3xl font-bold text-white tracking-wide">
            Destination Uncharted
          </h2>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm mx-auto font-light">
            The path you are looking for does not exist or has been moved. Let our master travel concierge guide you back to safety.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gold hover:bg-gold-hover text-navy font-bold py-4 px-6 rounded-full text-xs uppercase tracking-widest border border-gold hover:border-gold-hover transition-all duration-300 gap-2 cursor-pointer shadow-lg"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          <Link
            href="/#tours"
            className="inline-flex items-center justify-center border border-white/20 hover:border-gold text-white hover:text-gold font-bold py-4 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 gap-2 cursor-pointer"
          >
            <Map className="h-4 w-4" />
            Explore Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
