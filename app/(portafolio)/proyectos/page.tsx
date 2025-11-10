export default function PageProyectos() {
  return (
    <section className="pf-panel">
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
  );
}
