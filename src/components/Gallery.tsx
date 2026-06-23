"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Image as ImageIcon, Video, Play } from "lucide-react";
import { galleryImages } from "@/data/travelData";

const categories = ["All", "Heritage", "Nature"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-muted relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold font-semibold text-xs uppercase tracking-widest block">
            Visual Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Our Media Gallery
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
            A window into the mesmerizing landscapes, historical monuments, and rich community cultures of Southern Ethiopia and the Great Rift Valley.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? "text-navy"
                  : "text-muted-foreground hover:text-navy hover:bg-white/40"
              }`}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gold rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => {
              const isVideo = img.url.toLowerCase().endsWith(".mp4");
              return (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative h-[300px] rounded-2xl overflow-hidden shadow-md cursor-pointer bg-navy border border-navy/5"
                >
                  {/* Media (Image or Video) */}
                  {isVideo ? (
                    <video
                      src={img.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  )}

                  {/* Dark Hover Overlay */}
                  <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center space-y-3 z-10" />

                  {/* Hover Content */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-gold text-navy flex items-center justify-center shadow-lg mb-3">
                      {isVideo ? (
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-gold text-[10px] uppercase font-bold tracking-widest">
                      {isVideo ? "Video Tour" : img.category}
                    </span>
                  </div>

                  {/* Static Bottom Left Badge */}
                  <div className="absolute bottom-4 left-4 z-0 group-hover:opacity-0 transition-opacity duration-300 bg-navy/60 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] text-white/90 uppercase tracking-widest font-bold flex items-center gap-1">
                    {isVideo ? (
                      <Video className="h-3 w-3 text-gold" />
                    ) : (
                      <ImageIcon className="h-3 w-3 text-gold" />
                    )}
                    {img.category}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
