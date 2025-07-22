module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './_posts/**/*.md',
    './_work/**/*.md',
    './blog/**/*.html',
    './resume/**/*.md',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "Calibri", "sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 