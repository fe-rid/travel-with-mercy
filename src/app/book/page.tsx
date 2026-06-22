"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Calendar, User, Plane, Eye, Heart, Home, Compass, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/Toast";
import { tours } from "@/data/travelData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Steps descriptions
const steps = [
  { label: "Select Tour", desc: "Choose your itinerary" },
  { label: "Travelers", desc: "Enter guest details" },
  { label: "Preferences", desc: "Dates & hotel class" },
  { label: "Review", desc: "Check & confirm" },
  { label: "Complete", desc: "Submission success" },
];

function BookTourContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToast } = useToast();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedTourId, setSelectedTourId] = useState("");
  
  // Traveler Info States
  const [travelerInfo, setTravelerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    travelersCount: 1,
  });

  // Preferences States
  const [travelDetails, setTravelDetails] = useState({
    departureDate: "",
    returnDate: "",
    hotelPreference: "Premium", // Standard, Premium, Luxury
    additionalNotes: "",
  });

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-select tour if passed in query param
  useEffect(() => {
    const tourQuery = searchParams.get("tour");
    if (tourQuery && tours.some((t) => t.id === tourQuery)) {
      setSelectedTourId(tourQuery);
      setActiveStep(1); // Skip step 1 since it's already selected
    }
  }, [searchParams]);

  // Pricing calculations
  const selectedTour = tours.find((t) => t.id === selectedTourId);
  const basePriceNum = selectedTour ? parseInt(selectedTour.price.replace(/[^0-9]/g, "")) : 0;
  
  const getHotelMultiplier = () => {
    if (travelDetails.hotelPreference === "Luxury") return 500;
    if (travelDetails.hotelPreference === "Premium") return 200;
    return 0;
  };

  const getEstimatedPrice = () => {
    const costPerPerson = basePriceNum + getHotelMultiplier();
    return costPerPerson * travelerInfo.travelersCount;
  };

  // Form Validation
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!travelerInfo.fullName.trim()) errs.fullName = "Full name is required";
    if (!travelerInfo.nationality.trim()) errs.nationality = "Nationality is required";
    
    // Email regex
    if (!travelerInfo.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(travelerInfo.email)) {
      errs.email = "Invalid email format";
    }

    // Phone validation
    if (!travelerInfo.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(travelerInfo.phone.replace(/\s+/g, ""))) {
      errs.phone = "Invalid phone number format (e.g. +251912826488)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!travelDetails.departureDate) errs.departureDate = "Departure date is required";
    if (!travelDetails.returnDate) errs.returnDate = "Return date is required";
    
    if (travelDetails.departureDate && travelDetails.returnDate) {
      const dep = new Date(travelDetails.departureDate);
      const ret = new Date(travelDetails.returnDate);
      if (ret <= dep) {
        errs.returnDate = "Return date must be after departure date";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Stepper Navigation
  const handleNext = () => {
    if (activeStep === 0) {
      if (!selectedTourId) {
        addToast("Please select a tour package to continue", "error");
        return;
      }
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (validateStep2()) {
        setActiveStep(2);
      } else {
        addToast("Please correct the errors in the form", "error");
      }
    } else if (activeStep === 2) {
      if (validateStep3()) {
        setActiveStep(3);
      } else {
        addToast("Please fill in travel dates correctly", "error");
      }
    } else if (activeStep === 3) {
      // Simulate booking submit action
      addToast("Submitting your luxury booking proposal...", "info");
      setTimeout(() => {
        // Save mock booking to localStorage to show on Dashboard
        const newBooking = {
          id: `TWM-${Math.floor(100000 + Math.random() * 900000)}`,
          customer: travelerInfo.fullName,
          email: travelerInfo.email,
          phone: travelerInfo.phone,
          tour: selectedTour?.title || "",
          tourId: selectedTourId,
          amount: `$${getEstimatedPrice().toLocaleString()}`,
          date: new Date().toLocaleDateString(),
          travelers: travelerInfo.travelersCount,
          departureDate: travelDetails.departureDate,
          returnDate: travelDetails.returnDate,
          hotelPreference: travelDetails.hotelPreference,
          status: "Pending" as const,
        };

        const existing = localStorage.getItem("twm_bookings");
        const bookingsList = existing ? JSON.parse(existing) : [];
        localStorage.setItem("twm_bookings", JSON.stringify([newBooking, ...bookingsList]));

        setActiveStep(4);
        addToast("Booking request submitted successfully!", "success");
      }, 1500);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-20 bg-muted">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          {/* Booking Stepper visual component */}
          <div className="mb-12 bg-white p-6 rounded-2xl border border-navy/5 shadow-sm">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-gold -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                      index < activeStep
                        ? "bg-gold border-gold text-navy"
                        : index === activeStep
                        ? "bg-navy border-navy text-white scale-110 shadow-lg"
                        : "bg-white border-muted text-muted-foreground"
                    }`}
                  >
                    {index < activeStep ? <Check className="h-4.5 w-4.5" /> : index + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 uppercase tracking-wider font-bold hidden sm:block ${
                      index === activeStep ? "text-navy font-extrabold" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            
            {/* Step 1: Select Tour */}
            {activeStep === 0 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="font-serif text-3xl font-bold text-navy">Select Your Dream Tour</h2>
                  <p className="text-sm text-muted-foreground">Select one of our custom historical, trekking, or city tours to begin booking.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {tours.map((t) => (
                    <Card
                      key={t.id}
                      onClick={() => setSelectedTourId(t.id)}
                      className={`overflow-hidden cursor-pointer border hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white group ${
                        selectedTourId === t.id
                          ? "border-gold ring-2 ring-gold/40 shadow-lg scale-101"
                          : "border-navy/5 shadow-md"
                      }`}
                    >
                      <div className="relative h-[200px] bg-navy overflow-hidden">
                        <img
                          src={t.image}
                          alt={t.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/95 text-navy font-bold text-xs px-3 py-1 rounded-md">
                          {t.duration}
                        </div>
                      </div>

                      <CardContent className="p-6 flex-grow space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors">
                            {t.title}
                          </h3>
                          <span className="text-gold font-extrabold text-lg shrink-0">{t.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {t.description}
                        </p>
                        
                        <div className="space-y-1.5 border-t border-muted pt-3">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Highlights:</span>
                          <ul className="text-xs text-navy/80 space-y-1">
                            {t.highlights.slice(0, 2).map((h, i) => (
                              <li key={i} className="flex items-center gap-1.5 line-clamp-1">
                                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>

                      <CardFooter className="p-6 pt-0 border-t border-muted bg-muted/20 mt-auto flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Select Package</span>
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            selectedTourId === t.id
                              ? "bg-gold border-gold text-navy"
                              : "border-muted-foreground bg-white"
                          }`}
                        >
                          {selectedTourId === t.id && <Check className="h-3.5 w-3.5" />}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end pt-6">
                  <Button
                    onClick={handleNext}
                    className="bg-navy hover:bg-gold hover:text-navy text-white font-bold px-8 py-6 rounded-full uppercase tracking-wider text-xs shadow-md border border-navy hover:border-gold transition-all duration-300"
                  >
                    Continue to Travelers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Traveler Information */}
            {activeStep === 1 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="font-serif text-3xl font-bold text-navy">Traveler Information</h2>
                  <p className="text-sm text-muted-foreground">Provide main traveler coordinates and group size.</p>
                </div>

                <Card className="border border-navy/5 shadow-lg bg-white">
                  <CardHeader className="border-b border-muted">
                    <CardTitle className="font-serif text-navy text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-gold" />
                      Primary Contact Info
                    </CardTitle>
                    <CardDescription>We will use these details to coordinate travel schedules.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Full Name *</label>
                      <Input
                        type="text"
                        value={travelerInfo.fullName}
                        onChange={(e) => setTravelerInfo({ ...travelerInfo, fullName: e.target.value })}
                        placeholder="Johnathan Doe"
                        className={errors.fullName ? "border-rose-500" : "border-border"}
                      />
                      {errors.fullName && <p className="text-xs text-rose-500">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Email Address *</label>
                        <Input
                          type="email"
                          value={travelerInfo.email}
                          onChange={(e) => setTravelerInfo({ ...travelerInfo, email: e.target.value })}
                          placeholder="john@example.com"
                          className={errors.email ? "border-rose-500" : "border-border"}
                        />
                        {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Phone Number *</label>
                        <Input
                          type="tel"
                          value={travelerInfo.phone}
                          onChange={(e) => setTravelerInfo({ ...travelerInfo, phone: e.target.value })}
                          placeholder="e.g. +251 912 826 488"
                          className={errors.phone ? "border-rose-500" : "border-border"}
                        />
                        {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Nationality *</label>
                        <Input
                          type="text"
                          value={travelerInfo.nationality}
                          onChange={(e) => setTravelerInfo({ ...travelerInfo, nationality: e.target.value })}
                          placeholder="United Kingdom"
                          className={errors.nationality ? "border-rose-500" : "border-border"}
                        />
                        {errors.nationality && <p className="text-xs text-rose-500">{errors.nationality}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Number of Travelers</label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setTravelerInfo({ ...travelerInfo, travelersCount: Math.max(1, travelerInfo.travelersCount - 1) })}
                            className="w-10 h-10 border border-muted bg-white rounded-lg flex items-center justify-center hover:bg-muted text-navy font-bold transition"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-bold text-navy">{travelerInfo.travelersCount}</span>
                          <button
                            type="button"
                            onClick={() => setTravelerInfo({ ...travelerInfo, travelersCount: Math.min(20, travelerInfo.travelersCount + 1) })}
                            className="w-10 h-10 border border-muted bg-white rounded-lg flex items-center justify-center hover:bg-muted text-navy font-bold transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between pt-6">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-navy/20 text-navy hover:text-gold hover:border-gold rounded-full px-6 py-6 uppercase tracking-wider text-xs transition"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Tour
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-navy hover:bg-gold hover:text-navy text-white font-bold px-8 py-6 rounded-full uppercase tracking-wider text-xs shadow-md border border-navy hover:border-gold transition-all duration-300"
                  >
                    Continue to Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Travel Preferences & Dates */}
            {activeStep === 2 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="font-serif text-3xl font-bold text-navy">Travel Preferences & Schedule</h2>
                  <p className="text-sm text-muted-foreground">Select your ideal dates and accommodations.</p>
                </div>

                <Card className="border border-navy/5 shadow-lg bg-white">
                  <CardHeader className="border-b border-muted">
                    <CardTitle className="font-serif text-navy text-lg flex items-center gap-2">
                      <Plane className="h-5 w-5 text-gold" />
                      Travel Preferences
                    </CardTitle>
                    <CardDescription>Select luxury accommodations and travel timeline.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Departure Date *</label>
                        <Input
                          type="date"
                          value={travelDetails.departureDate}
                          onChange={(e) => setTravelDetails({ ...travelDetails, departureDate: e.target.value })}
                          className={errors.departureDate ? "border-rose-500" : "border-border"}
                        />
                        {errors.departureDate && <p className="text-xs text-rose-500">{errors.departureDate}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Return Date *</label>
                        <Input
                          type="date"
                          value={travelDetails.returnDate}
                          onChange={(e) => setTravelDetails({ ...travelDetails, returnDate: e.target.value })}
                          className={errors.returnDate ? "border-rose-500" : "border-border"}
                        />
                        {errors.returnDate && <p className="text-xs text-rose-500">{errors.returnDate}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Hotel Class Preference</label>
                      <div className="grid grid-cols-3 gap-4">
                        {["Standard", "Premium", "Luxury"].map((tier) => (
                          <div
                            key={tier}
                            onClick={() => setTravelDetails({ ...travelDetails, hotelPreference: tier })}
                            className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ${
                              travelDetails.hotelPreference === tier
                                ? "border-gold bg-gold/10 text-navy font-bold"
                                : "border-border hover:border-gold/30 text-muted-foreground bg-white"
                            }`}
                          >
                            <span className="text-sm block">{tier}</span>
                            <span className="text-[10px] text-muted-foreground font-light block mt-1">
                              {tier === "Standard" ? "Heritage 3★" : tier === "Premium" ? "Premium 4★ (+$200)" : "Ultra-Lux 5★ (+$500)"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-navy/70 uppercase tracking-widest font-semibold">Additional Notes or Custom Requests</label>
                      <Textarea
                        value={travelDetails.additionalNotes}
                        onChange={(e) => setTravelDetails({ ...travelDetails, additionalNotes: e.target.value })}
                        placeholder="Dietary requests, room configurations, private flight bookings..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between pt-6">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-navy/20 text-navy hover:text-gold hover:border-gold rounded-full px-6 py-6 uppercase tracking-wider text-xs transition"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Info
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-navy hover:bg-gold hover:text-navy text-white font-bold px-8 py-6 rounded-full uppercase tracking-wider text-xs shadow-md border border-navy hover:border-gold transition-all duration-300"
                  >
                    Proceed to Review
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Booking Review */}
            {activeStep === 3 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="font-serif text-3xl font-bold text-navy">Review & Confirm</h2>
                  <p className="text-sm text-muted-foreground">Verify booking dates and preferences before confirming.</p>
                </div>

                <Card className="border border-navy/5 shadow-xl bg-white overflow-hidden">
                  <CardHeader className="bg-navy text-white p-6 border-b border-white/10 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-serif text-gold text-xl">{selectedTour?.title}</CardTitle>
                      <CardDescription className="text-white/60">Proposal Reservation Summary</CardDescription>
                    </div>
                    <Sparkles className="h-6 w-6 text-gold shrink-0" />
                  </CardHeader>
                  
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm border-b border-muted pb-6">
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider block">Lead Traveler</span>
                        <span className="font-bold text-navy text-base block">{travelerInfo.fullName}</span>
                        <span className="text-muted-foreground text-xs block">{travelerInfo.email} | {travelerInfo.phone}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider block">Group Size</span>
                        <span className="font-bold text-navy text-base block">{travelerInfo.travelersCount} Explorer(s)</span>
                        <span className="text-muted-foreground text-xs block">Nationality: {travelerInfo.nationality}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm border-b border-muted pb-6">
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider block">Travel Schedule</span>
                        <span className="font-bold text-navy text-base block flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-gold" />
                          {new Date(travelDetails.departureDate).toLocaleDateString()} - {new Date(travelDetails.returnDate).toLocaleDateString()}
                        </span>
                        <span className="text-muted-foreground text-xs block">Duration: {selectedTour?.duration}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider block">Accommodation Preference</span>
                        <span className="font-bold text-navy text-base block">{travelDetails.hotelPreference} Standard</span>
                        <span className="text-muted-foreground text-xs block">Vetted luxury boutique hotels</span>
                      </div>
                    </div>

                    {travelDetails.additionalNotes && (
                      <div className="space-y-1.5 text-sm border-b border-muted pb-6">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider block">Additional Request Note</span>
                        <p className="text-xs text-navy/80 leading-relaxed font-light italic">
                          "{travelDetails.additionalNotes}"
                        </p>
                      </div>
                    )}

                    {/* Calculated Price */}
                    <div className="bg-muted p-6 rounded-2xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold block">
                          Estimated Package Value
                        </span>
                        <span className="text-xs text-muted-foreground">Incl. local flight & premium transfers</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-extrabold text-navy block">
                          ${getEstimatedPrice().toLocaleString()}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">USD</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between pt-6">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-navy/20 text-navy hover:text-gold hover:border-gold rounded-full px-6 py-6 uppercase tracking-wider text-xs transition"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-gold hover:bg-gold-hover text-navy font-bold px-10 py-6 rounded-full uppercase tracking-wider text-xs shadow-md border border-gold hover:border-gold-hover transition-all duration-300"
                  >
                    Confirm Booking Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Success Template */}
            {activeStep === 4 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto text-center space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-navy/5 shadow-2xl"
              >
                <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold">
                  <Check className="h-10 w-10 animate-bounce" />
                </div>

                <div className="space-y-3">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest block">
                    ✓ Booking Request Submitted Successfully
                  </span>
                  <h2 className="font-serif text-3xl font-extrabold text-navy">Thank You for Trusting Us</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Your luxury travel inquiry is received. A dedicated Travel With Mercy concierge advisor will review and contact you shortly with a formal itinerary layout.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-navy hover:bg-gold hover:text-navy text-white font-bold py-4 px-8 rounded-full text-xs uppercase tracking-wider border border-navy hover:border-gold transition-all duration-300 w-full sm:w-auto text-center cursor-pointer"
                  >
                    Return Home
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="inline-flex items-center justify-center border border-navy/20 hover:border-gold text-navy hover:text-gold font-bold py-4 px-8 rounded-full text-xs uppercase tracking-wider transition w-full sm:w-auto text-center cursor-pointer"
                  >
                    View My Bookings
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BookTourPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-muted/20 flex flex-col pt-28 md:pt-36">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold animate-pulse">
              <Compass className="h-8 w-8 animate-spin-slow" />
            </div>
          </div>
        </div>
      }
    >
      <BookTourContent />
    </Suspense>
  );
}
