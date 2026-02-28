import { MetadataRoute } from 'next'
import { scripts as staticScripts, categories } from '@/data'
import { db } from '@/lib/firebase'
import { collectionGroup, getDocs, query, where, limit } from 'firebase/firestore'

const BASE_URL = 'https://jok-eng.vercel.app'; // Update this to your production domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const routes = [
    '/library',
    '/pricing',
    '/scenarios', // Optional: maybe hide this? keeping for now
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

  // 3. Static System Scripts (Legacy/Fallback)
  const staticScriptRoutes = staticScripts.map((script) => ({
    url: `${BASE_URL}/script/${script.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 4. Dynamic Community/Official Scenarios (Firestore)
  let dynamicScriptRoutes: MetadataRoute.Sitemap = [];
  try {
    // Fetch up to 1000 public scenarios
    const q = query(
      collectionGroup(db, "scenarios"),
      where("isPublic", "==", true),
      limit(1000)
    );

    const snapshot = await getDocs(q);

    dynamicScriptRoutes = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        url: `${BASE_URL}/script/${doc.id}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

  } catch (error) {
    console.error("Sitemap generation error:", error);
    // Fail gracefully -> return at least static content
  }

  return [...routes, ...categoryRoutes, ...staticScriptRoutes, ...dynamicScriptRoutes];
}
