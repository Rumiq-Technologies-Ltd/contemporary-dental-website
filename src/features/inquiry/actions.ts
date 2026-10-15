'use server';

import { inquirySchema } from '@/lib/validations/inquiry';
import { submitInquiry } from '@/services/inquiry.service';

export interface InquiryResult {
  ok: boolean;
}

/** Validates a submitted enquiry on the server, then sends it. The browser's checks are never trusted. */
export async function submitInquiryAction(input: unknown): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) return { ok: false };
  return { ok: await submitInquiry(parsed.data) };
}
