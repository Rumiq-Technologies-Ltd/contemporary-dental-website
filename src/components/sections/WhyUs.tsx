import Link from 'next/link';
import type { CSSProperties } from 'react';
import { routes, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import styles from './whyus.module.css';

// Every row restates the content file (About, Home, Emergency and New patients copy). The table
// has one column on purpose: it lists what we offer and makes no claim about other dentists.
const promises = [
  'Options explained in plain language',
  'Treatment recommended in stages that suit your health',
  'Emergency visits open to new patients',
  'Same-day emergency appointments often available',
  'Same-day extraction when clinically suitable',
  'Team members who speak Spanish and Portuguese',
  whenOcoee('Phone lines at both offices and an after-hours line', 'An office phone line and an after-hours line'),
];

export function WhyUs() {
  return <Screen id="why-us" labelledBy="why-us-title" className={styles.whyUs}>
    <div className={styles.intro}>
      <h2 id="why-us-title" data-reveal="mask">What you can expect from us</h2>
      <div data-reveal=""><Link href={routes.requestAppointment} className="pill pill-outline pill-large">Request an appointment</Link></div>
    </div>
    <table className={styles.table} data-reveal="">
      <thead>
        <tr>
          <th scope="col"><span className="sr-only">What we offer</span></th>
          <th scope="col" className={styles.brand}>Contemporary<br />Dental Care</th>
        </tr>
      </thead>
      <tbody>
        {promises.map((promise, index) => <tr key={promise} data-reveal="right" style={{ '--i': index } as CSSProperties}>
          <th scope="row">{promise}</th>
          <td className={styles.brand}><span className={styles.check}><Icon name="check" /><span className="sr-only">Yes</span></span></td>
        </tr>)}
      </tbody>
    </table>
  </Screen>;
}
