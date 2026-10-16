import type { Metadata } from 'next';
import { OfficeDetails } from '@/components/page/OfficeDetails';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { offices, primaryOffice, routes } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const t = getMessages(lang).visit.contact.meta;
  return pageMetadata({ lang, title: t.title, description: t.description, path: routes.contact });
}

// HOLD: the request form (Name, Phone, Email, Office, Preferred language, Reason, Message)
// is not built until the C15 decision on website forms and data handling is confirmed.
// Flip appointmentFormEnabled in content/site.ts and add the form here when it is.
// Do not promise a response time on this page.
// Both offices are described here, so this is the only page for the offices.
export default async function ContactPage() {
  const lang = await getLocale();
  const messages = getMessages(lang);
  const t = messages.visit.contact;
  const { labels, orlando, ocoee } = messages.locations;
  const ocoeeOffice = offices.find(office => office.id === 'ocoee');
  const directionsLabel = messages.home.offices.directions;
  const mapTitle = messages.home.offices.mapTitle;
  return <PageLayout>
    <PageIntro title={t.title} />
    <div className={styles.offices}>
      <OfficeDetails
        office={primaryOffice}
        title={orlando.title}
        tableCaption={orlando.tableCaption}
        labels={labels}
        hours={`${messages.common.hours.orlando}. ${orlando.hoursNote}`}
        services={orlando.services}
        directionsLabel={directionsLabel}
        mapTitle={mapTitle}
        photo={{ name: 'orlandoFront', alt: orlando.photoAlt }}
        arrivalTip={{ label: labels.arrivalTip, text: orlando.arrivalTip, landmarksLabel: labels.arrivalLandmarks, landmarks: orlando.arrivalLandmarks }}
      />
      {ocoeeOffice && <OfficeDetails
        office={ocoeeOffice}
        title={ocoee.title}
        tableCaption={ocoee.tableCaption}
        labels={labels}
        hours={messages.common.hours.ocoee}
        services={ocoee.services}
        directionsLabel={directionsLabel}
        mapTitle={mapTitle}
        arrivalTip={{ label: labels.arrivalTip, text: ocoee.arrivalTip, landmarksLabel: labels.arrivalLandmarks, landmarks: ocoee.arrivalLandmarks }}
      />}
    </div>
  </PageLayout>;
}
