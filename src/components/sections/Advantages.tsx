import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/content/assets';
import { routes, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './advantages.module.css';

// Homepage "About us": the statement on the left, a practice photograph with the commitments
// (the three commitments come from the About page) on the right.
export async function Advantages() {
  const lang = await getLocale();
  const t = getMessages(lang).home.advantages;
  const teaser = whenOcoee(t.teaser.withOcoee, t.teaser.orlandoOnly);

  return <Screen id="advantages" labelledBy="advantages-title" className={styles.about}>
    <div className={styles.copy} data-reveal="left">
      <p className="eyebrow">{t.eyebrow}</p>
      <h2 id="advantages-title">{t.heading}</h2>
      <p className={styles.body}>{teaser}</p>
      <Link href={localePath(lang, routes.team)} className="pill pill-outline pill-large">{t.cta}</Link>
    </div>
    <div className={styles.media} data-reveal="zoom" data-tilt="4">
      <Image src={photos.roomCream} fill alt={t.photoAlt} sizes="(max-width: 899px) 100vw, 50vw" placeholder="blur" data-scroll-zoom="" />
      <ul className={styles.badges} data-stagger="">
        {t.commitments.map(commitment => <li key={commitment} className="badge" data-reveal="left"><Icon name="check" />{commitment}</li>)}
      </ul>
    </div>
  </Screen>;
}
