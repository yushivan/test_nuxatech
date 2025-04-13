/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
          'sm': '640px',
          // => @media (min-width: 640px) { small tablet / smartphone }

          'md': '768px',
          // => @media (min-width: 768px) { tablet }

          'lg': '1124px',
          // => @media (min-width: 1024px) { 13 inch lebih }

          'xl': '1285px',
          // => @media (min-width: 1280px) { 14 inch lebih }

          '2xl': '1536px',
          // => @media (min-width: 1536px) { 16 inch lebih }
      },
      colors: {
          primary: '#141141',
          secondary: '#F6F6F0',
          body: '#39393C',
          gold: '#BBAE8B',
          darkgold: '#3B3422'
      },
      container: {
          // you can configure the container to be centered
          center: true,
          // or have default horizontal padding
          padding: '1rem',
          // default breakpoints but with 40px removed
          screens: {
            sm: '600px',
            md: '728px',
            lg: '984px',
            xl: '1200px',
            '2xl': '1440px',
          },
      }
    },

  },
  plugins: [require('flowbite/plugin')],
}

