'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type JSX } from 'react';
import { FaCompressAlt, FaDownload, FaFileAlt, FaSearchMinus, FaSearchPlus } from 'react-icons/fa';
import '@/app/styles/CvFab.css';

export type CvFabProps = {
  /** Cadena base64 del PDF. Acepta con o sin prefijo 'data:application/pdf;base64,' */
  dataBase64: string;
  /** Nombre del archivo a descargar */
  filename?: string;
  /** Texto del botón flotante */
  label?: string;
  /** Título del modal */
  modalTitle?: string;
  /** Texto botón descargar dentro del modal */
  downloadLabel?: string;
  /** Texto botón cerrar dentro del modal */
  closeLabel?: string;
};

/** Convierte base64 -> Blob (PDF) */
function base64ToBlob(base64: string, mime = 'application/pdf'): Blob {
  const cleaned = base64.includes(',') ? base64.split(',')[1] : base64;

  const byteString =
    typeof window !== 'undefined'
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
  label = 'Ver curriculum',
  modalTitle = 'Currículum',
  downloadLabel = 'Descargar CV',
  closeLabel = 'Cerrar',
}: CvFabProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const hasBase64 = useMemo(() => typeof dataBase64 === 'string' && dataBase64.length > 20, [dataBase64]);

  // Genera URL blob solo cuando el modal esté abierto (y la revoca al cerrar)
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const pdfPreviewUrl = useMemo(
    () => blobUrl ? `${blobUrl}#page=1&zoom=page-fit&view=Fit&toolbar=0&navpanes=0&scrollbar=0` : null,
    [blobUrl]
  );

  useEffect(() => {
    if (!isOpen) return;

    if (!hasBase64) {
      setBlobUrl(null);
      return;
    }

    try {
      const blob = base64ToBlob(dataBase64, 'application/pdf');
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setBlobUrl(null);
      };
    } catch {
      setBlobUrl(null);
    }
  }, [isOpen, dataBase64, hasBase64]);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const zoomIn = useCallback(() => {
    setPreviewScale((scale) => Math.min(2.5, Number((scale + 0.25).toFixed(2))));
  }, []);

  const zoomOut = useCallback(() => {
    setPreviewScale((scale) => Math.max(1, Number((scale - 0.25).toFixed(2))));
  }, []);

  const resetZoom = useCallback(() => setPreviewScale(1), []);

  const previewStageStyle = useMemo(
    () => ({
      '--cv-preview-scale': previewScale,
      width: `${previewScale * 100}%`,
      height: `${previewScale * 100}%`,
    }) as CSSProperties,
    [previewScale]
  );

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
      console.error('No se pudo descargar el PDF. Verifica la cadena base64.');
    }
  }, [dataBase64, filename]);

  // UX: ESC para cerrar + bloquear scroll + foco al botón cerrar
  useEffect(() => {
    if (!isOpen) return;
    setPreviewScale(1);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus en botón cerrar
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeModal]);

  return (
    <>
      {/* FAB */}
      <div className="cv-fab" role="region" aria-label="Acción rápida">
        <button
          type="button"
          className="cv-fab-btn"
          onClick={openModal}
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <FaFileAlt aria-hidden className="cv-fab-icon" />
          <span className="cv-fab-label">{label}</span>
          <i aria-hidden />
        </button>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="cv-modalOverlay" role="presentation" onClick={closeModal}>
          <div
            className="cv-modal"
            role="dialog"
            aria-modal="true"
            aria-label={modalTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cv-modalHeader">
              <h3 className="cv-modalTitle">{modalTitle}</h3>

              <div className="cv-modalActions">
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="cv-btn cv-btnGhost"
                  onClick={closeModal}
                >
                  {closeLabel}
                </button>

                <button
                  type="button"
                  className="cv-btn cv-btnPrimary"
                  onClick={handleDownload}
                >
                  <FaDownload aria-hidden />
                  <span style={{ marginLeft: 8 }}>{downloadLabel}</span>
                </button>
              </div>
            </div>

            <div className="cv-modalBody">
              {pdfPreviewUrl ? (
                <div className="cv-viewer">
                  <iframe
                    className="cv-pdf cv-pdfDesktop"
                    src={pdfPreviewUrl}
                    title="Vista previa del CV"
                  />

                  <div className="cv-mobilePreview" aria-label="Vista previa del CV">
                    <div className="cv-previewViewport">
                      <div className="cv-previewStage" style={previewStageStyle}>
                        <Image
                          className="cv-previewImg"
                          src="/cv/cv-preview.png"
                          alt="Vista previa del currículum"
                          width={1164}
                          height={1800}
                          sizes="100vw"
                          draggable={false}
                        />
                      </div>
                    </div>

                    <div className="cv-zoomControls" aria-label="Controles de zoom">
                      <button
                        type="button"
                        className="cv-zoomBtn"
                        onClick={zoomOut}
                        disabled={previewScale <= 1}
                        aria-label="Reducir zoom"
                      >
                        <FaSearchMinus aria-hidden />
                      </button>
                      <span className="cv-zoomValue" aria-live="polite">
                        {Math.round(previewScale * 100)}%
                      </span>
                      <button
                        type="button"
                        className="cv-zoomBtn"
                        onClick={zoomIn}
                        disabled={previewScale >= 2.5}
                        aria-label="Aumentar zoom"
                      >
                        <FaSearchPlus aria-hidden />
                      </button>
                      <button
                        type="button"
                        className="cv-zoomBtn"
                        onClick={resetZoom}
                        disabled={previewScale === 1}
                        aria-label="Ajustar página completa"
                      >
                        <FaCompressAlt aria-hidden />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cv-fallback">
                  <p style={{ margin: 0 }}>
                    No se pudo cargar la vista previa del PDF. Aún puedes descargarlo.
                  </p>
                  <div style={{ marginTop: 12 }}>
                    <button type="button" className="cv-btn cv-btnPrimary" onClick={handleDownload}>
                      <FaDownload aria-hidden />
                      <span style={{ marginLeft: 8 }}>{downloadLabel}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
