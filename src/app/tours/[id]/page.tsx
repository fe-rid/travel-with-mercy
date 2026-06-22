import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Clock, Check, X, Shield, Calendar, ArrowRight, Home, ChevronRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { tours } from "@/data/travelData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TourDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Dynamic Hero Banner */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-navy overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover opacity-50 scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-navy/40 to-transparent" />
            <div className="absolute inset-0 bg-navy/20" />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center space-y-6 max-w-4xl pt-10">
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-xs text-white/60 uppercase tracking-widest font-semibold">
              <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1">
                <Home className="h-3 w-3" /> Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/40">Tours</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gold">{tour.title}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">
              {tour.title}
            </h1>

            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {tour.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Clock className="h-4 w-4 text-gold" />
                {tour.duration}
              </span>
              <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Star className="h-4 w-4 fill-gold text-gold" />
                {tour.rating.toFixed(1)} / 5.0 Rating
              </span>
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <section className="py-16 container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Highlights */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                  Tour Highlights
                </h3>
                <div className="w-12 h-[2px] bg-gold" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 bg-muted p-4 rounded-xl border border-navy/5">
                      <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-sm text-navy/80 font-medium">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Timeline */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                  Day-by-Day Itinerary
                </h3>
                <div className="w-12 h-[2px] bg-gold" />
                
                {/* Timeline container */}
                <div className="relative border-l border-navy/10 pl-6 md:pl-8 ml-4 space-y-8 py-4">
                  {tour.itinerary.map((item, index) => (
                    <div key={item.day} className="relative group">
                      {/* Circle indicator */}
                      <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-navy text-gold border-2 border-gold flex items-center justify-center text-xs font-bold shadow-md group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                        {item.day}
                      </div>

                      <div className="space-y-2 bg-white hover:bg-muted p-6 rounded-2xl border border-navy/5 hover:border-gold/20 transition-all duration-300 shadow-sm hover:shadow-md">
                        <h4 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors">
                          Day {item.day}: {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Image Gallery */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                  Media Showcase
                </h3>
                <div className="w-12 h-[2px] bg-gold" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tour.gallery.map((img, i) => (
                    <div key={i} className="group relative h-[180px] rounded-xl overflow-hidden shadow-md border border-navy/5">
                      <img
                        src={img}
                        alt={`${tour.title} Gallery ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                  Services Details
                </h3>
                <div className="w-12 h-[2px] bg-gold" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Included */}
                  <div className="bg-[#EBFBF3] border border-emerald-200/40 p-6 md:p-8 rounded-2xl space-y-4">
                    <h4 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
                      <Check className="h-5 w-5 text-emerald-600" />
                      What's Included
                    </h4>
                    <ul className="space-y-3 text-sm text-emerald-800/80">
                      {tour.included.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded */}
                  <div className="bg-[#FEF2F2] border border-rose-200/40 p-6 md:p-8 rounded-2xl space-y-4">
                    <h4 className="font-bold text-rose-900 text-lg flex items-center gap-2">
                      <X className="h-5 w-5 text-rose-600" />
                      What's Excluded
                    </h4>
                    <ul className="space-y-3 text-sm text-rose-800/80">
                      {tour.excluded.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                  Frequently Asked Questions
                </h3>
                <div className="w-12 h-[2px] bg-gold" />
                
                <Accordion className="w-full">
                  {tour.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="font-serif font-semibold text-navy hover:text-gold text-base text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-light">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

            </div>

            {/* Right Column: Sticky Booking Card (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <Card className="border border-navy/5 shadow-xl overflow-hidden bg-white">
                {/* Header pricing banner */}
                <div className="bg-navy p-6 text-white space-y-1">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold block">
                    All-Inclusive Luxury
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-gold">{tour.price}</span>
                    <span className="text-xs text-white/70">/ person</span>
                  </div>
                </div>

                <CardContent className="p-6 md:p-8 space-y-6">
                  {/* Tour brief details */}
                  <div className="space-y-4 text-sm text-navy/80 border-b border-muted pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold">{tour.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Group Size</span>
                      <span className="font-semibold">Max 8 travelers</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Departing from</span>
                      <span className="font-semibold">Addis Ababa</span>
                    </div>
                  </div>

                  {/* Trust details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <Shield className="h-4.5 w-4.5 text-gold shrink-0" />
                      <span>100% Fully Custom/Bespoke available</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <Calendar className="h-4.5 w-4.5 text-gold shrink-0" />
                      <span>Flexible booking dates & payment terms</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/book?tour=${tour.id}`}
                    className="w-full bg-gold hover:bg-gold-hover text-navy font-bold py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-gold hover:border-gold-hover shadow-lg hover:shadow-gold/20 group cursor-pointer text-center"
                  >
                    Book This Tour
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </CardContent>
              </Card>

              {/* Secondary Help Card */}
              <Card className="border border-navy/5 bg-navy text-white shadow-lg p-6">
                <CardContent className="p-0 space-y-4">
                  <h4 className="font-serif text-lg font-bold text-gold">Need Customization?</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Our team of master travel consultants can design a custom itinerary tailored specifically around your travel dates, physical preferences, and budget size.
                  </p>
                  <div className="space-y-2 text-xs">
                    <a href="tel:+251912826488" className="flex items-center gap-2 hover:text-gold transition-colors">
                      <Phone className="h-3.5 w-3.5 text-gold" />
                      +251 912 826 488
                    </a>
                    <a href="mailto:travelwithmercy15@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                      <Mail className="h-3.5 w-3.5 text-gold" />
                      travelwithmercy15@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
