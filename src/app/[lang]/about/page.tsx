import type { Metadata } from 'next';
import Link from 'next/link';
import { CardGrid, InfoCard } from '@/components/page/Cards';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { appointmentFormEnabled, routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).about.overview;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.about });
}

export default async function AboutPage() {
  const lang = await getLocale();
  const t = getMessages(lang).about.overview;
  // Source wording: "Phone lines at both offices, an after-hours line, and an enquiry form
  // for questions before your visit." The Ocoee and request-form holds are applied here.
  const reachCopy = appointmentFormEnabled ? t.reach.withForm : t.reach.withoutForm;
  return <PageLayout>
    <PageIntro title={t.title} lead={whenOcoee(t.intro.withOcoee, t.intro.orlandoOnly)} />
    <CardGrid>
      <InfoCard title={t.honest.title}><p>{t.honest.body}</p></InfoCard>
      <InfoCard title={t.reach.title}><p>{whenOcoee(reachCopy.withOcoee, reachCopy.orlandoOnly)}</p></InfoCard>
      <InfoCard title={t.language.title}><p>{t.language.body}</p></InfoCard>
    </CardGrid>
    <div className={styles.split}>
      <PagePhoto photo="teamGroup" alt={getMessages(lang).about.team.groupPhotoAlt} />
      <div>
        <p><Link href={localePath(lang, routes.team)} className="pill pill-accent pill-large">{t.teamLink}</Link></p>
        <p className={styles.meta}>{t.doctorLink.before} <Link className={styles.link} href={localePath(lang, routes.doctor)}>{t.doctorLink.link}</Link>{t.doctorLink.after}</p>
      </div>
    </div>
  </PageLayout>;
}
