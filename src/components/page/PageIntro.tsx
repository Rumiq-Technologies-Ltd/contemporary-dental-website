import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import { SplitWords } from '@/components/motion/SplitWords';
import { Icon } from '@/components/ui/Icon';
import styles from './page.module.css';

interface PageIntroProps {
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  id?: string;
}

// The single h1 of an inner page, with the tooth badges used on the homepage. Its words rise at
// first paint and the lead and actions fade in after them ("Motion" in globals.css).
export function PageIntro({ title, lead, actions, id = 'page-title' }: PageIntroProps) {
  return <section className={styles.intro} aria-labelledby={id}>
    <div className={styles.trio} aria-hidden="true" data-load="">{[0, 1, 2].map(index => <span key={index}><Icon name="tooth" /></span>)}</div>
    <SplitWords as="h1" id={id} text={title} delay={80} />
    {lead && <p className={styles.lead} data-load="" style={{ '--d': '450ms' } as CSSProperties}>{lead}</p>}
    {actions && <div className={styles.actions} data-load="" style={{ '--d': '600ms' } as CSSProperties}>{actions}</div>}
  </section>;
}
