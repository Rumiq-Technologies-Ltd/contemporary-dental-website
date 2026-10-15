import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { Prose } from '@/components/page/Section';
import { routes, site } from '@/content/site';
import { defaultLocale } from '@/i18n/locales';
import { requireEnglish } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

// English only: other languages get the not-found page.
export async function generateMetadata(): Promise<Metadata> {
  await requireEnglish();
  return pageMetadata({
    lang: defaultLocale,
    englishOnly: true,
    title: 'Accessibility',
    description: 'Our aim to meet WCAG 2.1 Level AA, and how to get help if you have trouble using this website.',
    path: routes.accessibility,
  });
}

// Still to add once supplied: accessible parking and entrance details.
export default async function AccessibilityPage() {
  await requireEnglish();
  return <PageLayout>
    <PageIntro title="Accessibility" />
    <Prose>
      <p>We aim to make this website meet WCAG 2.1 Level AA. If you have trouble using any part of it, email <a href={`mailto:${site.email}`}>{site.email}</a> or call your office, and we&apos;ll help you by phone.</p>
    </Prose>
  </PageLayout>;
}
