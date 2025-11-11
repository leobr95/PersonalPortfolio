'use client';

import Image from 'next/image';
import { useState, type JSX } from 'react';
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
  const toggle = (id: number) => () => setOpen(curr => (curr === id ? null : id));

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
              <div id={`duties-${it.id}`} className={`xp-duties ${isOpen ? 'is-open' : ''}`}>
                <ul role="list">
                  {it.duties.map(d => <li key={`${it.id}-${d}`}>{d}</li>)}
                </ul>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
