import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { tours as defaultTours } from '@/data/travelData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://travelwithmercy.com';
  
  // 1. Static URLs
  const routes = [
    '',
    '/book',
    '/my-bookings',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Tour URLs from PostgreSQL / Fallback
  let tourSlugs: string[] = [];
  try {
    const liveTours = await prisma.tour.findMany({
      where: { status: 'Published' },
      select: { slug: true },
    });
    
    if (liveTours.length > 0) {
      tourSlugs = liveTours.map((t) => t.slug);
    } else {
      tourSlugs = defaultTours.map((t) => t.id); // fallbacks
    }
  } catch {
    tourSlugs = defaultTours.map((t) => t.id);
  }

  const tourRoutes = tourSlugs.map((slug) => ({
    url: `${baseUrl}/tours/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...tourRoutes];
}
