import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { routes, whenOcoee } from '@/content/site';
import { getTeam } from '@/content/team';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).about.team;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.team });
}

// The group photo needs every person's written consent before launch (content file C03 section 8).
export default async function TeamPage() {
  const lang = await getLocale();
  const t = getMessages(lang).about.team;
  return <PageLayout>
    <PageIntro title={t.title} lead={whenOcoee(t.lead.withOcoee, t.lead.orlandoOnly)} />
    <PagePhoto photo="teamGroup" alt={t.groupPhotoAlt} square />
    <ul className={styles.team}>
      {getTeam(lang).map(member => <li key={member.name} className={styles.member}>
        <h2>{member.name}</h2>
        <p><strong>{member.role}.</strong> {member.offices}.{member.languages ? ` ${member.languages}` : ''}</p>
        {member.bio && <p>{member.bio}</p>}
      </li>)}
    </ul>
  </PageLayout>;
}
