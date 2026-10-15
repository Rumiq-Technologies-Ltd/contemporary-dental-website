import type { Metadata } from 'next';
import { CardGrid } from '@/components/page/Cards';
import { CallButton } from '@/components/page/Actions';
import { OfficeCard } from '@/components/page/OfficeCard';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose, Section } from '@/components/page/Section';
import { appointmentFormEnabled, offices, routes, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
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
export default async function ContactPage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.visit.contact;
  return <PageLayout>
    <PageIntro title={t.title} />
    <CardGrid>{offices.map(office => <OfficeCard key={office.id} office={office} />)}</CardGrid>
    <div className={styles.split}>
      <Prose>
        <p><strong>{messages.common.afterHours}</strong> <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></p>
        <p><strong>{t.emailLabel}</strong> <a href={`mailto:${site.email}`}>{site.email}</a></p>
      </Prose>
      <PagePhoto photo="frontDesk" alt={t.photoAlt} />
    </div>
    <Section id="request-appointment" title={messages.common.requestAppointment}>
      <Prose>
        {appointmentFormEnabled
          ? <p>{t.request.withForm}</p>
          : <p>{fill(t.request.callOnly, { phone: site.afterHoursPhone })}</p>}
      </Prose>
      <div><CallButton /></div>
    </Section>
  </PageLayout>;
}
