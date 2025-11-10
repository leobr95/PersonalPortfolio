'use client';

import Image, { StaticImageData } from 'next/image';
import { useState, type JSX } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

import '@/app/styles/ExperienceCards.css';
import devinmotion from '@/app/logos/devinmotion.png';
import gvs from '@/app/logos/gvs.svg';
import megadev from '@/app/logos/megadevf.png';
import pyt from '@/app/logos/pyt.png';
import qvision from '@/app/logos/qvisionf.webp';
import smartfinancial from '@/app/logos/smartf.png';
import vass from '@/app/logos/vass.png';

type ExpItem = {
  company: string;
  role: string;
  period: string;
  clients?: string;
  logo: StaticImageData;        // usa tu ruta local si quieres: /companies/vass.png
  tone: 'green' | 'blue' | 'orange' | 'red';
  tags: string[];      // se mostrarán máximo 3
  duties: string[];
};

const DATA: ExpItem[] = [
  {
    company: 'VASS LATAM',
    role: 'Analista Desarrollador',
    period: 'Jun 2022 – Abr 2025',
    clients: 'Colmena (CO), Fashion Park, Caja 18 (CL)',
    logo: vass,
    tone: 'green',
    tags: ['.NET Core', 'React TS', 'Azure DevOps'],
    duties: [
      'Diseño y despliegue de microservicios REST sobre Docker/IIS/Azure App Services con enfoque Clean Architecture.',
      'Orquestación de CI/CD en Azure DevOps con versionado Git/TFS/GitLab.',
      'Integraciones con SAP y Azure Key Vault; reportes SSRS (RDL) y SQL Server (SPs).',
      'Desarrollo frontend en React TypeScript y Angular según cada cliente.',
      'Uso de MuleSoft (mocks) y WebParts de SharePoint cuando fue requerido.',
    ],
  },
  {
    company: 'GVS Colombia',
    role: 'Analista Desarrollador',
    period: 'Feb 2022 – Jun 2022',
    logo: gvs,
    tone: 'orange',
    tags: ['Angular 12', '.NET Core API', 'SQL Server'],
    duties: [
      'Construcción de aplicativos de comercio exterior con Angular 12 y .NET Core Web API.',
      'Integración de facturación SAP mediante endpoints .NET.',
      'Optimización de consultas y modelado en SQL Server.',
    ],
  },
  {
    company: 'MEGADEV',
    role: 'Analista Desarrollador',
    period: 'Dic 2021 – Ene 2022',
    clients: 'Cliente: CELSIA',
    logo: megadev,
    tone: 'red',
    tags: ['ASP.NET MVC', 'Kendo UI', 'DevOps'],
    duties: [
      'Desarrollo en ASP.NET Core MVC con Identity, jQuery, Bootstrap y Kendo UI.',
      'Estimaciones técnicas, planificación y coordinación con equipo DevOps.',
    ],
  },
  {
    company: 'Q-Vision Technologies',
    role: 'Analista Desarrollador',
    period: 'Jun 2021 – Sep 2021',
    clients: 'Cliente: Colmena (CO)',
    logo: qvision,
    tone: 'blue',
    tags: ['ASP.NET Core', 'SQL Server', 'Blazor'],
    duties: [
      'Servicios API con ASP.NET Core y optimización de SQL Server (SPs, índices).',
      'Interfaces con Blazor/Razor Pages y componentes Kendo/Telerik.',
    ],
  },
  {
    company: 'Devinmotion',
    role: 'Analista Desarrollador',
    period: 'Mar 2021 – Jun 2021',
    clients: 'Cliente: ALTIPAL (CO)',
    logo: devinmotion,
    tone: 'green',
    tags: ['REST', 'DevOps', 'Xamarin'],
    duties: [
      'Diseño de contratos REST y pruebas de integración.',
      'Automatización de pipeline en DevOps.',
      'Frontend con Blazor/Razor; componentes Kendo/Telerik y app móvil Xamarin.',
    ],
  },
  {
    company: 'MEGADEV',
    role: 'Analista Desarrollador y Soporte',
    period: 'Dic 2020 – Mar 2021',
    clients: 'Cliente: CELSIA',
    logo: megadev,
    tone: 'orange',
    tags: ['Oracle', 'Vue.js', 'Scrum'],
    duties: [
      'Operación y soporte de aplicativos internos; coordinación con proveedores.',
      'Consultas especializadas en Oracle y despliegues en servidores.',
      'Módulos de frontend con Vue.js bajo prácticas Scrum.',
    ],
  },
  {
    company: 'Smart Financial Systems',
    role: 'Analista Desarrollador',
    period: 'Mar 2018 – Nov 2020',
    clients: 'Clientes: ADSI Venezuela, Integrio',
    logo: smartfinancial,
    tone: 'red',
    tags: ['C#/.NET', 'EF', 'SQL Server'],
    duties: [
      'Backend en C# con Entity Framework e Identity.',
      'MVC con HTML/CSS/JS, jQuery, Kendo UI, Telerik TagHelpers y Bootstrap.',
      'SQL Server 2017; coordinación del equipo y estimaciones con DevOps.',
    ],
  },
  {
    company: 'Procesos y Tecnología SAS',
    role: 'Analista QA',
    period: 'Nov 2015 – Mar 2018',
    logo: pyt,
    tone: 'blue',
    tags: ['QA', 'Oracle', 'Mantis/TestLink'],
    duties: [
      'Ejecución de pruebas funcionales y de usabilidad en web/móvil con datos de prueba.',
      'Despliegues en GlassFish (Linux) y consultas en Oracle R12.',
      'Gestión y documentación en Mantis, TestLink y DokuWiki.',
    ],
  },
];

export default function ExperienceCards(): JSX.Element {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => () => setOpen(curr => curr === i ? null : i);

  return (
    <section className="xpSec" aria-label="Experiencia profesional">
      {DATA.map((it, i) => {
        const isOpen = open === i;
        const pills = it.tags.slice(0, 3); // máximo 3
        return (
          <article key={`${it.company}-${it.period}`} className={`xp-card tone-${it.tone}`}>

            {/* Logo arriba, centrado */}
            <figure className="xp-card-logo">
              <Image
                src={it.logo}
                alt={`Logo ${it.company}`}
                width={96}
                height={96}
                priority={i < 2}
              />
            </figure>

            {/* Texto principal */}
            <header className="xp-card-head">
              <h3 className="xp-title">{it.company}</h3>
              <p className="xp-sub">{it.role}{it.clients ? ` · ${it.clients}` : ''}</p>
              <span className="xp-period">{it.period}</span>
            </header>

            {/* Pills (máx 3) */}
            <ul className="xp-pills" role="list">
              {pills.map(tag => <li key={tag} className="xp-pill">{tag}</li>)}
            </ul>

            {/* Botón y panel de funciones */}
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
