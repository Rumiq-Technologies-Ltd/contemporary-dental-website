import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { MobileCallBar } from '@/components/layout/MobileCallBar';
import { indexable, site, whenOcoee } from '@/content/site';
import './globals.css';

const inter = localFont({ src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', variable: '--font-body', display: 'swap', preload: false });
const unbounded = localFont({ src: '../../node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2', variable: '--font-display', display: 'swap', weight: '200 900' });

const defaultDescription = whenOcoee(
  'Contemporary Dental Care is a general dental practice in Orlando and Ocoee. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
  'Contemporary Dental Care is a general dental practice in Orlando. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: defaultDescription,
  applicationName: site.name,
  // Stays off search engines until the owner approves publication (content file, status line).
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: '/images/figma/8e6b4.svg' },
  openGraph: { siteName: site.name, type: 'website', locale: 'en_US' },
  twitter: { card: 'summary' },
};
export const viewport: Viewport = { themeColor: '#a9eaf7', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${unbounded.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a>{children}<MobileCallBar /></body></html>;
}
