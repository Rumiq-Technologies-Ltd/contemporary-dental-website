import { PagePhoto } from '@/components/page/PagePhoto';
import { Notice, Section } from '@/components/page/Section';
import { MapEmbed } from '@/components/ui/MapEmbed';
import type { PhotoName } from '@/content/assets';
import { directionsHref, formatAddress, mapEmbedHref, type Office } from '@/content/site';
import { fill } from '@/i18n/fill';
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
  /** Map frame title with a {name} placeholder. */
  mapTitle: string;
  photo?: { name: PhotoName; alt: string };
  /** Shown under the directions link. Each line is left out when its text is empty. */
  arrivalTip?: { label: string; text: string; landmarksLabel: string; landmarks: string };
}

// One office's details on the contact page: its photograph when it has one, the facts in a table,
// the map, a link to directions, and the arrival tip. The section id is the office id, so each office has an anchor.
export function OfficeDetails({ office, title, tableCaption, labels, hours, services, directionsLabel, mapTitle, photo, arrivalTip }: OfficeDetailsProps) {
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
    <MapEmbed src={mapEmbedHref(office)} title={fill(mapTitle, { name: office.name })} />
    <p><a className={styles.link} href={directionsHref(office)}>{directionsLabel}</a></p>
    {arrivalTip && (arrivalTip.text || arrivalTip.landmarks) && <Notice>
      {arrivalTip.text && <><strong>{arrivalTip.label}:</strong> {arrivalTip.text}</>}
      {arrivalTip.text && arrivalTip.landmarks && <br />}
      {arrivalTip.landmarks && <><strong>{arrivalTip.landmarksLabel}:</strong> {arrivalTip.landmarks}</>}
    </Notice>}
  </Section>;
}
