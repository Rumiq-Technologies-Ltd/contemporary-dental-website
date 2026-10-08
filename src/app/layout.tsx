import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const inter = localFont({ src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', variable: '--font-body', display: 'swap', preload: false });
const unbounded = localFont({ src: '../../node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2', variable: '--font-display', display: 'swap', weight: '200 900' });

export const metadata: Metadata = {
  title: { default: 'Contemporary Dental Care — Your Smile, Our Passion', template: '%s | Contemporary Dental Care' },
  description: 'Discover Contemporary Dental Care. Modern solutions, advanced technology, and a fresh approach to your smile.',
  applicationName: 'Contemporary Dental Care',
  icons: { icon: '/images/figma/8e6b4.svg' },
};
export const viewport: Viewport = { themeColor: '#a9eaf7', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${unbounded.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}
