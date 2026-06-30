"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/Toast";
import { createTour } from "@/lib/actions/tours";
import { getDestinations } from "@/lib/actions/destinations";

export default function NewTourPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [saving, setSaving] = useState(false);
  const [destinations, setDestinations] = useState<any[]>([]);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");
  const [destination, setDestination] = useState("");
  const [heroImage, setHeroImage] = useState("");

  const [included, setIncluded] = useState<string[]>(["All domestic flights", "Premium accommodation"]);
  const [newIncludedItem, setNewIncludedItem] = useState("");

  const [excluded, setExcluded] = useState<string[]>(["International flights", "Personal travel insurance"]);
  const [newExcludedItem, setNewExcludedItem] = useState("");

  const [highlightsText, setHighlightsText] = useState("");

  useEffect(() => {
    async function loadDestinations() {
      try {
        const res = await getDestinations();
        if (res.success && res.data) {
          setDestinations(res.data);
          if (res.data.length > 0) {
            setDestination(res.data[0].name);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadDestinations();
  }, []);

  const handleAddIncluded = () => {
    if (newIncludedItem.trim()) {
      setIncluded([...included, newIncludedItem.trim()]);
      setNewIncludedItem("");
    }
  };

  const handleRemoveIncluded = (index: number) => {
    setIncluded(included.filter((_, i) => i !== index));
  };

  const handleAddExcluded = () => {
    if (newExcludedItem.trim()) {
      setExcluded([...excluded, newExcludedItem.trim()]);
      setNewExcludedItem("");
    }
  };

  const handleRemoveExcluded = (index: number) => {
    setExcluded(excluded.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !duration || !price || !heroImage) {
      addToast("Please fill in all general details and upload a primary image", "error");
      return;
    }

    setSaving(true);
    addToast("Saving tour package...", "info");

    const highlights = highlightsText 
      ? highlightsText.split("\n").map(h => h.trim()).filter(Boolean) 
      : ["Luxury Guided Tour", "Bespoke Activities"];

    const itinerary = [
      { day: 1, title: "Arrival & Reception", description: "Arrive in Addis Ababa Bole International Airport. Meet your luxury guide and transfer to your boutique hotel." },
      { day: 2, title: "Guided Historic City Tour", description: "Explore the national museum, ancient churches, and enjoy traditional Ethiopian culinary arts." }
    ];

    const payload = {
      title,
      description,
      duration,
      price: price.startsWith("$") ? price : `$${Number(price).toLocaleString()}`,
      destination,
      heroImage,
      galleryImages: [heroImage],
      highlights,
      itinerary,
      includedServices: included,
      excludedServices: excluded,
      featured: false,
      status,
      faqs: [
        { question: "What is the best time to visit?", answer: "Dry season between October and April is recommended for perfect weather." },
        { question: "Are local flights included?", answer: "Yes, all domestic transfers and flights are covered in our premium pricing." }
      ]
    };

    try {
      const res = await createTour(payload);
      if (res.success) {
        addToast("Tour package created successfully!", "success");
        router.push("/admin/tours");
        router.refresh();
      } else {
        addToast(res.error || "Failed to create tour", "error");
      }
    } catch (err: any) {
      addToast(err.message || "Failed to save tour package", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl mx-auto pb-10">
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
          <Link href="/admin/tours" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-205 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-slate-700 rounded-lg">
            Cancel
          </Link>
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
                Save Tour
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Form Area */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tour Name</label>
                <Input 
                  placeholder="e.g. Historic Northern Route" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-50" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <Textarea 
                  placeholder="Detailed description of the tour experience..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] bg-slate-50 resize-none" 
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Duration</label>
                  <Input 
                    placeholder="e.g. 7 Days, 6 Nights" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-slate-50" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Base Price (USD)</label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 1500" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-slate-50" 
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Services</CardTitle>
              <CardDescription>What is included and excluded in the price.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Included list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Included Services</label>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add service, e.g. English-speaking guide" 
                    value={newIncludedItem}
                    onChange={(e) => setNewIncludedItem(e.target.value)}
                    className="bg-slate-50"
                  />
                  <Button type="button" onClick={handleAddIncluded} variant="outline" className="border-slate-200">Add</Button>
                </div>
                <div className="space-y-1.5">
                  {included.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 text-xs">
                      <span>{item}</span>
                      <button type="button" onClick={() => handleRemoveIncluded(idx)} className="text-rose-500 hover:text-rose-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Excluded list */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Excluded Services</label>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add excluded item, e.g. Tips and gratuity" 
                    value={newExcludedItem}
                    onChange={(e) => setNewExcludedItem(e.target.value)}
                    className="bg-slate-50"
                  />
                  <Button type="button" onClick={handleAddExcluded} variant="outline" className="border-slate-200">Add</Button>
                </div>
                <div className="space-y-1.5">
                  {excluded.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 text-xs">
                      <span>{item}</span>
                      <button type="button" onClick={() => handleRemoveExcluded(idx)} className="text-rose-500 hover:text-rose-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Form Area */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full h-10 px-3 rounded-md border border-input bg-slate-50 text-sm focus-visible:outline-none"
              >
                <option value="Published">Active (Published)</option>
                <option value="Draft">Draft (Hidden)</option>
              </select>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Hero Image Banner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500">Image URL / Path</label>
                <Input 
                  placeholder="e.g. /assets/gallery/lalibela.jpg"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="bg-slate-50"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Destination Circuits</CardTitle>
            </CardHeader>
            <CardContent>
              <select 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-slate-50 text-sm focus-visible:outline-none"
              >
                {destinations.length > 0 ? (
                  destinations.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))
                ) : (
                  <>
                    <option value="Northern Circuit">Northern Circuit</option>
                    <option value="Omo Valley">Omo Valley</option>
                    <option value="Danakil Depression">Danakil Depression</option>
                    <option value="Addis Ababa">Addis Ababa</option>
                  </>
                )}
              </select>
              <p className="text-xs text-muted-foreground mt-2">Select the primary region this tour covers.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-navy">Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="E.g. Visit rock churches&#10;Hike Simien mountains&#10;Private charter flights"
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                className="bg-slate-50 h-28 resize-none text-xs"
              />
              <p className="text-xs text-muted-foreground mt-2">Enter tour highlight items, one per line.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
