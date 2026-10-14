import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { MobileCallBar } from '@/components/layout/MobileCallBar';
import { site, whenOcoee } from '@/content/site';
import { isIndexable, siteUrl } from '@/lib/siteUrl';
import './globals.css';

const inter = localFont({ src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', variable: '--font-body', display: 'swap', preload: false });
const unbounded = localFont({ src: '../../node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2', variable: '--font-unbounded', display: 'swap', weight: '200 900' });
// Only the capital E comes from Inter, whose E is a standard, evenly weighted glyph.
// The unicode-range limits this face to U+0045, so every other display letter stays Unbounded.
const displayE = localFont({
  src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  variable: '--font-display-e',
  display: 'swap',
  weight: '100 900',
  adjustFontFallback: false,
  // Inter's capitals sit about 3% shorter than Unbounded's; size-adjust matches the cap height.
  declarations: [
    { prop: 'unicode-range', value: 'U+0045' },
    { prop: 'size-adjust', value: '103%' },
  ],
});

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${unbounded.variable} ${displayE.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a>{children}<MobileCallBar /></body></html>;
}
