export const themes = [
  {
    name: "Forest",
    bg: "#1f7a1f",
    panel: "#ffffff",
    text: "#222",
    accent: "#61a565",
    unvisited: "white",
  },
  {
    name: "Dark",
    bg: "#1e1e1e",
    panel: "#2c2c2c",
    text: "#ffffff",
    accent: "#db7500",
    unvisited: "gray"
  },
  {
    name: "Ocean",
    bg: "#1565c0",
    panel: "#ffffff",
    text: "#222",
    accent: "#abc3e7",
    unvisited: "white"
  }
];

export function applyTheme(theme) {
  const root = document.documentElement;

  root.style.setProperty("--bg-color", theme.bg);
  root.style.setProperty("--panel-bg", theme.panel);
  root.style.setProperty("--text-color", theme.text);
  root.style.setProperty("--visited-color", theme.accent);
  root.style.setProperty("--unvisited-color", theme.unvisited);

  localStorage.setItem("theme", JSON.stringify(theme));
}

export function loadSavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    applyTheme(JSON.parse(saved));
  }
}