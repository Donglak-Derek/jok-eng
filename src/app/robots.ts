import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://jok-eng.vercel.app/sitemap.xml', // Assuming Vercel deployment, update domain if needed
  }
}
