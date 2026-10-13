import { CallButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose, SafetyNotice, Section } from '@/components/page/Section';
import { routes, site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'Emergency Dental Care',
  description: 'Tooth pain, swelling, a broken tooth or a dental injury? Emergency visits are open to new patients, and same-day appointments are often available.',
  path: routes.emergency,
});

// BUILD NOTE: the safety wording is not in the governed documents. Dr. Khan must
// approve it before publishing. This page must not triage or assess urgency.
export default function EmergencyPage() {
  return <PageLayout>
    <PageIntro
      title="Emergency dental care"
      lead="Tooth pain, a swollen face, a broken tooth or an injury to your teeth? Call us. Emergency visits are open to new patients, and same-day appointments are often available, subject to availability."
      actions={<CallButton />}
    />
    <SafetyNotice>If you have trouble breathing or swallowing, swelling that is spreading into your face or neck, or a serious injury to your head or face, call 911 or go to the nearest emergency room now.</SafetyNotice>
    <div className={styles.split}>
      <div className={styles.section}>
        <Prose>
          <p>Same-day emergency care includes assessment and first-stage treatment for abscesses and swelling, broken or fractured teeth, and dental trauma. It can also include extraction when needed, and starting a crown preparation.</p>
        </Prose>
        <Section id="after-hours" title="After hours">
          <Prose>
            <p>Calls outside office hours are answered by our answering service. It takes your name, number and reason for calling and passes them to our team, who will call you back. We are not open 24 hours, and after-hours treatment depends on availability, so we can&apos;t promise it. After-hours emergencies are handled at our Orlando office.</p>
            <p>After hours: <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></p>
          </Prose>
        </Section>
      </div>
      <PagePhoto photo="guides" />
    </div>
  </PageLayout>;
}
