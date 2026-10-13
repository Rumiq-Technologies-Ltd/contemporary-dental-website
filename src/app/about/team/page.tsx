import { PageIntro } from '@/components/page/PageIntro';
import { PageLayout } from '@/components/page/PageLayout';
import { routes, whenOcoee } from '@/content/site';
import { team } from '@/content/team';
import { pageMetadata } from '@/lib/metadata';
import styles from '@/components/page/page.module.css';

export const metadata = pageMetadata({
  title: 'Our Team',
  description: 'Meet the Contemporary Dental Care team: Dr. Sheryar Khan, our hygienist, office managers and dental assistants.',
  path: routes.team,
});

const lead = whenOcoee(
  'Our team works across our offices. Languages listed are those each team member speaks. Availability depends on who is in on a given day.',
  'Languages listed are those each team member speaks. Availability depends on who is in on a given day.',
);

// Photos are held until each person's consent is confirmed in writing.
export default function TeamPage() {
  return <PageLayout>
    <PageIntro title="Meet the team" lead={lead} />
    <ul className={styles.team}>
      {team.map(member => <li key={member.name} className={styles.member}>
        <h2>{member.name}</h2>
        <p><strong>{member.role}.</strong> {member.offices}.{member.languages ? ` ${member.languages}` : ''}</p>
        {member.bio && <p>{member.bio}</p>}
      </li>)}
    </ul>
  </PageLayout>;
}
