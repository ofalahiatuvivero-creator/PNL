'use client';

import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BookCard from '@/components/BookCard';
import PdfViewer from '@/components/PdfViewer';
import { books as initialBooks } from '@/data/books';

/**
 * BIBLIOTECA
 * -------------------------------------------------------------
 * - Cuadrícula de libros (portada, título, botón "Leer").
 * - Visor de PDF integrado (overlay a pantalla completa).
 * - Área para subir PDF desde el dispositivo.
 *
 * >>> NOTA PARA EL ADMINISTRADOR <<<
 * Los libros permanentes se definen en /data/books.js (con sus PDF en
 * /public/libros/). La subida desde esta pantalla permite VER un PDF al
 * instante durante la sesión actual; para guardarlos de forma permanente
 * se necesita conectar un almacenamiento/servidor (backend).
 */
export default function BibliotecaPage() {
  const [books, setBooks] = useState(initialBooks);
  const [current, setCurrent] = useState(null); // libro abierto en el visor
  const fileRef = useRef(null);

  // Añade un PDF subido por el usuario (visible durante la sesión).
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const nuevo = {
      id: `subido-${Date.now()}`,
      titulo: file.name.replace(/\.pdf$/i, ''),
      autor: 'Subido por ti',
      color: 'terracotta',
      pdf: url,
    };
    setBooks((prev) => [nuevo, ...prev]);
    e.target.value = ''; // permite volver a subir el mismo archivo
  };

  return (
    <main>
      <PageHeader
        title="Biblioteca"
        subtitle="Lecturas para acompañar tu camino de crecimiento."
        back={false}
      />

      <div className="px-5 pb-6">
        {/* Área de carga de PDF */}
        <button
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-3xl border-2 border-dashed border-sage-200 bg-sage-50/60 px-4 py-6 text-center transition hover:bg-sage-50"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-600">
            <UploadCloud className="h-6 w-6" />
          </span>
          <span className="font-display text-sm font-semibold text-sage-600">
            Subir un PDF
          </span>
          <span className="text-xs text-ink-light">
            Toca para elegir un archivo de tu dispositivo
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          onChange={onFile}
          className="hidden"
        />

        {/* Cuadrícula de libros */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onRead={setCurrent} />
          ))}
        </div>
      </div>

      {/* Visor de PDF */}
      <PdfViewer book={current} onClose={() => setCurrent(null)} />
    </main>
  );
}
