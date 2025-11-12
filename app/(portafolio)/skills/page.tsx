'use client';

import type { JSX } from 'react';

import SkillsTimeline from '@/app/sections/SkillsTimeLine';
import '@/app/styles/SkillsTimeline.css';

export default function SkillsPage(): JSX.Element {
  return (
    <section className="ctc">
      <header className="ctc-head">
        <h1 className="ctc-title">Habilidades</h1>
        <p className="ctc-sub">Experiencia consolidada por tecnología (2015–2026)</p>
      </header>
      <SkillsTimeline />
    </section>
  );
}
