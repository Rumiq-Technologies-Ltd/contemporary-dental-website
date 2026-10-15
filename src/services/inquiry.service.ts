import { site } from '@/content/site';
import { sendEmail } from '@/lib/resend';
import type { InquiryInput } from '@/lib/validations/inquiry';

const bestTimeLabel: Record<InquiryInput['bestTime'], string> = { morning: 'Morning', afternoon: 'Afternoon' };
const languageLabel: Record<InquiryInput['language'], string> = {
  english: 'English',
  spanish: 'Spanish',
  portuguese: 'Portuguese',
  other: 'Other',
};
const patientLabel: Record<NonNullable<InquiryInput['patientStatus']>, string> = { new: 'New patient', existing: 'Existing patient' };

// The front desk reads these in English. The message holds only what the form collects.
function buildBody(input: InquiryInput): string {
  return [
    `Page: ${input.source}`,
    `First name: ${input.firstName}`,
    `Mobile phone: ${input.mobile}`,
    `Best time to call: ${bestTimeLabel[input.bestTime]}`,
    `Preferred language: ${languageLabel[input.language]}`,
    `Patient: ${input.patientStatus ? patientLabel[input.patientStatus] : 'Not stated'}`,
    'Consent to be contacted by phone or text: yes',
  ].join('\n');
}

/** Sends one enquiry to the front desk. Returns false when the email could not be sent. */
export async function submitInquiry(input: InquiryInput): Promise<boolean> {
  try {
    await sendEmail({ to: site.email, subject: 'New website enquiry', text: buildBody(input) });
    return true;
  } catch {
    // The enquiry is patient information, so only the fact of the failure is logged.
    console.error('Website enquiry email could not be sent.');
    return false;
  }
}
