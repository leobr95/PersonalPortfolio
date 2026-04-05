'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX, useEffect, useMemo, useState } from 'react';
import {
  FaUserCircle, FaRegListAlt, FaGithub, FaLinkedin, FaPhoneAlt,
} from 'react-icons/fa';
import {
  MdWorkOutline, MdFolderOpen, MdChatBubbleOutline, MdEmail, MdSchool, MdLightMode, MdDarkMode,
} from 'react-icons/md';

import '@/app/styles/Sidebar.css';

type NavItem = { href: string; label: string; icon: JSX.Element };
type ThemeMode = 'dark' | 'light';

const NAV: NavItem[] = [
  { href: '/perfil',      label: 'Perfil',       icon: <FaUserCircle /> },
  { href: '/experiencia', label: 'Experiencia',  icon: <MdWorkOutline /> },
  { href: '/proyectos',   label: 'Proyectos',    icon: <MdFolderOpen /> },
  { href: '/skills',      label: 'Habilidades',  icon: <FaRegListAlt /> },
  { href: '/educacion',   label: 'Educación',    icon: <MdSchool /> },
  { href: '/contacto',    label: 'Contacto',     icon: <MdChatBubbleOutline /> },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void; }) {
  const pathname = usePathname() || '/perfil';
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = window.localStorage.getItem('pf-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      setThemeReady(true);
      return;
    }

    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady || typeof window === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('pf-theme', theme);
  }, [theme, themeReady]);

  const socials = useMemo(() => ([
    { href: 'tel:+573236504428', label: 'Teléfono', icon: <FaPhoneAlt /> },
    { href: 'mailto:br.david@outlook.com', label: 'Email', icon: <MdEmail /> },
    { href: 'https://github.com/leobr95', label: 'GitHub', icon: <FaGithub /> },
    { href: 'https://www.linkedin.com/in/leonardoburbano', label: 'LinkedIn', icon: <FaLinkedin /> },
  ]), []);

  return (
    <aside className={`pf-aside ${open ? 'is-open' : ''}`} aria-label="Barra lateral">
      <div className="pf-brand ">PORTAFOLIO</div>

      <nav className="pf-nav" aria-label="Navegación principal">
        <ul className="pf-menu" role="list">
          {NAV.map(n => {
            const active = pathname === n.href;
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`pf-nav-item ${active ? 'is-active' : ''}`}
                  onClick={onClose}
                >
                  <span className="pf-nav-ico">{n.icon}</span>
                  <span className="pf-nav-label">{n.label}</span>
                  <span className="pf-bridge" aria-hidden />
                </Link>
                <span className="pf-nav-tip" aria-hidden>{n.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pf-aside-foot">
        <div className="pf-theme-switch" role="group" aria-label="Tema de color">
          <button
            type="button"
            className={`pf-theme-btn ${theme === 'dark' ? 'is-active' : ''}`}
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
            title="Tema oscuro"
          >
            <MdDarkMode aria-hidden />
            <span className="pf-theme-label">Oscuro</span>
          </button>
          <button
            type="button"
            className={`pf-theme-btn ${theme === 'light' ? 'is-active' : ''}`}
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
            title="Tema claro"
          >
            <MdLightMode aria-hidden />
            <span className="pf-theme-label">Claro</span>
          </button>
        </div>
        <div className="pf-socials">
          {socials.map(s => (
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
  );
}
