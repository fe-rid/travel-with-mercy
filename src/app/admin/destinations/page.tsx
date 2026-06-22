"use client";

import { useState } from "react";
import { destinations } from "@/data/travelData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Edit, Trash2 } from "lucide-react";

export default function AdminDestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

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
        <Button className="bg-navy hover:bg-gold hover:text-navy text-white transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Destination
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search destinations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.map(destination => (
          <Card key={destination.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-48 relative overflow-hidden bg-slate-100">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-navy backdrop-blur-sm border-none shadow-sm">
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
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-sky-600 hover:text-sky-700 hover:bg-sky-50">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Card */}
        <Card className="overflow-hidden border-dashed border-2 border-slate-300 shadow-none hover:border-sky-400 hover:bg-sky-50/50 transition-colors flex items-center justify-center min-h-[300px] cursor-pointer group">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center mx-auto transition-colors">
              <Plus className="h-6 w-6 text-slate-400 group-hover:text-sky-600" />
            </div>
            <p className="font-medium text-slate-600 group-hover:text-sky-700">Add New Destination</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
