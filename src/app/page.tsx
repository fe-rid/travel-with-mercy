import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Destinations from "@/components/Destinations";
import Tours from "@/components/Tours";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { 
  tours as defaultTours, 
  destinations as defaultDestinations, 
  galleryImages as defaultGalleryImages,
  testimonials as defaultTestimonials
} from "@/data/travelData";

// Fetch settings from DB with fallback
async function getSettings() {
  try {
    const settings = await prisma.websiteSettings.findUnique({
      where: { id: "singleton" },
    });
    return settings || null;
  } catch (err) {
    console.error("Database settings load failed:", err);
    return null;
  }
}

// Fetch destinations from DB with fallback
async function getLiveDestinations() {
  try {
    const live = await prisma.destination.findMany({
      orderBy: { name: "asc" },
    });
    if (live.length === 0) return defaultDestinations;
    
    // Get tours count for each destination
    const tours = await prisma.tour.findMany({
      where: { status: "Published" }
    });

    return live.map(d => {
      // Find tours matching this destination name
      const count = tours.filter(t => t.destination.toLowerCase().includes(d.name.toLowerCase())).length;
      return {
        id: d.id,
        name: d.name,
        image: d.heroImage,
        description: d.description,
        toursCount: count || 3, // fallback count
      };
    });
  } catch {
    return defaultDestinations;
  }
}

// Fetch tours from DB with fallback
async function getLiveTours() {
  try {
    const live = await prisma.tour.findMany({
      where: { status: "Published" },
      orderBy: { createdAt: "desc" },
    });
    if (live.length === 0) return defaultTours;

    return live.map(t => ({
      id: t.id,
      title: t.title,
      duration: t.duration,
      price: t.price,
      rating: 5.0, // default rating for live packages
      image: t.heroImage,
      description: t.description,
      tags: t.highlights.slice(0, 3),
      highlights: t.highlights,
      gallery: t.galleryImages,
      itinerary: (t.itinerary as any) || [],
      included: t.includedServices,
      excluded: t.excludedServices,
      faqs: (t.faqs as any) || [],
    }));
  } catch {
    return defaultTours;
  }
}

// Fetch gallery images from DB with fallback
async function getLiveGallery() {
  try {
    const live = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (live.length === 0) return defaultGalleryImages;

    return live.map(img => ({
      id: img.id,
      url: img.imageUrl,
      caption: img.caption,
      category: img.category,
    }));
  } catch {
    return defaultGalleryImages;
  }
}

// Fetch testimonials from DB with fallback
async function getLiveTestimonials() {
  try {
    const live = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    if (live.length === 0) return defaultTestimonials;

    return live.map(test => ({
      id: test.id,
      name: test.customerName,
      role: test.country,
      content: test.review,
      rating: test.rating,
      avatar: test.avatar,
    }));
  } catch {
    return defaultTestimonials;
  }
}

export default async function Home() {
  const settings = await getSettings();
  const destinations = await getLiveDestinations();
  const tours = await getLiveTours();
  const galleryImages = await getLiveGallery();
  const testimonials = await getLiveTestimonials();

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-grow">
        <Hero settings={settings} />
        <About />
        <Destinations destinations={destinations} />
        <Tours tours={tours} />
        <WhyChooseUs />
        <Gallery galleryImages={galleryImages} />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer settings={settings} />
    </>
  );
}
