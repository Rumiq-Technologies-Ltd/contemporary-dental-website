import type { Metadata } from 'next';
import { RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).money.pricing;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.pricing });
}

// HOLD: no offers are published here. The new-patient exam ($89.99), the October 2026
// special ($49.99) and the implant offer ($2,999) each need written terms and sign-off
// (C14 §4.7 to §4.9). The $100 referral promotion, any 0% financing claim and membership
// pricing never appear until counsel review. Fix the in-practice October wording now.
// BUILD NOTE: confirm that an estimate before treatment matches the practice's real process.
export default async function PricingPage() {
  const lang = await getLocale();
  const t = getMessages(lang).money.pricing;
  return <PageLayout>
    <PageIntro title={t.title} lead={t.lead} actions={<RequestAppointmentButton />} />
  </PageLayout>;
}
