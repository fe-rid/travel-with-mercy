"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials as defaultTestimonials } from "@/data/travelData";

interface TestimonialsProps {
  testimonials?: any[];
}

export default function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" as const },
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative quotes element */}
      <div className="absolute top-12 left-12 text-gold/10 pointer-events-none hidden lg:block">
        <Quote className="h-64.5 w-64.5 fill-current" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold font-semibold text-xs uppercase tracking-widest block">
            Guest Feedback
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            What Our Clients Say
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto" />
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
            Read authentic reviews from global explorers who discovered Ethiopia's magic in absolute comfort and safety.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative bg-muted border border-navy/5 rounded-3xl p-8 md:p-16 shadow-lg min-h-[350px] flex flex-col justify-between">
          <div className="absolute top-8 right-8 text-gold/20">
            <Quote className="h-12 w-12 fill-current" />
          </div>

          <div className="relative flex-grow flex items-center overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 w-full"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif text-lg md:text-2xl text-navy italic leading-relaxed font-medium">
                  "{currentTestimonial.content}"
                </p>

                {/* User Profile */}
                <div className="flex items-center gap-4 pt-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold"
                  />
                  <div>
                    <h4 className="font-bold text-navy text-base">{currentTestimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{currentTestimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-navy/5 mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? "w-8 bg-gold" : "w-2.5 bg-navy/20"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow keys */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center text-navy hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center text-navy hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
