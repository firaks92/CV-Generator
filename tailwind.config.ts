import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        brand: {
          primary: '#1E3A5F',
          light: '#2A5080',
          subtle: '#132840',
        },
        app: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          input: 'var(--bg-input)',
          border: 'var(--border-default)',
          'border-focus': 'var(--border-focused)',
          text: 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-muted': 'var(--text-muted)',
          accent: 'var(--accent-blue)',
          green: 'var(--accent-green)',
          amber: 'var(--accent-amber)',
          red: 'var(--accent-red)',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm, 6px)',
        md: 'var(--radius-md, 10px)',
        lg: 'var(--radius-lg, 14px)',
      },
      boxShadow: {
        subtle: 'var(--shadow-sm)',
        elevated: 'var(--shadow-md)',
      },
    },
  },
  plugins: [],
};

export default config;
