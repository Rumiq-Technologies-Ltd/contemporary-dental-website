import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Screen } from '@/components/layout/Screen';
import { routes } from '@/content/site';
import { homepageTestimonials, type Testimonial } from '@/content/testimonials';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './reviews.module.css';

/**
 * Patient reviews, word for word, as white cards in columns. The reviews are in English on every
 * language version, so each card is marked lang="en". Which reviews may show where is decided in
 * src/content/testimonials.ts.
 */
export function ReviewList({ reviews }: { reviews: readonly Testimonial[] }) {
  return <ul className={styles.list} data-stagger="">
    {reviews.map((review, index) => <li key={review.id} style={{ '--i': index % 3 } as CSSProperties}>
      <figure className={styles.card} data-reveal="" lang="en">
        <span className={styles.mark} aria-hidden="true">“</span>
        <blockquote><p>{review.quote}</p></blockquote>
        <figcaption>{review.name}</figcaption>
      </figure>
    </li>)}
  </ul>;
}

// The homepage band: the reviews cleared for the homepage, then a link to every published review.
// Renders nothing until at least one review is cleared.
export async function Reviews() {
  if (homepageTestimonials.length === 0) return null;
  const lang = await getLocale();
  const t = getMessages(lang).home.reviews;

  return <Screen id="reviews" labelledBy="reviews-title" className={styles.reviews}>
    <h2 id="reviews-title" data-reveal="mask">{t.heading}</h2>
    <ReviewList reviews={homepageTestimonials} />
    <div data-reveal=""><Link href={localePath(lang, routes.reviews)} className="pill pill-accent pill-large">{t.allReviews}</Link></div>
  </Screen>;
}
