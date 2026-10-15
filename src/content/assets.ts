import doctor from '../../public/images/figma/3e2c5.png';
import smile from '../../public/images/figma/ab3fc.png';
import assessment from '../../public/images/figma/b6765.png';
import appointments from '../../public/images/figma/95e62.png';
import medication from '../../public/images/figma/72961.png';
import backPortrait from '../../public/images/figma/8442c.png';
import guides from '../../public/images/figma/25eac.png';
import toothModel from '../../public/images/stock/tooth-model.jpg';
import clearAligner from '../../public/images/stock/clear-aligner.jpg';
import teethModel from '../../public/images/stock/teeth-model.jpg';
import doctorPortrait from '../../public/images/practice/dr-sheryar-khan.jpg';
import teamGroup from '../../public/images/practice/team-group.jpg';
import orlandoFront from '../../public/images/practice/orlando-office-front.jpg';
import orlandoEntrance from '../../public/images/practice/orlando-office-entrance.jpg';
import frontDesk from '../../public/images/practice/front-desk.jpg';
import teamAtWork from '../../public/images/practice/team-at-work.jpg';
import xrayTeamLandscape from '../../public/images/practice/xray-team-landscape.jpg';
import xrayTeamPortrait from '../../public/images/practice/xray-team-portrait.jpg';
import roomTeal from '../../public/images/practice/treatment-room-teal.jpg';
import roomCream from '../../public/images/practice/treatment-room-cream.jpg';

// Static imports supply intrinsic dimensions and blur placeholders to Next Image.
// The first seven come from the Figma design. The practice photographs (public/images/practice)
// were supplied by the practice. The three stock photos (public/images/stock) stay only where
// no practice photograph exists yet (docs/image-credits.md).
export const photos = {
  doctor, smile, assessment, appointments, medication, backPortrait, guides,
  toothModel, clearAligner, teethModel,
  doctorPortrait, teamGroup, orlandoFront, orlandoEntrance, frontDesk, teamAtWork,
  xrayTeamLandscape, xrayTeamPortrait, roomTeal, roomCream,
};
export type PhotoName = keyof typeof photos;
