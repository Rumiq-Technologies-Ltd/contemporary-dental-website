import Link from 'next/link';
import { OfficeCard } from '@/components/page/OfficeCard';
import { PagePhoto } from '@/components/page/PagePhoto';
import { ClosingBand } from '@/components/page/ClosingBand';
import { offices, routes } from '@/content/site';
import page from '@/components/page/page.module.css';
import styles from './home.module.css';

// The homepage sections that follow the designed screens. Same language, no new patterns.

export function SameDayBand() {
  return <section id="same-day" aria-labelledby="same-day-title" className={styles.block}>
    <h2 id="same-day-title">Same-day care when you need it</h2>
    <p>Tooth extractions and implant placement can be done the same day, subject to clinical suitability and availability. Emergency visits are open to new patients, and same-day emergency appointments are often available. Same-day emergency care also includes assessment and first-stage treatment for abscesses and swelling, and for broken or fractured teeth.</p>
  </section>;
}

export function OfficesBand() {
  return <section id="offices" aria-labelledby="offices-title" className={`${styles.block} ${styles.stacked}`}>
    <h2 id="offices-title">Our locations</h2>
    <div className={page.grid}>{offices.map(office => <OfficeCard key={office.id} office={office} />)}</div>
  </section>;
}

export function NewPatientsBand() {
  return <section id="new-patients" aria-labelledby="new-patients-title" className={`${styles.block} ${styles.split}`}>
    <div className={styles.copy}>
      <h2 id="new-patients-title">New to us? Here is what to expect</h2>
      <Link href={routes.newPatients} className="pill pill-accent pill-large">New patients</Link>
    </div>
    <PagePhoto photo="roomBlue" alt="A dental treatment room" wide />
  </section>;
}

export function ClosingSection() {
  return <div className={styles.closing}><ClosingBand /></div>;
}
