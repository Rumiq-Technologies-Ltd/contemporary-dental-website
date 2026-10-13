import type { MetadataRoute } from 'next';
import { indexable, site } from '@/content/site';

// Keeps staging and draft builds out of search indexes (see `indexable` in content/site.ts).
export default function robots(): MetadataRoute.Robots {
  return indexable
    ? { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.url}/sitemap.xml` }
    : { rules: { userAgent: '*', disallow: '/' } };
}
