'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { defaultLocale, isEnglishOnlyPath, localeNames, localePath, localeTags, publicLocales, type Locale } from '@/i18n/locales';
import styles from './layout.module.css';

const localePrefix = new RegExp(`^/(${publicLocales.join('|')})(/.*)?$`);

// The browser shows /es/services, and static HTML is rendered with the internal /en/services
// for English pages. Both forms drop the locale prefix, so the links match on the server and in the browser.
function unprefixedPath(pathname: string): string {
  const match = localePrefix.exec(pathname);
  if (!match) return pathname;
  return match[2] ?? '/';
}

// Lists every language and keeps the visitor on the same page where it exists. English-only
// pages (the legal pages) send other languages to their home page instead.
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const path = unprefixedPath(usePathname());
  return <nav aria-label={label} className={styles.languages}>
    {publicLocales.map(locale => {
      const href = isEnglishOnlyPath(path) && locale !== defaultLocale ? localePath(locale, '/') : localePath(locale, path);
      const isCurrent = locale === current;
      return <Link key={locale} href={href} hrefLang={localeTags[locale]} lang={localeTags[locale]}
        aria-current={isCurrent ? 'page' : undefined} className={isCurrent ? styles.languageCurrent : styles.languageLink}>
        {localeNames[locale]}
      </Link>;
    })}
  </nav>;
}
