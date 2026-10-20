import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OfficeBlock } from '@/components/page/OfficeBlock';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { officePath, offices } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

interface OfficePageProps {
  params: Promise<{ office: string }>;
}

// One page per office (/locations/orlando, /locations/ocoee), so ads for an area land on that
// office's address, phone, hours, services, map and directions. Only enabled offices are built;
// any other address returns the not-found page.
export const dynamicParams = false;

export function generateStaticParams(): { office: string }[] {
  return offices.map(office => ({ office: office.id }));
}

async function findOffice(params: OfficePageProps['params']) {
  const id = (await params).office;
  return offices.find(office => office.id === id);
}

export async function generateMetadata({ params }: OfficePageProps): Promise<Metadata> {
  const office = await findOffice(params);
  if (!office) return {};
  const lang = await getLocale();
  const t = getMessages(lang).locations[office.id];
  return pageMetadata({ lang, title: t.metaTitle, description: t.metaDescription, path: officePath(office) });
}

export default async function OfficePage({ params }: OfficePageProps) {
  const office = await findOffice(params);
  if (!office) notFound();
  const lang = await getLocale();
  const t = getMessages(lang).locations[office.id];
  return <PageLayout>
    {/* The h1 names the office once; the call button and the section heading would repeat it, and the
        phone number is in the details table. */}
    <PageIntro title={t.pageHeading} />
    <OfficeBlock office={office} hideTitle />
  </PageLayout>;
}
