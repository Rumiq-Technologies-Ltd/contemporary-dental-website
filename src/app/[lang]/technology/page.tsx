import type { Metadata } from 'next';
import { ClosingBand } from '@/components/page/ClosingBand';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { BulletList } from '@/components/page/Section';
import { routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).visit.technology.meta;
  return pageMetadata({ lang, title: t.title, description: t.description, path: routes.technology });
}

// HOLD: no claims that treatment is faster because of technology, that crowns are
// milled in-house, or that we offer CEREC, LANAP or 3D-printed restorations.
export default async function TechnologyPage() {
  const lang = await getLocale();
  const t = getMessages(lang).visit.technology;
  return <PageLayout>
    <PageIntro title={t.title} lead={t.lead} />
    <div className={styles.split}>
      <BulletList>
        {t.equipment.map(item => <li key={item}>{item}</li>)}
      </BulletList>
      <PagePhoto photo="xrayTeamPortrait" alt={t.photoAlt} />
    </div>
    <ClosingBand />
  </PageLayout>;
}
