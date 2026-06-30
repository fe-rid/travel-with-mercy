"use server";

import prisma from "@/lib/prisma";
import { DestinationSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getDestinations() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, data: destinations };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch destinations" };
  }
}

export async function createDestination(rawData: any) {
  try {
    const validated = DestinationSchema.parse(rawData);
    
    let slug = generateSlug(validated.name);
    
    let slugExists = true;
    let count = 0;
    while (slugExists) {
      const targetSlug = count === 0 ? slug : `${slug}-${count}`;
      const existing = await prisma.destination.findUnique({
        where: { slug: targetSlug },
      });
      if (!existing) {
        slug = targetSlug;
        slugExists = false;
      } else {
        count++;
      }
    }

    const destination = await prisma.destination.create({
      data: {
        name: validated.name,
        slug,
        description: validated.description,
        heroImage: validated.heroImage,
        gallery: validated.gallery,
        highlights: validated.highlights,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/destinations");
    return { success: true, data: destination };
  } catch (error: any) {
    console.error("Create Destination Error:", error);
    return { success: false, error: error.message || "Failed to create destination" };
  }
}

export async function updateDestination(id: string, rawData: any) {
  try {
    const validated = DestinationSchema.parse(rawData);
    
    const existingDest = await prisma.destination.findUnique({
      where: { id },
    });

    if (!existingDest) {
      return { success: false, error: "Destination not found" };
    }

    let slug = existingDest.slug;
    if (existingDest.name !== validated.name) {
      slug = generateSlug(validated.name);
      let slugExists = true;
      let count = 0;
      while (slugExists) {
        const targetSlug = count === 0 ? slug : `${slug}-${count}`;
        const existing = await prisma.destination.findUnique({
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

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        name: validated.name,
        slug,
        description: validated.description,
        heroImage: validated.heroImage,
        gallery: validated.gallery,
        highlights: validated.highlights,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/destinations");
    return { success: true, data: destination };
  } catch (error: any) {
    console.error("Update Destination Error:", error);
    return { success: false, error: error.message || "Failed to update destination" };
  }
}

export async function deleteDestination(id: string) {
  try {
    await prisma.destination.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/destinations");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete destination" };
  }
}
