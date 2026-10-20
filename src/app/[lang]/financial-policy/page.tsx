import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { BulletList } from '@/components/page/Section';
import { emphasize } from '@/components/page/emphasize';
import { getFinancialPolicy } from '@/content/insurance';
import { routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).money.payment.policy;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.financialPolicy });
}

// The financial policy on its own page. The items come from messages.money.financialPolicy
// (content/insurance.ts); check them against the signed agreement before launch.
export default async function FinancialPolicyPage() {
  const lang = await getLocale();
  const t = getMessages(lang).money.payment.policy;
  return <PageLayout>
    <PageIntro title={t.title} lead={t.lead} />
    <BulletList>
      {/* Each item's name sits on its own line; **marked** phrases in the text are bold. */}
      {getFinancialPolicy(lang).map(item => <li key={item.term}><strong className={styles.policyTerm}>{item.term}:</strong>{emphasize(item.text)}</li>)}
    </BulletList>
  </PageLayout>;
}
