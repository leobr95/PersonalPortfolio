'use client';

import { useEffect, useState, PropsWithChildren } from 'react';
import { FaBars } from 'react-icons/fa';

import CvFab from '@/app/components/CvFab';
import RouteLoadingIndicator from '@/app/components/RouteLoadingIndicator';
import Sidebar from '@/app/components/Sidebar';
import '@/app/styles/theme.css';
import '@/app/styles/portfolio.css';

export default function PortfolioLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 980px)');
    const syncViewport = () => {
      setIsMobile(media.matches);
      if (!media.matches) setOpen(false);
    };

    syncViewport();
    media.addEventListener('change', syncViewport);
    return () => media.removeEventListener('change', syncViewport);
  }, []);

  const sidebarVisible = isMobile ? open : !sidebarHidden;

  const handleSidebarToggle = () => {
    if (isMobile) {
      setOpen((value) => !value);
      return;
    }

    setSidebarHidden((value) => !value);
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setOpen(false);
      return;
    }

    setSidebarHidden(true);
  };

  return (
    <>
      <RouteLoadingIndicator />

      {!sidebarVisible ? (
        <button
          type="button"
          className={`pf-hamburger ${sidebarHidden ? 'is-sidebar-hidden' : ''}`}
          aria-label="Mostrar barra lateral"
          aria-expanded={sidebarVisible}
          onClick={handleSidebarToggle}
        >
          <FaBars aria-hidden />
        </button>
      ) : null}

      {/* Overlay móvil */}
      <div className={`pf-overlay ${open ? 'is-on' : ''}`} onClick={() => setOpen(false)} />

      <section className={`pf ${open ? 'pf--menuOpen' : ''} ${sidebarHidden ? 'pf--sidebarHidden' : ''}`}>
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
          onRequestClose={handleSidebarClose}
        />
        <main className="pf-main">{children}</main>
      </section>
      <CvFab
        fileUrl="/cv/Leonardo_Burbano_CV.pdf"
        filename="Leonardo_Burbano_CV.pdf"
        label="Ver curriculum"
        subtitle="Descargar mi CV en PDF"
        modalTitle="Currículum"
        downloadLabel="Descargar CV"
        closeLabel="Cerrar"
      />
    </>
  );
}
