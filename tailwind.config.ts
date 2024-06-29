import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        tangak: ['var(--font-tangak)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        green: '#3e9392',
        heading: '#E2E8F0',
        danger: '#ff3333',
        'light-green': '#4ade8014',
        'bright-green': '#4ADE80',
        'gray-100': '#94A3B8',
        'gray-200': '#334155',
        'gray-300': '#191e20',
        'gray-400': '#CBD5E1',
        'gray-500': '#96A1AC4A',
        'blue-100': '#09375259',
        'blue-200': '#093752A6',
        'blue-300': '#09375226',
        black: '#09090B',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        blue: '0px 0px 0px 2px #4F607D',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addBase, theme }: PluginAPI) {
      addBase({
        h1: { color: theme('colors.heading') },
        h2: { color: theme('colors.heading') },
        h3: { color: theme('colors.heading') },
        h4: { color: theme('colors.heading') },
        h5: { color: theme('colors.heading') },
        h6: { color: theme('colors.heading') },
      });
    },
  ],
} satisfies Config;

export default config;
