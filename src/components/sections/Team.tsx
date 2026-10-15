import Link from 'next/link';
import { team } from '@/content/team';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import styles from './team.module.css';

// Team photos are held until each person's written consent is confirmed (content/team.ts),
// so each person is shown as a coloured tile with initials, name and role.
function initials(name: string): string {
  const words = name.replace(/^Dr\.\s+/, '').split(/\s+/);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
}

export function Team() {
  return <Screen id="team" labelledBy="team-title" className={styles.team}>
    <div className={styles.heading} data-reveal="">
      <h2 id="team-title">The people who look after you</h2>
      <p>Dr. Sheryar Khan leads a team that includes speakers of English, Spanish and Portuguese.</p>
      <Link href={routes.team} className="pill pill-outline pill-large">Meet the team</Link>
    </div>
    <ul className={styles.grid} data-stagger="">
      {team.map(member => <li key={member.name} className={styles.member} data-reveal="flip">
        <span className={styles.tile} aria-hidden="true" data-tilt="10">{initials(member.name)}</span>
        <p className={styles.name}>{member.name}</p>
        <p className={styles.role}>{member.role}</p>
      </li>)}
    </ul>
  </Screen>;
}
