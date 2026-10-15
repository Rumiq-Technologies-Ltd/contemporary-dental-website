import type { Metadata } from 'next';
import { site } from '@/content/site';
import { defaultLocale, localePath, localeTags, ogLocale, publicLocales, type Locale } from '@/i18n/locales';

interface PageMetadataInput {
  /** The language of the page, from getLocale(). */
  lang: Locale;
  /** Provisional title tag from the message file, without the site suffix. */
  title: string;
  description: string;
  /** English path, for example /services. Localised paths are built from it. */
  path: string;
  /** Skip the " | Contemporary Dental Care" suffix (the homepage title carries it). */
  absoluteTitle?: string;
  /** Legal pages exist in English only, so they get no alternate-language links. */
  englishOnly?: boolean;
}

// The share image comes from app/opengraph-image.tsx. Pages set their own openGraph object,
// which replaces the inherited one, so the image is named here explicitly.
const shareImage = { url: '/opengraph-image', width: 1200, height: 630, alt: `${site.name}: honest, patient-focused dental care` };

/** hreflang links for every language version of one English path, plus x-default. */
function alternateLanguages(path: string): Record<string, string> {
  const links = Object.fromEntries(publicLocales.map(locale => [localeTags[locale], localePath(locale, path)]));
  return { ...links, 'x-default': localePath(defaultLocale, path) };
}

/** Title, description, canonical URL, language alternates, Open Graph and Twitter tags for one page. */
export function pageMetadata({ lang, title, description, path, absoluteTitle, englishOnly = false }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${site.name}`;
  const canonical = localePath(lang, path);
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical, ...(englishOnly ? {} : { languages: alternateLanguages(path) }) },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      type: 'website',
      locale: ogLocale(lang),
      images: [shareImage],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [shareImage.url] },
  };
}
