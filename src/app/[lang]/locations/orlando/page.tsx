import type { Metadata } from 'next';
import { CallButton, RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { formatAddress, primaryOffice, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const { meta } = messages.locations.orlando;
  const description = fill(meta.description, { address: formatAddress(primaryOffice), hours: messages.common.hours.orlando });
  return pageMetadata({ lang, title: meta.title, description, path: primaryOffice.path });
}

// Still to supply before launch: map, directions, parking and accessibility details.
// BUILD NOTE: confirm Orlando's Monday hours with the practice.
export default async function OrlandoOfficePage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.locations.orlando;
  const labels = messages.locations.labels;
  const office = primaryOffice;
  return <PageLayout>
    <PageIntro title={t.title} actions={<><RequestAppointmentButton /><CallButton office={office} withName={false} /></>} />
    <PagePhoto photo="orlandoFront" alt={t.photoAlt} wide />
    <table className={styles.table}>
      <caption className="sr-only">{t.tableCaption}</caption>
      <tbody>
        <tr><th scope="row">{labels.address}</th><td>{formatAddress(office)}</td></tr>
        <tr><th scope="row">{labels.phone}</th><td><a className={styles.link} href={office.phoneHref}>{office.phone}</a></td></tr>
        <tr><th scope="row">{labels.email}</th><td><a className={styles.link} href={`mailto:${site.email}`}>{site.email}</a></td></tr>
        <tr><th scope="row">{labels.hours}</th><td>{messages.common.hours.orlando}. {t.hoursNote}</td></tr>
        <tr><th scope="row">{labels.services}</th><td>{t.services}</td></tr>
      </tbody>
    </table>
  </PageLayout>;
}
