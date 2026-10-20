import type { Metadata } from 'next';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { ReviewList } from '@/components/sections/Reviews';
import { routes } from '@/content/site';
import { reviewsPageTestimonials } from '@/content/testimonials';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/sections/reviews.module.css';

// The published reviews the homepage leaves out, so none repeats what the homepage shows. This page
// is not an ad landing page, so reviews held only from the homepage may appear here
// (src/content/testimonials.ts).
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).home.reviews;
  return pageMetadata({ lang, title: t.pageTitle, description: t.pageDescription, path: routes.reviews });
}

export default async function ReviewsPage() {
  const lang = await getLocale();
  const t = getMessages(lang).home.reviews;
  return <PageLayout>
    <PageIntro title={t.pageTitle} lead={t.pageLead} />
    <section className={styles.band} aria-label={t.pageTitle}>
      <ReviewList reviews={reviewsPageTestimonials} />
    </section>
  </PageLayout>;
}
