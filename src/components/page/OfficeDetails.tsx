import { PagePhoto } from '@/components/page/PagePhoto';
import { Section } from '@/components/page/Section';
import type { PhotoName } from '@/content/assets';
import { directionsHref, formatAddress, type Office } from '@/content/site';
import styles from './page.module.css';

interface OfficeDetailsProps {
  office: Office;
  /** Section heading, for example "Orlando office". */
  title: string;
  tableCaption: string;
  labels: { address: string; phone: string; hours: string; services: string };
  hours: string;
  services: string;
  directionsLabel: string;
  photo?: { name: PhotoName; alt: string };
}

// One office's details on the contact page: its photograph when it has one, then the facts in a
// table and a link to directions. The section id is the office id, so each office has an anchor.
export function OfficeDetails({ office, title, tableCaption, labels, hours, services, directionsLabel, photo }: OfficeDetailsProps) {
  return <Section id={office.id} title={title}>
    {photo && <PagePhoto photo={photo.name} alt={photo.alt} wide />}
    <table className={styles.table}>
      <caption className="sr-only">{tableCaption}</caption>
      <tbody>
        <tr><th scope="row">{labels.address}</th><td>{formatAddress(office)}</td></tr>
        <tr><th scope="row">{labels.phone}</th><td><a className={styles.link} href={office.phoneHref}>{office.phone}</a></td></tr>
        <tr><th scope="row">{labels.hours}</th><td>{hours}</td></tr>
        <tr><th scope="row">{labels.services}</th><td>{services}</td></tr>
      </tbody>
    </table>
    <p><a className={styles.link} href={directionsHref(office)}>{directionsLabel}</a></p>
  </Section>;
}
