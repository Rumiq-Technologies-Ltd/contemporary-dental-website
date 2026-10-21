import { site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import styles from './layout.module.css';

// The Instagram and Facebook links, shared by the top bar and the footer (which adds "Follow Us:"). The
// caller supplies the wrapper: the footer's is a named navigation landmark, the top bar's is not,
// so the page has one "Social media" landmark. Brand names are the same in every language.
export function SocialLinks({ followLabel }: { followLabel?: string }) {
  return <>
    {followLabel && <span className={styles.followLabel}>{followLabel}</span>}
    <a href={site.instagram} className={styles.socialLink}><Icon name="instagram" />Instagram</a>
    <a href={site.facebook} className={styles.socialLink}><Icon name="facebook" />Facebook</a>
  </>;
}
