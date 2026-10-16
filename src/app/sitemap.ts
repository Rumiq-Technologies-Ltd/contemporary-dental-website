import type { MetadataRoute } from 'next';
import { getServicePages } from '@/content/services';
import { routes } from '@/content/site';
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

// Public pages only. Both offices are on the contact page. Membership is not built, and the
// legal pages wait for counsel review.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [
    routes.home, routes.about, routes.doctor, routes.services,
    ...getServicePages(defaultLocale).map(service => service.href),
    routes.emergency, routes.technology,
    routes.newPatients, routes.insurance, routes.pricing, routes.faq,
    routes.contact, routes.accessibility,
  ];
  return paths.flatMap(entriesFor);
}
