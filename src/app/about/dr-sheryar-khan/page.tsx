import { ClosingBand } from '@/components/page/ClosingBand';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose } from '@/components/page/Section';
import { routes, whenOcoee } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'Dr. Sheryar Khan, DDS',
  description: 'Dr. Sheryar Khan is a general dentist and the founder and owner of Contemporary Dental Care. DDS, Howard University College of Dentistry.',
  path: routes.doctor,
});

// BUILD NOTE: verify the licence number and status against the Florida Department of
// Health record before publishing, and confirm the residency completion year.
// HOLD: no "specialist", "All-on-4 expert" or advanced-training claims.
// Use "Dr. Sheryar Khan" everywhere, never "Dr. Muhammad".
// The portrait was supplied by the practice; confirm Dr. Khan approves it before launch.
const offices = whenOcoee('our Orlando and Ocoee offices', 'our Orlando office');

export default function DoctorPage() {
  return <PageLayout>
    <PageIntro title="Dr. Sheryar Khan, DDS" lead="General dentist · Founder and owner" />
    <div className={styles.split}>
      <Prose>
        <p>Dr. Khan earned his DDS at Howard University College of Dentistry. He completed a General Practice Residency at Harbor-UCLA Medical Center in Los Angeles, hospital-based training that covered medically complex patients and dental emergencies. He has practised since 2020, founded Contemporary Dental Care in 2023, and sees patients at {offices}. He is licensed to practise dentistry in Florida.</p>
        <p>Dr. Khan&apos;s clinical work includes implants, extractions, veneers, crowns and smile design. Implants are a particular focus of his care.</p>
        <p>Dr. Khan believes in conservative treatment. He recommends what you need, avoids over-treatment, and sequences care for long-term results.</p>
        <p><strong>Your smile. Your health. Our priority.</strong></p>
      </Prose>
      <PagePhoto photo="doctorPortrait" alt="Dr. Sheryar Khan, DDS, general dentist and founder of Contemporary Dental Care" />
    </div>
    <ClosingBand />
  </PageLayout>;
}
