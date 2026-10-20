import type { Metadata } from 'next';
import { OfficeBlock } from '@/components/page/OfficeBlock';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { offices, routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).visit.contact.meta;
  return pageMetadata({ lang, title: t.title, description: t.description, path: routes.contact });
}

// HOLD: the request form (Name, Phone, Email, Office, Preferred language, Reason, Message)
// is not built until the C15 decision on website forms and data handling is confirmed.
// Flip appointmentFormEnabled in content/site.ts and add the form here when it is.
// Do not promise a response time on this page.
// Both offices are described here; each also has its own page under /locations (OfficeBlock).
export default async function ContactPage() {
  const lang = await getLocale();
  const t = getMessages(lang).visit.contact;
  return <PageLayout>
    <PageIntro title={t.title} />
    <div className={styles.offices}>
      {offices.map(office => <OfficeBlock key={office.id} office={office} />)}
    </div>
  </PageLayout>;
}
