import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Steps } from '@/components/sections/Steps';
import { Problems } from '@/components/sections/Problems';
import { Services } from '@/components/sections/Services';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Advantages } from '@/components/sections/Advantages';
import { WhyUs } from '@/components/sections/WhyUs';
import { Team } from '@/components/sections/Team';
import { Offices } from '@/components/sections/Offices';
import { FaqBand } from '@/components/sections/HomeBands';
import { EnquiryPanel } from '@/features/inquiry/EnquiryPanel';
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

// Order follows the visitor's decision: the promise and the action, how a visit works, the
// problem they came with, everything we treat, the results patients have shared, why us, urgent
// care, the people, where we are, then the answers that remove the last objections. The footer
// closes with the action again.
export default async function HomePage() {
  const lang = await getLocale();
  return <>
    <main id="main-content" className="page-shell">
      <Hero />
      <Steps />
      <Problems />
      <Services />
      <BeforeAfter />
      <Advantages />
      <WhyUs />
      <Team />
      <Offices />
      <EnquiryPanel source="/" />
      <FaqBand />
    </main>
    <div className="page-shell"><SiteFooter /></div>
    <JsonLd data={practiceStructuredData(lang)} />
  </>;
}
