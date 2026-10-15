import type { Locale } from '@/i18n/locales';
import { about } from '@/i18n/messages/about';
import { ocoeeEnabled } from './site';

export interface TeamMember {
  name: string;
  role: string;
  /** Offices the member works at, already filtered for the Ocoee hold. */
  offices: string;
  languages?: string;
  bio?: string;
}

// Names are not translated. Roles, bios, languages and office labels come from
// messages.about.team. The content file is the source for what each person may be called.
// Photos are held until each person's consent is confirmed in writing. Jessica Salazar and
// Tyrese Brown show name and role only until their bios are approved. Bruno Conte André is
// never "Dr.", "dentist" or "treating provider".
export function getTeam(lang: Locale): readonly TeamMember[] {
  const { offices, members } = about[lang].team;
  const both = ocoeeEnabled ? offices.both : offices.orlando;
  return [
    { name: 'Dr. Sheryar Khan', ...members.sheryarKhan, offices: both },
    { name: 'Jessica Salazar', ...members.jessicaSalazar, offices: both },
    { name: 'Brittini Blankenship', ...members.brittiniBlankenship, offices: both },
    { name: 'Franchesca Avila', ...members.franchescaAvila, offices: offices.orlando },
    { name: 'Amanda Nguyen', ...members.amandaNguyen, offices: offices.orlando },
    { name: 'Néstor Ugalde', ...members.nestorUgalde, offices: offices.orlando },
    { name: 'Bruno Conte André', ...members.brunoConteAndre, offices: both },
    { name: 'Tyrese Brown', ...members.tyreseBrown, offices: offices.orlando },
  ];
}
