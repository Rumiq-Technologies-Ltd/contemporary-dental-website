'use client';

import { BeforeAfterCard, type CarouselCase, type CardLabels } from './BeforeAfterCard';
import styles from './beforeAfter.module.css';

// The treatment illustrations on a service page or the services index: every card visible at once,
// in a grid. The home page uses the carousel instead, which scrolls through its cards.
export function IllustrationGrid({ cases, labels }: { cases: readonly CarouselCase[]; labels: CardLabels }) {
  return <ul className={styles.illustrations}>
    {cases.map(item => <BeforeAfterCard key={item.id} item={item} labels={labels} />)}
  </ul>;
}
