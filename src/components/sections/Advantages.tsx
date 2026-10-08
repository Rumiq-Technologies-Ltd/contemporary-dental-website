import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { photos } from '@/content/assets';
import { Screen } from '@/components/layout/Screen';
import { SectionFooter } from '@/components/layout/SectionFooter';
import { Icon } from '@/components/ui/Icon';
import { RevealText } from '@/components/ui/RevealText';
import { AdvantageStack } from './AdvantageStack';
import styles from './advantages.module.css';

const stack = [
  { photo: photos.assessment, label: 'Oral Health Assessment', phase: -1.6 },
  { photo: photos.appointments, label: 'Personalized Care', phase: -3.2 },
  { photo: photos.medication, label: 'Modern Solutions', phase: -4.8 },
  { photo: photos.backPortrait, label: 'Timeless Smiles', phase: -6.4 },
  { photo: photos.doctor, label: 'Advanced Technology', phase: 0 },
];
export function Advantages() {
  return <Screen id="advantages" labelledBy="advantages-title" className={styles.advantages}>
    <h2 id="advantages-title" className={styles.title}><RevealText>OUR ADVANTAGES</RevealText></h2>
    <p className="sr-only">{stack.map(card => card.label).join('. ')}.</p>
    <AdvantageStack>
      {stack.map(({ photo, label, phase }, index) => <div className={styles.photo} key={photo.src}
        data-loop="advantages" style={{ '--phase': `${phase}s` } as CSSProperties}>
        <Image src={photo} alt={index === 4 ? 'A smiling dentist wearing a white coat' : ''} fill sizes="(max-width: 899px) 60vw, 391px" placeholder="blur" />
        <div className={styles.label} data-loop="caption" aria-hidden="true"><span><Icon name="technology" /></span><p>{label}</p></div>
      </div>)}
    </AdvantageStack>
    <Link href="/#services" className={styles.down} aria-label="Explore our services"><Icon name="down" /></Link>
    <SectionFooter />
  </Screen>;
}
