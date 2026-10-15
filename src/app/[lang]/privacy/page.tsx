import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { Notice, Prose, Section } from '@/components/page/Section';
import { formatAddress, offices, routes, site } from '@/content/site';
import { defaultLocale } from '@/i18n/locales';
import { requireEnglish } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

// English only: other languages get the not-found page.
export async function generateMetadata(): Promise<Metadata> {
  await requireEnglish();
  return {
    ...pageMetadata({
      lang: defaultLocale,
      englishOnly: true,
      title: 'Privacy Policy',
      description: 'How Contemporary Dental Care handles information, and where to find our HIPAA Notice of Privacy Practices.',
      path: routes.privacy,
    }),
    robots: { index: false, follow: true },
  };
}

// HOLD: no outside counsel is engaged. Counsel must write or review the full text before
// publishing. This follows the content file's outline and states only configured facts.
// Not yet written: service providers, children, privacy contact (no privacy officer is named).
export default async function PrivacyPolicyPage() {
  await requireEnglish();
  return <PageLayout>
    <PageIntro title="Privacy policy" />
    <Notice>This policy is a draft and is being reviewed. It will be updated before the website launches.</Notice>
    <Section id="who-we-are" title="Who we are">
      <Prose>
        <p>{site.legalName}.</p>
        {offices.map(office => <p key={office.id}>{office.name}: {formatAddress(office)}</p>)}
        <p>Email: <a href={`mailto:${site.email}`}>{site.email}</a></p>
      </Prose>
    </Section>
    <Section id="information-you-send" title="Information you send through this website">
      <Prose><p>Please don&apos;t send health information through this website. To request an appointment or ask about your care, call your office.</p></Prose>
    </Section>
    <Section id="health-information" title="Health information">
      <Prose><p>Health information is protected under HIPAA. Read our <Link href={routes.noticeOfPrivacyPractices}>Notice of Privacy Practices</Link>.</p></Prose>
    </Section>
    <Section id="cookies" title="Cookies, analytics and advertising">
      <Prose>
        <p>This website does not use analytics, advertising tags or session replay.</p>
        <p>If you use the heart button on a service, your browser stores that service&apos;s name on your device so the heart stays selected. It is not sent to us.</p>
      </Prose>
    </Section>
    <Section id="your-choices" title="Your choices and requests">
      <Prose><p>To ask about your information, email <a href={`mailto:${site.email}`}>{site.email}</a> or call your office.</p></Prose>
    </Section>
    <Section id="updates" title="Updates">
      <Prose><p>Last updated: 13 October 2026.</p></Prose>
    </Section>
  </PageLayout>;
}
