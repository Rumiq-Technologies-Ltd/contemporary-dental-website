import type { Metadata } from 'next';
import { OfficeDetails } from '@/components/page/OfficeDetails';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { Prose, Section } from '@/components/page/Section';
import { appointmentFormEnabled, offices, primaryOffice, routes, site } from '@/content/site';
import { getMessages } from '@/i18n/dictionaries';
import { fill } from '@/i18n/fill';
import { getLocale } from '@/i18n/server';
import { pageMetadata } from '@/lib/metadata';

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
    <Section id="request-appointment" title={messages.common.requestAppointment}>
      <Prose>
        {appointmentFormEnabled
          ? <p>{t.request.withForm}</p>
          : <p>{fill(t.request.callOnly, { phone: site.afterHoursPhone })}</p>}
      </Prose>
    </Section>
  </PageLayout>;
}
