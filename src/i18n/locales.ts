// The supported languages. English is the default and keeps the unprefixed URLs (/services);
// the other languages live under a prefix (/es/services). proxy.ts maps between the two.
// French is not offered: the practice has no French-speaking capability and does not claim one
// (C17 §9). Haitian Creole is not offered either until an interpretation route exists.
export const locales = ['en', 'es', 'pt'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// The languages the public site serves. Spanish and Portuguese are built but held back until the
// practice's reviewers approve them (answers file §2.17). Add a language here to publish it; until then
// its prefixed URLs return not found and it is left out of the switcher, sitemap and hreflang links.
export const publicLocales: readonly Locale[] = ['en'];

/** Each language is named in its own language, so a visitor can find theirs. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
};

/** BCP 47 tags for the html lang attribute and hreflang. */
export const localeTags: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-US',
  pt: 'pt-BR',
};

/** Open Graph uses the language_TERRITORY form, for example en_US. */
export function ogLocale(locale: Locale): string {
  return localeTags[locale].replace('-', '_');
}

/**
 * Legal pages are only written in English until counsel approves translations.
 * Their URLs stay unprefixed, and other languages do not serve them.
 */
const englishOnlyPaths = ['/privacy', '/terms', '/accessibility'];

export function isEnglishOnlyPath(path: string): boolean {
  return englishOnlyPaths.some(prefix => path === prefix || path.startsWith(`${prefix}/`));
}

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (publicLocales as readonly string[]).includes(value);
}

/** The URL for a path in a given language. English paths are unprefixed. */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

const localePrefix = new RegExp(`^/(${publicLocales.join('|')})(/.*)?$`);

/**
 * A pathname without its language prefix. Static HTML for English pages is rendered with the
 * internal /en/services that proxy.ts rewrites to, while the browser shows /services; both forms
 * (and /es/services) become /services, so anything derived from the pathname matches on the
 * server and in the browser.
 */
export function unprefixedPath(pathname: string): string {
  const match = localePrefix.exec(pathname);
  if (!match) return pathname;
  return match[2] ?? '/';
}
