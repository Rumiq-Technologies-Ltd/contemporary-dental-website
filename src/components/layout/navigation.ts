import { navigation } from '@/content/site';
import { localePath, type Locale } from '@/i18n/locales';
import type { CommonMessages } from '@/i18n/messages/common';

export interface NavItem {
  href: string;
  label: string;
  number: string;
}

/** Main navigation for one language: localised links and labels, in the fixed order. */
export function localizedNavigation(lang: Locale, nav: CommonMessages['nav']): NavItem[] {
  return navigation.map(item => ({ href: localePath(lang, item.href), label: nav[item.key], number: item.number }));
}
