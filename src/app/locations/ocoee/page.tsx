import { notFound } from 'next/navigation';
import { CallButton, RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { formatAddress, offices, ocoeeEnabled } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

const office = offices.find(item => item.id === 'ocoee');

export const metadata = pageMetadata({
  title: 'Ocoee Office',
  description: 'Contemporary Dental Care Ocoee: 2910 Maguire Rd, Suite 1005, Ocoee, FL 34761. Monday, 9:00am to 5:00pm.',
  path: '/locations/ocoee',
});

// HOLD: this page is not published until the Ocoee decision is recorded. Before it
// goes live, confirm the Monday hours against actual operating days in Curve
// (operating days fell from 74 a quarter to 11). Until then it returns the 404 page.
export default function OcoeeOfficePage() {
  if (!ocoeeEnabled || !office) notFound();
  return <PageLayout>
    <PageIntro title="Ocoee office" actions={<><RequestAppointmentButton /><CallButton office={office} withName={false} /></>} />
    <table className={styles.table}>
      <caption className="sr-only">Ocoee office details</caption>
      <tbody>
        <tr><th scope="row">Address</th><td>{formatAddress(office)}</td></tr>
        <tr><th scope="row">Phone</th><td><a className={styles.link} href={office.phoneHref}>{office.phone}</a></td></tr>
        <tr><th scope="row">Hours</th><td>{office.hours}</td></tr>
        <tr><th scope="row">Services</th><td>All of our services except root canal treatment. Root canal treatment is performed at our Orlando office, and Ocoee patients who need it are scheduled there.</td></tr>
      </tbody>
    </table>
  </PageLayout>;
}
