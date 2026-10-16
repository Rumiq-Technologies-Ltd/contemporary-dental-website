import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { BulletList, Prose, Section } from '@/components/page/Section';
import { formatPartnerList, getFinancialPolicy, getInsuranceLists } from '@/content/insurance';
import { routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).money.insurance;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.insurance });
}

// Still to do before launch: replace the lists with the complete authoritative Insurance
// List and remove "and more". The Ocoee participation confirmation is outstanding.
// Payment and financing sit on this page too, so the page covers both insurance and payment.
export default async function InsurancePage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.money.insurance;
  const payment = messages.money.payment;
  const lists = getInsuranceLists(lang);
  const partners = formatPartnerList(payment.financing.listAnd);
  return <PageLayout>
    <PageIntro title={t.title} lead={whenOcoee(t.lead.withOcoee, t.lead.orlandoOnly)} />
    <div className={styles.notice}><strong>{t.estimate.heading}</strong> {t.estimate.body}</div>
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
        <p><strong>{payment.financing.inHouse.heading}</strong> {payment.financing.inHouse.body}</p>
      </Prose>
    </Section>
    <Section id="financial-policy" title={payment.policy.title}>
      <Prose><p>{payment.policy.intro}</p></Prose>
      <BulletList>
        {getFinancialPolicy(lang).map(item => <li key={item.term}><strong>{item.term}:</strong> {item.text}</li>)}
      </BulletList>
    </Section>
  </PageLayout>;
}
