import type { Metadata } from 'next';
import Link from 'next/link';
import { site, primaryOffice, routes } from '@/content/site';
import { fill } from '@/i18n/fill';
import { defaultLocale } from '@/i18n/locales';
import { common } from '@/i18n/messages/common';
import { archivo, inter } from '@/lib/fonts';
import './globals.css';

// Unmatched URLs and notFound() under a language render this page. It bypasses the [lang] layout,
// so it writes its own document and is English only. Other languages use the same wording in English.
const t = common[defaultLocale].notFound;

export const metadata: Metadata = {
  title: { absolute: `${t.metaTitle} | ${site.name}` },
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return <html lang="en-US" className={`${inter.variable} ${archivo.variable}`}>
    <body>
      <main id="main-content" className="message-page">
        <p>{t.kicker}</p>
        <h1>{t.title}</h1>
        <p>{fill(t.body, { name: primaryOffice.name, phone: primaryOffice.phone })}</p>
        <Link className="pill pill-accent pill-large" href={routes.home}>{t.button}</Link>
      </main>
    </body>
  </html>;
}
