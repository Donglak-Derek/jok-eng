import { MetadataRoute } from 'next'
import { scripts, categories } from '@/data'
 
const BASE_URL = 'https://jok-eng.vercel.app'; // Update this to your production domain

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Static Routes
  const routes = [
    '',
    '/profile',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // 2. Categories
  const categoryRoutes = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Scripts (The main content)
  const scriptRoutes = scripts.map((script) => ({
    url: `${BASE_URL}/script/${script.id}`,
    lastModified: new Date(), // Ideally this would be real last modified date
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...scriptRoutes];
}
