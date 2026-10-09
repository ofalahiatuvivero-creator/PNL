'use client';

/**
 * Template global
 * -------------------------------------------------------------
 * A diferencia del layout, el template se vuelve a montar en cada
 * navegación, así que sirve para una transición suave de entrada entre
 * páginas. El movimiento se desactiva solo si el sistema pide movimiento
 * reducido (regla global en globals.css).
 */
export default function Template({ children }) {
  return <div className="transicion-pagina">{children}</div>;
}
