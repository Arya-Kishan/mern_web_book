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
        "bgNotePop": "#00004d",
        "bgFilterPop": "#002366",
        "bgHistoryPop": "#192bc2",
        "blue1": "#0047ab",
        "blue2": "#1560BD",
        "blue3": "#1E90FF",
        "blue4": "#1034A6",
        "blue5": "#0f52ba",
        "blue6": "#0197f6",
        "btnColor1": "blue",
        "textColor1": "white",
        "textColor2": "black",
        "textColor3": "blue",
        "textColor4": "#1e40af",
        "bgInput1": "#00005c",
        "bgOpacity": "#000000a2"
      },
    },
  },
  plugins: [],
}