import { navigation, officePath, offices } from '@/content/site';
import { localePath, type Locale } from '@/i18n/locales';
import type { CommonMessages } from '@/i18n/messages/common';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavItem extends NavLink {
  number: string;
  /** Links shown in a dropdown under the entry, for example one per office. */
  children?: readonly NavLink[];
}

/** Main navigation for one language: localised links and labels, in the fixed order. */
export function localizedNavigation(lang: Locale, t: Pick<CommonMessages, 'nav' | 'navChildren'>): NavItem[] {
  // Office names are place names and stay the same in every language.
  const officeLinks = offices.map(office => ({ href: localePath(lang, officePath(office)), label: office.name }));
  return navigation.map(item => ({
    href: localePath(lang, item.href),
    label: t.nav[item.key],
    number: item.number,
    ...('officeLinks' in item ? { children: officeLinks } : {}),
    ...('children' in item ? { children: item.children.map(child => ({ href: localePath(lang, child.href), label: t.navChildren[child.key] })) } : {}),
  }));
}
