import Image from 'next/image';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { SplitWords } from '@/components/motion/SplitWords';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import styles from './hero.module.css';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

// Full-bleed photograph, a giant headline and the trust line.
// The headline words rise at first paint, the rest fades in after them, and the photo drifts
// slower than the page as you scroll (all CSS; see "Motion" in globals.css).
export async function Hero() {
  const lang = await getLocale();
  const t = getMessages(lang).home.hero;
  // Headline: "Honest, patient-focused dental care in Orlando [and Ocoee]". Plain text in the
  // DOM, so screen readers and crawlers read the sentence as written.
  const headline = whenOcoee(t.headline.withOcoee, t.headline.orlandoOnly);

  return <Screen id="home" labelledBy="hero-title" className={styles.hero}>
    <Image src={photos.appointments} alt="" fill priority sizes="100vw" placeholder="blur" className={styles.photo} data-parallax="" />
    <div className={styles.copy}>
      <SplitWords as="h1" id="hero-title" className={styles.headline} text={headline} delay={100} />
      <p className={styles.trust} data-load="" style={delay(650)}>
        <span>{t.trustReviews}</span>
      </p>
    </div>
  </Screen>;
}
