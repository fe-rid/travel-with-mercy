"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { Search, Plus, Map, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { getTours, deleteTour } from "@/lib/actions/tours";

export default function AdminToursPage() {
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTours() {
    try {
      const res = await getTours();
      if (res.success && res.data) {
        setTours(res.data);
      } else {
        addToast(res.error || "Failed to load tours", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch tours from server", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTours();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this tour package? This will permanently delete the tour from the database.")) {
      addToast("Deleting tour package...", "info");
      try {
        const res = await deleteTour(id);
        if (res.success) {
          addToast("Tour package deleted successfully", "success");
          loadTours();
        } else {
          addToast(res.error || "Failed to delete tour", "error");
        }
      } catch (err: any) {
        addToast(err.message || "Failed to delete tour", "error");
      }
    }
  };

  const filteredTours = tours.filter(tour => 
    tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Tours</h1>
          <p className="text-muted-foreground mt-1">Manage your tour packages and itineraries.</p>
        </div>
        <Link href="/admin/tours/new" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-navy hover:bg-gold hover:text-navy text-white font-bold rounded-lg shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New Tour
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tours..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin text-gold" />
            Loading tours from database...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Tour Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100 relative">
                        <img 
                          src={tour.heroImage} 
                          alt={tour.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-navy">{tour.title}</div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Map className="h-3 w-3" />
                        {tour.destination}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{tour.duration}</TableCell>
                    <TableCell className="font-medium">{tour.price}</TableCell>
                    <TableCell>
                      <Badge variant={tour.status === "Published" ? "success" : "warning"}>
                        {tour.status === "Published" ? "Active" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/tours/${tour.id}`} target="_blank" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 h-8 w-8 text-slate-500 hover:text-navy">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Preview</span>
                        </Link>
                        <Link href={`/admin/tours/edit?id=${tour.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-sky-50 h-8 w-8 text-sky-600 hover:text-sky-700">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <Button 
                          onClick={() => handleDelete(tour.id)}
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
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
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    No tours found.
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
