import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { formatAddress, offices, routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import styles from './offices.module.css';

// Only Orlando has an exterior photograph. Ocoee shows its name on a colour block rather than
// borrowing a photo from the other office.
const officePhotos = { orlando: photos.orlandoFront } as const;

// Calling is how patients book today, so every office gets its own call button.
export function Offices() {
  return <Screen id="offices" labelledBy="offices-title" className={styles.offices}>
    <div className={styles.heading} data-reveal="">
      <div className={styles.headingText}>
        <p className="eyebrow">Where to find us</p>
        <h2 id="offices-title">Call the office nearest you to book</h2>
      </div>
      <Link href={routes.locations} className="pill pill-outline pill-large">All locations</Link>
    </div>
    <div className={styles.grid}>
      {offices.map((office, index) => {
        const photo = office.id === 'orlando' ? officePhotos.orlando : undefined;
        return <article key={office.id} className={styles.card} data-reveal="zoom" style={{ '--i': index } as CSSProperties}>
          <div className={styles.media} data-tilt="5">
            {photo
              ? <Image src={photo} fill alt={`The ${office.name} office`} sizes="(max-width: 899px) 100vw, 50vw" placeholder="blur" data-scroll-zoom="" />
              : <span className={styles.placeholder} aria-hidden="true">{office.name}</span>}
          </div>
          <h3>{office.name}</h3>
          <address>{formatAddress(office)}</address>
          <p className={styles.hours}>{office.hours}</p>
          <div className={styles.actions}>
            <a href={office.phoneHref} className={`pill pill-accent pill-large ${styles.call}`}>
              <Icon name="phone" />Call {office.name}: {office.phone}
            </a>
            <Link href={office.path} className={styles.details}>Office details<Icon name="arrow" /></Link>
          </div>
        </article>;
      })}
    </div>
  </Screen>;
}
