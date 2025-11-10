'use client';

import type { JSX } from 'react';
import '@/app/styles/ExperienceCircle.css';

// LOGOS
import devinmotion from '@/app/logos/devinmotion.png';
import gvs from '@/app/logos/gvs.svg';

// eslint-disable-next-line import/order
import Image from 'next/image';

import megadev from '@/app/logos/megadevf.png';
import pyt from '@/app/logos/pyt.png';
import qvision from '@/app/logos/qvisionf.webp';
import smartfinancial from '@/app/logos/smartf.png';
import vass from '@/app/logos/vass.png';

/** Rango visible del timeline (uniforme) */
const MIN_YEAR = 2015;
const MAX_YEAR = 2026; // inclusive

type YM = { y: number; m: number }; // m: 1..12
type Exp = {
  from: YM;
  to: YM;
  company: string;
  role: string;
  color?: string;
};

const DATA: Exp[] = [
  { from: { y: 2015, m: 11 }, to: { y: 2018, m: 3 },  company: 'Procesos y Tecnología',   role: 'Analista QA',               color: '#c1d72f' },
  { from: { y: 2018, m: 3 },  to: { y: 2020, m: 11 }, company: 'Smart Financial Systems', role: 'Analista Desarrollador',   color: '#f59e0b' },
  { from: { y: 2020, m: 12 }, to: { y: 2021, m: 3 },  company: 'MEGADEV (CELSIA)',        role: 'Desarrollador & Soporte',  color: '#60a5fa' },
  { from: { y: 2021, m: 3 },  to: { y: 2021, m: 6 },  company: 'Devinmotion (ALTIPAL)',   role: 'Analista Desarrollador',   color: '#ef4444' },
  { from: { y: 2021, m: 6 },  to: { y: 2021, m: 9 },  company: 'Q-Vision (Colmena)',      role: 'Analista Desarrollador',   color: '#22c55e' },
  { from: { y: 2021, m: 12 }, to: { y: 2022, m: 1 },  company: 'MEGADEV (CELSIA)',        role: 'Analista Desarrollador',   color: '#38bdf8' },
  { from: { y: 2022, m: 2 },  to: { y: 2022, m: 6 },  company: 'GVS Colombia',            role: 'Analista Desarrollador',   color: '#a78bfa' },
  { from: { y: 2022, m: 6 },  to: { y: 2025, m: 4 },  company: 'VASS LATAM',              role: 'Analista Desarrollador',   color: '#14b8a6' },
  { from: { y: 2025, m: 5 },  to: { y: 2025, m: 11 }, company: 'FREELANCE DEVELOPER',     role: 'Freelance',                color: '#3c37a7'  },
];

// Mapa de logos por compañía (usa includes para coincidir variaciones)
const companyLogo = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('vass')) return vass;
  if (n.includes('gvs')) return gvs;
  if (n.includes('devinmotion')) return devinmotion;
  if (n.includes('smart financial')) return smartfinancial;
  if (n.includes('procesos y tecnología') || n.includes('procesos y tecnologia')) return pyt;
  if (n.includes('megadev')) return megadev;
  if (n.includes('q-vision') || n.includes('qvision')) return qvision;
  return undefined; // freelance o sin logo
};

/* ---------- helpers ---------- */
function ymToFraction({ y, m }: YM): number {
  return y + (Math.max(1, Math.min(12, m)) - 1) / 12;
}
function posPct(yearFraction: number): number {
  const span = MAX_YEAR - MIN_YEAR;
  return ((yearFraction - MIN_YEAR) / span) * 100;
}
const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
function fmtYM({ y, m }: YM): string { return `${MES[m - 1]} ${y}`; }

/** Asigna carriles (1..N) evitando solaparse en el mismo carril */
function assignLanes(items: { start: number; end: number }[], minGap = 0.0015): number[] {
  const lanesEnd: number[] = [];
  const lanes: number[] = [];

  items.forEach(({ start, end }) => {
    let laneIdx = lanesEnd.findIndex(lastEnd => start >= lastEnd + minGap);
    if (laneIdx === -1) {
      laneIdx = lanesEnd.length;
      lanesEnd.push(end);
    } else {
      lanesEnd[laneIdx] = end;
    }
    lanes.push(laneIdx + 1);
  });

  return lanes;
}

export default function ExperienceCircle(): JSX.Element {
  // Estructura con año fraccional
  const withFrac = DATA.map(d => {
    const startF = ymToFraction(d.from);
    const endF = ymToFraction(d.to);
    return { ...d, startF, endF };
  });

  // Ordenados para estabilidad en lanes
  const sorted = [...withFrac].sort((a, b) => a.startF - b.startF);
  const lanes = assignLanes(sorted.map(s => ({ start: s.startF, end: s.endF })));
  const laneByKey = new Map(sorted.map((s, i) => [s, lanes[i]]));

  return (
    <section className="xt2">
      <h2 className="xt2-title">TIMELINE</h2>

      <div className="xt2-viewport" role="region" aria-label="Línea de tiempo de experiencia">
        <ul className="xt2-bars" role="list">
          {sorted.map((e, idx) => {
            const left = posPct(e.startF);
            const width = Math.max(posPct(e.endF) - posPct(e.startF), 1.2); // mínimo visible
            const lane = laneByKey.get(e) ?? ((idx % 3) + 1);
            const title = `${fmtYM(e.from)} – ${fmtYM(e.to)} • ${e.company} • ${e.role}`;
            const logo = companyLogo(e.company);

            return (
              <li
                key={`${e.company}-${idx}`}
                className={`xt2-bar lane-${lane}`}
                style={
                  {
                    '--left': `${left}%`,
                    '--width': `${width}%`,
                    '--bar-color': e.color ?? '#60a5fa',
                  } as React.CSSProperties
                }
              >
                {/* LOGO centrado arriba */}
                {logo && (
                  <div className="xt2-logo" aria-hidden="true">
                    <Image src={logo.src} alt={e.company}
                      width={96}
                      height={96} />
                  </div>
                )}

                {/* barra clicable */}
                <button
                  className="xt2-track"
                  title={title}
                  aria-label={title}
                  tabIndex={0}
                />
                <div className="xt2-label">
                  <div className="xt2-period">{fmtYM(e.from)} – {fmtYM(e.to)}</div>
                  <div className="xt2-company">{e.company}</div>
                  <div className="xt2-role">{e.role}</div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* marcas de años uniformes */}
        <ul className="xt2-years" aria-hidden="true">
          {Array.from({ length: (MAX_YEAR - MIN_YEAR) + 1 }).map((_, i) => {
            const y = MIN_YEAR + i;
            const left = posPct(y);
            return <li key={y} style={{ left: `${left}%` }}>{y}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
