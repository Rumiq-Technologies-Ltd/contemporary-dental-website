// Replace null destinations with verified HTTPS URLs when the integrations launch.
// Keeping this configuration separate prevents dead links or fake account flows.
export const site = {
  name: 'Contemporary Dental Care',
  tagline: 'Your Smile, Our Passion',
  award: 'Best Start Up of 2023',
  destinations: {
    login: null,
    signup: null,
    app: null,
    instagram: null,
    youtube: null,
    facebook: null,
  } as Record<Destination, string | null>,
};

export type Destination = 'login' | 'signup' | 'app' | 'instagram' | 'youtube' | 'facebook';
export const destinationLabels: Record<Destination, string> = {
  login: 'Patient log in', signup: 'Patient sign up', app: 'The dental care app',
  instagram: 'Instagram', youtube: 'YouTube', facebook: 'Facebook',
};

export const navigation = [
  { label: 'Home', href: '/#home', number: '01' },
  { label: 'Our advantages', href: '/#advantages', number: '02' },
  { label: 'Our services', href: '/#services', number: '03' },
] as const;
