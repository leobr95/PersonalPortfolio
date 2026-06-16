'use client';

import Image from 'next/image';
import type { CSSProperties, JSX } from 'react';

import { MIN_YEAR, MAX_YEAR, type ExpItem, type YM } from './ExperienceSection';
import '@/app/styles/ExperienceCircle.css';

const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const clampMonth = (m: number) => Math.max(1, Math.min(12, m));
const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
const clampDay = (y: number, m: number, d?: number) =>
  Math.max(1, Math.min(daysInMonth(y, m), d ?? 1));
const fmtYM = ({ y, m, d }: YM) => {
  const mm = clampMonth(m);
  return d ? `${d} ${MES[mm - 1]} ${y}` : `${MES[mm - 1]} ${y}`;
};
const ymToFraction = ({ y, m, d }: YM) => {
  const mm = clampMonth(m);
  const dd = clampDay(y, mm, d);
  const dayOffset = (dd - 1) / daysInMonth(y, mm);
  return y + ((mm - 1) + dayOffset) / 12;
};
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

function assignLogoRows(centersPct: number[], minGapPct = 6.2): number[] {
  const rowsLastCenter: number[] = [];
  const rows: number[] = [];
  centersPct.forEach(center => {
    let i = rowsLastCenter.findIndex(lastCenter => center >= lastCenter + minGapPct);
    if (i === -1) {
      i = rowsLastCenter.length;
      rowsLastCenter.push(center);
    } else {
      rowsLastCenter[i] = center;
    }
    rows.push(i + 1);
  });
  return rows;
}

const CONTRAST_LOGO_COMPANIES = new Set([
  'VASS LATAM',
  'GVS Colombia',
  'Procesos y Tecnología',
]);

const needsContrastLogoBg = (company: string) => CONTRAST_LOGO_COMPANIES.has(company);

// CSS variables tipadas
type BarVars = CSSProperties & {
  ['--left']?: string;
  ['--width']?: string;
  ['--bar-color']?: string;
  ['--logo-offset']?: string;
  ['--bar-delay']?: string;
  ['--bar-order']?: number;
};
type BarsVars = CSSProperties & {
  ['--logo-stack-top']?: number;
  ['--logo-stack-bottom']?: number;
  ['--bar-count']?: number;
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

  const withPos = withFrac.map(d => {
    const left = posPct(d.startF);
    const width = Math.max(posPct(d.endF) - posPct(d.startF), 1.2);
    const center = left + (width / 2);
    return { ...d, left, width, center };
  });

  const lanes = assignLanes(withPos.map(s => ({ start: s.startF, end: s.endF })));
  const logoRowsByCenter = assignLogoRows(withPos.map(s => s.center));
  const logoRows = withPos.map((_, idx) => Math.max(logoRowsByCenter[idx] ?? 1, lanes[idx] ?? 1));
  const topBands = logoRows
    .filter(row => row % 2 === 1)
    .map(row => Math.ceil(row / 2));
  const bottomBands = logoRows
    .filter(row => row % 2 === 0)
    .map(row => Math.ceil(row / 2));
  const maxTopBand = Math.max(1, ...topBands);
  const maxBottomBand = Math.max(0, ...bottomBands);
  const barsStyle: BarsVars = {
    '--logo-stack-top': maxTopBand,
    '--logo-stack-bottom': maxBottomBand,
    '--bar-count': withPos.length,
  };
  // lane por índice actual (ya viene ordenado por el padre)
  return (
    <section className="xt2">
      <h2 className="xt2-title">Timeline</h2>

      <div className="xt2-viewport" role="region" aria-label="Línea de tiempo de experiencia">
        <ul
          className="xt2-bars"
          role="list"
          style={barsStyle}
        >
          {withPos.map((e, idx) => {
            const lane = lanes[idx] ?? 1;
            const logoRow = logoRows[idx] ?? 1;
            const logoBand = Math.ceil(logoRow / 2);
            const isLogoBelow = logoRow % 2 === 0;
            const title = `${fmtYM(e.from)} – ${fmtYM(e.to)} • ${e.company} • ${e.role}`;
            const isActive = activeId === e.id;
            const isHelpPeopleLogo = e.company === 'HelpPeople';
            const hasContrastLogoBg = needsContrastLogoBg(e.company);
            const logoClassName = isHelpPeopleLogo
              ? 'xt2-logo-helppeople'
              : hasContrastLogoBg
                ? 'xt2-logo-contrast'
                : undefined;
            const logoOffset = isLogoBelow
              ? 18 + ((logoBand - 1) * 66)
              : 24 + ((logoBand - 1) * 66);

            const style: BarVars = {
              '--left': `${e.left}%`,
              '--width': `${e.width}%`,
              '--bar-color': e.color ?? '#60a5fa',
              '--logo-offset': `${logoOffset}px`,
              '--bar-delay': `${Math.min(idx * 90, 720)}ms`,
              '--bar-order': idx,
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
                  <div
                    className={`xt2-logo ${isLogoBelow ? 'is-below' : 'is-above'} ${isHelpPeopleLogo ? 'is-helppeople' : ''} ${hasContrastLogoBg ? 'needs-contrast' : ''}`}
                    title={e.company}
                    aria-label={`Empresa: ${e.company}`}
                  >
                    <Image
                      src={e.logo}
                      alt={e.company}
                      width={62}
                      height={62}
                      title={e.company}
                      className={logoClassName}
                      style={e.logoBg ? { backgroundColor: e.logoBg } : undefined}
                    />
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

      <ol className="xt2-mobile" aria-label="Línea de tiempo vertical de experiencia">
        {withPos.map((e) => {
          const title = `${fmtYM(e.from)} – ${fmtYM(e.to)} • ${e.company} • ${e.role}`;
          const isActive = activeId === e.id;
          const isHelpPeopleLogo = e.company === 'HelpPeople';
          const hasContrastLogoBg = needsContrastLogoBg(e.company);
          const logoClassName = isHelpPeopleLogo
            ? 'xt2-logo-helppeople'
            : hasContrastLogoBg
              ? 'xt2-logo-contrast'
              : undefined;

          return (
            <li
              key={`mobile-${e.id}`}
              className={`xt2m-item ${isActive ? 'is-active' : ''}`}
              style={{ '--bar-color': e.color ?? '#60a5fa' } as CSSProperties}
              onMouseEnter={() => onActivate(e.id)}
              onFocus={() => onActivate(e.id)}
              onMouseLeave={() => onActivate(null)}
              onBlur={() => onActivate(null)}
            >
              <div className="xt2m-year" aria-hidden="true">{e.from.y}</div>
              <button
                type="button"
                className="xt2m-card"
                aria-label={title}
                onClick={() => onActivate(isActive ? null : e.id)}
              >
                <span className="xt2m-rail" aria-hidden="true" />
                <span className="xt2m-dot" aria-hidden="true" />

                {e.logo && (
                  <span
                    className={`xt2m-logo ${isHelpPeopleLogo ? 'is-helppeople' : ''} ${hasContrastLogoBg ? 'needs-contrast' : ''}`}
                    aria-hidden="true"
                  >
                    <Image
                      src={e.logo}
                      alt=""
                      width={52}
                      height={52}
                      className={logoClassName}
                      style={e.logoBg ? { backgroundColor: e.logoBg } : undefined}
                    />
                  </span>
                )}

                <span className="xt2m-copy">
                  <span className="xt2m-period">{fmtYM(e.from)} – {fmtYM(e.to)}</span>
                  <span className="xt2m-company">{e.company}</span>
                  <span className="xt2m-role">{e.role}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
