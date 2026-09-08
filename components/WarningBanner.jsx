import { AlertTriangle } from 'lucide-react';

/**
 * WarningBanner
 * -------------------------------------------------------------
 * Aviso importante en tono cálido (naranja/terracota suave) para las
 * contraindicaciones de la meditación. No usa rojo agresivo para
 * mantener la sensación de cuidado, pero llama claramente la atención.
 *
 * Props:
 *   - titulo (opcional)
 *   - children / texto: contenido del aviso
 */
export default function WarningBanner({ titulo = 'Importante', texto, children }) {
  return (
    <div className="flex gap-3 rounded-3xl border border-terracotta-200 bg-terracotta-50 p-4">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-500">
        <AlertTriangle className="h-5 w-5" />
      </span>
      <div>
        <p className="font-display text-sm font-bold text-terracotta-600">{titulo}</p>
        <p className="mt-1 text-sm leading-relaxed text-terracotta-600/90">
          {texto || children}
        </p>
      </div>
    </div>
  );
}
