import ExperienceCards from '@/app/sections/ExperienceCards';
import ExperienceCircle from '@/app/sections/ExperienceCircle';

export default function PageExperiencia() {
  return (
    <section className="pf-panel">
      <header className="pf-head"><h2>Experiencia</h2></header>
      <section><ExperienceCircle /></section>
      <div style={{ height: 12 }} />
      <ExperienceCards />
    </section>
  );
}
