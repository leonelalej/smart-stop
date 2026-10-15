/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // ─── Smart Stop Brand Palette ──────────────────────────────
        // Inspired by the official SMT logo: deep crimson gradient
        // with metallic silver/chrome typography.
        brand: {
          // Crimson / maroon ramp — the SMT logo background.
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C', // ← primary brand
          800: '#991B1B',
          900: '#7F1D1D', // ← deep maroon (logo vignette)
          950: '#450A0A',
        },
        // Metallic silver/chrome ramp — the SMT lettering.
        chrome: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        // WhatsApp official green — used ONLY for the WhatsApp CTA.
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
          deeper: '#075E54',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        // Mobile-first: cap content to a comfortable phone width, then expand.
        'screen-phone': '480px',
        'screen-tablet': '768px',
        'screen-desktop': '1280px',
      },
      height: {
        // Dynamic viewport units for Instagram in-app browser compatibility.
        'dvh': '100dvh',
        'dvh-safe': 'calc(100dvh - env(safe-area-inset-bottom))',
        'screen-dvh': '100dvh',
      },
      minHeight: {
        'touch': '48px', // WCAG / Apple HIG touch target
        'touch-sm': '44px',
      },
      minWidth: {
        'touch': '48px',
        'touch-sm': '44px',
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 4px 8px -2px rgba(15, 23, 42, 0.12), 0 12px 24px -4px rgba(15, 23, 42, 0.16)',
        'dock': '0 -4px 20px -4px rgba(15, 23, 42, 0.15)',
        'drawer': '-8px 0 32px -8px rgba(15, 23, 42, 0.25)',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '20px',
        '3xl': '28px',
      },
      animation: {
        'slide-up': 'slideUp 280ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 320ms cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 200ms ease-out',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        'badge-pop': 'badgePop 360ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        badgePop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
