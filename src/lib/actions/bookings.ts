"use server";

import prisma from "@/lib/prisma";
import { BookingSchema } from "@/lib/schemas";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function createBooking(rawData: any) {
  try {
    // 1. Validate inputs
    const validatedData = BookingSchema.parse(rawData);

    // 2. Fetch tour info to get name and calculate total price
    const tour = await prisma.tour.findUnique({
      where: { id: validatedData.tourId },
    });

    if (!tour) {
      return { success: false, error: "Selected tour package not found" };
    }

    // Calculate dynamic pricing
    const basePriceNum = parseInt(tour.price.replace(/[^0-9]/g, "")) || 0;
    const hotelMultiplier = 
      validatedData.hotelPreference === "Luxury" ? 500 : 
      validatedData.hotelPreference === "Premium" ? 200 : 0;
    const totalPrice = (basePriceNum + hotelMultiplier) * validatedData.travelers;

    // 3. Generate unique booking reference
    let bookingReference = "";
    let referenceExists = true;
    while (referenceExists) {
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      bookingReference = `TWM-${randomDigits}`;
      const existing = await prisma.booking.findUnique({
        where: { bookingReference },
      });
      if (!existing) {
        referenceExists = false;
      }
    }

    // 4. Save to PostgreSQL
    const booking = await prisma.booking.create({
      data: {
        bookingReference,
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        nationality: validatedData.nationality,
        travelers: validatedData.travelers,
        departureDate: validatedData.departureDate,
        returnDate: validatedData.returnDate,
        notes: validatedData.notes || "",
        totalPrice: totalPrice,
        status: "Pending",
        tourId: validatedData.tourId,
        hotelPreference: validatedData.hotelPreference,
      },
    });

    // 5. Send confirmation emails via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_mock_key") {
      try {
        // Customer Email
        await resend.emails.send({
          from: "concierge@resend.dev", // Needs verified domain in production, defaults to concierge@resend.dev/onboarding@resend.dev
          to: validatedData.email,
          subject: "Booking Request Received",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; rounded: 8px;">
              <h2 style="color: #0B1F3A; text-align: center;">TRAVEL WITH MERCY</h2>
              <p>Dear ${validatedData.fullName},</p>
              <p>Thank you for submitting your booking inquiry! Our master travel concierge desk is reviewing your itinerary proposal.</p>
              <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
              <h3 style="color: #D4AF37;">Booking Details</h3>
              <p><strong>Booking Reference:</strong> ${bookingReference}</p>
              <p><strong>Tour Package:</strong> ${tour.title}</p>
              <p><strong>Travel Dates:</strong> ${validatedData.departureDate.toLocaleDateString()} to ${validatedData.returnDate.toLocaleDateString()}</p>
              <p><strong>Guests Count:</strong> ${validatedData.travelers}</p>
              <p><strong>Hotel Preference:</strong> ${validatedData.hotelPreference}</p>
              <p><strong>Estimated Total Price:</strong> $${totalPrice.toLocaleString()}</p>
              <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
              <p><strong>Our Contact Info:</strong></p>
              <p>Phone: +251 912 826 488</p>
              <p>Email: travelwithmercy15@gmail.com</p>
              <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">This is an automated request confirmation. We will reach back within 3 hours.</p>
            </div>
          `,
        });

        // Agency Notification Email
        await resend.emails.send({
          from: "concierge@resend.dev",
          to: process.env.AGENCY_NOTIFICATION_EMAIL || "travelwithmercy15@gmail.com",
          subject: "New Booking Request",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea;">
              <h2 style="color: #0B1F3A;">New Reservation Inquiry</h2>
              <p>A new customer booking request has been submitted on the website.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Reference</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingReference}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Customer Name</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Nationality</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.nationality}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Tour Package</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${tour.title}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Travel Dates</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.departureDate.toLocaleDateString()} to ${validatedData.returnDate.toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Travelers Count</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.travelers}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Hotel Option</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.hotelPreference}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Calculated Price</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">$${totalPrice.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Client Notes</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.notes || 'None'}</td>
                </tr>
              </table>
              <div style="margin-top: 30px; text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/admin/bookings" style="background-color: #0B1F3A; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Manage Bookings</a>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Resend Email Notification Failed:", emailErr);
        // Continue without throwing to prevent breaking user flow
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    return { success: true, bookingReference, bookingId: booking.id };
  } catch (error: any) {
    console.error("Create Booking Error:", error);
    return { success: false, error: error.message || "Failed to process reservation" };
  }
}

export async function getBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { tour: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: bookings };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch bookings" };
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { tour: true },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    return { success: true, data: booking };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update booking status" };
  }
}

export async function deleteBooking(id: string) {
  try {
    await prisma.booking.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete booking" };
  }
}

export async function getDashboardStats() {
  try {
    const totalBookings = await prisma.booking.count();
    const pendingBookings = await prisma.booking.count({ where: { status: "Pending" } });
    const confirmedBookings = await prisma.booking.count({ where: { status: "Confirmed" } });
    const activeTours = await prisma.tour.count({ where: { status: "Published" } });
    const destinationsCount = await prisma.destination.count();
    
    // Group by email to find unique customers
    const uniqueCustomers = await prisma.booking.groupBy({
      by: ["email"],
    });
    const customersCount = uniqueCustomers.length;

    // Aggregate total revenue for confirmed/completed bookings
    const revenueGroup = await prisma.booking.aggregate({
      where: {
        status: { in: ["Confirmed", "Completed"] }
      },
      _sum: {
        totalPrice: true
      }
    });
    const totalRevenue = revenueGroup._sum.totalPrice || 0;

    // Fetch top 5 recent bookings
    const recent = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { tour: true }
    });

    // Compile monthly trends
    const allBookings = await prisma.booking.findMany({
      select: { createdAt: true, totalPrice: true, status: true }
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trendsMap = new Map();
    
    // Initialize past 6 months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = `${months[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
      trendsMap.set(label, { name: label, bookings: 0, revenue: 0 });
    }

    allBookings.forEach(b => {
      const date = new Date(b.createdAt);
      const label = `${months[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`;
      if (trendsMap.has(label)) {
        const current = trendsMap.get(label);
        current.bookings += 1;
        if (b.status === "Confirmed" || b.status === "Completed") {
          current.revenue += b.totalPrice;
        }
      }
    });

    const bookingTrends = Array.from(trendsMap.values());

    return {
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        activeTours,
        destinationsCount,
        customersCount,
        totalRevenue,
        recentBookings: recent.map(r => ({
          id: r.bookingReference,
          customer: r.fullName,
          email: r.email,
          phone: r.phone,
          tour: r.tour.title,
          tourId: r.tourId,
          date: r.createdAt.toLocaleDateString(),
          departureDate: r.departureDate.toISOString().split("T")[0],
          returnDate: r.returnDate.toISOString().split("T")[0],
          amount: `$${r.totalPrice.toLocaleString()}`,
          travelers: r.travelers,
          hotelPreference: r.hotelPreference,
          status: r.status as any
        })),
        bookingTrends
      }
    };
  } catch (error: any) {
    console.error("Dashboard Stats Fetch Error:", error);
    return { success: false, error: error.message || "Failed to compile stats" };
  }
}

export async function getBookingByRefAndEmail(bookingReference: string, email: string) {
  try {
    if (!bookingReference || !email) {
      return { success: false, error: "Booking reference and email are required" };
    }

    const booking = await prisma.booking.findFirst({
      where: {
        bookingReference: {
          equals: bookingReference.trim(),
          mode: "insensitive"
        },
        email: {
          equals: email.trim(),
          mode: "insensitive"
        }
      },
      include: {
        tour: true
      }
    });

    if (!booking) {
      return { success: false, error: "No booking was found with the provided reference and email." };
    }

    return {
      success: true,
      data: {
        id: booking.bookingReference,
        customer: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        tour: booking.tour.title,
        tourId: booking.tourId,
        date: booking.createdAt.toLocaleDateString(),
        departureDate: booking.departureDate.toISOString().split("T")[0],
        returnDate: booking.returnDate.toISOString().split("T")[0],
        amount: `$${booking.totalPrice.toLocaleString()}`,
        travelers: booking.travelers,
        hotelPreference: booking.hotelPreference,
        status: booking.status as "Pending" | "Confirmed" | "Completed" | "Cancelled"
      }
    };
  } catch (error: any) {
    console.error("Fetch booking by reference and email error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
