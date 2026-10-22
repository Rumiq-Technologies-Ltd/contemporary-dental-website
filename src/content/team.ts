import type { StaticImageData } from 'next/image';
import type { Locale } from '@/i18n/locales';
import { about } from '@/i18n/messages/about';
import { photos } from './assets';
import { ocoeeEnabled } from './site';

export interface TeamMember {
  name: string;
  role: string;
  /** Offices the member works at, already filtered for the Ocoee hold. */
  offices: string;
  languages?: string;
  bio?: string;
  /** A portrait, when the person's consent for it is on file. Without one, a coloured tile shows. */
  photo?: StaticImageData;
}

// Names are not translated. Roles, bios, languages and office labels come from
// messages.about.team. The content file is the source for what each person may be called.
// Portraits show for Dr. Khan and for the staff whose portraits the practice supplied on 22 October 2026
// (keep each written consent on file); the others stay as coloured tiles until theirs is confirmed.
// Tyrese Brown shows name and role only until a bio is approved; Jessica Salazar's bio was supplied by
// the practice on 22 October 2026. Bruno Conte André is never "Dr.", "dentist" or "treating provider".
export function getTeam(lang: Locale): readonly TeamMember[] {
  const { offices, members } = about[lang].team;
  const both = ocoeeEnabled ? offices.both : offices.orlando;
  return [
    { name: 'Dr. Sheryar Khan', ...members.sheryarKhan, offices: both, photo: photos.doctorPortrait },
    { name: 'Jessica Salazar', ...members.jessicaSalazar, offices: both, photo: photos.jessicaPortrait },
    { name: 'Bruno Conte André', ...members.brunoConteAndre, offices: both, photo: photos.brunoPortrait },
    { name: 'Tyrese Brown', ...members.tyreseBrown, offices: offices.orlando, photo: photos.tyresePortrait },
    { name: 'Néstor Ugalde', ...members.nestorUgalde, offices: offices.orlando },
    { name: 'Amanda Nguyen', ...members.amandaNguyen, offices: offices.orlando, photo: photos.amandaPortrait },
    { name: 'Franchesca Avila', ...members.franchescaAvila, offices: offices.orlando },
    { name: 'Brittini Blankenship', ...members.brittiniBlankenship, offices: both, photo: photos.brittiniPortrait },
  ];
}
