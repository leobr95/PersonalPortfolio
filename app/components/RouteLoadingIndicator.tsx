'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';

import '@/app/styles/RouteLoadingIndicator.css';

const MIN_VISIBLE_MS = 320;
const SAFETY_TIMEOUT_MS = 7000;

function isInternalNavigation(event: MouseEvent): boolean {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

  const target = event.target;
  if (!(target instanceof Element)) return false;

  const anchor = target.closest<HTMLAnchorElement>('a[href]');
  if (!anchor) return false;
  if (anchor.target && anchor.target !== '_self') return false;
  if (anchor.hasAttribute('download')) return false;

  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;

  const nextUrl = new URL(anchor.href, window.location.href);
  if (nextUrl.origin !== window.location.origin) return false;

  const currentUrl = new URL(window.location.href);
  const sameRoute = nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search;
  if (sameRoute) return false;

  return true;
}

export default function RouteLoadingIndicator() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const startedAtRef = useRef(0);
  const hideTimerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);

  const clearTimer = (timerRef: MutableRefObject<number | null>) => {
    if (timerRef.current === null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const show = useCallback(() => {
    clearTimer(hideTimerRef);
    clearTimer(safetyTimerRef);
    startedAtRef.current = Date.now();
    setVisible(true);

    safetyTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      safetyTimerRef.current = null;
    }, SAFETY_TIMEOUT_MS);
  }, []);

  const hide = useCallback(() => {
    clearTimer(safetyTimerRef);

    const elapsed = Date.now() - startedAtRef.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);

    clearTimer(hideTimerRef);
    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      hideTimerRef.current = null;
    }, delay);
  }, []);

  useEffect(() => {
    hide();
  }, [pathname, hide]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isInternalNavigation(event)) show();
    };

    const handlePopState = () => {
      show();
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
      clearTimer(hideTimerRef);
      clearTimer(safetyTimerRef);
    };
  }, [show]);

  return (
    <div
      className={`route-loader ${visible ? 'is-visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Cargando página"
    >
      <div className="route-loader__bar" aria-hidden />
      <div className="route-loader__pill" aria-hidden={!visible}>
        <span className="route-loader__spinner" />
        <span className="route-loader__label">Cargando</span>
      </div>
    </div>
  );
}
