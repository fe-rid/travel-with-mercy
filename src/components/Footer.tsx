"use client";

import Link from "next/link";
import { Globe, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80;
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

  return (
    <footer className="bg-[#050E1A] text-white/80 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="p-2 rounded-full bg-gold/10 border border-gold/30">
                <Globe className="h-6 w-6 text-gold" />
              </div>
              <span className="font-serif text-lg md:text-xl font-bold tracking-widest text-white">
                TRAVEL WITH <span className="text-gold">MERCY</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your premier luxury travel partner in East Africa. Crafting bespoke, unforgettable journeys through the rich historical and cultural landscape of Ethiopia.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5 fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300"
                aria-label="TikTok"
              >
                {/* TikTok Icon using custom SVG */}
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.19 1.11 1.25 2.67 2.05 4.31 2.27v3.9c-1.44-.06-2.86-.54-4.06-1.34-.34-.23-.66-.49-.96-.78v6.78c-.03 2.1-.73 4.19-2.07 5.75-1.57 1.83-3.95 2.92-6.38 2.95-2.6.03-5.18-1.07-6.86-3.07-1.74-2.06-2.45-4.86-1.92-7.52.54-2.73 2.45-5.07 5.09-6.04 1.25-.46 2.61-.57 3.91-.32V10.2c-.89-.25-1.87-.1-2.66.42-.9.59-1.47 1.61-1.5 2.68-.05 1.58.98 3.05 2.51 3.42 1.15.28 2.41-.12 3.12-1.04.49-.64.71-1.44.69-2.25V.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-white text-base font-semibold tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#home"
                  onClick={(e) => handleNavClick(e, "#home")}
                  className="hover:text-gold transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className="hover:text-gold transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#destinations"
                  onClick={(e) => handleNavClick(e, "#destinations")}
                  className="hover:text-gold transition-colors duration-300"
                >
                  Featured Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="#tours"
                  onClick={(e) => handleNavClick(e, "#tours")}
                  className="hover:text-gold transition-colors duration-300"
                >
                  Luxury Tours
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  onClick={(e) => handleNavClick(e, "#gallery")}
                  className="hover:text-gold transition-colors duration-300"
                >
                  Media Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="font-serif text-white text-base font-semibold tracking-wider uppercase">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a href="tel:+251912826488" className="hover:text-gold transition-colors">
                  +251 912 826 488
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a
                  href="mailto:travelwithmercy15@gmail.com"
                  className="hover:text-gold transition-colors break-all"
                >
                  travelwithmercy15@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-white text-base font-semibold tracking-wider uppercase">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to receive updates on exclusive tour packages, travel deals, and cultural insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 w-full"
              />
              <button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} TRAVEL WITH MERCY. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
