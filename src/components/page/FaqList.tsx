import Link from 'next/link';
import type { FaqItem } from '@/content/faq';
import styles from './page.module.css';

// Native disclosure elements keep the list keyboard and screen-reader friendly without JavaScript.
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return <div className={styles.faq} data-stagger="">
    {items.map(item => <details key={item.question} data-reveal="">
      <summary>{item.question}</summary>
      <p><FaqAnswer item={item} /></p>
    </details>)}
  </div>;
}

// The answer is plain text except for one phrase that links (for example "insurance list").
// If the label is missing from the answer, the answer shows as plain text rather than breaking.
function FaqAnswer({ item }: { item: FaqItem }) {
  const { link } = item;
  const start = link ? item.answer.indexOf(link.label) : -1;
  if (!link || start === -1) return <>{item.answer}</>;
  const end = start + link.label.length;
  return <>
    {item.answer.slice(0, start)}
    <Link href={link.href} className={styles.answerLink}>{link.label}</Link>
    {item.answer.slice(end)}
  </>;
}
