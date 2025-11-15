'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, type JSX } from 'react';
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
  // refs por id para medir altura de cada duties
  const dutiesRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggle = (id: number) => () => {
    setOpen(curr => (curr === id ? null : id));
  };

  // Cuando cambia "open" o cambia el layout (resize), recalcula alturas
  useEffect(() => {
    const applyHeights = () => {
      items.forEach(it => {
        const el = dutiesRefs.current[it.id];
        if (!el) return;
        if (open === it.id) {
          // setear a scrollHeight para animar a su tamaño real
          el.style.maxHeight = `${el.scrollHeight}px`;
        } else {
          el.style.maxHeight = '0px';
        }
      });
    };
    applyHeights();

    const onResize = () => applyHeights();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open, items]);

  return (
    <section className="xpSec" aria-label="Experiencia profesional">
      {items.map(it => {
        const isOpen = open === it.id;
        const isActive = activeId === it.id;
        const pills = (it.tags ?? []).slice(0, 3);

        return (
          <article
            key={it.id}
            className={`xp-card tone-${it.tone ?? 'blue'} ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => onActivate(it.id)}
            onFocus={() => onActivate(it.id)}
            onMouseLeave={() => onActivate(null)}
            onBlur={() => onActivate(null)}
          >
            {it.logo && (
              <figure className="xp-card-logo">
                <Image src={it.logo} alt={`Logo ${it.company}`} width={96} height={96} />
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
          </article>
        );
      })}
    </section>
  );
}
