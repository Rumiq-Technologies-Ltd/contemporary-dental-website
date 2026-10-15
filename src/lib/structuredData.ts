import { services, type Service } from '@/content/services';
import { formatAddress, offices, routes, site, type Office } from '@/content/site';
import { siteUrl } from '@/lib/siteUrl';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Opening hours per office, mirrored from the content file. Orlando's monthly
// Saturday changes, so it is not encoded. Keep in step with Office.hours.
const openingHours: Record<Office['id'], { days: string[]; opens: string; closes: string }> = {
  orlando: { days: WEEKDAYS, opens: '08:00', closes: '17:00' },
  ocoee: { days: ['Monday'], opens: '09:00', closes: '17:00' },
};

function dentist(office: Office): Record<string, unknown> {
  const hours = openingHours[office.id];
  return {
    '@type': 'Dentist',
    '@id': `${siteUrl}${office.path}#dentist`,
    name: site.name,
    url: `${siteUrl}${office.path}`,
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
    description: `${site.name}, ${formatAddress(office)}.`,
  };
}

/** Organization plus one Dentist entry per active office (Ocoee follows the Ocoee hold). */
export function practiceStructuredData(): Record<string, unknown> {
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
          itemListElement: services.map(service => ({
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
        inLanguage: 'en-US',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      ...offices.map(dentist),
    ],
  };
}

/** One service page: the service itself, provided by the practice, and its breadcrumb trail. */
export function serviceStructuredData(service: Service): Record<string, unknown> {
  const url = `${siteUrl}${service.href}`;
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
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}${routes.services}` },
          { '@type': 'ListItem', position: 3, name: service.heading, item: url },
        ],
      },
    ],
  };
}
