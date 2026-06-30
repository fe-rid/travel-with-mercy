"use server";

import prisma from "@/lib/prisma";
import { TourSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getTours() {
  try {
    const tours = await prisma.tour.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: tours };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch tours" };
  }
}

export async function getTourBySlug(slug: string) {
  try {
    const tour = await prisma.tour.findUnique({
      where: { slug },
    });
    return { success: true, data: tour };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch tour" };
  }
}

export async function createTour(rawData: any) {
  try {
    const validated = TourSchema.parse(rawData);
    
    // Automatically generate slug
    let slug = generateSlug(validated.title);
    
    // Check if slug is unique, append a suffix if not
    let slugExists = true;
    let count = 0;
    while (slugExists) {
      const targetSlug = count === 0 ? slug : `${slug}-${count}`;
      const existing = await prisma.tour.findUnique({
        where: { slug: targetSlug },
      });
      if (!existing) {
        slug = targetSlug;
        slugExists = false;
      } else {
        count++;
      }
    }

    const tour = await prisma.tour.create({
      data: {
        title: validated.title,
        slug,
        description: validated.description,
        price: validated.price,
        duration: validated.duration,
        destination: validated.destination,
        heroImage: validated.heroImage,
        galleryImages: validated.galleryImages,
        highlights: validated.highlights,
        itinerary: validated.itinerary,
        includedServices: validated.includedServices,
        excludedServices: validated.excludedServices,
        featured: validated.featured,
        status: validated.status,
        faqs: validated.faqs || [],
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/tours");
    return { success: true, data: tour };
  } catch (error: any) {
    console.error("Create Tour Error:", error);
    return { success: false, error: error.message || "Failed to create tour package" };
  }
}

export async function updateTour(id: string, rawData: any) {
  try {
    const validated = TourSchema.parse(rawData);
    
    const existingTour = await prisma.tour.findUnique({
      where: { id },
    });

    if (!existingTour) {
      return { success: false, error: "Tour package not found" };
    }

    // Regenerate slug if title changed
    let slug = existingTour.slug;
    if (existingTour.title !== validated.title) {
      slug = generateSlug(validated.title);
      let slugExists = true;
      let count = 0;
      while (slugExists) {
        const targetSlug = count === 0 ? slug : `${slug}-${count}`;
        const existing = await prisma.tour.findUnique({
          where: { slug: targetSlug },
        });
        if (!existing || existing.id === id) {
          slug = targetSlug;
          slugExists = false;
        } else {
          count++;
        }
      }
    }

    const tour = await prisma.tour.update({
      where: { id },
      data: {
        title: validated.title,
        slug,
        description: validated.description,
        price: validated.price,
        duration: validated.duration,
        destination: validated.destination,
        heroImage: validated.heroImage,
        galleryImages: validated.galleryImages,
        highlights: validated.highlights,
        itinerary: validated.itinerary,
        includedServices: validated.includedServices,
        excludedServices: validated.excludedServices,
        featured: validated.featured,
        status: validated.status,
        faqs: validated.faqs || [],
      },
    });

    revalidatePath("/");
    revalidatePath(`/tours/${id}`);
    revalidatePath(`/tours/${slug}`);
    revalidatePath("/admin/tours");
    return { success: true, data: tour };
  } catch (error: any) {
    console.error("Update Tour Error:", error);
    return { success: false, error: error.message || "Failed to update tour package" };
  }
}

export async function deleteTour(id: string) {
  try {
    await prisma.tour.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/tours");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete tour package" };
  }
}

export async function toggleFeaturedTour(id: string, featured: boolean) {
  try {
    const tour = await prisma.tour.update({
      where: { id },
      data: { featured },
    });

    revalidatePath("/");
    revalidatePath("/admin/tours");
    return { success: true, data: tour };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update featured status" };
  }
}

export async function updateTourStatus(id: string, status: string) {
  try {
    const tour = await prisma.tour.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/");
    revalidatePath("/admin/tours");
    return { success: true, data: tour };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update status" };
  }
}
