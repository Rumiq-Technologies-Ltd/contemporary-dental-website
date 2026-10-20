import type { Metadata } from 'next';
import { CardGrid, InfoCard } from '@/components/page/Cards';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { localeTags } from '@/i18n/locales';
import { languageNotices } from '@/i18n/messages/common';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

// Where links to a language that is not published yet land (languageHref). It is never indexed.
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).common.comingSoonPage;
  return {
    ...pageMetadata({ lang, title: t.title, description: t.description, path: routes.comingSoon }),
    robots: { index: false, follow: false },
  };
}

export default async function ComingSoonPage() {
  const lang = await getLocale();
  const t = getMessages(lang).common;
  return <PageLayout>
    <PageIntro title={t.languageComingSoon} lead={t.comingSoonPage.lead} />
    <CardGrid>
      {(['es', 'pt'] as const).map(locale => <InfoCard key={locale} title={languageNotices[locale].title} lang={localeTags[locale]}>
        <p>{languageNotices[locale].body}</p>
      </InfoCard>)}
    </CardGrid>
  </PageLayout>;
}
