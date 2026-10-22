import smile from '../../public/images/figma/ab3fc.png';
import assessment from '../../public/images/figma/b6765.png';
import appointments from '../../public/images/figma/95e62.png';
import medication from '../../public/images/figma/72961.png';
import backPortrait from '../../public/images/figma/8442c.png';
import guides from '../../public/images/figma/25eac.png';
import toothModel from '../../public/images/stock/tooth-model.jpg';
import clearAligner from '../../public/images/stock/clear-aligner.jpg';
import teethModel from '../../public/images/stock/teeth-model.jpg';
// The homepage hero, supplied by the practice on 20 October 2026 (docs/image-credits.md).
import heroSmile from '../../public/images/hero/hero-smile.jpg';
// Service page photos supplied by the practice on 20 October 2026 (docs/image-credits.md).
import extractionsPatient from '../../public/images/services/extractions-patient.jpg';
import emergencyPatient from '../../public/images/services/emergency-patient.jpg';
import restorativePatient from '../../public/images/services/restorative-patient.jpg';
import cosmeticPatient from '../../public/images/services/cosmetic-patient.jpg';
import cleaningsPatient from '../../public/images/services/cleanings-patient.jpg';
import crownsPatient from '../../public/images/services/crowns-patient.jpg';
import rootCanalPatient from '../../public/images/services/root-canal-patient.jpg';
import implantsPatient from '../../public/images/services/implants-patient.jpg';
import alignersPatient from '../../public/images/services/aligners-patient.jpg';
// Homepage "common problems" tab photos, supplied by the practice on 21 October 2026.
import toothPain from '../../public/images/home/tooth-pain.jpg';
import crookedTeeth from '../../public/images/home/crooked-teeth.jpg';
import missingTeeth from '../../public/images/home/missing-teeth.jpg';
import checkUp from '../../public/images/home/check-up.jpg';
import smileMakeover from '../../public/images/home/smile-makeover.jpg';
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
  toothModel, clearAligner, teethModel, heroSmile, extractionsPatient, emergencyPatient, restorativePatient, cosmeticPatient,
  cleaningsPatient, crownsPatient, rootCanalPatient, implantsPatient, alignersPatient,
  toothPain, missingTeeth, crookedTeeth, checkUp, smileMakeover,
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
