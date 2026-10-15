import Link from 'next/link';
import type { CSSProperties } from 'react';
import { routes, site, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon } from '@/components/ui/Icon';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { Highlights } from './Highlights';
import styles from './steps.module.css';

export async function Steps() {
  const lang = await getLocale();
  const t = getMessages(lang).home.steps;

  // Facts from the content file, short enough to scan in a moving strip.
  const highlights = [
    t.highlights.newPatients,
    t.highlights.sameDayEmergency,
    whenOcoee(t.highlights.offices.withOcoee, t.highlights.offices.orlandoOnly),
    t.highlights.languages,
    fill(t.highlights.afterHours, { phone: site.afterHoursPhone }),
  ];

  // The three steps restate the practice's own commitments: call, an honest plan, staged care.
  const steps = [
    { id: 'call', badge: t.call.badge, title: t.call.title, text: whenOcoee(t.call.text.withOcoee, t.call.text.orlandoOnly) },
    { id: 'plan', badge: t.plan.badge, title: t.plan.title, text: t.plan.text },
    { id: 'care', badge: t.care.badge, title: t.care.title, text: t.care.text },
  ];

  return <Screen id="how-it-works" labelledBy="steps-title" className={styles.steps}>
    <Highlights items={highlights} label={t.highlights.label} />
    <div className={styles.panel}>
      <div className={styles.intro}>
        <h2 id="steps-title" data-reveal="mask">{t.heading}</h2>
        <div data-reveal="" style={{ '--d': '150ms' } as CSSProperties}><Link href={localePath(lang, routes.newPatients)} className="pill pill-outline pill-large">{t.whatToExpect}</Link></div>
      </div>
      <ol className={styles.list}>
        {steps.map((step, index) => <li key={step.id} className={styles.step} data-reveal="right" style={{ '--i': index } as CSSProperties}>
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
