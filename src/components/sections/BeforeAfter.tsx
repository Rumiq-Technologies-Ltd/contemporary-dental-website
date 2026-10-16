import { beforeAfterCases } from '@/content/beforeAfter';
import { Screen } from '@/components/layout/Screen';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { BeforeAfterCarousel, type CarouselLabels } from './BeforeAfterCarousel';
import { cardLabels, toCarouselCases } from './beforeAfterItems';
import styles from './beforeAfter.module.css';

// "How our treatments look": before-and-after illustrations on the home page. It renders nothing
// when no case passes the filter in content/beforeAfter.ts.
export async function BeforeAfter() {
  const cases = beforeAfterCases();
  if (cases.length === 0) return null;

  const lang = await getLocale();
  const t = getMessages(lang).home.beforeAfter;

  const labels: CarouselLabels = {
    carousel: t.carousel,
    previous: t.previous,
    next: t.next,
    pause: t.pause,
    play: t.play,
    page: t.page,
    ...cardLabels(t),
  };

  return <Screen id="results" labelledBy="results-title" className={styles.section}>
    <div className={styles.heading}>
      <h2 id="results-title" data-reveal="mask">{t.heading}</h2>
      <p className={styles.intro} data-reveal="">{t.intro}</p>
    </div>
    <BeforeAfterCarousel cases={toCarouselCases(cases, lang, t)} labels={labels} />
    <p className={styles.disclaimer} data-reveal="">{t.disclaimer}</p>
  </Screen>;
}
