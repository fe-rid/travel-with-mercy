"use client";

import { useState, useEffect } from "react";
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
import { Search, Star, CheckCircle, XCircle, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { getTestimonials, approveTestimonial, rejectTestimonial, deleteTestimonial } from "@/lib/actions/testimonials";

export default function AdminTestimonialsPage() {
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTestimonials() {
    try {
      const res = await getTestimonials();
      if (res.success && res.data) {
        setTestimonials(res.data);
      } else {
        addToast(res.error || "Failed to load testimonials", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch testimonials from server", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleApprove = async (id: string) => {
    addToast("Approving review...", "info");
    try {
      const res = await approveTestimonial(id);
      if (res.success) {
        addToast("Testimonial published on website!", "success");
        loadTestimonials();
      } else {
        addToast(res.error || "Failed to approve", "error");
      }
    } catch (err: any) {
      addToast(err.message || "Failed to approve", "error");
    }
  };

  const handleReject = async (id: string) => {
    addToast("Rejecting review...", "info");
    try {
      const res = await rejectTestimonial(id);
      if (res.success) {
        addToast("Testimonial set to draft / unapproved", "success");
        loadTestimonials();
      } else {
        addToast(res.error || "Failed to reject", "error");
      }
    } catch (err: any) {
      addToast(err.message || "Failed to reject", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      addToast("Deleting testimonial...", "info");
      try {
        const res = await deleteTestimonial(id);
        if (res.success) {
          addToast("Testimonial deleted successfully", "success");
          loadTestimonials();
        } else {
          addToast(res.error || "Failed to delete", "error");
        }
      } catch (err: any) {
        addToast(err.message || "Failed to delete", "error");
      }
    }
  };

  const filteredReviews = testimonials.filter(r => 
    r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-navy">Testimonials</h1>
        <p className="text-muted-foreground mt-1">Moderate and manage customer reviews.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search reviews..." 
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
            Loading reviews from database...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="w-[40%]">Review</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium text-navy">
                      {review.customerName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-slate-200"}`} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-slate-600 line-clamp-2">{review.review}</p>
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {review.country}
                    </TableCell>
                    <TableCell>
                      <Badge variant={review.approved ? "success" : "warning"}>
                        {review.approved ? "Published" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {!review.approved ? (
                          <Button 
                            onClick={() => handleApprove(review.id)}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" 
                            title="Approve & Publish"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleReject(review.id)}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50" 
                            title="Set to Draft"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          onClick={() => handleDelete(review.id)}
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50" 
                          title="Delete Review"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    No reviews found.
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
