import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import localFont from 'next/font/local';
import { MobileCallBar } from '@/components/layout/MobileCallBar';
import { PageEffects } from '@/components/motion/PageEffects';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { TopBar } from '@/components/layout/TopBar';
import { site, whenOcoee } from '@/content/site';
import { isIndexable, siteUrl } from '@/lib/siteUrl';
import './globals.css';

const inter = localFont({ src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', variable: '--font-body', display: 'swap', preload: false });
// Headings use Archivo's condensed widths (the wdth axis), set in globals.css. next/font
// downloads it at build time and serves it from this site, so the CSP stays font-src 'self'.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });

const defaultDescription = whenOcoee(
  'Contemporary Dental Care is a general dental practice in Orlando and Ocoee. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
  'Contemporary Dental Care is a general dental practice in Orlando. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: defaultDescription,
  applicationName: site.name,
  // Production and local builds are indexable. Vercel previews stay out of search indexes.
  robots: isIndexable(process.env) ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: '/images/figma/8e6b4.svg' },
  openGraph: { siteName: site.name, type: 'website', locale: 'en_US' },
  twitter: { card: 'summary' },
};
export const viewport: Viewport = { themeColor: '#a9eaf7', width: 'device-width', initialScale: 1 };

// Marks the page as script-enabled before first paint, so scroll reveals may hide content
// without a flash. Without JavaScript nothing is ever hidden. build-csp.mjs hashes this script.
const PRE_PAINT_SCRIPT = "document.documentElement.classList.add('js')";

// The top bar and header live here, outside every page, so they appear on every route
// and the header stays sticky across the whole document.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${archivo.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} /></head>
    <body>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <TopBar />
      <SiteHeader />
      {children}
      <MobileCallBar />
      <PageEffects />
    </body>
  </html>;
}
