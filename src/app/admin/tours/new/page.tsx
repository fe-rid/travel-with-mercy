"use client";

import Link from "next/link";
import { ArrowLeft, Save, ImagePlus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NewTourPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/tours" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 h-10 w-10 text-slate-500 hover:text-navy">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-navy">Create New Tour</h1>
            <p className="text-muted-foreground mt-1">Add a new travel package to your catalog.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/tours" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-slate-300 text-slate-700">Cancel</Link>
          <Button className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors">
            <Save className="h-4 w-4 mr-2" />
            Save Tour
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Form Area */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-navy">General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tour Name</label>
                <Input placeholder="e.g. Historic Northern Route" className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <Textarea 
                  placeholder="Detailed description of the tour experience..." 
                  className="min-h-[120px] bg-slate-50" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Duration</label>
                  <Input placeholder="e.g. 7 Days, 6 Nights" className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Base Price (USD)</label>
                  <Input type="number" placeholder="e.g. 1500" className="bg-slate-50" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Services</CardTitle>
              <CardDescription>What is included and excluded in the price.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Included</label>
                  <Button variant="ghost" size="sm" className="h-8 text-sky-600">
                    <Plus className="h-4 w-4 mr-1" /> Add Item
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input defaultValue="All domestic flights" className="bg-slate-50" />
                  <Button variant="ghost" size="icon" className="text-rose-500 shrink-0"><Trash2 className="h-4 w-4"/></Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input defaultValue="Premium accommodation" className="bg-slate-50" />
                  <Button variant="ghost" size="icon" className="text-rose-500 shrink-0"><Trash2 className="h-4 w-4"/></Button>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Excluded</label>
                  <Button variant="ghost" size="sm" className="h-8 text-sky-600">
                    <Plus className="h-4 w-4 mr-1" /> Add Item
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input defaultValue="International flights" className="bg-slate-50" />
                  <Button variant="ghost" size="icon" className="text-rose-500 shrink-0"><Trash2 className="h-4 w-4"/></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Form Area */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <select className="w-full h-10 px-3 rounded-md border border-input bg-slate-50 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="active">Active (Published)</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Primary Image</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <ImagePlus className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm text-slate-600 font-medium">Click to upload</span>
                  <span className="text-xs text-slate-400 mt-1">SVG, PNG, JPG (Max 2MB)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <select className="w-full h-10 px-3 rounded-md border border-input bg-slate-50 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="north">Northern Circuit</option>
                  <option value="south">Omo Valley</option>
                  <option value="danakil">Danakil Depression</option>
                  <option value="addis">Addis Ababa</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">Select the primary region this tour covers.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
