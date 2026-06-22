"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Upload } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage global website configurations.</p>
        </div>
        <Button className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Settings Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Company Information</CardTitle>
              <CardDescription>Public facing details about the agency.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Agency Name</label>
                <Input defaultValue="Travel With Mercy" className="bg-slate-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Support Email</label>
                  <Input defaultValue="hello@travelwithmercy.com" className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <Input defaultValue="+251 91 282 6488" className="bg-slate-50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Office Address</label>
                <Input defaultValue="Bole, Addis Ababa, Ethiopia" className="bg-slate-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Facebook URL</label>
                <Input placeholder="https://facebook.com/..." className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Instagram URL</label>
                <Input placeholder="https://instagram.com/..." className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">TikTok URL</label>
                <Input placeholder="https://tiktok.com/@..." className="bg-slate-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Branding Settings */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Brand Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <Upload className="h-6 w-6 text-slate-400 mb-2" />
                <span className="text-sm text-slate-600 font-medium">Upload Logo</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
