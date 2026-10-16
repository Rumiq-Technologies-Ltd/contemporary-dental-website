import Link from 'next/link';
import { photos } from '@/content/assets';
import { getServices } from '@/content/services';
import type { ServiceId } from '@/content/serviceIds';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { ProblemTabs, type Problem } from './ProblemTabs';
import styles from './problems.module.css';

interface ProblemText {
  tab: string;
  headline: string;
  big: string;
  /** Left out for problems whose panel needs no second line. */
  bigText?: string;
  /** Panel text for problems that need more than the service description. */
  text?: string;
  linkLabel: string;
}

export async function Problems() {
  const lang = await getLocale();
  const { home } = getMessages(lang);
  const t = home.problems;
  const services = getServices(lang);

  // Each tab starts from a patient's problem and answers with a service. The description
  // comes from the content file; nothing here adds a claim.
  function problem(id: ServiceId, text: ProblemText, photo: Problem['photo']): Problem {
    const service = services.find(item => item.id === id);
    if (!service) throw new Error(`Unknown service: ${id}`);
    return {
      id, tab: text.tab, headline: text.headline, big: text.big, bigText: text.bigText, photo,
      text: text.text ?? service.description, href: localePath(lang, service.href), linkLabel: text.linkLabel,
    };
  }

  const problems: readonly Problem[] = [
    problem('emergency', t.items.emergency, photos.guides),
    problem('implants', t.items.implants, photos.toothModel),
    problem('clear-aligners-braces', t.items.alignersBraces, photos.clearAligner),
    problem('cleanings-checkups', t.items.checkups, photos.assessment),
    problem('cosmetic', t.items.cosmetic, photos.smile),
  ];

  return <Screen id="treatments" labelledBy="treatments-title" className={styles.problems}>
    <div className={styles.heading}>
      <h2 id="treatments-title" data-reveal="mask">{t.heading}</h2>
      <div data-reveal=""><Link href={localePath(lang, routes.services)} className="pill pill-outline pill-large">{t.allServices}</Link></div>
    </div>
    <ProblemTabs problems={problems} label={t.label} />
  </Screen>;
}
