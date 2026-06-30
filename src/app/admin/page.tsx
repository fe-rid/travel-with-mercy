"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookingTrendsChart, RevenueChart } from "@/components/admin/charts/DashboardCharts";
import { DollarSign, Users, Map, CalendarCheck, TrendingUp, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getDashboardStats } from "@/lib/actions/bookings";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: "Total Bookings", value: "0", icon: CalendarCheck, change: "0", trend: "neutral" },
    { title: "Active Tours", value: "0", icon: Map, change: "0", trend: "neutral" },
    { title: "Total Revenue", value: "$0", icon: DollarSign, change: "0", trend: "neutral" },
    { title: "Customers", value: "0", icon: Users, change: "0", trend: "neutral" },
  ]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [trends, setTrends] = useState<any[]>([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await getDashboardStats();
        if (res.success && res.data) {
          const d = res.data;
          setStats([
            { title: "Total Bookings", value: String(d.totalBookings), icon: CalendarCheck, change: `Pending: ${d.pendingBookings}`, trend: "neutral" },
            { title: "Active Tours", value: String(d.activeTours), icon: Map, change: `Destinations: ${d.destinationsCount}`, trend: "neutral" },
            { title: "Total Revenue", value: `$${d.totalRevenue.toLocaleString()}`, icon: DollarSign, change: `Confirmed: ${d.confirmedBookings}`, trend: "neutral" },
            { title: "Customers", value: String(d.customersCount), icon: Users, change: "Unique Contacts", trend: "neutral" },
          ]);
          setRecentBookings(d.recentBookings);
          setTrends(d.bookingTrends);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your travel agency's performance.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => window.print()}
            className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors"
          >
            Print Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="h-10 w-10 bg-gold/10 rounded-full flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-gold" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-navy">{loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : stat.value}</h2>
                {!loading && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-navy">Booking Trends</CardTitle>
            <CardDescription>Number of bookings over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (
              <BookingTrendsChart data={trends} />
            )}
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg text-navy">Monthly Revenue</CardTitle>
            <CardDescription>Income generated per month (USD)</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : (
              <RevenueChart data={trends} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings Widget */}
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg text-navy">Recent Bookings</CardTitle>
            <CardDescription>Latest customer requests and reservations</CardDescription>
          </div>
          <Link href="/admin/bookings" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 h-9 px-3 text-sky-600 hover:text-sky-700">
            View All <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Booking ID</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Tour</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right rounded-tr-lg">Amount</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                      <Loader2 className="h-4 w-4 animate-spin inline mr-2" /> Loading recent bookings...
                    </td>
                  </tr>
                ) : recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-navy">{booking.id}</td>
                      <td className="px-4 py-3 text-slate-600">{booking.customer}</td>
                      <td className="px-4 py-3 text-slate-600">{booking.tour}</td>
                      <td className="px-4 py-3 text-slate-600">{booking.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full ${
                          booking.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                          booking.status === "Pending" ? "bg-amber-100 text-amber-700" :
                          booking.status === "Approved" ? "bg-sky-100 text-sky-700" :
                          booking.status === "Confirmed" ? "bg-blue-100 text-blue-700" :
                          "bg-rose-100 text-rose-700"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-navy text-right">{booking.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                      No recent bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
