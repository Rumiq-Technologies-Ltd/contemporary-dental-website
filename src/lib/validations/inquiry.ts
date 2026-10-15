import { z } from 'zod';

// The pages an enquiry can come from. Only these reach the front desk email.
export const enquirySources = ['/', '/emergency', '/new-patients', '/locations/ocoee'] as const;

const phonePattern = /^\+?[0-9 ().-]+$/;

// Collects the minimum a front desk needs to call back (Landing Page Brief, enquiry form rules).
// There is deliberately no free-text field: symptoms, dates of birth and insurance IDs are never asked for.
export const inquirySchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  mobile: z
    .string()
    .trim()
    .max(25)
    .regex(phonePattern)
    .refine(value => {
      const digits = value.replace(/\D/g, '').length;
      return digits >= 10 && digits <= 15;
    }),
  bestTime: z.enum(['morning', 'afternoon']),
  language: z.enum(['english', 'spanish', 'portuguese', 'other']),
  patientStatus: z.enum(['new', 'existing']).optional(),
  consent: z.boolean().refine(value => value === true),
  source: z.enum(enquirySources),
  // Honeypot: hidden from people, so only automated form fillers complete it. Any value fails validation.
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
