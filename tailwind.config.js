module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // black
    // white
    // zinc-400/800
    // orange-400
    extend: {
      backgroundImage: {
        spacex_background: "url('/spacex_background.jpeg')",
        space_wallpaper: "url('/space_wallpaper.jpg')",
      },
    },
  },
  plugins: [],
};
