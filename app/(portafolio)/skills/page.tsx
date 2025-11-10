'use client';

import type { JSX } from 'react';

import SkillsTimeline from '@/app/sections/SkillsTimeLine';
import '@/app/styles/SkillsTimeline.css';

export default function SkillsPage(): JSX.Element {
  return (
    <main className="skl-page">
      <h1 className="skl-page-title">Habilidades</h1>
      <p className="skl-page-sub">Experiencia consolidada por tecnología (2015–2026)</p>
      <SkillsTimeline />
    </main>
  );
}
