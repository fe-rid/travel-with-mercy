"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Upload, Trash2, Filter, Loader2, Plus, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { getGalleryImages, uploadAndAddImage, deleteGalleryImage } from "@/lib/actions/gallery";

export default function AdminGalleryPage() {
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Upload Form State
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Heritage");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function loadGallery() {
    try {
      const res = await getGalleryImages();
      if (res.success && res.data) {
        setGallery(res.data);
      } else {
        addToast(res.error || "Failed to load gallery", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch gallery from server", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      addToast("Please select an image file to upload", "error");
      return;
    }

    setUploading(true);
    addToast("Uploading image to Cloudinary...", "info");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("category", category);
    formData.append("caption", caption);

    try {
      const res = await uploadAndAddImage(formData);
      if (res.success) {
        addToast("Image uploaded and added to gallery successfully!", "success");
        setIsDialogOpen(false);
        // Clear form
        setCaption("");
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        loadGallery();
      } else {
        addToast(res.error || "Failed to upload image", "error");
      }
    } catch (err: any) {
      addToast(err.message || "Failed to upload image", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this gallery item? This will remove it from Cloudinary and the database.")) {
      addToast("Deleting item...", "info");
      try {
        const res = await deleteGalleryImage(id);
        if (res.success) {
          addToast("Gallery item deleted successfully", "success");
          loadGallery();
        } else {
          addToast(res.error || "Failed to delete item", "error");
        }
      } catch (err: any) {
        addToast(err.message || "Failed to delete item", "error");
      }
    }
  };

  const categories = ["All", "Heritage", "Nature"];

  const filteredGallery = gallery.filter((item) => {
    const matchesSearch = item.caption.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">Gallery</h1>
          <p className="text-muted-foreground mt-1">Manage website images and media assets.</p>
        </div>
        
        {/* Upload Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button 
            className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors"
            onClick={() => setIsDialogOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
          <DialogContent className="sm:max-w-md bg-white text-navy border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-navy font-bold text-lg">Upload Media Asset</DialogTitle>
              <DialogDescription>
                Select an image file. It will be stored securely on Cloudinary CDN.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUploadSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Image File</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
                >
                  <ImageIcon className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-xs text-slate-600 font-semibold truncate max-w-xs">
                    {selectedFile ? selectedFile.name : "Click to browse files"}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP, GIF up to 5MB</span>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm"
                >
                  <option value="Heritage">Heritage</option>
                  <option value="Nature">Nature</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Caption (Optional)</label>
                <Input 
                  placeholder="E.g. Sunrise trek over Mount Bwahit" 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="bg-slate-50 border-slate-200"
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
                  disabled={uploading}
                  className="bg-gold hover:bg-gold-hover text-navy font-bold border border-gold hover:border-gold-hover"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload & Add"
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
            placeholder="Search images..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center text-sm font-medium text-slate-500 mr-2">
            <Filter className="h-4 w-4 mr-2" />
            Category:
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeCategory === category 
                  ? "bg-navy text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      {loading ? (
        <div className="p-20 text-center flex items-center justify-center gap-2 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
          Loading gallery images...
        </div>
      ) : filteredGallery.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredGallery.map((item) => (
            <div key={item.id} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <img
                src={item.imageUrl}
                alt={item.caption || "Gallery Image"}
                className="w-full h-auto object-cover"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-wider rounded-md font-semibold">
                    {item.category}
                  </span>
                  <Button 
                    onClick={() => handleDelete(item.id)}
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8 bg-rose-500 hover:bg-rose-600 text-white shadow-md"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {item.caption && (
                  <p className="text-white text-sm font-medium line-clamp-2">{item.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-xl border border-slate-200">
          <p className="text-muted-foreground">No images found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
