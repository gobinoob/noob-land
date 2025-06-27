/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify files where Tailwind should look for classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      // Custom color palette for Ayu Mirage theme
      colors: {
        ayu: {
          'bg-primary': '#0F1219',
          'bg-secondary': '#171A21',
          'bg-tertiary': '#21242B',
          'code-bg': '#0F1219', // Same as primary for consistency
          'fg': '#CBCCC6',
          'fg-muted': '#8F939D',
          'accent-orange': '#FFCC66',
          'accent-green': '#95E6CB',
          'accent-blue': '#7FD9EA',
          'accent-purple': '#BD97EC',
          'accent-red': '#FF8F80',
          'border': '#2D3038',
        },
        'bluish-grey': '#4A5568', // Specific color for code highlight
      },
      // Custom font family
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        mono: ['Inter', 'monospace'], // Keep monospace for code, but default to Inter
      },
    },
  },
  plugins: [],
}