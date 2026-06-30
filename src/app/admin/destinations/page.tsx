"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, MapPin, Edit, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { getDestinations, createDestination, deleteDestination } from "@/lib/actions/destinations";

export default function AdminDestinationsPage() {
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [highlightsText, setHighlightsText] = useState("");

  async function loadDestinations() {
    try {
      const res = await getDestinations();
      if (res.success && res.data) {
        setDestinations(res.data);
      } else {
        addToast(res.error || "Failed to load destinations", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch destinations from server", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDestinations();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !heroImage) {
      addToast("Please fill in all required fields", "error");
      return;
    }

    setSubmitting(true);
    addToast("Saving destination...", "info");

    const payload = {
      name,
      description,
      heroImage,
      gallery: [],
      highlights: highlightsText ? highlightsText.split("\n").map(h => h.trim()).filter(Boolean) : ["Luxury Package"],
    };

    try {
      const res = await createDestination(payload);
      if (res.success) {
        addToast("Destination created successfully!", "success");
        setIsDialogOpen(false);
        // Reset form
        setName("");
        setDescription("");
        setHeroImage("");
        setHighlightsText("");
        loadDestinations();
      } else {
        addToast(res.error || "Failed to create destination", "error");
      }
    } catch (err: any) {
      addToast(err.message || "Failed to create destination", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this destination? Tours linked to this destination name will remain in database.")) {
      addToast("Deleting destination...", "info");
      try {
        const res = await deleteDestination(id);
        if (res.success) {
          addToast("Destination deleted successfully", "success");
          loadDestinations();
        } else {
          addToast(res.error || "Failed to delete destination", "error");
        }
      } catch (err: any) {
        addToast(err.message || "Failed to delete destination", "error");
      }
    }
  };

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Destinations</h1>
          <p className="text-muted-foreground mt-1">Manage locations and region profiles.</p>
        </div>
        
        {/* Create Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-white text-navy border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-navy font-bold text-lg">Add New Destination</DialogTitle>
              <DialogDescription>
                Create a geographical profile card for the website.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Destination Name</label>
                <Input 
                  placeholder="E.g. Lalibela" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 border-slate-200"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Hero Image URL / Path</label>
                <Input 
                  placeholder="/assets/gallery/lalibela.jpg or Unsplash URL" 
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="bg-slate-50 border-slate-200"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Highlights (One per line)</label>
                <Textarea 
                  placeholder="Rock-Hewn Churches&#10;Bete Giyorgis&#10;12th Century Monasteries" 
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="bg-slate-50 border-slate-200 h-20 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Description</label>
                <Textarea 
                  placeholder="Describe the cultural and natural appeal of the destination..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-50 border-slate-200 h-28 resize-none"
                  required
                />
              </div>

              <DialogFooter className="pt-4 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="border-slate-200 text-slate-600"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-gold hover:bg-gold-hover text-navy font-bold border border-gold hover:border-gold-hover"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Destination"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search destinations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-20 text-center flex items-center justify-center gap-2 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
          Loading destinations...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map(destination => (
            <Card key={destination.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow group bg-white">
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img 
                  src={destination.heroImage} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-navy backdrop-blur-sm border-none shadow-sm font-semibold">
                    Active
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-serif text-lg font-bold text-navy mb-1">{destination.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Ethiopia
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      onClick={() => handleDelete(destination.id)}
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Card trigger */}
          <Card 
            onClick={() => setIsDialogOpen(true)}
            className="overflow-hidden border-dashed border-2 border-slate-350 shadow-none hover:border-gold hover:bg-gold/5 transition-colors flex items-center justify-center min-h-[300px] cursor-pointer group"
          >
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-slate-100 group-hover:bg-gold/20 flex items-center justify-center mx-auto transition-colors">
                <Plus className="h-6 w-6 text-slate-400 group-hover:text-gold" />
              </div>
              <p className="font-medium text-slate-650 group-hover:text-navy">Add New Destination</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
