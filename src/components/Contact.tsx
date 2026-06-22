"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "General Inquiry",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury booking submit on the frontend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        package: "General Inquiry",
        message: "",
      });
    }, 1800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-navy text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Contact details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-gold font-semibold text-xs uppercase tracking-widest block">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Start Your Journey
              </h2>
              <div className="w-16 h-[2px] bg-gold" />
              <p className="text-white/60 text-sm leading-relaxed font-light">
                Ready to plan your luxury experience through Ethiopia? Contact our concierge desk directly or fill out our reservation inquiry form.
              </p>
            </div>

            {/* Contacts Cards */}
            <div className="space-y-4 pt-4">
              {/* Phone */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white/90 text-sm">Phone Concierge</h4>
                  <a
                    href="tel:+251912826488"
                    className="text-gold hover:text-gold-hover text-sm font-semibold transition-colors mt-0.5 inline-block"
                  >
                    +251 912 826 488
                  </a>
                  <p className="text-xs text-white/50 font-light mt-1">Available 24/7 via Call or Telegram</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white/90 text-sm">Direct Inquiry</h4>
                  <a
                    href="mailto:travelwithmercy15@gmail.com"
                    className="text-gold hover:text-gold-hover text-sm font-semibold transition-colors mt-0.5 inline-block break-all"
                  >
                    travelwithmercy15@gmail.com
                  </a>
                  <p className="text-xs text-white/50 font-light mt-1">Response guaranteed within 3 hours</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white/90 text-sm">Headquarters</h4>
                  <p className="text-white/80 text-sm mt-0.5">
                    Addis Ababa, Ethiopia
                  </p>
                  <p className="text-xs text-white/50 font-light mt-1">Bole District, Imperial Road</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="booking-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">
                          Your Name
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. John Doe"
                          className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="e.g. john@example.com"
                          className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +1 555 123 4567"
                          className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">
                          Preferred Tour
                        </label>
                        <div className="relative">
                          <select
                            name="package"
                            value={formData.package}
                            onChange={handleChange}
                            className="w-full bg-[#0D2647] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold h-10 appearance-none"
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Historic Ethiopia Tour">Historic Ethiopia Tour (10 Days)</option>
                            <option value="Northern Ethiopia Adventure">Northern Ethiopia Adventure (12 Days)</option>
                            <option value="Addis Ababa City Experience">Addis Ababa City Experience (3 Days)</option>
                            <option value="Cultural Heritage Tour">Cultural Heritage Tour (8 Days)</option>
                            <option value="Bespoke Custom Plan">Bespoke Custom Plan (Flexible)</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/70 uppercase tracking-widest font-semibold">
                        Trip details & special requests
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your ideal travel dates, group size, and any special accommodation requests..."
                        rows={5}
                        className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold hover:bg-gold-hover text-navy font-bold py-6 rounded-full text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-gold hover:border-gold-hover"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Processing Booking Request...
                        </>
                      ) : (
                        <>
                          Send Reservation Inquiry
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto text-gold">
                      <CheckCircle2 className="h-10 w-10 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-white">Inquiry Received</h3>
                      <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed">
                        Thank you for contacting **TRAVEL WITH MERCY**. Our luxury concierge manager will review your requests and send a customized itinerary proposal to your email within 3 hours.
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-white/20 hover:border-gold text-white hover:text-gold px-8 py-2 rounded-full uppercase tracking-wider text-xs"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
