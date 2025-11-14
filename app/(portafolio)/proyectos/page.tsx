'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import '@/app/styles/Projects.css';
import bebidassoftc2 from '@/app/capturas/babidasc2.png';
import bebidassoftc1 from '@/app/capturas/bebidasc1.png';
import bebidassoftc3 from '@/app/capturas/bebidasc3.png';
import cerveceriac1 from '@/app/capturas/cerveceriac1.png';
import cslogo1 from '@/app/capturas/cslogo1.png';
import debsc1 from '@/app/capturas/debsc1.png';
import debsc2 from '@/app/capturas/debsc2.png';
import debsc3 from '@/app/capturas/debsc3.png';
import debsc4 from '@/app/capturas/debsc4.png';
import debsc5 from '@/app/capturas/debsc5.png';
import debsc6 from '@/app/capturas/debsc6.png';
import debsc7 from '@/app/capturas/debsc7.png';
import debsc8 from '@/app/capturas/debsc8.png';
import debsc9 from '@/app/capturas/debsc9.png';
import devinmotionc1 from '@/app/capturas/devinmotionc1.png';
import gcc1 from '@/app/capturas/gcc1.png';
import gvsc1 from '@/app/capturas/gvsc1.png';
import lbcodeworksc1 from '@/app/capturas/lbcodeworksc1.png';
import lbcodeworksc2 from '@/app/capturas/lbcodeworksc2.png';
import megadevc1 from '@/app/capturas/megadevc1.png';
import ofc1 from '@/app/capturas/ofc1.png';
import portfolioc1 from '@/app/capturas/portfolioc1.png';
import pytc1 from '@/app/capturas/pytc1.png';
import qvisionc1 from '@/app/capturas/qvisionc1.png';
import smartfinancialc1 from '@/app/capturas/smartfinancialc1.png';
import logoVass from '@/app/capturas/vassc1.png';


type Project = {
  title: string;
  description: string;
  tech: string[];
  images: (string | StaticImageData)[];
  href?: string;
};

const LABORAL: Project[] = [
  /* ───────────────── Procesos y Tecnología ───────────────── */
  {
    title: 'Banco – QA Funcional & Usabilidad',
    description:
      'Pruebas funcionales y de usabilidad sobre app web Java para consultas bancarias. Planificación de planes de prueba, gestión de ciclos, ejecución y seguimiento de incidencias. Soporte a despliegues en GlassFish y validaciones en Oracle R12.',
    tech: ['Java (app web)', 'Oracle R12', 'GlassFish', 'Mantis/TestLink', 'DokuWiki', 'QA Funcional'],
    images: [
pytc1,
    ],
  },
  {
    title: 'Inttegrio – Core Bancario (QA)',
    description:
      'QA sobre core bancario: apertura de cuentas (ahorro/corriente), préstamos, CDT y garantías. Diseño de casos de prueba, ejecución end-to-end, análisis de regresiones y gestión de defectos. Integración con Oracle R12 y despliegues controlados en GlassFish.',
    tech: ['Core Bancario', 'Oracle R12', 'GlassFish', 'Mantis/TestLink', 'Pruebas E2E'],
    images: [
pytc1,      
    ],
  },

  /* ───────────────── Smart Financial Systems ───────────────── */
  {
    title: 'OmniPays – Adquirencia & Corresponsalía',
    description:
      'Migración a ASP.NET Core con arquitectura por capas/repository, módulos web de administración, gateway de servicios y app Xamarin para datáfonos (ISO 8583). Uso de Telerik/Kendo/jQuery. Soporte a certificación PCI (metodología, evidencias OWASP Top 10) y coordinación Scrum.',
    tech: ['ASP.NET Core', 'Xamarin', 'Kendo UI/Telerik', 'jQuery', 'ISO 8583', 'PCI', 'SQL Server'],
    images: [
      smartfinancialc1,
    ],
  },

  /* ───────────────── MEGADEV (CELSIA) ───────────────── */
  {
    title: 'Soporte Funcional – CELSIA',
    description:
      'Análisis de requerimientos, reprocesos y hallazgos del equipo funcional. Revisión de código en modo lectura, diagnóstico entre error de desarrollo vs. uso/parametrización y propuestas de solución (previas a escalar a desarrollo).',
    tech: ['Gestión de Requerimientos', 'Análisis de Incidentes', 'SQL/Oracle', 'Scrum'],
    images: [
      megadevc1,],
  },
  {
    title: 'App Interna CELSIA – Documentación & Front',
    description:
      'Desarrollo de funcionalidades con Vue.js y APIs .NET Core; Entity Framework y SQL Server. Entregables de documentación para áreas internas, buenas prácticas de versionamiento e integración.',
    tech: ['Vue.js', '.NET Core API', 'Entity Framework', 'SQL Server'],
    images: [
      megadevc1,
    ],
  },

  /* ───────────────── Devinmotion (ALTIPAL) ───────────────── */
  {
    title: 'ALTIPAL – Catálogo & Entregas',
    description:
      'Módulos .NET Core con front Telerik (HTML Helpers): carrito de compras, geolocalización de entregas y soporte operativo. Uso de Razor/Blazor, jQuery y Xamarin. Trabajo ágil con Scrum.',
    tech: ['.NET Core', 'Telerik', 'Razor/Blazor', 'Xamarin', 'jQuery', 'SQL Server', 'Scrum'],
    images: [
      devinmotionc1,
    ],
  },

  /* ───────────────── Q-Vision (Colmena ARL) ───────────────── */
  {
    title: 'Colmena ARL – Soporte .NET & Reporting',
    description:
      'Mantenimiento en .NET Framework 4.5 con SharePoint (arquitectura state). Creación/ajuste de procedimientos almacenados complejos y reportes RDL; despliegue en SQL Server Reporting Services 2008. Gestión de requerimientos con Scrum.',
    tech: ['.NET Framework', 'SharePoint', 'SQL Server', 'Stored Procedures', 'RDL/SSRS', 'Scrum'],
    images: [
qvisionc1,
    ],
  },

  /* ───────────────── GVS ───────────────── */
  {
    title: 'Comercio Exterior – Microservicios & Angular',
    description:
      'Diseño y desarrollo de microservicios REST documentados con OpenAPI/Swagger, consumo desde Angular 12 y dashboards para facturas en tiempo real. Integración con SAP para visualización directa desde ERP.',
    tech: ['.NET Core (Microservicios)', 'Swagger/OpenAPI', 'Angular 12', 'SQL Server', 'SAP Integration'],
    images: [
      gvsc1,
    ],
  },

  /* ───────────────── VASS (Colmena/Fashion Park/Caja 18) ───────────────── */
  {
    title: 'Colmena – Gestión del Conocimiento (SharePoint → React)',
    description:
      'Evolución de solución en SharePoint hacia React/Next.js. Integración con Power BI, Tailwind, pruebas unitarias y linter. Backend .NET Core y SQL Server para servicios de soporte.',
    tech: ['React', 'Next.js', 'Tailwind', '.NET Core', 'SQL Server', 'Power BI'],
    images: [
      gcc1,
      logoVass,
    ],
    href: 'https://www.colmenaseguros.com/web/gestion-de-conocimiento',
  },
  {
    title: 'Colmena – Servicios .NET Core (SOAP/XML) & WSP',
    description:
      'Servicios SOAP/XML en .NET Core; empaquetado y despliegue de soluciones WSP en SharePoint. Integración con Azure App Service y Azure Key Vault. Soporte a pasarela de pagos y proyectos de “fábrica”.',
    tech: ['.NET Core', 'SOAP/XML', 'SharePoint WSP', 'Azure App Service', 'Azure Key Vault'],
    images: [
      ofc1,
      cslogo1,
      logoVass
    ],
    href: 'https://www.colmenaseguros.com/',
  },
  {
    title: 'Colmena – Citas con QR (Angular + Emailing)',
    description:
      'Módulo Angular para agendamiento con emisión de QR y envío de correo transaccional. Despliegue en Azure App Service y seguimiento de métricas.',
    tech: ['Angular', 'Email Service', 'Azure App Service', 'Key Vault'],
    images: [
      cslogo1,
            logoVass

    ],
  },
  {
    title: 'Migraciones Masivas → Salesforce (Deltas)',
    description:
      'Procesos alternativos a ETL para delta-migraciones multifuente (Oracle, SQL Server, planos) generando conversión y normalización hacia formatos compatibles con Salesforce.',
    tech: ['Oracle', 'SQL Server', 'Data Pipelines', 'Transformaciones', 'Archivos Planos'],
    images: [
      logoVass,
    ],
  },
  {
    title: 'Fashion Park (CL) – Servicios de Operación',
    description:
      'Servicios .NET Core para la operación logística/entrega de paquetería, despliegue en IIS y monitoreo básico de disponibilidad.',
    tech: ['.NET Core', 'IIS', 'Operación/Logística'],
    images: [
      logoVass,
    ],
  },
  {
    title: 'Caja 18 (CL) – Core de Deuda & Seguridad',
    description:
      'Maquetación funcional (Figma → Front) y microservicios para deuda, seguridad y reportería. Ecosistema .NET Core con despliegues controlados.',
    tech: ['.NET Core', 'Microservicios', 'Figma→Front', 'Razor','Reporting'],
    images: [
      logoVass,
    ],
  },
];

const FREELANCE: Project[] = [
  {
    title: 'lb.codeworks – Emprendimiento de servicios',
    description:
      'Marca personal orientada a proyectos de desarrollo web a la medida para Workana/Upwork. Sitio corporativo con estética neomorfismo, multisección y enfoque comercial.',
    tech: ['Next.js (React/TS)', 'Vercel', 'Neumorphism', 'i18n'],
    images: [
      lbcodeworksc1,
      lbcodeworksc2,],
    href: 'https://lbcodeworks.vercel.app/',
  },

  {
    title: 'BebidasSoft – Logística & Inventario',
    description:
      'Frontend en Next.js para un back de microservicios de autenticación (JWT) y logística con pruebas unitarias. Gestión de inventario, envíos y administración de productos; módulos operativos y paneles de control.',
    tech: ['Next.js (React/TS)', '.NET 8 (Auth & Logistics)', 'JWT', 'Unit Tests'],
    images: [
      bebidassoftc1,
      bebidassoftc2,
      bebidassoftc3,
    ],
    // href: 'https://tusitio-bebidassoft.com' // si lo publicas, pon el enlace
  },

  {
    title: 'DEBS – Gestión de Deudas Personales',
    description:
      'Plataforma con microservicios en .NET Core (API REST documentada con Swagger) y frontend React/Next.js. Incluye tablero con Chart.js, autenticación, categorías y flujo de seguimiento de pagos. Pruebas unitarias en capa de dominio/servicios.',
    tech: ['.NET Core API', 'Swagger/OpenAPI', 'React/Next.js', 'Chart.js', 'Unit Tests'],
    images: [
      debsc1,
      debsc2,
      debsc3,
      debsc4,
      debsc5,
      debsc6,
      debsc7,
      debsc8,
      debsc9,
    ],
    // href: 'https://debs-demo.vercel.app' // opcional si tienes demo
  },

  {
    title: 'Cervecería Siete Estrellas – Landing + Simulador',
    description:
      'Sitio full responsive con estética moderna, inspirado en identidad santandereana. Simulador de solicitud de bebidas artesanales, animaciones sutiles y SEO básico.',
    tech: ['Next.js', 'TypeScript', 'CSS Modules', 'SEO'],
    images: [
      cerveceriac1
    ],
    href: 'https://cerveceria-one.vercel.app/',
  },

  {
    title: 'Portafolio – Glassmorphism',
    description:
      'Portafolio personal con diseño glassmorphism, accesibilidad, rendimiento y SEO. Secciones de proyectos, experiencia y skills; totalmente responsive.',
    tech: ['Next.js (React/TS)', 'Glassmorphism', 'Responsive', 'SEO'],
    images: [
      portfolioc1
    ],
    href: 'https://leonardoburbano-portfolio.vercel.app/',
  },
];


/* ----- Tarjeta con slider (sin modal) ----- */
function ProjectCard({ p }: { p: Project }) {
  const [idx, setIdx] = useState(0);
  const total = p.images.length;

  const go = (dir: number) => setIdx((i) => (i + dir + total) % total);
  const dots = useMemo(() => Array.from({ length: total }), [total]);

  return (
    <article className="prj-card">
      {/* Columna texto */}
      <div className="prj-info">
        <header className="prj-head">
          <h3 className="prj-title">{p.title}</h3>
          <p className="prj-desc">{p.description}</p>
        </header>

        <ul className="prj-pills" role="list">
          {p.tech.slice(0, 6).map((t) => (
            <li key={t} className="pill">{t}</li>
          ))}
        </ul>

        <div className="prj-actions">
          {p.href ? (
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn blue"
              aria-label={`Visitar ${p.title}`}
            >
              <span>Visitar</span>
              <i aria-hidden />
            </Link>
          ) : (
            <span className="no-link">Repositorio/Demo privada</span>
          )}
        </div>
      </div>

      {/* Columna media (slider) */}
      <div className="prj-media">
        <div className="prj-orb" aria-hidden="true" />
        <div className="prj-slider">
          <button className="nav prev" aria-label="Anterior" onClick={() => go(-1)}>‹</button>

          <div className="prj-frame">
            <Image
              src={p.images[idx]}
              alt={`${p.title} – imagen ${idx + 1}`}
              className="prj-img"
              width={900}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>

          <button className="nav next" aria-label="Siguiente" onClick={() => go(1)}>›</button>
        </div>

        <div className="prj-dots" role="tablist" aria-label="Selector de imagen">
          {dots.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === idx ? 'is-active' : ''}`}
              aria-label={`Ir a imagen ${i + 1}`}
              aria-selected={i === idx}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <section className="ctc">
      <header className="ctc-head">
        <h1 className="ctc-title">Proyectos</h1>
        <p className="ctc-sub">Te cuento acerca de los proyectos en los que he participado y lo que he conseguido.</p>
      </header>

      <section className="prj-section">
        <h2 className="prj-section-title">Proyectos freelance / personales</h2>
        <div className="prj-grid">
          {FREELANCE.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>

      <section className="prj-section">
        <h2 className="prj-section-title">Proyectos laborales</h2>
        <div className="prj-grid">
          {LABORAL.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>
    </section>
  );
}
