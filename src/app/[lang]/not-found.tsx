import type { Metadata } from 'next';
import Link from 'next/link';
import { primaryOffice, routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  return { title: getMessages(lang).common.notFound.metaTitle };
}

export default async function NotFound() {
  const lang = await getLocale();
  const t = getMessages(lang).common.notFound;
  return <main id="main-content" className="message-page">
    <p>{t.kicker}</p>
    <h1>{t.title}</h1>
    <p>{fill(t.body, { name: primaryOffice.name, phone: primaryOffice.phone })}</p>
    <Link className="pill pill-accent pill-large" href={localePath(lang, routes.home)}>{t.button}</Link>
  </main>;
}
