import { site } from '@/content/site';
import { DestinationAction } from '@/components/ui/Interactions';
import { Icon } from '@/components/ui/Icon';
import styles from './layout.module.css';

export function SectionFooter({ narrow = false }: { narrow?: boolean }) {
  return <footer className={`${styles.footer} ${narrow ? styles.narrow : ''}`}>
    <p className={styles.tagline}><span aria-hidden="true" />{site.tagline}</p>
    <div className={styles.award}>
      <div className={styles.social}>
        {(['instagram', 'youtube', 'facebook'] as const).map(name => <DestinationAction key={name} destination={name} className={styles.socialButton} label={`${name[0].toUpperCase()}${name.slice(1)} — coming soon`}><Icon name={name} /></DestinationAction>)}
      </div>
      <p>{site.award}</p>
    </div>
  </footer>;
}
