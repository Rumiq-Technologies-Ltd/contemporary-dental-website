import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { Services } from '@/components/sections/Services';
import { routes, whenOcoee } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).services.index.meta;
  return pageMetadata({ lang, title: t.title, description: t.description, path: routes.services });
}

// Each service links to its own page, which carries its treatment illustrations and office details.
export default async function ServicesPage() {
  const lang = await getLocale();
  const t = getMessages(lang).services.index;
  return <PageLayout>
    <PageIntro title={t.title} lead={whenOcoee(t.lead.withOcoee, t.lead.orlandoOnly)} />
    <div id="services">
      <Services />
    </div>
  </PageLayout>;
}
