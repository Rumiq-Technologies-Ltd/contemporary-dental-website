import Link from 'next/link';
import { getFaqs } from '@/content/faq';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { FaqList } from '@/components/page/FaqList';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './home.module.css';

// Questions that answer the most common objections before a visit. They are named by their
// English wording, which only identifies the entry: the translated list keeps the English
// order, so the same position gives the question and answer in the visitor's language.
const featuredQuestions = [
  'Can I book an appointment online?',
  'What if I have a dental emergency after hours?',
  'Are emergency visits open to new patients?',
  'Do you accept my insurance?',
  'Do you offer payment plans or financing?',
  'Do you speak Spanish or Portuguese?',
];

export async function FaqBand() {
  const lang = await getLocale();
  const t = getMessages(lang).home.faq;
  const english = getFaqs('en');
  const faqs = getFaqs(lang);
  // Answers stay verbatim from the content file.
  const featured = featuredQuestions.flatMap(question => {
    const index = english.findIndex(item => item.question === question);
    return index === -1 || !faqs[index] ? [] : [faqs[index]];
  });

  return <Screen id="faq" labelledBy="faq-title" className={styles.faq}>
    <div className={styles.panel}>
      <div className={styles.faqHeading}>
        <h2 id="faq-title" data-reveal="mask">{t.heading}</h2>
        <div data-reveal=""><Link href={localePath(lang, routes.faq)} className="pill pill-outline pill-large">{t.allQuestions}</Link></div>
      </div>
      <FaqList items={featured} />
    </div>
  </Screen>;
}
