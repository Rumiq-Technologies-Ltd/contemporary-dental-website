'use client';

import { useEffect, useState } from 'react';
import { services, type ServiceId } from '@/content/services';
import { Icon } from './Icon';

const storageKey = 'cdc:saved-services:v1';
const changeEvent = 'cdc:saved-services-changed';
function readSaved(): ServiceId[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(value) ? services.filter(service => value.includes(service.id)).map(service => service.id) : [];
  } catch { return []; } // Storage can be unavailable or contain stale/malformed data.
}

export function SaveService({ id, title, className, tabIndex }: { id: ServiceId; title: string; className?: string; tabIndex?: number }) {
  const [saved, setSaved] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  useEffect(() => {
    const sync = () => setSaved(readSaved().includes(id));
    sync();
    window.addEventListener(changeEvent, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(changeEvent, sync); window.removeEventListener('storage', sync); };
  }, [id]);

  function toggle() {
    const next = !saved;
    setSaved(next);
    setAnnouncement(next ? `${title} saved on this device.` : `${title} removed from saved services.`);
    try {
      const values = readSaved().filter(value => value !== id);
      if (next) values.push(id);
      localStorage.setItem(storageKey, JSON.stringify(values));
      window.dispatchEvent(new Event(changeEvent));
    } catch {
      setAnnouncement('Preference updated for this visit. Your browser could not save it on this device.');
    }
  }
  return <>
    <button type="button" className={className} aria-label={`Save ${title}`} aria-pressed={saved} tabIndex={tabIndex}
      onPointerDown={event => { if (tabIndex === -1) event.preventDefault(); }}
      onClick={toggle}><Icon name="heart" /></button>
    <span className="sr-only" role="status">{announcement}</span>
  </>;
}
