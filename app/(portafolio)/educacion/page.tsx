import EducationCards from '@/app/sections/EducationCards';

export default function EducationPage() {
  return (
    <section className="ctc">
      <header className="ctc-head">
        <h1 className="ctc-title">Educación</h1>
        <p className="ctc-sub">Te cuento sobre mi formación académica y cursos realizados.</p>
      </header>
      <EducationCards />
    </section>
  );
}
