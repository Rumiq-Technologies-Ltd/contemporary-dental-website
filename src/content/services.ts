export type ServiceId = 'assessment' | 'records' | 'brush-heads' | 'guides' | 'appointments' | 'medication';
export type Service = {
  id: ServiceId;
  title: string;
  description: string;
  image: 'assessment' | 'doctor' | 'guides' | 'appointments' | 'medication';
  height: number;
  column: 'a' | 'b';
};

// Content is data, not component markup: additions need no card-layout changes.
export const services: readonly Service[] = [
  { id: 'assessment', title: 'Oral Health Assessment', image: 'assessment', height: 355, column: 'a',
    description: 'A starting point for understanding your smile. Explore the oral health assessment feature in our upcoming patient care platform.' },
  { id: 'records', title: 'Dental Health Records', image: 'doctor', height: 350, column: 'a',
    description: 'A planned space to keep your dental care history organized and accessible. Patient records will be available when the secure patient platform launches.' },
  { id: 'brush-heads', title: 'Brush Heads', image: 'guides', height: 220, column: 'a',
    description: 'Discover oral care essentials and learn more about the tools behind your daily routine. More information will be available in the app.' },
  { id: 'guides', title: 'Oral Care Guides', image: 'guides', height: 173, column: 'b',
    description: 'Explore our planned library of oral care resources. Personalized advice should always come from your dental care professional.' },
  { id: 'appointments', title: 'Appointment Scheduling', image: 'appointments', height: 343, column: 'b',
    description: 'An easier way to organize your next visit. Online appointment scheduling is coming with the patient platform; no booking is submitted through this preview.' },
  { id: 'medication', title: 'Medication Tracking', image: 'medication', height: 358, column: 'b',
    description: 'A planned feature for organizing your prescribed medication information. The patient platform is coming soon.' },
];
