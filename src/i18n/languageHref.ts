import { routes } from '@/content/site';
import { defaultLocale, isEnglishOnlyPath, localePath, publicLocales, type Locale } from './locales';

/**
 * Where a link to another language goes. A published language opens the same page in that
 * language (English-only legal pages send it to that language's home page instead). A language
 * that is not published yet opens the coming-soon page, so every language link switches over on
 * its own when the language is added to publicLocales. The link for the language already shown
 * goes to its home page, so it is never a link to the page the visitor is on.
 */
export function languageHref(target: Locale, current: Locale, path: string): string {
  if (target === current) return localePath(target, '/');
  if (!publicLocales.includes(target)) return localePath(current, routes.comingSoon);
  if (isEnglishOnlyPath(path) && target !== defaultLocale) return localePath(target, '/');
  return localePath(target, path);
}
