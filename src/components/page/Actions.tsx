import Link from 'next/link';
import { primaryOffice, routes, type Office } from '@/content/site';

export function RequestAppointmentButton({ variant = 'accent' }: { variant?: 'accent' | 'outline' }) {
  return <Link href={routes.requestAppointment} className={`pill pill-${variant} pill-large`}>Request an appointment</Link>;
}

/** "Call Orlando: 321-522-8577" by default; withName=false gives "Call 321-522-8577". */
export function CallButton({ office = primaryOffice, withName = true }: { office?: Office; withName?: boolean }) {
  return <a href={office.phoneHref} className="pill pill-outline pill-large">{withName ? `Call ${office.name}: ${office.phone}` : `Call ${office.phone}`}</a>;
}
