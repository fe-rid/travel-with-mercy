import { z } from "zod";

// Admin Authentication Schema
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Stepper Booking Validation Schema
export const BookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is too short"),
  nationality: z.string().min(2, "Nationality is required"),
  travelers: z.number().int().min(1, "At least 1 traveler is required"),
  departureDate: z.coerce.date({
    required_error: "Departure date is required",
    invalid_type_error: "Invalid departure date",
  }),
  returnDate: z.coerce.date({
    required_error: "Return date is required",
    invalid_type_error: "Invalid return date",
  }),
  notes: z.string().optional(),
  tourId: z.string().min(1, "Tour package selection is required"),
  hotelPreference: z.enum(["Standard", "Premium", "Luxury"]).default("Premium"),
}).refine((data) => data.returnDate > data.departureDate, {
  message: "Return date must be after departure date",
  path: ["returnDate"],
});

// Tour CRUD Validation Schema
export const TourSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  destination: z.string().min(1, "Destination selection is required"),
  heroImage: z.string().min(1, "Hero banner image path is required"),
  galleryImages: z.array(z.string()).default([]),
  highlights: z.array(z.string()).min(1, "Provide at least 1 tour highlight"),
  itinerary: z.array(
    z.object({
      day: z.number().int().min(1),
      title: z.string().min(1, "Day title is required"),
      description: z.string().min(1, "Day description is required"),
    })
  ).min(1, "Provide at least 1 day itinerary details"),
  includedServices: z.array(z.string()).default([]),
  excludedServices: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["Draft", "Published"]).default("Draft"),
  faqs: z.array(
    z.object({
      question: z.string().min(1, "FAQ question is required"),
      answer: z.string().min(1, "FAQ answer is required"),
    })
  ).optional().default([]),
});

// Destination CRUD Validation Schema
export const DestinationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  heroImage: z.string().min(1, "Hero image path is required"),
  gallery: z.array(z.string()).default([]),
  highlights: z.array(z.string()).min(1, "Provide at least 1 highlight for the destination"),
});

// Testimonial CRUD Validation Schema
export const TestimonialSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  country: z.string().min(2, "Country is required"),
  review: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.number().int().min(1).max(5),
  avatar: z.string().default("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"),
  approved: z.boolean().default(false),
});

// Gallery Image Validation Schema
export const GalleryImageSchema = z.object({
  imageUrl: z.string().min(1, "Image path is required"),
  caption: z.string().default(""),
  category: z.enum(["Heritage", "Nature"]).default("Heritage"),
});

// Website Settings Validation Schema
export const WebsiteSettingsSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  facebook: z.string().url("Invalid Facebook link").or(z.string().length(0)),
  instagram: z.string().url("Invalid Instagram link").or(z.string().length(0)),
  tiktok: z.string().url("Invalid TikTok link").or(z.string().length(0)),
  heroTitle: z.string().min(5, "Hero title is required"),
  heroSubtitle: z.string().min(10, "Hero subtitle must be at least 10 characters"),
  logoUrl: z.string().optional().nullable(),
});
