'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main id="main-content" className="message-page"><h1>A little interruption.</h1><p>Please try loading this page again.</p><button type="button" className="pill pill-accent pill-large" onClick={reset}>Try again</button></main>;
}
