import type { PhotoName } from './assets';
import { routes, whenOcoee } from './site';

export type ServiceId =
  | 'cleanings-checkups' | 'emergency' | 'extractions' | 'restorative' | 'crowns'
  | 'root-canal' | 'implants' | 'dentures' | 'clear-aligners-braces' | 'cosmetic';

export interface Service {
  id: ServiceId;
  /** Card label and homepage list entry. */
  title: string;
  /** Page heading (h1) and title tag, as written in the content file. */
  heading: string;
  titleTag: string;
  /** Short line used in the homepage "What we treat" list. */
  summary: string;
  href: string;
  /** Card photo and height (px on the 1440px Figma artboard) for the gallery. */
  image: PhotoName;
  height: number;
  column: 'a' | 'b';
  description: string;
  paragraphs: readonly string[];
}

const bothOffices = whenOcoee('both offices', 'our Orlando office');

// Content is data, not component markup: additions need no card-layout changes.
// Held items from the content file (same-day crowns, implant offer, All-on-4,
// partial dentures, orthobrain wording, trademarked product names) are left out on purpose.
export const services: readonly Service[] = [
  {
    id: 'cleanings-checkups', title: 'Cleanings and check-ups', heading: 'Cleanings and check-ups', titleTag: 'Cleanings and Check-Ups', summary: 'routine preventive care',
    href: `${routes.services}/cleanings-checkups`, image: 'xrayTeamLandscape', height: 355, column: 'a',
    description: 'Regular cleanings and check-ups every six months help us catch problems early.',
    paragraphs: [
      `Regular cleanings and check-ups every six months help us catch problems early. X-rays are taken when Dr. Khan decides they're needed. Our hygienist, Jessica Salazar, provides cleanings at ${bothOffices}.`,
    ],
  },
  {
    id: 'emergency', title: 'Emergency care', heading: 'Emergency dental care', titleTag: 'Emergency Dental Care', summary: 'urgent treatment for pain, swelling and broken teeth',
    href: routes.emergency, image: 'guides', height: 350, column: 'b',
    description: 'Urgent treatment for pain, swelling and broken teeth. Emergency visits are open to new patients.',
    paragraphs: [],
  },
  {
    id: 'extractions', title: 'Tooth extractions', heading: 'Tooth extractions', titleTag: 'Tooth Extractions', summary: 'including same-day when suitable',
    href: `${routes.services}/extractions`, image: 'appointments', height: 220, column: 'a',
    description: 'Extraction may be the right option when a tooth cannot be saved. Same-day extraction is subject to clinical suitability and availability.',
    paragraphs: [
      'When a tooth cannot be saved, extraction may be the right option. Extractions are one of our same-day services, subject to clinical suitability and availability. Dr. Khan explains your options before any treatment starts. Some oral surgery is referred to another provider.',
    ],
  },
  {
    id: 'restorative', title: 'Fillings and restorative care', heading: 'Fillings and restorative care', titleTag: 'Fillings and Restorative Care', summary: '',
    href: `${routes.services}/restorative`, image: 'roomTeal', height: 343, column: 'b',
    description: 'Fillings and other restorative treatment repair teeth damaged by decay, cracks or breakage.',
    paragraphs: [
      `Fillings and other restorative treatment repair teeth damaged by decay, cracks or breakage. Available at ${bothOffices}.`,
    ],
  },
  {
    id: 'crowns', title: 'Crowns', heading: 'Dental crowns', titleTag: 'Dental Crowns', summary: '',
    href: `${routes.services}/crowns`, image: 'assessment', height: 358, column: 'a',
    description: 'A crown covers and protects a damaged or weakened tooth. Crowns need a dental laboratory case.',
    paragraphs: [
      'A crown covers and protects a damaged or weakened tooth. Crowns need a dental laboratory case, so they are not completed on the same day. Crown preparation can begin at an emergency visit, and Dr. Khan will explain the steps that follow.',
    ],
  },
  {
    id: 'root-canal', title: 'Root canal treatment', heading: 'Root canal treatment', titleTag: 'Root Canal Treatment', summary: '(Orlando)',
    href: `${routes.services}/root-canal`, image: 'teethModel', height: 173, column: 'b',
    description: 'Root canal treatment is performed at our Orlando office.',
    paragraphs: [
      whenOcoee(
        'Root canal treatment is performed at our Orlando office. If you are an Ocoee patient who needs root canal treatment, we will schedule you at Orlando. Root canal retreatment is referred to another provider.',
        'Root canal treatment is performed at our Orlando office. Root canal retreatment is referred to another provider.',
      ),
    ],
  },
  {
    id: 'implants', title: 'Dental implants', heading: 'Dental implants', titleTag: 'Dental Implants', summary: '',
    href: `${routes.services}/implants`, image: 'toothModel', height: 350, column: 'a',
    description: 'An implant replaces a missing tooth root and supports a crown or another replacement tooth.',
    paragraphs: [
      'An implant replaces a missing tooth root and supports a crown or another replacement tooth. Implant placement can be done the same day, subject to clinical suitability and availability. Dr. Khan plans treatment with you in clear stages, and implants are a particular focus of his care.',
    ],
  },
  {
    id: 'dentures', title: 'Dentures', heading: 'Dentures', titleTag: 'Dentures', summary: '',
    href: `${routes.services}/dentures`, image: 'roomCream', height: 330, column: 'b',
    description: 'Dentures replace missing teeth. Dr. Khan will walk you through the options and the process.',
    paragraphs: [
      `Dentures replace missing teeth and are available at ${bothOffices}. Dr. Khan will walk you through the options and the process at your visit.`,
    ],
  },
  {
    id: 'clear-aligners-braces', title: 'Clear aligners and braces', heading: 'Clear aligners and braces', titleTag: 'Clear Aligners and Braces', summary: '',
    href: `${routes.services}/clear-aligners-braces`, image: 'clearAligner', height: 300, column: 'a',
    description: 'Dr. Khan provides clear aligners and traditional braces. He is a general dentist and your treating dentist.',
    paragraphs: [
      `Dr. Khan provides clear aligners and traditional braces at ${bothOffices}. Most of our orthodontic cases are traditional braces. Dr. Khan, a general dentist, is your treating dentist.`,
    ],
  },
  {
    id: 'cosmetic', title: 'Cosmetic dentistry', heading: 'Cosmetic dentistry', titleTag: 'Cosmetic Dentistry', summary: '',
    href: `${routes.services}/cosmetic`, image: 'smile', height: 320, column: 'b',
    description: 'Veneers, smile design and other cosmetic treatment, planned around your goals and your oral health.',
    paragraphs: [
      'Veneers, smile design and other cosmetic treatment, planned around your goals and your oral health. Cosmetic treatment can be paid for through our financing partners, subject to approval.',
    ],
  },
];

/** Services that have a /services/[slug] page (emergency has its own route). */
export const servicePages = services.filter(service => service.id !== 'emergency');

export function findService(id: string): Service | undefined {
  return servicePages.find(service => service.id === id);
}

/** The homepage list reads "Title: summary" for items that have a summary. */
export function listLabel(service: Service): string {
  if (!service.summary) return service.title;
  if (service.summary.startsWith('(')) return `${service.title} ${service.summary}`;
  return service.summary.startsWith('including') ? `${service.title}, ${service.summary}` : `${service.title}: ${service.summary}`;
}
