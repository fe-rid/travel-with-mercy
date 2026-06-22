import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TRAVEL WITH MERCY | Premium Luxury Travel Agency in Ethiopia",
  description: "Discover Ethiopia with confidence. Experience unforgettable adventures, cultural treasures, and personalized luxury tours with Travel With Mercy.",
  keywords: ["Travel Ethiopia", "Luxury Tours", "Lalibela Tour", "Simien Mountains Trekking", "Addis Ababa City Tour", "Travel With Mercy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        <ToastProvider>
          {children}
          <FloatingWhatsApp />
        </ToastProvider>
      </body>
    </html>
  );
}
