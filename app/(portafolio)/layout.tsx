'use client';

import { useState, PropsWithChildren } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import Sidebar from '@/app/components/Sidebar';
import '@/app/styles/theme.css';
import '@/app/styles/portfolio.css';

export default function PortfolioLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa (solo móvil) */}
      <button
        type="button"
        className="pf-hamburger"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        {open ? <FaTimes aria-hidden /> : <FaBars aria-hidden />}
      </button>

      {/* Overlay móvil */}
      <div className={`pf-overlay ${open ? 'is-on' : ''}`} onClick={() => setOpen(false)} />

      <section className={`pf ${open ? 'pf--menuOpen' : ''}`}>
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <main className="pf-main">{children}</main>
      </section>
    </>
  );
}
