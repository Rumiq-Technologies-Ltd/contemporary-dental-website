import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/content/assets';
import { routes, site, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionFooter } from '@/components/layout/SectionFooter';
import { Icon } from '@/components/ui/Icon';
import { RevealText } from '@/components/ui/RevealText';
import styles from './hero.module.css';

// Headline: "Honest, patient-focused dental care in Orlando [and Ocoee]". The text
// is sentence case in the DOM and uppercased by CSS, so screen readers read it naturally.
const lineThree = whenOcoee('in Orlando and Ocoee', 'in Orlando');

export function Hero({ variant = 'decorated' }: { variant?: 'decorated' | 'clean' }) {
  const clean = variant === 'clean';
  return <Screen id="home" labelledBy="hero-title" className={`${styles.hero} ${clean ? styles.clean : ''}`}>
    <SiteHeader />
    <h1 id="hero-title" className={styles.headline}>
      <span className={styles.lineOne}><RevealText>Honest, patient-focused</RevealText></span>
      <span className={styles.lineTwo}>
        <RevealText delay={70}>dental</RevealText>
        {!clean && <span className={styles.inlineDecor} aria-hidden="true">
          <span className={styles.portrait}><Image src={photos.smile} alt="" fill sizes="(max-width: 899px) 64px, 100px" loading="eager" /></span>
          <span className={styles.flower}><Icon name="flower" /></span>
        </span>}
        <RevealText delay={70}>care</RevealText>
      </span>
      <span className={styles.lineThree}><RevealText delay={140}>{lineThree}</RevealText></span>
    </h1>
    <p className={styles.support}>Routine care, emergency visits, implants, cosmetic treatment and clear aligners. Members of our team speak English, Spanish and Portuguese. Call ahead to confirm who is in.</p>
    {!clean && <>
      <div className={styles.assistance} aria-hidden="true"><span>NEW PATIENTS WELCOME</span><span><Icon name="toothBadge" /></span></div>
      <div className={styles.solutions}>
        <div className={styles.iconTrio} aria-hidden="true">{[0, 1, 2].map(index => <span key={index}><Icon name="tooth" /></span>)}</div>
        <p>Dental emergency? <Link href={routes.emergency}>Call us now.</Link><br />After hours, call <a href={site.afterHoursHref}>{site.afterHoursPhone}</a>.</p>
      </div>
      <div className={styles.avatars} role="img" aria-label="Our dental care community">
        {[photos.doctor, photos.smile, photos.doctor].map((photo, index) => <span key={index}><Image src={photo} alt="" fill sizes="70px" /></span>)}
        <span className={styles.plus} aria-hidden="true"><Icon name="plus" /></span>
      </div>
      <Link href={routes.newPatients} className={styles.videoCard} aria-label="New to us? Here is what to expect">
        {/* This is the largest visible image on mobile: discover it immediately. */}
        <span className={styles.videoImage}><Image src={photos.smile} fill alt="" sizes="(max-width: 899px) 160px, 234px" loading="eager" fetchPriority="high" /></span>
        <span className={styles.play}><Icon name="arrow" /></span>
      </Link>
    </>}
    <Link href={routes.requestAppointment} className={styles.cta}><span>REQUEST<br />APPOINTMENT</span></Link>
    <SectionFooter />
  </Screen>;
}
