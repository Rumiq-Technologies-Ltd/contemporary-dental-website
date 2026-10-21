import type { ServiceId } from './serviceIds';
import type { Office } from './site';

// Before-and-after cases for the "What treatment can do" section on the service pages. A case is
// either an illustration (an AI-generated treatment picture, labelled on screen as not a patient
// result) or a real patient photo. Real patient photos may only be added once the signed photo and
// marketing authorization is on file (consentOnFile) and C14 §4.10 is closed, and they must not be
// marked as illustrations. Production shows only illustrations and consented real cases.

export interface BeforeAfterImage {
  /** Path under public/, for example /images/treatment-illustrations/crown-before.jpg. */
  src: string;
  width: number;
  height: number;
}

export interface BeforeAfterCase {
  id: string;
  service: ServiceId;
  /** Set when the treatment is offered at one office only, for example root canal (Orlando). */
  office?: Office['id'];
  /** Initials only, as the patient authorized, for example "J. W.". Empty for an illustration. */
  patient: string;
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  /** The signed photo and marketing authorization is on file for this case. */
  consentOnFile: boolean;
  /** An AI-generated treatment illustration, labelled on screen as not a patient result. */
  isIllustration: boolean;
  /** Shown in the "What treatment can do" section on the home page. */
  onHome: boolean;
  /** Shown on the matching service page. */
  onServicePage: boolean;
  /** An illustration label that replaces the service name (a key in the beforeAfter messages). */
  label?: 'cleaningsWhitening';
}

/** Turns the section on or off. The section renders nothing when no case passes the filter below. */
export const beforeAfterEnabled = true;

const illustrationSize = { width: 760, height: 704 };

// Cropped from the supplied AI-generated illustrations, keeping only the two halves. The mouth close-ups
// show on the homepage only; each service page shows its one face illustration (practice request,
// 21 October 2026). The whitening
// illustration is left out. The practice confirmed on 20 October 2026 that it offers whitening, which
// C04 §2 does not list yet; the cleanings illustration is labelled "Cleanings and whitening".
const cases: readonly BeforeAfterCase[] = [
  {
    id: 'illustration-crown',
    service: 'crowns',
    patient: '',
    before: { src: '/images/treatment-illustrations/crown-before.jpg', ...illustrationSize },
    after: { src: '/images/treatment-illustrations/crown-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
    onHome: true,
    onServicePage: false,
  },
  {
    id: 'illustration-veneers',
    service: 'cosmetic',
    patient: '',
    before: { src: '/images/treatment-illustrations/veneers-before.jpg', ...illustrationSize },
    after: { src: '/images/treatment-illustrations/veneers-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
    onHome: true,
    onServicePage: false,
  },
  {
    id: 'illustration-root-canal',
    service: 'root-canal',
    office: 'orlando',
    patient: '',
    before: { src: '/images/treatment-illustrations/root-canal-before.jpg', ...illustrationSize },
    after: { src: '/images/treatment-illustrations/root-canal-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
    onHome: true,
    onServicePage: false,
  },
  {
    id: 'illustration-alignment',
    service: 'clear-aligners-braces',
    patient: '',
    before: { src: '/images/treatment-illustrations/alignment-before.jpg', ...illustrationSize },
    after: { src: '/images/treatment-illustrations/alignment-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
    onHome: true,
    onServicePage: false,
  },
  {
    id: 'illustration-dental-crowns-service',
    service: 'crowns',
    patient: '',
    before: { src: '/images/services/before-after/crowns-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/crowns-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-emergency-service',
    service: 'emergency',
    patient: '',
    before: { src: '/images/services/before-after/emergency-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/emergency-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-extractions-service',
    service: 'extractions',
    patient: '',
    before: { src: '/images/services/before-after/extractions-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/extractions-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-cleanings-service',
    service: 'cleanings-checkups',
    label: 'cleaningsWhitening',
    patient: '',
    before: { src: '/images/services/before-after/cleanings-checkups-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/cleanings-checkups-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-alignment-service',
    service: 'clear-aligners-braces',
    patient: '',
    before: { src: '/images/services/before-after/clear-aligners-braces-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/clear-aligners-braces-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-implants-service',
    service: 'implants',
    patient: '',
    before: { src: '/images/services/before-after/implants-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/implants-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-restorative-service',
    service: 'restorative',
    patient: '',
    before: { src: '/images/services/before-after/restorative-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/restorative-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-root-canal-service',
    service: 'root-canal',
    patient: '',
    before: { src: '/images/services/before-after/root-canal-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/root-canal-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-cosmetic-service',
    service: 'cosmetic',
    patient: '',
    before: { src: '/images/services/before-after/cosmetic-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/cosmetic-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
  {
    id: 'illustration-dentures-service',
    service: 'dentures',
    patient: '',
    before: { src: '/images/services/before-after/dentures-before.jpg', width: 764, height: 728 },
    after: { src: '/images/services/before-after/dentures-after.jpg', width: 764, height: 728 },
    consentOnFile: false,
    isIllustration: true,
    onHome: false,
    onServicePage: true,
  },
];

/** The cases the section shows: illustrations, and real patient cases that have consent on file. */
export function beforeAfterCases(): readonly BeforeAfterCase[] {
  if (!beforeAfterEnabled) return [];
  return cases.filter(item => item.isIllustration || item.consentOnFile);
}
