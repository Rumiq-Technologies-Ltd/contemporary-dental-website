import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { BulletList, Prose, Section } from '@/components/page/Section';
import { formatPartnerList, getFinancialPolicy } from '@/content/insurance';
import { routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).money.payment;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.payment });
}

// HOLD: "0% financing for all patients" must not appear anywhere; any 0% wording needs counsel review.
// Still to confirm: accepted payment methods and the in-house payment plan terms.
// BUILD NOTE: replace the policy summary with the approved Financial Policy & Appointment
// Agreement wording, verbatim. Card capture at booking is confirmed; the policy signature timing is still open.
export default async function PaymentFinancingPage() {
  const lang = await getLocale();
  const t = getMessages(lang).money.payment;
  const partners = formatPartnerList(t.financing.listAnd);
  return <PageLayout>
    <PageIntro title={t.title} />
    <Section id="financing" title={t.financing.title}>
      <Prose>
        <p>{fill(t.financing.partners, { partners })}</p>
        <p><strong>{t.financing.inHouse.heading}</strong> {t.financing.inHouse.body}</p>
      </Prose>
    </Section>
    <Section id="financial-policy" title={t.policy.title}>
      <Prose><p>{t.policy.intro}</p></Prose>
      <BulletList>
        {getFinancialPolicy(lang).map(item => <li key={item.term}><strong>{item.term}:</strong> {item.text}</li>)}
      </BulletList>
    </Section>
  </PageLayout>;
}
