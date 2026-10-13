import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import styles from './page.module.css';

interface PageIntroProps {
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  id?: string;
}

// The single h1 of an inner page, with the tooth badges used on the homepage.
export function PageIntro({ title, lead, actions, id = 'page-title' }: PageIntroProps) {
  return <section className={styles.intro} aria-labelledby={id}>
    <div className={styles.trio} aria-hidden="true">{[0, 1, 2].map(index => <span key={index}><Icon name="tooth" /></span>)}</div>
    <h1 id={id}>{title}</h1>
    {lead && <p className={styles.lead}>{lead}</p>}
    {actions && <div className={styles.actions}>{actions}</div>}
  </section>;
}
