import { ocoeeEnabled } from './site';

export interface TeamMember {
  name: string;
  role: string;
  /** Offices the member works at, already filtered for the Ocoee hold. */
  offices: string;
  languages?: string;
  bio?: string;
}

const both = ocoeeEnabled ? 'Both offices' : 'Orlando';

// Names, roles and bios come from the content file. Photos are held until each
// person's consent is confirmed in writing. Jessica Salazar and Tyrese Brown show
// name and role only until their bios are approved. Bruno Conte André is never
// "Dr.", "dentist" or "treating provider".
export const team: readonly TeamMember[] = [
  { name: 'Dr. Sheryar Khan', role: 'General Dentist and Owner', offices: both },
  { name: 'Jessica Salazar', role: 'Dental Hygienist', offices: both, languages: 'Speaks Spanish.' },
  {
    name: 'Brittini Blankenship', role: 'Regional Dental Manager', offices: both,
    bio: 'Brittini started in dentistry after high school. She trained as a dental assistant and moved through assistant manager and office manager roles to regional management. She leads team development, patient experience, scheduling, billing and collections, marketing, community outreach and practice systems.',
  },
  {
    name: 'Franchesca Avila', role: 'Office Manager and Insurance Coordinator', offices: 'Orlando',
    bio: 'Franchesca has about five years in dentistry and is fluent in English and Spanish. She helps patients understand treatment plans, insurance benefits and financing options.',
  },
  {
    name: 'Amanda Nguyen', role: 'Office Manager', offices: 'Orlando',
    bio: "Amanda holds a bachelor's degree from the University of Florida.",
  },
  { name: 'Néstor Ugalde', role: 'Expanded Functions Dental Assistant', offices: 'Orlando', languages: 'Speaks Spanish.' },
  {
    name: 'Bruno Conte André', role: 'Dental Assistant', offices: both, languages: 'Speaks Portuguese.',
    bio: 'Bruno graduated in dentistry in Brazil and has prior training and clinical experience there. In the United States he works at Contemporary Dental Care as a dental assistant.',
  },
  { name: 'Tyrese Brown', role: 'Dental Assistant', offices: 'Orlando' },
];
