/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "fontFamily": {
        "Irish": ["Irish Grover", "system-ui"],
        "Aladin": ["Aladin", "system-ui"],
        "Itim": ["Itim", "cursive"],
      },
      "colors": {
        "bgBackground": "#0A0A46",
        "customGreen": "#75F94C",
        "bg-card": "#3c3cea",
        "bgNotePop": "blue",
        "bgFilterPop": "blue",
        "bgHistoryPop": "blue",
        "btnColor1": "blue",
        "bgBtn1": "yellow",
        "textColor1": "white",
        "textColor2": "black",
        "textColor3": "blue",
        "textColor4": "#1e40af",
        "bgInput1": "#00005c",
      }
    },
  },
  plugins: [],
}