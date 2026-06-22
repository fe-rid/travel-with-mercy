"use client";

import { useState, useEffect } from "react";
import { recentBookings, Booking } from "@/data/adminDemoData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, CheckCircle, XCircle, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminBookingsPage() {
  const { addToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Load from localStorage or seed
  useEffect(() => {
    const existing = localStorage.getItem("twm_bookings");
    if (existing) {
      setBookings(JSON.parse(existing));
    } else {
      localStorage.setItem("twm_bookings", JSON.stringify(recentBookings));
      setBookings(recentBookings);
    }
    setLoading(false);
  }, []);

  const handleUpdateStatus = (id: string, newStatus: Booking["status"]) => {
    addToast(`Updating booking status to ${newStatus}...`, "info");
    setTimeout(() => {
      const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
      setBookings(updated);
      localStorage.setItem("twm_bookings", JSON.stringify(updated));
      addToast(`Booking status updated successfully!`, "success");
    }, 500);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Are you sure you want to delete this booking request?")) {
      addToast("Deleting booking request...", "info");
      setTimeout(() => {
        const updated = bookings.filter(b => b.id !== id);
        setBookings(updated);
        localStorage.setItem("twm_bookings", JSON.stringify(updated));
        addToast("Booking request deleted", "success");
      }, 500);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = (booking.customer || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (booking.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (booking.tour || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch(status) {
      case "Completed": return "success";
      case "Pending": return "warning";
      case "Approved": return "secondary";
      case "Confirmed": return "default";
      case "Cancelled": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage customer reservations and inquiries.</p>
        </div>
        <Button className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors">
          Create Booking
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search bookings..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center text-sm font-medium text-slate-500 mr-2">
            <Filter className="h-4 w-4 mr-2" />
            Filter:
          </div>
          {["All", "Pending", "Approved", "Confirmed", "Completed", "Cancelled"].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                statusFilter === status 
                  ? "bg-navy text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading bookings...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tour Package</TableHead>
                <TableHead>Travel Date</TableHead>
                <TableHead className="text-center">Travelers</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium text-navy">{booking.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.customer}</div>
                      {booking.email && <div className="text-xs text-slate-400">{booking.email}</div>}
                    </TableCell>
                    <TableCell>{booking.tour}</TableCell>
                    <TableCell className="text-slate-500">
                      {booking.departureDate ? `${new Date(booking.departureDate).toLocaleDateString()} - ${new Date(booking.returnDate).toLocaleDateString()}` : booking.date}
                    </TableCell>
                    <TableCell className="text-center">{booking.travelers}</TableCell>
                    <TableCell className="font-medium">{booking.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(booking.status) as any}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {booking.status === "Pending" && (
                          <Button 
                            onClick={() => handleUpdateStatus(booking.id, "Confirmed")}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            title="Approve & Confirm"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Confirm</span>
                          </Button>
                        )}
                        {booking.status === "Pending" && (
                          <Button 
                            onClick={() => handleUpdateStatus(booking.id, "Cancelled")}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            title="Reject / Cancel"
                          >
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                          </Button>
                        )}
                        <Button 
                          onClick={() => handleDeleteBooking(booking.id)}
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                          title="Delete Request"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-slate-500">
                    No bookings found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
