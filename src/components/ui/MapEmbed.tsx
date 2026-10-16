import styles from './MapEmbed.module.css';

interface MapEmbedProps {
  /** Embed address of the map. */
  src: string;
  /** Accessible name of the frame. */
  title: string;
}

// The office map, shown on the page. It is a Google Maps frame, so the frame's requests go to Google.
export function MapEmbed({ src, title }: MapEmbedProps) {
  return <iframe src={src} title={title} loading="lazy" className={styles.frame} />;
}
