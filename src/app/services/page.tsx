import { CardGrid, LinkCard } from '@/components/page/Cards';
import { ClosingBand } from '@/components/page/ClosingBand';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { services } from '@/content/services';
import { routes, whenOcoee } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Dental Services',
  description: 'Cleanings, emergency care, extractions, fillings, crowns, root canal treatment, implants, dentures, clear aligners and braces, and cosmetic dentistry.',
  path: routes.services,
});

export default function ServicesPage() {
  return <PageLayout>
    <PageIntro
      title="Our services"
      lead={`Dr. Sheryar Khan provides our treatment ${whenOcoee('at both offices', 'at our office')}, and our hygienist provides cleanings and check-ups. Some treatment is referred to another provider, including root canal retreatment and some oral surgery. Each service below has its own page.`}
    />
    <CardGrid>
      {services.map(service => <LinkCard key={service.id} title={service.title} href={service.href}>{service.description}</LinkCard>)}
    </CardGrid>
    <ClosingBand />
  </PageLayout>;
}
