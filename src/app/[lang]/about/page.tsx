import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { TeamGrid } from '@/components/page/TeamGrid';
import { Section } from '@/components/page/Section';
import { routes, whenOcoee } from '@/content/site';
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

// The team lives here, so it is not repeated on the homepage or elsewhere.
export default async function AboutPage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.about.overview;
  return <PageLayout>
    <PageIntro title={t.title} lead={whenOcoee(t.intro.withOcoee, t.intro.orlandoOnly)} />
    <Section id="team" title={messages.about.team.title}>
      <PagePhoto photo="teamGroup" alt={messages.about.team.groupPhotoAlt} wide objectPosition="50% 0%" />
      <TeamGrid />
    </Section>
    <p className={styles.meta}>{t.doctorLink.before} <Link className={styles.link} href={localePath(lang, routes.doctor)}>{t.doctorLink.link}</Link>{t.doctorLink.after}</p>
  </PageLayout>;
}
