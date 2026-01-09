/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        splash: {
          bg: '#3D4F5F',
          ring1: '#425664',
          ring2: '#3F5260',
          ring3: '#3C4E5B',
          ring4: '#394A56',
          center: '#374555',
          text: '#7BA3B8',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      }
    },
  },
  plugins: [],
};

