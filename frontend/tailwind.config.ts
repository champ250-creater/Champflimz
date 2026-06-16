import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00F0FF',
          dark: '#00B8D4',
          glow: 'rgba(0, 240, 255, 0.4)',
        },
        secondary: {
          DEFAULT: '#8A2BE2',
          glow: 'rgba(138, 43, 226, 0.4)',
        },
        accent: '#FF007A',
        background: {
          DEFAULT: '#050505',
          light: '#F8FAFC',
        },
        surface: {
          DEFAULT: '#0F0F0F',
          light: '#FFFFFF',
        },
        text: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
          muted: '#94A3B8',
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 240, 255, 0.3)',
        'glow-secondary': '0 0 20px rgba(138, 43, 226, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom, transparent, #050505)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
