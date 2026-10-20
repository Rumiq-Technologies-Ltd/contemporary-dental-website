'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languageHref } from '@/i18n/languageHref';
import { localeNames, localeTags, locales, publicLocales, unprefixedPath, type Locale } from '@/i18n/locales';
import styles from './layout.module.css';

// Lists every language. A published language opens the same page in that language; one that is
// not published yet opens the coming-soon page. languageHref holds both rules.
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const path = unprefixedPath(usePathname());
  return <div className={styles.languageGroup}>
    <nav aria-label={label} className={styles.languages}>
      {locales.map(locale => {
        const isCurrent = locale === current;
        const published = publicLocales.includes(locale);
        return <Link key={locale} href={languageHref(locale, current, path)} hrefLang={published ? localeTags[locale] : undefined}
          lang={localeTags[locale]} aria-current={isCurrent ? 'page' : undefined}
          className={isCurrent ? styles.languageCurrent : styles.languageLink}>
          {localeNames[locale]}
        </Link>;
      })}
    </nav>
  </div>;
}
