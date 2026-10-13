import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { BulletList, Prose, Section } from '@/components/page/Section';
import { financialPolicy, financingPartners } from '@/content/insurance';
import { routes } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Payment and Financing',
  description: 'Financing partners, in-house payment plans and our financial policy for appointments and payments.',
  path: routes.payment,
});

// HOLD: "0% financing for all patients" must not appear anywhere; any 0% wording needs counsel review.
// Still to confirm: accepted payment methods and the in-house payment plan terms.
// BUILD NOTE: replace the policy summary with the approved Financial Policy & Appointment
// Agreement wording, verbatim, and resolve card capture at booking versus arrival first.
export default function PaymentFinancingPage() {
  return <PageLayout>
    <PageIntro title="Payment and financing" />
    <Section id="financing" title="Financing">
      <Prose>
        <p>We work with {financingPartners.join(', ').replace(/, ([^,]+)$/, ' and $1')}. Financing is arranged with the lender, subject to their approval and terms. Approval is not guaranteed.</p>
        <p><strong>In-house payment plans.</strong> We also offer in-house payment plans.</p>
      </Prose>
    </Section>
    <Section id="financial-policy" title="Our financial policy">
      <Prose><p>These are the terms for appointments and payments at our practice.</p></Prose>
      <BulletList>
        {financialPolicy.map(item => <li key={item.term}><strong>{item.term}:</strong> {item.text}</li>)}
      </BulletList>
    </Section>
  </PageLayout>;
}
