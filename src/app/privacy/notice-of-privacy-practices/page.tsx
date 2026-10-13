import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { Notice } from '@/components/page/Section';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = {
  ...pageMetadata({
    title: 'Notice of Privacy Practices',
    description: 'The HIPAA Notice of Privacy Practices for Contemporary Dental Care.',
    path: '/privacy/notice-of-privacy-practices',
  }),
  robots: { index: false, follow: true },
};

// HOLD: insert the approved HIPAA Notice of Privacy Practices from the intake pack,
// verbatim. Do not paraphrase it.
export default function NoticeOfPrivacyPracticesPage() {
  return <PageLayout>
    <PageIntro title="Notice of Privacy Practices" />
    <Notice>The approved Notice of Privacy Practices will be published here. Until then, email <a href={`mailto:${site.email}`}>{site.email}</a> or call your office to ask for a copy.</Notice>
  </PageLayout>;
}
