import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { BulletList, Prose, Section } from '@/components/page/Section';
import { getInsuranceLists } from '@/content/insurance';
import { routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
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
export default async function InsurancePage() {
  const lang = await getLocale();
  const t = getMessages(lang).money.insurance;
  const lists = getInsuranceLists(lang);
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
      <p>{t.paymentLink.before} <Link href={localePath(lang, routes.payment)}>{t.paymentLink.link}</Link>{t.paymentLink.after}</p>
    </Prose>
  </PageLayout>;
}
