import { beforeAfterCases } from '@/content/beforeAfter';
import type { ServiceId } from '@/content/serviceIds';
import { Notice, Section } from '@/components/page/Section';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { cardLabels, toCarouselCases } from './beforeAfterItems';
import { IllustrationGrid } from './IllustrationGrid';

// The treatment illustrations. A service page passes its service and shows the cases for that service;
// the home page passes nothing and shows the cases marked for the home section. Renders nothing when no case matches.
export async function TreatmentIllustrations({ service }: { service?: ServiceId }) {
  const cases = beforeAfterCases().filter(item => (service ? item.onServicePage && item.service === service : item.onHome));
  if (cases.length === 0) return null;

  const lang = await getLocale();
  const t = getMessages(lang).home.beforeAfter;

  return <Section id="illustrations" title={t.heading}>
    <IllustrationGrid cases={toCarouselCases(cases, lang, t)} labels={cardLabels(t)} />
    <Notice>{t.disclaimer}</Notice>
  </Section>;
}
