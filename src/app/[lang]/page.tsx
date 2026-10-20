import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Steps } from '@/components/sections/Steps';
import { Problems } from '@/components/sections/Problems';
import { FaqBand } from '@/components/sections/HomeBands';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { JsonLd } from '@/components/page/JsonLd';
import { routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import { practiceStructuredData } from '@/lib/structuredData';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).home.meta;
  return pageMetadata({
    lang,
    title: t.title,
    absoluteTitle: whenOcoee(t.absoluteTitle.withOcoee, t.absoluteTitle.orlandoOnly),
    description: whenOcoee(t.description.withOcoee, t.description.orlandoOnly),
    path: routes.home,
  });
}

// Order follows the visitor's decision: the promise, how a visit works and what to expect from the practice,
// the problem they came with, then the answers that remove the last objections. Services, the team, about
// and contact live on their own pages, so each piece of information has one place. The footer closes with the action.
export default async function HomePage() {
  const lang = await getLocale();
  return <>
    <main id="main-content" className="page-shell">
      <Hero />
      <Steps />
      <Problems />
      <FaqBand />
    </main>
    <div className="page-shell"><SiteFooter /></div>
    <JsonLd data={practiceStructuredData(lang)} />
  </>;
}
