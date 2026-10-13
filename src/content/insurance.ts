// Plan lists from the content file. The governed documents name only 11 PPO plans,
// so "and more" stays until the complete Insurance List (26 PPO plans plus the
// discount and Medicare lists) replaces this one.
export const insuranceLists = {
  ppo: ['Aetna', 'Ameritas', 'Anthem Blue Cross Blue Shield', 'Cigna', 'Delta Dental (PPO and Premier)', 'Guardian', 'Humana', 'MetLife', 'Principal', 'United Concordia', 'UnitedHealthcare', 'and more'],
  discount: ['Anthem BCBS 200', 'Careington (Platinum, POS and 500 Series)', 'Cigna', 'UnitedHealthcare'],
  medicare: ['Argus/Aflac', 'Cigna', 'DentaQuest Medicare', 'Delta Dental Advantage/Molina', 'Humana Medicare', 'UnitedHealthcare'],
} as const;

export const financingPartners = ['Alphaeon', 'CareCredit', 'Sunbit', 'Afterpay', 'Klarna'] as const;

// Summary of the financial policy. Replace with the approved Financial Policy &
// Appointment Agreement wording, verbatim, before launch.
export const financialPolicy: readonly { term: string; text: string }[] = [
  { term: 'Cancellations', text: 'Please give 48 hours’ notice to cancel or reschedule.' },
  { term: 'Late cancellation or missed appointment', text: '$50 on a weekday, $100 on a weekend.' },
  { term: 'Weekends', text: 'A missed weekend appointment without timely cancellation forfeits future weekend scheduling.' },
  { term: 'Deposit', text: 'A $150 deposit reserves a treatment appointment.' },
  { term: 'Balances', text: 'We send a courtesy text before charging a balance to your card on file.' },
  { term: 'Insurance', text: 'Insurance estimates and pre-determinations are not guarantees of payment.' },
  { term: 'Questions', text: 'For a question or dispute about a charge, fee or deposit, call the office and speak with a team member.' },
];
