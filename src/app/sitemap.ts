import type { MetadataRoute } from 'next';
import { servicePages } from '@/content/services';
import { ocoeeEnabled, routes } from '@/content/site';
import { siteUrl } from '@/lib/siteUrl';

// Public pages only. The Ocoee page joins when the Ocoee hold is lifted; membership
// is not built, and the legal pages wait for counsel review.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [
    routes.home, routes.about, routes.doctor, routes.team, routes.services,
    ...servicePages.map(service => service.href),
    routes.emergency, routes.technology, routes.locations, '/locations/orlando',
    ...(ocoeeEnabled ? ['/locations/ocoee'] : []),
    routes.newPatients, routes.insurance, routes.payment, routes.pricing, routes.faq,
    routes.contact, routes.accessibility,
  ];
  return paths.map(path => ({ url: `${siteUrl}${path === '/' ? '' : path}` }));
}
