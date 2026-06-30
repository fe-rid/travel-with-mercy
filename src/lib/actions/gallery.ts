"use server";

import prisma from "@/lib/prisma";
import { GalleryImageSchema } from "@/lib/schemas";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to upload file to Cloudinary
async function uploadToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "travel-with-mercy" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload stream error:", error);
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    ).end(buffer);
  });
}

// Helper to delete file from Cloudinary based on secure_url
async function deleteFromCloudinary(url: string) {
  try {
    // Extract public ID from secure_url
    // e.g. https://res.cloudinary.com/cloudname/image/upload/v12345/travel-with-mercy/image_name.jpg
    const parts = url.split("/");
    const fileNameWithExt = parts[parts.length - 1];
    const fileName = fileNameWithExt.split(".")[0];
    
    // The folder is "travel-with-mercy"
    const publicId = `travel-with-mercy/${fileName}`;
    
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Failed to delete from Cloudinary:", err);
  }
}

export async function getGalleryImages() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: images };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch gallery images" };
  }
}

export async function uploadAndAddImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const category = formData.get("category") as string || "Heritage";
    const caption = formData.get("caption") as string || "";

    if (!file || file.size === 0) {
      return { success: false, error: "No image file provided" };
    }

    // 1. Upload to Cloudinary
    let imageUrl = "";
    try {
      imageUrl = await uploadToCloudinary(file);
    } catch (uploadErr: any) {
      return { success: false, error: `Cloudinary upload failed: ${uploadErr.message}` };
    }

    // 2. Validate using Zod schema
    const validated = GalleryImageSchema.parse({
      imageUrl,
      caption,
      category,
    });

    // 3. Save to database
    const galleryImage = await prisma.galleryImage.create({
      data: {
        imageUrl: validated.imageUrl,
        caption: validated.caption,
        category: validated.category,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true, data: galleryImage };
  } catch (error: any) {
    console.error("Gallery Upload Error:", error);
    return { success: false, error: error.message || "Failed to add image to gallery" };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return { success: false, error: "Image not found" };
    }

    // Delete from Cloudinary if it's a Cloudinary URL
    if (image.imageUrl.includes("cloudinary.com")) {
      await deleteFromCloudinary(image.imageUrl);
    }

    // Delete from database
    await prisma.galleryImage.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete gallery image" };
  }
}
