import Image from 'next/image';
import { photos, type PhotoName } from '@/content/assets';
import styles from './page.module.css';

interface ServicePhotoProps {
  photo: PhotoName;
  /** CSS object-position, for a photo whose people sit off the usual focus. */
  focus?: string;
}

// The photo beside a service page's heading and text. Every service page uses the same 5:4 frame,
// so the photos match in size and position from page to page. The square and 4:3 originals lose
// only a strip at the top or sides, and the default focus keeps heads in the frame.
export function ServicePhoto({ photo, focus = '50% 35%' }: ServicePhotoProps) {
  return <div className={`${styles.photo} ${styles.photoService}`} data-reveal="zoom">
    <Image src={photos[photo]} alt="" fill sizes="(max-width: 899px) 100vw, 40vw" quality={90} placeholder="blur" priority data-scroll-zoom="" style={{ objectPosition: focus }} />
  </div>;
}
