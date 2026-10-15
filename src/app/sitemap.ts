import type { MetadataRoute } from 'next';
import { getServicePages } from '@/content/services';
import { ocoeeEnabled, routes } from '@/content/site';
import { defaultLocale, isEnglishOnlyPath, localePath, localeTags, publicLocales } from '@/i18n/locales';
import { siteUrl } from '@/lib/siteUrl';

const absoluteUrl = (path: string): string => `${siteUrl}${path === '/' ? '' : path}`;

// Each public page lists every language version, so search engines can match the right language
// to each visitor. Legal pages exist in English only and list just the English URL.
function entriesFor(path: string): MetadataRoute.Sitemap {
  if (isEnglishOnlyPath(path)) return [{ url: absoluteUrl(path) }];
  const languages = Object.fromEntries(publicLocales.map(locale => [localeTags[locale], absoluteUrl(localePath(locale, path))]));
  return publicLocales.map(locale => ({
    url: absoluteUrl(localePath(locale, path)),
    alternates: { languages: { ...languages, 'x-default': absoluteUrl(path) } },
  }));
}

// Public pages only. The Ocoee page joins when the Ocoee hold is lifted; membership
// is not built, and the legal pages wait for counsel review.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [
    routes.home, routes.about, routes.doctor, routes.team, routes.services,
    ...getServicePages(defaultLocale).map(service => service.href),
    routes.emergency, routes.technology, routes.locations, '/locations/orlando',
    ...(ocoeeEnabled ? ['/locations/ocoee'] : []),
    routes.newPatients, routes.insurance, routes.payment, routes.pricing, routes.faq,
    routes.contact, routes.accessibility,
  ];
  return paths.flatMap(entriesFor);
}
