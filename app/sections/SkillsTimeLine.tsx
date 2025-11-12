'use client';

import type { JSX } from 'react';
import { DiMsqlServer } from 'react-icons/di';
import { FaDatabase } from 'react-icons/fa';
import {
  SiDotnet, SiReact, SiTypescript, SiAngular, SiNextdotjs,
  SiMongodb, SiDocker, SiGit,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { VscAzureDevops, VscAzure } from 'react-icons/vsc';

import '@/app/styles/SkillsTimeline.css';

/** Rango visible del timeline */
const MIN_YEAR = 2015;
const MAX_YEAR = 2026; // inclusive

type YM = { y: number; m: number }; // m: 1..12
type Skill = {
  name: string;
  icon: JSX.Element;
  from: YM;
  to: YM;
  color?: string;
};

const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

/* Helpers */
function ymToFraction({ y, m }: YM): number {
  return y + (Math.max(1, Math.min(12, m)) - 1) / 12;
}
function posPct(yearFraction: number): number {
  const span = MAX_YEAR - MIN_YEAR;
  return ((yearFraction - MIN_YEAR) / span) * 100;
}
function fmtYM({ y, m }: YM): string { return `${MES[m - 1]} ${y}`; }
function diffYM(a: YM, b: YM): { years: number; months: number; label: string } {
  let years = b.y - a.y;
  let months = b.m - a.m;
  if (months < 0) { years -= 1; months += 12; }
  const label = years > 0
    ? `${years} año${years !== 1 ? 's' : ''}${months ? ` ${months} mes${months !== 1 ? 'es' : ''}` : ''}`
    : `${months} mes${months !== 1 ? 'es' : ''}`;
  return { years, months, label };
}

/** Datos: una fila por tecnología (ajústalas cuando quieras) */
const SKILLS: Skill[] = [
  { name: 'C#',                 icon: <TbBrandCSharp />,          from: { y: 2018, m: 11 }, to: { y: 2025, m: 11 }, color: '#7c4dff' },
  { name: '.NET / ASP.NET',     icon: <SiDotnet />,               from: { y: 2018, m: 3 },  to: { y: 2026, m: 1 },  color: '#512da8' },
  { name: 'SQL Server',         icon: <DiMsqlServer />,           from: { y: 2016, m: 6 },  to: { y: 2026, m: 1 },  color: '#ef4444' },
  { name: 'Docker',             icon: <SiDocker />,               from: { y: 2020, m: 6 },  to: { y: 2026, m: 1 },  color: '#38bdf8' },
  { name: 'Azure DevOps',       icon: <VscAzureDevops />,         from: { y: 2020, m: 6 },  to: { y: 2026, m: 1 },  color: '#3b82f6' },
  { name: 'Azure (App/KV)',     icon: <VscAzure />,               from: { y: 2021, m: 6 },  to: { y: 2026, m: 1 },  color: '#2563eb' },
  { name: 'React',              icon: <SiReact />,                from: { y: 2021, m: 1 },  to: { y: 2026, m: 1 },  color: '#22d3ee' },
  { name: 'TypeScript',         icon: <SiTypescript />,           from: { y: 2021, m: 1 },  to: { y: 2026, m: 1 },  color: '#60a5fa' },
  { name: 'Next.js',            icon: <SiNextdotjs />,            from: { y: 2022, m: 1 },  to: { y: 2026, m: 1 },  color: '#9ca3af' },
  { name: 'Angular',            icon: <SiAngular />,              from: { y: 2021, m: 2 },  to: { y: 2025, m: 6 },  color: '#f87171' },
  { name: 'MongoDB',            icon: <SiMongodb />,              from: { y: 2024, m: 7 },  to: { y: 2026, m: 1 },  color: '#22c55e' },
  { name: 'Git / GitLab / TFS', icon: <SiGit />,                  from: { y: 2016, m: 1 },  to: { y: 2026, m: 1 },  color: '#f97316' },
  { name: 'RDL / SSRS',         icon: <FaDatabase />,             from: { y: 2018, m: 5 },  to: { y: 2025, m: 4 },  color: '#a78bfa' },
];

export default function SkillsTimeline(): JSX.Element {
  // Convertimos a fracciones y ordenamos por inicio
  const rows = SKILLS.map(s => ({
    ...s,
    startF: ymToFraction(s.from),
    endF: ymToFraction(s.to),
  })).sort((a, b) => a.startF - b.startF);

  return (
    <section className="skl2">
      <h2 className="skl2-title"> (2015–2026)</h2>

      <div className="skl2-viewport" role="region" aria-label="Timeline de habilidades">
        {/* Cabecera: marcas de años */}
        <ul className="skl2-years" aria-hidden="true">
          {Array.from({ length: (MAX_YEAR - MIN_YEAR) + 1 }).map((_, i) => {
            const y = MIN_YEAR + i;
            const left = posPct(y);
            return <li key={y} style={{ left: `${left}%` }}>{y}</li>;
          })}
        </ul>

        {/* Filas: etiqueta (icono+nombre) + barra */}
        <ul className="skl2-rows" role="list">
          {rows.map((e) => {
            const left = posPct(e.startF);
            const width = Math.max(posPct(e.endF) - posPct(e.startF), 1.2);
            const spanText = `${fmtYM(e.from)} – ${fmtYM(e.to)}`;
            const diff = diffYM(e.from, e.to);
            const title = `${e.name} • ${spanText} • ${diff.label}`;

            return (
              <li key={e.name} className="skl2-row">
                {/* Etiqueta izquierda */}
                <div className="skl2-label">
                  <span className="skl2-ico" aria-hidden>{e.icon}</span>
                  <div className="skl2-meta">
                    <strong className="skl2-name">{e.name}</strong>
                    <span className="skl2-span">{diff.label}</span>
                  </div>
                </div>

                {/* Barra temporal (variables en el WRAP para que las lea el tooltip) */}
                <div
                  className="skl2-barwrap"
                  style={
                    {
                      '--left': `${left}%`,
                      '--width': `${width}%`,
                      '--bar-color': e.color ?? '#60a5fa',
                    } as React.CSSProperties
                  }
                >
                  <button
                    className="skl2-bar"
                    title={title}
                    aria-label={title}
                  />
                  <div className="skl2-tip" role="tooltip" aria-hidden="true">
                    <span className="skl2-tip-name">{e.name}</span>
                    <span className="skl2-tip-range">{spanText}</span>
                    <span className="skl2-tip-exp">{diff.label}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
