/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            veryDarkGray: "hsl(0, 0%, 17%)",
            darkGray: "hsl(0, 0%, 59%)",
         },

         backgroundImage: {
            desktop: "url('/pattern-bg-desktop.png')",
            mobile: "url('/pattern-bg-mobile.png')",
         },
         fontFamily: {
            robik: ["Rubik"],
         },
      },
   },
   plugins: [],
};
