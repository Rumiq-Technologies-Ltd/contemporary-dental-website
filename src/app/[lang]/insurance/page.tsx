import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { emphasize } from '@/components/page/emphasize';
import { BulletList, Prose, Section } from '@/components/page/Section';
import { formatPartnerList, getInsuranceLists } from '@/content/insurance';
import { routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).money.insurance;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.insurance });
}

// Still to do before launch: replace the lists with the complete authoritative Insurance
// List and remove "and more". The Ocoee participation confirmation is outstanding.
// Insurance & Financing, the first page in the Insurance & Payments menu. The financial policy has its
// own page (/financial-policy), linked from the financing section.
export default async function InsurancePage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.money.insurance;
  const payment = messages.money.payment;
  const lists = getInsuranceLists(lang);
  const partners = formatPartnerList(payment.financing.listAnd);
  return <PageLayout>
    <PageIntro title={t.title} lead={emphasize(whenOcoee(t.lead.withOcoee, t.lead.orlandoOnly))} />
    <Section id="ppo" title={t.sections.ppo}>
      <BulletList>{lists.ppo.map(plan => <li key={plan}>{plan}</li>)}</BulletList>
    </Section>
    <Section id="discount" title={t.sections.discount}>
      <BulletList>{lists.discount.map(plan => <li key={plan}>{plan}</li>)}</BulletList>
    </Section>
    <Section id="medicare" title={t.sections.medicare}>
      <BulletList>{lists.medicare.map(plan => <li key={plan}>{plan}</li>)}</BulletList>
    </Section>
    <Prose>
      <p><strong>{t.notListed.heading}</strong> {t.notListed.body}</p>
    </Prose>
    <Section id="financing" title={payment.financing.title}>
      <Prose>
        <p>{fill(payment.financing.partners, { partners })}</p>
        <p>{payment.financing.inHouse.before}<Link href={localePath(lang, routes.membership)}>{payment.financing.inHouse.link}</Link>{payment.financing.inHouse.after}</p>
        <p>{payment.policy.pointer.before}<Link href={localePath(lang, routes.financialPolicy)}>{payment.policy.pointer.link}</Link>{payment.policy.pointer.after}</p>
      </Prose>
    </Section>
  </PageLayout>;
}
