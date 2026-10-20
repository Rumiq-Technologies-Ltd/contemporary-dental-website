import Link from 'next/link';
import type { CSSProperties } from 'react';
import { routes, site, whenOcoee } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { Icon, type IconName } from '@/components/ui/Icon';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { languageHref } from '@/i18n/languageHref';
import { getLocale } from '@/i18n/server';
import { Highlights } from './Highlights';
import styles from './steps.module.css';

// One icon per card, in the order the cards appear in the copy.
const cardIcons: readonly IconName[] = ['addPerson', 'cross', 'shield', 'globe', 'heartCare', 'family'];

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

  // Only the new-patients body names both offices, so it is the only card with an Orlando-only form.
  const cards = t.cards.map((card, index) => ({
    title: card.title,
    subtitle: card.subtitle,
    text: typeof card.text === 'string' ? card.text : whenOcoee(card.text.withOcoee, card.text.orlandoOnly),
    lines: card.lines ?? [],
    icon: cardIcons[index],
  }));

  return <Screen id="how-it-works" labelledBy="steps-title" className={styles.steps}>
    <Highlights items={highlights} label={t.highlights.label} />
    <div className={styles.panel}>
      <div className={styles.intro}>
        <h2 id="steps-title" data-reveal="mask">{t.heading}</h2>
      </div>
      <ul className={styles.cards} data-stagger="">
        {cards.map((card, index) => <li key={card.title} style={{ '--i': index } as CSSProperties}>
          <article className={styles.card} data-reveal="" data-tilt="9">
            <span className={styles.number} aria-hidden="true">{index + 1}</span>
            <span className={styles.iconWrap}><Icon name={card.icon} /></span>
            <h3>{card.title}</h3>
            <span className={styles.subhead}>{card.subtitle}</span>
            <p>{card.text}</p>
            {card.lines.length > 0 && <div className={styles.lines}>
              {card.lines.map(line => <Link key={line.locale} href={languageHref(line.locale, lang, routes.home)}>{line.label}</Link>)}
            </div>}
          </article>
        </li>)}
      </ul>
    </div>
  </Screen>;
}
