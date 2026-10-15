import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CardGrid, LinkCard } from '@/components/page/Cards';
import { CallButton, RequestAppointmentButton } from '@/components/page/Actions';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { Prose, Section } from '@/components/page/Section';
import { findService, servicePages } from '@/content/services';
import { pageMetadata } from '@/lib/metadata';
import { serviceStructuredData } from '@/lib/structuredData';
import { JsonLd } from '@/components/page/JsonLd';
import styles from '@/components/page/page.module.css';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Every service page is prerendered; unknown slugs return the not-found page.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return servicePages.map(service => ({ slug: service.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return pageMetadata({ title: service.titleTag, description: service.description, path: service.href });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = findService((await params).slug);
  if (!service) notFound();
  const related = servicePages.filter(item => item.id !== service.id);
  return <PageLayout>
    <PageIntro title={service.heading} />
    <div className={styles.split}>
      <Prose>
        {service.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <div className={styles.actions}>
          <RequestAppointmentButton />
          <CallButton />
        </div>
      </Prose>
      <PagePhoto photo={service.image} priority />
    </div>
    <Section id="more-services" title="Other services" wide>
      <CardGrid>
        {related.map(item => <LinkCard key={item.id} title={item.title} href={item.href} />)}
      </CardGrid>
    </Section>
    <JsonLd data={serviceStructuredData(service)} />
  </PageLayout>;
}
