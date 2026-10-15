import type { FaqItem } from '@/content/faq';
import styles from './page.module.css';

// Native disclosure elements keep the list keyboard and screen-reader friendly without JavaScript.
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return <div className={styles.faq} data-stagger="">
    {items.map(item => <details key={item.question} data-reveal="">
      <summary>{item.question}</summary>
      <p>{item.answer}</p>
    </details>)}
  </div>;
}
