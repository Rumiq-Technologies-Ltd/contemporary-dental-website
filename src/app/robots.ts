import type { MetadataRoute } from 'next';
import { isIndexable, siteUrl } from '@/lib/siteUrl';

// Search and AI crawlers are welcome in production. Nothing is blocked by name, because
// GPTBot, Google-Extended and Bingbot also decide AI search visibility. Vercel previews
// stay out of search indexes (see isIndexable in lib/siteUrl.ts).
export default function robots(): MetadataRoute.Robots {
  return isIndexable(process.env)
    ? { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` }
    : { rules: { userAgent: '*', disallow: '/' } };
}
