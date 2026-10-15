import Link from 'next/link';
import { primaryOffice, routes, type Office } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';

export async function RequestAppointmentButton({ variant = 'accent' }: { variant?: 'accent' | 'outline' }) {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <Link href={localePath(lang, routes.requestAppointment)} className={`pill pill-${variant} pill-large`}>{t.requestAppointment}</Link>;
}

/** "Call Orlando: 321-522-8577" by default; withName=false gives "Call 321-522-8577". */
export async function CallButton({ office = primaryOffice, withName = true }: { office?: Office; withName?: boolean }) {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  const label = withName
    ? fill(t.callOffice, { name: office.name, phone: office.phone })
    : fill(t.callPhone, { phone: office.phone });
  return <a href={office.phoneHref} className="pill pill-outline pill-large">{label}</a>;
}
