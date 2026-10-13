import { RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { routes } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Pricing and Offers',
  description: 'Fees depend on your treatment, so we do not publish a fee list. Before treatment starts, we give you an estimate.',
  path: routes.pricing,
});

// HOLD: no offers are published here. The new-patient exam ($89.99), the October 2026
// special ($49.99) and the implant offer ($2,999) each need written terms and sign-off
// (C14 §4.7 to §4.9). The $100 referral promotion, any 0% financing claim and membership
// pricing never appear until counsel review. Fix the in-practice October wording now.
// BUILD NOTE: confirm that an estimate before treatment matches the practice's real process.
export default function PricingPage() {
  return <PageLayout>
    <PageIntro
      title="Pricing and offers"
      lead="Fees depend on your treatment, so we don't publish a fee list. Before treatment starts, we'll give you an estimate. If you have insurance, we verify your benefits and estimate your share."
      actions={<RequestAppointmentButton />}
    />
  </PageLayout>;
}
