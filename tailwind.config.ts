import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/routes/**/*.{js,ts,jsx,tsx,mdx}',
    './src/locales/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Custom note colors
        note: {
          default: 'rgb(255 255 255 / <alpha-value>)',
          red: 'rgb(255 221 221 / <alpha-value>)',
          orange: 'rgb(255 232 204 / <alpha-value>)',
          yellow: 'rgb(255 250 205 / <alpha-value>)',
          green: 'rgb(224 245 221 / <alpha-value>)',
          blue: 'rgb(212 232 247 / <alpha-value>)',
          purple: 'rgb(232 212 247 / <alpha-value>)',
          pink: 'rgb(255 212 229 / <alpha-value>)',
          brown: 'rgb(245 230 211 / <alpha-value>)',
          gray: 'rgb(232 232 234 / <alpha-value>)',
        },
        // App colors
        primary: '#ca41bc',
        secondary: '#fdeaf4',
        accent: {
          DEFAULT: '#007aff',
          hover: '#0051d5',
        },
        destructive: '#ff3b30',
        success: '#34c759',
        warning: '#ff9500',
        'text-title': '#61549e',
        // Extended palette
        pink: {
          1: '#bc2678',
          2: '#d42a87',
          3: '#eb2f96',
          4: '#ed43a0',
          5: '#ef59ab',
          6: '#f382c0',
          7: '#f7acd5',
          8: '#fbd5ea',
          9: '#fdeaf4',
          10: '#fef4fa',
          11: '#fef8fc',
        },
        violet: {
          1: '#7822c0',
          2: '#8726d8',
          3: '#962af0',
          4: '#a03ff1',
          5: '#ab55f3',
          6: '#c07ff6',
          7: '#d5aaf9',
          8: '#ead4fc',
          9: '#f4e9fd',
          10: '#faf4fe',
          11: '#fcf8fe',
        },
        indigo: {
          1: '#3e3ccc',
          2: '#4644e6',
          3: '#4e4bff',
          4: '#5f5dff',
          5: '#716fff',
          6: '#9593ff',
          7: '#b8b7ff',
          8: '#dcdbff',
          9: '#ededff',
          10: '#f6f6ff',
          11: '#f9f9ff',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.07)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        'soft-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-10px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        loading: {
          '100%': { transform: 'translateX(100%)' },
        },
        googleBounce: {
          '0%': { transform: 'translateY(0)', opacity: '0.6' },
          '100%': { transform: 'translateY(-8px)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out',
        fadeInDown: 'fadeInDown 0.6s ease-out',
        fadeInUp: 'fadeInUp 1.2s ease-out',
        slideIn: 'slideIn 200ms ease-out',
        slideInLeft: 'slideInLeft 200ms ease-out',
        spin: 'spin 1s linear infinite',
        loading: 'loading 1.5s infinite',
        googleBounce: 'googleBounce 0.8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;


