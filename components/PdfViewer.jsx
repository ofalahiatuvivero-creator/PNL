'use client';

import { X, Download } from 'lucide-react';

/**
 * PdfViewer
 * -------------------------------------------------------------
 * Visor de PDF a pantalla completa (overlay). Usa un <iframe> con el
 * visor nativo del navegador. Incluye botón para descargar/abrir.
 *
 * Props:
 *   - book: libro a mostrar ({ titulo, pdf }) o null para ocultar
 *   - onClose(): cierra el visor
 */
export default function PdfViewer({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-md flex-col bg-cream">
      {/* Barra superior */}
      <div className="flex items-center justify-between border-b border-sand-200 px-4 py-3">
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-sand-100"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="truncate px-2 font-display text-sm font-semibold text-ink">
          {book.titulo}
        </p>
        <a
          href={book.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-sand-100"
          aria-label="Abrir o descargar"
        >
          <Download className="h-5 w-5" />
        </a>
      </div>

      {/* Documento */}
      <div className="flex-1 overflow-hidden bg-ink-light/10">
        <iframe
          src={book.pdf}
          title={book.titulo}
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
