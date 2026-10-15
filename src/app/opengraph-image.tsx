import { ImageResponse } from 'next/og';
import { site, whenOcoee } from '@/content/site';

// Social share image for every page (Open Graph and Twitter), built at build time in the
// brand colours. It uses the built-in font, so it needs no network access.
export const alt = `${site.name}: honest, patient-focused dental care`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#a9eaf7', color: '#131c15' }}>
      <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
        {whenOcoee('Orlando and Ocoee, Florida', 'Orlando, Florida')}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: -3 }}>Contemporary</div>
        <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: -3 }}>Dental Care</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 34 }}>
        <span>Honest, patient-focused dental care</span>
        <span style={{ display: 'flex', padding: '14px 26px', background: '#131c15', color: '#ffffff', borderRadius: 6, fontSize: 28, fontWeight: 700 }}>New patients welcome</span>
      </div>
    </div>,
    size,
  );
}
