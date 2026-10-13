import type { Metadata } from 'next';
import { site } from '@/content/site';

interface PageMetadataInput {
  /** Provisional title tag from the content file, without the site suffix. */
  title: string;
  description: string;
  path: string;
  /** Skip the " | Contemporary Dental Care" suffix (the homepage title carries it). */
  absoluteTitle?: string;
}

/** Title, description, canonical URL, Open Graph and Twitter tags for one page. */
export function pageMetadata({ title, description, path, absoluteTitle }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, type: 'website', locale: 'en_US' },
    twitter: { card: 'summary', title: fullTitle, description },
  };
}
