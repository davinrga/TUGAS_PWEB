module.exports = {
  // Be specific about where your source files are to avoid scanning node_modules
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
