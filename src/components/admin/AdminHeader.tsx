"use client";

import { Bell, Menu, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface AdminHeaderProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function AdminHeader({ setIsOpen }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-navy/10 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-navy"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        {/* Global Search */}
        <div className="hidden sm:flex relative w-96 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookings, tours, customers..."
            className="pl-9 bg-muted/30 border-muted focus-visible:ring-gold focus-visible:border-gold h-9 text-sm rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/" target="_blank" title="View Live Website" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 h-10 w-10 text-navy hover:text-gold hover:bg-gold/10 hidden sm:flex">
          <Home className="h-5 w-5" />
        </Link>
        
        <Button variant="ghost" size="icon" className="relative text-navy hover:text-gold hover:bg-gold/10">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white"></span>
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
