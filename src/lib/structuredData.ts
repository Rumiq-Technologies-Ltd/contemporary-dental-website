import { getServices, type Service } from '@/content/services';
import { formatAddress, officeAnchor, offices, routes, site, type Office } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { localeTags, type Locale } from '@/i18n/locales';
import { siteUrl } from '@/lib/siteUrl';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Opening hours per office, mirrored from the content messages. Orlando's monthly
// Saturday changes, so it is not encoded. Keep in step with common.hours.
const openingHours: Record<Office['id'], { days: string[]; opens: string; closes: string }> = {
  orlando: { days: WEEKDAYS, opens: '08:00', closes: '17:00' },
  ocoee: { days: ['Monday'], opens: '09:00', closes: '17:00' },
};

function dentist(office: Office, lang: Locale): Record<string, unknown> {
  const hours = openingHours[office.id];
  return {
    '@type': 'Dentist',
    '@id': `${siteUrl}${officeAnchor(office)}`,
    name: site.name,
    url: `${siteUrl}${officeAnchor(office)}`,
    telephone: `+1-${office.phone}`,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.street,
      addressLocality: office.locality.split(',')[0],
      addressRegion: 'FL',
      postalCode: office.postalCode,
      addressCountry: 'US',
    },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: hours.days, opens: hours.opens, closes: hours.closes }],
    inLanguage: localeTags[lang],
    description: `${site.name}, ${formatAddress(office)}.`,
  };
}

/** Organization plus one Dentist entry per active office (Ocoee follows the Ocoee hold). */
export function practiceStructuredData(lang: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: site.name,
        legalName: 'Pearl Valley Dental Inc.',
        url: siteUrl,
        email: site.email,
        founder: { '@type': 'Person', name: 'Dr. Sheryar Khan', jobTitle: 'General Dentist' },
        foundingDate: '2023',
        knowsLanguage: ['English', 'Spanish', 'Portuguese'],
        areaServed: offices.map(office => ({ '@type': 'City', name: office.locality.split(',')[0] })),
        // A list of services without prices: the content file holds every offer and price.
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Dental services',
          itemListElement: getServices(lang).map(service => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: service.title, description: service.description, url: `${siteUrl}${service.href}` },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: site.name,
        url: siteUrl,
        inLanguage: localeTags[lang],
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      ...offices.map(office => dentist(office, lang)),
    ],
  };
}

/** One service page: the service itself, provided by the practice, and its breadcrumb trail. */
export function serviceStructuredData(service: Service, lang: Locale): Record<string, unknown> {
  const url = `${siteUrl}${service.href}`;
  const { breadcrumb } = getMessages(lang).common;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.heading,
        description: service.description,
        url,
        serviceType: service.title,
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: offices.map(office => ({ '@type': 'City', name: office.locality.split(',')[0] })),
        inLanguage: localeTags[lang],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: breadcrumb.home, item: siteUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumb.services, item: `${siteUrl}${routes.services}` },
          { '@type': 'ListItem', position: 3, name: service.heading, item: url },
        ],
      },
    ],
  };
}
