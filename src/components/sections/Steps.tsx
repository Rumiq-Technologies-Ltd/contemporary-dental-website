import Link from 'next/link';
import type { CSSProperties } from 'react';
import { routes, site, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import { Highlights } from './Highlights';
import styles from './steps.module.css';

// Facts from the content file, short enough to scan in a moving strip.
const highlights = [
  'New patients welcome',
  'Same-day emergency appointments often available',
  whenOcoee('Offices in Orlando and Ocoee', 'Office in Orlando'),
  'English, Spanish and Portuguese spoken',
  `After-hours line: ${site.afterHoursPhone}`,
];

// The three steps restate the practice's own commitments: call, an honest plan, staged care.
const steps = [
  {
    badge: 'New patients welcome',
    title: 'Call your office',
    text: whenOcoee('Call Orlando or Ocoee to book. Tell us your language when you call.', 'Call our Orlando office to book. Tell us your language when you call.'),
  },
  {
    badge: 'Honest treatment planning',
    title: 'Get an honest plan',
    text: 'We explain your options in plain language and recommend treatment in stages that suit your health.',
  },
  {
    badge: 'Care in your language',
    title: 'Care that puts your health first',
    text: 'Members of our team speak English, Spanish and Portuguese. Your health comes ahead of the size of a treatment plan.',
  },
];

export function Steps() {
  return <Screen id="how-it-works" labelledBy="steps-title" className={styles.steps}>
    <Highlights items={highlights} />
    <div className={styles.panel}>
      <div className={styles.intro}>
        <h2 id="steps-title" data-reveal="mask">Getting good care is simple</h2>
        <div data-reveal="" style={{ '--d': '150ms' } as CSSProperties}><Link href={routes.newPatients} className="pill pill-outline pill-large">What to expect</Link></div>
      </div>
      <ol className={styles.list}>
        {steps.map((step, index) => <li key={step.title} className={styles.step} data-reveal="right" style={{ '--i': index } as CSSProperties}>
          <span className={styles.number} aria-hidden="true" data-scroll-rise="">{index + 1}</span>
          <div className={styles.stepBody}>
            <p className="badge"><Icon name="check" />{step.badge}</p>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </li>)}
      </ol>
    </div>
  </Screen>;
}
