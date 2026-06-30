"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { tours as defaultTours } from "@/data/travelData";

interface ToursProps {
  tours?: any[];
}

export default function Tours({ tours = defaultTours }: ToursProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="tours" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold font-semibold text-xs uppercase tracking-widest block">
            Our Packages
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Luxury Featured Tours
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
            Handcrafted luxury itineraries offering a seamless balance of historical storytelling, premium comfort, and safe, fully guided adventure.
          </p>
        </div>

        {/* Tours Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {tours.map((tour) => (
            <motion.div key={tour.id} variants={cardVariants}>
              <Card className="h-full overflow-hidden border border-navy/5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group bg-white">
                {/* Tour Image */}
                <CardHeader className="p-0 relative h-[260px] overflow-hidden bg-navy cursor-pointer">
                  <Link href={`/tours/${tour.id}`}>
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4 bg-navy/80 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      {tour.duration}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 text-navy px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                      <span>{tour.rating.toFixed(1)}</span>
                    </div>
                  </Link>
                </CardHeader>

                {/* Tour Content */}
                <CardContent className="p-6 md:p-8 flex-grow space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tour.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/tours/${tour.id}`}>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-navy group-hover:text-gold transition-colors duration-300">
                      {tour.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tour.description}
                  </p>
                </CardContent>

                {/* Tour Footer */}
                <CardFooter className="p-6 md:p-8 pt-0 border-t border-muted flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                      From / person
                    </span>
                    <span className="text-2xl font-extrabold text-navy">
                      {tour.price}
                    </span>
                  </div>

                  <Link
                    href={`/tours/${tour.id}`}
                    className="inline-flex items-center justify-center bg-navy hover:bg-gold hover:text-navy text-white font-semibold px-5 py-2.5 rounded-full border border-navy hover:border-gold shadow-sm transition-all duration-300 text-xs uppercase tracking-wider group/btn cursor-pointer"
                  >
                    View Details
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
