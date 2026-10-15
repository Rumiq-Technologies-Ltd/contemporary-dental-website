import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CallButton, RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { formatAddress, offices, ocoeeEnabled } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { EnquiryPanel } from '@/features/inquiry/EnquiryPanel';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

const office = offices.find(item => item.id === 'ocoee');

export async function generateMetadata(): Promise<Metadata> {
  if (!ocoeeEnabled || !office) notFound();
  const lang = await getLocale();
  const messages = getMessages(lang);
  const { meta } = messages.locations.ocoee;
  const description = fill(meta.description, { address: formatAddress(office), hours: messages.common.hours.ocoee });
  return pageMetadata({ lang, title: meta.title, description, path: office.path });
}

// HOLD: this page is not published until the Ocoee decision is recorded. Before it
// goes live, confirm the Monday hours against actual operating days in Curve
// (operating days fell from 74 a quarter to 11). Until then it returns the 404 page.
export default async function OcoeeOfficePage() {
  if (!ocoeeEnabled || !office) notFound();
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.locations.ocoee;
  const labels = messages.locations.labels;
  return <PageLayout>
    <PageIntro title={t.title} actions={<><RequestAppointmentButton /><CallButton office={office} withName={false} /></>} />
    <table className={styles.table}>
      <caption className="sr-only">{t.tableCaption}</caption>
      <tbody>
        <tr><th scope="row">{labels.address}</th><td>{formatAddress(office)}</td></tr>
        <tr><th scope="row">{labels.phone}</th><td><a className={styles.link} href={office.phoneHref}>{office.phone}</a></td></tr>
        <tr><th scope="row">{labels.hours}</th><td>{messages.common.hours.ocoee}</td></tr>
        <tr><th scope="row">{labels.services}</th><td>{t.services}</td></tr>
      </tbody>
    </table>
    <EnquiryPanel source="/locations/ocoee" />
  </PageLayout>;
}
