"use client";

import { motion } from "framer-motion";
import { Award, Compass, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function About() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const imageHoverVariants = {
    hover: { scale: 1.03, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-sky/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Image collage */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-navy/5">
              <motion.img
                src="/assets/about img/ስለምህረትህ ተመስገን ጌታዬ🙌🏻.jpg"
                alt="Ethiopian Landscape Heritage"
                className="object-cover w-full h-full"
                variants={imageHoverVariants}
                whileHover="hover"
              />
            </div>
            
            {/* Small floating card inside image section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 md:right-8 bg-navy text-white p-6 rounded-xl shadow-2xl max-w-xs border border-white/10 hidden sm:block"
            >
              <p className="font-serif text-lg text-gold font-bold mb-1">Over 15+ Years</p>
              <p className="text-xs text-white/70 leading-relaxed uppercase tracking-wider">
                Of crafting bespoke, ultra-luxury guided experiences in East Africa.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Text & Features */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-gold font-semibold text-xs uppercase tracking-widest block">
                Who We Are
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                Curators of Unforgettable <br />
                Ethiopian Journeys
              </h2>
              <div className="w-16 h-[2px] bg-gold" />
            </div>

            <p className="text-muted-foreground leading-relaxed">
              At "TRAVEL WITH MERCY", we believe that travel should be more than just visiting destinations—it should be a profound experience of discovery, connection, and comfort. Based in the heart of Addis Ababa, we customize upscale itineraries designed around your dreams.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              From the pristine highlands of the Bale Mountains to the rich tribal cultures of the Omo Valley, we take care of all travel logistics, private transportation, and luxury accommodations so you can explore with absolute confidence.
            </p>

            {/* Core Brand Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                  <Compass className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-navy text-sm">Bespoke Design</h4>
                <p className="text-xs text-muted-foreground">Tailored routes matching your pace.</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-lg bg-sky/10 flex items-center justify-center text-sky">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-navy text-sm">Vetted Safety</h4>
                <p className="text-xs text-muted-foreground">Certified transport, elite security protocols.</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center text-navy">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-navy text-sm">Local Experts</h4>
                <p className="text-xs text-muted-foreground">Award-winning historians and guides.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
