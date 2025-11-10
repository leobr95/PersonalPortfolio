import Avatar from '@/app/components/Avatar';

export default function PagePerfil() {
  return (
    <section className="pf-panel">
      <header className="pf-head"><h2>Perfil</h2></header>

      <div className="pf-profile">
        <Avatar src="/avatar.jpg" alt="Foto de Leonardo Burbano" initials="LB" />

        <div className="pf-info">
          <h1 className="pf-name">Leonardo David Burbano Apraez</h1>
          <p className="pf-role">Full-Stack .NET · React/Next · SQL · Docker — 6+ años</p>
          <ul className="pf-meta" role="list">
            <li><strong>Ubicación:</strong> Cali, Colombia</li>
            <li><strong>E-mail:</strong> <a href="mailto:br.david@outlook.com">br.david@outlook.com</a></li>
            <li><strong>Teléfono:</strong> <a href="tel:+573236504428">+57 323 650 4428</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
