"use server";

import prisma from "@/lib/prisma";
import { WebsiteSettingsSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function getWebsiteSettings() {
  try {
    let settings = await prisma.websiteSettings.findUnique({
      where: { id: "singleton" },
    });

    // If it doesn't exist, create default settings
    if (!settings) {
      settings = await prisma.websiteSettings.create({
        data: {
          id: "singleton",
          companyName: "Travel With Mercy",
          email: "travelwithmercy15@gmail.com",
          phone: "+251 912 826 488",
          address: "Bole District, Imperial Road, Addis Ababa, Ethiopia",
          facebook: "https://www.facebook.com/share/1LfVqrheuK/?mibextid=wwXIfr",
          instagram: "https://www.instagram.com/travel_with_mercy15?igsh=MWI0cGJzMjRuY3pvaA%3D%3D&utm_source=qr",
          tiktok: "https://www.tiktok.com/@travelwithmercy12?_r=1&_t=ZS-97N1ZbyxIgB",
          heroTitle: "Experience Luxury Travel in Ethiopia",
          heroSubtitle: "Bespoke, private, and fully guided travel experiences through the historical and wonders of East Africa.",
        },
      });
    }

    return { success: true, data: settings };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch website settings" };
  }
}

export async function updateWebsiteSettings(rawData: any) {
  try {
    const validated = WebsiteSettingsSchema.parse(rawData);

    const settings = await prisma.websiteSettings.upsert({
      where: { id: "singleton" },
      update: {
        companyName: validated.companyName,
        email: validated.email,
        phone: validated.phone,
        address: validated.address,
        facebook: validated.facebook,
        instagram: validated.instagram,
        tiktok: validated.tiktok,
        heroTitle: validated.heroTitle,
        heroSubtitle: validated.heroSubtitle,
        logoUrl: validated.logoUrl,
      },
      create: {
        id: "singleton",
        companyName: validated.companyName,
        email: validated.email,
        phone: validated.phone,
        address: validated.address,
        facebook: validated.facebook,
        instagram: validated.instagram,
        tiktok: validated.tiktok,
        heroTitle: validated.heroTitle,
        heroSubtitle: validated.heroSubtitle,
        logoUrl: validated.logoUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, data: settings };
  } catch (error: any) {
    console.error("Update Settings Error:", error);
    return { success: false, error: error.message || "Failed to update settings" };
  }
}
