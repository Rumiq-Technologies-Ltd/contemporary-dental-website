import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';

export const metadata: Metadata = { title: 'Clean hero preview', robots: { index: false, follow: false } };
export default function CleanHeroPage() {
  return <main id="main-content" className="page-shell"><Hero variant="clean" /></main>;
}
