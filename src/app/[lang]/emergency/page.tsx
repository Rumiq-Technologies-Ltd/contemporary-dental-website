import type { Metadata } from 'next';
import { CallButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose, SafetyNotice, Section } from '@/components/page/Section';
import { offices, routes, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { EnquiryPanel } from '@/features/inquiry/EnquiryPanel';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).visit.emergency.meta;
  return pageMetadata({ lang, title: t.title, description: t.description, path: routes.emergency });
}

// BUILD NOTE: the safety wording is not in the governed documents. Dr. Khan must
// approve it, in every language, before publishing. This page must not triage or assess urgency.
export default async function EmergencyPage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.visit.emergency;
  return <PageLayout>
    <PageIntro title={t.title} actions={offices.map(office => <CallButton key={office.id} office={office} />)} />
    <SafetyNotice label={t.safetyLabel}>{t.safetyNotice}</SafetyNotice>
    <div className={`${styles.split} ${styles.splitTop}`}>
      <div className={styles.section}>
        <Prose>
          <p>{t.lead}</p>
          <p>{t.sameDayCare}</p>
        </Prose>
      </div>
      <PagePhoto photo="guides" />
    </div>
    <Section id="after-hours" title={t.afterHours.title}>
      <Prose>
        <p>{t.afterHours.body}</p>
        <p>{messages.common.afterHours} <a href={site.afterHoursHref}>{site.afterHoursPhone}</a></p>
      </Prose>
    </Section>
    <EnquiryPanel source="/emergency" />
  </PageLayout>;
}
