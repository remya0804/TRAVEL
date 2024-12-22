/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {

        'login-bg-img': "url('./src/assets/login.jpeg')",
        'signup-bg-img': "url('./src/assets/signup.jpeg')"
      }
    },
    
    fontFamily: {

      logo: ['Great Vibes']
    },

    // screens: {

    //   'xs': '480px'
    // }



  },
  plugins: [],
}