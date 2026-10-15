import { Archivo } from 'next/font/google';
import localFont from 'next/font/local';

// Shared by every root layout (the [lang] layout and the global not-found page), so both use the same faces.
export const inter = localFont({ src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', variable: '--font-body', display: 'swap', preload: false });
// Headings use Archivo's condensed widths (the wdth axis), set in globals.css. next/font
// downloads it at build time and serves it from this site, so the CSP stays font-src 'self'.
export const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
