import type { Metadata } from 'next';
import { CardGrid, LinkCard } from '@/components/page/Cards';
import { ClosingBand } from '@/components/page/ClosingBand';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { getServices } from '@/content/services';
import { routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).services.index.meta;
  return pageMetadata({ lang, title: t.title, description: t.description, path: routes.services });
}

export default async function ServicesPage() {
  const lang = await getLocale();
  const t = getMessages(lang).services.index;
  return <PageLayout>
    <PageIntro title={t.title} lead={whenOcoee(t.lead.withOcoee, t.lead.orlandoOnly)} />
    <CardGrid>
      {getServices(lang).map(service => <LinkCard key={service.id} title={service.title} href={localePath(lang, service.href)}>{service.description}</LinkCard>)}
    </CardGrid>
    <ClosingBand />
  </PageLayout>;
}
