import type { Metadata } from 'next';
import { CallButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { primaryOffice, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

// Shown after an enquiry is sent. It carries no form data, and it is never indexed.
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).enquiry.meta;
  return {
    ...pageMetadata({ lang, title: t.title, description: t.description, path: '/thank-you' }),
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage() {
  const lang = await getLocale();
  const t = getMessages(lang).enquiry.thankYou;
  return <PageLayout>
    <PageIntro title={t.heading} lead={fill(t.body, { phone: primaryOffice.phone, afterHours: site.afterHoursPhone })} actions={<CallButton />} />
  </PageLayout>;
}
