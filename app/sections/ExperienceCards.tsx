'use client';

import Image from 'next/image';
import { useState, type JSX } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

import type { ExpItem } from './ExperienceSection';
import '@/app/styles/ExperienceCards.css';

export default function ExperienceCards({
  items,
  activeIndex,
  onActivate,
}: {
  items: ExpItem[];
  activeIndex: number | null;
  onActivate: (i: number | null) => void;
}): JSX.Element {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => () => setOpen(curr => (curr === i ? null : i));

  return (
    <section className="xpSec" aria-label="Experiencia profesional">
      {items.map((it, i) => {
        const isOpen = open === i;
        const pills = it.tags.slice(0, 3);
        const isActive = activeIndex === i;

        return (
          <article
            key={`${it.company}-${it.periodLabel}`}
            className={`xp-card tone-${it.tone} ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => onActivate(i)}
            onFocus={() => onActivate(i)}
            onMouseLeave={() => onActivate(null)}
            onBlur={() => onActivate(null)}
            onClick={() => onActivate(isActive ? null : i)}
          >
            {it.logo && (
              <figure className="xp-card-logo">
                <Image src={it.logo} alt={`Logo ${it.company}`} width={96} height={96} priority={i < 2} />
              </figure>
            )}

            <header className="xp-card-head">
              <h3 className="xp-title">{it.company}</h3>
              <p className="xp-sub">{it.role}{it.clients ? ` · ${it.clients}` : ''}</p>
              <span className="xp-period">{it.periodLabel}</span>
            </header>

            <ul className="xp-pills" role="list">
              {pills.map(tag => <li key={tag} className="xp-pill">{tag}</li>)}
            </ul>

            <div className="xp-actions">
              <button
                type="button"
                className="xp-btn"
                onClick={toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`duties-${i}`}
              >
                {isOpen ? <MdExpandLess aria-hidden /> : <MdExpandMore aria-hidden />}
                {isOpen ? 'Ocultar funciones' : 'Ver funciones'}
              </button>
            </div>

            <div id={`duties-${i}`} className={`xp-duties ${isOpen ? 'is-open' : ''}`}>
              <ul role="list">
                {it.duties.map(d => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </article>
        );
      })}
    </section>
  );
}
