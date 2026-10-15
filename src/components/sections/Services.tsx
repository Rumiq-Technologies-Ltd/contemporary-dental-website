import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { services } from '@/content/services';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import { SaveService } from '@/components/ui/SaveService';
import styles from './services.module.css';

// "Everything we treat": a static grid, so every service is visible at once.
// The whole card is one link; the save button sits above that link.
export function Services() {
  return <Screen id="services" labelledBy="services-title" className={styles.services}>
    <div className={styles.heading}>
      <div className={styles.headingText}>
        <p className="eyebrow">Our services</p>
        <h2 id="services-title" data-reveal="mask">Everything we treat</h2>
      </div>
      <div data-reveal=""><Link href={routes.services} className="pill pill-dark pill-large">All services</Link></div>
    </div>
    <ul className={styles.grid}>
      {services.map((service, index) => <li key={service.id} data-reveal="flip" style={{ '--i': index % 4 } as CSSProperties}>
        <article className={styles.card} data-tilt="">
          <div className={styles.media}>
            <Image src={photos[service.image]} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1099px) 50vw, 25vw" placeholder="blur" />
            <SaveService id={service.id} title={service.title} className={styles.save} />
          </div>
          <div className={styles.body}>
            <h3><Link href={service.href} className={styles.title}>{service.title}</Link></h3>
            <p>{service.description}</p>
            <span className={styles.more} aria-hidden="true">Learn more<Icon name="arrow" /></span>
          </div>
        </article>
      </li>)}
    </ul>
  </Screen>;
}
