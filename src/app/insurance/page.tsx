import Link from 'next/link';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { BulletList, Prose, Section } from '@/components/page/Section';
import { insuranceLists } from '@/content/insurance';
import { routes, whenOcoee } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'Insurance',
  description: 'The dental plans we participate with. We do not accept Medicaid. Insurance is always an estimate, not a guarantee of payment.',
  path: routes.insurance,
});

// Still to do before launch: replace the lists with the complete authoritative Insurance
// List and remove "and more". The Ocoee participation confirmation is outstanding.
export default function InsurancePage() {
  return <PageLayout>
    <PageIntro
      title="Insurance"
      lead={`We participate directly with the dental plans listed below. Our participation is the same at ${whenOcoee('both offices', 'our office')}. We do not accept Medicaid.`}
    />
    <div className={styles.notice}><strong>Insurance is always an estimate.</strong> Before treatment, we verify your benefits and give you an estimate. An estimate is not a guarantee of payment.</div>
    <Section id="ppo" title="PPO plans">
      <BulletList>{insuranceLists.ppo.map(plan => <li key={plan}>{plan}</li>)}</BulletList>
    </Section>
    <Section id="discount" title="Discount plans">
      <BulletList>{insuranceLists.discount.map(plan => <li key={plan}>{plan}</li>)}</BulletList>
    </Section>
    <Section id="medicare" title="Medicare plans">
      <BulletList>{insuranceLists.medicare.map(plan => <li key={plan}>{plan}</li>)}</BulletList>
    </Section>
    <Prose>
      <p><strong>Don&apos;t see your plan?</strong> Call us, and we&apos;ll check.</p>
      <p>Questions about payment? See <Link href={routes.payment}>Payment and financing</Link>.</p>
    </Prose>
  </PageLayout>;
}
