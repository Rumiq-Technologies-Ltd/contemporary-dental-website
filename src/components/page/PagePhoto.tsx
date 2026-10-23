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
  /** CSS object-position for the crop. Group photos that are cut at the top need "50% 0%". */
  objectPosition?: string;
  /** Show the whole photo at its own shape instead of cropping it to the frame. */
  natural?: boolean;
}

export function PagePhoto({ photo, alt = '', wide = false, square = false, priority = false, objectPosition, natural = false }: PagePhotoProps) {
  const shape = natural ? styles.photoNatural : wide ? styles.photoWide : square ? styles.photoSquare : '';
  const { width, height } = photos[photo];
  return <div className={`${styles.photo} ${shape}`} data-reveal="zoom" style={natural ? { aspectRatio: `${width} / ${height}` } : undefined}>
    <Image src={photos[photo]} alt={alt} fill sizes="(max-width: 899px) 100vw, 40vw" quality={90} placeholder="blur" priority={priority} data-scroll-zoom="" style={objectPosition ? { objectPosition } : undefined} />
  </div>;
}
