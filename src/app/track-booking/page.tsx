"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Users, Home, Info, ArrowRight, Compass, ShieldCheck, CheckCircle, XCircle, AlertCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBookingByRefAndEmail } from "@/lib/actions/bookings";

interface BookingDetails {
  id: string;
  customer: string;
  email: string;
  phone: string;
  tour: string;
  tourId: string;
  date: string;
  departureDate: string;
  returnDate: string;
  amount: string;
  travelers: number;
  hotelPreference: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

export default function TrackBookingPage() {
  const { addToast } = useToast();
  const [bookingRef, setBookingRef] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingRef.trim() || !email.trim()) {
      addToast("Please fill in both fields", "warning");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setBooking(null);

    try {
      const res = await getBookingByRefAndEmail(bookingRef.trim(), email.trim());
      if (res.success && res.data) {
        setBooking(res.data);
        addToast("Itinerary details retrieved", "success");
      } else {
        setErrorMsg(res.error || "No booking was found with the provided reference and email.");
        addToast("No matching record found", "error");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-muted min-h-screen relative">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Track Your Luxury Itinerary</h2>
            <p className="text-sm text-muted-foreground font-light">
              Enter your booking reference code and email to securely retrieve your personalized Abyssinian travel details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            
            {/* Search Form Card */}
            <Card className="border border-navy/5 shadow-md bg-white max-w-lg mx-auto w-full rounded-2xl">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-lg font-serif font-bold text-navy">Search Credentials</CardTitle>
                <CardDescription className="text-xs">All fields are case-insensitive</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="bookingRef" className="text-xs font-bold uppercase tracking-wider text-navy/70">
                      Booking Reference
                    </label>
                    <Input
                      id="bookingRef"
                      type="text"
                      placeholder="e.g. TWM-123456"
                      value={bookingRef}
                      onChange={(e) => setBookingRef(e.target.value)}
                      className="bg-muted/30 border-muted focus:border-gold focus:ring-gold text-sm rounded-xl py-5"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-navy/70">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. guest@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/30 border-muted focus:border-gold focus:ring-gold text-sm rounded-xl py-5"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-navy hover:bg-gold hover:text-navy text-white py-6 rounded-xl font-bold uppercase tracking-widest text-xs transition duration-300 mt-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Compass className="h-4 w-4 animate-spin" />
                        Verifying details...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Search className="h-4 w-4" />
                        Track Booking
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Status Messages & Booking Details Section */}
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="max-w-lg mx-auto w-full text-center p-6 bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl flex flex-col items-center gap-3 shadow-sm"
                >
                  <AlertCircle className="h-8 w-8 text-rose-500" />
                  <p className="text-sm font-medium">{errorMsg}</p>
                </motion.div>
              )}

              {booking && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-2xl mx-auto"
                >
                  <Card className="border border-navy/5 shadow-lg bg-white overflow-hidden rounded-2xl">
                    {/* Header Info */}
                    <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-muted">
                      <div className="space-y-1">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                          Reservation Reference: {booking.id}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-navy mt-0.5">
                          {booking.tour}
                        </h3>
                        <span className="text-xs text-muted-foreground block">
                          Registered Guest: <strong>{booking.customer}</strong>
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-3.5 py-2 rounded-full border ${
                            booking.status === "Confirmed"
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : booking.status === "Pending"
                              ? "bg-amber-50 border-amber-200 text-amber-700"
                              : booking.status === "Completed"
                              ? "bg-sky-50 border-sky-200 text-sky-700"
                              : "bg-rose-50 border-rose-200 text-rose-700"
                          }`}
                        >
                          {booking.status === "Confirmed" && <CheckCircle className="h-3.5 w-3.5" />}
                          {booking.status === "Pending" && <Info className="h-3.5 w-3.5" />}
                          {booking.status === "Completed" && <ShieldCheck className="h-3.5 w-3.5" />}
                          {booking.status === "Cancelled" && <XCircle className="h-3.5 w-3.5" />}
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Details content */}
                    <CardContent className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 bg-muted/10 text-sm border-b border-muted">
                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs block font-semibold uppercase tracking-wider">Travel Dates</span>
                        <span className="font-bold text-navy flex items-center gap-1.5 mt-0.5">
                          <Calendar className="h-4 w-4 text-gold shrink-0" />
                          {new Date(booking.departureDate).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] text-muted-foreground block">
                          to {new Date(booking.returnDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs block font-semibold uppercase tracking-wider">Group Size</span>
                        <span className="font-bold text-navy flex items-center gap-1.5 mt-1">
                          <Users className="h-4 w-4 text-gold shrink-0" />
                          {booking.travelers} Traveler(s)
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs block font-semibold uppercase tracking-wider">Accommodations</span>
                        <span className="font-bold text-navy mt-1 block">
                          {booking.hotelPreference} Class
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-muted-foreground text-xs block font-semibold uppercase tracking-wider">Estimated Value</span>
                        <span className="font-extrabold text-navy text-lg mt-1 block">
                          {booking.amount}
                        </span>
                        <span className="text-[10px] text-muted-foreground block italic font-light">
                          VAT & Service Charges Incl.
                        </span>
                      </div>
                    </CardContent>

                    {/* Guest Contact Details */}
                    <CardContent className="p-6 md:p-8 space-y-4">
                      <h4 className="font-serif font-bold text-navy text-sm border-b pb-2">Guest Contact Details</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gold" />
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium text-navy">{booking.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gold" />
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="font-medium text-navy">{booking.phone}</span>
                        </div>
                      </div>
                    </CardContent>

                    {/* Card Actions */}
                    <CardFooter className="p-6 flex flex-col sm:flex-row items-center justify-between border-t border-muted bg-white gap-4">
                      <span className="text-xs text-muted-foreground font-light flex items-center gap-1.5 text-center sm:text-left">
                        <Info className="h-4 w-4 text-gold shrink-0" />
                        {booking.status === "Pending"
                          ? "Awaiting final confirmation from your travel advisor."
                          : booking.status === "Confirmed"
                          ? "Itinerary details fully secured. We are preparing for your arrival."
                          : booking.status === "Completed"
                          ? "We hope you had a luxury unforgettable experience!"
                          : "This booking request was cancelled."}
                      </span>

                      <Link
                        href={`/tours/${booking.tourId}`}
                        className="inline-flex items-center justify-center bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold px-6 py-3 rounded-xl border border-navy hover:border-gold transition-all duration-300 cursor-pointer text-center whitespace-nowrap"
                      >
                        Explore Tour Details
                        <ArrowRight className="h-3.5 w-3.5 ml-2" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
