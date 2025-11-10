'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX, useMemo } from 'react';
import {
  FaUserCircle, FaRegListAlt, FaGithub, FaLinkedin, FaPhoneAlt,
} from 'react-icons/fa';
import {
  MdWorkOutline, MdFolderOpen, MdChatBubbleOutline, MdEmail, MdSchool,
} from 'react-icons/md';
import '@/app/styles/Sidebar.css';


type NavItem = { href: string; label: string; icon: JSX.Element };

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
  const socials = useMemo(() => ([
    { href: 'tel:+573236504428', label: 'Teléfono', icon: <FaPhoneAlt /> },
    { href: 'mailto:br.david@outlook.com', label: 'Email', icon: <MdEmail /> },
    { href: 'https://github.com/leobr95', label: 'GitHub', icon: <FaGithub /> },
    { href: 'https://www.linkedin.com/in/leonardoburbano', label: 'LinkedIn', icon: <FaLinkedin /> },
  ]), []);

  return (
    <aside className={`pf-aside ${open ? 'is-open' : ''}`} aria-label="Barra lateral">
      <div className="pf-brand">PORTAFOLIO</div>

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
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pf-aside-foot">
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
