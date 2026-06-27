'use client';

import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect, useMemo, type JSX } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

import type { ExpItem } from './ExperienceSection';
import '@/app/styles/ExperienceCards.css';

export default function ExperienceCards({
  items,
  activeId,
  onActivate,
}: {
  items: ExpItem[];
  activeId: number | null;
  onActivate: (id: number | null) => void;
}): JSX.Element {
  const [open, setOpen] = useState<number | null>(null);
  const [columnCount, setColumnCount] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  // refs por id para medir altura de cada duties
  const dutiesRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggle = (id: number) => () => {
    setOpen(curr => (curr === id ? null : id));
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const syncColumns = () => {
      const template = window.getComputedStyle(section).gridTemplateColumns;
      const nextCount = template === 'none'
        ? 1
        : template.split(' ').filter(Boolean).length;

      setColumnCount(Math.max(1, nextCount));
    };

    syncColumns();

    const resizeObserver = new ResizeObserver(syncColumns);
    resizeObserver.observe(section);
    window.addEventListener('resize', syncColumns);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncColumns);
    };
  }, []);

  const openIndex = useMemo(() => (
    open == null ? -1 : items.findIndex(it => it.id === open)
  ), [items, open]);

  const shouldShiftPreviousCard = (
    columnCount > 1
    && openIndex > 0
    && openIndex % columnCount === columnCount - 1
  );

  const getVisualOrder = (index: number): number => {
    if (!shouldShiftPreviousCard) return index;
    if (index === openIndex) return openIndex - 1;
    if (index === openIndex - 1) return openIndex;
    return index;
  };

  const layoutTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 38, mass: 0.75 };

  // Cuando cambia "open" o cambia el layout (resize), recalcula alturas
  useEffect(() => {
    const applyHeights = () => {
      items.forEach(it => {
        const el = dutiesRefs.current[it.id];
        if (!el) return;
        if (open === it.id) {
          // Deja margen para padding/bordes y cambios de wrapping en móvil.
          el.style.maxHeight = `${el.scrollHeight + 32}px`;
        } else {
          el.style.maxHeight = '0px';
        }
      });
    };
    applyHeights();
    const raf = window.requestAnimationFrame(applyHeights);

    const onResize = () => applyHeights();
    window.addEventListener('resize', onResize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [open, items, columnCount]);

  return (
    <LayoutGroup id="experience-cards">
      <section
        ref={sectionRef}
        className={`xpSec ${open != null ? 'has-open-card' : ''}`}
        aria-label="Experiencia profesional"
      >
        {items.map((it, index) => {
          const isOpen = open === it.id;
          const isActive = activeId === it.id;
          const pills = (it.tags ?? []).slice(0, 3);

          return (
            <motion.article
              key={it.id}
              layout={!shouldReduceMotion}
              transition={layoutTransition}
              className={`xp-card tone-${it.tone ?? 'blue'} ${isActive ? 'is-active' : ''} ${isOpen ? 'is-open' : ''}`}
              style={{
                order: getVisualOrder(index),
                gridColumn: isOpen && columnCount > 1 ? 'span 2' : undefined,
              }}
              onMouseEnter={() => onActivate(it.id)}
              onFocus={() => onActivate(it.id)}
              onMouseLeave={() => onActivate(null)}
              onBlur={() => onActivate(null)}
            >
              {it.logo && (
                <figure className="xp-card-logo">
                  <Image
                    src={it.logo}
                    alt={`Logo ${it.company}`}
                    width={96}
                    height={96}
                    style={it.logoBg ? { backgroundColor: it.logoBg } : undefined}
                  />
                </figure>
              )}

              <header className="xp-card-head">
                <h3 className="xp-title">{it.company}</h3>
                <p className="xp-sub">
                  {it.role}{it.clients ? ` · ${it.clients}` : ''}
                </p>
                {it.period && <span className="xp-period">{it.period}</span>}
              </header>

              <ul className="xp-pills" role="list">
                {pills.map(tag => <li key={`${it.id}-${tag}`} className="xp-pill">{tag}</li>)}
              </ul>

              <div className="xp-actions">
                <button
                  type="button"
                  className="xp-btn"
                  onClick={toggle(it.id)}
                  aria-expanded={isOpen}
                  aria-controls={`duties-${it.id}`}
                >
                  {isOpen ? <MdExpandLess aria-hidden /> : <MdExpandMore aria-hidden />}
                  {isOpen ? 'Ocultar funciones' : 'Ver funciones'}
                </button>
              </div>

              {it.duties && (
                <div
                  id={`duties-${it.id}`}
                  className={`xp-duties ${isOpen ? 'is-open' : ''}`}
                  ref={(el) => { dutiesRefs.current[it.id] = el; }}
                  // maxHeight se maneja via inline en el effect
                  style={{ maxHeight: 0 }}
                >
                  <ul role="list">
                    {it.duties.map((d, idx) => (
                      <li
                        key={`${it.id}-${d}`}
                        style={{ transitionDelay: isOpen ? `${Math.min(idx * 25, 150)}ms` : '0ms' }}
                        className="xp-duty-item"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.article>
          );
        })}
      </section>
    </LayoutGroup>
  );
}
