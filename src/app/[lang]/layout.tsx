import type { Metadata, Viewport } from 'next';
import styles from '@/components/layout/layout.module.css';
import { PageEffects } from '@/components/motion/PageEffects';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { TopBar } from '@/components/layout/TopBar';
import { site, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { localeTags, ogLocale, publicLocales } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { archivo, inter } from '@/lib/fonts';
import { isIndexable, siteUrl } from '@/lib/siteUrl';
import '../globals.css';

// Every language is built ahead of time, so each one is a static page.
export function generateStaticParams(): { lang: string }[] {
  return publicLocales.map(lang => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { siteDescription } = getMessages(lang).common;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: site.name, template: `%s | ${site.name}` },
    description: whenOcoee(siteDescription.withOcoee, siteDescription.orlandoOnly),
    applicationName: site.name,
    // Production and local builds are indexable. Vercel previews stay out of search indexes.
    robots: isIndexable(process.env) ? { index: true, follow: true } : { index: false, follow: false },
    icons: { icon: '/images/figma/8e6b4.svg' },
    openGraph: { siteName: site.name, type: 'website', locale: ogLocale(lang) },
    twitter: { card: 'summary' },
  };
}

export const viewport: Viewport = { themeColor: '#a9eaf7', width: 'device-width', initialScale: 1 };

// Marks the page as script-enabled before first paint, so scroll reveals may hide content
// without a flash. Without JavaScript nothing is ever hidden. build-csp.mjs hashes this script.
const PRE_PAINT_SCRIPT = "document.documentElement.classList.add('js')";

// The top bar and header live here, outside every page, so they appear on every route.
// They share one sticky group, so the top bar stays above the header while the page scrolls.
export default async function LocaleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <html lang={localeTags[lang]} className={`${inter.variable} ${archivo.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} /></head>
    <body>
      <a className="skip-link" href="#main-content">{t.skipToContent}</a>
      <div className={styles.stickyHead}>
        <TopBar />
        <SiteHeader />
      </div>
      {children}
      <PageEffects />
    </body>
  </html>;
}
