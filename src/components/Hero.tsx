"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy"
    >
      {/* Background Image Container with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ duration: 2.5, ease: "easeOut" as const }}
          className="w-full h-full bg-[url('/assets/destinations/dorze.jpg')] bg-cover bg-center"
        />
        {/* Dark overlay gradients for depth and text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-navy/50" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-white text-xs uppercase tracking-widest mb-2 font-light"
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
          className="w-1.5 h-6 rounded-full bg-gold/50 border border-gold/30 flex justify-center pt-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-gold" />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center space-y-8 max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
          className="space-y-4"
        >
          <span className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-inner">
            <Compass className="h-4.5 w-4.5 animate-spin-slow text-gold" />
            Discover East Africa
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Discover Ethiopia <br />
            <span className="text-gold relative inline-block">
              With Confidence
              <span className="absolute bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" as const }}
          className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-2xl mx-auto"
        >
          Experience unforgettable adventures, cultural treasures, and personalized tours curated for those seeking luxury and safety.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" as const }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            onClick={() => handleScrollTo("tours")}
            className="bg-gold hover:bg-gold-hover text-navy font-bold px-8 py-6 rounded-full text-sm uppercase tracking-wider shadow-lg hover:shadow-gold/25 w-full sm:w-auto transition-all duration-300 border border-gold hover:border-gold-hover group"
          >
            Explore Tours
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => handleScrollTo("contact")}
            variant="outline"
            className="bg-transparent border-white/20 hover:border-gold text-white hover:text-gold px-8 py-6 rounded-full text-sm uppercase tracking-wider w-full sm:w-auto transition-all duration-300 group"
          >
            <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Book Your Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
