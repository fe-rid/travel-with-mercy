"use server";

import prisma from "@/lib/prisma";
import { TestimonialSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: testimonials };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch testimonials" };
  }
}

export async function getApprovedTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: testimonials };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch approved testimonials" };
  }
}

export async function submitTestimonial(rawData: any) {
  try {
    const validated = TestimonialSchema.parse(rawData);

    const testimonial = await prisma.testimonial.create({
      data: {
        customerName: validated.customerName,
        country: validated.country,
        review: validated.review,
        rating: validated.rating,
        avatar: validated.avatar,
        approved: false, // Must be approved by admin
      },
    });

    return { success: true, data: testimonial };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to submit testimonial" };
  }
}

export async function approveTestimonial(id: string) {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { approved: true },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, data: testimonial };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to approve testimonial" };
  }
}

export async function rejectTestimonial(id: string) {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { approved: false },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true, data: testimonial };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to reject testimonial" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete testimonial" };
  }
}
