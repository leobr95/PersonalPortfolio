'use client';

import Image from 'next/image';
import type { JSX, CSSProperties } from 'react';

import { ExpItem, MIN_YEAR, MAX_YEAR } from './ExperienceSection';
import '@/app/styles/ExperienceCircle.css';

const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'] as const;
const fmtYM = ({ y, m }: { y:number; m:number }) => `${MES[m - 1]} ${y}`;
const ymToFraction = ({ y, m }: { y:number; m:number }) => y + (Math.max(1, Math.min(12, m)) - 1) / 12;
const posPct = (f:number) => ((f - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;

function assignLanes(items: { start: number; end: number }[], minGap = 0.0015): number[] {
  const lanesEnd: number[] = []; const lanes: number[] = [];
  items.forEach(({ start, end }) => {
    let laneIdx = lanesEnd.findIndex(lastEnd => start >= lastEnd + minGap);
    if (laneIdx === -1) { laneIdx = lanesEnd.length; lanesEnd.push(end); }
    else { lanesEnd[laneIdx] = end; }
    lanes.push(laneIdx + 1);
  });
  return lanes;
}

/** CSS vars que usa la barra */
type BarVars = CSSProperties & {
  ['--left']: string;
  ['--width']: string;
  ['--bar-color']: string;
};

export default function ExperienceCircle({
  items,
  activeIndex,
  onActivate,
}: {
  items: ExpItem[];
  activeIndex: number | null;
  onActivate: (i: number | null) => void;
}): JSX.Element {
  const withFrac = items.map((d, i) => ({
    ...d,
    idx: i,
    startF: ymToFraction(d.from),
    endF: ymToFraction(d.to),
  }));
  const sorted = [...withFrac].sort((a, b) => a.startF - b.startF);
  const lanes = assignLanes(sorted.map(s => ({ start: s.startF, end: s.endF })));
  const laneByKey = new Map(sorted.map((s, i) => [s.idx, lanes[i]]));

  const years = Array.from({ length: (MAX_YEAR - MIN_YEAR) + 1 }).map((_, i) => MIN_YEAR + i);

  return (
    <section className="xt2">
      <h2 className="xt2-title">Timeline</h2>

      <div className="xt2-viewport" role="region" aria-label="Línea de tiempo de experiencia">
        <ul className="xt2-bars" role="list">
          {sorted.map((e) => {
            const left = posPct(e.startF);
            const width = Math.max(posPct(e.endF) - posPct(e.startF), 1.2);
            const lane = laneByKey.get(e.idx) ?? 1;
            const title = `${fmtYM(e.from)} – ${fmtYM(e.to)} • ${e.company} • ${e.role}`;
            const isActive = activeIndex === e.idx;

            const style: BarVars = {
              '--left': `${left}%`,
              '--width': `${width}%`,
              '--bar-color': e.color ?? '#60a5fa',
            };

            return (
              <li
                key={`${e.company}-${e.idx}`}
                className={`xt2-bar lane-${lane} ${isActive ? 'is-active' : ''}`}
                style={style}
                onMouseEnter={() => onActivate(e.idx)}
                onFocus={() => onActivate(e.idx)}
                onMouseLeave={() => onActivate(null)}
                onBlur={() => onActivate(null)}
                onClick={() => onActivate(isActive ? null : e.idx)}
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

        {/* Años — en móvil ocultamos algunos vía CSS para evitar “apeñusque” */}
        <ul className="xt2-years" aria-hidden="true">
          {years.map((y, idx) => {
            const left = posPct(y);
            return <li key={y} style={{ left: `${left}%` }} data-index={idx}>{y}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
