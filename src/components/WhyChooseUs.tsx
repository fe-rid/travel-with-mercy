"use client";

import { motion } from "framer-motion";
import { Compass, DollarSign, Sliders, ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { features } from "@/data/travelData";

const iconMap: Record<string, React.ComponentType<any>> = {
  Compass,
  DollarSign,
  Sliders,
  ShieldCheck,
  Clock,
  CheckCircle,
};

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radiant blurs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky/10 rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold font-semibold text-xs uppercase tracking-widest block">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Uncompromising Excellence
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
          <p className="text-white/60 text-sm leading-relaxed max-w-xl mx-auto">
            Travel With Mercy combines deep local heritage connections with modern luxury standards to create a secure, seamless, and stunning vacation.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const IconComponent = iconMap[feature.iconName] || Compass;
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 p-8 rounded-2xl transition-all duration-300 group flex gap-5"
              >
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300 shrink-0">
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
