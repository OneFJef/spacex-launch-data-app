module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // black
    // zinc-800
    extend: {
      backgroundImage: {
        spacex_background: "url('/spacex_background.jpeg')",
        space_wallpaper: "url('/space_wallpaper.jpg')",
      },
    },
  },
  plugins: [],
};
