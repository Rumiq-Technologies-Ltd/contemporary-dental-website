import { Hero } from '@/components/sections/Hero';
import { Advantages } from '@/components/sections/Advantages';
import { Services } from '@/components/sections/Services';
import { Interactions } from '@/components/ui/Interactions';

// App Router server page: marketing content is prerendered, not fetched on visits.
export default function HomePage() {
  return <Interactions><main id="main-content" className="page-shell"><Hero /><Advantages /><Services /></main></Interactions>;
}
