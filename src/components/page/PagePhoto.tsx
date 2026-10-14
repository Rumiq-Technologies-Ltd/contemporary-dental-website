import Image from 'next/image';
import { photos, type PhotoName } from '@/content/assets';
import styles from './page.module.css';

interface PagePhotoProps {
  photo: PhotoName;
  /** Empty for decorative photos. Practice photographs describe what they show. */
  alt?: string;
  wide?: boolean;
  square?: boolean;
  priority?: boolean;
}

export function PagePhoto({ photo, alt = '', wide = false, square = false, priority = false }: PagePhotoProps) {
  const shape = wide ? styles.photoWide : square ? styles.photoSquare : '';
  return <div className={`${styles.photo} ${shape}`}>
    <Image src={photos[photo]} alt={alt} fill sizes="(max-width: 899px) 100vw, 40vw" placeholder="blur" priority={priority} />
  </div>;
}
