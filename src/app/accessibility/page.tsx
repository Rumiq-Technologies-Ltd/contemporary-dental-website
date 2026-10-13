import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { Prose } from '@/components/page/Section';
import { routes, site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Accessibility',
  description: 'Our aim to meet WCAG 2.1 Level AA, and how to get help if you have trouble using this website.',
  path: routes.accessibility,
});

// Still to add once supplied: accessible parking and entrance details.
export default function AccessibilityPage() {
  return <PageLayout>
    <PageIntro title="Accessibility" />
    <Prose>
      <p>We aim to make this website meet WCAG 2.1 Level AA. If you have trouble using any part of it, email <a href={`mailto:${site.email}`}>{site.email}</a> or call your office, and we&apos;ll help you by phone.</p>
    </Prose>
  </PageLayout>;
}
