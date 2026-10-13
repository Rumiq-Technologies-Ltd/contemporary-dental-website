import { CallButton, RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { formatAddress, primaryOffice, site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'Orlando Office',
  description: 'Contemporary Dental Care Orlando: 5330 S John Young Pkwy, Orlando, FL 32839. Monday to Friday, 8:00am to 5:00pm.',
  path: primaryOffice.path,
});

// Still to supply before launch: map, directions, parking and accessibility details.
// BUILD NOTE: confirm Orlando's Monday hours with the practice.
export default function OrlandoOfficePage() {
  const office = primaryOffice;
  return <PageLayout>
    <PageIntro title="Orlando office" actions={<><RequestAppointmentButton /><CallButton office={office} withName={false} /></>} />
    <table className={styles.table}>
      <caption className="sr-only">Orlando office details</caption>
      <tbody>
        <tr><th scope="row">Address</th><td>{formatAddress(office)}</td></tr>
        <tr><th scope="row">Phone</th><td><a className={styles.link} href={office.phoneHref}>{office.phone}</a></td></tr>
        <tr><th scope="row">Email</th><td><a className={styles.link} href={`mailto:${site.email}`}>{site.email}</a></td></tr>
        <tr><th scope="row">Hours</th><td>{office.hours}. We are also open one Saturday a month. The date changes, so please call to check.</td></tr>
        <tr><th scope="row">Services</th><td>All of our services, including root canal treatment and after-hours emergency care.</td></tr>
      </tbody>
    </table>
  </PageLayout>;
}
