import smile from '../../public/images/figma/ab3fc.png';
import assessment from '../../public/images/figma/b6765.png';
import appointments from '../../public/images/figma/95e62.png';
import medication from '../../public/images/figma/72961.png';
import backPortrait from '../../public/images/figma/8442c.png';
import guides from '../../public/images/figma/25eac.png';
import toothModel from '../../public/images/stock/tooth-model.jpg';
import clearAligner from '../../public/images/stock/clear-aligner.jpg';
import teethModel from '../../public/images/stock/teeth-model.jpg';
// Dr. Khan's portrait with its grey background replaced by the brand colour (see docs/content-holds.md).
import doctorPortrait from '../../public/images/practice/dr-sheryar-khan-brand.jpg';
import teamGroup from '../../public/images/practice/team-group.jpg';
import orlandoFront from '../../public/images/practice/orlando-office-front.jpg';
import orlandoEntrance from '../../public/images/practice/orlando-office-entrance.jpg';
import frontDesk from '../../public/images/practice/front-desk.jpg';
import xrayTeamLandscape from '../../public/images/practice/xray-team-landscape.jpg';
import xrayTeamPortrait from '../../public/images/practice/xray-team-portrait.jpg';
import roomTeal from '../../public/images/practice/treatment-room-teal.jpg';
import roomCream from '../../public/images/practice/treatment-room-cream.jpg';
// The practice logo, split into its icon (the tooth) and its wordmark (the words). Both are
// transparent so they sit on any background (docs/image-credits.md).
import logoIcon from '../../public/images/logo/contemporary-dental-care-icon.png';
import logoWordmark from '../../public/images/logo/contemporary-dental-care-wordmark.png';
// Service card photos for the services grid, one per service (public/images/services/thumbnails).
import thumbCleanings from '../../public/images/services/thumbnails/cleanings-checkups.jpg';
import thumbEmergency from '../../public/images/services/thumbnails/emergency.jpg';
import thumbExtractions from '../../public/images/services/thumbnails/extractions.jpg';
import thumbRestorative from '../../public/images/services/thumbnails/restorative.jpg';
import thumbCrowns from '../../public/images/services/thumbnails/crowns.jpg';
import thumbRootCanal from '../../public/images/services/thumbnails/root-canal.jpg';
import thumbImplants from '../../public/images/services/thumbnails/implants.jpg';
import thumbDentures from '../../public/images/services/thumbnails/dentures.jpg';
import thumbAligners from '../../public/images/services/thumbnails/clear-aligners-braces.jpg';
import thumbCosmetic from '../../public/images/services/thumbnails/cosmetic.jpg';

// Static imports supply intrinsic dimensions and blur placeholders to Next Image.
// The first six come from the Figma design. The practice photographs (public/images/practice)
// were supplied by the practice. The three stock photos (public/images/stock) stay only where
// no practice photograph exists yet (docs/image-credits.md).
export const photos = {
  smile, assessment, appointments, medication, backPortrait, guides,
  toothModel, clearAligner, teethModel,
  doctorPortrait, teamGroup, orlandoFront, orlandoEntrance, frontDesk,
  xrayTeamLandscape, xrayTeamPortrait, roomTeal, roomCream,
  thumbCleanings, thumbEmergency, thumbExtractions, thumbRestorative, thumbCrowns, thumbRootCanal, thumbImplants, thumbDentures, thumbAligners, thumbCosmetic,
};
export type PhotoName = keyof typeof photos;

/** Brand artwork. Kept apart from photos so the photo names stay photographs only. */
export const brand = {
  logoIcon,
  logoWordmark,
};
