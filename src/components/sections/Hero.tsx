import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { primaryOffice, routes, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { SplitWords } from '@/components/motion/SplitWords';
import { Icon } from '@/components/ui/Icon';
import styles from './hero.module.css';

// Headline: "Honest, patient-focused dental care in Orlando [and Ocoee]". Plain text in the
// DOM, so screen readers and crawlers read the sentence as written.
const headlineEnd = whenOcoee('in Orlando and Ocoee', 'in Orlando');

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

// Full-bleed photograph, a giant headline, and one cyan action with the phone beside it.
// The headline words rise at first paint, the rest fades in after them, and the photo drifts
// slower than the page as you scroll (all CSS; see "Motion" in globals.css).
export function Hero() {
  return <Screen id="home" labelledBy="hero-title" className={styles.hero}>
    <Image src={photos.appointments} alt="" fill priority sizes="100vw" placeholder="blur" className={styles.photo} data-parallax="" />
    <div className={styles.copy}>
      <SplitWords as="h1" id="hero-title" className={styles.headline} text={`Honest, patient-focused dental care ${headlineEnd}`} delay={100} />
      <p className={styles.trust} data-load="" style={delay(650)}>
        <span>New patients welcome</span><span>English, Spanish and Portuguese</span>
      </p>
    </div>
    <div className={styles.side} data-load="" style={delay(800)}>
      <p>Routine care, emergency visits, implants, cosmetic treatment and clear aligners. We explain your options clearly and plan treatment in sensible stages.</p>
      <Link href={routes.requestAppointment} className="pill pill-accent pill-large">Request an appointment</Link>
      <a href={primaryOffice.phoneHref} className={styles.call}><Icon name="phone" />Call {primaryOffice.name}: {primaryOffice.phone}</a>
    </div>
  </Screen>;
}
