/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#6366F1', // Sophisticated indigo - indigo-500
        'primary-50': '#EEF2FF', // Light indigo tint - indigo-50
        'primary-100': '#E0E7FF', // Lighter indigo - indigo-100
        'primary-200': '#C7D2FE', // Light indigo - indigo-200
        'primary-300': '#A5B4FC', // Medium light indigo - indigo-300
        'primary-400': '#818CF8', // Medium indigo - indigo-400
        'primary-500': '#6366F1', // Base indigo - indigo-500
        'primary-600': '#4F46E5', // Dark indigo - indigo-600
        'primary-700': '#4338CA', // Darker indigo - indigo-700
        'primary-800': '#3730A3', // Very dark indigo - indigo-800
        'primary-900': '#312E81', // Darkest indigo - indigo-900

        // Secondary Colors
        'secondary': '#EC4899', // Vibrant pink - pink-500
        'secondary-50': '#FDF2F8', // Light pink tint - pink-50
        'secondary-100': '#FCE7F3', // Lighter pink - pink-100
        'secondary-200': '#FBCFE8', // Light pink - pink-200
        'secondary-300': '#F9A8D4', // Medium light pink - pink-300
        'secondary-400': '#F472B6', // Medium pink - pink-400
        'secondary-500': '#EC4899', // Base pink - pink-500
        'secondary-600': '#DB2777', // Dark pink - pink-600
        'secondary-700': '#BE185D', // Darker pink - pink-700
        'secondary-800': '#9D174D', // Very dark pink - pink-800
        'secondary-900': '#831843', // Darkest pink - pink-900

        // Accent Colors
        'accent': '#F59E0B', // Warm amber - amber-500
        'accent-50': '#FFFBEB', // Light amber tint - amber-50
        'accent-100': '#FEF3C7', // Lighter amber - amber-100
        'accent-200': '#FDE68A', // Light amber - amber-200
        'accent-300': '#FCD34D', // Medium light amber - amber-300
        'accent-400': '#FBBF24', // Medium amber - amber-400
        'accent-500': '#F59E0B', // Base amber - amber-500
        'accent-600': '#D97706', // Dark amber - amber-600
        'accent-700': '#B45309', // Darker amber - amber-700
        'accent-800': '#92400E', // Very dark amber - amber-800
        'accent-900': '#78350F', // Darkest amber - amber-900

        // Background Colors
        'background': '#0F0F23', // Deep navy background - slate-900
        'background-50': '#F8FAFC', // Light background tint - slate-50
        'background-100': '#F1F5F9', // Lighter background - slate-100
        'background-200': '#E2E8F0', // Light background - slate-200
        'background-300': '#CBD5E1', // Medium light background - slate-300
        'background-400': '#94A3B8', // Medium background - slate-400
        'background-500': '#64748B', // Base background - slate-500
        'background-600': '#475569', // Dark background - slate-600
        'background-700': '#334155', // Darker background - slate-700
        'background-800': '#1E293B', // Very dark background - slate-800
        'background-900': '#0F0F23', // Darkest background - slate-900

        // Surface Colors
        'surface': '#1E1E3F', // Elevated surface color - slate-800
        'surface-50': '#F8FAFC', // Light surface tint - slate-50
        'surface-100': '#F1F5F9', // Lighter surface - slate-100
        'surface-200': '#E2E8F0', // Light surface - slate-200
        'surface-300': '#CBD5E1', // Medium light surface - slate-300
        'surface-400': '#94A3B8', // Medium surface - slate-400
        'surface-500': '#64748B', // Base surface - slate-500
        'surface-600': '#475569', // Dark surface - slate-600
        'surface-700': '#334155', // Darker surface - slate-700
        'surface-800': '#1E1E3F', // Very dark surface - slate-800
        'surface-900': '#0F172A', // Darkest surface - slate-900

        // Text Colors
        'text-primary': '#F8FAFC', // High-contrast white - slate-50
        'text-secondary': '#94A3B8', // Muted slate - slate-400
        'text-tertiary': '#64748B', // Subtle slate - slate-500
        'text-inverse': '#0F172A', // Dark text for light backgrounds - slate-900

        // Status Colors
        'success': '#10B981', // Professional emerald - emerald-500
        'success-50': '#ECFDF5', // Light success tint - emerald-50
        'success-100': '#D1FAE5', // Lighter success - emerald-100
        'success-200': '#A7F3D0', // Light success - emerald-200
        'success-300': '#6EE7B7', // Medium light success - emerald-300
        'success-400': '#34D399', // Medium success - emerald-400
        'success-500': '#10B981', // Base success - emerald-500
        'success-600': '#059669', // Dark success - emerald-600
        'success-700': '#047857', // Darker success - emerald-700
        'success-800': '#065F46', // Very dark success - emerald-800
        'success-900': '#064E3B', // Darkest success - emerald-900

        'warning': '#F59E0B', // Consistent amber - amber-500
        'warning-50': '#FFFBEB', // Light warning tint - amber-50
        'warning-100': '#FEF3C7', // Lighter warning - amber-100
        'warning-200': '#FDE68A', // Light warning - amber-200
        'warning-300': '#FCD34D', // Medium light warning - amber-300
        'warning-400': '#FBBF24', // Medium warning - amber-400
        'warning-500': '#F59E0B', // Base warning - amber-500
        'warning-600': '#D97706', // Dark warning - amber-600
        'warning-700': '#B45309', // Darker warning - amber-700
        'warning-800': '#92400E', // Very dark warning - amber-800
        'warning-900': '#78350F', // Darkest warning - amber-900

        'error': '#EF4444', // Clear red - red-500
        'error-50': '#FEF2F2', // Light error tint - red-50
        'error-100': '#FEE2E2', // Lighter error - red-100
        'error-200': '#FECACA', // Light error - red-200
        'error-300': '#FCA5A5', // Medium light error - red-300
        'error-400': '#F87171', // Medium error - red-400
        'error-500': '#EF4444', // Base error - red-500
        'error-600': '#DC2626', // Dark error - red-600
        'error-700': '#B91C1C', // Darker error - red-700
        'error-800': '#991B1B', // Very dark error - red-800
        'error-900': '#7F1D1D', // Darkest error - red-900

        // Border Colors
        'border': 'rgba(255, 255, 255, 0.1)', // Minimal border - white with opacity
        'border-light': 'rgba(255, 255, 255, 0.05)', // Subtle border - white with low opacity
        'border-medium': 'rgba(255, 255, 255, 0.15)', // Medium border - white with medium opacity
        'border-strong': 'rgba(255, 255, 255, 0.2)', // Strong border - white with higher opacity
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
        'premium': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-secondary': '0 0 20px rgba(236, 72, 153, 0.3)',
      },
      backdropBlur: {
        'premium': '12px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          'from': {
            'box-shadow': '0 0 5px rgb(99, 102, 241)',
          },
          'to': {
            'box-shadow': '0 0 20px rgb(99, 102, 241), 0 0 30px rgb(99, 102, 241)',
          },
        },
        'fade-in': {
          'from': {
            'opacity': '0',
          },
          'to': {
            'opacity': '1',
          },
        },
        'slide-up': {
          'from': {
            'transform': 'translateY(10px)',
            'opacity': '0',
          },
          'to': {
            'transform': 'translateY(0)',
            'opacity': '1',
          },
        },
        'scale-in': {
          'from': {
            'transform': 'scale(0.95)',
            'opacity': '0',
          },
          'to': {
            'transform': 'scale(1)',
            'opacity': '1',
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '1000': '1000',
      },
      scale: {
        '102': '1.02',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'out': 'ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}