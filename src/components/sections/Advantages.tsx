import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { routes, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { SectionFooter } from '@/components/layout/SectionFooter';
import { Icon } from '@/components/ui/Icon';
import { RevealText } from '@/components/ui/RevealText';
import { AdvantageStack } from './AdvantageStack';
import styles from './advantages.module.css';

// Labels come from the About, Home and New patients copy. The stack needs five cards.
const stack = [
  { photo: photos.assessment, label: 'Honest treatment planning', phase: -1.6 },
  { photo: photos.appointments, label: 'Easy to reach', phase: -3.2 },
  { photo: photos.medication, label: 'Care in your language', phase: -4.8 },
  { photo: photos.backPortrait, label: 'Same-day care when needed', phase: -6.4 },
  { photo: photos.doctor, label: 'New patients welcome', phase: 0 },
];

const teaser = whenOcoee(
  'Dr. Sheryar Khan, a general dentist, founded Contemporary Dental Care in 2023. We see patients at our Orlando office, and at our Ocoee office on Mondays. We explain your options clearly, plan treatment in sensible stages and put your health first.',
  'Dr. Sheryar Khan, a general dentist, founded Contemporary Dental Care in 2023. We see patients at our Orlando office. We explain your options clearly, plan treatment in sensible stages and put your health first.',
);

// Homepage "About teaser".
export function Advantages() {
  return <Screen id="advantages" labelledBy="advantages-title" className={styles.advantages}>
    <h2 id="advantages-title" className={styles.title}><RevealText>About us</RevealText></h2>
    <div className={styles.teaser}>
      <h3>A practice built on honest care</h3>
      <p>{teaser}</p>
      <Link href={routes.team} className="pill pill-accent">Meet Dr. Khan and our team</Link>
    </div>
    <p className="sr-only">{stack.map(card => card.label).join('. ')}.</p>
    <AdvantageStack>
      {stack.map(({ photo, label, phase }) => <div className={styles.photo} key={photo.src}
        data-loop="advantages" style={{ '--phase': `${phase}s` } as CSSProperties}>
        <Image src={photo} alt="" fill sizes="(max-width: 899px) 60vw, 391px" placeholder="blur" />
        <div className={styles.label} data-loop="caption" aria-hidden="true"><span><Icon name="technology" /></span><p>{label}</p></div>
      </div>)}
    </AdvantageStack>
    <Link href="/#offices" className={styles.down} aria-label="Our locations"><Icon name="down" /></Link>
    <SectionFooter />
  </Screen>;
}
