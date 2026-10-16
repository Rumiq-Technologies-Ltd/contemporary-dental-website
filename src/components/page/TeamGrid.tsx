import Image from 'next/image';
import { getTeam } from '@/content/team';
import { getLocale } from '@/i18n/server';
import styles from './team.module.css';

// A person with a confirmed portrait (content/team.ts) is shown with it. Everyone else is a
// coloured tile with initials until their written consent is confirmed.
// "Dr." stays as written in every language, so the prefix is stripped the same way.
function initials(name: string): string {
  const words = name.replace(/^Dr\.\s+/, '').split(/\s+/);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
}

/** The team: a tile or portrait, then the name and role. */
export async function TeamGrid() {
  const lang = await getLocale();
  return <ul className={styles.grid} data-stagger="">
    {getTeam(lang).map(member => <li key={member.name} className={styles.member} data-reveal="flip">
      <span className={styles.tile} aria-hidden="true" data-tilt="10">
        {member.photo
          ? <Image src={member.photo} alt="" fill sizes="(max-width: 899px) 50vw, 25vw" placeholder="blur" />
          : initials(member.name)}
      </span>
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
    </li>)}
  </ul>;
}
