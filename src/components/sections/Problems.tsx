import Link from 'next/link';
import { photos } from '@/content/assets';
import { services } from '@/content/services';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { ProblemTabs, type Problem } from './ProblemTabs';
import styles from './problems.module.css';

// Each tab starts from a patient's problem and answers with a service. The large statement
// and the description come from the content file; nothing here adds a claim.
function problem(id: string, tab: string, headline: string, big: string, bigText: string, photo: Problem['photo']): Problem {
  const service = services.find(item => item.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return { id, tab, headline, big, bigText, photo, text: service.description, href: service.href, linkLabel: `About ${service.title.toLowerCase()}` };
}

const problems: readonly Problem[] = [
  problem('emergency', 'Tooth pain', 'Got tooth pain?', 'Same day', 'Same-day emergency appointments are often available.', photos.guides),
  problem('implants', 'Missing teeth', 'Missing a tooth?', 'Two ways', 'Implants and dentures both replace missing teeth.', photos.toothModel),
  problem('clear-aligners-braces', 'Crooked teeth', 'Want straighter teeth?', 'Aligners or braces', 'Clear aligners and traditional braces, both from Dr. Khan.', photos.clearAligner),
  problem('cleanings-checkups', 'Check-up due', 'Due a check-up?', 'Every 6 months', 'Regular visits help us catch problems early.', photos.assessment),
  problem('cosmetic', 'Smile makeover', 'Want a new smile?', 'Your goals', 'Cosmetic treatment planned around what you want.', photos.smile),
];

export function Problems() {
  return <Screen id="treatments" labelledBy="treatments-title" className={styles.problems}>
    <div className={styles.heading}>
      <h2 id="treatments-title" data-reveal="mask">Common problems, clear solutions</h2>
      <div data-reveal=""><Link href={routes.services} className="pill pill-outline pill-large">All services</Link></div>
    </div>
    <ProblemTabs problems={problems} />
  </Screen>;
}
