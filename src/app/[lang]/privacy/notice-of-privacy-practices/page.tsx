import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { Notice } from '@/components/page/Section';
import { site } from '@/content/site';
import { defaultLocale } from '@/i18n/locales';
import { requireEnglish } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

// English only: other languages get the not-found page.
export async function generateMetadata(): Promise<Metadata> {
  await requireEnglish();
  return {
    ...pageMetadata({
      lang: defaultLocale,
      englishOnly: true,
      title: 'Notice of Privacy Practices',
      description: 'The HIPAA Notice of Privacy Practices for Contemporary Dental Care.',
      path: '/privacy/notice-of-privacy-practices',
    }),
    robots: { index: false, follow: true },
  };
}

// HOLD: insert the approved HIPAA Notice of Privacy Practices from the intake pack,
// verbatim. Do not paraphrase it.
export default async function NoticeOfPrivacyPracticesPage() {
  await requireEnglish();
  return <PageLayout>
    <PageIntro title="Notice of Privacy Practices" />
    <Notice>The approved Notice of Privacy Practices will be published here. Until then, email <a href={`mailto:${site.email}`}>{site.email}</a> or call our office to ask for a copy.</Notice>
  </PageLayout>;
}
