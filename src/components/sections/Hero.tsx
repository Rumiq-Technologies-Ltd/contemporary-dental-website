import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/content/assets';
import { Screen } from '@/components/layout/Screen';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionFooter } from '@/components/layout/SectionFooter';
import { Icon } from '@/components/ui/Icon';
import { Action } from '@/components/ui/Interactions';
import { RevealText } from '@/components/ui/RevealText';
import styles from './hero.module.css';

export function Hero({ variant = 'decorated' }: { variant?: 'decorated' | 'clean' }) {
  const clean = variant === 'clean';
  return <Screen id="home" labelledBy="hero-title" className={`${styles.hero} ${clean ? styles.clean : ''}`}>
    <SiteHeader />
    <h1 id="hero-title" className={styles.headline}>
      <span className={styles.lineOne}><RevealText>REVOLUTIONIZING</RevealText></span>
      <span className={styles.lineTwo}>
        <RevealText delay={70}>DENTAL</RevealText>
        {!clean && <span className={styles.inlineDecor} aria-hidden="true">
          <span className={styles.portrait}><Image src={photos.smile} alt="" fill sizes="(max-width: 899px) 64px, 100px" loading="eager" /></span>
          <span className={styles.flower}><Icon name="flower" /></span>
        </span>}
        <RevealText delay={70}>CARE</RevealText>
      </span>
      <span className={styles.lineThree}><RevealText delay={140}>WITH TECHNOLOGY</RevealText></span>
    </h1>
    {!clean && <>
      <div className={styles.assistance} aria-hidden="true"><span>ASSISTANCE</span><span><Icon name="toothBadge" /></span></div>
      <div className={styles.solutions}>
        <div className={styles.iconTrio} aria-hidden="true">{[0, 1, 2].map(index => <span key={index}><Icon name="tooth" /></span>)}</div>
        <p>Modern Solutions,<br />Timeless Smiles</p>
      </div>
      <div className={styles.avatars} role="img" aria-label="Our dental care community">
        {[photos.doctor, photos.smile, photos.doctor].map((photo, index) => <span key={index}><Image src={photo} alt="" fill sizes="70px" /></span>)}
        <span className={styles.plus} aria-hidden="true"><Icon name="plus" /></span>
      </div>
      <Action content={{ kind: 'story' }} className={styles.videoCard} label="Discover our smile story — coming soon">
        {/* This is the largest visible image on mobile: discover it immediately. */}
        <span className={styles.videoImage}><Image src={photos.smile} fill alt="A woman showing her smile" sizes="(max-width: 899px) 160px, 234px" loading="eager" fetchPriority="high" /></span>
        <span className={styles.play}><Icon name="play" /></span>
      </Action>
    </>}
    <Link href="/#services" className={styles.cta}><span>GET<br />STARTED</span></Link>
    <SectionFooter />
  </Screen>;
}
