import { FaqList } from '@/components/page/FaqList';
import { JsonLd } from '@/components/page/JsonLd';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { faqs } from '@/content/faq';
import { routes } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Frequently Asked Questions',
  description: 'Answers about our offices, hours, emergency care, insurance, payment plans, languages and cancellations.',
  path: routes.faq,
});

// Structured data repeats exactly the questions and answers shown on the page.
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
};

export default function FaqPage() {
  return <PageLayout>
    <PageIntro title="Frequently asked questions" />
    <FaqList items={faqs} />
    <JsonLd data={structuredData} />
  </PageLayout>;
}
