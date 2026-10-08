import doctor from '../../public/images/figma/3e2c5.png';
import smile from '../../public/images/figma/ab3fc.png';
import assessment from '../../public/images/figma/b6765.png';
import appointments from '../../public/images/figma/95e62.png';
import medication from '../../public/images/figma/72961.png';
import backPortrait from '../../public/images/figma/8442c.png';
import guides from '../../public/images/figma/25eac.png';

// Static imports supply intrinsic dimensions and blur placeholders to Next Image.
export const photos = { doctor, smile, assessment, appointments, medication, backPortrait, guides };
export const icons = {
  tooth: { file: '2f79d.svg', width: 22, height: 22 },
  logo: { file: '8e6b4.svg', width: 17, height: 17 },
  toothBadge: { file: '5b20a.svg', width: 30, height: 30 },
  technology: { file: '56fd4.svg', width: 32, height: 32 },
  flower: { file: 'e281e.svg', width: 54, height: 54 },
  plus: { file: 'c0a77.svg', width: 18, height: 18 },
  play: { file: 'd4d77.svg', width: 20, height: 20 },
  menu: { file: 'b4625.svg', width: 20, height: 20 },
  heart: { file: 'e2549.svg', width: 22, height: 22 },
  arrow: { file: '8cf4e.svg', width: 22, height: 22 },
  down: { file: '30bc9.svg', width: 40, height: 40 },
  instagram: { file: '344c7.svg', width: 24, height: 24 },
  youtube: { file: 'ef68b.svg', width: 24, height: 24 },
  facebook: { file: '26f89.svg', width: 24, height: 24 },
} as const;
export type IconName = keyof typeof icons;
