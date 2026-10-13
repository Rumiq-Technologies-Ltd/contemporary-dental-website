import Image from 'next/image';
import { photos, type PhotoName } from '@/content/assets';
import styles from './page.module.css';

interface PagePhotoProps {
  photo: PhotoName;
  /** Decorative by default. Stock photos must keep generic alt text. */
  alt?: string;
  wide?: boolean;
  priority?: boolean;
}

export function PagePhoto({ photo, alt = '', wide = false, priority = false }: PagePhotoProps) {
  return <div className={`${styles.photo} ${wide ? styles.photoWide : ''}`}>
    <Image src={photos[photo]} alt={alt} fill sizes="(max-width: 899px) 100vw, 40vw" placeholder="blur" priority={priority} />
  </div>;
}
