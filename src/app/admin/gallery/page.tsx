"use client";

import { useState } from "react";
import { galleryImages } from "@/data/travelData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Trash2, Filter } from "lucide-react";

export default function AdminGalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(galleryImages.map((img) => img.category)))];

  const filteredGallery = galleryImages.filter((item) => {
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
        <Button className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors">
          <Upload className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
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

      {/* Masonry Grid Simulation */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredGallery.map((item, idx) => (
          <div key={idx} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-auto object-cover"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
              <div className="flex justify-between items-start">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-wider rounded-md font-semibold">
                  {item.category}
                </span>
                <Button variant="destructive" size="icon" className="h-8 w-8 bg-rose-500 hover:bg-rose-600 text-white shadow-md">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-white text-sm font-medium line-clamp-2">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredGallery.length === 0 && (
        <div className="py-20 text-center bg-white rounded-xl border border-slate-200">
          <p className="text-muted-foreground">No images found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
