import { formatAddress, offices, site, type Office } from '@/content/site';
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
      },
      ...offices.map(dentist),
    ],
  };
}
