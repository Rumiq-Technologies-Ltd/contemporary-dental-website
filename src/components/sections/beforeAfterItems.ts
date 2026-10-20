import type { BeforeAfterCase } from '@/content/beforeAfter';
import { getServices } from '@/content/services';
import { offices } from '@/content/site';
import type { Locale } from '@/i18n/locales';
import type { HomeMessages } from '@/i18n/messages/home';
import type { CardLabels, CarouselCase } from './BeforeAfterCard';

type BeforeAfterText = HomeMessages['beforeAfter'];

/** Turns the cases from content/beforeAfter.ts into the cards that the carousel and the grid show. */
export function toCarouselCases(cases: readonly BeforeAfterCase[], lang: Locale, t: BeforeAfterText): CarouselCase[] {
  const services = getServices(lang);
  return cases.map(item => {
    const service = services.find(candidate => candidate.id === item.service);
    if (!service) throw new Error(`Unknown service: ${item.service}`);
    const office = offices.find(candidate => candidate.id === item.office);
    const title = item.label ? t[item.label] : service.title;
    // An illustration is named by its treatment; a real case by the patient's initials.
    const name = item.isIllustration ? title : item.patient;
    const detail = item.isIllustration
      ? (office?.name ?? '')
      : (office ? `${title} · ${office.name}` : title);
    return {
      id: item.id,
      patient: name,
      detail,
      illustration: item.isIllustration,
      before: { src: item.before.src, width: item.before.width, height: item.before.height, alt: `${t.before}: ${title}` },
      after: { src: item.after.src, width: item.after.width, height: item.after.height, alt: `${t.after}: ${title}` },
    };
  });
}

export function cardLabels(t: BeforeAfterText): CardLabels {
  return { before: t.before, after: t.after, compare: t.compare, illustration: t.illustration };
}
