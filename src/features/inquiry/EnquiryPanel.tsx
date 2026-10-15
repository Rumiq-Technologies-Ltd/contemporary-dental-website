import { appointmentFormEnabled, primaryOffice } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import type { InquiryInput } from '@/lib/validations/inquiry';
import { EnquiryForm } from './EnquiryForm';

/**
 * The enquiry form for one page. It renders nothing while appointmentFormEnabled is false, which is the
 * launch state until the email provider's BAA is confirmed in writing; the page's call buttons stay.
 */
export async function EnquiryPanel({ source }: { source: InquiryInput['source'] }) {
  if (!appointmentFormEnabled) return null;
  const lang = await getLocale();
  const t = getMessages(lang).enquiry.form;
  const labels = {
    ...t,
    failed: fill(t.failed, { phone: primaryOffice.phone }),
    fallback: fill(t.fallback, { phone: primaryOffice.phone }),
  };
  return <section aria-labelledby="enquiry-title">
    <h2 id="enquiry-title">{t.heading}</h2>
    <p>{t.intro}</p>
    <EnquiryForm labels={labels} source={source} thankYouHref={localePath(lang, '/thank-you')} />
    <p>{labels.fallback}</p>
  </section>;
}
