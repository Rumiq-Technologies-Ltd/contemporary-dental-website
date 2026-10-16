import type { ServiceId } from './serviceIds';
import type { Office } from './site';

// Before-and-after cases for the "How our treatments look" section on the home page. A case is
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
}

/** Turns the section on or off. The section renders nothing when no case passes the filter below. */
export const beforeAfterEnabled = true;

const illustrationSize = { width: 760, height: 704 };

// Cropped from the supplied AI-generated illustrations, keeping only the two halves. The whitening
// illustration is left out: whitening is not in the service inventory (C04 §2).
const cases: readonly BeforeAfterCase[] = [
  {
    id: 'illustration-crown',
    service: 'crowns',
    patient: '',
    before: { src: '/images/treatment-illustrations/crown-before.jpg', ...illustrationSize },
    after: { src: '/images/treatment-illustrations/crown-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
  },
  {
    id: 'illustration-veneers',
    service: 'cosmetic',
    patient: '',
    before: { src: '/images/treatment-illustrations/veneers-before.jpg', ...illustrationSize },
    after: { src: '/images/treatment-illustrations/veneers-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
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
  },
  {
    id: 'illustration-alignment',
    service: 'clear-aligners-braces',
    patient: '',
    before: { src: '/images/treatment-illustrations/alignment-before.jpg', ...illustrationSize },
    after: { src: '/images/treatment-illustrations/alignment-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
  },
];

/** The cases the section shows: illustrations, and real patient cases that have consent on file. */
export function beforeAfterCases(): readonly BeforeAfterCase[] {
  if (!beforeAfterEnabled) return [];
  return cases.filter(item => item.isIllustration || item.consentOnFile);
}
