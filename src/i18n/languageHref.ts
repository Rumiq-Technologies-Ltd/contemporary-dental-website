import { routes } from '@/content/site';
import { defaultLocale, isEnglishOnlyPath, localePath, publicLocales, type Locale } from './locales';

/**
 * Where a link to another language goes. A published language opens the same page in that
 * language (English-only legal pages send it to that language's home page instead). A language
 * that is not published yet opens the coming-soon page, so every language link switches over on
 * its own when the language is added to publicLocales.
 */
export function languageHref(target: Locale, current: Locale, path: string): string {
  if (!publicLocales.includes(target)) return localePath(current, routes.comingSoon);
  if (isEnglishOnlyPath(path) && target !== defaultLocale) return localePath(target, '/');
  return localePath(target, path);
}
