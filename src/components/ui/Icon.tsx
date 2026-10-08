import { icons, type IconName } from '@/content/assets';

export function Icon({ name }: { name: IconName }) {
  const icon = icons[name];
  // SVGs retain their exported root dimensions. The surrounding badge sets size.
  return <img src={`/images/figma/${icon.file}`} width={icon.width} height={icon.height} alt="" aria-hidden="true" />;
}
