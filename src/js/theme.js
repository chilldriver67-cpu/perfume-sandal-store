// ==========================
// DARK MODE
// Toggles a data-theme="dark" attribute on <html>, persists the choice,
// and defaults to the visitor's OS-level preference on first visit.
// ==========================

const STORAGE_KEY = "perfume-sandal-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (toggleBtn) {
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;

  // No saved preference yet — default to the visitor's OS-level setting.
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function initTheme() {
  // Apply immediately, before the rest of the page finishes rendering,
  // so there's no visible "flash" of the wrong theme.
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}
