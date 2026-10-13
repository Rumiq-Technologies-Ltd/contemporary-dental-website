import { appointmentFormEnabled, formatAddress, offices, site, whenOcoee } from './site';
import type { Office } from './site';

export interface FaqItem {
  question: string;
  answer: string;
}

const officeLine = (office: Office) => `${office.name}: ${formatAddress(office)}.`;
const hoursAnswer = whenOcoee(
  'Orlando is open Monday to Friday, 8:00am to 5:00pm, and one Saturday a month. The Saturday changes, so please call to check. Ocoee is open Monday, 9:00am to 5:00pm.',
  'Orlando is open Monday to Friday, 8:00am to 5:00pm, and one Saturday a month. The Saturday changes, so please call to check.',
);

// Answers are verbatim from the content file. Every answer that mentions Ocoee
// switches with the Ocoee hold. The Haitian Creole and French answer must stay
// as written until a qualified interpretation route exists.
export const faqs: readonly FaqItem[] = [
  { question: 'Where are your offices?', answer: offices.map(officeLine).join(' ') },
  { question: 'What are your hours?', answer: hoursAnswer },
  {
    question: 'Are you open 24 hours?',
    answer: "No. Calls outside office hours are answered and passed to our team, who will call you back. Same-day emergency care is often available, but after-hours treatment depends on availability and can't be promised.",
  },
  {
    question: 'What if I have a dental emergency after hours?',
    answer: `Call ${site.afterHoursPhone}. Your call is answered and passed to our team, who will call you back. For trouble breathing or swallowing, or a serious injury to your head or face, call 911.`,
  },
  {
    question: 'Can I book an appointment online?',
    // The request form is on hold (see appointmentFormEnabled), so the answer points to the phone.
    answer: appointmentFormEnabled
      ? 'Not at the moment. Request an appointment through our form, or call your office.'
      : 'Not at the moment. Please call your office to request an appointment.',
  },
  { question: 'Are emergency visits open to new patients?', answer: 'Yes.' },
  {
    question: 'Can I have a tooth removed on the same day?',
    answer: 'Extractions are one of our same-day services, subject to clinical suitability and availability.',
  },
  {
    question: 'Do you offer same-day crowns?',
    answer: 'No. Crowns need a dental laboratory case, so they are not completed on the same day. Our same-day services are extractions and implant placement, plus emergency first-stage treatment.',
  },
  {
    question: 'Do you accept my insurance?',
    answer: "See our insurance list. Insurance is always an estimate, so call us and we'll verify your benefits before treatment.",
  },
  { question: 'Do you accept Medicaid?', answer: 'No.' },
  {
    question: 'Do you offer payment plans or financing?',
    answer: "Yes. We work with Alphaeon, CareCredit, Sunbit, Afterpay and Klarna, and we offer in-house payment plans. Financing is subject to approval and the lender's terms.",
  },
  {
    question: 'Do you do root canal treatment?',
    answer: whenOcoee(
      'Yes, at our Orlando office. Ocoee patients who need root canal treatment are scheduled at Orlando.',
      'Yes, at our Orlando office.',
    ),
  },
  {
    question: 'Is Dr. Khan an orthodontist?',
    answer: whenOcoee(
      'No. Dr. Khan is a general dentist, and no orthodontist works in either office.',
      'No. Dr. Khan is a general dentist, and no orthodontist works in our office.',
    ),
  },
  {
    question: 'What if I need an appointment on a weekend?',
    answer: "We are open one Saturday a month. Weekend and after-hours emergency appointments are often available. Call us, and we'll tell you what we can do.",
  },
  {
    question: 'Do you speak Spanish or Portuguese?',
    answer: 'Members of our team speak Spanish and Portuguese, but availability depends on who is in. Please call ahead.',
  },
  {
    question: 'Do you speak Haitian Creole or French?',
    answer: 'Please call our office and tell us about your language needs.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Please give 48 hours’ notice. A late cancellation or missed appointment is $50 on a weekday and $100 on a weekend. Our full financial policy is on the Payment and financing page.',
  },
  {
    question: "I'm nervous about dental visits. What can I do?",
    answer: "Tell us when you book, and we'll plan your visit around what helps.",
  },
];
