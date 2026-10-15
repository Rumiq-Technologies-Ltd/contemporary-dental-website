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

// The share image comes from app/opengraph-image.tsx. Pages set their own openGraph object,
// which replaces the inherited one, so the image is named here explicitly.
const shareImage = { url: '/opengraph-image', width: 1200, height: 630, alt: `${site.name}: honest, patient-focused dental care` };

/** Title, description, canonical URL, Open Graph and Twitter tags for one page. */
export function pageMetadata({ title, description, path, absoluteTitle }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, type: 'website', locale: 'en_US', images: [shareImage] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [shareImage.url] },
  };
}
