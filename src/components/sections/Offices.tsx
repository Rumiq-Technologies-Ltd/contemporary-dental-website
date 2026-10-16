import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { directionsHref, formatAddress, mapEmbedHref, officeAnchor, offices, routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './offices.module.css';

// Only Orlando has an exterior photograph. Ocoee shows its name on a colour block rather than
// borrowing a photo from the other office.
const officePhotos = { orlando: photos.orlandoFront } as const;

// Calling is how patients book today, so every office gets its own call button.
export async function Offices() {
  const lang = await getLocale();
  const { common, home } = getMessages(lang);
  const t = home.offices;

  return <Screen id="offices" labelledBy="offices-title" className={styles.offices}>
    <div className={styles.heading} data-reveal="">
      <div className={styles.headingText}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="offices-title">{t.heading}</h2>
      </div>
      <Link href={localePath(lang, routes.contact)} className="pill pill-outline pill-large">{t.allLocations}</Link>
    </div>
    <div className={styles.grid}>
      {offices.map((office, index) => {
        const photo = office.id === 'orlando' ? officePhotos.orlando : undefined;
        return <article key={office.id} className={styles.card} data-reveal="zoom" style={{ '--i': index } as CSSProperties}>
          <div className={styles.media} data-tilt="5">
            {photo
              ? <Image src={photo} fill alt={fill(t.photoAlt, { name: office.name })} sizes="(max-width: 899px) 100vw, 50vw" placeholder="blur" data-scroll-zoom="" />
              : <span className={styles.placeholder} aria-hidden="true">{office.name}</span>}
          </div>
          <h3>{office.name}</h3>
          <address>{formatAddress(office)}</address>
          <p className={styles.hours}>{common.hours[office.id]}</p>
          <MapEmbed src={mapEmbedHref(office)} title={fill(t.mapTitle, { name: office.name })} />
          <a href={directionsHref(office)} className={styles.directions}>{t.directions}<Icon name="arrow" /></a>
          <div className={styles.actions}>
            <a href={office.phoneHref} className={`pill pill-accent pill-large ${styles.call}`}>
              <Icon name="phone" />{fill(common.callOffice, { name: office.name, phone: office.phone })}
            </a>
            <Link href={localePath(lang, officeAnchor(office))} className={styles.details}>{t.details}<Icon name="arrow" /></Link>
          </div>
        </article>;
      })}
    </div>
  </Screen>;
}
