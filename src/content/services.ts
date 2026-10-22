import type { PhotoName } from './assets';
import type { ServiceId } from './serviceIds';
import { routes, whenOcoee } from './site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import type { Locale } from '@/i18n/locales';
import type { ServiceCopy } from '@/i18n/messages/services';

export type { ServiceId } from './serviceIds';

export interface Service {
  id: ServiceId;
  /** Card label and homepage list entry. */
  title: string;
  /** Page heading (h1). */
  heading: string;
  /** Sub-header under the heading, where the practice supplied one. */
  lead?: string;
  /** Title tag, without the site suffix. */
  titleTag: string;
  /** Short line used in the homepage "What we treat" list. */
  summary: string;
  /** The full homepage list entry ("Title: summary"), written per language in the messages. */
  listLabel: string;
  /** English path. Pass it through localePath(lang, service.href) for a link. */
  href: string;
  /** Photo beside the copy on the service page. A page without one shows its copy full width. */
  image?: PhotoName;
  /** CSS object-position for the photo's crop, when the subject is off centre. */
  imagePosition?: string;
  /** Card photo for the services grid. */
  thumbnail: PhotoName;
  description: string;
  paragraphs: readonly string[];
  /** A closing note, shown in italics after the paragraphs. */
  note?: string;
}

/** What stays the same in every language: the code, the route and the photo. */
interface ServiceDefinition {
  id: ServiceId;
  href: string;
  image?: PhotoName;
  imagePosition?: string;
  thumbnail: PhotoName;
}

// Content is data, not component markup: additions need no card-layout changes. The copy
// for each service lives in src/i18n/messages/services.ts.
// Held items from the content file (same-day crowns, implant offer, All-on-4,
// partial dentures, orthobrain wording, trademarked product names) are left out on purpose.
const definitions: readonly ServiceDefinition[] = [
  { id: 'cleanings-checkups', href: `${routes.services}/cleanings-checkups`, image: 'cleaningsPatient', thumbnail: 'thumbCleanings' },
  { id: 'emergency', href: routes.emergency, image: 'emergencyPatient', thumbnail: 'thumbEmergency' },
  { id: 'extractions', href: `${routes.services}/extractions`, image: 'extractionsPatient', imagePosition: '30% 50%', thumbnail: 'thumbExtractions' },
  { id: 'restorative', href: `${routes.services}/restorative`, image: 'restorativePatient', imagePosition: '72% 50%', thumbnail: 'thumbRestorative' },
  { id: 'crowns', href: `${routes.services}/crowns`, image: 'crownsPatient', thumbnail: 'thumbCrowns' },
  { id: 'root-canal', href: `${routes.services}/root-canal`, image: 'rootCanalPatient', thumbnail: 'thumbRootCanal' },
  { id: 'implants', href: `${routes.services}/implants`, image: 'implantsPatient', thumbnail: 'thumbImplants' },
  { id: 'dentures', href: `${routes.services}/dentures`, image: 'denturesPatient', thumbnail: 'thumbDentures' },
  { id: 'clear-aligners-braces', href: `${routes.services}/clear-aligners-braces`, image: 'alignersPatient', thumbnail: 'thumbAligners' },
  { id: 'cosmetic', href: `${routes.services}/cosmetic`, image: 'cosmeticPatient', thumbnail: 'thumbCosmetic' },
];

/** Picks the Ocoee or Orlando-only paragraphs where a service has both forms. */
function pickParagraphs(paragraphs: ServiceCopy['paragraphs']): readonly string[] {
  return 'withOcoee' in paragraphs ? whenOcoee(paragraphs.withOcoee, paragraphs.orlandoOnly) : paragraphs;
}

/** Every service in one language, with the Ocoee wording chosen. Emergency has its own route. */
export function getServices(lang: Locale): readonly Service[] {
  const t = getMessages(lang).services;
  const atOffices = whenOcoee(t.atOffices.withOcoee, t.atOffices.orlandoOnly);
  return definitions.map(({ id, href, image, imagePosition, thumbnail }) => {
    const copy = t.items[id];
    const paragraphs = pickParagraphs(copy.paragraphs).map(paragraph => fill(paragraph, { atOffices }));
    return {
      id, href, image, imagePosition, thumbnail, paragraphs,
      title: copy.title,
      heading: copy.heading,
      lead: copy.lead,
      note: copy.note,
      titleTag: copy.titleTag,
      summary: copy.summary,
      listLabel: copy.listLabel,
      description: copy.description,
    };
  });
}

/** Services that have a /services/[slug] page (emergency has its own route). */
export function getServicePages(lang: Locale): readonly Service[] {
  return getServices(lang).filter(service => service.id !== 'emergency');
}

export function findService(lang: Locale, id: string): Service | undefined {
  return getServicePages(lang).find(service => service.id === id);
}
