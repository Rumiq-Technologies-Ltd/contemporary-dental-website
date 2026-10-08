'use client';

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { destinationLabels, site, type Destination } from '@/content/site';
import { services, type ServiceId } from '@/content/services';
import { photos } from '@/content/assets';
import styles from './ui.module.css';

type DialogContent = { kind: 'soon'; destination: Destination } | { kind: 'service'; id: ServiceId } | { kind: 'story' };
const DialogContext = createContext<((content: DialogContent) => void) | null>(null);

// Server-rendered sections arrive as children; only the interaction layer hydrates.
export function Interactions({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [content, setContent] = useState<DialogContent | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const open = useCallback((nextContent: DialogContent) => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    setContent(nextContent);
  }, []);

  useEffect(() => {
    if (!content || !dialog.current) return;
    dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [content]);

  const close = () => dialog.current?.close();
  const onClose = () => {
    setContent(null);
    previousFocus.current?.focus({ preventScroll: true });
  };
  const service = content?.kind === 'service' ? services.find(item => item.id === content.id) : null;
  const title = content?.kind === 'soon' ? destinationLabels[content.destination] : service?.title ?? 'A smile worth sharing';
  return (
    <DialogContext.Provider value={open}>
      {children}
      <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} aria-describedby={descriptionId} onClose={onClose}
        onKeyDown={event => {
          if (event.key !== 'Tab') return;
          // Explicitly wrap focus at both ends: some browsers otherwise visit
          // their chrome between the last and first native-dialog controls.
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]'));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        onClick={event => { if (event.target === event.currentTarget) close(); }}>
        {content && <div className={styles.dialogBody}>
          <button type="button" className={styles.close} onClick={close} aria-label="Close dialog" autoFocus>×</button>
          {content.kind === 'story' && <div className={styles.storyImage}><Image src={photos.smile} fill sizes="(max-width: 600px) 85vw, 450px" alt="A smiling woman from the Contemporary Dental Care design" /></div>}
          <span className={styles.eyebrow}>{service ? 'EXPLORE OUR SERVICES' : 'CONTEMPORARY DENTAL CARE'}</span>
          <h2 id={titleId}>{title}</h2>
          <p id={descriptionId}>{service?.description ?? (content.kind === 'story' ? 'Our smile story is coming soon. Explore our services to discover what is next.' : 'Coming soon. We are preparing this experience. It will be available here when it launches.')}</p>
          {service && <p className={styles.status}>Patient platform · Coming soon</p>}
          <button className="pill pill-accent" type="button" onClick={close}>Back to exploring</button>
        </div>}
      </dialog>
    </DialogContext.Provider>
  );
}

export function Action({ content, className, children, label, tabIndex }: { content: DialogContent; className?: string; children: ReactNode; label?: string; tabIndex?: number }) {
  const open = useContext(DialogContext);
  return <button type="button" className={className} aria-label={label} tabIndex={tabIndex}
    onPointerDown={event => { if (tabIndex === -1) event.preventDefault(); }}
    onClick={() => open?.(content)}>{children}</button>;
}

export function DestinationAction({ destination, className, children, label }: { destination: Destination; className?: string; children: ReactNode; label?: string }) {
  const url = site.destinations[destination];
  // Only explicitly configured secure URLs become outgoing links.
  if (url?.startsWith('https://')) return <a href={url} className={className} aria-label={label} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Action content={{ kind: 'soon', destination }} className={className} label={label}>{children}</Action>;
}
