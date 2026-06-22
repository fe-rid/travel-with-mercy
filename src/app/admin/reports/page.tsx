"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookingTrendsChart, RevenueChart } from "@/components/admin/charts/DashboardCharts";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Detailed insights into business performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-300">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors">
            <FileText className="h-4 w-4 mr-2" />
            Generate PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg text-navy">Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue breakdown for the year</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-navy">
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg text-navy">Booking Volume</CardTitle>
              <CardDescription>Number of reservations processed</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-navy">
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <BookingTrendsChart />
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-navy">Destination Performance</CardTitle>
          <CardDescription>Revenue and booking breakdown by location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Destination</th>
                  <th className="px-4 py-3 font-semibold">Total Bookings</th>
                  <th className="px-4 py-3 font-semibold">Revenue Generated</th>
                  <th className="px-4 py-3 font-semibold text-right rounded-tr-lg">Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-navy">Lalibela</td>
                  <td className="px-4 py-3 text-slate-600">450</td>
                  <td className="px-4 py-3 text-slate-600">$125,000</td>
                  <td className="px-4 py-3 text-emerald-600 font-medium text-right">+15%</td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-navy">Simien Mountains</td>
                  <td className="px-4 py-3 text-slate-600">320</td>
                  <td className="px-4 py-3 text-slate-600">$85,400</td>
                  <td className="px-4 py-3 text-emerald-600 font-medium text-right">+8%</td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-navy">Danakil Depression</td>
                  <td className="px-4 py-3 text-slate-600">280</td>
                  <td className="px-4 py-3 text-slate-600">$95,000</td>
                  <td className="px-4 py-3 text-rose-600 font-medium text-right">-2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
