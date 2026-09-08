/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      /**
       * PALETA ORGÁNICA
       * Tonos naturales que transmiten calma, seguridad y calidez humana.
       * El administrador puede ajustar estos valores para cambiar la identidad
       * visual de toda la app desde un solo lugar.
       */
      colors: {
        // Verde salvia -> sanación, calma
        sage: {
          50: '#F3F6EF',
          100: '#E4EBDA',
          200: '#C9D8B6',
          300: '#AEC492',
          400: '#93AC72',
          500: '#7C9459', // principal
          600: '#637745',
          700: '#4C5C37',
        },
        // Arena / beige cálido -> seguridad, base
        sand: {
          50: '#FBF7F0',
          100: '#F5EEE1',
          200: '#EADFC9',
          300: '#DECBAB',
          400: '#CBB489',
          500: '#B89A68',
        },
        // Terracota / melocotón -> conexión humana, calidez
        terracotta: {
          50: '#FBEEE7',
          100: '#F4D3BE',
          200: '#E8B79D',
          300: '#DB9877',
          400: '#C97B5A', // principal
          500: '#AF6244',
          600: '#8E4E36',
        },
        // Fondo crema base de toda la app
        cream: '#FBF7F0',
        // Texto: marrón cálido en lugar de negro puro
        ink: {
          DEFAULT: '#463F38',
          soft: '#6B6158',
          light: '#948B80',
        },
      },
      fontFamily: {
        // Cuerpo: redondeada y muy legible
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        // Interfaz / botones / etiquetas
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        // Títulos con alma (serif suave)
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(70, 63, 56, 0.18)',
        card: '0 4px 20px -8px rgba(124, 148, 89, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
