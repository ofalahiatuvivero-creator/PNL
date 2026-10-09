/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      /**
       * SISTEMA "AURORA DE BOSQUE"
       * Los colores apuntan a variables CSS que cambian según la atmósfera
       * (amanecer / día / atardecer / noche). Se definen en globals.css.
       * Así toda la app cambia de atmósfera desde un solo lugar.
       */
      colors: {
        sage: {
          50: 'var(--sage-50)',
          100: 'var(--sage-100)',
          200: 'var(--sage-200)',
          300: 'var(--sage-300)',
          400: 'var(--sage-400)',
          500: 'var(--sage-500)',
          600: 'var(--sage-600)',
          700: 'var(--sage-700)',
        },
        sand: {
          50: 'var(--sand-50)',
          100: 'var(--sand-100)',
          200: 'var(--sand-200)',
          300: 'var(--sand-300)',
          400: 'var(--sand-400)',
          500: 'var(--sand-500)',
        },
        terracotta: {
          50: 'var(--terracotta-50)',
          100: 'var(--terracotta-100)',
          200: 'var(--terracotta-200)',
          300: 'var(--terracotta-300)',
          400: 'var(--terracotta-400)',
          500: 'var(--terracotta-500)',
          600: 'var(--terracotta-600)',
        },
        cream: 'var(--ground)',
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          light: 'var(--ink-light)',
        },
        // Nuevos tokens semánticos del rediseño
        glass: 'var(--glass-bg)',
        'glass-border': 'var(--glass-border)',
      },
      fontFamily: {
        // Interfaz y texto: Manrope
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        // Títulos, afirmaciones, frases: Fraunces (serif editorial)
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '1.75rem', // 28px
      },
      boxShadow: {
        soft: '0 14px 48px -20px var(--shadow-aura)',
        card: '0 10px 36px -18px var(--shadow-aura)',
        aura: '0 26px 80px -30px var(--shadow-aura)',
        glow: '0 0 40px -6px var(--glow)',
      },
      backdropBlur: {
        glass: '22px',
      },
      transitionTimingFunction: {
        agua: 'cubic-bezier(0.22, 1, 0.36, 1)',
        respiracion: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};
