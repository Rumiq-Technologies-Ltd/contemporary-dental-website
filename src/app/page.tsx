import { Hero } from '@/components/sections/Hero';
import { Steps } from '@/components/sections/Steps';
import { Problems } from '@/components/sections/Problems';
import { Services } from '@/components/sections/Services';
import { Advantages } from '@/components/sections/Advantages';
import { WhyUs } from '@/components/sections/WhyUs';
import { Emergency } from '@/components/sections/Emergency';
import { Team } from '@/components/sections/Team';
import { Offices } from '@/components/sections/Offices';
import { FaqBand } from '@/components/sections/HomeBands';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { JsonLd } from '@/components/page/JsonLd';
import { routes, site, whenOcoee } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { practiceStructuredData } from '@/lib/structuredData';

export const metadata = pageMetadata({
  title: 'Dental Care',
  absoluteTitle: whenOcoee(`Dental Care in Orlando and Ocoee | ${site.name}`, `Dental Care in Orlando | ${site.name}`),
  description: whenOcoee(
    'Honest, patient-focused dental care in Orlando and Ocoee. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
    'Honest, patient-focused dental care in Orlando. Routine care, emergency visits, implants, cosmetic treatment and clear aligners.',
  ),
  path: routes.home,
});

// Order follows the visitor's decision: the promise and the action, how a visit works, the
// problem they came with, everything we treat, why us, urgent care, the people, where we are,
// then the answers that remove the last objections. The footer closes with the action again.
export default function HomePage() {
  return <>
    <main id="main-content" className="page-shell">
      <Hero />
      <Steps />
      <Problems />
      <Services />
      <Advantages />
      <WhyUs />
      <Emergency />
      <Team />
      <Offices />
      <FaqBand />
    </main>
    <div className="page-shell"><SiteFooter /></div>
    <JsonLd data={practiceStructuredData()} />
  </>;
}
