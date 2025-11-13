'use client';

import type { JSX } from 'react';
import { DiMsqlServer } from 'react-icons/di';
import { FaDatabase } from 'react-icons/fa';
import {
  SiDotnet, SiReact, SiTypescript, SiAngular, SiNextdotjs,
   SiDocker, SiGit, SiMulesoft, SiJquery
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { VscAzureDevops, VscAzure } from 'react-icons/vsc';

import '@/app/styles/SkillsTimeline.css';

/** Rango visible del timeline */
const MIN_YEAR = 2015;
const MAX_YEAR = 2026; // inclusive

/** Periodos laborales (para referencia de fechas) 
 *  1) P&T:       2015-11 .. 2018-03
 *  2) SmartFin:  2018-03 .. 2020-11
 *  3) MegaDev:   2020-12 .. 2021-03
 *  4) Devinmot.: 2021-03 .. 2021-06
 *  5) Q-Vision:  2021-06 .. 2021-09
 *  6) MegaDev:   2021-12 .. 2022-01
 *  7) GVS:       2022-02 .. 2022-06
 *  8) VASS:      2022-06 .. 2025-04
 *  9) ld.codew.: 2025-05 .. 2025-11
 */

type YM = { y: number; m: number };        // m: 1..12
type Period = { from: YM; to: YM };

type Skill = {
  name: string;
  icon: JSX.Element;
  color?: string;
  // Preferido: múltiples periodos. (Compat: from/to)
  periods?: Period[];
  from?: YM; to?: YM;
};

const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

/* ===== Helpers ===== */
function clampMonth(m: number){ return Math.max(1, Math.min(12, m)); }
function ymToFraction({ y, m }: YM): number { return y + (clampMonth(m) - 1) / 12; }
function posPct(yearFraction: number): number {
  const span = MAX_YEAR - MIN_YEAR;
  return ((yearFraction - MIN_YEAR) / span) * 100;
}
function fmtYM({ y, m }: YM): string { return `${MES[clampMonth(m) - 1]} ${y}`; }
function diffYM(a: YM, b: YM) {
  let years = b.y - a.y;
  let months = clampMonth(b.m) - clampMonth(a.m);
  if (months < 0) { years -= 1; months += 12; }
  const label = years > 0
    ? `${years} año${years !== 1 ? 's' : ''}${months ? ` ${months} mes${months !== 1 ? 'es' : ''}` : ''}`
    : `${months} mes${months !== 1 ? 'es' : ''}`;
  return { years, months, label, totalMonths: years * 12 + months };
}
function periodsOf(s: Skill): Period[] {
  if (s.periods?.length) return s.periods;
  if (s.from && s.to) return [{ from: s.from, to: s.to }];
  return [];
}

function sumPeriods(periods: Period[]){
  const total = periods.reduce((acc, p) => acc + diffYM(p.from, p.to).totalMonths, 0);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const label = years > 0
    ? `${years} año${years !== 1 ? 's' : ''}${months ? ` ${months} mes${months !== 1 ? 'es' : ''}` : ''}`
    : `${months} mes${months !== 1 ? 'es' : ''}`;
  return { years, months, label, totalMonths: total };
}

/* ===== TECH SKILLS (lenguajes / frameworks / bases / patrones) ===== */
const TECH_SKILLS: Skill[] = [
  { name: 'C#', icon: <TbBrandCSharp />, color: '#7c4dff', periods: [
    /** Periodos laborales (para referencia de fechas) 
 *  1) P&T:       2015-11 .. 2018-03
 *  2) SmartFin:  2018-03 .. 2020-11
 *  3) MegaDev:   2020-12 .. 2021-03
 *  4) Devinmot.: 2021-03 .. 2021-06
 *  5) Q-Vision:  2021-06 .. 2021-09
 *  6) MegaDev:   2021-12 .. 2022-01
 *  7) GVS:       2022-02 .. 2022-06
 *  8) VASS:      2022-06 .. 2025-04
 *  9) ld.codew.: 2025-05 .. 2025-11
 */
    { from: { y: 2018, m: 3 }, to: { y: 2020, m: 11 } }, // SmartFinancial
    { from: { y: 2020, m: 12 }, to: { y: 2021, m: 3 } }, // MegaDev
    { from: { y: 2021, m: 3 }, to: { y: 2021, m: 6 } },  // Devinmotion
    { from: { y: 2021, m: 6 }, to: { y: 2021, m: 9 } }, // Q-Vision
    { from: { y: 2021, m: 12 }, to: { y: 2022, m: 1 } }, // MegaDev
    { from: { y: 2022, m: 1 }, to: { y: 2022, m: 5 } }, // GVS
    { from: { y: 2022, m: 5 }, to: { y: 2025, m: 4 } },  // VASS
    { from: { y: 2025, m: 4 }, to: { y: 2025, m: 11 } }, // ld.codeworks
]},
  { name: '.NET / ASP.NET', icon: <SiDotnet />, color: '#512da8', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: '.NET Core (APIs)', icon: <SiDotnet />, color: '#0ea5e9', periods: [
    { from:{y:2020,m:12}, to:{y:2021,m:3} }, // MegaDev
    { from:{y:2021,m:12}, to:{y:2022,m:1} }, // MegaDev
    { from:{y:2022,m:2},  to:{y:2022,m:6} }, // GVS
    { from:{y:2022,m:6},  to:{y:2025,m:4} }, // VASS
    { from:{y:2025,m:5},  to:{y:2025,m:11} },// ld.codeworks
  ]},
  { name: 'APIs REST', icon: <SiDotnet />, color: '#10b981', periods: [
    { from:{y:2020,m:12}, to:{y:2021,m:3} }, // MegaDev
    { from:{y:2021,m:12}, to:{y:2022,m:1} }, // MegaDev
    { from:{y:2022,m:2},  to:{y:2022,m:6} }, // GVS
    { from:{y:2022,m:6},  to:{y:2025,m:4} }, // VASS
    { from:{y:2025,m:5},  to:{y:2025,m:11} },// ld.codeworks
  ]},
  { name: 'React', icon: <SiReact />, color: '#22d3ee', periods: [
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'TypeScript', icon: <SiTypescript />, color: '#60a5fa', periods: [
    { from:{y:2022,m:2}, to:{y:2022,m:6} }, // GVS
    { from:{y:2022,m:6}, to:{y:2025,m:4} }, // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} },// ld.codeworks
  ]},
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#9ca3af', periods: [
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS (según proyectos)
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'Angular', icon: <SiAngular />, color: '#f87171', periods: [
    { from:{y:2022,m:2}, to:{y:2022,m:6} }, // GVS
    { from:{y:2022,m:6}, to:{y:2025,m:4} }, // VASS
  ]},
  { name: 'Vue.js', icon: <SiAngular />, color: '#22c55e', periods: [
    { from:{y:2020,m:12}, to:{y:2021,m:3} }, // MegaDev
    { from:{y:2021,m:6},  to:{y:2021,m:9} }, // Q-Vision
    { from:{y:2022,m:6},  to:{y:2025,m:4} }, // VASS
  ]},
  { name: 'NestJS', icon: <SiReact />, color: '#e11d48', periods: [
    { from:{y:2025,m:4}, to:{y:2025,m:11} }, // ld.codeworks (abril a nov)
  ]},
  { name: 'HTML / CSS / JavaScript', icon: <SiReact />, color: '#93c5fd', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'Entity Framework', icon: <SiDotnet />, color: '#7c4dff', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'LINQ', icon: <SiDotnet />, color: '#8b5cf6', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'ASP.NET MVC / Razor', icon: <SiDotnet />, color: '#93c5fd', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2021,m:3}, to:{y:2021,m:6} },  // Devinmotion (Razor)
  ]},
  { name: 'Blazor', icon: <SiDotnet />, color: '#60a5fa', periods: [
    { from:{y:2021,m:3}, to:{y:2021,m:6} },  // Devinmotion
  ]},
  { name: 'Xamarin', icon: <SiDotnet />, color: '#34d399', periods: [
    { from:{y:2021,m:3}, to:{y:2021,m:6} },  // Devinmotion
  ]},
  { name: 'jQuery', icon: <SiJquery />, color: '#60a5fa', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2021,m:3}, to:{y:2021,m:6} },  // Devinmotion
    { from:{y:2021,m:6}, to:{y:2021,m:9} },  // Q-Vision
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
  ]},
  { name: 'Kendo UI / Telerik', icon: <SiDotnet />, color: '#f59e0b', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2021,m:3}, to:{y:2021,m:6} },  // Devinmotion
  ]},
  { name: 'Oracle (R12)', icon: <FaDatabase />, color: '#f97316', periods: [
    { from:{y:2015,m:11}, to:{y:2018,m:3} }, // Procesos y Tecnología
    { from:{y:2020,m:12}, to:{y:2021,m:3} }, // MegaDev
    { from:{y:2022,m:6},  to:{y:2025,m:4} }, // VASS
  ]},
  { name: 'SQL Server', icon: <DiMsqlServer />, color: '#ef4444', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:2}, to:{y:2022,m:6} },  // GVS
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'Patrones de diseño', icon: <SiDotnet />, color: '#a78bfa', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'Microservicios', icon: <SiDotnet />, color: '#06b6d4', periods: [
    { from:{y:2022,m:2}, to:{y:2022,m:6} },  // GVS
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'SOAP', icon: <FaDatabase />, color: '#94a3b8', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2021,m:6}, to:{y:2021,m:9} },  // Q-Vision
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
  ]},
];

/* ===== TOOL SKILLS (devops, testing, suites, azure, sharepoint, etc.) ===== */
const TOOL_SKILLS: Skill[] = [
  { name: 'Docker', icon: <SiDocker />, color: '#38bdf8', periods: [
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'Azure DevOps', icon: <VscAzureDevops />, color: '#3b82f6', periods: [
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS (CI/CD)
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'Azure (App Service / Key Vault)', icon: <VscAzure />, color: '#2563eb', periods: [
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
  ]},
  { name: 'Azure App Service (deploy)', icon: <VscAzure />, color: '#0ea5e9', periods: [
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
  ]},
  { name: 'Visual Studio', icon: <SiDotnet />, color: '#7c3aed', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'SQL Server Management Studio', icon: <DiMsqlServer />, color: '#ef4444', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:2}, to:{y:2022,m:6} },  // GVS
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'RDL / SSRS / Report Builder', icon: <FaDatabase />, color: '#a78bfa', periods: [
    { from:{y:2021,m:6}, to:{y:2021,m:9} },  // Q-Vision
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
    { from:{y:2025,m:5}, to:{y:2025,m:11} }, // ld.codeworks
  ]},
  { name: 'Software Testing (Funcional)', icon: <SiGit />, color: '#16a34a', periods: [
    { from:{y:2015,m:11}, to:{y:2018,m:3} }, // Procesos y Tecnología
    { from:{y:2021,m:6},  to:{y:2021,m:9} }, // Q-Vision
  ]},
  { name: 'Preparación de Casos de Prueba', icon: <SiGit />, color: '#22c55e', periods: [
    { from:{y:2015,m:11}, to:{y:2018,m:3} }, // Procesos y Tecnología
  ]},
  { name: 'GlassFish (deploy)', icon: <SiGit />, color: '#0ea5e9', periods: [
    { from:{y:2015,m:11}, to:{y:2018,m:3} }, // Procesos y Tecnología
  ]},
  { name: 'Mantis / TestLink / DokuWiki', icon: <SiGit />, color: '#64748b', periods: [
    { from:{y:2015,m:11}, to:{y:2018,m:3} }, // Procesos y Tecnología
  ]},
  { name: 'Postman', icon: <SiGit />, color: '#fb923c', periods: [
    { from:{y:2017,m:1},  to:{y:2026,m:1} }, // “siempre”
  ]},
  { name: 'SoapUI', icon: <SiGit />, color: '#60a5fa', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
  ]},
  { name: 'SharePoint', icon: <SiGit />, color: '#22c55e', periods: [
    { from:{y:2021,m:6}, to:{y:2021,m:9} },  // Q-Vision
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
  ]},
  { name: 'SharePoint (WSP / implementación)', icon: <SiGit />, color: '#14b8a6', periods: [
    { from:{y:2022,m:6}, to:{y:2025,m:4} },  // VASS
  ]},
  { name: 'MuleSoft', icon: <SiMulesoft />, color: '#22d3ee', periods: [
    { from:{y:2023,m:1}, to:{y:2025,m:4} },   // VASS (aprox.)
  ]},
  { name: 'DevOps (soporte)', icon: <VscAzureDevops />, color: '#3b82f6', periods: [
    { from:{y:2018,m:3}, to:{y:2020,m:11} }, // SmartFinancial
  ]},
];
function Group({ skills }: { skills: Skill[] }) {
  // Normaliza, calcula periodos y TOTAL (en meses)
  const rows = skills
    .map(s => {
      const periods = periodsOf(s).slice().sort(
        (a,b) => ymToFraction(a.from) - ymToFraction(b.from)
      );
      const color = s.color ?? '#60a5fa';
      const total = sumPeriods(periods); // { totalMonths, label, ... }
      // Para desempatar (mismo total), usamos fecha de primer uso
      const firstStart = periods.length ? ymToFraction(periods[0].from) : Infinity;
      return { ...s, color, periods, total, firstStart };
    })
    // Orden: mayor total primero; si empatan, el que empezó antes primero
    .sort((a, b) =>
      b.total.totalMonths - a.total.totalMonths ||
      a.firstStart - b.firstStart
    );

  return (
    <div className="skl2-group">

      <ul className="skl2-rows" role="list">
        {rows.map((e) => (
          <li
            key={e.name}
            className="skl2-row"
            style={{ '--bar-color': e.color } as React.CSSProperties}
          >
            {/* Etiqueta con total acumulado */}
            <div className="skl2-label">
              <span className="skl2-ico" aria-hidden>{e.icon}</span>
              <div className="skl2-meta">
                <strong className="skl2-name">{e.name}</strong>
                <span className="skl2-span">{e.total.label}</span>
              </div>
            </div>

            {/* Pista multi-segmento */}
            <div className="skl2-barwrap skl2-barwrap--multi">
              {e.periods.map((p, i) => {
                const left = posPct(ymToFraction(p.from));
                const width = Math.max(
                  posPct(ymToFraction(p.to)) - posPct(ymToFraction(p.from)),
                  1.2
                );
                const titleAttr = `${e.name} • ${fmtYM(p.from)} – ${fmtYM(p.to)}`;
                return (
                  <div
                    key={i}
                    className="skl2-chunk"
                    title={titleAttr}
                    aria-label={titleAttr}
                    style={{ left: `${left}%`, width: `${width}%` } as React.CSSProperties}
                  />
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ====== Componente principal ====== */
export default function SkillsTimeline(): JSX.Element {
  return (
<section className="skl2">
  <div className="skl2-grid">
    
    {/* Columna 1: Habilidades técnicas */}
    <div className="skl2-col">
            <h3>Habilidades técnicas</h3>

     <ul className="skl2-years" aria-hidden="true">
          {Array.from({ length: (MAX_YEAR - MIN_YEAR) + 1 }).map((_, i) => {
            const y = MIN_YEAR + i;
            const left = posPct(y);
            return <li key={y} style={{ left: `${left}%` }}>{y}</li>;
          })}
        </ul>      <div className="skl2-viewport">
        <Group skills={TECH_SKILLS} />
      </div>
    </div>

    {/* Columna 2: Herramientas */}
    <div className="skl2-col">
      <h3>Uso de herramientas</h3>
     <ul className="skl2-years" aria-hidden="true">
          {Array.from({ length: (MAX_YEAR - MIN_YEAR) + 1 }).map((_, i) => {
            const y = MIN_YEAR + i;
            const left = posPct(y);
            return <li key={y} style={{ left: `${left}%` }}>{y}</li>;
          })}
        </ul>      <div className="skl2-viewport">
        <Group skills={TOOL_SKILLS} />
      </div>
    </div>
  </div>
</section>
  );
}
