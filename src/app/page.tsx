import { Hero } from '@/components/sections/Hero';
import { Advantages } from '@/components/sections/Advantages';
import { Services } from '@/components/sections/Services';
import { ClosingSection, NewPatientsBand, OfficesBand, SameDayBand } from '@/components/sections/HomeBands';
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

// App Router server page: marketing content is prerendered, not fetched on visits.
export default function HomePage() {
  return <>
    <main id="main-content" className="page-shell">
      <Hero />
      <SameDayBand />
      <Services />
      <Advantages />
      <OfficesBand />
      <NewPatientsBand />
      <ClosingSection />
    </main>
    <div className="page-shell"><SiteFooter /></div>
    <JsonLd data={practiceStructuredData()} />
  </>;
}
