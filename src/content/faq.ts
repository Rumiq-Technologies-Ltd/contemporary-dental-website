import { appointmentFormEnabled, formatAddress, offices, routes, site, whenOcoee } from './site';
import type { Office } from './site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { localePath, type Locale } from '@/i18n/locales';

/** Fixed codes, so a page can pick questions (for example the homepage) without matching text. */
export type FaqId =
  | 'offices' | 'hours' | 'open24Hours' | 'afterHoursEmergency' | 'bookOnline' | 'emergencyNewPatients'
  | 'sameDayExtraction' | 'sameDayCrowns' | 'insurance' | 'medicaid' | 'financing' | 'rootCanal'
  | 'orthodontist' | 'weekend' | 'haitianCreole' | 'cancellation' | 'nervous';

/** A phrase inside the answer that links to a page. The label must appear word for word in the answer. */
export interface FaqLink {
  label: string;
  href: string;
}

export interface FaqItem {
  id: FaqId;
  question: string;
  answer: string;
  link?: FaqLink;
}

/** The questions the homepage shows, in this order. */
export const homepageFaqs: readonly FaqId[] = ['bookOnline', 'afterHoursEmergency', 'emergencyNewPatients', 'insurance', 'financing', 'cancellation', 'nervous'];

/**
 * Homepage questions that the FAQ page leaves out, so a visitor does not read the same question
 * twice. The other homepage questions stay on the FAQ page too.
 */
export const homepageOnlyFaqs: readonly FaqId[] = ['insurance', 'financing', 'cancellation', 'nervous'];

// Questions and answers live in src/i18n/messages/visit.ts. They are verbatim from the content
// file. Every answer that mentions Ocoee switches with the Ocoee hold. The Haitian Creole
// answer is the practice's own wording of 20 October 2026; see the C14 §6 note beside it in visit.ts.
export function getFaqs(lang: Locale): readonly FaqItem[] {
  const t = getMessages(lang).visit.faq;
  const items = t.items;
  const officeLine = (office: Office): string => fill(t.officeLine, { name: office.name, address: formatAddress(office) });
  return [
    { id: 'offices', question: items.offices.question, answer: offices.map(officeLine).join(' ') },
    { id: 'hours', question: items.hours.question, answer: whenOcoee(items.hours.answer.withOcoee, items.hours.answer.orlandoOnly) },
    { id: 'open24Hours', question: items.open24Hours.question, answer: items.open24Hours.answer },
    {
      id: 'afterHoursEmergency',
      question: items.afterHoursEmergency.question,
      answer: fill(items.afterHoursEmergency.answer, { phone: site.afterHoursPhone }),
    },
    {
      id: 'bookOnline',
      question: items.bookOnline.question,
      // The request form is on hold (see appointmentFormEnabled), so the answer points to the phone.
      answer: appointmentFormEnabled ? items.bookOnline.answer.withForm : items.bookOnline.answer.callOnly,
    },
    { id: 'emergencyNewPatients', question: items.emergencyNewPatients.question, answer: items.emergencyNewPatients.answer },
    { id: 'sameDayExtraction', question: items.sameDayExtraction.question, answer: items.sameDayExtraction.answer },
    { id: 'sameDayCrowns', question: items.sameDayCrowns.question, answer: items.sameDayCrowns.answer },
    {
      id: 'insurance',
      question: items.insurance.question,
      answer: items.insurance.answer,
      link: { label: items.insurance.linkLabel, href: localePath(lang, routes.insurance) },
    },
    { id: 'medicaid', question: items.medicaid.question, answer: items.medicaid.answer },
    { id: 'financing', question: items.financing.question, answer: items.financing.answer },
    { id: 'rootCanal', question: items.rootCanal.question, answer: whenOcoee(items.rootCanal.answer.withOcoee, items.rootCanal.answer.orlandoOnly) },
    { id: 'orthodontist', question: items.orthodontist.question, answer: whenOcoee(items.orthodontist.answer.withOcoee, items.orthodontist.answer.orlandoOnly) },
    { id: 'weekend', question: items.weekend.question, answer: items.weekend.answer },
    // Review: the owner checks this answer's translations in src/i18n/messages/visit.ts.
    { id: 'haitianCreole', question: items.haitianCreole.question, answer: items.haitianCreole.answer },
    {
      id: 'cancellation',
      question: items.cancellation.question,
      answer: items.cancellation.answer,
      link: { label: items.cancellation.linkLabel, href: localePath(lang, routes.financialPolicy) },
    },
    { id: 'nervous', question: items.nervous.question, answer: items.nervous.answer },
  ];
}
