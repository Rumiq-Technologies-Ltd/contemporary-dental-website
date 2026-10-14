import { CardGrid } from '@/components/page/Cards';
import { CallButton } from '@/components/page/Actions';
import { OfficeCard } from '@/components/page/OfficeCard';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose, Section } from '@/components/page/Section';
import { appointmentFormEnabled, offices, routes, site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'Contact Us',
  description: 'Phone numbers, addresses, hours and email for Contemporary Dental Care, and how to request an appointment.',
  path: routes.contact,
});

// HOLD: the request form (Name, Phone, Email, Office, Preferred language, Reason, Message)
// is not built until the C15 decision on website forms and data handling is confirmed.
// Flip appointmentFormEnabled in content/site.ts and add the form here when it is.
// Do not promise a response time on this page.
export default function ContactPage() {
  return <PageLayout>
    <PageIntro title="Contact us" />
    <CardGrid>{offices.map(office => <OfficeCard key={office.id} office={office} />)}</CardGrid>
    <div className={styles.split}>
      <Prose>
        <p><strong>After hours:</strong> <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></p>
        <p><strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a></p>
      </Prose>
      <PagePhoto photo="frontDesk" alt="Our front desk team answering calls at Contemporary Dental Care" />
    </div>
    <Section id="request-appointment" title="Request an appointment">
      <Prose>
        {appointmentFormEnabled
          ? <p>Please don&apos;t include health details in this form. For a dental emergency, call the office.</p>
          : <p>To request an appointment, call your office. For a dental emergency, call now. After hours, call {site.afterHoursPhone}.</p>}
      </Prose>
      <div><CallButton /></div>
    </Section>
  </PageLayout>;
}
