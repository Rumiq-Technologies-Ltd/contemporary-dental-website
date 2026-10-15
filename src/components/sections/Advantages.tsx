import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/content/assets';
import { routes, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import styles from './advantages.module.css';

// The three commitments come from the About page.
const commitments = ['Honest treatment planning', 'Easy to reach', 'Care in your language'];

const teaser = whenOcoee(
  'Dr. Sheryar Khan, a general dentist, founded Contemporary Dental Care in 2023. We see patients at our Orlando office, and at our Ocoee office on Mondays. We explain your options clearly, plan treatment in sensible stages and put your health first.',
  'Dr. Sheryar Khan, a general dentist, founded Contemporary Dental Care in 2023. We see patients at our Orlando office. We explain your options clearly, plan treatment in sensible stages and put your health first.',
);

// Homepage "About us": the statement on the left, a practice photograph with the commitments on the right.
export function Advantages() {
  return <Screen id="advantages" labelledBy="advantages-title" className={styles.about}>
    <div className={styles.copy} data-reveal="left">
      <p className="eyebrow">About us</p>
      <h2 id="advantages-title">A practice built on honest care</h2>
      <p className={styles.body}>{teaser}</p>
      <Link href={routes.team} className="pill pill-outline pill-large">Meet Dr. Khan and our team</Link>
    </div>
    <div className={styles.media} data-reveal="zoom" data-tilt="4">
      <Image src={photos.roomCream} fill alt="A treatment room at Contemporary Dental Care" sizes="(max-width: 899px) 100vw, 50vw" placeholder="blur" data-scroll-zoom="" />
      <ul className={styles.badges} data-stagger="">
        {commitments.map(commitment => <li key={commitment} className="badge" data-reveal="left"><Icon name="check" />{commitment}</li>)}
      </ul>
    </div>
  </Screen>;
}
