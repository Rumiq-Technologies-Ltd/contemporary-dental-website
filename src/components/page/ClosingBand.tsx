import { primaryOffice } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { RequestAppointmentButton, CallButton } from './Actions';
import styles from './page.module.css';

export async function ClosingBand({ heading, children }: { heading?: string; children?: React.ReactNode }) {
  const lang = await getLocale();
  const t = getMessages(lang).common.closingBand;
  return <section className={styles.band} aria-labelledby="closing-title" data-reveal="zoom">
    <h2 id="closing-title">{heading ?? t.heading}</h2>
    {children ?? <p>{fill(t.body, { name: primaryOffice.name, phone: primaryOffice.phone })}</p>}
    <div className={styles.actions}><RequestAppointmentButton /><CallButton /></div>
  </section>;
}
