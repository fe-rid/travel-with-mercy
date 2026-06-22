"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, Users, DollarSign, ArrowRight, ShieldCheck, Compass, Info, Home, RefreshCw, XCircle, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Booking interface
interface Booking {
  id: string;
  customer?: string;
  email?: string;
  phone?: string;
  tour: string;
  tourTitle?: string; // for backward compatibility
  tourId: string;
  amount: string;
  price?: string; // for backward compatibility
  date: string;
  travelers: number;
  departureDate: string;
  returnDate: string;
  hotelPreference: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

const defaultBookings: Booking[] = [
  {
    id: "TWM-482910",
    customer: "Guest User",
    email: "guest@example.com",
    phone: "+1 234 567 8900",
    tour: "Bale Mountains Wildlife Trek",
    tourId: "bale-mountains-trek",
    amount: "$5,300",
    date: "06/10/2026",
    travelers: 2,
    departureDate: "2026-07-12",
    returnDate: "2026-07-22",
    hotelPreference: "Premium",
    status: "Confirmed",
  },
  {
    id: "TWM-109283",
    customer: "Guest User",
    email: "guest@example.com",
    phone: "+1 234 567 8900",
    tour: "Arbaminch & Lake Chamo Excursion",
    tourId: "arbaminch-chamo-excursion",
    amount: "$550",
    date: "05/12/2026",
    travelers: 1,
    departureDate: "2026-05-15",
    returnDate: "2026-05-18",
    hotelPreference: "Standard",
    status: "Completed",
  },
  {
    id: "TWM-993821",
    customer: "Guest User",
    email: "guest@example.com",
    phone: "+1 234 567 8900",
    tour: "Dorze & Omo Cultural Tour",
    tourId: "dorze-omo-cultural",
    amount: "$13,400",
    date: "04/01/2026",
    travelers: 4,
    departureDate: "2026-10-20",
    returnDate: "2026-11-01",
    hotelPreference: "Luxury",
    status: "Cancelled",
  },
];

export default function BookingsHistoryPage() {
  const { addToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Load bookings from localStorage or set defaults
  useEffect(() => {
    // Show a premium skeleton loading state for 1 second
    const timer = setTimeout(() => {
      const existing = localStorage.getItem("twm_bookings");
      if (existing) {
        setBookings(JSON.parse(existing));
      } else {
        localStorage.setItem("twm_bookings", JSON.stringify(defaultBookings));
        setBookings(defaultBookings);
      }
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleCancelBooking = (id: string) => {
    addToast("Cancelling booking proposal...", "info");
    setTimeout(() => {
      const updated = bookings.map((b) => {
        if (b.id === id) {
          return { ...b, status: "Cancelled" as const };
        }
        return b;
      });
      setBookings(updated);
      localStorage.setItem("twm_bookings", JSON.stringify(updated));
      addToast("Booking request cancelled successfully", "success");
    }, 800);
  };

  const handleResetSeedData = () => {
    setLoading(true);
    localStorage.removeItem("twm_bookings");
    setTimeout(() => {
      localStorage.setItem("twm_bookings", JSON.stringify(defaultBookings));
      setBookings(defaultBookings);
      setLoading(false);
      addToast("Dashboard data reset successfully", "success");
    }, 800);
  };

  // Filtering Logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      (b.tour || b.tourTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-20 bg-muted">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">My Luxury Bookings</h2>
              <p className="text-sm text-muted-foreground mt-1">Manage and track your active, completed, or pending Abyssinian itineraries.</p>
            </div>
            
            <Button
              onClick={handleResetSeedData}
              variant="outline"
              className="border-navy/20 hover:border-gold hover:text-gold text-navy flex items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Demo Data
            </Button>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-5 rounded-2xl border border-navy/5 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by tour name or Reservation ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/30 border-muted focus:border-gold focus:ring-gold text-sm"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto py-1">
              {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    statusFilter === status
                      ? "bg-navy text-white shadow-sm"
                      : "text-muted-foreground hover:text-navy bg-muted/40 hover:bg-muted"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Display */}
          {loading ? (
            // Premium Skeleton Loading States
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-navy/5 shadow-sm space-y-4 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-muted rounded w-1/3" />
                    <div className="h-5 bg-muted rounded w-20" />
                  </div>
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <hr className="border-muted" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-10 bg-muted rounded" />
                    <div className="h-10 bg-muted rounded" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredBookings.length > 0 ? (
                <div className="space-y-6">
                  {filteredBookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border border-navy/5 shadow-md hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
                        {/* Card Header Info */}
                        <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-muted">
                          <div className="space-y-1">
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                              Reservation ID: {booking.id}
                            </span>
                            <h3 className="font-serif text-xl font-bold text-navy">
                              {booking.tour || booking.tourTitle}
                            </h3>
                            <span className="text-xs text-muted-foreground block">
                              Booked on {booking.date}
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border ${
                                booking.status === "Confirmed"
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                  : booking.status === "Pending"
                                  ? "bg-amber-50 border-amber-200 text-amber-700"
                                  : booking.status === "Completed"
                                  ? "bg-sky-50 border-sky-200 text-sky-700"
                                  : "bg-rose-50 border-rose-200 text-rose-700"
                              }`}
                            >
                              {booking.status === "Confirmed" && <CheckCircle className="h-3 w-3" />}
                              {booking.status === "Pending" && <Info className="h-3 w-3" />}
                              {booking.status === "Completed" && <ShieldCheck className="h-3 w-3" />}
                              {booking.status === "Cancelled" && <XCircle className="h-3 w-3" />}
                              {booking.status}
                            </span>
                          </div>
                        </div>

                        {/* Details content */}
                        <CardContent className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 bg-muted/10 text-sm">
                          <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">Dates</span>
                            <span className="font-bold text-navy flex items-center gap-1.5 mt-0.5">
                              <Calendar className="h-4 w-4 text-gold shrink-0" />
                              {new Date(booking.departureDate).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">Group Size</span>
                            <span className="font-bold text-navy flex items-center gap-1.5 mt-0.5">
                              <Users className="h-4 w-4 text-gold shrink-0" />
                              {booking.travelers} Traveler(s)
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">Accommodations</span>
                            <span className="font-bold text-navy mt-0.5 block">
                              {booking.hotelPreference} Class
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">Estimated Value</span>
                            <span className="font-extrabold text-navy text-base mt-0.5 block">
                              {booking.amount || booking.price}
                            </span>
                          </div>
                        </CardContent>

                        {/* Card Actions */}
                        <CardFooter className="p-6 flex items-center justify-between border-t border-muted bg-white">
                          <span className="text-xs text-muted-foreground font-light flex items-center gap-1.5">
                            <Info className="h-4 w-4 text-gold" />
                            {booking.status === "Pending"
                              ? "Awaiting travel advisor confirmation"
                              : booking.status === "Confirmed"
                              ? "Itinerary details fully secured"
                              : booking.status === "Completed"
                              ? "Hope you had an unforgettable experience!"
                              : "Proposal cancelled"}
                          </span>

                          <div className="flex gap-2">
                            {booking.status === "Pending" && (
                              <Button
                                onClick={() => handleCancelBooking(booking.id)}
                                variant="outline"
                                className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-full text-xs font-semibold px-4 transition"
                              >
                                Cancel Request
                              </Button>
                            )}
                            <Link
                              href={`/tours/${booking.tourId}`}
                              className="inline-flex items-center justify-center bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold px-4 py-2 rounded-full border border-navy hover:border-gold transition-all duration-300 cursor-pointer text-center"
                            >
                              View Details
                            </Link>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Empty State
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white rounded-3xl border border-navy/5 shadow-sm space-y-6 max-w-md mx-auto"
                >
                  <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold">
                    <Compass className="h-8 w-8 animate-spin-slow" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-navy">No Bookings Found</h3>
                    <p className="text-sm text-muted-foreground px-6 leading-relaxed font-light">
                      We couldn't find any historical records matching your filters. Book an unforgettable journey today.
                    </p>
                  </div>
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center bg-gold hover:bg-gold-hover text-navy font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-md border border-gold hover:border-gold-hover transition-all duration-300"
                  >
                    Book a New Tour
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
