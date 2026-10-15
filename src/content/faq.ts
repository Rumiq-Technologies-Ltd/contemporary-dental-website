import { appointmentFormEnabled, formatAddress, offices, site, whenOcoee } from './site';
import type { Office } from './site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import type { Locale } from '@/i18n/locales';

/** Fixed codes, so a page can pick questions (for example the homepage) without matching text. */
export type FaqId =
  | 'offices' | 'hours' | 'open24Hours' | 'afterHoursEmergency' | 'bookOnline' | 'emergencyNewPatients'
  | 'sameDayExtraction' | 'sameDayCrowns' | 'insurance' | 'medicaid' | 'financing' | 'rootCanal'
  | 'orthodontist' | 'weekend' | 'spanishPortuguese' | 'haitianCreoleFrench' | 'cancellation' | 'nervous';

export interface FaqItem {
  id: FaqId;
  question: string;
  answer: string;
}

// Questions and answers live in src/i18n/messages/visit.ts. They are verbatim from the content
// file. Every answer that mentions Ocoee switches with the Ocoee hold. The Haitian Creole
// and French answer must stay as written, in every language, until a qualified
// interpretation route exists.
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
    { id: 'insurance', question: items.insurance.question, answer: items.insurance.answer },
    { id: 'medicaid', question: items.medicaid.question, answer: items.medicaid.answer },
    { id: 'financing', question: items.financing.question, answer: items.financing.answer },
    { id: 'rootCanal', question: items.rootCanal.question, answer: whenOcoee(items.rootCanal.answer.withOcoee, items.rootCanal.answer.orlandoOnly) },
    { id: 'orthodontist', question: items.orthodontist.question, answer: whenOcoee(items.orthodontist.answer.withOcoee, items.orthodontist.answer.orlandoOnly) },
    { id: 'weekend', question: items.weekend.question, answer: items.weekend.answer },
    { id: 'spanishPortuguese', question: items.spanishPortuguese.question, answer: items.spanishPortuguese.answer },
    // Review: the answer must stay as written until a qualified interpretation route exists. The owner
    // checks its translation in src/i18n/messages/visit.ts.
    { id: 'haitianCreoleFrench', question: items.haitianCreoleFrench.question, answer: items.haitianCreoleFrench.answer },
    { id: 'cancellation', question: items.cancellation.question, answer: items.cancellation.answer },
    { id: 'nervous', question: items.nervous.question, answer: items.nervous.answer },
  ];
}
