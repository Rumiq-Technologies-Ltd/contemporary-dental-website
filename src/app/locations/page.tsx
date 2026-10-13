import Link from 'next/link';
import { CardGrid } from '@/components/page/Cards';
import { JsonLd } from '@/components/page/JsonLd';
import { OfficeCard } from '@/components/page/OfficeCard';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { offices, routes } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { practiceStructuredData } from '@/lib/structuredData';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'Our Locations',
  description: 'Addresses, phone numbers and hours for Contemporary Dental Care.',
  path: routes.locations,
});

// HOLD: the Ocoee entry follows the Ocoee decision (ocoeeEnabled in content/site.ts).
export default function LocationsPage() {
  return <PageLayout>
    <PageIntro title="Our locations" />
    <CardGrid>{offices.map(office => <OfficeCard key={office.id} office={office} />)}</CardGrid>
    <p className={styles.meta}>
      {offices.map((office, index) => <span key={office.id}>{index > 0 && ' · '}<Link className={styles.link} href={office.path}>{office.name} office</Link></span>)}
    </p>
    <JsonLd data={practiceStructuredData()} />
  </PageLayout>;
}
