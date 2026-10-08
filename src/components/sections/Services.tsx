import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { services, type Service } from '@/content/services';
import { Screen } from '@/components/layout/Screen';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionFooter } from '@/components/layout/SectionFooter';
import { Action, DestinationAction } from '@/components/ui/Interactions';
import { SaveService } from '@/components/ui/SaveService';
import { Icon } from '@/components/ui/Icon';
import { ServiceGallery } from './ServiceGallery';
import styles from './services.module.css';

function ServiceCard({ service, duplicate = false }: { service: Service; duplicate?: boolean }) {
  const tabIndex = duplicate ? -1 : undefined;
  return <article className={styles.card} style={{ '--card-height': `${service.height / 14.4}cqw` } as CSSProperties}>
    <Image src={photos[service.image]} alt="" fill sizes="(max-width: 899px) 40vw, 305px" placeholder="blur" />
    <div className={styles.cardActions}>
      <SaveService id={service.id} title={service.title} className={styles.cardButton} tabIndex={tabIndex} />
      <Action content={{ kind: 'service', id: service.id }} className={styles.cardButton} label={`Explore ${service.title}`} tabIndex={tabIndex}><Icon name="arrow" /></Action>
    </div>
    <h3 className={styles.cardLabel}><Action content={{ kind: 'service', id: service.id }} tabIndex={tabIndex}>{service.title}</Action></h3>
  </article>;
}

export function Services() {
  return <Screen id="services" labelledBy="services-title" className={styles.services}>
    <SiteHeader />
    <div className={styles.copy}>
      <div className={styles.trio} aria-hidden="true">{[0, 1, 2].map(index => <span key={index}><Icon name="tooth" /></span>)}</div>
      <h2 id="services-title">EXPLORE OUR<br />SERVICE, MAKE<br />YOUR SMILE SHINE</h2>
      <div className={styles.actions}>
        <DestinationAction destination="app" className="pill pill-accent pill-large" label="Get The App — coming soon">Get The App</DestinationAction>
        <Link href="/#advantages" className="pill pill-outline pill-large">Meet The Team</Link>
      </div>
    </div>
    <ServiceGallery>
      <div className={styles.grid}>
        {(['a', 'b'] as const).map(column => <div key={column} className={styles.column}>
          {/* Identical groups make the -50% wrap seamless. Copies remain clickable
              but are excluded from screen readers and sequential keyboard focus. */}
          {[false, true].map(duplicate => <div key={String(duplicate)} className={styles.cardGroup}
            data-duplicate={duplicate} aria-hidden={duplicate || undefined}>
            {services.filter(service => service.column === column).map(service => <ServiceCard key={service.id} service={service} duplicate={duplicate} />)}
          </div>)}
        </div>)}
      </div>
    </ServiceGallery>
    <SectionFooter narrow />
  </Screen>;
}
