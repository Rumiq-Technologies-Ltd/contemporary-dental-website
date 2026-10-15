import type { Metadata } from 'next';
import { FaqList } from '@/components/page/FaqList';
import { JsonLd } from '@/components/page/JsonLd';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { getFaqs } from '@/content/faq';
import { routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { localeTags } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).visit.faq.meta;
  return pageMetadata({ lang, title: t.title, description: t.description, path: routes.faq });
}

export default async function FaqPage() {
  const lang = await getLocale();
  const faqs = getFaqs(lang);
  // Structured data repeats exactly the questions and answers shown on the page.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: localeTags[lang],
    mainEntity: faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };
  return <PageLayout>
    <PageIntro title={getMessages(lang).visit.faq.title} />
    <FaqList items={faqs} />
    <JsonLd data={structuredData} />
  </PageLayout>;
}
