// Single source of truth for practice facts. Page copy lives in src/i18n/messages and reads
// from here, so a fact changes in one place. Facts that are not translated (names, addresses,
// phone numbers, routes) stay in English in every language.

export interface Office {
  id: 'orlando' | 'ocoee';
  name: string;
  street: string;
  locality: string;
  postalCode: string;
  phone: string;
  phoneHref: string;
}

/**
 * Ocoee. Enabled at the owner's request on 14 October 2026. The content file asks for
 * the Monday hours to be checked against Curve first, because Ocoee's operating days
 * fell from 74 a quarter to 11. false returns the Orlando-only wording everywhere.
 */
export const ocoeeEnabled = true;

/**
 * HOLD: the website request form waits for the C15 decision on form data
 * handling. Until then the contact page asks visitors to call.
 */
export const appointmentFormEnabled = false;

export const site = {
  name: 'Contemporary Dental Care',
  legalName: 'Pearl Valley Dental Inc., doing business as Contemporary Dental Care',
  email: 'info@contemporarydentalcare.com',
  afterHoursPhone: '407-625-5440',
  afterHoursHref: 'tel:+14076255440',
  /** The year in the footer's copyright line. */
  copyrightYear: 2026,
} as const;

const orlando: Office = {
  id: 'orlando',
  name: 'Orlando',
  street: '5330 S John Young Pkwy',
  locality: 'Orlando, FL',
  postalCode: '32839',
  phone: '321-522-8577',
  phoneHref: 'tel:+13215228577',
};

const ocoee: Office = {
  id: 'ocoee',
  name: 'Ocoee',
  street: '2910 Maguire Rd, Suite 1005',
  locality: 'Ocoee, FL',
  postalCode: '34761',
  phone: '689-407-3015',
  phoneHref: 'tel:+16894073015',
};

export const offices: readonly Office[] = ocoeeEnabled ? [orlando, ocoee] : [orlando];
export const primaryOffice = orlando;

export function formatAddress(office: Office): string {
  return `${office.street}, ${office.locality} ${office.postalCode}`;
}

/** Where an office's details are on the contact page. */
export function officeAnchor(office: Office): string {
  return `${routes.contact}#${office.id}`;
}

/** An office's own page, for example /locations/ocoee, where ads for that area can land. */
export function officePath(office: Office): string {
  return `/locations/${office.id}`;
}

/** Google Maps directions to an office. A plain link, so the page loads no map or third-party frame. */
export function directionsHref(office: Office): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatAddress(office))}`;
}

/** Map of an office for an embedded frame. The frame loads only after the visitor asks for the map. */
export function mapEmbedHref(office: Office): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(formatAddress(office))}&output=embed`;
}

/** Orlando-only alternatives swap in here when Ocoee is paused. */
export function whenOcoee<T>(withOcoee: T, withoutOcoee: T): T {
  return ocoeeEnabled ? withOcoee : withoutOcoee;
}

/** Paths are English and unprefixed. Use localePath() to link to another language. */
export const routes = {
  home: '/',
  requestAppointment: '/contact#request-appointment',
  contact: '/contact',
  emergency: '/emergency',
  services: '/services',
  newPatients: '/new-patients',
  insurance: '/insurance',
  membership: '/membership',
  pricing: '/pricing',
  about: '/about',
  doctor: '/about/dr-sheryar-khan',
  technology: '/technology',
  faq: '/faq',
  privacy: '/privacy',
  noticeOfPrivacyPractices: '/privacy/notice-of-privacy-practices',
  terms: '/terms',
  accessibility: '/accessibility',
  reviews: '/reviews',
  comingSoon: '/coming-soon',
} as const;

/**
 * Main navigation. Labels come from messages.common.nav[key]; numbers are fixed. An entry with
 * officeLinks opens a dropdown with one link per office page.
 */
export const navigation = [
  { key: 'services', href: routes.services, number: '01' },
  { key: 'emergency', href: routes.emergency, number: '02' },
  { key: 'newPatients', href: routes.newPatients, number: '03' },
  { key: 'insurance', href: routes.insurance, number: '04' },
  { key: 'club', href: routes.membership, number: '05' },
  { key: 'about', href: routes.about, number: '06' },
  { key: 'contact', href: routes.contact, number: '07', officeLinks: true },
] as const;

/** Legal pages are English only, so these links always point at the English URLs. */
export const legalLinks = [
  { key: 'privacyPolicy', href: routes.privacy },
  { key: 'termsOfUse', href: routes.terms },
  { key: 'noticeOfPrivacyPractices', href: routes.noticeOfPrivacyPractices },
  { key: 'accessibilityStatement', href: routes.accessibility },
] as const;
