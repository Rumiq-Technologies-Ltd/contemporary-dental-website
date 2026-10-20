import type { ReactNode } from 'react';

/** Wraps each **marked** phrase in strong text, for copy that sets its own emphasis. */
export function emphasize(text: string): ReactNode[] {
  return text.split('**').map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part));
}
