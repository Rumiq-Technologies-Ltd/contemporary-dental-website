import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { BulletList, Notice } from '@/components/page/Section';
import { routes } from '@/content/site';
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
      title: 'Terms of Use',
      description: 'The terms for using the Contemporary Dental Care website.',
      path: routes.terms,
    }),
    robots: { index: false, follow: true },
  };
}

// HOLD: counsel must write or review the full text before publishing. Still to add:
// third-party links, intellectual property, limitation of liability and governing law
// (Florida, counsel to confirm). Ownership of existing creative assets is unknown.
export default async function TermsPage() {
  await requireEnglish();
  return <PageLayout>
    <PageIntro title="Terms of use" />
    <Notice>These terms are a draft and are being reviewed. They will be updated before the website launches.</Notice>
    <BulletList>
      <li>The website is for information only and is not medical advice.</li>
      <li>Using the website does not create a doctor–patient relationship.</li>
      <li>A form enquiry is not an appointment.</li>
      <li>The website is not for emergencies. Call 911 or your office.</li>
    </BulletList>
  </PageLayout>;
}
