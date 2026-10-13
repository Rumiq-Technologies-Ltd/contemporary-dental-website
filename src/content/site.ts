// Single source of truth for practice facts. Page copy lives in the other
// src/content modules and reads from here, so a fact changes in one place.

export interface Office {
  id: 'orlando' | 'ocoee';
  name: string;
  street: string;
  locality: string;
  postalCode: string;
  phone: string;
  phoneHref: string;
  hours: string;
  path: string;
}

/**
 * HOLD: Ocoee. Its operating days fell from 74 a quarter to 11, and the content
 * file holds every Ocoee reference until the practice records a decision.
 * false = the Orlando-only wording; true = both offices. Nothing else changes.
 */
export const ocoeeEnabled = false;

/**
 * HOLD: the website request form waits for the C15 decision on form data
 * handling. Until then the contact page asks visitors to call.
 */
export const appointmentFormEnabled = false;

export const site = {
  name: 'Contemporary Dental Care',
  legalName: 'Pearl Valley Dental Inc., doing business as Contemporary Dental Care',
  tagline: 'Your smile. Your health. Our priority.',
  email: 'info@contemporarydentalcare.com',
  afterHoursPhone: '407-625-5440',
  afterHoursHref: 'tel:+14076255440',
} as const;

const orlando: Office = {
  id: 'orlando',
  name: 'Orlando',
  street: '5330 S John Young Pkwy',
  locality: 'Orlando, FL',
  postalCode: '32839',
  phone: '321-522-8577',
  phoneHref: 'tel:+13215228577',
  hours: 'Monday to Friday, 8:00am to 5:00pm',
  path: '/locations/orlando',
};

const ocoee: Office = {
  id: 'ocoee',
  name: 'Ocoee',
  street: '2910 Maguire Rd, Suite 1005',
  locality: 'Ocoee, FL',
  postalCode: '34761',
  phone: '689-407-3015',
  phoneHref: 'tel:+16894073015',
  hours: 'Monday, 9:00am to 5:00pm',
  path: '/locations/ocoee',
};

export const offices: readonly Office[] = ocoeeEnabled ? [orlando, ocoee] : [orlando];
export const primaryOffice = orlando;

export function formatAddress(office: Office): string {
  return `${office.street}, ${office.locality} ${office.postalCode}`;
}

/** Orlando-only alternatives swap in here when Ocoee is paused. */
export function whenOcoee<T>(withOcoee: T, withoutOcoee: T): T {
  return ocoeeEnabled ? withOcoee : withoutOcoee;
}

export const routes = {
  home: '/',
  requestAppointment: '/contact#request-appointment',
  contact: '/contact',
  emergency: '/emergency',
  services: '/services',
  locations: '/locations',
  newPatients: '/new-patients',
  insurance: '/insurance',
  payment: '/payment-financing',
  pricing: '/pricing',
  about: '/about',
  doctor: '/about/dr-sheryar-khan',
  team: '/about/team',
  technology: '/technology',
  faq: '/faq',
  privacy: '/privacy',
  noticeOfPrivacyPractices: '/privacy/notice-of-privacy-practices',
  terms: '/terms',
  accessibility: '/accessibility',
} as const;

export const navigation = [
  { label: 'Services', href: routes.services, number: '01' },
  { label: 'Emergency', href: routes.emergency, number: '02' },
  { label: 'Locations', href: routes.locations, number: '03' },
  { label: 'New patients', href: routes.newPatients, number: '04' },
  { label: 'Insurance and payment', href: routes.insurance, number: '05' },
  { label: 'About', href: routes.about, number: '06' },
  { label: 'Contact', href: routes.contact, number: '07' },
] as const;

export const legalLinks = [
  { label: 'Privacy policy', href: routes.privacy },
  { label: 'Terms of use', href: routes.terms },
  { label: 'Notice of Privacy Practices', href: routes.noticeOfPrivacyPractices },
  { label: 'Accessibility statement', href: routes.accessibility },
] as const;
