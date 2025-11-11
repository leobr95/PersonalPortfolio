'use client';

import Image from 'next/image';
import Link from 'next/link';
import { JSX, useMemo } from 'react';
import {
  FaGithub, FaLinkedin, FaPhoneAlt, FaWhatsapp, FaRegListAlt,
} from 'react-icons/fa';
import { MdEmail, MdWorkOutline, MdFolderOpen, MdSchool } from 'react-icons/md';

import imageProfile from '@/app/logos/profile-photo.png';
import '@/app/styles/Profile.css';

export default function PerfilPage(): JSX.Element {
  const nav = useMemo(
    () => [
      { href: '/experiencia', label: 'Experiencia',  icon: <MdWorkOutline aria-hidden /> },
      { href: '/proyectos',   label: 'Proyectos',    icon: <MdFolderOpen aria-hidden /> },
      { href: '/skills',      label: 'Habilidades',  icon: <FaRegListAlt aria-hidden /> },
      { href: '/educacion',   label: 'Educación',    icon: <MdSchool aria-hidden /> },
      { href: '/contacto',    label: 'Contacto',     icon: <MdEmail aria-hidden /> },
    ],
    []
  );

  const contacts = useMemo(
    () => [
      { href: 'tel:+573236504428', label: 'Llamar', icon: <FaPhoneAlt aria-hidden />, tone: 'green' },
      { href: 'mailto:br.david@outlook.com', label: 'Email', icon: <MdEmail aria-hidden />, tone: 'blue' },
      { href: 'https://wa.me/573236504428', label: 'WhatsApp (personal)', icon: <FaWhatsapp aria-hidden />, tone: 'green' },
      { href: 'https://wa.me/message/TU_ID_EMPRESA', label: 'WhatsApp (empresa)', icon: <FaWhatsapp aria-hidden />, tone: 'pink' },
      { href: 'https://github.com/leobr95', label: 'GitHub', icon: <FaGithub aria-hidden />, tone: 'blue' },
      { href: 'https://www.linkedin.com/in/leonardoburbano', label: 'LinkedIn', icon: <FaLinkedin aria-hidden />, tone: 'pink' },
    ],
    []
  );

  return (
    <section className="prf" aria-label="Perfil">
      <div className="prf-card">
        {/* === HERO dos columnas === */}
        <div className="prf-hero">
          {/* Columna izquierda: copy */}
          <div className="prf-copy">
            <p className="prf-eyebrow">PORTAFOLIO</p>
            <h1 className="prf-title">
              <span className="ghost">Hola, soy</span>
              <span className="name">Leonardo David Burbano</span>
            </h1>
            <p className="prf-sub">
              Desarrollador <strong>Full-Stack .NET</strong> con foco en
              <strong> APIs REST</strong>, <strong>React/Next.js</strong>,
              <strong> SQL Server</strong> y <strong>Docker</strong>. Experiencia en
              <strong> Azure</strong> y pipelines <strong>CI/CD</strong> (Clean Architecture).
            </p>

            <nav className="prf-actions" aria-label="Secciones principales">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="glow-btn blue" aria-label={n.label}>
                  {n.icon}
                  <span>{n.label}</span>
                  <i aria-hidden />
                </Link>
              ))}
            </nav>

            <div className="prf-sep" aria-hidden />

            <div className="prf-contact" aria-label="Acciones de contacto">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`glow-btn ${c.tone}`}
                  aria-label={c.label}
                >
                  {c.icon}
                  <span>{c.label}</span>
                  <i aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Columna derecha: personaje */}
          <div className="prf-figure" aria-hidden="true">
            <div className="prf-orb" />
            <Image
              src={imageProfile}
              alt="Ilustración de Leonardo trabajando en su laptop"
              className="prf-char"
              width={560}
              height={560}
              priority
            />
            <div className="prf-badge prf-badge--one" />
            <div className="prf-badge prf-badge--two" />
          </div>
        </div>
      </div>
    </section>
  );
}
