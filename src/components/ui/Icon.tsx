// Inline SVG icons drawn with currentColor, so each icon takes the colour of the
// element around it. The tooth and heart shapes come from the practice's original icons.

type IconName = 'tooth' | 'arrow' | 'heart' | 'menu' | 'phone' | 'check' | 'shield' | 'globe' | 'headphones' | 'family' | 'lotus' | 'addPerson';

interface IconDefinition {
  viewBox: string;
  strokeWidth: number;
  paths: readonly string[];
}

const iconDefinitions: Record<IconName, IconDefinition> = {
  tooth: {
    viewBox: '0 0 22 22',
    strokeWidth: 1.4,
    paths: [
      'M11 2.93333C8.8 2.93333 7.88333 3.85 6.14167 3.85C4.58333 3.85 3.85 5.13333 3.85 6.875C3.85 9.075 4.76667 10.9083 5.225 13.2C5.68333 15.4 5.68333 19.0667 6.96667 19.0667C8.25 19.0667 8.25 15.95 9.16667 14.575C9.71667 13.75 10.2667 13.475 11 13.475C11.7333 13.475 12.2833 13.75 12.8333 14.575C13.75 15.95 13.75 19.0667 15.0333 19.0667C16.3167 19.0667 16.3167 15.4 16.775 13.2C17.2333 10.9083 18.15 9.075 18.15 6.875C18.15 5.13333 17.4167 3.85 15.8583 3.85C14.1167 3.85 13.2 2.93333 11 2.93333Z',
    ],
  },
  arrow: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    paths: ['M5 12h14M13 6l6 6-6 6'],
  },
  heart: {
    viewBox: '0 0 22 22',
    strokeWidth: 1.5,
    paths: ['M11 17.9667C11 17.9667 4.4 13.9333 4.4 9.53333C4.4 7.425 6.05 5.95833 7.88333 5.95833C9.16667 5.95833 10.3583 6.69167 11 7.79167C11.6417 6.69167 12.8333 5.95833 14.1167 5.95833C15.95 5.95833 17.6 7.425 17.6 9.53333C17.6 13.9333 11 17.9667 11 17.9667Z'],
  },
  menu: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    paths: ['M4 7h16M4 12h16M4 17h10'],
  },
  phone: {
    viewBox: '0 0 24 24',
    strokeWidth: 1.9,
    paths: ['M6.2 3.6h3.1l1.6 4.1-2 1.5a12.2 12.2 0 0 0 6 6l1.5-2 4.1 1.6v3.1a2 2 0 0 1-2.2 2A17.3 17.3 0 0 1 4.2 5.8a2 2 0 0 1 2-2.2z'],
  },
  check: {
    viewBox: '0 0 24 24',
    strokeWidth: 2.2,
    paths: ['M5 12.5l4.2 4.2L19 7'],
  },
  shield: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    paths: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
  },
  globe: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    paths: ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
  },
  headphones: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    paths: ['M3 18v-6a9 9 0 0 1 18 0v6', 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z'],
  },
  addPerson: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    paths: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M19 8v6M16 11h6'],
  },
  lotus: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    paths: [
      'M12 20C9 17 8.5 13 12 6c3.5 7 3 11 0 14z',
      'M12 20c-4-1-8-4-8-9 3 1 5 4 8 9z',
      'M12 20c4-1 8-4 8-9-3 1-5 4-8 9z',
      'M6 21h12',
    ],
  },
  family: {
    viewBox: '0 0 24 24',
    strokeWidth: 2,
    paths: [
      'M7 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
      'M1 21v-2a3.5 3.5 0 0 1 7 0v2',
      'M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
      'M8 21v-3.5a4 4 0 0 1 8 0V21',
      'M22 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
      'M16 21v-2a3.5 3.5 0 0 1 7 0v2',
    ],
  },
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const icon = iconDefinitions[name];
  return <svg className={className} viewBox={icon.viewBox} width="1em" height="1em" aria-hidden="true" focusable="false"
    fill="none" stroke="currentColor" strokeWidth={icon.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {icon.paths.map(d => <path key={d} d={d} />)}
  </svg>;
}

export type { IconName };
