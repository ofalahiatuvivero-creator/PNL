import {
  Sparkles,
  Waves,
  Sun,
  Shield,
  Heart,
  Sliders,
  Anchor,
  Square,
  Target,
  LayoutGrid,
  Wind,
  BookHeart,
  Library,
  HeartHandshake,
} from 'lucide-react';

/**
 * Icon
 * -------------------------------------------------------------
 * Renderiza un icono de lucide-react a partir de su nombre en texto,
 * usando un registro explícito. Esto mantiene el paquete final ligero
 * (solo se incluyen los iconos usados) y permite que los archivos de
 * datos definan iconos como cadenas, p. ej. icon: 'Heart'.
 *
 * >>> PARA EL ADMINISTRADOR <<<
 * Si quieres usar un icono nuevo en los datos, impórtalo arriba y añádelo
 * al objeto "registry". Catálogo completo: https://lucide.dev/icons
 *
 * Uso: <Icon name="Heart" className="w-6 h-6 text-sage-500" />
 */
const registry = {
  Sparkles,
  Waves,
  Sun,
  Shield,
  Heart,
  Sliders,
  Anchor,
  Square,
  Target,
  LayoutGrid,
  Wind,
  BookHeart,
  Library,
  HeartHandshake,
};

export default function Icon({ name, ...props }) {
  const LucideIcon = registry[name] || Sparkles;
  return <LucideIcon {...props} />;
}
