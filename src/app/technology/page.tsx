import { ClosingBand } from '@/components/page/ClosingBand';
import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { PagePhoto } from '@/components/page/PagePhoto';
import { BulletList } from '@/components/page/Section';
import { routes } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'Technology',
  description: 'Digital X-rays, 3D imaging, a digital intraoral scanner and an intraoral camera help Dr. Khan examine teeth and plan treatment.',
  path: routes.technology,
});

// HOLD: no claims that treatment is faster because of technology, that crowns are
// milled in-house, or that we offer CEREC, LANAP or 3D-printed restorations.
export default function TechnologyPage() {
  return <PageLayout>
    <PageIntro
      title="Technology at our practice"
      lead="The equipment below helps Dr. Khan examine teeth and plan treatment, and lets you see what he sees."
    />
    <div className={styles.split}>
      <BulletList>
        <li>Digital X-rays (Vatech)</li>
        <li>3D imaging, CBCT (Vatech)</li>
        <li>Digital intraoral scanner (3Shape TRIOS 5)</li>
        <li>Intraoral camera</li>
      </BulletList>
      <PagePhoto photo="roomLight" alt="A dental treatment room" wide />
    </div>
    <ClosingBand />
  </PageLayout>;
}
