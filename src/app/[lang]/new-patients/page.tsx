import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Section } from '@/components/page/Section';
import { routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { EnquiryPanel } from '@/features/inquiry/EnquiryPanel';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).visit.newPatients.meta;
  return pageMetadata({ lang, title: t.title, description: t.description, path: routes.newPatients });
}

// BUILD NOTE: the payment card is taken at booking (practice decision, 16 Oct 2026). Step 4 reflects that.
// HOLD: sedation and nitrous oxide are not mentioned until Dr. Khan confirms the scope.
// Still to confirm: whether forms are completed before the visit or on arrival, and the what-to-bring list.
export default async function NewPatientsPage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.visit.newPatients;
  const steps = [
    { title: t.booking.title, body: whenOcoee(t.booking.body.withOcoee, t.booking.body.orlandoOnly) },
    { title: t.emergencies.title, body: t.emergencies.body },
    // The Notice of Privacy Practices is English only, so its link keeps the English URL.
    { title: t.forms.title, body: <>{t.forms.before}<Link href={routes.noticeOfPrivacyPractices}>{messages.common.legal.noticeOfPrivacyPractices}</Link>{t.forms.after}</> },
    { title: t.financial.title, body: <>{t.financial.before}<Link href={localePath(lang, routes.financialPolicy)}>{t.financial.link}</Link>{t.financial.after}</> },
    { title: t.nervous.title, body: t.nervous.body },
  ];
  return <PageLayout>
    <PageIntro title={t.title} subtitle={t.subtitle} lead={t.lead} />
    <div className={`${styles.split} ${styles.splitTop}`}>
      <Section id="first-visit" title={t.stepsTitle}>
        <ol className={`${styles.steps} ${styles.prose}`}>
          {steps.map((step, index) => <li key={step.title}>
            <span className={styles.stepLabel}>{fill(t.stepLabel, { n: String(index + 1) })}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>)}
        </ol>
      </Section>
      <PagePhoto photo="roomCream" alt={t.photoAlt} />
    </div>
    <EnquiryPanel source="/new-patients" />
  </PageLayout>;
}
