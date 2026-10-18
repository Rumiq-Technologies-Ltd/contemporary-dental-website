import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { getServices } from '@/content/services';
import { SaveService } from '@/components/ui/SaveService';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './services.module.css';

// The service grid, on the services page: every service is visible at once. The whole card is one
// link; the save button sits above that link.
export async function Services() {
  const lang = await getLocale();
  const { common } = getMessages(lang);
  const services = getServices(lang);

  return <ul className={styles.grid}>
    {services.map((service, index) => <li key={service.id} data-reveal="flip" style={{ '--i': index % 4 } as CSSProperties}>
      <article className={styles.card} data-tilt="">
        <div className={styles.media}>
          <Image src={photos[service.thumbnail]} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1099px) 50vw, 25vw" placeholder="blur" />
          <SaveService id={service.id} title={service.title} labels={common.saveService} className={styles.save} />
        </div>
        <div className={styles.body}>
          <h3><Link href={localePath(lang, service.href)} className={styles.title}>{service.title}</Link></h3>
          <span className={styles.more} aria-hidden="true">{common.learnMore}</span>
        </div>
      </article>
    </li>)}
  </ul>;
}
