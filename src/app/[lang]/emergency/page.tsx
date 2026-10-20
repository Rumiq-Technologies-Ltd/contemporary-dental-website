import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { BulletList, Prose, SafetyNotice, Section } from '@/components/page/Section';
import { routes, site } from '@/content/site';
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
    <PageIntro title={t.title} lead={t.intro} />
    <div className={`${styles.split} ${styles.splitTop}`}>
      <div className={styles.section}>
        <SafetyNotice label={t.safetyLabel} title={t.safetyTitle}>{t.safetyNotice}</SafetyNotice>
        <Section id="same-day" title={t.sameDay.title}>
          <Prose>
            <p>{t.sameDay.body}</p>
            <p>{t.sameDay.listIntro}</p>
          </Prose>
          <BulletList>{t.sameDay.items.map(item => <li key={item}>{item}</li>)}</BulletList>
        </Section>
        <Section id="after-hours" title={t.afterHours.title}>
          <Prose>
            <p>{t.afterHours.availability}</p>
            <p>{t.afterHours.callBack}</p>
          </Prose>
          <BulletList>
            <li><strong>{t.afterHours.locationLabel}:</strong> {t.afterHours.location.before}<strong>{t.afterHours.location.office}</strong>{t.afterHours.location.after}</li>
            <li><strong>{t.afterHours.lineLabel}:</strong> <a href={site.afterHoursHref}><strong>{site.afterHoursPhone}</strong></a></li>
          </BulletList>
        </Section>
      </div>
      <PagePhoto photo="emergencyPatient" />
    </div>
    <EnquiryPanel source="/emergency" />
  </PageLayout>;
}
