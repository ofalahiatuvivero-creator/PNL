import { BookOpen } from 'lucide-react';

/**
 * BookCard
 * -------------------------------------------------------------
 * Tarjeta de un libro con portada generada (degradado + título). Si el
 * libro trae el campo "portada" con la ruta de una imagen, se usa esa.
 *
 * Props:
 *   - book: { titulo, autor, color, pdf, portada? }
 *   - onRead(book): se llama al pulsar "Leer"
 */
const covers = {
  sage: 'from-sage-300 to-sage-500',
  terracotta: 'from-terracotta-300 to-terracotta-500',
  sand: 'from-sand-300 to-sand-500',
};

export default function BookCard({ book, onRead }) {
  return (
    <div className="flex flex-col">
      {/* Portada */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-card">
        {book.portada ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.portada} alt={book.titulo} className="h-full w-full object-cover" />
        ) : (
          <div className={`flex h-full w-full flex-col justify-between bg-gradient-to-br ${covers[book.color] || covers.sage} p-4 text-white`}>
            <BookOpen className="h-6 w-6 opacity-80" />
            <p className="font-serif text-lg font-bold leading-tight">{book.titulo}</p>
          </div>
        )}
      </div>

      {/* Datos + acción */}
      <div className="mt-2 px-0.5">
        <p className="truncate font-display text-sm font-semibold text-ink">{book.titulo}</p>
        <p className="truncate text-xs text-ink-soft">{book.autor}</p>
        <button
          onClick={() => onRead(book)}
          className="mt-2 w-full rounded-full bg-sage-500 py-2 text-xs font-display font-semibold text-white transition hover:bg-sage-600 active:scale-[0.98]"
        >
          Leer
        </button>
      </div>
    </div>
  );
}
