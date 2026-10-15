'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { EnquiryMessages } from '@/i18n/messages/enquiry';
import { inquirySchema, type InquiryInput } from '@/lib/validations/inquiry';
import { submitInquiryAction } from './actions';
import styles from './EnquiryForm.module.css';

export type EnquiryFormLabels = EnquiryMessages['form'];

interface EnquiryFormProps {
  labels: EnquiryFormLabels;
  source: InquiryInput['source'];
  /** Localised thank-you path. The page is opened with no form data in its address. */
  thankYouHref: string;
}

// The enquiry form. Every field is checked on the server as well (submitInquiryAction), and the
// browser never keeps a copy of the submission after it is sent.
export function EnquiryForm({ labels, source, thankYouHref }: EnquiryFormProps) {
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { consent: false, source, website: '' },
  });

  async function onSubmit(values: InquiryInput) {
    setFailed(false);
    const result = await submitInquiryAction(values);
    if (result.ok) {
      router.push(thankYouHref);
      return;
    }
    setFailed(true);
  }

  return <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
    <div className={styles.field}>
      <label htmlFor="enquiry-first-name">{labels.firstName}</label>
      <input id="enquiry-first-name" type="text" autoComplete="given-name" aria-invalid={Boolean(errors.firstName)}
        aria-describedby={errors.firstName ? 'enquiry-first-name-error' : undefined} {...register('firstName')} />
      {errors.firstName && <p id="enquiry-first-name-error" role="alert" className={styles.error}>{labels.errors.firstName}</p>}
    </div>

    <div className={styles.field}>
      <label htmlFor="enquiry-mobile">{labels.mobile}</label>
      <input id="enquiry-mobile" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.mobile)}
        aria-describedby={errors.mobile ? 'enquiry-mobile-error' : undefined} {...register('mobile')} />
      {errors.mobile && <p id="enquiry-mobile-error" role="alert" className={styles.error}>{labels.errors.mobile}</p>}
    </div>

    <fieldset className={styles.field} aria-describedby={errors.bestTime ? 'enquiry-best-time-error' : undefined}>
      <legend>{labels.bestTime}</legend>
      <label className={styles.option}><input type="radio" value="morning" {...register('bestTime')} /> {labels.morning}</label>
      <label className={styles.option}><input type="radio" value="afternoon" {...register('bestTime')} /> {labels.afternoon}</label>
      {errors.bestTime && <p id="enquiry-best-time-error" role="alert" className={styles.error}>{labels.errors.bestTime}</p>}
    </fieldset>

    <div className={styles.field}>
      <label htmlFor="enquiry-language">{labels.language}</label>
      <select id="enquiry-language" aria-invalid={Boolean(errors.language)} {...register('language')}>
        <option value="">—</option>
        <option value="english">{labels.english}</option>
        <option value="spanish">{labels.spanish}</option>
        <option value="portuguese">{labels.portuguese}</option>
        <option value="other">{labels.other}</option>
      </select>
      {errors.language && <p role="alert" className={styles.error}>{labels.errors.language}</p>}
    </div>

    <fieldset className={styles.field}>
      <legend>{labels.patient}</legend>
      <label className={styles.option}><input type="radio" value="new" {...register('patientStatus')} /> {labels.newPatient}</label>
      <label className={styles.option}><input type="radio" value="existing" {...register('patientStatus')} /> {labels.existingPatient}</label>
    </fieldset>

    <div className={styles.field}>
      <label className={styles.option}>
        <input type="checkbox" aria-invalid={Boolean(errors.consent)} {...register('consent')} /> {labels.consent}
      </label>
      {errors.consent && <p role="alert" className={styles.error}>{labels.errors.consent}</p>}
    </div>

    {/* Honeypot: hidden from people and from screen readers. Automated fillers that complete it are rejected. */}
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor="enquiry-website">Website</label>
      <input id="enquiry-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
    </div>

    {failed && <p role="alert" className={styles.error}>{labels.failed}</p>}

    <button type="submit" className="pill pill-accent pill-large" disabled={isSubmitting}>
      {isSubmitting ? labels.sending : labels.submit}
    </button>
  </form>;
}
