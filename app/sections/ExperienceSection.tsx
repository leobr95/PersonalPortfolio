'use client';

import type { StaticImageData } from 'next/image';
import { useMemo, useState, type JSX } from 'react';

import ExperienceCards from './ExperienceCards';
import ExperienceCircle from './ExperienceCircle';

import devinmotion from '@/app/logos/devinmotion.png';
import gvs from '@/app/logos/gvs.svg';
import lbcodeworks from '@/app/logos/lbcodeworks.png';
import megadev from '@/app/logos/megadevf.png';
import pyt from '@/app/logos/pyt.png';
import qvision from '@/app/logos/qvisionf.webp';
import smartfinancial from '@/app/logos/smartf.png';
import vass from '@/app/logos/vass.png';


export type YM = { y: number; m: number };

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

/** Rango visible del timeline */
export const MIN_YEAR = 2015;
export const MAX_YEAR = 2026; // inclusive

const DATA_RAW: ExpItem[] = [
    {
    id: 9,
    company: 'ld.codeworks',
    role: 'Desarrollador Full Stack Freelance',
    from: { y: 2025, m: 5 }, to: { y: 2025, m: 11 },
    color: '#9a14b8ff', logo: lbcodeworks, period: 'Abr 2022 – Actualmente',
    clients: 'Emprendimiento propio (Colombia) Workana',
    tone: 'red',
    tags: ['.NET Core', 'Next JS', 'Vercel'],
    duties: [
      'Microservicios REST (Clean Architecture) en Docker.',
      'CI/CD con Azure DevOps, Git/TFS/GitLab.',
      'SSRS/SQL Server.',
      'Frontend React TS / Angular según cliente.',
    ],
  },
    {
    id: 8,
    company: 'VASS LATAM',
    role: 'Analista Desarrollador',
    from: { y: 2022, m: 6 }, to: { y: 2025, m: 4 },
    color: '#14b8a6', logo: vass, period: 'Jun 2022 – Abr 2025',
    clients: 'Colmena (CO), Fashion Park, Caja 18 (CL)',
    tone: 'green',
    tags: ['.NET Core', 'React TS', 'Azure DevOps'],
    duties: [
      'Microservicios REST (Clean Architecture) en Docker/AppService.',
      'CI/CD con Azure DevOps, Git/TFS/GitLab.',
      'Integraciones SAP y Azure Key Vault; SSRS/SQL Server.',
      'Frontend React TS / Angular según cliente.',
    ],
  },
  {
    id: 7,
    company: 'GVS Colombia',
    role: 'Analista Desarrollador',
    from: { y: 2022, m: 2 }, to: { y: 2022, m: 6 },
    color: '#a78bfa', logo: gvs, period: 'Feb 2022 – Jun 2022',
    tone: 'orange',
    tags: ['Angular 12', '.NET Core API', 'SQL Server'],
    duties: [
      'Apps de comercio exterior (Angular + .NET Core API).',
      'Integración de facturación SAP.',
      'Optimización de SQL Server.',
    ],
  },
  {
    id: 6,
    company: 'MEGADEV (CELSIA)',
    role: 'Analista Desarrollador',
    from: { y: 2021, m: 12 }, to: { y: 2022, m: 1 },
    color: '#38bdf8', logo: megadev, period: 'Dic 2021 – Ene 2022',
    clients: 'Cliente: CELSIA',
    tone: 'red',
    tags: ['ASP.NET MVC', 'Kendo UI', 'DevOps'],
    duties: ['ASP.NET Core MVC + Kendo UI', 'Planificación y coordinación DevOps'],
  },
  {
    id: 5,
    company: 'Q-Vision (Colmena)',
    role: 'Analista Desarrollador',
    from: { y: 2021, m: 6 }, to: { y: 2021, m: 9 },
    color: '#22c55e', logo: qvision, period: 'Jun 2021 – Sep 2021',
    clients: 'Cliente: Colmena (CO)',
    tone: 'blue',
    tags: ['ASP.NET Core', 'SQL Server', 'Blazor'],
    duties: ['APIs .NET Core', 'Optimización de SQL', 'Interfaces Blazor/Razor'],
  },
  {
    id: 4,
    company: 'Devinmotion (ALTIPAL)',
    role: 'Analista Desarrollador',
    from: { y: 2021, m: 3 }, to: { y: 2021, m: 6 },
    color: '#ef4444', logo: devinmotion, period: 'Mar 2021 – Jun 2021',
    tone: 'green',
    tags: ['REST', 'DevOps', 'Xamarin'],
    duties: ['Contratos REST/pruebas', 'Automatización CI/CD', 'Blazor + Xamarin'],
  },
  {
    id: 3,
    company: 'MEGADEV (CELSIA)',
    role: 'Desarrollador & Soporte',
    from: { y: 2020, m: 12 }, to: { y: 2021, m: 3 },
    color: '#60a5fa', logo: megadev, period: 'Dic 2020 – Mar 2021',
    tone: 'orange',
    tags: ['Oracle', 'Vue.js', 'Scrum'],
    duties: ['Soporte y operación', 'Consultas Oracle', 'Módulos Vue.js'],
  },
  {
    id: 2,
    company: 'Smart Financial Systems',
    role: 'Analista Desarrollador',
    from: { y: 2018, m: 3 }, to: { y: 2020, m: 11 },
    color: '#f59e0b', logo: smartfinancial, period: 'Mar 2018 – Nov 2020',
    tone: 'red',
    tags: ['C#/.NET', 'EF', 'SQL Server'],
    duties: ['Backend C# EF', 'MVC + Kendo', 'SQL Server 2017'],
  },
  {
    id: 1,
    company: 'Procesos y Tecnología',
    role: 'Analista QA',
    from: { y: 2015, m: 11 }, to: { y: 2018, m: 3 },
    color: '#c1d72f', logo: pyt, period: 'Nov 2015 – Mar 2018',
    tone: 'blue',
    tags: ['QA', 'Oracle', 'Mantis/TestLink'],
    duties: ['Pruebas funcionales/usabilidad', 'GlassFish + Oracle', 'Gestión Mantis/TestLink'],
  },
];

export default function ExperienceSection(): JSX.Element {
  // ← estado compartido
  const [activeId, setActiveId] = useState<number | null>(null);

  // Para tarjetas: más reciente → más antiguo (por fecha fin)
  const itemsForCards = useMemo(() => {
    const endStamp = (d: ExpItem) => new Date(d.to.y, d.to.m - 1, 1).getTime();
    return [...DATA_RAW].sort((a, b) => endStamp(b) - endStamp(a));
  }, []);

  // Para timeline: ordenados por inicio (o como prefieras), sin perder el id
  const itemsForCircle = useMemo(() => {
    const startStamp = (d: ExpItem) => new Date(d.from.y, d.from.m - 1, 1).getTime();
    return [...DATA_RAW].sort((a, b) => startStamp(a) - startStamp(b));
  }, []);

  return (
    <section className="exp-wrap" style={{ display: 'grid', gap: 16 }}>
      <ExperienceCircle
        items={itemsForCircle}
        activeId={activeId}
        onActivate={setActiveId}
      />
      <ExperienceCards
        items={itemsForCards}
        activeId={activeId}
        onActivate={setActiveId}
      />
    </section>
  );
}
