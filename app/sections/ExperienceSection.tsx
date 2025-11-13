'use client';

import type { JSX } from 'react';
import { DiMsqlServer } from 'react-icons/di';
import { FaDatabase } from 'react-icons/fa';
import {
  SiDotnet, SiReact, SiTypescript, SiAngular, SiNextdotjs,
   SiDocker, SiGit,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
// eslint-disable-next-line import/order
import { VscAzureDevops, VscAzure } from 'react-icons/vsc';

import '@/app/styles/SkillsTimeline.css';
// eslint-disable-next-line import/order
import { StaticImageData } from 'next/image';

/** Ventana visible del timeline */
const MIN_YEAR = 2015;
const MAX_YEAR = 2026; // inclusive

/* ===== Tipos ===== */
type YM = { y: number; m: number }; // m: 1..12
type Segment = { from: YM; to: YM; org?: string };
type Skill = {
  name: string;
  icon: JSX.Element;
  color?: string;
  /** uno o más rangos (permite huecos) */
  segments: Segment[];
};
export type ExpItem = {
  id: number;
  company: string;
  role: string;
  from: YM;
  to: YM;
  color?: string;
  logo?: StaticImageData;
  // para las tarjetas:
  period?: string;
  clients?: string;
  tone?: 'green' | 'blue' | 'orange' | 'red';
  tags?: string[];
  duties?: string[];
};
const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

/* ===== Helpers ===== */
function ymToFraction({ y, m }: YM): number {
  const mm = Math.max(1, Math.min(12, m));
  return y + (mm - 1) / 12;
}
function posPct(yearFraction: number): number {
  const span = MAX_YEAR - MIN_YEAR;
  return ((yearFraction - MIN_YEAR) / span) * 100;
}
function fmtYM({ y, m }: YM): string {
  return `${MES[Math.max(1, Math.min(12, m)) - 1]} ${y}`;
}
function diffYM(a: YM, b: YM) {
  let years = b.y - a.y;
  let months = b.m - a.m;
  if (months < 0) { years -= 1; months += 12; }
  const label = years > 0
    ? `${years} año${years !== 1 ? 's' : ''}${months ? ` ${months} mes${months !== 1 ? 'es' : ''}` : ''}`
    : `${months} mes${months !== 1 ? 'es' : ''}`;
  return { years, months, label, totalMonths: years * 12 + months };
}
function sumSegmentsTotal(segments: Segment[]) {
  // Suma bruta (si hubiera solapes, podrías normalizar aquí)
  const total = segments.reduce((acc, s) => acc + diffYM(s.from, s.to).totalMonths, 0);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const label = years > 0
    ? `${years} año${years !== 1 ? 's' : ''}${months ? ` ${months} mes${months !== 1 ? 'es' : ''}` : ''}`
    : `${months} mes${months !== 1 ? 'es' : ''}`;
  return { years, months, label, totalMonths: total };
}

/* ===== Datos por experiencia (para reutilizar) ===== */
const PnT = { from: { y: 2015, m: 11 }, to: { y: 2018, m: 3 }, org: 'Procesos y Tecnología' };
const Smart = { from: { y: 2018, m: 3 },  to: { y: 2020, m: 11 }, org: 'Smart Financial' };
const MegaA = { from: { y: 2020, m: 12 }, to: { y: 2021, m: 3 },  org: 'MEGADEV (CELSIA)' };
const Devin = { from: { y: 2021, m: 3 },  to: { y: 2021, m: 6 },  org: 'Devinmotion' };
const QVision = { from: { y: 2021, m: 6 }, to: { y: 2021, m: 9 },  org: 'Q-Vision' };
const MegaB = { from: { y: 2021, m: 12 }, to: { y: 2022, m: 1 },  org: 'MEGADEV (CELSIA)' };
const GVS = { from: { y: 2022, m: 2 },  to: { y: 2022, m: 6 },  org: 'GVS Colombia' };
const VASS = { from: { y: 2022, m: 6 },  to: { y: 2025, m: 4 },  org: 'VASS LATAM' };
const LBCW = { from: { y: 2025, m: 5 },  to: { y: 2025, m: 11 }, org: 'ld.codeworks' };

/* ===== Grupos ===== */
/** Técnicas (lenguajes/tecnologías) */
const TECH_SKILLS: Skill[] = [
  { name: 'C#', icon: <TbBrandCSharp />, color: '#7c4dff',
    segments: [ Smart, VASS, LBCW ].map(({from,to,org})=>({from,to,org})) },
  { name: '.NET / ASP.NET', icon: <SiDotnet />, color: '#512da8',
    segments: [ Smart, MegaA, Devin, QVision, MegaB, GVS, VASS, LBCW ] },
  { name: '.NET Core (APIs)', icon: <SiDotnet />, color: '#0ea5e9',
    segments: [ MegaA, MegaB, GVS, VASS, LBCW ] },
  { name: 'Entity Framework', icon: <SiDotnet />, color: '#7c4dff',
    segments: [ Smart, VASS, LBCW ] },
  { name: 'LINQ', icon: <SiDotnet />, color: '#8b5cf6',
    segments: [ Smart, VASS, LBCW ] },
  { name: 'React', icon: <SiReact />, color: '#22d3ee',
    segments: [ VASS, LBCW ] },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#60a5fa',
    segments: [ GVS, VASS, LBCW ] },
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#9ca3af',
    segments: [ VASS, LBCW ] },
  { name: 'Angular', icon: <SiAngular />, color: '#f87171',
    segments: [ GVS, VASS ] },
  { name: 'HTML/CSS/JavaScript', icon: <SiReact />, color: '#9ca3af',
    segments: [ Smart, MegaA, Devin, QVision, MegaB, GVS, VASS, LBCW ] },
  { name: 'Kendo UI / Telerik', icon: <SiDotnet />, color: '#f59e0b',
    segments: [ Smart, Devin ] },
  { name: 'Razor', icon: <SiDotnet />, color: '#93c5fd',
    segments: [ Devin ] },
  { name: 'Blazor', icon: <SiDotnet />, color: '#60a5fa',
    segments: [ Devin ] },
  { name: 'Xamarin', icon: <SiDotnet />, color: '#34d399',
    segments: [ Devin ] },
  { name: 'Vue.js', icon: <SiReact />, color: '#22c55e',
    segments: [ MegaA, QVision, VASS ] },
  { name: 'APIs REST', icon: <SiDotnet />, color: '#0ea5e9',
    segments: [ MegaA, MegaB, GVS, VASS, LBCW ] },
  { name: 'Microservicios', icon: <SiDotnet />, color: '#06b6d4',
    segments: [ GVS, VASS, LBCW ] },
  { name: 'NestJS', icon: <SiReact />, color: '#e11d48',
    segments: [ { from: { y: 2025, m: 4 }, to: { y: 2025, m: 11 }, org: 'ld.codeworks' } ] },
  { name: 'SQL Server', icon: <DiMsqlServer />, color: '#ef4444',
    segments: [ Smart, GVS, VASS, LBCW ] },
  { name: 'Oracle (R12)', icon: <FaDatabase />, color: '#f97316',
    segments: [ PnT, MegaA ] },
  { name: 'SOAP', icon: <FaDatabase />, color: '#94a3b8',
    segments: [ Smart, QVision, VASS ] },
  { name: 'Patrones de diseño', icon: <SiDotnet />, color: '#a78bfa',
    segments: [ Smart, GVS, VASS, LBCW ] },
];

/** Herramientas / procesos / plataformas */
const TOOL_SKILLS: Skill[] = [
  { name: 'Docker', icon: <SiDocker />, color: '#38bdf8',
    segments: [ VASS, LBCW ] },
  { name: 'Git / GitLab / TFS', icon: <SiGit />, color: '#f97316',
    segments: [ Smart, MegaA, Devin, QVision, MegaB, GVS, VASS, LBCW ] },
  { name: 'Azure DevOps', icon: <VscAzureDevops />, color: '#3b82f6',
    segments: [ VASS, LBCW ] },
  { name: 'Azure (App Service / Key Vault)', icon: <VscAzure />, color: '#2563eb',
    segments: [ VASS, LBCW ] },
  { name: 'SQL Server Management Studio', icon: <FaDatabase />, color: '#ef4444',
    segments: [ Smart, GVS, VASS, LBCW ] },
  { name: 'SSRS / Report Builder', icon: <FaDatabase />, color: '#a78bfa',
    segments: [ QVision, VASS, LBCW ] },
  { name: 'Postman', icon: <SiGit />, color: '#fb923c',
    segments: [ { from: { y: 2017, m: 1 }, to: { y: 2026, m: 1 }, org: 'Varios' } ] },
  { name: 'SoapUI', icon: <SiGit />, color: '#60a5fa',
    segments: [ Smart, VASS ] },
  { name: 'Visual Studio', icon: <SiDotnet />, color: '#7c3aed',
    segments: [ Smart, MegaA, Devin, QVision, MegaB, GVS, VASS, LBCW ] },
  { name: 'SharePoint (WSP/Impl.)', icon: <SiGit />, color: '#22c55e',
    segments: [ QVision, VASS ] },
  { name: 'Scrum', icon: <SiGit />, color: '#06b6d4',
    segments: [ Smart, MegaA, Devin, QVision, MegaB, GVS, VASS, LBCW ] },
  { name: 'Mantis / TestLink / DokuWiki', icon: <SiGit />, color: '#64748b',
    segments: [ PnT ] },
  { name: 'GlassFish (deploy)', icon: <SiGit />, color: '#0ea5e9',
    segments: [ PnT ] },
  { name: 'Testing funcional / preparación', icon: <SiGit />, color: '#16a34a',
    segments: [ PnT ] },
  { name: 'Soporte DevOps', icon: <VscAzureDevops />, color: '#3b82f6',
    segments: [ Smart ] },
  { name: 'MuleSoft', icon: <SiGit />, color: '#22d3ee',
    segments: [ VASS ] },
];

/* ===== Vista de grupo (apilado: etiqueta arriba, barra abajo) ===== */
function Group({ title, skills }: { title: string; skills: Skill[] }) {
  const rows = skills
    .map(s => {
      const decorated = s.segments.map(seg => ({
        ...seg,
        startF: ymToFraction(seg.from),
        endF: ymToFraction(seg.to),
      }));
      // para ordenar por primer inicio
      const firstStart = Math.min(...decorated.map(d => d.startF));
      return { ...s, segments: decorated, firstStart };
    })
    .sort((a, b) => a.firstStart - b.firstStart);

  return (
    <div className="skl2-group">
      <div className="skl2-sep" aria-hidden="true" />
      <h3 className="skl2-group-title">{title}</h3>

      <ul className="skl2-rows" role="list">
        {rows.map((skill) => {
          const total = sumSegmentsTotal(skill.segments);
          return (
            <li key={skill.name} className="skl2-row skl2-row--stack"
                style={{ '--bar-color': skill.color ?? '#60a5fa' } as React.CSSProperties}>
              {/* Etiqueta */}
              <div className="skl2-label">
                <span className="skl2-ico" aria-hidden>{skill.icon}</span>
                <div className="skl2-meta">
                  <strong className="skl2-name">
                    {skill.name}
                  </strong>
                  <span className="skl2-span">
                    Total: {total.label}
                  </span>
                </div>
              </div>

              {/* Pista + múltiples segmentos (barras intermitentes) */}
              <div className="skl2-barwrap skl2-barwrap--multi">
                {skill.segments.map((seg, i) => {
                  const left = posPct(seg.startF);
                  const width = Math.max(posPct(seg.endF) - posPct(seg.startF), 1.2);
                  const titleAttr =
                    `${skill.name} • ${seg.org ?? '—'} • ${fmtYM(seg.from)} – ${fmtYM(seg.to)} • ${diffYM(seg.from, seg.to).label}`;

                  return (
                    <button
                      key={i}
                      className="skl2-bar skl2-chunk"
                      title={titleAttr}
                      aria-label={titleAttr}
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ===== Componente principal ===== */
export default function SkillsTimeline(): JSX.Element {
  return (
    <section className="skl2">
      <div className="skl2-viewport" role="region" aria-label="Timeline de habilidades">
        {/* Marcas de años */}
        <ul className="skl2-years" aria-hidden="true">
          {Array.from({ length: (MAX_YEAR - MIN_YEAR) + 1 }).map((_, i) => {
            const y = MIN_YEAR + i;
            return <li key={y} style={{ left: `${posPct(y)}%` }}>{y}</li>;
          })}
        </ul>

        {/* Grupo 1: técnicas */}
        <Group title="Habilidades técnicas" skills={TECH_SKILLS} />

        {/* Grupo 2: herramientas */}
        <Group title="Uso de herramientas" skills={TOOL_SKILLS} />
      </div>
    </section>
  );
}
