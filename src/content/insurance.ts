import type { Locale } from '@/i18n/locales';
import { money } from '@/i18n/messages/money';

export interface InsuranceLists {
  ppo: readonly string[];
  discount: readonly string[];
  medicare: readonly string[];
}

export interface FinancialPolicyItem {
  term: string;
  text: string;
}

// Plan lists from the content file. Plan names are never translated. The governed documents name
// only 11 PPO plans, so "and more" stays until the complete Insurance List (26 PPO plans plus the
// discount and Medicare lists) replaces this one.
const ppoPlans = ['Aetna', 'Ameritas', 'Anthem Blue Cross Blue Shield', 'Cigna', 'Delta Dental (PPO and Premier)', 'Guardian', 'Humana', 'MetLife', 'Principal', 'United Concordia', 'UnitedHealthcare'] as const;
const discountPlans = ['Anthem BCBS 200', 'Careington (Platinum, POS and 500 Series)', 'Cigna', 'UnitedHealthcare'] as const;
const medicarePlans = ['Argus/Aflac', 'Cigna', 'DentaQuest Medicare', 'Delta Dental Advantage/Molina', 'Humana Medicare', 'UnitedHealthcare'] as const;

/** The plan lists for one language. Only the closing "and more" is translated. */
export function getInsuranceLists(lang: Locale): InsuranceLists {
  return {
    ppo: [...ppoPlans, money[lang].insuranceLists.andMore],
    discount: discountPlans,
    medicare: medicarePlans,
  };
}

export const financingPartners = ['Alphaeon', 'CareCredit', 'Sunbit', 'Afterpay', 'Klarna'] as const;

/** "A, B, C and D": the financing partners as a sentence list, with the word for "and" in the page language. */
export function formatPartnerList(and: string): string {
  const last = financingPartners[financingPartners.length - 1];
  return `${financingPartners.slice(0, -1).join(', ')} ${and} ${last}`;
}

// Summary of the financial policy. Replace with the approved Financial Policy &
// Appointment Agreement wording, verbatim, before launch.
export function getFinancialPolicy(lang: Locale): readonly FinancialPolicyItem[] {
  const policy = money[lang].financialPolicy;
  return [
    policy.cancellations,
    policy.lateCancellation,
    policy.weekends,
    policy.deposit,
    policy.balances,
    policy.insurance,
    policy.questions,
  ];
}
