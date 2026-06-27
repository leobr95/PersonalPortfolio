'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState, type JSX } from 'react';

import '@/app/styles/EducationCards.css';
import sena from '@/app/logos/sena.webp';
import smartFinancial from '@/app/logos/smartf.webp';
import udemy from '@/app/logos/udemy.webp';
import universidad from '@/app/logos/universidad.webp';

type YM = { y: number; m: number };                 // m: 1..12
type Period = { from: YM; to: YM };

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
  periodLabel?: string;
  logo?: StaticImageData;
  mode?: 'Online' | 'Presencial' | 'Híbrido';
  details?: string[];
  certificateHref?: string;
  tone?: 'blue' | 'green' | 'orange' | 'red';
};

const MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const guard = (n:number) => Math.max(1, Math.min(12, n));
const fmtYM = ({ y, m }: YM) => `${MES[guard(m) - 1]} ${y}`;

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
      'Trabajos de investigación orientados a aplicaciones empresariales.',
    ],
    tone: 'blue',
  },
  {
    degree: 'Tecnólogo ADSI (Análisis y Desarrollo de Sistemas de Información)',
    institution: 'SENA',
    period: { from: { y: 2014, m: 1 }, to: { y: 2016, m: 12 } },
    location: 'Colombia',
    logo: sena,
    details: [
      'Análisis y Desarrollo de Software (ADSI).',
      'Frontend y Backend con enfoque práctico.',
      'Metodologías ágiles y trabajo colaborativo.',
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
    name: 'Angular: De cero a experto',
    provider: 'Udemy',
    period: { from: { y: 2023, m: 10 }, to: { y: 2023, m: 10 } },
    periodLabel: '2023',
    logo: udemy,
    mode: 'Online',
    certificateHref: '/certificados/angular-de-cero-a-experto-2023.pdf',
    details: [
      'Formación práctica en Angular moderno, componentes, servicios y enrutamiento.',
      'Construcción de aplicaciones frontend con TypeScript y buenas prácticas.',
    ],
    tone: 'red',
  },
  {
    name: 'Creando Web APIs Profesionales con .NET 6 y .NET 7',
    provider: 'Udemy',
    period: { from: { y: 2023, m: 11 }, to: { y: 2023, m: 11 } },
    periodLabel: '2023',
    logo: udemy,
    mode: 'Online',
    certificateHref: '/certificados/creando-web-apis-profesionales-net-6-net-7.pdf',
    details: [
      'Diseño y desarrollo de APIs REST profesionales con ASP.NET Core.',
      'Buenas prácticas para endpoints, servicios, arquitectura y mantenibilidad.',
    ],
    tone: 'green',
  },
  {
    name: 'Seguridad informática para empresas',
    provider: 'Udemy',
    period: { from: { y: 2023, m: 12 }, to: { y: 2023, m: 12 } },
    periodLabel: '2023',
    logo: udemy,
    mode: 'Online',
    certificateHref: '/certificados/seguridad-informatica-para-empresas-2023.pdf',
    details: [
      'Conceptos de protección de datos, riesgos y buenas prácticas empresariales.',
      'Enfoque preventivo para seguridad, privacidad y cultura organizacional.',
    ],
    tone: 'orange',
  },
  {
    name: 'Curso de Inglés',
    provider: 'Udemy / Pluralsight',
    period: { from: { y: 2018, m: 3 }, to: { y: 2020, m: 11 } },
    logo: smartFinancial,
    mode: 'Online',
    details: [
      'Formación de inglés desarrollada durante mi etapa en Smart Financial Systems.',
      'Refuerzo de lectura técnica, comunicación profesional y documentación en inglés.',
    ],
    tone: 'red',
  },
];

/** Hook para animar max-height a la altura real del contenido */
function useExpandableHeight(isOpen: boolean, deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      if (isOpen) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = '0px';
      }
    };

    apply();

    const onResize = () => apply();
    window.addEventListener('resize', onResize);

    const ro = new ResizeObserver(() => {
      if (isOpen) el.style.maxHeight = `${el.scrollHeight}px`;
    });
    ro.observe(el);

    return () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, ...deps]);

  return ref;
}

type EduCardProps = {
  title: string;
  subtitle: string;
  period: Period;
  periodLabel?: string;
  logo?: StaticImageData;
  details?: string[];
  certificateHref?: string;
  tone?: 'blue' | 'green' | 'orange' | 'red';
  priority?: boolean;
};

function EduCard({
  title,
  subtitle,
  period,
  periodLabel,
  logo,
  details,
  certificateHref,
  tone = 'blue',
  priority = false,
}: EduCardProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const detailId = `edu-detail-${title.replace(/\s+/g, '-')}`;
  const detailRef = useExpandableHeight(open, [details?.length ?? 0, title]);

  return (
    <article className={`edu-card tone-${tone}`}>
      <div className="edu-card-logo">
        {logo ? (
          <Image
            src={logo}
            alt={`${title} · ${subtitle}`}
            width={92}
            height={92}
            sizes="(max-width: 860px) 92px, 92px"
            priority={priority}
          />
        ) : (
          <div className="edu-logo-fallback" aria-hidden>EDU</div>
        )}
      </div>

      <header className="edu-card-head">
        <h3 className="edu-title">{title}</h3>
        <p className="edu-sub">{subtitle}</p>
        <span className="edu-period">
          {periodLabel ?? `${fmtYM(period.from)} – ${fmtYM(period.to)}`}
        </span>
      </header>

      <div className="edu-actions">
        <button
          type="button"
          className="edu-btn"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls={detailId}
        >
          <span>{open ? 'Ocultar detalles' : 'Ver detalles'}</span>
          <i aria-hidden />
        </button>
        {certificateHref ? (
          <a
            className="edu-btn edu-link"
            href={certificateHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver certificado de ${title}`}
          >
            <span>Ver certificado</span>
            <i aria-hidden />
          </a>
        ) : null}
      </div>

      <div
        id={detailId}
        ref={detailRef}
        className={`edu-detail ${open ? 'is-open' : ''}`}
        style={{ maxHeight: 0 }}
      >
        {details?.length ? (
          <ul>
            {details.map((d, i) => (
              <li
                key={`${detailId}-${i}`}
                className="edu-detail-item"
                style={{ transitionDelay: open ? `${Math.min(i * 25, 150)}ms` : '0ms' }}
              >
                {d}
              </li>
            ))}
          </ul>
        ) : (
          <p className="edu-empty">Sin detalles adicionales.</p>
        )}
      </div>
    </article>
  );
}

export default function EducationCards(): JSX.Element {
  return (
    <section className="eduSec" aria-label="Educación">
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
              priority={idx === 0}
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
              periodLabel={c.periodLabel}
              logo={c.logo}
              details={c.details}
              certificateHref={c.certificateHref}
              tone={c.tone}
              priority={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
