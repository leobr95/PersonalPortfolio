'use client';

import { useState } from 'react';

import '@/app/styles/EducationCards.css';
import sena from '@/app/logos/sena.png';
import smartFinancial from '@/app/logos/smartf.png';
import udemy from '@/app/logos/udemy.jpg'
import universidad from '@/app/logos/universidad.webp';

// eslint-disable-next-line import/order
import { StaticImageData } from 'next/dist/shared/lib/image-external';

// eslint-disable-next-line import/order
import Image from 'next/image';
type Period = { from: { y: number; m: number }; to: { y: number; m: number } };
type Study = {
  degree: string;
  institution: string;
  period: Period;
  logo?: StaticImageData;
  location?: string;
  details?: string[];
  tone?: 'blue' | 'green' | 'orange' | 'red';
};
type Course = {
  name: string;
  provider: string;
  period: Period;
  logo?: StaticImageData;
  mode?: 'Online' | 'Presencial' | 'Híbrido';
  details?: string[];
  tone?: 'blue' | 'green' | 'orange' | 'red';
};

const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const fmtYM = ({ y, m }: { y:number; m:number }) => `${MES[Math.max(1, Math.min(12, m)) - 1]} ${y}`;

const STUDIES: Study[] = [
  {
    degree: 'Ingeniería Informática',
    institution: 'Corporación Universitaria Autónoma de Nariño',
    period: { from: { y: 2018, m: 1 }, to: { y: 2020, m: 12 } },
    location: 'Colombia',
    logo: universidad,
    details: [
      'Fundamentos sólidos en desarrollo de software y bases de datos.',
      'Proyectos con .NET, SQL Server y patrones de arquitectura.',
      'Trabajos de investigación orientados a aplicaciones empresariales.'
    ],
    tone: 'blue',
  },
  {
    degree: 'Tecnólogo ADSI(Analisis y Desarrollo de Sistemas de Información)',
    institution: 'SENA',
    period: { from: { y: 2014, m: 1 }, to: { y: 2016, m: 12 } },
    location: 'Colombia',
    logo: sena,
    details: [
      'Análisis y Desarrollo de Software (ADSI).',
      'Frontend y Backend con enfoque práctico.',
      'Metodologías ágiles y trabajo colaborativo.'
    ],
    tone: 'red',
  },
  {
    degree: 'Técnico en Sistemas',
    institution: 'SENA',
    period: { from: { y: 2009, m: 1 }, to: { y: 2013, m: 12 } },
    logo: sena,
    details: [
      'Soporte y mantenimiento de equipos.',
      'Fundamentos de redes y sistemas operativos.',
    ],
    tone: 'orange',
  },
];

const COURSES: Course[] = [
  {
    name: 'Curso de Ingles',
    provider: 'Udemy / Pluralsight',
    period: { from: { y: 2021, m: 5 }, to: { y: 2021, m: 9 } },
    logo: smartFinancial,
    mode: 'Online',
    details: [
      'Capas Domain, Application, Infrastructure y API.',
      'Buenas prácticas, SOLID, inyección de dependencias.'
    ],
    tone: 'red',
  },
  {
    name: 'React + TypeScript Avanzado',
    provider: 'Platzi / FrontendMasters',
    period: { from: { y: 2022, m: 2 }, to: { y: 2022, m: 8 } },
    logo: udemy,
    mode: 'Online',
    details: [
      'Estado, hooks, performance y patrones.',
      'Buenas prácticas con TS y tooling moderno.'
    ],
    tone: 'blue',
  },
  {
    name: 'Azure Fundamentals (App Service / Key Vault / CI-CD)',
    provider: 'Microsoft Learn',
    period: { from: { y: 2023, m: 3 }, to: { y: 2023, m: 6 } },
    logo: udemy,
    mode: 'Online',
    details: [
      'Despliegues en App Service y pipelines en Azure DevOps.',
      'Gestión segura de secretos con Key Vault.'
    ],
    tone: 'green',
  },
];

function EduCard({
  title,
  subtitle,
  period,
  logo,
  details,
  tone = 'blue',
}: {
  title: string;
  subtitle: string;
  period: Period;
  logo?: StaticImageData;
  details?: string[];
  tone?: 'blue' | 'green' | 'orange' | 'red';
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`edu-card tone-${tone}`}>
      <div className="edu-card-logo">
        {logo ? (
          // imagen de ejemplo para reemplazar por tu ruta local
          <Image src={logo} alt="" />
        ) : (
          <div className="edu-logo-fallback" aria-hidden>EDU</div>
        )}
      </div>

      <header className="edu-card-head">
        <h3 className="edu-title">{title}</h3>
        <p className="edu-sub">{subtitle}</p>
        <span className="edu-period">
          {fmtYM(period.from)} – {fmtYM(period.to)}
        </span>
      </header>

      <div className="edu-actions">
        <button className="edu-btn" onClick={() => setOpen(v => !v)} aria-expanded={open}>
          {open ? 'Ocultar detalles' : 'Ver detalles'}
        </button>
      </div>

      <div className={`edu-detail ${open ? 'is-open' : ''}`}>
        {details?.length ? (
          <ul>
            {details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        ) : (
          <p className="edu-empty">Sin detalles adicionales.</p>
        )}
      </div>
    </article>
  );
}

export default function EducationCards() {
  return (
    <section className="eduSec">
      <header className="eduSec-head">
        <h2>Educación</h2>
      </header>

      <div className="edu-group">
        <h3 className="edu-group-title">Estudios</h3>
        <div className="edu-grid">
          {STUDIES.map((s, idx) => (
            <EduCard
              key={`study-${idx}`}
              title={s.degree}
              subtitle={`${s.institution}${s.location ? ` · ${s.location}` : ''}`}
              period={s.period}
              logo={s.logo}
              details={s.details}
              tone={s.tone}
            />
          ))}
        </div>
      </div>

      <div className="edu-group">
        <h3 className="edu-group-title">Cursos</h3>
        <div className="edu-grid">
          {COURSES.map((c, idx) => (
            <EduCard
              key={`course-${idx}`}
              title={c.name}
              subtitle={`${c.provider}${c.mode ? ` · ${c.mode}` : ''}`}
              period={c.period}
              logo={c.logo}
              details={c.details}
              tone={c.tone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
