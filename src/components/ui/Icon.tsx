// Inline SVG icons drawn with currentColor, so each icon takes the colour of the
// element around it. The tooth and heart shapes come from the practice's original icons.

type IconName = 'tooth' | 'arrow' | 'heart' | 'menu' | 'phone' | 'check';

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
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const icon = iconDefinitions[name];
  return <svg className={className} viewBox={icon.viewBox} width="1em" height="1em" aria-hidden="true" focusable="false"
    fill="none" stroke="currentColor" strokeWidth={icon.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {icon.paths.map(d => <path key={d} d={d} />)}
  </svg>;
}

export type { IconName };
