import Link from 'next/link';
import { faqs } from '@/content/faq';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { FaqList } from '@/components/page/FaqList';
import styles from './home.module.css';

// Questions that answer the most common objections before a visit. Answers stay verbatim from the content file.
const featuredQuestions = [
  'Can I book an appointment online?',
  'Do you accept my insurance?',
  'Are emergency visits open to new patients?',
  'What if I have a dental emergency after hours?',
  'Do you offer payment plans or financing?',
  'Do you speak Spanish or Portuguese?',
];

export function FaqBand() {
  const featured = featuredQuestions.flatMap(question => faqs.filter(item => item.question === question));
  return <Screen id="faq" labelledBy="faq-title" className={styles.faq}>
    <div className={styles.panel}>
      <div className={styles.faqHeading}>
        <h2 id="faq-title" data-reveal="mask">Frequently asked questions</h2>
        <div data-reveal=""><Link href={routes.faq} className="pill pill-outline pill-large">All questions</Link></div>
      </div>
      <FaqList items={featured} />
    </div>
  </Screen>;
}
