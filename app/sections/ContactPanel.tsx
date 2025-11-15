'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdContentCopy, MdCheckCircle } from 'react-icons/md';
import '@/app/styles/ContactPanel.css';

const WHATSAPP_PERSONAL = '573176820188'; 
const LLAMADAS = '573236504428';    // <- cámbialo si deseas
const WHATSAPP_EMPRESA  = '573236504428';     // <- o pon el de tu WhatsApp Business
const MAIL_TO            = 'br.david@outlook.com';

export default function ContactPanel() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`+57 ${WHATSAPP_PERSONAL.replace(/^57/,'')}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* ignore */ }
  };

  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name:  String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      msg:   String(fd.get('message') || ''),
    };

    // Si no configuras el API, hacemos fallback a mailto:
    if (!process.env.NEXT_PUBLIC_CONTACT_API) {
      window.location.href = `mailto:${MAIL_TO}?subject=Contacto%20desde%20Portafolio&body=${encodeURIComponent(
        `Nombre: ${payload.name}\nEmail: ${payload.email}\n\n${payload.msg}`
      )}`;
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch(process.env.NEXT_PUBLIC_CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('fail');
      setStatus('ok');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  const wspText = encodeURIComponent('Hola Leonardo, vengo de tu portafolio. Me gustaría conversar.');
  const wspPersonalHref = `https://wa.me/${WHATSAPP_PERSONAL}?text=${wspText}`;
  const wspEmpresaHref  = `https://wa.me/${WHATSAPP_EMPRESA}?text=${wspText}`;

  return (
    <section className="ctc">
      <header className="ctc-head">
        <h1 className="ctc-title">Contacto</h1>
        <p className="ctc-sub">Hablemos sobre tu proyecto — respuesta rápida por WhatsApp o correo.</p>
      </header>

      <div className="ctc-grid">
        {/* ---- Tarjeta de contacto (llamadas / WhatsApp) ---- */}
        <aside className="ctc-card tone-blue">
          <div className="ctc-card-head">
            <div className="ctc-avatar">LB</div>
            <div className="ctc-card-meta">
              <h3>Leonardo D. Burbano</h3>
              <p>Full-Stack .NET · React/Next · SQL · Docker</p>
            </div>
          </div>

          <ul className="ctc-lines" role="list">
            <li>
              <MdPhone aria-hidden />
              <span><strong>Llamadas:</strong> +57 {LLAMADAS.replace(/^57/,'')}</span>
              <button className="link-ghost" onClick={handleCopy} aria-label="Copiar número">
                {copied ? <><MdCheckCircle/> Copiado</> : <><MdContentCopy/> Copiar</>}
              </button>
            </li>
            <li>
              <MdEmail aria-hidden />
              <a href={`mailto:${MAIL_TO}`} className="link">{MAIL_TO}</a>
            </li>
          </ul>

          <div className="ctc-actions">
            <a className="glow-btn green"  href={wspPersonalHref} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden /> <span className='texto-btn'>WhatsApp Personal</span>
            </a>
            <a className="glow-btn green"  href={wspEmpresaHref}  target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden /> <span className='texto-btn'>WhatsApp Empresa</span>
            </a>
          </div>
        </aside>

        {/* ---- Formulario de contacto (envía email) ---- */}
        <div className="ctc-form tone-green">
          <h3 className="ctc-form-title"><MdEmail aria-hidden /> Envíame un correo</h3>
          <form onSubmit={onSubmit}>
            <div className="row">
              <label className="in">
                <span>Nombre</span>
                <input name="name" type="text" placeholder="Tu nombre" required />
              </label>
              <label className="in">
                <span>Email</span>
                <input name="email" type="email" placeholder="tu@correo.com" required />
              </label>
            </div>
            <label className="in">
              <span>Mensaje</span>
              <textarea name="message" rows={5} placeholder="Cuéntame brevemente sobre el proyecto" required />
            </label>

            <div className="form-actions">
              <button
                className="glow-btn blue"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Enviando…' : <span className='texto-btn'>Enviar mensaje</span>}
              </button>

              {/* fallback Mailto visible si no hay API configurada */}
              {!process.env.NEXT_PUBLIC_CONTACT_API && (
                <a className="link-ghost" href={`mailto:${MAIL_TO}?subject=Contacto%20desde%20Portafolio`}>
                  Usar correo por defecto
                </a>
              )}
            </div>

            {status === 'ok' && <p className="form-ok">¡Gracias! Te responderé muy pronto.</p>}
            {status === 'error' && <p className="form-err">Ocurrió un error. Intenta de nuevo o usa el botón de correo.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
