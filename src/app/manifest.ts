import type { MetadataRoute } from 'next';
import { site, whenOcoee } from '@/content/site';

// Web app manifest: name, colours and icon for "Add to home screen" and browser UI.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Contemporary Dental',
    description: whenOcoee('Honest, patient-focused dental care in Orlando and Ocoee, Florida.', 'Honest, patient-focused dental care in Orlando, Florida.'),
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#a9eaf7',
    icons: [{ src: '/images/figma/8e6b4.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
