'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaGithub } from 'react-icons/fa';
import { MdOpenInNew } from 'react-icons/md';

import '@/app/styles/Projects.css';
import bebidassoftc2 from '@/app/capturas/babidasc2.webp';
import bebidassoftc1 from '@/app/capturas/bebidasc1.webp';
import bebidassoftc3 from '@/app/capturas/bebidasc3.webp';
import cerveceriac1 from '@/app/capturas/cerveceriac1.webp';
import cslogo1 from '@/app/capturas/cslogo1.webp';
import debsc1 from '@/app/capturas/debsc1.webp';
import debsc2 from '@/app/capturas/debsc2.webp';
import debsc3 from '@/app/capturas/debsc3.webp';
import debsc4 from '@/app/capturas/debsc4.webp';
import debsc5 from '@/app/capturas/debsc5.webp';
import debsc6 from '@/app/capturas/debsc6.webp';
import debsc7 from '@/app/capturas/debsc7.webp';
import debsc8 from '@/app/capturas/debsc8.webp';
import debsc9 from '@/app/capturas/debsc9.webp';
import devinmotionc1 from '@/app/capturas/devinmotionc1.webp';
import felipeSantanaBlog from '@/app/capturas/felipe-santana-psicologo-blog.webp';
import felipeSantanaHero from '@/app/capturas/felipe-santana-psicologo-hero.webp';
import felipeSantanaServicios from '@/app/capturas/felipe-santana-psicologo-servicios.webp';
import gcc1 from '@/app/capturas/gcc1.webp';
import gvsc1 from '@/app/capturas/gvsc1.webp';
import lbcodeworksCom2026 from '@/app/capturas/lbcodeworks-com-2026.webp';
import lbcodeworksComLight2026 from '@/app/capturas/lbcodeworks-com-light-2026.webp';
import lbcodeworksContacto2026 from '@/app/capturas/lbcodeworks-contacto-2026.webp';
import lbcodeworksContactoLight2026 from '@/app/capturas/lbcodeworks-contacto-light-2026.webp';
import lbcodeworksFaq2026 from '@/app/capturas/lbcodeworks-faq-2026.webp';
import lbcodeworksFaqLight2026 from '@/app/capturas/lbcodeworks-faq-light-2026.webp';
import lbcodeworksProyectos2026 from '@/app/capturas/lbcodeworks-proyectos-2026.webp';
import lbcodeworksProyectosLight2026 from '@/app/capturas/lbcodeworks-proyectos-light-2026.webp';
import megadevc1 from '@/app/capturas/megadevc1.webp';
import observadorAsistencia2026 from '@/app/capturas/observador-asistencia-2026.webp';
import observadorCalendario2026 from '@/app/capturas/observador-calendario-2026.webp';
import observadorDashboard2026 from '@/app/capturas/observador-dashboard-2026.webp';
import observadorNotas2026 from '@/app/capturas/observador-notas-2026.webp';
import ofc1 from '@/app/capturas/ofc1.webp';
import origendotacionesc1 from '@/app/capturas/origendotacionesc1.webp';
import portfolioc1 from '@/app/capturas/portfolioc1.webp';
import pytc1 from '@/app/capturas/pytc1.webp';
import qvisionc1 from '@/app/capturas/qvisionc1.webp';
import smartfinancialc1 from '@/app/capturas/smartfinancialc1.webp';
import logoVass from '@/app/capturas/vassc1.webp';


type Project = {
  title: string;
  description: string;
  tech: string[];
  images: (string | StaticImageData)[];
  href?: string;
  codeHref?: string;
  badge?: 'Destacado' | 'Freelance' | 'Personal' | 'Comercial';
  imageFit?: 'cover' | 'contain';
};

type ProjectTab = 'freelance' | 'laboral';

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
    title: 'Felipe Santana Psicólogo – Landing profesional',
    description:
      'Landing profesional para psicólogo organizacional en Cali. Presenta marca personal, servicios para personas y empresas, secciones de acerca de, blog, preguntas frecuentes y contacto con CTA directo a WhatsApp/correo, cuidando una experiencia visual limpia con elementos que aparecen al hacer scroll.',
    tech: ['Landing profesional', 'Marca personal', 'Servicios', 'Blog', 'Scroll reveal', 'WhatsApp CTA', 'Vercel'],
    images: [
      felipeSantanaHero,
      felipeSantanaServicios,
      felipeSantanaBlog,
    ],
    href: 'https://felipe-santana-psicologo.vercel.app/landing',
    badge: 'Freelance',
    imageFit: 'contain',
  },

  {
    title: 'lb.codeworks – Empresa de software a medida',
    description:
      'Sitio corporativo de lb.codeworks para ofrecer desarrollo web y software a la medida. Presenta servicios, enfoque comercial, CTA de cotización, contacto por WhatsApp, navegación bilingüe y experiencia visual en modo claro/oscuro.',
    tech: ['Next.js (React/TS)', 'Landing comercial', 'Software a medida', 'WhatsApp CTA', 'SEO'],
    images: [
      lbcodeworksCom2026,
      lbcodeworksComLight2026,
      lbcodeworksProyectos2026,
      lbcodeworksProyectosLight2026,
      lbcodeworksFaq2026,
      lbcodeworksFaqLight2026,
      lbcodeworksContacto2026,
      lbcodeworksContactoLight2026,
    ],
    href: 'https://lbcodeworks.com/',
    imageFit: 'contain',
  },

  {
    title: 'Origen Dotaciones – Catálogo & cotización B2B',
    description:
      'Catálogo digital para Origen Dotaciones y Confecciones B&R, empresa de Cali enfocada en dotación empresarial. Incluye categorías de uniformes industriales, antifluido, ejecutivos, deportivos, vigilancia, cocina y bordado; búsqueda, productos destacados, carrito de cotización y CTA a WhatsApp para atención comercial.',
    tech: ['Next.js (React/TS)', 'Material UI', 'Catálogo digital', 'SEO', 'WhatsApp CTA'],
    images: [
      origendotacionesc1,
    ],
    href: 'https://www.origendotaciones.com/',
    badge: 'Freelance',
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
    title: 'Observador Estudiantil – Gestión académica',
    description:
      'Plataforma docente full-stack para colegios: dashboard con métricas, módulos académicos, registro de notas por periodo, asistencia con reportes mensuales/PDF, calendario curricular, eventualidades, cuadernos digitales y reportes exportables.',
    tech: ['React 19', 'Vite', 'MUI', 'NestJS', 'Prisma', 'PostgreSQL', '.NET JWT'],
    images: [
      observadorDashboard2026,
      observadorAsistencia2026,
      observadorCalendario2026,
      observadorNotas2026,
    ],
    href: 'https://observador.lbcodeworks.com/landing',
    codeHref: 'https://github.com/leobr95/student-observer-system',
    badge: 'Personal',
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


/* ----- Tarjeta con slider + modal de imagen ----- */
function ProjectCard({
  p,
  priorityMedia = false,
  showActions = true,
}: {
  p: Project;
  priorityMedia?: boolean;
  showActions?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const total = p.images.length;
  const badge = p.badge ?? (p.href ? 'Destacado' : 'Comercial');
  const activeImage = p.images[idx];
  const [isModalOpen, setModalOpen] = useState(false);
  const [canUsePortal, setCanUsePortal] = useState(false);
  const activeImageLabel = `${p.title} – captura ${idx + 1}`;

  const go = (dir: number) => setIdx((i) => (i + dir + total) % total);
  const dots = useMemo(() => Array.from({ length: total }), [total]);

  useEffect(() => {
    setCanUsePortal(true);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalOpen(false);
      if (event.key === 'ArrowLeft') setIdx((i) => (i - 1 + total) % total);
      if (event.key === 'ArrowRight') setIdx((i) => (i + 1 + total) % total);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isModalOpen, total]);

  return (
    <article className="prj-card">
      <div className="prj-media">
        <span className={`prj-badge prj-badge--${badge.toLowerCase()}`}>{badge}</span>

        <div className="prj-slider">
          <button className="nav prev" aria-label="Anterior" onClick={() => go(-1)}>‹</button>

          <button
            type="button"
            className={`prj-frame prj-frame--button ${p.imageFit === 'contain' ? 'prj-frame--contain' : ''}`}
            aria-label={`Ampliar ${activeImageLabel}`}
            onClick={() => setModalOpen(true)}
          >
            <Image
              src={activeImage}
              alt={activeImageLabel}
              className="prj-img"
              width={1200}
              height={760}
              sizes="(max-width: 900px) 90vw, 44vw"
              loading={priorityMedia ? 'eager' : 'lazy'}
              unoptimized
            />
            <span className="prj-zoom-label" aria-hidden>Ampliar</span>
          </button>

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

      <div className={`prj-info ${showActions ? '' : 'prj-info--no-actions'}`}>
        <header className="prj-head">
          <h3 className="prj-title">{p.title}</h3>
          <p className="prj-desc">{p.description}</p>
        </header>

        <ul className="prj-pills" role="list">
          {p.tech.slice(0, 7).map((t) => (
            <li key={t} className={`prj-chip prj-chip--${techTone(t)}`}>{t}</li>
          ))}
        </ul>

        {showActions ? (
          <div className="prj-actions">
            {p.href ? (
              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="prj-btn prj-btn--primary"
                aria-label={`Ver proyecto ${p.title}`}
              >
                <span>Ver proyecto</span>
                <MdOpenInNew aria-hidden />
              </Link>
            ) : (
              <span className="prj-btn prj-btn--primary is-disabled" aria-disabled="true">
                <span>Ver proyecto</span>
                <MdOpenInNew aria-hidden />
              </span>
            )}

            {p.codeHref ? (
              <Link
                href={p.codeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="prj-btn prj-btn--secondary"
                aria-label={`Ver código de ${p.title}`}
              >
                <FaGithub aria-hidden />
                <span>Código</span>
              </Link>
            ) : (
              <span className="prj-btn prj-btn--secondary is-disabled" aria-disabled="true">
                <FaGithub aria-hidden />
                <span>Código</span>
              </span>
            )}
          </div>
        ) : null}
      </div>

      {canUsePortal && isModalOpen ? createPortal((
        <div
          className="prj-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${p.title}`}
          onClick={() => setModalOpen(false)}
        >
          <div className="prj-modal-panel" onClick={(event) => event.stopPropagation()}>
            <header className="prj-modal-head">
              <div>
                <strong>{p.title}</strong>
                <span>Captura {idx + 1} de {total}</span>
              </div>
              <button
                type="button"
                className="prj-modal-close"
                aria-label="Cerrar imagen ampliada"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
            </header>

            <div className={`prj-modal-body ${total > 1 ? '' : 'prj-modal-body--single'}`}>
              {total > 1 ? (
                <button
                  type="button"
                  className="prj-modal-nav prj-modal-nav--prev"
                  aria-label="Imagen anterior"
                  onClick={() => go(-1)}
                >
                  ‹
                </button>
              ) : null}

              <div className="prj-modal-frame">
                <Image
                  src={activeImage}
                  alt={activeImageLabel}
                  className="prj-modal-img"
                  width={1600}
                  height={1000}
                  sizes="100vw"
                  priority
                  unoptimized
                />
              </div>

              {total > 1 ? (
                <button
                  type="button"
                  className="prj-modal-nav prj-modal-nav--next"
                  aria-label="Imagen siguiente"
                  onClick={() => go(1)}
                >
                  ›
                </button>
              ) : null}
            </div>

            {total > 1 ? (
              <div className="prj-modal-dots" role="tablist" aria-label="Selector de captura ampliada">
                {dots.map((_, i) => (
                  <button
                    key={`modal-${i}`}
                    type="button"
                    className={`dot ${i === idx ? 'is-active' : ''}`}
                    aria-label={`Ver captura ${i + 1}`}
                    aria-selected={i === idx}
                    onClick={() => setIdx(i)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ), document.body) : null}
    </article>
  );
}

function techTone(tech: string) {
  const value = tech.toLowerCase();
  if (value.includes('react') || value.includes('next') || value.includes('typescript') || value.includes('angular') || value.includes('vue')) return 'blue';
  if (value.includes('.net') || value.includes('c#') || value.includes('api') || value.includes('micro')) return 'violet';
  if (value.includes('sql') || value.includes('oracle') || value.includes('data') || value.includes('report')) return 'cyan';
  if (value.includes('azure') || value.includes('vercel') || value.includes('docker') || value.includes('devops')) return 'indigo';
  if (value.includes('qa') || value.includes('test') || value.includes('scrum')) return 'green';
  if (value.includes('sharepoint') || value.includes('soap') || value.includes('sap') || value.includes('salesforce')) return 'amber';
  return 'slate';
}

function ProjectsContent({ showSectionTitles = true }: { showSectionTitles?: boolean }) {
  const [activeTab, setActiveTab] = useState<ProjectTab>('freelance');
  const isFreelanceActive = activeTab === 'freelance';
  const activeProjects = isFreelanceActive ? FREELANCE : LABORAL;
  const activeTitle = isFreelanceActive ? 'Proyectos freelance / personales' : 'Proyectos laborales';
  const activeDescription = isFreelanceActive
    ? 'Productos propios, landings comerciales y soluciones desarrolladas de punta a punta.'
    : 'Participación en equipos empresariales, fábrica de software, integraciones y plataformas internas.';

  return (
    <section className="prj-section prj-section--tabs">
      <div className="prj-tabs" role="tablist" aria-label="Tipo de proyectos">
        <button
          type="button"
          id="tab-proyectos-freelance"
          role="tab"
          className={`prj-tab ${isFreelanceActive ? 'is-active' : ''}`}
          aria-selected={isFreelanceActive}
          aria-controls="panel-proyectos"
          onClick={() => setActiveTab('freelance')}
        >
          <span>Proyectos freelance / personales</span>
        </button>

        <button
          type="button"
          id="tab-proyectos-laborales"
          role="tab"
          className={`prj-tab ${!isFreelanceActive ? 'is-active' : ''}`}
          aria-selected={!isFreelanceActive}
          aria-controls="panel-proyectos"
          onClick={() => setActiveTab('laboral')}
        >
          <span>Proyectos laborales</span>
        </button>
      </div>

      <section
        key={activeTab}
        id="panel-proyectos"
        className="prj-tab-panel"
        role="tabpanel"
        aria-labelledby={isFreelanceActive ? 'tab-proyectos-freelance' : 'tab-proyectos-laborales'}
      >
        {showSectionTitles ? (
          <header className="prj-section-head">
            <h2 className="prj-section-title">{activeTitle}</h2>
            <p className="prj-section-desc">{activeDescription}</p>
          </header>
        ) : null}

        <div className="prj-grid">
          {activeProjects.map((p, index) => (
            <ProjectCard
              key={p.title}
              p={{
                ...p,
                badge: isFreelanceActive
                  ? p.badge ?? (p.title.includes('Portafolio') ? 'Personal' : 'Freelance')
                  : p.href ? 'Destacado' : 'Comercial',
              }}
              priorityMedia={index === 0}
              showActions={isFreelanceActive}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <section className="ctc prj">
      <header className="prj-hero prj-hero--classic">
        <div className="ctc-head prj-hero-copy">
          <h1 className="ctc-title">Proyectos</h1>
          <p className="ctc-sub prj-sub">
            Te cuento acerca de los proyectos en los que he participado y lo que he conseguido.
          </p>
        </div>

        <dl className="prj-stats" aria-label="Resumen de proyectos">
          <div className="prj-stat">
            <dt>Experiencia</dt>
            <dd>5+ años</dd>
          </div>
          <div className="prj-stat">
            <dt>Proyectos</dt>
            <dd>20+</dd>
          </div>
          <div className="prj-stat">
            <dt>Tecnologías</dt>
            <dd>15+</dd>
          </div>
        </dl>
      </header>
      <ProjectsContent />
    </section>
  );
}
