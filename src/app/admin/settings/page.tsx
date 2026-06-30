"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";
import { getWebsiteSettings, updateWebsiteSettings } from "@/lib/actions/settings";

export default function AdminSettingsPage() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    companyName: "Travel With Mercy",
    email: "travelwithmercy15@gmail.com",
    phone: "+251 912 826 488",
    address: "Addis Ababa, Ethiopia",
    facebook: "",
    instagram: "",
    tiktok: "",
    heroTitle: "Experience Luxury Travel in Ethiopia",
    heroSubtitle: "Bespoke, private, and fully guided travel experiences through the historical and wonders of East Africa.",
    logoUrl: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await getWebsiteSettings();
        if (res.success && res.data) {
          const d = res.data;
          setForm({
            companyName: d.companyName,
            email: d.email,
            phone: d.phone,
            address: d.address,
            facebook: d.facebook || "",
            instagram: d.instagram || "",
            tiktok: d.tiktok || "",
            heroTitle: d.heroTitle,
            heroSubtitle: d.heroSubtitle,
            logoUrl: d.logoUrl || "",
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    addToast("Saving changes to database...", "info");

    try {
      const res = await updateWebsiteSettings(form);
      if (res.success) {
        addToast("Settings updated successfully!", "success");
      } else {
        addToast(res.error || "Failed to update settings", "error");
      }
    } catch (err: any) {
      addToast(err.message || "Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="p-12 flex items-center justify-center gap-2 text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
        Loading settings...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage global website configurations.</p>
        </div>
        <Button 
          type="submit" 
          disabled={saving}
          className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Settings Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Company Information</CardTitle>
              <CardDescription>Public facing details about the agency.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Agency Name</label>
                <Input 
                  value={form.companyName} 
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="bg-slate-50" 
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Support Email</label>
                  <Input 
                    type="email"
                    value={form.email} 
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-slate-50" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <Input 
                    value={form.phone} 
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="bg-slate-50" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Office Address</label>
                <Input 
                  value={form.address} 
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="bg-slate-50" 
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Social Media Links</CardTitle>
              <CardDescription>Configure connection hrefs for footer integration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Facebook URL</label>
                <Input 
                  type="url"
                  placeholder="https://facebook.com/..." 
                  value={form.facebook}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  className="bg-slate-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Instagram URL</label>
                <Input 
                  type="url"
                  placeholder="https://instagram.com/..." 
                  value={form.instagram}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  className="bg-slate-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">TikTok URL</label>
                <Input 
                  type="url"
                  placeholder="https://tiktok.com/@..." 
                  value={form.tiktok}
                  onChange={(e) => handleChange("tiktok", e.target.value)}
                  className="bg-slate-50" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Branding Settings */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Homepage Content</CardTitle>
              <CardDescription>Hero banner texts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Hero Title</label>
                <Input 
                  value={form.heroTitle}
                  onChange={(e) => handleChange("heroTitle", e.target.value)}
                  className="bg-slate-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Hero Subtitle</label>
                <Textarea 
                  value={form.heroSubtitle}
                  onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                  className="bg-slate-50 h-28 resize-none"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
