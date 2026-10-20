import type { CSSProperties } from 'react';
import { Screen } from '@/components/layout/Screen';
import { publishedTestimonials } from '@/content/testimonials';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import styles from './reviews.module.css';

// Patient reviews, word for word. Only authorized reviews with no hold are shown
// (src/content/testimonials.ts), so the section renders nothing until at least one is cleared.
// The reviews are in English on every language version, so each card is marked lang="en".
export async function Reviews() {
  if (publishedTestimonials.length === 0) return null;
  const lang = await getLocale();
  const t = getMessages(lang).home.reviews;

  return <Screen id="reviews" labelledBy="reviews-title" className={styles.reviews}>
    <h2 id="reviews-title" data-reveal="mask">{t.heading}</h2>
    <ul className={styles.list} data-stagger="">
      {publishedTestimonials.map((review, index) => <li key={review.id} style={{ '--i': index % 3 } as CSSProperties}>
        <figure className={styles.card} data-reveal="" lang="en">
          <span className={styles.mark} aria-hidden="true">“</span>
          <blockquote><p>{review.quote}</p></blockquote>
          <figcaption>{review.name}</figcaption>
        </figure>
      </li>)}
    </ul>
  </Screen>;
}
