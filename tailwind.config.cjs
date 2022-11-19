const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      snow: '#f2f4f7',
      milk: '#DADDE7',
      main: '#111827',
      alternate: '#1F2937',
      floor: '#4B5563',
      easy: '#3B82F6',
      medium: '#EAB308',
      hard: '#DC2626',
      success: '#16A34A',
      green: colors.green,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      zinc: colors.zinc,
      blue: colors.blue,
      red: colors.red,
      cyan: colors.cyan
    },
    fontFamily: {
      ubuntu: ['Ubuntu', 'sans-serif'],
      code: ['Source Code Pro', 'monospace']
    }
  },
  darkMode: 'class',
  plugins: [
    require('daisyui')
  ]
}
