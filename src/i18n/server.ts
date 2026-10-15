import { notFound } from 'next/navigation';
import { lang } from 'next/root-params';
import { defaultLocale, isLocale, type Locale } from './locales';

/**
 * The language of the current request, read from the [lang] route segment. Any Server
 * Component can call this without the value being passed down as a prop.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

/** For pages that exist in English only: every other language gets the not-found page. */
export async function requireEnglish(): Promise<void> {
  if ((await getLocale()) !== defaultLocale) notFound();
}
