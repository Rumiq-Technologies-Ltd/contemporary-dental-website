import Link from 'next/link';
import { CardGrid, InfoCard } from '@/components/page/Cards';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { appointmentFormEnabled, routes, whenOcoee } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'About Us',
  description: 'Contemporary Dental Care is a general dental practice founded in 2023 by Dr. Sheryar Khan. Honest treatment planning, easy access and care in your language.',
  path: routes.about,
});

const intro = whenOcoee(
  'Contemporary Dental Care is a general dental practice founded in 2023 by Dr. Sheryar Khan. Our Ocoee office opened under our name in 2024. Our practice rests on three commitments.',
  'Contemporary Dental Care is a general dental practice founded in 2023 by Dr. Sheryar Khan. Our practice rests on three commitments.',
);

// Source wording: "Phone lines at both offices, an after-hours line, and an enquiry form
// for questions before your visit." The Ocoee and request-form holds are applied here.
const reach = appointmentFormEnabled
  ? whenOcoee(
    'Phone lines at both offices, an after-hours line, and an enquiry form for questions before your visit.',
    'A phone line at our office, an after-hours line, and an enquiry form for questions before your visit.',
  )
  : whenOcoee(
    'Phone lines at both offices and an after-hours line.',
    'A phone line at our office and an after-hours line.',
  );

export default function AboutPage() {
  return <PageLayout>
    <PageIntro title="About Contemporary Dental Care" lead={intro} />
    <CardGrid>
      <InfoCard title="Honest treatment planning">
        <p>We explain your options in plain language. We recommend treatment in stages that suit your health, and we put your health ahead of the size of a treatment plan.</p>
      </InfoCard>
      <InfoCard title="Easy to reach"><p>{reach}</p></InfoCard>
      <InfoCard title="Care in your language">
        <p>Our team speaks English. Members of our team also speak Spanish and Portuguese. Tell us your language when you call, and we&apos;ll confirm who is in.</p>
      </InfoCard>
    </CardGrid>
    <p><Link href={routes.team} className="pill pill-accent pill-large">Meet Dr. Khan and our team</Link></p>
    <p className={styles.meta}>Read more about <Link className={styles.link} href={routes.doctor}>Dr. Sheryar Khan</Link>.</p>
  </PageLayout>;
}
