"use client";

import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  const whatsappNumber = "+251912826488";
  const message = encodeURIComponent("Hello Travel With Mercy, I would like to inquire about booking a luxury tour package in Ethiopia.");
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsating ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 blur-sm animate-ping duration-1000" />
        
        {/* Button body */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center text-white border border-[#20ba56]/20 transition-all cursor-pointer"
        >
          {/* Custom WhatsApp SVG icon */}
          <svg
            className="w-7 h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.968.01c3.184.001 6.177 1.24 8.426 3.492 2.25 2.25 3.486 5.244 3.486 8.428 0 6.623-5.337 11.96-11.91 11.96-2.008-.002-3.98-.51-5.772-1.482L0 24zm6.59-4.846c1.785 1.06 3.555 1.622 5.316 1.625 5.428 0 9.845-4.417 9.848-9.848.002-2.63-1.018-5.1-2.872-6.953C17.086 2.124 14.617 1.1 11.97 1.1c-5.433 0-9.85 4.416-9.852 9.849-.001 1.889.493 3.73 1.43 5.367L2.484 21.6l5.35-1.402c-.41-.225-.794-.482-1.187-.804zm11.758-6.865c-.328-.164-1.94-.957-2.24-1.067-.3-.11-.518-.164-.736.164-.218.327-.846 1.066-1.037 1.284-.19.218-.38.245-.708.082-.328-.164-1.385-.51-2.64-1.63-1-.893-1.673-1.996-1.87-2.324-.197-.328-.02-.505.143-.668.148-.147.328-.382.492-.573.164-.19.219-.327.328-.545.11-.218.055-.41-.027-.573-.082-.164-.736-1.772-1.008-2.427-.267-.64-.537-.554-.736-.564-.19-.01-.408-.01-.626-.01-.218 0-.573.082-.872.41-.3.327-1.144 1.118-1.144 2.727 0 1.61 1.172 3.162 1.336 3.38.164.218 2.3 3.51 5.572 4.92.778.336 1.385.537 1.859.687.782.25 1.493.214 2.055.13.626-.094 1.94-.792 2.213-1.554.272-.763.272-1.417.19-1.554-.083-.136-.3-.218-.628-.382z" />
          </svg>
        </motion.div>
      </a>
    </div>
  );
}
