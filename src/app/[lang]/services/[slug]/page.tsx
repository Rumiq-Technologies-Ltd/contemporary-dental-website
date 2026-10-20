import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CardGrid, LinkCard } from '@/components/page/Cards';
import { CallButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose, Section } from '@/components/page/Section';
import { TreatmentIllustrations } from '@/components/sections/TreatmentIllustrations';
import { findService, getServicePages } from '@/content/services';
import { offices } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { defaultLocale, localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import { serviceStructuredData } from '@/lib/structuredData';
import { JsonLd } from '@/components/page/JsonLd';
import styles from '@/components/page/page.module.css';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Every service page is prerendered; unknown slugs return the not-found page.
export const dynamicParams = false;

// The slugs are service codes, the same in every language.
export function generateStaticParams(): { slug: string }[] {
  return getServicePages(defaultLocale).map(service => ({ slug: service.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const lang = await getLocale();
  const service = findService(lang, (await params).slug);
  if (!service) return {};
  return pageMetadata({ lang, title: service.titleTag, description: service.description, path: service.href });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const lang = await getLocale();
  const t = getMessages(lang).services;
  const service = findService(lang, (await params).slug);
  if (!service) notFound();
  const related = getServicePages(lang).filter(item => item.id !== service.id);
  const paragraphs = <>
    {service.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    {service.note && <p><em>{service.note}</em></p>}
  </>;
  return <PageLayout>
    <PageIntro title={service.heading} lead={service.lead} />
    {service.plainIntro
      ? <Prose>{paragraphs}</Prose>
      : <div className={styles.split}>
        <Prose>
          {paragraphs}
          <div className={styles.actions}>
            {offices.map(office => <CallButton key={office.id} office={office} />)}
          </div>
        </Prose>
        <PagePhoto photo={service.image} priority />
      </div>}
    <TreatmentIllustrations service={service.id} />
    <Section id="more-services" title={t.detail.otherServices} wide>
      <CardGrid>
        {related.map(item => <LinkCard key={item.id} title={item.title} href={localePath(lang, item.href)} />)}
      </CardGrid>
    </Section>
    <JsonLd data={serviceStructuredData(service, lang)} />
  </PageLayout>;
}
