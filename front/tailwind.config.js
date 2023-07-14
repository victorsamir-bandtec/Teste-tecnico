/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login:
          "url('https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg')",
      },
    },
  },
  plugins: [],
};
