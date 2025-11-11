'use client';

import Image from 'next/image';
import type { CSSProperties, JSX } from 'react';

import { MIN_YEAR, MAX_YEAR, type ExpItem, type YM } from './ExperienceSection';
import '@/app/styles/ExperienceCircle.css';

const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const fmtYM = ({ y, m }: YM) => `${MES[m - 1]} ${y}`;
const ymToFraction = ({ y, m }: YM) => y + (Math.max(1, Math.min(12, m)) - 1) / 12;
const posPct = (f: number) => ((f - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;

function assignLanes(items: { start: number; end: number }[], minGap = 0.0015): number[] {
  const lanesEnd: number[] = [];
  const lanes: number[] = [];
  items.forEach(({ start, end }) => {
    let i = lanesEnd.findIndex(lastEnd => start >= lastEnd + minGap);
    if (i === -1) { i = lanesEnd.length; lanesEnd.push(end); }
    else { lanesEnd[i] = end; }
    lanes.push(i + 1);
  });
  return lanes;
}

// CSS variables tipadas
type BarVars = CSSProperties & {
  ['--left']?: string;
  ['--width']?: string;
  ['--bar-color']?: string;
};

export default function ExperienceCircle({
  items,
  activeId,
  onActivate,
}: {
  items: ExpItem[];
  activeId: number | null;
  onActivate: (id: number | null) => void;
}): JSX.Element {
  // convertir a fracciones y mantener id
  const withFrac = items.map(d => ({
    ...d,
    startF: ymToFraction(d.from),
    endF: ymToFraction(d.to),
  }));

  const lanes = assignLanes(withFrac.map(s => ({ start: s.startF, end: s.endF })));
  // lane por índice actual (ya viene ordenado por el padre)
  return (
    <section className="xt2">
      <h2 className="xt2-title">Timeline</h2>

      <div className="xt2-viewport" role="region" aria-label="Línea de tiempo de experiencia">
        <ul className="xt2-bars" role="list">
          {withFrac.map((e, idx) => {
            const left = posPct(e.startF);
            const width = Math.max(posPct(e.endF) - posPct(e.startF), 1.2);
            const lane = lanes[idx] ?? 1;
            const title = `${fmtYM(e.from)} – ${fmtYM(e.to)} • ${e.company} • ${e.role}`;
            const isActive = activeId === e.id;

            const style: BarVars = {
              '--left': `${left}%`,
              '--width': `${width}%`,
              '--bar-color': e.color ?? '#60a5fa',
            };

            return (
              <li
                key={e.id}
                className={`xt2-bar lane-${lane} ${isActive ? 'is-active' : ''}`}
                style={style}
                onMouseEnter={() => onActivate(e.id)}
                onFocus={() => onActivate(e.id)}
                onMouseLeave={() => onActivate(null)}
                onBlur={() => onActivate(null)}
                onClick={() => onActivate(isActive ? null : e.id)}
              >
                {e.logo && (
                  <div className="xt2-logo" aria-hidden="true">
                    <Image src={e.logo} alt={e.company} width={28} height={28} />
                  </div>
                )}

                <button className="xt2-track" title={title} aria-label={title} tabIndex={0} />
                <div className="xt2-label">
                  <div className="xt2-period">{fmtYM(e.from)} – {fmtYM(e.to)}</div>
                  <div className="xt2-company">{e.company}</div>
                  <div className="xt2-role">{e.role}</div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Años (en móvil se ocultan algunos via CSS para no “apeñuscar”) */}
        <ul className="xt2-years" aria-hidden="true">
          {Array.from({ length: (MAX_YEAR - MIN_YEAR) + 1 }).map((_, i) => {
            const y = MIN_YEAR + i;
            const left = posPct(y);
            return <li key={y} style={{ left: `${left}%` }} data-index={i}>{y}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
