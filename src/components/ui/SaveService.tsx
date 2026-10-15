'use client';

import { useEffect, useState } from 'react';
import { serviceIds, type ServiceId } from '@/content/serviceIds';
import { fill } from '@/i18n/fill';
import type { CommonMessages } from '@/i18n/messages/common';
import { Icon } from './Icon';

const storageKey = 'cdc:saved-services:v1';
const changeEvent = 'cdc:saved-services-changed';
function readSaved(): ServiceId[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(value) ? serviceIds.filter(id => value.includes(id)) : [];
  } catch { return []; } // Storage can be unavailable or contain stale/malformed data.
}

interface SaveServiceProps {
  id: ServiceId;
  /** Service name, already in the page language. */
  title: string;
  labels: CommonMessages['saveService'];
  className?: string;
  tabIndex?: number;
}

export function SaveService({ id, title, labels, className, tabIndex }: SaveServiceProps) {
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
    setAnnouncement(fill(next ? labels.saved : labels.removed, { title }));
    try {
      const values = readSaved().filter(value => value !== id);
      if (next) values.push(id);
      localStorage.setItem(storageKey, JSON.stringify(values));
      window.dispatchEvent(new Event(changeEvent));
    } catch {
      setAnnouncement(labels.storageFailed);
    }
  }
  return <>
    <button type="button" className={className} aria-label={fill(labels.save, { title })} aria-pressed={saved} tabIndex={tabIndex}
      onPointerDown={event => { if (tabIndex === -1) event.preventDefault(); }}
      onClick={toggle}><Icon name="heart" /></button>
    <span className="sr-only" role="status">{announcement}</span>
  </>;
}
