import type { PhotoName } from '@/content/assets';
import type { Office } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { OfficeDetails } from './OfficeDetails';

/** Offices that have a photograph of the building. */
const officePhotos: Partial<Record<Office['id'], PhotoName>> = { orlando: 'orlandoFront' };

// One office with its copy, hours and photograph. The contact page shows every office with it, and
// each office page shows its own, so the details are written in one place.
export async function OfficeBlock({ office }: { office: Office }) {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const { labels } = messages.locations;
  const copy = messages.locations[office.id];
  const photo = officePhotos[office.id];
  return <OfficeDetails
    office={office}
    title={copy.title}
    tableCaption={copy.tableCaption}
    labels={labels}
    hours={messages.common.hours[office.id]}
    services={copy.services}
    directionsLabel={messages.home.offices.directions}
    mapTitle={messages.home.offices.mapTitle}
    photo={photo && 'photoAlt' in copy ? { name: photo, alt: copy.photoAlt } : undefined}
    arrivalTip={{ label: labels.arrivalTip, text: copy.arrivalTip, landmarksLabel: labels.arrivalLandmarks, landmarks: copy.arrivalLandmarks }}
  />;
}
