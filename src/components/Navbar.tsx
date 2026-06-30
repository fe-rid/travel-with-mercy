"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Destinations", href: "/#destinations" },
  { name: "Tours", href: "/#tours" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "My Bookings", href: "/my-bookings" },
];

interface NavbarProps {
  settings?: any;
}

export default function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only calculate active section if we are on the home page
      if (pathname === "/") {
        const sections = ["home", "about", "destinations", "tours", "gallery", "testimonials", "contact"];
        const currentSection = sections.find((section) => {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            return rect.top <= 120 && rect.bottom >= 120;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }
      } else if (pathname.startsWith("/my-bookings")) {
        setActiveSection("my-bookings");
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If navigating to a separate route (like /my-bookings or if navigating to / homepage from another route)
    if (href.startsWith("/my-bookings") || href === "/") {
      setIsMobileMenuOpen(false);
      return; // let next/link route normally
    }

    // If it's a section on the home page but we are currently on a subpage
    if (pathname !== "/") {
      setIsMobileMenuOpen(false);
      return; // let next/link navigate to /#section and load the page
    }

    // Otherwise, we are on the homepage, scroll smoothly
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("/#", "").replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const getActiveItemName = () => {
    if (activeSection === "home") return "/";
    if (activeSection === "my-bookings") return "/my-bookings";
    return `/#${activeSection}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== "/"
          ? "bg-[#050E1A]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-4"
          : "bg-gradient-to-b from-[#050E1A]/60 to-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative p-2 rounded-full bg-gold/10 border border-gold/30 group-hover:bg-gold/20 transition-all duration-300">
            <Globe className="h-6 w-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-serif text-lg md:text-xl font-bold tracking-widest text-white">
            {(settings?.companyName || "TRAVEL WITH MERCY").includes("MERCY") ? (
              <>
                {(settings?.companyName || "TRAVEL WITH MERCY").split("MERCY")[0]}
                <span className="text-gold">MERCY</span>
                {(settings?.companyName || "TRAVEL WITH MERCY").split("MERCY")[1]}
              </>
            ) : (
              settings?.companyName || "TRAVEL WITH MERCY"
            )}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = getActiveItemName() === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-xs font-semibold tracking-widest uppercase transition-colors duration-300 py-1 ${
                  isActive
                    ? "text-gold font-bold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-gold hover:bg-gold-hover text-navy font-bold px-6 py-2.5 rounded-full border border-gold hover:border-gold-hover shadow-lg hover:shadow-gold/20 transition-all duration-300 uppercase tracking-widest text-[11px] cursor-pointer"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-gold transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#050E1A]/98 border-b border-white/10 backdrop-blur-lg overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = getActiveItemName() === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 py-2 border-b border-white/5 ${
                      isActive
                        ? "text-gold font-extrabold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center bg-gold hover:bg-gold-hover text-navy font-bold py-3 rounded-full mt-4 w-full uppercase tracking-wider text-xs shadow-md border border-gold hover:border-gold-hover transition-all duration-300 text-center"
              >
                Book Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
