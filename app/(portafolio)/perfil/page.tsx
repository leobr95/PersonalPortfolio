'use client';

import Image from 'next/image';
import Link from 'next/link';
import { JSX, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaPhoneAlt, FaWhatsapp, FaRegListAlt } from 'react-icons/fa';
import { MdChevronRight, MdEmail, MdWorkOutline, MdFolderOpen, MdSchool } from 'react-icons/md';

import imageProfileLight from '@/app/logos/profile-photo.png';
import imageProfileDark from '@/app/logos/profile-photo.png';
import '@/app/styles/Profile.css';

export default function PerfilPage(): JSX.Element {
  const nav = useMemo(
    () => [
      {
        href: '/experiencia',
        label: 'Experiencia',
        description: 'Mi trayectoria profesional.',
        icon: <MdWorkOutline aria-hidden />,
      },
      {
        href: '/proyectos',
        label: 'Proyectos',
        description: 'Casos de éxito recientes.',
        icon: <MdFolderOpen aria-hidden />,
      },
      {
        href: '/skills',
        label: 'Habilidades',
        description: 'Tecnologías y herramientas.',
        icon: <FaRegListAlt aria-hidden />,
      },
      {
        href: '/educacion',
        label: 'Educación',
        description: 'Formación académica.',
        icon: <MdSchool aria-hidden />,
      },
      {
        href: '/contacto',
        label: 'Contacto',
        description: 'Hablemos sobre tu proyecto.',
        icon: <MdEmail aria-hidden />,
      },
    ],
    []
  );

  const contactGroups = useMemo(
    () => [
      {
        id: 'direct',
        label: 'Teléfono y WhatsApp',
        items: [
          { href: 'tel:+573236504428', label: 'Llamar', icon: <FaPhoneAlt aria-hidden />, tone: 'green' },
          { href: 'https://wa.me/573236504428', label: 'WhatsApp', icon: <FaWhatsapp aria-hidden />, tone: 'green' },
          { href: 'https://wa.me/message/TU_ID_EMPRESA', label: 'WA empresa', icon: <FaWhatsapp aria-hidden />, tone: 'green' },
        ],
      },
      {
        id: 'professional',
        label: 'GitHub, email y LinkedIn',
        items: [
          { href: 'https://github.com/leobr95', label: 'GitHub', icon: <FaGithub aria-hidden />, tone: 'blue' },
          { href: 'mailto:br.david@outlook.com', label: 'Email', icon: <MdEmail aria-hidden />, tone: 'blue' },
          { href: 'https://www.linkedin.com/in/leonardoburbano', label: 'LinkedIn', icon: <FaLinkedin aria-hidden />, tone: 'blue' },
        ],
      },
    ],
    []
  );

  return (
    <section className="prf" aria-label="Perfil">
      <div className="prf-mobileTopbar" aria-hidden="true">
        <span className="prf-mobileLogo">LB</span>
        <span className="prf-mobileBrand">Leonardo Burbano</span>
      </div>

      <div className="prf-card">
        <div className="prf-hero">
          <div className="prf-copy">
            <p className="prf-eyebrow">PORTAFOLIO</p>

            <h1 className="prf-title">
              <span className="ghost">Hola, soy</span>
              <span className="name name--desktop">Leonardo David Burbano</span>
              <span className="name name--mobile">Leonardo Burbano</span>
            </h1>

            <p className="prf-status">
              <span aria-hidden>●</span>
              Disponible para proyectos
            </p>

            <p className="prf-role">
              Full-Stack .NET
              <span>APIs y arquitectura limpia</span>
            </p>

            <p className="prf-summary">
              Desarrollador Full-Stack .NET especializado en APIs, arquitectura limpia y aplicaciones empresariales.
            </p>

            <p className="prf-sub prf-sub--long">
              Desarrollador <strong>Full-Stack .NET</strong>. Back: <strong>APIs REST</strong> y
              <strong> microservicios .NET/Core</strong> (Clean Architecture), datos en
              <strong> SQL Server/Oracle</strong> (EF Core, LINQ) y <strong>SSRS/RDL</strong>. Front:
              <strong> TypeScript</strong> con <strong>React/Next.js</strong>, <strong>Angular</strong> y <strong>Vue</strong>;
              <strong> Tailwind</strong>. DevOps: <strong>Docker</strong>, <strong>Azure</strong> (App Service/Key Vault) y
              <strong> CI/CD</strong> en Azure DevOps. Integraciones <strong>SOAP/REST</strong>, <strong>SharePoint/WSP</strong>
              y servicios en <strong>NestJS</strong>. Prácticas <strong>Scrum</strong>, foco en seguridad (PCI/OWASP) y calidad.
            </p>

            <nav className="prf-actions" aria-label="Secciones principales">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="pf-glow-btn blue" aria-label={n.label}>
                  {n.icon}
                  <span className="prf-action-copy">
                    <span className="prf-action-title">{n.label}</span>
                    <span className="prf-action-desc">{n.description}</span>
                  </span>
                  <MdChevronRight className="prf-action-chevron" aria-hidden />
                  <i aria-hidden />
                </Link>
              ))}
            </nav>

            <div className="prf-sep" aria-hidden />

            <div className="prf-contact" aria-label="Acciones de contacto">
              <div className="prf-contact-head">
                <span>Contacto</span>
                <strong>Elige el canal que prefieras</strong>
              </div>

              {contactGroups.map((group) => (
                <div
                  key={group.id}
                  className={`prf-contact-group prf-contact-group--${group.id}`}
                  role="group"
                  aria-label={group.label}
                >
                  {group.items.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`pf-glow-btn ${c.tone}`}
                      aria-label={c.label}
                    >
                      {c.icon}
                      <span>{c.label}</span>
                      <i aria-hidden />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="prf-figure" aria-hidden="true">
            <div className="prf-orb" />
            <Image
              src={imageProfileDark}
              alt="Ilustración de Leonardo trabajando en su laptop"
              className="prf-char prf-char--dark"
              width={560}
              height={560}
              priority
            />
            <Image
              src={imageProfileLight}
              alt="Ilustración de Leonardo trabajando en su laptop"
              className="prf-char prf-char--light"
              width={560}
              height={560}
            />
            <div className="prf-badge prf-badge--one" />
            <div className="prf-badge prf-badge--two" />
          </div>
        </div>
      </div>
    </section>
  );
}
