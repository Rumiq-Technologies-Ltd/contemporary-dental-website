import { primaryOffice } from '@/content/site';
import { RequestAppointmentButton, CallButton } from './Actions';
import styles from './page.module.css';

export function ClosingBand({ heading = 'Ready when you are', children }: { heading?: string; children?: React.ReactNode }) {
  return <section className={styles.band} aria-labelledby="closing-title">
    <h2 id="closing-title">{heading}</h2>
    {children ?? <p>Request an appointment, or call {primaryOffice.name} at {primaryOffice.phone}.</p>}
    <div className={styles.actions}><RequestAppointmentButton /><CallButton /></div>
  </section>;
}
