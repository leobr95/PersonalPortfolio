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
      'Diseño e implementación de microservicios REST (.NET/Core) con Clean Architecture.',
      'Dockerización, versionado Git y pipelines CI/CD (Azure DevOps).',
      'Front en React/Next.js con TypeScript, SSR/ISR y optimización de rendimiento.',
      'Modelado de datos, consultas avanzadas y reportes (SQL Server, SSRS/RDL).',
      'Exposición de APIs con especificación OpenAPI/Swagger y testing automatizado.',
      'Despliegues en Vercel/Azure App Service y monitoreo básico (logs/alerts).',
      'Trabajo por encargo (Workana): landing corporativa, paneles operativos y ajustes UI.',
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
    tags: ['.NET Core', 'React TS', 'Angular'],
    duties: [
      'Microservicios .NET/Core con Clean Architecture; despliegue en Docker/Azure App Service.',
      'Integraciones empresariales: SAP, MuleSoft, y Azure Key Vault para secretos.',
      'SharePoint/WSP: gestión del conocimiento (SQL, SP, procedimientos almacenados).',
      'Proyecto QR (Angular): envío de correos con QR, agendamiento de visitas ARL.',
      'Migración de datos (Oracle/SQL/planos) a formatos Salesforce como alternativa a ETL.',
      'Reescritura de SharePoint a React/Next.js con Tailwind y tableros Power BI.',
      'Fronts en React TS / Angular 12+: linting, unit tests y accesibilidad.',
      'Despliegues IIS/Azure; monitoreo, trazabilidad y soporte continuo a fábrica de software.',
    ],
  },
  {
    id: 7,
    company: 'GVS Colombia',
    role: 'Analista Desarrollador',
    from: { y: 2022, m: 2 }, to: { y: 2022, m: 6 },
    color: '#a78bfa', logo: gvs, period: 'Feb 2022 – Jun 2022',
    tone: 'orange',
    tags: ['Angular 12', '.NET Core', 'SQL Server'],
    duties: [
      'APIs REST .NET Core documentadas con OpenAPI/Swagger para comercio exterior.',
      'Cliente Angular 12: migración funcional, rutas protegidas y guards.',
      'Dashboard en tiempo real de facturas: estados, métricas y filtros.',
      'Integración con SAP para consulta de facturación y estados.',
      'Optimización de consultas y tuning de SQL Server.',
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
    duties: [
      'Desarrollo ASP.NET Core MVC con Kendo UI/Telerik (módulos internos).',
      'Soporte a prácticas DevOps: empaquetado, versionado y promoción a entornos.',
      'Documentación funcional/técnica para traspaso a operación.',
    ],
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
    duties: [
      'Mantenimiento evolutivo .NET Framework/.NET Core y SharePoint (arquitectura state).',
      'Diseño de SP complejos, vistas e índices para alto volumen (SQL Server).',
      'Construcción y despliegue de reportes RDL (SSRS 2008).',
      'Interfaces Blazor/Razor y soporte de requerimientos bajo Scrum.',
    ],
  },
  {
    id: 4,
    company: 'Devinmotion (ALTIPAL)',
    role: 'Analista Desarrollador',
    from: { y: 2021, m: 3 }, to: { y: 2021, m: 6 },
    color: '#ef4444', logo: devinmotion, period: 'Mar 2021 – Jun 2021',
    tone: 'green',
    tags: ['REST', 'DevOps', 'Xamarin'],
    duties: [
      'Proyecto .NET Core con Telerik (HTML Helpers) para backoffice comercial.',
      'Carrito de compras y geolocalización de entregas (integración mapa).',
      'Blazor pages, Razor pages y soporte móvil con Xamarin.',
      'Automatización CI/CD y buenas prácticas de ramas.',
      'Trabajo ágil con Scrum: refinamientos, DoR/DoD y demos.',
    ],
  },
  {
    id: 3,
    company: 'MEGADEV (CELSIA)',
    role: 'Desarrollador & Soporte',
    from: { y: 2020, m: 12 }, to: { y: 2021, m: 3 },
    color: '#60a5fa', logo: megadev, period: 'Dic 2020 – Mar 2021',
    tone: 'orange',
    tags: ['Oracle', 'Vue.js', 'Scrum'],
    duties: [
      'Soporte funcional: lectura de código, diagnóstico raíz y criterios de escalamiento.',
      'Definición de workarounds y ajustes en BD (Oracle) cuando aplicaba.',
      'Desarrollo Vue.js para módulos de documentación corporativa.',
      'APIs .NET Core + EF y SQL Server; alineación con equipo funcional.',
      'Seguimiento por sprints, tableros y ceremonias Scrum.',
    ],
  },
  {
    id: 2,
    company: 'Smart Financial Systems',
    role: 'Analista Desarrollador',
    from: { y: 2018, m: 3 }, to: { y: 2020, m: 11 },
    color: '#f59e0b', logo: smartfinancial, period: 'Mar 2018 – Nov 2020',
    tone: 'red',
    tags: ['C#/.NET', 'EF', 'SQL Server'],
    duties: [
      'Proyecto Omnipays (adquirencia/corresponsalía): migración a ASP.NET Core.',
      'Arquitectura en capas/repository; Kendo UI/Telerik y jQuery en la web.',
      'Gateway de servicios (consola) y app Xamarin tipo POS (ISO 8583).',
      'Soporte a certificación PCI: evidencias, trazabilidad y mitigación OWASP Top 10.',
      'Coordinación de equipo: planificación, asignación de HU y seguimiento.',
      'SQL Server 2017: modelado, tuning y paquetes de despliegue.',
    ],
  },
  {
    id: 1,
    company: 'Procesos y Tecnología',
    role: 'Analista QA',
    from: { y: 2015, m: 11 }, to: { y: 2018, m: 3 },
    color: '#c1d72f', logo: pyt, period: 'Nov 2015 – Mar 2018',
    tone: 'blue',
    tags: ['QA', 'Oracle', 'Mantis/TestLink'],
    duties: [
      'Proyectos Banco e Inttegrio: pruebas funcionales y de usabilidad end-to-end.',
      'Gestión de incidencias con Mantis/TestLink y documentación en DokuWiki.',
      'Plan de pruebas y seguimiento por ciclos; diseño de casos y trazabilidad.',
      'Despliegues a ambiente de pruebas en GlassFish y validaciones de smoke.',
      'Consultas y soporte en Oracle R12; verificación de operaciones bancarias.',
      'Bot de soporte (Facebook Messenger) para atención de usuarios del Banco.',
    ],
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
