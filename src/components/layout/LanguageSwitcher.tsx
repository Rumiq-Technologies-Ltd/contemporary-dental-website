'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { defaultLocale, isEnglishOnlyPath, localeNames, localePath, localeTags, locales, publicLocales, type Locale } from '@/i18n/locales';
import styles from './layout.module.css';

const localePrefix = new RegExp(`^/(${publicLocales.join('|')})(/.*)?$`);

// The browser shows /es/services, and static HTML is rendered with the internal /en/services
// for English pages. Both forms drop the locale prefix, so the links match on the server and in the browser.
function unprefixedPath(pathname: string): string {
  const match = localePrefix.exec(pathname);
  if (!match) return pathname;
  return match[2] ?? '/';
}

// Lists every language. A language that is not published yet cannot be opened, so choosing it
// shows "Coming soon" and the visitor stays on the same page. English-only pages (the legal
// pages) send other published languages to their home page instead.
export function LanguageSwitcher({ current, label, comingSoon }: { current: Locale; label: string; comingSoon: string }) {
  const path = unprefixedPath(usePathname());
  const [chosen, setChosen] = useState<Locale | null>(null);
  return <div className={styles.languageGroup}>
    <nav aria-label={label} className={styles.languages}>
      {locales.map(locale => {
        const isCurrent = locale === current;
        if (!publicLocales.includes(locale)) {
          return <button key={locale} type="button" lang={localeTags[locale]} aria-describedby="language-status"
            className={`${styles.languageLink} ${styles.languageButton}`} onClick={() => setChosen(locale)}>
            {localeNames[locale]}
          </button>;
        }
        const href = isEnglishOnlyPath(path) && locale !== defaultLocale ? localePath(locale, '/') : localePath(locale, path);
        return <Link key={locale} href={href} hrefLang={localeTags[locale]} lang={localeTags[locale]}
          aria-current={isCurrent ? 'page' : undefined} className={isCurrent ? styles.languageCurrent : styles.languageLink}>
          {localeNames[locale]}
        </Link>;
      })}
    </nav>
    <p id="language-status" role="status" className={styles.languageStatus}>{chosen ? comingSoon : ''}</p>
  </div>;
}
