/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    textFillColor: (theme) => theme("borderColor"),
    textStrokeColor: (theme) => theme("borderColor"),
    textStrokeWidth: (theme) => theme("borderWidth"),
    paintOrder: {
      fsm: { paintOrder: "fill stroke markers" },
      fms: { paintOrder: "fill markers stroke" },
      sfm: { paintOrder: "stroke fill markers" },
      smf: { paintOrder: "stroke markers fill" },
      mfs: { paintOrder: "markers fill stroke" },
      msf: { paintOrder: "markers stroke fill" },
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#222831",
        secondary: "#00ADB5",
        "text-primary": "#EEEEEE",
        alternative: "#393E46",
      },
    },
  },
  plugins: [
    require("tailwindcss-text-fill-stroke"), // no options to configure
  ],
};
