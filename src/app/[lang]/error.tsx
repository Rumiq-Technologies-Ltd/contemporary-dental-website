'use client';

import { useParams } from 'next/navigation';
import { common } from '@/i18n/messages/common';
import { defaultLocale, isLocale } from '@/i18n/locales';

// Error boundaries render in the browser, so the language comes from the URL, not from getLocale().
export default function ErrorPage({ reset }: { reset: () => void }) {
  const { lang } = useParams<{ lang: string }>();
  const t = common[isLocale(lang) ? lang : defaultLocale].errorPage;
  return <main id="main-content" className="message-page">
    <h1>{t.heading}</h1>
    <p>{t.body}</p>
    <button type="button" className="pill pill-accent pill-large" onClick={reset}>{t.retry}</button>
  </main>;
}
