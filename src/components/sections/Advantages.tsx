import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/content/assets';
import { Screen } from '@/components/layout/Screen';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionFooter } from '@/components/layout/SectionFooter';
import { Icon } from '@/components/ui/Icon';
import styles from './advantages.module.css';

const stack = [photos.assessment, photos.appointments, photos.medication, photos.backPortrait, photos.doctor];
export function Advantages() {
  return <Screen id="advantages" labelledBy="advantages-title" className={styles.advantages}>
    <SiteHeader />
    <h2 id="advantages-title" className={styles.title}>OUR ADVANTAGES</h2>
    <div className={styles.stack}>
      {stack.map((photo, index) => <div className={styles.photo} key={photo.src}>
        <Image src={photo} alt={index === 4 ? 'A smiling dentist wearing a white coat' : ''} fill sizes="(max-width: 899px) 60vw, 391px" placeholder="blur" />
      </div>)}
      <div className={styles.label}><span><Icon name="technology" /></span><p>Advanced Technology</p></div>
    </div>
    <Link href="/#services" className={styles.down} aria-label="Explore our services"><Icon name="down" /></Link>
    <SectionFooter />
  </Screen>;
}
