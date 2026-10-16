import type { Metadata } from 'next';
import { CallButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PlanCards } from '@/components/page/PlanCards';
import { BulletList, Section } from '@/components/page/Section';
import { offices, routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).money.membership;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.membership });
}

// The three plans from the Smile Membership Program. Prices and plan terms come from the message file.
export default async function MembershipPage() {
  const lang = await getLocale();
  const t = getMessages(lang).money.membership;
  return <PageLayout>
    <PageIntro title={t.title} lead={t.lead} actions={offices.map(office => <CallButton key={office.id} office={office} />)} />
    <Section id="plans" title={t.plansTitle}>
      <PlanCards plans={[t.plans.adult, t.plans.perio, t.plans.child]} perMonth={t.perMonth} />
    </Section>
    <Section id="benefits" title={t.benefitsTitle}>
      <BulletList>{t.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</BulletList>
    </Section>
  </PageLayout>;
}
