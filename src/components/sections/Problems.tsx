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
  /** Panel text as separate lines, for a problem with more than one answer. */
  lines?: readonly string[];
  linkLabel: string;
}

/** A further service the panel links to, shown as another button after the main one. */
interface ExtraLink {
  id: ServiceId;
  label: string;
}

export async function Problems() {
  const lang = await getLocale();
  const { home } = getMessages(lang);
  const t = home.problems;
  const services = getServices(lang);

  // Each tab starts from a patient's problem and answers with a service. The description
  // comes from the content file; nothing here adds a claim.
  function findService(id: ServiceId) {
    const service = services.find(item => item.id === id);
    if (!service) throw new Error(`Unknown service: ${id}`);
    return service;
  }

  // In these photos the faces fill the top, so the headline sits at the bottom (practice request, 21 October 2026).
  const titlePlacements: Partial<Record<ServiceId, Problem['titlePlacement']>> = { 'cleanings-checkups': 'bottom', cosmetic: 'bottomNarrow' };

  function problem(id: ServiceId, text: ProblemText, photo: Problem['photo'], extraLinks: readonly ExtraLink[] = []): Problem {
    const service = findService(id);
    return {
      id, tab: text.tab, headline: text.headline, big: text.big, bigText: text.bigText, photo,
      titlePlacement: titlePlacements[id] ?? 'top',
      lines: text.lines ?? [text.text ?? service.description],
      links: [
        { href: localePath(lang, service.href), label: text.linkLabel },
        ...extraLinks.map(link => ({ href: localePath(lang, findService(link.id).href), label: link.label })),
      ],
    };
  }

  const problems: readonly Problem[] = [
    problem('emergency', t.items.emergency, photos.toothPain),
    // Missing teeth has two answers, so it links to both the implants and the dentures pages.
    problem('implants', t.items.implants, photos.toothModel, [{ id: 'dentures', label: t.items.implants.dentureLinkLabel }]),
    problem('clear-aligners-braces', t.items.alignersBraces, photos.clearAligner),
    problem('cleanings-checkups', t.items.checkups, photos.checkUp),
    problem('cosmetic', t.items.cosmetic, photos.smileMakeover),
  ];

  return <Screen id="treatments" labelledBy="treatments-title" className={styles.problems}>
    <div className={styles.heading}>
      <h2 id="treatments-title" data-reveal="mask">{t.heading}</h2>
      <div data-reveal=""><Link href={localePath(lang, routes.services)} className="pill pill-outline pill-large">{t.allServices}</Link></div>
    </div>
    <ProblemTabs problems={problems} label={t.label} />
  </Screen>;
}
