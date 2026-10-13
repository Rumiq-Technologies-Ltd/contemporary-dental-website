import type { Metadata } from 'next';
import Link from 'next/link';
import { primaryOffice, routes } from '@/content/site';

export const metadata: Metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return <main id="main-content" className="message-page"><p>CONTEMPORARY DENTAL CARE</p><h1>Page not found</h1><p>This page isn&apos;t here. Try our home page, or call {primaryOffice.name} at {primaryOffice.phone}.</p><Link className="pill pill-accent pill-large" href={routes.home}>Back to home page</Link></main>;
}
