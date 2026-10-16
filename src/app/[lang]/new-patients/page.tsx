import type { Metadata } from 'next';
import Link from 'next/link';
import { RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose } from '@/components/page/Section';
import { appointmentFormEnabled, routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
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

// BUILD NOTE: the payment card is taken at booking (practice decision, 16 Oct 2026). The
// "Your first visit" paragraph reflects that; the timing of the financial policy signature is still to confirm.
// HOLD: sedation and nitrous oxide are not mentioned until Dr. Khan confirms the scope.
// Still to confirm: whether forms are completed before the visit or on arrival, and the what-to-bring list.
export default async function NewPatientsPage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.visit.newPatients;
  return <PageLayout>
    <PageIntro title={t.title} lead={t.lead} actions={<RequestAppointmentButton />} />
    <div className={styles.split}>
      <Prose>
        <p><strong>{t.booking.label}</strong> {appointmentFormEnabled ? t.booking.withForm : t.booking.callOnly}</p>
        <p><strong>{t.emergencies.label}</strong> {t.emergencies.body}</p>
        {/* The Notice of Privacy Practices is English only, so its link keeps the English URL. */}
        <p><strong>{t.forms.label}</strong> {t.forms.before}<Link href={routes.noticeOfPrivacyPractices}>{messages.common.legal.noticeOfPrivacyPractices}</Link>{t.forms.after}</p>
        <p><strong>{t.firstVisit.label}</strong> {t.firstVisit.before}<Link href={localePath(lang, routes.payment)}>{t.firstVisit.link}</Link>{t.firstVisit.after}</p>
        <p><strong>{t.language.label}</strong> {t.language.body}</p>
        <p><strong>{t.nervous.label}</strong> {t.nervous.body}</p>
      </Prose>
      <PagePhoto photo="roomCream" alt={t.photoAlt} />
    </div>
    <EnquiryPanel source="/new-patients" />
  </PageLayout>;
}
