import Link from 'next/link';
import { RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose } from '@/components/page/Section';
import { appointmentFormEnabled, routes } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'New Patients',
  description: 'How your first visit works: booking, emergency visits, forms, your financial policy, language and what to do if you feel nervous.',
  path: routes.newPatients,
});

// BUILD NOTE: this wording assumes the payment card is captured on arrival. If capture
// at booking is confirmed instead, change the "Your first visit" paragraph.
// HOLD: sedation and nitrous oxide are not mentioned until Dr. Khan confirms the scope.
// Still to confirm: whether forms are completed before the visit or on arrival, and the what-to-bring list.
export default function NewPatientsPage() {
  return <PageLayout>
    <PageIntro title="New patients" lead="Welcome. Here is how your first visit works." actions={<RequestAppointmentButton />} />
    <div className={styles.split}>
      <Prose>
        <p><strong>Booking.</strong> {appointmentFormEnabled ? 'Request an appointment through our form, or call your office.' : 'Call your office to request an appointment.'}</p>
        <p><strong>Emergencies.</strong> Emergency visits are open to new patients.</p>
        <p><strong>Forms.</strong> We&apos;ll ask you to complete our new-patient forms, including our HIPAA <Link href={routes.noticeOfPrivacyPractices}>Notice of Privacy Practices</Link>. Please don&apos;t include health details in the website form.</p>
        <p><strong>Your first visit.</strong> At your first visit, you&apos;ll review and sign our financial policy and place a payment card on file. Details are on the <Link href={routes.payment}>Payment and financing</Link> page.</p>
        <p><strong>Language.</strong> Tell us your language when you book, and we&apos;ll confirm who is in.</p>
        <p><strong>Feeling nervous?</strong> If dental visits make you nervous, tell us when you book, so we can plan your visit around what helps.</p>
      </Prose>
      <PagePhoto photo="roomBlue" alt="A dental treatment room" />
    </div>
  </PageLayout>;
}
