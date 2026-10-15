import type { Metadata } from 'next';
import Link from 'next/link';
import { CardGrid } from '@/components/page/Cards';
import { JsonLd } from '@/components/page/JsonLd';
import { OfficeCard } from '@/components/page/OfficeCard';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { offices, routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import { practiceStructuredData } from '@/lib/structuredData';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = getMessages(lang).locations.index;
  return pageMetadata({ lang, title: meta.title, description: meta.description, path: routes.locations });
}

// HOLD: the Ocoee entry follows the Ocoee decision (ocoeeEnabled in content/site.ts).
export default async function LocationsPage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  return <PageLayout>
    <PageIntro title={messages.locations.index.title} />
    <CardGrid>{offices.map(office => <OfficeCard key={office.id} office={office} />)}</CardGrid>
    <p className={styles.meta}>
      {offices.map((office, index) => <span key={office.id}>
        {index > 0 && ' · '}
        <Link className={styles.link} href={localePath(lang, office.path)}>{fill(messages.common.officeButton, { name: office.name })}</Link>
      </span>)}
    </p>
    <JsonLd data={practiceStructuredData(lang)} />
  </PageLayout>;
}
