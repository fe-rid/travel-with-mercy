"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { destinations } from "@/data/travelData";

export default function Destinations() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="destinations" className="py-24 bg-muted relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold font-semibold text-xs uppercase tracking-widest block">
            Where to Go
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Featured Destinations
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
            From dramatic peak ranges to ancient cities frozen in stone, explore the historical, natural, and modern capitals of Ethiopia.
          </p>
        </div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              variants={cardVariants}
              className="group relative h-[420px] rounded-2xl overflow-hidden shadow-lg border border-navy/5 cursor-pointer bg-navy"
            >
              {/* Card Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent opacity-40" />
                {/* Hover color tint */}
                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Number of Tours badge */}
              <div className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                {dest.toursCount} Packages
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8 space-y-3">
                <div className="flex items-center gap-1 text-gold text-xs font-semibold uppercase tracking-widest">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Ethiopia</span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {dest.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-gold text-navy flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Sliding card description */}
                <p className="text-white/80 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-out">
                  {dest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
