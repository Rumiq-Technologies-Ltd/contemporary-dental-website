import Link from 'next/link';
import { site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { DestinationAction } from '@/components/ui/Interactions';
import { SiteMenu } from './SiteMenu';
import styles from './layout.module.css';

export function SiteHeader() {
  return <header className={styles.header}>
    <SiteMenu />
    <Link href="/#home" className={styles.logo} aria-label={`${site.name} home`}>
      <span className={styles.logoMark}><Icon name="logo" /></span>
      <span>CONTEMPORARY DENTAL CARE</span>
    </Link>
    <div className={styles.auth}>
      <DestinationAction destination="login" className="pill pill-outline" label="Log In — coming soon">Log In</DestinationAction>
      <DestinationAction destination="signup" className="pill pill-accent" label="Sign Up — coming soon">Sign Up</DestinationAction>
    </div>
  </header>;
}
