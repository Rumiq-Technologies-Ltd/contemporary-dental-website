import Link from 'next/link';
import { getTeam } from '@/content/team';
import { routes } from '@/content/site';
import { Screen } from '@/components/layout/Screen';
import { getMessages } from '@/i18n/dictionaries';
import { localePath } from '@/i18n/locales';
import { getLocale } from '@/i18n/server';
import styles from './team.module.css';

// Team photos are held until each person's written consent is confirmed (content/team.ts),
// so each person is shown as a coloured tile with initials, name and role.
// "Dr." stays as written in every language, so the prefix is stripped the same way.
function initials(name: string): string {
  const words = name.replace(/^Dr\.\s+/, '').split(/\s+/);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
}

export async function Team() {
  const lang = await getLocale();
  const t = getMessages(lang).home.team;
  const team = getTeam(lang);

  return <Screen id="team" labelledBy="team-title" className={styles.team}>
    <div className={styles.heading} data-reveal="">
      <h2 id="team-title">{t.heading}</h2>
      <p>{t.intro}</p>
      <Link href={localePath(lang, routes.team)} className="pill pill-outline pill-large">{t.cta}</Link>
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
