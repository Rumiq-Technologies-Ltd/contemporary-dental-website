import { site } from '@/content/site';
import { siteUrl } from '@/lib/siteUrl';

// RFC 9116 security.txt: where to report a security problem with this website. Built once
// at build time; "Expires" is a year after the build, so each deployment renews it.
// CONFIRM: the practice's general inbox is the contact until a dedicated address is chosen.
export const dynamic = 'force-static';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function GET(): Response {
  const expires = new Date(Date.now() + ONE_YEAR_MS).toISOString();
  const body = [
    `Contact: mailto:${site.email}`,
    `Expires: ${expires}`,
    'Preferred-Languages: en, es, pt',
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
