import { primaryOffice } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import styles from './layout.module.css';

// Sticky call button, shown on phones only (see layout.module.css).
export async function MobileCallBar() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <a href={primaryOffice.phoneHref} className={`pill pill-accent pill-large ${styles.callBar}`}
    aria-label={fill(t.callOffice, { name: primaryOffice.name, phone: primaryOffice.phone })}>
    {fill(t.callPhone, { phone: primaryOffice.phone })}
  </a>;
}
