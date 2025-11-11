'use client';

import { StaticImageData } from 'next/image';
import { useState, type JSX } from 'react';

import ExperienceCards from './ExperienceCards';
import ExperienceCircle from './ExperienceCircle';

// LOGOS
import devinmotion from '@/app/logos/devinmotion.png';
import gvs from '@/app/logos/gvs.svg';
import megadev from '@/app/logos/megadevf.png';
import pyt from '@/app/logos/pyt.png';
import qvision from '@/app/logos/qvisionf.webp';
import smartfinancial from '@/app/logos/smartf.png';
import vass from '@/app/logos/vass.png';

export type YM = { y: number; m: number }; // m:1..12
export type ExpItem = {
  from: YM;
  to: YM;
  company: string;
  role: string;
  color?: string;
  // Extras para tarjetas
  periodLabel: string;
  clients?: string;
  logo?: StaticImageData;
  tone: 'green' | 'blue' | 'orange' | 'red';
  tags: string[];
  duties: string[];
};

export const MIN_YEAR = 2015;
export const MAX_YEAR = 2026;

const DATA: ExpItem[] = [
  {
    from: { y: 2015, m: 11 }, to: { y: 2018, m: 3 },
    company: 'Procesos y Tecnología', role: 'Analista QA', color: '#c1d72f',
    periodLabel: 'Nov 2015 – Mar 2018', logo: pyt, tone: 'blue',
    tags: ['QA', 'Oracle', 'Mantis/TestLink'],
    duties: [
      'Pruebas funcionales y de usabilidad en web/móvil.',
      'Despliegues en GlassFish (Linux) y consultas en Oracle R12.',
      'Gestión y documentación en Mantis, TestLink y DokuWiki.'
    ],
  },
  {
    from: { y: 2018, m: 3 }, to: { y: 2020, m: 11 },
    company: 'Smart Financial Systems', role: 'Analista Desarrollador', color: '#f59e0b',
    periodLabel: 'Mar 2018 – Nov 2020', logo: smartfinancial, tone: 'red',
    tags: ['C#/.NET', 'EF', 'SQL Server'],
    duties: [
      'Backend C# con EF e Identity.',
      'MVC con Kendo/Telerik, jQuery y Bootstrap.',
      'SQL Server 2017 y coordinación del equipo.'
    ],
  },
  {
    from: { y: 2020, m: 12 }, to: { y: 2021, m: 3 },
    company: 'MEGADEV (CELSIA)', role: 'Desarrollador & Soporte', color: '#60a5fa',
    periodLabel: 'Dic 2020 – Mar 2021', logo: megadev, tone: 'orange',
    tags: ['Oracle', 'Vue.js', 'Scrum'],
    duties: [
      'Operación y soporte de aplicativos internos; coordinación con proveedores.',
      'Consultas especializadas en Oracle y despliegues en servidores.',
      'Módulos de frontend con Vue.js bajo prácticas Scrum.'
    ],
  },
  {
    from: { y: 2021, m: 3 }, to: { y: 2021, m: 6 },
    company: 'Devinmotion (ALTIPAL)', role: 'Analista Desarrollador', color: '#ef4444',
    periodLabel: 'Mar 2021 – Jun 2021', logo: devinmotion, tone: 'green',
    tags: ['REST', 'DevOps', 'Xamarin'],
    duties: [
      'Diseño de contratos REST y pruebas de integración.',
      'Automatización de pipeline en DevOps.',
      'Frontend con Blazor/Razor; app móvil Xamarin.'
    ],
  },
  {
    from: { y: 2021, m: 6 }, to: { y: 2021, m: 9 },
    company: 'Q-Vision (Colmena)', role: 'Analista Desarrollador', color: '#22c55e',
    periodLabel: 'Jun 2021 – Sep 2021', logo: qvision, tone: 'blue',
    tags: ['ASP.NET Core', 'SQL Server', 'Blazor'],
    duties: [
      'Servicios API con ASP.NET Core y optimización de SQL Server (SPs, índices).',
      'Interfaces con Blazor/Razor Pages y componentes Kendo/Telerik.'
    ],
  },
  {
    from: { y: 2021, m: 12 }, to: { y: 2022, m: 1 },
    company: 'MEGADEV (CELSIA)', role: 'Analista Desarrollador', color: '#38bdf8',
    periodLabel: 'Dic 2021 – Ene 2022', logo: megadev, tone: 'red',
    tags: ['ASP.NET MVC', 'Kendo UI', 'DevOps'],
    duties: [
      'ASP.NET Core MVC con Identity, jQuery, Bootstrap y Kendo UI.',
      'Estimaciones técnicas y coordinación con DevOps.'
    ],
  },
  {
    from: { y: 2022, m: 2 }, to: { y: 2022, m: 6 },
    company: 'GVS Colombia', role: 'Analista Desarrollador', color: '#a78bfa',
    periodLabel: 'Feb 2022 – Jun 2022', logo: gvs, tone: 'orange',
    tags: ['Angular 12', '.NET Core API', 'SQL Server'],
    duties: [
      'Aplicaciones de comercio exterior (Angular + .NET API).',
      'Integración de facturación SAP; optimización SQL.'
    ],
  },
  {
    from: { y: 2022, m: 6 }, to: { y: 2025, m: 4 },
    company: 'VASS LATAM', role: 'Analista Desarrollador', color: '#14b8a6',
    periodLabel: 'Jun 2022 – Abr 2025', logo: vass, tone: 'green',
    tags: ['.NET Core', 'React TS', 'Azure DevOps'],
    duties: [
      'Microservicios REST (Docker/IIS/App Services) con Clean Architecture.',
      'CI/CD en Azure DevOps y versionado git.',
      'Integraciones SAP, Azure Key Vault, SSRS (RDL) y SQL Server.',
      'Front en React TS / Angular según cliente.'
    ],
  },
  {
    from: { y: 2025, m: 5 }, to: { y: 2025, m: 11 },
    company: 'FREELANCE DEVELOPER', role: 'Freelance', color: '#3c37a7',
    periodLabel: 'May 2025 – Nov 2025', logo: undefined, tone: 'blue',
    tags: ['React', 'Next.js', 'API .NET'],
    duties: [
      'Proyectos a medida para clientes PYME.',
      'Stack full-stack con React/Next + .NET + SQL.'
    ],
  },
];

export default function ExperienceSection(): JSX.Element {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="expSection" aria-label="Experiencia">
      {/* TIMELINE */}
      <ExperienceCircle
        items={DATA}
        activeIndex={active}
        onActivate={setActive}
      />

      {/* TARJETAS */}
      <ExperienceCards
        items={DATA}
        activeIndex={active}
        onActivate={setActive}
      />
    </section>
  );
}
