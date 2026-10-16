import { getFaqs } from '@/content/faq';
import { getServices } from '@/content/services';
import { formatAddress, officeAnchor, offices, routes, site, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { defaultLocale } from '@/i18n/locales';
import { siteUrl } from '@/lib/siteUrl';

// llms.txt (llmstxt.org): a plain Markdown summary that AI assistants and answer engines can
// read and cite. It is English only, because the English pages are the reference version.
// Every line comes from the content files, so it stays in step with the pages and follows
// the same holds (Ocoee switch, no offers, no prices).
export const dynamic = 'force-static';

const english = getMessages(defaultLocale);

const url = (path: string) => `${siteUrl}${path === '/' ? '' : path}`;

export function GET(): Response {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${whenOcoee(
      'General dental practice in Orlando and Ocoee, Florida, founded in 2023 by Dr. Sheryar Khan, a general dentist. Routine care, emergency visits, implants, cosmetic treatment and clear aligners. Members of the team speak English, Spanish and Portuguese.',
      'General dental practice in Orlando, Florida, founded in 2023 by Dr. Sheryar Khan, a general dentist. Routine care, emergency visits, implants, cosmetic treatment and clear aligners. Members of the team speak English, Spanish and Portuguese.',
    )}`,
    '',
    'Appointments are booked by phone. New patients are welcome, and emergency visits are open to new patients.',
    '',
    '## Offices',
    '',
    ...offices.map(office => `- [${office.name} office](${url(officeAnchor(office))}):${formatAddress(office)}. Phone ${office.phone}. Hours: ${english.common.hours[office.id]}.`),
    `- After-hours line: ${site.afterHoursPhone}`,
    `- Email: ${site.email}`,
    '',
    '## Services',
    '',
    ...getServices(defaultLocale).map(service => `- [${service.title}](${url(service.href)}): ${service.description}`),
    '',
    '## Key pages',
    '',
    `- [New patients](${url(routes.newPatients)})`,
    `- [Insurance](${url(routes.insurance)})`,
    `- [About Dr. Khan](${url(routes.doctor)})`,
    `- [Our team](${url(routes.team)})`,
    `- [Contact](${url(routes.contact)})`,
    `- [Frequently asked questions](${url(routes.faq)})`,
    '',
    '## Frequently asked questions',
    '',
    ...getFaqs(defaultLocale).flatMap(item => [`### ${item.question}`, '', item.answer, '']),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
