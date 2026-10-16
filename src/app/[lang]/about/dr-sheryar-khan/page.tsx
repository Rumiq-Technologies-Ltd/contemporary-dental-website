import type { Metadata } from 'next';
import { ClosingBand } from '@/components/page/ClosingBand';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose } from '@/components/page/Section';
import { routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).about.doctor;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.doctor });
}

// BUILD NOTE: verify the licence number and status against the Florida Department of
// Health record before publishing, and confirm the residency completion year.
// HOLD: no "specialist", "All-on-4 expert" or advanced-training claims.
// Use "Dr. Sheryar Khan" everywhere, never "Dr. Muhammad".
// The portrait was supplied by the practice; confirm Dr. Khan approves it before launch.
export default async function DoctorPage() {
  const lang = await getLocale();
  const t = getMessages(lang).about.doctor;
  const offices = whenOcoee(t.offices.withOcoee, t.offices.orlandoOnly);
  return <PageLayout>
    <PageIntro title={t.title} lead={t.lead} />
    <div className={styles.split}>
      <Prose>
        <p>{fill(t.education, { offices })}</p>
        {t.bio && <p>{t.bio}</p>}
        <p>{t.clinical}</p>
        <p>{t.approach}</p>
        <p><strong>{t.tagline}</strong></p>
      </Prose>
      <PagePhoto photo="doctorPortrait" alt={t.photoAlt} />
    </div>
    <ClosingBand />
  </PageLayout>;
}
