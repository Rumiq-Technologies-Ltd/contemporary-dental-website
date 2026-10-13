import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { listLabel, services, type Service } from '@/content/services';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { SectionFooter } from '@/components/layout/SectionFooter';
import { SaveService } from '@/components/ui/SaveService';
import { Icon } from '@/components/ui/Icon';
import { ServiceGallery } from './ServiceGallery';
import { RevealText } from '@/components/ui/RevealText';
import styles from './services.module.css';

const columns = (['a', 'b'] as const).map(id => {
  const cards = services.filter(service => service.column === id);
  // The desktop beat advances by an actual card plus its Figma 16px gap.
  const step = (count: number) => `${-cards.slice(0, count).reduce((sum, card) => sum + card.height + 16, 0) / 14.4}cqw`;
  return { id, cards, steps: { '--step-one': step(1), '--step-two': step(2) } as CSSProperties };
});

function ServiceCard({ service, duplicate = false }: { service: Service; duplicate?: boolean }) {
  const tabIndex = duplicate ? -1 : undefined;
  return <article className={styles.card} style={{ '--card-height': `${service.height / 14.4}cqw` } as CSSProperties}>
    <Image src={photos[service.image]} alt="" fill sizes="(max-width: 899px) 40vw, 305px" placeholder="blur" />
    <div className={styles.cardActions}>
      <SaveService id={service.id} title={service.title} className={styles.cardButton} tabIndex={tabIndex} />
      <Link href={service.href} className={styles.cardButton} aria-label={`Explore ${service.title}`} tabIndex={tabIndex}><Icon name="arrow" /></Link>
    </div>
    <h3 className={styles.cardLabel}><Link href={service.href} tabIndex={tabIndex}>{service.title}</Link></h3>
  </article>;
}

// "What we treat": every item links to its service page, both in the list and on its card.
export function Services() {
  return <Screen id="services" labelledBy="services-title" className={styles.services}>
    <div className={styles.copy}>
      <div className={styles.trio} aria-hidden="true">{[0, 1, 2].map(index => <span key={index}><Icon name="tooth" /></span>)}</div>
      <h2 id="services-title"><RevealText>What we treat</RevealText></h2>
      <ul className={styles.list}>
        {services.map(service => <li key={service.id}><Link href={service.href}>{listLabel(service)}</Link></li>)}
      </ul>
      <div className={styles.actions}>
        <Link href={routes.requestAppointment} className="pill pill-accent pill-large">Request an appointment</Link>
        <Link href={routes.services} className="pill pill-outline pill-large">All services</Link>
      </div>
    </div>
    <ServiceGallery>
      <div className={styles.grid}>
        {columns.map(({ id, cards, steps }) => <div key={id} className={styles.column} data-loop="services" style={steps}>
          {/* Identical groups make the -50% wrap seamless. Copies remain clickable
              but are excluded from screen readers and sequential keyboard focus. */}
          {[false, true].map(duplicate => <div key={String(duplicate)} className={styles.cardGroup}
            data-duplicate={duplicate} aria-hidden={duplicate || undefined}>
            {cards.map(service => <ServiceCard key={service.id} service={service} duplicate={duplicate} />)}
          </div>)}
        </div>)}
      </div>
    </ServiceGallery>
    <SectionFooter narrow />
  </Screen>;
}
