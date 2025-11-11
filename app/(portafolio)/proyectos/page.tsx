'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import '@/app/styles/Projects.css';

type Project = {
  title: string;
  description: string;          // Qué realizaste
  tech: string[];               // Máx 6 recomendado
  images: string[];             // 1..N
  href?: string;                // opcional
};

// ===== Datos =====
const LABORAL: Project[] = [
  {
    title: 'Distribución de Bebidas – Backoffice',
    description:
      'Diseñé e implementé API REST (.NET 8) con Clean Architecture, auth JWT, órdenes, ruteo logístico y reportes SSRS. Front en React/Next con dashboards y carga masiva.',
    tech: ['.NET 8', 'EF Core', 'React/Next.js', 'SQL Server', 'Docker', 'Azure DevOps'],
    images: [
      // reemplaza por tus imágenes locales (public/...) si quieres
      'https://images.pexels.com/photos/6476586/pexels-photo-6476586.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    href: 'https://cerveceria-one.vercel.app/', // demo/placeholder
  },
  {
    title: 'Finanzas – Gestión de Cartera',
    description:
      'Refactor de microservicios, conciliación, colas de proceso y panel operativo. Migré reportes a RDL, traces con Serilog y pipelines CI/CD.',
    tech: ['.NET', 'SQL Server', 'RDL/SSRS', 'Serilog'],
    images: [
      'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
  },
];

const FREELANCE: Project[] = [
  {
    title: 'Cervecería Siete Estrellas (Landing + Simulador)',
    description:
      'Maqueté una landing con assets 8-bits, simulador de sabores y animaciones sutiles. SEO básico y despliegue en Vercel.',
    tech: ['Next.js', 'TypeScript', 'CSS Modules'],
    images: [
      'https://images.pexels.com/photos/5532792/pexels-photo-5532792.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/5532771/pexels-photo-5532771.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    href: 'https://cerveceria-one.vercel.app/',
  },
  {
    title: 'Job Fit Assistant (Extensión)',
    description:
      'Parseo de vacantes, extracción de skills y match score. Generación de bullet points y resumen para ATS.',
    tech: ['TypeScript', 'Content Scripts', 'NLP básico'],
    images: [
      'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
  },
];

// ====== Tarjeta con slider ======
function ProjectCard({ p }: { p: Project }) {
  const [idx, setIdx] = useState(0);
  const total = p.images.length;

  const go = (dir: number) => {
    setIdx((i) => {
      const n = (i + dir + total) % total;
      return n;
    });
  };

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

      {/* Columna imágenes */}
      <div className="prj-media">
        <div className="prj-orb" aria-hidden="true" />
        <div className="prj-slider">
          <button
            className="nav prev"
            aria-label="Anterior"
            onClick={() => go(-1)}
          >
            ‹
          </button>

          <div className="prj-frame">
            <Image
              src={p.images[idx]}
              alt={`${p.title} – imagen ${idx + 1}`}
              className="prj-img"
              width={900}
              height={600}
              priority={false}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <button
            className="nav next"
            aria-label="Siguiente"
            onClick={() => go(1)}
          >
            ›
          </button>
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
    <section className="prj">
      <header className="prj-top">
        <h1 className="prj-title-main">Proyectos</h1>
        <p className="prj-sub">
          Algunos trabajos destacados. Mitad texto (lo que hice) y mitad visual.
        </p>
      </header>

      <section className="prj-section">
        <h2 className="prj-section-title">Proyectos laborales</h2>
        <div className="prj-grid">
          {LABORAL.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>

      <section className="prj-section">
        <h2 className="prj-section-title">Proyectos freelance / personales</h2>
        <div className="prj-grid">
          {FREELANCE.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>
    </section>
  );
}
