'use client';

import { JSX, useEffect, useMemo, useState, useCallback } from 'react';
import {
  FaUserCircle, FaRegListAlt, FaGithub, FaLinkedin, FaBars, FaTimes, FaPhoneAlt,
} from 'react-icons/fa';
// eslint-disable-next-line import/order
import {
  MdWorkOutline, MdFolderOpen, MdVerified, MdSchedule, MdChatBubbleOutline, MdEmail, MdSchool,
} from 'react-icons/md';

import '@/app/styles/PortfolioPage.css';
// eslint-disable-next-line import/order
import Image from 'next/image';

import ExperienceCards from './ExperienceCards';

import ExperienceCircle from '@/app/sections/ExperienceCircle';


type NavItem = { id: string; label: string; icon: JSX.Element };

const NAV: NavItem[] = [
  { id: 'perfil',      label: 'Perfil',       icon: <FaUserCircle aria-hidden /> },
  { id: 'experiencia', label: 'Experiencia',  icon: <MdWorkOutline aria-hidden /> },
  { id: 'proyectos',   label: 'Proyectos',    icon: <MdFolderOpen aria-hidden /> },
  { id: 'skills',      label: 'Habilidades',  icon: <FaRegListAlt aria-hidden /> },
  { id: 'logros',      label: 'Logros',       icon: <MdVerified aria-hidden /> },
  { id: 'agenda',      label: 'Agenda',       icon: <MdSchedule aria-hidden /> },
  { id: 'educacion',   label: 'Educación',    icon: <MdSchool aria-hidden /> },
  { id: 'contacto',    label: 'Contacto',     icon: <MdChatBubbleOutline aria-hidden /> },
];

export default function PortfolioPage(): JSX.Element {
  const [active, setActive] = useState<string>('perfil');
  const [navOpen, setNavOpen] = useState<boolean>(false);

  // Observa sección visible para resaltar en el nav
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Cerrar drawer con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setNavOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = useCallback((id: string) => (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setNavOpen(false);
  }, []);

  const socials = useMemo(
    () => [
      { href: 'tel:+573236504428', label: 'Teléfono', icon: <FaPhoneAlt aria-hidden /> },
      { href: 'mailto:br.david@outlook.com', label: 'Email', icon: <MdEmail aria-hidden /> },
      { href: 'https://github.com/leobr95', label: 'GitHub', icon: <FaGithub aria-hidden /> },
      { href: 'https://www.linkedin.com/in/leonardoburbano', label: 'LinkedIn', icon: <FaLinkedin aria-hidden /> },
    ],
    []
  );

  return (
    <>
      {/* Botón hamburguesa (visible en móvil) */}
      <button
        type="button"
        className="pf-hamburger"
        aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={navOpen}
        onClick={() => setNavOpen((v) => !v)}
      >
        {navOpen ? <FaTimes aria-hidden /> : <FaBars aria-hidden />}
      </button>

      {/* Overlay móvil */}
      <div
        className={`pf-overlay ${navOpen ? 'is-on' : ''}`}
        onClick={() => setNavOpen(false)}
        aria-hidden={!navOpen}
      />

      <section className="pf">
        {/* Sidebar fijo a la izquierda */}
        <aside className={`pf-aside ${navOpen ? 'is-open' : ''}`} aria-label="Barra de navegación lateral">
          <div className="pf-brand">PORTAFOLIO</div>

          <nav className="pf-nav" aria-label="Navegación principal">
            <ul className="pf-menu" role="list">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={handleNavClick(n.id)}
                    className={`pf-nav-item ${active === n.id ? 'is-active' : ''}`}
                    aria-current={active === n.id ? 'page' : undefined}
                  >
                    <span className="pf-nav-ico">{n.icon}</span>
                    <span className="pf-nav-label">{n.label}</span>
                    <span className="pf-bridge" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pf-aside-foot">
            <div className="pf-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="pf-ico"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main (margen-izq para dejar espacio a la barra fija) */}
        <div className="pf-main">
          {/* PERFIL */}
          <section id="perfil" className="pf-panel">
            <header className="pf-head"><h2>Perfil</h2></header>

            <div className="pf-profile">
              <div className="pf-avatar">
                <Image
                  src="/avatar.jpg"
                  alt="Foto de Leonardo Burbano"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="pf-initials" aria-hidden>LB</div>
              </div>

              <div className="pf-info">
                <h1 className="pf-name">Leonardo David Burbano Apraez</h1>
                <p className="pf-role">Full-Stack .NET · React/Next · SQL · Docker — 6+ años</p>
                <ul className="pf-meta" role="list">
                  <li><strong>Ubicación:</strong> Cali, Colombia</li>
                  <li><strong>E-mail:</strong> <a href="mailto:br.david@outlook.com">br.david@outlook.com</a></li>
                  <li><strong>Teléfono:</strong> <a href="tel:+573236504428">+57 323 650 4428</a></li>
                </ul>

                {/* Barra de iconos de contacto bajo el teléfono */}
                <div className="pf-contactbar" role="toolbar" aria-label="Enlaces de contacto">
                  {socials.map((s) => (
                    <a
                      key={`bar-${s.label}`}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={s.label}
                      className="pf-ico pf-ico--bar"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCIA */}
          <section id="experiencia" className="pf-panel">
            <header className="pf-head"><h2>Experiencia</h2></header>
            <section><ExperienceCircle /></section><br />
          <ExperienceCards />
          </section>




          {/* PROYECTOS */}
          <section id="proyectos" className="pf-panel">
            <header className="pf-head"><h2>Proyectos</h2></header>
            <div className="cards-grid">
              <article className="card">
                <h3>Cervecería Siete Estrellas</h3>
                <p>Landing + simulador cervecero y mascota 8-bits. Next.js + TS + CSS.</p>
                <a href="https://cerveceria-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn">Ver demo</a>
              </article>
              <article className="card">
                <h3>Logística Bebidas</h3>
                <p>Gestión de distribución (pedidos, inventario, reportes). .NET 8 + SQL + React.</p>
              </article>
              <article className="card">
                <h3>Job Fit Assistant</h3>
                <p>Extensión para analizar vacantes y ajustar CV. TypeScript + análisis de texto.</p>
              </article>
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="pf-panel">
            <header className="pf-head"><h2>Habilidades</h2></header>
            <ul className="tags" role="list">
              <li>.NET 6/7/8</li><li>ASP.NET Core</li><li>EF Core</li><li>React / Next.js</li>
              <li>TypeScript</li><li>Angular</li><li>SQL Server</li><li>SSRS</li>
              <li>Docker</li><li>CI/CD · Azure DevOps</li><li>Azure App Services</li>
            </ul>
          </section>


          {/* EDUCACIÓN */}
          <section id="educacion" className="pf-panel">
            <header className="pf-head"><h2>Educación</h2></header>
            <ul className="pf-edu" role="list">
              <li><strong>Ingeniería Informática</strong> — Corporación Universitaria Autónoma de Nariño (2018–2020)</li>
              <li><strong>Tecnólogo ADSI</strong> — SENA (2014–2016)</li>
              <li><strong>Técnico en Sistemas</strong> — SENA (2009–2013)</li>
              <li>Inglés: B1</li>
            </ul>
          </section>

          {/* CONTACTO */}
          <section id="contacto" className="pf-panel">
            <header className="pf-head"><h2>Contacto</h2></header>
            <form className="contact">
              <input className="in" type="text" placeholder="Tu nombre" required />
              <input className="in" type="email" placeholder="Tu correo" required />
              <textarea className="in" placeholder="Tu mensaje" rows={4} required />
              <button className="btn" type="submit">Enviar</button>
            </form>
          </section>
        </div>
      </section>
    </>
  );
}
