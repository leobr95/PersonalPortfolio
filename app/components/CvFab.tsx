'use client';

import { useCallback, type JSX } from 'react';
import { FaDownload } from 'react-icons/fa';
import '@/app/styles/CvFab.css';

export type CvFabProps = {
  /** Cadena base64 del PDF. Acepta con o sin prefijo 'data:application/pdf;base64,' */
  dataBase64: string;
  /** Nombre del archivo a descargar */
  filename?: string;
  /** Texto del botón (visible en pantallas medianas/grandes) */
  label?: string;
};

/** Convierte base64 -> Blob (PDF) */
function base64ToBlob(base64: string, mime = 'application/pdf'): Blob {
  // Quita encabezado si viene como data URL
  const cleaned = base64.includes(',') ? base64.split(',')[1] : base64;

  // Decodifica en binario
  const byteString = typeof window !== 'undefined'
    ? window.atob(cleaned)
    : Buffer.from(cleaned, 'base64').toString('binary');

  const len = byteString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = byteString.charCodeAt(i);

  return new Blob([bytes], { type: mime });
}

export default function CvFab({
  dataBase64,
  filename = 'Leonardo_Burbano_CV.pdf',
  label = 'Descargar Curriculum',
}: CvFabProps): JSX.Element {
  const handleDownload = useCallback(() => {
    try {
      const blob = base64ToBlob(dataBase64, 'application/pdf');
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch {
      // Opcional: podrías mostrar un toast si tienes uno
      console.error('No se pudo descargar el PDF. Verifica la cadena base64.');
    }
  }, [dataBase64, filename]);

  return (
    <div className="cv-fab" role="region" aria-label="Acción rápida">
      <button
        type="button"
        className="cv-fab-btn"
        onClick={handleDownload}
        aria-label={label}
      >
        <FaDownload aria-hidden />
        <span className="cv-fab-label">{label}</span>
        <i aria-hidden />
      </button>
    </div>
  );
}
