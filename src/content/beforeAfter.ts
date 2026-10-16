import type { ServiceId } from './serviceIds';
import type { Office } from './site';

// Before-and-after cases for the "Patient results" section. C14 §4.10 holds this material until
// authorization, permitted channels, revocation handling and a no-manipulation rule are in place,
// so production shows nothing until each case is marked consentOnFile and the section is enabled.
// Illustrations are never patient results and never reach production.

export interface BeforeAfterImage {
  /** Path under public/, for example /images/before-after/case.jpg. */
  src: string;
  width: number;
  height: number;
}

export interface BeforeAfterCase {
  id: string;
  service: ServiceId;
  /** Set when the treatment is offered at one office only, for example root canal (Orlando). */
  office?: Office['id'];
  /** Initials only, as the patient authorized, for example "J. W.". */
  patient: string;
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  /** The signed photo and marketing authorization is on file for this case. */
  consentOnFile: boolean;
  /** AI-generated illustrations are labelled on screen and kept out of production. */
  isIllustration: boolean;
}

/** HOLD: flip to true only after C14 §4.10 is closed and counsel has reviewed the section copy. */
export const beforeAfterEnabled = false;

/** Real patient cases go here once consent is recorded. Empty until then. */
const publishedCases: readonly BeforeAfterCase[] = [];

const illustrationSize = { width: 760, height: 704 };

/**
 * Local preview only: the AI-generated illustrations supplied for design review. Each is one
 * treatment, and the whitening illustration is left out because whitening is not in the service
 * inventory (C04 §2). They are shown only in development builds.
 */
const previewCases: readonly BeforeAfterCase[] = [
  {
    id: 'preview-crown',
    service: 'crowns',
    patient: 'Illustration',
    before: { src: '/images/before-after/preview/crown-before.jpg', ...illustrationSize },
    after: { src: '/images/before-after/preview/crown-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
  },
  {
    id: 'preview-veneers',
    service: 'cosmetic',
    patient: 'Illustration',
    before: { src: '/images/before-after/preview/veneers-before.jpg', ...illustrationSize },
    after: { src: '/images/before-after/preview/veneers-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
  },
  {
    id: 'preview-root-canal',
    service: 'root-canal',
    office: 'orlando',
    patient: 'Illustration',
    before: { src: '/images/before-after/preview/root-canal-before.jpg', ...illustrationSize },
    after: { src: '/images/before-after/preview/root-canal-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
  },
  {
    id: 'preview-alignment',
    service: 'clear-aligners-braces',
    patient: 'Illustration',
    before: { src: '/images/before-after/preview/alignment-before.jpg', ...illustrationSize },
    after: { src: '/images/before-after/preview/alignment-after.jpg', ...illustrationSize },
    consentOnFile: false,
    isIllustration: true,
  },
];

/**
 * The cases the section may show. Development builds show the illustrations so the design can be
 * reviewed. Production shows only real cases with consent on file, and only when enabled.
 */
export function beforeAfterCases(): readonly BeforeAfterCase[] {
  if (process.env.NODE_ENV !== 'production') return previewCases;
  if (!beforeAfterEnabled) return [];
  return publishedCases.filter(item => item.consentOnFile && !item.isIllustration);
}
