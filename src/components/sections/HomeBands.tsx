import Link from 'next/link';
import { getFaqs, homepageFaqs } from '@/content/faq';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { FaqList } from '@/components/page/FaqList';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './home.module.css';

// Questions that answer the most common objections before a visit, picked by their fixed codes
// (homepageFaqs), so they match in every language.
export async function FaqBand() {
  const lang = await getLocale();
  const t = getMessages(lang).home.faq;
  const faqs = getFaqs(lang);
  // Answers stay verbatim from the content file.
  const featured = homepageFaqs.flatMap(id => faqs.filter(item => item.id === id));

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
