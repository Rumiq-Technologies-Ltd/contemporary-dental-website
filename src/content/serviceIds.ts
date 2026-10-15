// Service identifiers are fixed codes, not copy, so client components can use them
// without importing the translated service content.
export const serviceIds = [
  'cleanings-checkups', 'emergency', 'extractions', 'restorative', 'crowns',
  'root-canal', 'implants', 'dentures', 'clear-aligners-braces', 'cosmetic',
] as const;

export type ServiceId = (typeof serviceIds)[number];
