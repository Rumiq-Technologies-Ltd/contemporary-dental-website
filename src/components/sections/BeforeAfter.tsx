import { beforeAfterCases } from '@/content/beforeAfter';
import { getServices } from '@/content/services';
import { offices } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { getMessages } from '@/i18n/dictionaries';
import { getLocale } from '@/i18n/server';
import { BeforeAfterCarousel, type CarouselLabels } from './BeforeAfterCarousel';
import type { CarouselCase } from './BeforeAfterCard';
import styles from './beforeAfter.module.css';

// "How our treatments look": before-and-after illustrations on the home page. It renders nothing
// when no case passes the filter in content/beforeAfter.ts.
export async function BeforeAfter() {
  const cases = beforeAfterCases();
  if (cases.length === 0) return null;

  const lang = await getLocale();
  const t = getMessages(lang).home.beforeAfter;
  const services = getServices(lang);

  const items: CarouselCase[] = cases.map(item => {
    const service = services.find(candidate => candidate.id === item.service);
    if (!service) throw new Error(`Unknown service: ${item.service}`);
    const office = offices.find(candidate => candidate.id === item.office);
    // An illustration is named by its treatment; a real case by the patient's initials.
    const name = item.isIllustration ? service.title : item.patient;
    const detail = item.isIllustration
      ? (office?.name ?? '')
      : (office ? `${service.title} · ${office.name}` : service.title);
    return {
      id: item.id,
      patient: name,
      detail,
      illustration: item.isIllustration,
      before: { src: item.before.src, width: item.before.width, height: item.before.height, alt: `${t.before}: ${service.title}` },
      after: { src: item.after.src, width: item.after.width, height: item.after.height, alt: `${t.after}: ${service.title}` },
    };
  });

  const labels: CarouselLabels = {
    carousel: t.carousel,
    previous: t.previous,
    next: t.next,
    pause: t.pause,
    play: t.play,
    page: t.page,
    before: t.before,
    after: t.after,
    compare: t.compare,
    illustration: t.illustration,
  };

  return <Screen id="results" labelledBy="results-title" className={styles.section}>
    <div className={styles.heading}>
      <h2 id="results-title" data-reveal="mask">{t.heading}</h2>
      <p className={styles.intro} data-reveal="">{t.intro}</p>
    </div>
    <BeforeAfterCarousel cases={items} labels={labels} />
    <p className={styles.disclaimer} data-reveal="">{t.disclaimer}</p>
  </Screen>;
}
